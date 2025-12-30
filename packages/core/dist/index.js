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
  INDUSTRIES: () => INDUSTRIES,
  RFM_LABELS: () => RFM_LABELS,
  THEME_PRESETS: () => THEME_PRESETS,
  formatCurrency: () => formatCurrency,
  formatDate: () => formatDate,
  formatRelativeTime: () => formatRelativeTime,
  generateSlug: () => generateSlug,
  getLocalizedText: () => getLocalizedText,
  truncateText: () => truncateText
});
module.exports = __toCommonJS(index_exports);
function formatCurrency(amount, currency = "KRW") {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(amount);
}
function formatDate(date, locale = "ko-KR") {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(d);
}
function formatRelativeTime(date, locale = "ko-KR") {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = /* @__PURE__ */ new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1e3);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "seconds");
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), "minutes");
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), "hours");
  if (diffInSeconds < 2592e3) return rtf.format(-Math.floor(diffInSeconds / 86400), "days");
  if (diffInSeconds < 31536e3) return rtf.format(-Math.floor(diffInSeconds / 2592e3), "months");
  return rtf.format(-Math.floor(diffInSeconds / 31536e3), "years");
}
function generateSlug(text) {
  return text.toLowerCase().trim().replace(/[^\w\s가-힣-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
function getLocalizedText(text, locale = "ko") {
  if (typeof text === "string") return text;
  return text[locale] || text.ko || text.en || "";
}
var INDUSTRIES = {
  artist: { label: { en: "Artist", ko: "\uC544\uD2F0\uC2A4\uD2B8" }, icon: "palette" },
  pilates: { label: { en: "Pilates/Yoga", ko: "\uD544\uB77C\uD14C\uC2A4/\uC694\uAC00" }, icon: "activity" },
  petcare: { label: { en: "Pet Care", ko: "\uD3AB\uCF00\uC5B4" }, icon: "heart" },
  ecommerce: { label: { en: "E-commerce", ko: "\uC774\uCEE4\uBA38\uC2A4" }, icon: "shopping-cart" },
  restaurant: { label: { en: "Restaurant", ko: "\uB808\uC2A4\uD1A0\uB791" }, icon: "utensils" },
  education: { label: { en: "Education", ko: "\uAD50\uC721" }, icon: "book-open" },
  medical: { label: { en: "Medical", ko: "\uC758\uB8CC" }, icon: "stethoscope" },
  realestate: { label: { en: "Real Estate", ko: "\uBD80\uB3D9\uC0B0" }, icon: "home" },
  legal: { label: { en: "Legal", ko: "\uBC95\uB960" }, icon: "scale" }
};
var RFM_LABELS = {
  champions: { label: { en: "Champions", ko: "\uCC54\uD53C\uC5B8" }, color: "#22C55E" },
  loyal: { label: { en: "Loyal", ko: "\uCDA9\uC131" }, color: "#3B82F6" },
  potential: { label: { en: "Potential", ko: "\uC7A0\uC7AC" }, color: "#8B5CF6" },
  new: { label: { en: "New", ko: "\uC2E0\uADDC" }, color: "#06B6D4" },
  at_risk: { label: { en: "At Risk", ko: "\uC704\uD5D8" }, color: "#F59E0B" },
  dormant: { label: { en: "Dormant", ko: "\uD734\uBA74" }, color: "#EF4444" }
};
var THEME_PRESETS = {
  minimal: {
    colors: {
      primary: "#1F2937",
      secondary: "#6B7280",
      accent: "#3B82F6",
      background: "#FFFFFF",
      text: "#111827"
    }
  },
  bold: {
    colors: {
      primary: "#7C3AED",
      secondary: "#A78BFA",
      accent: "#EC4899",
      background: "#0F172A",
      text: "#F8FAFC"
    }
  },
  elegant: {
    colors: {
      primary: "#78716C",
      secondary: "#A8A29E",
      accent: "#D4AF37",
      background: "#FAFAF9",
      text: "#292524"
    }
  },
  wellness: {
    colors: {
      primary: "#8B7355",
      secondary: "#A3BE8C",
      accent: "#B48EAD",
      background: "#ECEFF4",
      text: "#2E3440"
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  INDUSTRIES,
  RFM_LABELS,
  THEME_PRESETS,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  generateSlug,
  getLocalizedText,
  truncateText
});
