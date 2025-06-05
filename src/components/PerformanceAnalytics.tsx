
import React, { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
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

    // Web Vitals tracking
    if (config.enableWebVitals) {
      const sendToAnalytics = (metric: any) => {
        // Send to Google Analytics if available
        if (config.gaTrackingId) {
          ReactGA.event({
            category: 'Web Vitals',
            action: metric.name,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            nonInteraction: true,
          });
        }

        // Also log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Web Vital:', metric);
        }
      };

      // Measure all Web Vitals
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
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

  // Track raffle interactions
  const trackRaffleInteraction = (action: string, raffleId: string, raffleName: string) => {
    if (config.gaTrackingId) {
      ReactGA.event({
        category: 'Raffle Interaction',
        action: action,
        label: `${raffleId} - ${raffleName}`,
      });
    }
  };

  // Track search interactions
  const trackSearch = (query: string, resultCount: number) => {
    if (config.gaTrackingId) {
      ReactGA.event({
        category: 'Search',
        action: 'Search Query',
        label: query,
        value: resultCount,
      });
    }
  };

  // Track filter usage
  const trackFilter = (filterType: string, filterValue: string) => {
    if (config.gaTrackingId) {
      ReactGA.event({
        category: 'Filter Usage',
        action: filterType,
        label: filterValue,
      });
    }
  };

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    // @ts-ignore
    window.trackRaffleInteraction = trackRaffleInteraction;
    // @ts-ignore
    window.trackSearch = trackSearch;
    // @ts-ignore
    window.trackFilter = trackFilter;
  }, []);

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
