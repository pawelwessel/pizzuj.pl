// Simple in-memory rate limiter
const rateLimitMap = new Map();

export function rateLimiter(limit = 10, windowMs = 60000) {
  return function (req) {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const windowStart = now - windowMs;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const requests = rateLimitMap.get(ip);

    // Remove old requests outside the window
    const validRequests = requests.filter(
      (timestamp) => timestamp > windowStart
    );

    if (validRequests.length >= limit) {
      return { allowed: false, remaining: 0 };
    }

    // Add current request
    validRequests.push(now);
    rateLimitMap.set(ip, validRequests);

    return {
      allowed: true,
      remaining: limit - validRequests.length,
    };
  };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, requests] of rateLimitMap.entries()) {
    const validRequests = requests.filter(
      (timestamp) => now - timestamp < 60000
    );
    if (validRequests.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validRequests);
    }
  }
}, 60000); // Clean up every minute
