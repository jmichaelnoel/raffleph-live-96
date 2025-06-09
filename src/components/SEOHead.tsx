
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Raffle } from '@/data/raffles';
import { useSEOSettings } from '@/hooks/useSEOSettings';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  raffle?: Raffle;
  type?: 'website' | 'article';
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image,
  url = typeof window !== 'undefined' ? window.location.href : '',
  raffle,
  type = 'website'
}) => {
  const { settings, loading } = useSEOSettings();

  // Generate SEO data based on raffle if provided, otherwise use database settings or defaults
  const seoData = raffle ? {
    title: `Win ${raffle.title} - ₱${raffle.prize.toLocaleString()} Prize | Philippine Raffles`,
    description: `Join the ${raffle.title} raffle organized by ${raffle.organization}. Prize worth ₱${raffle.prize.toLocaleString()}, entry cost ₱${raffle.bettingCost.toLocaleString()}. Win rate: ${(raffle.winningPercentage * 100).toFixed(3)}%. ${raffle.description}`,
    image: raffle.imageUrl,
    keywords: `raffle, giveaway, ${raffle.category}, ${raffle.organization}, Philippine raffles, win prizes, online raffle`
  } : {
    title: title || settings.site_title || 'RafflePH - Win Cars, Millions in Cash, and More | No Sign-up Required',
    description: description || settings.site_description || 'Win cars, millions in cash, and more — no sign-up required. Para sa pamilya, para sa pangarap — ito na \'yon! Join exciting online raffles in the Philippines with entry fees starting at ₱20.',
    image: image || settings.default_social_image || '/lovable-uploads/adc5bb76-0107-4448-9683-195bd554314c.png',
    keywords: 'online raffle Philippines, win cars Philippines, raffle PH, win cash prizes, online contest, gadgets raffle, car raffle, cash raffle, lottery Philippines, win millions'
  };

  const siteName = settings.og_site_name || 'RafflePH';
  const canonicalUrl = url.split('?')[0]; // Remove query parameters for canonical URL
  const themeColor = settings.theme_color || '#6366f1';
  const twitterHandle = settings.twitter_handle || '@PhilippineRaffles';

  // Add cache-busting to favicon
  const faviconUrl = settings.favicon_url 
    ? `${settings.favicon_url}?v=${Date.now()}` 
    : '/favicon.ico';

  // Add cache-busting to social images if they're from our storage
  const socialImageUrl = seoData.image && seoData.image.includes('supabase') 
    ? `${seoData.image}?v=${Date.now()}` 
    : seoData.image;

  // Generate structured data for raffles
  const structuredData = raffle ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": raffle.title,
    "description": raffle.description,
    "image": raffle.imageUrl,
    "startDate": new Date().toISOString(),
    "endDate": raffle.endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": url
    },
    "organizer": {
      "@type": "Organization",
      "name": raffle.organization
    },
    "offers": {
      "@type": "Offer",
      "price": raffle.bettingCost,
      "priceCurrency": "PHP",
      "availability": "https://schema.org/InStock"
    },
    "prize": {
      "@type": "MonetaryAmount",
      "value": raffle.prize,
      "currency": "PHP"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "alternateName": "Raffle Philippines",
    "url": canonicalUrl,
    "description": seoData.description,
    "inLanguage": "en-PH",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${canonicalUrl}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": canonicalUrl
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="author" content={siteName} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="PH" />
      <meta name="geo.country" content="Philippines" />
      <meta name="geo.placename" content="Philippines" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href={faviconUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PH" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Mobile optimization */}
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Raffle-specific meta tags */}
      {raffle && (
        <>
          <meta name="raffle:prize" content={raffle.prize.toString()} />
          <meta name="raffle:cost" content={raffle.bettingCost.toString()} />
          <meta name="raffle:category" content={raffle.category} />
          <meta name="raffle:organizer" content={raffle.organization} />
          <meta name="raffle:end-date" content={raffle.endDate} />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
