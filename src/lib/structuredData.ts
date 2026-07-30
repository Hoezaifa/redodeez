/**
 * JSON-LD Structured Data Generators for Deez Prints
 * Covers: Organization, WebSite + SearchAction, Product, BreadcrumbList, FAQPage
 */

import { site, paymentMethods } from "@/data/site";
import type { Product } from "@/data/products";

// Shared base URL — will be empty in dev, set by host in production
const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";

/** Organization schema — appears in Google Knowledge Panel */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Deez Prints",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo/deez-logo.svg`,
    description:
      "Premium streetwear and custom printing studio based in Karachi, Pakistan. Oversized tees, acid wash, hoodies, wall art, and more.",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: [site.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      contactType: "customer service",
      availableLanguage: ["English", "Urdu"],
    },
  };
}

/** WebSite schema with SearchAction (enables sitelinks searchbox in Google) */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deez Prints",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/collections?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Product schema for individual product pages */
export function productSchema(product: Product) {
  const url = `${SITE_URL}/products/${product.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? `${product.title} — premium streetwear by Deez Prints`,
    image: product.images.length > 0 ? product.images : undefined,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Deez Prints",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Deez Prints",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: site.shippingFee,
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 5,
            unitCode: "d",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/** BreadcrumbList schema */
export function breadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  };
}

/** FAQPage schema for the FAQ page */
export function faqPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
