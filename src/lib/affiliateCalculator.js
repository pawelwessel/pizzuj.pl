// Affiliate Calculator Utility Functions

// Tier system configuration
export const TIER_SYSTEM = {
  Starter: { 
    minCommission: 0, 
    maxCommission: 0.10, 
    minRestaurants: 0, 
    maxRestaurants: 15,
    name: "Starter",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  Silver: { 
    minCommission: 0.12, 
    maxCommission: 0.12, 
    minRestaurants: 16, 
    maxRestaurants: 30,
    name: "Silver",
    color: "text-gray-600",
    bgColor: "bg-gray-50"
  },
  Gold: { 
    minCommission: 0.15, 
    maxCommission: 0.15, 
    minRestaurants: 31, 
    maxRestaurants: 100,
    name: "Gold",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  VIP: { 
    minCommission: 0.20,
    maxCommission: 0.20, 
    minRestaurants: 101, 
    maxRestaurants: Infinity,
    name: "VIP",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
};

// Revenue per restaurant (new pricing model)
export const REVENUE_PER_RESTAURANT = 3000; // 1000 PLN per restaurant

/**
 * Calculate required restaurants and commission based on monthly goal
 * @param {number} monthlyGoal - Monthly earnings goal in PLN
 * @returns {object} Requirements object with restaurants, commission, tier, and earnings
 */
export const calculateRequirements = (monthlyGoal) => {
  // Start with the highest commission rate to minimize required restaurants
  let requiredRestaurants = 0;
  let effectiveCommission = 0;
  let tier = "Starter";

  // Calculate for each tier starting from highest
  for (const [tierName, tierData] of Object.entries(TIER_SYSTEM)) {
    const maxCommission = tierData.maxCommission;
    const minRestaurants = tierData.minRestaurants;
    
    // Calculate restaurants needed with this commission rate
    // Each restaurant generates 1000 PLN, so commission is applied to that amount
    const restaurantsNeeded = Math.ceil(monthlyGoal / (REVENUE_PER_RESTAURANT * maxCommission));
    
    // Check if this tier is achievable
    if (restaurantsNeeded >= minRestaurants) {
      requiredRestaurants = restaurantsNeeded;
      effectiveCommission = maxCommission;
      tier = tierName;
      break;
    }
  }

  return {
    requiredRestaurants,
    effectiveCommission,
    tier,
    monthlyEarnings: requiredRestaurants * REVENUE_PER_RESTAURANT * effectiveCommission,
    yearlyEarnings: requiredRestaurants * REVENUE_PER_RESTAURANT * effectiveCommission * 12
  };
};

/**
 * Get tier information for a given number of restaurants
 * @param {number} restaurantCount - Number of restaurants
 * @returns {object} Tier information
 */
export const getTierForRestaurants = (restaurantCount) => {
  for (const [tierName, tierData] of Object.entries(TIER_SYSTEM)) {
    if (restaurantCount >= tierData.minRestaurants && restaurantCount <= tierData.maxRestaurants) {
      return {
        name: tierName,
        ...tierData
      };
    }
  }
  return TIER_SYSTEM.VIP; // Default to VIP for very high numbers
};

/**
 * Calculate monthly earnings for a given number of restaurants and tier
 * @param {number} restaurantCount - Number of restaurants
 * @param {string} tierName - Tier name (optional, will be calculated if not provided)
 * @returns {object} Earnings calculation
 */
export const calculateMonthlyEarnings = (restaurantCount, tierName = null) => {
  const tier = tierName ? TIER_SYSTEM[tierName] : getTierForRestaurants(restaurantCount);
  const commission = tier.maxCommission;
  
  return {
    monthlyEarnings: restaurantCount * REVENUE_PER_RESTAURANT * commission,
    yearlyEarnings: restaurantCount * REVENUE_PER_RESTAURANT * commission * 12,
    commission: commission,
    tier: tier.name
  };
};

/**
 * Format currency in Polish format
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Get motivational message based on monthly goal
 * @param {number} monthlyGoal - Monthly goal amount
 * @returns {string} Motivational message
 */
export const getMotivationalMessage = (monthlyGoal) => {
  if (monthlyGoal <= 2000) return "Świetny początek!";
  if (monthlyGoal <= 5000) return "Ambitny cel!";
  if (monthlyGoal <= 10000) return "Prawdziwy przedsiębiorca!";
  return "Elita zarabiających!";
};

/**
 * Get tier color class
 * @param {string} tier - Tier name
 * @returns {string} CSS color class
 */
export const getTierColor = (tier) => {
  return TIER_SYSTEM[tier]?.color || "text-blue-600";
};

/**
 * Get tier background color class
 * @param {string} tier - Tier name
 * @returns {string} CSS background color class
 */
export const getTierBgColor = (tier) => {
  return TIER_SYSTEM[tier]?.bgColor || "bg-blue-50";
};

/**
 * Calculate time to reach goal based on restaurant acquisition rate
 * @param {number} requiredRestaurants - Number of restaurants needed
 * @param {number} monthlyAcquisitionRate - Restaurants acquired per month (default: 5)
 * @returns {object} Time calculation
 */
export const calculateTimeToGoal = (requiredRestaurants, monthlyAcquisitionRate = 5) => {
  const monthsToGoal = Math.ceil(requiredRestaurants / monthlyAcquisitionRate);
  const yearsToGoal = Math.floor(monthsToGoal / 12);
  const remainingMonths = monthsToGoal % 12;
  
  return {
    monthsToGoal,
    yearsToGoal,
    remainingMonths,
    isRealistic: monthsToGoal <= 24 // Consider realistic if achievable within 2 years
  };
};

/**
 * Get commission range for display
 * @param {string} tier - Tier name
 * @returns {string} Commission range string
 */
export const getCommissionRange = (tier) => {
  const tierData = TIER_SYSTEM[tier];
  if (!tierData) return "8-10%";
  
  const minPercent = Math.floor(tierData.minCommission * 100);
  const maxPercent = Math.floor(tierData.maxCommission * 100);
  
  return `${minPercent}-${maxPercent}%`;
};

/**
 * Get restaurant range for display
 * @param {string} tier - Tier name
 * @returns {string} Restaurant range string
 */
export const getRestaurantRange = (tier) => {
  const tierData = TIER_SYSTEM[tier];
  if (!tierData) return "0-15";
  
  if (tierData.maxRestaurants === Infinity) {
    return `${tierData.minRestaurants}+`;
  }
  
  return `${tierData.minRestaurants}-${tierData.maxRestaurants}`;
}; 