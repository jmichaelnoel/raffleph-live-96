
import React from 'react';
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
  const { settings } = useSEOSettings();

  // Generate SEO data based on raffle if provided, otherwise use database settings or defaults
  const seoData = raffle ? {
    title: `Win ${raffle.title} - ₱${raffle.prize.toLocaleString()} Prize | Philippine Raffles`,
    description: `Join the ${raffle.title} raffle organized by ${raffle.organization}. Prize worth ₱${raffle.prize.toLocaleString()}, entry cost ₱${raffle.bettingCost.toLocaleString()}. Win rate: ${(raffle.winningPercentage * 100).toFixed(3)}%. ${raffle.description}`,
    image: raffle.imageUrl,
    keywords: `raffle, giveaway, ${raffle.category}, ${raffle.organization}, Philippine raffles, win prizes, online raffle`
  } : {
    title: title || settings.site_title || 'Philippine Raffles - Win Amazing Prizes | Join Verified Raffles',
    description: description || settings.site_description || 'Discover verified raffles in the Philippines. Win gadgets, cars, cash prizes and more. Join trusted raffles from verified organizers with transparent winning odds.',
    image: image || settings.default_social_image || '/placeholder.svg',
    keywords: 'Philippine raffles, online raffles, win prizes, giveaways, verified raffles, gadgets, cars, cash prizes'
  };

  const siteName = settings.og_site_name || 'Philippine Raffles';
  const canonicalUrl = url.split('?')[0]; // Remove query parameters for canonical URL
  const themeColor = settings.theme_color || '#8B5CF6';

  // Add cache-busting to favicon and images
  const faviconUrl = settings.favicon_url 
    ? (settings.favicon_url.includes('?') 
        ? `${settings.favicon_url}&t=${Date.now()}` 
        : `${settings.favicon_url}?t=${Date.now()}`)
    : '/favicon.ico';

  const socialImageUrl = seoData.image && seoData.image !== '/placeholder.svg' 
    ? (seoData.image.includes('?') 
        ? `${seoData.image}&t=${Date.now()}` 
        : `${seoData.image}?t=${Date.now()}`)
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
    "description": seoData.description,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href={faviconUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PH" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={socialImageUrl} />
      {settings.twitter_handle && (
        <meta name="twitter:site" content={settings.twitter_handle} />
      )}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en-PH" />
      
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

      {/* Additional SEO Tags */}
      <meta name="theme-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
