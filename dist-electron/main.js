import require$$1$3, { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs$1 from "node:fs";
import { exec } from "node:child_process";
import require$$1 from "fs";
import require$$0 from "constants";
import require$$0$1 from "stream";
import require$$4 from "util";
import require$$5 from "assert";
import require$$1$1 from "path";
import require$$1$4 from "child_process";
import require$$0$2 from "events";
import require$$0$3 from "crypto";
import require$$1$2 from "tty";
import require$$2 from "os";
import require$$2$1 from "url";
import require$$14 from "zlib";
import require$$4$1 from "http";
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var kindOf, hasRequiredKindOf;
function requireKindOf() {
  if (hasRequiredKindOf) return kindOf;
  hasRequiredKindOf = 1;
  var e = Object.prototype.toString;
  kindOf = function(n) {
    if (n === void 0) return "undefined";
    if (n === null) return "null";
    var s = typeof n;
    if (s === "boolean") return "boolean";
    if (s === "string") return "string";
    if (s === "number") return "number";
    if (s === "symbol") return "symbol";
    if (s === "function")
      return a(n) ? "generatorfunction" : "function";
    if (p(n)) return "array";
    if (i(n)) return "buffer";
    if (r(n)) return "arguments";
    if (f(n)) return "date";
    if (o(n)) return "error";
    if (u(n)) return "regexp";
    switch (h(n)) {
      case "Symbol":
        return "symbol";
      case "Promise":
        return "promise";
      // Set, Map, WeakSet, WeakMap
      case "WeakMap":
        return "weakmap";
      case "WeakSet":
        return "weakset";
      case "Map":
        return "map";
      case "Set":
        return "set";
      // 8-bit typed arrays
      case "Int8Array":
        return "int8array";
      case "Uint8Array":
        return "uint8array";
      case "Uint8ClampedArray":
        return "uint8clampedarray";
      // 16-bit typed arrays
      case "Int16Array":
        return "int16array";
      case "Uint16Array":
        return "uint16array";
      // 32-bit typed arrays
      case "Int32Array":
        return "int32array";
      case "Uint32Array":
        return "uint32array";
      case "Float32Array":
        return "float32array";
      case "Float64Array":
        return "float64array";
    }
    if (c(n))
      return "generator";
    switch (s = e.call(n), s) {
      case "[object Object]":
        return "object";
      // iterators
      case "[object Map Iterator]":
        return "mapiterator";
      case "[object Set Iterator]":
        return "setiterator";
      case "[object String Iterator]":
        return "stringiterator";
      case "[object Array Iterator]":
        return "arrayiterator";
    }
    return s.slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  function h(t) {
    return typeof t.constructor == "function" ? t.constructor.name : null;
  }
  function p(t) {
    return Array.isArray ? Array.isArray(t) : t instanceof Array;
  }
  function o(t) {
    return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
  }
  function f(t) {
    return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
  }
  function u(t) {
    return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
  }
  function a(t, n) {
    return h(t) === "GeneratorFunction";
  }
  function c(t) {
    return typeof t.throw == "function" && typeof t.return == "function" && typeof t.next == "function";
  }
  function r(t) {
    try {
      if (typeof t.length == "number" && typeof t.callee == "function")
        return !0;
    } catch (n) {
      if (n.message.indexOf("callee") !== -1)
        return !0;
    }
    return !1;
  }
  function i(t) {
    return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
  }
  return kindOf;
}
var isExtendable, hasRequiredIsExtendable;
function requireIsExtendable() {
  return hasRequiredIsExtendable || (hasRequiredIsExtendable = 1, isExtendable = function(h) {
    return typeof h < "u" && h !== null && (typeof h == "object" || typeof h == "function");
  }), isExtendable;
}
var extendShallow, hasRequiredExtendShallow;
function requireExtendShallow() {
  if (hasRequiredExtendShallow) return extendShallow;
  hasRequiredExtendShallow = 1;
  var e = requireIsExtendable();
  extendShallow = function(f) {
    e(f) || (f = {});
    for (var u = arguments.length, a = 1; a < u; a++) {
      var c = arguments[a];
      e(c) && h(f, c);
    }
    return f;
  };
  function h(o, f) {
    for (var u in f)
      p(f, u) && (o[u] = f[u]);
  }
  function p(o, f) {
    return Object.prototype.hasOwnProperty.call(o, f);
  }
  return extendShallow;
}
var sectionMatter, hasRequiredSectionMatter;
function requireSectionMatter() {
  if (hasRequiredSectionMatter) return sectionMatter;
  hasRequiredSectionMatter = 1;
  var e = requireKindOf(), h = requireExtendShallow();
  sectionMatter = function(r, i) {
    typeof i == "function" && (i = { parse: i });
    var t = o(r), n = { section_delimiter: "---", parse: a }, s = h({}, n, i), m = s.section_delimiter, y = t.content.split(/\r?\n/), E = null, g = u(), q = [], C = [];
    function P(_) {
      t.content = _, E = [], q = [];
    }
    function $(_) {
      C.length && (g.key = f(C[0], m), g.content = _, s.parse(g, E), E.push(g), g = u(), q = [], C = []);
    }
    for (var b = 0; b < y.length; b++) {
      var I = y[b], T = C.length, A = I.trim();
      if (p(A, m)) {
        if (A.length === 3 && b !== 0) {
          if (T === 0 || T === 2) {
            q.push(I);
            continue;
          }
          C.push(A), g.data = q.join(`
`), q = [];
          continue;
        }
        E === null && P(q.join(`
`)), T === 2 && $(q.join(`
`)), C.push(A);
        continue;
      }
      q.push(I);
    }
    return E === null ? P(q.join(`
`)) : $(q.join(`
`)), t.sections = E, t;
  };
  function p(r, i) {
    return !(r.slice(0, i.length) !== i || r.charAt(i.length + 1) === i.slice(-1));
  }
  function o(r) {
    if (e(r) !== "object" && (r = { content: r }), typeof r.content != "string" && !c(r.content))
      throw new TypeError("expected a buffer or string");
    return r.content = r.content.toString(), r.sections = [], r;
  }
  function f(r, i) {
    return r ? r.slice(i.length).trim() : "";
  }
  function u() {
    return { key: "", data: "", content: "" };
  }
  function a(r) {
    return r;
  }
  function c(r) {
    return r && r.constructor && typeof r.constructor.isBuffer == "function" ? r.constructor.isBuffer(r) : !1;
  }
  return sectionMatter;
}
var engines = { exports: {} }, jsYaml$2 = {}, loader$1 = {}, common$2 = {}, hasRequiredCommon$2;
function requireCommon$2() {
  if (hasRequiredCommon$2) return common$2;
  hasRequiredCommon$2 = 1;
  function e(a) {
    return typeof a > "u" || a === null;
  }
  function h(a) {
    return typeof a == "object" && a !== null;
  }
  function p(a) {
    return Array.isArray(a) ? a : e(a) ? [] : [a];
  }
  function o(a, c) {
    var r, i, t, n;
    if (c)
      for (n = Object.keys(c), r = 0, i = n.length; r < i; r += 1)
        t = n[r], a[t] = c[t];
    return a;
  }
  function f(a, c) {
    var r = "", i;
    for (i = 0; i < c; i += 1)
      r += a;
    return r;
  }
  function u(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return common$2.isNothing = e, common$2.isObject = h, common$2.toArray = p, common$2.repeat = f, common$2.isNegativeZero = u, common$2.extend = o, common$2;
}
var exception$1, hasRequiredException$1;
function requireException$1() {
  if (hasRequiredException$1) return exception$1;
  hasRequiredException$1 = 1;
  function e(h, p) {
    Error.call(this), this.name = "YAMLException", this.reason = h, this.mark = p, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e.prototype.toString = function(p) {
    var o = this.name + ": ";
    return o += this.reason || "(unknown reason)", !p && this.mark && (o += " " + this.mark.toString()), o;
  }, exception$1 = e, exception$1;
}
var mark, hasRequiredMark;
function requireMark() {
  if (hasRequiredMark) return mark;
  hasRequiredMark = 1;
  var e = requireCommon$2();
  function h(p, o, f, u, a) {
    this.name = p, this.buffer = o, this.position = f, this.line = u, this.column = a;
  }
  return h.prototype.getSnippet = function(o, f) {
    var u, a, c, r, i;
    if (!this.buffer) return null;
    for (o = o || 4, f = f || 75, u = "", a = this.position; a > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(a - 1)) === -1; )
      if (a -= 1, this.position - a > f / 2 - 1) {
        u = " ... ", a += 5;
        break;
      }
    for (c = "", r = this.position; r < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(r)) === -1; )
      if (r += 1, r - this.position > f / 2 - 1) {
        c = " ... ", r -= 5;
        break;
      }
    return i = this.buffer.slice(a, r), e.repeat(" ", o) + u + i + c + `
` + e.repeat(" ", o + this.position - a + u.length) + "^";
  }, h.prototype.toString = function(o) {
    var f, u = "";
    return this.name && (u += 'in "' + this.name + '" '), u += "at line " + (this.line + 1) + ", column " + (this.column + 1), o || (f = this.getSnippet(), f && (u += `:
` + f)), u;
  }, mark = h, mark;
}
var type$1, hasRequiredType$1;
function requireType$1() {
  if (hasRequiredType$1) return type$1;
  hasRequiredType$1 = 1;
  var e = requireException$1(), h = [
    "kind",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "defaultStyle",
    "styleAliases"
  ], p = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function o(u) {
    var a = {};
    return u !== null && Object.keys(u).forEach(function(c) {
      u[c].forEach(function(r) {
        a[String(r)] = c;
      });
    }), a;
  }
  function f(u, a) {
    if (a = a || {}, Object.keys(a).forEach(function(c) {
      if (h.indexOf(c) === -1)
        throw new e('Unknown option "' + c + '" is met in definition of "' + u + '" YAML type.');
    }), this.tag = u, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(c) {
      return c;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.defaultStyle = a.defaultStyle || null, this.styleAliases = o(a.styleAliases || null), p.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + u + '" YAML type.');
  }
  return type$1 = f, type$1;
}
var schema$1, hasRequiredSchema$1;
function requireSchema$1() {
  if (hasRequiredSchema$1) return schema$1;
  hasRequiredSchema$1 = 1;
  var e = requireCommon$2(), h = requireException$1(), p = requireType$1();
  function o(a, c, r) {
    var i = [];
    return a.include.forEach(function(t) {
      r = o(t, c, r);
    }), a[c].forEach(function(t) {
      r.forEach(function(n, s) {
        n.tag === t.tag && n.kind === t.kind && i.push(s);
      }), r.push(t);
    }), r.filter(function(t, n) {
      return i.indexOf(n) === -1;
    });
  }
  function f() {
    var a = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {}
    }, c, r;
    function i(t) {
      a[t.kind][t.tag] = a.fallback[t.tag] = t;
    }
    for (c = 0, r = arguments.length; c < r; c += 1)
      arguments[c].forEach(i);
    return a;
  }
  function u(a) {
    this.include = a.include || [], this.implicit = a.implicit || [], this.explicit = a.explicit || [], this.implicit.forEach(function(c) {
      if (c.loadKind && c.loadKind !== "scalar")
        throw new h("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }), this.compiledImplicit = o(this, "implicit", []), this.compiledExplicit = o(this, "explicit", []), this.compiledTypeMap = f(this.compiledImplicit, this.compiledExplicit);
  }
  return u.DEFAULT = null, u.create = function() {
    var c, r;
    switch (arguments.length) {
      case 1:
        c = u.DEFAULT, r = arguments[0];
        break;
      case 2:
        c = arguments[0], r = arguments[1];
        break;
      default:
        throw new h("Wrong number of arguments for Schema.create function");
    }
    if (c = e.toArray(c), r = e.toArray(r), !c.every(function(i) {
      return i instanceof u;
    }))
      throw new h("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
    if (!r.every(function(i) {
      return i instanceof p;
    }))
      throw new h("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    return new u({
      include: c,
      explicit: r
    });
  }, schema$1 = u, schema$1;
}
var str$1, hasRequiredStr$1;
function requireStr$1() {
  if (hasRequiredStr$1) return str$1;
  hasRequiredStr$1 = 1;
  var e = requireType$1();
  return str$1 = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), str$1;
}
var seq$1, hasRequiredSeq$1;
function requireSeq$1() {
  if (hasRequiredSeq$1) return seq$1;
  hasRequiredSeq$1 = 1;
  var e = requireType$1();
  return seq$1 = new e("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), seq$1;
}
var map$1, hasRequiredMap$1;
function requireMap$1() {
  if (hasRequiredMap$1) return map$1;
  hasRequiredMap$1 = 1;
  var e = requireType$1();
  return map$1 = new e("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), map$1;
}
var failsafe$1, hasRequiredFailsafe$1;
function requireFailsafe$1() {
  if (hasRequiredFailsafe$1) return failsafe$1;
  hasRequiredFailsafe$1 = 1;
  var e = requireSchema$1();
  return failsafe$1 = new e({
    explicit: [
      requireStr$1(),
      requireSeq$1(),
      requireMap$1()
    ]
  }), failsafe$1;
}
var _null$1, hasRequired_null$1;
function require_null$1() {
  if (hasRequired_null$1) return _null$1;
  hasRequired_null$1 = 1;
  var e = requireType$1();
  function h(f) {
    if (f === null) return !0;
    var u = f.length;
    return u === 1 && f === "~" || u === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function p() {
    return null;
  }
  function o(f) {
    return f === null;
  }
  return _null$1 = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: o,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      }
    },
    defaultStyle: "lowercase"
  }), _null$1;
}
var bool$1, hasRequiredBool$1;
function requireBool$1() {
  if (hasRequiredBool$1) return bool$1;
  hasRequiredBool$1 = 1;
  var e = requireType$1();
  function h(f) {
    if (f === null) return !1;
    var u = f.length;
    return u === 4 && (f === "true" || f === "True" || f === "TRUE") || u === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function p(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function o(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return bool$1 = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: o,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool$1;
}
var int$1, hasRequiredInt$1;
function requireInt$1() {
  if (hasRequiredInt$1) return int$1;
  hasRequiredInt$1 = 1;
  var e = requireCommon$2(), h = requireType$1();
  function p(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function o(r) {
    return 48 <= r && r <= 55;
  }
  function f(r) {
    return 48 <= r && r <= 57;
  }
  function u(r) {
    if (r === null) return !1;
    var i = r.length, t = 0, n = !1, s;
    if (!i) return !1;
    if (s = r[t], (s === "-" || s === "+") && (s = r[++t]), s === "0") {
      if (t + 1 === i) return !0;
      if (s = r[++t], s === "b") {
        for (t++; t < i; t++)
          if (s = r[t], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "x") {
        for (t++; t < i; t++)
          if (s = r[t], s !== "_") {
            if (!p(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      for (; t < i; t++)
        if (s = r[t], s !== "_") {
          if (!o(r.charCodeAt(t))) return !1;
          n = !0;
        }
      return n && s !== "_";
    }
    if (s === "_") return !1;
    for (; t < i; t++)
      if (s = r[t], s !== "_") {
        if (s === ":") break;
        if (!f(r.charCodeAt(t)))
          return !1;
        n = !0;
      }
    return !n || s === "_" ? !1 : s !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(r.slice(t));
  }
  function a(r) {
    var i = r, t = 1, n, s, m = [];
    return i.indexOf("_") !== -1 && (i = i.replace(/_/g, "")), n = i[0], (n === "-" || n === "+") && (n === "-" && (t = -1), i = i.slice(1), n = i[0]), i === "0" ? 0 : n === "0" ? i[1] === "b" ? t * parseInt(i.slice(2), 2) : i[1] === "x" ? t * parseInt(i, 16) : t * parseInt(i, 8) : i.indexOf(":") !== -1 ? (i.split(":").forEach(function(y) {
      m.unshift(parseInt(y, 10));
    }), i = 0, s = 1, m.forEach(function(y) {
      i += y * s, s *= 60;
    }), t * i) : t * parseInt(i, 10);
  }
  function c(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !e.isNegativeZero(r);
  }
  return int$1 = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: u,
    construct: a,
    predicate: c,
    represent: {
      binary: function(r) {
        return r >= 0 ? "0b" + r.toString(2) : "-0b" + r.toString(2).slice(1);
      },
      octal: function(r) {
        return r >= 0 ? "0" + r.toString(8) : "-0" + r.toString(8).slice(1);
      },
      decimal: function(r) {
        return r.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(r) {
        return r >= 0 ? "0x" + r.toString(16).toUpperCase() : "-0x" + r.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), int$1;
}
var float$1, hasRequiredFloat$1;
function requireFloat$1() {
  if (hasRequiredFloat$1) return float$1;
  hasRequiredFloat$1 = 1;
  var e = requireCommon$2(), h = requireType$1(), p = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function o(r) {
    return !(r === null || !p.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function f(r) {
    var i, t, n, s;
    return i = r.replace(/_/g, "").toLowerCase(), t = i[0] === "-" ? -1 : 1, s = [], "+-".indexOf(i[0]) >= 0 && (i = i.slice(1)), i === ".inf" ? t === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : i === ".nan" ? NaN : i.indexOf(":") >= 0 ? (i.split(":").forEach(function(m) {
      s.unshift(parseFloat(m, 10));
    }), i = 0, n = 1, s.forEach(function(m) {
      i += m * n, n *= 60;
    }), t * i) : t * parseFloat(i, 10);
  }
  var u = /^[-+]?[0-9]+e/;
  function a(r, i) {
    var t;
    if (isNaN(r))
      switch (i) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (i) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (i) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (e.isNegativeZero(r))
      return "-0.0";
    return t = r.toString(10), u.test(t) ? t.replace("e", ".e") : t;
  }
  function c(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || e.isNegativeZero(r));
  }
  return float$1 = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: o,
    construct: f,
    predicate: c,
    represent: a,
    defaultStyle: "lowercase"
  }), float$1;
}
var json$2, hasRequiredJson$2;
function requireJson$2() {
  if (hasRequiredJson$2) return json$2;
  hasRequiredJson$2 = 1;
  var e = requireSchema$1();
  return json$2 = new e({
    include: [
      requireFailsafe$1()
    ],
    implicit: [
      require_null$1(),
      requireBool$1(),
      requireInt$1(),
      requireFloat$1()
    ]
  }), json$2;
}
var core$1, hasRequiredCore$1;
function requireCore$1() {
  if (hasRequiredCore$1) return core$1;
  hasRequiredCore$1 = 1;
  var e = requireSchema$1();
  return core$1 = new e({
    include: [
      requireJson$2()
    ]
  }), core$1;
}
var timestamp$1, hasRequiredTimestamp$1;
function requireTimestamp$1() {
  if (hasRequiredTimestamp$1) return timestamp$1;
  hasRequiredTimestamp$1 = 1;
  var e = requireType$1(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), p = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function o(a) {
    return a === null ? !1 : h.exec(a) !== null || p.exec(a) !== null;
  }
  function f(a) {
    var c, r, i, t, n, s, m, y = 0, E = null, g, q, C;
    if (c = h.exec(a), c === null && (c = p.exec(a)), c === null) throw new Error("Date resolve error");
    if (r = +c[1], i = +c[2] - 1, t = +c[3], !c[4])
      return new Date(Date.UTC(r, i, t));
    if (n = +c[4], s = +c[5], m = +c[6], c[7]) {
      for (y = c[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return c[9] && (g = +c[10], q = +(c[11] || 0), E = (g * 60 + q) * 6e4, c[9] === "-" && (E = -E)), C = new Date(Date.UTC(r, i, t, n, s, m, y)), E && C.setTime(C.getTime() - E), C;
  }
  function u(a) {
    return a.toISOString();
  }
  return timestamp$1 = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: o,
    construct: f,
    instanceOf: Date,
    represent: u
  }), timestamp$1;
}
var merge$1, hasRequiredMerge$1;
function requireMerge$1() {
  if (hasRequiredMerge$1) return merge$1;
  hasRequiredMerge$1 = 1;
  var e = requireType$1();
  function h(p) {
    return p === "<<" || p === null;
  }
  return merge$1 = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), merge$1;
}
function commonjsRequire(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var binary$1, hasRequiredBinary$1;
function requireBinary$1() {
  if (hasRequiredBinary$1) return binary$1;
  hasRequiredBinary$1 = 1;
  var e;
  try {
    var h = commonjsRequire;
    e = h("buffer").Buffer;
  } catch {
  }
  var p = requireType$1(), o = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function f(r) {
    if (r === null) return !1;
    var i, t, n = 0, s = r.length, m = o;
    for (t = 0; t < s; t++)
      if (i = m.indexOf(r.charAt(t)), !(i > 64)) {
        if (i < 0) return !1;
        n += 6;
      }
    return n % 8 === 0;
  }
  function u(r) {
    var i, t, n = r.replace(/[\r\n=]/g, ""), s = n.length, m = o, y = 0, E = [];
    for (i = 0; i < s; i++)
      i % 4 === 0 && i && (E.push(y >> 16 & 255), E.push(y >> 8 & 255), E.push(y & 255)), y = y << 6 | m.indexOf(n.charAt(i));
    return t = s % 4 * 6, t === 0 ? (E.push(y >> 16 & 255), E.push(y >> 8 & 255), E.push(y & 255)) : t === 18 ? (E.push(y >> 10 & 255), E.push(y >> 2 & 255)) : t === 12 && E.push(y >> 4 & 255), e ? e.from ? e.from(E) : new e(E) : E;
  }
  function a(r) {
    var i = "", t = 0, n, s, m = r.length, y = o;
    for (n = 0; n < m; n++)
      n % 3 === 0 && n && (i += y[t >> 18 & 63], i += y[t >> 12 & 63], i += y[t >> 6 & 63], i += y[t & 63]), t = (t << 8) + r[n];
    return s = m % 3, s === 0 ? (i += y[t >> 18 & 63], i += y[t >> 12 & 63], i += y[t >> 6 & 63], i += y[t & 63]) : s === 2 ? (i += y[t >> 10 & 63], i += y[t >> 4 & 63], i += y[t << 2 & 63], i += y[64]) : s === 1 && (i += y[t >> 2 & 63], i += y[t << 4 & 63], i += y[64], i += y[64]), i;
  }
  function c(r) {
    return e && e.isBuffer(r);
  }
  return binary$1 = new p("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: f,
    construct: u,
    predicate: c,
    represent: a
  }), binary$1;
}
var omap$1, hasRequiredOmap$1;
function requireOmap$1() {
  if (hasRequiredOmap$1) return omap$1;
  hasRequiredOmap$1 = 1;
  var e = requireType$1(), h = Object.prototype.hasOwnProperty, p = Object.prototype.toString;
  function o(u) {
    if (u === null) return !0;
    var a = [], c, r, i, t, n, s = u;
    for (c = 0, r = s.length; c < r; c += 1) {
      if (i = s[c], n = !1, p.call(i) !== "[object Object]") return !1;
      for (t in i)
        if (h.call(i, t))
          if (!n) n = !0;
          else return !1;
      if (!n) return !1;
      if (a.indexOf(t) === -1) a.push(t);
      else return !1;
    }
    return !0;
  }
  function f(u) {
    return u !== null ? u : [];
  }
  return omap$1 = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: o,
    construct: f
  }), omap$1;
}
var pairs$1, hasRequiredPairs$1;
function requirePairs$1() {
  if (hasRequiredPairs$1) return pairs$1;
  hasRequiredPairs$1 = 1;
  var e = requireType$1(), h = Object.prototype.toString;
  function p(f) {
    if (f === null) return !0;
    var u, a, c, r, i, t = f;
    for (i = new Array(t.length), u = 0, a = t.length; u < a; u += 1) {
      if (c = t[u], h.call(c) !== "[object Object]" || (r = Object.keys(c), r.length !== 1)) return !1;
      i[u] = [r[0], c[r[0]]];
    }
    return !0;
  }
  function o(f) {
    if (f === null) return [];
    var u, a, c, r, i, t = f;
    for (i = new Array(t.length), u = 0, a = t.length; u < a; u += 1)
      c = t[u], r = Object.keys(c), i[u] = [r[0], c[r[0]]];
    return i;
  }
  return pairs$1 = new e("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: p,
    construct: o
  }), pairs$1;
}
var set$1, hasRequiredSet$1;
function requireSet$1() {
  if (hasRequiredSet$1) return set$1;
  hasRequiredSet$1 = 1;
  var e = requireType$1(), h = Object.prototype.hasOwnProperty;
  function p(f) {
    if (f === null) return !0;
    var u, a = f;
    for (u in a)
      if (h.call(a, u) && a[u] !== null)
        return !1;
    return !0;
  }
  function o(f) {
    return f !== null ? f : {};
  }
  return set$1 = new e("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: p,
    construct: o
  }), set$1;
}
var default_safe, hasRequiredDefault_safe;
function requireDefault_safe() {
  if (hasRequiredDefault_safe) return default_safe;
  hasRequiredDefault_safe = 1;
  var e = requireSchema$1();
  return default_safe = new e({
    include: [
      requireCore$1()
    ],
    implicit: [
      requireTimestamp$1(),
      requireMerge$1()
    ],
    explicit: [
      requireBinary$1(),
      requireOmap$1(),
      requirePairs$1(),
      requireSet$1()
    ]
  }), default_safe;
}
var _undefined, hasRequired_undefined;
function require_undefined() {
  if (hasRequired_undefined) return _undefined;
  hasRequired_undefined = 1;
  var e = requireType$1();
  function h() {
    return !0;
  }
  function p() {
  }
  function o() {
    return "";
  }
  function f(u) {
    return typeof u > "u";
  }
  return _undefined = new e("tag:yaml.org,2002:js/undefined", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: f,
    represent: o
  }), _undefined;
}
var regexp, hasRequiredRegexp;
function requireRegexp() {
  if (hasRequiredRegexp) return regexp;
  hasRequiredRegexp = 1;
  var e = requireType$1();
  function h(u) {
    if (u === null || u.length === 0) return !1;
    var a = u, c = /\/([gim]*)$/.exec(u), r = "";
    return !(a[0] === "/" && (c && (r = c[1]), r.length > 3 || a[a.length - r.length - 1] !== "/"));
  }
  function p(u) {
    var a = u, c = /\/([gim]*)$/.exec(u), r = "";
    return a[0] === "/" && (c && (r = c[1]), a = a.slice(1, a.length - r.length - 1)), new RegExp(a, r);
  }
  function o(u) {
    var a = "/" + u.source + "/";
    return u.global && (a += "g"), u.multiline && (a += "m"), u.ignoreCase && (a += "i"), a;
  }
  function f(u) {
    return Object.prototype.toString.call(u) === "[object RegExp]";
  }
  return regexp = new e("tag:yaml.org,2002:js/regexp", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: f,
    represent: o
  }), regexp;
}
var _function, hasRequired_function;
function require_function() {
  if (hasRequired_function) return _function;
  hasRequired_function = 1;
  var e;
  try {
    var h = commonjsRequire;
    e = h("esprima");
  } catch {
    typeof window < "u" && (e = window.esprima);
  }
  var p = requireType$1();
  function o(c) {
    if (c === null) return !1;
    try {
      var r = "(" + c + ")", i = e.parse(r, { range: !0 });
      return !(i.type !== "Program" || i.body.length !== 1 || i.body[0].type !== "ExpressionStatement" || i.body[0].expression.type !== "ArrowFunctionExpression" && i.body[0].expression.type !== "FunctionExpression");
    } catch {
      return !1;
    }
  }
  function f(c) {
    var r = "(" + c + ")", i = e.parse(r, { range: !0 }), t = [], n;
    if (i.type !== "Program" || i.body.length !== 1 || i.body[0].type !== "ExpressionStatement" || i.body[0].expression.type !== "ArrowFunctionExpression" && i.body[0].expression.type !== "FunctionExpression")
      throw new Error("Failed to resolve function");
    return i.body[0].expression.params.forEach(function(s) {
      t.push(s.name);
    }), n = i.body[0].expression.body.range, i.body[0].expression.body.type === "BlockStatement" ? new Function(t, r.slice(n[0] + 1, n[1] - 1)) : new Function(t, "return " + r.slice(n[0], n[1]));
  }
  function u(c) {
    return c.toString();
  }
  function a(c) {
    return Object.prototype.toString.call(c) === "[object Function]";
  }
  return _function = new p("tag:yaml.org,2002:js/function", {
    kind: "scalar",
    resolve: o,
    construct: f,
    predicate: a,
    represent: u
  }), _function;
}
var default_full, hasRequiredDefault_full;
function requireDefault_full() {
  if (hasRequiredDefault_full) return default_full;
  hasRequiredDefault_full = 1;
  var e = requireSchema$1();
  return default_full = e.DEFAULT = new e({
    include: [
      requireDefault_safe()
    ],
    explicit: [
      require_undefined(),
      requireRegexp(),
      require_function()
    ]
  }), default_full;
}
var hasRequiredLoader$1;
function requireLoader$1() {
  if (hasRequiredLoader$1) return loader$1;
  hasRequiredLoader$1 = 1;
  var e = requireCommon$2(), h = requireException$1(), p = requireMark(), o = requireDefault_safe(), f = requireDefault_full(), u = Object.prototype.hasOwnProperty, a = 1, c = 2, r = 3, i = 4, t = 1, n = 2, s = 3, m = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, y = /[\x85\u2028\u2029]/, E = /[,\[\]\{\}]/, g = /^(?:!|!!|![a-z\-]+!)$/i, q = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function C(l) {
    return Object.prototype.toString.call(l);
  }
  function P(l) {
    return l === 10 || l === 13;
  }
  function $(l) {
    return l === 9 || l === 32;
  }
  function b(l) {
    return l === 9 || l === 32 || l === 10 || l === 13;
  }
  function I(l) {
    return l === 44 || l === 91 || l === 93 || l === 123 || l === 125;
  }
  function T(l) {
    var D;
    return 48 <= l && l <= 57 ? l - 48 : (D = l | 32, 97 <= D && D <= 102 ? D - 97 + 10 : -1);
  }
  function A(l) {
    return l === 120 ? 2 : l === 117 ? 4 : l === 85 ? 8 : 0;
  }
  function _(l) {
    return 48 <= l && l <= 57 ? l - 48 : -1;
  }
  function z(l) {
    return l === 48 ? "\0" : l === 97 ? "\x07" : l === 98 ? "\b" : l === 116 || l === 9 ? "	" : l === 110 ? `
` : l === 118 ? "\v" : l === 102 ? "\f" : l === 114 ? "\r" : l === 101 ? "\x1B" : l === 32 ? " " : l === 34 ? '"' : l === 47 ? "/" : l === 92 ? "\\" : l === 78 ? "" : l === 95 ? " " : l === 76 ? "\u2028" : l === 80 ? "\u2029" : "";
  }
  function J(l) {
    return l <= 65535 ? String.fromCharCode(l) : String.fromCharCode(
      (l - 65536 >> 10) + 55296,
      (l - 65536 & 1023) + 56320
    );
  }
  function H(l, D, B) {
    D === "__proto__" ? Object.defineProperty(l, D, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: B
    }) : l[D] = B;
  }
  for (var X = new Array(256), N = new Array(256), U = 0; U < 256; U++)
    X[U] = z(U) ? 1 : 0, N[U] = z(U);
  function ne(l, D) {
    this.input = l, this.filename = D.filename || null, this.schema = D.schema || f, this.onWarning = D.onWarning || null, this.legacy = D.legacy || !1, this.json = D.json || !1, this.listener = D.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = l.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
  }
  function L(l, D) {
    return new h(
      D,
      new p(l.filename, l.input, l.position, l.line, l.position - l.lineStart)
    );
  }
  function K(l, D) {
    throw L(l, D);
  }
  function ue(l, D) {
    l.onWarning && l.onWarning.call(null, L(l, D));
  }
  var fe = {
    YAML: function(D, B, Q) {
      var V, w, M;
      D.version !== null && K(D, "duplication of %YAML directive"), Q.length !== 1 && K(D, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(Q[0]), V === null && K(D, "ill-formed argument of the YAML directive"), w = parseInt(V[1], 10), M = parseInt(V[2], 10), w !== 1 && K(D, "unacceptable YAML version of the document"), D.version = Q[0], D.checkLineBreaks = M < 2, M !== 1 && M !== 2 && ue(D, "unsupported YAML version of the document");
    },
    TAG: function(D, B, Q) {
      var V, w;
      Q.length !== 2 && K(D, "TAG directive accepts exactly two arguments"), V = Q[0], w = Q[1], g.test(V) || K(D, "ill-formed tag handle (first argument) of the TAG directive"), u.call(D.tagMap, V) && K(D, 'there is a previously declared suffix for "' + V + '" tag handle'), q.test(w) || K(D, "ill-formed tag prefix (second argument) of the TAG directive"), D.tagMap[V] = w;
    }
  };
  function ge(l, D, B, Q) {
    var V, w, M, Z;
    if (D < B) {
      if (Z = l.input.slice(D, B), Q)
        for (V = 0, w = Z.length; V < w; V += 1)
          M = Z.charCodeAt(V), M === 9 || 32 <= M && M <= 1114111 || K(l, "expected valid JSON character");
      else m.test(Z) && K(l, "the stream contains non-printable characters");
      l.result += Z;
    }
  }
  function de(l, D, B, Q) {
    var V, w, M, Z;
    for (e.isObject(B) || K(l, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(B), M = 0, Z = V.length; M < Z; M += 1)
      w = V[M], u.call(D, w) || (H(D, w, B[w]), Q[w] = !0);
  }
  function _e(l, D, B, Q, V, w, M, Z) {
    var W, v;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), W = 0, v = V.length; W < v; W += 1)
        Array.isArray(V[W]) && K(l, "nested arrays are not supported inside keys"), typeof V == "object" && C(V[W]) === "[object Object]" && (V[W] = "[object Object]");
    if (typeof V == "object" && C(V) === "[object Object]" && (V = "[object Object]"), V = String(V), D === null && (D = {}), Q === "tag:yaml.org,2002:merge")
      if (Array.isArray(w))
        for (W = 0, v = w.length; W < v; W += 1)
          de(l, D, w[W], B);
      else
        de(l, D, w, B);
    else
      !l.json && !u.call(B, V) && u.call(D, V) && (l.line = M || l.line, l.position = Z || l.position, K(l, "duplicated mapping key")), H(D, V, w), delete B[V];
    return D;
  }
  function we(l) {
    var D;
    D = l.input.charCodeAt(l.position), D === 10 ? l.position++ : D === 13 ? (l.position++, l.input.charCodeAt(l.position) === 10 && l.position++) : K(l, "a line break is expected"), l.line += 1, l.lineStart = l.position;
  }
  function ie(l, D, B) {
    for (var Q = 0, V = l.input.charCodeAt(l.position); V !== 0; ) {
      for (; $(V); )
        V = l.input.charCodeAt(++l.position);
      if (D && V === 35)
        do
          V = l.input.charCodeAt(++l.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (P(V))
        for (we(l), V = l.input.charCodeAt(l.position), Q++, l.lineIndent = 0; V === 32; )
          l.lineIndent++, V = l.input.charCodeAt(++l.position);
      else
        break;
    }
    return B !== -1 && Q !== 0 && l.lineIndent < B && ue(l, "deficient indentation"), Q;
  }
  function Ee(l) {
    var D = l.position, B;
    return B = l.input.charCodeAt(D), !!((B === 45 || B === 46) && B === l.input.charCodeAt(D + 1) && B === l.input.charCodeAt(D + 2) && (D += 3, B = l.input.charCodeAt(D), B === 0 || b(B)));
  }
  function S(l, D) {
    D === 1 ? l.result += " " : D > 1 && (l.result += e.repeat(`
`, D - 1));
  }
  function R(l, D, B) {
    var Q, V, w, M, Z, W, v, O, F = l.kind, G = l.result, j;
    if (j = l.input.charCodeAt(l.position), b(j) || I(j) || j === 35 || j === 38 || j === 42 || j === 33 || j === 124 || j === 62 || j === 39 || j === 34 || j === 37 || j === 64 || j === 96 || (j === 63 || j === 45) && (V = l.input.charCodeAt(l.position + 1), b(V) || B && I(V)))
      return !1;
    for (l.kind = "scalar", l.result = "", w = M = l.position, Z = !1; j !== 0; ) {
      if (j === 58) {
        if (V = l.input.charCodeAt(l.position + 1), b(V) || B && I(V))
          break;
      } else if (j === 35) {
        if (Q = l.input.charCodeAt(l.position - 1), b(Q))
          break;
      } else {
        if (l.position === l.lineStart && Ee(l) || B && I(j))
          break;
        if (P(j))
          if (W = l.line, v = l.lineStart, O = l.lineIndent, ie(l, !1, -1), l.lineIndent >= D) {
            Z = !0, j = l.input.charCodeAt(l.position);
            continue;
          } else {
            l.position = M, l.line = W, l.lineStart = v, l.lineIndent = O;
            break;
          }
      }
      Z && (ge(l, w, M, !1), S(l, l.line - W), w = M = l.position, Z = !1), $(j) || (M = l.position + 1), j = l.input.charCodeAt(++l.position);
    }
    return ge(l, w, M, !1), l.result ? !0 : (l.kind = F, l.result = G, !1);
  }
  function te(l, D) {
    var B, Q, V;
    if (B = l.input.charCodeAt(l.position), B !== 39)
      return !1;
    for (l.kind = "scalar", l.result = "", l.position++, Q = V = l.position; (B = l.input.charCodeAt(l.position)) !== 0; )
      if (B === 39)
        if (ge(l, Q, l.position, !0), B = l.input.charCodeAt(++l.position), B === 39)
          Q = l.position, l.position++, V = l.position;
        else
          return !0;
      else P(B) ? (ge(l, Q, V, !0), S(l, ie(l, !1, D)), Q = V = l.position) : l.position === l.lineStart && Ee(l) ? K(l, "unexpected end of the document within a single quoted scalar") : (l.position++, V = l.position);
    K(l, "unexpected end of the stream within a single quoted scalar");
  }
  function k(l, D) {
    var B, Q, V, w, M, Z;
    if (Z = l.input.charCodeAt(l.position), Z !== 34)
      return !1;
    for (l.kind = "scalar", l.result = "", l.position++, B = Q = l.position; (Z = l.input.charCodeAt(l.position)) !== 0; ) {
      if (Z === 34)
        return ge(l, B, l.position, !0), l.position++, !0;
      if (Z === 92) {
        if (ge(l, B, l.position, !0), Z = l.input.charCodeAt(++l.position), P(Z))
          ie(l, !1, D);
        else if (Z < 256 && X[Z])
          l.result += N[Z], l.position++;
        else if ((M = A(Z)) > 0) {
          for (V = M, w = 0; V > 0; V--)
            Z = l.input.charCodeAt(++l.position), (M = T(Z)) >= 0 ? w = (w << 4) + M : K(l, "expected hexadecimal character");
          l.result += J(w), l.position++;
        } else
          K(l, "unknown escape sequence");
        B = Q = l.position;
      } else P(Z) ? (ge(l, B, Q, !0), S(l, ie(l, !1, D)), B = Q = l.position) : l.position === l.lineStart && Ee(l) ? K(l, "unexpected end of the document within a double quoted scalar") : (l.position++, Q = l.position);
    }
    K(l, "unexpected end of the stream within a double quoted scalar");
  }
  function pe(l, D) {
    var B = !0, Q, V = l.tag, w, M = l.anchor, Z, W, v, O, F, G = {}, j, ae, oe, le;
    if (le = l.input.charCodeAt(l.position), le === 91)
      W = 93, F = !1, w = [];
    else if (le === 123)
      W = 125, F = !0, w = {};
    else
      return !1;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = w), le = l.input.charCodeAt(++l.position); le !== 0; ) {
      if (ie(l, !0, D), le = l.input.charCodeAt(l.position), le === W)
        return l.position++, l.tag = V, l.anchor = M, l.kind = F ? "mapping" : "sequence", l.result = w, !0;
      B || K(l, "missed comma between flow collection entries"), ae = j = oe = null, v = O = !1, le === 63 && (Z = l.input.charCodeAt(l.position + 1), b(Z) && (v = O = !0, l.position++, ie(l, !0, D))), Q = l.line, xe(l, D, a, !1, !0), ae = l.tag, j = l.result, ie(l, !0, D), le = l.input.charCodeAt(l.position), (O || l.line === Q) && le === 58 && (v = !0, le = l.input.charCodeAt(++l.position), ie(l, !0, D), xe(l, D, a, !1, !0), oe = l.result), F ? _e(l, w, G, ae, j, oe) : v ? w.push(_e(l, null, G, ae, j, oe)) : w.push(j), ie(l, !0, D), le = l.input.charCodeAt(l.position), le === 44 ? (B = !0, le = l.input.charCodeAt(++l.position)) : B = !1;
    }
    K(l, "unexpected end of the stream within a flow collection");
  }
  function ye(l, D) {
    var B, Q, V = t, w = !1, M = !1, Z = D, W = 0, v = !1, O, F;
    if (F = l.input.charCodeAt(l.position), F === 124)
      Q = !1;
    else if (F === 62)
      Q = !0;
    else
      return !1;
    for (l.kind = "scalar", l.result = ""; F !== 0; )
      if (F = l.input.charCodeAt(++l.position), F === 43 || F === 45)
        t === V ? V = F === 43 ? s : n : K(l, "repeat of a chomping mode identifier");
      else if ((O = _(F)) >= 0)
        O === 0 ? K(l, "bad explicit indentation width of a block scalar; it cannot be less than one") : M ? K(l, "repeat of an indentation width identifier") : (Z = D + O - 1, M = !0);
      else
        break;
    if ($(F)) {
      do
        F = l.input.charCodeAt(++l.position);
      while ($(F));
      if (F === 35)
        do
          F = l.input.charCodeAt(++l.position);
        while (!P(F) && F !== 0);
    }
    for (; F !== 0; ) {
      for (we(l), l.lineIndent = 0, F = l.input.charCodeAt(l.position); (!M || l.lineIndent < Z) && F === 32; )
        l.lineIndent++, F = l.input.charCodeAt(++l.position);
      if (!M && l.lineIndent > Z && (Z = l.lineIndent), P(F)) {
        W++;
        continue;
      }
      if (l.lineIndent < Z) {
        V === s ? l.result += e.repeat(`
`, w ? 1 + W : W) : V === t && w && (l.result += `
`);
        break;
      }
      for (Q ? $(F) ? (v = !0, l.result += e.repeat(`
`, w ? 1 + W : W)) : v ? (v = !1, l.result += e.repeat(`
`, W + 1)) : W === 0 ? w && (l.result += " ") : l.result += e.repeat(`
`, W) : l.result += e.repeat(`
`, w ? 1 + W : W), w = !0, M = !0, W = 0, B = l.position; !P(F) && F !== 0; )
        F = l.input.charCodeAt(++l.position);
      ge(l, B, l.position, !1);
    }
    return !0;
  }
  function ve(l, D) {
    var B, Q = l.tag, V = l.anchor, w = [], M, Z = !1, W;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = w), W = l.input.charCodeAt(l.position); W !== 0 && !(W !== 45 || (M = l.input.charCodeAt(l.position + 1), !b(M))); ) {
      if (Z = !0, l.position++, ie(l, !0, -1) && l.lineIndent <= D) {
        w.push(null), W = l.input.charCodeAt(l.position);
        continue;
      }
      if (B = l.line, xe(l, D, r, !1, !0), w.push(l.result), ie(l, !0, -1), W = l.input.charCodeAt(l.position), (l.line === B || l.lineIndent > D) && W !== 0)
        K(l, "bad indentation of a sequence entry");
      else if (l.lineIndent < D)
        break;
    }
    return Z ? (l.tag = Q, l.anchor = V, l.kind = "sequence", l.result = w, !0) : !1;
  }
  function qe(l, D, B) {
    var Q, V, w, M, Z = l.tag, W = l.anchor, v = {}, O = {}, F = null, G = null, j = null, ae = !1, oe = !1, le;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = v), le = l.input.charCodeAt(l.position); le !== 0; ) {
      if (Q = l.input.charCodeAt(l.position + 1), w = l.line, M = l.position, (le === 63 || le === 58) && b(Q))
        le === 63 ? (ae && (_e(l, v, O, F, G, null), F = G = j = null), oe = !0, ae = !0, V = !0) : ae ? (ae = !1, V = !0) : K(l, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), l.position += 1, le = Q;
      else if (xe(l, B, c, !1, !0))
        if (l.line === w) {
          for (le = l.input.charCodeAt(l.position); $(le); )
            le = l.input.charCodeAt(++l.position);
          if (le === 58)
            le = l.input.charCodeAt(++l.position), b(le) || K(l, "a whitespace character is expected after the key-value separator within a block mapping"), ae && (_e(l, v, O, F, G, null), F = G = j = null), oe = !0, ae = !1, V = !1, F = l.tag, G = l.result;
          else if (oe)
            K(l, "can not read an implicit mapping pair; a colon is missed");
          else
            return l.tag = Z, l.anchor = W, !0;
        } else if (oe)
          K(l, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return l.tag = Z, l.anchor = W, !0;
      else
        break;
      if ((l.line === w || l.lineIndent > D) && (xe(l, D, i, !0, V) && (ae ? G = l.result : j = l.result), ae || (_e(l, v, O, F, G, j, w, M), F = G = j = null), ie(l, !0, -1), le = l.input.charCodeAt(l.position)), l.lineIndent > D && le !== 0)
        K(l, "bad indentation of a mapping entry");
      else if (l.lineIndent < D)
        break;
    }
    return ae && _e(l, v, O, F, G, null), oe && (l.tag = Z, l.anchor = W, l.kind = "mapping", l.result = v), oe;
  }
  function Re(l) {
    var D, B = !1, Q = !1, V, w, M;
    if (M = l.input.charCodeAt(l.position), M !== 33) return !1;
    if (l.tag !== null && K(l, "duplication of a tag property"), M = l.input.charCodeAt(++l.position), M === 60 ? (B = !0, M = l.input.charCodeAt(++l.position)) : M === 33 ? (Q = !0, V = "!!", M = l.input.charCodeAt(++l.position)) : V = "!", D = l.position, B) {
      do
        M = l.input.charCodeAt(++l.position);
      while (M !== 0 && M !== 62);
      l.position < l.length ? (w = l.input.slice(D, l.position), M = l.input.charCodeAt(++l.position)) : K(l, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; M !== 0 && !b(M); )
        M === 33 && (Q ? K(l, "tag suffix cannot contain exclamation marks") : (V = l.input.slice(D - 1, l.position + 1), g.test(V) || K(l, "named tag handle cannot contain such characters"), Q = !0, D = l.position + 1)), M = l.input.charCodeAt(++l.position);
      w = l.input.slice(D, l.position), E.test(w) && K(l, "tag suffix cannot contain flow indicator characters");
    }
    return w && !q.test(w) && K(l, "tag name cannot contain such characters: " + w), B ? l.tag = w : u.call(l.tagMap, V) ? l.tag = l.tagMap[V] + w : V === "!" ? l.tag = "!" + w : V === "!!" ? l.tag = "tag:yaml.org,2002:" + w : K(l, 'undeclared tag handle "' + V + '"'), !0;
  }
  function Ie(l) {
    var D, B;
    if (B = l.input.charCodeAt(l.position), B !== 38) return !1;
    for (l.anchor !== null && K(l, "duplication of an anchor property"), B = l.input.charCodeAt(++l.position), D = l.position; B !== 0 && !b(B) && !I(B); )
      B = l.input.charCodeAt(++l.position);
    return l.position === D && K(l, "name of an anchor node must contain at least one character"), l.anchor = l.input.slice(D, l.position), !0;
  }
  function Ce(l) {
    var D, B, Q;
    if (Q = l.input.charCodeAt(l.position), Q !== 42) return !1;
    for (Q = l.input.charCodeAt(++l.position), D = l.position; Q !== 0 && !b(Q) && !I(Q); )
      Q = l.input.charCodeAt(++l.position);
    return l.position === D && K(l, "name of an alias node must contain at least one character"), B = l.input.slice(D, l.position), u.call(l.anchorMap, B) || K(l, 'unidentified alias "' + B + '"'), l.result = l.anchorMap[B], ie(l, !0, -1), !0;
  }
  function xe(l, D, B, Q, V) {
    var w, M, Z, W = 1, v = !1, O = !1, F, G, j, ae, oe;
    if (l.listener !== null && l.listener("open", l), l.tag = null, l.anchor = null, l.kind = null, l.result = null, w = M = Z = i === B || r === B, Q && ie(l, !0, -1) && (v = !0, l.lineIndent > D ? W = 1 : l.lineIndent === D ? W = 0 : l.lineIndent < D && (W = -1)), W === 1)
      for (; Re(l) || Ie(l); )
        ie(l, !0, -1) ? (v = !0, Z = w, l.lineIndent > D ? W = 1 : l.lineIndent === D ? W = 0 : l.lineIndent < D && (W = -1)) : Z = !1;
    if (Z && (Z = v || V), (W === 1 || i === B) && (a === B || c === B ? ae = D : ae = D + 1, oe = l.position - l.lineStart, W === 1 ? Z && (ve(l, oe) || qe(l, oe, ae)) || pe(l, ae) ? O = !0 : (M && ye(l, ae) || te(l, ae) || k(l, ae) ? O = !0 : Ce(l) ? (O = !0, (l.tag !== null || l.anchor !== null) && K(l, "alias node should not have any properties")) : R(l, ae, a === B) && (O = !0, l.tag === null && (l.tag = "?")), l.anchor !== null && (l.anchorMap[l.anchor] = l.result)) : W === 0 && (O = Z && ve(l, oe))), l.tag !== null && l.tag !== "!")
      if (l.tag === "?") {
        for (l.result !== null && l.kind !== "scalar" && K(l, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + l.kind + '"'), F = 0, G = l.implicitTypes.length; F < G; F += 1)
          if (j = l.implicitTypes[F], j.resolve(l.result)) {
            l.result = j.construct(l.result), l.tag = j.tag, l.anchor !== null && (l.anchorMap[l.anchor] = l.result);
            break;
          }
      } else u.call(l.typeMap[l.kind || "fallback"], l.tag) ? (j = l.typeMap[l.kind || "fallback"][l.tag], l.result !== null && j.kind !== l.kind && K(l, "unacceptable node kind for !<" + l.tag + '> tag; it should be "' + j.kind + '", not "' + l.kind + '"'), j.resolve(l.result) ? (l.result = j.construct(l.result), l.anchor !== null && (l.anchorMap[l.anchor] = l.result)) : K(l, "cannot resolve a node with !<" + l.tag + "> explicit tag")) : K(l, "unknown tag !<" + l.tag + ">");
    return l.listener !== null && l.listener("close", l), l.tag !== null || l.anchor !== null || O;
  }
  function Be(l) {
    var D = l.position, B, Q, V, w = !1, M;
    for (l.version = null, l.checkLineBreaks = l.legacy, l.tagMap = {}, l.anchorMap = {}; (M = l.input.charCodeAt(l.position)) !== 0 && (ie(l, !0, -1), M = l.input.charCodeAt(l.position), !(l.lineIndent > 0 || M !== 37)); ) {
      for (w = !0, M = l.input.charCodeAt(++l.position), B = l.position; M !== 0 && !b(M); )
        M = l.input.charCodeAt(++l.position);
      for (Q = l.input.slice(B, l.position), V = [], Q.length < 1 && K(l, "directive name must not be less than one character in length"); M !== 0; ) {
        for (; $(M); )
          M = l.input.charCodeAt(++l.position);
        if (M === 35) {
          do
            M = l.input.charCodeAt(++l.position);
          while (M !== 0 && !P(M));
          break;
        }
        if (P(M)) break;
        for (B = l.position; M !== 0 && !b(M); )
          M = l.input.charCodeAt(++l.position);
        V.push(l.input.slice(B, l.position));
      }
      M !== 0 && we(l), u.call(fe, Q) ? fe[Q](l, Q, V) : ue(l, 'unknown document directive "' + Q + '"');
    }
    if (ie(l, !0, -1), l.lineIndent === 0 && l.input.charCodeAt(l.position) === 45 && l.input.charCodeAt(l.position + 1) === 45 && l.input.charCodeAt(l.position + 2) === 45 ? (l.position += 3, ie(l, !0, -1)) : w && K(l, "directives end mark is expected"), xe(l, l.lineIndent - 1, i, !1, !0), ie(l, !0, -1), l.checkLineBreaks && y.test(l.input.slice(D, l.position)) && ue(l, "non-ASCII line breaks are interpreted as content"), l.documents.push(l.result), l.position === l.lineStart && Ee(l)) {
      l.input.charCodeAt(l.position) === 46 && (l.position += 3, ie(l, !0, -1));
      return;
    }
    if (l.position < l.length - 1)
      K(l, "end of the stream or a document separator is expected");
    else
      return;
  }
  function ke(l, D) {
    l = String(l), D = D || {}, l.length !== 0 && (l.charCodeAt(l.length - 1) !== 10 && l.charCodeAt(l.length - 1) !== 13 && (l += `
`), l.charCodeAt(0) === 65279 && (l = l.slice(1)));
    var B = new ne(l, D), Q = l.indexOf("\0");
    for (Q !== -1 && (B.position = Q, K(B, "null byte is not allowed in input")), B.input += "\0"; B.input.charCodeAt(B.position) === 32; )
      B.lineIndent += 1, B.position += 1;
    for (; B.position < B.length - 1; )
      Be(B);
    return B.documents;
  }
  function Ue(l, D, B) {
    D !== null && typeof D == "object" && typeof B > "u" && (B = D, D = null);
    var Q = ke(l, B);
    if (typeof D != "function")
      return Q;
    for (var V = 0, w = Q.length; V < w; V += 1)
      D(Q[V]);
  }
  function d(l, D) {
    var B = ke(l, D);
    if (B.length !== 0) {
      if (B.length === 1)
        return B[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  function ee(l, D, B) {
    return typeof D == "object" && D !== null && typeof B > "u" && (B = D, D = null), Ue(l, D, e.extend({ schema: o }, B));
  }
  function se(l, D) {
    return d(l, e.extend({ schema: o }, D));
  }
  return loader$1.loadAll = Ue, loader$1.load = d, loader$1.safeLoadAll = ee, loader$1.safeLoad = se, loader$1;
}
var dumper$1 = {}, hasRequiredDumper$1;
function requireDumper$1() {
  if (hasRequiredDumper$1) return dumper$1;
  hasRequiredDumper$1 = 1;
  var e = requireCommon$2(), h = requireException$1(), p = requireDefault_full(), o = requireDefault_safe(), f = Object.prototype.toString, u = Object.prototype.hasOwnProperty, a = 9, c = 10, r = 13, i = 32, t = 33, n = 34, s = 35, m = 37, y = 38, E = 39, g = 42, q = 44, C = 45, P = 58, $ = 61, b = 62, I = 63, T = 64, A = 91, _ = 93, z = 96, J = 123, H = 124, X = 125, N = {};
  N[0] = "\\0", N[7] = "\\a", N[8] = "\\b", N[9] = "\\t", N[10] = "\\n", N[11] = "\\v", N[12] = "\\f", N[13] = "\\r", N[27] = "\\e", N[34] = '\\"', N[92] = "\\\\", N[133] = "\\N", N[160] = "\\_", N[8232] = "\\L", N[8233] = "\\P";
  var U = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  function ne(w, M) {
    var Z, W, v, O, F, G, j;
    if (M === null) return {};
    for (Z = {}, W = Object.keys(M), v = 0, O = W.length; v < O; v += 1)
      F = W[v], G = String(M[F]), F.slice(0, 2) === "!!" && (F = "tag:yaml.org,2002:" + F.slice(2)), j = w.compiledTypeMap.fallback[F], j && u.call(j.styleAliases, G) && (G = j.styleAliases[G]), Z[F] = G;
    return Z;
  }
  function L(w) {
    var M, Z, W;
    if (M = w.toString(16).toUpperCase(), w <= 255)
      Z = "x", W = 2;
    else if (w <= 65535)
      Z = "u", W = 4;
    else if (w <= 4294967295)
      Z = "U", W = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + Z + e.repeat("0", W - M.length) + M;
  }
  function K(w) {
    this.schema = w.schema || p, this.indent = Math.max(1, w.indent || 2), this.noArrayIndent = w.noArrayIndent || !1, this.skipInvalid = w.skipInvalid || !1, this.flowLevel = e.isNothing(w.flowLevel) ? -1 : w.flowLevel, this.styleMap = ne(this.schema, w.styles || null), this.sortKeys = w.sortKeys || !1, this.lineWidth = w.lineWidth || 80, this.noRefs = w.noRefs || !1, this.noCompatMode = w.noCompatMode || !1, this.condenseFlow = w.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(w, M) {
    for (var Z = e.repeat(" ", M), W = 0, v = -1, O = "", F, G = w.length; W < G; )
      v = w.indexOf(`
`, W), v === -1 ? (F = w.slice(W), W = G) : (F = w.slice(W, v + 1), W = v + 1), F.length && F !== `
` && (O += Z), O += F;
    return O;
  }
  function fe(w, M) {
    return `
` + e.repeat(" ", w.indent * M);
  }
  function ge(w, M) {
    var Z, W, v;
    for (Z = 0, W = w.implicitTypes.length; Z < W; Z += 1)
      if (v = w.implicitTypes[Z], v.resolve(M))
        return !0;
    return !1;
  }
  function de(w) {
    return w === i || w === a;
  }
  function _e(w) {
    return 32 <= w && w <= 126 || 161 <= w && w <= 55295 && w !== 8232 && w !== 8233 || 57344 <= w && w <= 65533 && w !== 65279 || 65536 <= w && w <= 1114111;
  }
  function we(w) {
    return _e(w) && !de(w) && w !== 65279 && w !== r && w !== c;
  }
  function ie(w, M) {
    return _e(w) && w !== 65279 && w !== q && w !== A && w !== _ && w !== J && w !== X && w !== P && (w !== s || M && we(M));
  }
  function Ee(w) {
    return _e(w) && w !== 65279 && !de(w) && w !== C && w !== I && w !== P && w !== q && w !== A && w !== _ && w !== J && w !== X && w !== s && w !== y && w !== g && w !== t && w !== H && w !== $ && w !== b && w !== E && w !== n && w !== m && w !== T && w !== z;
  }
  function S(w) {
    var M = /^\n* /;
    return M.test(w);
  }
  var R = 1, te = 2, k = 3, pe = 4, ye = 5;
  function ve(w, M, Z, W, v) {
    var O, F, G, j = !1, ae = !1, oe = W !== -1, le = -1, he = Ee(w.charCodeAt(0)) && !de(w.charCodeAt(w.length - 1));
    if (M)
      for (O = 0; O < w.length; O++) {
        if (F = w.charCodeAt(O), !_e(F))
          return ye;
        G = O > 0 ? w.charCodeAt(O - 1) : null, he = he && ie(F, G);
      }
    else {
      for (O = 0; O < w.length; O++) {
        if (F = w.charCodeAt(O), F === c)
          j = !0, oe && (ae = ae || // Foldable line = too long, and not more-indented.
          O - le - 1 > W && w[le + 1] !== " ", le = O);
        else if (!_e(F))
          return ye;
        G = O > 0 ? w.charCodeAt(O - 1) : null, he = he && ie(F, G);
      }
      ae = ae || oe && O - le - 1 > W && w[le + 1] !== " ";
    }
    return !j && !ae ? he && !v(w) ? R : te : Z > 9 && S(w) ? ye : ae ? pe : k;
  }
  function qe(w, M, Z, W) {
    w.dump = (function() {
      if (M.length === 0)
        return "''";
      if (!w.noCompatMode && U.indexOf(M) !== -1)
        return "'" + M + "'";
      var v = w.indent * Math.max(1, Z), O = w.lineWidth === -1 ? -1 : Math.max(Math.min(w.lineWidth, 40), w.lineWidth - v), F = W || w.flowLevel > -1 && Z >= w.flowLevel;
      function G(j) {
        return ge(w, j);
      }
      switch (ve(M, F, w.indent, O, G)) {
        case R:
          return M;
        case te:
          return "'" + M.replace(/'/g, "''") + "'";
        case k:
          return "|" + Re(M, w.indent) + Ie(ue(M, v));
        case pe:
          return ">" + Re(M, w.indent) + Ie(ue(Ce(M, O), v));
        case ye:
          return '"' + Be(M) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    })();
  }
  function Re(w, M) {
    var Z = S(w) ? String(M) : "", W = w[w.length - 1] === `
`, v = W && (w[w.length - 2] === `
` || w === `
`), O = v ? "+" : W ? "" : "-";
    return Z + O + `
`;
  }
  function Ie(w) {
    return w[w.length - 1] === `
` ? w.slice(0, -1) : w;
  }
  function Ce(w, M) {
    for (var Z = /(\n+)([^\n]*)/g, W = (function() {
      var ae = w.indexOf(`
`);
      return ae = ae !== -1 ? ae : w.length, Z.lastIndex = ae, xe(w.slice(0, ae), M);
    })(), v = w[0] === `
` || w[0] === " ", O, F; F = Z.exec(w); ) {
      var G = F[1], j = F[2];
      O = j[0] === " ", W += G + (!v && !O && j !== "" ? `
` : "") + xe(j, M), v = O;
    }
    return W;
  }
  function xe(w, M) {
    if (w === "" || w[0] === " ") return w;
    for (var Z = / [^ ]/g, W, v = 0, O, F = 0, G = 0, j = ""; W = Z.exec(w); )
      G = W.index, G - v > M && (O = F > v ? F : G, j += `
` + w.slice(v, O), v = O + 1), F = G;
    return j += `
`, w.length - v > M && F > v ? j += w.slice(v, F) + `
` + w.slice(F + 1) : j += w.slice(v), j.slice(1);
  }
  function Be(w) {
    for (var M = "", Z, W, v, O = 0; O < w.length; O++) {
      if (Z = w.charCodeAt(O), Z >= 55296 && Z <= 56319 && (W = w.charCodeAt(O + 1), W >= 56320 && W <= 57343)) {
        M += L((Z - 55296) * 1024 + W - 56320 + 65536), O++;
        continue;
      }
      v = N[Z], M += !v && _e(Z) ? w[O] : v || L(Z);
    }
    return M;
  }
  function ke(w, M, Z) {
    var W = "", v = w.tag, O, F;
    for (O = 0, F = Z.length; O < F; O += 1)
      l(w, M, Z[O], !1, !1) && (O !== 0 && (W += "," + (w.condenseFlow ? "" : " ")), W += w.dump);
    w.tag = v, w.dump = "[" + W + "]";
  }
  function Ue(w, M, Z, W) {
    var v = "", O = w.tag, F, G;
    for (F = 0, G = Z.length; F < G; F += 1)
      l(w, M + 1, Z[F], !0, !0) && ((!W || F !== 0) && (v += fe(w, M)), w.dump && c === w.dump.charCodeAt(0) ? v += "-" : v += "- ", v += w.dump);
    w.tag = O, w.dump = v || "[]";
  }
  function d(w, M, Z) {
    var W = "", v = w.tag, O = Object.keys(Z), F, G, j, ae, oe;
    for (F = 0, G = O.length; F < G; F += 1)
      oe = "", F !== 0 && (oe += ", "), w.condenseFlow && (oe += '"'), j = O[F], ae = Z[j], l(w, M, j, !1, !1) && (w.dump.length > 1024 && (oe += "? "), oe += w.dump + (w.condenseFlow ? '"' : "") + ":" + (w.condenseFlow ? "" : " "), l(w, M, ae, !1, !1) && (oe += w.dump, W += oe));
    w.tag = v, w.dump = "{" + W + "}";
  }
  function ee(w, M, Z, W) {
    var v = "", O = w.tag, F = Object.keys(Z), G, j, ae, oe, le, he;
    if (w.sortKeys === !0)
      F.sort();
    else if (typeof w.sortKeys == "function")
      F.sort(w.sortKeys);
    else if (w.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (G = 0, j = F.length; G < j; G += 1)
      he = "", (!W || G !== 0) && (he += fe(w, M)), ae = F[G], oe = Z[ae], l(w, M + 1, ae, !0, !0, !0) && (le = w.tag !== null && w.tag !== "?" || w.dump && w.dump.length > 1024, le && (w.dump && c === w.dump.charCodeAt(0) ? he += "?" : he += "? "), he += w.dump, le && (he += fe(w, M)), l(w, M + 1, oe, !0, le) && (w.dump && c === w.dump.charCodeAt(0) ? he += ":" : he += ": ", he += w.dump, v += he));
    w.tag = O, w.dump = v || "{}";
  }
  function se(w, M, Z) {
    var W, v, O, F, G, j;
    for (v = Z ? w.explicitTypes : w.implicitTypes, O = 0, F = v.length; O < F; O += 1)
      if (G = v[O], (G.instanceOf || G.predicate) && (!G.instanceOf || typeof M == "object" && M instanceof G.instanceOf) && (!G.predicate || G.predicate(M))) {
        if (w.tag = Z ? G.tag : "?", G.represent) {
          if (j = w.styleMap[G.tag] || G.defaultStyle, f.call(G.represent) === "[object Function]")
            W = G.represent(M, j);
          else if (u.call(G.represent, j))
            W = G.represent[j](M, j);
          else
            throw new h("!<" + G.tag + '> tag resolver accepts not "' + j + '" style');
          w.dump = W;
        }
        return !0;
      }
    return !1;
  }
  function l(w, M, Z, W, v, O) {
    w.tag = null, w.dump = Z, se(w, Z, !1) || se(w, Z, !0);
    var F = f.call(w.dump);
    W && (W = w.flowLevel < 0 || w.flowLevel > M);
    var G = F === "[object Object]" || F === "[object Array]", j, ae;
    if (G && (j = w.duplicates.indexOf(Z), ae = j !== -1), (w.tag !== null && w.tag !== "?" || ae || w.indent !== 2 && M > 0) && (v = !1), ae && w.usedDuplicates[j])
      w.dump = "*ref_" + j;
    else {
      if (G && ae && !w.usedDuplicates[j] && (w.usedDuplicates[j] = !0), F === "[object Object]")
        W && Object.keys(w.dump).length !== 0 ? (ee(w, M, w.dump, v), ae && (w.dump = "&ref_" + j + w.dump)) : (d(w, M, w.dump), ae && (w.dump = "&ref_" + j + " " + w.dump));
      else if (F === "[object Array]") {
        var oe = w.noArrayIndent && M > 0 ? M - 1 : M;
        W && w.dump.length !== 0 ? (Ue(w, oe, w.dump, v), ae && (w.dump = "&ref_" + j + w.dump)) : (ke(w, oe, w.dump), ae && (w.dump = "&ref_" + j + " " + w.dump));
      } else if (F === "[object String]")
        w.tag !== "?" && qe(w, w.dump, M, O);
      else {
        if (w.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + F);
      }
      w.tag !== null && w.tag !== "?" && (w.dump = "!<" + w.tag + "> " + w.dump);
    }
    return !0;
  }
  function D(w, M) {
    var Z = [], W = [], v, O;
    for (B(w, Z, W), v = 0, O = W.length; v < O; v += 1)
      M.duplicates.push(Z[W[v]]);
    M.usedDuplicates = new Array(O);
  }
  function B(w, M, Z) {
    var W, v, O;
    if (w !== null && typeof w == "object")
      if (v = M.indexOf(w), v !== -1)
        Z.indexOf(v) === -1 && Z.push(v);
      else if (M.push(w), Array.isArray(w))
        for (v = 0, O = w.length; v < O; v += 1)
          B(w[v], M, Z);
      else
        for (W = Object.keys(w), v = 0, O = W.length; v < O; v += 1)
          B(w[W[v]], M, Z);
  }
  function Q(w, M) {
    M = M || {};
    var Z = new K(M);
    return Z.noRefs || D(w, Z), l(Z, 0, w, !0, !0) ? Z.dump + `
` : "";
  }
  function V(w, M) {
    return Q(w, e.extend({ schema: o }, M));
  }
  return dumper$1.dump = Q, dumper$1.safeDump = V, dumper$1;
}
var hasRequiredJsYaml$2;
function requireJsYaml$2() {
  if (hasRequiredJsYaml$2) return jsYaml$2;
  hasRequiredJsYaml$2 = 1;
  var e = requireLoader$1(), h = requireDumper$1();
  function p(o) {
    return function() {
      throw new Error("Function " + o + " is deprecated and cannot be used.");
    };
  }
  return jsYaml$2.Type = requireType$1(), jsYaml$2.Schema = requireSchema$1(), jsYaml$2.FAILSAFE_SCHEMA = requireFailsafe$1(), jsYaml$2.JSON_SCHEMA = requireJson$2(), jsYaml$2.CORE_SCHEMA = requireCore$1(), jsYaml$2.DEFAULT_SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_FULL_SCHEMA = requireDefault_full(), jsYaml$2.load = e.load, jsYaml$2.loadAll = e.loadAll, jsYaml$2.safeLoad = e.safeLoad, jsYaml$2.safeLoadAll = e.safeLoadAll, jsYaml$2.dump = h.dump, jsYaml$2.safeDump = h.safeDump, jsYaml$2.YAMLException = requireException$1(), jsYaml$2.MINIMAL_SCHEMA = requireFailsafe$1(), jsYaml$2.SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_SCHEMA = requireDefault_full(), jsYaml$2.scan = p("scan"), jsYaml$2.parse = p("parse"), jsYaml$2.compose = p("compose"), jsYaml$2.addConstructor = p("addConstructor"), jsYaml$2;
}
var jsYaml$1, hasRequiredJsYaml$1;
function requireJsYaml$1() {
  if (hasRequiredJsYaml$1) return jsYaml$1;
  hasRequiredJsYaml$1 = 1;
  var e = requireJsYaml$2();
  return jsYaml$1 = e, jsYaml$1;
}
var hasRequiredEngines;
function requireEngines() {
  return hasRequiredEngines || (hasRequiredEngines = 1, (function(module, exports$1) {
    const yaml = requireJsYaml$1(), engines = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    }, engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(e, h) {
        const p = Object.assign({ replacer: null, space: 2 }, h);
        return JSON.stringify(e, p.replacer, p.space);
      }
    }, engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          return wrap !== !1 && (str = `(function() {
return ` + str.trim() + `;
}());`), eval(str) || {};
        } catch (e) {
          if (wrap !== !1 && /(unexpected|identifier)/i.test(e.message))
            return parse(str, options, !1);
          throw new SyntaxError(e);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  })(engines)), engines.exports;
}
var utils$2 = {};
var stripBomString, hasRequiredStripBomString;
function requireStripBomString() {
  return hasRequiredStripBomString || (hasRequiredStripBomString = 1, stripBomString = function(e) {
    return typeof e == "string" && e.charAt(0) === "\uFEFF" ? e.slice(1) : e;
  }), stripBomString;
}
var hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, (function(e) {
    const h = requireStripBomString(), p = requireKindOf();
    e.define = function(o, f, u) {
      Reflect.defineProperty(o, f, {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: u
      });
    }, e.isBuffer = function(o) {
      return p(o) === "buffer";
    }, e.isObject = function(o) {
      return p(o) === "object";
    }, e.toBuffer = function(o) {
      return typeof o == "string" ? Buffer.from(o) : o;
    }, e.toString = function(o) {
      if (e.isBuffer(o)) return h(String(o));
      if (typeof o != "string")
        throw new TypeError("expected input to be a string or buffer");
      return h(o);
    }, e.arrayify = function(o) {
      return o ? Array.isArray(o) ? o : [o] : [];
    }, e.startsWith = function(o, f, u) {
      return typeof u != "number" && (u = f.length), o.slice(0, u) === f;
    };
  })(utils$2)), utils$2;
}
var defaults, hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  const e = requireEngines(), h = requireUtils$2();
  return defaults = function(p) {
    const o = Object.assign({}, p);
    return o.delimiters = h.arrayify(o.delims || o.delimiters || "---"), o.delimiters.length === 1 && o.delimiters.push(o.delimiters[0]), o.language = (o.language || o.lang || "yaml").toLowerCase(), o.engines = Object.assign({}, e, o.parsers, o.engines), o;
  }, defaults;
}
var engine, hasRequiredEngine;
function requireEngine() {
  if (hasRequiredEngine) return engine;
  hasRequiredEngine = 1, engine = function(h, p) {
    let o = p.engines[h] || p.engines[e(h)];
    if (typeof o > "u")
      throw new Error('gray-matter engine "' + h + '" is not registered');
    return typeof o == "function" && (o = { parse: o }), o;
  };
  function e(h) {
    switch (h.toLowerCase()) {
      case "js":
      case "javascript":
        return "javascript";
      case "coffee":
      case "coffeescript":
      case "cson":
        return "coffee";
      case "yaml":
      case "yml":
        return "yaml";
      default:
        return h;
    }
  }
  return engine;
}
var stringify, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const e = requireKindOf(), h = requireEngine(), p = requireDefaults();
  stringify = function(f, u, a) {
    if (u == null && a == null)
      switch (e(f)) {
        case "object":
          u = f.data, a = {};
          break;
        case "string":
          return f;
        default:
          throw new TypeError("expected file to be a string or object");
      }
    const c = f.content, r = p(a);
    if (u == null) {
      if (!r.data) return f;
      u = r.data;
    }
    const i = f.language || r.language, t = h(i, r);
    if (typeof t.stringify != "function")
      throw new TypeError('expected "' + i + '.stringify" to be a function');
    u = Object.assign({}, f.data, u);
    const n = r.delimiters[0], s = r.delimiters[1], m = t.stringify(u, a).trim();
    let y = "";
    return m !== "{}" && (y = o(n) + o(m) + o(s)), typeof f.excerpt == "string" && f.excerpt !== "" && c.indexOf(f.excerpt.trim()) === -1 && (y += o(f.excerpt) + o(s)), y + o(c);
  };
  function o(f) {
    return f.slice(-1) !== `
` ? f + `
` : f;
  }
  return stringify;
}
var excerpt, hasRequiredExcerpt;
function requireExcerpt() {
  if (hasRequiredExcerpt) return excerpt;
  hasRequiredExcerpt = 1;
  const e = requireDefaults();
  return excerpt = function(h, p) {
    const o = e(p);
    if (h.data == null && (h.data = {}), typeof o.excerpt == "function")
      return o.excerpt(h, o);
    const f = h.data.excerpt_separator || o.excerpt_separator;
    if (f == null && (o.excerpt === !1 || o.excerpt == null))
      return h;
    const u = typeof o.excerpt == "string" ? o.excerpt : f || o.delimiters[0], a = h.content.indexOf(u);
    return a !== -1 && (h.excerpt = h.content.slice(0, a)), h;
  }, excerpt;
}
var toFile, hasRequiredToFile;
function requireToFile() {
  if (hasRequiredToFile) return toFile;
  hasRequiredToFile = 1;
  const e = requireKindOf(), h = requireStringify(), p = requireUtils$2();
  return toFile = function(o) {
    return e(o) !== "object" && (o = { content: o }), e(o.data) !== "object" && (o.data = {}), o.contents && o.content == null && (o.content = o.contents), p.define(o, "orig", p.toBuffer(o.content)), p.define(o, "language", o.language || ""), p.define(o, "matter", o.matter || ""), p.define(o, "stringify", function(f, u) {
      return u && u.language && (o.language = u.language), h(o, f, u);
    }), o.content = p.toString(o.content), o.isEmpty = !1, o.excerpt = "", o;
  }, toFile;
}
var parse, hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse;
  hasRequiredParse$1 = 1;
  const e = requireEngine(), h = requireDefaults();
  return parse = function(p, o, f) {
    const u = h(f), a = e(p, u);
    if (typeof a.parse != "function")
      throw new TypeError('expected "' + p + '.parse" to be a function');
    return a.parse(o, u);
  }, parse;
}
var grayMatter, hasRequiredGrayMatter;
function requireGrayMatter() {
  if (hasRequiredGrayMatter) return grayMatter;
  hasRequiredGrayMatter = 1;
  const e = require$$1, h = requireSectionMatter(), p = requireDefaults(), o = requireStringify(), f = requireExcerpt(), u = requireEngines(), a = requireToFile(), c = requireParse$1(), r = requireUtils$2();
  function i(n, s) {
    if (n === "")
      return { data: {}, content: n, excerpt: "", orig: n };
    let m = a(n);
    const y = i.cache[m.content];
    if (!s) {
      if (y)
        return m = Object.assign({}, y), m.orig = y.orig, m;
      i.cache[m.content] = m;
    }
    return t(m, s);
  }
  function t(n, s) {
    const m = p(s), y = m.delimiters[0], E = `
` + m.delimiters[1];
    let g = n.content;
    m.language && (n.language = m.language);
    const q = y.length;
    if (!r.startsWith(g, y, q))
      return f(n, m), n;
    if (g.charAt(q) === y.slice(-1))
      return n;
    g = g.slice(q);
    const C = g.length, P = i.language(g, m);
    P.name && (n.language = P.name, g = g.slice(P.raw.length));
    let $ = g.indexOf(E);
    return $ === -1 && ($ = C), n.matter = g.slice(0, $), n.matter.replace(/^\s*#[^\n]+/gm, "").trim() === "" ? (n.isEmpty = !0, n.empty = n.content, n.data = {}) : n.data = c(n.language, n.matter, m), $ === C ? n.content = "" : (n.content = g.slice($ + E.length), n.content[0] === "\r" && (n.content = n.content.slice(1)), n.content[0] === `
` && (n.content = n.content.slice(1))), f(n, m), (m.sections === !0 || typeof m.section == "function") && h(n, m.section), n;
  }
  return i.engines = u, i.stringify = function(n, s, m) {
    return typeof n == "string" && (n = i(n, m)), o(n, s, m);
  }, i.read = function(n, s) {
    const m = e.readFileSync(n, "utf8"), y = i(m, s);
    return y.path = n, y;
  }, i.test = function(n, s) {
    return r.startsWith(n, p(s).delimiters[0]);
  }, i.language = function(n, s) {
    const y = p(s).delimiters[0];
    i.test(n) && (n = n.slice(y.length));
    const E = n.slice(0, n.search(/\r?\n/));
    return {
      raw: E,
      name: E ? E.trim() : ""
    };
  }, i.cache = {}, i.clearCache = function() {
    i.cache = {};
  }, grayMatter = i, grayMatter;
}
var grayMatterExports = requireGrayMatter();
const matter = /* @__PURE__ */ getDefaultExportFromCjs(grayMatterExports);
var main$1 = {}, fs = {}, universalify = {}, hasRequiredUniversalify;
function requireUniversalify() {
  return hasRequiredUniversalify || (hasRequiredUniversalify = 1, universalify.fromCallback = function(e) {
    return Object.defineProperty(function(...h) {
      if (typeof h[h.length - 1] == "function") e.apply(this, h);
      else
        return new Promise((p, o) => {
          h.push((f, u) => f != null ? o(f) : p(u)), e.apply(this, h);
        });
    }, "name", { value: e.name });
  }, universalify.fromPromise = function(e) {
    return Object.defineProperty(function(...h) {
      const p = h[h.length - 1];
      if (typeof p != "function") return e.apply(this, h);
      h.pop(), e.apply(this, h).then((o) => p(null, o), p);
    }, "name", { value: e.name });
  }), universalify;
}
var polyfills, hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var e = require$$0, h = process.cwd, p = null, o = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return p || (p = h.call(process)), p;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(a) {
      p = null, f.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  polyfills = u;
  function u(a) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && c(a), a.lutimes || r(a), a.chown = n(a.chown), a.fchown = n(a.fchown), a.lchown = n(a.lchown), a.chmod = i(a.chmod), a.fchmod = i(a.fchmod), a.lchmod = i(a.lchmod), a.chownSync = s(a.chownSync), a.fchownSync = s(a.fchownSync), a.lchownSync = s(a.lchownSync), a.chmodSync = t(a.chmodSync), a.fchmodSync = t(a.fchmodSync), a.lchmodSync = t(a.lchmodSync), a.stat = m(a.stat), a.fstat = m(a.fstat), a.lstat = m(a.lstat), a.statSync = y(a.statSync), a.fstatSync = y(a.fstatSync), a.lstatSync = y(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(g, q, C) {
      C && process.nextTick(C);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(g, q, C, P) {
      P && process.nextTick(P);
    }, a.lchownSync = function() {
    }), o === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : (function(g) {
      function q(C, P, $) {
        var b = Date.now(), I = 0;
        g(C, P, function T(A) {
          if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - b < 6e4) {
            setTimeout(function() {
              a.stat(P, function(_, z) {
                _ && _.code === "ENOENT" ? g(C, P, T) : $(A);
              });
            }, I), I < 100 && (I += 10);
            return;
          }
          $ && $(A);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(a.rename)), a.read = typeof a.read != "function" ? a.read : (function(g) {
      function q(C, P, $, b, I, T) {
        var A;
        if (T && typeof T == "function") {
          var _ = 0;
          A = function(z, J, H) {
            if (z && z.code === "EAGAIN" && _ < 10)
              return _++, g.call(a, C, P, $, b, I, A);
            T.apply(this, arguments);
          };
        }
        return g.call(a, C, P, $, b, I, A);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ (function(g) {
      return function(q, C, P, $, b) {
        for (var I = 0; ; )
          try {
            return g.call(a, q, C, P, $, b);
          } catch (T) {
            if (T.code === "EAGAIN" && I < 10) {
              I++;
              continue;
            }
            throw T;
          }
      };
    })(a.readSync);
    function c(g) {
      g.lchmod = function(q, C, P) {
        g.open(
          q,
          e.O_WRONLY | e.O_SYMLINK,
          C,
          function($, b) {
            if ($) {
              P && P($);
              return;
            }
            g.fchmod(b, C, function(I) {
              g.close(b, function(T) {
                P && P(I || T);
              });
            });
          }
        );
      }, g.lchmodSync = function(q, C) {
        var P = g.openSync(q, e.O_WRONLY | e.O_SYMLINK, C), $ = !0, b;
        try {
          b = g.fchmodSync(P, C), $ = !1;
        } finally {
          if ($)
            try {
              g.closeSync(P);
            } catch {
            }
          else
            g.closeSync(P);
        }
        return b;
      };
    }
    function r(g) {
      e.hasOwnProperty("O_SYMLINK") && g.futimes ? (g.lutimes = function(q, C, P, $) {
        g.open(q, e.O_SYMLINK, function(b, I) {
          if (b) {
            $ && $(b);
            return;
          }
          g.futimes(I, C, P, function(T) {
            g.close(I, function(A) {
              $ && $(T || A);
            });
          });
        });
      }, g.lutimesSync = function(q, C, P) {
        var $ = g.openSync(q, e.O_SYMLINK), b, I = !0;
        try {
          b = g.futimesSync($, C, P), I = !1;
        } finally {
          if (I)
            try {
              g.closeSync($);
            } catch {
            }
          else
            g.closeSync($);
        }
        return b;
      }) : g.futimes && (g.lutimes = function(q, C, P, $) {
        $ && process.nextTick($);
      }, g.lutimesSync = function() {
      });
    }
    function i(g) {
      return g && function(q, C, P) {
        return g.call(a, q, C, function($) {
          E($) && ($ = null), P && P.apply(this, arguments);
        });
      };
    }
    function t(g) {
      return g && function(q, C) {
        try {
          return g.call(a, q, C);
        } catch (P) {
          if (!E(P)) throw P;
        }
      };
    }
    function n(g) {
      return g && function(q, C, P, $) {
        return g.call(a, q, C, P, function(b) {
          E(b) && (b = null), $ && $.apply(this, arguments);
        });
      };
    }
    function s(g) {
      return g && function(q, C, P) {
        try {
          return g.call(a, q, C, P);
        } catch ($) {
          if (!E($)) throw $;
        }
      };
    }
    function m(g) {
      return g && function(q, C, P) {
        typeof C == "function" && (P = C, C = null);
        function $(b, I) {
          I && (I.uid < 0 && (I.uid += 4294967296), I.gid < 0 && (I.gid += 4294967296)), P && P.apply(this, arguments);
        }
        return C ? g.call(a, q, C, $) : g.call(a, q, $);
      };
    }
    function y(g) {
      return g && function(q, C) {
        var P = C ? g.call(a, q, C) : g.call(a, q);
        return P && (P.uid < 0 && (P.uid += 4294967296), P.gid < 0 && (P.gid += 4294967296)), P;
      };
    }
    function E(g) {
      if (!g || g.code === "ENOSYS")
        return !0;
      var q = !process.getuid || process.getuid() !== 0;
      return !!(q && (g.code === "EINVAL" || g.code === "EPERM"));
    }
  }
  return polyfills;
}
var legacyStreams, hasRequiredLegacyStreams;
function requireLegacyStreams() {
  if (hasRequiredLegacyStreams) return legacyStreams;
  hasRequiredLegacyStreams = 1;
  var e = require$$0$1.Stream;
  legacyStreams = h;
  function h(p) {
    return {
      ReadStream: o,
      WriteStream: f
    };
    function o(u, a) {
      if (!(this instanceof o)) return new o(u, a);
      e.call(this);
      var c = this;
      this.path = u, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var r = Object.keys(a), i = 0, t = r.length; i < t; i++) {
        var n = r[i];
        this[n] = a[n];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          c._read();
        });
        return;
      }
      p.open(this.path, this.flags, this.mode, function(s, m) {
        if (s) {
          c.emit("error", s), c.readable = !1;
          return;
        }
        c.fd = m, c.emit("open", m), c._read();
      });
    }
    function f(u, a) {
      if (!(this instanceof f)) return new f(u, a);
      e.call(this), this.path = u, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var c = Object.keys(a), r = 0, i = c.length; r < i; r++) {
        var t = c[r];
        this[t] = a[t];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = p.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return legacyStreams;
}
var clone_1, hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1, clone_1 = h;
  var e = Object.getPrototypeOf || function(p) {
    return p.__proto__;
  };
  function h(p) {
    if (p === null || typeof p != "object")
      return p;
    if (p instanceof Object)
      var o = { __proto__: e(p) };
    else
      var o = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(p).forEach(function(f) {
      Object.defineProperty(o, f, Object.getOwnPropertyDescriptor(p, f));
    }), o;
  }
  return clone_1;
}
var gracefulFs, hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var e = require$$1, h = requirePolyfills(), p = requireLegacyStreams(), o = requireClone(), f = require$$4, u, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (u = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), a = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (u = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function c() {
  }
  function r(g, q) {
    Object.defineProperty(g, u, {
      get: function() {
        return q;
      }
    });
  }
  var i = c;
  if (f.debuglog ? i = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (i = function() {
    var g = f.format.apply(f, arguments);
    g = "GFS4: " + g.split(/\n/).join(`
GFS4: `), console.error(g);
  }), !e[u]) {
    var t = commonjsGlobal[u] || [];
    r(e, t), e.close = (function(g) {
      function q(C, P) {
        return g.call(e, C, function($) {
          $ || y(), typeof P == "function" && P.apply(this, arguments);
        });
      }
      return Object.defineProperty(q, a, {
        value: g
      }), q;
    })(e.close), e.closeSync = (function(g) {
      function q(C) {
        g.apply(e, arguments), y();
      }
      return Object.defineProperty(q, a, {
        value: g
      }), q;
    })(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      i(e[u]), require$$5.equal(e[u].length, 0);
    });
  }
  commonjsGlobal[u] || r(commonjsGlobal, e[u]), gracefulFs = n(o(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (gracefulFs = n(e), e.__patched = !0);
  function n(g) {
    h(g), g.gracefulify = n, g.createReadStream = ge, g.createWriteStream = de;
    var q = g.readFile;
    g.readFile = C;
    function C(ie, Ee, S) {
      return typeof Ee == "function" && (S = Ee, Ee = null), R(ie, Ee, S);
      function R(te, k, pe, ye) {
        return q(te, k, function(ve) {
          ve && (ve.code === "EMFILE" || ve.code === "ENFILE") ? s([R, [te, k, pe], ve, ye || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var P = g.writeFile;
    g.writeFile = $;
    function $(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return P(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? s([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    var b = g.appendFile;
    b && (g.appendFile = I);
    function I(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return b(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? s([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    var T = g.copyFile;
    T && (g.copyFile = A);
    function A(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = 0), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return T(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? s([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    var _ = g.readdir;
    g.readdir = J;
    var z = /^v[0-5]\./;
    function J(ie, Ee, S) {
      typeof Ee == "function" && (S = Ee, Ee = null);
      var R = z.test(process.version) ? function(pe, ye, ve, qe) {
        return _(pe, te(
          pe,
          ye,
          ve,
          qe
        ));
      } : function(pe, ye, ve, qe) {
        return _(pe, ye, te(
          pe,
          ye,
          ve,
          qe
        ));
      };
      return R(ie, Ee, S);
      function te(k, pe, ye, ve) {
        return function(qe, Re) {
          qe && (qe.code === "EMFILE" || qe.code === "ENFILE") ? s([
            R,
            [k, pe, ye],
            qe,
            ve || Date.now(),
            Date.now()
          ]) : (Re && Re.sort && Re.sort(), typeof ye == "function" && ye.call(this, qe, Re));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var H = p(g);
      L = H.ReadStream, ue = H.WriteStream;
    }
    var X = g.ReadStream;
    X && (L.prototype = Object.create(X.prototype), L.prototype.open = K);
    var N = g.WriteStream;
    N && (ue.prototype = Object.create(N.prototype), ue.prototype.open = fe), Object.defineProperty(g, "ReadStream", {
      get: function() {
        return L;
      },
      set: function(ie) {
        L = ie;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(g, "WriteStream", {
      get: function() {
        return ue;
      },
      set: function(ie) {
        ue = ie;
      },
      enumerable: !0,
      configurable: !0
    });
    var U = L;
    Object.defineProperty(g, "FileReadStream", {
      get: function() {
        return U;
      },
      set: function(ie) {
        U = ie;
      },
      enumerable: !0,
      configurable: !0
    });
    var ne = ue;
    Object.defineProperty(g, "FileWriteStream", {
      get: function() {
        return ne;
      },
      set: function(ie) {
        ne = ie;
      },
      enumerable: !0,
      configurable: !0
    });
    function L(ie, Ee) {
      return this instanceof L ? (X.apply(this, arguments), this) : L.apply(Object.create(L.prototype), arguments);
    }
    function K() {
      var ie = this;
      we(ie.path, ie.flags, ie.mode, function(Ee, S) {
        Ee ? (ie.autoClose && ie.destroy(), ie.emit("error", Ee)) : (ie.fd = S, ie.emit("open", S), ie.read());
      });
    }
    function ue(ie, Ee) {
      return this instanceof ue ? (N.apply(this, arguments), this) : ue.apply(Object.create(ue.prototype), arguments);
    }
    function fe() {
      var ie = this;
      we(ie.path, ie.flags, ie.mode, function(Ee, S) {
        Ee ? (ie.destroy(), ie.emit("error", Ee)) : (ie.fd = S, ie.emit("open", S));
      });
    }
    function ge(ie, Ee) {
      return new g.ReadStream(ie, Ee);
    }
    function de(ie, Ee) {
      return new g.WriteStream(ie, Ee);
    }
    var _e = g.open;
    g.open = we;
    function we(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return _e(k, pe, ye, function(Re, Ie) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? s([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    return g;
  }
  function s(g) {
    i("ENQUEUE", g[0].name, g[1]), e[u].push(g), E();
  }
  var m;
  function y() {
    for (var g = Date.now(), q = 0; q < e[u].length; ++q)
      e[u][q].length > 2 && (e[u][q][3] = g, e[u][q][4] = g);
    E();
  }
  function E() {
    if (clearTimeout(m), m = void 0, e[u].length !== 0) {
      var g = e[u].shift(), q = g[0], C = g[1], P = g[2], $ = g[3], b = g[4];
      if ($ === void 0)
        i("RETRY", q.name, C), q.apply(null, C);
      else if (Date.now() - $ >= 6e4) {
        i("TIMEOUT", q.name, C);
        var I = C.pop();
        typeof I == "function" && I.call(null, P);
      } else {
        var T = Date.now() - b, A = Math.max(b - $, 1), _ = Math.min(A * 1.2, 100);
        T >= _ ? (i("RETRY", q.name, C), q.apply(null, C.concat([$]))) : e[u].push(g);
      }
      m === void 0 && (m = setTimeout(E, 0));
    }
  }
  return gracefulFs;
}
var hasRequiredFs;
function requireFs() {
  return hasRequiredFs || (hasRequiredFs = 1, (function(e) {
    const h = requireUniversalify().fromCallback, p = requireGracefulFs(), o = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((f) => typeof p[f] == "function");
    Object.assign(e, p), o.forEach((f) => {
      e[f] = h(p[f]);
    }), e.exists = function(f, u) {
      return typeof u == "function" ? p.exists(f, u) : new Promise((a) => p.exists(f, a));
    }, e.read = function(f, u, a, c, r, i) {
      return typeof i == "function" ? p.read(f, u, a, c, r, i) : new Promise((t, n) => {
        p.read(f, u, a, c, r, (s, m, y) => {
          if (s) return n(s);
          t({ bytesRead: m, buffer: y });
        });
      });
    }, e.write = function(f, u, ...a) {
      return typeof a[a.length - 1] == "function" ? p.write(f, u, ...a) : new Promise((c, r) => {
        p.write(f, u, ...a, (i, t, n) => {
          if (i) return r(i);
          c({ bytesWritten: t, buffer: n });
        });
      });
    }, typeof p.writev == "function" && (e.writev = function(f, u, ...a) {
      return typeof a[a.length - 1] == "function" ? p.writev(f, u, ...a) : new Promise((c, r) => {
        p.writev(f, u, ...a, (i, t, n) => {
          if (i) return r(i);
          c({ bytesWritten: t, buffers: n });
        });
      });
    }), typeof p.realpath.native == "function" ? e.realpath.native = h(p.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  })(fs)), fs;
}
var makeDir = {}, utils$1 = {}, hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  const e = require$$1$1;
  return utils$1.checkPath = function(p) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(p.replace(e.parse(p).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${p}`);
      throw f.code = "EINVAL", f;
    }
  }, utils$1;
}
var hasRequiredMakeDir;
function requireMakeDir() {
  if (hasRequiredMakeDir) return makeDir;
  hasRequiredMakeDir = 1;
  const e = /* @__PURE__ */ requireFs(), { checkPath: h } = /* @__PURE__ */ requireUtils$1(), p = (o) => {
    const f = { mode: 511 };
    return typeof o == "number" ? o : { ...f, ...o }.mode;
  };
  return makeDir.makeDir = async (o, f) => (h(o), e.mkdir(o, {
    mode: p(f),
    recursive: !0
  })), makeDir.makeDirSync = (o, f) => (h(o), e.mkdirSync(o, {
    mode: p(f),
    recursive: !0
  })), makeDir;
}
var mkdirs, hasRequiredMkdirs;
function requireMkdirs() {
  if (hasRequiredMkdirs) return mkdirs;
  hasRequiredMkdirs = 1;
  const e = requireUniversalify().fromPromise, { makeDir: h, makeDirSync: p } = /* @__PURE__ */ requireMakeDir(), o = e(h);
  return mkdirs = {
    mkdirs: o,
    mkdirsSync: p,
    // alias
    mkdirp: o,
    mkdirpSync: p,
    ensureDir: o,
    ensureDirSync: p
  }, mkdirs;
}
var pathExists_1, hasRequiredPathExists;
function requirePathExists() {
  if (hasRequiredPathExists) return pathExists_1;
  hasRequiredPathExists = 1;
  const e = requireUniversalify().fromPromise, h = /* @__PURE__ */ requireFs();
  function p(o) {
    return h.access(o).then(() => !0).catch(() => !1);
  }
  return pathExists_1 = {
    pathExists: e(p),
    pathExistsSync: h.existsSync
  }, pathExists_1;
}
var utimes, hasRequiredUtimes;
function requireUtimes() {
  if (hasRequiredUtimes) return utimes;
  hasRequiredUtimes = 1;
  const e = requireGracefulFs();
  function h(o, f, u, a) {
    e.open(o, "r+", (c, r) => {
      if (c) return a(c);
      e.futimes(r, f, u, (i) => {
        e.close(r, (t) => {
          a && a(i || t);
        });
      });
    });
  }
  function p(o, f, u) {
    const a = e.openSync(o, "r+");
    return e.futimesSync(a, f, u), e.closeSync(a);
  }
  return utimes = {
    utimesMillis: h,
    utimesMillisSync: p
  }, utimes;
}
var stat, hasRequiredStat;
function requireStat() {
  if (hasRequiredStat) return stat;
  hasRequiredStat = 1;
  const e = /* @__PURE__ */ requireFs(), h = require$$1$1, p = require$$4;
  function o(s, m, y) {
    const E = y.dereference ? (g) => e.stat(g, { bigint: !0 }) : (g) => e.lstat(g, { bigint: !0 });
    return Promise.all([
      E(s),
      E(m).catch((g) => {
        if (g.code === "ENOENT") return null;
        throw g;
      })
    ]).then(([g, q]) => ({ srcStat: g, destStat: q }));
  }
  function f(s, m, y) {
    let E;
    const g = y.dereference ? (C) => e.statSync(C, { bigint: !0 }) : (C) => e.lstatSync(C, { bigint: !0 }), q = g(s);
    try {
      E = g(m);
    } catch (C) {
      if (C.code === "ENOENT") return { srcStat: q, destStat: null };
      throw C;
    }
    return { srcStat: q, destStat: E };
  }
  function u(s, m, y, E, g) {
    p.callbackify(o)(s, m, E, (q, C) => {
      if (q) return g(q);
      const { srcStat: P, destStat: $ } = C;
      if ($) {
        if (i(P, $)) {
          const b = h.basename(s), I = h.basename(m);
          return y === "move" && b !== I && b.toLowerCase() === I.toLowerCase() ? g(null, { srcStat: P, destStat: $, isChangingCase: !0 }) : g(new Error("Source and destination must not be the same."));
        }
        if (P.isDirectory() && !$.isDirectory())
          return g(new Error(`Cannot overwrite non-directory '${m}' with directory '${s}'.`));
        if (!P.isDirectory() && $.isDirectory())
          return g(new Error(`Cannot overwrite directory '${m}' with non-directory '${s}'.`));
      }
      return P.isDirectory() && t(s, m) ? g(new Error(n(s, m, y))) : g(null, { srcStat: P, destStat: $ });
    });
  }
  function a(s, m, y, E) {
    const { srcStat: g, destStat: q } = f(s, m, E);
    if (q) {
      if (i(g, q)) {
        const C = h.basename(s), P = h.basename(m);
        if (y === "move" && C !== P && C.toLowerCase() === P.toLowerCase())
          return { srcStat: g, destStat: q, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (g.isDirectory() && !q.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${s}'.`);
      if (!g.isDirectory() && q.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${s}'.`);
    }
    if (g.isDirectory() && t(s, m))
      throw new Error(n(s, m, y));
    return { srcStat: g, destStat: q };
  }
  function c(s, m, y, E, g) {
    const q = h.resolve(h.dirname(s)), C = h.resolve(h.dirname(y));
    if (C === q || C === h.parse(C).root) return g();
    e.stat(C, { bigint: !0 }, (P, $) => P ? P.code === "ENOENT" ? g() : g(P) : i(m, $) ? g(new Error(n(s, y, E))) : c(s, m, C, E, g));
  }
  function r(s, m, y, E) {
    const g = h.resolve(h.dirname(s)), q = h.resolve(h.dirname(y));
    if (q === g || q === h.parse(q).root) return;
    let C;
    try {
      C = e.statSync(q, { bigint: !0 });
    } catch (P) {
      if (P.code === "ENOENT") return;
      throw P;
    }
    if (i(m, C))
      throw new Error(n(s, y, E));
    return r(s, m, q, E);
  }
  function i(s, m) {
    return m.ino && m.dev && m.ino === s.ino && m.dev === s.dev;
  }
  function t(s, m) {
    const y = h.resolve(s).split(h.sep).filter((g) => g), E = h.resolve(m).split(h.sep).filter((g) => g);
    return y.reduce((g, q, C) => g && E[C] === q, !0);
  }
  function n(s, m, y) {
    return `Cannot ${y} '${s}' to a subdirectory of itself, '${m}'.`;
  }
  return stat = {
    checkPaths: u,
    checkPathsSync: a,
    checkParentPaths: c,
    checkParentPathsSync: r,
    isSrcSubdir: t,
    areIdentical: i
  }, stat;
}
var copy_1, hasRequiredCopy$1;
function requireCopy$1() {
  if (hasRequiredCopy$1) return copy_1;
  hasRequiredCopy$1 = 1;
  const e = requireGracefulFs(), h = require$$1$1, p = requireMkdirs().mkdirs, o = requirePathExists().pathExists, f = requireUtimes().utimesMillis, u = /* @__PURE__ */ requireStat();
  function a(J, H, X, N) {
    typeof X == "function" && !N ? (N = X, X = {}) : typeof X == "function" && (X = { filter: X }), N = N || function() {
    }, X = X || {}, X.clobber = "clobber" in X ? !!X.clobber : !0, X.overwrite = "overwrite" in X ? !!X.overwrite : X.clobber, X.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), u.checkPaths(J, H, "copy", X, (U, ne) => {
      if (U) return N(U);
      const { srcStat: L, destStat: K } = ne;
      u.checkParentPaths(J, L, H, "copy", (ue) => ue ? N(ue) : X.filter ? r(c, K, J, H, X, N) : c(K, J, H, X, N));
    });
  }
  function c(J, H, X, N, U) {
    const ne = h.dirname(X);
    o(ne, (L, K) => {
      if (L) return U(L);
      if (K) return t(J, H, X, N, U);
      p(ne, (ue) => ue ? U(ue) : t(J, H, X, N, U));
    });
  }
  function r(J, H, X, N, U, ne) {
    Promise.resolve(U.filter(X, N)).then((L) => L ? J(H, X, N, U, ne) : ne(), (L) => ne(L));
  }
  function i(J, H, X, N, U) {
    return N.filter ? r(t, J, H, X, N, U) : t(J, H, X, N, U);
  }
  function t(J, H, X, N, U) {
    (N.dereference ? e.stat : e.lstat)(H, (L, K) => L ? U(L) : K.isDirectory() ? $(K, J, H, X, N, U) : K.isFile() || K.isCharacterDevice() || K.isBlockDevice() ? n(K, J, H, X, N, U) : K.isSymbolicLink() ? _(J, H, X, N, U) : K.isSocket() ? U(new Error(`Cannot copy a socket file: ${H}`)) : K.isFIFO() ? U(new Error(`Cannot copy a FIFO pipe: ${H}`)) : U(new Error(`Unknown file: ${H}`)));
  }
  function n(J, H, X, N, U, ne) {
    return H ? s(J, X, N, U, ne) : m(J, X, N, U, ne);
  }
  function s(J, H, X, N, U) {
    if (N.overwrite)
      e.unlink(X, (ne) => ne ? U(ne) : m(J, H, X, N, U));
    else return N.errorOnExist ? U(new Error(`'${X}' already exists`)) : U();
  }
  function m(J, H, X, N, U) {
    e.copyFile(H, X, (ne) => ne ? U(ne) : N.preserveTimestamps ? y(J.mode, H, X, U) : C(X, J.mode, U));
  }
  function y(J, H, X, N) {
    return E(J) ? g(X, J, (U) => U ? N(U) : q(J, H, X, N)) : q(J, H, X, N);
  }
  function E(J) {
    return (J & 128) === 0;
  }
  function g(J, H, X) {
    return C(J, H | 128, X);
  }
  function q(J, H, X, N) {
    P(H, X, (U) => U ? N(U) : C(X, J, N));
  }
  function C(J, H, X) {
    return e.chmod(J, H, X);
  }
  function P(J, H, X) {
    e.stat(J, (N, U) => N ? X(N) : f(H, U.atime, U.mtime, X));
  }
  function $(J, H, X, N, U, ne) {
    return H ? I(X, N, U, ne) : b(J.mode, X, N, U, ne);
  }
  function b(J, H, X, N, U) {
    e.mkdir(X, (ne) => {
      if (ne) return U(ne);
      I(H, X, N, (L) => L ? U(L) : C(X, J, U));
    });
  }
  function I(J, H, X, N) {
    e.readdir(J, (U, ne) => U ? N(U) : T(ne, J, H, X, N));
  }
  function T(J, H, X, N, U) {
    const ne = J.pop();
    return ne ? A(J, ne, H, X, N, U) : U();
  }
  function A(J, H, X, N, U, ne) {
    const L = h.join(X, H), K = h.join(N, H);
    u.checkPaths(L, K, "copy", U, (ue, fe) => {
      if (ue) return ne(ue);
      const { destStat: ge } = fe;
      i(ge, L, K, U, (de) => de ? ne(de) : T(J, X, N, U, ne));
    });
  }
  function _(J, H, X, N, U) {
    e.readlink(H, (ne, L) => {
      if (ne) return U(ne);
      if (N.dereference && (L = h.resolve(process.cwd(), L)), J)
        e.readlink(X, (K, ue) => K ? K.code === "EINVAL" || K.code === "UNKNOWN" ? e.symlink(L, X, U) : U(K) : (N.dereference && (ue = h.resolve(process.cwd(), ue)), u.isSrcSubdir(L, ue) ? U(new Error(`Cannot copy '${L}' to a subdirectory of itself, '${ue}'.`)) : J.isDirectory() && u.isSrcSubdir(ue, L) ? U(new Error(`Cannot overwrite '${ue}' with '${L}'.`)) : z(L, X, U)));
      else
        return e.symlink(L, X, U);
    });
  }
  function z(J, H, X) {
    e.unlink(H, (N) => N ? X(N) : e.symlink(J, H, X));
  }
  return copy_1 = a, copy_1;
}
var copySync_1, hasRequiredCopySync;
function requireCopySync() {
  if (hasRequiredCopySync) return copySync_1;
  hasRequiredCopySync = 1;
  const e = requireGracefulFs(), h = require$$1$1, p = requireMkdirs().mkdirsSync, o = requireUtimes().utimesMillisSync, f = /* @__PURE__ */ requireStat();
  function u(T, A, _) {
    typeof _ == "function" && (_ = { filter: _ }), _ = _ || {}, _.clobber = "clobber" in _ ? !!_.clobber : !0, _.overwrite = "overwrite" in _ ? !!_.overwrite : _.clobber, _.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: z, destStat: J } = f.checkPathsSync(T, A, "copy", _);
    return f.checkParentPathsSync(T, z, A, "copy"), a(J, T, A, _);
  }
  function a(T, A, _, z) {
    if (z.filter && !z.filter(A, _)) return;
    const J = h.dirname(_);
    return e.existsSync(J) || p(J), r(T, A, _, z);
  }
  function c(T, A, _, z) {
    if (!(z.filter && !z.filter(A, _)))
      return r(T, A, _, z);
  }
  function r(T, A, _, z) {
    const H = (z.dereference ? e.statSync : e.lstatSync)(A);
    if (H.isDirectory()) return q(H, T, A, _, z);
    if (H.isFile() || H.isCharacterDevice() || H.isBlockDevice()) return i(H, T, A, _, z);
    if (H.isSymbolicLink()) return b(T, A, _, z);
    throw H.isSocket() ? new Error(`Cannot copy a socket file: ${A}`) : H.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${A}`) : new Error(`Unknown file: ${A}`);
  }
  function i(T, A, _, z, J) {
    return A ? t(T, _, z, J) : n(T, _, z, J);
  }
  function t(T, A, _, z) {
    if (z.overwrite)
      return e.unlinkSync(_), n(T, A, _, z);
    if (z.errorOnExist)
      throw new Error(`'${_}' already exists`);
  }
  function n(T, A, _, z) {
    return e.copyFileSync(A, _), z.preserveTimestamps && s(T.mode, A, _), E(_, T.mode);
  }
  function s(T, A, _) {
    return m(T) && y(_, T), g(A, _);
  }
  function m(T) {
    return (T & 128) === 0;
  }
  function y(T, A) {
    return E(T, A | 128);
  }
  function E(T, A) {
    return e.chmodSync(T, A);
  }
  function g(T, A) {
    const _ = e.statSync(T);
    return o(A, _.atime, _.mtime);
  }
  function q(T, A, _, z, J) {
    return A ? P(_, z, J) : C(T.mode, _, z, J);
  }
  function C(T, A, _, z) {
    return e.mkdirSync(_), P(A, _, z), E(_, T);
  }
  function P(T, A, _) {
    e.readdirSync(T).forEach((z) => $(z, T, A, _));
  }
  function $(T, A, _, z) {
    const J = h.join(A, T), H = h.join(_, T), { destStat: X } = f.checkPathsSync(J, H, "copy", z);
    return c(X, J, H, z);
  }
  function b(T, A, _, z) {
    let J = e.readlinkSync(A);
    if (z.dereference && (J = h.resolve(process.cwd(), J)), T) {
      let H;
      try {
        H = e.readlinkSync(_);
      } catch (X) {
        if (X.code === "EINVAL" || X.code === "UNKNOWN") return e.symlinkSync(J, _);
        throw X;
      }
      if (z.dereference && (H = h.resolve(process.cwd(), H)), f.isSrcSubdir(J, H))
        throw new Error(`Cannot copy '${J}' to a subdirectory of itself, '${H}'.`);
      if (e.statSync(_).isDirectory() && f.isSrcSubdir(H, J))
        throw new Error(`Cannot overwrite '${H}' with '${J}'.`);
      return I(J, _);
    } else
      return e.symlinkSync(J, _);
  }
  function I(T, A) {
    return e.unlinkSync(A), e.symlinkSync(T, A);
  }
  return copySync_1 = u, copySync_1;
}
var copy, hasRequiredCopy;
function requireCopy() {
  if (hasRequiredCopy) return copy;
  hasRequiredCopy = 1;
  const e = requireUniversalify().fromCallback;
  return copy = {
    copy: e(/* @__PURE__ */ requireCopy$1()),
    copySync: /* @__PURE__ */ requireCopySync()
  }, copy;
}
var rimraf_1, hasRequiredRimraf;
function requireRimraf() {
  if (hasRequiredRimraf) return rimraf_1;
  hasRequiredRimraf = 1;
  const e = requireGracefulFs(), h = require$$1$1, p = require$$5, o = process.platform === "win32";
  function f(y) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((g) => {
      y[g] = y[g] || e[g], g = g + "Sync", y[g] = y[g] || e[g];
    }), y.maxBusyTries = y.maxBusyTries || 3;
  }
  function u(y, E, g) {
    let q = 0;
    typeof E == "function" && (g = E, E = {}), p(y, "rimraf: missing path"), p.strictEqual(typeof y, "string", "rimraf: path should be a string"), p.strictEqual(typeof g, "function", "rimraf: callback function required"), p(E, "rimraf: invalid options argument provided"), p.strictEqual(typeof E, "object", "rimraf: options should be object"), f(E), a(y, E, function C(P) {
      if (P) {
        if ((P.code === "EBUSY" || P.code === "ENOTEMPTY" || P.code === "EPERM") && q < E.maxBusyTries) {
          q++;
          const $ = q * 100;
          return setTimeout(() => a(y, E, C), $);
        }
        P.code === "ENOENT" && (P = null);
      }
      g(P);
    });
  }
  function a(y, E, g) {
    p(y), p(E), p(typeof g == "function"), E.lstat(y, (q, C) => {
      if (q && q.code === "ENOENT")
        return g(null);
      if (q && q.code === "EPERM" && o)
        return c(y, E, q, g);
      if (C && C.isDirectory())
        return i(y, E, q, g);
      E.unlink(y, (P) => {
        if (P) {
          if (P.code === "ENOENT")
            return g(null);
          if (P.code === "EPERM")
            return o ? c(y, E, P, g) : i(y, E, P, g);
          if (P.code === "EISDIR")
            return i(y, E, P, g);
        }
        return g(P);
      });
    });
  }
  function c(y, E, g, q) {
    p(y), p(E), p(typeof q == "function"), E.chmod(y, 438, (C) => {
      C ? q(C.code === "ENOENT" ? null : g) : E.stat(y, (P, $) => {
        P ? q(P.code === "ENOENT" ? null : g) : $.isDirectory() ? i(y, E, g, q) : E.unlink(y, q);
      });
    });
  }
  function r(y, E, g) {
    let q;
    p(y), p(E);
    try {
      E.chmodSync(y, 438);
    } catch (C) {
      if (C.code === "ENOENT")
        return;
      throw g;
    }
    try {
      q = E.statSync(y);
    } catch (C) {
      if (C.code === "ENOENT")
        return;
      throw g;
    }
    q.isDirectory() ? s(y, E, g) : E.unlinkSync(y);
  }
  function i(y, E, g, q) {
    p(y), p(E), p(typeof q == "function"), E.rmdir(y, (C) => {
      C && (C.code === "ENOTEMPTY" || C.code === "EEXIST" || C.code === "EPERM") ? t(y, E, q) : C && C.code === "ENOTDIR" ? q(g) : q(C);
    });
  }
  function t(y, E, g) {
    p(y), p(E), p(typeof g == "function"), E.readdir(y, (q, C) => {
      if (q) return g(q);
      let P = C.length, $;
      if (P === 0) return E.rmdir(y, g);
      C.forEach((b) => {
        u(h.join(y, b), E, (I) => {
          if (!$) {
            if (I) return g($ = I);
            --P === 0 && E.rmdir(y, g);
          }
        });
      });
    });
  }
  function n(y, E) {
    let g;
    E = E || {}, f(E), p(y, "rimraf: missing path"), p.strictEqual(typeof y, "string", "rimraf: path should be a string"), p(E, "rimraf: missing options"), p.strictEqual(typeof E, "object", "rimraf: options should be object");
    try {
      g = E.lstatSync(y);
    } catch (q) {
      if (q.code === "ENOENT")
        return;
      q.code === "EPERM" && o && r(y, E, q);
    }
    try {
      g && g.isDirectory() ? s(y, E, null) : E.unlinkSync(y);
    } catch (q) {
      if (q.code === "ENOENT")
        return;
      if (q.code === "EPERM")
        return o ? r(y, E, q) : s(y, E, q);
      if (q.code !== "EISDIR")
        throw q;
      s(y, E, q);
    }
  }
  function s(y, E, g) {
    p(y), p(E);
    try {
      E.rmdirSync(y);
    } catch (q) {
      if (q.code === "ENOTDIR")
        throw g;
      if (q.code === "ENOTEMPTY" || q.code === "EEXIST" || q.code === "EPERM")
        m(y, E);
      else if (q.code !== "ENOENT")
        throw q;
    }
  }
  function m(y, E) {
    if (p(y), p(E), E.readdirSync(y).forEach((g) => n(h.join(y, g), E)), o) {
      const g = Date.now();
      do
        try {
          return E.rmdirSync(y, E);
        } catch {
        }
      while (Date.now() - g < 500);
    } else
      return E.rmdirSync(y, E);
  }
  return rimraf_1 = u, u.sync = n, rimraf_1;
}
var remove_1, hasRequiredRemove;
function requireRemove() {
  if (hasRequiredRemove) return remove_1;
  hasRequiredRemove = 1;
  const e = requireGracefulFs(), h = requireUniversalify().fromCallback, p = /* @__PURE__ */ requireRimraf();
  function o(u, a) {
    if (e.rm) return e.rm(u, { recursive: !0, force: !0 }, a);
    p(u, a);
  }
  function f(u) {
    if (e.rmSync) return e.rmSync(u, { recursive: !0, force: !0 });
    p.sync(u);
  }
  return remove_1 = {
    remove: h(o),
    removeSync: f
  }, remove_1;
}
var empty, hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  const e = requireUniversalify().fromPromise, h = /* @__PURE__ */ requireFs(), p = require$$1$1, o = /* @__PURE__ */ requireMkdirs(), f = /* @__PURE__ */ requireRemove(), u = e(async function(r) {
    let i;
    try {
      i = await h.readdir(r);
    } catch {
      return o.mkdirs(r);
    }
    return Promise.all(i.map((t) => f.remove(p.join(r, t))));
  });
  function a(c) {
    let r;
    try {
      r = h.readdirSync(c);
    } catch {
      return o.mkdirsSync(c);
    }
    r.forEach((i) => {
      i = p.join(c, i), f.removeSync(i);
    });
  }
  return empty = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: u,
    emptydir: u
  }, empty;
}
var file, hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const e = requireUniversalify().fromCallback, h = require$$1$1, p = requireGracefulFs(), o = /* @__PURE__ */ requireMkdirs();
  function f(a, c) {
    function r() {
      p.writeFile(a, "", (i) => {
        if (i) return c(i);
        c();
      });
    }
    p.stat(a, (i, t) => {
      if (!i && t.isFile()) return c();
      const n = h.dirname(a);
      p.stat(n, (s, m) => {
        if (s)
          return s.code === "ENOENT" ? o.mkdirs(n, (y) => {
            if (y) return c(y);
            r();
          }) : c(s);
        m.isDirectory() ? r() : p.readdir(n, (y) => {
          if (y) return c(y);
        });
      });
    });
  }
  function u(a) {
    let c;
    try {
      c = p.statSync(a);
    } catch {
    }
    if (c && c.isFile()) return;
    const r = h.dirname(a);
    try {
      p.statSync(r).isDirectory() || p.readdirSync(r);
    } catch (i) {
      if (i && i.code === "ENOENT") o.mkdirsSync(r);
      else throw i;
    }
    p.writeFileSync(a, "");
  }
  return file = {
    createFile: e(f),
    createFileSync: u
  }, file;
}
var link, hasRequiredLink;
function requireLink() {
  if (hasRequiredLink) return link;
  hasRequiredLink = 1;
  const e = requireUniversalify().fromCallback, h = require$$1$1, p = requireGracefulFs(), o = /* @__PURE__ */ requireMkdirs(), f = requirePathExists().pathExists, { areIdentical: u } = /* @__PURE__ */ requireStat();
  function a(r, i, t) {
    function n(s, m) {
      p.link(s, m, (y) => {
        if (y) return t(y);
        t(null);
      });
    }
    p.lstat(i, (s, m) => {
      p.lstat(r, (y, E) => {
        if (y)
          return y.message = y.message.replace("lstat", "ensureLink"), t(y);
        if (m && u(E, m)) return t(null);
        const g = h.dirname(i);
        f(g, (q, C) => {
          if (q) return t(q);
          if (C) return n(r, i);
          o.mkdirs(g, (P) => {
            if (P) return t(P);
            n(r, i);
          });
        });
      });
    });
  }
  function c(r, i) {
    let t;
    try {
      t = p.lstatSync(i);
    } catch {
    }
    try {
      const m = p.lstatSync(r);
      if (t && u(m, t)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const n = h.dirname(i);
    return p.existsSync(n) || o.mkdirsSync(n), p.linkSync(r, i);
  }
  return link = {
    createLink: e(a),
    createLinkSync: c
  }, link;
}
var symlinkPaths_1, hasRequiredSymlinkPaths;
function requireSymlinkPaths() {
  if (hasRequiredSymlinkPaths) return symlinkPaths_1;
  hasRequiredSymlinkPaths = 1;
  const e = require$$1$1, h = requireGracefulFs(), p = requirePathExists().pathExists;
  function o(u, a, c) {
    if (e.isAbsolute(u))
      return h.lstat(u, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), c(r)) : c(null, {
        toCwd: u,
        toDst: u
      }));
    {
      const r = e.dirname(a), i = e.join(r, u);
      return p(i, (t, n) => t ? c(t) : n ? c(null, {
        toCwd: i,
        toDst: u
      }) : h.lstat(u, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), c(s)) : c(null, {
        toCwd: u,
        toDst: e.relative(r, u)
      })));
    }
  }
  function f(u, a) {
    let c;
    if (e.isAbsolute(u)) {
      if (c = h.existsSync(u), !c) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: u,
        toDst: u
      };
    } else {
      const r = e.dirname(a), i = e.join(r, u);
      if (c = h.existsSync(i), c)
        return {
          toCwd: i,
          toDst: u
        };
      if (c = h.existsSync(u), !c) throw new Error("relative srcpath does not exist");
      return {
        toCwd: u,
        toDst: e.relative(r, u)
      };
    }
  }
  return symlinkPaths_1 = {
    symlinkPaths: o,
    symlinkPathsSync: f
  }, symlinkPaths_1;
}
var symlinkType_1, hasRequiredSymlinkType;
function requireSymlinkType() {
  if (hasRequiredSymlinkType) return symlinkType_1;
  hasRequiredSymlinkType = 1;
  const e = requireGracefulFs();
  function h(o, f, u) {
    if (u = typeof f == "function" ? f : u, f = typeof f == "function" ? !1 : f, f) return u(null, f);
    e.lstat(o, (a, c) => {
      if (a) return u(null, "file");
      f = c && c.isDirectory() ? "dir" : "file", u(null, f);
    });
  }
  function p(o, f) {
    let u;
    if (f) return f;
    try {
      u = e.lstatSync(o);
    } catch {
      return "file";
    }
    return u && u.isDirectory() ? "dir" : "file";
  }
  return symlinkType_1 = {
    symlinkType: h,
    symlinkTypeSync: p
  }, symlinkType_1;
}
var symlink, hasRequiredSymlink;
function requireSymlink() {
  if (hasRequiredSymlink) return symlink;
  hasRequiredSymlink = 1;
  const e = requireUniversalify().fromCallback, h = require$$1$1, p = /* @__PURE__ */ requireFs(), o = /* @__PURE__ */ requireMkdirs(), f = o.mkdirs, u = o.mkdirsSync, a = /* @__PURE__ */ requireSymlinkPaths(), c = a.symlinkPaths, r = a.symlinkPathsSync, i = /* @__PURE__ */ requireSymlinkType(), t = i.symlinkType, n = i.symlinkTypeSync, s = requirePathExists().pathExists, { areIdentical: m } = /* @__PURE__ */ requireStat();
  function y(q, C, P, $) {
    $ = typeof P == "function" ? P : $, P = typeof P == "function" ? !1 : P, p.lstat(C, (b, I) => {
      !b && I.isSymbolicLink() ? Promise.all([
        p.stat(q),
        p.stat(C)
      ]).then(([T, A]) => {
        if (m(T, A)) return $(null);
        E(q, C, P, $);
      }) : E(q, C, P, $);
    });
  }
  function E(q, C, P, $) {
    c(q, C, (b, I) => {
      if (b) return $(b);
      q = I.toDst, t(I.toCwd, P, (T, A) => {
        if (T) return $(T);
        const _ = h.dirname(C);
        s(_, (z, J) => {
          if (z) return $(z);
          if (J) return p.symlink(q, C, A, $);
          f(_, (H) => {
            if (H) return $(H);
            p.symlink(q, C, A, $);
          });
        });
      });
    });
  }
  function g(q, C, P) {
    let $;
    try {
      $ = p.lstatSync(C);
    } catch {
    }
    if ($ && $.isSymbolicLink()) {
      const A = p.statSync(q), _ = p.statSync(C);
      if (m(A, _)) return;
    }
    const b = r(q, C);
    q = b.toDst, P = n(b.toCwd, P);
    const I = h.dirname(C);
    return p.existsSync(I) || u(I), p.symlinkSync(q, C, P);
  }
  return symlink = {
    createSymlink: e(y),
    createSymlinkSync: g
  }, symlink;
}
var ensure, hasRequiredEnsure;
function requireEnsure() {
  if (hasRequiredEnsure) return ensure;
  hasRequiredEnsure = 1;
  const { createFile: e, createFileSync: h } = /* @__PURE__ */ requireFile(), { createLink: p, createLinkSync: o } = /* @__PURE__ */ requireLink(), { createSymlink: f, createSymlinkSync: u } = /* @__PURE__ */ requireSymlink();
  return ensure = {
    // file
    createFile: e,
    createFileSync: h,
    ensureFile: e,
    ensureFileSync: h,
    // link
    createLink: p,
    createLinkSync: o,
    ensureLink: p,
    ensureLinkSync: o,
    // symlink
    createSymlink: f,
    createSymlinkSync: u,
    ensureSymlink: f,
    ensureSymlinkSync: u
  }, ensure;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  function e(p, { EOL: o = `
`, finalEOL: f = !0, replacer: u = null, spaces: a } = {}) {
    const c = f ? o : "";
    return JSON.stringify(p, u, a).replace(/\n/g, o) + c;
  }
  function h(p) {
    return Buffer.isBuffer(p) && (p = p.toString("utf8")), p.replace(/^\uFEFF/, "");
  }
  return utils = { stringify: e, stripBom: h }, utils;
}
var jsonfile$1, hasRequiredJsonfile$1;
function requireJsonfile$1() {
  if (hasRequiredJsonfile$1) return jsonfile$1;
  hasRequiredJsonfile$1 = 1;
  let e;
  try {
    e = requireGracefulFs();
  } catch {
    e = require$$1;
  }
  const h = requireUniversalify(), { stringify: p, stripBom: o } = requireUtils();
  async function f(t, n = {}) {
    typeof n == "string" && (n = { encoding: n });
    const s = n.fs || e, m = "throws" in n ? n.throws : !0;
    let y = await h.fromCallback(s.readFile)(t, n);
    y = o(y);
    let E;
    try {
      E = JSON.parse(y, n ? n.reviver : null);
    } catch (g) {
      if (m)
        throw g.message = `${t}: ${g.message}`, g;
      return null;
    }
    return E;
  }
  const u = h.fromPromise(f);
  function a(t, n = {}) {
    typeof n == "string" && (n = { encoding: n });
    const s = n.fs || e, m = "throws" in n ? n.throws : !0;
    try {
      let y = s.readFileSync(t, n);
      return y = o(y), JSON.parse(y, n.reviver);
    } catch (y) {
      if (m)
        throw y.message = `${t}: ${y.message}`, y;
      return null;
    }
  }
  async function c(t, n, s = {}) {
    const m = s.fs || e, y = p(n, s);
    await h.fromCallback(m.writeFile)(t, y, s);
  }
  const r = h.fromPromise(c);
  function i(t, n, s = {}) {
    const m = s.fs || e, y = p(n, s);
    return m.writeFileSync(t, y, s);
  }
  return jsonfile$1 = {
    readFile: u,
    readFileSync: a,
    writeFile: r,
    writeFileSync: i
  }, jsonfile$1;
}
var jsonfile, hasRequiredJsonfile;
function requireJsonfile() {
  if (hasRequiredJsonfile) return jsonfile;
  hasRequiredJsonfile = 1;
  const e = requireJsonfile$1();
  return jsonfile = {
    // jsonfile exports
    readJson: e.readFile,
    readJsonSync: e.readFileSync,
    writeJson: e.writeFile,
    writeJsonSync: e.writeFileSync
  }, jsonfile;
}
var outputFile_1, hasRequiredOutputFile;
function requireOutputFile() {
  if (hasRequiredOutputFile) return outputFile_1;
  hasRequiredOutputFile = 1;
  const e = requireUniversalify().fromCallback, h = requireGracefulFs(), p = require$$1$1, o = /* @__PURE__ */ requireMkdirs(), f = requirePathExists().pathExists;
  function u(c, r, i, t) {
    typeof i == "function" && (t = i, i = "utf8");
    const n = p.dirname(c);
    f(n, (s, m) => {
      if (s) return t(s);
      if (m) return h.writeFile(c, r, i, t);
      o.mkdirs(n, (y) => {
        if (y) return t(y);
        h.writeFile(c, r, i, t);
      });
    });
  }
  function a(c, ...r) {
    const i = p.dirname(c);
    if (h.existsSync(i))
      return h.writeFileSync(c, ...r);
    o.mkdirsSync(i), h.writeFileSync(c, ...r);
  }
  return outputFile_1 = {
    outputFile: e(u),
    outputFileSync: a
  }, outputFile_1;
}
var outputJson_1, hasRequiredOutputJson;
function requireOutputJson() {
  if (hasRequiredOutputJson) return outputJson_1;
  hasRequiredOutputJson = 1;
  const { stringify: e } = requireUtils(), { outputFile: h } = /* @__PURE__ */ requireOutputFile();
  async function p(o, f, u = {}) {
    const a = e(f, u);
    await h(o, a, u);
  }
  return outputJson_1 = p, outputJson_1;
}
var outputJsonSync_1, hasRequiredOutputJsonSync;
function requireOutputJsonSync() {
  if (hasRequiredOutputJsonSync) return outputJsonSync_1;
  hasRequiredOutputJsonSync = 1;
  const { stringify: e } = requireUtils(), { outputFileSync: h } = /* @__PURE__ */ requireOutputFile();
  function p(o, f, u) {
    const a = e(f, u);
    h(o, a, u);
  }
  return outputJsonSync_1 = p, outputJsonSync_1;
}
var json$1, hasRequiredJson$1;
function requireJson$1() {
  if (hasRequiredJson$1) return json$1;
  hasRequiredJson$1 = 1;
  const e = requireUniversalify().fromPromise, h = /* @__PURE__ */ requireJsonfile();
  return h.outputJson = e(/* @__PURE__ */ requireOutputJson()), h.outputJsonSync = /* @__PURE__ */ requireOutputJsonSync(), h.outputJSON = h.outputJson, h.outputJSONSync = h.outputJsonSync, h.writeJSON = h.writeJson, h.writeJSONSync = h.writeJsonSync, h.readJSON = h.readJson, h.readJSONSync = h.readJsonSync, json$1 = h, json$1;
}
var move_1, hasRequiredMove$1;
function requireMove$1() {
  if (hasRequiredMove$1) return move_1;
  hasRequiredMove$1 = 1;
  const e = requireGracefulFs(), h = require$$1$1, p = requireCopy().copy, o = requireRemove().remove, f = requireMkdirs().mkdirp, u = requirePathExists().pathExists, a = /* @__PURE__ */ requireStat();
  function c(s, m, y, E) {
    typeof y == "function" && (E = y, y = {}), y = y || {};
    const g = y.overwrite || y.clobber || !1;
    a.checkPaths(s, m, "move", y, (q, C) => {
      if (q) return E(q);
      const { srcStat: P, isChangingCase: $ = !1 } = C;
      a.checkParentPaths(s, P, m, "move", (b) => {
        if (b) return E(b);
        if (r(m)) return i(s, m, g, $, E);
        f(h.dirname(m), (I) => I ? E(I) : i(s, m, g, $, E));
      });
    });
  }
  function r(s) {
    const m = h.dirname(s);
    return h.parse(m).root === m;
  }
  function i(s, m, y, E, g) {
    if (E) return t(s, m, y, g);
    if (y)
      return o(m, (q) => q ? g(q) : t(s, m, y, g));
    u(m, (q, C) => q ? g(q) : C ? g(new Error("dest already exists.")) : t(s, m, y, g));
  }
  function t(s, m, y, E) {
    e.rename(s, m, (g) => g ? g.code !== "EXDEV" ? E(g) : n(s, m, y, E) : E());
  }
  function n(s, m, y, E) {
    p(s, m, {
      overwrite: y,
      errorOnExist: !0
    }, (q) => q ? E(q) : o(s, E));
  }
  return move_1 = c, move_1;
}
var moveSync_1, hasRequiredMoveSync;
function requireMoveSync() {
  if (hasRequiredMoveSync) return moveSync_1;
  hasRequiredMoveSync = 1;
  const e = requireGracefulFs(), h = require$$1$1, p = requireCopy().copySync, o = requireRemove().removeSync, f = requireMkdirs().mkdirpSync, u = /* @__PURE__ */ requireStat();
  function a(n, s, m) {
    m = m || {};
    const y = m.overwrite || m.clobber || !1, { srcStat: E, isChangingCase: g = !1 } = u.checkPathsSync(n, s, "move", m);
    return u.checkParentPathsSync(n, E, s, "move"), c(s) || f(h.dirname(s)), r(n, s, y, g);
  }
  function c(n) {
    const s = h.dirname(n);
    return h.parse(s).root === s;
  }
  function r(n, s, m, y) {
    if (y) return i(n, s, m);
    if (m)
      return o(s), i(n, s, m);
    if (e.existsSync(s)) throw new Error("dest already exists.");
    return i(n, s, m);
  }
  function i(n, s, m) {
    try {
      e.renameSync(n, s);
    } catch (y) {
      if (y.code !== "EXDEV") throw y;
      return t(n, s, m);
    }
  }
  function t(n, s, m) {
    return p(n, s, {
      overwrite: m,
      errorOnExist: !0
    }), o(n);
  }
  return moveSync_1 = a, moveSync_1;
}
var move, hasRequiredMove;
function requireMove() {
  if (hasRequiredMove) return move;
  hasRequiredMove = 1;
  const e = requireUniversalify().fromCallback;
  return move = {
    move: e(/* @__PURE__ */ requireMove$1()),
    moveSync: /* @__PURE__ */ requireMoveSync()
  }, move;
}
var lib, hasRequiredLib;
function requireLib() {
  return hasRequiredLib || (hasRequiredLib = 1, lib = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ requireFs(),
    // Export extra methods:
    .../* @__PURE__ */ requireCopy(),
    .../* @__PURE__ */ requireEmpty(),
    .../* @__PURE__ */ requireEnsure(),
    .../* @__PURE__ */ requireJson$1(),
    .../* @__PURE__ */ requireMkdirs(),
    .../* @__PURE__ */ requireMove(),
    .../* @__PURE__ */ requireOutputFile(),
    .../* @__PURE__ */ requirePathExists(),
    .../* @__PURE__ */ requireRemove()
  }), lib;
}
var BaseUpdater = {}, AppUpdater = {}, out = {}, CancellationToken = {}, hasRequiredCancellationToken;
function requireCancellationToken() {
  if (hasRequiredCancellationToken) return CancellationToken;
  hasRequiredCancellationToken = 1, Object.defineProperty(CancellationToken, "__esModule", { value: !0 }), CancellationToken.CancellationError = CancellationToken.CancellationToken = void 0;
  const e = require$$0$2;
  let h = class extends e.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new p());
      const u = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((c, r) => {
        let i = null;
        if (a = () => {
          try {
            i != null && (i(), i = null);
          } finally {
            r(new p());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), f(c, r, (t) => {
          i = t;
        });
      }).then((c) => (u(), c)).catch((c) => {
        throw u(), c;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  CancellationToken.CancellationToken = h;
  class p extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return CancellationToken.CancellationError = p, CancellationToken;
}
var error = {}, hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1, Object.defineProperty(error, "__esModule", { value: !0 }), error.newError = e;
  function e(h, p) {
    const o = new Error(h);
    return o.code = p, o;
  }
  return error;
}
var httpExecutor = {}, src = { exports: {} }, browser = { exports: {} }, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var e = 1e3, h = e * 60, p = h * 60, o = p * 24, f = o * 7, u = o * 365.25;
  ms = function(t, n) {
    n = n || {};
    var s = typeof t;
    if (s === "string" && t.length > 0)
      return a(t);
    if (s === "number" && isFinite(t))
      return n.long ? r(t) : c(t);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(t)
    );
  };
  function a(t) {
    if (t = String(t), !(t.length > 100)) {
      var n = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        t
      );
      if (n) {
        var s = parseFloat(n[1]), m = (n[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return s * u;
          case "weeks":
          case "week":
          case "w":
            return s * f;
          case "days":
          case "day":
          case "d":
            return s * o;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return s * p;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return s * h;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return s * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return s;
          default:
            return;
        }
      }
    }
  }
  function c(t) {
    var n = Math.abs(t);
    return n >= o ? Math.round(t / o) + "d" : n >= p ? Math.round(t / p) + "h" : n >= h ? Math.round(t / h) + "m" : n >= e ? Math.round(t / e) + "s" : t + "ms";
  }
  function r(t) {
    var n = Math.abs(t);
    return n >= o ? i(t, n, o, "day") : n >= p ? i(t, n, p, "hour") : n >= h ? i(t, n, h, "minute") : n >= e ? i(t, n, e, "second") : t + " ms";
  }
  function i(t, n, s, m) {
    var y = n >= s * 1.5;
    return Math.round(t / s) + " " + m + (y ? "s" : "");
  }
  return ms;
}
var common$1, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  function e(h) {
    o.debug = o, o.default = o, o.coerce = i, o.disable = c, o.enable = u, o.enabled = r, o.humanize = requireMs(), o.destroy = t, Object.keys(h).forEach((n) => {
      o[n] = h[n];
    }), o.names = [], o.skips = [], o.formatters = {};
    function p(n) {
      let s = 0;
      for (let m = 0; m < n.length; m++)
        s = (s << 5) - s + n.charCodeAt(m), s |= 0;
      return o.colors[Math.abs(s) % o.colors.length];
    }
    o.selectColor = p;
    function o(n) {
      let s, m = null, y, E;
      function g(...q) {
        if (!g.enabled)
          return;
        const C = g, P = Number(/* @__PURE__ */ new Date()), $ = P - (s || P);
        C.diff = $, C.prev = s, C.curr = P, s = P, q[0] = o.coerce(q[0]), typeof q[0] != "string" && q.unshift("%O");
        let b = 0;
        q[0] = q[0].replace(/%([a-zA-Z%])/g, (T, A) => {
          if (T === "%%")
            return "%";
          b++;
          const _ = o.formatters[A];
          if (typeof _ == "function") {
            const z = q[b];
            T = _.call(C, z), q.splice(b, 1), b--;
          }
          return T;
        }), o.formatArgs.call(C, q), (C.log || o.log).apply(C, q);
      }
      return g.namespace = n, g.useColors = o.useColors(), g.color = o.selectColor(n), g.extend = f, g.destroy = o.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (y !== o.namespaces && (y = o.namespaces, E = o.enabled(n)), E),
        set: (q) => {
          m = q;
        }
      }), typeof o.init == "function" && o.init(g), g;
    }
    function f(n, s) {
      const m = o(this.namespace + (typeof s > "u" ? ":" : s) + n);
      return m.log = this.log, m;
    }
    function u(n) {
      o.save(n), o.namespaces = n, o.names = [], o.skips = [];
      const s = (typeof n == "string" ? n : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of s)
        m[0] === "-" ? o.skips.push(m.slice(1)) : o.names.push(m);
    }
    function a(n, s) {
      let m = 0, y = 0, E = -1, g = 0;
      for (; m < n.length; )
        if (y < s.length && (s[y] === n[m] || s[y] === "*"))
          s[y] === "*" ? (E = y, g = m, y++) : (m++, y++);
        else if (E !== -1)
          y = E + 1, g++, m = g;
        else
          return !1;
      for (; y < s.length && s[y] === "*"; )
        y++;
      return y === s.length;
    }
    function c() {
      const n = [
        ...o.names,
        ...o.skips.map((s) => "-" + s)
      ].join(",");
      return o.enable(""), n;
    }
    function r(n) {
      for (const s of o.skips)
        if (a(n, s))
          return !1;
      for (const s of o.names)
        if (a(n, s))
          return !0;
      return !1;
    }
    function i(n) {
      return n instanceof Error ? n.stack || n.message : n;
    }
    function t() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return o.enable(o.load()), o;
  }
  return common$1 = e, common$1;
}
var hasRequiredBrowser;
function requireBrowser() {
  return hasRequiredBrowser || (hasRequiredBrowser = 1, (function(e, h) {
    h.formatArgs = o, h.save = f, h.load = u, h.useColors = p, h.storage = a(), h.destroy = /* @__PURE__ */ (() => {
      let r = !1;
      return () => {
        r || (r = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), h.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function p() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let r;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (r = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(r[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function o(r) {
      if (r[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const i = "color: " + this.color;
      r.splice(1, 0, i, "color: inherit");
      let t = 0, n = 0;
      r[0].replace(/%[a-zA-Z%]/g, (s) => {
        s !== "%%" && (t++, s === "%c" && (n = t));
      }), r.splice(n, 0, i);
    }
    h.log = console.debug || console.log || (() => {
    });
    function f(r) {
      try {
        r ? h.storage.setItem("debug", r) : h.storage.removeItem("debug");
      } catch {
      }
    }
    function u() {
      let r;
      try {
        r = h.storage.getItem("debug") || h.storage.getItem("DEBUG");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = requireCommon$1()(h);
    const { formatters: c } = e.exports;
    c.j = function(r) {
      try {
        return JSON.stringify(r);
      } catch (i) {
        return "[UnexpectedJSONParseError]: " + i.message;
      }
    };
  })(browser, browser.exports)), browser.exports;
}
var node = { exports: {} }, hasFlag, hasRequiredHasFlag;
function requireHasFlag() {
  return hasRequiredHasFlag || (hasRequiredHasFlag = 1, hasFlag = (e, h = process.argv) => {
    const p = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", o = h.indexOf(p + e), f = h.indexOf("--");
    return o !== -1 && (f === -1 || o < f);
  }), hasFlag;
}
var supportsColor_1, hasRequiredSupportsColor;
function requireSupportsColor() {
  if (hasRequiredSupportsColor) return supportsColor_1;
  hasRequiredSupportsColor = 1;
  const e = require$$2, h = require$$1$2, p = requireHasFlag(), { env: o } = process;
  let f;
  p("no-color") || p("no-colors") || p("color=false") || p("color=never") ? f = 0 : (p("color") || p("colors") || p("color=true") || p("color=always")) && (f = 1), "FORCE_COLOR" in o && (o.FORCE_COLOR === "true" ? f = 1 : o.FORCE_COLOR === "false" ? f = 0 : f = o.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(o.FORCE_COLOR, 10), 3));
  function u(r) {
    return r === 0 ? !1 : {
      level: r,
      hasBasic: !0,
      has256: r >= 2,
      has16m: r >= 3
    };
  }
  function a(r, i) {
    if (f === 0)
      return 0;
    if (p("color=16m") || p("color=full") || p("color=truecolor"))
      return 3;
    if (p("color=256"))
      return 2;
    if (r && !i && f === void 0)
      return 0;
    const t = f || 0;
    if (o.TERM === "dumb")
      return t;
    if (process.platform === "win32") {
      const n = e.release().split(".");
      return Number(n[0]) >= 10 && Number(n[2]) >= 10586 ? Number(n[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in o)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((n) => n in o) || o.CI_NAME === "codeship" ? 1 : t;
    if ("TEAMCITY_VERSION" in o)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION) ? 1 : 0;
    if (o.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in o) {
      const n = parseInt((o.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (o.TERM_PROGRAM) {
        case "iTerm.app":
          return n >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(o.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM) || "COLORTERM" in o ? 1 : t;
  }
  function c(r) {
    const i = a(r, r && r.isTTY);
    return u(i);
  }
  return supportsColor_1 = {
    supportsColor: c,
    stdout: u(a(!0, h.isatty(1))),
    stderr: u(a(!0, h.isatty(2)))
  }, supportsColor_1;
}
var hasRequiredNode;
function requireNode() {
  return hasRequiredNode || (hasRequiredNode = 1, (function(e, h) {
    const p = require$$1$2, o = require$$4;
    h.init = t, h.log = c, h.formatArgs = u, h.save = r, h.load = i, h.useColors = f, h.destroy = o.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), h.colors = [6, 2, 3, 4, 5, 1];
    try {
      const s = requireSupportsColor();
      s && (s.stderr || s).level >= 2 && (h.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    h.inspectOpts = Object.keys(process.env).filter((s) => /^debug_/i.test(s)).reduce((s, m) => {
      const y = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, q) => q.toUpperCase());
      let E = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), s[y] = E, s;
    }, {});
    function f() {
      return "colors" in h.inspectOpts ? !!h.inspectOpts.colors : p.isatty(process.stderr.fd);
    }
    function u(s) {
      const { namespace: m, useColors: y } = this;
      if (y) {
        const E = this.color, g = "\x1B[3" + (E < 8 ? E : "8;5;" + E), q = `  ${g};1m${m} \x1B[0m`;
        s[0] = q + s[0].split(`
`).join(`
` + q), s.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        s[0] = a() + m + " " + s[0];
    }
    function a() {
      return h.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...s) {
      return process.stderr.write(o.formatWithOptions(h.inspectOpts, ...s) + `
`);
    }
    function r(s) {
      s ? process.env.DEBUG = s : delete process.env.DEBUG;
    }
    function i() {
      return process.env.DEBUG;
    }
    function t(s) {
      s.inspectOpts = {};
      const m = Object.keys(h.inspectOpts);
      for (let y = 0; y < m.length; y++)
        s.inspectOpts[m[y]] = h.inspectOpts[m[y]];
    }
    e.exports = requireCommon$1()(h);
    const { formatters: n } = e.exports;
    n.o = function(s) {
      return this.inspectOpts.colors = this.useColors, o.inspect(s, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, n.O = function(s) {
      return this.inspectOpts.colors = this.useColors, o.inspect(s, this.inspectOpts);
    };
  })(node, node.exports)), node.exports;
}
var hasRequiredSrc;
function requireSrc() {
  return hasRequiredSrc || (hasRequiredSrc = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? src.exports = requireBrowser() : src.exports = requireNode()), src.exports;
}
var ProgressCallbackTransform = {}, hasRequiredProgressCallbackTransform;
function requireProgressCallbackTransform() {
  if (hasRequiredProgressCallbackTransform) return ProgressCallbackTransform;
  hasRequiredProgressCallbackTransform = 1, Object.defineProperty(ProgressCallbackTransform, "__esModule", { value: !0 }), ProgressCallbackTransform.ProgressCallbackTransform = void 0;
  const e = require$$0$1;
  let h = class extends e.Transform {
    constructor(o, f, u) {
      super(), this.total = o, this.cancellationToken = f, this.onProgress = u, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(o, f, u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"), null);
        return;
      }
      this.transferred += o.length, this.delta += o.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), u(null, o);
    }
    _flush(o) {
      if (this.cancellationToken.cancelled) {
        o(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, o(null);
    }
  };
  return ProgressCallbackTransform.ProgressCallbackTransform = h, ProgressCallbackTransform;
}
var hasRequiredHttpExecutor;
function requireHttpExecutor() {
  if (hasRequiredHttpExecutor) return httpExecutor;
  hasRequiredHttpExecutor = 1, Object.defineProperty(httpExecutor, "__esModule", { value: !0 }), httpExecutor.DigestTransform = httpExecutor.HttpExecutor = httpExecutor.HttpError = void 0, httpExecutor.createHttpError = i, httpExecutor.parseJson = s, httpExecutor.configureRequestOptionsFromUrl = E, httpExecutor.configureRequestUrl = g, httpExecutor.safeGetHeader = P, httpExecutor.configureRequestOptions = b, httpExecutor.safeStringifyJson = I;
  const e = require$$0$3, h = requireSrc(), p = require$$1, o = require$$0$1, f = require$$2$1, u = requireCancellationToken(), a = requireError(), c = requireProgressCallbackTransform(), r = (0, h.default)("electron-builder");
  function i(T, A = null) {
    return new n(T.statusCode || -1, `${T.statusCode} ${T.statusMessage}` + (A == null ? "" : `
` + JSON.stringify(A, null, "  ")) + `
Headers: ` + I(T.headers), A);
  }
  const t = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class n extends Error {
    constructor(A, _ = `HTTP error: ${t.get(A) || A}`, z = null) {
      super(_), this.statusCode = A, this.description = z, this.name = "HttpError", this.code = `HTTP_ERROR_${A}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  httpExecutor.HttpError = n;
  function s(T) {
    return T.then((A) => A == null || A.length === 0 ? null : JSON.parse(A));
  }
  class m {
    constructor() {
      this.maxRedirects = 10;
    }
    request(A, _ = new u.CancellationToken(), z) {
      b(A);
      const J = z == null ? void 0 : JSON.stringify(z), H = J ? Buffer.from(J) : void 0;
      if (H != null) {
        r(J);
        const { headers: X, ...N } = A;
        A = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": H.length,
            ...X
          },
          ...N
        };
      }
      return this.doApiRequest(A, _, (X) => X.end(H));
    }
    doApiRequest(A, _, z, J = 0) {
      return r.enabled && r(`Request: ${I(A)}`), _.createPromise((H, X, N) => {
        const U = this.createRequest(A, (ne) => {
          try {
            this.handleResponse(ne, A, _, H, X, J, z);
          } catch (L) {
            X(L);
          }
        });
        this.addErrorAndTimeoutHandlers(U, X, A.timeout), this.addRedirectHandlers(U, A, X, J, (ne) => {
          this.doApiRequest(ne, _, z, J).then(H).catch(X);
        }), z(U, X), N(() => U.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(A, _, z, J, H) {
    }
    addErrorAndTimeoutHandlers(A, _, z = 60 * 1e3) {
      this.addTimeOutHandler(A, _, z), A.on("error", _), A.on("aborted", () => {
        _(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(A, _, z, J, H, X, N) {
      var U;
      if (r.enabled && r(`Response: ${A.statusCode} ${A.statusMessage}, request options: ${I(_)}`), A.statusCode === 404) {
        H(i(A, `method: ${_.method || "GET"} url: ${_.protocol || "https:"}//${_.hostname}${_.port ? `:${_.port}` : ""}${_.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (A.statusCode === 204) {
        J();
        return;
      }
      const ne = (U = A.statusCode) !== null && U !== void 0 ? U : 0, L = ne >= 300 && ne < 400, K = P(A, "location");
      if (L && K != null) {
        if (X > this.maxRedirects) {
          H(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(m.prepareRedirectUrlOptions(K, _), z, N, X).then(J).catch(H);
        return;
      }
      A.setEncoding("utf8");
      let ue = "";
      A.on("error", H), A.on("data", (fe) => ue += fe), A.on("end", () => {
        try {
          if (A.statusCode != null && A.statusCode >= 400) {
            const fe = P(A, "content-type"), ge = fe != null && (Array.isArray(fe) ? fe.find((de) => de.includes("json")) != null : fe.includes("json"));
            H(i(A, `method: ${_.method || "GET"} url: ${_.protocol || "https:"}//${_.hostname}${_.port ? `:${_.port}` : ""}${_.path}

          Data:
          ${ge ? JSON.stringify(JSON.parse(ue)) : ue}
          `));
          } else
            J(ue.length === 0 ? null : ue);
        } catch (fe) {
          H(fe);
        }
      });
    }
    async downloadToBuffer(A, _) {
      return await _.cancellationToken.createPromise((z, J, H) => {
        const X = [], N = {
          headers: _.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        g(A, N), b(N), this.doDownload(N, {
          destination: null,
          options: _,
          onCancel: H,
          callback: (U) => {
            U == null ? z(Buffer.concat(X)) : J(U);
          },
          responseHandler: (U, ne) => {
            let L = 0;
            U.on("data", (K) => {
              if (L += K.length, L > 524288e3) {
                ne(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              X.push(K);
            }), U.on("end", () => {
              ne(null);
            });
          }
        }, 0);
      });
    }
    doDownload(A, _, z) {
      const J = this.createRequest(A, (H) => {
        if (H.statusCode >= 400) {
          _.callback(new Error(`Cannot download "${A.protocol || "https:"}//${A.hostname}${A.path}", status ${H.statusCode}: ${H.statusMessage}`));
          return;
        }
        H.on("error", _.callback);
        const X = P(H, "location");
        if (X != null) {
          z < this.maxRedirects ? this.doDownload(m.prepareRedirectUrlOptions(X, A), _, z++) : _.callback(this.createMaxRedirectError());
          return;
        }
        _.responseHandler == null ? $(_, H) : _.responseHandler(H, _.callback);
      });
      this.addErrorAndTimeoutHandlers(J, _.callback, A.timeout), this.addRedirectHandlers(J, A, _.callback, z, (H) => {
        this.doDownload(H, _, z++);
      }), J.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(A, _, z) {
      A.on("socket", (J) => {
        J.setTimeout(z, () => {
          A.abort(), _(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(A, _) {
      const z = E(A, { ..._ }), J = z.headers;
      if (J?.authorization) {
        const H = m.reconstructOriginalUrl(_), X = y(A, _);
        m.isCrossOriginRedirect(H, X) && (r.enabled && r(`Given the cross-origin redirect (from ${H.host} to ${X.host}), the Authorization header will be stripped out.`), delete J.authorization);
      }
      return z;
    }
    static reconstructOriginalUrl(A) {
      const _ = A.protocol || "https:";
      if (!A.hostname)
        throw new Error("Missing hostname in request options");
      const z = A.hostname, J = A.port ? `:${A.port}` : "", H = A.path || "/";
      return new f.URL(`${_}//${z}${J}${H}`);
    }
    static isCrossOriginRedirect(A, _) {
      if (A.hostname.toLowerCase() !== _.hostname.toLowerCase())
        return !0;
      if (A.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(A.port) && _.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(_.port))
        return !1;
      if (A.protocol !== _.protocol)
        return !0;
      const z = A.port, J = _.port;
      return z !== J;
    }
    static retryOnServerError(A, _ = 3) {
      for (let z = 0; ; z++)
        try {
          return A();
        } catch (J) {
          if (z < _ && (J instanceof n && J.isServerError() || J.code === "EPIPE"))
            continue;
          throw J;
        }
    }
  }
  httpExecutor.HttpExecutor = m;
  function y(T, A) {
    try {
      return new f.URL(T);
    } catch {
      const _ = A.hostname, z = A.protocol || "https:", J = A.port ? `:${A.port}` : "", H = `${z}//${_}${J}`;
      return new f.URL(T, H);
    }
  }
  function E(T, A) {
    const _ = b(A), z = y(T, A);
    return g(z, _), _;
  }
  function g(T, A) {
    A.protocol = T.protocol, A.hostname = T.hostname, T.port ? A.port = T.port : A.port && delete A.port, A.path = T.pathname + T.search;
  }
  class q extends o.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(A, _ = "sha512", z = "base64") {
      super(), this.expected = A, this.algorithm = _, this.encoding = z, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, e.createHash)(_);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(A, _, z) {
      this.digester.update(A), z(null, A);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(A) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (_) {
          A(_);
          return;
        }
      A(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  httpExecutor.DigestTransform = q;
  function C(T, A, _) {
    return T != null && A != null && T !== A ? (_(new Error(`checksum mismatch: expected ${A} but got ${T} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function P(T, A) {
    const _ = T.headers[A];
    return _ == null ? null : Array.isArray(_) ? _.length === 0 ? null : _[_.length - 1] : _;
  }
  function $(T, A) {
    if (!C(P(A, "X-Checksum-Sha2"), T.options.sha2, T.callback))
      return;
    const _ = [];
    if (T.options.onProgress != null) {
      const X = P(A, "content-length");
      X != null && _.push(new c.ProgressCallbackTransform(parseInt(X, 10), T.options.cancellationToken, T.options.onProgress));
    }
    const z = T.options.sha512;
    z != null ? _.push(new q(z, "sha512", z.length === 128 && !z.includes("+") && !z.includes("Z") && !z.includes("=") ? "hex" : "base64")) : T.options.sha2 != null && _.push(new q(T.options.sha2, "sha256", "hex"));
    const J = (0, p.createWriteStream)(T.destination);
    _.push(J);
    let H = A;
    for (const X of _)
      X.on("error", (N) => {
        J.close(), T.options.cancellationToken.cancelled || T.callback(N);
      }), H = H.pipe(X);
    J.on("finish", () => {
      J.close(T.callback);
    });
  }
  function b(T, A, _) {
    _ != null && (T.method = _), T.headers = { ...T.headers };
    const z = T.headers;
    return A != null && (z.authorization = A.startsWith("Basic") || A.startsWith("Bearer") ? A : `token ${A}`), z["User-Agent"] == null && (z["User-Agent"] = "electron-builder"), (_ == null || _ === "GET" || z["Cache-Control"] == null) && (z["Cache-Control"] = "no-cache"), T.protocol == null && process.versions.electron != null && (T.protocol = "https:"), T;
  }
  function I(T, A) {
    return JSON.stringify(T, (_, z) => _.endsWith("Authorization") || _.endsWith("authorization") || _.endsWith("Password") || _.endsWith("PASSWORD") || _.endsWith("Token") || _.includes("password") || _.includes("token") || A != null && A.has(_) ? "<stripped sensitive data>" : z, 2);
  }
  return httpExecutor;
}
var MemoLazy = {}, hasRequiredMemoLazy;
function requireMemoLazy() {
  if (hasRequiredMemoLazy) return MemoLazy;
  hasRequiredMemoLazy = 1, Object.defineProperty(MemoLazy, "__esModule", { value: !0 }), MemoLazy.MemoLazy = void 0;
  let e = class {
    constructor(o, f) {
      this.selector = o, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const o = this.selector();
      if (this._value !== void 0 && h(this.selected, o))
        return this._value;
      this.selected = o;
      const f = this.creator(o);
      return this.value = f, f;
    }
    set value(o) {
      this._value = o;
    }
  };
  MemoLazy.MemoLazy = e;
  function h(p, o) {
    if (typeof p == "object" && p !== null && (typeof o == "object" && o !== null)) {
      const a = Object.keys(p), c = Object.keys(o);
      return a.length === c.length && a.every((r) => h(p[r], o[r]));
    }
    return p === o;
  }
  return MemoLazy;
}
var publishOptions = {}, hasRequiredPublishOptions;
function requirePublishOptions() {
  if (hasRequiredPublishOptions) return publishOptions;
  hasRequiredPublishOptions = 1, Object.defineProperty(publishOptions, "__esModule", { value: !0 }), publishOptions.githubUrl = e, publishOptions.githubTagPrefix = h, publishOptions.getS3LikeProviderBaseUrl = p;
  function e(a, c = "github.com") {
    return `${a.protocol || "https"}://${a.host || c}`;
  }
  function h(a) {
    var c;
    return a.tagNamePrefix ? a.tagNamePrefix : !((c = a.vPrefixedTagName) !== null && c !== void 0) || c ? "v" : "";
  }
  function p(a) {
    const c = a.provider;
    if (c === "s3")
      return o(a);
    if (c === "spaces")
      return u(a);
    throw new Error(`Not supported provider: ${c}`);
  }
  function o(a) {
    let c;
    if (a.accelerate == !0)
      c = `https://${a.bucket}.s3-accelerate.amazonaws.com`;
    else if (a.endpoint != null)
      c = `${a.endpoint}/${a.bucket}`;
    else if (a.bucket.includes(".")) {
      if (a.region == null)
        throw new Error(`Bucket name "${a.bucket}" includes a dot, but S3 region is missing`);
      a.region === "us-east-1" ? c = `https://s3.amazonaws.com/${a.bucket}` : c = `https://s3-${a.region}.amazonaws.com/${a.bucket}`;
    } else a.region === "cn-north-1" ? c = `https://${a.bucket}.s3.${a.region}.amazonaws.com.cn` : c = `https://${a.bucket}.s3.amazonaws.com`;
    return f(c, a.path);
  }
  function f(a, c) {
    return c != null && c.length > 0 && (c.startsWith("/") || (a += "/"), a += c), a;
  }
  function u(a) {
    if (a.name == null)
      throw new Error("name is missing");
    if (a.region == null)
      throw new Error("region is missing");
    return f(`https://${a.name}.${a.region}.digitaloceanspaces.com`, a.path);
  }
  return publishOptions;
}
var retry = {}, hasRequiredRetry;
function requireRetry() {
  if (hasRequiredRetry) return retry;
  hasRequiredRetry = 1, Object.defineProperty(retry, "__esModule", { value: !0 }), retry.retry = h;
  const e = requireCancellationToken();
  async function h(p, o) {
    var f;
    const { retries: u, interval: a, backoff: c = 0, attempt: r = 0, shouldRetry: i, cancellationToken: t = new e.CancellationToken() } = o;
    try {
      return await p();
    } catch (n) {
      if (await Promise.resolve((f = i?.(n)) !== null && f !== void 0 ? f : !0) && u > 0 && !t.cancelled)
        return await new Promise((s) => setTimeout(s, a + c * r)), await h(p, { ...o, retries: u - 1, attempt: r + 1 });
      throw n;
    }
  }
  return retry;
}
var rfc2253Parser = {}, hasRequiredRfc2253Parser;
function requireRfc2253Parser() {
  if (hasRequiredRfc2253Parser) return rfc2253Parser;
  hasRequiredRfc2253Parser = 1, Object.defineProperty(rfc2253Parser, "__esModule", { value: !0 }), rfc2253Parser.parseDn = e;
  function e(h) {
    let p = !1, o = null, f = "", u = 0;
    h = h.trim();
    const a = /* @__PURE__ */ new Map();
    for (let c = 0; c <= h.length; c++) {
      if (c === h.length) {
        o !== null && a.set(o, f);
        break;
      }
      const r = h[c];
      if (p) {
        if (r === '"') {
          p = !1;
          continue;
        }
      } else {
        if (r === '"') {
          p = !0;
          continue;
        }
        if (r === "\\") {
          c++;
          const i = parseInt(h.slice(c, c + 2), 16);
          Number.isNaN(i) ? f += h[c] : (c++, f += String.fromCharCode(i));
          continue;
        }
        if (o === null && r === "=") {
          o = f, f = "";
          continue;
        }
        if (r === "," || r === ";" || r === "+") {
          o !== null && a.set(o, f), o = null, f = "";
          continue;
        }
      }
      if (r === " " && !p) {
        if (f.length === 0)
          continue;
        if (c > u) {
          let i = c;
          for (; h[i] === " "; )
            i++;
          u = i;
        }
        if (u >= h.length || h[u] === "," || h[u] === ";" || o === null && h[u] === "=" || o !== null && h[u] === "+") {
          c = u - 1;
          continue;
        }
      }
      f += r;
    }
    return a;
  }
  return rfc2253Parser;
}
var uuid = {}, hasRequiredUuid;
function requireUuid() {
  if (hasRequiredUuid) return uuid;
  hasRequiredUuid = 1, Object.defineProperty(uuid, "__esModule", { value: !0 }), uuid.nil = uuid.UUID = void 0;
  const e = require$$0$3, h = requireError(), p = "options.name must be either a string or a Buffer", o = (0, e.randomBytes)(16);
  o[0] = o[0] | 1;
  const f = {}, u = [];
  for (let n = 0; n < 256; n++) {
    const s = (n + 256).toString(16).substr(1);
    f[s] = n, u[n] = s;
  }
  class a {
    constructor(s) {
      this.ascii = null, this.binary = null;
      const m = a.check(s);
      if (!m)
        throw new Error("not a UUID");
      this.version = m.version, m.format === "ascii" ? this.ascii = s : this.binary = s;
    }
    static v5(s, m) {
      return i(s, "sha1", 80, m);
    }
    toString() {
      return this.ascii == null && (this.ascii = t(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(s, m = 0) {
      if (typeof s == "string")
        return s = s.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(s) ? s === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[s[14] + s[15]] & 240) >> 4,
          variant: c((f[s[19] + s[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(s)) {
        if (s.length < m + 16)
          return !1;
        let y = 0;
        for (; y < 16 && s[m + y] === 0; y++)
          ;
        return y === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (s[m + 6] & 240) >> 4,
          variant: c((s[m + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, h.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(s) {
      const m = Buffer.allocUnsafe(16);
      let y = 0;
      for (let E = 0; E < 16; E++)
        m[E] = f[s[y++] + s[y++]], (E === 3 || E === 5 || E === 7 || E === 9) && (y += 1);
      return m;
    }
  }
  uuid.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function c(n) {
    switch (n) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var r;
  (function(n) {
    n[n.ASCII = 0] = "ASCII", n[n.BINARY = 1] = "BINARY", n[n.OBJECT = 2] = "OBJECT";
  })(r || (r = {}));
  function i(n, s, m, y, E = r.ASCII) {
    const g = (0, e.createHash)(s);
    if (typeof n != "string" && !Buffer.isBuffer(n))
      throw (0, h.newError)(p, "ERR_INVALID_UUID_NAME");
    g.update(y), g.update(n);
    const C = g.digest();
    let P;
    switch (E) {
      case r.BINARY:
        C[6] = C[6] & 15 | m, C[8] = C[8] & 63 | 128, P = C;
        break;
      case r.OBJECT:
        C[6] = C[6] & 15 | m, C[8] = C[8] & 63 | 128, P = new a(C);
        break;
      default:
        P = u[C[0]] + u[C[1]] + u[C[2]] + u[C[3]] + "-" + u[C[4]] + u[C[5]] + "-" + u[C[6] & 15 | m] + u[C[7]] + "-" + u[C[8] & 63 | 128] + u[C[9]] + "-" + u[C[10]] + u[C[11]] + u[C[12]] + u[C[13]] + u[C[14]] + u[C[15]];
        break;
    }
    return P;
  }
  function t(n) {
    return u[n[0]] + u[n[1]] + u[n[2]] + u[n[3]] + "-" + u[n[4]] + u[n[5]] + "-" + u[n[6]] + u[n[7]] + "-" + u[n[8]] + u[n[9]] + "-" + u[n[10]] + u[n[11]] + u[n[12]] + u[n[13]] + u[n[14]] + u[n[15]];
  }
  return uuid.nil = new a("00000000-0000-0000-0000-000000000000"), uuid;
}
var xml = {}, sax = {}, hasRequiredSax;
function requireSax() {
  return hasRequiredSax || (hasRequiredSax = 1, (function(e) {
    (function(h) {
      h.parser = function(S, R) {
        return new o(S, R);
      }, h.SAXParser = o, h.SAXStream = t, h.createStream = i, h.MAX_BUFFER_LENGTH = 64 * 1024;
      var p = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      h.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function o(S, R) {
        if (!(this instanceof o))
          return new o(S, R);
        var te = this;
        u(te), te.q = te.c = "", te.bufferCheckPosition = h.MAX_BUFFER_LENGTH, te.opt = R || {}, te.opt.lowercase = te.opt.lowercase || te.opt.lowercasetags, te.looseCase = te.opt.lowercase ? "toLowerCase" : "toUpperCase", te.tags = [], te.closed = te.closedRoot = te.sawRoot = !1, te.tag = te.error = null, te.strict = !!S, te.noscript = !!(S || te.opt.noscript), te.state = _.BEGIN, te.strictEntities = te.opt.strictEntities, te.ENTITIES = te.strictEntities ? Object.create(h.XML_ENTITIES) : Object.create(h.ENTITIES), te.attribList = [], te.opt.xmlns && (te.ns = Object.create(E)), te.opt.unquotedAttributeValues === void 0 && (te.opt.unquotedAttributeValues = !S), te.trackPosition = te.opt.position !== !1, te.trackPosition && (te.position = te.line = te.column = 0), J(te, "onready");
      }
      Object.create || (Object.create = function(S) {
        function R() {
        }
        R.prototype = S;
        var te = new R();
        return te;
      }), Object.keys || (Object.keys = function(S) {
        var R = [];
        for (var te in S) S.hasOwnProperty(te) && R.push(te);
        return R;
      });
      function f(S) {
        for (var R = Math.max(h.MAX_BUFFER_LENGTH, 10), te = 0, k = 0, pe = p.length; k < pe; k++) {
          var ye = S[p[k]].length;
          if (ye > R)
            switch (p[k]) {
              case "textNode":
                X(S);
                break;
              case "cdata":
                H(S, "oncdata", S.cdata), S.cdata = "";
                break;
              case "script":
                H(S, "onscript", S.script), S.script = "";
                break;
              default:
                U(S, "Max buffer length exceeded: " + p[k]);
            }
          te = Math.max(te, ye);
        }
        var ve = h.MAX_BUFFER_LENGTH - te;
        S.bufferCheckPosition = ve + S.position;
      }
      function u(S) {
        for (var R = 0, te = p.length; R < te; R++)
          S[p[R]] = "";
      }
      function a(S) {
        X(S), S.cdata !== "" && (H(S, "oncdata", S.cdata), S.cdata = ""), S.script !== "" && (H(S, "onscript", S.script), S.script = "");
      }
      o.prototype = {
        end: function() {
          ne(this);
        },
        write: Ee,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var c;
      try {
        c = require("stream").Stream;
      } catch {
        c = function() {
        };
      }
      c || (c = function() {
      });
      var r = h.EVENTS.filter(function(S) {
        return S !== "error" && S !== "end";
      });
      function i(S, R) {
        return new t(S, R);
      }
      function t(S, R) {
        if (!(this instanceof t))
          return new t(S, R);
        c.apply(this), this._parser = new o(S, R), this.writable = !0, this.readable = !0;
        var te = this;
        this._parser.onend = function() {
          te.emit("end");
        }, this._parser.onerror = function(k) {
          te.emit("error", k), te._parser.error = null;
        }, this._decoder = null, r.forEach(function(k) {
          Object.defineProperty(te, "on" + k, {
            get: function() {
              return te._parser["on" + k];
            },
            set: function(pe) {
              if (!pe)
                return te.removeAllListeners(k), te._parser["on" + k] = pe, pe;
              te.on(k, pe);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      t.prototype = Object.create(c.prototype, {
        constructor: {
          value: t
        }
      }), t.prototype.write = function(S) {
        return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(S) && (this._decoder || (this._decoder = new TextDecoder("utf8")), S = this._decoder.decode(S, { stream: !0 })), this._parser.write(S.toString()), this.emit("data", S), !0;
      }, t.prototype.end = function(S) {
        if (S && S.length && this.write(S), this._decoder) {
          var R = this._decoder.decode();
          R && (this._parser.write(R), this.emit("data", R));
        }
        return this._parser.end(), !0;
      }, t.prototype.on = function(S, R) {
        var te = this;
        return !te._parser["on" + S] && r.indexOf(S) !== -1 && (te._parser["on" + S] = function() {
          var k = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          k.splice(0, 0, S), te.emit.apply(te, k);
        }), c.prototype.on.call(te, S, R);
      };
      var n = "[CDATA[", s = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", E = { xml: m, xmlns: y }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, q = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, P = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function $(S) {
        return S === " " || S === `
` || S === "\r" || S === "	";
      }
      function b(S) {
        return S === '"' || S === "'";
      }
      function I(S) {
        return S === ">" || $(S);
      }
      function T(S, R) {
        return S.test(R);
      }
      function A(S, R) {
        return !T(S, R);
      }
      var _ = 0;
      h.STATE = {
        BEGIN: _++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: _++,
        // leading whitespace
        TEXT: _++,
        // general stuff
        TEXT_ENTITY: _++,
        // &amp and such.
        OPEN_WAKA: _++,
        // <
        SGML_DECL: _++,
        // <!BLARG
        SGML_DECL_QUOTED: _++,
        // <!BLARG foo "bar
        DOCTYPE: _++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: _++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: _++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: _++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: _++,
        // <!-
        COMMENT: _++,
        // <!--
        COMMENT_ENDING: _++,
        // <!-- blah -
        COMMENT_ENDED: _++,
        // <!-- blah --
        CDATA: _++,
        // <![CDATA[ something
        CDATA_ENDING: _++,
        // ]
        CDATA_ENDING_2: _++,
        // ]]
        PROC_INST: _++,
        // <?hi
        PROC_INST_BODY: _++,
        // <?hi there
        PROC_INST_ENDING: _++,
        // <?hi "there" ?
        OPEN_TAG: _++,
        // <strong
        OPEN_TAG_SLASH: _++,
        // <strong /
        ATTRIB: _++,
        // <a
        ATTRIB_NAME: _++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: _++,
        // <a foo _
        ATTRIB_VALUE: _++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: _++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: _++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: _++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: _++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: _++,
        // <foo bar=&quot
        CLOSE_TAG: _++,
        // </a
        CLOSE_TAG_SAW_WHITE: _++,
        // </a   >
        SCRIPT: _++,
        // <script> ...
        SCRIPT_ENDING: _++
        // <script> ... <
      }, h.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, h.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(h.ENTITIES).forEach(function(S) {
        var R = h.ENTITIES[S], te = typeof R == "number" ? String.fromCharCode(R) : R;
        h.ENTITIES[S] = te;
      });
      for (var z in h.STATE)
        h.STATE[h.STATE[z]] = z;
      _ = h.STATE;
      function J(S, R, te) {
        S[R] && S[R](te);
      }
      function H(S, R, te) {
        S.textNode && X(S), J(S, R, te);
      }
      function X(S) {
        S.textNode = N(S.opt, S.textNode), S.textNode && J(S, "ontext", S.textNode), S.textNode = "";
      }
      function N(S, R) {
        return S.trim && (R = R.trim()), S.normalize && (R = R.replace(/\s+/g, " ")), R;
      }
      function U(S, R) {
        return X(S), S.trackPosition && (R += `
Line: ` + S.line + `
Column: ` + S.column + `
Char: ` + S.c), R = new Error(R), S.error = R, J(S, "onerror", R), S;
      }
      function ne(S) {
        return S.sawRoot && !S.closedRoot && L(S, "Unclosed root tag"), S.state !== _.BEGIN && S.state !== _.BEGIN_WHITESPACE && S.state !== _.TEXT && U(S, "Unexpected end"), X(S), S.c = "", S.closed = !0, J(S, "onend"), o.call(S, S.strict, S.opt), S;
      }
      function L(S, R) {
        if (typeof S != "object" || !(S instanceof o))
          throw new Error("bad call to strictFail");
        S.strict && U(S, R);
      }
      function K(S) {
        S.strict || (S.tagName = S.tagName[S.looseCase]());
        var R = S.tags[S.tags.length - 1] || S, te = S.tag = { name: S.tagName, attributes: {} };
        S.opt.xmlns && (te.ns = R.ns), S.attribList.length = 0, H(S, "onopentagstart", te);
      }
      function ue(S, R) {
        var te = S.indexOf(":"), k = te < 0 ? ["", S] : S.split(":"), pe = k[0], ye = k[1];
        return R && S === "xmlns" && (pe = "xmlns", ye = ""), { prefix: pe, local: ye };
      }
      function fe(S) {
        if (S.strict || (S.attribName = S.attribName[S.looseCase]()), S.attribList.indexOf(S.attribName) !== -1 || S.tag.attributes.hasOwnProperty(S.attribName)) {
          S.attribName = S.attribValue = "";
          return;
        }
        if (S.opt.xmlns) {
          var R = ue(S.attribName, !0), te = R.prefix, k = R.local;
          if (te === "xmlns")
            if (k === "xml" && S.attribValue !== m)
              L(
                S,
                "xml: prefix must be bound to " + m + `
Actual: ` + S.attribValue
              );
            else if (k === "xmlns" && S.attribValue !== y)
              L(
                S,
                "xmlns: prefix must be bound to " + y + `
Actual: ` + S.attribValue
              );
            else {
              var pe = S.tag, ye = S.tags[S.tags.length - 1] || S;
              pe.ns === ye.ns && (pe.ns = Object.create(ye.ns)), pe.ns[k] = S.attribValue;
            }
          S.attribList.push([S.attribName, S.attribValue]);
        } else
          S.tag.attributes[S.attribName] = S.attribValue, H(S, "onattribute", {
            name: S.attribName,
            value: S.attribValue
          });
        S.attribName = S.attribValue = "";
      }
      function ge(S, R) {
        if (S.opt.xmlns) {
          var te = S.tag, k = ue(S.tagName);
          te.prefix = k.prefix, te.local = k.local, te.uri = te.ns[k.prefix] || "", te.prefix && !te.uri && (L(
            S,
            "Unbound namespace prefix: " + JSON.stringify(S.tagName)
          ), te.uri = k.prefix);
          var pe = S.tags[S.tags.length - 1] || S;
          te.ns && pe.ns !== te.ns && Object.keys(te.ns).forEach(function(d) {
            H(S, "onopennamespace", {
              prefix: d,
              uri: te.ns[d]
            });
          });
          for (var ye = 0, ve = S.attribList.length; ye < ve; ye++) {
            var qe = S.attribList[ye], Re = qe[0], Ie = qe[1], Ce = ue(Re, !0), xe = Ce.prefix, Be = Ce.local, ke = xe === "" ? "" : te.ns[xe] || "", Ue = {
              name: Re,
              value: Ie,
              prefix: xe,
              local: Be,
              uri: ke
            };
            xe && xe !== "xmlns" && !ke && (L(
              S,
              "Unbound namespace prefix: " + JSON.stringify(xe)
            ), Ue.uri = xe), S.tag.attributes[Re] = Ue, H(S, "onattribute", Ue);
          }
          S.attribList.length = 0;
        }
        S.tag.isSelfClosing = !!R, S.sawRoot = !0, S.tags.push(S.tag), H(S, "onopentag", S.tag), R || (!S.noscript && S.tagName.toLowerCase() === "script" ? S.state = _.SCRIPT : S.state = _.TEXT, S.tag = null, S.tagName = ""), S.attribName = S.attribValue = "", S.attribList.length = 0;
      }
      function de(S) {
        if (!S.tagName) {
          L(S, "Weird empty close tag."), S.textNode += "</>", S.state = _.TEXT;
          return;
        }
        if (S.script) {
          if (S.tagName !== "script") {
            S.script += "</" + S.tagName + ">", S.tagName = "", S.state = _.SCRIPT;
            return;
          }
          H(S, "onscript", S.script), S.script = "";
        }
        var R = S.tags.length, te = S.tagName;
        S.strict || (te = te[S.looseCase]());
        for (var k = te; R--; ) {
          var pe = S.tags[R];
          if (pe.name !== k)
            L(S, "Unexpected close tag");
          else
            break;
        }
        if (R < 0) {
          L(S, "Unmatched closing tag: " + S.tagName), S.textNode += "</" + S.tagName + ">", S.state = _.TEXT;
          return;
        }
        S.tagName = te;
        for (var ye = S.tags.length; ye-- > R; ) {
          var ve = S.tag = S.tags.pop();
          S.tagName = S.tag.name, H(S, "onclosetag", S.tagName);
          var qe = {};
          for (var Re in ve.ns)
            qe[Re] = ve.ns[Re];
          var Ie = S.tags[S.tags.length - 1] || S;
          S.opt.xmlns && ve.ns !== Ie.ns && Object.keys(ve.ns).forEach(function(Ce) {
            var xe = ve.ns[Ce];
            H(S, "onclosenamespace", { prefix: Ce, uri: xe });
          });
        }
        R === 0 && (S.closedRoot = !0), S.tagName = S.attribValue = S.attribName = "", S.attribList.length = 0, S.state = _.TEXT;
      }
      function _e(S) {
        var R = S.entity, te = R.toLowerCase(), k, pe = "";
        return S.ENTITIES[R] ? S.ENTITIES[R] : S.ENTITIES[te] ? S.ENTITIES[te] : (R = te, R.charAt(0) === "#" && (R.charAt(1) === "x" ? (R = R.slice(2), k = parseInt(R, 16), pe = k.toString(16)) : (R = R.slice(1), k = parseInt(R, 10), pe = k.toString(10))), R = R.replace(/^0+/, ""), isNaN(k) || pe.toLowerCase() !== R || k < 0 || k > 1114111 ? (L(S, "Invalid character entity"), "&" + S.entity + ";") : String.fromCodePoint(k));
      }
      function we(S, R) {
        R === "<" ? (S.state = _.OPEN_WAKA, S.startTagPosition = S.position) : $(R) || (L(S, "Non-whitespace before first tag."), S.textNode = R, S.state = _.TEXT);
      }
      function ie(S, R) {
        var te = "";
        return R < S.length && (te = S.charAt(R)), te;
      }
      function Ee(S) {
        var R = this;
        if (this.error)
          throw this.error;
        if (R.closed)
          return U(
            R,
            "Cannot write after close. Assign an onready handler."
          );
        if (S === null)
          return ne(R);
        typeof S == "object" && (S = S.toString());
        for (var te = 0, k = ""; k = ie(S, te++), R.c = k, !!k; )
          switch (R.trackPosition && (R.position++, k === `
` ? (R.line++, R.column = 0) : R.column++), R.state) {
            case _.BEGIN:
              if (R.state = _.BEGIN_WHITESPACE, k === "\uFEFF")
                continue;
              we(R, k);
              continue;
            case _.BEGIN_WHITESPACE:
              we(R, k);
              continue;
            case _.TEXT:
              if (R.sawRoot && !R.closedRoot) {
                for (var ye = te - 1; k && k !== "<" && k !== "&"; )
                  k = ie(S, te++), k && R.trackPosition && (R.position++, k === `
` ? (R.line++, R.column = 0) : R.column++);
                R.textNode += S.substring(ye, te - 1);
              }
              k === "<" && !(R.sawRoot && R.closedRoot && !R.strict) ? (R.state = _.OPEN_WAKA, R.startTagPosition = R.position) : (!$(k) && (!R.sawRoot || R.closedRoot) && L(R, "Text data outside of root node."), k === "&" ? R.state = _.TEXT_ENTITY : R.textNode += k);
              continue;
            case _.SCRIPT:
              k === "<" ? R.state = _.SCRIPT_ENDING : R.script += k;
              continue;
            case _.SCRIPT_ENDING:
              k === "/" ? R.state = _.CLOSE_TAG : (R.script += "<" + k, R.state = _.SCRIPT);
              continue;
            case _.OPEN_WAKA:
              if (k === "!")
                R.state = _.SGML_DECL, R.sgmlDecl = "";
              else if (!$(k)) if (T(g, k))
                R.state = _.OPEN_TAG, R.tagName = k;
              else if (k === "/")
                R.state = _.CLOSE_TAG, R.tagName = "";
              else if (k === "?")
                R.state = _.PROC_INST, R.procInstName = R.procInstBody = "";
              else {
                if (L(R, "Unencoded <"), R.startTagPosition + 1 < R.position) {
                  var pe = R.position - R.startTagPosition;
                  k = new Array(pe).join(" ") + k;
                }
                R.textNode += "<" + k, R.state = _.TEXT;
              }
              continue;
            case _.SGML_DECL:
              if (R.sgmlDecl + k === "--") {
                R.state = _.COMMENT, R.comment = "", R.sgmlDecl = "";
                continue;
              }
              R.doctype && R.doctype !== !0 && R.sgmlDecl ? (R.state = _.DOCTYPE_DTD, R.doctype += "<!" + R.sgmlDecl + k, R.sgmlDecl = "") : (R.sgmlDecl + k).toUpperCase() === n ? (H(R, "onopencdata"), R.state = _.CDATA, R.sgmlDecl = "", R.cdata = "") : (R.sgmlDecl + k).toUpperCase() === s ? (R.state = _.DOCTYPE, (R.doctype || R.sawRoot) && L(
                R,
                "Inappropriately located doctype declaration"
              ), R.doctype = "", R.sgmlDecl = "") : k === ">" ? (H(R, "onsgmldeclaration", R.sgmlDecl), R.sgmlDecl = "", R.state = _.TEXT) : (b(k) && (R.state = _.SGML_DECL_QUOTED), R.sgmlDecl += k);
              continue;
            case _.SGML_DECL_QUOTED:
              k === R.q && (R.state = _.SGML_DECL, R.q = ""), R.sgmlDecl += k;
              continue;
            case _.DOCTYPE:
              k === ">" ? (R.state = _.TEXT, H(R, "ondoctype", R.doctype), R.doctype = !0) : (R.doctype += k, k === "[" ? R.state = _.DOCTYPE_DTD : b(k) && (R.state = _.DOCTYPE_QUOTED, R.q = k));
              continue;
            case _.DOCTYPE_QUOTED:
              R.doctype += k, k === R.q && (R.q = "", R.state = _.DOCTYPE);
              continue;
            case _.DOCTYPE_DTD:
              k === "]" ? (R.doctype += k, R.state = _.DOCTYPE) : k === "<" ? (R.state = _.OPEN_WAKA, R.startTagPosition = R.position) : b(k) ? (R.doctype += k, R.state = _.DOCTYPE_DTD_QUOTED, R.q = k) : R.doctype += k;
              continue;
            case _.DOCTYPE_DTD_QUOTED:
              R.doctype += k, k === R.q && (R.state = _.DOCTYPE_DTD, R.q = "");
              continue;
            case _.COMMENT:
              k === "-" ? R.state = _.COMMENT_ENDING : R.comment += k;
              continue;
            case _.COMMENT_ENDING:
              k === "-" ? (R.state = _.COMMENT_ENDED, R.comment = N(R.opt, R.comment), R.comment && H(R, "oncomment", R.comment), R.comment = "") : (R.comment += "-" + k, R.state = _.COMMENT);
              continue;
            case _.COMMENT_ENDED:
              k !== ">" ? (L(R, "Malformed comment"), R.comment += "--" + k, R.state = _.COMMENT) : R.doctype && R.doctype !== !0 ? R.state = _.DOCTYPE_DTD : R.state = _.TEXT;
              continue;
            case _.CDATA:
              for (var ye = te - 1; k && k !== "]"; )
                k = ie(S, te++), k && R.trackPosition && (R.position++, k === `
` ? (R.line++, R.column = 0) : R.column++);
              R.cdata += S.substring(ye, te - 1), k === "]" && (R.state = _.CDATA_ENDING);
              continue;
            case _.CDATA_ENDING:
              k === "]" ? R.state = _.CDATA_ENDING_2 : (R.cdata += "]" + k, R.state = _.CDATA);
              continue;
            case _.CDATA_ENDING_2:
              k === ">" ? (R.cdata && H(R, "oncdata", R.cdata), H(R, "onclosecdata"), R.cdata = "", R.state = _.TEXT) : k === "]" ? R.cdata += "]" : (R.cdata += "]]" + k, R.state = _.CDATA);
              continue;
            case _.PROC_INST:
              k === "?" ? R.state = _.PROC_INST_ENDING : $(k) ? R.state = _.PROC_INST_BODY : R.procInstName += k;
              continue;
            case _.PROC_INST_BODY:
              if (!R.procInstBody && $(k))
                continue;
              k === "?" ? R.state = _.PROC_INST_ENDING : R.procInstBody += k;
              continue;
            case _.PROC_INST_ENDING:
              k === ">" ? (H(R, "onprocessinginstruction", {
                name: R.procInstName,
                body: R.procInstBody
              }), R.procInstName = R.procInstBody = "", R.state = _.TEXT) : (R.procInstBody += "?" + k, R.state = _.PROC_INST_BODY);
              continue;
            case _.OPEN_TAG:
              T(q, k) ? R.tagName += k : (K(R), k === ">" ? ge(R) : k === "/" ? R.state = _.OPEN_TAG_SLASH : ($(k) || L(R, "Invalid character in tag name"), R.state = _.ATTRIB));
              continue;
            case _.OPEN_TAG_SLASH:
              k === ">" ? (ge(R, !0), de(R)) : (L(
                R,
                "Forward-slash in opening tag not followed by >"
              ), R.state = _.ATTRIB);
              continue;
            case _.ATTRIB:
              if ($(k))
                continue;
              k === ">" ? ge(R) : k === "/" ? R.state = _.OPEN_TAG_SLASH : T(g, k) ? (R.attribName = k, R.attribValue = "", R.state = _.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME:
              k === "=" ? R.state = _.ATTRIB_VALUE : k === ">" ? (L(R, "Attribute without value"), R.attribValue = R.attribName, fe(R), ge(R)) : $(k) ? R.state = _.ATTRIB_NAME_SAW_WHITE : T(q, k) ? R.attribName += k : L(R, "Invalid attribute name");
              continue;
            case _.ATTRIB_NAME_SAW_WHITE:
              if (k === "=")
                R.state = _.ATTRIB_VALUE;
              else {
                if ($(k))
                  continue;
                L(R, "Attribute without value"), R.tag.attributes[R.attribName] = "", R.attribValue = "", H(R, "onattribute", {
                  name: R.attribName,
                  value: ""
                }), R.attribName = "", k === ">" ? ge(R) : T(g, k) ? (R.attribName = k, R.state = _.ATTRIB_NAME) : (L(R, "Invalid attribute name"), R.state = _.ATTRIB);
              }
              continue;
            case _.ATTRIB_VALUE:
              if ($(k))
                continue;
              b(k) ? (R.q = k, R.state = _.ATTRIB_VALUE_QUOTED) : (R.opt.unquotedAttributeValues || U(R, "Unquoted attribute value"), R.state = _.ATTRIB_VALUE_UNQUOTED, R.attribValue = k);
              continue;
            case _.ATTRIB_VALUE_QUOTED:
              if (k !== R.q) {
                k === "&" ? R.state = _.ATTRIB_VALUE_ENTITY_Q : R.attribValue += k;
                continue;
              }
              fe(R), R.q = "", R.state = _.ATTRIB_VALUE_CLOSED;
              continue;
            case _.ATTRIB_VALUE_CLOSED:
              $(k) ? R.state = _.ATTRIB : k === ">" ? ge(R) : k === "/" ? R.state = _.OPEN_TAG_SLASH : T(g, k) ? (L(R, "No whitespace between attributes"), R.attribName = k, R.attribValue = "", R.state = _.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case _.ATTRIB_VALUE_UNQUOTED:
              if (!I(k)) {
                k === "&" ? R.state = _.ATTRIB_VALUE_ENTITY_U : R.attribValue += k;
                continue;
              }
              fe(R), k === ">" ? ge(R) : R.state = _.ATTRIB;
              continue;
            case _.CLOSE_TAG:
              if (R.tagName)
                k === ">" ? de(R) : T(q, k) ? R.tagName += k : R.script ? (R.script += "</" + R.tagName + k, R.tagName = "", R.state = _.SCRIPT) : ($(k) || L(R, "Invalid tagname in closing tag"), R.state = _.CLOSE_TAG_SAW_WHITE);
              else {
                if ($(k))
                  continue;
                A(g, k) ? R.script ? (R.script += "</" + k, R.state = _.SCRIPT) : L(R, "Invalid tagname in closing tag.") : R.tagName = k;
              }
              continue;
            case _.CLOSE_TAG_SAW_WHITE:
              if ($(k))
                continue;
              k === ">" ? de(R) : L(R, "Invalid characters in closing tag");
              continue;
            case _.TEXT_ENTITY:
            case _.ATTRIB_VALUE_ENTITY_Q:
            case _.ATTRIB_VALUE_ENTITY_U:
              var ve, qe;
              switch (R.state) {
                case _.TEXT_ENTITY:
                  ve = _.TEXT, qe = "textNode";
                  break;
                case _.ATTRIB_VALUE_ENTITY_Q:
                  ve = _.ATTRIB_VALUE_QUOTED, qe = "attribValue";
                  break;
                case _.ATTRIB_VALUE_ENTITY_U:
                  ve = _.ATTRIB_VALUE_UNQUOTED, qe = "attribValue";
                  break;
              }
              if (k === ";") {
                var Re = _e(R);
                R.opt.unparsedEntities && !Object.values(h.XML_ENTITIES).includes(Re) ? (R.entity = "", R.state = ve, R.write(Re)) : (R[qe] += Re, R.entity = "", R.state = ve);
              } else T(R.entity.length ? P : C, k) ? R.entity += k : (L(R, "Invalid character in entity name"), R[qe] += "&" + R.entity + k, R.entity = "", R.state = ve);
              continue;
            default:
              throw new Error(R, "Unknown state: " + R.state);
          }
        return R.position >= R.bufferCheckPosition && f(R), R;
      }
      String.fromCodePoint || (function() {
        var S = String.fromCharCode, R = Math.floor, te = function() {
          var k = 16384, pe = [], ye, ve, qe = -1, Re = arguments.length;
          if (!Re)
            return "";
          for (var Ie = ""; ++qe < Re; ) {
            var Ce = Number(arguments[qe]);
            if (!isFinite(Ce) || // `NaN`, `+Infinity`, or `-Infinity`
            Ce < 0 || // not a valid Unicode code point
            Ce > 1114111 || // not a valid Unicode code point
            R(Ce) !== Ce)
              throw RangeError("Invalid code point: " + Ce);
            Ce <= 65535 ? pe.push(Ce) : (Ce -= 65536, ye = (Ce >> 10) + 55296, ve = Ce % 1024 + 56320, pe.push(ye, ve)), (qe + 1 === Re || pe.length > k) && (Ie += S.apply(null, pe), pe.length = 0);
          }
          return Ie;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: te,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = te;
      })();
    })(e);
  })(sax)), sax;
}
var hasRequiredXml;
function requireXml() {
  if (hasRequiredXml) return xml;
  hasRequiredXml = 1, Object.defineProperty(xml, "__esModule", { value: !0 }), xml.XElement = void 0, xml.parseXml = a;
  const e = requireSax(), h = requireError();
  class p {
    constructor(r) {
      if (this.name = r, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !r)
        throw (0, h.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(r))
        throw (0, h.newError)(`Invalid element name: ${r}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(r) {
      const i = this.attributes === null ? null : this.attributes[r];
      if (i == null)
        throw (0, h.newError)(`No attribute "${r}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return i;
    }
    removeAttribute(r) {
      this.attributes !== null && delete this.attributes[r];
    }
    element(r, i = !1, t = null) {
      const n = this.elementOrNull(r, i);
      if (n === null)
        throw (0, h.newError)(t || `No element "${r}"`, "ERR_XML_MISSED_ELEMENT");
      return n;
    }
    elementOrNull(r, i = !1) {
      if (this.elements === null)
        return null;
      for (const t of this.elements)
        if (u(t, r, i))
          return t;
      return null;
    }
    getElements(r, i = !1) {
      return this.elements === null ? [] : this.elements.filter((t) => u(t, r, i));
    }
    elementValueOrEmpty(r, i = !1) {
      const t = this.elementOrNull(r, i);
      return t === null ? "" : t.value;
    }
  }
  xml.XElement = p;
  const o = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(c) {
    return o.test(c);
  }
  function u(c, r, i) {
    const t = c.name;
    return t === r || i === !0 && t.length === r.length && t.toLowerCase() === r.toLowerCase();
  }
  function a(c) {
    let r = null;
    const i = e.parser(!0, {}), t = [];
    return i.onopentag = (n) => {
      const s = new p(n.name);
      if (s.attributes = n.attributes, r === null)
        r = s;
      else {
        const m = t[t.length - 1];
        m.elements == null && (m.elements = []), m.elements.push(s);
      }
      t.push(s);
    }, i.onclosetag = () => {
      t.pop();
    }, i.ontext = (n) => {
      t.length > 0 && (t[t.length - 1].value = n);
    }, i.oncdata = (n) => {
      const s = t[t.length - 1];
      s.value = n, s.isCData = !0;
    }, i.onerror = (n) => {
      throw n;
    }, i.write(c), r;
  }
  return xml;
}
var hasRequiredOut;
function requireOut() {
  return hasRequiredOut || (hasRequiredOut = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = n;
    var h = requireCancellationToken();
    Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
      return h.CancellationError;
    } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } });
    var p = requireError();
    Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
      return p.newError;
    } });
    var o = requireHttpExecutor();
    Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
      return o.configureRequestOptions;
    } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return o.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
      return o.configureRequestUrl;
    } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
      return o.createHttpError;
    } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
      return o.DigestTransform;
    } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
      return o.HttpError;
    } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
      return o.HttpExecutor;
    } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
      return o.parseJson;
    } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
      return o.safeGetHeader;
    } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
      return o.safeStringifyJson;
    } });
    var f = requireMemoLazy();
    Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var u = requireProgressCallbackTransform();
    Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return u.ProgressCallbackTransform;
    } });
    var a = requirePublishOptions();
    Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return a.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
      return a.githubUrl;
    } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
      return a.githubTagPrefix;
    } });
    var c = requireRetry();
    Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
      return c.retry;
    } });
    var r = requireRfc2253Parser();
    Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var i = requireUuid();
    Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
      return i.UUID;
    } });
    var t = requireXml();
    Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
      return t.parseXml;
    } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
      return t.XElement;
    } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function n(s) {
      return s == null ? [] : Array.isArray(s) ? s : [s];
    }
  })(out)), out;
}
var jsYaml = {}, loader = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  function e(a) {
    return typeof a > "u" || a === null;
  }
  function h(a) {
    return typeof a == "object" && a !== null;
  }
  function p(a) {
    return Array.isArray(a) ? a : e(a) ? [] : [a];
  }
  function o(a, c) {
    var r, i, t, n;
    if (c)
      for (n = Object.keys(c), r = 0, i = n.length; r < i; r += 1)
        t = n[r], a[t] = c[t];
    return a;
  }
  function f(a, c) {
    var r = "", i;
    for (i = 0; i < c; i += 1)
      r += a;
    return r;
  }
  function u(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return common.isNothing = e, common.isObject = h, common.toArray = p, common.repeat = f, common.isNegativeZero = u, common.extend = o, common;
}
var exception, hasRequiredException;
function requireException() {
  if (hasRequiredException) return exception;
  hasRequiredException = 1;
  function e(p, o) {
    var f = "", u = p.reason || "(unknown reason)";
    return p.mark ? (p.mark.name && (f += 'in "' + p.mark.name + '" '), f += "(" + (p.mark.line + 1) + ":" + (p.mark.column + 1) + ")", !o && p.mark.snippet && (f += `

` + p.mark.snippet), u + " " + f) : u;
  }
  function h(p, o) {
    Error.call(this), this.name = "YAMLException", this.reason = p, this.mark = o, this.message = e(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return h.prototype = Object.create(Error.prototype), h.prototype.constructor = h, h.prototype.toString = function(o) {
    return this.name + ": " + e(this, o);
  }, exception = h, exception;
}
var snippet, hasRequiredSnippet;
function requireSnippet() {
  if (hasRequiredSnippet) return snippet;
  hasRequiredSnippet = 1;
  var e = requireCommon();
  function h(f, u, a, c, r) {
    var i = "", t = "", n = Math.floor(r / 2) - 1;
    return c - u > n && (i = " ... ", u = c - n + i.length), a - c > n && (t = " ...", a = c + n - t.length), {
      str: i + f.slice(u, a).replace(/\t/g, "→") + t,
      pos: c - u + i.length
      // relative position
    };
  }
  function p(f, u) {
    return e.repeat(" ", u - f.length) + f;
  }
  function o(f, u) {
    if (u = Object.create(u || null), !f.buffer) return null;
    u.maxLength || (u.maxLength = 79), typeof u.indent != "number" && (u.indent = 1), typeof u.linesBefore != "number" && (u.linesBefore = 3), typeof u.linesAfter != "number" && (u.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, c = [0], r = [], i, t = -1; i = a.exec(f.buffer); )
      r.push(i.index), c.push(i.index + i[0].length), f.position <= i.index && t < 0 && (t = c.length - 2);
    t < 0 && (t = c.length - 1);
    var n = "", s, m, y = Math.min(f.line + u.linesAfter, r.length).toString().length, E = u.maxLength - (u.indent + y + 3);
    for (s = 1; s <= u.linesBefore && !(t - s < 0); s++)
      m = h(
        f.buffer,
        c[t - s],
        r[t - s],
        f.position - (c[t] - c[t - s]),
        E
      ), n = e.repeat(" ", u.indent) + p((f.line - s + 1).toString(), y) + " | " + m.str + `
` + n;
    for (m = h(f.buffer, c[t], r[t], f.position, E), n += e.repeat(" ", u.indent) + p((f.line + 1).toString(), y) + " | " + m.str + `
`, n += e.repeat("-", u.indent + y + 3 + m.pos) + `^
`, s = 1; s <= u.linesAfter && !(t + s >= r.length); s++)
      m = h(
        f.buffer,
        c[t + s],
        r[t + s],
        f.position - (c[t] - c[t + s]),
        E
      ), n += e.repeat(" ", u.indent) + p((f.line + s + 1).toString(), y) + " | " + m.str + `
`;
    return n.replace(/\n$/, "");
  }
  return snippet = o, snippet;
}
var type, hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  var e = requireException(), h = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], p = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function o(u) {
    var a = {};
    return u !== null && Object.keys(u).forEach(function(c) {
      u[c].forEach(function(r) {
        a[String(r)] = c;
      });
    }), a;
  }
  function f(u, a) {
    if (a = a || {}, Object.keys(a).forEach(function(c) {
      if (h.indexOf(c) === -1)
        throw new e('Unknown option "' + c + '" is met in definition of "' + u + '" YAML type.');
    }), this.options = a, this.tag = u, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(c) {
      return c;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = o(a.styleAliases || null), p.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + u + '" YAML type.');
  }
  return type = f, type;
}
var schema, hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1;
  var e = requireException(), h = requireType();
  function p(u, a) {
    var c = [];
    return u[a].forEach(function(r) {
      var i = c.length;
      c.forEach(function(t, n) {
        t.tag === r.tag && t.kind === r.kind && t.multi === r.multi && (i = n);
      }), c[i] = r;
    }), c;
  }
  function o() {
    var u = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, a, c;
    function r(i) {
      i.multi ? (u.multi[i.kind].push(i), u.multi.fallback.push(i)) : u[i.kind][i.tag] = u.fallback[i.tag] = i;
    }
    for (a = 0, c = arguments.length; a < c; a += 1)
      arguments[a].forEach(r);
    return u;
  }
  function f(u) {
    return this.extend(u);
  }
  return f.prototype.extend = function(a) {
    var c = [], r = [];
    if (a instanceof h)
      r.push(a);
    else if (Array.isArray(a))
      r = r.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (c = c.concat(a.implicit)), a.explicit && (r = r.concat(a.explicit));
    else
      throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    c.forEach(function(t) {
      if (!(t instanceof h))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (t.loadKind && t.loadKind !== "scalar")
        throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (t.multi)
        throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), r.forEach(function(t) {
      if (!(t instanceof h))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var i = Object.create(f.prototype);
    return i.implicit = (this.implicit || []).concat(c), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = p(i, "implicit"), i.compiledExplicit = p(i, "explicit"), i.compiledTypeMap = o(i.compiledImplicit, i.compiledExplicit), i;
  }, schema = f, schema;
}
var str, hasRequiredStr;
function requireStr() {
  if (hasRequiredStr) return str;
  hasRequiredStr = 1;
  var e = requireType();
  return str = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(h) {
      return h !== null ? h : "";
    }
  }), str;
}
var seq, hasRequiredSeq;
function requireSeq() {
  if (hasRequiredSeq) return seq;
  hasRequiredSeq = 1;
  var e = requireType();
  return seq = new e("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(h) {
      return h !== null ? h : [];
    }
  }), seq;
}
var map, hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  var e = requireType();
  return map = new e("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(h) {
      return h !== null ? h : {};
    }
  }), map;
}
var failsafe, hasRequiredFailsafe;
function requireFailsafe() {
  if (hasRequiredFailsafe) return failsafe;
  hasRequiredFailsafe = 1;
  var e = requireSchema();
  return failsafe = new e({
    explicit: [
      requireStr(),
      requireSeq(),
      requireMap()
    ]
  }), failsafe;
}
var _null, hasRequired_null;
function require_null() {
  if (hasRequired_null) return _null;
  hasRequired_null = 1;
  var e = requireType();
  function h(f) {
    if (f === null) return !0;
    var u = f.length;
    return u === 1 && f === "~" || u === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function p() {
    return null;
  }
  function o(f) {
    return f === null;
  }
  return _null = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: o,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), _null;
}
var bool, hasRequiredBool;
function requireBool() {
  if (hasRequiredBool) return bool;
  hasRequiredBool = 1;
  var e = requireType();
  function h(f) {
    if (f === null) return !1;
    var u = f.length;
    return u === 4 && (f === "true" || f === "True" || f === "TRUE") || u === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function p(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function o(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return bool = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: h,
    construct: p,
    predicate: o,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool;
}
var int, hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int;
  hasRequiredInt = 1;
  var e = requireCommon(), h = requireType();
  function p(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function o(r) {
    return 48 <= r && r <= 55;
  }
  function f(r) {
    return 48 <= r && r <= 57;
  }
  function u(r) {
    if (r === null) return !1;
    var i = r.length, t = 0, n = !1, s;
    if (!i) return !1;
    if (s = r[t], (s === "-" || s === "+") && (s = r[++t]), s === "0") {
      if (t + 1 === i) return !0;
      if (s = r[++t], s === "b") {
        for (t++; t < i; t++)
          if (s = r[t], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "x") {
        for (t++; t < i; t++)
          if (s = r[t], s !== "_") {
            if (!p(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "o") {
        for (t++; t < i; t++)
          if (s = r[t], s !== "_") {
            if (!o(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
    }
    if (s === "_") return !1;
    for (; t < i; t++)
      if (s = r[t], s !== "_") {
        if (!f(r.charCodeAt(t)))
          return !1;
        n = !0;
      }
    return !(!n || s === "_");
  }
  function a(r) {
    var i = r, t = 1, n;
    if (i.indexOf("_") !== -1 && (i = i.replace(/_/g, "")), n = i[0], (n === "-" || n === "+") && (n === "-" && (t = -1), i = i.slice(1), n = i[0]), i === "0") return 0;
    if (n === "0") {
      if (i[1] === "b") return t * parseInt(i.slice(2), 2);
      if (i[1] === "x") return t * parseInt(i.slice(2), 16);
      if (i[1] === "o") return t * parseInt(i.slice(2), 8);
    }
    return t * parseInt(i, 10);
  }
  function c(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !e.isNegativeZero(r);
  }
  return int = new h("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: u,
    construct: a,
    predicate: c,
    represent: {
      binary: function(r) {
        return r >= 0 ? "0b" + r.toString(2) : "-0b" + r.toString(2).slice(1);
      },
      octal: function(r) {
        return r >= 0 ? "0o" + r.toString(8) : "-0o" + r.toString(8).slice(1);
      },
      decimal: function(r) {
        return r.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(r) {
        return r >= 0 ? "0x" + r.toString(16).toUpperCase() : "-0x" + r.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), int;
}
var float, hasRequiredFloat;
function requireFloat() {
  if (hasRequiredFloat) return float;
  hasRequiredFloat = 1;
  var e = requireCommon(), h = requireType(), p = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function o(r) {
    return !(r === null || !p.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function f(r) {
    var i, t;
    return i = r.replace(/_/g, "").toLowerCase(), t = i[0] === "-" ? -1 : 1, "+-".indexOf(i[0]) >= 0 && (i = i.slice(1)), i === ".inf" ? t === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : i === ".nan" ? NaN : t * parseFloat(i, 10);
  }
  var u = /^[-+]?[0-9]+e/;
  function a(r, i) {
    var t;
    if (isNaN(r))
      switch (i) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (i) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (i) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (e.isNegativeZero(r))
      return "-0.0";
    return t = r.toString(10), u.test(t) ? t.replace("e", ".e") : t;
  }
  function c(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || e.isNegativeZero(r));
  }
  return float = new h("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: o,
    construct: f,
    predicate: c,
    represent: a,
    defaultStyle: "lowercase"
  }), float;
}
var json, hasRequiredJson;
function requireJson() {
  return hasRequiredJson || (hasRequiredJson = 1, json = requireFailsafe().extend({
    implicit: [
      require_null(),
      requireBool(),
      requireInt(),
      requireFloat()
    ]
  })), json;
}
var core, hasRequiredCore;
function requireCore() {
  return hasRequiredCore || (hasRequiredCore = 1, core = requireJson()), core;
}
var timestamp, hasRequiredTimestamp;
function requireTimestamp() {
  if (hasRequiredTimestamp) return timestamp;
  hasRequiredTimestamp = 1;
  var e = requireType(), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), p = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function o(a) {
    return a === null ? !1 : h.exec(a) !== null || p.exec(a) !== null;
  }
  function f(a) {
    var c, r, i, t, n, s, m, y = 0, E = null, g, q, C;
    if (c = h.exec(a), c === null && (c = p.exec(a)), c === null) throw new Error("Date resolve error");
    if (r = +c[1], i = +c[2] - 1, t = +c[3], !c[4])
      return new Date(Date.UTC(r, i, t));
    if (n = +c[4], s = +c[5], m = +c[6], c[7]) {
      for (y = c[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return c[9] && (g = +c[10], q = +(c[11] || 0), E = (g * 60 + q) * 6e4, c[9] === "-" && (E = -E)), C = new Date(Date.UTC(r, i, t, n, s, m, y)), E && C.setTime(C.getTime() - E), C;
  }
  function u(a) {
    return a.toISOString();
  }
  return timestamp = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: o,
    construct: f,
    instanceOf: Date,
    represent: u
  }), timestamp;
}
var merge, hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  var e = requireType();
  function h(p) {
    return p === "<<" || p === null;
  }
  return merge = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: h
  }), merge;
}
var binary, hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary;
  hasRequiredBinary = 1;
  var e = requireType(), h = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function p(a) {
    if (a === null) return !1;
    var c, r, i = 0, t = a.length, n = h;
    for (r = 0; r < t; r++)
      if (c = n.indexOf(a.charAt(r)), !(c > 64)) {
        if (c < 0) return !1;
        i += 6;
      }
    return i % 8 === 0;
  }
  function o(a) {
    var c, r, i = a.replace(/[\r\n=]/g, ""), t = i.length, n = h, s = 0, m = [];
    for (c = 0; c < t; c++)
      c % 4 === 0 && c && (m.push(s >> 16 & 255), m.push(s >> 8 & 255), m.push(s & 255)), s = s << 6 | n.indexOf(i.charAt(c));
    return r = t % 4 * 6, r === 0 ? (m.push(s >> 16 & 255), m.push(s >> 8 & 255), m.push(s & 255)) : r === 18 ? (m.push(s >> 10 & 255), m.push(s >> 2 & 255)) : r === 12 && m.push(s >> 4 & 255), new Uint8Array(m);
  }
  function f(a) {
    var c = "", r = 0, i, t, n = a.length, s = h;
    for (i = 0; i < n; i++)
      i % 3 === 0 && i && (c += s[r >> 18 & 63], c += s[r >> 12 & 63], c += s[r >> 6 & 63], c += s[r & 63]), r = (r << 8) + a[i];
    return t = n % 3, t === 0 ? (c += s[r >> 18 & 63], c += s[r >> 12 & 63], c += s[r >> 6 & 63], c += s[r & 63]) : t === 2 ? (c += s[r >> 10 & 63], c += s[r >> 4 & 63], c += s[r << 2 & 63], c += s[64]) : t === 1 && (c += s[r >> 2 & 63], c += s[r << 4 & 63], c += s[64], c += s[64]), c;
  }
  function u(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return binary = new e("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: p,
    construct: o,
    predicate: u,
    represent: f
  }), binary;
}
var omap, hasRequiredOmap;
function requireOmap() {
  if (hasRequiredOmap) return omap;
  hasRequiredOmap = 1;
  var e = requireType(), h = Object.prototype.hasOwnProperty, p = Object.prototype.toString;
  function o(u) {
    if (u === null) return !0;
    var a = [], c, r, i, t, n, s = u;
    for (c = 0, r = s.length; c < r; c += 1) {
      if (i = s[c], n = !1, p.call(i) !== "[object Object]") return !1;
      for (t in i)
        if (h.call(i, t))
          if (!n) n = !0;
          else return !1;
      if (!n) return !1;
      if (a.indexOf(t) === -1) a.push(t);
      else return !1;
    }
    return !0;
  }
  function f(u) {
    return u !== null ? u : [];
  }
  return omap = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: o,
    construct: f
  }), omap;
}
var pairs, hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  var e = requireType(), h = Object.prototype.toString;
  function p(f) {
    if (f === null) return !0;
    var u, a, c, r, i, t = f;
    for (i = new Array(t.length), u = 0, a = t.length; u < a; u += 1) {
      if (c = t[u], h.call(c) !== "[object Object]" || (r = Object.keys(c), r.length !== 1)) return !1;
      i[u] = [r[0], c[r[0]]];
    }
    return !0;
  }
  function o(f) {
    if (f === null) return [];
    var u, a, c, r, i, t = f;
    for (i = new Array(t.length), u = 0, a = t.length; u < a; u += 1)
      c = t[u], r = Object.keys(c), i[u] = [r[0], c[r[0]]];
    return i;
  }
  return pairs = new e("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: p,
    construct: o
  }), pairs;
}
var set, hasRequiredSet;
function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  var e = requireType(), h = Object.prototype.hasOwnProperty;
  function p(f) {
    if (f === null) return !0;
    var u, a = f;
    for (u in a)
      if (h.call(a, u) && a[u] !== null)
        return !1;
    return !0;
  }
  function o(f) {
    return f !== null ? f : {};
  }
  return set = new e("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: p,
    construct: o
  }), set;
}
var _default, hasRequired_default;
function require_default() {
  return hasRequired_default || (hasRequired_default = 1, _default = requireCore().extend({
    implicit: [
      requireTimestamp(),
      requireMerge()
    ],
    explicit: [
      requireBinary(),
      requireOmap(),
      requirePairs(),
      requireSet()
    ]
  })), _default;
}
var hasRequiredLoader;
function requireLoader() {
  if (hasRequiredLoader) return loader;
  hasRequiredLoader = 1;
  var e = requireCommon(), h = requireException(), p = requireSnippet(), o = require_default(), f = Object.prototype.hasOwnProperty, u = 1, a = 2, c = 3, r = 4, i = 1, t = 2, n = 3, s = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /[\x85\u2028\u2029]/, y = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, g = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function q(d) {
    return Object.prototype.toString.call(d);
  }
  function C(d) {
    return d === 10 || d === 13;
  }
  function P(d) {
    return d === 9 || d === 32;
  }
  function $(d) {
    return d === 9 || d === 32 || d === 10 || d === 13;
  }
  function b(d) {
    return d === 44 || d === 91 || d === 93 || d === 123 || d === 125;
  }
  function I(d) {
    var ee;
    return 48 <= d && d <= 57 ? d - 48 : (ee = d | 32, 97 <= ee && ee <= 102 ? ee - 97 + 10 : -1);
  }
  function T(d) {
    return d === 120 ? 2 : d === 117 ? 4 : d === 85 ? 8 : 0;
  }
  function A(d) {
    return 48 <= d && d <= 57 ? d - 48 : -1;
  }
  function _(d) {
    return d === 48 ? "\0" : d === 97 ? "\x07" : d === 98 ? "\b" : d === 116 || d === 9 ? "	" : d === 110 ? `
` : d === 118 ? "\v" : d === 102 ? "\f" : d === 114 ? "\r" : d === 101 ? "\x1B" : d === 32 ? " " : d === 34 ? '"' : d === 47 ? "/" : d === 92 ? "\\" : d === 78 ? "" : d === 95 ? " " : d === 76 ? "\u2028" : d === 80 ? "\u2029" : "";
  }
  function z(d) {
    return d <= 65535 ? String.fromCharCode(d) : String.fromCharCode(
      (d - 65536 >> 10) + 55296,
      (d - 65536 & 1023) + 56320
    );
  }
  function J(d, ee, se) {
    ee === "__proto__" ? Object.defineProperty(d, ee, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: se
    }) : d[ee] = se;
  }
  for (var H = new Array(256), X = new Array(256), N = 0; N < 256; N++)
    H[N] = _(N) ? 1 : 0, X[N] = _(N);
  function U(d, ee) {
    this.input = d, this.filename = ee.filename || null, this.schema = ee.schema || o, this.onWarning = ee.onWarning || null, this.legacy = ee.legacy || !1, this.json = ee.json || !1, this.listener = ee.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = d.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function ne(d, ee) {
    var se = {
      name: d.filename,
      buffer: d.input.slice(0, -1),
      // omit trailing \0
      position: d.position,
      line: d.line,
      column: d.position - d.lineStart
    };
    return se.snippet = p(se), new h(ee, se);
  }
  function L(d, ee) {
    throw ne(d, ee);
  }
  function K(d, ee) {
    d.onWarning && d.onWarning.call(null, ne(d, ee));
  }
  var ue = {
    YAML: function(ee, se, l) {
      var D, B, Q;
      ee.version !== null && L(ee, "duplication of %YAML directive"), l.length !== 1 && L(ee, "YAML directive accepts exactly one argument"), D = /^([0-9]+)\.([0-9]+)$/.exec(l[0]), D === null && L(ee, "ill-formed argument of the YAML directive"), B = parseInt(D[1], 10), Q = parseInt(D[2], 10), B !== 1 && L(ee, "unacceptable YAML version of the document"), ee.version = l[0], ee.checkLineBreaks = Q < 2, Q !== 1 && Q !== 2 && K(ee, "unsupported YAML version of the document");
    },
    TAG: function(ee, se, l) {
      var D, B;
      l.length !== 2 && L(ee, "TAG directive accepts exactly two arguments"), D = l[0], B = l[1], E.test(D) || L(ee, "ill-formed tag handle (first argument) of the TAG directive"), f.call(ee.tagMap, D) && L(ee, 'there is a previously declared suffix for "' + D + '" tag handle'), g.test(B) || L(ee, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        B = decodeURIComponent(B);
      } catch {
        L(ee, "tag prefix is malformed: " + B);
      }
      ee.tagMap[D] = B;
    }
  };
  function fe(d, ee, se, l) {
    var D, B, Q, V;
    if (ee < se) {
      if (V = d.input.slice(ee, se), l)
        for (D = 0, B = V.length; D < B; D += 1)
          Q = V.charCodeAt(D), Q === 9 || 32 <= Q && Q <= 1114111 || L(d, "expected valid JSON character");
      else s.test(V) && L(d, "the stream contains non-printable characters");
      d.result += V;
    }
  }
  function ge(d, ee, se, l) {
    var D, B, Q, V;
    for (e.isObject(se) || L(d, "cannot merge mappings; the provided source object is unacceptable"), D = Object.keys(se), Q = 0, V = D.length; Q < V; Q += 1)
      B = D[Q], f.call(ee, B) || (J(ee, B, se[B]), l[B] = !0);
  }
  function de(d, ee, se, l, D, B, Q, V, w) {
    var M, Z;
    if (Array.isArray(D))
      for (D = Array.prototype.slice.call(D), M = 0, Z = D.length; M < Z; M += 1)
        Array.isArray(D[M]) && L(d, "nested arrays are not supported inside keys"), typeof D == "object" && q(D[M]) === "[object Object]" && (D[M] = "[object Object]");
    if (typeof D == "object" && q(D) === "[object Object]" && (D = "[object Object]"), D = String(D), ee === null && (ee = {}), l === "tag:yaml.org,2002:merge")
      if (Array.isArray(B))
        for (M = 0, Z = B.length; M < Z; M += 1)
          ge(d, ee, B[M], se);
      else
        ge(d, ee, B, se);
    else
      !d.json && !f.call(se, D) && f.call(ee, D) && (d.line = Q || d.line, d.lineStart = V || d.lineStart, d.position = w || d.position, L(d, "duplicated mapping key")), J(ee, D, B), delete se[D];
    return ee;
  }
  function _e(d) {
    var ee;
    ee = d.input.charCodeAt(d.position), ee === 10 ? d.position++ : ee === 13 ? (d.position++, d.input.charCodeAt(d.position) === 10 && d.position++) : L(d, "a line break is expected"), d.line += 1, d.lineStart = d.position, d.firstTabInLine = -1;
  }
  function we(d, ee, se) {
    for (var l = 0, D = d.input.charCodeAt(d.position); D !== 0; ) {
      for (; P(D); )
        D === 9 && d.firstTabInLine === -1 && (d.firstTabInLine = d.position), D = d.input.charCodeAt(++d.position);
      if (ee && D === 35)
        do
          D = d.input.charCodeAt(++d.position);
        while (D !== 10 && D !== 13 && D !== 0);
      if (C(D))
        for (_e(d), D = d.input.charCodeAt(d.position), l++, d.lineIndent = 0; D === 32; )
          d.lineIndent++, D = d.input.charCodeAt(++d.position);
      else
        break;
    }
    return se !== -1 && l !== 0 && d.lineIndent < se && K(d, "deficient indentation"), l;
  }
  function ie(d) {
    var ee = d.position, se;
    return se = d.input.charCodeAt(ee), !!((se === 45 || se === 46) && se === d.input.charCodeAt(ee + 1) && se === d.input.charCodeAt(ee + 2) && (ee += 3, se = d.input.charCodeAt(ee), se === 0 || $(se)));
  }
  function Ee(d, ee) {
    ee === 1 ? d.result += " " : ee > 1 && (d.result += e.repeat(`
`, ee - 1));
  }
  function S(d, ee, se) {
    var l, D, B, Q, V, w, M, Z, W = d.kind, v = d.result, O;
    if (O = d.input.charCodeAt(d.position), $(O) || b(O) || O === 35 || O === 38 || O === 42 || O === 33 || O === 124 || O === 62 || O === 39 || O === 34 || O === 37 || O === 64 || O === 96 || (O === 63 || O === 45) && (D = d.input.charCodeAt(d.position + 1), $(D) || se && b(D)))
      return !1;
    for (d.kind = "scalar", d.result = "", B = Q = d.position, V = !1; O !== 0; ) {
      if (O === 58) {
        if (D = d.input.charCodeAt(d.position + 1), $(D) || se && b(D))
          break;
      } else if (O === 35) {
        if (l = d.input.charCodeAt(d.position - 1), $(l))
          break;
      } else {
        if (d.position === d.lineStart && ie(d) || se && b(O))
          break;
        if (C(O))
          if (w = d.line, M = d.lineStart, Z = d.lineIndent, we(d, !1, -1), d.lineIndent >= ee) {
            V = !0, O = d.input.charCodeAt(d.position);
            continue;
          } else {
            d.position = Q, d.line = w, d.lineStart = M, d.lineIndent = Z;
            break;
          }
      }
      V && (fe(d, B, Q, !1), Ee(d, d.line - w), B = Q = d.position, V = !1), P(O) || (Q = d.position + 1), O = d.input.charCodeAt(++d.position);
    }
    return fe(d, B, Q, !1), d.result ? !0 : (d.kind = W, d.result = v, !1);
  }
  function R(d, ee) {
    var se, l, D;
    if (se = d.input.charCodeAt(d.position), se !== 39)
      return !1;
    for (d.kind = "scalar", d.result = "", d.position++, l = D = d.position; (se = d.input.charCodeAt(d.position)) !== 0; )
      if (se === 39)
        if (fe(d, l, d.position, !0), se = d.input.charCodeAt(++d.position), se === 39)
          l = d.position, d.position++, D = d.position;
        else
          return !0;
      else C(se) ? (fe(d, l, D, !0), Ee(d, we(d, !1, ee)), l = D = d.position) : d.position === d.lineStart && ie(d) ? L(d, "unexpected end of the document within a single quoted scalar") : (d.position++, D = d.position);
    L(d, "unexpected end of the stream within a single quoted scalar");
  }
  function te(d, ee) {
    var se, l, D, B, Q, V;
    if (V = d.input.charCodeAt(d.position), V !== 34)
      return !1;
    for (d.kind = "scalar", d.result = "", d.position++, se = l = d.position; (V = d.input.charCodeAt(d.position)) !== 0; ) {
      if (V === 34)
        return fe(d, se, d.position, !0), d.position++, !0;
      if (V === 92) {
        if (fe(d, se, d.position, !0), V = d.input.charCodeAt(++d.position), C(V))
          we(d, !1, ee);
        else if (V < 256 && H[V])
          d.result += X[V], d.position++;
        else if ((Q = T(V)) > 0) {
          for (D = Q, B = 0; D > 0; D--)
            V = d.input.charCodeAt(++d.position), (Q = I(V)) >= 0 ? B = (B << 4) + Q : L(d, "expected hexadecimal character");
          d.result += z(B), d.position++;
        } else
          L(d, "unknown escape sequence");
        se = l = d.position;
      } else C(V) ? (fe(d, se, l, !0), Ee(d, we(d, !1, ee)), se = l = d.position) : d.position === d.lineStart && ie(d) ? L(d, "unexpected end of the document within a double quoted scalar") : (d.position++, l = d.position);
    }
    L(d, "unexpected end of the stream within a double quoted scalar");
  }
  function k(d, ee) {
    var se = !0, l, D, B, Q = d.tag, V, w = d.anchor, M, Z, W, v, O, F = /* @__PURE__ */ Object.create(null), G, j, ae, oe;
    if (oe = d.input.charCodeAt(d.position), oe === 91)
      Z = 93, O = !1, V = [];
    else if (oe === 123)
      Z = 125, O = !0, V = {};
    else
      return !1;
    for (d.anchor !== null && (d.anchorMap[d.anchor] = V), oe = d.input.charCodeAt(++d.position); oe !== 0; ) {
      if (we(d, !0, ee), oe = d.input.charCodeAt(d.position), oe === Z)
        return d.position++, d.tag = Q, d.anchor = w, d.kind = O ? "mapping" : "sequence", d.result = V, !0;
      se ? oe === 44 && L(d, "expected the node content, but found ','") : L(d, "missed comma between flow collection entries"), j = G = ae = null, W = v = !1, oe === 63 && (M = d.input.charCodeAt(d.position + 1), $(M) && (W = v = !0, d.position++, we(d, !0, ee))), l = d.line, D = d.lineStart, B = d.position, Ce(d, ee, u, !1, !0), j = d.tag, G = d.result, we(d, !0, ee), oe = d.input.charCodeAt(d.position), (v || d.line === l) && oe === 58 && (W = !0, oe = d.input.charCodeAt(++d.position), we(d, !0, ee), Ce(d, ee, u, !1, !0), ae = d.result), O ? de(d, V, F, j, G, ae, l, D, B) : W ? V.push(de(d, null, F, j, G, ae, l, D, B)) : V.push(G), we(d, !0, ee), oe = d.input.charCodeAt(d.position), oe === 44 ? (se = !0, oe = d.input.charCodeAt(++d.position)) : se = !1;
    }
    L(d, "unexpected end of the stream within a flow collection");
  }
  function pe(d, ee) {
    var se, l, D = i, B = !1, Q = !1, V = ee, w = 0, M = !1, Z, W;
    if (W = d.input.charCodeAt(d.position), W === 124)
      l = !1;
    else if (W === 62)
      l = !0;
    else
      return !1;
    for (d.kind = "scalar", d.result = ""; W !== 0; )
      if (W = d.input.charCodeAt(++d.position), W === 43 || W === 45)
        i === D ? D = W === 43 ? n : t : L(d, "repeat of a chomping mode identifier");
      else if ((Z = A(W)) >= 0)
        Z === 0 ? L(d, "bad explicit indentation width of a block scalar; it cannot be less than one") : Q ? L(d, "repeat of an indentation width identifier") : (V = ee + Z - 1, Q = !0);
      else
        break;
    if (P(W)) {
      do
        W = d.input.charCodeAt(++d.position);
      while (P(W));
      if (W === 35)
        do
          W = d.input.charCodeAt(++d.position);
        while (!C(W) && W !== 0);
    }
    for (; W !== 0; ) {
      for (_e(d), d.lineIndent = 0, W = d.input.charCodeAt(d.position); (!Q || d.lineIndent < V) && W === 32; )
        d.lineIndent++, W = d.input.charCodeAt(++d.position);
      if (!Q && d.lineIndent > V && (V = d.lineIndent), C(W)) {
        w++;
        continue;
      }
      if (d.lineIndent < V) {
        D === n ? d.result += e.repeat(`
`, B ? 1 + w : w) : D === i && B && (d.result += `
`);
        break;
      }
      for (l ? P(W) ? (M = !0, d.result += e.repeat(`
`, B ? 1 + w : w)) : M ? (M = !1, d.result += e.repeat(`
`, w + 1)) : w === 0 ? B && (d.result += " ") : d.result += e.repeat(`
`, w) : d.result += e.repeat(`
`, B ? 1 + w : w), B = !0, Q = !0, w = 0, se = d.position; !C(W) && W !== 0; )
        W = d.input.charCodeAt(++d.position);
      fe(d, se, d.position, !1);
    }
    return !0;
  }
  function ye(d, ee) {
    var se, l = d.tag, D = d.anchor, B = [], Q, V = !1, w;
    if (d.firstTabInLine !== -1) return !1;
    for (d.anchor !== null && (d.anchorMap[d.anchor] = B), w = d.input.charCodeAt(d.position); w !== 0 && (d.firstTabInLine !== -1 && (d.position = d.firstTabInLine, L(d, "tab characters must not be used in indentation")), !(w !== 45 || (Q = d.input.charCodeAt(d.position + 1), !$(Q)))); ) {
      if (V = !0, d.position++, we(d, !0, -1) && d.lineIndent <= ee) {
        B.push(null), w = d.input.charCodeAt(d.position);
        continue;
      }
      if (se = d.line, Ce(d, ee, c, !1, !0), B.push(d.result), we(d, !0, -1), w = d.input.charCodeAt(d.position), (d.line === se || d.lineIndent > ee) && w !== 0)
        L(d, "bad indentation of a sequence entry");
      else if (d.lineIndent < ee)
        break;
    }
    return V ? (d.tag = l, d.anchor = D, d.kind = "sequence", d.result = B, !0) : !1;
  }
  function ve(d, ee, se) {
    var l, D, B, Q, V, w, M = d.tag, Z = d.anchor, W = {}, v = /* @__PURE__ */ Object.create(null), O = null, F = null, G = null, j = !1, ae = !1, oe;
    if (d.firstTabInLine !== -1) return !1;
    for (d.anchor !== null && (d.anchorMap[d.anchor] = W), oe = d.input.charCodeAt(d.position); oe !== 0; ) {
      if (!j && d.firstTabInLine !== -1 && (d.position = d.firstTabInLine, L(d, "tab characters must not be used in indentation")), l = d.input.charCodeAt(d.position + 1), B = d.line, (oe === 63 || oe === 58) && $(l))
        oe === 63 ? (j && (de(d, W, v, O, F, null, Q, V, w), O = F = G = null), ae = !0, j = !0, D = !0) : j ? (j = !1, D = !0) : L(d, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), d.position += 1, oe = l;
      else {
        if (Q = d.line, V = d.lineStart, w = d.position, !Ce(d, se, a, !1, !0))
          break;
        if (d.line === B) {
          for (oe = d.input.charCodeAt(d.position); P(oe); )
            oe = d.input.charCodeAt(++d.position);
          if (oe === 58)
            oe = d.input.charCodeAt(++d.position), $(oe) || L(d, "a whitespace character is expected after the key-value separator within a block mapping"), j && (de(d, W, v, O, F, null, Q, V, w), O = F = G = null), ae = !0, j = !1, D = !1, O = d.tag, F = d.result;
          else if (ae)
            L(d, "can not read an implicit mapping pair; a colon is missed");
          else
            return d.tag = M, d.anchor = Z, !0;
        } else if (ae)
          L(d, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return d.tag = M, d.anchor = Z, !0;
      }
      if ((d.line === B || d.lineIndent > ee) && (j && (Q = d.line, V = d.lineStart, w = d.position), Ce(d, ee, r, !0, D) && (j ? F = d.result : G = d.result), j || (de(d, W, v, O, F, G, Q, V, w), O = F = G = null), we(d, !0, -1), oe = d.input.charCodeAt(d.position)), (d.line === B || d.lineIndent > ee) && oe !== 0)
        L(d, "bad indentation of a mapping entry");
      else if (d.lineIndent < ee)
        break;
    }
    return j && de(d, W, v, O, F, null, Q, V, w), ae && (d.tag = M, d.anchor = Z, d.kind = "mapping", d.result = W), ae;
  }
  function qe(d) {
    var ee, se = !1, l = !1, D, B, Q;
    if (Q = d.input.charCodeAt(d.position), Q !== 33) return !1;
    if (d.tag !== null && L(d, "duplication of a tag property"), Q = d.input.charCodeAt(++d.position), Q === 60 ? (se = !0, Q = d.input.charCodeAt(++d.position)) : Q === 33 ? (l = !0, D = "!!", Q = d.input.charCodeAt(++d.position)) : D = "!", ee = d.position, se) {
      do
        Q = d.input.charCodeAt(++d.position);
      while (Q !== 0 && Q !== 62);
      d.position < d.length ? (B = d.input.slice(ee, d.position), Q = d.input.charCodeAt(++d.position)) : L(d, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Q !== 0 && !$(Q); )
        Q === 33 && (l ? L(d, "tag suffix cannot contain exclamation marks") : (D = d.input.slice(ee - 1, d.position + 1), E.test(D) || L(d, "named tag handle cannot contain such characters"), l = !0, ee = d.position + 1)), Q = d.input.charCodeAt(++d.position);
      B = d.input.slice(ee, d.position), y.test(B) && L(d, "tag suffix cannot contain flow indicator characters");
    }
    B && !g.test(B) && L(d, "tag name cannot contain such characters: " + B);
    try {
      B = decodeURIComponent(B);
    } catch {
      L(d, "tag name is malformed: " + B);
    }
    return se ? d.tag = B : f.call(d.tagMap, D) ? d.tag = d.tagMap[D] + B : D === "!" ? d.tag = "!" + B : D === "!!" ? d.tag = "tag:yaml.org,2002:" + B : L(d, 'undeclared tag handle "' + D + '"'), !0;
  }
  function Re(d) {
    var ee, se;
    if (se = d.input.charCodeAt(d.position), se !== 38) return !1;
    for (d.anchor !== null && L(d, "duplication of an anchor property"), se = d.input.charCodeAt(++d.position), ee = d.position; se !== 0 && !$(se) && !b(se); )
      se = d.input.charCodeAt(++d.position);
    return d.position === ee && L(d, "name of an anchor node must contain at least one character"), d.anchor = d.input.slice(ee, d.position), !0;
  }
  function Ie(d) {
    var ee, se, l;
    if (l = d.input.charCodeAt(d.position), l !== 42) return !1;
    for (l = d.input.charCodeAt(++d.position), ee = d.position; l !== 0 && !$(l) && !b(l); )
      l = d.input.charCodeAt(++d.position);
    return d.position === ee && L(d, "name of an alias node must contain at least one character"), se = d.input.slice(ee, d.position), f.call(d.anchorMap, se) || L(d, 'unidentified alias "' + se + '"'), d.result = d.anchorMap[se], we(d, !0, -1), !0;
  }
  function Ce(d, ee, se, l, D) {
    var B, Q, V, w = 1, M = !1, Z = !1, W, v, O, F, G, j;
    if (d.listener !== null && d.listener("open", d), d.tag = null, d.anchor = null, d.kind = null, d.result = null, B = Q = V = r === se || c === se, l && we(d, !0, -1) && (M = !0, d.lineIndent > ee ? w = 1 : d.lineIndent === ee ? w = 0 : d.lineIndent < ee && (w = -1)), w === 1)
      for (; qe(d) || Re(d); )
        we(d, !0, -1) ? (M = !0, V = B, d.lineIndent > ee ? w = 1 : d.lineIndent === ee ? w = 0 : d.lineIndent < ee && (w = -1)) : V = !1;
    if (V && (V = M || D), (w === 1 || r === se) && (u === se || a === se ? G = ee : G = ee + 1, j = d.position - d.lineStart, w === 1 ? V && (ye(d, j) || ve(d, j, G)) || k(d, G) ? Z = !0 : (Q && pe(d, G) || R(d, G) || te(d, G) ? Z = !0 : Ie(d) ? (Z = !0, (d.tag !== null || d.anchor !== null) && L(d, "alias node should not have any properties")) : S(d, G, u === se) && (Z = !0, d.tag === null && (d.tag = "?")), d.anchor !== null && (d.anchorMap[d.anchor] = d.result)) : w === 0 && (Z = V && ye(d, j))), d.tag === null)
      d.anchor !== null && (d.anchorMap[d.anchor] = d.result);
    else if (d.tag === "?") {
      for (d.result !== null && d.kind !== "scalar" && L(d, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + d.kind + '"'), W = 0, v = d.implicitTypes.length; W < v; W += 1)
        if (F = d.implicitTypes[W], F.resolve(d.result)) {
          d.result = F.construct(d.result), d.tag = F.tag, d.anchor !== null && (d.anchorMap[d.anchor] = d.result);
          break;
        }
    } else if (d.tag !== "!") {
      if (f.call(d.typeMap[d.kind || "fallback"], d.tag))
        F = d.typeMap[d.kind || "fallback"][d.tag];
      else
        for (F = null, O = d.typeMap.multi[d.kind || "fallback"], W = 0, v = O.length; W < v; W += 1)
          if (d.tag.slice(0, O[W].tag.length) === O[W].tag) {
            F = O[W];
            break;
          }
      F || L(d, "unknown tag !<" + d.tag + ">"), d.result !== null && F.kind !== d.kind && L(d, "unacceptable node kind for !<" + d.tag + '> tag; it should be "' + F.kind + '", not "' + d.kind + '"'), F.resolve(d.result, d.tag) ? (d.result = F.construct(d.result, d.tag), d.anchor !== null && (d.anchorMap[d.anchor] = d.result)) : L(d, "cannot resolve a node with !<" + d.tag + "> explicit tag");
    }
    return d.listener !== null && d.listener("close", d), d.tag !== null || d.anchor !== null || Z;
  }
  function xe(d) {
    var ee = d.position, se, l, D, B = !1, Q;
    for (d.version = null, d.checkLineBreaks = d.legacy, d.tagMap = /* @__PURE__ */ Object.create(null), d.anchorMap = /* @__PURE__ */ Object.create(null); (Q = d.input.charCodeAt(d.position)) !== 0 && (we(d, !0, -1), Q = d.input.charCodeAt(d.position), !(d.lineIndent > 0 || Q !== 37)); ) {
      for (B = !0, Q = d.input.charCodeAt(++d.position), se = d.position; Q !== 0 && !$(Q); )
        Q = d.input.charCodeAt(++d.position);
      for (l = d.input.slice(se, d.position), D = [], l.length < 1 && L(d, "directive name must not be less than one character in length"); Q !== 0; ) {
        for (; P(Q); )
          Q = d.input.charCodeAt(++d.position);
        if (Q === 35) {
          do
            Q = d.input.charCodeAt(++d.position);
          while (Q !== 0 && !C(Q));
          break;
        }
        if (C(Q)) break;
        for (se = d.position; Q !== 0 && !$(Q); )
          Q = d.input.charCodeAt(++d.position);
        D.push(d.input.slice(se, d.position));
      }
      Q !== 0 && _e(d), f.call(ue, l) ? ue[l](d, l, D) : K(d, 'unknown document directive "' + l + '"');
    }
    if (we(d, !0, -1), d.lineIndent === 0 && d.input.charCodeAt(d.position) === 45 && d.input.charCodeAt(d.position + 1) === 45 && d.input.charCodeAt(d.position + 2) === 45 ? (d.position += 3, we(d, !0, -1)) : B && L(d, "directives end mark is expected"), Ce(d, d.lineIndent - 1, r, !1, !0), we(d, !0, -1), d.checkLineBreaks && m.test(d.input.slice(ee, d.position)) && K(d, "non-ASCII line breaks are interpreted as content"), d.documents.push(d.result), d.position === d.lineStart && ie(d)) {
      d.input.charCodeAt(d.position) === 46 && (d.position += 3, we(d, !0, -1));
      return;
    }
    if (d.position < d.length - 1)
      L(d, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Be(d, ee) {
    d = String(d), ee = ee || {}, d.length !== 0 && (d.charCodeAt(d.length - 1) !== 10 && d.charCodeAt(d.length - 1) !== 13 && (d += `
`), d.charCodeAt(0) === 65279 && (d = d.slice(1)));
    var se = new U(d, ee), l = d.indexOf("\0");
    for (l !== -1 && (se.position = l, L(se, "null byte is not allowed in input")), se.input += "\0"; se.input.charCodeAt(se.position) === 32; )
      se.lineIndent += 1, se.position += 1;
    for (; se.position < se.length - 1; )
      xe(se);
    return se.documents;
  }
  function ke(d, ee, se) {
    ee !== null && typeof ee == "object" && typeof se > "u" && (se = ee, ee = null);
    var l = Be(d, se);
    if (typeof ee != "function")
      return l;
    for (var D = 0, B = l.length; D < B; D += 1)
      ee(l[D]);
  }
  function Ue(d, ee) {
    var se = Be(d, ee);
    if (se.length !== 0) {
      if (se.length === 1)
        return se[0];
      throw new h("expected a single document in the stream, but found more");
    }
  }
  return loader.loadAll = ke, loader.load = Ue, loader;
}
var dumper = {}, hasRequiredDumper;
function requireDumper() {
  if (hasRequiredDumper) return dumper;
  hasRequiredDumper = 1;
  var e = requireCommon(), h = requireException(), p = require_default(), o = Object.prototype.toString, f = Object.prototype.hasOwnProperty, u = 65279, a = 9, c = 10, r = 13, i = 32, t = 33, n = 34, s = 35, m = 37, y = 38, E = 39, g = 42, q = 44, C = 45, P = 58, $ = 61, b = 62, I = 63, T = 64, A = 91, _ = 93, z = 96, J = 123, H = 124, X = 125, N = {};
  N[0] = "\\0", N[7] = "\\a", N[8] = "\\b", N[9] = "\\t", N[10] = "\\n", N[11] = "\\v", N[12] = "\\f", N[13] = "\\r", N[27] = "\\e", N[34] = '\\"', N[92] = "\\\\", N[133] = "\\N", N[160] = "\\_", N[8232] = "\\L", N[8233] = "\\P";
  var U = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], ne = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function L(v, O) {
    var F, G, j, ae, oe, le, he;
    if (O === null) return {};
    for (F = {}, G = Object.keys(O), j = 0, ae = G.length; j < ae; j += 1)
      oe = G[j], le = String(O[oe]), oe.slice(0, 2) === "!!" && (oe = "tag:yaml.org,2002:" + oe.slice(2)), he = v.compiledTypeMap.fallback[oe], he && f.call(he.styleAliases, le) && (le = he.styleAliases[le]), F[oe] = le;
    return F;
  }
  function K(v) {
    var O, F, G;
    if (O = v.toString(16).toUpperCase(), v <= 255)
      F = "x", G = 2;
    else if (v <= 65535)
      F = "u", G = 4;
    else if (v <= 4294967295)
      F = "U", G = 8;
    else
      throw new h("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + F + e.repeat("0", G - O.length) + O;
  }
  var ue = 1, fe = 2;
  function ge(v) {
    this.schema = v.schema || p, this.indent = Math.max(1, v.indent || 2), this.noArrayIndent = v.noArrayIndent || !1, this.skipInvalid = v.skipInvalid || !1, this.flowLevel = e.isNothing(v.flowLevel) ? -1 : v.flowLevel, this.styleMap = L(this.schema, v.styles || null), this.sortKeys = v.sortKeys || !1, this.lineWidth = v.lineWidth || 80, this.noRefs = v.noRefs || !1, this.noCompatMode = v.noCompatMode || !1, this.condenseFlow = v.condenseFlow || !1, this.quotingType = v.quotingType === '"' ? fe : ue, this.forceQuotes = v.forceQuotes || !1, this.replacer = typeof v.replacer == "function" ? v.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function de(v, O) {
    for (var F = e.repeat(" ", O), G = 0, j = -1, ae = "", oe, le = v.length; G < le; )
      j = v.indexOf(`
`, G), j === -1 ? (oe = v.slice(G), G = le) : (oe = v.slice(G, j + 1), G = j + 1), oe.length && oe !== `
` && (ae += F), ae += oe;
    return ae;
  }
  function _e(v, O) {
    return `
` + e.repeat(" ", v.indent * O);
  }
  function we(v, O) {
    var F, G, j;
    for (F = 0, G = v.implicitTypes.length; F < G; F += 1)
      if (j = v.implicitTypes[F], j.resolve(O))
        return !0;
    return !1;
  }
  function ie(v) {
    return v === i || v === a;
  }
  function Ee(v) {
    return 32 <= v && v <= 126 || 161 <= v && v <= 55295 && v !== 8232 && v !== 8233 || 57344 <= v && v <= 65533 && v !== u || 65536 <= v && v <= 1114111;
  }
  function S(v) {
    return Ee(v) && v !== u && v !== r && v !== c;
  }
  function R(v, O, F) {
    var G = S(v), j = G && !ie(v);
    return (
      // ns-plain-safe
      (F ? (
        // c = flow-in
        G
      ) : G && v !== q && v !== A && v !== _ && v !== J && v !== X) && v !== s && !(O === P && !j) || S(O) && !ie(O) && v === s || O === P && j
    );
  }
  function te(v) {
    return Ee(v) && v !== u && !ie(v) && v !== C && v !== I && v !== P && v !== q && v !== A && v !== _ && v !== J && v !== X && v !== s && v !== y && v !== g && v !== t && v !== H && v !== $ && v !== b && v !== E && v !== n && v !== m && v !== T && v !== z;
  }
  function k(v) {
    return !ie(v) && v !== P;
  }
  function pe(v, O) {
    var F = v.charCodeAt(O), G;
    return F >= 55296 && F <= 56319 && O + 1 < v.length && (G = v.charCodeAt(O + 1), G >= 56320 && G <= 57343) ? (F - 55296) * 1024 + G - 56320 + 65536 : F;
  }
  function ye(v) {
    var O = /^\n* /;
    return O.test(v);
  }
  var ve = 1, qe = 2, Re = 3, Ie = 4, Ce = 5;
  function xe(v, O, F, G, j, ae, oe, le) {
    var he, Se = 0, Te = null, Oe = !1, be = !1, tr = G !== -1, Ge = -1, Xe = te(pe(v, 0)) && k(pe(v, v.length - 1));
    if (O || oe)
      for (he = 0; he < v.length; Se >= 65536 ? he += 2 : he++) {
        if (Se = pe(v, he), !Ee(Se))
          return Ce;
        Xe = Xe && R(Se, Te, le), Te = Se;
      }
    else {
      for (he = 0; he < v.length; Se >= 65536 ? he += 2 : he++) {
        if (Se = pe(v, he), Se === c)
          Oe = !0, tr && (be = be || // Foldable line = too long, and not more-indented.
          he - Ge - 1 > G && v[Ge + 1] !== " ", Ge = he);
        else if (!Ee(Se))
          return Ce;
        Xe = Xe && R(Se, Te, le), Te = Se;
      }
      be = be || tr && he - Ge - 1 > G && v[Ge + 1] !== " ";
    }
    return !Oe && !be ? Xe && !oe && !j(v) ? ve : ae === fe ? Ce : qe : F > 9 && ye(v) ? Ce : oe ? ae === fe ? Ce : qe : be ? Ie : Re;
  }
  function Be(v, O, F, G, j) {
    v.dump = (function() {
      if (O.length === 0)
        return v.quotingType === fe ? '""' : "''";
      if (!v.noCompatMode && (U.indexOf(O) !== -1 || ne.test(O)))
        return v.quotingType === fe ? '"' + O + '"' : "'" + O + "'";
      var ae = v.indent * Math.max(1, F), oe = v.lineWidth === -1 ? -1 : Math.max(Math.min(v.lineWidth, 40), v.lineWidth - ae), le = G || v.flowLevel > -1 && F >= v.flowLevel;
      function he(Se) {
        return we(v, Se);
      }
      switch (xe(
        O,
        le,
        v.indent,
        oe,
        he,
        v.quotingType,
        v.forceQuotes && !G,
        j
      )) {
        case ve:
          return O;
        case qe:
          return "'" + O.replace(/'/g, "''") + "'";
        case Re:
          return "|" + ke(O, v.indent) + Ue(de(O, ae));
        case Ie:
          return ">" + ke(O, v.indent) + Ue(de(d(O, oe), ae));
        case Ce:
          return '"' + se(O) + '"';
        default:
          throw new h("impossible error: invalid scalar style");
      }
    })();
  }
  function ke(v, O) {
    var F = ye(v) ? String(O) : "", G = v[v.length - 1] === `
`, j = G && (v[v.length - 2] === `
` || v === `
`), ae = j ? "+" : G ? "" : "-";
    return F + ae + `
`;
  }
  function Ue(v) {
    return v[v.length - 1] === `
` ? v.slice(0, -1) : v;
  }
  function d(v, O) {
    for (var F = /(\n+)([^\n]*)/g, G = (function() {
      var Se = v.indexOf(`
`);
      return Se = Se !== -1 ? Se : v.length, F.lastIndex = Se, ee(v.slice(0, Se), O);
    })(), j = v[0] === `
` || v[0] === " ", ae, oe; oe = F.exec(v); ) {
      var le = oe[1], he = oe[2];
      ae = he[0] === " ", G += le + (!j && !ae && he !== "" ? `
` : "") + ee(he, O), j = ae;
    }
    return G;
  }
  function ee(v, O) {
    if (v === "" || v[0] === " ") return v;
    for (var F = / [^ ]/g, G, j = 0, ae, oe = 0, le = 0, he = ""; G = F.exec(v); )
      le = G.index, le - j > O && (ae = oe > j ? oe : le, he += `
` + v.slice(j, ae), j = ae + 1), oe = le;
    return he += `
`, v.length - j > O && oe > j ? he += v.slice(j, oe) + `
` + v.slice(oe + 1) : he += v.slice(j), he.slice(1);
  }
  function se(v) {
    for (var O = "", F = 0, G, j = 0; j < v.length; F >= 65536 ? j += 2 : j++)
      F = pe(v, j), G = N[F], !G && Ee(F) ? (O += v[j], F >= 65536 && (O += v[j + 1])) : O += G || K(F);
    return O;
  }
  function l(v, O, F) {
    var G = "", j = v.tag, ae, oe, le;
    for (ae = 0, oe = F.length; ae < oe; ae += 1)
      le = F[ae], v.replacer && (le = v.replacer.call(F, String(ae), le)), (w(v, O, le, !1, !1) || typeof le > "u" && w(v, O, null, !1, !1)) && (G !== "" && (G += "," + (v.condenseFlow ? "" : " ")), G += v.dump);
    v.tag = j, v.dump = "[" + G + "]";
  }
  function D(v, O, F, G) {
    var j = "", ae = v.tag, oe, le, he;
    for (oe = 0, le = F.length; oe < le; oe += 1)
      he = F[oe], v.replacer && (he = v.replacer.call(F, String(oe), he)), (w(v, O + 1, he, !0, !0, !1, !0) || typeof he > "u" && w(v, O + 1, null, !0, !0, !1, !0)) && ((!G || j !== "") && (j += _e(v, O)), v.dump && c === v.dump.charCodeAt(0) ? j += "-" : j += "- ", j += v.dump);
    v.tag = ae, v.dump = j || "[]";
  }
  function B(v, O, F) {
    var G = "", j = v.tag, ae = Object.keys(F), oe, le, he, Se, Te;
    for (oe = 0, le = ae.length; oe < le; oe += 1)
      Te = "", G !== "" && (Te += ", "), v.condenseFlow && (Te += '"'), he = ae[oe], Se = F[he], v.replacer && (Se = v.replacer.call(F, he, Se)), w(v, O, he, !1, !1) && (v.dump.length > 1024 && (Te += "? "), Te += v.dump + (v.condenseFlow ? '"' : "") + ":" + (v.condenseFlow ? "" : " "), w(v, O, Se, !1, !1) && (Te += v.dump, G += Te));
    v.tag = j, v.dump = "{" + G + "}";
  }
  function Q(v, O, F, G) {
    var j = "", ae = v.tag, oe = Object.keys(F), le, he, Se, Te, Oe, be;
    if (v.sortKeys === !0)
      oe.sort();
    else if (typeof v.sortKeys == "function")
      oe.sort(v.sortKeys);
    else if (v.sortKeys)
      throw new h("sortKeys must be a boolean or a function");
    for (le = 0, he = oe.length; le < he; le += 1)
      be = "", (!G || j !== "") && (be += _e(v, O)), Se = oe[le], Te = F[Se], v.replacer && (Te = v.replacer.call(F, Se, Te)), w(v, O + 1, Se, !0, !0, !0) && (Oe = v.tag !== null && v.tag !== "?" || v.dump && v.dump.length > 1024, Oe && (v.dump && c === v.dump.charCodeAt(0) ? be += "?" : be += "? "), be += v.dump, Oe && (be += _e(v, O)), w(v, O + 1, Te, !0, Oe) && (v.dump && c === v.dump.charCodeAt(0) ? be += ":" : be += ": ", be += v.dump, j += be));
    v.tag = ae, v.dump = j || "{}";
  }
  function V(v, O, F) {
    var G, j, ae, oe, le, he;
    for (j = F ? v.explicitTypes : v.implicitTypes, ae = 0, oe = j.length; ae < oe; ae += 1)
      if (le = j[ae], (le.instanceOf || le.predicate) && (!le.instanceOf || typeof O == "object" && O instanceof le.instanceOf) && (!le.predicate || le.predicate(O))) {
        if (F ? le.multi && le.representName ? v.tag = le.representName(O) : v.tag = le.tag : v.tag = "?", le.represent) {
          if (he = v.styleMap[le.tag] || le.defaultStyle, o.call(le.represent) === "[object Function]")
            G = le.represent(O, he);
          else if (f.call(le.represent, he))
            G = le.represent[he](O, he);
          else
            throw new h("!<" + le.tag + '> tag resolver accepts not "' + he + '" style');
          v.dump = G;
        }
        return !0;
      }
    return !1;
  }
  function w(v, O, F, G, j, ae, oe) {
    v.tag = null, v.dump = F, V(v, F, !1) || V(v, F, !0);
    var le = o.call(v.dump), he = G, Se;
    G && (G = v.flowLevel < 0 || v.flowLevel > O);
    var Te = le === "[object Object]" || le === "[object Array]", Oe, be;
    if (Te && (Oe = v.duplicates.indexOf(F), be = Oe !== -1), (v.tag !== null && v.tag !== "?" || be || v.indent !== 2 && O > 0) && (j = !1), be && v.usedDuplicates[Oe])
      v.dump = "*ref_" + Oe;
    else {
      if (Te && be && !v.usedDuplicates[Oe] && (v.usedDuplicates[Oe] = !0), le === "[object Object]")
        G && Object.keys(v.dump).length !== 0 ? (Q(v, O, v.dump, j), be && (v.dump = "&ref_" + Oe + v.dump)) : (B(v, O, v.dump), be && (v.dump = "&ref_" + Oe + " " + v.dump));
      else if (le === "[object Array]")
        G && v.dump.length !== 0 ? (v.noArrayIndent && !oe && O > 0 ? D(v, O - 1, v.dump, j) : D(v, O, v.dump, j), be && (v.dump = "&ref_" + Oe + v.dump)) : (l(v, O, v.dump), be && (v.dump = "&ref_" + Oe + " " + v.dump));
      else if (le === "[object String]")
        v.tag !== "?" && Be(v, v.dump, O, ae, he);
      else {
        if (le === "[object Undefined]")
          return !1;
        if (v.skipInvalid) return !1;
        throw new h("unacceptable kind of an object to dump " + le);
      }
      v.tag !== null && v.tag !== "?" && (Se = encodeURI(
        v.tag[0] === "!" ? v.tag.slice(1) : v.tag
      ).replace(/!/g, "%21"), v.tag[0] === "!" ? Se = "!" + Se : Se.slice(0, 18) === "tag:yaml.org,2002:" ? Se = "!!" + Se.slice(18) : Se = "!<" + Se + ">", v.dump = Se + " " + v.dump);
    }
    return !0;
  }
  function M(v, O) {
    var F = [], G = [], j, ae;
    for (Z(v, F, G), j = 0, ae = G.length; j < ae; j += 1)
      O.duplicates.push(F[G[j]]);
    O.usedDuplicates = new Array(ae);
  }
  function Z(v, O, F) {
    var G, j, ae;
    if (v !== null && typeof v == "object")
      if (j = O.indexOf(v), j !== -1)
        F.indexOf(j) === -1 && F.push(j);
      else if (O.push(v), Array.isArray(v))
        for (j = 0, ae = v.length; j < ae; j += 1)
          Z(v[j], O, F);
      else
        for (G = Object.keys(v), j = 0, ae = G.length; j < ae; j += 1)
          Z(v[G[j]], O, F);
  }
  function W(v, O) {
    O = O || {};
    var F = new ge(O);
    F.noRefs || M(v, F);
    var G = v;
    return F.replacer && (G = F.replacer.call({ "": G }, "", G)), w(F, 0, G, !0, !0) ? F.dump + `
` : "";
  }
  return dumper.dump = W, dumper;
}
var hasRequiredJsYaml;
function requireJsYaml() {
  if (hasRequiredJsYaml) return jsYaml;
  hasRequiredJsYaml = 1;
  var e = requireLoader(), h = requireDumper();
  function p(o, f) {
    return function() {
      throw new Error("Function yaml." + o + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return jsYaml.Type = requireType(), jsYaml.Schema = requireSchema(), jsYaml.FAILSAFE_SCHEMA = requireFailsafe(), jsYaml.JSON_SCHEMA = requireJson(), jsYaml.CORE_SCHEMA = requireCore(), jsYaml.DEFAULT_SCHEMA = require_default(), jsYaml.load = e.load, jsYaml.loadAll = e.loadAll, jsYaml.dump = h.dump, jsYaml.YAMLException = requireException(), jsYaml.types = {
    binary: requireBinary(),
    float: requireFloat(),
    map: requireMap(),
    null: require_null(),
    pairs: requirePairs(),
    set: requireSet(),
    timestamp: requireTimestamp(),
    bool: requireBool(),
    int: requireInt(),
    merge: requireMerge(),
    omap: requireOmap(),
    seq: requireSeq(),
    str: requireStr()
  }, jsYaml.safeLoad = p("safeLoad", "load"), jsYaml.safeLoadAll = p("safeLoadAll", "loadAll"), jsYaml.safeDump = p("safeDump", "dump"), jsYaml;
}
var main = {}, hasRequiredMain$1;
function requireMain$1() {
  if (hasRequiredMain$1) return main;
  hasRequiredMain$1 = 1, Object.defineProperty(main, "__esModule", { value: !0 }), main.Lazy = void 0;
  class e {
    constructor(p) {
      this._value = null, this.creator = p;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const p = this.creator();
      return this.value = p, p;
    }
    set value(p) {
      this._value = p, this.creator = null;
    }
  }
  return main.Lazy = e, main;
}
var re = { exports: {} }, constants, hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const e = "2.0.0", h = 256, p = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, o = 16, f = h - 6;
  return constants = {
    MAX_LENGTH: h,
    MAX_SAFE_COMPONENT_LENGTH: o,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: p,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, constants;
}
var debug_1, hasRequiredDebug;
function requireDebug() {
  return hasRequiredDebug || (hasRequiredDebug = 1, debug_1 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...h) => console.error("SEMVER", ...h) : () => {
  }), debug_1;
}
var hasRequiredRe;
function requireRe() {
  return hasRequiredRe || (hasRequiredRe = 1, (function(e, h) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: p,
      MAX_SAFE_BUILD_LENGTH: o,
      MAX_LENGTH: f
    } = requireConstants(), u = requireDebug();
    h = e.exports = {};
    const a = h.re = [], c = h.safeRe = [], r = h.src = [], i = h.safeSrc = [], t = h.t = {};
    let n = 0;
    const s = "[a-zA-Z0-9-]", m = [
      ["\\s", 1],
      ["\\d", f],
      [s, o]
    ], y = (g) => {
      for (const [q, C] of m)
        g = g.split(`${q}*`).join(`${q}{0,${C}}`).split(`${q}+`).join(`${q}{1,${C}}`);
      return g;
    }, E = (g, q, C) => {
      const P = y(q), $ = n++;
      u(g, $, q), t[g] = $, r[$] = q, i[$] = P, a[$] = new RegExp(q, C ? "g" : void 0), c[$] = new RegExp(P, C ? "g" : void 0);
    };
    E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${s}*`), E("MAINVERSION", `(${r[t.NUMERICIDENTIFIER]})\\.(${r[t.NUMERICIDENTIFIER]})\\.(${r[t.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${r[t.NUMERICIDENTIFIERLOOSE]})\\.(${r[t.NUMERICIDENTIFIERLOOSE]})\\.(${r[t.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${r[t.NONNUMERICIDENTIFIER]}|${r[t.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${r[t.NONNUMERICIDENTIFIER]}|${r[t.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${r[t.PRERELEASEIDENTIFIER]}(?:\\.${r[t.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${r[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[t.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${s}+`), E("BUILD", `(?:\\+(${r[t.BUILDIDENTIFIER]}(?:\\.${r[t.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${r[t.MAINVERSION]}${r[t.PRERELEASE]}?${r[t.BUILD]}?`), E("FULL", `^${r[t.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${r[t.MAINVERSIONLOOSE]}${r[t.PRERELEASELOOSE]}?${r[t.BUILD]}?`), E("LOOSE", `^${r[t.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${r[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${r[t.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${r[t.XRANGEIDENTIFIER]})(?:\\.(${r[t.XRANGEIDENTIFIER]})(?:\\.(${r[t.XRANGEIDENTIFIER]})(?:${r[t.PRERELEASE]})?${r[t.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${r[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[t.XRANGEIDENTIFIERLOOSE]})(?:${r[t.PRERELEASELOOSE]})?${r[t.BUILD]}?)?)?`), E("XRANGE", `^${r[t.GTLT]}\\s*${r[t.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${r[t.GTLT]}\\s*${r[t.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${p}})(?:\\.(\\d{1,${p}}))?(?:\\.(\\d{1,${p}}))?`), E("COERCE", `${r[t.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", r[t.COERCEPLAIN] + `(?:${r[t.PRERELEASE]})?(?:${r[t.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", r[t.COERCE], !0), E("COERCERTLFULL", r[t.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${r[t.LONETILDE]}\\s+`, !0), h.tildeTrimReplace = "$1~", E("TILDE", `^${r[t.LONETILDE]}${r[t.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${r[t.LONETILDE]}${r[t.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${r[t.LONECARET]}\\s+`, !0), h.caretTrimReplace = "$1^", E("CARET", `^${r[t.LONECARET]}${r[t.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${r[t.LONECARET]}${r[t.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${r[t.GTLT]}\\s*(${r[t.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${r[t.GTLT]}\\s*(${r[t.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${r[t.GTLT]}\\s*(${r[t.LOOSEPLAIN]}|${r[t.XRANGEPLAIN]})`, !0), h.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${r[t.XRANGEPLAIN]})\\s+-\\s+(${r[t.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${r[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[t.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports)), re.exports;
}
var parseOptions_1, hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const e = Object.freeze({ loose: !0 }), h = Object.freeze({});
  return parseOptions_1 = (o) => o ? typeof o != "object" ? e : o : h, parseOptions_1;
}
var identifiers, hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const e = /^[0-9]+$/, h = (o, f) => {
    if (typeof o == "number" && typeof f == "number")
      return o === f ? 0 : o < f ? -1 : 1;
    const u = e.test(o), a = e.test(f);
    return u && a && (o = +o, f = +f), o === f ? 0 : u && !a ? -1 : a && !u ? 1 : o < f ? -1 : 1;
  };
  return identifiers = {
    compareIdentifiers: h,
    rcompareIdentifiers: (o, f) => h(f, o)
  }, identifiers;
}
var semver$1, hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const e = requireDebug(), { MAX_LENGTH: h, MAX_SAFE_INTEGER: p } = requireConstants(), { safeRe: o, t: f } = requireRe(), u = requireParseOptions(), { compareIdentifiers: a } = requireIdentifiers();
  class c {
    constructor(i, t) {
      if (t = u(t), i instanceof c) {
        if (i.loose === !!t.loose && i.includePrerelease === !!t.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > h)
        throw new TypeError(
          `version is longer than ${h} characters`
        );
      e("SemVer", i, t), this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease;
      const n = i.trim().match(t.loose ? o[f.LOOSE] : o[f.FULL]);
      if (!n)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > p || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > p || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > p || this.patch < 0)
        throw new TypeError("Invalid patch version");
      n[4] ? this.prerelease = n[4].split(".").map((s) => {
        if (/^[0-9]+$/.test(s)) {
          const m = +s;
          if (m >= 0 && m < p)
            return m;
        }
        return s;
      }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (e("SemVer.compare", this.version, this.options, i), !(i instanceof c)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new c(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof c || (i = new c(i, this.options)), this.major < i.major ? -1 : this.major > i.major ? 1 : this.minor < i.minor ? -1 : this.minor > i.minor ? 1 : this.patch < i.patch ? -1 : this.patch > i.patch ? 1 : 0;
    }
    comparePre(i) {
      if (i instanceof c || (i = new c(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let t = 0;
      do {
        const n = this.prerelease[t], s = i.prerelease[t];
        if (e("prerelease compare", t, n, s), n === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (n === void 0)
          return -1;
        if (n === s)
          continue;
        return a(n, s);
      } while (++t);
    }
    compareBuild(i) {
      i instanceof c || (i = new c(i, this.options));
      let t = 0;
      do {
        const n = this.build[t], s = i.build[t];
        if (e("build compare", t, n, s), n === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (n === void 0)
          return -1;
        if (n === s)
          continue;
        return a(n, s);
      } while (++t);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, t, n) {
      if (i.startsWith("pre")) {
        if (!t && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (t) {
          const s = `-${t}`.match(this.options.loose ? o[f.PRERELEASELOOSE] : o[f.PRERELEASE]);
          if (!s || s[1] !== t)
            throw new Error(`invalid identifier: ${t}`);
        }
      }
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const s = Number(n) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [s];
          else {
            let m = this.prerelease.length;
            for (; --m >= 0; )
              typeof this.prerelease[m] == "number" && (this.prerelease[m]++, m = -2);
            if (m === -1) {
              if (t === this.prerelease.join(".") && n === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(s);
            }
          }
          if (t) {
            let m = [t, s];
            n === !1 && (m = [t]), a(this.prerelease[0], t) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return semver$1 = c, semver$1;
}
var parse_1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const e = requireSemver$1();
  return parse_1 = (p, o, f = !1) => {
    if (p instanceof e)
      return p;
    try {
      return new e(p, o);
    } catch (u) {
      if (!f)
        return null;
      throw u;
    }
  }, parse_1;
}
var valid_1, hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const e = requireParse();
  return valid_1 = (p, o) => {
    const f = e(p, o);
    return f ? f.version : null;
  }, valid_1;
}
var clean_1, hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const e = requireParse();
  return clean_1 = (p, o) => {
    const f = e(p.trim().replace(/^[=v]+/, ""), o);
    return f ? f.version : null;
  }, clean_1;
}
var inc_1, hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const e = requireSemver$1();
  return inc_1 = (p, o, f, u, a) => {
    typeof f == "string" && (a = u, u = f, f = void 0);
    try {
      return new e(
        p instanceof e ? p.version : p,
        f
      ).inc(o, u, a).version;
    } catch {
      return null;
    }
  }, inc_1;
}
var diff_1, hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const e = requireParse();
  return diff_1 = (p, o) => {
    const f = e(p, null, !0), u = e(o, null, !0), a = f.compare(u);
    if (a === 0)
      return null;
    const c = a > 0, r = c ? f : u, i = c ? u : f, t = !!r.prerelease.length;
    if (!!i.prerelease.length && !t) {
      if (!i.patch && !i.minor)
        return "major";
      if (i.compareMain(r) === 0)
        return i.minor && !i.patch ? "minor" : "patch";
    }
    const s = t ? "pre" : "";
    return f.major !== u.major ? s + "major" : f.minor !== u.minor ? s + "minor" : f.patch !== u.patch ? s + "patch" : "prerelease";
  }, diff_1;
}
var major_1, hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const e = requireSemver$1();
  return major_1 = (p, o) => new e(p, o).major, major_1;
}
var minor_1, hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const e = requireSemver$1();
  return minor_1 = (p, o) => new e(p, o).minor, minor_1;
}
var patch_1, hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const e = requireSemver$1();
  return patch_1 = (p, o) => new e(p, o).patch, patch_1;
}
var prerelease_1, hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const e = requireParse();
  return prerelease_1 = (p, o) => {
    const f = e(p, o);
    return f && f.prerelease.length ? f.prerelease : null;
  }, prerelease_1;
}
var compare_1, hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const e = requireSemver$1();
  return compare_1 = (p, o, f) => new e(p, f).compare(new e(o, f)), compare_1;
}
var rcompare_1, hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const e = requireCompare();
  return rcompare_1 = (p, o, f) => e(o, p, f), rcompare_1;
}
var compareLoose_1, hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const e = requireCompare();
  return compareLoose_1 = (p, o) => e(p, o, !0), compareLoose_1;
}
var compareBuild_1, hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const e = requireSemver$1();
  return compareBuild_1 = (p, o, f) => {
    const u = new e(p, f), a = new e(o, f);
    return u.compare(a) || u.compareBuild(a);
  }, compareBuild_1;
}
var sort_1, hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const e = requireCompareBuild();
  return sort_1 = (p, o) => p.sort((f, u) => e(f, u, o)), sort_1;
}
var rsort_1, hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const e = requireCompareBuild();
  return rsort_1 = (p, o) => p.sort((f, u) => e(u, f, o)), rsort_1;
}
var gt_1, hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const e = requireCompare();
  return gt_1 = (p, o, f) => e(p, o, f) > 0, gt_1;
}
var lt_1, hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const e = requireCompare();
  return lt_1 = (p, o, f) => e(p, o, f) < 0, lt_1;
}
var eq_1, hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const e = requireCompare();
  return eq_1 = (p, o, f) => e(p, o, f) === 0, eq_1;
}
var neq_1, hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const e = requireCompare();
  return neq_1 = (p, o, f) => e(p, o, f) !== 0, neq_1;
}
var gte_1, hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const e = requireCompare();
  return gte_1 = (p, o, f) => e(p, o, f) >= 0, gte_1;
}
var lte_1, hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const e = requireCompare();
  return lte_1 = (p, o, f) => e(p, o, f) <= 0, lte_1;
}
var cmp_1, hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const e = requireEq(), h = requireNeq(), p = requireGt(), o = requireGte(), f = requireLt(), u = requireLte();
  return cmp_1 = (c, r, i, t) => {
    switch (r) {
      case "===":
        return typeof c == "object" && (c = c.version), typeof i == "object" && (i = i.version), c === i;
      case "!==":
        return typeof c == "object" && (c = c.version), typeof i == "object" && (i = i.version), c !== i;
      case "":
      case "=":
      case "==":
        return e(c, i, t);
      case "!=":
        return h(c, i, t);
      case ">":
        return p(c, i, t);
      case ">=":
        return o(c, i, t);
      case "<":
        return f(c, i, t);
      case "<=":
        return u(c, i, t);
      default:
        throw new TypeError(`Invalid operator: ${r}`);
    }
  }, cmp_1;
}
var coerce_1, hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const e = requireSemver$1(), h = requireParse(), { safeRe: p, t: o } = requireRe();
  return coerce_1 = (u, a) => {
    if (u instanceof e)
      return u;
    if (typeof u == "number" && (u = String(u)), typeof u != "string")
      return null;
    a = a || {};
    let c = null;
    if (!a.rtl)
      c = u.match(a.includePrerelease ? p[o.COERCEFULL] : p[o.COERCE]);
    else {
      const m = a.includePrerelease ? p[o.COERCERTLFULL] : p[o.COERCERTL];
      let y;
      for (; (y = m.exec(u)) && (!c || c.index + c[0].length !== u.length); )
        (!c || y.index + y[0].length !== c.index + c[0].length) && (c = y), m.lastIndex = y.index + y[1].length + y[2].length;
      m.lastIndex = -1;
    }
    if (c === null)
      return null;
    const r = c[2], i = c[3] || "0", t = c[4] || "0", n = a.includePrerelease && c[5] ? `-${c[5]}` : "", s = a.includePrerelease && c[6] ? `+${c[6]}` : "";
    return h(`${r}.${i}.${t}${n}${s}`, a);
  }, coerce_1;
}
var lrucache, hasRequiredLrucache;
function requireLrucache() {
  if (hasRequiredLrucache) return lrucache;
  hasRequiredLrucache = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(p) {
      const o = this.map.get(p);
      if (o !== void 0)
        return this.map.delete(p), this.map.set(p, o), o;
    }
    delete(p) {
      return this.map.delete(p);
    }
    set(p, o) {
      if (!this.delete(p) && o !== void 0) {
        if (this.map.size >= this.max) {
          const u = this.map.keys().next().value;
          this.delete(u);
        }
        this.map.set(p, o);
      }
      return this;
    }
  }
  return lrucache = e, lrucache;
}
var range, hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const e = /\s+/g;
  class h {
    constructor(U, ne) {
      if (ne = f(ne), U instanceof h)
        return U.loose === !!ne.loose && U.includePrerelease === !!ne.includePrerelease ? U : new h(U.raw, ne);
      if (U instanceof u)
        return this.raw = U.value, this.set = [[U]], this.formatted = void 0, this;
      if (this.options = ne, this.loose = !!ne.loose, this.includePrerelease = !!ne.includePrerelease, this.raw = U.trim().replace(e, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((K) => !E(K[0])), this.set.length === 0)
          this.set = [L];
        else if (this.set.length > 1) {
          for (const K of this.set)
            if (K.length === 1 && g(K[0])) {
              this.set = [K];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let U = 0; U < this.set.length; U++) {
          U > 0 && (this.formatted += "||");
          const ne = this.set[U];
          for (let L = 0; L < ne.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += ne[L].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(U) {
      const L = ((this.options.includePrerelease && m) | (this.options.loose && y)) + ":" + U, K = o.get(L);
      if (K)
        return K;
      const ue = this.options.loose, fe = ue ? r[i.HYPHENRANGELOOSE] : r[i.HYPHENRANGE];
      U = U.replace(fe, H(this.options.includePrerelease)), a("hyphen replace", U), U = U.replace(r[i.COMPARATORTRIM], t), a("comparator trim", U), U = U.replace(r[i.TILDETRIM], n), a("tilde trim", U), U = U.replace(r[i.CARETTRIM], s), a("caret trim", U);
      let ge = U.split(" ").map((ie) => C(ie, this.options)).join(" ").split(/\s+/).map((ie) => J(ie, this.options));
      ue && (ge = ge.filter((ie) => (a("loose invalid filter", ie, this.options), !!ie.match(r[i.COMPARATORLOOSE])))), a("range list", ge);
      const de = /* @__PURE__ */ new Map(), _e = ge.map((ie) => new u(ie, this.options));
      for (const ie of _e) {
        if (E(ie))
          return [ie];
        de.set(ie.value, ie);
      }
      de.size > 1 && de.has("") && de.delete("");
      const we = [...de.values()];
      return o.set(L, we), we;
    }
    intersects(U, ne) {
      if (!(U instanceof h))
        throw new TypeError("a Range is required");
      return this.set.some((L) => q(L, ne) && U.set.some((K) => q(K, ne) && L.every((ue) => K.every((fe) => ue.intersects(fe, ne)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(U) {
      if (!U)
        return !1;
      if (typeof U == "string")
        try {
          U = new c(U, this.options);
        } catch {
          return !1;
        }
      for (let ne = 0; ne < this.set.length; ne++)
        if (X(this.set[ne], U, this.options))
          return !0;
      return !1;
    }
  }
  range = h;
  const p = requireLrucache(), o = new p(), f = requireParseOptions(), u = requireComparator(), a = requireDebug(), c = requireSemver$1(), {
    safeRe: r,
    t: i,
    comparatorTrimReplace: t,
    tildeTrimReplace: n,
    caretTrimReplace: s
  } = requireRe(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: y } = requireConstants(), E = (N) => N.value === "<0.0.0-0", g = (N) => N.value === "", q = (N, U) => {
    let ne = !0;
    const L = N.slice();
    let K = L.pop();
    for (; ne && L.length; )
      ne = L.every((ue) => K.intersects(ue, U)), K = L.pop();
    return ne;
  }, C = (N, U) => (N = N.replace(r[i.BUILD], ""), a("comp", N, U), N = I(N, U), a("caret", N), N = $(N, U), a("tildes", N), N = A(N, U), a("xrange", N), N = z(N, U), a("stars", N), N), P = (N) => !N || N.toLowerCase() === "x" || N === "*", $ = (N, U) => N.trim().split(/\s+/).map((ne) => b(ne, U)).join(" "), b = (N, U) => {
    const ne = U.loose ? r[i.TILDELOOSE] : r[i.TILDE];
    return N.replace(ne, (L, K, ue, fe, ge) => {
      a("tilde", N, L, K, ue, fe, ge);
      let de;
      return P(K) ? de = "" : P(ue) ? de = `>=${K}.0.0 <${+K + 1}.0.0-0` : P(fe) ? de = `>=${K}.${ue}.0 <${K}.${+ue + 1}.0-0` : ge ? (a("replaceTilde pr", ge), de = `>=${K}.${ue}.${fe}-${ge} <${K}.${+ue + 1}.0-0`) : de = `>=${K}.${ue}.${fe} <${K}.${+ue + 1}.0-0`, a("tilde return", de), de;
    });
  }, I = (N, U) => N.trim().split(/\s+/).map((ne) => T(ne, U)).join(" "), T = (N, U) => {
    a("caret", N, U);
    const ne = U.loose ? r[i.CARETLOOSE] : r[i.CARET], L = U.includePrerelease ? "-0" : "";
    return N.replace(ne, (K, ue, fe, ge, de) => {
      a("caret", N, K, ue, fe, ge, de);
      let _e;
      return P(ue) ? _e = "" : P(fe) ? _e = `>=${ue}.0.0${L} <${+ue + 1}.0.0-0` : P(ge) ? ue === "0" ? _e = `>=${ue}.${fe}.0${L} <${ue}.${+fe + 1}.0-0` : _e = `>=${ue}.${fe}.0${L} <${+ue + 1}.0.0-0` : de ? (a("replaceCaret pr", de), ue === "0" ? fe === "0" ? _e = `>=${ue}.${fe}.${ge}-${de} <${ue}.${fe}.${+ge + 1}-0` : _e = `>=${ue}.${fe}.${ge}-${de} <${ue}.${+fe + 1}.0-0` : _e = `>=${ue}.${fe}.${ge}-${de} <${+ue + 1}.0.0-0`) : (a("no pr"), ue === "0" ? fe === "0" ? _e = `>=${ue}.${fe}.${ge}${L} <${ue}.${fe}.${+ge + 1}-0` : _e = `>=${ue}.${fe}.${ge}${L} <${ue}.${+fe + 1}.0-0` : _e = `>=${ue}.${fe}.${ge} <${+ue + 1}.0.0-0`), a("caret return", _e), _e;
    });
  }, A = (N, U) => (a("replaceXRanges", N, U), N.split(/\s+/).map((ne) => _(ne, U)).join(" ")), _ = (N, U) => {
    N = N.trim();
    const ne = U.loose ? r[i.XRANGELOOSE] : r[i.XRANGE];
    return N.replace(ne, (L, K, ue, fe, ge, de) => {
      a("xRange", N, L, K, ue, fe, ge, de);
      const _e = P(ue), we = _e || P(fe), ie = we || P(ge), Ee = ie;
      return K === "=" && Ee && (K = ""), de = U.includePrerelease ? "-0" : "", _e ? K === ">" || K === "<" ? L = "<0.0.0-0" : L = "*" : K && Ee ? (we && (fe = 0), ge = 0, K === ">" ? (K = ">=", we ? (ue = +ue + 1, fe = 0, ge = 0) : (fe = +fe + 1, ge = 0)) : K === "<=" && (K = "<", we ? ue = +ue + 1 : fe = +fe + 1), K === "<" && (de = "-0"), L = `${K + ue}.${fe}.${ge}${de}`) : we ? L = `>=${ue}.0.0${de} <${+ue + 1}.0.0-0` : ie && (L = `>=${ue}.${fe}.0${de} <${ue}.${+fe + 1}.0-0`), a("xRange return", L), L;
    });
  }, z = (N, U) => (a("replaceStars", N, U), N.trim().replace(r[i.STAR], "")), J = (N, U) => (a("replaceGTE0", N, U), N.trim().replace(r[U.includePrerelease ? i.GTE0PRE : i.GTE0], "")), H = (N) => (U, ne, L, K, ue, fe, ge, de, _e, we, ie, Ee) => (P(L) ? ne = "" : P(K) ? ne = `>=${L}.0.0${N ? "-0" : ""}` : P(ue) ? ne = `>=${L}.${K}.0${N ? "-0" : ""}` : fe ? ne = `>=${ne}` : ne = `>=${ne}${N ? "-0" : ""}`, P(_e) ? de = "" : P(we) ? de = `<${+_e + 1}.0.0-0` : P(ie) ? de = `<${_e}.${+we + 1}.0-0` : Ee ? de = `<=${_e}.${we}.${ie}-${Ee}` : N ? de = `<${_e}.${we}.${+ie + 1}-0` : de = `<=${de}`, `${ne} ${de}`.trim()), X = (N, U, ne) => {
    for (let L = 0; L < N.length; L++)
      if (!N[L].test(U))
        return !1;
    if (U.prerelease.length && !ne.includePrerelease) {
      for (let L = 0; L < N.length; L++)
        if (a(N[L].semver), N[L].semver !== u.ANY && N[L].semver.prerelease.length > 0) {
          const K = N[L].semver;
          if (K.major === U.major && K.minor === U.minor && K.patch === U.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return range;
}
var comparator, hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const e = /* @__PURE__ */ Symbol("SemVer ANY");
  class h {
    static get ANY() {
      return e;
    }
    constructor(t, n) {
      if (n = p(n), t instanceof h) {
        if (t.loose === !!n.loose)
          return t;
        t = t.value;
      }
      t = t.trim().split(/\s+/).join(" "), a("comparator", t, n), this.options = n, this.loose = !!n.loose, this.parse(t), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(t) {
      const n = this.options.loose ? o[f.COMPARATORLOOSE] : o[f.COMPARATOR], s = t.match(n);
      if (!s)
        throw new TypeError(`Invalid comparator: ${t}`);
      this.operator = s[1] !== void 0 ? s[1] : "", this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new c(s[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(t) {
      if (a("Comparator.test", t, this.options.loose), this.semver === e || t === e)
        return !0;
      if (typeof t == "string")
        try {
          t = new c(t, this.options);
        } catch {
          return !1;
        }
      return u(t, this.operator, this.semver, this.options);
    }
    intersects(t, n) {
      if (!(t instanceof h))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new r(t.value, n).test(this.value) : t.operator === "" ? t.value === "" ? !0 : new r(this.value, n).test(t.semver) : (n = p(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || u(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || u(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
    }
  }
  comparator = h;
  const p = requireParseOptions(), { safeRe: o, t: f } = requireRe(), u = requireCmp(), a = requireDebug(), c = requireSemver$1(), r = requireRange();
  return comparator;
}
var satisfies_1, hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const e = requireRange();
  return satisfies_1 = (p, o, f) => {
    try {
      o = new e(o, f);
    } catch {
      return !1;
    }
    return o.test(p);
  }, satisfies_1;
}
var toComparators_1, hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const e = requireRange();
  return toComparators_1 = (p, o) => new e(p, o).set.map((f) => f.map((u) => u.value).join(" ").trim().split(" ")), toComparators_1;
}
var maxSatisfying_1, hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const e = requireSemver$1(), h = requireRange();
  return maxSatisfying_1 = (o, f, u) => {
    let a = null, c = null, r = null;
    try {
      r = new h(f, u);
    } catch {
      return null;
    }
    return o.forEach((i) => {
      r.test(i) && (!a || c.compare(i) === -1) && (a = i, c = new e(a, u));
    }), a;
  }, maxSatisfying_1;
}
var minSatisfying_1, hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const e = requireSemver$1(), h = requireRange();
  return minSatisfying_1 = (o, f, u) => {
    let a = null, c = null, r = null;
    try {
      r = new h(f, u);
    } catch {
      return null;
    }
    return o.forEach((i) => {
      r.test(i) && (!a || c.compare(i) === 1) && (a = i, c = new e(a, u));
    }), a;
  }, minSatisfying_1;
}
var minVersion_1, hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const e = requireSemver$1(), h = requireRange(), p = requireGt();
  return minVersion_1 = (f, u) => {
    f = new h(f, u);
    let a = new e("0.0.0");
    if (f.test(a) || (a = new e("0.0.0-0"), f.test(a)))
      return a;
    a = null;
    for (let c = 0; c < f.set.length; ++c) {
      const r = f.set[c];
      let i = null;
      r.forEach((t) => {
        const n = new e(t.semver.version);
        switch (t.operator) {
          case ">":
            n.prerelease.length === 0 ? n.patch++ : n.prerelease.push(0), n.raw = n.format();
          /* fallthrough */
          case "":
          case ">=":
            (!i || p(n, i)) && (i = n);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${t.operator}`);
        }
      }), i && (!a || p(a, i)) && (a = i);
    }
    return a && f.test(a) ? a : null;
  }, minVersion_1;
}
var valid, hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const e = requireRange();
  return valid = (p, o) => {
    try {
      return new e(p, o).range || "*";
    } catch {
      return null;
    }
  }, valid;
}
var outside_1, hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const e = requireSemver$1(), h = requireComparator(), { ANY: p } = h, o = requireRange(), f = requireSatisfies(), u = requireGt(), a = requireLt(), c = requireLte(), r = requireGte();
  return outside_1 = (t, n, s, m) => {
    t = new e(t, m), n = new o(n, m);
    let y, E, g, q, C;
    switch (s) {
      case ">":
        y = u, E = c, g = a, q = ">", C = ">=";
        break;
      case "<":
        y = a, E = r, g = u, q = "<", C = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(t, n, m))
      return !1;
    for (let P = 0; P < n.set.length; ++P) {
      const $ = n.set[P];
      let b = null, I = null;
      if ($.forEach((T) => {
        T.semver === p && (T = new h(">=0.0.0")), b = b || T, I = I || T, y(T.semver, b.semver, m) ? b = T : g(T.semver, I.semver, m) && (I = T);
      }), b.operator === q || b.operator === C || (!I.operator || I.operator === q) && E(t, I.semver))
        return !1;
      if (I.operator === C && g(t, I.semver))
        return !1;
    }
    return !0;
  }, outside_1;
}
var gtr_1, hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  const e = requireOutside();
  return gtr_1 = (p, o, f) => e(p, o, ">", f), gtr_1;
}
var ltr_1, hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const e = requireOutside();
  return ltr_1 = (p, o, f) => e(p, o, "<", f), ltr_1;
}
var intersects_1, hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const e = requireRange();
  return intersects_1 = (p, o, f) => (p = new e(p, f), o = new e(o, f), p.intersects(o, f)), intersects_1;
}
var simplify, hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const e = requireSatisfies(), h = requireCompare();
  return simplify = (p, o, f) => {
    const u = [];
    let a = null, c = null;
    const r = p.sort((s, m) => h(s, m, f));
    for (const s of r)
      e(s, o, f) ? (c = s, a || (a = s)) : (c && u.push([a, c]), c = null, a = null);
    a && u.push([a, null]);
    const i = [];
    for (const [s, m] of u)
      s === m ? i.push(s) : !m && s === r[0] ? i.push("*") : m ? s === r[0] ? i.push(`<=${m}`) : i.push(`${s} - ${m}`) : i.push(`>=${s}`);
    const t = i.join(" || "), n = typeof o.raw == "string" ? o.raw : String(o);
    return t.length < n.length ? t : o;
  }, simplify;
}
var subset_1, hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const e = requireRange(), h = requireComparator(), { ANY: p } = h, o = requireSatisfies(), f = requireCompare(), u = (n, s, m = {}) => {
    if (n === s)
      return !0;
    n = new e(n, m), s = new e(s, m);
    let y = !1;
    e: for (const E of n.set) {
      for (const g of s.set) {
        const q = r(E, g, m);
        if (y = y || q !== null, q)
          continue e;
      }
      if (y)
        return !1;
    }
    return !0;
  }, a = [new h(">=0.0.0-0")], c = [new h(">=0.0.0")], r = (n, s, m) => {
    if (n === s)
      return !0;
    if (n.length === 1 && n[0].semver === p) {
      if (s.length === 1 && s[0].semver === p)
        return !0;
      m.includePrerelease ? n = a : n = c;
    }
    if (s.length === 1 && s[0].semver === p) {
      if (m.includePrerelease)
        return !0;
      s = c;
    }
    const y = /* @__PURE__ */ new Set();
    let E, g;
    for (const A of n)
      A.operator === ">" || A.operator === ">=" ? E = i(E, A, m) : A.operator === "<" || A.operator === "<=" ? g = t(g, A, m) : y.add(A.semver);
    if (y.size > 1)
      return null;
    let q;
    if (E && g) {
      if (q = f(E.semver, g.semver, m), q > 0)
        return null;
      if (q === 0 && (E.operator !== ">=" || g.operator !== "<="))
        return null;
    }
    for (const A of y) {
      if (E && !o(A, String(E), m) || g && !o(A, String(g), m))
        return null;
      for (const _ of s)
        if (!o(A, String(_), m))
          return !1;
      return !0;
    }
    let C, P, $, b, I = g && !m.includePrerelease && g.semver.prerelease.length ? g.semver : !1, T = E && !m.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    I && I.prerelease.length === 1 && g.operator === "<" && I.prerelease[0] === 0 && (I = !1);
    for (const A of s) {
      if (b = b || A.operator === ">" || A.operator === ">=", $ = $ || A.operator === "<" || A.operator === "<=", E) {
        if (T && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === T.major && A.semver.minor === T.minor && A.semver.patch === T.patch && (T = !1), A.operator === ">" || A.operator === ">=") {
          if (C = i(E, A, m), C === A && C !== E)
            return !1;
        } else if (E.operator === ">=" && !o(E.semver, String(A), m))
          return !1;
      }
      if (g) {
        if (I && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === I.major && A.semver.minor === I.minor && A.semver.patch === I.patch && (I = !1), A.operator === "<" || A.operator === "<=") {
          if (P = t(g, A, m), P === A && P !== g)
            return !1;
        } else if (g.operator === "<=" && !o(g.semver, String(A), m))
          return !1;
      }
      if (!A.operator && (g || E) && q !== 0)
        return !1;
    }
    return !(E && $ && !g && q !== 0 || g && b && !E && q !== 0 || T || I);
  }, i = (n, s, m) => {
    if (!n)
      return s;
    const y = f(n.semver, s.semver, m);
    return y > 0 ? n : y < 0 || s.operator === ">" && n.operator === ">=" ? s : n;
  }, t = (n, s, m) => {
    if (!n)
      return s;
    const y = f(n.semver, s.semver, m);
    return y < 0 ? n : y > 0 || s.operator === "<" && n.operator === "<=" ? s : n;
  };
  return subset_1 = u, subset_1;
}
var semver, hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const e = requireRe(), h = requireConstants(), p = requireSemver$1(), o = requireIdentifiers(), f = requireParse(), u = requireValid$1(), a = requireClean(), c = requireInc(), r = requireDiff(), i = requireMajor(), t = requireMinor(), n = requirePatch(), s = requirePrerelease(), m = requireCompare(), y = requireRcompare(), E = requireCompareLoose(), g = requireCompareBuild(), q = requireSort(), C = requireRsort(), P = requireGt(), $ = requireLt(), b = requireEq(), I = requireNeq(), T = requireGte(), A = requireLte(), _ = requireCmp(), z = requireCoerce(), J = requireComparator(), H = requireRange(), X = requireSatisfies(), N = requireToComparators(), U = requireMaxSatisfying(), ne = requireMinSatisfying(), L = requireMinVersion(), K = requireValid(), ue = requireOutside(), fe = requireGtr(), ge = requireLtr(), de = requireIntersects(), _e = requireSimplify(), we = requireSubset();
  return semver = {
    parse: f,
    valid: u,
    clean: a,
    inc: c,
    diff: r,
    major: i,
    minor: t,
    patch: n,
    prerelease: s,
    compare: m,
    rcompare: y,
    compareLoose: E,
    compareBuild: g,
    sort: q,
    rsort: C,
    gt: P,
    lt: $,
    eq: b,
    neq: I,
    gte: T,
    lte: A,
    cmp: _,
    coerce: z,
    Comparator: J,
    Range: H,
    satisfies: X,
    toComparators: N,
    maxSatisfying: U,
    minSatisfying: ne,
    minVersion: L,
    validRange: K,
    outside: ue,
    gtr: fe,
    ltr: ge,
    intersects: de,
    simplifyRange: _e,
    subset: we,
    SemVer: p,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: h.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: h.RELEASE_TYPES,
    compareIdentifiers: o.compareIdentifiers,
    rcompareIdentifiers: o.rcompareIdentifiers
  }, semver;
}
var DownloadedUpdateHelper = {}, lodash_isequal = { exports: {} };
lodash_isequal.exports;
var hasRequiredLodash_isequal;
function requireLodash_isequal() {
  return hasRequiredLodash_isequal || (hasRequiredLodash_isequal = 1, (function(e, h) {
    var p = 200, o = "__lodash_hash_undefined__", f = 1, u = 2, a = 9007199254740991, c = "[object Arguments]", r = "[object Array]", i = "[object AsyncFunction]", t = "[object Boolean]", n = "[object Date]", s = "[object Error]", m = "[object Function]", y = "[object GeneratorFunction]", E = "[object Map]", g = "[object Number]", q = "[object Null]", C = "[object Object]", P = "[object Promise]", $ = "[object Proxy]", b = "[object RegExp]", I = "[object Set]", T = "[object String]", A = "[object Symbol]", _ = "[object Undefined]", z = "[object WeakMap]", J = "[object ArrayBuffer]", H = "[object DataView]", X = "[object Float32Array]", N = "[object Float64Array]", U = "[object Int8Array]", ne = "[object Int16Array]", L = "[object Int32Array]", K = "[object Uint8Array]", ue = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", ge = "[object Uint32Array]", de = /[\\^$.*+?()[\]{}|]/g, _e = /^\[object .+?Constructor\]$/, we = /^(?:0|[1-9]\d*)$/, ie = {};
    ie[X] = ie[N] = ie[U] = ie[ne] = ie[L] = ie[K] = ie[ue] = ie[fe] = ie[ge] = !0, ie[c] = ie[r] = ie[J] = ie[t] = ie[H] = ie[n] = ie[s] = ie[m] = ie[E] = ie[g] = ie[C] = ie[b] = ie[I] = ie[T] = ie[z] = !1;
    var Ee = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, S = typeof self == "object" && self && self.Object === Object && self, R = Ee || S || Function("return this")(), te = h && !h.nodeType && h, k = te && !0 && e && !e.nodeType && e, pe = k && k.exports === te, ye = pe && Ee.process, ve = (function() {
      try {
        return ye && ye.binding && ye.binding("util");
      } catch {
      }
    })(), qe = ve && ve.isTypedArray;
    function Re(x, Y) {
      for (var ce = -1, me = x == null ? 0 : x.length, Pe = 0, Ae = []; ++ce < me; ) {
        var $e = x[ce];
        Y($e, ce, x) && (Ae[Pe++] = $e);
      }
      return Ae;
    }
    function Ie(x, Y) {
      for (var ce = -1, me = Y.length, Pe = x.length; ++ce < me; )
        x[Pe + ce] = Y[ce];
      return x;
    }
    function Ce(x, Y) {
      for (var ce = -1, me = x == null ? 0 : x.length; ++ce < me; )
        if (Y(x[ce], ce, x))
          return !0;
      return !1;
    }
    function xe(x, Y) {
      for (var ce = -1, me = Array(x); ++ce < x; )
        me[ce] = Y(ce);
      return me;
    }
    function Be(x) {
      return function(Y) {
        return x(Y);
      };
    }
    function ke(x, Y) {
      return x.has(Y);
    }
    function Ue(x, Y) {
      return x?.[Y];
    }
    function d(x) {
      var Y = -1, ce = Array(x.size);
      return x.forEach(function(me, Pe) {
        ce[++Y] = [Pe, me];
      }), ce;
    }
    function ee(x, Y) {
      return function(ce) {
        return x(Y(ce));
      };
    }
    function se(x) {
      var Y = -1, ce = Array(x.size);
      return x.forEach(function(me) {
        ce[++Y] = me;
      }), ce;
    }
    var l = Array.prototype, D = Function.prototype, B = Object.prototype, Q = R["__core-js_shared__"], V = D.toString, w = B.hasOwnProperty, M = (function() {
      var x = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "");
      return x ? "Symbol(src)_1." + x : "";
    })(), Z = B.toString, W = RegExp(
      "^" + V.call(w).replace(de, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), v = pe ? R.Buffer : void 0, O = R.Symbol, F = R.Uint8Array, G = B.propertyIsEnumerable, j = l.splice, ae = O ? O.toStringTag : void 0, oe = Object.getOwnPropertySymbols, le = v ? v.isBuffer : void 0, he = ee(Object.keys, Object), Se = nr(R, "DataView"), Te = nr(R, "Map"), Oe = nr(R, "Promise"), be = nr(R, "Set"), tr = nr(R, "WeakMap"), Ge = nr(Object, "create"), Xe = er(Se), xr = er(Te), Pr = er(Oe), Dr = er(be), Or = er(tr), pr = O ? O.prototype : void 0, dr = pr ? pr.valueOf : void 0;
    function Qe(x) {
      var Y = -1, ce = x == null ? 0 : x.length;
      for (this.clear(); ++Y < ce; ) {
        var me = x[Y];
        this.set(me[0], me[1]);
      }
    }
    function $r() {
      this.__data__ = Ge ? Ge(null) : {}, this.size = 0;
    }
    function Ir(x) {
      var Y = this.has(x) && delete this.__data__[x];
      return this.size -= Y ? 1 : 0, Y;
    }
    function Fr(x) {
      var Y = this.__data__;
      if (Ge) {
        var ce = Y[x];
        return ce === o ? void 0 : ce;
      }
      return w.call(Y, x) ? Y[x] : void 0;
    }
    function Nr(x) {
      var Y = this.__data__;
      return Ge ? Y[x] !== void 0 : w.call(Y, x);
    }
    function Lr(x, Y) {
      var ce = this.__data__;
      return this.size += this.has(x) ? 0 : 1, ce[x] = Ge && Y === void 0 ? o : Y, this;
    }
    Qe.prototype.clear = $r, Qe.prototype.delete = Ir, Qe.prototype.get = Fr, Qe.prototype.has = Nr, Qe.prototype.set = Lr;
    function We(x) {
      var Y = -1, ce = x == null ? 0 : x.length;
      for (this.clear(); ++Y < ce; ) {
        var me = x[Y];
        this.set(me[0], me[1]);
      }
    }
    function Ur() {
      this.__data__ = [], this.size = 0;
    }
    function kr(x) {
      var Y = this.__data__, ce = sr(Y, x);
      if (ce < 0)
        return !1;
      var me = Y.length - 1;
      return ce == me ? Y.pop() : j.call(Y, ce, 1), --this.size, !0;
    }
    function Mr(x) {
      var Y = this.__data__, ce = sr(Y, x);
      return ce < 0 ? void 0 : Y[ce][1];
    }
    function Br(x) {
      return sr(this.__data__, x) > -1;
    }
    function jr(x, Y) {
      var ce = this.__data__, me = sr(ce, x);
      return me < 0 ? (++this.size, ce.push([x, Y])) : ce[me][1] = Y, this;
    }
    We.prototype.clear = Ur, We.prototype.delete = kr, We.prototype.get = Mr, We.prototype.has = Br, We.prototype.set = jr;
    function Ze(x) {
      var Y = -1, ce = x == null ? 0 : x.length;
      for (this.clear(); ++Y < ce; ) {
        var me = x[Y];
        this.set(me[0], me[1]);
      }
    }
    function Hr() {
      this.size = 0, this.__data__ = {
        hash: new Qe(),
        map: new (Te || We)(),
        string: new Qe()
      };
    }
    function Gr(x) {
      var Y = ur(this, x).delete(x);
      return this.size -= Y ? 1 : 0, Y;
    }
    function Yr(x) {
      return ur(this, x).get(x);
    }
    function Wr(x) {
      return ur(this, x).has(x);
    }
    function Vr(x, Y) {
      var ce = ur(this, x), me = ce.size;
      return ce.set(x, Y), this.size += ce.size == me ? 0 : 1, this;
    }
    Ze.prototype.clear = Hr, Ze.prototype.delete = Gr, Ze.prototype.get = Yr, Ze.prototype.has = Wr, Ze.prototype.set = Vr;
    function or(x) {
      var Y = -1, ce = x == null ? 0 : x.length;
      for (this.__data__ = new Ze(); ++Y < ce; )
        this.add(x[Y]);
    }
    function zr(x) {
      return this.__data__.set(x, o), this;
    }
    function Jr(x) {
      return this.__data__.has(x);
    }
    or.prototype.add = or.prototype.push = zr, or.prototype.has = Jr;
    function ze(x) {
      var Y = this.__data__ = new We(x);
      this.size = Y.size;
    }
    function Kr() {
      this.__data__ = new We(), this.size = 0;
    }
    function Xr(x) {
      var Y = this.__data__, ce = Y.delete(x);
      return this.size = Y.size, ce;
    }
    function Qr(x) {
      return this.__data__.get(x);
    }
    function Zr(x) {
      return this.__data__.has(x);
    }
    function et(x, Y) {
      var ce = this.__data__;
      if (ce instanceof We) {
        var me = ce.__data__;
        if (!Te || me.length < p - 1)
          return me.push([x, Y]), this.size = ++ce.size, this;
        ce = this.__data__ = new Ze(me);
      }
      return ce.set(x, Y), this.size = ce.size, this;
    }
    ze.prototype.clear = Kr, ze.prototype.delete = Xr, ze.prototype.get = Qr, ze.prototype.has = Zr, ze.prototype.set = et;
    function rt(x, Y) {
      var ce = lr(x), me = !ce && gt(x), Pe = !ce && !me && hr(x), Ae = !ce && !me && !Pe && qr(x), $e = ce || me || Pe || Ae, Fe = $e ? xe(x.length, String) : [], Ne = Fe.length;
      for (var De in x)
        w.call(x, De) && !($e && // Safari 9 has enumerable `arguments.length` in strict mode.
        (De == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (De == "offset" || De == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Ae && (De == "buffer" || De == "byteLength" || De == "byteOffset") || // Skip index properties.
        ft(De, Ne))) && Fe.push(De);
      return Fe;
    }
    function sr(x, Y) {
      for (var ce = x.length; ce--; )
        if (Er(x[ce][0], Y))
          return ce;
      return -1;
    }
    function tt(x, Y, ce) {
      var me = Y(x);
      return lr(x) ? me : Ie(me, ce(x));
    }
    function ir(x) {
      return x == null ? x === void 0 ? _ : q : ae && ae in Object(x) ? lt(x) : mt(x);
    }
    function mr(x) {
      return ar(x) && ir(x) == c;
    }
    function gr(x, Y, ce, me, Pe) {
      return x === Y ? !0 : x == null || Y == null || !ar(x) && !ar(Y) ? x !== x && Y !== Y : nt(x, Y, ce, me, gr, Pe);
    }
    function nt(x, Y, ce, me, Pe, Ae) {
      var $e = lr(x), Fe = lr(Y), Ne = $e ? r : Je(x), De = Fe ? r : Je(Y);
      Ne = Ne == c ? C : Ne, De = De == c ? C : De;
      var Me = Ne == C, Ye = De == C, Le = Ne == De;
      if (Le && hr(x)) {
        if (!hr(Y))
          return !1;
        $e = !0, Me = !1;
      }
      if (Le && !Me)
        return Ae || (Ae = new ze()), $e || qr(x) ? yr(x, Y, ce, me, Pe, Ae) : st(x, Y, Ne, ce, me, Pe, Ae);
      if (!(ce & f)) {
        var je = Me && w.call(x, "__wrapped__"), He = Ye && w.call(Y, "__wrapped__");
        if (je || He) {
          var Ke = je ? x.value() : x, Ve = He ? Y.value() : Y;
          return Ae || (Ae = new ze()), Pe(Ke, Ve, ce, me, Ae);
        }
      }
      return Le ? (Ae || (Ae = new ze()), ut(x, Y, ce, me, Pe, Ae)) : !1;
    }
    function it(x) {
      if (!Rr(x) || ht(x))
        return !1;
      var Y = _r(x) ? W : _e;
      return Y.test(er(x));
    }
    function at(x) {
      return ar(x) && wr(x.length) && !!ie[ir(x)];
    }
    function ot(x) {
      if (!pt(x))
        return he(x);
      var Y = [];
      for (var ce in Object(x))
        w.call(x, ce) && ce != "constructor" && Y.push(ce);
      return Y;
    }
    function yr(x, Y, ce, me, Pe, Ae) {
      var $e = ce & f, Fe = x.length, Ne = Y.length;
      if (Fe != Ne && !($e && Ne > Fe))
        return !1;
      var De = Ae.get(x);
      if (De && Ae.get(Y))
        return De == Y;
      var Me = -1, Ye = !0, Le = ce & u ? new or() : void 0;
      for (Ae.set(x, Y), Ae.set(Y, x); ++Me < Fe; ) {
        var je = x[Me], He = Y[Me];
        if (me)
          var Ke = $e ? me(He, je, Me, Y, x, Ae) : me(je, He, Me, x, Y, Ae);
        if (Ke !== void 0) {
          if (Ke)
            continue;
          Ye = !1;
          break;
        }
        if (Le) {
          if (!Ce(Y, function(Ve, rr) {
            if (!ke(Le, rr) && (je === Ve || Pe(je, Ve, ce, me, Ae)))
              return Le.push(rr);
          })) {
            Ye = !1;
            break;
          }
        } else if (!(je === He || Pe(je, He, ce, me, Ae))) {
          Ye = !1;
          break;
        }
      }
      return Ae.delete(x), Ae.delete(Y), Ye;
    }
    function st(x, Y, ce, me, Pe, Ae, $e) {
      switch (ce) {
        case H:
          if (x.byteLength != Y.byteLength || x.byteOffset != Y.byteOffset)
            return !1;
          x = x.buffer, Y = Y.buffer;
        case J:
          return !(x.byteLength != Y.byteLength || !Ae(new F(x), new F(Y)));
        case t:
        case n:
        case g:
          return Er(+x, +Y);
        case s:
          return x.name == Y.name && x.message == Y.message;
        case b:
        case T:
          return x == Y + "";
        case E:
          var Fe = d;
        case I:
          var Ne = me & f;
          if (Fe || (Fe = se), x.size != Y.size && !Ne)
            return !1;
          var De = $e.get(x);
          if (De)
            return De == Y;
          me |= u, $e.set(x, Y);
          var Me = yr(Fe(x), Fe(Y), me, Pe, Ae, $e);
          return $e.delete(x), Me;
        case A:
          if (dr)
            return dr.call(x) == dr.call(Y);
      }
      return !1;
    }
    function ut(x, Y, ce, me, Pe, Ae) {
      var $e = ce & f, Fe = vr(x), Ne = Fe.length, De = vr(Y), Me = De.length;
      if (Ne != Me && !$e)
        return !1;
      for (var Ye = Ne; Ye--; ) {
        var Le = Fe[Ye];
        if (!($e ? Le in Y : w.call(Y, Le)))
          return !1;
      }
      var je = Ae.get(x);
      if (je && Ae.get(Y))
        return je == Y;
      var He = !0;
      Ae.set(x, Y), Ae.set(Y, x);
      for (var Ke = $e; ++Ye < Ne; ) {
        Le = Fe[Ye];
        var Ve = x[Le], rr = Y[Le];
        if (me)
          var Sr = $e ? me(rr, Ve, Le, Y, x, Ae) : me(Ve, rr, Le, x, Y, Ae);
        if (!(Sr === void 0 ? Ve === rr || Pe(Ve, rr, ce, me, Ae) : Sr)) {
          He = !1;
          break;
        }
        Ke || (Ke = Le == "constructor");
      }
      if (He && !Ke) {
        var cr = x.constructor, fr = Y.constructor;
        cr != fr && "constructor" in x && "constructor" in Y && !(typeof cr == "function" && cr instanceof cr && typeof fr == "function" && fr instanceof fr) && (He = !1);
      }
      return Ae.delete(x), Ae.delete(Y), He;
    }
    function vr(x) {
      return tt(x, Et, ct);
    }
    function ur(x, Y) {
      var ce = x.__data__;
      return dt(Y) ? ce[typeof Y == "string" ? "string" : "hash"] : ce.map;
    }
    function nr(x, Y) {
      var ce = Ue(x, Y);
      return it(ce) ? ce : void 0;
    }
    function lt(x) {
      var Y = w.call(x, ae), ce = x[ae];
      try {
        x[ae] = void 0;
        var me = !0;
      } catch {
      }
      var Pe = Z.call(x);
      return me && (Y ? x[ae] = ce : delete x[ae]), Pe;
    }
    var ct = oe ? function(x) {
      return x == null ? [] : (x = Object(x), Re(oe(x), function(Y) {
        return G.call(x, Y);
      }));
    } : _t, Je = ir;
    (Se && Je(new Se(new ArrayBuffer(1))) != H || Te && Je(new Te()) != E || Oe && Je(Oe.resolve()) != P || be && Je(new be()) != I || tr && Je(new tr()) != z) && (Je = function(x) {
      var Y = ir(x), ce = Y == C ? x.constructor : void 0, me = ce ? er(ce) : "";
      if (me)
        switch (me) {
          case Xe:
            return H;
          case xr:
            return E;
          case Pr:
            return P;
          case Dr:
            return I;
          case Or:
            return z;
        }
      return Y;
    });
    function ft(x, Y) {
      return Y = Y ?? a, !!Y && (typeof x == "number" || we.test(x)) && x > -1 && x % 1 == 0 && x < Y;
    }
    function dt(x) {
      var Y = typeof x;
      return Y == "string" || Y == "number" || Y == "symbol" || Y == "boolean" ? x !== "__proto__" : x === null;
    }
    function ht(x) {
      return !!M && M in x;
    }
    function pt(x) {
      var Y = x && x.constructor, ce = typeof Y == "function" && Y.prototype || B;
      return x === ce;
    }
    function mt(x) {
      return Z.call(x);
    }
    function er(x) {
      if (x != null) {
        try {
          return V.call(x);
        } catch {
        }
        try {
          return x + "";
        } catch {
        }
      }
      return "";
    }
    function Er(x, Y) {
      return x === Y || x !== x && Y !== Y;
    }
    var gt = mr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? mr : function(x) {
      return ar(x) && w.call(x, "callee") && !G.call(x, "callee");
    }, lr = Array.isArray;
    function yt(x) {
      return x != null && wr(x.length) && !_r(x);
    }
    var hr = le || wt;
    function vt(x, Y) {
      return gr(x, Y);
    }
    function _r(x) {
      if (!Rr(x))
        return !1;
      var Y = ir(x);
      return Y == m || Y == y || Y == i || Y == $;
    }
    function wr(x) {
      return typeof x == "number" && x > -1 && x % 1 == 0 && x <= a;
    }
    function Rr(x) {
      var Y = typeof x;
      return x != null && (Y == "object" || Y == "function");
    }
    function ar(x) {
      return x != null && typeof x == "object";
    }
    var qr = qe ? Be(qe) : at;
    function Et(x) {
      return yt(x) ? rt(x) : ot(x);
    }
    function _t() {
      return [];
    }
    function wt() {
      return !1;
    }
    e.exports = vt;
  })(lodash_isequal, lodash_isequal.exports)), lodash_isequal.exports;
}
var hasRequiredDownloadedUpdateHelper;
function requireDownloadedUpdateHelper() {
  if (hasRequiredDownloadedUpdateHelper) return DownloadedUpdateHelper;
  hasRequiredDownloadedUpdateHelper = 1, Object.defineProperty(DownloadedUpdateHelper, "__esModule", { value: !0 }), DownloadedUpdateHelper.DownloadedUpdateHelper = void 0, DownloadedUpdateHelper.createTempUpdateFile = c;
  const e = require$$0$3, h = require$$1, p = requireLodash_isequal(), o = /* @__PURE__ */ requireLib(), f = require$$1$1;
  let u = class {
    constructor(i) {
      this.cacheDir = i, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(i, t, n, s) {
      if (this.versionInfo != null && this.file === i && this.fileInfo != null)
        return p(this.versionInfo, t) && p(this.fileInfo.info, n.info) && await (0, o.pathExists)(i) ? i : null;
      const m = await this.getValidCachedUpdateFile(n, s);
      return m === null ? null : (s.info(`Update has already been downloaded to ${i}).`), this._file = m, m);
    }
    async setDownloadedFile(i, t, n, s, m, y) {
      this._file = i, this._packageFile = t, this.versionInfo = n, this.fileInfo = s, this._downloadedFileInfo = {
        fileName: m,
        sha512: s.info.sha512,
        isAdminRightsRequired: s.info.isAdminRightsRequired === !0
      }, y && await (0, o.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, o.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(i, t) {
      const n = this.getUpdateInfoFile();
      if (!await (0, o.pathExists)(n))
        return null;
      let m;
      try {
        m = await (0, o.readJson)(n);
      } catch (q) {
        let C = "No cached update info available";
        return q.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), C += ` (error on read: ${q.message})`), t.info(C), null;
      }
      if (!(m?.fileName !== null))
        return t.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (i.info.sha512 !== m.sha512)
        return t.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m.sha512}, expected: ${i.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = f.join(this.cacheDirForPendingUpdate, m.fileName);
      if (!await (0, o.pathExists)(E))
        return t.info("Cached update file doesn't exist"), null;
      const g = await a(E);
      return i.info.sha512 !== g ? (t.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${g}, expected: ${i.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = m, E);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  DownloadedUpdateHelper.DownloadedUpdateHelper = u;
  function a(r, i = "sha512", t = "base64", n) {
    return new Promise((s, m) => {
      const y = (0, e.createHash)(i);
      y.on("error", m).setEncoding(t), (0, h.createReadStream)(r, {
        ...n,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", m).on("end", () => {
        y.end(), s(y.read());
      }).pipe(y, { end: !1 });
    });
  }
  async function c(r, i, t) {
    let n = 0, s = f.join(i, r);
    for (let m = 0; m < 3; m++)
      try {
        return await (0, o.unlink)(s), s;
      } catch (y) {
        if (y.code === "ENOENT")
          return s;
        t.warn(`Error on remove temp update file: ${y}`), s = f.join(i, `${n++}-${r}`);
      }
    return s;
  }
  return DownloadedUpdateHelper;
}
var ElectronAppAdapter = {}, AppAdapter = {}, hasRequiredAppAdapter;
function requireAppAdapter() {
  if (hasRequiredAppAdapter) return AppAdapter;
  hasRequiredAppAdapter = 1, Object.defineProperty(AppAdapter, "__esModule", { value: !0 }), AppAdapter.getAppCacheDir = p;
  const e = require$$1$1, h = require$$2;
  function p() {
    const o = (0, h.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || e.join(o, "AppData", "Local") : process.platform === "darwin" ? f = e.join(o, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || e.join(o, ".cache"), f;
  }
  return AppAdapter;
}
var hasRequiredElectronAppAdapter;
function requireElectronAppAdapter() {
  if (hasRequiredElectronAppAdapter) return ElectronAppAdapter;
  hasRequiredElectronAppAdapter = 1, Object.defineProperty(ElectronAppAdapter, "__esModule", { value: !0 }), ElectronAppAdapter.ElectronAppAdapter = void 0;
  const e = require$$1$1, h = requireAppAdapter();
  let p = class {
    constructor(f = require$$1$3.app) {
      this.app = f;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? e.join(process.resourcesPath, "app-update.yml") : e.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, h.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (u, a) => f(a));
    }
  };
  return ElectronAppAdapter.ElectronAppAdapter = p, ElectronAppAdapter;
}
var electronHttpExecutor = {}, hasRequiredElectronHttpExecutor;
function requireElectronHttpExecutor() {
  return hasRequiredElectronHttpExecutor || (hasRequiredElectronHttpExecutor = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = p;
    const h = requireOut();
    e.NET_SESSION_NAME = "electron-updater";
    function p() {
      return require$$1$3.session.fromPartition(e.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class o extends h.HttpExecutor {
      constructor(u) {
        super(), this.proxyLoginCallback = u, this.cachedSession = null;
      }
      async download(u, a, c) {
        return await c.cancellationToken.createPromise((r, i, t) => {
          const n = {
            headers: c.headers || void 0,
            redirect: "manual"
          };
          (0, h.configureRequestUrl)(u, n), (0, h.configureRequestOptions)(n), this.doDownload(n, {
            destination: a,
            options: c,
            onCancel: t,
            callback: (s) => {
              s == null ? r(a) : i(s);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(u, a) {
        u.headers && u.headers.Host && (u.host = u.headers.Host, delete u.headers.Host), this.cachedSession == null && (this.cachedSession = p());
        const c = require$$1$3.net.request({
          ...u,
          session: this.cachedSession
        });
        return c.on("response", a), this.proxyLoginCallback != null && c.on("login", this.proxyLoginCallback), c;
      }
      addRedirectHandlers(u, a, c, r, i) {
        u.on("redirect", (t, n, s) => {
          u.abort(), r > this.maxRedirects ? c(this.createMaxRedirectError()) : i(h.HttpExecutor.prepareRedirectUrlOptions(s, a));
        });
      }
    }
    e.ElectronHttpExecutor = o;
  })(electronHttpExecutor)), electronHttpExecutor;
}
var GenericProvider = {}, util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1, Object.defineProperty(util, "__esModule", { value: !0 }), util.newBaseUrl = h, util.newUrlFromBase = p, util.getChannelFilename = o;
  const e = require$$2$1;
  function h(f) {
    const u = new e.URL(f);
    return u.pathname.endsWith("/") || (u.pathname += "/"), u;
  }
  function p(f, u, a = !1) {
    const c = new e.URL(f, u), r = u.search;
    return r != null && r.length !== 0 ? c.search = r : a && (c.search = `noCache=${Date.now().toString(32)}`), c;
  }
  function o(f) {
    return `${f}.yml`;
  }
  return util;
}
var Provider = {}, lodash_escaperegexp, hasRequiredLodash_escaperegexp;
function requireLodash_escaperegexp() {
  if (hasRequiredLodash_escaperegexp) return lodash_escaperegexp;
  hasRequiredLodash_escaperegexp = 1;
  var e = "[object Symbol]", h = /[\\^$.*+?()[\]{}|]/g, p = RegExp(h.source), o = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, f = typeof self == "object" && self && self.Object === Object && self, u = o || f || Function("return this")(), a = Object.prototype, c = a.toString, r = u.Symbol, i = r ? r.prototype : void 0, t = i ? i.toString : void 0;
  function n(g) {
    if (typeof g == "string")
      return g;
    if (m(g))
      return t ? t.call(g) : "";
    var q = g + "";
    return q == "0" && 1 / g == -1 / 0 ? "-0" : q;
  }
  function s(g) {
    return !!g && typeof g == "object";
  }
  function m(g) {
    return typeof g == "symbol" || s(g) && c.call(g) == e;
  }
  function y(g) {
    return g == null ? "" : n(g);
  }
  function E(g) {
    return g = y(g), g && p.test(g) ? g.replace(h, "\\$&") : g;
  }
  return lodash_escaperegexp = E, lodash_escaperegexp;
}
var hasRequiredProvider;
function requireProvider() {
  if (hasRequiredProvider) return Provider;
  hasRequiredProvider = 1, Object.defineProperty(Provider, "__esModule", { value: !0 }), Provider.Provider = void 0, Provider.findFile = a, Provider.parseUpdateInfo = c, Provider.getFileList = r, Provider.resolveFiles = i;
  const e = requireOut(), h = requireJsYaml(), p = require$$2$1, o = requireUtil(), f = requireLodash_escaperegexp();
  let u = class {
    constructor(n) {
      this.runtimeOptions = n, this.requestHeaders = null, this.executor = n.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(n, s, m, y = null) {
      const E = (0, o.newUrlFromBase)(`${n.pathname}.blockmap`, n);
      return [(0, o.newUrlFromBase)(`${n.pathname.replace(new RegExp(f(m), "g"), s)}.blockmap`, y ? new p.URL(y) : n), E];
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const n = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (n === "x64" ? "" : `-${n}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(n) {
      return `${n}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(n) {
      this.requestHeaders = n;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(n, s, m) {
      return this.executor.request(this.createRequestOptions(n, s), m);
    }
    createRequestOptions(n, s) {
      const m = {};
      return this.requestHeaders == null ? s != null && (m.headers = s) : m.headers = s == null ? this.requestHeaders : { ...this.requestHeaders, ...s }, (0, e.configureRequestUrl)(n, m), m;
    }
  };
  Provider.Provider = u;
  function a(t, n, s) {
    var m;
    if (t.length === 0)
      throw (0, e.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const y = t.filter((g) => g.url.pathname.toLowerCase().endsWith(`.${n.toLowerCase()}`)), E = (m = y.find((g) => [g.url.pathname, g.info.url].some((q) => q.includes(process.arch)))) !== null && m !== void 0 ? m : y.shift();
    return E || (s == null ? t[0] : t.find((g) => !s.some((q) => g.url.pathname.toLowerCase().endsWith(`.${q.toLowerCase()}`))));
  }
  function c(t, n, s) {
    if (t == null)
      throw (0, e.newError)(`Cannot parse update info from ${n} in the latest release artifacts (${s}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let m;
    try {
      m = (0, h.load)(t);
    } catch (y) {
      throw (0, e.newError)(`Cannot parse update info from ${n} in the latest release artifacts (${s}): ${y.stack || y.message}, rawData: ${t}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return m;
  }
  function r(t) {
    const n = t.files;
    if (n != null && n.length > 0)
      return n;
    if (t.path != null)
      return [
        {
          url: t.path,
          sha2: t.sha2,
          sha512: t.sha512
        }
      ];
    throw (0, e.newError)(`No files provided: ${(0, e.safeStringifyJson)(t)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function i(t, n, s = (m) => m) {
    const y = r(t).map((q) => {
      if (q.sha2 == null && q.sha512 == null)
        throw (0, e.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, e.safeStringifyJson)(q)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, o.newUrlFromBase)(s(q.url), n),
        info: q
      };
    }), E = t.packages, g = E == null ? null : E[process.arch] || E.ia32;
    return g != null && (y[0].packageInfo = {
      ...g,
      path: (0, o.newUrlFromBase)(s(g.path), n).href
    }), y;
  }
  return Provider;
}
var hasRequiredGenericProvider;
function requireGenericProvider() {
  if (hasRequiredGenericProvider) return GenericProvider;
  hasRequiredGenericProvider = 1, Object.defineProperty(GenericProvider, "__esModule", { value: !0 }), GenericProvider.GenericProvider = void 0;
  const e = requireOut(), h = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, a, c) {
      super(c), this.configuration = u, this.updater = a, this.baseUrl = (0, h.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const u = this.updater.channel || this.configuration.channel;
      return u == null ? this.getDefaultChannelName() : this.getCustomChannelName(u);
    }
    async getLatestVersion() {
      const u = (0, h.getChannelFilename)(this.channel), a = (0, h.newUrlFromBase)(u, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let c = 0; ; c++)
        try {
          return (0, p.parseUpdateInfo)(await this.httpRequest(a), u, a);
        } catch (r) {
          if (r instanceof e.HttpError && r.statusCode === 404)
            throw (0, e.newError)(`Cannot find channel "${u}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (r.code === "ECONNREFUSED" && c < 3) {
            await new Promise((i, t) => {
              try {
                setTimeout(i, 1e3 * c);
              } catch (n) {
                t(n);
              }
            });
            continue;
          }
          throw r;
        }
    }
    resolveFiles(u) {
      return (0, p.resolveFiles)(u, this.baseUrl);
    }
  };
  return GenericProvider.GenericProvider = o, GenericProvider;
}
var providerFactory = {}, BitbucketProvider = {}, hasRequiredBitbucketProvider;
function requireBitbucketProvider() {
  if (hasRequiredBitbucketProvider) return BitbucketProvider;
  hasRequiredBitbucketProvider = 1, Object.defineProperty(BitbucketProvider, "__esModule", { value: !0 }), BitbucketProvider.BitbucketProvider = void 0;
  const e = requireOut(), h = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, a, c) {
      super({
        ...c,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = a;
      const { owner: r, slug: i } = u;
      this.baseUrl = (0, h.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${r}/${i}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const u = new e.CancellationToken(), a = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), c = (0, h.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(c, void 0, u);
        return (0, p.parseUpdateInfo)(r, a, c);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, p.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { owner: u, slug: a } = this.configuration;
      return `Bitbucket (owner: ${u}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return BitbucketProvider.BitbucketProvider = o, BitbucketProvider;
}
var GitHubProvider = {}, hasRequiredGitHubProvider;
function requireGitHubProvider() {
  if (hasRequiredGitHubProvider) return GitHubProvider;
  hasRequiredGitHubProvider = 1, Object.defineProperty(GitHubProvider, "__esModule", { value: !0 }), GitHubProvider.GitHubProvider = GitHubProvider.BaseGitHubProvider = void 0, GitHubProvider.computeReleaseNotes = i;
  const e = requireOut(), h = requireSemver(), p = require$$2$1, o = requireUtil(), f = requireProvider(), u = /\/tag\/([^/]+)$/;
  class a extends f.Provider {
    constructor(n, s, m) {
      super({
        ...m,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = n, this.baseUrl = (0, o.newBaseUrl)((0, e.githubUrl)(n, s));
      const y = s === "github.com" ? "api.github.com" : s;
      this.baseApiUrl = (0, o.newBaseUrl)((0, e.githubUrl)(n, y));
    }
    computeGithubBasePath(n) {
      const s = this.options.host;
      return s && !["github.com", "api.github.com"].includes(s) ? `/api/v3${n}` : n;
    }
  }
  GitHubProvider.BaseGitHubProvider = a;
  let c = class extends a {
    constructor(n, s, m) {
      super(n, "github.com", m), this.options = n, this.updater = s;
    }
    get channel() {
      const n = this.updater.channel || this.options.channel;
      return n == null ? this.getDefaultChannelName() : this.getCustomChannelName(n);
    }
    async getLatestVersion() {
      var n, s, m, y, E;
      const g = new e.CancellationToken(), q = await this.httpRequest((0, o.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, g), C = (0, e.parseXml)(q);
      let P = C.element("entry", !1, "No published versions on GitHub"), $ = null;
      try {
        if (this.updater.allowPrerelease) {
          const z = ((n = this.updater) === null || n === void 0 ? void 0 : n.channel) || ((s = h.prerelease(this.updater.currentVersion)) === null || s === void 0 ? void 0 : s[0]) || null;
          if (z === null)
            $ = u.exec(P.element("link").attribute("href"))[1];
          else
            for (const J of C.getElements("entry")) {
              const H = u.exec(J.element("link").attribute("href"));
              if (H === null)
                continue;
              const X = H[1], N = ((m = h.prerelease(X)) === null || m === void 0 ? void 0 : m[0]) || null, U = !z || ["alpha", "beta"].includes(z), ne = N !== null && !["alpha", "beta"].includes(String(N));
              if (U && !ne && !(z === "beta" && N === "alpha")) {
                $ = X;
                break;
              }
              if (N && N === z) {
                $ = X;
                break;
              }
            }
        } else {
          $ = await this.getLatestTagName(g);
          for (const z of C.getElements("entry"))
            if (u.exec(z.element("link").attribute("href"))[1] === $) {
              P = z;
              break;
            }
        }
      } catch (z) {
        throw (0, e.newError)(`Cannot parse releases feed: ${z.stack || z.message},
XML:
${q}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if ($ == null)
        throw (0, e.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let b, I = "", T = "";
      const A = async (z) => {
        I = (0, o.getChannelFilename)(z), T = (0, o.newUrlFromBase)(this.getBaseDownloadPath(String($), I), this.baseUrl);
        const J = this.createRequestOptions(T);
        try {
          return await this.executor.request(J, g);
        } catch (H) {
          throw H instanceof e.HttpError && H.statusCode === 404 ? (0, e.newError)(`Cannot find ${I} in the latest release artifacts (${T}): ${H.stack || H.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : H;
        }
      };
      try {
        let z = this.channel;
        this.updater.allowPrerelease && (!((y = h.prerelease($)) === null || y === void 0) && y[0]) && (z = this.getCustomChannelName(String((E = h.prerelease($)) === null || E === void 0 ? void 0 : E[0]))), b = await A(z);
      } catch (z) {
        if (this.updater.allowPrerelease)
          b = await A(this.getDefaultChannelName());
        else
          throw z;
      }
      const _ = (0, f.parseUpdateInfo)(b, I, T);
      return _.releaseName == null && (_.releaseName = P.elementValueOrEmpty("title")), _.releaseNotes == null && (_.releaseNotes = i(this.updater.currentVersion, this.updater.fullChangelog, C, P)), {
        tag: $,
        ..._
      };
    }
    async getLatestTagName(n) {
      const s = this.options, m = s.host == null || s.host === "github.com" ? (0, o.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new p.URL(`${this.computeGithubBasePath(`/repos/${s.owner}/${s.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const y = await this.httpRequest(m, { Accept: "application/json" }, n);
        return y == null ? null : JSON.parse(y).tag_name;
      } catch (y) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${m}), please ensure a production release exists: ${y.stack || y.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(n) {
      return (0, f.resolveFiles)(n, this.baseUrl, (s) => this.getBaseDownloadPath(n.tag, s.replace(/ /g, "-")));
    }
    getBaseDownloadPath(n, s) {
      return `${this.basePath}/download/${n}/${s}`;
    }
  };
  GitHubProvider.GitHubProvider = c;
  function r(t) {
    const n = t.elementValueOrEmpty("content");
    return n === "No content." ? "" : n;
  }
  function i(t, n, s, m) {
    if (!n)
      return r(m);
    const y = [];
    for (const E of s.getElements("entry")) {
      const g = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      h.lt(t, g) && y.push({
        version: g,
        note: r(E)
      });
    }
    return y.sort((E, g) => h.rcompare(E.version, g.version));
  }
  return GitHubProvider;
}
var GitLabProvider = {}, hasRequiredGitLabProvider;
function requireGitLabProvider() {
  if (hasRequiredGitLabProvider) return GitLabProvider;
  hasRequiredGitLabProvider = 1, Object.defineProperty(GitLabProvider, "__esModule", { value: !0 }), GitLabProvider.GitLabProvider = void 0;
  const e = requireOut(), h = require$$2$1, p = requireLodash_escaperegexp(), o = requireUtil(), f = requireProvider();
  let u = class extends f.Provider {
    /**
     * Normalizes filenames by replacing spaces and underscores with dashes.
     *
     * This is a workaround to handle filename formatting differences between tools:
     * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
     * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
     *
     * Because of this mismatch, we can't reliably extract the correct filename from
     * the asset path without normalization. This function ensures consistent matching
     * across different filename formats by converting all spaces and underscores to dashes.
     *
     * @param filename The filename to normalize
     * @returns The normalized filename with spaces and underscores replaced by dashes
     */
    normalizeFilename(c) {
      return c.replace(/ |_/g, "-");
    }
    constructor(c, r, i) {
      super({
        ...i,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = c, this.updater = r, this.cachedLatestVersion = null;
      const n = c.host || "gitlab.com";
      this.baseApiUrl = (0, o.newBaseUrl)(`https://${n}/api/v4`);
    }
    get channel() {
      const c = this.updater.channel || this.options.channel;
      return c == null ? this.getDefaultChannelName() : this.getCustomChannelName(c);
    }
    async getLatestVersion() {
      const c = new e.CancellationToken(), r = (0, o.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let i;
      try {
        const C = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, P = await this.httpRequest(r, C, c);
        if (!P)
          throw (0, e.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        i = JSON.parse(P);
      } catch (C) {
        throw (0, e.newError)(`Unable to find latest release on GitLab (${r}): ${C.stack || C.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const t = i.tag_name;
      let n = null, s = "", m = null;
      const y = async (C) => {
        s = (0, o.getChannelFilename)(C);
        const P = i.assets.links.find((b) => b.name === s);
        if (!P)
          throw (0, e.newError)(`Cannot find ${s} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        m = new h.URL(P.direct_asset_url);
        const $ = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const b = await this.httpRequest(m, $, c);
          if (!b)
            throw (0, e.newError)(`Empty response from ${m}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return b;
        } catch (b) {
          throw b instanceof e.HttpError && b.statusCode === 404 ? (0, e.newError)(`Cannot find ${s} in the latest release artifacts (${m}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
        }
      };
      try {
        n = await y(this.channel);
      } catch (C) {
        if (this.channel !== this.getDefaultChannelName())
          n = await y(this.getDefaultChannelName());
        else
          throw C;
      }
      if (!n)
        throw (0, e.newError)(`Unable to parse channel data from ${s}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const E = (0, f.parseUpdateInfo)(n, s, m);
      E.releaseName == null && (E.releaseName = i.name), E.releaseNotes == null && (E.releaseNotes = i.description || null);
      const g = /* @__PURE__ */ new Map();
      for (const C of i.assets.links)
        g.set(this.normalizeFilename(C.name), C.direct_asset_url);
      const q = {
        tag: t,
        assets: g,
        ...E
      };
      return this.cachedLatestVersion = q, q;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(c) {
      const r = /* @__PURE__ */ new Map();
      for (const i of c.links)
        r.set(this.normalizeFilename(i.name), i.direct_asset_url);
      return r;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(c, r) {
      const i = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
      for (const t of i) {
        const n = c.get(t);
        if (n)
          return new h.URL(n);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(c) {
      const r = new e.CancellationToken(), i = [`v${c}`, c];
      for (const t of i) {
        const n = (0, o.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(t)}`, this.baseApiUrl);
        try {
          const s = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, m = await this.httpRequest(n, s, r);
          if (m)
            return JSON.parse(m);
        } catch (s) {
          if (s instanceof e.HttpError && s.statusCode === 404)
            continue;
          throw (0, e.newError)(`Unable to find release ${t} on GitLab (${n}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, e.newError)(`Unable to find release with version ${c} (tried: ${i.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(c) {
      const r = {};
      return c != null && (c.startsWith("Bearer") ? r.authorization = c : r["PRIVATE-TOKEN"] = c), r;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(c) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === c)
        return this.cachedLatestVersion.assets;
      const r = await this.fetchReleaseInfoByVersion(c);
      return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(c, r, i) {
      let t = null, n = null;
      const s = await this.getVersionInfoForBlockMap(r);
      s && (t = this.findBlockMapInAssets(s, i));
      const m = await this.getVersionInfoForBlockMap(c);
      if (m) {
        const y = i.replace(new RegExp(p(r), "g"), c);
        n = this.findBlockMapInAssets(m, y);
      }
      return [n, t];
    }
    async getBlockMapFiles(c, r, i, t = null) {
      if (this.options.uploadTarget === "project_upload") {
        const n = c.pathname.split("/").pop() || "", [s, m] = await this.findBlockMapUrlsFromAssets(r, i, n);
        if (!m)
          throw (0, e.newError)(`Cannot find blockmap file for ${i} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!s)
          throw (0, e.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [s, m];
      } else
        return super.getBlockMapFiles(c, r, i, t);
    }
    resolveFiles(c) {
      return (0, f.getFileList)(c).map((r) => {
        const t = [
          r.url,
          // Original filename
          this.normalizeFilename(r.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((s) => c.assets.has(s)), n = t ? c.assets.get(t) : void 0;
        if (!n)
          throw (0, e.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(c.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new h.URL(n),
          info: r
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return GitLabProvider.GitLabProvider = u, GitLabProvider;
}
var KeygenProvider = {}, hasRequiredKeygenProvider;
function requireKeygenProvider() {
  if (hasRequiredKeygenProvider) return KeygenProvider;
  hasRequiredKeygenProvider = 1, Object.defineProperty(KeygenProvider, "__esModule", { value: !0 }), KeygenProvider.KeygenProvider = void 0;
  const e = requireOut(), h = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, a, c) {
      super({
        ...c,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = a, this.defaultHostname = "api.keygen.sh";
      const r = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, h.newBaseUrl)(`https://${r}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const u = new e.CancellationToken(), a = (0, h.getChannelFilename)(this.getCustomChannelName(this.channel)), c = (0, h.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(c, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, u);
        return (0, p.parseUpdateInfo)(r, a, c);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, p.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { account: u, product: a, platform: c } = this.configuration;
      return `Keygen (account: ${u}, product: ${a}, platform: ${c}, channel: ${this.channel})`;
    }
  };
  return KeygenProvider.KeygenProvider = o, KeygenProvider;
}
var PrivateGitHubProvider = {}, hasRequiredPrivateGitHubProvider;
function requirePrivateGitHubProvider() {
  if (hasRequiredPrivateGitHubProvider) return PrivateGitHubProvider;
  hasRequiredPrivateGitHubProvider = 1, Object.defineProperty(PrivateGitHubProvider, "__esModule", { value: !0 }), PrivateGitHubProvider.PrivateGitHubProvider = void 0;
  const e = requireOut(), h = requireJsYaml(), p = require$$1$1, o = require$$2$1, f = requireUtil(), u = requireGitHubProvider(), a = requireProvider();
  let c = class extends u.BaseGitHubProvider {
    constructor(i, t, n, s) {
      super(i, "api.github.com", s), this.updater = t, this.token = n;
    }
    createRequestOptions(i, t) {
      const n = super.createRequestOptions(i, t);
      return n.redirect = "manual", n;
    }
    async getLatestVersion() {
      const i = new e.CancellationToken(), t = (0, f.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(i), s = n.assets.find((E) => E.name === t);
      if (s == null)
        throw (0, e.newError)(`Cannot find ${t} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const m = new o.URL(s.url);
      let y;
      try {
        y = (0, h.load)(await this.httpRequest(m, this.configureHeaders("application/octet-stream"), i));
      } catch (E) {
        throw E instanceof e.HttpError && E.statusCode === 404 ? (0, e.newError)(`Cannot find ${t} in the latest release artifacts (${m}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return y.assets = n.assets, y;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(i) {
      return {
        accept: i,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(i) {
      const t = this.updater.allowPrerelease;
      let n = this.basePath;
      t || (n = `${n}/latest`);
      const s = (0, f.newUrlFromBase)(n, this.baseUrl);
      try {
        const m = JSON.parse(await this.httpRequest(s, this.configureHeaders("application/vnd.github.v3+json"), i));
        return t ? m.find((y) => y.prerelease) || m[0] : m;
      } catch (m) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${s}), please ensure a production release exists: ${m.stack || m.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(i) {
      return (0, a.getFileList)(i).map((t) => {
        const n = p.posix.basename(t.url).replace(/ /g, "-"), s = i.assets.find((m) => m != null && m.name === n);
        if (s == null)
          throw (0, e.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(i.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new o.URL(s.url),
          info: t
        };
      });
    }
  };
  return PrivateGitHubProvider.PrivateGitHubProvider = c, PrivateGitHubProvider;
}
var hasRequiredProviderFactory;
function requireProviderFactory() {
  if (hasRequiredProviderFactory) return providerFactory;
  hasRequiredProviderFactory = 1, Object.defineProperty(providerFactory, "__esModule", { value: !0 }), providerFactory.isUrlProbablySupportMultiRangeRequests = c, providerFactory.createClient = r;
  const e = requireOut(), h = requireBitbucketProvider(), p = requireGenericProvider(), o = requireGitHubProvider(), f = requireGitLabProvider(), u = requireKeygenProvider(), a = requirePrivateGitHubProvider();
  function c(i) {
    return !i.includes("s3.amazonaws.com");
  }
  function r(i, t, n) {
    if (typeof i == "string")
      throw (0, e.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const s = i.provider;
    switch (s) {
      case "github": {
        const m = i, y = (m.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || m.token;
        return y == null ? new o.GitHubProvider(m, t, n) : new a.PrivateGitHubProvider(m, t, y, n);
      }
      case "bitbucket":
        return new h.BitbucketProvider(i, t, n);
      case "gitlab":
        return new f.GitLabProvider(i, t, n);
      case "keygen":
        return new u.KeygenProvider(i, t, n);
      case "s3":
      case "spaces":
        return new p.GenericProvider({
          provider: "generic",
          url: (0, e.getS3LikeProviderBaseUrl)(i),
          channel: i.channel || null
        }, t, {
          ...n,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const m = i;
        return new p.GenericProvider(m, t, {
          ...n,
          isUseMultipleRangeRequest: m.useMultipleRangeRequest !== !1 && c(m.url)
        });
      }
      case "custom": {
        const m = i, y = m.updateProvider;
        if (!y)
          throw (0, e.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new y(m, t, n);
      }
      default:
        throw (0, e.newError)(`Unsupported provider: ${s}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return providerFactory;
}
var GenericDifferentialDownloader = {}, DifferentialDownloader = {}, DataSplitter = {}, downloadPlanBuilder = {}, hasRequiredDownloadPlanBuilder;
function requireDownloadPlanBuilder() {
  if (hasRequiredDownloadPlanBuilder) return downloadPlanBuilder;
  hasRequiredDownloadPlanBuilder = 1, Object.defineProperty(downloadPlanBuilder, "__esModule", { value: !0 }), downloadPlanBuilder.OperationKind = void 0, downloadPlanBuilder.computeOperations = h;
  var e;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(e || (downloadPlanBuilder.OperationKind = e = {}));
  function h(a, c, r) {
    const i = u(a.files), t = u(c.files);
    let n = null;
    const s = c.files[0], m = [], y = s.name, E = i.get(y);
    if (E == null)
      throw new Error(`no file ${y} in old blockmap`);
    const g = t.get(y);
    let q = 0;
    const { checksumToOffset: C, checksumToOldSize: P } = f(i.get(y), E.offset, r);
    let $ = s.offset;
    for (let b = 0; b < g.checksums.length; $ += g.sizes[b], b++) {
      const I = g.sizes[b], T = g.checksums[b];
      let A = C.get(T);
      A != null && P.get(T) !== I && (r.warn(`Checksum ("${T}") matches, but size differs (old: ${P.get(T)}, new: ${I})`), A = void 0), A === void 0 ? (q++, n != null && n.kind === e.DOWNLOAD && n.end === $ ? n.end += I : (n = {
        kind: e.DOWNLOAD,
        start: $,
        end: $ + I
        // oldBlocks: null,
      }, o(n, m, T, b))) : n != null && n.kind === e.COPY && n.end === A ? n.end += I : (n = {
        kind: e.COPY,
        start: A,
        end: A + I
        // oldBlocks: [checksum]
      }, o(n, m, T, b));
    }
    return q > 0 && r.info(`File${s.name === "file" ? "" : " " + s.name} has ${q} changed blocks`), m;
  }
  const p = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function o(a, c, r, i) {
    if (p && c.length !== 0) {
      const t = c[c.length - 1];
      if (t.kind === a.kind && a.start < t.end && a.start > t.start) {
        const n = [t.start, t.end, a.start, a.end].reduce((s, m) => s < m ? s : m);
        throw new Error(`operation (block index: ${i}, checksum: ${r}, kind: ${e[a.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${t.start} until ${t.end} and ${a.start} until ${a.end}
rel: ${t.start - n} until ${t.end - n} and ${a.start - n} until ${a.end - n}`);
      }
    }
    c.push(a);
  }
  function f(a, c, r) {
    const i = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
    let n = c;
    for (let s = 0; s < a.checksums.length; s++) {
      const m = a.checksums[s], y = a.sizes[s], E = t.get(m);
      if (E === void 0)
        i.set(m, n), t.set(m, y);
      else if (r.debug != null) {
        const g = E === y ? "(same size)" : `(size: ${E}, this size: ${y})`;
        r.debug(`${m} duplicated in blockmap ${g}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      n += y;
    }
    return { checksumToOffset: i, checksumToOldSize: t };
  }
  function u(a) {
    const c = /* @__PURE__ */ new Map();
    for (const r of a)
      c.set(r.name, r);
    return c;
  }
  return downloadPlanBuilder;
}
var hasRequiredDataSplitter;
function requireDataSplitter() {
  if (hasRequiredDataSplitter) return DataSplitter;
  hasRequiredDataSplitter = 1, Object.defineProperty(DataSplitter, "__esModule", { value: !0 }), DataSplitter.DataSplitter = void 0, DataSplitter.copyData = a;
  const e = requireOut(), h = require$$1, p = require$$0$1, o = requireDownloadPlanBuilder(), f = Buffer.from(`\r
\r
`);
  var u;
  (function(r) {
    r[r.INIT = 0] = "INIT", r[r.HEADER = 1] = "HEADER", r[r.BODY = 2] = "BODY";
  })(u || (u = {}));
  function a(r, i, t, n, s) {
    const m = (0, h.createReadStream)("", {
      fd: t,
      autoClose: !1,
      start: r.start,
      // end is inclusive
      end: r.end - 1
    });
    m.on("error", n), m.once("end", s), m.pipe(i, {
      end: !1
    });
  }
  let c = class extends p.Writable {
    constructor(i, t, n, s, m, y) {
      super(), this.out = i, this.options = t, this.partIndexToTaskIndex = n, this.partIndexToLength = m, this.finishHandler = y, this.partIndex = -1, this.headerListBuffer = null, this.readState = u.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = s.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(i, t, n) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${i.length} bytes`);
        return;
      }
      this.handleData(i).then(n).catch(n);
    }
    async handleData(i) {
      let t = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, e.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const n = Math.min(this.ignoreByteCount, i.length);
        this.ignoreByteCount -= n, t = n;
      } else if (this.remainingPartDataCount > 0) {
        const n = Math.min(this.remainingPartDataCount, i.length);
        this.remainingPartDataCount -= n, await this.processPartData(i, 0, n), t = n;
      }
      if (t !== i.length) {
        if (this.readState === u.HEADER) {
          const n = this.searchHeaderListEnd(i, t);
          if (n === -1)
            return;
          t = n, this.readState = u.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === u.BODY)
            this.readState = u.INIT;
          else {
            this.partIndex++;
            let y = this.partIndexToTaskIndex.get(this.partIndex);
            if (y == null)
              if (this.isFinished)
                y = this.options.end;
              else
                throw (0, e.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const E = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (E < y)
              await this.copyExistingData(E, y);
            else if (E > y)
              throw (0, e.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (t = this.searchHeaderListEnd(i, t), t === -1) {
              this.readState = u.HEADER;
              return;
            }
          }
          const n = this.partIndexToLength[this.partIndex], s = t + n, m = Math.min(s, i.length);
          if (await this.processPartStarted(i, t, m), this.remainingPartDataCount = n - (m - t), this.remainingPartDataCount > 0)
            return;
          if (t = s + this.boundaryLength, t >= i.length) {
            this.ignoreByteCount = this.boundaryLength - (i.length - s);
            return;
          }
        }
      }
    }
    copyExistingData(i, t) {
      return new Promise((n, s) => {
        const m = () => {
          if (i === t) {
            n();
            return;
          }
          const y = this.options.tasks[i];
          if (y.kind !== o.OperationKind.COPY) {
            s(new Error("Task kind must be COPY"));
            return;
          }
          a(y, this.out, this.options.oldFileFd, s, () => {
            i++, m();
          });
        };
        m();
      });
    }
    searchHeaderListEnd(i, t) {
      const n = i.indexOf(f, t);
      if (n !== -1)
        return n + f.length;
      const s = t === 0 ? i : i.slice(t);
      return this.headerListBuffer == null ? this.headerListBuffer = s : this.headerListBuffer = Buffer.concat([this.headerListBuffer, s]), -1;
    }
    onPartEnd() {
      const i = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== i)
        throw (0, e.newError)(`Expected length: ${i} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(i, t, n) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(i, t, n);
    }
    processPartData(i, t, n) {
      this.actualPartLength += n - t;
      const s = this.out;
      return s.write(t === 0 && i.length === n ? i : i.slice(t, n)) ? Promise.resolve() : new Promise((m, y) => {
        s.on("error", y), s.once("drain", () => {
          s.removeListener("error", y), m();
        });
      });
    }
  };
  return DataSplitter.DataSplitter = c, DataSplitter;
}
var multipleRangeDownloader = {}, hasRequiredMultipleRangeDownloader;
function requireMultipleRangeDownloader() {
  if (hasRequiredMultipleRangeDownloader) return multipleRangeDownloader;
  hasRequiredMultipleRangeDownloader = 1, Object.defineProperty(multipleRangeDownloader, "__esModule", { value: !0 }), multipleRangeDownloader.executeTasksUsingMultipleRangeRequests = o, multipleRangeDownloader.checkIsRangesSupported = u;
  const e = requireOut(), h = requireDataSplitter(), p = requireDownloadPlanBuilder();
  function o(a, c, r, i, t) {
    const n = (s) => {
      if (s >= c.length) {
        a.fileMetadataBuffer != null && r.write(a.fileMetadataBuffer), r.end();
        return;
      }
      const m = s + 1e3;
      f(a, {
        tasks: c,
        start: s,
        end: Math.min(c.length, m),
        oldFileFd: i
      }, r, () => n(m), t);
    };
    return n;
  }
  function f(a, c, r, i, t) {
    let n = "bytes=", s = 0;
    const m = /* @__PURE__ */ new Map(), y = [];
    for (let q = c.start; q < c.end; q++) {
      const C = c.tasks[q];
      C.kind === p.OperationKind.DOWNLOAD && (n += `${C.start}-${C.end - 1}, `, m.set(s, q), s++, y.push(C.end - C.start));
    }
    if (s <= 1) {
      const q = (C) => {
        if (C >= c.end) {
          i();
          return;
        }
        const P = c.tasks[C++];
        if (P.kind === p.OperationKind.COPY)
          (0, h.copyData)(P, r, c.oldFileFd, t, () => q(C));
        else {
          const $ = a.createRequestOptions();
          $.headers.Range = `bytes=${P.start}-${P.end - 1}`;
          const b = a.httpExecutor.createRequest($, (I) => {
            I.on("error", t), u(I, t) && (I.pipe(r, {
              end: !1
            }), I.once("end", () => q(C)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(b, t), b.end();
        }
      };
      q(c.start);
      return;
    }
    const E = a.createRequestOptions();
    E.headers.Range = n.substring(0, n.length - 2);
    const g = a.httpExecutor.createRequest(E, (q) => {
      if (!u(q, t))
        return;
      const C = (0, e.safeGetHeader)(q, "content-type"), P = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(C);
      if (P == null) {
        t(new Error(`Content-Type "multipart/byteranges" is expected, but got "${C}"`));
        return;
      }
      const $ = new h.DataSplitter(r, c, m, P[1] || P[2], y, i);
      $.on("error", t), q.pipe($), q.on("end", () => {
        setTimeout(() => {
          g.abort(), t(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(g, t), g.end();
  }
  function u(a, c) {
    if (a.statusCode >= 400)
      return c((0, e.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const r = (0, e.safeGetHeader)(a, "accept-ranges");
      if (r == null || r === "none")
        return c(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return multipleRangeDownloader;
}
var ProgressDifferentialDownloadCallbackTransform = {}, hasRequiredProgressDifferentialDownloadCallbackTransform;
function requireProgressDifferentialDownloadCallbackTransform() {
  if (hasRequiredProgressDifferentialDownloadCallbackTransform) return ProgressDifferentialDownloadCallbackTransform;
  hasRequiredProgressDifferentialDownloadCallbackTransform = 1, Object.defineProperty(ProgressDifferentialDownloadCallbackTransform, "__esModule", { value: !0 }), ProgressDifferentialDownloadCallbackTransform.ProgressDifferentialDownloadCallbackTransform = void 0;
  const e = require$$0$1;
  var h;
  (function(o) {
    o[o.COPY = 0] = "COPY", o[o.DOWNLOAD = 1] = "DOWNLOAD";
  })(h || (h = {}));
  let p = class extends e.Transform {
    constructor(f, u, a) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = u, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = h.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, u, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == h.COPY) {
        a(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const c = Date.now();
      c >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = c + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((c - this.start) / 1e3))
      }), this.delta = 0), a(null, f);
    }
    beginFileCopy() {
      this.operationType = h.COPY;
    }
    beginRangeDownload() {
      this.operationType = h.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return ProgressDifferentialDownloadCallbackTransform.ProgressDifferentialDownloadCallbackTransform = p, ProgressDifferentialDownloadCallbackTransform;
}
var hasRequiredDifferentialDownloader;
function requireDifferentialDownloader() {
  if (hasRequiredDifferentialDownloader) return DifferentialDownloader;
  hasRequiredDifferentialDownloader = 1, Object.defineProperty(DifferentialDownloader, "__esModule", { value: !0 }), DifferentialDownloader.DifferentialDownloader = void 0;
  const e = requireOut(), h = /* @__PURE__ */ requireLib(), p = require$$1, o = requireDataSplitter(), f = require$$2$1, u = requireDownloadPlanBuilder(), a = requireMultipleRangeDownloader(), c = requireProgressDifferentialDownloadCallbackTransform();
  let r = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(s, m, y) {
      this.blockAwareFileInfo = s, this.httpExecutor = m, this.options = y, this.fileMetadataBuffer = null, this.logger = y.logger;
    }
    createRequestOptions() {
      const s = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, e.configureRequestUrl)(this.options.newUrl, s), (0, e.configureRequestOptions)(s), s;
    }
    doDownload(s, m) {
      if (s.version !== m.version)
        throw new Error(`version is different (${s.version} - ${m.version}), full download is required`);
      const y = this.logger, E = (0, u.computeOperations)(s, m, y);
      y.debug != null && y.debug(JSON.stringify(E, null, 2));
      let g = 0, q = 0;
      for (const P of E) {
        const $ = P.end - P.start;
        P.kind === u.OperationKind.DOWNLOAD ? g += $ : q += $;
      }
      const C = this.blockAwareFileInfo.size;
      if (g + q + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== C)
        throw new Error(`Internal error, size mismatch: downloadSize: ${g}, copySize: ${q}, newSize: ${C}`);
      return y.info(`Full: ${i(C)}, To download: ${i(g)} (${Math.round(g / (C / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(s) {
      const m = [], y = () => Promise.all(m.map((E) => (0, h.close)(E.descriptor).catch((g) => {
        this.logger.error(`cannot close file "${E.path}": ${g}`);
      })));
      return this.doDownloadFile(s, m).then(y).catch((E) => y().catch((g) => {
        try {
          this.logger.error(`cannot close files: ${g}`);
        } catch (q) {
          try {
            console.error(q);
          } catch {
          }
        }
        throw E;
      }).then(() => {
        throw E;
      }));
    }
    async doDownloadFile(s, m) {
      const y = await (0, h.open)(this.options.oldFile, "r");
      m.push({ descriptor: y, path: this.options.oldFile });
      const E = await (0, h.open)(this.options.newFile, "w");
      m.push({ descriptor: E, path: this.options.newFile });
      const g = (0, p.createWriteStream)(this.options.newFile, { fd: E });
      await new Promise((q, C) => {
        const P = [];
        let $;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const H = [];
          let X = 0;
          for (const U of s)
            U.kind === u.OperationKind.DOWNLOAD && (H.push(U.end - U.start), X += U.end - U.start);
          const N = {
            expectedByteCounts: H,
            grandTotal: X
          };
          $ = new c.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), P.push($);
        }
        const b = new e.DigestTransform(this.blockAwareFileInfo.sha512);
        b.isValidateOnEnd = !1, P.push(b), g.on("finish", () => {
          g.close(() => {
            m.splice(1, 1);
            try {
              b.validate();
            } catch (H) {
              C(H);
              return;
            }
            q(void 0);
          });
        }), P.push(g);
        let I = null;
        for (const H of P)
          H.on("error", C), I == null ? I = H : I = I.pipe(H);
        const T = P[0];
        let A;
        if (this.options.isUseMultipleRangeRequest) {
          A = (0, a.executeTasksUsingMultipleRangeRequests)(this, s, T, y, C), A(0);
          return;
        }
        let _ = 0, z = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const J = this.createRequestOptions();
        J.redirect = "manual", A = (H) => {
          var X, N;
          if (H >= s.length) {
            this.fileMetadataBuffer != null && T.write(this.fileMetadataBuffer), T.end();
            return;
          }
          const U = s[H++];
          if (U.kind === u.OperationKind.COPY) {
            $ && $.beginFileCopy(), (0, o.copyData)(U, T, y, C, () => A(H));
            return;
          }
          const ne = `bytes=${U.start}-${U.end - 1}`;
          J.headers.range = ne, (N = (X = this.logger) === null || X === void 0 ? void 0 : X.debug) === null || N === void 0 || N.call(X, `download range: ${ne}`), $ && $.beginRangeDownload();
          const L = this.httpExecutor.createRequest(J, (K) => {
            K.on("error", C), K.on("aborted", () => {
              C(new Error("response has been aborted by the server"));
            }), K.statusCode >= 400 && C((0, e.createHttpError)(K)), K.pipe(T, {
              end: !1
            }), K.once("end", () => {
              $ && $.endRangeDownload(), ++_ === 100 ? (_ = 0, setTimeout(() => A(H), 1e3)) : A(H);
            });
          });
          L.on("redirect", (K, ue, fe) => {
            this.logger.info(`Redirect to ${t(fe)}`), z = fe, (0, e.configureRequestUrl)(new f.URL(z), J), L.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(L, C), L.end();
        }, A(0);
      });
    }
    async readRemoteBytes(s, m) {
      const y = Buffer.allocUnsafe(m + 1 - s), E = this.createRequestOptions();
      E.headers.range = `bytes=${s}-${m}`;
      let g = 0;
      if (await this.request(E, (q) => {
        q.copy(y, g), g += q.length;
      }), g !== y.length)
        throw new Error(`Received data length ${g} is not equal to expected ${y.length}`);
      return y;
    }
    request(s, m) {
      return new Promise((y, E) => {
        const g = this.httpExecutor.createRequest(s, (q) => {
          (0, a.checkIsRangesSupported)(q, E) && (q.on("error", E), q.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), q.on("data", m), q.on("end", () => y()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(g, E), g.end();
      });
    }
  };
  DifferentialDownloader.DifferentialDownloader = r;
  function i(n, s = " KB") {
    return new Intl.NumberFormat("en").format((n / 1024).toFixed(2)) + s;
  }
  function t(n) {
    const s = n.indexOf("?");
    return s < 0 ? n : n.substring(0, s);
  }
  return DifferentialDownloader;
}
var hasRequiredGenericDifferentialDownloader;
function requireGenericDifferentialDownloader() {
  if (hasRequiredGenericDifferentialDownloader) return GenericDifferentialDownloader;
  hasRequiredGenericDifferentialDownloader = 1, Object.defineProperty(GenericDifferentialDownloader, "__esModule", { value: !0 }), GenericDifferentialDownloader.GenericDifferentialDownloader = void 0;
  const e = requireDifferentialDownloader();
  let h = class extends e.DifferentialDownloader {
    download(o, f) {
      return this.doDownload(o, f);
    }
  };
  return GenericDifferentialDownloader.GenericDifferentialDownloader = h, GenericDifferentialDownloader;
}
var types = {}, hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = o;
    const h = requireOut();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return h.CancellationToken;
    } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class p {
      constructor(u) {
        this.emitter = u;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(u) {
        o(this.emitter, "login", u);
      }
      progress(u) {
        o(this.emitter, e.DOWNLOAD_PROGRESS, u);
      }
      updateDownloaded(u) {
        o(this.emitter, e.UPDATE_DOWNLOADED, u);
      }
      updateCancelled(u) {
        o(this.emitter, "update-cancelled", u);
      }
    }
    e.UpdaterSignal = p;
    function o(f, u, a) {
      f.on(u, a);
    }
  })(types)), types;
}
var hasRequiredAppUpdater;
function requireAppUpdater() {
  if (hasRequiredAppUpdater) return AppUpdater;
  hasRequiredAppUpdater = 1, Object.defineProperty(AppUpdater, "__esModule", { value: !0 }), AppUpdater.NoOpLogger = AppUpdater.AppUpdater = void 0;
  const e = requireOut(), h = require$$0$3, p = require$$2, o = require$$0$2, f = /* @__PURE__ */ requireLib(), u = requireJsYaml(), a = requireMain$1(), c = require$$1$1, r = requireSemver(), i = requireDownloadedUpdateHelper(), t = requireElectronAppAdapter(), n = requireElectronHttpExecutor(), s = requireGenericProvider(), m = requireProviderFactory(), y = require$$14, E = requireGenericDifferentialDownloader(), g = requireTypes();
  let q = class Ar extends o.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(b) {
      if (this._channel != null) {
        if (typeof b != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${b}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (b.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = b, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(b) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: b
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, n.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(b) {
      this._logger = b ?? new P();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(b) {
      this.clientPromise = null, this._appUpdateConfigPath = b, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(b) {
      b && (this._isUpdateSupported = b);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(b) {
      b && (this._isUserWithinRollout = b);
    }
    constructor(b, I) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new g.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (_) => this.checkIfUpdateSupported(_), this._isUserWithinRollout = (_) => this.isStagingMatch(_), this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (_) => {
        this._logger.error(`Error: ${_.stack || _.message}`);
      }), I == null ? (this.app = new t.ElectronAppAdapter(), this.httpExecutor = new n.ElectronHttpExecutor((_, z) => this.emit("login", _, z))) : (this.app = I, this.httpExecutor = null);
      const T = this.app.version, A = (0, r.parse)(T);
      if (A == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${T}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = A, this.allowPrerelease = C(A), b != null && (this.setFeedURL(b), typeof b != "string" && b.requestHeaders && (this.requestHeaders = b.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(b) {
      const I = this.createProviderRuntimeOptions();
      let T;
      typeof b == "string" ? T = new s.GenericProvider({ provider: "generic", url: b }, this, {
        ...I,
        isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(b)
      }) : T = (0, m.createClient)(b, this, I), this.clientPromise = Promise.resolve(T);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let b = this.checkForUpdatesPromise;
      if (b != null)
        return this._logger.info("Checking for update (already in progress)"), b;
      const I = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), b = this.doCheckForUpdates().then((T) => (I(), T)).catch((T) => {
        throw I(), this.emit("error", T, `Cannot check for updates: ${(T.stack || T).toString()}`), T;
      }), this.checkForUpdatesPromise = b, b;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(b) {
      return this.checkForUpdates().then((I) => I?.downloadPromise ? (I.downloadPromise.then(() => {
        const T = Ar.formatDownloadNotification(I.updateInfo.version, this.app.name, b);
        new require$$1$3.Notification(T).show();
      }), I) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), I));
    }
    static formatDownloadNotification(b, I, T) {
      return T == null && (T = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), T = {
        title: T.title.replace("{appName}", I).replace("{version}", b),
        body: T.body.replace("{appName}", I).replace("{version}", b)
      }, T;
    }
    async isStagingMatch(b) {
      const I = b.stagingPercentage;
      let T = I;
      if (T == null)
        return !0;
      if (T = parseInt(T, 10), isNaN(T))
        return this._logger.warn(`Staging percentage is NaN: ${I}`), !0;
      T = T / 100;
      const A = await this.stagingUserIdPromise.value, z = e.UUID.parse(A).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${T}, percentage: ${z}, user id: ${A}`), z < T;
    }
    computeFinalHeaders(b) {
      return this.requestHeaders != null && Object.assign(b, this.requestHeaders), b;
    }
    async isUpdateAvailable(b) {
      const I = (0, r.parse)(b.version);
      if (I == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${b.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const T = this.currentVersion;
      if ((0, r.eq)(I, T) || !await Promise.resolve(this.isUpdateSupported(b)) || !await Promise.resolve(this.isUserWithinRollout(b)))
        return !1;
      const _ = (0, r.gt)(I, T), z = (0, r.lt)(I, T);
      return _ ? !0 : this.allowDowngrade && z;
    }
    checkIfUpdateSupported(b) {
      const I = b?.minimumSystemVersion, T = (0, p.release)();
      if (I)
        try {
          if ((0, r.lt)(T, I))
            return this._logger.info(`Current OS version ${T} is less than the minimum OS version required ${I} for version ${T}`), !1;
        } catch (A) {
          this._logger.warn(`Failed to compare current OS version(${T}) with minimum OS version(${I}): ${(A.message || A).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((T) => (0, m.createClient)(T, this, this.createProviderRuntimeOptions())));
      const b = await this.clientPromise, I = await this.stagingUserIdPromise.value;
      return b.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": I })), {
        info: await b.getLatestVersion(),
        provider: b
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const b = await this.getUpdateInfoAndProvider(), I = b.info;
      if (!await this.isUpdateAvailable(I))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${I.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", I), {
          isUpdateAvailable: !1,
          versionInfo: I,
          updateInfo: I
        };
      this.updateInfoAndProvider = b, this.onUpdateAvailable(I);
      const T = new e.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: I,
        updateInfo: I,
        cancellationToken: T,
        downloadPromise: this.autoDownload ? this.downloadUpdate(T) : null
      };
    }
    onUpdateAvailable(b) {
      this._logger.info(`Found version ${b.version} (url: ${(0, e.asArray)(b.files).map((I) => I.url).join(", ")})`), this.emit("update-available", b);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(b = new e.CancellationToken()) {
      const I = this.updateInfoAndProvider;
      if (I == null) {
        const A = new Error("Please check update first");
        return this.dispatchError(A), Promise.reject(A);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(I.info.files).map((A) => A.url).join(", ")}`);
      const T = (A) => {
        if (!(A instanceof e.CancellationError))
          try {
            this.dispatchError(A);
          } catch (_) {
            this._logger.warn(`Cannot dispatch error event: ${_.stack || _}`);
          }
        return A;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: I,
        requestHeaders: this.computeRequestHeaders(I.provider),
        cancellationToken: b,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((A) => {
        throw T(A);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(b) {
      this.emit("error", b, (b.stack || b).toString());
    }
    dispatchUpdateDownloaded(b) {
      this.emit(g.UPDATE_DOWNLOADED, b);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, u.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(b) {
      const I = b.fileExtraDownloadHeaders;
      if (I != null) {
        const T = this.requestHeaders;
        return T == null ? I : {
          ...I,
          ...T
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const b = c.join(this.app.userDataPath, ".updaterId");
      try {
        const T = await (0, f.readFile)(b, "utf-8");
        if (e.UUID.check(T))
          return T;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${T}`);
      } catch (T) {
        T.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${T}`);
      }
      const I = e.UUID.v5((0, h.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${I}`);
      try {
        await (0, f.outputFile)(b, I);
      } catch (T) {
        this._logger.warn(`Couldn't write out staging user ID: ${T}`);
      }
      return I;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const b = this.requestHeaders;
      if (b == null)
        return !0;
      for (const I of Object.keys(b)) {
        const T = I.toLowerCase();
        if (T === "authorization" || T === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let b = this.downloadedUpdateHelper;
      if (b == null) {
        const I = (await this.configOnDisk.value).updaterCacheDirName, T = this._logger;
        I == null && T.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const A = c.join(this.app.baseCachePath, I || this.app.name);
        T.debug != null && T.debug(`updater cache dir: ${A}`), b = new i.DownloadedUpdateHelper(A), this.downloadedUpdateHelper = b;
      }
      return b;
    }
    async executeDownload(b) {
      const I = b.fileInfo, T = {
        headers: b.downloadUpdateOptions.requestHeaders,
        cancellationToken: b.downloadUpdateOptions.cancellationToken,
        sha2: I.info.sha2,
        sha512: I.info.sha512
      };
      this.listenerCount(g.DOWNLOAD_PROGRESS) > 0 && (T.onProgress = (de) => this.emit(g.DOWNLOAD_PROGRESS, de));
      const A = b.downloadUpdateOptions.updateInfoAndProvider.info, _ = A.version, z = I.packageInfo;
      function J() {
        const de = decodeURIComponent(b.fileInfo.url.pathname);
        return de.toLowerCase().endsWith(`.${b.fileExtension.toLowerCase()}`) ? c.basename(de) : b.fileInfo.info.url;
      }
      const H = await this.getOrCreateDownloadHelper(), X = H.cacheDirForPendingUpdate;
      await (0, f.mkdir)(X, { recursive: !0 });
      const N = J();
      let U = c.join(X, N);
      const ne = z == null ? null : c.join(X, `package-${_}${c.extname(z.path) || ".7z"}`), L = async (de) => {
        await H.setDownloadedFile(U, ne, A, I, N, de), await b.done({
          ...A,
          downloadedFile: U
        });
        const _e = c.join(X, "current.blockmap");
        return await (0, f.pathExists)(_e) && await (0, f.copyFile)(_e, c.join(H.cacheDir, "current.blockmap")), ne == null ? [U] : [U, ne];
      }, K = this._logger, ue = await H.validateDownloadedPath(U, A, I, K);
      if (ue != null)
        return U = ue, await L(!1);
      const fe = async () => (await H.clear().catch(() => {
      }), await (0, f.unlink)(U).catch(() => {
      })), ge = await (0, i.createTempUpdateFile)(`temp-${N}`, X, K);
      try {
        await b.task(ge, T, ne, fe), await (0, e.retry)(() => (0, f.rename)(ge, U), {
          retries: 60,
          interval: 500,
          shouldRetry: (de) => de instanceof Error && /^EBUSY:/.test(de.message) ? !0 : (K.warn(`Cannot rename temp file to final file: ${de.message || de.stack}`), !1)
        });
      } catch (de) {
        throw await fe(), de instanceof e.CancellationError && (K.info("cancelled"), this.emit("update-cancelled", A)), de;
      }
      return K.info(`New version ${_} has been downloaded to ${U}`), await L(!0);
    }
    async differentialDownloadInstaller(b, I, T, A, _) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const z = I.updateInfoAndProvider.provider, J = await z.getBlockMapFiles(b.url, this.app.version, I.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${J[0]}", new: ${J[1]})`);
        const H = async (K) => {
          const ue = await this.httpExecutor.downloadToBuffer(K, {
            headers: I.requestHeaders,
            cancellationToken: I.cancellationToken
          });
          if (ue == null || ue.length === 0)
            throw new Error(`Blockmap "${K.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(ue).toString());
          } catch (fe) {
            throw new Error(`Cannot parse blockmap "${K.href}", error: ${fe}`);
          }
        }, X = {
          newUrl: b.url,
          oldFile: c.join(this.downloadedUpdateHelper.cacheDir, _),
          logger: this._logger,
          newFile: T,
          isUseMultipleRangeRequest: z.isUseMultipleRangeRequest,
          requestHeaders: I.requestHeaders,
          cancellationToken: I.cancellationToken
        };
        this.listenerCount(g.DOWNLOAD_PROGRESS) > 0 && (X.onProgress = (K) => this.emit(g.DOWNLOAD_PROGRESS, K));
        const N = async (K, ue) => {
          const fe = c.join(ue, "current.blockmap");
          await (0, f.outputFile)(fe, (0, y.gzipSync)(JSON.stringify(K)));
        }, U = async (K) => {
          const ue = c.join(K, "current.blockmap");
          try {
            if (await (0, f.pathExists)(ue))
              return JSON.parse((0, y.gunzipSync)(await (0, f.readFile)(ue)).toString());
          } catch (fe) {
            this._logger.warn(`Cannot parse blockmap "${ue}", error: ${fe}`);
          }
          return null;
        }, ne = await H(J[1]);
        await N(ne, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let L = await U(this.downloadedUpdateHelper.cacheDir);
        return L == null && (L = await H(J[0])), await new E.GenericDifferentialDownloader(b.info, this.httpExecutor, X).download(L, ne), !1;
      } catch (z) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${z.stack || z}`), this._testOnlyOptions != null)
          throw z;
        return !0;
      }
    }
  };
  AppUpdater.AppUpdater = q;
  function C($) {
    const b = (0, r.prerelease)($);
    return b != null && b.length > 0;
  }
  class P {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(b) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(b) {
    }
  }
  return AppUpdater.NoOpLogger = P, AppUpdater;
}
var hasRequiredBaseUpdater;
function requireBaseUpdater() {
  if (hasRequiredBaseUpdater) return BaseUpdater;
  hasRequiredBaseUpdater = 1, Object.defineProperty(BaseUpdater, "__esModule", { value: !0 }), BaseUpdater.BaseUpdater = void 0;
  const e = require$$1$4, h = requireAppUpdater();
  let p = class extends h.AppUpdater {
    constructor(f, u) {
      super(f, u), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, u = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? u : this.autoRunAppAfterInstall) ? setImmediate(() => {
        require$$1$3.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (u) => (this.dispatchUpdateDownloaded(u), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, u = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, c = this.installerPath, r = a == null ? null : a.downloadedFileInfo;
      if (c == null || r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${u}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: u,
          isAdminRightsRequired: r.isAdminRightsRequired
        });
      } catch (i) {
        return this.dispatchError(i), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(f, u = [], a = {}) {
      this._logger.info(`Executing: ${f} with args: ${u}`);
      const c = (0, e.spawnSync)(f, u, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }), { error: r, status: i, stdout: t, stderr: n } = c;
      if (r != null)
        throw this._logger.error(n), r;
      if (i != null && i !== 0)
        throw this._logger.error(n), new Error(`Command ${f} exited with code ${i}`);
      return t.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, u = [], a = void 0, c = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${u}`), new Promise((r, i) => {
        try {
          const t = { stdio: c, env: a, detached: !0 }, n = (0, e.spawn)(f, u, t);
          n.on("error", (s) => {
            i(s);
          }), n.unref(), n.pid !== void 0 && r(!0);
        } catch (t) {
          i(t);
        }
      });
    }
  };
  return BaseUpdater.BaseUpdater = p, BaseUpdater;
}
var AppImageUpdater = {}, FileWithEmbeddedBlockMapDifferentialDownloader = {}, hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader;
function requireFileWithEmbeddedBlockMapDifferentialDownloader() {
  if (hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader) return FileWithEmbeddedBlockMapDifferentialDownloader;
  hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader = 1, Object.defineProperty(FileWithEmbeddedBlockMapDifferentialDownloader, "__esModule", { value: !0 }), FileWithEmbeddedBlockMapDifferentialDownloader.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const e = /* @__PURE__ */ requireLib(), h = requireDifferentialDownloader(), p = require$$14;
  let o = class extends h.DifferentialDownloader {
    async download() {
      const c = this.blockAwareFileInfo, r = c.size, i = r - (c.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(i, r - 1);
      const t = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await u(this.options.oldFile), t);
    }
  };
  FileWithEmbeddedBlockMapDifferentialDownloader.FileWithEmbeddedBlockMapDifferentialDownloader = o;
  function f(a) {
    return JSON.parse((0, p.inflateRawSync)(a).toString());
  }
  async function u(a) {
    const c = await (0, e.open)(a, "r");
    try {
      const r = (await (0, e.fstat)(c)).size, i = Buffer.allocUnsafe(4);
      await (0, e.read)(c, i, 0, i.length, r - i.length);
      const t = Buffer.allocUnsafe(i.readUInt32BE(0));
      return await (0, e.read)(c, t, 0, t.length, r - i.length - t.length), await (0, e.close)(c), f(t);
    } catch (r) {
      throw await (0, e.close)(c), r;
    }
  }
  return FileWithEmbeddedBlockMapDifferentialDownloader;
}
var hasRequiredAppImageUpdater;
function requireAppImageUpdater() {
  if (hasRequiredAppImageUpdater) return AppImageUpdater;
  hasRequiredAppImageUpdater = 1, Object.defineProperty(AppImageUpdater, "__esModule", { value: !0 }), AppImageUpdater.AppImageUpdater = void 0;
  const e = requireOut(), h = require$$1$4, p = /* @__PURE__ */ requireLib(), o = require$$1, f = require$$1$1, u = requireBaseUpdater(), a = requireFileWithEmbeddedBlockMapDifferentialDownloader(), c = requireProvider(), r = requireTypes();
  let i = class extends u.BaseUpdater {
    constructor(n, s) {
      super(n, s);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(n) {
      const s = n.updateInfoAndProvider.provider, m = (0, c.findFile)(s.resolveFiles(n.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: m,
        downloadUpdateOptions: n,
        task: async (y, E) => {
          const g = process.env.APPIMAGE;
          if (g == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (n.disableDifferentialDownload || await this.downloadDifferential(m, g, y, s, n)) && await this.httpExecutor.download(m.url, y, E), await (0, p.chmod)(y, 493);
        }
      });
    }
    async downloadDifferential(n, s, m, y, E) {
      try {
        const g = {
          newUrl: n.url,
          oldFile: s,
          logger: this._logger,
          newFile: m,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: E.requestHeaders,
          cancellationToken: E.cancellationToken
        };
        return this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (g.onProgress = (q) => this.emit(r.DOWNLOAD_PROGRESS, q)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(n.info, this.httpExecutor, g).download(), !1;
      } catch (g) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${g.stack || g}`), process.platform === "linux";
      }
    }
    doInstall(n) {
      const s = process.env.APPIMAGE;
      if (s == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, o.unlinkSync)(s);
      let m;
      const y = f.basename(s), E = this.installerPath;
      if (E == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      f.basename(E) === y || !/\d+\.\d+\.\d+/.test(y) ? m = s : m = f.join(f.dirname(s), f.basename(E)), (0, h.execFileSync)("mv", ["-f", E, m]), m !== s && this.emit("appimage-filename-updated", m);
      const g = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return n.isForceRunAfter ? this.spawnLog(m, [], g) : (g.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, h.execFileSync)(m, [], { env: g })), !0;
    }
  };
  return AppImageUpdater.AppImageUpdater = i, AppImageUpdater;
}
var DebUpdater = {}, LinuxUpdater = {}, hasRequiredLinuxUpdater;
function requireLinuxUpdater() {
  if (hasRequiredLinuxUpdater) return LinuxUpdater;
  hasRequiredLinuxUpdater = 1, Object.defineProperty(LinuxUpdater, "__esModule", { value: !0 }), LinuxUpdater.LinuxUpdater = void 0;
  const e = requireBaseUpdater();
  let h = class extends e.BaseUpdater {
    constructor(o, f) {
      super(o, f);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var o;
      return ((o = process.getuid) === null || o === void 0 ? void 0 : o.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var o, f;
      return (f = (o = super.installerPath) === null || o === void 0 ? void 0 : o.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && f !== void 0 ? f : null;
    }
    runCommandWithSudoIfNeeded(o) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(o[0], o.slice(1));
      const { name: f } = this.app, u = `"${f} would like to update"`, a = this.sudoWithArgs(u);
      this._logger.info(`Running as non-root user, using sudo to install: ${a}`);
      let c = '"';
      return (/pkexec/i.test(a[0]) || a[0] === "sudo") && (c = ""), this.spawnSyncLog(a[0], [...a.length > 1 ? a.slice(1) : [], `${c}/bin/bash`, "-c", `'${o.join(" ")}'${c}`]);
    }
    sudoWithArgs(o) {
      const f = this.determineSudoCommand(), u = [f];
      return /kdesudo/i.test(f) ? (u.push("--comment", o), u.push("-c")) : /gksudo/i.test(f) ? u.push("--message", o) : /pkexec/i.test(f) && u.push("--disable-internal-agent"), u;
    }
    hasCommand(o) {
      try {
        return this.spawnSyncLog("command", ["-v", o]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const o = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const f of o)
        if (this.hasCommand(f))
          return f;
      return "sudo";
    }
    /**
     * Detects the package manager to use based on the available commands.
     * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
     * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
     * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
     * @param pms - An array of package manager commands to check for, in priority order.
     * @returns The detected package manager command or "unknown" if none are found.
     */
    detectPackageManager(o) {
      var f;
      const u = (f = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || f === void 0 ? void 0 : f.trim();
      if (u)
        return u;
      for (const a of o)
        if (this.hasCommand(a))
          return a;
      return this._logger.warn(`No package manager found in the list: ${o.join(", ")}. Defaulting to the first one: ${o[0]}`), o[0];
    }
  };
  return LinuxUpdater.LinuxUpdater = h, LinuxUpdater;
}
var hasRequiredDebUpdater;
function requireDebUpdater() {
  if (hasRequiredDebUpdater) return DebUpdater;
  hasRequiredDebUpdater = 1, Object.defineProperty(DebUpdater, "__esModule", { value: !0 }), DebUpdater.DebUpdater = void 0;
  const e = requireProvider(), h = requireTypes(), p = requireLinuxUpdater();
  let o = class Cr extends p.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, c = (0, e.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: c,
        downloadUpdateOptions: u,
        task: async (r, i) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (i.onProgress = (t) => this.emit(h.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(c.url, r, i);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const c = ["dpkg", "apt"], r = this.detectPackageManager(c);
      try {
        Cr.installWithCommandRunner(r, a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (i) {
        return this.dispatchError(i), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, c, r) {
      var i;
      if (u === "dpkg")
        try {
          c(["dpkg", "-i", a]);
        } catch (t) {
          r.warn((i = t.message) !== null && i !== void 0 ? i : t), r.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), c(["apt-get", "install", "-f", "-y"]);
        }
      else if (u === "apt")
        r.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), c([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          a
        ]);
      else
        throw new Error(`Package manager ${u} not supported`);
    }
  };
  return DebUpdater.DebUpdater = o, DebUpdater;
}
var PacmanUpdater = {}, hasRequiredPacmanUpdater;
function requirePacmanUpdater() {
  if (hasRequiredPacmanUpdater) return PacmanUpdater;
  hasRequiredPacmanUpdater = 1, Object.defineProperty(PacmanUpdater, "__esModule", { value: !0 }), PacmanUpdater.PacmanUpdater = void 0;
  const e = requireTypes(), h = requireProvider(), p = requireLinuxUpdater();
  let o = class br extends p.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, c = (0, h.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: c,
        downloadUpdateOptions: u,
        task: async (r, i) => {
          this.listenerCount(e.DOWNLOAD_PROGRESS) > 0 && (i.onProgress = (t) => this.emit(e.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(c.url, r, i);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        br.installWithCommandRunner(a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (c) {
        return this.dispatchError(c), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, c) {
      var r;
      try {
        a(["pacman", "-U", "--noconfirm", u]);
      } catch (i) {
        c.warn((r = i.message) !== null && r !== void 0 ? r : i), c.warn("pacman installation failed, attempting to update package database and retry");
        try {
          a(["pacman", "-Sy", "--noconfirm"]), a(["pacman", "-U", "--noconfirm", u]);
        } catch (t) {
          throw c.error("Retry after pacman -Sy failed"), t;
        }
      }
    }
  };
  return PacmanUpdater.PacmanUpdater = o, PacmanUpdater;
}
var RpmUpdater = {}, hasRequiredRpmUpdater;
function requireRpmUpdater() {
  if (hasRequiredRpmUpdater) return RpmUpdater;
  hasRequiredRpmUpdater = 1, Object.defineProperty(RpmUpdater, "__esModule", { value: !0 }), RpmUpdater.RpmUpdater = void 0;
  const e = requireTypes(), h = requireProvider(), p = requireLinuxUpdater();
  let o = class Tr extends p.LinuxUpdater {
    constructor(u, a) {
      super(u, a);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const a = u.updateInfoAndProvider.provider, c = (0, h.findFile)(a.resolveFiles(u.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: c,
        downloadUpdateOptions: u,
        task: async (r, i) => {
          this.listenerCount(e.DOWNLOAD_PROGRESS) > 0 && (i.onProgress = (t) => this.emit(e.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(c.url, r, i);
        }
      });
    }
    doInstall(u) {
      const a = this.installerPath;
      if (a == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const c = ["zypper", "dnf", "yum", "rpm"], r = this.detectPackageManager(c);
      try {
        Tr.installWithCommandRunner(r, a, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (i) {
        return this.dispatchError(i), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, a, c, r) {
      if (u === "zypper")
        return c(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", a]);
      if (u === "dnf")
        return c(["dnf", "install", "--nogpgcheck", "-y", a]);
      if (u === "yum")
        return c(["yum", "install", "--nogpgcheck", "-y", a]);
      if (u === "rpm")
        return r.warn("Installing with rpm only (no dependency resolution)."), c(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", a]);
      throw new Error(`Package manager ${u} not supported`);
    }
  };
  return RpmUpdater.RpmUpdater = o, RpmUpdater;
}
var MacUpdater = {}, hasRequiredMacUpdater;
function requireMacUpdater() {
  if (hasRequiredMacUpdater) return MacUpdater;
  hasRequiredMacUpdater = 1, Object.defineProperty(MacUpdater, "__esModule", { value: !0 }), MacUpdater.MacUpdater = void 0;
  const e = requireOut(), h = /* @__PURE__ */ requireLib(), p = require$$1, o = require$$1$1, f = require$$4$1, u = requireAppUpdater(), a = requireProvider(), c = require$$1$4, r = require$$0$3;
  let i = class extends u.AppUpdater {
    constructor(n, s) {
      super(n, s), this.nativeUpdater = require$$1$3.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
        this._logger.warn(m), this.emit("error", m);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(n) {
      this._logger.debug != null && this._logger.debug(n);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((n) => {
        n && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(n) {
      let s = n.updateInfoAndProvider.provider.resolveFiles(n.updateInfoAndProvider.info);
      const m = this._logger, y = "sysctl.proc_translated";
      let E = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), E = (0, c.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (b) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${b}`);
      }
      let g = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const I = (0, c.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${I}`), g = g || I;
      } catch (b) {
        m.warn(`uname shell command to check for arm64 failed: ${b}`);
      }
      g = g || process.arch === "arm64" || E;
      const q = (b) => {
        var I;
        return b.url.pathname.includes("arm64") || ((I = b.info.url) === null || I === void 0 ? void 0 : I.includes("arm64"));
      };
      g && s.some(q) ? s = s.filter((b) => g === q(b)) : s = s.filter((b) => !q(b));
      const C = (0, a.findFile)(s, "zip", ["pkg", "dmg"]);
      if (C == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(s)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const P = n.updateInfoAndProvider.provider, $ = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: C,
        downloadUpdateOptions: n,
        task: async (b, I) => {
          const T = o.join(this.downloadedUpdateHelper.cacheDir, $), A = () => (0, h.pathExistsSync)(T) ? !n.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let _ = !0;
          A() && (_ = await this.differentialDownloadInstaller(C, n, b, P, $)), _ && await this.httpExecutor.download(C.url, b, I);
        },
        done: async (b) => {
          if (!n.disableDifferentialDownload)
            try {
              const I = o.join(this.downloadedUpdateHelper.cacheDir, $);
              await (0, h.copyFile)(b.downloadedFile, I);
            } catch (I) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${I.message}`);
            }
          return this.updateDownloaded(C, b);
        }
      });
    }
    async updateDownloaded(n, s) {
      var m;
      const y = s.downloadedFile, E = (m = n.info.size) !== null && m !== void 0 ? m : (await (0, h.stat)(y)).size, g = this._logger, q = `fileToProxy=${n.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${q})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${q})`), this.server.on("close", () => {
        g.info(`Proxy server for native Squirrel.Mac is closed (${q})`);
      });
      const C = (P) => {
        const $ = P.address();
        return typeof $ == "string" ? $ : `http://127.0.0.1:${$?.port}`;
      };
      return await new Promise((P, $) => {
        const b = (0, r.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), I = Buffer.from(`autoupdater:${b}`, "ascii"), T = `/${(0, r.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (A, _) => {
          const z = A.url;
          if (g.info(`${z} requested`), z === "/") {
            if (!A.headers.authorization || A.headers.authorization.indexOf("Basic ") === -1) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), g.warn("No authenthication info");
              return;
            }
            const X = A.headers.authorization.split(" ")[1], N = Buffer.from(X, "base64").toString("ascii"), [U, ne] = N.split(":");
            if (U !== "autoupdater" || ne !== b) {
              _.statusCode = 401, _.statusMessage = "Invalid Authentication Credentials", _.end(), g.warn("Invalid authenthication credentials");
              return;
            }
            const L = Buffer.from(`{ "url": "${C(this.server)}${T}" }`);
            _.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), _.end(L);
            return;
          }
          if (!z.startsWith(T)) {
            g.warn(`${z} requested, but not supported`), _.writeHead(404), _.end();
            return;
          }
          g.info(`${T} requested by Squirrel.Mac, pipe ${y}`);
          let J = !1;
          _.on("finish", () => {
            J || (this.nativeUpdater.removeListener("error", $), P([]));
          });
          const H = (0, p.createReadStream)(y);
          H.on("error", (X) => {
            try {
              _.end();
            } catch (N) {
              g.warn(`cannot end response: ${N}`);
            }
            J = !0, this.nativeUpdater.removeListener("error", $), $(new Error(`Cannot pipe "${y}": ${X}`));
          }), _.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), H.pipe(_);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${q})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${C(this.server)}, ${q})`), this.nativeUpdater.setFeedURL({
            url: C(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${I.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(s), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", $), this.nativeUpdater.checkForUpdates()) : P([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return MacUpdater.MacUpdater = i, MacUpdater;
}
var NsisUpdater = {}, windowsExecutableCodeSignatureVerifier = {}, hasRequiredWindowsExecutableCodeSignatureVerifier;
function requireWindowsExecutableCodeSignatureVerifier() {
  if (hasRequiredWindowsExecutableCodeSignatureVerifier) return windowsExecutableCodeSignatureVerifier;
  hasRequiredWindowsExecutableCodeSignatureVerifier = 1, Object.defineProperty(windowsExecutableCodeSignatureVerifier, "__esModule", { value: !0 }), windowsExecutableCodeSignatureVerifier.verifySignature = u;
  const e = requireOut(), h = require$$1$4, p = require$$2, o = require$$1$1;
  function f(i, t) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", i], {
      shell: !0,
      timeout: t
    }];
  }
  function u(i, t, n) {
    return new Promise((s, m) => {
      const y = t.replace(/'/g, "''");
      n.info(`Verifying signature ${y}`), (0, h.execFile)(...f(`"Get-AuthenticodeSignature -LiteralPath '${y}' | ConvertTo-Json -Compress"`, 20 * 1e3), (E, g, q) => {
        var C;
        try {
          if (E != null || q) {
            c(n, E, q, m), s(null);
            return;
          }
          const P = a(g);
          if (P.Status === 0) {
            try {
              const T = o.normalize(P.Path), A = o.normalize(t);
              if (n.info(`LiteralPath: ${T}. Update Path: ${A}`), T !== A) {
                c(n, new Error(`LiteralPath of ${T} is different than ${A}`), q, m), s(null);
                return;
              }
            } catch (T) {
              n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(C = T.message) !== null && C !== void 0 ? C : T.stack}`);
            }
            const b = (0, e.parseDn)(P.SignerCertificate.Subject);
            let I = !1;
            for (const T of i) {
              const A = (0, e.parseDn)(T);
              if (A.size ? I = Array.from(A.keys()).every((z) => A.get(z) === b.get(z)) : T === b.get("CN") && (n.warn(`Signature validated using only CN ${T}. Please add your full Distinguished Name (DN) to publisherNames configuration`), I = !0), I) {
                s(null);
                return;
              }
            }
          }
          const $ = `publisherNames: ${i.join(" | ")}, raw info: ` + JSON.stringify(P, (b, I) => b === "RawData" ? void 0 : I, 2);
          n.warn(`Sign verification failed, installer signed with incorrect certificate: ${$}`), s($);
        } catch (P) {
          c(n, P, null, m), s(null);
          return;
        }
      });
    });
  }
  function a(i) {
    const t = JSON.parse(i);
    delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
    const n = t.SignerCertificate;
    return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
  }
  function c(i, t, n, s) {
    if (r()) {
      i.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, h.execFileSync)(...f("ConvertTo-Json test", 10 * 1e3));
    } catch (m) {
      i.warn(`Cannot execute ConvertTo-Json: ${m.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    t != null && s(t), n && s(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
  }
  function r() {
    const i = p.release();
    return i.startsWith("6.") && !i.startsWith("6.3");
  }
  return windowsExecutableCodeSignatureVerifier;
}
var hasRequiredNsisUpdater;
function requireNsisUpdater() {
  if (hasRequiredNsisUpdater) return NsisUpdater;
  hasRequiredNsisUpdater = 1, Object.defineProperty(NsisUpdater, "__esModule", { value: !0 }), NsisUpdater.NsisUpdater = void 0;
  const e = requireOut(), h = require$$1$1, p = requireBaseUpdater(), o = requireFileWithEmbeddedBlockMapDifferentialDownloader(), f = requireTypes(), u = requireProvider(), a = /* @__PURE__ */ requireLib(), c = requireWindowsExecutableCodeSignatureVerifier(), r = require$$2$1;
  let i = class extends p.BaseUpdater {
    constructor(n, s) {
      super(n, s), this._verifyUpdateCodeSignature = (m, y) => (0, c.verifySignature)(m, y, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(n) {
      n && (this._verifyUpdateCodeSignature = n);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const s = n.updateInfoAndProvider.provider, m = (0, u.findFile)(s.resolveFiles(n.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: n,
        fileInfo: m,
        task: async (y, E, g, q) => {
          const C = m.packageInfo, P = C != null && g != null;
          if (P && n.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${n.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !P && !n.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (P || n.disableDifferentialDownload || await this.differentialDownloadInstaller(m, n, y, s, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, y, E);
          const $ = await this.verifySignature(y);
          if ($ != null)
            throw await q(), (0, e.newError)(`New version ${n.updateInfoAndProvider.info.version} is not signed by the application owner: ${$}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (P && await this.differentialDownloadWebPackage(n, C, g, s))
            try {
              await this.httpExecutor.download(new r.URL(C.path), g, {
                headers: n.requestHeaders,
                cancellationToken: n.cancellationToken,
                sha512: C.sha512
              });
            } catch (b) {
              try {
                await (0, a.unlink)(g);
              } catch {
              }
              throw b;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(n) {
      let s;
      try {
        if (s = (await this.configOnDisk.value).publisherName, s == null)
          return null;
      } catch (m) {
        if (m.code === "ENOENT")
          return null;
        throw m;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(s) ? s : [s], n);
    }
    doInstall(n) {
      const s = this.installerPath;
      if (s == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const m = ["--updated"];
      n.isSilent && m.push("/S"), n.isForceRunAfter && m.push("--force-run"), this.installDirectory && m.push(`/D=${this.installDirectory}`);
      const y = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      y != null && m.push(`--package-file=${y}`);
      const E = () => {
        this.spawnLog(h.join(process.resourcesPath, "elevate.exe"), [s].concat(m)).catch((g) => this.dispatchError(g));
      };
      return n.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), E(), !0) : (this.spawnLog(s, m).catch((g) => {
        const q = g.code;
        this._logger.info(`Cannot run installer: error code: ${q}, error message: "${g.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), q === "UNKNOWN" || q === "EACCES" ? E() : q === "ENOENT" ? require$$1$3.shell.openPath(s).catch((C) => this.dispatchError(C)) : this.dispatchError(g);
      }), !0);
    }
    async differentialDownloadWebPackage(n, s, m, y) {
      if (s.blockMapSize == null)
        return !0;
      try {
        const E = {
          newUrl: new r.URL(s.path),
          oldFile: h.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: n.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (g) => this.emit(f.DOWNLOAD_PROGRESS, g)), await new o.FileWithEmbeddedBlockMapDifferentialDownloader(s, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return NsisUpdater.NsisUpdater = i, NsisUpdater;
}
var hasRequiredMain;
function requireMain() {
  return hasRequiredMain || (hasRequiredMain = 1, (function(e) {
    var h = main$1 && main$1.__createBinding || (Object.create ? (function(g, q, C, P) {
      P === void 0 && (P = C);
      var $ = Object.getOwnPropertyDescriptor(q, C);
      (!$ || ("get" in $ ? !q.__esModule : $.writable || $.configurable)) && ($ = { enumerable: !0, get: function() {
        return q[C];
      } }), Object.defineProperty(g, P, $);
    }) : (function(g, q, C, P) {
      P === void 0 && (P = C), g[P] = q[C];
    })), p = main$1 && main$1.__exportStar || function(g, q) {
      for (var C in g) C !== "default" && !Object.prototype.hasOwnProperty.call(q, C) && h(q, g, C);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const o = /* @__PURE__ */ requireLib(), f = require$$1$1;
    var u = requireBaseUpdater();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return u.BaseUpdater;
    } });
    var a = requireAppUpdater();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return a.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return a.NoOpLogger;
    } });
    var c = requireProvider();
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return c.Provider;
    } });
    var r = requireAppImageUpdater();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return r.AppImageUpdater;
    } });
    var i = requireDebUpdater();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return i.DebUpdater;
    } });
    var t = requirePacmanUpdater();
    Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
      return t.PacmanUpdater;
    } });
    var n = requireRpmUpdater();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return n.RpmUpdater;
    } });
    var s = requireMacUpdater();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return s.MacUpdater;
    } });
    var m = requireNsisUpdater();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return m.NsisUpdater;
    } }), p(requireTypes(), e);
    let y;
    function E() {
      if (process.platform === "win32")
        y = new (requireNsisUpdater()).NsisUpdater();
      else if (process.platform === "darwin")
        y = new (requireMacUpdater()).MacUpdater();
      else {
        y = new (requireAppImageUpdater()).AppImageUpdater();
        try {
          const g = f.join(process.resourcesPath, "package-type");
          if (!(0, o.existsSync)(g))
            return y;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const q = (0, o.readFileSync)(g).toString().trim();
          switch (console.info("Found package-type:", q), q) {
            case "deb":
              y = new (requireDebUpdater()).DebUpdater();
              break;
            case "rpm":
              y = new (requireRpmUpdater()).RpmUpdater();
              break;
            case "pacman":
              y = new (requirePacmanUpdater()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (g) {
          console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
        }
      }
      return y;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => y || E()
    });
  })(main$1)), main$1;
}
var mainExports = requireMain();
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL, MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron"), RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#0F172A",
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  }), win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), VITE_DEV_SERVER_URL ? win.loadURL(VITE_DEV_SERVER_URL) : win.loadFile(path.join(RENDERER_DIST, "index.html"));
}
app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});
app.on("activate", () => {
  BrowserWindow.getAllWindows().length === 0 && createWindow();
});
const CONFIG_FILE = path.join(app.getPath("userData"), "config.json"), DEFAULT_DOCS_DIR = path.join(app.getPath("documents"), "QuickRunbooks");
function getConfig() {
  try {
    if (fs$1.existsSync(CONFIG_FILE)) {
      const e = fs$1.readFileSync(CONFIG_FILE, "utf-8"), h = JSON.parse(e);
      return h.runbooksPath && !h.sources && (h.sources = [h.runbooksPath], delete h.runbooksPath, saveConfig(h)), h.sources || (h.sources = [DEFAULT_DOCS_DIR]), h;
    }
  } catch (e) {
    console.error("Failed to read config", e);
  }
  return { sources: [DEFAULT_DOCS_DIR] };
}
function saveConfig(e) {
  try {
    fs$1.writeFileSync(CONFIG_FILE, JSON.stringify(e, null, 2), "utf-8");
  } catch (h) {
    console.error("Failed to write config", h);
  }
}
function ensureSourcesExist(e) {
  e.forEach((h) => {
    if (!fs$1.existsSync(h))
      try {
        fs$1.mkdirSync(h, { recursive: !0 });
      } catch (p) {
        console.error("Could not create directory", h, p);
      }
  });
}
function parseRunbookFile(e) {
  try {
    const h = path.extname(e).toLowerCase(), p = fs$1.readFileSync(e, "utf-8");
    let o = {};
    if (h === ".json")
      o = JSON.parse(p), o.format = "json";
    else if (h === ".md") {
      const f = matter(p);
      o = f.data, o.format = "md", o.steps || (o.steps = parseMarkdownSteps(f.content));
    }
    return !o || (o.sourcePath = path.dirname(e), o.id || (o.id = path.basename(e, h)), o.title || (o.title = o.id || "Untitled Runbook"), Array.isArray(o.tags) || (o.tags = []), o.category || (o.category = "General"), o.category.toLowerCase() !== "qrun") ? null : (Array.isArray(o.steps) || (o.steps = []), o);
  } catch (h) {
    console.error(`Error parsing file ${e}`, h);
  }
  return null;
}
function parseMarkdownSteps(e) {
  const h = [], p = e.split(`
`);
  let o = null;
  return p.forEach((f) => {
    if (f.startsWith("## "))
      o && h.push(o), o = { title: f.replace("## ", "").trim(), content: [] };
    else if (o)
      if (f.trim().startsWith("```")) {
        const u = f.trim().replace("```", "");
        if (u)
          o.content.push({ type: "code", language: u, code: "" });
        else {
          const a = o.content[o.content.length - 1];
          a && a.type === "code" || o.content.push({ type: "code", language: "text", code: "" });
        }
      } else {
        const u = o.content[o.content.length - 1];
        u && u.type === "code" ? u.code ? u.code += `
` + f : u.code = f : !u || u.type !== "text" ? o.content.push({ type: "text", text: f }) : u.text += `
` + f;
      }
  }), o && h.push(o), h.forEach((f) => {
    f.content.forEach((u) => {
      u.type === "code" && u.code.endsWith("```") && (u.code = u.code.substring(0, u.code.length - 3).trim()), u.type === "text" && (u.text = u.text.trim());
    });
  }), h;
}
function serializeToMarkdown(e) {
  const { steps: h, sourcePath: p, format: o, ...f } = e, u = { ...f };
  let a = "";
  return h && h.length > 0 && (a = h.map((c) => {
    let r = `## ${c.title}

`;
    return c.content.forEach((i) => {
      i.type === "code" ? r += "```" + (i.language || "") + `
` + i.code + "\n```\n\n" : i.type === "list" ? (i.items.forEach((t) => r += `- ${t}
`), r += `
`) : r += i.text + `

`;
    }), r;
  }).join("")), matter.stringify(a, u);
}
ipcMain.handle("get-sources", () => getConfig().sources);
ipcMain.handle("add-source", async () => {
  if (!win) return { success: !1 };
  const e = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  });
  if (!e.canceled && e.filePaths.length > 0) {
    const h = e.filePaths[0], p = getConfig();
    return p.sources.includes(h) || (p.sources.push(h), saveConfig(p)), { success: !0, sources: p.sources };
  }
  return { success: !1 };
});
ipcMain.handle("remove-source", async (e, h) => {
  const p = getConfig();
  return p.sources = p.sources.filter((o) => o !== h), saveConfig(p), { success: !0, sources: p.sources };
});
ipcMain.handle("get-runbooks", async () => {
  try {
    const h = getConfig().sources;
    ensureSourcesExist(h);
    let p = [];
    return h.forEach((o) => {
      fs$1.existsSync(o) && fs$1.readdirSync(o).forEach((u) => {
        if (u.endsWith(".json") || u.endsWith(".md")) {
          const a = parseRunbookFile(path.join(o, u));
          a && p.push(a);
        }
      });
    }), p;
  } catch (e) {
    return console.error("Error reading runbooks:", e), [];
  }
});
ipcMain.handle("save-runbook", async (e, h) => {
  try {
    const p = getConfig(), o = h.sourcePath || p.sources[0];
    fs$1.existsSync(o) || fs$1.mkdirSync(o, { recursive: !0 });
    let f, u;
    if (h.format === "md")
      f = path.join(o, `${h.id}.md`), u = serializeToMarkdown(h);
    else {
      f = path.join(o, `${h.id}.json`);
      const { sourcePath: a, format: c, ...r } = h;
      u = JSON.stringify(r, null, 2);
    }
    return fs$1.writeFileSync(f, u, "utf-8"), { success: !0 };
  } catch (p) {
    return console.error("Error saving runbook:", p), { success: !1, error: p.message };
  }
});
ipcMain.handle("delete-runbook", async (e, h) => {
  try {
    const p = getConfig();
    let o = "";
    if (h.sourcePath) {
      const f = h.format === "md" ? ".md" : ".json";
      o = path.join(h.sourcePath, `${h.id}${f}`);
    } else {
      const f = p.sources;
      for (const u of f) {
        const a = path.join(u, `${h.id}.json`), c = path.join(u, `${h.id}.md`);
        if (fs$1.existsSync(a)) {
          o = a;
          break;
        }
        if (fs$1.existsSync(c)) {
          o = c;
          break;
        }
      }
    }
    return o && fs$1.existsSync(o) ? (fs$1.unlinkSync(o), { success: !0 }) : { success: !1, error: "File not found" };
  } catch (p) {
    return console.error("Error deleting runbook:", p), { success: !1, error: p.message };
  }
});
ipcMain.handle("clone-repository", async (e, h, p = {}) => {
  try {
    if (!h) return { success: !1, error: "URL is required" };
    const { interactive: o } = p, f = h.split("/");
    let u = f[f.length - 1];
    u.endsWith(".git") && (u = u.slice(0, -4)), u = u.replace(/[^a-zA-Z0-9-_]/g, ""), u || (u = `repo-${Date.now()}`);
    const a = path.join(app.getPath("documents"), "QuickRunbooks", "Repos");
    fs$1.existsSync(a) || fs$1.mkdirSync(a, { recursive: !0 });
    const c = path.join(a, u);
    return fs$1.existsSync(c) ? { success: !1, error: `Directory ${u} already exists.` } : new Promise((r) => {
      console.log(`Cloning ${h} into ${c} (Interactive: ${o})`);
      let i = `git clone --depth 1 "${h}" "${c}"`, t = {
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        timeout: 3e4
      };
      o && (i = `start /wait cmd /c "git clone --depth 1 ${h} ${c} & if errorlevel 1 pause"`, t = {
        env: process.env,
        // Allow all envs
        timeout: 0
        // No timeout (user might verify 2FA)
      }), exec(i, t, (n, s, m) => {
        let y = !1;
        if (o)
          fs$1.existsSync(c) && fs$1.readdirSync(c).length > 0 && (y = !0);
        else if (!n)
          y = !0;
        else {
          const E = m || n.message;
          console.error("Clone error:", E), r({ success: !1, error: E.includes("Authentication failed") ? "AUTH_FAILED" : E });
          return;
        }
        if (y) {
          const E = path.join(c, "qrun");
          if (!fs$1.existsSync(E)) {
            try {
              fs$1.rmSync(c, { recursive: !0, force: !0 });
            } catch (q) {
              console.error("Cleanup failed", q);
            }
            r({ success: !1, error: "Repository does not contain a 'qrun' folder." });
            return;
          }
          const g = getConfig();
          g.sources.includes(E) || (g.sources.push(E), saveConfig(g)), r({ success: !0, sources: g.sources });
        } else
          r({ success: !1, error: "Clone failed." });
      });
    });
  } catch (o) {
    return { success: !1, error: o.message };
  }
});
mainExports.autoUpdater.autoDownload = !1;
mainExports.autoUpdater.autoInstallOnAppQuit = !0;
ipcMain.handle("check-for-updates", () => {
  if (win) {
    if (!app.isPackaged) {
      console.log("Skipping update check in dev mode"), win.webContents.send("update-error", "Cannot check for updates in dev mode");
      return;
    }
    mainExports.autoUpdater.checkForUpdates();
  }
});
ipcMain.handle("quit-and-install", () => {
  mainExports.autoUpdater.quitAndInstall();
});
mainExports.autoUpdater.on("checking-for-update", () => {
});
mainExports.autoUpdater.on("update-available", (e) => {
  win?.webContents.send("update-available", e), mainExports.autoUpdater.downloadUpdate();
});
mainExports.autoUpdater.on("update-not-available", (e) => {
});
mainExports.autoUpdater.on("error", (e) => {
  win?.webContents.send("update-error", e.toString());
});
mainExports.autoUpdater.on("download-progress", (e) => {
});
mainExports.autoUpdater.on("update-downloaded", (e) => {
  win?.webContents.send("update-downloaded", e);
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
