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

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  Badge: () => Badge,
  Button: () => Button,
  KpiCard: () => KpiCard
});
module.exports = __toCommonJS(index_exports);

// src/atoms/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
};
var sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};
function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  disabled,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      className: `
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `,
      disabled: disabled || isLoading,
      ...props,
      children: [
        isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "animate-spin h-4 w-4\\", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              className: "opacity-75",
              fill: "currentColor",
              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            }
          )
        ] }) : leftIcon,
        children,
        !isLoading && rightIcon
      ]
    }
  );
}

// src/atoms/Badge.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var variantStyles2 = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-cyan-100 text-cyan-700"
};
var sizeStyles2 = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm"
};
function Badge({
  variant = "default",
  size = "sm",
  children,
  className = ""
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "span",
    {
      className: `
        inline-flex items-center font-medium rounded-full
        ${variantStyles2[variant]}
        ${sizeStyles2[size]}
        ${className}
      `,
      children
    }
  );
}

// src/molecules/KpiCard.tsx
var import_core = require("@cgos/core");
var import_jsx_runtime3 = require("react/jsx-runtime");
function KpiCard({
  title,
  value,
  change,
  changeLabel,
  format = "number",
  icon,
  className = ""
}) {
  const formatValue = (val) => {
    if (typeof val === "string") return val;
    switch (format) {
      case "currency":
        return (0, import_core.formatCurrency)(val);
      case "percent":
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `bg-white rounded-xl border border-gray-200 p-6 ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm font-medium text-gray-500 mb-1", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-2xl font-bold text-gray-900", children: formatValue(value) }),
      change !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1 mt-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "span",
          {
            className: `text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`,
            children: [
              change >= 0 ? "+" : "",
              change,
              "%"
            ]
          }
        ),
        changeLabel && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-gray-500", children: changeLabel })
      ] })
    ] }),
    icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "p-3 bg-blue-50 rounded-lg text-blue-600", children: icon })
  ] }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Badge,
  Button,
  KpiCard
});
