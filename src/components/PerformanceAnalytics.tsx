
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

interface AnalyticsConfig {
  gaTrackingId?: string;
  enableWebVitals?: boolean;
  enableUserBehavior?: boolean;
}

interface PerformanceAnalyticsProps {
  config: AnalyticsConfig;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({ config }) => {
  useEffect(() => {
    // Initialize Google Analytics 4 if tracking ID is provided
    if (config.gaTrackingId) {
      ReactGA.initialize(config.gaTrackingId);
      
      // Track page views
      ReactGA.send({ 
        hitType: "pageview", 
        page: window.location.pathname + window.location.search 
      });
    }

    // Simple performance tracking without web-vitals
    if (config.enableWebVitals) {
      const trackSimpleMetrics = () => {
        // Track page load time
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (config.gaTrackingId && loadTime > 0) {
          ReactGA.event({
            category: 'Performance',
            action: 'Page Load Time',
            value: Math.round(loadTime),
            nonInteraction: true,
          });
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Time:', loadTime + 'ms');
        }
      };

      // Wait for page to fully load
      if (document.readyState === 'complete') {
        trackSimpleMetrics();
      } else {
        window.addEventListener('load', trackSimpleMetrics);
      }
    }

    // User behavior tracking
    if (config.enableUserBehavior) {
      // Track scroll depth
      let maxScroll = 0;
      const trackScrollDepth = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent;
          
          if (config.gaTrackingId) {
            ReactGA.event({
              category: 'User Engagement',
              action: 'Scroll Depth',
              value: scrollPercent,
              nonInteraction: true,
            });
          }
        }
      };

      // Track time on page
      const startTime = Date.now();
      const trackTimeOnPage = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (config.gaTrackingId) {
          ReactGA.event({
            category: 'User Engagement',
            action: 'Time on Page',
            value: timeSpent,
            nonInteraction: true,
          });
        }
      };

      // Add event listeners
      window.addEventListener('scroll', trackScrollDepth, { passive: true });
      window.addEventListener('beforeunload', trackTimeOnPage);

      // Cleanup
      return () => {
        window.removeEventListener('scroll', trackScrollDepth);
        window.removeEventListener('beforeunload', trackTimeOnPage);
      };
    }
  }, [config]);

  return null; // This component doesn't render anything
};

// Helper functions for manual tracking
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && ReactGA.isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && ReactGA.isInitialized) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackRaffleView = (raffle: any) => {
  trackEvent('Raffle', 'View', `${raffle.id} - ${raffle.title}`);
};

export const trackRaffleJoin = (raffle: any) => {
  trackEvent('Raffle', 'Join Click', `${raffle.id} - ${raffle.title}`, raffle.bettingCost);
};

export const trackRaffleShare = (raffle: any, platform: string) => {
  trackEvent('Raffle', 'Share', `${platform} - ${raffle.title}`);
};

export default PerformanceAnalytics;
