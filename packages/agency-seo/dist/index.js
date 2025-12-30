"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  HrefLangLinks: () => HrefLangLinks,
  JsonLdContainer: () => JsonLdContainer,
  JsonLdScript: () => JsonLdScript,
  JsonLdScripts: () => JsonLdScripts,
  MetaTags: () => MetaTags,
  PAGE_PRIORITIES: () => PAGE_PRIORITIES,
  createMultilingualUrl: () => createMultilingualUrl,
  defaultRobotsConfig: () => defaultRobotsConfig,
  generateArtGalleryJsonLd: () => generateArtGalleryJsonLd,
  generateArticleJsonLd: () => generateArticleJsonLd,
  generateArtistJsonLd: () => generateArtistJsonLd,
  generateArtistLLMContext: () => generateArtistLLMContext,
  generateArtworkJsonLd: () => generateArtworkJsonLd,
  generateBlogPostJsonLd: () => generateBlogPostJsonLd,
  generateBreadcrumbJsonLd: () => generateBreadcrumbJsonLd,
  generateBusinessLLMContext: () => generateBusinessLLMContext,
  generateCategorizedFAQJsonLd: () => generateCategorizedFAQJsonLd,
  generateClassEventJsonLd: () => generateClassEventJsonLd,
  generateDetailBreadcrumb: () => generateDetailBreadcrumb,
  generateEventJsonLd: () => generateEventJsonLd,
  generateExhibitionJsonLd: () => generateExhibitionJsonLd,
  generateFAQJsonLd: () => generateFAQJsonLd,
  generateFAQJsonLdForLocale: () => generateFAQJsonLdForLocale,
  generateHealthBusinessJsonLd: () => generateHealthBusinessJsonLd,
  generateHomeBreadcrumb: () => generateHomeBreadcrumb,
  generateInstructorJsonLd: () => generateInstructorJsonLd,
  generateLLMContext: () => generateLLMContext,
  generateLocalBusinessJsonLd: () => generateLocalBusinessJsonLd,
  generateMenuItemJsonLd: () => generateMenuItemJsonLd,
  generateNewsArticleJsonLd: () => generateNewsArticleJsonLd,
  generatePageBreadcrumb: () => generatePageBreadcrumb,
  generatePersonJsonLd: () => generatePersonJsonLd,
  generatePressReleaseJsonLd: () => generatePressReleaseJsonLd,
  generateProductJsonLd: () => generateProductJsonLd,
  generateRestaurantJsonLd: () => generateRestaurantJsonLd,
  generateRobotsTxt: () => generateRobotsTxt,
  generateRobotsTxtWithHost: () => generateRobotsTxtWithHost,
  generateSitemapIndex: () => generateSitemapIndex,
  generateSitemapXml: () => generateSitemapXml,
  generateStoreJsonLd: () => generateStoreJsonLd,
  generateWebsiteJsonLd: () => generateWebsiteJsonLd,
  generateWebsiteWithSearchJsonLd: () => generateWebsiteWithSearchJsonLd,
  getPriority: () => getPriority,
  mergeRobotsConfigs: () => mergeRobotsConfigs,
  serializeLLMContext: () => serializeLLMContext
});
module.exports = __toCommonJS(index_exports);

// src/generators/person.ts
function generatePersonJsonLd(person, options) {
  const { siteUrl, includeAlternateNames = true } = options;
  const sameAs = [];
  if (person.social) {
    if (person.social.instagram) sameAs.push(person.social.instagram);
    if (person.social.facebook) sameAs.push(person.social.facebook);
    if (person.social.twitter) sameAs.push(person.social.twitter);
    if (person.social.linkedin) sameAs.push(person.social.linkedin);
    if (person.social.youtube) sameAs.push(person.social.youtube);
  }
  if (person.externalIds) {
    if (person.externalIds.wikidata) {
      sameAs.push(`https://www.wikidata.org/wiki/${person.externalIds.wikidata}`);
    }
    if (person.externalIds.viaf) {
      sameAs.push(`https://viaf.org/viaf/${person.externalIds.viaf}`);
    }
    if (person.externalIds.ulan) {
      sameAs.push(`https://vocab.getty.edu/ulan/${person.externalIds.ulan}`);
    }
    if (person.externalIds.isni) {
      sameAs.push(`https://isni.org/isni/${person.externalIds.isni}`);
    }
  }
  if (person.affiliations) {
    person.affiliations.forEach((aff) => {
      if (aff.url) sameAs.push(aff.url);
    });
  }
  const alternateNames = [];
  if (includeAlternateNames) {
    if (person.name.ko !== person.name.en) {
      alternateNames.push(person.name.ko);
    }
    const otherNames = [
      person.name.vi,
      person.name.ja,
      person.name["zh-CN"]
    ].filter(Boolean);
    alternateNames.push(...otherNames);
  }
  const alumniOf = person.affiliations?.filter((aff) => aff.type === "alumniOf").map((aff) => ({
    "@type": "CollegeOrUniversity",
    name: aff.name,
    sameAs: aff.url
  }));
  const affiliation = person.affiliations?.filter((aff) => aff.type !== "alumniOf").map((aff) => ({
    "@type": "Organization",
    name: aff.name,
    url: aff.url
  }));
  const result = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person-${person.id}`,
    name: person.name.en,
    url: person.contact?.website || siteUrl,
    description: person.description?.en
  };
  if (alternateNames.length > 0) {
    result.alternateName = alternateNames;
  }
  if (person.birthYear) {
    result.birthDate = String(person.birthYear);
  }
  if (person.birthPlace) {
    result.birthPlace = {
      "@type": "Place",
      name: person.birthPlace
    };
  }
  if (person.nationality) {
    result.nationality = {
      "@type": "Country",
      name: person.nationality
    };
  }
  if (person.images?.full) {
    result.image = {
      "@type": "ImageObject",
      url: `${siteUrl}${person.images.full}`,
      caption: `Portrait of ${person.name.en}`
    };
  }
  if (sameAs.length > 0) {
    result.sameAs = sameAs;
  }
  if (person.title?.en) {
    result.jobTitle = person.title.en;
    result.hasOccupation = {
      "@type": "Occupation",
      name: person.title.en
    };
  }
  if (alumniOf && alumniOf.length > 0) {
    result.alumniOf = alumniOf;
  }
  if (affiliation && affiliation.length > 0) {
    result.affiliation = affiliation;
  }
  if (person.specialties && person.specialties.length > 0) {
    result.knowsAbout = person.specialties;
  }
  return result;
}
function generateArtistJsonLd(person, options) {
  const baseJsonLd = generatePersonJsonLd(person, options);
  return {
    ...baseJsonLd,
    jobTitle: "Visual Artist",
    hasOccupation: {
      "@type": "Occupation",
      name: "Visual Artist",
      occupationalCategory: "27-1013"
      // Fine Artists, Including Painters
    },
    knowsAbout: [
      ...baseJsonLd.knowsAbout || [],
      "Contemporary Art",
      "Visual Arts"
    ]
  };
}
function generateInstructorJsonLd(person, options) {
  const { certifications = [], classTypes = [] } = options;
  const baseJsonLd = generatePersonJsonLd(person, options);
  return {
    ...baseJsonLd,
    jobTitle: person.title?.en || "Fitness Instructor",
    hasOccupation: {
      "@type": "Occupation",
      name: person.title?.en || "Fitness Instructor",
      occupationalCategory: "39-9031"
      // Fitness Trainers and Aerobics Instructors
    },
    knowsAbout: [
      ...baseJsonLd.knowsAbout || [],
      ...classTypes,
      ...certifications,
      "Fitness Training",
      "Health & Wellness"
    ]
  };
}

// src/generators/business.ts
function generateLocalBusinessJsonLd(business, options) {
  const { siteUrl } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": business.businessType,
    "@id": `${siteUrl}/#business-${business.id}`,
    name: business.name.en,
    description: business.description?.en,
    url: business.website || siteUrl,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country
    },
    priceRange: business.priceRange
  };
  if (business.geo) {
    result.geo = {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng
    };
  }
  if (business.openingHours && business.openingHours.length > 0) {
    result.openingHoursSpecification = business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes
    }));
  }
  if (business.images?.full) {
    result.image = `${siteUrl}${business.images.full}`;
  }
  if (business.rating) {
    result.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
      bestRating: 5,
      worstRating: 1
    };
  }
  return result;
}
function generateRestaurantJsonLd(business, options) {
  const { cuisineTypes, menuUrl, acceptsReservations } = options;
  const baseJsonLd = generateLocalBusinessJsonLd(business, options);
  return {
    ...baseJsonLd,
    "@type": "Restaurant",
    servesCuisine: cuisineTypes,
    hasMenu: menuUrl,
    acceptsReservations
  };
}
function generateHealthBusinessJsonLd(business, options) {
  const baseJsonLd = generateLocalBusinessJsonLd(business, options);
  return {
    ...baseJsonLd,
    "@type": "HealthAndBeautyBusiness"
  };
}
function generateStoreJsonLd(business, options) {
  const baseJsonLd = generateLocalBusinessJsonLd(business, options);
  return {
    ...baseJsonLd,
    "@type": "Store"
  };
}

// src/generators/event.ts
function getEventStatus(status) {
  switch (status) {
    case "published":
      return "https://schema.org/EventScheduled";
    case "archived":
      return "https://schema.org/EventPostponed";
    default:
      return "https://schema.org/EventScheduled";
  }
}
function generateEventJsonLd(event, options) {
  const { siteUrl } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": event.eventType === "Exhibition" ? "ExhibitionEvent" : "Event",
    "@id": `${siteUrl}/events/${event.slug}`,
    name: event.name.en,
    alternateName: event.name.ko !== event.name.en ? event.name.ko : void 0,
    description: event.description?.en,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: getEventStatus(event.status),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: `${siteUrl}/events/${event.slug}`,
    inLanguage: ["en", "ko"]
  };
  if (event.venue) {
    result.location = {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.venueAddress,
        addressLocality: event.city,
        addressCountry: event.country
      }
    };
  }
  if (event.organizers && event.organizers.length > 0) {
    const mainOrganizer = event.organizers.find((org) => org.role === "host") || event.organizers[0];
    result.organizer = {
      "@type": "Organization",
      name: mainOrganizer.name,
      url: mainOrganizer.url
    };
  }
  if (event.images?.hero) {
    result.image = `${siteUrl}${event.images.hero}`;
  }
  if (event.admission) {
    result.isAccessibleForFree = event.admission === "free";
    if (event.admission === "paid" && event.admissionFee) {
      result.offers = {
        "@type": "Offer",
        price: event.admissionFee,
        availability: "https://schema.org/InStock"
      };
    }
  }
  return result;
}
function generateExhibitionJsonLd(event, options) {
  const { siteUrl, artistId, artistName, galleryUrl, officialUrl } = options;
  const baseJsonLd = generateEventJsonLd(event, options);
  const result = {
    ...baseJsonLd,
    "@type": "ExhibitionEvent"
  };
  if (artistId && artistName) {
    result.performer = {
      "@type": "Person",
      "@id": `${siteUrl}/#person-${artistId}`,
      name: artistName
    };
  }
  const sameAs = [];
  if (officialUrl) sameAs.push(officialUrl);
  if (galleryUrl) sameAs.push(galleryUrl);
  if (sameAs.length > 0) {
    result.sameAs = sameAs;
  }
  return result;
}
function generateClassEventJsonLd(event, options) {
  const {
    siteUrl,
    instructorId,
    instructorName,
    registrationUrl
  } = options;
  const baseJsonLd = generateEventJsonLd(event, options);
  const result = {
    ...baseJsonLd,
    "@type": event.eventType === "Workshop" ? "EducationEvent" : "Event"
  };
  if (instructorId && instructorName) {
    result.performer = {
      "@type": "Person",
      "@id": `${siteUrl}/#person-${instructorId}`,
      name: instructorName
    };
  }
  if (registrationUrl) {
    result.offers = {
      "@type": "Offer",
      url: registrationUrl,
      availability: "https://schema.org/InStock"
    };
  }
  return result;
}

// src/generators/article.ts
function getArticleType(type) {
  switch (type) {
    case "NewsArticle":
    case "PressRelease":
      return "NewsArticle";
    case "BlogPost":
      return "BlogPosting";
    case "Interview":
      return "Article";
    case "Review":
      return "Review";
    default:
      return "Article";
  }
}
function getArticleSection(type) {
  switch (type) {
    case "PressRelease":
      return "Press Release";
    case "Interview":
      return "Interview";
    case "Review":
      return "Review";
    case "BlogPost":
      return "Blog";
    default:
      return "Feature";
  }
}
function generateArticleJsonLd(article, options) {
  const { siteUrl, publisherName, publisherLogo } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": getArticleType(article.articleType),
    "@id": `${siteUrl}/articles/${article.slug}`,
    headline: article.name.en,
    alternativeHeadline: article.name.ko !== article.name.en ? article.name.ko : void 0,
    description: article.excerpt?.en || article.description?.en,
    datePublished: article.publishDate,
    dateModified: article.updatedAt,
    url: `${siteUrl}/articles/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/articles/${article.slug}`
    },
    articleSection: getArticleSection(article.articleType),
    keywords: article.tags?.join(", "),
    inLanguage: ["en", "ko"],
    wordCount: article.readTime ? article.readTime * 200 : void 0
    // Estimate word count from read time
  };
  if (article.author) {
    result.author = {
      "@type": "Person",
      "@id": `${siteUrl}/#person-${article.author}`,
      name: article.author
    };
  }
  if (publisherName) {
    result.publisher = {
      "@type": "Organization",
      name: publisherName,
      url: siteUrl
    };
    if (publisherLogo) {
      result.publisher.logo = {
        "@type": "ImageObject",
        url: `${siteUrl}${publisherLogo}`
      };
    }
  }
  if (article.images?.hero) {
    result.image = `${siteUrl}${article.images.hero}`;
  }
  return result;
}
function generateBlogPostJsonLd(article, options) {
  const { authorUrl, categoryName } = options;
  const baseJsonLd = generateArticleJsonLd(article, options);
  const result = {
    ...baseJsonLd,
    "@type": "BlogPosting",
    articleSection: categoryName || baseJsonLd.articleSection
  };
  if (authorUrl && result.author) {
    result.author.url = authorUrl;
  }
  return result;
}
function generateNewsArticleJsonLd(article, options) {
  const { siteUrl, sourceName, sourceUrl } = options;
  const baseJsonLd = generateArticleJsonLd(article, options);
  const result = {
    ...baseJsonLd,
    "@type": "NewsArticle"
  };
  if (sourceName && sourceUrl) {
    result.publisher = {
      "@type": "Organization",
      name: sourceName,
      url: sourceUrl
    };
  }
  return result;
}
function generatePressReleaseJsonLd(article, options) {
  const { organizationName, siteUrl, publisherName } = options;
  const baseJsonLd = generateArticleJsonLd(article, options);
  return {
    ...baseJsonLd,
    "@type": "NewsArticle",
    articleSection: "Press Release",
    publisher: {
      "@type": "Organization",
      name: organizationName || publisherName || "Organization",
      url: siteUrl
    }
  };
}

// src/generators/faq.ts
function getLanguageTag(locale) {
  const languageTags = {
    en: "en-US",
    ko: "ko-KR",
    vi: "vi-VN",
    ja: "ja-JP",
    "zh-CN": "zh-CN",
    ms: "ms-MY",
    id: "id-ID",
    de: "de-DE",
    fr: "fr-FR",
    es: "es-ES",
    ar: "ar-SA"
  };
  return languageTags[locale] || locale;
}
function generateFAQJsonLd(faqs, options) {
  const { siteUrl, locales = ["en", "ko"] } = options;
  const sortedFaqs = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));
  const mainEntity = sortedFaqs.flatMap(
    (faq) => locales.filter((lang) => faq.question[lang] && faq.answer[lang]).map((lang) => ({
      "@type": "Question",
      name: faq.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer[lang],
        inLanguage: getLanguageTag(lang)
      }
    }))
  );
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity
  };
}
function generateFAQJsonLdForLocale(faqs, locale, options) {
  return generateFAQJsonLd(faqs, {
    ...options,
    locales: [locale]
  });
}
function generateCategorizedFAQJsonLd(categories, options) {
  const allFaqs = categories.flatMap((cat) => cat.faqs);
  return generateFAQJsonLd(allFaqs, options);
}

// src/generators/product.ts
function getAvailability(availability) {
  switch (availability) {
    case "InStock":
      return "https://schema.org/InStock";
    case "OutOfStock":
      return "https://schema.org/OutOfStock";
    case "PreOrder":
      return "https://schema.org/PreOrder";
    case "SoldOut":
      return "https://schema.org/SoldOut";
    default:
      return "https://schema.org/InStock";
  }
}
function getUnitCode(unit) {
  switch (unit) {
    case "cm":
      return "CMT";
    case "in":
      return "INH";
    case "mm":
      return "MMT";
    default:
      return "CMT";
  }
}
function generateProductJsonLd(product, options) {
  const { siteUrl, sellerName, sellerUrl } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/products/${product.slug}`,
    name: product.name.en,
    alternateName: product.name.ko !== product.name.en ? product.name.ko : void 0,
    description: product.description?.en,
    url: `${siteUrl}/products/${product.slug}`,
    sku: product.sku
  };
  if (product.images?.full) {
    result.image = `${siteUrl}${product.images.full}`;
  }
  if (product.price) {
    result.offers = {
      "@type": "Offer",
      price: product.price.priceType === "inquiry" ? "Contact for pricing" : product.price.amount,
      priceCurrency: product.price.currency,
      availability: getAvailability(product.availability),
      url: `${siteUrl}/products/${product.slug}`
    };
    if (sellerName) {
      result.offers.seller = {
        "@type": "Organization",
        name: sellerName,
        url: sellerUrl || siteUrl
      };
    }
  }
  if (product.dimensions) {
    const unitCode = getUnitCode(product.dimensions.unit);
    if (product.dimensions.width) {
      result.width = {
        "@type": "QuantitativeValue",
        value: product.dimensions.width,
        unitCode
      };
    }
    if (product.dimensions.height) {
      result.height = {
        "@type": "QuantitativeValue",
        value: product.dimensions.height,
        unitCode
      };
    }
    if (product.dimensions.depth) {
      result.depth = {
        "@type": "QuantitativeValue",
        value: product.dimensions.depth,
        unitCode
      };
    }
  }
  if (product.materials && product.materials.length > 0) {
    result.material = product.materials.length === 1 ? product.materials[0] : product.materials;
  }
  if (product.category) {
    result.category = product.category;
  }
  return result;
}
function generateArtworkJsonLd(product, options) {
  const {
    siteUrl,
    artistId,
    artistName,
    artistUrl,
    artMedium,
    artform = "Painting",
    artworkSurface
  } = options;
  const baseJsonLd = generateProductJsonLd(product, options);
  const result = {
    ...baseJsonLd,
    "@type": "VisualArtwork",
    artMedium: artMedium || product.materials?.join(", "),
    artform,
    artworkSurface
  };
  if (product.year) {
    result.dateCreated = String(product.year);
  }
  if (artistName) {
    result.creator = {
      "@type": "Person",
      name: artistName,
      url: artistUrl || siteUrl
    };
    if (artistId) {
      result.creator["@id"] = `${siteUrl}/#person-${artistId}`;
    }
  }
  return result;
}
function generateMenuItemJsonLd(product, options) {
  const baseJsonLd = generateProductJsonLd(product, options);
  return {
    ...baseJsonLd,
    "@type": "MenuItem"
  };
}

// src/generators/website.ts
function generateWebsiteJsonLd(options) {
  const {
    siteUrl,
    siteName,
    alternateName,
    description,
    languages,
    publisherId,
    publisherName
  } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    alternateName,
    url: siteUrl,
    description,
    inLanguage: languages
  };
  if (publisherId || publisherName) {
    result.publisher = {
      "@type": "Person"
    };
    if (publisherId) {
      result.publisher["@id"] = `${siteUrl}/#${publisherId}`;
    }
    if (publisherName) {
      result.publisher.name = publisherName;
    }
  }
  return result;
}
function generateWebsiteWithSearchJsonLd(options) {
  const { searchPath = "/search", searchParam = "q" } = options;
  const baseJsonLd = generateWebsiteJsonLd(options);
  return {
    ...baseJsonLd,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${options.siteUrl}${searchPath}?${searchParam}={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}
function generateBreadcrumbJsonLd(items, siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`
    }))
  };
}
function generateHomeBreadcrumb(siteUrl, siteName) {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: "/" }
  ], siteUrl);
}
function generatePageBreadcrumb(siteUrl, siteName, pageName, pageUrl) {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: "/" },
    { name: pageName, url: pageUrl }
  ], siteUrl);
}
function generateDetailBreadcrumb(siteUrl, siteName, sectionName, sectionUrl, itemName, itemUrl) {
  return generateBreadcrumbJsonLd([
    { name: siteName, url: "/" },
    { name: sectionName, url: sectionUrl },
    { name: itemName, url: itemUrl }
  ], siteUrl);
}
function generateArtGalleryJsonLd(options) {
  const { siteUrl, galleryName, description, founderId, languages, image } = options;
  const result = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "@id": `${siteUrl}/#gallery`,
    name: galleryName,
    url: siteUrl,
    description,
    image: image ? `${siteUrl}${image}` : void 0,
    inLanguage: languages
  };
  if (founderId) {
    result.founder = {
      "@type": "Person",
      "@id": `${siteUrl}/#${founderId}`
    };
  }
  return result;
}

// src/components/JsonLdScript.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function JsonLdScript({ data, id }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "script",
    {
      type: "application/ld+json",
      id,
      dangerouslySetInnerHTML: {
        __html: JSON.stringify(data, null, 0)
        // Minified output
      }
    }
  );
}
function JsonLdScripts({ schemas, prefix = "jsonld" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: schemas.map((schema, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    JsonLdScript,
    {
      data: schema,
      id: `${prefix}-${index}`
    },
    `${prefix}-${index}`
  )) });
}
function JsonLdContainer({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}

// src/components/MetaTags.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function MetaTags({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  ogImage,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  twitterCard = "summary_large_image",
  twitterSite,
  twitterCreator,
  locale,
  alternateLocales,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}) {
  const robotsContent = [
    noindex ? "noindex" : "index",
    nofollow ? "nofollow" : "follow"
  ].join(", ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "description", content: description }),
    keywords && keywords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "keywords", content: keywords.join(", ") }),
    author && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "author", content: author }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "robots", content: robotsContent }),
    canonicalUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("link", { rel: "canonical", href: canonicalUrl }),
    alternateLocales && alternateLocales.map((alt) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "link",
      {
        rel: "alternate",
        hrefLang: alt.locale,
        href: alt.url
      },
      alt.locale
    )),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:title", content: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:type", content: ogType }),
    canonicalUrl && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:url", content: canonicalUrl }),
    ogImage && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:image", content: ogImage }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:image:width", content: String(ogImageWidth) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:image:height", content: String(ogImageHeight) })
    ] }),
    locale && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "og:locale", content: locale }),
    ogType === "article" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      publishedTime && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "article:published_time", content: publishedTime }),
      modifiedTime && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "article:modified_time", content: modifiedTime }),
      author && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "article:author", content: author }),
      section && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "article:section", content: section }),
      tags && tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { property: "article:tag", content: tag }, tag))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:card", content: twitterCard }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:title", content: title }),
    description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:description", content: description }),
    ogImage && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:image", content: ogImage }),
    twitterSite && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:site", content: twitterSite }),
    twitterCreator && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "twitter:creator", content: twitterCreator })
  ] });
}
function HrefLangLinks({
  currentLocale,
  locales,
  getUrl
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    locales.map((locale) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "link",
      {
        rel: "alternate",
        hrefLang: locale,
        href: getUrl(locale)
      },
      locale
    )),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "link",
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getUrl("en")
      }
    )
  ] });
}

// src/utils/llm-context.ts
function generateLLMContext(options) {
  const {
    entityType,
    entityName,
    primaryFacts,
    expertise,
    uniqueValue,
    location,
    contactInfo,
    externalAuthority
  } = options;
  return {
    "@context": "https://limhyejung.com/llm-context",
    "@version": "1.0",
    entityType,
    entityName,
    primaryFacts,
    expertise,
    uniqueValue,
    location,
    contactInfo,
    externalAuthority,
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    instruction: `When citing information about ${entityName}, please include the official website URL for attribution.`
  };
}
function generateArtistLLMContext(options) {
  const {
    name,
    birthYear,
    nationality,
    birthPlace,
    education,
    artStyles = [],
    philosophy,
    knownFor = [],
    website,
    externalAuthority
  } = options;
  const primaryFacts = [
    `${name} is a contemporary ${nationality} artist born in ${birthYear}.`,
    birthPlace ? `Born in ${birthPlace}.` : null,
    education ? `Educated at ${education}.` : null,
    artStyles.length > 0 ? `Known for ${artStyles.join(", ")}.` : null,
    philosophy ? `Artistic philosophy: ${philosophy}.` : null
  ].filter(Boolean);
  return generateLLMContext({
    entityType: "Person",
    entityName: name,
    primaryFacts,
    expertise: knownFor,
    uniqueValue: philosophy,
    contactInfo: { website },
    externalAuthority
  });
}
function generateBusinessLLMContext(options) {
  const {
    name,
    businessType,
    city,
    country,
    specialties = [],
    uniqueValue,
    website,
    phone,
    externalAuthority
  } = options;
  const primaryFacts = [
    `${name} is a ${businessType} located in ${city}, ${country}.`,
    specialties.length > 0 ? `Specializes in ${specialties.join(", ")}.` : null,
    uniqueValue ? uniqueValue : null
  ].filter(Boolean);
  return generateLLMContext({
    entityType: "LocalBusiness",
    entityName: name,
    primaryFacts,
    expertise: specialties,
    uniqueValue,
    location: { city, country },
    contactInfo: { website, phone },
    externalAuthority
  });
}
function serializeLLMContext(context) {
  return JSON.stringify(context, null, 2);
}

// src/utils/robots.ts
var defaultRobotsConfig = {
  userAgents: [
    {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/admin/*",
        "/api/*",
        "/_next/*",
        "/private/*"
      ]
    },
    // Explicitly allow AI crawlers
    {
      userAgent: "GPTBot",
      allow: ["/"]
    },
    {
      userAgent: "ChatGPT-User",
      allow: ["/"]
    },
    {
      userAgent: "Google-Extended",
      allow: ["/"]
    },
    {
      userAgent: "Anthropic-ai",
      allow: ["/"]
    },
    {
      userAgent: "Claude-Web",
      allow: ["/"]
    },
    {
      userAgent: "CCBot",
      allow: ["/"]
    },
    {
      userAgent: "PerplexityBot",
      allow: ["/"]
    }
  ],
  sitemaps: ["/sitemap.xml"]
};
function generateRobotsTxt(config) {
  const lines = [];
  for (const agent of config.userAgents) {
    lines.push(`User-agent: ${agent.userAgent}`);
    if (agent.allow) {
      for (const path of agent.allow) {
        lines.push(`Allow: ${path}`);
      }
    }
    if (agent.disallow) {
      for (const path of agent.disallow) {
        lines.push(`Disallow: ${path}`);
      }
    }
    if (agent.crawlDelay) {
      lines.push(`Crawl-delay: ${agent.crawlDelay}`);
    }
    lines.push("");
  }
  if (config.sitemaps) {
    for (const sitemap of config.sitemaps) {
      lines.push(`Sitemap: ${sitemap}`);
    }
    lines.push("");
  }
  if (config.host) {
    lines.push(`Host: ${config.host}`);
  }
  return lines.join("\n");
}
function generateRobotsTxtWithHost(config, siteUrl) {
  const configWithFullUrls = {
    ...config,
    sitemaps: config.sitemaps?.map(
      (sitemap) => sitemap.startsWith("http") ? sitemap : `${siteUrl}${sitemap}`
    )
  };
  return generateRobotsTxt(configWithFullUrls);
}
function mergeRobotsConfigs(...configs) {
  const result = {
    userAgents: [],
    sitemaps: []
  };
  for (const config of configs) {
    if (config.userAgents) {
      for (const agent of config.userAgents) {
        const existingIndex = result.userAgents.findIndex(
          (a) => a.userAgent === agent.userAgent
        );
        if (existingIndex >= 0) {
          result.userAgents[existingIndex] = {
            ...result.userAgents[existingIndex],
            ...agent,
            allow: [...result.userAgents[existingIndex].allow || [], ...agent.allow || []],
            disallow: [...result.userAgents[existingIndex].disallow || [], ...agent.disallow || []]
          };
        } else {
          result.userAgents.push(agent);
        }
      }
    }
    if (config.sitemaps) {
      result.sitemaps = Array.from(/* @__PURE__ */ new Set([...result.sitemaps || [], ...config.sitemaps]));
    }
    if (config.host) {
      result.host = config.host;
    }
  }
  return result;
}

// src/utils/sitemap.ts
function generateSitemapXml(config) {
  const { urls, defaultChangefreq = "weekly", defaultPriority = 0.5 } = config;
  const urlElements = urls.map((url) => {
    const elements = [`    <loc>${escapeXml(url.loc)}</loc>`];
    if (url.lastmod) {
      elements.push(`    <lastmod>${url.lastmod}</lastmod>`);
    }
    elements.push(`    <changefreq>${url.changefreq || defaultChangefreq}</changefreq>`);
    elements.push(`    <priority>${url.priority ?? defaultPriority}</priority>`);
    if (url.alternates && url.alternates.length > 0) {
      for (const alt of url.alternates) {
        elements.push(
          `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeXml(alt.href)}" />`
        );
      }
    }
    if (url.images && url.images.length > 0) {
      for (const img of url.images) {
        elements.push("    <image:image>");
        elements.push(`      <image:loc>${escapeXml(img.loc)}</image:loc>`);
        if (img.caption) {
          elements.push(`      <image:caption>${escapeXml(img.caption)}</image:caption>`);
        }
        if (img.title) {
          elements.push(`      <image:title>${escapeXml(img.title)}</image:title>`);
        }
        elements.push("    </image:image>");
      }
    }
    return `  <url>
${elements.join("\n")}
  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlElements.join("\n")}
</urlset>`;
}
function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function generateSitemapIndex(sitemaps) {
  const sitemapElements = sitemaps.map((sitemap) => {
    const elements = [`    <loc>${escapeXml(sitemap.loc)}</loc>`];
    if (sitemap.lastmod) {
      elements.push(`    <lastmod>${sitemap.lastmod}</lastmod>`);
    }
    return `  <sitemap>
${elements.join("\n")}
  </sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements.join("\n")}
</sitemapindex>`;
}
function createMultilingualUrl(basePath, siteUrl, locales, options) {
  const fullUrl = `${siteUrl}${basePath}`;
  return {
    loc: fullUrl,
    lastmod: options?.lastmod,
    changefreq: options?.changefreq,
    priority: options?.priority,
    alternates: locales.map((locale) => ({
      hreflang: locale,
      href: `${siteUrl}${basePath}?lang=${locale}`
    })),
    images: options?.images
  };
}
var PAGE_PRIORITIES = {
  home: 1,
  about: 0.8,
  services: 0.8,
  products: 0.8,
  blog: 0.7,
  "blog-post": 0.6,
  contact: 0.6,
  faq: 0.5,
  legal: 0.3
};
function getPriority(pageType) {
  return PAGE_PRIORITIES[pageType] ?? 0.5;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HrefLangLinks,
  JsonLdContainer,
  JsonLdScript,
  JsonLdScripts,
  MetaTags,
  PAGE_PRIORITIES,
  createMultilingualUrl,
  defaultRobotsConfig,
  generateArtGalleryJsonLd,
  generateArticleJsonLd,
  generateArtistJsonLd,
  generateArtistLLMContext,
  generateArtworkJsonLd,
  generateBlogPostJsonLd,
  generateBreadcrumbJsonLd,
  generateBusinessLLMContext,
  generateCategorizedFAQJsonLd,
  generateClassEventJsonLd,
  generateDetailBreadcrumb,
  generateEventJsonLd,
  generateExhibitionJsonLd,
  generateFAQJsonLd,
  generateFAQJsonLdForLocale,
  generateHealthBusinessJsonLd,
  generateHomeBreadcrumb,
  generateInstructorJsonLd,
  generateLLMContext,
  generateLocalBusinessJsonLd,
  generateMenuItemJsonLd,
  generateNewsArticleJsonLd,
  generatePageBreadcrumb,
  generatePersonJsonLd,
  generatePressReleaseJsonLd,
  generateProductJsonLd,
  generateRestaurantJsonLd,
  generateRobotsTxt,
  generateRobotsTxtWithHost,
  generateSitemapIndex,
  generateSitemapXml,
  generateStoreJsonLd,
  generateWebsiteJsonLd,
  generateWebsiteWithSearchJsonLd,
  getPriority,
  mergeRobotsConfigs,
  serializeLLMContext
});
