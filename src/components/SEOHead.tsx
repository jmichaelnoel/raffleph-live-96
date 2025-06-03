
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOProps> = ({
  title = "RafflePH - Online Raffles in the Philippines",
  description = "Join the best online raffles in the Philippines! Win cash prizes, gadgets, and more. Browse trusted raffles with great odds and join for as low as ₱20.",
  keywords = "raffle, Philippines, online raffle, cash prizes, win money, PH raffles, contest, lottery, sweepstakes",
  image = "/placeholder.svg",
  url = "https://raffleph.com",
  type = "website",
  structuredData
}) => {
  const fullTitle = title.includes("RafflePH") ? title : `${title} | RafflePH`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="RafflePH" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="RafflePH" />
      <meta property="og:locale" content="en_PH" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Tags */}
      <meta name="theme-color" content="#CE1126" />
      <meta name="msapplication-TileColor" content="#CE1126" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
