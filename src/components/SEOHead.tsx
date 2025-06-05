
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Raffle } from '@/data/raffles';

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
  // Generate SEO data based on raffle if provided
  const seoData = raffle ? {
    title: `Win ${raffle.title} - ₱${raffle.prize.toLocaleString()} Prize | Philippine Raffles`,
    description: `Join the ${raffle.title} raffle organized by ${raffle.organization}. Prize worth ₱${raffle.prize.toLocaleString()}, entry cost ₱${raffle.bettingCost.toLocaleString()}. Win rate: ${(raffle.winningPercentage * 100).toFixed(3)}%. ${raffle.description}`,
    image: raffle.imageUrl,
    keywords: `raffle, giveaway, ${raffle.category}, ${raffle.organization}, Philippine raffles, win prizes, online raffle`
  } : {
    title: title || 'Philippine Raffles - Win Amazing Prizes | Join Verified Raffles',
    description: description || 'Discover verified raffles in the Philippines. Win gadgets, cars, cash prizes and more. Join trusted raffles from verified organizers with transparent winning odds.',
    image: image || '/placeholder.svg',
    keywords: 'Philippine raffles, online raffles, win prizes, giveaways, verified raffles, gadgets, cars, cash prizes'
  };

  const siteName = 'Philippine Raffles';
  const canonicalUrl = url.split('?')[0]; // Remove query parameters for canonical URL

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

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PH" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

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
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
