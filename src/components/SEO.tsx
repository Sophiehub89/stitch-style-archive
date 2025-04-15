
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical = window.location.href,
  image = '/placeholder.svg',
  type = 'website',
}) => {
  const siteTitle = 'OpenCrochet';
  const fullTitle = title === 'Home' ? siteTitle : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data - BreadcrumbList */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: image,
            datePublished: new Date().toISOString(),
            author: {
              '@type': 'Organization',
              name: siteTitle
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
