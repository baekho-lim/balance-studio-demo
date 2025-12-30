"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/@swc+helpers@0.5.2/node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require_interop_require_default = __commonJS({
  "../../node_modules/.pnpm/@swc+helpers@0.5.2/node_modules/@swc/helpers/cjs/_interop_require_default.cjs"(exports2) {
    "use strict";
    exports2._ = exports2._interop_require_default = _interop_require_default;
    function _interop_require_default(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/querystring.js
var require_querystring = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/querystring.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
      },
      urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
      },
      assign: function() {
        return assign;
      }
    });
    function searchParamsToUrlQuery(searchParams) {
      const query = {};
      searchParams.forEach((value, key) => {
        if (typeof query[key] === "undefined") {
          query[key] = value;
        } else if (Array.isArray(query[key])) {
          query[key].push(value);
        } else {
          query[key] = [
            query[key],
            value
          ];
        }
      });
      return query;
    }
    function stringifyUrlQueryParam(param) {
      if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
        return String(param);
      } else {
        return "";
      }
    }
    function urlQueryToSearchParams(urlQuery) {
      const result = new URLSearchParams();
      Object.entries(urlQuery).forEach((param) => {
        let [key, value] = param;
        if (Array.isArray(value)) {
          value.forEach((item) => result.append(key, stringifyUrlQueryParam(item)));
        } else {
          result.set(key, stringifyUrlQueryParam(value));
        }
      });
      return result;
    }
    function assign(target) {
      for (var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        searchParamsList[_key - 1] = arguments[_key];
      }
      searchParamsList.forEach((searchParams) => {
        Array.from(searchParams.keys()).forEach((key) => target.delete(key));
        searchParams.forEach((value, key) => target.append(key, value));
      });
      return target;
    }
  }
});

// ../../node_modules/.pnpm/@swc+helpers@0.5.2/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require_interop_require_wildcard = __commonJS({
  "../../node_modules/.pnpm/@swc+helpers@0.5.2/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"(exports2) {
    "use strict";
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    exports2._ = exports2._interop_require_wildcard = _interop_require_wildcard;
    function _interop_require_wildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) return obj;
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
          else newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      if (cache) cache.set(obj, newObj);
      return newObj;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/format-url.js
var require_format_url = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/format-url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      formatUrl: function() {
        return formatUrl;
      },
      urlObjectKeys: function() {
        return urlObjectKeys;
      },
      formatWithValidation: function() {
        return formatWithValidation;
      }
    });
    var _interop_require_wildcard = require_interop_require_wildcard();
    var _querystring = /* @__PURE__ */ _interop_require_wildcard._(require_querystring());
    var slashedProtocols = /https?|ftp|gopher|file/;
    function formatUrl(urlObj) {
      let { auth, hostname } = urlObj;
      let protocol = urlObj.protocol || "";
      let pathname = urlObj.pathname || "";
      let hash = urlObj.hash || "";
      let query = urlObj.query || "";
      let host = false;
      auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
      if (urlObj.host) {
        host = auth + urlObj.host;
      } else if (hostname) {
        host = auth + (~hostname.indexOf(":") ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
          host += ":" + urlObj.port;
        }
      }
      if (query && typeof query === "object") {
        query = String(_querystring.urlQueryToSearchParams(query));
      }
      let search = urlObj.search || query && "?" + query || "";
      if (protocol && !protocol.endsWith(":")) protocol += ":";
      if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
      } else if (!host) {
        host = "";
      }
      if (hash && hash[0] !== "#") hash = "#" + hash;
      if (search && search[0] !== "?") search = "?" + search;
      pathname = pathname.replace(/[?#]/g, encodeURIComponent);
      search = search.replace("#", "%23");
      return "" + protocol + host + pathname + search + hash;
    }
    var urlObjectKeys = [
      "auth",
      "hash",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "slashes"
    ];
    function formatWithValidation(url) {
      if (process.env.NODE_ENV === "development") {
        if (url !== null && typeof url === "object") {
          Object.keys(url).forEach((key) => {
            if (!urlObjectKeys.includes(key)) {
              console.warn("Unknown key passed via urlObject into url.format: " + key);
            }
          });
        }
      }
      return formatUrl(url);
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/omit.js
var require_omit = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/omit.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "omit", {
      enumerable: true,
      get: function() {
        return omit;
      }
    });
    function omit(object, keys) {
      const omitted = {};
      Object.keys(object).forEach((key) => {
        if (!keys.includes(key)) {
          omitted[key] = object[key];
        }
      });
      return omitted;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      WEB_VITALS: function() {
        return WEB_VITALS;
      },
      execOnce: function() {
        return execOnce;
      },
      isAbsoluteUrl: function() {
        return isAbsoluteUrl;
      },
      getLocationOrigin: function() {
        return getLocationOrigin;
      },
      getURL: function() {
        return getURL;
      },
      getDisplayName: function() {
        return getDisplayName;
      },
      isResSent: function() {
        return isResSent;
      },
      normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
      },
      loadGetInitialProps: function() {
        return loadGetInitialProps;
      },
      SP: function() {
        return SP;
      },
      ST: function() {
        return ST;
      },
      DecodeError: function() {
        return DecodeError;
      },
      NormalizeError: function() {
        return NormalizeError;
      },
      PageNotFoundError: function() {
        return PageNotFoundError;
      },
      MissingStaticPage: function() {
        return MissingStaticPage;
      },
      MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
      },
      stringifyError: function() {
        return stringifyError;
      }
    });
    var WEB_VITALS = [
      "CLS",
      "FCP",
      "FID",
      "INP",
      "LCP",
      "TTFB"
    ];
    function execOnce(fn) {
      let used = false;
      let result;
      return function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (!used) {
          used = true;
          result = fn(...args);
        }
        return result;
      };
    }
    var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
    var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
    function getLocationOrigin() {
      const { protocol, hostname, port } = window.location;
      return protocol + "//" + hostname + (port ? ":" + port : "");
    }
    function getURL() {
      const { href } = window.location;
      const origin = getLocationOrigin();
      return href.substring(origin.length);
    }
    function getDisplayName(Component) {
      return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
    }
    function isResSent(res) {
      return res.finished || res.headersSent;
    }
    function normalizeRepeatedSlashes(url) {
      const urlParts = url.split("?");
      const urlNoQuery = urlParts[0];
      return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? "?" + urlParts.slice(1).join("?") : "");
    }
    async function loadGetInitialProps(App, ctx) {
      if (process.env.NODE_ENV !== "production") {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
          const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
          throw new Error(message);
        }
      }
      const res = ctx.res || ctx.ctx && ctx.ctx.res;
      if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
          return {
            pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
          };
        }
        return {};
      }
      const props = await App.getInitialProps(ctx);
      if (res && isResSent(res)) {
        return props;
      }
      if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw new Error(message);
      }
      if (process.env.NODE_ENV !== "production") {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
          console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
      }
      return props;
    }
    var SP = typeof performance !== "undefined";
    var ST = SP && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((method) => typeof performance[method] === "function");
    var DecodeError = class extends Error {
    };
    var NormalizeError = class extends Error {
    };
    var PageNotFoundError = class extends Error {
      constructor(page) {
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = "Cannot find module for page: " + page;
      }
    };
    var MissingStaticPage = class extends Error {
      constructor(page, message) {
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
      }
    };
    var MiddlewareNotFoundError = class extends Error {
      constructor() {
        super();
        this.code = "ENOENT";
        this.message = "Cannot find the middleware module";
      }
    };
    function stringifyError(error) {
      return JSON.stringify({
        message: error.message,
        stack: error.stack
      });
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js
var require_remove_trailing_slash = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "removeTrailingSlash", {
      enumerable: true,
      get: function() {
        return removeTrailingSlash;
      }
    });
    function removeTrailingSlash(route) {
      return route.replace(/\/$/, "") || "/";
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/parse-path.js
var require_parse_path = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/parse-path.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "parsePath", {
      enumerable: true,
      get: function() {
        return parsePath;
      }
    });
    function parsePath(path) {
      const hashIndex = path.indexOf("#");
      const queryIndex = path.indexOf("?");
      const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
      if (hasQuery || hashIndex > -1) {
        return {
          pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
          query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : void 0) : "",
          hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
      }
      return {
        pathname: path,
        query: "",
        hash: ""
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/normalize-trailing-slash.js
var require_normalize_trailing_slash = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/normalize-trailing-slash.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "normalizePathTrailingSlash", {
      enumerable: true,
      get: function() {
        return normalizePathTrailingSlash;
      }
    });
    var _removetrailingslash = require_remove_trailing_slash();
    var _parsepath = require_parse_path();
    var normalizePathTrailingSlash = (path) => {
      if (!path.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
        return path;
      }
      const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
      if (process.env.__NEXT_TRAILING_SLASH) {
        if (/\.[^/]+\/?$/.test(pathname)) {
          return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
        } else if (pathname.endsWith("/")) {
          return "" + pathname + query + hash;
        } else {
          return pathname + "/" + query + hash;
        }
      }
      return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
    };
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js
var require_path_has_prefix = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "pathHasPrefix", {
      enumerable: true,
      get: function() {
        return pathHasPrefix;
      }
    });
    var _parsepath = require_parse_path();
    function pathHasPrefix(path, prefix) {
      if (typeof path !== "string") {
        return false;
      }
      const { pathname } = (0, _parsepath.parsePath)(path);
      return pathname === prefix || pathname.startsWith(prefix + "/");
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/has-base-path.js
var require_has_base_path = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/has-base-path.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "hasBasePath", {
      enumerable: true,
      get: function() {
        return hasBasePath;
      }
    });
    var _pathhasprefix = require_path_has_prefix();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function hasBasePath(path) {
      return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/is-local-url.js
var require_is_local_url = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/is-local-url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "isLocalURL", {
      enumerable: true,
      get: function() {
        return isLocalURL;
      }
    });
    var _utils = require_utils();
    var _hasbasepath = require_has_base_path();
    function isLocalURL(url) {
      if (!(0, _utils.isAbsoluteUrl)(url)) return true;
      try {
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
      } catch (_) {
        return false;
      }
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js
var require_sorted_routes = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "getSortedRoutes", {
      enumerable: true,
      get: function() {
        return getSortedRoutes;
      }
    });
    var UrlNode = class _UrlNode {
      insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(prefix) {
        if (prefix === void 0) prefix = "/";
        const childrenPaths = [
          ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
          childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c) => this.children.get(c)._smoosh("" + prefix + c + "/")).reduce((prev, curr) => [
          ...prev,
          ...curr
        ], []);
        if (this.slugName !== null) {
          routes.push(...this.children.get("[]")._smoosh(prefix + "[" + this.slugName + "]/"));
        }
        if (!this.placeholder) {
          const r = prefix === "/" ? "/" : prefix.slice(0, -1);
          if (this.optionalRestSlugName != null) {
            throw new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + r + '" and "' + r + "[[..." + this.optionalRestSlugName + ']]").');
          }
          routes.unshift(r);
        }
        if (this.restSlugName !== null) {
          routes.push(...this.children.get("[...]")._smoosh(prefix + "[..." + this.restSlugName + "]/"));
        }
        if (this.optionalRestSlugName !== null) {
          routes.push(...this.children.get("[[...]]")._smoosh(prefix + "[[..." + this.optionalRestSlugName + "]]/"));
        }
        return routes;
      }
      _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
          this.placeholder = false;
          return;
        }
        if (isCatchAll) {
          throw new Error("Catch-all must be the last part of the URL.");
        }
        let nextSegment = urlPaths[0];
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
          let handleSlug = function(previousSlug, nextSlug) {
            if (previousSlug !== null) {
              if (previousSlug !== nextSlug) {
                throw new Error("You cannot use different slug names for the same dynamic path ('" + previousSlug + "' !== '" + nextSlug + "').");
              }
            }
            slugNames.forEach((slug) => {
              if (slug === nextSlug) {
                throw new Error('You cannot have the same slug name "' + nextSlug + '" repeat within a single dynamic path');
              }
              if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                throw new Error('You cannot have the slug names "' + slug + '" and "' + nextSlug + '" differ only by non-word symbols within a single dynamic path');
              }
            });
            slugNames.push(nextSlug);
          };
          let segmentName = nextSegment.slice(1, -1);
          let isOptional = false;
          if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
            segmentName = segmentName.slice(1, -1);
            isOptional = true;
          }
          if (segmentName.startsWith("...")) {
            segmentName = segmentName.substring(3);
            isCatchAll = true;
          }
          if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
            throw new Error("Segment names may not start or end with extra brackets ('" + segmentName + "').");
          }
          if (segmentName.startsWith(".")) {
            throw new Error("Segment names may not start with erroneous periods ('" + segmentName + "').");
          }
          if (isCatchAll) {
            if (isOptional) {
              if (this.restSlugName != null) {
                throw new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + urlPaths[0] + '" ).');
              }
              handleSlug(this.optionalRestSlugName, segmentName);
              this.optionalRestSlugName = segmentName;
              nextSegment = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null) {
                throw new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + urlPaths[0] + '").');
              }
              handleSlug(this.restSlugName, segmentName);
              this.restSlugName = segmentName;
              nextSegment = "[...]";
            }
          } else {
            if (isOptional) {
              throw new Error('Optional route parameters are not yet supported ("' + urlPaths[0] + '").');
            }
            handleSlug(this.slugName, segmentName);
            this.slugName = segmentName;
            nextSegment = "[]";
          }
        }
        if (!this.children.has(nextSegment)) {
          this.children.set(nextSegment, new _UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
      }
      constructor() {
        this.placeholder = true;
        this.children = /* @__PURE__ */ new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
      }
    };
    function getSortedRoutes(normalizedPages) {
      const root = new UrlNode();
      normalizedPages.forEach((pagePath) => root.insert(pagePath));
      return root.smoosh();
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
var require_ensure_leading_slash = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "ensureLeadingSlash", {
      enumerable: true,
      get: function() {
        return ensureLeadingSlash;
      }
    });
    function ensureLeadingSlash(path) {
      return path.startsWith("/") ? path : "/" + path;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/segment.js
var require_segment = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/segment.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "isGroupSegment", {
      enumerable: true,
      get: function() {
        return isGroupSegment;
      }
    });
    function isGroupSegment(segment) {
      return segment[0] === "(" && segment.endsWith(")");
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/app-paths.js
var require_app_paths = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/app-paths.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      normalizeAppPath: function() {
        return normalizeAppPath;
      },
      normalizeRscURL: function() {
        return normalizeRscURL;
      }
    });
    var _ensureleadingslash = require_ensure_leading_slash();
    var _segment = require_segment();
    function normalizeAppPath(route) {
      return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments) => {
        if (!segment) {
          return pathname;
        }
        if ((0, _segment.isGroupSegment)(segment)) {
          return pathname;
        }
        if (segment[0] === "@") {
          return pathname;
        }
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
          return pathname;
        }
        return pathname + "/" + segment;
      }, ""));
    }
    function normalizeRscURL(url) {
      return url.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/helpers/interception-routes.js
var require_interception_routes = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/helpers/interception-routes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
      },
      isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
      },
      extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
      }
    });
    var _apppaths = require_app_paths();
    var INTERCEPTION_ROUTE_MARKERS = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function isInterceptionRouteAppPath(path) {
      return path.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== void 0;
    }
    function extractInterceptionRouteInformation(path) {
      let interceptingRoute, marker, interceptedRoute;
      for (const segment of path.split("/")) {
        marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
        if (marker) {
          [interceptingRoute, interceptedRoute] = path.split(marker, 2);
          break;
        }
      }
      if (!interceptingRoute || !marker || !interceptedRoute) {
        throw new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
      }
      interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
      switch (marker) {
        case "(.)":
          if (interceptingRoute === "/") {
            interceptedRoute = `/${interceptedRoute}`;
          } else {
            interceptedRoute = interceptingRoute + "/" + interceptedRoute;
          }
          break;
        case "(..)":
          if (interceptingRoute === "/") {
            throw new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`);
          }
          interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
          break;
        case "(...)":
          interceptedRoute = "/" + interceptedRoute;
          break;
        case "(..)(..)":
          const splitInterceptingRoute = interceptingRoute.split("/");
          if (splitInterceptingRoute.length <= 2) {
            throw new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`);
          }
          interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
          break;
        default:
          throw new Error("Invariant: unexpected marker");
      }
      return {
        interceptingRoute,
        interceptedRoute
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js
var require_is_dynamic = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "isDynamicRoute", {
      enumerable: true,
      get: function() {
        return isDynamicRoute;
      }
    });
    var _interceptionroutes = require_interception_routes();
    var TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
    function isDynamicRoute(route) {
      if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
      }
      return TEST_ROUTE.test(route);
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/index.js
var require_utils2 = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
      },
      isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
      }
    });
    var _sortedroutes = require_sorted_routes();
    var _isdynamic = require_is_dynamic();
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/route-matcher.js
var require_route_matcher = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/route-matcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "getRouteMatcher", {
      enumerable: true,
      get: function() {
        return getRouteMatcher;
      }
    });
    var _utils = require_utils();
    function getRouteMatcher(param) {
      let { re, groups } = param;
      return (pathname) => {
        const routeMatch = re.exec(pathname);
        if (!routeMatch) {
          return false;
        }
        const decode = (param2) => {
          try {
            return decodeURIComponent(param2);
          } catch (_) {
            throw new _utils.DecodeError("failed to decode param");
          }
        };
        const params = {};
        Object.keys(groups).forEach((slugName) => {
          const g = groups[slugName];
          const m = routeMatch[g.pos];
          if (m !== void 0) {
            params[slugName] = ~m.indexOf("/") ? m.split("/").map((entry) => decode(entry)) : g.repeat ? [
              decode(m)
            ] : decode(m);
          }
        });
        return params;
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/escape-regexp.js
var require_escape_regexp = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/escape-regexp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "escapeStringRegexp", {
      enumerable: true,
      get: function() {
        return escapeStringRegexp;
      }
    });
    var reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
    var reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
    function escapeStringRegexp(str) {
      if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, "\\$&");
      }
      return str;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/route-regex.js
var require_route_regex = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/route-regex.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      getRouteRegex: function() {
        return getRouteRegex;
      },
      getNamedRouteRegex: function() {
        return getNamedRouteRegex;
      },
      getNamedMiddlewareRegex: function() {
        return getNamedMiddlewareRegex;
      }
    });
    var _interceptionroutes = require_interception_routes();
    var _escaperegexp = require_escape_regexp();
    var _removetrailingslash = require_remove_trailing_slash();
    var NEXT_QUERY_PARAM_PREFIX = "nxtP";
    var NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
    function parseParameter(param) {
      const optional = param.startsWith("[") && param.endsWith("]");
      if (optional) {
        param = param.slice(1, -1);
      }
      const repeat = param.startsWith("...");
      if (repeat) {
        param = param.slice(3);
      }
      return {
        key: param,
        repeat,
        optional
      };
    }
    function getParametrizedRoute(route) {
      const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
      const groups = {};
      let groupIndex = 1;
      return {
        parameterizedRoute: segments.map((segment) => {
          const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
          const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/);
          if (markerMatch && paramMatches) {
            const { key, optional, repeat } = parseParameter(paramMatches[1]);
            groups[key] = {
              pos: groupIndex++,
              repeat,
              optional
            };
            return "/" + (0, _escaperegexp.escapeStringRegexp)(markerMatch) + "([^/]+?)";
          } else if (paramMatches) {
            const { key, repeat, optional } = parseParameter(paramMatches[1]);
            groups[key] = {
              pos: groupIndex++,
              repeat,
              optional
            };
            return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          } else {
            return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
          }
        }).join(""),
        groups
      };
    }
    function getRouteRegex(normalizedRoute) {
      const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute);
      return {
        re: new RegExp("^" + parameterizedRoute + "(?:/)?$"),
        groups
      };
    }
    function buildGetSafeRouteKey() {
      let i = 0;
      return () => {
        let routeKey = "";
        let j = ++i;
        while (j > 0) {
          routeKey += String.fromCharCode(97 + (j - 1) % 26);
          j = Math.floor((j - 1) / 26);
        }
        return routeKey;
      };
    }
    function getSafeKeyFromSegment(param) {
      let { interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix } = param;
      const { key, optional, repeat } = parseParameter(segment);
      let cleanedKey = key.replace(/\W/g, "");
      if (keyPrefix) {
        cleanedKey = "" + keyPrefix + cleanedKey;
      }
      let invalidKey = false;
      if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
      }
      if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
      }
      if (invalidKey) {
        cleanedKey = getSafeRouteKey();
      }
      if (keyPrefix) {
        routeKeys[cleanedKey] = "" + keyPrefix + key;
      } else {
        routeKeys[cleanedKey] = key;
      }
      const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : "";
      return repeat ? optional ? "(?:/" + interceptionPrefix + "(?<" + cleanedKey + ">.+?))?" : "/" + interceptionPrefix + "(?<" + cleanedKey + ">.+?)" : "/" + interceptionPrefix + "(?<" + cleanedKey + ">[^/]+?)";
    }
    function getNamedParametrizedRoute(route, prefixRouteKeys) {
      const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
      const getSafeRouteKey = buildGetSafeRouteKey();
      const routeKeys = {};
      return {
        namedParameterizedRoute: segments.map((segment) => {
          const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m) => segment.startsWith(m));
          const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/);
          if (hasInterceptionMarker && paramMatches) {
            const [usedMarker] = segment.split(paramMatches[0]);
            return getSafeKeyFromSegment({
              getSafeRouteKey,
              interceptionMarker: usedMarker,
              segment: paramMatches[1],
              routeKeys,
              keyPrefix: prefixRouteKeys ? NEXT_INTERCEPTION_MARKER_PREFIX : void 0
            });
          } else if (paramMatches) {
            return getSafeKeyFromSegment({
              getSafeRouteKey,
              segment: paramMatches[1],
              routeKeys,
              keyPrefix: prefixRouteKeys ? NEXT_QUERY_PARAM_PREFIX : void 0
            });
          } else {
            return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
          }
        }).join(""),
        routeKeys
      };
    }
    function getNamedRouteRegex(normalizedRoute, prefixRouteKey) {
      const result = getNamedParametrizedRoute(normalizedRoute, prefixRouteKey);
      return {
        ...getRouteRegex(normalizedRoute),
        namedRegex: "^" + result.namedParameterizedRoute + "(?:/)?$",
        routeKeys: result.routeKeys
      };
    }
    function getNamedMiddlewareRegex(normalizedRoute, options) {
      const { parameterizedRoute } = getParametrizedRoute(normalizedRoute);
      const { catchAll = true } = options;
      if (parameterizedRoute === "/") {
        let catchAllRegex = catchAll ? ".*" : "";
        return {
          namedRegex: "^/" + catchAllRegex + "$"
        };
      }
      const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false);
      let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
      return {
        namedRegex: "^" + namedParameterizedRoute + catchAllGroupedRegex + "$"
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js
var require_interpolate_as = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "interpolateAs", {
      enumerable: true,
      get: function() {
        return interpolateAs;
      }
    });
    var _routematcher = require_route_matcher();
    var _routeregex = require_route_regex();
    function interpolateAs(route, asPathname, query) {
      let interpolatedRoute = "";
      const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
      const dynamicGroups = dynamicRegex.groups;
      const dynamicMatches = (
        // Try to match the dynamic route against the asPath
        (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || // Fall back to reading the values from the href
        // TODO: should this take priority; also need to change in the router.
        query
      );
      interpolatedRoute = route;
      const params = Object.keys(dynamicGroups);
      if (!params.every((param) => {
        let value = dynamicMatches[param] || "";
        const { repeat, optional } = dynamicGroups[param];
        let replaced = "[" + (repeat ? "..." : "") + param + "]";
        if (optional) {
          replaced = (!value ? "/" : "") + "[" + replaced + "]";
        }
        if (repeat && !Array.isArray(value)) value = [
          value
        ];
        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (segment) => encodeURIComponent(segment)
        ).join("/") : encodeURIComponent(value)) || "/");
      })) {
        interpolatedRoute = "";
      }
      return {
        params,
        result: interpolatedRoute
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/resolve-href.js
var require_resolve_href = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/resolve-href.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "resolveHref", {
      enumerable: true,
      get: function() {
        return resolveHref;
      }
    });
    var _querystring = require_querystring();
    var _formaturl = require_format_url();
    var _omit = require_omit();
    var _utils = require_utils();
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var _islocalurl = require_is_local_url();
    var _utils1 = require_utils2();
    var _interpolateas = require_interpolate_as();
    function resolveHref(router, href, resolveAs) {
      let base;
      let urlAsString = typeof href === "string" ? href : (0, _formaturl.formatWithValidation)(href);
      const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
      const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
      const urlParts = urlAsStringNoProto.split("?", 1);
      if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + urlAsString + "' passed to next/router in page: '" + router.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
      }
      if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
        return resolveAs ? [
          urlAsString
        ] : urlAsString;
      }
      try {
        base = new URL(urlAsString.startsWith("#") ? router.asPath : router.pathname, "http://n");
      } catch (_) {
        base = new URL("/", "http://n");
      }
      try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
        let interpolatedAs = "";
        if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
          const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
          const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
          if (result) {
            interpolatedAs = (0, _formaturl.formatWithValidation)({
              pathname: result,
              hash: finalUrl.hash,
              query: (0, _omit.omit)(query, params)
            });
          }
        }
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
          resolvedHref,
          interpolatedAs || resolvedHref
        ] : resolvedHref;
      } catch (_) {
        return resolveAs ? [
          urlAsString
        ] : urlAsString;
      }
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js
var require_add_path_prefix = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "addPathPrefix", {
      enumerable: true,
      get: function() {
        return addPathPrefix;
      }
    });
    var _parsepath = require_parse_path();
    function addPathPrefix(path, prefix) {
      if (!path.startsWith("/") || !prefix) {
        return path;
      }
      const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
      return "" + prefix + pathname + query + hash;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/add-locale.js
var require_add_locale = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router/utils/add-locale.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "addLocale", {
      enumerable: true,
      get: function() {
        return addLocale;
      }
    });
    var _addpathprefix = require_add_path_prefix();
    var _pathhasprefix = require_path_has_prefix();
    function addLocale(path, locale, defaultLocale, ignorePrefix) {
      if (!locale || locale === defaultLocale) return path;
      const lower = path.toLowerCase();
      if (!ignorePrefix) {
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api")) return path;
        if ((0, _pathhasprefix.pathHasPrefix)(lower, "/" + locale.toLowerCase())) return path;
      }
      return (0, _addpathprefix.addPathPrefix)(path, "/" + locale);
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/add-locale.js
var require_add_locale2 = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/add-locale.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "addLocale", {
      enumerable: true,
      get: function() {
        return addLocale;
      }
    });
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var addLocale = function(path) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (process.env.__NEXT_I18N_SUPPORT) {
        return (0, _normalizetrailingslash.normalizePathTrailingSlash)(require_add_locale().addLocale(path, ...args));
      }
      return path;
    };
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router-context.shared-runtime.js
var require_router_context_shared_runtime = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/router-context.shared-runtime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "RouterContext", {
      enumerable: true,
      get: function() {
        return RouterContext;
      }
    });
    var _interop_require_default = require_interop_require_default();
    var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
    var RouterContext = _react.default.createContext(null);
    if (process.env.NODE_ENV !== "production") {
      RouterContext.displayName = "RouterContext";
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js
var require_app_router_context_shared_runtime = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"(exports2) {
    "use strict";
    "use client";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      CacheStates: function() {
        return CacheStates;
      },
      AppRouterContext: function() {
        return AppRouterContext;
      },
      LayoutRouterContext: function() {
        return LayoutRouterContext;
      },
      GlobalLayoutRouterContext: function() {
        return GlobalLayoutRouterContext;
      },
      TemplateContext: function() {
        return TemplateContext;
      }
    });
    var _interop_require_default = require_interop_require_default();
    var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
    var CacheStates;
    (function(CacheStates2) {
      CacheStates2["LAZY_INITIALIZED"] = "LAZYINITIALIZED";
      CacheStates2["DATA_FETCH"] = "DATAFETCH";
      CacheStates2["READY"] = "READY";
    })(CacheStates || (CacheStates = {}));
    var AppRouterContext = _react.default.createContext(null);
    var LayoutRouterContext = _react.default.createContext(null);
    var GlobalLayoutRouterContext = _react.default.createContext(null);
    var TemplateContext = _react.default.createContext(null);
    if (process.env.NODE_ENV !== "production") {
      AppRouterContext.displayName = "AppRouterContext";
      LayoutRouterContext.displayName = "LayoutRouterContext";
      GlobalLayoutRouterContext.displayName = "GlobalLayoutRouterContext";
      TemplateContext.displayName = "TemplateContext";
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/request-idle-callback.js
var require_request_idle_callback = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/request-idle-callback.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      requestIdleCallback: function() {
        return requestIdleCallback;
      },
      cancelIdleCallback: function() {
        return cancelIdleCallback;
      }
    });
    var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
      let start = Date.now();
      return self.setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };
    var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
      return clearTimeout(id);
    };
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/use-intersection.js
var require_use_intersection = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/use-intersection.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "useIntersection", {
      enumerable: true,
      get: function() {
        return useIntersection;
      }
    });
    var _react = require("react");
    var _requestidlecallback = require_request_idle_callback();
    var hasIntersectionObserver = typeof IntersectionObserver === "function";
    var observers = /* @__PURE__ */ new Map();
    var idList = [];
    function createObserver(options) {
      const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
      };
      const existing = idList.find((obj) => obj.root === id.root && obj.margin === id.margin);
      let instance;
      if (existing) {
        instance = observers.get(existing);
        if (instance) {
          return instance;
        }
      }
      const elements = /* @__PURE__ */ new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = elements.get(entry.target);
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (callback && isVisible) {
            callback(isVisible);
          }
        });
      }, options);
      instance = {
        id,
        observer,
        elements
      };
      idList.push(id);
      observers.set(id, instance);
      return instance;
    }
    function observe(element, callback, options) {
      const { id, observer, elements } = createObserver(options);
      elements.set(element, callback);
      observer.observe(element);
      return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        if (elements.size === 0) {
          observer.disconnect();
          observers.delete(id);
          const index = idList.findIndex((obj) => obj.root === id.root && obj.margin === id.margin);
          if (index > -1) {
            idList.splice(index, 1);
          }
        }
      };
    }
    function useIntersection(param) {
      let { rootRef, rootMargin, disabled } = param;
      const isDisabled = disabled || !hasIntersectionObserver;
      const [visible, setVisible] = (0, _react.useState)(false);
      const elementRef = (0, _react.useRef)(null);
      const setElement = (0, _react.useCallback)((element) => {
        elementRef.current = element;
      }, []);
      (0, _react.useEffect)(() => {
        if (hasIntersectionObserver) {
          if (isDisabled || visible) return;
          const element = elementRef.current;
          if (element && element.tagName) {
            const unobserve = observe(element, (isVisible) => isVisible && setVisible(isVisible), {
              root: rootRef == null ? void 0 : rootRef.current,
              rootMargin
            });
            return unobserve;
          }
        } else {
          if (!visible) {
            const idleCallback = (0, _requestidlecallback.requestIdleCallback)(() => setVisible(true));
            return () => (0, _requestidlecallback.cancelIdleCallback)(idleCallback);
          }
        }
      }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
      ]);
      const resetVisible = (0, _react.useCallback)(() => {
        setVisible(false);
      }, []);
      return [
        setElement,
        visible,
        resetVisible
      ];
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "normalizeLocalePath", {
      enumerable: true,
      get: function() {
        return normalizeLocalePath;
      }
    });
    function normalizeLocalePath(pathname, locales) {
      let detectedLocale;
      const pathnameParts = pathname.split("/");
      (locales || []).some((locale) => {
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
          detectedLocale = locale;
          pathnameParts.splice(1, 1);
          pathname = pathnameParts.join("/") || "/";
          return true;
        }
        return false;
      });
      return {
        pathname,
        detectedLocale
      };
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/normalize-locale-path.js
var require_normalize_locale_path2 = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/normalize-locale-path.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "normalizeLocalePath", {
      enumerable: true,
      get: function() {
        return normalizeLocalePath;
      }
    });
    var normalizeLocalePath = (pathname, locales) => {
      if (process.env.__NEXT_I18N_SUPPORT) {
        return require_normalize_locale_path().normalizeLocalePath(pathname, locales);
      }
      return {
        pathname,
        detectedLocale: void 0
      };
    };
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js
var require_detect_domain_locale = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "detectDomainLocale", {
      enumerable: true,
      get: function() {
        return detectDomainLocale;
      }
    });
    function detectDomainLocale(domainItems, hostname, detectedLocale) {
      if (!domainItems) return;
      if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
      }
      for (const item of domainItems) {
        var _item_domain, _item_locales;
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":", 1)[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale) => locale.toLowerCase() === detectedLocale))) {
          return item;
        }
      }
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/detect-domain-locale.js
var require_detect_domain_locale2 = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/detect-domain-locale.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "detectDomainLocale", {
      enumerable: true,
      get: function() {
        return detectDomainLocale;
      }
    });
    var detectDomainLocale = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (process.env.__NEXT_I18N_SUPPORT) {
        return require_detect_domain_locale().detectDomainLocale(...args);
      }
    };
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/get-domain-locale.js
var require_get_domain_locale = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/get-domain-locale.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "getDomainLocale", {
      enumerable: true,
      get: function() {
        return getDomainLocale;
      }
    });
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function getDomainLocale(path, locale, locales, domainLocales) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const normalizeLocalePath = require_normalize_locale_path2().normalizeLocalePath;
        const detectDomainLocale = require_detect_domain_locale2().detectDomainLocale;
        const target = locale || normalizeLocalePath(path, locales).detectedLocale;
        const domain = detectDomainLocale(domainLocales, void 0, target);
        if (domain) {
          const proto = "http" + (domain.http ? "" : "s") + "://";
          const finalLocale = target === domain.defaultLocale ? "" : "/" + target;
          return "" + proto + domain.domain + (0, _normalizetrailingslash.normalizePathTrailingSlash)("" + basePath + finalLocale + path);
        }
        return false;
      } else {
        return false;
      }
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/add-base-path.js
var require_add_base_path = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/add-base-path.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "addBasePath", {
      enumerable: true,
      get: function() {
        return addBasePath;
      }
    });
    var _addpathprefix = require_add_path_prefix();
    var _normalizetrailingslash = require_normalize_trailing_slash();
    var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
    function addBasePath(path, required) {
      return (0, _normalizetrailingslash.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !required ? path : (0, _addpathprefix.addPathPrefix)(path, basePath));
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js
var require_router_reducer_types = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
    }
    _export(exports2, {
      PrefetchKind: function() {
        return PrefetchKind;
      },
      ACTION_REFRESH: function() {
        return ACTION_REFRESH;
      },
      ACTION_NAVIGATE: function() {
        return ACTION_NAVIGATE;
      },
      ACTION_RESTORE: function() {
        return ACTION_RESTORE;
      },
      ACTION_SERVER_PATCH: function() {
        return ACTION_SERVER_PATCH;
      },
      ACTION_PREFETCH: function() {
        return ACTION_PREFETCH;
      },
      ACTION_FAST_REFRESH: function() {
        return ACTION_FAST_REFRESH;
      },
      ACTION_SERVER_ACTION: function() {
        return ACTION_SERVER_ACTION;
      },
      isThenable: function() {
        return isThenable;
      }
    });
    var ACTION_REFRESH = "refresh";
    var ACTION_NAVIGATE = "navigate";
    var ACTION_RESTORE = "restore";
    var ACTION_SERVER_PATCH = "server-patch";
    var ACTION_PREFETCH = "prefetch";
    var ACTION_FAST_REFRESH = "fast-refresh";
    var ACTION_SERVER_ACTION = "server-action";
    var PrefetchKind;
    (function(PrefetchKind2) {
      PrefetchKind2["AUTO"] = "auto";
      PrefetchKind2["FULL"] = "full";
      PrefetchKind2["TEMPORARY"] = "temporary";
    })(PrefetchKind || (PrefetchKind = {}));
    function isThenable(value) {
      return value && (typeof value === "object" || typeof value === "function") && typeof value.then === "function";
    }
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/link.js
var require_link = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/link.js"(exports2, module2) {
    "use strict";
    "use client";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "default", {
      enumerable: true,
      get: function() {
        return _default;
      }
    });
    var _interop_require_default = require_interop_require_default();
    var _react = /* @__PURE__ */ _interop_require_default._(require("react"));
    var _resolvehref = require_resolve_href();
    var _islocalurl = require_is_local_url();
    var _formaturl = require_format_url();
    var _utils = require_utils();
    var _addlocale = require_add_locale2();
    var _routercontextsharedruntime = require_router_context_shared_runtime();
    var _approutercontextsharedruntime = require_app_router_context_shared_runtime();
    var _useintersection = require_use_intersection();
    var _getdomainlocale = require_get_domain_locale();
    var _addbasepath = require_add_base_path();
    var _routerreducertypes = require_router_reducer_types();
    var prefetched = /* @__PURE__ */ new Set();
    function prefetch(router, href, as, options, appOptions, isAppRouter) {
      if (typeof window === "undefined") {
        return;
      }
      if (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)) {
        return;
      }
      if (!options.bypassPrefetchedCheck) {
        const locale = (
          // Let the link's locale prop override the default router locale.
          typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : void 0
        );
        const prefetchedKey = href + "%" + as + "%" + locale;
        if (prefetched.has(prefetchedKey)) {
          return;
        }
        prefetched.add(prefetchedKey);
      }
      const prefetchPromise = isAppRouter ? router.prefetch(href, appOptions) : router.prefetch(href, as, options);
      Promise.resolve(prefetchPromise).catch((err) => {
        if (process.env.NODE_ENV !== "production") {
          throw err;
        }
      });
    }
    function isModifiedEvent(event) {
      const eventTarget = event.currentTarget;
      const target = eventTarget.getAttribute("target");
      return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
      event.nativeEvent && event.nativeEvent.which === 2;
    }
    function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter) {
      const { nodeName } = e.currentTarget;
      const isAnchorNodeName = nodeName.toUpperCase() === "A";
      if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
      !isAppRouter && !(0, _islocalurl.isLocalURL)(href))) {
        return;
      }
      e.preventDefault();
      const navigate = () => {
        const routerScroll = scroll != null ? scroll : true;
        if ("beforePopState" in router) {
          router[replace ? "replace" : "push"](href, as, {
            shallow,
            locale,
            scroll: routerScroll
          });
        } else {
          router[replace ? "replace" : "push"](as || href, {
            scroll: routerScroll
          });
        }
      };
      if (isAppRouter) {
        _react.default.startTransition(navigate);
      } else {
        navigate();
      }
    }
    function formatStringOrUrl(urlObjOrString) {
      if (typeof urlObjOrString === "string") {
        return urlObjOrString;
      }
      return (0, _formaturl.formatUrl)(urlObjOrString);
    }
    var Link2 = /* @__PURE__ */ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
      let children;
      const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, ...restProps } = props;
      children = childrenProp;
      if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /* @__PURE__ */ _react.default.createElement("a", null, children);
      }
      const pagesRouter = _react.default.useContext(_routercontextsharedruntime.RouterContext);
      const appRouter = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
      const router = pagesRouter != null ? pagesRouter : appRouter;
      const isAppRouter = !pagesRouter;
      const prefetchEnabled = prefetchProp !== false;
      const appPrefetchKind = prefetchProp === null ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
      if (process.env.NODE_ENV !== "production") {
        let createPropError = function(args) {
          return new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : ""));
        };
        const requiredPropsGuard = {
          href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key) => {
          if (key === "href") {
            if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
              throw createPropError({
                key,
                expected: "`string` or `object`",
                actual: props[key] === null ? "null" : typeof props[key]
              });
            }
          } else {
            const _ = key;
          }
        });
        const optionalPropsGuard = {
          as: true,
          replace: true,
          scroll: true,
          shallow: true,
          passHref: true,
          prefetch: true,
          locale: true,
          onClick: true,
          onMouseEnter: true,
          onTouchStart: true,
          legacyBehavior: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key) => {
          const valType = typeof props[key];
          if (key === "as") {
            if (props[key] && valType !== "string" && valType !== "object") {
              throw createPropError({
                key,
                expected: "`string` or `object`",
                actual: valType
              });
            }
          } else if (key === "locale") {
            if (props[key] && valType !== "string") {
              throw createPropError({
                key,
                expected: "`string`",
                actual: valType
              });
            }
          } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart") {
            if (props[key] && valType !== "function") {
              throw createPropError({
                key,
                expected: "`function`",
                actual: valType
              });
            }
          } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "prefetch" || key === "legacyBehavior") {
            if (props[key] != null && valType !== "boolean") {
              throw createPropError({
                key,
                expected: "`boolean`",
                actual: valType
              });
            }
          } else {
            const _ = key;
          }
        });
        const hasWarned = _react.default.useRef(false);
        if (props.prefetch && !hasWarned.current && !isAppRouter) {
          hasWarned.current = true;
          console.warn("Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated");
        }
      }
      if (process.env.NODE_ENV !== "production") {
        if (isAppRouter && !asProp) {
          let href2;
          if (typeof hrefProp === "string") {
            href2 = hrefProp;
          } else if (typeof hrefProp === "object" && typeof hrefProp.pathname === "string") {
            href2 = hrefProp.pathname;
          }
          if (href2) {
            const hasDynamicSegment = href2.split("/").some((segment) => segment.startsWith("[") && segment.endsWith("]"));
            if (hasDynamicSegment) {
              throw new Error("Dynamic href `" + href2 + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href");
            }
          }
        }
      }
      const { href, as } = _react.default.useMemo(() => {
        if (!pagesRouter) {
          const resolvedHref2 = formatStringOrUrl(hrefProp);
          return {
            href: resolvedHref2,
            as: asProp ? formatStringOrUrl(asProp) : resolvedHref2
          };
        }
        const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(pagesRouter, hrefProp, true);
        return {
          href: resolvedHref,
          as: asProp ? (0, _resolvehref.resolveHref)(pagesRouter, asProp) : resolvedAs || resolvedHref
        };
      }, [
        pagesRouter,
        hrefProp,
        asProp
      ]);
      const previousHref = _react.default.useRef(href);
      const previousAs = _react.default.useRef(as);
      let child;
      if (legacyBehavior) {
        if (process.env.NODE_ENV === "development") {
          if (onClick) {
            console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
          }
          if (onMouseEnterProp) {
            console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
          }
          try {
            child = _react.default.Children.only(children);
          } catch (err) {
            if (!children) {
              throw new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children");
            }
            throw new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== "undefined" ? " \nOpen your browser's console to view the Component stack trace." : ""));
          }
        } else {
          child = _react.default.Children.only(children);
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          if ((children == null ? void 0 : children.type) === "a") {
            throw new Error("Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor");
          }
        }
      }
      const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
      const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: "200px"
      });
      const setRef = _react.default.useCallback((el) => {
        if (previousAs.current !== as || previousHref.current !== href) {
          resetVisible();
          previousAs.current = as;
          previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
          if (typeof childRef === "function") childRef(el);
          else if (typeof childRef === "object") {
            childRef.current = el;
          }
        }
      }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
      ]);
      _react.default.useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
          return;
        }
        if (!router) {
          return;
        }
        if (!isVisible || !prefetchEnabled) {
          return;
        }
        prefetch(router, href, as, {
          locale
        }, {
          kind: appPrefetchKind
        }, isAppRouter);
      }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router,
        isAppRouter,
        appPrefetchKind
      ]);
      const childProps = {
        ref: setRef,
        onClick(e) {
          if (process.env.NODE_ENV !== "production") {
            if (!e) {
              throw new Error('Component rendered inside next/link has to pass click event to "onClick" prop.');
            }
          }
          if (!legacyBehavior && typeof onClick === "function") {
            onClick(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
            child.props.onClick(e);
          }
          if (!router) {
            return;
          }
          if (e.defaultPrevented) {
            return;
          }
          linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter);
        },
        onMouseEnter(e) {
          if (!legacyBehavior && typeof onMouseEnterProp === "function") {
            onMouseEnterProp(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
            child.props.onMouseEnter(e);
          }
          if (!router) {
            return;
          }
          if ((!prefetchEnabled || process.env.NODE_ENV === "development") && isAppRouter) {
            return;
          }
          prefetch(router, href, as, {
            locale,
            priority: true,
            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
            bypassPrefetchedCheck: true
          }, {
            kind: appPrefetchKind
          }, isAppRouter);
        },
        onTouchStart(e) {
          if (!legacyBehavior && typeof onTouchStartProp === "function") {
            onTouchStartProp(e);
          }
          if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
            child.props.onTouchStart(e);
          }
          if (!router) {
            return;
          }
          if (!prefetchEnabled && isAppRouter) {
            return;
          }
          prefetch(router, href, as, {
            locale,
            priority: true,
            // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
            bypassPrefetchedCheck: true
          }, {
            kind: appPrefetchKind
          }, isAppRouter);
        }
      };
      if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
      } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getdomainlocale.getDomainLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
      }
      return legacyBehavior ? /* @__PURE__ */ _react.default.cloneElement(child, childProps) : /* @__PURE__ */ _react.default.createElement("a", {
        ...restProps,
        ...childProps
      }, children);
    });
    var _default = Link2;
    if ((typeof exports2.default === "function" || typeof exports2.default === "object" && exports2.default !== null) && typeof exports2.default.__esModule === "undefined") {
      Object.defineProperty(exports2.default, "__esModule", { value: true });
      Object.assign(exports2.default, exports2);
      module2.exports = exports2.default;
    }
  }
});

// ../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/link.js
var require_link2 = __commonJS({
  "../../node_modules/.pnpm/next@14.0.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/link.js"(exports2, module2) {
    "use strict";
    module2.exports = require_link();
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Badge: () => Badge,
  Button: () => Button,
  CTAGroup: () => CTAGroup,
  Card: () => Card,
  CardBody: () => CardBody,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  FeatureCard: () => FeatureCard,
  LevelBadge: () => LevelBadge,
  SectionHeader: () => SectionHeader,
  UI_VERSION: () => UI_VERSION
});
module.exports = __toCommonJS(index_exports);

// src/components/SectionHeader.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var sizeStyles = {
  sm: {
    title: "text-xl font-bold",
    subtitle: "text-sm",
    gap: "mb-2",
    wrapper: "mb-6"
  },
  md: {
    title: "text-2xl font-bold",
    subtitle: "text-base",
    gap: "mb-3",
    wrapper: "mb-8"
  },
  lg: {
    title: "text-3xl font-bold",
    subtitle: "text-lg",
    gap: "mb-4",
    wrapper: "mb-12"
  }
};
var alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
function SectionHeader({
  title,
  subtitle,
  align = "center",
  size = "lg",
  className = "",
  titleClassName = "",
  subtitleClassName = ""
}) {
  const styles = sizeStyles[size];
  const alignment = alignStyles[align];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `${alignment} ${styles.wrapper} ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: `${styles.title} text-gray-900 ${styles.gap} ${titleClassName}`, children: title }),
    subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: `${styles.subtitle} text-gray-500 max-w-2xl ${align === "center" ? "mx-auto" : ""} ${subtitleClassName}`, children: subtitle })
  ] });
}

// src/components/Badge.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var variantStyles = {
  default: "bg-gray-100 text-gray-700",
  primary: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-purple-100 text-purple-700",
  // Fitness level badges
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
  "all-levels": "bg-blue-100 text-blue-700"
};
var sizeStyles2 = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base"
};
function Badge({
  children,
  variant = "default",
  size = "sm",
  className = ""
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "span",
    {
      className: `inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles2[size]} ${className}`,
      children
    }
  );
}
var levelLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  "all-levels": "All Levels"
};
function LevelBadge({
  level,
  size = "sm",
  className = "",
  showLabel = true
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Badge, { variant: level, size, className, children: showLabel ? levelLabels[level] : level });
}

// src/components/Card.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};
var roundedStyles = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl"
};
var shadowStyles = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg"
};
function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
  rounded = "2xl",
  shadow = "sm",
  border = false
}) {
  const hoverStyles = hover ? "hover:shadow-lg transition-shadow" : "";
  const borderStyles = border ? "border border-gray-200" : "";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      className: `bg-white ${paddingStyles[padding]} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${hoverStyles} ${borderStyles} ${className}`,
      children
    }
  );
}
function CardHeader({ children, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `mb-4 ${className}`, children });
}
function CardBody({ children, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className, children });
}
function CardFooter({ children, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `mt-4 pt-4 border-t border-gray-100 ${className}`, children });
}
function FeatureCard({
  icon,
  emoji,
  title,
  description,
  badge,
  footer,
  className = "",
  aspectRatio = "aspect-[4/3]",
  iconBgClassName = "bg-gradient-to-br from-blue-100 to-purple-100",
  onClick
}) {
  const isClickable = !!onClick;
  const Component = isClickable ? "button" : "div";
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    Component,
    {
      onClick,
      className: `group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all ${isClickable ? "cursor-pointer w-full text-left" : ""} ${className}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `${aspectRatio} ${iconBgClassName} flex items-center justify-center`, children: [
          emoji && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-6xl opacity-30", children: emoji }),
          icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "opacity-30", children: icon })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-lg font-semibold text-gray-900", children: title }),
            badge
          ] }),
          description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-gray-500 text-sm", children: description }),
          footer && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-4", children: footer })
        ] })
      ]
    }
  );
}

// src/components/Button.tsx
var import_link = __toESM(require_link2());
var import_jsx_runtime4 = require("react/jsx-runtime");
var variantStyles2 = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
  gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
};
var sizeStyles3 = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-4 text-lg"
};
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button"
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all";
  const widthStyles = fullWidth ? "w-full" : "";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";
  const combinedClassName = `${baseStyles} ${variantStyles2[variant]} ${sizeStyles3[size]} ${widthStyles} ${disabledStyles} ${className}`;
  if (href && external) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "a",
      {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: combinedClassName,
        children
      }
    );
  }
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_link.default, { href, className: combinedClassName, children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type,
      onClick,
      disabled,
      className: combinedClassName,
      children
    }
  );
}
var alignStyles2 = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end"
};
var gapStyles = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6"
};
function CTAGroup({
  children,
  className = "",
  align = "center",
  gap = "md"
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `flex flex-wrap items-center ${alignStyles2[align]} ${gapStyles[gap]} ${className}`, children });
}

// src/index.ts
var UI_VERSION = "0.1.0";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Badge,
  Button,
  CTAGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FeatureCard,
  LevelBadge,
  SectionHeader,
  UI_VERSION
});
