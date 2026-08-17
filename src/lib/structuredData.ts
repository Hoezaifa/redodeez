/**
 * JSON-LD Structured Data Generators for Deez Prints
 * Covers: Organization, WebSite + SearchAction, Product, BreadcrumbList, FAQPage
 *
 * All public URLs use the centralized SITE_URL from site.ts.
 * Never uses window.location.origin or request Host for canonical URLs.
 */

import { site, SITE_URL } from "@/data/site";
import type { Product } from "@/data/products";

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
    telephone: site.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    sameAs: [site.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.whatsappNumber,
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

/**
 * Generate a natural description for a product based on available data.
 * Uses product.description if present, otherwise constructs from title + subcategory.
 */
function productDescription(product: Product): string {
  if (product.description) return product.description;

  const subcatLabel = product.subcategory.replace(/-/g, " ");
  const categoryLabel = product.category === "accessories" ? "" : " streetwear";
  return `${product.title} — premium ${subcatLabel}${categoryLabel} by Deez Prints. Printed in Karachi, delivered across Pakistan.`;
}

/** Product schema for individual product pages */
export function productSchema(product: Product) {
  const url = `${SITE_URL}/products/${product.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: productDescription(product),
    image: product.images.length > 0 ? product.images : undefined,
    url,
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
    // aggregateRating intentionally omitted — no verified review system exists
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
