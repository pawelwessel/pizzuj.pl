import { Footer } from "../components/Footer";
import Header from "../components/Header";
import ErrorBoundary from "../components/ErrorBoundary";
import CookieConsent from "../components/CookieConsent";
import "./globals.css";
import { PT_Sans } from "next/font/google";

export const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="pl" className="overflow-x-hidden">
      <body
        className={`antialiased overflow-x-hidden w-full ${ptSans.className}`}
      >
        {/* Enhanced geometric background shapes */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Animated floating shapes */}
          <div
            className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-10 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ff8f00 100%)",
              animationDelay: "0s",
            }}
          ></div>

          <div
            className="absolute top-8 right-8 w-32 h-32 opacity-8 rotate-45 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffca28 0%, #ffa920 100%)",
              animationDelay: "1s",
            }}
          ></div>

          <div
            className="absolute top-1/4 -right-20 w-40 h-40 rounded-full opacity-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff8f00 0%, #ec7308 100%)",
              animationDelay: "0.5s",
            }}
          ></div>

          <div
            className="absolute top-1/2 -left-12 w-24 h-24 opacity-15 rotate-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ffca28 100%)",
              animationDelay: "1.5s",
            }}
          ></div>

          <div
            className="absolute -bottom-16 -left-16 w-44 h-44 opacity-10 rotate-45 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff6f00 0%, #ffa920 100%)",
              animationDelay: "2s",
            }}
          ></div>

          <div
            className="absolute bottom-16 right-16 w-36 h-36 rounded-full opacity-12 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffca28 0%, #ff8f00 100%)",
              animationDelay: "0.75s",
            }}
          ></div>

          <div
            className="absolute top-20 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full opacity-8 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ffa920 0%, #ec7308 100%)",
              animationDelay: "1.25s",
            }}
          ></div>

          {/* Additional subtle shapes for depth */}
          <div
            className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-full opacity-5 animate-bounce-gentle"
            style={{
              background: "linear-gradient(135deg, #ff8f00 0%, #ffa920 100%)",
              animationDelay: "3s",
            }}
          ></div>
        </div>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-500 text-white px-4 py-2 rounded-lg z-50"
        >
          Przejdź do głównej treści
        </a>

        {/* Main content with enhanced z-index */}
        <div className="relative z-10">
          <ErrorBoundary>
            <Header />
            <main id="main-content">{children}</main>

            <Footer />
          </ErrorBoundary>
        </div>

        {/* Cookie Consent Banner */}
        <CookieConsent />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
              
              // Performance monitoring
              window.addEventListener('load', function() {
                if ('performance' in window) {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                      const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                      
                      // Log performance metrics
                      console.log('Performance Metrics:', {
                        loadTime: loadTime + 'ms',
                        domContentLoaded: domContentLoaded + 'ms',
                        totalTime: perfData.loadEventEnd + 'ms'
                      });
                      
                      // Send to analytics if needed
                      if (window.gtag) {
                        window.gtag('event', 'performance', {
                          load_time: loadTime,
                          dom_content_loaded: domContentLoaded
                        });
                      }
                    }
                  }, 0);
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
