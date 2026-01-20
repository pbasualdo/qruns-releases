import require$$1$3, { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
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
      return i(n) ? "generatorfunction" : "function";
    if (p(n)) return "array";
    if (a(n)) return "buffer";
    if (r(n)) return "arguments";
    if (c(n)) return "date";
    if (o(n)) return "error";
    if (u(n)) return "regexp";
    switch (d(n)) {
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
    if (f(n))
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
  function d(t) {
    return typeof t.constructor == "function" ? t.constructor.name : null;
  }
  function p(t) {
    return Array.isArray ? Array.isArray(t) : t instanceof Array;
  }
  function o(t) {
    return t instanceof Error || typeof t.message == "string" && t.constructor && typeof t.constructor.stackTraceLimit == "number";
  }
  function c(t) {
    return t instanceof Date ? !0 : typeof t.toDateString == "function" && typeof t.getDate == "function" && typeof t.setDate == "function";
  }
  function u(t) {
    return t instanceof RegExp ? !0 : typeof t.flags == "string" && typeof t.ignoreCase == "boolean" && typeof t.multiline == "boolean" && typeof t.global == "boolean";
  }
  function i(t, n) {
    return d(t) === "GeneratorFunction";
  }
  function f(t) {
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
  function a(t) {
    return t.constructor && typeof t.constructor.isBuffer == "function" ? t.constructor.isBuffer(t) : !1;
  }
  return kindOf;
}
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var isExtendable, hasRequiredIsExtendable;
function requireIsExtendable() {
  return hasRequiredIsExtendable || (hasRequiredIsExtendable = 1, isExtendable = function(d) {
    return typeof d < "u" && d !== null && (typeof d == "object" || typeof d == "function");
  }), isExtendable;
}
var extendShallow, hasRequiredExtendShallow;
function requireExtendShallow() {
  if (hasRequiredExtendShallow) return extendShallow;
  hasRequiredExtendShallow = 1;
  var e = requireIsExtendable();
  extendShallow = function(c) {
    e(c) || (c = {});
    for (var u = arguments.length, i = 1; i < u; i++) {
      var f = arguments[i];
      e(f) && d(c, f);
    }
    return c;
  };
  function d(o, c) {
    for (var u in c)
      p(c, u) && (o[u] = c[u]);
  }
  function p(o, c) {
    return Object.prototype.hasOwnProperty.call(o, c);
  }
  return extendShallow;
}
var sectionMatter, hasRequiredSectionMatter;
function requireSectionMatter() {
  if (hasRequiredSectionMatter) return sectionMatter;
  hasRequiredSectionMatter = 1;
  var e = requireKindOf(), d = requireExtendShallow();
  sectionMatter = function(r, a) {
    typeof a == "function" && (a = { parse: a });
    var t = o(r), n = { section_delimiter: "---", parse: i }, s = d({}, n, a), m = s.section_delimiter, y = t.content.split(/\r?\n/), E = null, g = u(), q = [], C = [];
    function P(w) {
      t.content = w, E = [], q = [];
    }
    function $(w) {
      C.length && (g.key = c(C[0], m), g.content = w, s.parse(g, E), E.push(g), g = u(), q = [], C = []);
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
  function p(r, a) {
    return !(r.slice(0, a.length) !== a || r.charAt(a.length + 1) === a.slice(-1));
  }
  function o(r) {
    if (e(r) !== "object" && (r = { content: r }), typeof r.content != "string" && !f(r.content))
      throw new TypeError("expected a buffer or string");
    return r.content = r.content.toString(), r.sections = [], r;
  }
  function c(r, a) {
    return r ? r.slice(a.length).trim() : "";
  }
  function u() {
    return { key: "", data: "", content: "" };
  }
  function i(r) {
    return r;
  }
  function f(r) {
    return r && r.constructor && typeof r.constructor.isBuffer == "function" ? r.constructor.isBuffer(r) : !1;
  }
  return sectionMatter;
}
var engines = { exports: {} }, jsYaml$2 = {}, loader$1 = {}, common$2 = {}, hasRequiredCommon$2;
function requireCommon$2() {
  if (hasRequiredCommon$2) return common$2;
  hasRequiredCommon$2 = 1;
  function e(i) {
    return typeof i > "u" || i === null;
  }
  function d(i) {
    return typeof i == "object" && i !== null;
  }
  function p(i) {
    return Array.isArray(i) ? i : e(i) ? [] : [i];
  }
  function o(i, f) {
    var r, a, t, n;
    if (f)
      for (n = Object.keys(f), r = 0, a = n.length; r < a; r += 1)
        t = n[r], i[t] = f[t];
    return i;
  }
  function c(i, f) {
    var r = "", a;
    for (a = 0; a < f; a += 1)
      r += i;
    return r;
  }
  function u(i) {
    return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
  }
  return common$2.isNothing = e, common$2.isObject = d, common$2.toArray = p, common$2.repeat = c, common$2.isNegativeZero = u, common$2.extend = o, common$2;
}
var exception$1, hasRequiredException$1;
function requireException$1() {
  if (hasRequiredException$1) return exception$1;
  hasRequiredException$1 = 1;
  function e(d, p) {
    Error.call(this), this.name = "YAMLException", this.reason = d, this.mark = p, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
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
  function d(p, o, c, u, i) {
    this.name = p, this.buffer = o, this.position = c, this.line = u, this.column = i;
  }
  return d.prototype.getSnippet = function(o, c) {
    var u, i, f, r, a;
    if (!this.buffer) return null;
    for (o = o || 4, c = c || 75, u = "", i = this.position; i > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(i - 1)) === -1; )
      if (i -= 1, this.position - i > c / 2 - 1) {
        u = " ... ", i += 5;
        break;
      }
    for (f = "", r = this.position; r < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(r)) === -1; )
      if (r += 1, r - this.position > c / 2 - 1) {
        f = " ... ", r -= 5;
        break;
      }
    return a = this.buffer.slice(i, r), e.repeat(" ", o) + u + a + f + `
` + e.repeat(" ", o + this.position - i + u.length) + "^";
  }, d.prototype.toString = function(o) {
    var c, u = "";
    return this.name && (u += 'in "' + this.name + '" '), u += "at line " + (this.line + 1) + ", column " + (this.column + 1), o || (c = this.getSnippet(), c && (u += `:
` + c)), u;
  }, mark = d, mark;
}
var type$1, hasRequiredType$1;
function requireType$1() {
  if (hasRequiredType$1) return type$1;
  hasRequiredType$1 = 1;
  var e = requireException$1(), d = [
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
    var i = {};
    return u !== null && Object.keys(u).forEach(function(f) {
      u[f].forEach(function(r) {
        i[String(r)] = f;
      });
    }), i;
  }
  function c(u, i) {
    if (i = i || {}, Object.keys(i).forEach(function(f) {
      if (d.indexOf(f) === -1)
        throw new e('Unknown option "' + f + '" is met in definition of "' + u + '" YAML type.');
    }), this.tag = u, this.kind = i.kind || null, this.resolve = i.resolve || function() {
      return !0;
    }, this.construct = i.construct || function(f) {
      return f;
    }, this.instanceOf = i.instanceOf || null, this.predicate = i.predicate || null, this.represent = i.represent || null, this.defaultStyle = i.defaultStyle || null, this.styleAliases = o(i.styleAliases || null), p.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + u + '" YAML type.');
  }
  return type$1 = c, type$1;
}
var schema$1, hasRequiredSchema$1;
function requireSchema$1() {
  if (hasRequiredSchema$1) return schema$1;
  hasRequiredSchema$1 = 1;
  var e = requireCommon$2(), d = requireException$1(), p = requireType$1();
  function o(i, f, r) {
    var a = [];
    return i.include.forEach(function(t) {
      r = o(t, f, r);
    }), i[f].forEach(function(t) {
      r.forEach(function(n, s) {
        n.tag === t.tag && n.kind === t.kind && a.push(s);
      }), r.push(t);
    }), r.filter(function(t, n) {
      return a.indexOf(n) === -1;
    });
  }
  function c() {
    var i = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {}
    }, f, r;
    function a(t) {
      i[t.kind][t.tag] = i.fallback[t.tag] = t;
    }
    for (f = 0, r = arguments.length; f < r; f += 1)
      arguments[f].forEach(a);
    return i;
  }
  function u(i) {
    this.include = i.include || [], this.implicit = i.implicit || [], this.explicit = i.explicit || [], this.implicit.forEach(function(f) {
      if (f.loadKind && f.loadKind !== "scalar")
        throw new d("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }), this.compiledImplicit = o(this, "implicit", []), this.compiledExplicit = o(this, "explicit", []), this.compiledTypeMap = c(this.compiledImplicit, this.compiledExplicit);
  }
  return u.DEFAULT = null, u.create = function() {
    var f, r;
    switch (arguments.length) {
      case 1:
        f = u.DEFAULT, r = arguments[0];
        break;
      case 2:
        f = arguments[0], r = arguments[1];
        break;
      default:
        throw new d("Wrong number of arguments for Schema.create function");
    }
    if (f = e.toArray(f), r = e.toArray(r), !f.every(function(a) {
      return a instanceof u;
    }))
      throw new d("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
    if (!r.every(function(a) {
      return a instanceof p;
    }))
      throw new d("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    return new u({
      include: f,
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
    construct: function(d) {
      return d !== null ? d : "";
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
    construct: function(d) {
      return d !== null ? d : [];
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
    construct: function(d) {
      return d !== null ? d : {};
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
  function d(c) {
    if (c === null) return !0;
    var u = c.length;
    return u === 1 && c === "~" || u === 4 && (c === "null" || c === "Null" || c === "NULL");
  }
  function p() {
    return null;
  }
  function o(c) {
    return c === null;
  }
  return _null$1 = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: d,
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
  function d(c) {
    if (c === null) return !1;
    var u = c.length;
    return u === 4 && (c === "true" || c === "True" || c === "TRUE") || u === 5 && (c === "false" || c === "False" || c === "FALSE");
  }
  function p(c) {
    return c === "true" || c === "True" || c === "TRUE";
  }
  function o(c) {
    return Object.prototype.toString.call(c) === "[object Boolean]";
  }
  return bool$1 = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: d,
    construct: p,
    predicate: o,
    represent: {
      lowercase: function(c) {
        return c ? "true" : "false";
      },
      uppercase: function(c) {
        return c ? "TRUE" : "FALSE";
      },
      camelcase: function(c) {
        return c ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool$1;
}
var int$1, hasRequiredInt$1;
function requireInt$1() {
  if (hasRequiredInt$1) return int$1;
  hasRequiredInt$1 = 1;
  var e = requireCommon$2(), d = requireType$1();
  function p(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function o(r) {
    return 48 <= r && r <= 55;
  }
  function c(r) {
    return 48 <= r && r <= 57;
  }
  function u(r) {
    if (r === null) return !1;
    var a = r.length, t = 0, n = !1, s;
    if (!a) return !1;
    if (s = r[t], (s === "-" || s === "+") && (s = r[++t]), s === "0") {
      if (t + 1 === a) return !0;
      if (s = r[++t], s === "b") {
        for (t++; t < a; t++)
          if (s = r[t], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "x") {
        for (t++; t < a; t++)
          if (s = r[t], s !== "_") {
            if (!p(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      for (; t < a; t++)
        if (s = r[t], s !== "_") {
          if (!o(r.charCodeAt(t))) return !1;
          n = !0;
        }
      return n && s !== "_";
    }
    if (s === "_") return !1;
    for (; t < a; t++)
      if (s = r[t], s !== "_") {
        if (s === ":") break;
        if (!c(r.charCodeAt(t)))
          return !1;
        n = !0;
      }
    return !n || s === "_" ? !1 : s !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(r.slice(t));
  }
  function i(r) {
    var a = r, t = 1, n, s, m = [];
    return a.indexOf("_") !== -1 && (a = a.replace(/_/g, "")), n = a[0], (n === "-" || n === "+") && (n === "-" && (t = -1), a = a.slice(1), n = a[0]), a === "0" ? 0 : n === "0" ? a[1] === "b" ? t * parseInt(a.slice(2), 2) : a[1] === "x" ? t * parseInt(a, 16) : t * parseInt(a, 8) : a.indexOf(":") !== -1 ? (a.split(":").forEach(function(y) {
      m.unshift(parseInt(y, 10));
    }), a = 0, s = 1, m.forEach(function(y) {
      a += y * s, s *= 60;
    }), t * a) : t * parseInt(a, 10);
  }
  function f(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !e.isNegativeZero(r);
  }
  return int$1 = new d("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: u,
    construct: i,
    predicate: f,
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
  var e = requireCommon$2(), d = requireType$1(), p = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function o(r) {
    return !(r === null || !p.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function c(r) {
    var a, t, n, s;
    return a = r.replace(/_/g, "").toLowerCase(), t = a[0] === "-" ? -1 : 1, s = [], "+-".indexOf(a[0]) >= 0 && (a = a.slice(1)), a === ".inf" ? t === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : a === ".nan" ? NaN : a.indexOf(":") >= 0 ? (a.split(":").forEach(function(m) {
      s.unshift(parseFloat(m, 10));
    }), a = 0, n = 1, s.forEach(function(m) {
      a += m * n, n *= 60;
    }), t * a) : t * parseFloat(a, 10);
  }
  var u = /^[-+]?[0-9]+e/;
  function i(r, a) {
    var t;
    if (isNaN(r))
      switch (a) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (a) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (a) {
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
  function f(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || e.isNegativeZero(r));
  }
  return float$1 = new d("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: o,
    construct: c,
    predicate: f,
    represent: i,
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
  var e = requireType$1(), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), p = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function o(i) {
    return i === null ? !1 : d.exec(i) !== null || p.exec(i) !== null;
  }
  function c(i) {
    var f, r, a, t, n, s, m, y = 0, E = null, g, q, C;
    if (f = d.exec(i), f === null && (f = p.exec(i)), f === null) throw new Error("Date resolve error");
    if (r = +f[1], a = +f[2] - 1, t = +f[3], !f[4])
      return new Date(Date.UTC(r, a, t));
    if (n = +f[4], s = +f[5], m = +f[6], f[7]) {
      for (y = f[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return f[9] && (g = +f[10], q = +(f[11] || 0), E = (g * 60 + q) * 6e4, f[9] === "-" && (E = -E)), C = new Date(Date.UTC(r, a, t, n, s, m, y)), E && C.setTime(C.getTime() - E), C;
  }
  function u(i) {
    return i.toISOString();
  }
  return timestamp$1 = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: o,
    construct: c,
    instanceOf: Date,
    represent: u
  }), timestamp$1;
}
var merge$1, hasRequiredMerge$1;
function requireMerge$1() {
  if (hasRequiredMerge$1) return merge$1;
  hasRequiredMerge$1 = 1;
  var e = requireType$1();
  function d(p) {
    return p === "<<" || p === null;
  }
  return merge$1 = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: d
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
    var d = commonjsRequire;
    e = d("buffer").Buffer;
  } catch {
  }
  var p = requireType$1(), o = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function c(r) {
    if (r === null) return !1;
    var a, t, n = 0, s = r.length, m = o;
    for (t = 0; t < s; t++)
      if (a = m.indexOf(r.charAt(t)), !(a > 64)) {
        if (a < 0) return !1;
        n += 6;
      }
    return n % 8 === 0;
  }
  function u(r) {
    var a, t, n = r.replace(/[\r\n=]/g, ""), s = n.length, m = o, y = 0, E = [];
    for (a = 0; a < s; a++)
      a % 4 === 0 && a && (E.push(y >> 16 & 255), E.push(y >> 8 & 255), E.push(y & 255)), y = y << 6 | m.indexOf(n.charAt(a));
    return t = s % 4 * 6, t === 0 ? (E.push(y >> 16 & 255), E.push(y >> 8 & 255), E.push(y & 255)) : t === 18 ? (E.push(y >> 10 & 255), E.push(y >> 2 & 255)) : t === 12 && E.push(y >> 4 & 255), e ? e.from ? e.from(E) : new e(E) : E;
  }
  function i(r) {
    var a = "", t = 0, n, s, m = r.length, y = o;
    for (n = 0; n < m; n++)
      n % 3 === 0 && n && (a += y[t >> 18 & 63], a += y[t >> 12 & 63], a += y[t >> 6 & 63], a += y[t & 63]), t = (t << 8) + r[n];
    return s = m % 3, s === 0 ? (a += y[t >> 18 & 63], a += y[t >> 12 & 63], a += y[t >> 6 & 63], a += y[t & 63]) : s === 2 ? (a += y[t >> 10 & 63], a += y[t >> 4 & 63], a += y[t << 2 & 63], a += y[64]) : s === 1 && (a += y[t >> 2 & 63], a += y[t << 4 & 63], a += y[64], a += y[64]), a;
  }
  function f(r) {
    return e && e.isBuffer(r);
  }
  return binary$1 = new p("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: c,
    construct: u,
    predicate: f,
    represent: i
  }), binary$1;
}
var omap$1, hasRequiredOmap$1;
function requireOmap$1() {
  if (hasRequiredOmap$1) return omap$1;
  hasRequiredOmap$1 = 1;
  var e = requireType$1(), d = Object.prototype.hasOwnProperty, p = Object.prototype.toString;
  function o(u) {
    if (u === null) return !0;
    var i = [], f, r, a, t, n, s = u;
    for (f = 0, r = s.length; f < r; f += 1) {
      if (a = s[f], n = !1, p.call(a) !== "[object Object]") return !1;
      for (t in a)
        if (d.call(a, t))
          if (!n) n = !0;
          else return !1;
      if (!n) return !1;
      if (i.indexOf(t) === -1) i.push(t);
      else return !1;
    }
    return !0;
  }
  function c(u) {
    return u !== null ? u : [];
  }
  return omap$1 = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: o,
    construct: c
  }), omap$1;
}
var pairs$1, hasRequiredPairs$1;
function requirePairs$1() {
  if (hasRequiredPairs$1) return pairs$1;
  hasRequiredPairs$1 = 1;
  var e = requireType$1(), d = Object.prototype.toString;
  function p(c) {
    if (c === null) return !0;
    var u, i, f, r, a, t = c;
    for (a = new Array(t.length), u = 0, i = t.length; u < i; u += 1) {
      if (f = t[u], d.call(f) !== "[object Object]" || (r = Object.keys(f), r.length !== 1)) return !1;
      a[u] = [r[0], f[r[0]]];
    }
    return !0;
  }
  function o(c) {
    if (c === null) return [];
    var u, i, f, r, a, t = c;
    for (a = new Array(t.length), u = 0, i = t.length; u < i; u += 1)
      f = t[u], r = Object.keys(f), a[u] = [r[0], f[r[0]]];
    return a;
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
  var e = requireType$1(), d = Object.prototype.hasOwnProperty;
  function p(c) {
    if (c === null) return !0;
    var u, i = c;
    for (u in i)
      if (d.call(i, u) && i[u] !== null)
        return !1;
    return !0;
  }
  function o(c) {
    return c !== null ? c : {};
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
  function d() {
    return !0;
  }
  function p() {
  }
  function o() {
    return "";
  }
  function c(u) {
    return typeof u > "u";
  }
  return _undefined = new e("tag:yaml.org,2002:js/undefined", {
    kind: "scalar",
    resolve: d,
    construct: p,
    predicate: c,
    represent: o
  }), _undefined;
}
var regexp, hasRequiredRegexp;
function requireRegexp() {
  if (hasRequiredRegexp) return regexp;
  hasRequiredRegexp = 1;
  var e = requireType$1();
  function d(u) {
    if (u === null || u.length === 0) return !1;
    var i = u, f = /\/([gim]*)$/.exec(u), r = "";
    return !(i[0] === "/" && (f && (r = f[1]), r.length > 3 || i[i.length - r.length - 1] !== "/"));
  }
  function p(u) {
    var i = u, f = /\/([gim]*)$/.exec(u), r = "";
    return i[0] === "/" && (f && (r = f[1]), i = i.slice(1, i.length - r.length - 1)), new RegExp(i, r);
  }
  function o(u) {
    var i = "/" + u.source + "/";
    return u.global && (i += "g"), u.multiline && (i += "m"), u.ignoreCase && (i += "i"), i;
  }
  function c(u) {
    return Object.prototype.toString.call(u) === "[object RegExp]";
  }
  return regexp = new e("tag:yaml.org,2002:js/regexp", {
    kind: "scalar",
    resolve: d,
    construct: p,
    predicate: c,
    represent: o
  }), regexp;
}
var _function, hasRequired_function;
function require_function() {
  if (hasRequired_function) return _function;
  hasRequired_function = 1;
  var e;
  try {
    var d = commonjsRequire;
    e = d("esprima");
  } catch {
    typeof window < "u" && (e = window.esprima);
  }
  var p = requireType$1();
  function o(f) {
    if (f === null) return !1;
    try {
      var r = "(" + f + ")", a = e.parse(r, { range: !0 });
      return !(a.type !== "Program" || a.body.length !== 1 || a.body[0].type !== "ExpressionStatement" || a.body[0].expression.type !== "ArrowFunctionExpression" && a.body[0].expression.type !== "FunctionExpression");
    } catch {
      return !1;
    }
  }
  function c(f) {
    var r = "(" + f + ")", a = e.parse(r, { range: !0 }), t = [], n;
    if (a.type !== "Program" || a.body.length !== 1 || a.body[0].type !== "ExpressionStatement" || a.body[0].expression.type !== "ArrowFunctionExpression" && a.body[0].expression.type !== "FunctionExpression")
      throw new Error("Failed to resolve function");
    return a.body[0].expression.params.forEach(function(s) {
      t.push(s.name);
    }), n = a.body[0].expression.body.range, a.body[0].expression.body.type === "BlockStatement" ? new Function(t, r.slice(n[0] + 1, n[1] - 1)) : new Function(t, "return " + r.slice(n[0], n[1]));
  }
  function u(f) {
    return f.toString();
  }
  function i(f) {
    return Object.prototype.toString.call(f) === "[object Function]";
  }
  return _function = new p("tag:yaml.org,2002:js/function", {
    kind: "scalar",
    resolve: o,
    construct: c,
    predicate: i,
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
  var e = requireCommon$2(), d = requireException$1(), p = requireMark(), o = requireDefault_safe(), c = requireDefault_full(), u = Object.prototype.hasOwnProperty, i = 1, f = 2, r = 3, a = 4, t = 1, n = 2, s = 3, m = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, y = /[\x85\u2028\u2029]/, E = /[,\[\]\{\}]/, g = /^(?:!|!!|![a-z\-]+!)$/i, q = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
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
  function w(l) {
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
    this.input = l, this.filename = D.filename || null, this.schema = D.schema || c, this.onWarning = D.onWarning || null, this.legacy = D.legacy || !1, this.json = D.json || !1, this.listener = D.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = l.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
  }
  function L(l, D) {
    return new d(
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
      var W, _, M;
      D.version !== null && K(D, "duplication of %YAML directive"), Q.length !== 1 && K(D, "YAML directive accepts exactly one argument"), W = /^([0-9]+)\.([0-9]+)$/.exec(Q[0]), W === null && K(D, "ill-formed argument of the YAML directive"), _ = parseInt(W[1], 10), M = parseInt(W[2], 10), _ !== 1 && K(D, "unacceptable YAML version of the document"), D.version = Q[0], D.checkLineBreaks = M < 2, M !== 1 && M !== 2 && ue(D, "unsupported YAML version of the document");
    },
    TAG: function(D, B, Q) {
      var W, _;
      Q.length !== 2 && K(D, "TAG directive accepts exactly two arguments"), W = Q[0], _ = Q[1], g.test(W) || K(D, "ill-formed tag handle (first argument) of the TAG directive"), u.call(D.tagMap, W) && K(D, 'there is a previously declared suffix for "' + W + '" tag handle'), q.test(_) || K(D, "ill-formed tag prefix (second argument) of the TAG directive"), D.tagMap[W] = _;
    }
  };
  function ge(l, D, B, Q) {
    var W, _, M, Z;
    if (D < B) {
      if (Z = l.input.slice(D, B), Q)
        for (W = 0, _ = Z.length; W < _; W += 1)
          M = Z.charCodeAt(W), M === 9 || 32 <= M && M <= 1114111 || K(l, "expected valid JSON character");
      else m.test(Z) && K(l, "the stream contains non-printable characters");
      l.result += Z;
    }
  }
  function de(l, D, B, Q) {
    var W, _, M, Z;
    for (e.isObject(B) || K(l, "cannot merge mappings; the provided source object is unacceptable"), W = Object.keys(B), M = 0, Z = W.length; M < Z; M += 1)
      _ = W[M], u.call(D, _) || (H(D, _, B[_]), Q[_] = !0);
  }
  function we(l, D, B, Q, W, _, M, Z) {
    var V, v;
    if (Array.isArray(W))
      for (W = Array.prototype.slice.call(W), V = 0, v = W.length; V < v; V += 1)
        Array.isArray(W[V]) && K(l, "nested arrays are not supported inside keys"), typeof W == "object" && C(W[V]) === "[object Object]" && (W[V] = "[object Object]");
    if (typeof W == "object" && C(W) === "[object Object]" && (W = "[object Object]"), W = String(W), D === null && (D = {}), Q === "tag:yaml.org,2002:merge")
      if (Array.isArray(_))
        for (V = 0, v = _.length; V < v; V += 1)
          de(l, D, _[V], B);
      else
        de(l, D, _, B);
    else
      !l.json && !u.call(B, W) && u.call(D, W) && (l.line = M || l.line, l.position = Z || l.position, K(l, "duplicated mapping key")), H(D, W, _), delete B[W];
    return D;
  }
  function _e(l) {
    var D;
    D = l.input.charCodeAt(l.position), D === 10 ? l.position++ : D === 13 ? (l.position++, l.input.charCodeAt(l.position) === 10 && l.position++) : K(l, "a line break is expected"), l.line += 1, l.lineStart = l.position;
  }
  function ie(l, D, B) {
    for (var Q = 0, W = l.input.charCodeAt(l.position); W !== 0; ) {
      for (; $(W); )
        W = l.input.charCodeAt(++l.position);
      if (D && W === 35)
        do
          W = l.input.charCodeAt(++l.position);
        while (W !== 10 && W !== 13 && W !== 0);
      if (P(W))
        for (_e(l), W = l.input.charCodeAt(l.position), Q++, l.lineIndent = 0; W === 32; )
          l.lineIndent++, W = l.input.charCodeAt(++l.position);
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
    var Q, W, _, M, Z, V, v, O, F = l.kind, G = l.result, j;
    if (j = l.input.charCodeAt(l.position), b(j) || I(j) || j === 35 || j === 38 || j === 42 || j === 33 || j === 124 || j === 62 || j === 39 || j === 34 || j === 37 || j === 64 || j === 96 || (j === 63 || j === 45) && (W = l.input.charCodeAt(l.position + 1), b(W) || B && I(W)))
      return !1;
    for (l.kind = "scalar", l.result = "", _ = M = l.position, Z = !1; j !== 0; ) {
      if (j === 58) {
        if (W = l.input.charCodeAt(l.position + 1), b(W) || B && I(W))
          break;
      } else if (j === 35) {
        if (Q = l.input.charCodeAt(l.position - 1), b(Q))
          break;
      } else {
        if (l.position === l.lineStart && Ee(l) || B && I(j))
          break;
        if (P(j))
          if (V = l.line, v = l.lineStart, O = l.lineIndent, ie(l, !1, -1), l.lineIndent >= D) {
            Z = !0, j = l.input.charCodeAt(l.position);
            continue;
          } else {
            l.position = M, l.line = V, l.lineStart = v, l.lineIndent = O;
            break;
          }
      }
      Z && (ge(l, _, M, !1), S(l, l.line - V), _ = M = l.position, Z = !1), $(j) || (M = l.position + 1), j = l.input.charCodeAt(++l.position);
    }
    return ge(l, _, M, !1), l.result ? !0 : (l.kind = F, l.result = G, !1);
  }
  function te(l, D) {
    var B, Q, W;
    if (B = l.input.charCodeAt(l.position), B !== 39)
      return !1;
    for (l.kind = "scalar", l.result = "", l.position++, Q = W = l.position; (B = l.input.charCodeAt(l.position)) !== 0; )
      if (B === 39)
        if (ge(l, Q, l.position, !0), B = l.input.charCodeAt(++l.position), B === 39)
          Q = l.position, l.position++, W = l.position;
        else
          return !0;
      else P(B) ? (ge(l, Q, W, !0), S(l, ie(l, !1, D)), Q = W = l.position) : l.position === l.lineStart && Ee(l) ? K(l, "unexpected end of the document within a single quoted scalar") : (l.position++, W = l.position);
    K(l, "unexpected end of the stream within a single quoted scalar");
  }
  function k(l, D) {
    var B, Q, W, _, M, Z;
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
          for (W = M, _ = 0; W > 0; W--)
            Z = l.input.charCodeAt(++l.position), (M = T(Z)) >= 0 ? _ = (_ << 4) + M : K(l, "expected hexadecimal character");
          l.result += J(_), l.position++;
        } else
          K(l, "unknown escape sequence");
        B = Q = l.position;
      } else P(Z) ? (ge(l, B, Q, !0), S(l, ie(l, !1, D)), B = Q = l.position) : l.position === l.lineStart && Ee(l) ? K(l, "unexpected end of the document within a double quoted scalar") : (l.position++, Q = l.position);
    }
    K(l, "unexpected end of the stream within a double quoted scalar");
  }
  function pe(l, D) {
    var B = !0, Q, W = l.tag, _, M = l.anchor, Z, V, v, O, F, G = {}, j, ae, oe, le;
    if (le = l.input.charCodeAt(l.position), le === 91)
      V = 93, F = !1, _ = [];
    else if (le === 123)
      V = 125, F = !0, _ = {};
    else
      return !1;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = _), le = l.input.charCodeAt(++l.position); le !== 0; ) {
      if (ie(l, !0, D), le = l.input.charCodeAt(l.position), le === V)
        return l.position++, l.tag = W, l.anchor = M, l.kind = F ? "mapping" : "sequence", l.result = _, !0;
      B || K(l, "missed comma between flow collection entries"), ae = j = oe = null, v = O = !1, le === 63 && (Z = l.input.charCodeAt(l.position + 1), b(Z) && (v = O = !0, l.position++, ie(l, !0, D))), Q = l.line, xe(l, D, i, !1, !0), ae = l.tag, j = l.result, ie(l, !0, D), le = l.input.charCodeAt(l.position), (O || l.line === Q) && le === 58 && (v = !0, le = l.input.charCodeAt(++l.position), ie(l, !0, D), xe(l, D, i, !1, !0), oe = l.result), F ? we(l, _, G, ae, j, oe) : v ? _.push(we(l, null, G, ae, j, oe)) : _.push(j), ie(l, !0, D), le = l.input.charCodeAt(l.position), le === 44 ? (B = !0, le = l.input.charCodeAt(++l.position)) : B = !1;
    }
    K(l, "unexpected end of the stream within a flow collection");
  }
  function ye(l, D) {
    var B, Q, W = t, _ = !1, M = !1, Z = D, V = 0, v = !1, O, F;
    if (F = l.input.charCodeAt(l.position), F === 124)
      Q = !1;
    else if (F === 62)
      Q = !0;
    else
      return !1;
    for (l.kind = "scalar", l.result = ""; F !== 0; )
      if (F = l.input.charCodeAt(++l.position), F === 43 || F === 45)
        t === W ? W = F === 43 ? s : n : K(l, "repeat of a chomping mode identifier");
      else if ((O = w(F)) >= 0)
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
      for (_e(l), l.lineIndent = 0, F = l.input.charCodeAt(l.position); (!M || l.lineIndent < Z) && F === 32; )
        l.lineIndent++, F = l.input.charCodeAt(++l.position);
      if (!M && l.lineIndent > Z && (Z = l.lineIndent), P(F)) {
        V++;
        continue;
      }
      if (l.lineIndent < Z) {
        W === s ? l.result += e.repeat(`
`, _ ? 1 + V : V) : W === t && _ && (l.result += `
`);
        break;
      }
      for (Q ? $(F) ? (v = !0, l.result += e.repeat(`
`, _ ? 1 + V : V)) : v ? (v = !1, l.result += e.repeat(`
`, V + 1)) : V === 0 ? _ && (l.result += " ") : l.result += e.repeat(`
`, V) : l.result += e.repeat(`
`, _ ? 1 + V : V), _ = !0, M = !0, V = 0, B = l.position; !P(F) && F !== 0; )
        F = l.input.charCodeAt(++l.position);
      ge(l, B, l.position, !1);
    }
    return !0;
  }
  function ve(l, D) {
    var B, Q = l.tag, W = l.anchor, _ = [], M, Z = !1, V;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = _), V = l.input.charCodeAt(l.position); V !== 0 && !(V !== 45 || (M = l.input.charCodeAt(l.position + 1), !b(M))); ) {
      if (Z = !0, l.position++, ie(l, !0, -1) && l.lineIndent <= D) {
        _.push(null), V = l.input.charCodeAt(l.position);
        continue;
      }
      if (B = l.line, xe(l, D, r, !1, !0), _.push(l.result), ie(l, !0, -1), V = l.input.charCodeAt(l.position), (l.line === B || l.lineIndent > D) && V !== 0)
        K(l, "bad indentation of a sequence entry");
      else if (l.lineIndent < D)
        break;
    }
    return Z ? (l.tag = Q, l.anchor = W, l.kind = "sequence", l.result = _, !0) : !1;
  }
  function qe(l, D, B) {
    var Q, W, _, M, Z = l.tag, V = l.anchor, v = {}, O = {}, F = null, G = null, j = null, ae = !1, oe = !1, le;
    for (l.anchor !== null && (l.anchorMap[l.anchor] = v), le = l.input.charCodeAt(l.position); le !== 0; ) {
      if (Q = l.input.charCodeAt(l.position + 1), _ = l.line, M = l.position, (le === 63 || le === 58) && b(Q))
        le === 63 ? (ae && (we(l, v, O, F, G, null), F = G = j = null), oe = !0, ae = !0, W = !0) : ae ? (ae = !1, W = !0) : K(l, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), l.position += 1, le = Q;
      else if (xe(l, B, f, !1, !0))
        if (l.line === _) {
          for (le = l.input.charCodeAt(l.position); $(le); )
            le = l.input.charCodeAt(++l.position);
          if (le === 58)
            le = l.input.charCodeAt(++l.position), b(le) || K(l, "a whitespace character is expected after the key-value separator within a block mapping"), ae && (we(l, v, O, F, G, null), F = G = j = null), oe = !0, ae = !1, W = !1, F = l.tag, G = l.result;
          else if (oe)
            K(l, "can not read an implicit mapping pair; a colon is missed");
          else
            return l.tag = Z, l.anchor = V, !0;
        } else if (oe)
          K(l, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return l.tag = Z, l.anchor = V, !0;
      else
        break;
      if ((l.line === _ || l.lineIndent > D) && (xe(l, D, a, !0, W) && (ae ? G = l.result : j = l.result), ae || (we(l, v, O, F, G, j, _, M), F = G = j = null), ie(l, !0, -1), le = l.input.charCodeAt(l.position)), l.lineIndent > D && le !== 0)
        K(l, "bad indentation of a mapping entry");
      else if (l.lineIndent < D)
        break;
    }
    return ae && we(l, v, O, F, G, null), oe && (l.tag = Z, l.anchor = V, l.kind = "mapping", l.result = v), oe;
  }
  function Re(l) {
    var D, B = !1, Q = !1, W, _, M;
    if (M = l.input.charCodeAt(l.position), M !== 33) return !1;
    if (l.tag !== null && K(l, "duplication of a tag property"), M = l.input.charCodeAt(++l.position), M === 60 ? (B = !0, M = l.input.charCodeAt(++l.position)) : M === 33 ? (Q = !0, W = "!!", M = l.input.charCodeAt(++l.position)) : W = "!", D = l.position, B) {
      do
        M = l.input.charCodeAt(++l.position);
      while (M !== 0 && M !== 62);
      l.position < l.length ? (_ = l.input.slice(D, l.position), M = l.input.charCodeAt(++l.position)) : K(l, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; M !== 0 && !b(M); )
        M === 33 && (Q ? K(l, "tag suffix cannot contain exclamation marks") : (W = l.input.slice(D - 1, l.position + 1), g.test(W) || K(l, "named tag handle cannot contain such characters"), Q = !0, D = l.position + 1)), M = l.input.charCodeAt(++l.position);
      _ = l.input.slice(D, l.position), E.test(_) && K(l, "tag suffix cannot contain flow indicator characters");
    }
    return _ && !q.test(_) && K(l, "tag name cannot contain such characters: " + _), B ? l.tag = _ : u.call(l.tagMap, W) ? l.tag = l.tagMap[W] + _ : W === "!" ? l.tag = "!" + _ : W === "!!" ? l.tag = "tag:yaml.org,2002:" + _ : K(l, 'undeclared tag handle "' + W + '"'), !0;
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
  function xe(l, D, B, Q, W) {
    var _, M, Z, V = 1, v = !1, O = !1, F, G, j, ae, oe;
    if (l.listener !== null && l.listener("open", l), l.tag = null, l.anchor = null, l.kind = null, l.result = null, _ = M = Z = a === B || r === B, Q && ie(l, !0, -1) && (v = !0, l.lineIndent > D ? V = 1 : l.lineIndent === D ? V = 0 : l.lineIndent < D && (V = -1)), V === 1)
      for (; Re(l) || Ie(l); )
        ie(l, !0, -1) ? (v = !0, Z = _, l.lineIndent > D ? V = 1 : l.lineIndent === D ? V = 0 : l.lineIndent < D && (V = -1)) : Z = !1;
    if (Z && (Z = v || W), (V === 1 || a === B) && (i === B || f === B ? ae = D : ae = D + 1, oe = l.position - l.lineStart, V === 1 ? Z && (ve(l, oe) || qe(l, oe, ae)) || pe(l, ae) ? O = !0 : (M && ye(l, ae) || te(l, ae) || k(l, ae) ? O = !0 : Ce(l) ? (O = !0, (l.tag !== null || l.anchor !== null) && K(l, "alias node should not have any properties")) : R(l, ae, i === B) && (O = !0, l.tag === null && (l.tag = "?")), l.anchor !== null && (l.anchorMap[l.anchor] = l.result)) : V === 0 && (O = Z && ve(l, oe))), l.tag !== null && l.tag !== "!")
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
    var D = l.position, B, Q, W, _ = !1, M;
    for (l.version = null, l.checkLineBreaks = l.legacy, l.tagMap = {}, l.anchorMap = {}; (M = l.input.charCodeAt(l.position)) !== 0 && (ie(l, !0, -1), M = l.input.charCodeAt(l.position), !(l.lineIndent > 0 || M !== 37)); ) {
      for (_ = !0, M = l.input.charCodeAt(++l.position), B = l.position; M !== 0 && !b(M); )
        M = l.input.charCodeAt(++l.position);
      for (Q = l.input.slice(B, l.position), W = [], Q.length < 1 && K(l, "directive name must not be less than one character in length"); M !== 0; ) {
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
        W.push(l.input.slice(B, l.position));
      }
      M !== 0 && _e(l), u.call(fe, Q) ? fe[Q](l, Q, W) : ue(l, 'unknown document directive "' + Q + '"');
    }
    if (ie(l, !0, -1), l.lineIndent === 0 && l.input.charCodeAt(l.position) === 45 && l.input.charCodeAt(l.position + 1) === 45 && l.input.charCodeAt(l.position + 2) === 45 ? (l.position += 3, ie(l, !0, -1)) : _ && K(l, "directives end mark is expected"), xe(l, l.lineIndent - 1, a, !1, !0), ie(l, !0, -1), l.checkLineBreaks && y.test(l.input.slice(D, l.position)) && ue(l, "non-ASCII line breaks are interpreted as content"), l.documents.push(l.result), l.position === l.lineStart && Ee(l)) {
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
    for (var W = 0, _ = Q.length; W < _; W += 1)
      D(Q[W]);
  }
  function h(l, D) {
    var B = ke(l, D);
    if (B.length !== 0) {
      if (B.length === 1)
        return B[0];
      throw new d("expected a single document in the stream, but found more");
    }
  }
  function ee(l, D, B) {
    return typeof D == "object" && D !== null && typeof B > "u" && (B = D, D = null), Ue(l, D, e.extend({ schema: o }, B));
  }
  function se(l, D) {
    return h(l, e.extend({ schema: o }, D));
  }
  return loader$1.loadAll = Ue, loader$1.load = h, loader$1.safeLoadAll = ee, loader$1.safeLoad = se, loader$1;
}
var dumper$1 = {}, hasRequiredDumper$1;
function requireDumper$1() {
  if (hasRequiredDumper$1) return dumper$1;
  hasRequiredDumper$1 = 1;
  var e = requireCommon$2(), d = requireException$1(), p = requireDefault_full(), o = requireDefault_safe(), c = Object.prototype.toString, u = Object.prototype.hasOwnProperty, i = 9, f = 10, r = 13, a = 32, t = 33, n = 34, s = 35, m = 37, y = 38, E = 39, g = 42, q = 44, C = 45, P = 58, $ = 61, b = 62, I = 63, T = 64, A = 91, w = 93, z = 96, J = 123, H = 124, X = 125, N = {};
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
  function ne(_, M) {
    var Z, V, v, O, F, G, j;
    if (M === null) return {};
    for (Z = {}, V = Object.keys(M), v = 0, O = V.length; v < O; v += 1)
      F = V[v], G = String(M[F]), F.slice(0, 2) === "!!" && (F = "tag:yaml.org,2002:" + F.slice(2)), j = _.compiledTypeMap.fallback[F], j && u.call(j.styleAliases, G) && (G = j.styleAliases[G]), Z[F] = G;
    return Z;
  }
  function L(_) {
    var M, Z, V;
    if (M = _.toString(16).toUpperCase(), _ <= 255)
      Z = "x", V = 2;
    else if (_ <= 65535)
      Z = "u", V = 4;
    else if (_ <= 4294967295)
      Z = "U", V = 8;
    else
      throw new d("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + Z + e.repeat("0", V - M.length) + M;
  }
  function K(_) {
    this.schema = _.schema || p, this.indent = Math.max(1, _.indent || 2), this.noArrayIndent = _.noArrayIndent || !1, this.skipInvalid = _.skipInvalid || !1, this.flowLevel = e.isNothing(_.flowLevel) ? -1 : _.flowLevel, this.styleMap = ne(this.schema, _.styles || null), this.sortKeys = _.sortKeys || !1, this.lineWidth = _.lineWidth || 80, this.noRefs = _.noRefs || !1, this.noCompatMode = _.noCompatMode || !1, this.condenseFlow = _.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(_, M) {
    for (var Z = e.repeat(" ", M), V = 0, v = -1, O = "", F, G = _.length; V < G; )
      v = _.indexOf(`
`, V), v === -1 ? (F = _.slice(V), V = G) : (F = _.slice(V, v + 1), V = v + 1), F.length && F !== `
` && (O += Z), O += F;
    return O;
  }
  function fe(_, M) {
    return `
` + e.repeat(" ", _.indent * M);
  }
  function ge(_, M) {
    var Z, V, v;
    for (Z = 0, V = _.implicitTypes.length; Z < V; Z += 1)
      if (v = _.implicitTypes[Z], v.resolve(M))
        return !0;
    return !1;
  }
  function de(_) {
    return _ === a || _ === i;
  }
  function we(_) {
    return 32 <= _ && _ <= 126 || 161 <= _ && _ <= 55295 && _ !== 8232 && _ !== 8233 || 57344 <= _ && _ <= 65533 && _ !== 65279 || 65536 <= _ && _ <= 1114111;
  }
  function _e(_) {
    return we(_) && !de(_) && _ !== 65279 && _ !== r && _ !== f;
  }
  function ie(_, M) {
    return we(_) && _ !== 65279 && _ !== q && _ !== A && _ !== w && _ !== J && _ !== X && _ !== P && (_ !== s || M && _e(M));
  }
  function Ee(_) {
    return we(_) && _ !== 65279 && !de(_) && _ !== C && _ !== I && _ !== P && _ !== q && _ !== A && _ !== w && _ !== J && _ !== X && _ !== s && _ !== y && _ !== g && _ !== t && _ !== H && _ !== $ && _ !== b && _ !== E && _ !== n && _ !== m && _ !== T && _ !== z;
  }
  function S(_) {
    var M = /^\n* /;
    return M.test(_);
  }
  var R = 1, te = 2, k = 3, pe = 4, ye = 5;
  function ve(_, M, Z, V, v) {
    var O, F, G, j = !1, ae = !1, oe = V !== -1, le = -1, he = Ee(_.charCodeAt(0)) && !de(_.charCodeAt(_.length - 1));
    if (M)
      for (O = 0; O < _.length; O++) {
        if (F = _.charCodeAt(O), !we(F))
          return ye;
        G = O > 0 ? _.charCodeAt(O - 1) : null, he = he && ie(F, G);
      }
    else {
      for (O = 0; O < _.length; O++) {
        if (F = _.charCodeAt(O), F === f)
          j = !0, oe && (ae = ae || // Foldable line = too long, and not more-indented.
          O - le - 1 > V && _[le + 1] !== " ", le = O);
        else if (!we(F))
          return ye;
        G = O > 0 ? _.charCodeAt(O - 1) : null, he = he && ie(F, G);
      }
      ae = ae || oe && O - le - 1 > V && _[le + 1] !== " ";
    }
    return !j && !ae ? he && !v(_) ? R : te : Z > 9 && S(_) ? ye : ae ? pe : k;
  }
  function qe(_, M, Z, V) {
    _.dump = (function() {
      if (M.length === 0)
        return "''";
      if (!_.noCompatMode && U.indexOf(M) !== -1)
        return "'" + M + "'";
      var v = _.indent * Math.max(1, Z), O = _.lineWidth === -1 ? -1 : Math.max(Math.min(_.lineWidth, 40), _.lineWidth - v), F = V || _.flowLevel > -1 && Z >= _.flowLevel;
      function G(j) {
        return ge(_, j);
      }
      switch (ve(M, F, _.indent, O, G)) {
        case R:
          return M;
        case te:
          return "'" + M.replace(/'/g, "''") + "'";
        case k:
          return "|" + Re(M, _.indent) + Ie(ue(M, v));
        case pe:
          return ">" + Re(M, _.indent) + Ie(ue(Ce(M, O), v));
        case ye:
          return '"' + Be(M) + '"';
        default:
          throw new d("impossible error: invalid scalar style");
      }
    })();
  }
  function Re(_, M) {
    var Z = S(_) ? String(M) : "", V = _[_.length - 1] === `
`, v = V && (_[_.length - 2] === `
` || _ === `
`), O = v ? "+" : V ? "" : "-";
    return Z + O + `
`;
  }
  function Ie(_) {
    return _[_.length - 1] === `
` ? _.slice(0, -1) : _;
  }
  function Ce(_, M) {
    for (var Z = /(\n+)([^\n]*)/g, V = (function() {
      var ae = _.indexOf(`
`);
      return ae = ae !== -1 ? ae : _.length, Z.lastIndex = ae, xe(_.slice(0, ae), M);
    })(), v = _[0] === `
` || _[0] === " ", O, F; F = Z.exec(_); ) {
      var G = F[1], j = F[2];
      O = j[0] === " ", V += G + (!v && !O && j !== "" ? `
` : "") + xe(j, M), v = O;
    }
    return V;
  }
  function xe(_, M) {
    if (_ === "" || _[0] === " ") return _;
    for (var Z = / [^ ]/g, V, v = 0, O, F = 0, G = 0, j = ""; V = Z.exec(_); )
      G = V.index, G - v > M && (O = F > v ? F : G, j += `
` + _.slice(v, O), v = O + 1), F = G;
    return j += `
`, _.length - v > M && F > v ? j += _.slice(v, F) + `
` + _.slice(F + 1) : j += _.slice(v), j.slice(1);
  }
  function Be(_) {
    for (var M = "", Z, V, v, O = 0; O < _.length; O++) {
      if (Z = _.charCodeAt(O), Z >= 55296 && Z <= 56319 && (V = _.charCodeAt(O + 1), V >= 56320 && V <= 57343)) {
        M += L((Z - 55296) * 1024 + V - 56320 + 65536), O++;
        continue;
      }
      v = N[Z], M += !v && we(Z) ? _[O] : v || L(Z);
    }
    return M;
  }
  function ke(_, M, Z) {
    var V = "", v = _.tag, O, F;
    for (O = 0, F = Z.length; O < F; O += 1)
      l(_, M, Z[O], !1, !1) && (O !== 0 && (V += "," + (_.condenseFlow ? "" : " ")), V += _.dump);
    _.tag = v, _.dump = "[" + V + "]";
  }
  function Ue(_, M, Z, V) {
    var v = "", O = _.tag, F, G;
    for (F = 0, G = Z.length; F < G; F += 1)
      l(_, M + 1, Z[F], !0, !0) && ((!V || F !== 0) && (v += fe(_, M)), _.dump && f === _.dump.charCodeAt(0) ? v += "-" : v += "- ", v += _.dump);
    _.tag = O, _.dump = v || "[]";
  }
  function h(_, M, Z) {
    var V = "", v = _.tag, O = Object.keys(Z), F, G, j, ae, oe;
    for (F = 0, G = O.length; F < G; F += 1)
      oe = "", F !== 0 && (oe += ", "), _.condenseFlow && (oe += '"'), j = O[F], ae = Z[j], l(_, M, j, !1, !1) && (_.dump.length > 1024 && (oe += "? "), oe += _.dump + (_.condenseFlow ? '"' : "") + ":" + (_.condenseFlow ? "" : " "), l(_, M, ae, !1, !1) && (oe += _.dump, V += oe));
    _.tag = v, _.dump = "{" + V + "}";
  }
  function ee(_, M, Z, V) {
    var v = "", O = _.tag, F = Object.keys(Z), G, j, ae, oe, le, he;
    if (_.sortKeys === !0)
      F.sort();
    else if (typeof _.sortKeys == "function")
      F.sort(_.sortKeys);
    else if (_.sortKeys)
      throw new d("sortKeys must be a boolean or a function");
    for (G = 0, j = F.length; G < j; G += 1)
      he = "", (!V || G !== 0) && (he += fe(_, M)), ae = F[G], oe = Z[ae], l(_, M + 1, ae, !0, !0, !0) && (le = _.tag !== null && _.tag !== "?" || _.dump && _.dump.length > 1024, le && (_.dump && f === _.dump.charCodeAt(0) ? he += "?" : he += "? "), he += _.dump, le && (he += fe(_, M)), l(_, M + 1, oe, !0, le) && (_.dump && f === _.dump.charCodeAt(0) ? he += ":" : he += ": ", he += _.dump, v += he));
    _.tag = O, _.dump = v || "{}";
  }
  function se(_, M, Z) {
    var V, v, O, F, G, j;
    for (v = Z ? _.explicitTypes : _.implicitTypes, O = 0, F = v.length; O < F; O += 1)
      if (G = v[O], (G.instanceOf || G.predicate) && (!G.instanceOf || typeof M == "object" && M instanceof G.instanceOf) && (!G.predicate || G.predicate(M))) {
        if (_.tag = Z ? G.tag : "?", G.represent) {
          if (j = _.styleMap[G.tag] || G.defaultStyle, c.call(G.represent) === "[object Function]")
            V = G.represent(M, j);
          else if (u.call(G.represent, j))
            V = G.represent[j](M, j);
          else
            throw new d("!<" + G.tag + '> tag resolver accepts not "' + j + '" style');
          _.dump = V;
        }
        return !0;
      }
    return !1;
  }
  function l(_, M, Z, V, v, O) {
    _.tag = null, _.dump = Z, se(_, Z, !1) || se(_, Z, !0);
    var F = c.call(_.dump);
    V && (V = _.flowLevel < 0 || _.flowLevel > M);
    var G = F === "[object Object]" || F === "[object Array]", j, ae;
    if (G && (j = _.duplicates.indexOf(Z), ae = j !== -1), (_.tag !== null && _.tag !== "?" || ae || _.indent !== 2 && M > 0) && (v = !1), ae && _.usedDuplicates[j])
      _.dump = "*ref_" + j;
    else {
      if (G && ae && !_.usedDuplicates[j] && (_.usedDuplicates[j] = !0), F === "[object Object]")
        V && Object.keys(_.dump).length !== 0 ? (ee(_, M, _.dump, v), ae && (_.dump = "&ref_" + j + _.dump)) : (h(_, M, _.dump), ae && (_.dump = "&ref_" + j + " " + _.dump));
      else if (F === "[object Array]") {
        var oe = _.noArrayIndent && M > 0 ? M - 1 : M;
        V && _.dump.length !== 0 ? (Ue(_, oe, _.dump, v), ae && (_.dump = "&ref_" + j + _.dump)) : (ke(_, oe, _.dump), ae && (_.dump = "&ref_" + j + " " + _.dump));
      } else if (F === "[object String]")
        _.tag !== "?" && qe(_, _.dump, M, O);
      else {
        if (_.skipInvalid) return !1;
        throw new d("unacceptable kind of an object to dump " + F);
      }
      _.tag !== null && _.tag !== "?" && (_.dump = "!<" + _.tag + "> " + _.dump);
    }
    return !0;
  }
  function D(_, M) {
    var Z = [], V = [], v, O;
    for (B(_, Z, V), v = 0, O = V.length; v < O; v += 1)
      M.duplicates.push(Z[V[v]]);
    M.usedDuplicates = new Array(O);
  }
  function B(_, M, Z) {
    var V, v, O;
    if (_ !== null && typeof _ == "object")
      if (v = M.indexOf(_), v !== -1)
        Z.indexOf(v) === -1 && Z.push(v);
      else if (M.push(_), Array.isArray(_))
        for (v = 0, O = _.length; v < O; v += 1)
          B(_[v], M, Z);
      else
        for (V = Object.keys(_), v = 0, O = V.length; v < O; v += 1)
          B(_[V[v]], M, Z);
  }
  function Q(_, M) {
    M = M || {};
    var Z = new K(M);
    return Z.noRefs || D(_, Z), l(Z, 0, _, !0, !0) ? Z.dump + `
` : "";
  }
  function W(_, M) {
    return Q(_, e.extend({ schema: o }, M));
  }
  return dumper$1.dump = Q, dumper$1.safeDump = W, dumper$1;
}
var hasRequiredJsYaml$2;
function requireJsYaml$2() {
  if (hasRequiredJsYaml$2) return jsYaml$2;
  hasRequiredJsYaml$2 = 1;
  var e = requireLoader$1(), d = requireDumper$1();
  function p(o) {
    return function() {
      throw new Error("Function " + o + " is deprecated and cannot be used.");
    };
  }
  return jsYaml$2.Type = requireType$1(), jsYaml$2.Schema = requireSchema$1(), jsYaml$2.FAILSAFE_SCHEMA = requireFailsafe$1(), jsYaml$2.JSON_SCHEMA = requireJson$2(), jsYaml$2.CORE_SCHEMA = requireCore$1(), jsYaml$2.DEFAULT_SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_FULL_SCHEMA = requireDefault_full(), jsYaml$2.load = e.load, jsYaml$2.loadAll = e.loadAll, jsYaml$2.safeLoad = e.safeLoad, jsYaml$2.safeLoadAll = e.safeLoadAll, jsYaml$2.dump = d.dump, jsYaml$2.safeDump = d.safeDump, jsYaml$2.YAMLException = requireException$1(), jsYaml$2.MINIMAL_SCHEMA = requireFailsafe$1(), jsYaml$2.SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_SCHEMA = requireDefault_full(), jsYaml$2.scan = p("scan"), jsYaml$2.parse = p("parse"), jsYaml$2.compose = p("compose"), jsYaml$2.addConstructor = p("addConstructor"), jsYaml$2;
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
      stringify: function(e, d) {
        const p = Object.assign({ replacer: null, space: 2 }, d);
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
/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var stripBomString, hasRequiredStripBomString;
function requireStripBomString() {
  return hasRequiredStripBomString || (hasRequiredStripBomString = 1, stripBomString = function(e) {
    return typeof e == "string" && e.charAt(0) === "\uFEFF" ? e.slice(1) : e;
  }), stripBomString;
}
var hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, (function(e) {
    const d = requireStripBomString(), p = requireKindOf();
    e.define = function(o, c, u) {
      Reflect.defineProperty(o, c, {
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
      if (e.isBuffer(o)) return d(String(o));
      if (typeof o != "string")
        throw new TypeError("expected input to be a string or buffer");
      return d(o);
    }, e.arrayify = function(o) {
      return o ? Array.isArray(o) ? o : [o] : [];
    }, e.startsWith = function(o, c, u) {
      return typeof u != "number" && (u = c.length), o.slice(0, u) === c;
    };
  })(utils$2)), utils$2;
}
var defaults, hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  const e = requireEngines(), d = requireUtils$2();
  return defaults = function(p) {
    const o = Object.assign({}, p);
    return o.delimiters = d.arrayify(o.delims || o.delimiters || "---"), o.delimiters.length === 1 && o.delimiters.push(o.delimiters[0]), o.language = (o.language || o.lang || "yaml").toLowerCase(), o.engines = Object.assign({}, e, o.parsers, o.engines), o;
  }, defaults;
}
var engine, hasRequiredEngine;
function requireEngine() {
  if (hasRequiredEngine) return engine;
  hasRequiredEngine = 1, engine = function(d, p) {
    let o = p.engines[d] || p.engines[e(d)];
    if (typeof o > "u")
      throw new Error('gray-matter engine "' + d + '" is not registered');
    return typeof o == "function" && (o = { parse: o }), o;
  };
  function e(d) {
    switch (d.toLowerCase()) {
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
        return d;
    }
  }
  return engine;
}
var stringify, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const e = requireKindOf(), d = requireEngine(), p = requireDefaults();
  stringify = function(c, u, i) {
    if (u == null && i == null)
      switch (e(c)) {
        case "object":
          u = c.data, i = {};
          break;
        case "string":
          return c;
        default:
          throw new TypeError("expected file to be a string or object");
      }
    const f = c.content, r = p(i);
    if (u == null) {
      if (!r.data) return c;
      u = r.data;
    }
    const a = c.language || r.language, t = d(a, r);
    if (typeof t.stringify != "function")
      throw new TypeError('expected "' + a + '.stringify" to be a function');
    u = Object.assign({}, c.data, u);
    const n = r.delimiters[0], s = r.delimiters[1], m = t.stringify(u, i).trim();
    let y = "";
    return m !== "{}" && (y = o(n) + o(m) + o(s)), typeof c.excerpt == "string" && c.excerpt !== "" && f.indexOf(c.excerpt.trim()) === -1 && (y += o(c.excerpt) + o(s)), y + o(f);
  };
  function o(c) {
    return c.slice(-1) !== `
` ? c + `
` : c;
  }
  return stringify;
}
var excerpt, hasRequiredExcerpt;
function requireExcerpt() {
  if (hasRequiredExcerpt) return excerpt;
  hasRequiredExcerpt = 1;
  const e = requireDefaults();
  return excerpt = function(d, p) {
    const o = e(p);
    if (d.data == null && (d.data = {}), typeof o.excerpt == "function")
      return o.excerpt(d, o);
    const c = d.data.excerpt_separator || o.excerpt_separator;
    if (c == null && (o.excerpt === !1 || o.excerpt == null))
      return d;
    const u = typeof o.excerpt == "string" ? o.excerpt : c || o.delimiters[0], i = d.content.indexOf(u);
    return i !== -1 && (d.excerpt = d.content.slice(0, i)), d;
  }, excerpt;
}
var toFile, hasRequiredToFile;
function requireToFile() {
  if (hasRequiredToFile) return toFile;
  hasRequiredToFile = 1;
  const e = requireKindOf(), d = requireStringify(), p = requireUtils$2();
  return toFile = function(o) {
    return e(o) !== "object" && (o = { content: o }), e(o.data) !== "object" && (o.data = {}), o.contents && o.content == null && (o.content = o.contents), p.define(o, "orig", p.toBuffer(o.content)), p.define(o, "language", o.language || ""), p.define(o, "matter", o.matter || ""), p.define(o, "stringify", function(c, u) {
      return u && u.language && (o.language = u.language), d(o, c, u);
    }), o.content = p.toString(o.content), o.isEmpty = !1, o.excerpt = "", o;
  }, toFile;
}
var parse, hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse;
  hasRequiredParse$1 = 1;
  const e = requireEngine(), d = requireDefaults();
  return parse = function(p, o, c) {
    const u = d(c), i = e(p, u);
    if (typeof i.parse != "function")
      throw new TypeError('expected "' + p + '.parse" to be a function');
    return i.parse(o, u);
  }, parse;
}
var grayMatter, hasRequiredGrayMatter;
function requireGrayMatter() {
  if (hasRequiredGrayMatter) return grayMatter;
  hasRequiredGrayMatter = 1;
  const e = require$$1, d = requireSectionMatter(), p = requireDefaults(), o = requireStringify(), c = requireExcerpt(), u = requireEngines(), i = requireToFile(), f = requireParse$1(), r = requireUtils$2();
  function a(n, s) {
    if (n === "")
      return { data: {}, content: n, excerpt: "", orig: n };
    let m = i(n);
    const y = a.cache[m.content];
    if (!s) {
      if (y)
        return m = Object.assign({}, y), m.orig = y.orig, m;
      a.cache[m.content] = m;
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
      return c(n, m), n;
    if (g.charAt(q) === y.slice(-1))
      return n;
    g = g.slice(q);
    const C = g.length, P = a.language(g, m);
    P.name && (n.language = P.name, g = g.slice(P.raw.length));
    let $ = g.indexOf(E);
    return $ === -1 && ($ = C), n.matter = g.slice(0, $), n.matter.replace(/^\s*#[^\n]+/gm, "").trim() === "" ? (n.isEmpty = !0, n.empty = n.content, n.data = {}) : n.data = f(n.language, n.matter, m), $ === C ? n.content = "" : (n.content = g.slice($ + E.length), n.content[0] === "\r" && (n.content = n.content.slice(1)), n.content[0] === `
` && (n.content = n.content.slice(1))), c(n, m), (m.sections === !0 || typeof m.section == "function") && d(n, m.section), n;
  }
  return a.engines = u, a.stringify = function(n, s, m) {
    return typeof n == "string" && (n = a(n, m)), o(n, s, m);
  }, a.read = function(n, s) {
    const m = e.readFileSync(n, "utf8"), y = a(m, s);
    return y.path = n, y;
  }, a.test = function(n, s) {
    return r.startsWith(n, p(s).delimiters[0]);
  }, a.language = function(n, s) {
    const y = p(s).delimiters[0];
    a.test(n) && (n = n.slice(y.length));
    const E = n.slice(0, n.search(/\r?\n/));
    return {
      raw: E,
      name: E ? E.trim() : ""
    };
  }, a.cache = {}, a.clearCache = function() {
    a.cache = {};
  }, grayMatter = a, grayMatter;
}
var grayMatterExports = requireGrayMatter();
const matter = /* @__PURE__ */ getDefaultExportFromCjs(grayMatterExports);
var main$1 = {}, fs = {}, universalify = {}, hasRequiredUniversalify;
function requireUniversalify() {
  return hasRequiredUniversalify || (hasRequiredUniversalify = 1, universalify.fromCallback = function(e) {
    return Object.defineProperty(function(...d) {
      if (typeof d[d.length - 1] == "function") e.apply(this, d);
      else
        return new Promise((p, o) => {
          d.push((c, u) => c != null ? o(c) : p(u)), e.apply(this, d);
        });
    }, "name", { value: e.name });
  }, universalify.fromPromise = function(e) {
    return Object.defineProperty(function(...d) {
      const p = d[d.length - 1];
      if (typeof p != "function") return e.apply(this, d);
      d.pop(), e.apply(this, d).then((o) => p(null, o), p);
    }, "name", { value: e.name });
  }), universalify;
}
var polyfills, hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var e = require$$0, d = process.cwd, p = null, o = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return p || (p = d.call(process)), p;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var c = process.chdir;
    process.chdir = function(i) {
      p = null, c.call(process, i);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, c);
  }
  polyfills = u;
  function u(i) {
    e.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && f(i), i.lutimes || r(i), i.chown = n(i.chown), i.fchown = n(i.fchown), i.lchown = n(i.lchown), i.chmod = a(i.chmod), i.fchmod = a(i.fchmod), i.lchmod = a(i.lchmod), i.chownSync = s(i.chownSync), i.fchownSync = s(i.fchownSync), i.lchownSync = s(i.lchownSync), i.chmodSync = t(i.chmodSync), i.fchmodSync = t(i.fchmodSync), i.lchmodSync = t(i.lchmodSync), i.stat = m(i.stat), i.fstat = m(i.fstat), i.lstat = m(i.lstat), i.statSync = y(i.statSync), i.fstatSync = y(i.fstatSync), i.lstatSync = y(i.lstatSync), i.chmod && !i.lchmod && (i.lchmod = function(g, q, C) {
      C && process.nextTick(C);
    }, i.lchmodSync = function() {
    }), i.chown && !i.lchown && (i.lchown = function(g, q, C, P) {
      P && process.nextTick(P);
    }, i.lchownSync = function() {
    }), o === "win32" && (i.rename = typeof i.rename != "function" ? i.rename : (function(g) {
      function q(C, P, $) {
        var b = Date.now(), I = 0;
        g(C, P, function T(A) {
          if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - b < 6e4) {
            setTimeout(function() {
              i.stat(P, function(w, z) {
                w && w.code === "ENOENT" ? g(C, P, T) : $(A);
              });
            }, I), I < 100 && (I += 10);
            return;
          }
          $ && $(A);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(i.rename)), i.read = typeof i.read != "function" ? i.read : (function(g) {
      function q(C, P, $, b, I, T) {
        var A;
        if (T && typeof T == "function") {
          var w = 0;
          A = function(z, J, H) {
            if (z && z.code === "EAGAIN" && w < 10)
              return w++, g.call(i, C, P, $, b, I, A);
            T.apply(this, arguments);
          };
        }
        return g.call(i, C, P, $, b, I, A);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(i.read), i.readSync = typeof i.readSync != "function" ? i.readSync : /* @__PURE__ */ (function(g) {
      return function(q, C, P, $, b) {
        for (var I = 0; ; )
          try {
            return g.call(i, q, C, P, $, b);
          } catch (T) {
            if (T.code === "EAGAIN" && I < 10) {
              I++;
              continue;
            }
            throw T;
          }
      };
    })(i.readSync);
    function f(g) {
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
    function a(g) {
      return g && function(q, C, P) {
        return g.call(i, q, C, function($) {
          E($) && ($ = null), P && P.apply(this, arguments);
        });
      };
    }
    function t(g) {
      return g && function(q, C) {
        try {
          return g.call(i, q, C);
        } catch (P) {
          if (!E(P)) throw P;
        }
      };
    }
    function n(g) {
      return g && function(q, C, P, $) {
        return g.call(i, q, C, P, function(b) {
          E(b) && (b = null), $ && $.apply(this, arguments);
        });
      };
    }
    function s(g) {
      return g && function(q, C, P) {
        try {
          return g.call(i, q, C, P);
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
        return C ? g.call(i, q, C, $) : g.call(i, q, $);
      };
    }
    function y(g) {
      return g && function(q, C) {
        var P = C ? g.call(i, q, C) : g.call(i, q);
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
  legacyStreams = d;
  function d(p) {
    return {
      ReadStream: o,
      WriteStream: c
    };
    function o(u, i) {
      if (!(this instanceof o)) return new o(u, i);
      e.call(this);
      var f = this;
      this.path = u, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
      for (var r = Object.keys(i), a = 0, t = r.length; a < t; a++) {
        var n = r[a];
        this[n] = i[n];
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
          f._read();
        });
        return;
      }
      p.open(this.path, this.flags, this.mode, function(s, m) {
        if (s) {
          f.emit("error", s), f.readable = !1;
          return;
        }
        f.fd = m, f.emit("open", m), f._read();
      });
    }
    function c(u, i) {
      if (!(this instanceof c)) return new c(u, i);
      e.call(this), this.path = u, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
      for (var f = Object.keys(i), r = 0, a = f.length; r < a; r++) {
        var t = f[r];
        this[t] = i[t];
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
  hasRequiredClone = 1, clone_1 = d;
  var e = Object.getPrototypeOf || function(p) {
    return p.__proto__;
  };
  function d(p) {
    if (p === null || typeof p != "object")
      return p;
    if (p instanceof Object)
      var o = { __proto__: e(p) };
    else
      var o = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(p).forEach(function(c) {
      Object.defineProperty(o, c, Object.getOwnPropertyDescriptor(p, c));
    }), o;
  }
  return clone_1;
}
var gracefulFs, hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var e = require$$1, d = requirePolyfills(), p = requireLegacyStreams(), o = requireClone(), c = require$$4, u, i;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (u = Symbol.for("graceful-fs.queue"), i = Symbol.for("graceful-fs.previous")) : (u = "___graceful-fs.queue", i = "___graceful-fs.previous");
  function f() {
  }
  function r(g, q) {
    Object.defineProperty(g, u, {
      get: function() {
        return q;
      }
    });
  }
  var a = f;
  if (c.debuglog ? a = c.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (a = function() {
    var g = c.format.apply(c, arguments);
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
      return Object.defineProperty(q, i, {
        value: g
      }), q;
    })(e.close), e.closeSync = (function(g) {
      function q(C) {
        g.apply(e, arguments), y();
      }
      return Object.defineProperty(q, i, {
        value: g
      }), q;
    })(e.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      a(e[u]), require$$5.equal(e[u].length, 0);
    });
  }
  commonjsGlobal[u] || r(commonjsGlobal, e[u]), gracefulFs = n(o(e)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !e.__patched && (gracefulFs = n(e), e.__patched = !0);
  function n(g) {
    d(g), g.gracefulify = n, g.createReadStream = ge, g.createWriteStream = de;
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
    var w = g.readdir;
    g.readdir = J;
    var z = /^v[0-5]\./;
    function J(ie, Ee, S) {
      typeof Ee == "function" && (S = Ee, Ee = null);
      var R = z.test(process.version) ? function(pe, ye, ve, qe) {
        return w(pe, te(
          pe,
          ye,
          ve,
          qe
        ));
      } : function(pe, ye, ve, qe) {
        return w(pe, ye, te(
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
      _e(ie.path, ie.flags, ie.mode, function(Ee, S) {
        Ee ? (ie.autoClose && ie.destroy(), ie.emit("error", Ee)) : (ie.fd = S, ie.emit("open", S), ie.read());
      });
    }
    function ue(ie, Ee) {
      return this instanceof ue ? (N.apply(this, arguments), this) : ue.apply(Object.create(ue.prototype), arguments);
    }
    function fe() {
      var ie = this;
      _e(ie.path, ie.flags, ie.mode, function(Ee, S) {
        Ee ? (ie.destroy(), ie.emit("error", Ee)) : (ie.fd = S, ie.emit("open", S));
      });
    }
    function ge(ie, Ee) {
      return new g.ReadStream(ie, Ee);
    }
    function de(ie, Ee) {
      return new g.WriteStream(ie, Ee);
    }
    var we = g.open;
    g.open = _e;
    function _e(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return we(k, pe, ye, function(Re, Ie) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? s([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    return g;
  }
  function s(g) {
    a("ENQUEUE", g[0].name, g[1]), e[u].push(g), E();
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
        a("RETRY", q.name, C), q.apply(null, C);
      else if (Date.now() - $ >= 6e4) {
        a("TIMEOUT", q.name, C);
        var I = C.pop();
        typeof I == "function" && I.call(null, P);
      } else {
        var T = Date.now() - b, A = Math.max(b - $, 1), w = Math.min(A * 1.2, 100);
        T >= w ? (a("RETRY", q.name, C), q.apply(null, C.concat([$]))) : e[u].push(g);
      }
      m === void 0 && (m = setTimeout(E, 0));
    }
  }
  return gracefulFs;
}
var hasRequiredFs;
function requireFs() {
  return hasRequiredFs || (hasRequiredFs = 1, (function(e) {
    const d = requireUniversalify().fromCallback, p = requireGracefulFs(), o = [
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
    ].filter((c) => typeof p[c] == "function");
    Object.assign(e, p), o.forEach((c) => {
      e[c] = d(p[c]);
    }), e.exists = function(c, u) {
      return typeof u == "function" ? p.exists(c, u) : new Promise((i) => p.exists(c, i));
    }, e.read = function(c, u, i, f, r, a) {
      return typeof a == "function" ? p.read(c, u, i, f, r, a) : new Promise((t, n) => {
        p.read(c, u, i, f, r, (s, m, y) => {
          if (s) return n(s);
          t({ bytesRead: m, buffer: y });
        });
      });
    }, e.write = function(c, u, ...i) {
      return typeof i[i.length - 1] == "function" ? p.write(c, u, ...i) : new Promise((f, r) => {
        p.write(c, u, ...i, (a, t, n) => {
          if (a) return r(a);
          f({ bytesWritten: t, buffer: n });
        });
      });
    }, typeof p.writev == "function" && (e.writev = function(c, u, ...i) {
      return typeof i[i.length - 1] == "function" ? p.writev(c, u, ...i) : new Promise((f, r) => {
        p.writev(c, u, ...i, (a, t, n) => {
          if (a) return r(a);
          f({ bytesWritten: t, buffers: n });
        });
      });
    }), typeof p.realpath.native == "function" ? e.realpath.native = d(p.realpath.native) : process.emitWarning(
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
      const c = new Error(`Path contains invalid characters: ${p}`);
      throw c.code = "EINVAL", c;
    }
  }, utils$1;
}
var hasRequiredMakeDir;
function requireMakeDir() {
  if (hasRequiredMakeDir) return makeDir;
  hasRequiredMakeDir = 1;
  const e = /* @__PURE__ */ requireFs(), { checkPath: d } = /* @__PURE__ */ requireUtils$1(), p = (o) => {
    const c = { mode: 511 };
    return typeof o == "number" ? o : { ...c, ...o }.mode;
  };
  return makeDir.makeDir = async (o, c) => (d(o), e.mkdir(o, {
    mode: p(c),
    recursive: !0
  })), makeDir.makeDirSync = (o, c) => (d(o), e.mkdirSync(o, {
    mode: p(c),
    recursive: !0
  })), makeDir;
}
var mkdirs, hasRequiredMkdirs;
function requireMkdirs() {
  if (hasRequiredMkdirs) return mkdirs;
  hasRequiredMkdirs = 1;
  const e = requireUniversalify().fromPromise, { makeDir: d, makeDirSync: p } = /* @__PURE__ */ requireMakeDir(), o = e(d);
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
  const e = requireUniversalify().fromPromise, d = /* @__PURE__ */ requireFs();
  function p(o) {
    return d.access(o).then(() => !0).catch(() => !1);
  }
  return pathExists_1 = {
    pathExists: e(p),
    pathExistsSync: d.existsSync
  }, pathExists_1;
}
var utimes, hasRequiredUtimes;
function requireUtimes() {
  if (hasRequiredUtimes) return utimes;
  hasRequiredUtimes = 1;
  const e = requireGracefulFs();
  function d(o, c, u, i) {
    e.open(o, "r+", (f, r) => {
      if (f) return i(f);
      e.futimes(r, c, u, (a) => {
        e.close(r, (t) => {
          i && i(a || t);
        });
      });
    });
  }
  function p(o, c, u) {
    const i = e.openSync(o, "r+");
    return e.futimesSync(i, c, u), e.closeSync(i);
  }
  return utimes = {
    utimesMillis: d,
    utimesMillisSync: p
  }, utimes;
}
var stat, hasRequiredStat;
function requireStat() {
  if (hasRequiredStat) return stat;
  hasRequiredStat = 1;
  const e = /* @__PURE__ */ requireFs(), d = require$$1$1, p = require$$4;
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
  function c(s, m, y) {
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
        if (a(P, $)) {
          const b = d.basename(s), I = d.basename(m);
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
  function i(s, m, y, E) {
    const { srcStat: g, destStat: q } = c(s, m, E);
    if (q) {
      if (a(g, q)) {
        const C = d.basename(s), P = d.basename(m);
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
  function f(s, m, y, E, g) {
    const q = d.resolve(d.dirname(s)), C = d.resolve(d.dirname(y));
    if (C === q || C === d.parse(C).root) return g();
    e.stat(C, { bigint: !0 }, (P, $) => P ? P.code === "ENOENT" ? g() : g(P) : a(m, $) ? g(new Error(n(s, y, E))) : f(s, m, C, E, g));
  }
  function r(s, m, y, E) {
    const g = d.resolve(d.dirname(s)), q = d.resolve(d.dirname(y));
    if (q === g || q === d.parse(q).root) return;
    let C;
    try {
      C = e.statSync(q, { bigint: !0 });
    } catch (P) {
      if (P.code === "ENOENT") return;
      throw P;
    }
    if (a(m, C))
      throw new Error(n(s, y, E));
    return r(s, m, q, E);
  }
  function a(s, m) {
    return m.ino && m.dev && m.ino === s.ino && m.dev === s.dev;
  }
  function t(s, m) {
    const y = d.resolve(s).split(d.sep).filter((g) => g), E = d.resolve(m).split(d.sep).filter((g) => g);
    return y.reduce((g, q, C) => g && E[C] === q, !0);
  }
  function n(s, m, y) {
    return `Cannot ${y} '${s}' to a subdirectory of itself, '${m}'.`;
  }
  return stat = {
    checkPaths: u,
    checkPathsSync: i,
    checkParentPaths: f,
    checkParentPathsSync: r,
    isSrcSubdir: t,
    areIdentical: a
  }, stat;
}
var copy_1, hasRequiredCopy$1;
function requireCopy$1() {
  if (hasRequiredCopy$1) return copy_1;
  hasRequiredCopy$1 = 1;
  const e = requireGracefulFs(), d = require$$1$1, p = requireMkdirs().mkdirs, o = requirePathExists().pathExists, c = requireUtimes().utimesMillis, u = /* @__PURE__ */ requireStat();
  function i(J, H, X, N) {
    typeof X == "function" && !N ? (N = X, X = {}) : typeof X == "function" && (X = { filter: X }), N = N || function() {
    }, X = X || {}, X.clobber = "clobber" in X ? !!X.clobber : !0, X.overwrite = "overwrite" in X ? !!X.overwrite : X.clobber, X.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), u.checkPaths(J, H, "copy", X, (U, ne) => {
      if (U) return N(U);
      const { srcStat: L, destStat: K } = ne;
      u.checkParentPaths(J, L, H, "copy", (ue) => ue ? N(ue) : X.filter ? r(f, K, J, H, X, N) : f(K, J, H, X, N));
    });
  }
  function f(J, H, X, N, U) {
    const ne = d.dirname(X);
    o(ne, (L, K) => {
      if (L) return U(L);
      if (K) return t(J, H, X, N, U);
      p(ne, (ue) => ue ? U(ue) : t(J, H, X, N, U));
    });
  }
  function r(J, H, X, N, U, ne) {
    Promise.resolve(U.filter(X, N)).then((L) => L ? J(H, X, N, U, ne) : ne(), (L) => ne(L));
  }
  function a(J, H, X, N, U) {
    return N.filter ? r(t, J, H, X, N, U) : t(J, H, X, N, U);
  }
  function t(J, H, X, N, U) {
    (N.dereference ? e.stat : e.lstat)(H, (L, K) => L ? U(L) : K.isDirectory() ? $(K, J, H, X, N, U) : K.isFile() || K.isCharacterDevice() || K.isBlockDevice() ? n(K, J, H, X, N, U) : K.isSymbolicLink() ? w(J, H, X, N, U) : K.isSocket() ? U(new Error(`Cannot copy a socket file: ${H}`)) : K.isFIFO() ? U(new Error(`Cannot copy a FIFO pipe: ${H}`)) : U(new Error(`Unknown file: ${H}`)));
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
    e.stat(J, (N, U) => N ? X(N) : c(H, U.atime, U.mtime, X));
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
    const L = d.join(X, H), K = d.join(N, H);
    u.checkPaths(L, K, "copy", U, (ue, fe) => {
      if (ue) return ne(ue);
      const { destStat: ge } = fe;
      a(ge, L, K, U, (de) => de ? ne(de) : T(J, X, N, U, ne));
    });
  }
  function w(J, H, X, N, U) {
    e.readlink(H, (ne, L) => {
      if (ne) return U(ne);
      if (N.dereference && (L = d.resolve(process.cwd(), L)), J)
        e.readlink(X, (K, ue) => K ? K.code === "EINVAL" || K.code === "UNKNOWN" ? e.symlink(L, X, U) : U(K) : (N.dereference && (ue = d.resolve(process.cwd(), ue)), u.isSrcSubdir(L, ue) ? U(new Error(`Cannot copy '${L}' to a subdirectory of itself, '${ue}'.`)) : J.isDirectory() && u.isSrcSubdir(ue, L) ? U(new Error(`Cannot overwrite '${ue}' with '${L}'.`)) : z(L, X, U)));
      else
        return e.symlink(L, X, U);
    });
  }
  function z(J, H, X) {
    e.unlink(H, (N) => N ? X(N) : e.symlink(J, H, X));
  }
  return copy_1 = i, copy_1;
}
var copySync_1, hasRequiredCopySync;
function requireCopySync() {
  if (hasRequiredCopySync) return copySync_1;
  hasRequiredCopySync = 1;
  const e = requireGracefulFs(), d = require$$1$1, p = requireMkdirs().mkdirsSync, o = requireUtimes().utimesMillisSync, c = /* @__PURE__ */ requireStat();
  function u(T, A, w) {
    typeof w == "function" && (w = { filter: w }), w = w || {}, w.clobber = "clobber" in w ? !!w.clobber : !0, w.overwrite = "overwrite" in w ? !!w.overwrite : w.clobber, w.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: z, destStat: J } = c.checkPathsSync(T, A, "copy", w);
    return c.checkParentPathsSync(T, z, A, "copy"), i(J, T, A, w);
  }
  function i(T, A, w, z) {
    if (z.filter && !z.filter(A, w)) return;
    const J = d.dirname(w);
    return e.existsSync(J) || p(J), r(T, A, w, z);
  }
  function f(T, A, w, z) {
    if (!(z.filter && !z.filter(A, w)))
      return r(T, A, w, z);
  }
  function r(T, A, w, z) {
    const H = (z.dereference ? e.statSync : e.lstatSync)(A);
    if (H.isDirectory()) return q(H, T, A, w, z);
    if (H.isFile() || H.isCharacterDevice() || H.isBlockDevice()) return a(H, T, A, w, z);
    if (H.isSymbolicLink()) return b(T, A, w, z);
    throw H.isSocket() ? new Error(`Cannot copy a socket file: ${A}`) : H.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${A}`) : new Error(`Unknown file: ${A}`);
  }
  function a(T, A, w, z, J) {
    return A ? t(T, w, z, J) : n(T, w, z, J);
  }
  function t(T, A, w, z) {
    if (z.overwrite)
      return e.unlinkSync(w), n(T, A, w, z);
    if (z.errorOnExist)
      throw new Error(`'${w}' already exists`);
  }
  function n(T, A, w, z) {
    return e.copyFileSync(A, w), z.preserveTimestamps && s(T.mode, A, w), E(w, T.mode);
  }
  function s(T, A, w) {
    return m(T) && y(w, T), g(A, w);
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
    const w = e.statSync(T);
    return o(A, w.atime, w.mtime);
  }
  function q(T, A, w, z, J) {
    return A ? P(w, z, J) : C(T.mode, w, z, J);
  }
  function C(T, A, w, z) {
    return e.mkdirSync(w), P(A, w, z), E(w, T);
  }
  function P(T, A, w) {
    e.readdirSync(T).forEach((z) => $(z, T, A, w));
  }
  function $(T, A, w, z) {
    const J = d.join(A, T), H = d.join(w, T), { destStat: X } = c.checkPathsSync(J, H, "copy", z);
    return f(X, J, H, z);
  }
  function b(T, A, w, z) {
    let J = e.readlinkSync(A);
    if (z.dereference && (J = d.resolve(process.cwd(), J)), T) {
      let H;
      try {
        H = e.readlinkSync(w);
      } catch (X) {
        if (X.code === "EINVAL" || X.code === "UNKNOWN") return e.symlinkSync(J, w);
        throw X;
      }
      if (z.dereference && (H = d.resolve(process.cwd(), H)), c.isSrcSubdir(J, H))
        throw new Error(`Cannot copy '${J}' to a subdirectory of itself, '${H}'.`);
      if (e.statSync(w).isDirectory() && c.isSrcSubdir(H, J))
        throw new Error(`Cannot overwrite '${H}' with '${J}'.`);
      return I(J, w);
    } else
      return e.symlinkSync(J, w);
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
  const e = requireGracefulFs(), d = require$$1$1, p = require$$5, o = process.platform === "win32";
  function c(y) {
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
    typeof E == "function" && (g = E, E = {}), p(y, "rimraf: missing path"), p.strictEqual(typeof y, "string", "rimraf: path should be a string"), p.strictEqual(typeof g, "function", "rimraf: callback function required"), p(E, "rimraf: invalid options argument provided"), p.strictEqual(typeof E, "object", "rimraf: options should be object"), c(E), i(y, E, function C(P) {
      if (P) {
        if ((P.code === "EBUSY" || P.code === "ENOTEMPTY" || P.code === "EPERM") && q < E.maxBusyTries) {
          q++;
          const $ = q * 100;
          return setTimeout(() => i(y, E, C), $);
        }
        P.code === "ENOENT" && (P = null);
      }
      g(P);
    });
  }
  function i(y, E, g) {
    p(y), p(E), p(typeof g == "function"), E.lstat(y, (q, C) => {
      if (q && q.code === "ENOENT")
        return g(null);
      if (q && q.code === "EPERM" && o)
        return f(y, E, q, g);
      if (C && C.isDirectory())
        return a(y, E, q, g);
      E.unlink(y, (P) => {
        if (P) {
          if (P.code === "ENOENT")
            return g(null);
          if (P.code === "EPERM")
            return o ? f(y, E, P, g) : a(y, E, P, g);
          if (P.code === "EISDIR")
            return a(y, E, P, g);
        }
        return g(P);
      });
    });
  }
  function f(y, E, g, q) {
    p(y), p(E), p(typeof q == "function"), E.chmod(y, 438, (C) => {
      C ? q(C.code === "ENOENT" ? null : g) : E.stat(y, (P, $) => {
        P ? q(P.code === "ENOENT" ? null : g) : $.isDirectory() ? a(y, E, g, q) : E.unlink(y, q);
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
  function a(y, E, g, q) {
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
        u(d.join(y, b), E, (I) => {
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
    E = E || {}, c(E), p(y, "rimraf: missing path"), p.strictEqual(typeof y, "string", "rimraf: path should be a string"), p(E, "rimraf: missing options"), p.strictEqual(typeof E, "object", "rimraf: options should be object");
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
    if (p(y), p(E), E.readdirSync(y).forEach((g) => n(d.join(y, g), E)), o) {
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
  const e = requireGracefulFs(), d = requireUniversalify().fromCallback, p = /* @__PURE__ */ requireRimraf();
  function o(u, i) {
    if (e.rm) return e.rm(u, { recursive: !0, force: !0 }, i);
    p(u, i);
  }
  function c(u) {
    if (e.rmSync) return e.rmSync(u, { recursive: !0, force: !0 });
    p.sync(u);
  }
  return remove_1 = {
    remove: d(o),
    removeSync: c
  }, remove_1;
}
var empty, hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  const e = requireUniversalify().fromPromise, d = /* @__PURE__ */ requireFs(), p = require$$1$1, o = /* @__PURE__ */ requireMkdirs(), c = /* @__PURE__ */ requireRemove(), u = e(async function(r) {
    let a;
    try {
      a = await d.readdir(r);
    } catch {
      return o.mkdirs(r);
    }
    return Promise.all(a.map((t) => c.remove(p.join(r, t))));
  });
  function i(f) {
    let r;
    try {
      r = d.readdirSync(f);
    } catch {
      return o.mkdirsSync(f);
    }
    r.forEach((a) => {
      a = p.join(f, a), c.removeSync(a);
    });
  }
  return empty = {
    emptyDirSync: i,
    emptydirSync: i,
    emptyDir: u,
    emptydir: u
  }, empty;
}
var file, hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const e = requireUniversalify().fromCallback, d = require$$1$1, p = requireGracefulFs(), o = /* @__PURE__ */ requireMkdirs();
  function c(i, f) {
    function r() {
      p.writeFile(i, "", (a) => {
        if (a) return f(a);
        f();
      });
    }
    p.stat(i, (a, t) => {
      if (!a && t.isFile()) return f();
      const n = d.dirname(i);
      p.stat(n, (s, m) => {
        if (s)
          return s.code === "ENOENT" ? o.mkdirs(n, (y) => {
            if (y) return f(y);
            r();
          }) : f(s);
        m.isDirectory() ? r() : p.readdir(n, (y) => {
          if (y) return f(y);
        });
      });
    });
  }
  function u(i) {
    let f;
    try {
      f = p.statSync(i);
    } catch {
    }
    if (f && f.isFile()) return;
    const r = d.dirname(i);
    try {
      p.statSync(r).isDirectory() || p.readdirSync(r);
    } catch (a) {
      if (a && a.code === "ENOENT") o.mkdirsSync(r);
      else throw a;
    }
    p.writeFileSync(i, "");
  }
  return file = {
    createFile: e(c),
    createFileSync: u
  }, file;
}
var link, hasRequiredLink;
function requireLink() {
  if (hasRequiredLink) return link;
  hasRequiredLink = 1;
  const e = requireUniversalify().fromCallback, d = require$$1$1, p = requireGracefulFs(), o = /* @__PURE__ */ requireMkdirs(), c = requirePathExists().pathExists, { areIdentical: u } = /* @__PURE__ */ requireStat();
  function i(r, a, t) {
    function n(s, m) {
      p.link(s, m, (y) => {
        if (y) return t(y);
        t(null);
      });
    }
    p.lstat(a, (s, m) => {
      p.lstat(r, (y, E) => {
        if (y)
          return y.message = y.message.replace("lstat", "ensureLink"), t(y);
        if (m && u(E, m)) return t(null);
        const g = d.dirname(a);
        c(g, (q, C) => {
          if (q) return t(q);
          if (C) return n(r, a);
          o.mkdirs(g, (P) => {
            if (P) return t(P);
            n(r, a);
          });
        });
      });
    });
  }
  function f(r, a) {
    let t;
    try {
      t = p.lstatSync(a);
    } catch {
    }
    try {
      const m = p.lstatSync(r);
      if (t && u(m, t)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const n = d.dirname(a);
    return p.existsSync(n) || o.mkdirsSync(n), p.linkSync(r, a);
  }
  return link = {
    createLink: e(i),
    createLinkSync: f
  }, link;
}
var symlinkPaths_1, hasRequiredSymlinkPaths;
function requireSymlinkPaths() {
  if (hasRequiredSymlinkPaths) return symlinkPaths_1;
  hasRequiredSymlinkPaths = 1;
  const e = require$$1$1, d = requireGracefulFs(), p = requirePathExists().pathExists;
  function o(u, i, f) {
    if (e.isAbsolute(u))
      return d.lstat(u, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), f(r)) : f(null, {
        toCwd: u,
        toDst: u
      }));
    {
      const r = e.dirname(i), a = e.join(r, u);
      return p(a, (t, n) => t ? f(t) : n ? f(null, {
        toCwd: a,
        toDst: u
      }) : d.lstat(u, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), f(s)) : f(null, {
        toCwd: u,
        toDst: e.relative(r, u)
      })));
    }
  }
  function c(u, i) {
    let f;
    if (e.isAbsolute(u)) {
      if (f = d.existsSync(u), !f) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: u,
        toDst: u
      };
    } else {
      const r = e.dirname(i), a = e.join(r, u);
      if (f = d.existsSync(a), f)
        return {
          toCwd: a,
          toDst: u
        };
      if (f = d.existsSync(u), !f) throw new Error("relative srcpath does not exist");
      return {
        toCwd: u,
        toDst: e.relative(r, u)
      };
    }
  }
  return symlinkPaths_1 = {
    symlinkPaths: o,
    symlinkPathsSync: c
  }, symlinkPaths_1;
}
var symlinkType_1, hasRequiredSymlinkType;
function requireSymlinkType() {
  if (hasRequiredSymlinkType) return symlinkType_1;
  hasRequiredSymlinkType = 1;
  const e = requireGracefulFs();
  function d(o, c, u) {
    if (u = typeof c == "function" ? c : u, c = typeof c == "function" ? !1 : c, c) return u(null, c);
    e.lstat(o, (i, f) => {
      if (i) return u(null, "file");
      c = f && f.isDirectory() ? "dir" : "file", u(null, c);
    });
  }
  function p(o, c) {
    let u;
    if (c) return c;
    try {
      u = e.lstatSync(o);
    } catch {
      return "file";
    }
    return u && u.isDirectory() ? "dir" : "file";
  }
  return symlinkType_1 = {
    symlinkType: d,
    symlinkTypeSync: p
  }, symlinkType_1;
}
var symlink, hasRequiredSymlink;
function requireSymlink() {
  if (hasRequiredSymlink) return symlink;
  hasRequiredSymlink = 1;
  const e = requireUniversalify().fromCallback, d = require$$1$1, p = /* @__PURE__ */ requireFs(), o = /* @__PURE__ */ requireMkdirs(), c = o.mkdirs, u = o.mkdirsSync, i = /* @__PURE__ */ requireSymlinkPaths(), f = i.symlinkPaths, r = i.symlinkPathsSync, a = /* @__PURE__ */ requireSymlinkType(), t = a.symlinkType, n = a.symlinkTypeSync, s = requirePathExists().pathExists, { areIdentical: m } = /* @__PURE__ */ requireStat();
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
    f(q, C, (b, I) => {
      if (b) return $(b);
      q = I.toDst, t(I.toCwd, P, (T, A) => {
        if (T) return $(T);
        const w = d.dirname(C);
        s(w, (z, J) => {
          if (z) return $(z);
          if (J) return p.symlink(q, C, A, $);
          c(w, (H) => {
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
      const A = p.statSync(q), w = p.statSync(C);
      if (m(A, w)) return;
    }
    const b = r(q, C);
    q = b.toDst, P = n(b.toCwd, P);
    const I = d.dirname(C);
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
  const { createFile: e, createFileSync: d } = /* @__PURE__ */ requireFile(), { createLink: p, createLinkSync: o } = /* @__PURE__ */ requireLink(), { createSymlink: c, createSymlinkSync: u } = /* @__PURE__ */ requireSymlink();
  return ensure = {
    // file
    createFile: e,
    createFileSync: d,
    ensureFile: e,
    ensureFileSync: d,
    // link
    createLink: p,
    createLinkSync: o,
    ensureLink: p,
    ensureLinkSync: o,
    // symlink
    createSymlink: c,
    createSymlinkSync: u,
    ensureSymlink: c,
    ensureSymlinkSync: u
  }, ensure;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  function e(p, { EOL: o = `
`, finalEOL: c = !0, replacer: u = null, spaces: i } = {}) {
    const f = c ? o : "";
    return JSON.stringify(p, u, i).replace(/\n/g, o) + f;
  }
  function d(p) {
    return Buffer.isBuffer(p) && (p = p.toString("utf8")), p.replace(/^\uFEFF/, "");
  }
  return utils = { stringify: e, stripBom: d }, utils;
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
  const d = requireUniversalify(), { stringify: p, stripBom: o } = requireUtils();
  async function c(t, n = {}) {
    typeof n == "string" && (n = { encoding: n });
    const s = n.fs || e, m = "throws" in n ? n.throws : !0;
    let y = await d.fromCallback(s.readFile)(t, n);
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
  const u = d.fromPromise(c);
  function i(t, n = {}) {
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
  async function f(t, n, s = {}) {
    const m = s.fs || e, y = p(n, s);
    await d.fromCallback(m.writeFile)(t, y, s);
  }
  const r = d.fromPromise(f);
  function a(t, n, s = {}) {
    const m = s.fs || e, y = p(n, s);
    return m.writeFileSync(t, y, s);
  }
  return jsonfile$1 = {
    readFile: u,
    readFileSync: i,
    writeFile: r,
    writeFileSync: a
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
  const e = requireUniversalify().fromCallback, d = requireGracefulFs(), p = require$$1$1, o = /* @__PURE__ */ requireMkdirs(), c = requirePathExists().pathExists;
  function u(f, r, a, t) {
    typeof a == "function" && (t = a, a = "utf8");
    const n = p.dirname(f);
    c(n, (s, m) => {
      if (s) return t(s);
      if (m) return d.writeFile(f, r, a, t);
      o.mkdirs(n, (y) => {
        if (y) return t(y);
        d.writeFile(f, r, a, t);
      });
    });
  }
  function i(f, ...r) {
    const a = p.dirname(f);
    if (d.existsSync(a))
      return d.writeFileSync(f, ...r);
    o.mkdirsSync(a), d.writeFileSync(f, ...r);
  }
  return outputFile_1 = {
    outputFile: e(u),
    outputFileSync: i
  }, outputFile_1;
}
var outputJson_1, hasRequiredOutputJson;
function requireOutputJson() {
  if (hasRequiredOutputJson) return outputJson_1;
  hasRequiredOutputJson = 1;
  const { stringify: e } = requireUtils(), { outputFile: d } = /* @__PURE__ */ requireOutputFile();
  async function p(o, c, u = {}) {
    const i = e(c, u);
    await d(o, i, u);
  }
  return outputJson_1 = p, outputJson_1;
}
var outputJsonSync_1, hasRequiredOutputJsonSync;
function requireOutputJsonSync() {
  if (hasRequiredOutputJsonSync) return outputJsonSync_1;
  hasRequiredOutputJsonSync = 1;
  const { stringify: e } = requireUtils(), { outputFileSync: d } = /* @__PURE__ */ requireOutputFile();
  function p(o, c, u) {
    const i = e(c, u);
    d(o, i, u);
  }
  return outputJsonSync_1 = p, outputJsonSync_1;
}
var json$1, hasRequiredJson$1;
function requireJson$1() {
  if (hasRequiredJson$1) return json$1;
  hasRequiredJson$1 = 1;
  const e = requireUniversalify().fromPromise, d = /* @__PURE__ */ requireJsonfile();
  return d.outputJson = e(/* @__PURE__ */ requireOutputJson()), d.outputJsonSync = /* @__PURE__ */ requireOutputJsonSync(), d.outputJSON = d.outputJson, d.outputJSONSync = d.outputJsonSync, d.writeJSON = d.writeJson, d.writeJSONSync = d.writeJsonSync, d.readJSON = d.readJson, d.readJSONSync = d.readJsonSync, json$1 = d, json$1;
}
var move_1, hasRequiredMove$1;
function requireMove$1() {
  if (hasRequiredMove$1) return move_1;
  hasRequiredMove$1 = 1;
  const e = requireGracefulFs(), d = require$$1$1, p = requireCopy().copy, o = requireRemove().remove, c = requireMkdirs().mkdirp, u = requirePathExists().pathExists, i = /* @__PURE__ */ requireStat();
  function f(s, m, y, E) {
    typeof y == "function" && (E = y, y = {}), y = y || {};
    const g = y.overwrite || y.clobber || !1;
    i.checkPaths(s, m, "move", y, (q, C) => {
      if (q) return E(q);
      const { srcStat: P, isChangingCase: $ = !1 } = C;
      i.checkParentPaths(s, P, m, "move", (b) => {
        if (b) return E(b);
        if (r(m)) return a(s, m, g, $, E);
        c(d.dirname(m), (I) => I ? E(I) : a(s, m, g, $, E));
      });
    });
  }
  function r(s) {
    const m = d.dirname(s);
    return d.parse(m).root === m;
  }
  function a(s, m, y, E, g) {
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
  return move_1 = f, move_1;
}
var moveSync_1, hasRequiredMoveSync;
function requireMoveSync() {
  if (hasRequiredMoveSync) return moveSync_1;
  hasRequiredMoveSync = 1;
  const e = requireGracefulFs(), d = require$$1$1, p = requireCopy().copySync, o = requireRemove().removeSync, c = requireMkdirs().mkdirpSync, u = /* @__PURE__ */ requireStat();
  function i(n, s, m) {
    m = m || {};
    const y = m.overwrite || m.clobber || !1, { srcStat: E, isChangingCase: g = !1 } = u.checkPathsSync(n, s, "move", m);
    return u.checkParentPathsSync(n, E, s, "move"), f(s) || c(d.dirname(s)), r(n, s, y, g);
  }
  function f(n) {
    const s = d.dirname(n);
    return d.parse(s).root === s;
  }
  function r(n, s, m, y) {
    if (y) return a(n, s, m);
    if (m)
      return o(s), a(n, s, m);
    if (e.existsSync(s)) throw new Error("dest already exists.");
    return a(n, s, m);
  }
  function a(n, s, m) {
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
  return moveSync_1 = i, moveSync_1;
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
  let d = class extends e.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(c) {
      this.removeParentCancelHandler(), this._parent = c, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(c) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, c != null && (this.parent = c);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(c) {
      this.cancelled ? c() : this.once("cancel", c);
    }
    createPromise(c) {
      if (this.cancelled)
        return Promise.reject(new p());
      const u = () => {
        if (i != null)
          try {
            this.removeListener("cancel", i), i = null;
          } catch {
          }
      };
      let i = null;
      return new Promise((f, r) => {
        let a = null;
        if (i = () => {
          try {
            a != null && (a(), a = null);
          } finally {
            r(new p());
          }
        }, this.cancelled) {
          i();
          return;
        }
        this.onCancel(i), c(f, r, (t) => {
          a = t;
        });
      }).then((f) => (u(), f)).catch((f) => {
        throw u(), f;
      });
    }
    removeParentCancelHandler() {
      const c = this._parent;
      c != null && this.parentCancelHandler != null && (c.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  CancellationToken.CancellationToken = d;
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
  function e(d, p) {
    const o = new Error(d);
    return o.code = p, o;
  }
  return error;
}
var httpExecutor = {}, src = { exports: {} }, browser = { exports: {} }, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var e = 1e3, d = e * 60, p = d * 60, o = p * 24, c = o * 7, u = o * 365.25;
  ms = function(t, n) {
    n = n || {};
    var s = typeof t;
    if (s === "string" && t.length > 0)
      return i(t);
    if (s === "number" && isFinite(t))
      return n.long ? r(t) : f(t);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(t)
    );
  };
  function i(t) {
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
            return s * c;
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
            return s * d;
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
  function f(t) {
    var n = Math.abs(t);
    return n >= o ? Math.round(t / o) + "d" : n >= p ? Math.round(t / p) + "h" : n >= d ? Math.round(t / d) + "m" : n >= e ? Math.round(t / e) + "s" : t + "ms";
  }
  function r(t) {
    var n = Math.abs(t);
    return n >= o ? a(t, n, o, "day") : n >= p ? a(t, n, p, "hour") : n >= d ? a(t, n, d, "minute") : n >= e ? a(t, n, e, "second") : t + " ms";
  }
  function a(t, n, s, m) {
    var y = n >= s * 1.5;
    return Math.round(t / s) + " " + m + (y ? "s" : "");
  }
  return ms;
}
var common$1, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  function e(d) {
    o.debug = o, o.default = o, o.coerce = a, o.disable = f, o.enable = u, o.enabled = r, o.humanize = requireMs(), o.destroy = t, Object.keys(d).forEach((n) => {
      o[n] = d[n];
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
          const w = o.formatters[A];
          if (typeof w == "function") {
            const z = q[b];
            T = w.call(C, z), q.splice(b, 1), b--;
          }
          return T;
        }), o.formatArgs.call(C, q), (C.log || o.log).apply(C, q);
      }
      return g.namespace = n, g.useColors = o.useColors(), g.color = o.selectColor(n), g.extend = c, g.destroy = o.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (y !== o.namespaces && (y = o.namespaces, E = o.enabled(n)), E),
        set: (q) => {
          m = q;
        }
      }), typeof o.init == "function" && o.init(g), g;
    }
    function c(n, s) {
      const m = o(this.namespace + (typeof s > "u" ? ":" : s) + n);
      return m.log = this.log, m;
    }
    function u(n) {
      o.save(n), o.namespaces = n, o.names = [], o.skips = [];
      const s = (typeof n == "string" ? n : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of s)
        m[0] === "-" ? o.skips.push(m.slice(1)) : o.names.push(m);
    }
    function i(n, s) {
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
    function f() {
      const n = [
        ...o.names,
        ...o.skips.map((s) => "-" + s)
      ].join(",");
      return o.enable(""), n;
    }
    function r(n) {
      for (const s of o.skips)
        if (i(n, s))
          return !1;
      for (const s of o.names)
        if (i(n, s))
          return !0;
      return !1;
    }
    function a(n) {
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
  return hasRequiredBrowser || (hasRequiredBrowser = 1, (function(e, d) {
    d.formatArgs = o, d.save = c, d.load = u, d.useColors = p, d.storage = i(), d.destroy = /* @__PURE__ */ (() => {
      let r = !1;
      return () => {
        r || (r = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), d.colors = [
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
      const a = "color: " + this.color;
      r.splice(1, 0, a, "color: inherit");
      let t = 0, n = 0;
      r[0].replace(/%[a-zA-Z%]/g, (s) => {
        s !== "%%" && (t++, s === "%c" && (n = t));
      }), r.splice(n, 0, a);
    }
    d.log = console.debug || console.log || (() => {
    });
    function c(r) {
      try {
        r ? d.storage.setItem("debug", r) : d.storage.removeItem("debug");
      } catch {
      }
    }
    function u() {
      let r;
      try {
        r = d.storage.getItem("debug") || d.storage.getItem("DEBUG");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function i() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = requireCommon$1()(d);
    const { formatters: f } = e.exports;
    f.j = function(r) {
      try {
        return JSON.stringify(r);
      } catch (a) {
        return "[UnexpectedJSONParseError]: " + a.message;
      }
    };
  })(browser, browser.exports)), browser.exports;
}
var node = { exports: {} }, hasFlag, hasRequiredHasFlag;
function requireHasFlag() {
  return hasRequiredHasFlag || (hasRequiredHasFlag = 1, hasFlag = (e, d = process.argv) => {
    const p = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", o = d.indexOf(p + e), c = d.indexOf("--");
    return o !== -1 && (c === -1 || o < c);
  }), hasFlag;
}
var supportsColor_1, hasRequiredSupportsColor;
function requireSupportsColor() {
  if (hasRequiredSupportsColor) return supportsColor_1;
  hasRequiredSupportsColor = 1;
  const e = require$$2, d = require$$1$2, p = requireHasFlag(), { env: o } = process;
  let c;
  p("no-color") || p("no-colors") || p("color=false") || p("color=never") ? c = 0 : (p("color") || p("colors") || p("color=true") || p("color=always")) && (c = 1), "FORCE_COLOR" in o && (o.FORCE_COLOR === "true" ? c = 1 : o.FORCE_COLOR === "false" ? c = 0 : c = o.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(o.FORCE_COLOR, 10), 3));
  function u(r) {
    return r === 0 ? !1 : {
      level: r,
      hasBasic: !0,
      has256: r >= 2,
      has16m: r >= 3
    };
  }
  function i(r, a) {
    if (c === 0)
      return 0;
    if (p("color=16m") || p("color=full") || p("color=truecolor"))
      return 3;
    if (p("color=256"))
      return 2;
    if (r && !a && c === void 0)
      return 0;
    const t = c || 0;
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
  function f(r) {
    const a = i(r, r && r.isTTY);
    return u(a);
  }
  return supportsColor_1 = {
    supportsColor: f,
    stdout: u(i(!0, d.isatty(1))),
    stderr: u(i(!0, d.isatty(2)))
  }, supportsColor_1;
}
var hasRequiredNode;
function requireNode() {
  return hasRequiredNode || (hasRequiredNode = 1, (function(e, d) {
    const p = require$$1$2, o = require$$4;
    d.init = t, d.log = f, d.formatArgs = u, d.save = r, d.load = a, d.useColors = c, d.destroy = o.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), d.colors = [6, 2, 3, 4, 5, 1];
    try {
      const s = requireSupportsColor();
      s && (s.stderr || s).level >= 2 && (d.colors = [
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
    d.inspectOpts = Object.keys(process.env).filter((s) => /^debug_/i.test(s)).reduce((s, m) => {
      const y = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, q) => q.toUpperCase());
      let E = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(E) ? E = !0 : /^(no|off|false|disabled)$/i.test(E) ? E = !1 : E === "null" ? E = null : E = Number(E), s[y] = E, s;
    }, {});
    function c() {
      return "colors" in d.inspectOpts ? !!d.inspectOpts.colors : p.isatty(process.stderr.fd);
    }
    function u(s) {
      const { namespace: m, useColors: y } = this;
      if (y) {
        const E = this.color, g = "\x1B[3" + (E < 8 ? E : "8;5;" + E), q = `  ${g};1m${m} \x1B[0m`;
        s[0] = q + s[0].split(`
`).join(`
` + q), s.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        s[0] = i() + m + " " + s[0];
    }
    function i() {
      return d.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function f(...s) {
      return process.stderr.write(o.formatWithOptions(d.inspectOpts, ...s) + `
`);
    }
    function r(s) {
      s ? process.env.DEBUG = s : delete process.env.DEBUG;
    }
    function a() {
      return process.env.DEBUG;
    }
    function t(s) {
      s.inspectOpts = {};
      const m = Object.keys(d.inspectOpts);
      for (let y = 0; y < m.length; y++)
        s.inspectOpts[m[y]] = d.inspectOpts[m[y]];
    }
    e.exports = requireCommon$1()(d);
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
  let d = class extends e.Transform {
    constructor(o, c, u) {
      super(), this.total = o, this.cancellationToken = c, this.onProgress = u, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(o, c, u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"), null);
        return;
      }
      this.transferred += o.length, this.delta += o.length;
      const i = Date.now();
      i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
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
  return ProgressCallbackTransform.ProgressCallbackTransform = d, ProgressCallbackTransform;
}
var hasRequiredHttpExecutor;
function requireHttpExecutor() {
  if (hasRequiredHttpExecutor) return httpExecutor;
  hasRequiredHttpExecutor = 1, Object.defineProperty(httpExecutor, "__esModule", { value: !0 }), httpExecutor.DigestTransform = httpExecutor.HttpExecutor = httpExecutor.HttpError = void 0, httpExecutor.createHttpError = a, httpExecutor.parseJson = s, httpExecutor.configureRequestOptionsFromUrl = E, httpExecutor.configureRequestUrl = g, httpExecutor.safeGetHeader = P, httpExecutor.configureRequestOptions = b, httpExecutor.safeStringifyJson = I;
  const e = require$$0$3, d = requireSrc(), p = require$$1, o = require$$0$1, c = require$$2$1, u = requireCancellationToken(), i = requireError(), f = requireProgressCallbackTransform(), r = (0, d.default)("electron-builder");
  function a(T, A = null) {
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
    constructor(A, w = `HTTP error: ${t.get(A) || A}`, z = null) {
      super(w), this.statusCode = A, this.description = z, this.name = "HttpError", this.code = `HTTP_ERROR_${A}`;
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
    request(A, w = new u.CancellationToken(), z) {
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
      return this.doApiRequest(A, w, (X) => X.end(H));
    }
    doApiRequest(A, w, z, J = 0) {
      return r.enabled && r(`Request: ${I(A)}`), w.createPromise((H, X, N) => {
        const U = this.createRequest(A, (ne) => {
          try {
            this.handleResponse(ne, A, w, H, X, J, z);
          } catch (L) {
            X(L);
          }
        });
        this.addErrorAndTimeoutHandlers(U, X, A.timeout), this.addRedirectHandlers(U, A, X, J, (ne) => {
          this.doApiRequest(ne, w, z, J).then(H).catch(X);
        }), z(U, X), N(() => U.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(A, w, z, J, H) {
    }
    addErrorAndTimeoutHandlers(A, w, z = 60 * 1e3) {
      this.addTimeOutHandler(A, w, z), A.on("error", w), A.on("aborted", () => {
        w(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(A, w, z, J, H, X, N) {
      var U;
      if (r.enabled && r(`Response: ${A.statusCode} ${A.statusMessage}, request options: ${I(w)}`), A.statusCode === 404) {
        H(a(A, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

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
        this.doApiRequest(m.prepareRedirectUrlOptions(K, w), z, N, X).then(J).catch(H);
        return;
      }
      A.setEncoding("utf8");
      let ue = "";
      A.on("error", H), A.on("data", (fe) => ue += fe), A.on("end", () => {
        try {
          if (A.statusCode != null && A.statusCode >= 400) {
            const fe = P(A, "content-type"), ge = fe != null && (Array.isArray(fe) ? fe.find((de) => de.includes("json")) != null : fe.includes("json"));
            H(a(A, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

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
    async downloadToBuffer(A, w) {
      return await w.cancellationToken.createPromise((z, J, H) => {
        const X = [], N = {
          headers: w.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        g(A, N), b(N), this.doDownload(N, {
          destination: null,
          options: w,
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
    doDownload(A, w, z) {
      const J = this.createRequest(A, (H) => {
        if (H.statusCode >= 400) {
          w.callback(new Error(`Cannot download "${A.protocol || "https:"}//${A.hostname}${A.path}", status ${H.statusCode}: ${H.statusMessage}`));
          return;
        }
        H.on("error", w.callback);
        const X = P(H, "location");
        if (X != null) {
          z < this.maxRedirects ? this.doDownload(m.prepareRedirectUrlOptions(X, A), w, z++) : w.callback(this.createMaxRedirectError());
          return;
        }
        w.responseHandler == null ? $(w, H) : w.responseHandler(H, w.callback);
      });
      this.addErrorAndTimeoutHandlers(J, w.callback, A.timeout), this.addRedirectHandlers(J, A, w.callback, z, (H) => {
        this.doDownload(H, w, z++);
      }), J.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(A, w, z) {
      A.on("socket", (J) => {
        J.setTimeout(z, () => {
          A.abort(), w(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(A, w) {
      const z = E(A, { ...w }), J = z.headers;
      if (J != null && J.authorization) {
        const H = m.reconstructOriginalUrl(w), X = y(A, w);
        m.isCrossOriginRedirect(H, X) && (r.enabled && r(`Given the cross-origin redirect (from ${H.host} to ${X.host}), the Authorization header will be stripped out.`), delete J.authorization);
      }
      return z;
    }
    static reconstructOriginalUrl(A) {
      const w = A.protocol || "https:";
      if (!A.hostname)
        throw new Error("Missing hostname in request options");
      const z = A.hostname, J = A.port ? `:${A.port}` : "", H = A.path || "/";
      return new c.URL(`${w}//${z}${J}${H}`);
    }
    static isCrossOriginRedirect(A, w) {
      if (A.hostname.toLowerCase() !== w.hostname.toLowerCase())
        return !0;
      if (A.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(A.port) && w.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(w.port))
        return !1;
      if (A.protocol !== w.protocol)
        return !0;
      const z = A.port, J = w.port;
      return z !== J;
    }
    static retryOnServerError(A, w = 3) {
      for (let z = 0; ; z++)
        try {
          return A();
        } catch (J) {
          if (z < w && (J instanceof n && J.isServerError() || J.code === "EPIPE"))
            continue;
          throw J;
        }
    }
  }
  httpExecutor.HttpExecutor = m;
  function y(T, A) {
    try {
      return new c.URL(T);
    } catch {
      const w = A.hostname, z = A.protocol || "https:", J = A.port ? `:${A.port}` : "", H = `${z}//${w}${J}`;
      return new c.URL(T, H);
    }
  }
  function E(T, A) {
    const w = b(A), z = y(T, A);
    return g(z, w), w;
  }
  function g(T, A) {
    A.protocol = T.protocol, A.hostname = T.hostname, T.port ? A.port = T.port : A.port && delete A.port, A.path = T.pathname + T.search;
  }
  class q extends o.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(A, w = "sha512", z = "base64") {
      super(), this.expected = A, this.algorithm = w, this.encoding = z, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, e.createHash)(w);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(A, w, z) {
      this.digester.update(A), z(null, A);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(A) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (w) {
          A(w);
          return;
        }
      A(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, i.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, i.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  httpExecutor.DigestTransform = q;
  function C(T, A, w) {
    return T != null && A != null && T !== A ? (w(new Error(`checksum mismatch: expected ${A} but got ${T} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function P(T, A) {
    const w = T.headers[A];
    return w == null ? null : Array.isArray(w) ? w.length === 0 ? null : w[w.length - 1] : w;
  }
  function $(T, A) {
    if (!C(P(A, "X-Checksum-Sha2"), T.options.sha2, T.callback))
      return;
    const w = [];
    if (T.options.onProgress != null) {
      const X = P(A, "content-length");
      X != null && w.push(new f.ProgressCallbackTransform(parseInt(X, 10), T.options.cancellationToken, T.options.onProgress));
    }
    const z = T.options.sha512;
    z != null ? w.push(new q(z, "sha512", z.length === 128 && !z.includes("+") && !z.includes("Z") && !z.includes("=") ? "hex" : "base64")) : T.options.sha2 != null && w.push(new q(T.options.sha2, "sha256", "hex"));
    const J = (0, p.createWriteStream)(T.destination);
    w.push(J);
    let H = A;
    for (const X of w)
      X.on("error", (N) => {
        J.close(), T.options.cancellationToken.cancelled || T.callback(N);
      }), H = H.pipe(X);
    J.on("finish", () => {
      J.close(T.callback);
    });
  }
  function b(T, A, w) {
    w != null && (T.method = w), T.headers = { ...T.headers };
    const z = T.headers;
    return A != null && (z.authorization = A.startsWith("Basic") || A.startsWith("Bearer") ? A : `token ${A}`), z["User-Agent"] == null && (z["User-Agent"] = "electron-builder"), (w == null || w === "GET" || z["Cache-Control"] == null) && (z["Cache-Control"] = "no-cache"), T.protocol == null && process.versions.electron != null && (T.protocol = "https:"), T;
  }
  function I(T, A) {
    return JSON.stringify(T, (w, z) => w.endsWith("Authorization") || w.endsWith("authorization") || w.endsWith("Password") || w.endsWith("PASSWORD") || w.endsWith("Token") || w.includes("password") || w.includes("token") || A != null && A.has(w) ? "<stripped sensitive data>" : z, 2);
  }
  return httpExecutor;
}
var MemoLazy = {}, hasRequiredMemoLazy;
function requireMemoLazy() {
  if (hasRequiredMemoLazy) return MemoLazy;
  hasRequiredMemoLazy = 1, Object.defineProperty(MemoLazy, "__esModule", { value: !0 }), MemoLazy.MemoLazy = void 0;
  let e = class {
    constructor(o, c) {
      this.selector = o, this.creator = c, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const o = this.selector();
      if (this._value !== void 0 && d(this.selected, o))
        return this._value;
      this.selected = o;
      const c = this.creator(o);
      return this.value = c, c;
    }
    set value(o) {
      this._value = o;
    }
  };
  MemoLazy.MemoLazy = e;
  function d(p, o) {
    if (typeof p == "object" && p !== null && (typeof o == "object" && o !== null)) {
      const i = Object.keys(p), f = Object.keys(o);
      return i.length === f.length && i.every((r) => d(p[r], o[r]));
    }
    return p === o;
  }
  return MemoLazy;
}
var publishOptions = {}, hasRequiredPublishOptions;
function requirePublishOptions() {
  if (hasRequiredPublishOptions) return publishOptions;
  hasRequiredPublishOptions = 1, Object.defineProperty(publishOptions, "__esModule", { value: !0 }), publishOptions.githubUrl = e, publishOptions.githubTagPrefix = d, publishOptions.getS3LikeProviderBaseUrl = p;
  function e(i, f = "github.com") {
    return `${i.protocol || "https"}://${i.host || f}`;
  }
  function d(i) {
    var f;
    return i.tagNamePrefix ? i.tagNamePrefix : !((f = i.vPrefixedTagName) !== null && f !== void 0) || f ? "v" : "";
  }
  function p(i) {
    const f = i.provider;
    if (f === "s3")
      return o(i);
    if (f === "spaces")
      return u(i);
    throw new Error(`Not supported provider: ${f}`);
  }
  function o(i) {
    let f;
    if (i.accelerate == !0)
      f = `https://${i.bucket}.s3-accelerate.amazonaws.com`;
    else if (i.endpoint != null)
      f = `${i.endpoint}/${i.bucket}`;
    else if (i.bucket.includes(".")) {
      if (i.region == null)
        throw new Error(`Bucket name "${i.bucket}" includes a dot, but S3 region is missing`);
      i.region === "us-east-1" ? f = `https://s3.amazonaws.com/${i.bucket}` : f = `https://s3-${i.region}.amazonaws.com/${i.bucket}`;
    } else i.region === "cn-north-1" ? f = `https://${i.bucket}.s3.${i.region}.amazonaws.com.cn` : f = `https://${i.bucket}.s3.amazonaws.com`;
    return c(f, i.path);
  }
  function c(i, f) {
    return f != null && f.length > 0 && (f.startsWith("/") || (i += "/"), i += f), i;
  }
  function u(i) {
    if (i.name == null)
      throw new Error("name is missing");
    if (i.region == null)
      throw new Error("region is missing");
    return c(`https://${i.name}.${i.region}.digitaloceanspaces.com`, i.path);
  }
  return publishOptions;
}
var retry = {}, hasRequiredRetry;
function requireRetry() {
  if (hasRequiredRetry) return retry;
  hasRequiredRetry = 1, Object.defineProperty(retry, "__esModule", { value: !0 }), retry.retry = d;
  const e = requireCancellationToken();
  async function d(p, o) {
    var c;
    const { retries: u, interval: i, backoff: f = 0, attempt: r = 0, shouldRetry: a, cancellationToken: t = new e.CancellationToken() } = o;
    try {
      return await p();
    } catch (n) {
      if (await Promise.resolve((c = a == null ? void 0 : a(n)) !== null && c !== void 0 ? c : !0) && u > 0 && !t.cancelled)
        return await new Promise((s) => setTimeout(s, i + f * r)), await d(p, { ...o, retries: u - 1, attempt: r + 1 });
      throw n;
    }
  }
  return retry;
}
var rfc2253Parser = {}, hasRequiredRfc2253Parser;
function requireRfc2253Parser() {
  if (hasRequiredRfc2253Parser) return rfc2253Parser;
  hasRequiredRfc2253Parser = 1, Object.defineProperty(rfc2253Parser, "__esModule", { value: !0 }), rfc2253Parser.parseDn = e;
  function e(d) {
    let p = !1, o = null, c = "", u = 0;
    d = d.trim();
    const i = /* @__PURE__ */ new Map();
    for (let f = 0; f <= d.length; f++) {
      if (f === d.length) {
        o !== null && i.set(o, c);
        break;
      }
      const r = d[f];
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
          f++;
          const a = parseInt(d.slice(f, f + 2), 16);
          Number.isNaN(a) ? c += d[f] : (f++, c += String.fromCharCode(a));
          continue;
        }
        if (o === null && r === "=") {
          o = c, c = "";
          continue;
        }
        if (r === "," || r === ";" || r === "+") {
          o !== null && i.set(o, c), o = null, c = "";
          continue;
        }
      }
      if (r === " " && !p) {
        if (c.length === 0)
          continue;
        if (f > u) {
          let a = f;
          for (; d[a] === " "; )
            a++;
          u = a;
        }
        if (u >= d.length || d[u] === "," || d[u] === ";" || o === null && d[u] === "=" || o !== null && d[u] === "+") {
          f = u - 1;
          continue;
        }
      }
      c += r;
    }
    return i;
  }
  return rfc2253Parser;
}
var uuid = {}, hasRequiredUuid;
function requireUuid() {
  if (hasRequiredUuid) return uuid;
  hasRequiredUuid = 1, Object.defineProperty(uuid, "__esModule", { value: !0 }), uuid.nil = uuid.UUID = void 0;
  const e = require$$0$3, d = requireError(), p = "options.name must be either a string or a Buffer", o = (0, e.randomBytes)(16);
  o[0] = o[0] | 1;
  const c = {}, u = [];
  for (let n = 0; n < 256; n++) {
    const s = (n + 256).toString(16).substr(1);
    c[s] = n, u[n] = s;
  }
  class i {
    constructor(s) {
      this.ascii = null, this.binary = null;
      const m = i.check(s);
      if (!m)
        throw new Error("not a UUID");
      this.version = m.version, m.format === "ascii" ? this.ascii = s : this.binary = s;
    }
    static v5(s, m) {
      return a(s, "sha1", 80, m);
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
          version: (c[s[14] + s[15]] & 240) >> 4,
          variant: f((c[s[19] + s[20]] & 224) >> 5),
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
          variant: f((s[m + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, d.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(s) {
      const m = Buffer.allocUnsafe(16);
      let y = 0;
      for (let E = 0; E < 16; E++)
        m[E] = c[s[y++] + s[y++]], (E === 3 || E === 5 || E === 7 || E === 9) && (y += 1);
      return m;
    }
  }
  uuid.UUID = i, i.OID = i.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function f(n) {
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
  function a(n, s, m, y, E = r.ASCII) {
    const g = (0, e.createHash)(s);
    if (typeof n != "string" && !Buffer.isBuffer(n))
      throw (0, d.newError)(p, "ERR_INVALID_UUID_NAME");
    g.update(y), g.update(n);
    const C = g.digest();
    let P;
    switch (E) {
      case r.BINARY:
        C[6] = C[6] & 15 | m, C[8] = C[8] & 63 | 128, P = C;
        break;
      case r.OBJECT:
        C[6] = C[6] & 15 | m, C[8] = C[8] & 63 | 128, P = new i(C);
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
  return uuid.nil = new i("00000000-0000-0000-0000-000000000000"), uuid;
}
var xml = {}, sax = {}, hasRequiredSax;
function requireSax() {
  return hasRequiredSax || (hasRequiredSax = 1, (function(e) {
    (function(d) {
      d.parser = function(S, R) {
        return new o(S, R);
      }, d.SAXParser = o, d.SAXStream = t, d.createStream = a, d.MAX_BUFFER_LENGTH = 64 * 1024;
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
      d.EVENTS = [
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
        u(te), te.q = te.c = "", te.bufferCheckPosition = d.MAX_BUFFER_LENGTH, te.opt = R || {}, te.opt.lowercase = te.opt.lowercase || te.opt.lowercasetags, te.looseCase = te.opt.lowercase ? "toLowerCase" : "toUpperCase", te.tags = [], te.closed = te.closedRoot = te.sawRoot = !1, te.tag = te.error = null, te.strict = !!S, te.noscript = !!(S || te.opt.noscript), te.state = w.BEGIN, te.strictEntities = te.opt.strictEntities, te.ENTITIES = te.strictEntities ? Object.create(d.XML_ENTITIES) : Object.create(d.ENTITIES), te.attribList = [], te.opt.xmlns && (te.ns = Object.create(E)), te.opt.unquotedAttributeValues === void 0 && (te.opt.unquotedAttributeValues = !S), te.trackPosition = te.opt.position !== !1, te.trackPosition && (te.position = te.line = te.column = 0), J(te, "onready");
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
      function c(S) {
        for (var R = Math.max(d.MAX_BUFFER_LENGTH, 10), te = 0, k = 0, pe = p.length; k < pe; k++) {
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
        var ve = d.MAX_BUFFER_LENGTH - te;
        S.bufferCheckPosition = ve + S.position;
      }
      function u(S) {
        for (var R = 0, te = p.length; R < te; R++)
          S[p[R]] = "";
      }
      function i(S) {
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
          i(this);
        }
      };
      var f;
      try {
        f = require("stream").Stream;
      } catch {
        f = function() {
        };
      }
      f || (f = function() {
      });
      var r = d.EVENTS.filter(function(S) {
        return S !== "error" && S !== "end";
      });
      function a(S, R) {
        return new t(S, R);
      }
      function t(S, R) {
        if (!(this instanceof t))
          return new t(S, R);
        f.apply(this), this._parser = new o(S, R), this.writable = !0, this.readable = !0;
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
      t.prototype = Object.create(f.prototype, {
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
        }), f.prototype.on.call(te, S, R);
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
      var w = 0;
      d.STATE = {
        BEGIN: w++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: w++,
        // leading whitespace
        TEXT: w++,
        // general stuff
        TEXT_ENTITY: w++,
        // &amp and such.
        OPEN_WAKA: w++,
        // <
        SGML_DECL: w++,
        // <!BLARG
        SGML_DECL_QUOTED: w++,
        // <!BLARG foo "bar
        DOCTYPE: w++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: w++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: w++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: w++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: w++,
        // <!-
        COMMENT: w++,
        // <!--
        COMMENT_ENDING: w++,
        // <!-- blah -
        COMMENT_ENDED: w++,
        // <!-- blah --
        CDATA: w++,
        // <![CDATA[ something
        CDATA_ENDING: w++,
        // ]
        CDATA_ENDING_2: w++,
        // ]]
        PROC_INST: w++,
        // <?hi
        PROC_INST_BODY: w++,
        // <?hi there
        PROC_INST_ENDING: w++,
        // <?hi "there" ?
        OPEN_TAG: w++,
        // <strong
        OPEN_TAG_SLASH: w++,
        // <strong /
        ATTRIB: w++,
        // <a
        ATTRIB_NAME: w++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: w++,
        // <a foo _
        ATTRIB_VALUE: w++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: w++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: w++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: w++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: w++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: w++,
        // <foo bar=&quot
        CLOSE_TAG: w++,
        // </a
        CLOSE_TAG_SAW_WHITE: w++,
        // </a   >
        SCRIPT: w++,
        // <script> ...
        SCRIPT_ENDING: w++
        // <script> ... <
      }, d.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, d.ENTITIES = {
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
      }, Object.keys(d.ENTITIES).forEach(function(S) {
        var R = d.ENTITIES[S], te = typeof R == "number" ? String.fromCharCode(R) : R;
        d.ENTITIES[S] = te;
      });
      for (var z in d.STATE)
        d.STATE[d.STATE[z]] = z;
      w = d.STATE;
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
        return S.sawRoot && !S.closedRoot && L(S, "Unclosed root tag"), S.state !== w.BEGIN && S.state !== w.BEGIN_WHITESPACE && S.state !== w.TEXT && U(S, "Unexpected end"), X(S), S.c = "", S.closed = !0, J(S, "onend"), o.call(S, S.strict, S.opt), S;
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
          te.ns && pe.ns !== te.ns && Object.keys(te.ns).forEach(function(h) {
            H(S, "onopennamespace", {
              prefix: h,
              uri: te.ns[h]
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
        S.tag.isSelfClosing = !!R, S.sawRoot = !0, S.tags.push(S.tag), H(S, "onopentag", S.tag), R || (!S.noscript && S.tagName.toLowerCase() === "script" ? S.state = w.SCRIPT : S.state = w.TEXT, S.tag = null, S.tagName = ""), S.attribName = S.attribValue = "", S.attribList.length = 0;
      }
      function de(S) {
        if (!S.tagName) {
          L(S, "Weird empty close tag."), S.textNode += "</>", S.state = w.TEXT;
          return;
        }
        if (S.script) {
          if (S.tagName !== "script") {
            S.script += "</" + S.tagName + ">", S.tagName = "", S.state = w.SCRIPT;
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
          L(S, "Unmatched closing tag: " + S.tagName), S.textNode += "</" + S.tagName + ">", S.state = w.TEXT;
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
        R === 0 && (S.closedRoot = !0), S.tagName = S.attribValue = S.attribName = "", S.attribList.length = 0, S.state = w.TEXT;
      }
      function we(S) {
        var R = S.entity, te = R.toLowerCase(), k, pe = "";
        return S.ENTITIES[R] ? S.ENTITIES[R] : S.ENTITIES[te] ? S.ENTITIES[te] : (R = te, R.charAt(0) === "#" && (R.charAt(1) === "x" ? (R = R.slice(2), k = parseInt(R, 16), pe = k.toString(16)) : (R = R.slice(1), k = parseInt(R, 10), pe = k.toString(10))), R = R.replace(/^0+/, ""), isNaN(k) || pe.toLowerCase() !== R || k < 0 || k > 1114111 ? (L(S, "Invalid character entity"), "&" + S.entity + ";") : String.fromCodePoint(k));
      }
      function _e(S, R) {
        R === "<" ? (S.state = w.OPEN_WAKA, S.startTagPosition = S.position) : $(R) || (L(S, "Non-whitespace before first tag."), S.textNode = R, S.state = w.TEXT);
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
            case w.BEGIN:
              if (R.state = w.BEGIN_WHITESPACE, k === "\uFEFF")
                continue;
              _e(R, k);
              continue;
            case w.BEGIN_WHITESPACE:
              _e(R, k);
              continue;
            case w.TEXT:
              if (R.sawRoot && !R.closedRoot) {
                for (var ye = te - 1; k && k !== "<" && k !== "&"; )
                  k = ie(S, te++), k && R.trackPosition && (R.position++, k === `
` ? (R.line++, R.column = 0) : R.column++);
                R.textNode += S.substring(ye, te - 1);
              }
              k === "<" && !(R.sawRoot && R.closedRoot && !R.strict) ? (R.state = w.OPEN_WAKA, R.startTagPosition = R.position) : (!$(k) && (!R.sawRoot || R.closedRoot) && L(R, "Text data outside of root node."), k === "&" ? R.state = w.TEXT_ENTITY : R.textNode += k);
              continue;
            case w.SCRIPT:
              k === "<" ? R.state = w.SCRIPT_ENDING : R.script += k;
              continue;
            case w.SCRIPT_ENDING:
              k === "/" ? R.state = w.CLOSE_TAG : (R.script += "<" + k, R.state = w.SCRIPT);
              continue;
            case w.OPEN_WAKA:
              if (k === "!")
                R.state = w.SGML_DECL, R.sgmlDecl = "";
              else if (!$(k)) if (T(g, k))
                R.state = w.OPEN_TAG, R.tagName = k;
              else if (k === "/")
                R.state = w.CLOSE_TAG, R.tagName = "";
              else if (k === "?")
                R.state = w.PROC_INST, R.procInstName = R.procInstBody = "";
              else {
                if (L(R, "Unencoded <"), R.startTagPosition + 1 < R.position) {
                  var pe = R.position - R.startTagPosition;
                  k = new Array(pe).join(" ") + k;
                }
                R.textNode += "<" + k, R.state = w.TEXT;
              }
              continue;
            case w.SGML_DECL:
              if (R.sgmlDecl + k === "--") {
                R.state = w.COMMENT, R.comment = "", R.sgmlDecl = "";
                continue;
              }
              R.doctype && R.doctype !== !0 && R.sgmlDecl ? (R.state = w.DOCTYPE_DTD, R.doctype += "<!" + R.sgmlDecl + k, R.sgmlDecl = "") : (R.sgmlDecl + k).toUpperCase() === n ? (H(R, "onopencdata"), R.state = w.CDATA, R.sgmlDecl = "", R.cdata = "") : (R.sgmlDecl + k).toUpperCase() === s ? (R.state = w.DOCTYPE, (R.doctype || R.sawRoot) && L(
                R,
                "Inappropriately located doctype declaration"
              ), R.doctype = "", R.sgmlDecl = "") : k === ">" ? (H(R, "onsgmldeclaration", R.sgmlDecl), R.sgmlDecl = "", R.state = w.TEXT) : (b(k) && (R.state = w.SGML_DECL_QUOTED), R.sgmlDecl += k);
              continue;
            case w.SGML_DECL_QUOTED:
              k === R.q && (R.state = w.SGML_DECL, R.q = ""), R.sgmlDecl += k;
              continue;
            case w.DOCTYPE:
              k === ">" ? (R.state = w.TEXT, H(R, "ondoctype", R.doctype), R.doctype = !0) : (R.doctype += k, k === "[" ? R.state = w.DOCTYPE_DTD : b(k) && (R.state = w.DOCTYPE_QUOTED, R.q = k));
              continue;
            case w.DOCTYPE_QUOTED:
              R.doctype += k, k === R.q && (R.q = "", R.state = w.DOCTYPE);
              continue;
            case w.DOCTYPE_DTD:
              k === "]" ? (R.doctype += k, R.state = w.DOCTYPE) : k === "<" ? (R.state = w.OPEN_WAKA, R.startTagPosition = R.position) : b(k) ? (R.doctype += k, R.state = w.DOCTYPE_DTD_QUOTED, R.q = k) : R.doctype += k;
              continue;
            case w.DOCTYPE_DTD_QUOTED:
              R.doctype += k, k === R.q && (R.state = w.DOCTYPE_DTD, R.q = "");
              continue;
            case w.COMMENT:
              k === "-" ? R.state = w.COMMENT_ENDING : R.comment += k;
              continue;
            case w.COMMENT_ENDING:
              k === "-" ? (R.state = w.COMMENT_ENDED, R.comment = N(R.opt, R.comment), R.comment && H(R, "oncomment", R.comment), R.comment = "") : (R.comment += "-" + k, R.state = w.COMMENT);
              continue;
            case w.COMMENT_ENDED:
              k !== ">" ? (L(R, "Malformed comment"), R.comment += "--" + k, R.state = w.COMMENT) : R.doctype && R.doctype !== !0 ? R.state = w.DOCTYPE_DTD : R.state = w.TEXT;
              continue;
            case w.CDATA:
              for (var ye = te - 1; k && k !== "]"; )
                k = ie(S, te++), k && R.trackPosition && (R.position++, k === `
` ? (R.line++, R.column = 0) : R.column++);
              R.cdata += S.substring(ye, te - 1), k === "]" && (R.state = w.CDATA_ENDING);
              continue;
            case w.CDATA_ENDING:
              k === "]" ? R.state = w.CDATA_ENDING_2 : (R.cdata += "]" + k, R.state = w.CDATA);
              continue;
            case w.CDATA_ENDING_2:
              k === ">" ? (R.cdata && H(R, "oncdata", R.cdata), H(R, "onclosecdata"), R.cdata = "", R.state = w.TEXT) : k === "]" ? R.cdata += "]" : (R.cdata += "]]" + k, R.state = w.CDATA);
              continue;
            case w.PROC_INST:
              k === "?" ? R.state = w.PROC_INST_ENDING : $(k) ? R.state = w.PROC_INST_BODY : R.procInstName += k;
              continue;
            case w.PROC_INST_BODY:
              if (!R.procInstBody && $(k))
                continue;
              k === "?" ? R.state = w.PROC_INST_ENDING : R.procInstBody += k;
              continue;
            case w.PROC_INST_ENDING:
              k === ">" ? (H(R, "onprocessinginstruction", {
                name: R.procInstName,
                body: R.procInstBody
              }), R.procInstName = R.procInstBody = "", R.state = w.TEXT) : (R.procInstBody += "?" + k, R.state = w.PROC_INST_BODY);
              continue;
            case w.OPEN_TAG:
              T(q, k) ? R.tagName += k : (K(R), k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : ($(k) || L(R, "Invalid character in tag name"), R.state = w.ATTRIB));
              continue;
            case w.OPEN_TAG_SLASH:
              k === ">" ? (ge(R, !0), de(R)) : (L(
                R,
                "Forward-slash in opening tag not followed by >"
              ), R.state = w.ATTRIB);
              continue;
            case w.ATTRIB:
              if ($(k))
                continue;
              k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : T(g, k) ? (R.attribName = k, R.attribValue = "", R.state = w.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME:
              k === "=" ? R.state = w.ATTRIB_VALUE : k === ">" ? (L(R, "Attribute without value"), R.attribValue = R.attribName, fe(R), ge(R)) : $(k) ? R.state = w.ATTRIB_NAME_SAW_WHITE : T(q, k) ? R.attribName += k : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME_SAW_WHITE:
              if (k === "=")
                R.state = w.ATTRIB_VALUE;
              else {
                if ($(k))
                  continue;
                L(R, "Attribute without value"), R.tag.attributes[R.attribName] = "", R.attribValue = "", H(R, "onattribute", {
                  name: R.attribName,
                  value: ""
                }), R.attribName = "", k === ">" ? ge(R) : T(g, k) ? (R.attribName = k, R.state = w.ATTRIB_NAME) : (L(R, "Invalid attribute name"), R.state = w.ATTRIB);
              }
              continue;
            case w.ATTRIB_VALUE:
              if ($(k))
                continue;
              b(k) ? (R.q = k, R.state = w.ATTRIB_VALUE_QUOTED) : (R.opt.unquotedAttributeValues || U(R, "Unquoted attribute value"), R.state = w.ATTRIB_VALUE_UNQUOTED, R.attribValue = k);
              continue;
            case w.ATTRIB_VALUE_QUOTED:
              if (k !== R.q) {
                k === "&" ? R.state = w.ATTRIB_VALUE_ENTITY_Q : R.attribValue += k;
                continue;
              }
              fe(R), R.q = "", R.state = w.ATTRIB_VALUE_CLOSED;
              continue;
            case w.ATTRIB_VALUE_CLOSED:
              $(k) ? R.state = w.ATTRIB : k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : T(g, k) ? (L(R, "No whitespace between attributes"), R.attribName = k, R.attribValue = "", R.state = w.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_VALUE_UNQUOTED:
              if (!I(k)) {
                k === "&" ? R.state = w.ATTRIB_VALUE_ENTITY_U : R.attribValue += k;
                continue;
              }
              fe(R), k === ">" ? ge(R) : R.state = w.ATTRIB;
              continue;
            case w.CLOSE_TAG:
              if (R.tagName)
                k === ">" ? de(R) : T(q, k) ? R.tagName += k : R.script ? (R.script += "</" + R.tagName + k, R.tagName = "", R.state = w.SCRIPT) : ($(k) || L(R, "Invalid tagname in closing tag"), R.state = w.CLOSE_TAG_SAW_WHITE);
              else {
                if ($(k))
                  continue;
                A(g, k) ? R.script ? (R.script += "</" + k, R.state = w.SCRIPT) : L(R, "Invalid tagname in closing tag.") : R.tagName = k;
              }
              continue;
            case w.CLOSE_TAG_SAW_WHITE:
              if ($(k))
                continue;
              k === ">" ? de(R) : L(R, "Invalid characters in closing tag");
              continue;
            case w.TEXT_ENTITY:
            case w.ATTRIB_VALUE_ENTITY_Q:
            case w.ATTRIB_VALUE_ENTITY_U:
              var ve, qe;
              switch (R.state) {
                case w.TEXT_ENTITY:
                  ve = w.TEXT, qe = "textNode";
                  break;
                case w.ATTRIB_VALUE_ENTITY_Q:
                  ve = w.ATTRIB_VALUE_QUOTED, qe = "attribValue";
                  break;
                case w.ATTRIB_VALUE_ENTITY_U:
                  ve = w.ATTRIB_VALUE_UNQUOTED, qe = "attribValue";
                  break;
              }
              if (k === ";") {
                var Re = we(R);
                R.opt.unparsedEntities && !Object.values(d.XML_ENTITIES).includes(Re) ? (R.entity = "", R.state = ve, R.write(Re)) : (R[qe] += Re, R.entity = "", R.state = ve);
              } else T(R.entity.length ? P : C, k) ? R.entity += k : (L(R, "Invalid character in entity name"), R[qe] += "&" + R.entity + k, R.entity = "", R.state = ve);
              continue;
            default:
              throw new Error(R, "Unknown state: " + R.state);
          }
        return R.position >= R.bufferCheckPosition && c(R), R;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
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
  hasRequiredXml = 1, Object.defineProperty(xml, "__esModule", { value: !0 }), xml.XElement = void 0, xml.parseXml = i;
  const e = requireSax(), d = requireError();
  class p {
    constructor(r) {
      if (this.name = r, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !r)
        throw (0, d.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!c(r))
        throw (0, d.newError)(`Invalid element name: ${r}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(r) {
      const a = this.attributes === null ? null : this.attributes[r];
      if (a == null)
        throw (0, d.newError)(`No attribute "${r}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return a;
    }
    removeAttribute(r) {
      this.attributes !== null && delete this.attributes[r];
    }
    element(r, a = !1, t = null) {
      const n = this.elementOrNull(r, a);
      if (n === null)
        throw (0, d.newError)(t || `No element "${r}"`, "ERR_XML_MISSED_ELEMENT");
      return n;
    }
    elementOrNull(r, a = !1) {
      if (this.elements === null)
        return null;
      for (const t of this.elements)
        if (u(t, r, a))
          return t;
      return null;
    }
    getElements(r, a = !1) {
      return this.elements === null ? [] : this.elements.filter((t) => u(t, r, a));
    }
    elementValueOrEmpty(r, a = !1) {
      const t = this.elementOrNull(r, a);
      return t === null ? "" : t.value;
    }
  }
  xml.XElement = p;
  const o = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function c(f) {
    return o.test(f);
  }
  function u(f, r, a) {
    const t = f.name;
    return t === r || a === !0 && t.length === r.length && t.toLowerCase() === r.toLowerCase();
  }
  function i(f) {
    let r = null;
    const a = e.parser(!0, {}), t = [];
    return a.onopentag = (n) => {
      const s = new p(n.name);
      if (s.attributes = n.attributes, r === null)
        r = s;
      else {
        const m = t[t.length - 1];
        m.elements == null && (m.elements = []), m.elements.push(s);
      }
      t.push(s);
    }, a.onclosetag = () => {
      t.pop();
    }, a.ontext = (n) => {
      t.length > 0 && (t[t.length - 1].value = n);
    }, a.oncdata = (n) => {
      const s = t[t.length - 1];
      s.value = n, s.isCData = !0;
    }, a.onerror = (n) => {
      throw n;
    }, a.write(f), r;
  }
  return xml;
}
var hasRequiredOut;
function requireOut() {
  return hasRequiredOut || (hasRequiredOut = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.HttpExecutor = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0, e.asArray = n;
    var d = requireCancellationToken();
    Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
      return d.CancellationError;
    } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return d.CancellationToken;
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
    var c = requireMemoLazy();
    Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
      return c.MemoLazy;
    } });
    var u = requireProgressCallbackTransform();
    Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return u.ProgressCallbackTransform;
    } });
    var i = requirePublishOptions();
    Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return i.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
      return i.githubUrl;
    } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
      return i.githubTagPrefix;
    } });
    var f = requireRetry();
    Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
      return f.retry;
    } });
    var r = requireRfc2253Parser();
    Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var a = requireUuid();
    Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
      return a.UUID;
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
  function e(i) {
    return typeof i > "u" || i === null;
  }
  function d(i) {
    return typeof i == "object" && i !== null;
  }
  function p(i) {
    return Array.isArray(i) ? i : e(i) ? [] : [i];
  }
  function o(i, f) {
    var r, a, t, n;
    if (f)
      for (n = Object.keys(f), r = 0, a = n.length; r < a; r += 1)
        t = n[r], i[t] = f[t];
    return i;
  }
  function c(i, f) {
    var r = "", a;
    for (a = 0; a < f; a += 1)
      r += i;
    return r;
  }
  function u(i) {
    return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
  }
  return common.isNothing = e, common.isObject = d, common.toArray = p, common.repeat = c, common.isNegativeZero = u, common.extend = o, common;
}
var exception, hasRequiredException;
function requireException() {
  if (hasRequiredException) return exception;
  hasRequiredException = 1;
  function e(p, o) {
    var c = "", u = p.reason || "(unknown reason)";
    return p.mark ? (p.mark.name && (c += 'in "' + p.mark.name + '" '), c += "(" + (p.mark.line + 1) + ":" + (p.mark.column + 1) + ")", !o && p.mark.snippet && (c += `

` + p.mark.snippet), u + " " + c) : u;
  }
  function d(p, o) {
    Error.call(this), this.name = "YAMLException", this.reason = p, this.mark = o, this.message = e(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return d.prototype = Object.create(Error.prototype), d.prototype.constructor = d, d.prototype.toString = function(o) {
    return this.name + ": " + e(this, o);
  }, exception = d, exception;
}
var snippet, hasRequiredSnippet;
function requireSnippet() {
  if (hasRequiredSnippet) return snippet;
  hasRequiredSnippet = 1;
  var e = requireCommon();
  function d(c, u, i, f, r) {
    var a = "", t = "", n = Math.floor(r / 2) - 1;
    return f - u > n && (a = " ... ", u = f - n + a.length), i - f > n && (t = " ...", i = f + n - t.length), {
      str: a + c.slice(u, i).replace(/\t/g, "→") + t,
      pos: f - u + a.length
      // relative position
    };
  }
  function p(c, u) {
    return e.repeat(" ", u - c.length) + c;
  }
  function o(c, u) {
    if (u = Object.create(u || null), !c.buffer) return null;
    u.maxLength || (u.maxLength = 79), typeof u.indent != "number" && (u.indent = 1), typeof u.linesBefore != "number" && (u.linesBefore = 3), typeof u.linesAfter != "number" && (u.linesAfter = 2);
    for (var i = /\r?\n|\r|\0/g, f = [0], r = [], a, t = -1; a = i.exec(c.buffer); )
      r.push(a.index), f.push(a.index + a[0].length), c.position <= a.index && t < 0 && (t = f.length - 2);
    t < 0 && (t = f.length - 1);
    var n = "", s, m, y = Math.min(c.line + u.linesAfter, r.length).toString().length, E = u.maxLength - (u.indent + y + 3);
    for (s = 1; s <= u.linesBefore && !(t - s < 0); s++)
      m = d(
        c.buffer,
        f[t - s],
        r[t - s],
        c.position - (f[t] - f[t - s]),
        E
      ), n = e.repeat(" ", u.indent) + p((c.line - s + 1).toString(), y) + " | " + m.str + `
` + n;
    for (m = d(c.buffer, f[t], r[t], c.position, E), n += e.repeat(" ", u.indent) + p((c.line + 1).toString(), y) + " | " + m.str + `
`, n += e.repeat("-", u.indent + y + 3 + m.pos) + `^
`, s = 1; s <= u.linesAfter && !(t + s >= r.length); s++)
      m = d(
        c.buffer,
        f[t + s],
        r[t + s],
        c.position - (f[t] - f[t + s]),
        E
      ), n += e.repeat(" ", u.indent) + p((c.line + s + 1).toString(), y) + " | " + m.str + `
`;
    return n.replace(/\n$/, "");
  }
  return snippet = o, snippet;
}
var type, hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  var e = requireException(), d = [
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
    var i = {};
    return u !== null && Object.keys(u).forEach(function(f) {
      u[f].forEach(function(r) {
        i[String(r)] = f;
      });
    }), i;
  }
  function c(u, i) {
    if (i = i || {}, Object.keys(i).forEach(function(f) {
      if (d.indexOf(f) === -1)
        throw new e('Unknown option "' + f + '" is met in definition of "' + u + '" YAML type.');
    }), this.options = i, this.tag = u, this.kind = i.kind || null, this.resolve = i.resolve || function() {
      return !0;
    }, this.construct = i.construct || function(f) {
      return f;
    }, this.instanceOf = i.instanceOf || null, this.predicate = i.predicate || null, this.represent = i.represent || null, this.representName = i.representName || null, this.defaultStyle = i.defaultStyle || null, this.multi = i.multi || !1, this.styleAliases = o(i.styleAliases || null), p.indexOf(this.kind) === -1)
      throw new e('Unknown kind "' + this.kind + '" is specified for "' + u + '" YAML type.');
  }
  return type = c, type;
}
var schema, hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1;
  var e = requireException(), d = requireType();
  function p(u, i) {
    var f = [];
    return u[i].forEach(function(r) {
      var a = f.length;
      f.forEach(function(t, n) {
        t.tag === r.tag && t.kind === r.kind && t.multi === r.multi && (a = n);
      }), f[a] = r;
    }), f;
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
    }, i, f;
    function r(a) {
      a.multi ? (u.multi[a.kind].push(a), u.multi.fallback.push(a)) : u[a.kind][a.tag] = u.fallback[a.tag] = a;
    }
    for (i = 0, f = arguments.length; i < f; i += 1)
      arguments[i].forEach(r);
    return u;
  }
  function c(u) {
    return this.extend(u);
  }
  return c.prototype.extend = function(i) {
    var f = [], r = [];
    if (i instanceof d)
      r.push(i);
    else if (Array.isArray(i))
      r = r.concat(i);
    else if (i && (Array.isArray(i.implicit) || Array.isArray(i.explicit)))
      i.implicit && (f = f.concat(i.implicit)), i.explicit && (r = r.concat(i.explicit));
    else
      throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    f.forEach(function(t) {
      if (!(t instanceof d))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (t.loadKind && t.loadKind !== "scalar")
        throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (t.multi)
        throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), r.forEach(function(t) {
      if (!(t instanceof d))
        throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var a = Object.create(c.prototype);
    return a.implicit = (this.implicit || []).concat(f), a.explicit = (this.explicit || []).concat(r), a.compiledImplicit = p(a, "implicit"), a.compiledExplicit = p(a, "explicit"), a.compiledTypeMap = o(a.compiledImplicit, a.compiledExplicit), a;
  }, schema = c, schema;
}
var str, hasRequiredStr;
function requireStr() {
  if (hasRequiredStr) return str;
  hasRequiredStr = 1;
  var e = requireType();
  return str = new e("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(d) {
      return d !== null ? d : "";
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
    construct: function(d) {
      return d !== null ? d : [];
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
    construct: function(d) {
      return d !== null ? d : {};
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
  function d(c) {
    if (c === null) return !0;
    var u = c.length;
    return u === 1 && c === "~" || u === 4 && (c === "null" || c === "Null" || c === "NULL");
  }
  function p() {
    return null;
  }
  function o(c) {
    return c === null;
  }
  return _null = new e("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: d,
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
  function d(c) {
    if (c === null) return !1;
    var u = c.length;
    return u === 4 && (c === "true" || c === "True" || c === "TRUE") || u === 5 && (c === "false" || c === "False" || c === "FALSE");
  }
  function p(c) {
    return c === "true" || c === "True" || c === "TRUE";
  }
  function o(c) {
    return Object.prototype.toString.call(c) === "[object Boolean]";
  }
  return bool = new e("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: d,
    construct: p,
    predicate: o,
    represent: {
      lowercase: function(c) {
        return c ? "true" : "false";
      },
      uppercase: function(c) {
        return c ? "TRUE" : "FALSE";
      },
      camelcase: function(c) {
        return c ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool;
}
var int, hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int;
  hasRequiredInt = 1;
  var e = requireCommon(), d = requireType();
  function p(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function o(r) {
    return 48 <= r && r <= 55;
  }
  function c(r) {
    return 48 <= r && r <= 57;
  }
  function u(r) {
    if (r === null) return !1;
    var a = r.length, t = 0, n = !1, s;
    if (!a) return !1;
    if (s = r[t], (s === "-" || s === "+") && (s = r[++t]), s === "0") {
      if (t + 1 === a) return !0;
      if (s = r[++t], s === "b") {
        for (t++; t < a; t++)
          if (s = r[t], s !== "_") {
            if (s !== "0" && s !== "1") return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "x") {
        for (t++; t < a; t++)
          if (s = r[t], s !== "_") {
            if (!p(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
      if (s === "o") {
        for (t++; t < a; t++)
          if (s = r[t], s !== "_") {
            if (!o(r.charCodeAt(t))) return !1;
            n = !0;
          }
        return n && s !== "_";
      }
    }
    if (s === "_") return !1;
    for (; t < a; t++)
      if (s = r[t], s !== "_") {
        if (!c(r.charCodeAt(t)))
          return !1;
        n = !0;
      }
    return !(!n || s === "_");
  }
  function i(r) {
    var a = r, t = 1, n;
    if (a.indexOf("_") !== -1 && (a = a.replace(/_/g, "")), n = a[0], (n === "-" || n === "+") && (n === "-" && (t = -1), a = a.slice(1), n = a[0]), a === "0") return 0;
    if (n === "0") {
      if (a[1] === "b") return t * parseInt(a.slice(2), 2);
      if (a[1] === "x") return t * parseInt(a.slice(2), 16);
      if (a[1] === "o") return t * parseInt(a.slice(2), 8);
    }
    return t * parseInt(a, 10);
  }
  function f(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !e.isNegativeZero(r);
  }
  return int = new d("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: u,
    construct: i,
    predicate: f,
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
  var e = requireCommon(), d = requireType(), p = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function o(r) {
    return !(r === null || !p.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function c(r) {
    var a, t;
    return a = r.replace(/_/g, "").toLowerCase(), t = a[0] === "-" ? -1 : 1, "+-".indexOf(a[0]) >= 0 && (a = a.slice(1)), a === ".inf" ? t === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : a === ".nan" ? NaN : t * parseFloat(a, 10);
  }
  var u = /^[-+]?[0-9]+e/;
  function i(r, a) {
    var t;
    if (isNaN(r))
      switch (a) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (a) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (a) {
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
  function f(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || e.isNegativeZero(r));
  }
  return float = new d("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: o,
    construct: c,
    predicate: f,
    represent: i,
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
  var e = requireType(), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), p = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function o(i) {
    return i === null ? !1 : d.exec(i) !== null || p.exec(i) !== null;
  }
  function c(i) {
    var f, r, a, t, n, s, m, y = 0, E = null, g, q, C;
    if (f = d.exec(i), f === null && (f = p.exec(i)), f === null) throw new Error("Date resolve error");
    if (r = +f[1], a = +f[2] - 1, t = +f[3], !f[4])
      return new Date(Date.UTC(r, a, t));
    if (n = +f[4], s = +f[5], m = +f[6], f[7]) {
      for (y = f[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return f[9] && (g = +f[10], q = +(f[11] || 0), E = (g * 60 + q) * 6e4, f[9] === "-" && (E = -E)), C = new Date(Date.UTC(r, a, t, n, s, m, y)), E && C.setTime(C.getTime() - E), C;
  }
  function u(i) {
    return i.toISOString();
  }
  return timestamp = new e("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: o,
    construct: c,
    instanceOf: Date,
    represent: u
  }), timestamp;
}
var merge, hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  var e = requireType();
  function d(p) {
    return p === "<<" || p === null;
  }
  return merge = new e("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: d
  }), merge;
}
var binary, hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary;
  hasRequiredBinary = 1;
  var e = requireType(), d = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function p(i) {
    if (i === null) return !1;
    var f, r, a = 0, t = i.length, n = d;
    for (r = 0; r < t; r++)
      if (f = n.indexOf(i.charAt(r)), !(f > 64)) {
        if (f < 0) return !1;
        a += 6;
      }
    return a % 8 === 0;
  }
  function o(i) {
    var f, r, a = i.replace(/[\r\n=]/g, ""), t = a.length, n = d, s = 0, m = [];
    for (f = 0; f < t; f++)
      f % 4 === 0 && f && (m.push(s >> 16 & 255), m.push(s >> 8 & 255), m.push(s & 255)), s = s << 6 | n.indexOf(a.charAt(f));
    return r = t % 4 * 6, r === 0 ? (m.push(s >> 16 & 255), m.push(s >> 8 & 255), m.push(s & 255)) : r === 18 ? (m.push(s >> 10 & 255), m.push(s >> 2 & 255)) : r === 12 && m.push(s >> 4 & 255), new Uint8Array(m);
  }
  function c(i) {
    var f = "", r = 0, a, t, n = i.length, s = d;
    for (a = 0; a < n; a++)
      a % 3 === 0 && a && (f += s[r >> 18 & 63], f += s[r >> 12 & 63], f += s[r >> 6 & 63], f += s[r & 63]), r = (r << 8) + i[a];
    return t = n % 3, t === 0 ? (f += s[r >> 18 & 63], f += s[r >> 12 & 63], f += s[r >> 6 & 63], f += s[r & 63]) : t === 2 ? (f += s[r >> 10 & 63], f += s[r >> 4 & 63], f += s[r << 2 & 63], f += s[64]) : t === 1 && (f += s[r >> 2 & 63], f += s[r << 4 & 63], f += s[64], f += s[64]), f;
  }
  function u(i) {
    return Object.prototype.toString.call(i) === "[object Uint8Array]";
  }
  return binary = new e("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: p,
    construct: o,
    predicate: u,
    represent: c
  }), binary;
}
var omap, hasRequiredOmap;
function requireOmap() {
  if (hasRequiredOmap) return omap;
  hasRequiredOmap = 1;
  var e = requireType(), d = Object.prototype.hasOwnProperty, p = Object.prototype.toString;
  function o(u) {
    if (u === null) return !0;
    var i = [], f, r, a, t, n, s = u;
    for (f = 0, r = s.length; f < r; f += 1) {
      if (a = s[f], n = !1, p.call(a) !== "[object Object]") return !1;
      for (t in a)
        if (d.call(a, t))
          if (!n) n = !0;
          else return !1;
      if (!n) return !1;
      if (i.indexOf(t) === -1) i.push(t);
      else return !1;
    }
    return !0;
  }
  function c(u) {
    return u !== null ? u : [];
  }
  return omap = new e("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: o,
    construct: c
  }), omap;
}
var pairs, hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  var e = requireType(), d = Object.prototype.toString;
  function p(c) {
    if (c === null) return !0;
    var u, i, f, r, a, t = c;
    for (a = new Array(t.length), u = 0, i = t.length; u < i; u += 1) {
      if (f = t[u], d.call(f) !== "[object Object]" || (r = Object.keys(f), r.length !== 1)) return !1;
      a[u] = [r[0], f[r[0]]];
    }
    return !0;
  }
  function o(c) {
    if (c === null) return [];
    var u, i, f, r, a, t = c;
    for (a = new Array(t.length), u = 0, i = t.length; u < i; u += 1)
      f = t[u], r = Object.keys(f), a[u] = [r[0], f[r[0]]];
    return a;
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
  var e = requireType(), d = Object.prototype.hasOwnProperty;
  function p(c) {
    if (c === null) return !0;
    var u, i = c;
    for (u in i)
      if (d.call(i, u) && i[u] !== null)
        return !1;
    return !0;
  }
  function o(c) {
    return c !== null ? c : {};
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
  var e = requireCommon(), d = requireException(), p = requireSnippet(), o = require_default(), c = Object.prototype.hasOwnProperty, u = 1, i = 2, f = 3, r = 4, a = 1, t = 2, n = 3, s = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /[\x85\u2028\u2029]/, y = /[,\[\]\{\}]/, E = /^(?:!|!!|![a-z\-]+!)$/i, g = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function q(h) {
    return Object.prototype.toString.call(h);
  }
  function C(h) {
    return h === 10 || h === 13;
  }
  function P(h) {
    return h === 9 || h === 32;
  }
  function $(h) {
    return h === 9 || h === 32 || h === 10 || h === 13;
  }
  function b(h) {
    return h === 44 || h === 91 || h === 93 || h === 123 || h === 125;
  }
  function I(h) {
    var ee;
    return 48 <= h && h <= 57 ? h - 48 : (ee = h | 32, 97 <= ee && ee <= 102 ? ee - 97 + 10 : -1);
  }
  function T(h) {
    return h === 120 ? 2 : h === 117 ? 4 : h === 85 ? 8 : 0;
  }
  function A(h) {
    return 48 <= h && h <= 57 ? h - 48 : -1;
  }
  function w(h) {
    return h === 48 ? "\0" : h === 97 ? "\x07" : h === 98 ? "\b" : h === 116 || h === 9 ? "	" : h === 110 ? `
` : h === 118 ? "\v" : h === 102 ? "\f" : h === 114 ? "\r" : h === 101 ? "\x1B" : h === 32 ? " " : h === 34 ? '"' : h === 47 ? "/" : h === 92 ? "\\" : h === 78 ? "" : h === 95 ? " " : h === 76 ? "\u2028" : h === 80 ? "\u2029" : "";
  }
  function z(h) {
    return h <= 65535 ? String.fromCharCode(h) : String.fromCharCode(
      (h - 65536 >> 10) + 55296,
      (h - 65536 & 1023) + 56320
    );
  }
  function J(h, ee, se) {
    ee === "__proto__" ? Object.defineProperty(h, ee, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: se
    }) : h[ee] = se;
  }
  for (var H = new Array(256), X = new Array(256), N = 0; N < 256; N++)
    H[N] = w(N) ? 1 : 0, X[N] = w(N);
  function U(h, ee) {
    this.input = h, this.filename = ee.filename || null, this.schema = ee.schema || o, this.onWarning = ee.onWarning || null, this.legacy = ee.legacy || !1, this.json = ee.json || !1, this.listener = ee.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = h.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function ne(h, ee) {
    var se = {
      name: h.filename,
      buffer: h.input.slice(0, -1),
      // omit trailing \0
      position: h.position,
      line: h.line,
      column: h.position - h.lineStart
    };
    return se.snippet = p(se), new d(ee, se);
  }
  function L(h, ee) {
    throw ne(h, ee);
  }
  function K(h, ee) {
    h.onWarning && h.onWarning.call(null, ne(h, ee));
  }
  var ue = {
    YAML: function(ee, se, l) {
      var D, B, Q;
      ee.version !== null && L(ee, "duplication of %YAML directive"), l.length !== 1 && L(ee, "YAML directive accepts exactly one argument"), D = /^([0-9]+)\.([0-9]+)$/.exec(l[0]), D === null && L(ee, "ill-formed argument of the YAML directive"), B = parseInt(D[1], 10), Q = parseInt(D[2], 10), B !== 1 && L(ee, "unacceptable YAML version of the document"), ee.version = l[0], ee.checkLineBreaks = Q < 2, Q !== 1 && Q !== 2 && K(ee, "unsupported YAML version of the document");
    },
    TAG: function(ee, se, l) {
      var D, B;
      l.length !== 2 && L(ee, "TAG directive accepts exactly two arguments"), D = l[0], B = l[1], E.test(D) || L(ee, "ill-formed tag handle (first argument) of the TAG directive"), c.call(ee.tagMap, D) && L(ee, 'there is a previously declared suffix for "' + D + '" tag handle'), g.test(B) || L(ee, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        B = decodeURIComponent(B);
      } catch {
        L(ee, "tag prefix is malformed: " + B);
      }
      ee.tagMap[D] = B;
    }
  };
  function fe(h, ee, se, l) {
    var D, B, Q, W;
    if (ee < se) {
      if (W = h.input.slice(ee, se), l)
        for (D = 0, B = W.length; D < B; D += 1)
          Q = W.charCodeAt(D), Q === 9 || 32 <= Q && Q <= 1114111 || L(h, "expected valid JSON character");
      else s.test(W) && L(h, "the stream contains non-printable characters");
      h.result += W;
    }
  }
  function ge(h, ee, se, l) {
    var D, B, Q, W;
    for (e.isObject(se) || L(h, "cannot merge mappings; the provided source object is unacceptable"), D = Object.keys(se), Q = 0, W = D.length; Q < W; Q += 1)
      B = D[Q], c.call(ee, B) || (J(ee, B, se[B]), l[B] = !0);
  }
  function de(h, ee, se, l, D, B, Q, W, _) {
    var M, Z;
    if (Array.isArray(D))
      for (D = Array.prototype.slice.call(D), M = 0, Z = D.length; M < Z; M += 1)
        Array.isArray(D[M]) && L(h, "nested arrays are not supported inside keys"), typeof D == "object" && q(D[M]) === "[object Object]" && (D[M] = "[object Object]");
    if (typeof D == "object" && q(D) === "[object Object]" && (D = "[object Object]"), D = String(D), ee === null && (ee = {}), l === "tag:yaml.org,2002:merge")
      if (Array.isArray(B))
        for (M = 0, Z = B.length; M < Z; M += 1)
          ge(h, ee, B[M], se);
      else
        ge(h, ee, B, se);
    else
      !h.json && !c.call(se, D) && c.call(ee, D) && (h.line = Q || h.line, h.lineStart = W || h.lineStart, h.position = _ || h.position, L(h, "duplicated mapping key")), J(ee, D, B), delete se[D];
    return ee;
  }
  function we(h) {
    var ee;
    ee = h.input.charCodeAt(h.position), ee === 10 ? h.position++ : ee === 13 ? (h.position++, h.input.charCodeAt(h.position) === 10 && h.position++) : L(h, "a line break is expected"), h.line += 1, h.lineStart = h.position, h.firstTabInLine = -1;
  }
  function _e(h, ee, se) {
    for (var l = 0, D = h.input.charCodeAt(h.position); D !== 0; ) {
      for (; P(D); )
        D === 9 && h.firstTabInLine === -1 && (h.firstTabInLine = h.position), D = h.input.charCodeAt(++h.position);
      if (ee && D === 35)
        do
          D = h.input.charCodeAt(++h.position);
        while (D !== 10 && D !== 13 && D !== 0);
      if (C(D))
        for (we(h), D = h.input.charCodeAt(h.position), l++, h.lineIndent = 0; D === 32; )
          h.lineIndent++, D = h.input.charCodeAt(++h.position);
      else
        break;
    }
    return se !== -1 && l !== 0 && h.lineIndent < se && K(h, "deficient indentation"), l;
  }
  function ie(h) {
    var ee = h.position, se;
    return se = h.input.charCodeAt(ee), !!((se === 45 || se === 46) && se === h.input.charCodeAt(ee + 1) && se === h.input.charCodeAt(ee + 2) && (ee += 3, se = h.input.charCodeAt(ee), se === 0 || $(se)));
  }
  function Ee(h, ee) {
    ee === 1 ? h.result += " " : ee > 1 && (h.result += e.repeat(`
`, ee - 1));
  }
  function S(h, ee, se) {
    var l, D, B, Q, W, _, M, Z, V = h.kind, v = h.result, O;
    if (O = h.input.charCodeAt(h.position), $(O) || b(O) || O === 35 || O === 38 || O === 42 || O === 33 || O === 124 || O === 62 || O === 39 || O === 34 || O === 37 || O === 64 || O === 96 || (O === 63 || O === 45) && (D = h.input.charCodeAt(h.position + 1), $(D) || se && b(D)))
      return !1;
    for (h.kind = "scalar", h.result = "", B = Q = h.position, W = !1; O !== 0; ) {
      if (O === 58) {
        if (D = h.input.charCodeAt(h.position + 1), $(D) || se && b(D))
          break;
      } else if (O === 35) {
        if (l = h.input.charCodeAt(h.position - 1), $(l))
          break;
      } else {
        if (h.position === h.lineStart && ie(h) || se && b(O))
          break;
        if (C(O))
          if (_ = h.line, M = h.lineStart, Z = h.lineIndent, _e(h, !1, -1), h.lineIndent >= ee) {
            W = !0, O = h.input.charCodeAt(h.position);
            continue;
          } else {
            h.position = Q, h.line = _, h.lineStart = M, h.lineIndent = Z;
            break;
          }
      }
      W && (fe(h, B, Q, !1), Ee(h, h.line - _), B = Q = h.position, W = !1), P(O) || (Q = h.position + 1), O = h.input.charCodeAt(++h.position);
    }
    return fe(h, B, Q, !1), h.result ? !0 : (h.kind = V, h.result = v, !1);
  }
  function R(h, ee) {
    var se, l, D;
    if (se = h.input.charCodeAt(h.position), se !== 39)
      return !1;
    for (h.kind = "scalar", h.result = "", h.position++, l = D = h.position; (se = h.input.charCodeAt(h.position)) !== 0; )
      if (se === 39)
        if (fe(h, l, h.position, !0), se = h.input.charCodeAt(++h.position), se === 39)
          l = h.position, h.position++, D = h.position;
        else
          return !0;
      else C(se) ? (fe(h, l, D, !0), Ee(h, _e(h, !1, ee)), l = D = h.position) : h.position === h.lineStart && ie(h) ? L(h, "unexpected end of the document within a single quoted scalar") : (h.position++, D = h.position);
    L(h, "unexpected end of the stream within a single quoted scalar");
  }
  function te(h, ee) {
    var se, l, D, B, Q, W;
    if (W = h.input.charCodeAt(h.position), W !== 34)
      return !1;
    for (h.kind = "scalar", h.result = "", h.position++, se = l = h.position; (W = h.input.charCodeAt(h.position)) !== 0; ) {
      if (W === 34)
        return fe(h, se, h.position, !0), h.position++, !0;
      if (W === 92) {
        if (fe(h, se, h.position, !0), W = h.input.charCodeAt(++h.position), C(W))
          _e(h, !1, ee);
        else if (W < 256 && H[W])
          h.result += X[W], h.position++;
        else if ((Q = T(W)) > 0) {
          for (D = Q, B = 0; D > 0; D--)
            W = h.input.charCodeAt(++h.position), (Q = I(W)) >= 0 ? B = (B << 4) + Q : L(h, "expected hexadecimal character");
          h.result += z(B), h.position++;
        } else
          L(h, "unknown escape sequence");
        se = l = h.position;
      } else C(W) ? (fe(h, se, l, !0), Ee(h, _e(h, !1, ee)), se = l = h.position) : h.position === h.lineStart && ie(h) ? L(h, "unexpected end of the document within a double quoted scalar") : (h.position++, l = h.position);
    }
    L(h, "unexpected end of the stream within a double quoted scalar");
  }
  function k(h, ee) {
    var se = !0, l, D, B, Q = h.tag, W, _ = h.anchor, M, Z, V, v, O, F = /* @__PURE__ */ Object.create(null), G, j, ae, oe;
    if (oe = h.input.charCodeAt(h.position), oe === 91)
      Z = 93, O = !1, W = [];
    else if (oe === 123)
      Z = 125, O = !0, W = {};
    else
      return !1;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = W), oe = h.input.charCodeAt(++h.position); oe !== 0; ) {
      if (_e(h, !0, ee), oe = h.input.charCodeAt(h.position), oe === Z)
        return h.position++, h.tag = Q, h.anchor = _, h.kind = O ? "mapping" : "sequence", h.result = W, !0;
      se ? oe === 44 && L(h, "expected the node content, but found ','") : L(h, "missed comma between flow collection entries"), j = G = ae = null, V = v = !1, oe === 63 && (M = h.input.charCodeAt(h.position + 1), $(M) && (V = v = !0, h.position++, _e(h, !0, ee))), l = h.line, D = h.lineStart, B = h.position, Ce(h, ee, u, !1, !0), j = h.tag, G = h.result, _e(h, !0, ee), oe = h.input.charCodeAt(h.position), (v || h.line === l) && oe === 58 && (V = !0, oe = h.input.charCodeAt(++h.position), _e(h, !0, ee), Ce(h, ee, u, !1, !0), ae = h.result), O ? de(h, W, F, j, G, ae, l, D, B) : V ? W.push(de(h, null, F, j, G, ae, l, D, B)) : W.push(G), _e(h, !0, ee), oe = h.input.charCodeAt(h.position), oe === 44 ? (se = !0, oe = h.input.charCodeAt(++h.position)) : se = !1;
    }
    L(h, "unexpected end of the stream within a flow collection");
  }
  function pe(h, ee) {
    var se, l, D = a, B = !1, Q = !1, W = ee, _ = 0, M = !1, Z, V;
    if (V = h.input.charCodeAt(h.position), V === 124)
      l = !1;
    else if (V === 62)
      l = !0;
    else
      return !1;
    for (h.kind = "scalar", h.result = ""; V !== 0; )
      if (V = h.input.charCodeAt(++h.position), V === 43 || V === 45)
        a === D ? D = V === 43 ? n : t : L(h, "repeat of a chomping mode identifier");
      else if ((Z = A(V)) >= 0)
        Z === 0 ? L(h, "bad explicit indentation width of a block scalar; it cannot be less than one") : Q ? L(h, "repeat of an indentation width identifier") : (W = ee + Z - 1, Q = !0);
      else
        break;
    if (P(V)) {
      do
        V = h.input.charCodeAt(++h.position);
      while (P(V));
      if (V === 35)
        do
          V = h.input.charCodeAt(++h.position);
        while (!C(V) && V !== 0);
    }
    for (; V !== 0; ) {
      for (we(h), h.lineIndent = 0, V = h.input.charCodeAt(h.position); (!Q || h.lineIndent < W) && V === 32; )
        h.lineIndent++, V = h.input.charCodeAt(++h.position);
      if (!Q && h.lineIndent > W && (W = h.lineIndent), C(V)) {
        _++;
        continue;
      }
      if (h.lineIndent < W) {
        D === n ? h.result += e.repeat(`
`, B ? 1 + _ : _) : D === a && B && (h.result += `
`);
        break;
      }
      for (l ? P(V) ? (M = !0, h.result += e.repeat(`
`, B ? 1 + _ : _)) : M ? (M = !1, h.result += e.repeat(`
`, _ + 1)) : _ === 0 ? B && (h.result += " ") : h.result += e.repeat(`
`, _) : h.result += e.repeat(`
`, B ? 1 + _ : _), B = !0, Q = !0, _ = 0, se = h.position; !C(V) && V !== 0; )
        V = h.input.charCodeAt(++h.position);
      fe(h, se, h.position, !1);
    }
    return !0;
  }
  function ye(h, ee) {
    var se, l = h.tag, D = h.anchor, B = [], Q, W = !1, _;
    if (h.firstTabInLine !== -1) return !1;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = B), _ = h.input.charCodeAt(h.position); _ !== 0 && (h.firstTabInLine !== -1 && (h.position = h.firstTabInLine, L(h, "tab characters must not be used in indentation")), !(_ !== 45 || (Q = h.input.charCodeAt(h.position + 1), !$(Q)))); ) {
      if (W = !0, h.position++, _e(h, !0, -1) && h.lineIndent <= ee) {
        B.push(null), _ = h.input.charCodeAt(h.position);
        continue;
      }
      if (se = h.line, Ce(h, ee, f, !1, !0), B.push(h.result), _e(h, !0, -1), _ = h.input.charCodeAt(h.position), (h.line === se || h.lineIndent > ee) && _ !== 0)
        L(h, "bad indentation of a sequence entry");
      else if (h.lineIndent < ee)
        break;
    }
    return W ? (h.tag = l, h.anchor = D, h.kind = "sequence", h.result = B, !0) : !1;
  }
  function ve(h, ee, se) {
    var l, D, B, Q, W, _, M = h.tag, Z = h.anchor, V = {}, v = /* @__PURE__ */ Object.create(null), O = null, F = null, G = null, j = !1, ae = !1, oe;
    if (h.firstTabInLine !== -1) return !1;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = V), oe = h.input.charCodeAt(h.position); oe !== 0; ) {
      if (!j && h.firstTabInLine !== -1 && (h.position = h.firstTabInLine, L(h, "tab characters must not be used in indentation")), l = h.input.charCodeAt(h.position + 1), B = h.line, (oe === 63 || oe === 58) && $(l))
        oe === 63 ? (j && (de(h, V, v, O, F, null, Q, W, _), O = F = G = null), ae = !0, j = !0, D = !0) : j ? (j = !1, D = !0) : L(h, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), h.position += 1, oe = l;
      else {
        if (Q = h.line, W = h.lineStart, _ = h.position, !Ce(h, se, i, !1, !0))
          break;
        if (h.line === B) {
          for (oe = h.input.charCodeAt(h.position); P(oe); )
            oe = h.input.charCodeAt(++h.position);
          if (oe === 58)
            oe = h.input.charCodeAt(++h.position), $(oe) || L(h, "a whitespace character is expected after the key-value separator within a block mapping"), j && (de(h, V, v, O, F, null, Q, W, _), O = F = G = null), ae = !0, j = !1, D = !1, O = h.tag, F = h.result;
          else if (ae)
            L(h, "can not read an implicit mapping pair; a colon is missed");
          else
            return h.tag = M, h.anchor = Z, !0;
        } else if (ae)
          L(h, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return h.tag = M, h.anchor = Z, !0;
      }
      if ((h.line === B || h.lineIndent > ee) && (j && (Q = h.line, W = h.lineStart, _ = h.position), Ce(h, ee, r, !0, D) && (j ? F = h.result : G = h.result), j || (de(h, V, v, O, F, G, Q, W, _), O = F = G = null), _e(h, !0, -1), oe = h.input.charCodeAt(h.position)), (h.line === B || h.lineIndent > ee) && oe !== 0)
        L(h, "bad indentation of a mapping entry");
      else if (h.lineIndent < ee)
        break;
    }
    return j && de(h, V, v, O, F, null, Q, W, _), ae && (h.tag = M, h.anchor = Z, h.kind = "mapping", h.result = V), ae;
  }
  function qe(h) {
    var ee, se = !1, l = !1, D, B, Q;
    if (Q = h.input.charCodeAt(h.position), Q !== 33) return !1;
    if (h.tag !== null && L(h, "duplication of a tag property"), Q = h.input.charCodeAt(++h.position), Q === 60 ? (se = !0, Q = h.input.charCodeAt(++h.position)) : Q === 33 ? (l = !0, D = "!!", Q = h.input.charCodeAt(++h.position)) : D = "!", ee = h.position, se) {
      do
        Q = h.input.charCodeAt(++h.position);
      while (Q !== 0 && Q !== 62);
      h.position < h.length ? (B = h.input.slice(ee, h.position), Q = h.input.charCodeAt(++h.position)) : L(h, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Q !== 0 && !$(Q); )
        Q === 33 && (l ? L(h, "tag suffix cannot contain exclamation marks") : (D = h.input.slice(ee - 1, h.position + 1), E.test(D) || L(h, "named tag handle cannot contain such characters"), l = !0, ee = h.position + 1)), Q = h.input.charCodeAt(++h.position);
      B = h.input.slice(ee, h.position), y.test(B) && L(h, "tag suffix cannot contain flow indicator characters");
    }
    B && !g.test(B) && L(h, "tag name cannot contain such characters: " + B);
    try {
      B = decodeURIComponent(B);
    } catch {
      L(h, "tag name is malformed: " + B);
    }
    return se ? h.tag = B : c.call(h.tagMap, D) ? h.tag = h.tagMap[D] + B : D === "!" ? h.tag = "!" + B : D === "!!" ? h.tag = "tag:yaml.org,2002:" + B : L(h, 'undeclared tag handle "' + D + '"'), !0;
  }
  function Re(h) {
    var ee, se;
    if (se = h.input.charCodeAt(h.position), se !== 38) return !1;
    for (h.anchor !== null && L(h, "duplication of an anchor property"), se = h.input.charCodeAt(++h.position), ee = h.position; se !== 0 && !$(se) && !b(se); )
      se = h.input.charCodeAt(++h.position);
    return h.position === ee && L(h, "name of an anchor node must contain at least one character"), h.anchor = h.input.slice(ee, h.position), !0;
  }
  function Ie(h) {
    var ee, se, l;
    if (l = h.input.charCodeAt(h.position), l !== 42) return !1;
    for (l = h.input.charCodeAt(++h.position), ee = h.position; l !== 0 && !$(l) && !b(l); )
      l = h.input.charCodeAt(++h.position);
    return h.position === ee && L(h, "name of an alias node must contain at least one character"), se = h.input.slice(ee, h.position), c.call(h.anchorMap, se) || L(h, 'unidentified alias "' + se + '"'), h.result = h.anchorMap[se], _e(h, !0, -1), !0;
  }
  function Ce(h, ee, se, l, D) {
    var B, Q, W, _ = 1, M = !1, Z = !1, V, v, O, F, G, j;
    if (h.listener !== null && h.listener("open", h), h.tag = null, h.anchor = null, h.kind = null, h.result = null, B = Q = W = r === se || f === se, l && _e(h, !0, -1) && (M = !0, h.lineIndent > ee ? _ = 1 : h.lineIndent === ee ? _ = 0 : h.lineIndent < ee && (_ = -1)), _ === 1)
      for (; qe(h) || Re(h); )
        _e(h, !0, -1) ? (M = !0, W = B, h.lineIndent > ee ? _ = 1 : h.lineIndent === ee ? _ = 0 : h.lineIndent < ee && (_ = -1)) : W = !1;
    if (W && (W = M || D), (_ === 1 || r === se) && (u === se || i === se ? G = ee : G = ee + 1, j = h.position - h.lineStart, _ === 1 ? W && (ye(h, j) || ve(h, j, G)) || k(h, G) ? Z = !0 : (Q && pe(h, G) || R(h, G) || te(h, G) ? Z = !0 : Ie(h) ? (Z = !0, (h.tag !== null || h.anchor !== null) && L(h, "alias node should not have any properties")) : S(h, G, u === se) && (Z = !0, h.tag === null && (h.tag = "?")), h.anchor !== null && (h.anchorMap[h.anchor] = h.result)) : _ === 0 && (Z = W && ye(h, j))), h.tag === null)
      h.anchor !== null && (h.anchorMap[h.anchor] = h.result);
    else if (h.tag === "?") {
      for (h.result !== null && h.kind !== "scalar" && L(h, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + h.kind + '"'), V = 0, v = h.implicitTypes.length; V < v; V += 1)
        if (F = h.implicitTypes[V], F.resolve(h.result)) {
          h.result = F.construct(h.result), h.tag = F.tag, h.anchor !== null && (h.anchorMap[h.anchor] = h.result);
          break;
        }
    } else if (h.tag !== "!") {
      if (c.call(h.typeMap[h.kind || "fallback"], h.tag))
        F = h.typeMap[h.kind || "fallback"][h.tag];
      else
        for (F = null, O = h.typeMap.multi[h.kind || "fallback"], V = 0, v = O.length; V < v; V += 1)
          if (h.tag.slice(0, O[V].tag.length) === O[V].tag) {
            F = O[V];
            break;
          }
      F || L(h, "unknown tag !<" + h.tag + ">"), h.result !== null && F.kind !== h.kind && L(h, "unacceptable node kind for !<" + h.tag + '> tag; it should be "' + F.kind + '", not "' + h.kind + '"'), F.resolve(h.result, h.tag) ? (h.result = F.construct(h.result, h.tag), h.anchor !== null && (h.anchorMap[h.anchor] = h.result)) : L(h, "cannot resolve a node with !<" + h.tag + "> explicit tag");
    }
    return h.listener !== null && h.listener("close", h), h.tag !== null || h.anchor !== null || Z;
  }
  function xe(h) {
    var ee = h.position, se, l, D, B = !1, Q;
    for (h.version = null, h.checkLineBreaks = h.legacy, h.tagMap = /* @__PURE__ */ Object.create(null), h.anchorMap = /* @__PURE__ */ Object.create(null); (Q = h.input.charCodeAt(h.position)) !== 0 && (_e(h, !0, -1), Q = h.input.charCodeAt(h.position), !(h.lineIndent > 0 || Q !== 37)); ) {
      for (B = !0, Q = h.input.charCodeAt(++h.position), se = h.position; Q !== 0 && !$(Q); )
        Q = h.input.charCodeAt(++h.position);
      for (l = h.input.slice(se, h.position), D = [], l.length < 1 && L(h, "directive name must not be less than one character in length"); Q !== 0; ) {
        for (; P(Q); )
          Q = h.input.charCodeAt(++h.position);
        if (Q === 35) {
          do
            Q = h.input.charCodeAt(++h.position);
          while (Q !== 0 && !C(Q));
          break;
        }
        if (C(Q)) break;
        for (se = h.position; Q !== 0 && !$(Q); )
          Q = h.input.charCodeAt(++h.position);
        D.push(h.input.slice(se, h.position));
      }
      Q !== 0 && we(h), c.call(ue, l) ? ue[l](h, l, D) : K(h, 'unknown document directive "' + l + '"');
    }
    if (_e(h, !0, -1), h.lineIndent === 0 && h.input.charCodeAt(h.position) === 45 && h.input.charCodeAt(h.position + 1) === 45 && h.input.charCodeAt(h.position + 2) === 45 ? (h.position += 3, _e(h, !0, -1)) : B && L(h, "directives end mark is expected"), Ce(h, h.lineIndent - 1, r, !1, !0), _e(h, !0, -1), h.checkLineBreaks && m.test(h.input.slice(ee, h.position)) && K(h, "non-ASCII line breaks are interpreted as content"), h.documents.push(h.result), h.position === h.lineStart && ie(h)) {
      h.input.charCodeAt(h.position) === 46 && (h.position += 3, _e(h, !0, -1));
      return;
    }
    if (h.position < h.length - 1)
      L(h, "end of the stream or a document separator is expected");
    else
      return;
  }
  function Be(h, ee) {
    h = String(h), ee = ee || {}, h.length !== 0 && (h.charCodeAt(h.length - 1) !== 10 && h.charCodeAt(h.length - 1) !== 13 && (h += `
`), h.charCodeAt(0) === 65279 && (h = h.slice(1)));
    var se = new U(h, ee), l = h.indexOf("\0");
    for (l !== -1 && (se.position = l, L(se, "null byte is not allowed in input")), se.input += "\0"; se.input.charCodeAt(se.position) === 32; )
      se.lineIndent += 1, se.position += 1;
    for (; se.position < se.length - 1; )
      xe(se);
    return se.documents;
  }
  function ke(h, ee, se) {
    ee !== null && typeof ee == "object" && typeof se > "u" && (se = ee, ee = null);
    var l = Be(h, se);
    if (typeof ee != "function")
      return l;
    for (var D = 0, B = l.length; D < B; D += 1)
      ee(l[D]);
  }
  function Ue(h, ee) {
    var se = Be(h, ee);
    if (se.length !== 0) {
      if (se.length === 1)
        return se[0];
      throw new d("expected a single document in the stream, but found more");
    }
  }
  return loader.loadAll = ke, loader.load = Ue, loader;
}
var dumper = {}, hasRequiredDumper;
function requireDumper() {
  if (hasRequiredDumper) return dumper;
  hasRequiredDumper = 1;
  var e = requireCommon(), d = requireException(), p = require_default(), o = Object.prototype.toString, c = Object.prototype.hasOwnProperty, u = 65279, i = 9, f = 10, r = 13, a = 32, t = 33, n = 34, s = 35, m = 37, y = 38, E = 39, g = 42, q = 44, C = 45, P = 58, $ = 61, b = 62, I = 63, T = 64, A = 91, w = 93, z = 96, J = 123, H = 124, X = 125, N = {};
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
      oe = G[j], le = String(O[oe]), oe.slice(0, 2) === "!!" && (oe = "tag:yaml.org,2002:" + oe.slice(2)), he = v.compiledTypeMap.fallback[oe], he && c.call(he.styleAliases, le) && (le = he.styleAliases[le]), F[oe] = le;
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
      throw new d("code point within a string may not be greater than 0xFFFFFFFF");
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
  function we(v, O) {
    return `
` + e.repeat(" ", v.indent * O);
  }
  function _e(v, O) {
    var F, G, j;
    for (F = 0, G = v.implicitTypes.length; F < G; F += 1)
      if (j = v.implicitTypes[F], j.resolve(O))
        return !0;
    return !1;
  }
  function ie(v) {
    return v === a || v === i;
  }
  function Ee(v) {
    return 32 <= v && v <= 126 || 161 <= v && v <= 55295 && v !== 8232 && v !== 8233 || 57344 <= v && v <= 65533 && v !== u || 65536 <= v && v <= 1114111;
  }
  function S(v) {
    return Ee(v) && v !== u && v !== r && v !== f;
  }
  function R(v, O, F) {
    var G = S(v), j = G && !ie(v);
    return (
      // ns-plain-safe
      (F ? (
        // c = flow-in
        G
      ) : G && v !== q && v !== A && v !== w && v !== J && v !== X) && v !== s && !(O === P && !j) || S(O) && !ie(O) && v === s || O === P && j
    );
  }
  function te(v) {
    return Ee(v) && v !== u && !ie(v) && v !== C && v !== I && v !== P && v !== q && v !== A && v !== w && v !== J && v !== X && v !== s && v !== y && v !== g && v !== t && v !== H && v !== $ && v !== b && v !== E && v !== n && v !== m && v !== T && v !== z;
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
        if (Se = pe(v, he), Se === f)
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
        return _e(v, Se);
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
          return ">" + ke(O, v.indent) + Ue(de(h(O, oe), ae));
        case Ce:
          return '"' + se(O) + '"';
        default:
          throw new d("impossible error: invalid scalar style");
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
  function h(v, O) {
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
      le = F[ae], v.replacer && (le = v.replacer.call(F, String(ae), le)), (_(v, O, le, !1, !1) || typeof le > "u" && _(v, O, null, !1, !1)) && (G !== "" && (G += "," + (v.condenseFlow ? "" : " ")), G += v.dump);
    v.tag = j, v.dump = "[" + G + "]";
  }
  function D(v, O, F, G) {
    var j = "", ae = v.tag, oe, le, he;
    for (oe = 0, le = F.length; oe < le; oe += 1)
      he = F[oe], v.replacer && (he = v.replacer.call(F, String(oe), he)), (_(v, O + 1, he, !0, !0, !1, !0) || typeof he > "u" && _(v, O + 1, null, !0, !0, !1, !0)) && ((!G || j !== "") && (j += we(v, O)), v.dump && f === v.dump.charCodeAt(0) ? j += "-" : j += "- ", j += v.dump);
    v.tag = ae, v.dump = j || "[]";
  }
  function B(v, O, F) {
    var G = "", j = v.tag, ae = Object.keys(F), oe, le, he, Se, Te;
    for (oe = 0, le = ae.length; oe < le; oe += 1)
      Te = "", G !== "" && (Te += ", "), v.condenseFlow && (Te += '"'), he = ae[oe], Se = F[he], v.replacer && (Se = v.replacer.call(F, he, Se)), _(v, O, he, !1, !1) && (v.dump.length > 1024 && (Te += "? "), Te += v.dump + (v.condenseFlow ? '"' : "") + ":" + (v.condenseFlow ? "" : " "), _(v, O, Se, !1, !1) && (Te += v.dump, G += Te));
    v.tag = j, v.dump = "{" + G + "}";
  }
  function Q(v, O, F, G) {
    var j = "", ae = v.tag, oe = Object.keys(F), le, he, Se, Te, Oe, be;
    if (v.sortKeys === !0)
      oe.sort();
    else if (typeof v.sortKeys == "function")
      oe.sort(v.sortKeys);
    else if (v.sortKeys)
      throw new d("sortKeys must be a boolean or a function");
    for (le = 0, he = oe.length; le < he; le += 1)
      be = "", (!G || j !== "") && (be += we(v, O)), Se = oe[le], Te = F[Se], v.replacer && (Te = v.replacer.call(F, Se, Te)), _(v, O + 1, Se, !0, !0, !0) && (Oe = v.tag !== null && v.tag !== "?" || v.dump && v.dump.length > 1024, Oe && (v.dump && f === v.dump.charCodeAt(0) ? be += "?" : be += "? "), be += v.dump, Oe && (be += we(v, O)), _(v, O + 1, Te, !0, Oe) && (v.dump && f === v.dump.charCodeAt(0) ? be += ":" : be += ": ", be += v.dump, j += be));
    v.tag = ae, v.dump = j || "{}";
  }
  function W(v, O, F) {
    var G, j, ae, oe, le, he;
    for (j = F ? v.explicitTypes : v.implicitTypes, ae = 0, oe = j.length; ae < oe; ae += 1)
      if (le = j[ae], (le.instanceOf || le.predicate) && (!le.instanceOf || typeof O == "object" && O instanceof le.instanceOf) && (!le.predicate || le.predicate(O))) {
        if (F ? le.multi && le.representName ? v.tag = le.representName(O) : v.tag = le.tag : v.tag = "?", le.represent) {
          if (he = v.styleMap[le.tag] || le.defaultStyle, o.call(le.represent) === "[object Function]")
            G = le.represent(O, he);
          else if (c.call(le.represent, he))
            G = le.represent[he](O, he);
          else
            throw new d("!<" + le.tag + '> tag resolver accepts not "' + he + '" style');
          v.dump = G;
        }
        return !0;
      }
    return !1;
  }
  function _(v, O, F, G, j, ae, oe) {
    v.tag = null, v.dump = F, W(v, F, !1) || W(v, F, !0);
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
        throw new d("unacceptable kind of an object to dump " + le);
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
  function V(v, O) {
    O = O || {};
    var F = new ge(O);
    F.noRefs || M(v, F);
    var G = v;
    return F.replacer && (G = F.replacer.call({ "": G }, "", G)), _(F, 0, G, !0, !0) ? F.dump + `
` : "";
  }
  return dumper.dump = V, dumper;
}
var hasRequiredJsYaml;
function requireJsYaml() {
  if (hasRequiredJsYaml) return jsYaml;
  hasRequiredJsYaml = 1;
  var e = requireLoader(), d = requireDumper();
  function p(o, c) {
    return function() {
      throw new Error("Function yaml." + o + " is removed in js-yaml 4. Use yaml." + c + " instead, which is now safe by default.");
    };
  }
  return jsYaml.Type = requireType(), jsYaml.Schema = requireSchema(), jsYaml.FAILSAFE_SCHEMA = requireFailsafe(), jsYaml.JSON_SCHEMA = requireJson(), jsYaml.CORE_SCHEMA = requireCore(), jsYaml.DEFAULT_SCHEMA = require_default(), jsYaml.load = e.load, jsYaml.loadAll = e.loadAll, jsYaml.dump = d.dump, jsYaml.YAMLException = requireException(), jsYaml.types = {
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
  const e = "2.0.0", d = 256, p = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, o = 16, c = d - 6;
  return constants = {
    MAX_LENGTH: d,
    MAX_SAFE_COMPONENT_LENGTH: o,
    MAX_SAFE_BUILD_LENGTH: c,
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
  return hasRequiredDebug || (hasRequiredDebug = 1, debug_1 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...d) => console.error("SEMVER", ...d) : () => {
  }), debug_1;
}
var hasRequiredRe;
function requireRe() {
  return hasRequiredRe || (hasRequiredRe = 1, (function(e, d) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: p,
      MAX_SAFE_BUILD_LENGTH: o,
      MAX_LENGTH: c
    } = requireConstants(), u = requireDebug();
    d = e.exports = {};
    const i = d.re = [], f = d.safeRe = [], r = d.src = [], a = d.safeSrc = [], t = d.t = {};
    let n = 0;
    const s = "[a-zA-Z0-9-]", m = [
      ["\\s", 1],
      ["\\d", c],
      [s, o]
    ], y = (g) => {
      for (const [q, C] of m)
        g = g.split(`${q}*`).join(`${q}{0,${C}}`).split(`${q}+`).join(`${q}{1,${C}}`);
      return g;
    }, E = (g, q, C) => {
      const P = y(q), $ = n++;
      u(g, $, q), t[g] = $, r[$] = q, a[$] = P, i[$] = new RegExp(q, C ? "g" : void 0), f[$] = new RegExp(P, C ? "g" : void 0);
    };
    E("NUMERICIDENTIFIER", "0|[1-9]\\d*"), E("NUMERICIDENTIFIERLOOSE", "\\d+"), E("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${s}*`), E("MAINVERSION", `(${r[t.NUMERICIDENTIFIER]})\\.(${r[t.NUMERICIDENTIFIER]})\\.(${r[t.NUMERICIDENTIFIER]})`), E("MAINVERSIONLOOSE", `(${r[t.NUMERICIDENTIFIERLOOSE]})\\.(${r[t.NUMERICIDENTIFIERLOOSE]})\\.(${r[t.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASEIDENTIFIER", `(?:${r[t.NONNUMERICIDENTIFIER]}|${r[t.NUMERICIDENTIFIER]})`), E("PRERELEASEIDENTIFIERLOOSE", `(?:${r[t.NONNUMERICIDENTIFIER]}|${r[t.NUMERICIDENTIFIERLOOSE]})`), E("PRERELEASE", `(?:-(${r[t.PRERELEASEIDENTIFIER]}(?:\\.${r[t.PRERELEASEIDENTIFIER]})*))`), E("PRERELEASELOOSE", `(?:-?(${r[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[t.PRERELEASEIDENTIFIERLOOSE]})*))`), E("BUILDIDENTIFIER", `${s}+`), E("BUILD", `(?:\\+(${r[t.BUILDIDENTIFIER]}(?:\\.${r[t.BUILDIDENTIFIER]})*))`), E("FULLPLAIN", `v?${r[t.MAINVERSION]}${r[t.PRERELEASE]}?${r[t.BUILD]}?`), E("FULL", `^${r[t.FULLPLAIN]}$`), E("LOOSEPLAIN", `[v=\\s]*${r[t.MAINVERSIONLOOSE]}${r[t.PRERELEASELOOSE]}?${r[t.BUILD]}?`), E("LOOSE", `^${r[t.LOOSEPLAIN]}$`), E("GTLT", "((?:<|>)?=?)"), E("XRANGEIDENTIFIERLOOSE", `${r[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), E("XRANGEIDENTIFIER", `${r[t.NUMERICIDENTIFIER]}|x|X|\\*`), E("XRANGEPLAIN", `[v=\\s]*(${r[t.XRANGEIDENTIFIER]})(?:\\.(${r[t.XRANGEIDENTIFIER]})(?:\\.(${r[t.XRANGEIDENTIFIER]})(?:${r[t.PRERELEASE]})?${r[t.BUILD]}?)?)?`), E("XRANGEPLAINLOOSE", `[v=\\s]*(${r[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[t.XRANGEIDENTIFIERLOOSE]})(?:${r[t.PRERELEASELOOSE]})?${r[t.BUILD]}?)?)?`), E("XRANGE", `^${r[t.GTLT]}\\s*${r[t.XRANGEPLAIN]}$`), E("XRANGELOOSE", `^${r[t.GTLT]}\\s*${r[t.XRANGEPLAINLOOSE]}$`), E("COERCEPLAIN", `(^|[^\\d])(\\d{1,${p}})(?:\\.(\\d{1,${p}}))?(?:\\.(\\d{1,${p}}))?`), E("COERCE", `${r[t.COERCEPLAIN]}(?:$|[^\\d])`), E("COERCEFULL", r[t.COERCEPLAIN] + `(?:${r[t.PRERELEASE]})?(?:${r[t.BUILD]})?(?:$|[^\\d])`), E("COERCERTL", r[t.COERCE], !0), E("COERCERTLFULL", r[t.COERCEFULL], !0), E("LONETILDE", "(?:~>?)"), E("TILDETRIM", `(\\s*)${r[t.LONETILDE]}\\s+`, !0), d.tildeTrimReplace = "$1~", E("TILDE", `^${r[t.LONETILDE]}${r[t.XRANGEPLAIN]}$`), E("TILDELOOSE", `^${r[t.LONETILDE]}${r[t.XRANGEPLAINLOOSE]}$`), E("LONECARET", "(?:\\^)"), E("CARETTRIM", `(\\s*)${r[t.LONECARET]}\\s+`, !0), d.caretTrimReplace = "$1^", E("CARET", `^${r[t.LONECARET]}${r[t.XRANGEPLAIN]}$`), E("CARETLOOSE", `^${r[t.LONECARET]}${r[t.XRANGEPLAINLOOSE]}$`), E("COMPARATORLOOSE", `^${r[t.GTLT]}\\s*(${r[t.LOOSEPLAIN]})$|^$`), E("COMPARATOR", `^${r[t.GTLT]}\\s*(${r[t.FULLPLAIN]})$|^$`), E("COMPARATORTRIM", `(\\s*)${r[t.GTLT]}\\s*(${r[t.LOOSEPLAIN]}|${r[t.XRANGEPLAIN]})`, !0), d.comparatorTrimReplace = "$1$2$3", E("HYPHENRANGE", `^\\s*(${r[t.XRANGEPLAIN]})\\s+-\\s+(${r[t.XRANGEPLAIN]})\\s*$`), E("HYPHENRANGELOOSE", `^\\s*(${r[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[t.XRANGEPLAINLOOSE]})\\s*$`), E("STAR", "(<|>)?=?\\s*\\*"), E("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), E("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports)), re.exports;
}
var parseOptions_1, hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const e = Object.freeze({ loose: !0 }), d = Object.freeze({});
  return parseOptions_1 = (o) => o ? typeof o != "object" ? e : o : d, parseOptions_1;
}
var identifiers, hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const e = /^[0-9]+$/, d = (o, c) => {
    if (typeof o == "number" && typeof c == "number")
      return o === c ? 0 : o < c ? -1 : 1;
    const u = e.test(o), i = e.test(c);
    return u && i && (o = +o, c = +c), o === c ? 0 : u && !i ? -1 : i && !u ? 1 : o < c ? -1 : 1;
  };
  return identifiers = {
    compareIdentifiers: d,
    rcompareIdentifiers: (o, c) => d(c, o)
  }, identifiers;
}
var semver$1, hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const e = requireDebug(), { MAX_LENGTH: d, MAX_SAFE_INTEGER: p } = requireConstants(), { safeRe: o, t: c } = requireRe(), u = requireParseOptions(), { compareIdentifiers: i } = requireIdentifiers();
  class f {
    constructor(a, t) {
      if (t = u(t), a instanceof f) {
        if (a.loose === !!t.loose && a.includePrerelease === !!t.includePrerelease)
          return a;
        a = a.version;
      } else if (typeof a != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof a}".`);
      if (a.length > d)
        throw new TypeError(
          `version is longer than ${d} characters`
        );
      e("SemVer", a, t), this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease;
      const n = a.trim().match(t.loose ? o[c.LOOSE] : o[c.FULL]);
      if (!n)
        throw new TypeError(`Invalid Version: ${a}`);
      if (this.raw = a, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > p || this.major < 0)
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
    compare(a) {
      if (e("SemVer.compare", this.version, this.options, a), !(a instanceof f)) {
        if (typeof a == "string" && a === this.version)
          return 0;
        a = new f(a, this.options);
      }
      return a.version === this.version ? 0 : this.compareMain(a) || this.comparePre(a);
    }
    compareMain(a) {
      return a instanceof f || (a = new f(a, this.options)), this.major < a.major ? -1 : this.major > a.major ? 1 : this.minor < a.minor ? -1 : this.minor > a.minor ? 1 : this.patch < a.patch ? -1 : this.patch > a.patch ? 1 : 0;
    }
    comparePre(a) {
      if (a instanceof f || (a = new f(a, this.options)), this.prerelease.length && !a.prerelease.length)
        return -1;
      if (!this.prerelease.length && a.prerelease.length)
        return 1;
      if (!this.prerelease.length && !a.prerelease.length)
        return 0;
      let t = 0;
      do {
        const n = this.prerelease[t], s = a.prerelease[t];
        if (e("prerelease compare", t, n, s), n === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (n === void 0)
          return -1;
        if (n === s)
          continue;
        return i(n, s);
      } while (++t);
    }
    compareBuild(a) {
      a instanceof f || (a = new f(a, this.options));
      let t = 0;
      do {
        const n = this.build[t], s = a.build[t];
        if (e("build compare", t, n, s), n === void 0 && s === void 0)
          return 0;
        if (s === void 0)
          return 1;
        if (n === void 0)
          return -1;
        if (n === s)
          continue;
        return i(n, s);
      } while (++t);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(a, t, n) {
      if (a.startsWith("pre")) {
        if (!t && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (t) {
          const s = `-${t}`.match(this.options.loose ? o[c.PRERELEASELOOSE] : o[c.PRERELEASE]);
          if (!s || s[1] !== t)
            throw new Error(`invalid identifier: ${t}`);
        }
      }
      switch (a) {
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
            n === !1 && (m = [t]), i(this.prerelease[0], t) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${a}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return semver$1 = f, semver$1;
}
var parse_1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const e = requireSemver$1();
  return parse_1 = (p, o, c = !1) => {
    if (p instanceof e)
      return p;
    try {
      return new e(p, o);
    } catch (u) {
      if (!c)
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
    const c = e(p, o);
    return c ? c.version : null;
  }, valid_1;
}
var clean_1, hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const e = requireParse();
  return clean_1 = (p, o) => {
    const c = e(p.trim().replace(/^[=v]+/, ""), o);
    return c ? c.version : null;
  }, clean_1;
}
var inc_1, hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const e = requireSemver$1();
  return inc_1 = (p, o, c, u, i) => {
    typeof c == "string" && (i = u, u = c, c = void 0);
    try {
      return new e(
        p instanceof e ? p.version : p,
        c
      ).inc(o, u, i).version;
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
    const c = e(p, null, !0), u = e(o, null, !0), i = c.compare(u);
    if (i === 0)
      return null;
    const f = i > 0, r = f ? c : u, a = f ? u : c, t = !!r.prerelease.length;
    if (!!a.prerelease.length && !t) {
      if (!a.patch && !a.minor)
        return "major";
      if (a.compareMain(r) === 0)
        return a.minor && !a.patch ? "minor" : "patch";
    }
    const s = t ? "pre" : "";
    return c.major !== u.major ? s + "major" : c.minor !== u.minor ? s + "minor" : c.patch !== u.patch ? s + "patch" : "prerelease";
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
    const c = e(p, o);
    return c && c.prerelease.length ? c.prerelease : null;
  }, prerelease_1;
}
var compare_1, hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const e = requireSemver$1();
  return compare_1 = (p, o, c) => new e(p, c).compare(new e(o, c)), compare_1;
}
var rcompare_1, hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const e = requireCompare();
  return rcompare_1 = (p, o, c) => e(o, p, c), rcompare_1;
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
  return compareBuild_1 = (p, o, c) => {
    const u = new e(p, c), i = new e(o, c);
    return u.compare(i) || u.compareBuild(i);
  }, compareBuild_1;
}
var sort_1, hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const e = requireCompareBuild();
  return sort_1 = (p, o) => p.sort((c, u) => e(c, u, o)), sort_1;
}
var rsort_1, hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const e = requireCompareBuild();
  return rsort_1 = (p, o) => p.sort((c, u) => e(u, c, o)), rsort_1;
}
var gt_1, hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const e = requireCompare();
  return gt_1 = (p, o, c) => e(p, o, c) > 0, gt_1;
}
var lt_1, hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const e = requireCompare();
  return lt_1 = (p, o, c) => e(p, o, c) < 0, lt_1;
}
var eq_1, hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const e = requireCompare();
  return eq_1 = (p, o, c) => e(p, o, c) === 0, eq_1;
}
var neq_1, hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const e = requireCompare();
  return neq_1 = (p, o, c) => e(p, o, c) !== 0, neq_1;
}
var gte_1, hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const e = requireCompare();
  return gte_1 = (p, o, c) => e(p, o, c) >= 0, gte_1;
}
var lte_1, hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const e = requireCompare();
  return lte_1 = (p, o, c) => e(p, o, c) <= 0, lte_1;
}
var cmp_1, hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const e = requireEq(), d = requireNeq(), p = requireGt(), o = requireGte(), c = requireLt(), u = requireLte();
  return cmp_1 = (f, r, a, t) => {
    switch (r) {
      case "===":
        return typeof f == "object" && (f = f.version), typeof a == "object" && (a = a.version), f === a;
      case "!==":
        return typeof f == "object" && (f = f.version), typeof a == "object" && (a = a.version), f !== a;
      case "":
      case "=":
      case "==":
        return e(f, a, t);
      case "!=":
        return d(f, a, t);
      case ">":
        return p(f, a, t);
      case ">=":
        return o(f, a, t);
      case "<":
        return c(f, a, t);
      case "<=":
        return u(f, a, t);
      default:
        throw new TypeError(`Invalid operator: ${r}`);
    }
  }, cmp_1;
}
var coerce_1, hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const e = requireSemver$1(), d = requireParse(), { safeRe: p, t: o } = requireRe();
  return coerce_1 = (u, i) => {
    if (u instanceof e)
      return u;
    if (typeof u == "number" && (u = String(u)), typeof u != "string")
      return null;
    i = i || {};
    let f = null;
    if (!i.rtl)
      f = u.match(i.includePrerelease ? p[o.COERCEFULL] : p[o.COERCE]);
    else {
      const m = i.includePrerelease ? p[o.COERCERTLFULL] : p[o.COERCERTL];
      let y;
      for (; (y = m.exec(u)) && (!f || f.index + f[0].length !== u.length); )
        (!f || y.index + y[0].length !== f.index + f[0].length) && (f = y), m.lastIndex = y.index + y[1].length + y[2].length;
      m.lastIndex = -1;
    }
    if (f === null)
      return null;
    const r = f[2], a = f[3] || "0", t = f[4] || "0", n = i.includePrerelease && f[5] ? `-${f[5]}` : "", s = i.includePrerelease && f[6] ? `+${f[6]}` : "";
    return d(`${r}.${a}.${t}${n}${s}`, i);
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
  class d {
    constructor(U, ne) {
      if (ne = c(ne), U instanceof d)
        return U.loose === !!ne.loose && U.includePrerelease === !!ne.includePrerelease ? U : new d(U.raw, ne);
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
      const ue = this.options.loose, fe = ue ? r[a.HYPHENRANGELOOSE] : r[a.HYPHENRANGE];
      U = U.replace(fe, H(this.options.includePrerelease)), i("hyphen replace", U), U = U.replace(r[a.COMPARATORTRIM], t), i("comparator trim", U), U = U.replace(r[a.TILDETRIM], n), i("tilde trim", U), U = U.replace(r[a.CARETTRIM], s), i("caret trim", U);
      let ge = U.split(" ").map((ie) => C(ie, this.options)).join(" ").split(/\s+/).map((ie) => J(ie, this.options));
      ue && (ge = ge.filter((ie) => (i("loose invalid filter", ie, this.options), !!ie.match(r[a.COMPARATORLOOSE])))), i("range list", ge);
      const de = /* @__PURE__ */ new Map(), we = ge.map((ie) => new u(ie, this.options));
      for (const ie of we) {
        if (E(ie))
          return [ie];
        de.set(ie.value, ie);
      }
      de.size > 1 && de.has("") && de.delete("");
      const _e = [...de.values()];
      return o.set(L, _e), _e;
    }
    intersects(U, ne) {
      if (!(U instanceof d))
        throw new TypeError("a Range is required");
      return this.set.some((L) => q(L, ne) && U.set.some((K) => q(K, ne) && L.every((ue) => K.every((fe) => ue.intersects(fe, ne)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(U) {
      if (!U)
        return !1;
      if (typeof U == "string")
        try {
          U = new f(U, this.options);
        } catch {
          return !1;
        }
      for (let ne = 0; ne < this.set.length; ne++)
        if (X(this.set[ne], U, this.options))
          return !0;
      return !1;
    }
  }
  range = d;
  const p = requireLrucache(), o = new p(), c = requireParseOptions(), u = requireComparator(), i = requireDebug(), f = requireSemver$1(), {
    safeRe: r,
    t: a,
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
  }, C = (N, U) => (N = N.replace(r[a.BUILD], ""), i("comp", N, U), N = I(N, U), i("caret", N), N = $(N, U), i("tildes", N), N = A(N, U), i("xrange", N), N = z(N, U), i("stars", N), N), P = (N) => !N || N.toLowerCase() === "x" || N === "*", $ = (N, U) => N.trim().split(/\s+/).map((ne) => b(ne, U)).join(" "), b = (N, U) => {
    const ne = U.loose ? r[a.TILDELOOSE] : r[a.TILDE];
    return N.replace(ne, (L, K, ue, fe, ge) => {
      i("tilde", N, L, K, ue, fe, ge);
      let de;
      return P(K) ? de = "" : P(ue) ? de = `>=${K}.0.0 <${+K + 1}.0.0-0` : P(fe) ? de = `>=${K}.${ue}.0 <${K}.${+ue + 1}.0-0` : ge ? (i("replaceTilde pr", ge), de = `>=${K}.${ue}.${fe}-${ge} <${K}.${+ue + 1}.0-0`) : de = `>=${K}.${ue}.${fe} <${K}.${+ue + 1}.0-0`, i("tilde return", de), de;
    });
  }, I = (N, U) => N.trim().split(/\s+/).map((ne) => T(ne, U)).join(" "), T = (N, U) => {
    i("caret", N, U);
    const ne = U.loose ? r[a.CARETLOOSE] : r[a.CARET], L = U.includePrerelease ? "-0" : "";
    return N.replace(ne, (K, ue, fe, ge, de) => {
      i("caret", N, K, ue, fe, ge, de);
      let we;
      return P(ue) ? we = "" : P(fe) ? we = `>=${ue}.0.0${L} <${+ue + 1}.0.0-0` : P(ge) ? ue === "0" ? we = `>=${ue}.${fe}.0${L} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.0${L} <${+ue + 1}.0.0-0` : de ? (i("replaceCaret pr", de), ue === "0" ? fe === "0" ? we = `>=${ue}.${fe}.${ge}-${de} <${ue}.${fe}.${+ge + 1}-0` : we = `>=${ue}.${fe}.${ge}-${de} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.${ge}-${de} <${+ue + 1}.0.0-0`) : (i("no pr"), ue === "0" ? fe === "0" ? we = `>=${ue}.${fe}.${ge}${L} <${ue}.${fe}.${+ge + 1}-0` : we = `>=${ue}.${fe}.${ge}${L} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.${ge} <${+ue + 1}.0.0-0`), i("caret return", we), we;
    });
  }, A = (N, U) => (i("replaceXRanges", N, U), N.split(/\s+/).map((ne) => w(ne, U)).join(" ")), w = (N, U) => {
    N = N.trim();
    const ne = U.loose ? r[a.XRANGELOOSE] : r[a.XRANGE];
    return N.replace(ne, (L, K, ue, fe, ge, de) => {
      i("xRange", N, L, K, ue, fe, ge, de);
      const we = P(ue), _e = we || P(fe), ie = _e || P(ge), Ee = ie;
      return K === "=" && Ee && (K = ""), de = U.includePrerelease ? "-0" : "", we ? K === ">" || K === "<" ? L = "<0.0.0-0" : L = "*" : K && Ee ? (_e && (fe = 0), ge = 0, K === ">" ? (K = ">=", _e ? (ue = +ue + 1, fe = 0, ge = 0) : (fe = +fe + 1, ge = 0)) : K === "<=" && (K = "<", _e ? ue = +ue + 1 : fe = +fe + 1), K === "<" && (de = "-0"), L = `${K + ue}.${fe}.${ge}${de}`) : _e ? L = `>=${ue}.0.0${de} <${+ue + 1}.0.0-0` : ie && (L = `>=${ue}.${fe}.0${de} <${ue}.${+fe + 1}.0-0`), i("xRange return", L), L;
    });
  }, z = (N, U) => (i("replaceStars", N, U), N.trim().replace(r[a.STAR], "")), J = (N, U) => (i("replaceGTE0", N, U), N.trim().replace(r[U.includePrerelease ? a.GTE0PRE : a.GTE0], "")), H = (N) => (U, ne, L, K, ue, fe, ge, de, we, _e, ie, Ee) => (P(L) ? ne = "" : P(K) ? ne = `>=${L}.0.0${N ? "-0" : ""}` : P(ue) ? ne = `>=${L}.${K}.0${N ? "-0" : ""}` : fe ? ne = `>=${ne}` : ne = `>=${ne}${N ? "-0" : ""}`, P(we) ? de = "" : P(_e) ? de = `<${+we + 1}.0.0-0` : P(ie) ? de = `<${we}.${+_e + 1}.0-0` : Ee ? de = `<=${we}.${_e}.${ie}-${Ee}` : N ? de = `<${we}.${_e}.${+ie + 1}-0` : de = `<=${de}`, `${ne} ${de}`.trim()), X = (N, U, ne) => {
    for (let L = 0; L < N.length; L++)
      if (!N[L].test(U))
        return !1;
    if (U.prerelease.length && !ne.includePrerelease) {
      for (let L = 0; L < N.length; L++)
        if (i(N[L].semver), N[L].semver !== u.ANY && N[L].semver.prerelease.length > 0) {
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
  const e = Symbol("SemVer ANY");
  class d {
    static get ANY() {
      return e;
    }
    constructor(t, n) {
      if (n = p(n), t instanceof d) {
        if (t.loose === !!n.loose)
          return t;
        t = t.value;
      }
      t = t.trim().split(/\s+/).join(" "), i("comparator", t, n), this.options = n, this.loose = !!n.loose, this.parse(t), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(t) {
      const n = this.options.loose ? o[c.COMPARATORLOOSE] : o[c.COMPARATOR], s = t.match(n);
      if (!s)
        throw new TypeError(`Invalid comparator: ${t}`);
      this.operator = s[1] !== void 0 ? s[1] : "", this.operator === "=" && (this.operator = ""), s[2] ? this.semver = new f(s[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(t) {
      if (i("Comparator.test", t, this.options.loose), this.semver === e || t === e)
        return !0;
      if (typeof t == "string")
        try {
          t = new f(t, this.options);
        } catch {
          return !1;
        }
      return u(t, this.operator, this.semver, this.options);
    }
    intersects(t, n) {
      if (!(t instanceof d))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new r(t.value, n).test(this.value) : t.operator === "" ? t.value === "" ? !0 : new r(this.value, n).test(t.semver) : (n = p(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || u(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || u(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
    }
  }
  comparator = d;
  const p = requireParseOptions(), { safeRe: o, t: c } = requireRe(), u = requireCmp(), i = requireDebug(), f = requireSemver$1(), r = requireRange();
  return comparator;
}
var satisfies_1, hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const e = requireRange();
  return satisfies_1 = (p, o, c) => {
    try {
      o = new e(o, c);
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
  return toComparators_1 = (p, o) => new e(p, o).set.map((c) => c.map((u) => u.value).join(" ").trim().split(" ")), toComparators_1;
}
var maxSatisfying_1, hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const e = requireSemver$1(), d = requireRange();
  return maxSatisfying_1 = (o, c, u) => {
    let i = null, f = null, r = null;
    try {
      r = new d(c, u);
    } catch {
      return null;
    }
    return o.forEach((a) => {
      r.test(a) && (!i || f.compare(a) === -1) && (i = a, f = new e(i, u));
    }), i;
  }, maxSatisfying_1;
}
var minSatisfying_1, hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const e = requireSemver$1(), d = requireRange();
  return minSatisfying_1 = (o, c, u) => {
    let i = null, f = null, r = null;
    try {
      r = new d(c, u);
    } catch {
      return null;
    }
    return o.forEach((a) => {
      r.test(a) && (!i || f.compare(a) === 1) && (i = a, f = new e(i, u));
    }), i;
  }, minSatisfying_1;
}
var minVersion_1, hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const e = requireSemver$1(), d = requireRange(), p = requireGt();
  return minVersion_1 = (c, u) => {
    c = new d(c, u);
    let i = new e("0.0.0");
    if (c.test(i) || (i = new e("0.0.0-0"), c.test(i)))
      return i;
    i = null;
    for (let f = 0; f < c.set.length; ++f) {
      const r = c.set[f];
      let a = null;
      r.forEach((t) => {
        const n = new e(t.semver.version);
        switch (t.operator) {
          case ">":
            n.prerelease.length === 0 ? n.patch++ : n.prerelease.push(0), n.raw = n.format();
          /* fallthrough */
          case "":
          case ">=":
            (!a || p(n, a)) && (a = n);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${t.operator}`);
        }
      }), a && (!i || p(i, a)) && (i = a);
    }
    return i && c.test(i) ? i : null;
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
  const e = requireSemver$1(), d = requireComparator(), { ANY: p } = d, o = requireRange(), c = requireSatisfies(), u = requireGt(), i = requireLt(), f = requireLte(), r = requireGte();
  return outside_1 = (t, n, s, m) => {
    t = new e(t, m), n = new o(n, m);
    let y, E, g, q, C;
    switch (s) {
      case ">":
        y = u, E = f, g = i, q = ">", C = ">=";
        break;
      case "<":
        y = i, E = r, g = u, q = "<", C = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (c(t, n, m))
      return !1;
    for (let P = 0; P < n.set.length; ++P) {
      const $ = n.set[P];
      let b = null, I = null;
      if ($.forEach((T) => {
        T.semver === p && (T = new d(">=0.0.0")), b = b || T, I = I || T, y(T.semver, b.semver, m) ? b = T : g(T.semver, I.semver, m) && (I = T);
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
  return gtr_1 = (p, o, c) => e(p, o, ">", c), gtr_1;
}
var ltr_1, hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const e = requireOutside();
  return ltr_1 = (p, o, c) => e(p, o, "<", c), ltr_1;
}
var intersects_1, hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const e = requireRange();
  return intersects_1 = (p, o, c) => (p = new e(p, c), o = new e(o, c), p.intersects(o, c)), intersects_1;
}
var simplify, hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const e = requireSatisfies(), d = requireCompare();
  return simplify = (p, o, c) => {
    const u = [];
    let i = null, f = null;
    const r = p.sort((s, m) => d(s, m, c));
    for (const s of r)
      e(s, o, c) ? (f = s, i || (i = s)) : (f && u.push([i, f]), f = null, i = null);
    i && u.push([i, null]);
    const a = [];
    for (const [s, m] of u)
      s === m ? a.push(s) : !m && s === r[0] ? a.push("*") : m ? s === r[0] ? a.push(`<=${m}`) : a.push(`${s} - ${m}`) : a.push(`>=${s}`);
    const t = a.join(" || "), n = typeof o.raw == "string" ? o.raw : String(o);
    return t.length < n.length ? t : o;
  }, simplify;
}
var subset_1, hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const e = requireRange(), d = requireComparator(), { ANY: p } = d, o = requireSatisfies(), c = requireCompare(), u = (n, s, m = {}) => {
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
  }, i = [new d(">=0.0.0-0")], f = [new d(">=0.0.0")], r = (n, s, m) => {
    if (n === s)
      return !0;
    if (n.length === 1 && n[0].semver === p) {
      if (s.length === 1 && s[0].semver === p)
        return !0;
      m.includePrerelease ? n = i : n = f;
    }
    if (s.length === 1 && s[0].semver === p) {
      if (m.includePrerelease)
        return !0;
      s = f;
    }
    const y = /* @__PURE__ */ new Set();
    let E, g;
    for (const A of n)
      A.operator === ">" || A.operator === ">=" ? E = a(E, A, m) : A.operator === "<" || A.operator === "<=" ? g = t(g, A, m) : y.add(A.semver);
    if (y.size > 1)
      return null;
    let q;
    if (E && g) {
      if (q = c(E.semver, g.semver, m), q > 0)
        return null;
      if (q === 0 && (E.operator !== ">=" || g.operator !== "<="))
        return null;
    }
    for (const A of y) {
      if (E && !o(A, String(E), m) || g && !o(A, String(g), m))
        return null;
      for (const w of s)
        if (!o(A, String(w), m))
          return !1;
      return !0;
    }
    let C, P, $, b, I = g && !m.includePrerelease && g.semver.prerelease.length ? g.semver : !1, T = E && !m.includePrerelease && E.semver.prerelease.length ? E.semver : !1;
    I && I.prerelease.length === 1 && g.operator === "<" && I.prerelease[0] === 0 && (I = !1);
    for (const A of s) {
      if (b = b || A.operator === ">" || A.operator === ">=", $ = $ || A.operator === "<" || A.operator === "<=", E) {
        if (T && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === T.major && A.semver.minor === T.minor && A.semver.patch === T.patch && (T = !1), A.operator === ">" || A.operator === ">=") {
          if (C = a(E, A, m), C === A && C !== E)
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
  }, a = (n, s, m) => {
    if (!n)
      return s;
    const y = c(n.semver, s.semver, m);
    return y > 0 ? n : y < 0 || s.operator === ">" && n.operator === ">=" ? s : n;
  }, t = (n, s, m) => {
    if (!n)
      return s;
    const y = c(n.semver, s.semver, m);
    return y < 0 ? n : y > 0 || s.operator === "<" && n.operator === "<=" ? s : n;
  };
  return subset_1 = u, subset_1;
}
var semver, hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const e = requireRe(), d = requireConstants(), p = requireSemver$1(), o = requireIdentifiers(), c = requireParse(), u = requireValid$1(), i = requireClean(), f = requireInc(), r = requireDiff(), a = requireMajor(), t = requireMinor(), n = requirePatch(), s = requirePrerelease(), m = requireCompare(), y = requireRcompare(), E = requireCompareLoose(), g = requireCompareBuild(), q = requireSort(), C = requireRsort(), P = requireGt(), $ = requireLt(), b = requireEq(), I = requireNeq(), T = requireGte(), A = requireLte(), w = requireCmp(), z = requireCoerce(), J = requireComparator(), H = requireRange(), X = requireSatisfies(), N = requireToComparators(), U = requireMaxSatisfying(), ne = requireMinSatisfying(), L = requireMinVersion(), K = requireValid(), ue = requireOutside(), fe = requireGtr(), ge = requireLtr(), de = requireIntersects(), we = requireSimplify(), _e = requireSubset();
  return semver = {
    parse: c,
    valid: u,
    clean: i,
    inc: f,
    diff: r,
    major: a,
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
    cmp: w,
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
    simplifyRange: we,
    subset: _e,
    SemVer: p,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: d.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: d.RELEASE_TYPES,
    compareIdentifiers: o.compareIdentifiers,
    rcompareIdentifiers: o.rcompareIdentifiers
  }, semver;
}
var DownloadedUpdateHelper = {}, lodash_isequal = { exports: {} };
lodash_isequal.exports;
var hasRequiredLodash_isequal;
function requireLodash_isequal() {
  return hasRequiredLodash_isequal || (hasRequiredLodash_isequal = 1, (function(e, d) {
    var p = 200, o = "__lodash_hash_undefined__", c = 1, u = 2, i = 9007199254740991, f = "[object Arguments]", r = "[object Array]", a = "[object AsyncFunction]", t = "[object Boolean]", n = "[object Date]", s = "[object Error]", m = "[object Function]", y = "[object GeneratorFunction]", E = "[object Map]", g = "[object Number]", q = "[object Null]", C = "[object Object]", P = "[object Promise]", $ = "[object Proxy]", b = "[object RegExp]", I = "[object Set]", T = "[object String]", A = "[object Symbol]", w = "[object Undefined]", z = "[object WeakMap]", J = "[object ArrayBuffer]", H = "[object DataView]", X = "[object Float32Array]", N = "[object Float64Array]", U = "[object Int8Array]", ne = "[object Int16Array]", L = "[object Int32Array]", K = "[object Uint8Array]", ue = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", ge = "[object Uint32Array]", de = /[\\^$.*+?()[\]{}|]/g, we = /^\[object .+?Constructor\]$/, _e = /^(?:0|[1-9]\d*)$/, ie = {};
    ie[X] = ie[N] = ie[U] = ie[ne] = ie[L] = ie[K] = ie[ue] = ie[fe] = ie[ge] = !0, ie[f] = ie[r] = ie[J] = ie[t] = ie[H] = ie[n] = ie[s] = ie[m] = ie[E] = ie[g] = ie[C] = ie[b] = ie[I] = ie[T] = ie[z] = !1;
    var Ee = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, S = typeof self == "object" && self && self.Object === Object && self, R = Ee || S || Function("return this")(), te = d && !d.nodeType && d, k = te && !0 && e && !e.nodeType && e, pe = k && k.exports === te, ye = pe && Ee.process, ve = (function() {
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
      return x == null ? void 0 : x[Y];
    }
    function h(x) {
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
    var l = Array.prototype, D = Function.prototype, B = Object.prototype, Q = R["__core-js_shared__"], W = D.toString, _ = B.hasOwnProperty, M = (function() {
      var x = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "");
      return x ? "Symbol(src)_1." + x : "";
    })(), Z = B.toString, V = RegExp(
      "^" + W.call(_).replace(de, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
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
      return _.call(Y, x) ? Y[x] : void 0;
    }
    function Nr(x) {
      var Y = this.__data__;
      return Ge ? Y[x] !== void 0 : _.call(Y, x);
    }
    function Lr(x, Y) {
      var ce = this.__data__;
      return this.size += this.has(x) ? 0 : 1, ce[x] = Ge && Y === void 0 ? o : Y, this;
    }
    Qe.prototype.clear = $r, Qe.prototype.delete = Ir, Qe.prototype.get = Fr, Qe.prototype.has = Nr, Qe.prototype.set = Lr;
    function Ve(x) {
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
    Ve.prototype.clear = Ur, Ve.prototype.delete = kr, Ve.prototype.get = Mr, Ve.prototype.has = Br, Ve.prototype.set = jr;
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
        map: new (Te || Ve)(),
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
    function Vr(x) {
      return ur(this, x).has(x);
    }
    function Wr(x, Y) {
      var ce = ur(this, x), me = ce.size;
      return ce.set(x, Y), this.size += ce.size == me ? 0 : 1, this;
    }
    Ze.prototype.clear = Hr, Ze.prototype.delete = Gr, Ze.prototype.get = Yr, Ze.prototype.has = Vr, Ze.prototype.set = Wr;
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
      var Y = this.__data__ = new Ve(x);
      this.size = Y.size;
    }
    function Kr() {
      this.__data__ = new Ve(), this.size = 0;
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
      if (ce instanceof Ve) {
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
        _.call(x, De) && !($e && // Safari 9 has enumerable `arguments.length` in strict mode.
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
      return x == null ? x === void 0 ? w : q : ae && ae in Object(x) ? lt(x) : mt(x);
    }
    function mr(x) {
      return ar(x) && ir(x) == f;
    }
    function gr(x, Y, ce, me, Pe) {
      return x === Y ? !0 : x == null || Y == null || !ar(x) && !ar(Y) ? x !== x && Y !== Y : nt(x, Y, ce, me, gr, Pe);
    }
    function nt(x, Y, ce, me, Pe, Ae) {
      var $e = lr(x), Fe = lr(Y), Ne = $e ? r : Je(x), De = Fe ? r : Je(Y);
      Ne = Ne == f ? C : Ne, De = De == f ? C : De;
      var Me = Ne == C, Ye = De == C, Le = Ne == De;
      if (Le && hr(x)) {
        if (!hr(Y))
          return !1;
        $e = !0, Me = !1;
      }
      if (Le && !Me)
        return Ae || (Ae = new ze()), $e || qr(x) ? yr(x, Y, ce, me, Pe, Ae) : st(x, Y, Ne, ce, me, Pe, Ae);
      if (!(ce & c)) {
        var je = Me && _.call(x, "__wrapped__"), He = Ye && _.call(Y, "__wrapped__");
        if (je || He) {
          var Ke = je ? x.value() : x, We = He ? Y.value() : Y;
          return Ae || (Ae = new ze()), Pe(Ke, We, ce, me, Ae);
        }
      }
      return Le ? (Ae || (Ae = new ze()), ut(x, Y, ce, me, Pe, Ae)) : !1;
    }
    function it(x) {
      if (!Rr(x) || ht(x))
        return !1;
      var Y = wr(x) ? V : we;
      return Y.test(er(x));
    }
    function at(x) {
      return ar(x) && _r(x.length) && !!ie[ir(x)];
    }
    function ot(x) {
      if (!pt(x))
        return he(x);
      var Y = [];
      for (var ce in Object(x))
        _.call(x, ce) && ce != "constructor" && Y.push(ce);
      return Y;
    }
    function yr(x, Y, ce, me, Pe, Ae) {
      var $e = ce & c, Fe = x.length, Ne = Y.length;
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
          if (!Ce(Y, function(We, rr) {
            if (!ke(Le, rr) && (je === We || Pe(je, We, ce, me, Ae)))
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
          var Fe = h;
        case I:
          var Ne = me & c;
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
      var $e = ce & c, Fe = vr(x), Ne = Fe.length, De = vr(Y), Me = De.length;
      if (Ne != Me && !$e)
        return !1;
      for (var Ye = Ne; Ye--; ) {
        var Le = Fe[Ye];
        if (!($e ? Le in Y : _.call(Y, Le)))
          return !1;
      }
      var je = Ae.get(x);
      if (je && Ae.get(Y))
        return je == Y;
      var He = !0;
      Ae.set(x, Y), Ae.set(Y, x);
      for (var Ke = $e; ++Ye < Ne; ) {
        Le = Fe[Ye];
        var We = x[Le], rr = Y[Le];
        if (me)
          var Sr = $e ? me(rr, We, Le, Y, x, Ae) : me(We, rr, Le, x, Y, Ae);
        if (!(Sr === void 0 ? We === rr || Pe(We, rr, ce, me, Ae) : Sr)) {
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
      var Y = _.call(x, ae), ce = x[ae];
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
    } : wt, Je = ir;
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
      return Y = Y ?? i, !!Y && (typeof x == "number" || _e.test(x)) && x > -1 && x % 1 == 0 && x < Y;
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
          return W.call(x);
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
      return ar(x) && _.call(x, "callee") && !G.call(x, "callee");
    }, lr = Array.isArray;
    function yt(x) {
      return x != null && _r(x.length) && !wr(x);
    }
    var hr = le || _t;
    function vt(x, Y) {
      return gr(x, Y);
    }
    function wr(x) {
      if (!Rr(x))
        return !1;
      var Y = ir(x);
      return Y == m || Y == y || Y == a || Y == $;
    }
    function _r(x) {
      return typeof x == "number" && x > -1 && x % 1 == 0 && x <= i;
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
    function wt() {
      return [];
    }
    function _t() {
      return !1;
    }
    e.exports = vt;
  })(lodash_isequal, lodash_isequal.exports)), lodash_isequal.exports;
}
var hasRequiredDownloadedUpdateHelper;
function requireDownloadedUpdateHelper() {
  if (hasRequiredDownloadedUpdateHelper) return DownloadedUpdateHelper;
  hasRequiredDownloadedUpdateHelper = 1, Object.defineProperty(DownloadedUpdateHelper, "__esModule", { value: !0 }), DownloadedUpdateHelper.DownloadedUpdateHelper = void 0, DownloadedUpdateHelper.createTempUpdateFile = f;
  const e = require$$0$3, d = require$$1, p = requireLodash_isequal(), o = /* @__PURE__ */ requireLib(), c = require$$1$1;
  let u = class {
    constructor(a) {
      this.cacheDir = a, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
      return c.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(a, t, n, s) {
      if (this.versionInfo != null && this.file === a && this.fileInfo != null)
        return p(this.versionInfo, t) && p(this.fileInfo.info, n.info) && await (0, o.pathExists)(a) ? a : null;
      const m = await this.getValidCachedUpdateFile(n, s);
      return m === null ? null : (s.info(`Update has already been downloaded to ${a}).`), this._file = m, m);
    }
    async setDownloadedFile(a, t, n, s, m, y) {
      this._file = a, this._packageFile = t, this.versionInfo = n, this.fileInfo = s, this._downloadedFileInfo = {
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
    async getValidCachedUpdateFile(a, t) {
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
      if (!((m == null ? void 0 : m.fileName) !== null))
        return t.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (a.info.sha512 !== m.sha512)
        return t.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m.sha512}, expected: ${a.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const E = c.join(this.cacheDirForPendingUpdate, m.fileName);
      if (!await (0, o.pathExists)(E))
        return t.info("Cached update file doesn't exist"), null;
      const g = await i(E);
      return a.info.sha512 !== g ? (t.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${g}, expected: ${a.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = m, E);
    }
    getUpdateInfoFile() {
      return c.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  DownloadedUpdateHelper.DownloadedUpdateHelper = u;
  function i(r, a = "sha512", t = "base64", n) {
    return new Promise((s, m) => {
      const y = (0, e.createHash)(a);
      y.on("error", m).setEncoding(t), (0, d.createReadStream)(r, {
        ...n,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", m).on("end", () => {
        y.end(), s(y.read());
      }).pipe(y, { end: !1 });
    });
  }
  async function f(r, a, t) {
    let n = 0, s = c.join(a, r);
    for (let m = 0; m < 3; m++)
      try {
        return await (0, o.unlink)(s), s;
      } catch (y) {
        if (y.code === "ENOENT")
          return s;
        t.warn(`Error on remove temp update file: ${y}`), s = c.join(a, `${n++}-${r}`);
      }
    return s;
  }
  return DownloadedUpdateHelper;
}
var ElectronAppAdapter = {}, AppAdapter = {}, hasRequiredAppAdapter;
function requireAppAdapter() {
  if (hasRequiredAppAdapter) return AppAdapter;
  hasRequiredAppAdapter = 1, Object.defineProperty(AppAdapter, "__esModule", { value: !0 }), AppAdapter.getAppCacheDir = p;
  const e = require$$1$1, d = require$$2;
  function p() {
    const o = (0, d.homedir)();
    let c;
    return process.platform === "win32" ? c = process.env.LOCALAPPDATA || e.join(o, "AppData", "Local") : process.platform === "darwin" ? c = e.join(o, "Library", "Caches") : c = process.env.XDG_CACHE_HOME || e.join(o, ".cache"), c;
  }
  return AppAdapter;
}
var hasRequiredElectronAppAdapter;
function requireElectronAppAdapter() {
  if (hasRequiredElectronAppAdapter) return ElectronAppAdapter;
  hasRequiredElectronAppAdapter = 1, Object.defineProperty(ElectronAppAdapter, "__esModule", { value: !0 }), ElectronAppAdapter.ElectronAppAdapter = void 0;
  const e = require$$1$1, d = requireAppAdapter();
  let p = class {
    constructor(c = require$$1$3.app) {
      this.app = c;
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
      return (0, d.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(c) {
      this.app.once("quit", (u, i) => c(i));
    }
  };
  return ElectronAppAdapter.ElectronAppAdapter = p, ElectronAppAdapter;
}
var electronHttpExecutor = {}, hasRequiredElectronHttpExecutor;
function requireElectronHttpExecutor() {
  return hasRequiredElectronHttpExecutor || (hasRequiredElectronHttpExecutor = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = p;
    const d = requireOut();
    e.NET_SESSION_NAME = "electron-updater";
    function p() {
      return require$$1$3.session.fromPartition(e.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class o extends d.HttpExecutor {
      constructor(u) {
        super(), this.proxyLoginCallback = u, this.cachedSession = null;
      }
      async download(u, i, f) {
        return await f.cancellationToken.createPromise((r, a, t) => {
          const n = {
            headers: f.headers || void 0,
            redirect: "manual"
          };
          (0, d.configureRequestUrl)(u, n), (0, d.configureRequestOptions)(n), this.doDownload(n, {
            destination: i,
            options: f,
            onCancel: t,
            callback: (s) => {
              s == null ? r(i) : a(s);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(u, i) {
        u.headers && u.headers.Host && (u.host = u.headers.Host, delete u.headers.Host), this.cachedSession == null && (this.cachedSession = p());
        const f = require$$1$3.net.request({
          ...u,
          session: this.cachedSession
        });
        return f.on("response", i), this.proxyLoginCallback != null && f.on("login", this.proxyLoginCallback), f;
      }
      addRedirectHandlers(u, i, f, r, a) {
        u.on("redirect", (t, n, s) => {
          u.abort(), r > this.maxRedirects ? f(this.createMaxRedirectError()) : a(d.HttpExecutor.prepareRedirectUrlOptions(s, i));
        });
      }
    }
    e.ElectronHttpExecutor = o;
  })(electronHttpExecutor)), electronHttpExecutor;
}
var GenericProvider = {}, util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1, Object.defineProperty(util, "__esModule", { value: !0 }), util.newBaseUrl = d, util.newUrlFromBase = p, util.getChannelFilename = o;
  const e = require$$2$1;
  function d(c) {
    const u = new e.URL(c);
    return u.pathname.endsWith("/") || (u.pathname += "/"), u;
  }
  function p(c, u, i = !1) {
    const f = new e.URL(c, u), r = u.search;
    return r != null && r.length !== 0 ? f.search = r : i && (f.search = `noCache=${Date.now().toString(32)}`), f;
  }
  function o(c) {
    return `${c}.yml`;
  }
  return util;
}
var Provider = {}, lodash_escaperegexp, hasRequiredLodash_escaperegexp;
function requireLodash_escaperegexp() {
  if (hasRequiredLodash_escaperegexp) return lodash_escaperegexp;
  hasRequiredLodash_escaperegexp = 1;
  var e = "[object Symbol]", d = /[\\^$.*+?()[\]{}|]/g, p = RegExp(d.source), o = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, c = typeof self == "object" && self && self.Object === Object && self, u = o || c || Function("return this")(), i = Object.prototype, f = i.toString, r = u.Symbol, a = r ? r.prototype : void 0, t = a ? a.toString : void 0;
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
    return typeof g == "symbol" || s(g) && f.call(g) == e;
  }
  function y(g) {
    return g == null ? "" : n(g);
  }
  function E(g) {
    return g = y(g), g && p.test(g) ? g.replace(d, "\\$&") : g;
  }
  return lodash_escaperegexp = E, lodash_escaperegexp;
}
var hasRequiredProvider;
function requireProvider() {
  if (hasRequiredProvider) return Provider;
  hasRequiredProvider = 1, Object.defineProperty(Provider, "__esModule", { value: !0 }), Provider.Provider = void 0, Provider.findFile = i, Provider.parseUpdateInfo = f, Provider.getFileList = r, Provider.resolveFiles = a;
  const e = requireOut(), d = requireJsYaml(), p = require$$2$1, o = requireUtil(), c = requireLodash_escaperegexp();
  let u = class {
    constructor(n) {
      this.runtimeOptions = n, this.requestHeaders = null, this.executor = n.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(n, s, m, y = null) {
      const E = (0, o.newUrlFromBase)(`${n.pathname}.blockmap`, n);
      return [(0, o.newUrlFromBase)(`${n.pathname.replace(new RegExp(c(m), "g"), s)}.blockmap`, y ? new p.URL(y) : n), E];
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
  function i(t, n, s) {
    var m;
    if (t.length === 0)
      throw (0, e.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const y = t.filter((g) => g.url.pathname.toLowerCase().endsWith(`.${n.toLowerCase()}`)), E = (m = y.find((g) => [g.url.pathname, g.info.url].some((q) => q.includes(process.arch)))) !== null && m !== void 0 ? m : y.shift();
    return E || (s == null ? t[0] : t.find((g) => !s.some((q) => g.url.pathname.toLowerCase().endsWith(`.${q.toLowerCase()}`))));
  }
  function f(t, n, s) {
    if (t == null)
      throw (0, e.newError)(`Cannot parse update info from ${n} in the latest release artifacts (${s}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let m;
    try {
      m = (0, d.load)(t);
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
  function a(t, n, s = (m) => m) {
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
  const e = requireOut(), d = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, i, f) {
      super(f), this.configuration = u, this.updater = i, this.baseUrl = (0, d.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const u = this.updater.channel || this.configuration.channel;
      return u == null ? this.getDefaultChannelName() : this.getCustomChannelName(u);
    }
    async getLatestVersion() {
      const u = (0, d.getChannelFilename)(this.channel), i = (0, d.newUrlFromBase)(u, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let f = 0; ; f++)
        try {
          return (0, p.parseUpdateInfo)(await this.httpRequest(i), u, i);
        } catch (r) {
          if (r instanceof e.HttpError && r.statusCode === 404)
            throw (0, e.newError)(`Cannot find channel "${u}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (r.code === "ECONNREFUSED" && f < 3) {
            await new Promise((a, t) => {
              try {
                setTimeout(a, 1e3 * f);
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
  const e = requireOut(), d = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, i, f) {
      super({
        ...f,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = i;
      const { owner: r, slug: a } = u;
      this.baseUrl = (0, d.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${r}/${a}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const u = new e.CancellationToken(), i = (0, d.getChannelFilename)(this.getCustomChannelName(this.channel)), f = (0, d.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(f, void 0, u);
        return (0, p.parseUpdateInfo)(r, i, f);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, p.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { owner: u, slug: i } = this.configuration;
      return `Bitbucket (owner: ${u}, slug: ${i}, channel: ${this.channel})`;
    }
  };
  return BitbucketProvider.BitbucketProvider = o, BitbucketProvider;
}
var GitHubProvider = {}, hasRequiredGitHubProvider;
function requireGitHubProvider() {
  if (hasRequiredGitHubProvider) return GitHubProvider;
  hasRequiredGitHubProvider = 1, Object.defineProperty(GitHubProvider, "__esModule", { value: !0 }), GitHubProvider.GitHubProvider = GitHubProvider.BaseGitHubProvider = void 0, GitHubProvider.computeReleaseNotes = a;
  const e = requireOut(), d = requireSemver(), p = require$$2$1, o = requireUtil(), c = requireProvider(), u = /\/tag\/([^/]+)$/;
  class i extends c.Provider {
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
  GitHubProvider.BaseGitHubProvider = i;
  let f = class extends i {
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
          const z = ((n = this.updater) === null || n === void 0 ? void 0 : n.channel) || ((s = d.prerelease(this.updater.currentVersion)) === null || s === void 0 ? void 0 : s[0]) || null;
          if (z === null)
            $ = u.exec(P.element("link").attribute("href"))[1];
          else
            for (const J of C.getElements("entry")) {
              const H = u.exec(J.element("link").attribute("href"));
              if (H === null)
                continue;
              const X = H[1], N = ((m = d.prerelease(X)) === null || m === void 0 ? void 0 : m[0]) || null, U = !z || ["alpha", "beta"].includes(z), ne = N !== null && !["alpha", "beta"].includes(String(N));
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
        this.updater.allowPrerelease && (!((y = d.prerelease($)) === null || y === void 0) && y[0]) && (z = this.getCustomChannelName(String((E = d.prerelease($)) === null || E === void 0 ? void 0 : E[0]))), b = await A(z);
      } catch (z) {
        if (this.updater.allowPrerelease)
          b = await A(this.getDefaultChannelName());
        else
          throw z;
      }
      const w = (0, c.parseUpdateInfo)(b, I, T);
      return w.releaseName == null && (w.releaseName = P.elementValueOrEmpty("title")), w.releaseNotes == null && (w.releaseNotes = a(this.updater.currentVersion, this.updater.fullChangelog, C, P)), {
        tag: $,
        ...w
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
      return (0, c.resolveFiles)(n, this.baseUrl, (s) => this.getBaseDownloadPath(n.tag, s.replace(/ /g, "-")));
    }
    getBaseDownloadPath(n, s) {
      return `${this.basePath}/download/${n}/${s}`;
    }
  };
  GitHubProvider.GitHubProvider = f;
  function r(t) {
    const n = t.elementValueOrEmpty("content");
    return n === "No content." ? "" : n;
  }
  function a(t, n, s, m) {
    if (!n)
      return r(m);
    const y = [];
    for (const E of s.getElements("entry")) {
      const g = /\/tag\/v?([^/]+)$/.exec(E.element("link").attribute("href"))[1];
      d.lt(t, g) && y.push({
        version: g,
        note: r(E)
      });
    }
    return y.sort((E, g) => d.rcompare(E.version, g.version));
  }
  return GitHubProvider;
}
var GitLabProvider = {}, hasRequiredGitLabProvider;
function requireGitLabProvider() {
  if (hasRequiredGitLabProvider) return GitLabProvider;
  hasRequiredGitLabProvider = 1, Object.defineProperty(GitLabProvider, "__esModule", { value: !0 }), GitLabProvider.GitLabProvider = void 0;
  const e = requireOut(), d = require$$2$1, p = requireLodash_escaperegexp(), o = requireUtil(), c = requireProvider();
  let u = class extends c.Provider {
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
    normalizeFilename(f) {
      return f.replace(/ |_/g, "-");
    }
    constructor(f, r, a) {
      super({
        ...a,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = f, this.updater = r, this.cachedLatestVersion = null;
      const n = f.host || "gitlab.com";
      this.baseApiUrl = (0, o.newBaseUrl)(`https://${n}/api/v4`);
    }
    get channel() {
      const f = this.updater.channel || this.options.channel;
      return f == null ? this.getDefaultChannelName() : this.getCustomChannelName(f);
    }
    async getLatestVersion() {
      const f = new e.CancellationToken(), r = (0, o.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let a;
      try {
        const C = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, P = await this.httpRequest(r, C, f);
        if (!P)
          throw (0, e.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        a = JSON.parse(P);
      } catch (C) {
        throw (0, e.newError)(`Unable to find latest release on GitLab (${r}): ${C.stack || C.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const t = a.tag_name;
      let n = null, s = "", m = null;
      const y = async (C) => {
        s = (0, o.getChannelFilename)(C);
        const P = a.assets.links.find((b) => b.name === s);
        if (!P)
          throw (0, e.newError)(`Cannot find ${s} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        m = new d.URL(P.direct_asset_url);
        const $ = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const b = await this.httpRequest(m, $, f);
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
      const E = (0, c.parseUpdateInfo)(n, s, m);
      E.releaseName == null && (E.releaseName = a.name), E.releaseNotes == null && (E.releaseNotes = a.description || null);
      const g = /* @__PURE__ */ new Map();
      for (const C of a.assets.links)
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
    convertAssetsToMap(f) {
      const r = /* @__PURE__ */ new Map();
      for (const a of f.links)
        r.set(this.normalizeFilename(a.name), a.direct_asset_url);
      return r;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(f, r) {
      const a = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
      for (const t of a) {
        const n = f.get(t);
        if (n)
          return new d.URL(n);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(f) {
      const r = new e.CancellationToken(), a = [`v${f}`, f];
      for (const t of a) {
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
      throw (0, e.newError)(`Unable to find release with version ${f} (tried: ${a.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(f) {
      const r = {};
      return f != null && (f.startsWith("Bearer") ? r.authorization = f : r["PRIVATE-TOKEN"] = f), r;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(f) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === f)
        return this.cachedLatestVersion.assets;
      const r = await this.fetchReleaseInfoByVersion(f);
      return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(f, r, a) {
      let t = null, n = null;
      const s = await this.getVersionInfoForBlockMap(r);
      s && (t = this.findBlockMapInAssets(s, a));
      const m = await this.getVersionInfoForBlockMap(f);
      if (m) {
        const y = a.replace(new RegExp(p(r), "g"), f);
        n = this.findBlockMapInAssets(m, y);
      }
      return [n, t];
    }
    async getBlockMapFiles(f, r, a, t = null) {
      if (this.options.uploadTarget === "project_upload") {
        const n = f.pathname.split("/").pop() || "", [s, m] = await this.findBlockMapUrlsFromAssets(r, a, n);
        if (!m)
          throw (0, e.newError)(`Cannot find blockmap file for ${a} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!s)
          throw (0, e.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [s, m];
      } else
        return super.getBlockMapFiles(f, r, a, t);
    }
    resolveFiles(f) {
      return (0, c.getFileList)(f).map((r) => {
        const t = [
          r.url,
          // Original filename
          this.normalizeFilename(r.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((s) => f.assets.has(s)), n = t ? f.assets.get(t) : void 0;
        if (!n)
          throw (0, e.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(f.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new d.URL(n),
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
  const e = requireOut(), d = requireUtil(), p = requireProvider();
  let o = class extends p.Provider {
    constructor(u, i, f) {
      super({
        ...f,
        isUseMultipleRangeRequest: !1
      }), this.configuration = u, this.updater = i, this.defaultHostname = "api.keygen.sh";
      const r = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, d.newBaseUrl)(`https://${r}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const u = new e.CancellationToken(), i = (0, d.getChannelFilename)(this.getCustomChannelName(this.channel)), f = (0, d.newUrlFromBase)(i, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(f, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, u);
        return (0, p.parseUpdateInfo)(r, i, f);
      } catch (r) {
        throw (0, e.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(u) {
      return (0, p.resolveFiles)(u, this.baseUrl);
    }
    toString() {
      const { account: u, product: i, platform: f } = this.configuration;
      return `Keygen (account: ${u}, product: ${i}, platform: ${f}, channel: ${this.channel})`;
    }
  };
  return KeygenProvider.KeygenProvider = o, KeygenProvider;
}
var PrivateGitHubProvider = {}, hasRequiredPrivateGitHubProvider;
function requirePrivateGitHubProvider() {
  if (hasRequiredPrivateGitHubProvider) return PrivateGitHubProvider;
  hasRequiredPrivateGitHubProvider = 1, Object.defineProperty(PrivateGitHubProvider, "__esModule", { value: !0 }), PrivateGitHubProvider.PrivateGitHubProvider = void 0;
  const e = requireOut(), d = requireJsYaml(), p = require$$1$1, o = require$$2$1, c = requireUtil(), u = requireGitHubProvider(), i = requireProvider();
  let f = class extends u.BaseGitHubProvider {
    constructor(a, t, n, s) {
      super(a, "api.github.com", s), this.updater = t, this.token = n;
    }
    createRequestOptions(a, t) {
      const n = super.createRequestOptions(a, t);
      return n.redirect = "manual", n;
    }
    async getLatestVersion() {
      const a = new e.CancellationToken(), t = (0, c.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(a), s = n.assets.find((E) => E.name === t);
      if (s == null)
        throw (0, e.newError)(`Cannot find ${t} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const m = new o.URL(s.url);
      let y;
      try {
        y = (0, d.load)(await this.httpRequest(m, this.configureHeaders("application/octet-stream"), a));
      } catch (E) {
        throw E instanceof e.HttpError && E.statusCode === 404 ? (0, e.newError)(`Cannot find ${t} in the latest release artifacts (${m}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
      return y.assets = n.assets, y;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(a) {
      return {
        accept: a,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(a) {
      const t = this.updater.allowPrerelease;
      let n = this.basePath;
      t || (n = `${n}/latest`);
      const s = (0, c.newUrlFromBase)(n, this.baseUrl);
      try {
        const m = JSON.parse(await this.httpRequest(s, this.configureHeaders("application/vnd.github.v3+json"), a));
        return t ? m.find((y) => y.prerelease) || m[0] : m;
      } catch (m) {
        throw (0, e.newError)(`Unable to find latest version on GitHub (${s}), please ensure a production release exists: ${m.stack || m.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(a) {
      return (0, i.getFileList)(a).map((t) => {
        const n = p.posix.basename(t.url).replace(/ /g, "-"), s = a.assets.find((m) => m != null && m.name === n);
        if (s == null)
          throw (0, e.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(a.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new o.URL(s.url),
          info: t
        };
      });
    }
  };
  return PrivateGitHubProvider.PrivateGitHubProvider = f, PrivateGitHubProvider;
}
var hasRequiredProviderFactory;
function requireProviderFactory() {
  if (hasRequiredProviderFactory) return providerFactory;
  hasRequiredProviderFactory = 1, Object.defineProperty(providerFactory, "__esModule", { value: !0 }), providerFactory.isUrlProbablySupportMultiRangeRequests = f, providerFactory.createClient = r;
  const e = requireOut(), d = requireBitbucketProvider(), p = requireGenericProvider(), o = requireGitHubProvider(), c = requireGitLabProvider(), u = requireKeygenProvider(), i = requirePrivateGitHubProvider();
  function f(a) {
    return !a.includes("s3.amazonaws.com");
  }
  function r(a, t, n) {
    if (typeof a == "string")
      throw (0, e.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const s = a.provider;
    switch (s) {
      case "github": {
        const m = a, y = (m.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || m.token;
        return y == null ? new o.GitHubProvider(m, t, n) : new i.PrivateGitHubProvider(m, t, y, n);
      }
      case "bitbucket":
        return new d.BitbucketProvider(a, t, n);
      case "gitlab":
        return new c.GitLabProvider(a, t, n);
      case "keygen":
        return new u.KeygenProvider(a, t, n);
      case "s3":
      case "spaces":
        return new p.GenericProvider({
          provider: "generic",
          url: (0, e.getS3LikeProviderBaseUrl)(a),
          channel: a.channel || null
        }, t, {
          ...n,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const m = a;
        return new p.GenericProvider(m, t, {
          ...n,
          isUseMultipleRangeRequest: m.useMultipleRangeRequest !== !1 && f(m.url)
        });
      }
      case "custom": {
        const m = a, y = m.updateProvider;
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
  hasRequiredDownloadPlanBuilder = 1, Object.defineProperty(downloadPlanBuilder, "__esModule", { value: !0 }), downloadPlanBuilder.OperationKind = void 0, downloadPlanBuilder.computeOperations = d;
  var e;
  (function(i) {
    i[i.COPY = 0] = "COPY", i[i.DOWNLOAD = 1] = "DOWNLOAD";
  })(e || (downloadPlanBuilder.OperationKind = e = {}));
  function d(i, f, r) {
    const a = u(i.files), t = u(f.files);
    let n = null;
    const s = f.files[0], m = [], y = s.name, E = a.get(y);
    if (E == null)
      throw new Error(`no file ${y} in old blockmap`);
    const g = t.get(y);
    let q = 0;
    const { checksumToOffset: C, checksumToOldSize: P } = c(a.get(y), E.offset, r);
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
  function o(i, f, r, a) {
    if (p && f.length !== 0) {
      const t = f[f.length - 1];
      if (t.kind === i.kind && i.start < t.end && i.start > t.start) {
        const n = [t.start, t.end, i.start, i.end].reduce((s, m) => s < m ? s : m);
        throw new Error(`operation (block index: ${a}, checksum: ${r}, kind: ${e[i.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${t.start} until ${t.end} and ${i.start} until ${i.end}
rel: ${t.start - n} until ${t.end - n} and ${i.start - n} until ${i.end - n}`);
      }
    }
    f.push(i);
  }
  function c(i, f, r) {
    const a = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
    let n = f;
    for (let s = 0; s < i.checksums.length; s++) {
      const m = i.checksums[s], y = i.sizes[s], E = t.get(m);
      if (E === void 0)
        a.set(m, n), t.set(m, y);
      else if (r.debug != null) {
        const g = E === y ? "(same size)" : `(size: ${E}, this size: ${y})`;
        r.debug(`${m} duplicated in blockmap ${g}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      n += y;
    }
    return { checksumToOffset: a, checksumToOldSize: t };
  }
  function u(i) {
    const f = /* @__PURE__ */ new Map();
    for (const r of i)
      f.set(r.name, r);
    return f;
  }
  return downloadPlanBuilder;
}
var hasRequiredDataSplitter;
function requireDataSplitter() {
  if (hasRequiredDataSplitter) return DataSplitter;
  hasRequiredDataSplitter = 1, Object.defineProperty(DataSplitter, "__esModule", { value: !0 }), DataSplitter.DataSplitter = void 0, DataSplitter.copyData = i;
  const e = requireOut(), d = require$$1, p = require$$0$1, o = requireDownloadPlanBuilder(), c = Buffer.from(`\r
\r
`);
  var u;
  (function(r) {
    r[r.INIT = 0] = "INIT", r[r.HEADER = 1] = "HEADER", r[r.BODY = 2] = "BODY";
  })(u || (u = {}));
  function i(r, a, t, n, s) {
    const m = (0, d.createReadStream)("", {
      fd: t,
      autoClose: !1,
      start: r.start,
      // end is inclusive
      end: r.end - 1
    });
    m.on("error", n), m.once("end", s), m.pipe(a, {
      end: !1
    });
  }
  let f = class extends p.Writable {
    constructor(a, t, n, s, m, y) {
      super(), this.out = a, this.options = t, this.partIndexToTaskIndex = n, this.partIndexToLength = m, this.finishHandler = y, this.partIndex = -1, this.headerListBuffer = null, this.readState = u.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = s.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(a, t, n) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${a.length} bytes`);
        return;
      }
      this.handleData(a).then(n).catch(n);
    }
    async handleData(a) {
      let t = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, e.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const n = Math.min(this.ignoreByteCount, a.length);
        this.ignoreByteCount -= n, t = n;
      } else if (this.remainingPartDataCount > 0) {
        const n = Math.min(this.remainingPartDataCount, a.length);
        this.remainingPartDataCount -= n, await this.processPartData(a, 0, n), t = n;
      }
      if (t !== a.length) {
        if (this.readState === u.HEADER) {
          const n = this.searchHeaderListEnd(a, t);
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
            if (t = this.searchHeaderListEnd(a, t), t === -1) {
              this.readState = u.HEADER;
              return;
            }
          }
          const n = this.partIndexToLength[this.partIndex], s = t + n, m = Math.min(s, a.length);
          if (await this.processPartStarted(a, t, m), this.remainingPartDataCount = n - (m - t), this.remainingPartDataCount > 0)
            return;
          if (t = s + this.boundaryLength, t >= a.length) {
            this.ignoreByteCount = this.boundaryLength - (a.length - s);
            return;
          }
        }
      }
    }
    copyExistingData(a, t) {
      return new Promise((n, s) => {
        const m = () => {
          if (a === t) {
            n();
            return;
          }
          const y = this.options.tasks[a];
          if (y.kind !== o.OperationKind.COPY) {
            s(new Error("Task kind must be COPY"));
            return;
          }
          i(y, this.out, this.options.oldFileFd, s, () => {
            a++, m();
          });
        };
        m();
      });
    }
    searchHeaderListEnd(a, t) {
      const n = a.indexOf(c, t);
      if (n !== -1)
        return n + c.length;
      const s = t === 0 ? a : a.slice(t);
      return this.headerListBuffer == null ? this.headerListBuffer = s : this.headerListBuffer = Buffer.concat([this.headerListBuffer, s]), -1;
    }
    onPartEnd() {
      const a = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== a)
        throw (0, e.newError)(`Expected length: ${a} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(a, t, n) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(a, t, n);
    }
    processPartData(a, t, n) {
      this.actualPartLength += n - t;
      const s = this.out;
      return s.write(t === 0 && a.length === n ? a : a.slice(t, n)) ? Promise.resolve() : new Promise((m, y) => {
        s.on("error", y), s.once("drain", () => {
          s.removeListener("error", y), m();
        });
      });
    }
  };
  return DataSplitter.DataSplitter = f, DataSplitter;
}
var multipleRangeDownloader = {}, hasRequiredMultipleRangeDownloader;
function requireMultipleRangeDownloader() {
  if (hasRequiredMultipleRangeDownloader) return multipleRangeDownloader;
  hasRequiredMultipleRangeDownloader = 1, Object.defineProperty(multipleRangeDownloader, "__esModule", { value: !0 }), multipleRangeDownloader.executeTasksUsingMultipleRangeRequests = o, multipleRangeDownloader.checkIsRangesSupported = u;
  const e = requireOut(), d = requireDataSplitter(), p = requireDownloadPlanBuilder();
  function o(i, f, r, a, t) {
    const n = (s) => {
      if (s >= f.length) {
        i.fileMetadataBuffer != null && r.write(i.fileMetadataBuffer), r.end();
        return;
      }
      const m = s + 1e3;
      c(i, {
        tasks: f,
        start: s,
        end: Math.min(f.length, m),
        oldFileFd: a
      }, r, () => n(m), t);
    };
    return n;
  }
  function c(i, f, r, a, t) {
    let n = "bytes=", s = 0;
    const m = /* @__PURE__ */ new Map(), y = [];
    for (let q = f.start; q < f.end; q++) {
      const C = f.tasks[q];
      C.kind === p.OperationKind.DOWNLOAD && (n += `${C.start}-${C.end - 1}, `, m.set(s, q), s++, y.push(C.end - C.start));
    }
    if (s <= 1) {
      const q = (C) => {
        if (C >= f.end) {
          a();
          return;
        }
        const P = f.tasks[C++];
        if (P.kind === p.OperationKind.COPY)
          (0, d.copyData)(P, r, f.oldFileFd, t, () => q(C));
        else {
          const $ = i.createRequestOptions();
          $.headers.Range = `bytes=${P.start}-${P.end - 1}`;
          const b = i.httpExecutor.createRequest($, (I) => {
            I.on("error", t), u(I, t) && (I.pipe(r, {
              end: !1
            }), I.once("end", () => q(C)));
          });
          i.httpExecutor.addErrorAndTimeoutHandlers(b, t), b.end();
        }
      };
      q(f.start);
      return;
    }
    const E = i.createRequestOptions();
    E.headers.Range = n.substring(0, n.length - 2);
    const g = i.httpExecutor.createRequest(E, (q) => {
      if (!u(q, t))
        return;
      const C = (0, e.safeGetHeader)(q, "content-type"), P = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(C);
      if (P == null) {
        t(new Error(`Content-Type "multipart/byteranges" is expected, but got "${C}"`));
        return;
      }
      const $ = new d.DataSplitter(r, f, m, P[1] || P[2], y, a);
      $.on("error", t), q.pipe($), q.on("end", () => {
        setTimeout(() => {
          g.abort(), t(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    i.httpExecutor.addErrorAndTimeoutHandlers(g, t), g.end();
  }
  function u(i, f) {
    if (i.statusCode >= 400)
      return f((0, e.createHttpError)(i)), !1;
    if (i.statusCode !== 206) {
      const r = (0, e.safeGetHeader)(i, "accept-ranges");
      if (r == null || r === "none")
        return f(new Error(`Server doesn't support Accept-Ranges (response code ${i.statusCode})`)), !1;
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
  var d;
  (function(o) {
    o[o.COPY = 0] = "COPY", o[o.DOWNLOAD = 1] = "DOWNLOAD";
  })(d || (d = {}));
  let p = class extends e.Transform {
    constructor(c, u, i) {
      super(), this.progressDifferentialDownloadInfo = c, this.cancellationToken = u, this.onProgress = i, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = d.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(c, u, i) {
      if (this.cancellationToken.cancelled) {
        i(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == d.COPY) {
        i(null, c);
        return;
      }
      this.transferred += c.length, this.delta += c.length;
      const f = Date.now();
      f >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = f + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((f - this.start) / 1e3))
      }), this.delta = 0), i(null, c);
    }
    beginFileCopy() {
      this.operationType = d.COPY;
    }
    beginRangeDownload() {
      this.operationType = d.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
    _flush(c) {
      if (this.cancellationToken.cancelled) {
        c(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, c(null);
    }
  };
  return ProgressDifferentialDownloadCallbackTransform.ProgressDifferentialDownloadCallbackTransform = p, ProgressDifferentialDownloadCallbackTransform;
}
var hasRequiredDifferentialDownloader;
function requireDifferentialDownloader() {
  if (hasRequiredDifferentialDownloader) return DifferentialDownloader;
  hasRequiredDifferentialDownloader = 1, Object.defineProperty(DifferentialDownloader, "__esModule", { value: !0 }), DifferentialDownloader.DifferentialDownloader = void 0;
  const e = requireOut(), d = /* @__PURE__ */ requireLib(), p = require$$1, o = requireDataSplitter(), c = require$$2$1, u = requireDownloadPlanBuilder(), i = requireMultipleRangeDownloader(), f = requireProgressDifferentialDownloadCallbackTransform();
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
      return y.info(`Full: ${a(C)}, To download: ${a(g)} (${Math.round(g / (C / 100))}%)`), this.downloadFile(E);
    }
    downloadFile(s) {
      const m = [], y = () => Promise.all(m.map((E) => (0, d.close)(E.descriptor).catch((g) => {
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
      const y = await (0, d.open)(this.options.oldFile, "r");
      m.push({ descriptor: y, path: this.options.oldFile });
      const E = await (0, d.open)(this.options.newFile, "w");
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
          $ = new f.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), P.push($);
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
          A = (0, i.executeTasksUsingMultipleRangeRequests)(this, s, T, y, C), A(0);
          return;
        }
        let w = 0, z = null;
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
              $ && $.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => A(H), 1e3)) : A(H);
            });
          });
          L.on("redirect", (K, ue, fe) => {
            this.logger.info(`Redirect to ${t(fe)}`), z = fe, (0, e.configureRequestUrl)(new c.URL(z), J), L.followRedirect();
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
          (0, i.checkIsRangesSupported)(q, E) && (q.on("error", E), q.on("aborted", () => {
            E(new Error("response has been aborted by the server"));
          }), q.on("data", m), q.on("end", () => y()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(g, E), g.end();
      });
    }
  };
  DifferentialDownloader.DifferentialDownloader = r;
  function a(n, s = " KB") {
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
  let d = class extends e.DifferentialDownloader {
    download(o, c) {
      return this.doDownload(o, c);
    }
  };
  return GenericDifferentialDownloader.GenericDifferentialDownloader = d, GenericDifferentialDownloader;
}
var types = {}, hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = o;
    const d = requireOut();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return d.CancellationToken;
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
    function o(c, u, i) {
      c.on(u, i);
    }
  })(types)), types;
}
var hasRequiredAppUpdater;
function requireAppUpdater() {
  if (hasRequiredAppUpdater) return AppUpdater;
  hasRequiredAppUpdater = 1, Object.defineProperty(AppUpdater, "__esModule", { value: !0 }), AppUpdater.NoOpLogger = AppUpdater.AppUpdater = void 0;
  const e = requireOut(), d = require$$0$3, p = require$$2, o = require$$0$2, c = /* @__PURE__ */ requireLib(), u = requireJsYaml(), i = requireMain$1(), f = require$$1$1, r = requireSemver(), a = requireDownloadedUpdateHelper(), t = requireElectronAppAdapter(), n = requireElectronHttpExecutor(), s = requireGenericProvider(), m = requireProviderFactory(), y = require$$14, E = requireGenericDifferentialDownloader(), g = requireTypes();
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
      this.clientPromise = null, this._appUpdateConfigPath = b, this.configOnDisk = new i.Lazy(() => this.loadUpdateConfig());
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
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new g.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (w) => this.checkIfUpdateSupported(w), this._isUserWithinRollout = (w) => this.isStagingMatch(w), this.clientPromise = null, this.stagingUserIdPromise = new i.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new i.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (w) => {
        this._logger.error(`Error: ${w.stack || w.message}`);
      }), I == null ? (this.app = new t.ElectronAppAdapter(), this.httpExecutor = new n.ElectronHttpExecutor((w, z) => this.emit("login", w, z))) : (this.app = I, this.httpExecutor = null);
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
      return this.checkForUpdates().then((I) => I != null && I.downloadPromise ? (I.downloadPromise.then(() => {
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
      const w = (0, r.gt)(I, T), z = (0, r.lt)(I, T);
      return w ? !0 : this.allowDowngrade && z;
    }
    checkIfUpdateSupported(b) {
      const I = b == null ? void 0 : b.minimumSystemVersion, T = (0, p.release)();
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
          } catch (w) {
            this._logger.warn(`Cannot dispatch error event: ${w.stack || w}`);
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
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, u.load)(await (0, c.readFile)(this._appUpdateConfigPath, "utf-8"));
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
      const b = f.join(this.app.userDataPath, ".updaterId");
      try {
        const T = await (0, c.readFile)(b, "utf-8");
        if (e.UUID.check(T))
          return T;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${T}`);
      } catch (T) {
        T.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${T}`);
      }
      const I = e.UUID.v5((0, d.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${I}`);
      try {
        await (0, c.outputFile)(b, I);
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
        const A = f.join(this.app.baseCachePath, I || this.app.name);
        T.debug != null && T.debug(`updater cache dir: ${A}`), b = new a.DownloadedUpdateHelper(A), this.downloadedUpdateHelper = b;
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
      const A = b.downloadUpdateOptions.updateInfoAndProvider.info, w = A.version, z = I.packageInfo;
      function J() {
        const de = decodeURIComponent(b.fileInfo.url.pathname);
        return de.toLowerCase().endsWith(`.${b.fileExtension.toLowerCase()}`) ? f.basename(de) : b.fileInfo.info.url;
      }
      const H = await this.getOrCreateDownloadHelper(), X = H.cacheDirForPendingUpdate;
      await (0, c.mkdir)(X, { recursive: !0 });
      const N = J();
      let U = f.join(X, N);
      const ne = z == null ? null : f.join(X, `package-${w}${f.extname(z.path) || ".7z"}`), L = async (de) => {
        await H.setDownloadedFile(U, ne, A, I, N, de), await b.done({
          ...A,
          downloadedFile: U
        });
        const we = f.join(X, "current.blockmap");
        return await (0, c.pathExists)(we) && await (0, c.copyFile)(we, f.join(H.cacheDir, "current.blockmap")), ne == null ? [U] : [U, ne];
      }, K = this._logger, ue = await H.validateDownloadedPath(U, A, I, K);
      if (ue != null)
        return U = ue, await L(!1);
      const fe = async () => (await H.clear().catch(() => {
      }), await (0, c.unlink)(U).catch(() => {
      })), ge = await (0, a.createTempUpdateFile)(`temp-${N}`, X, K);
      try {
        await b.task(ge, T, ne, fe), await (0, e.retry)(() => (0, c.rename)(ge, U), {
          retries: 60,
          interval: 500,
          shouldRetry: (de) => de instanceof Error && /^EBUSY:/.test(de.message) ? !0 : (K.warn(`Cannot rename temp file to final file: ${de.message || de.stack}`), !1)
        });
      } catch (de) {
        throw await fe(), de instanceof e.CancellationError && (K.info("cancelled"), this.emit("update-cancelled", A)), de;
      }
      return K.info(`New version ${w} has been downloaded to ${U}`), await L(!0);
    }
    async differentialDownloadInstaller(b, I, T, A, w) {
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
          oldFile: f.join(this.downloadedUpdateHelper.cacheDir, w),
          logger: this._logger,
          newFile: T,
          isUseMultipleRangeRequest: z.isUseMultipleRangeRequest,
          requestHeaders: I.requestHeaders,
          cancellationToken: I.cancellationToken
        };
        this.listenerCount(g.DOWNLOAD_PROGRESS) > 0 && (X.onProgress = (K) => this.emit(g.DOWNLOAD_PROGRESS, K));
        const N = async (K, ue) => {
          const fe = f.join(ue, "current.blockmap");
          await (0, c.outputFile)(fe, (0, y.gzipSync)(JSON.stringify(K)));
        }, U = async (K) => {
          const ue = f.join(K, "current.blockmap");
          try {
            if (await (0, c.pathExists)(ue))
              return JSON.parse((0, y.gunzipSync)(await (0, c.readFile)(ue)).toString());
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
  const e = require$$1$4, d = requireAppUpdater();
  let p = class extends d.AppUpdater {
    constructor(c, u) {
      super(c, u), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(c = !1, u = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(c, c ? u : this.autoRunAppAfterInstall) ? setImmediate(() => {
        require$$1$3.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(c) {
      return super.executeDownload({
        ...c,
        done: (u) => (this.dispatchUpdateDownloaded(u), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(c = !1, u = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const i = this.downloadedUpdateHelper, f = this.installerPath, r = i == null ? null : i.downloadedFileInfo;
      if (f == null || r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${c}, isForceRunAfter: ${u}`), this.doInstall({
          isSilent: c,
          isForceRunAfter: u,
          isAdminRightsRequired: r.isAdminRightsRequired
        });
      } catch (a) {
        return this.dispatchError(a), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((c) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (c !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${c}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(c, u = [], i = {}) {
      this._logger.info(`Executing: ${c} with args: ${u}`);
      const f = (0, e.spawnSync)(c, u, {
        env: { ...process.env, ...i },
        encoding: "utf-8",
        shell: !0
      }), { error: r, status: a, stdout: t, stderr: n } = f;
      if (r != null)
        throw this._logger.error(n), r;
      if (a != null && a !== 0)
        throw this._logger.error(n), new Error(`Command ${c} exited with code ${a}`);
      return t.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(c, u = [], i = void 0, f = "ignore") {
      return this._logger.info(`Executing: ${c} with args: ${u}`), new Promise((r, a) => {
        try {
          const t = { stdio: f, env: i, detached: !0 }, n = (0, e.spawn)(c, u, t);
          n.on("error", (s) => {
            a(s);
          }), n.unref(), n.pid !== void 0 && r(!0);
        } catch (t) {
          a(t);
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
  const e = /* @__PURE__ */ requireLib(), d = requireDifferentialDownloader(), p = require$$14;
  let o = class extends d.DifferentialDownloader {
    async download() {
      const f = this.blockAwareFileInfo, r = f.size, a = r - (f.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(a, r - 1);
      const t = c(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await u(this.options.oldFile), t);
    }
  };
  FileWithEmbeddedBlockMapDifferentialDownloader.FileWithEmbeddedBlockMapDifferentialDownloader = o;
  function c(i) {
    return JSON.parse((0, p.inflateRawSync)(i).toString());
  }
  async function u(i) {
    const f = await (0, e.open)(i, "r");
    try {
      const r = (await (0, e.fstat)(f)).size, a = Buffer.allocUnsafe(4);
      await (0, e.read)(f, a, 0, a.length, r - a.length);
      const t = Buffer.allocUnsafe(a.readUInt32BE(0));
      return await (0, e.read)(f, t, 0, t.length, r - a.length - t.length), await (0, e.close)(f), c(t);
    } catch (r) {
      throw await (0, e.close)(f), r;
    }
  }
  return FileWithEmbeddedBlockMapDifferentialDownloader;
}
var hasRequiredAppImageUpdater;
function requireAppImageUpdater() {
  if (hasRequiredAppImageUpdater) return AppImageUpdater;
  hasRequiredAppImageUpdater = 1, Object.defineProperty(AppImageUpdater, "__esModule", { value: !0 }), AppImageUpdater.AppImageUpdater = void 0;
  const e = requireOut(), d = require$$1$4, p = /* @__PURE__ */ requireLib(), o = require$$1, c = require$$1$1, u = requireBaseUpdater(), i = requireFileWithEmbeddedBlockMapDifferentialDownloader(), f = requireProvider(), r = requireTypes();
  let a = class extends u.BaseUpdater {
    constructor(n, s) {
      super(n, s);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(n) {
      const s = n.updateInfoAndProvider.provider, m = (0, f.findFile)(s.resolveFiles(n.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
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
        return this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (g.onProgress = (q) => this.emit(r.DOWNLOAD_PROGRESS, q)), await new i.FileWithEmbeddedBlockMapDifferentialDownloader(n.info, this.httpExecutor, g).download(), !1;
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
      const y = c.basename(s), E = this.installerPath;
      if (E == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      c.basename(E) === y || !/\d+\.\d+\.\d+/.test(y) ? m = s : m = c.join(c.dirname(s), c.basename(E)), (0, d.execFileSync)("mv", ["-f", E, m]), m !== s && this.emit("appimage-filename-updated", m);
      const g = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return n.isForceRunAfter ? this.spawnLog(m, [], g) : (g.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, d.execFileSync)(m, [], { env: g })), !0;
    }
  };
  return AppImageUpdater.AppImageUpdater = a, AppImageUpdater;
}
var DebUpdater = {}, LinuxUpdater = {}, hasRequiredLinuxUpdater;
function requireLinuxUpdater() {
  if (hasRequiredLinuxUpdater) return LinuxUpdater;
  hasRequiredLinuxUpdater = 1, Object.defineProperty(LinuxUpdater, "__esModule", { value: !0 }), LinuxUpdater.LinuxUpdater = void 0;
  const e = requireBaseUpdater();
  let d = class extends e.BaseUpdater {
    constructor(o, c) {
      super(o, c);
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
      var o, c;
      return (c = (o = super.installerPath) === null || o === void 0 ? void 0 : o.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && c !== void 0 ? c : null;
    }
    runCommandWithSudoIfNeeded(o) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(o[0], o.slice(1));
      const { name: c } = this.app, u = `"${c} would like to update"`, i = this.sudoWithArgs(u);
      this._logger.info(`Running as non-root user, using sudo to install: ${i}`);
      let f = '"';
      return (/pkexec/i.test(i[0]) || i[0] === "sudo") && (f = ""), this.spawnSyncLog(i[0], [...i.length > 1 ? i.slice(1) : [], `${f}/bin/bash`, "-c", `'${o.join(" ")}'${f}`]);
    }
    sudoWithArgs(o) {
      const c = this.determineSudoCommand(), u = [c];
      return /kdesudo/i.test(c) ? (u.push("--comment", o), u.push("-c")) : /gksudo/i.test(c) ? u.push("--message", o) : /pkexec/i.test(c) && u.push("--disable-internal-agent"), u;
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
      for (const c of o)
        if (this.hasCommand(c))
          return c;
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
      var c;
      const u = (c = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || c === void 0 ? void 0 : c.trim();
      if (u)
        return u;
      for (const i of o)
        if (this.hasCommand(i))
          return i;
      return this._logger.warn(`No package manager found in the list: ${o.join(", ")}. Defaulting to the first one: ${o[0]}`), o[0];
    }
  };
  return LinuxUpdater.LinuxUpdater = d, LinuxUpdater;
}
var hasRequiredDebUpdater;
function requireDebUpdater() {
  if (hasRequiredDebUpdater) return DebUpdater;
  hasRequiredDebUpdater = 1, Object.defineProperty(DebUpdater, "__esModule", { value: !0 }), DebUpdater.DebUpdater = void 0;
  const e = requireProvider(), d = requireTypes(), p = requireLinuxUpdater();
  let o = class Cr extends p.LinuxUpdater {
    constructor(u, i) {
      super(u, i);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const i = u.updateInfoAndProvider.provider, f = (0, e.findFile)(i.resolveFiles(u.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: f,
        downloadUpdateOptions: u,
        task: async (r, a) => {
          this.listenerCount(d.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (t) => this.emit(d.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(f.url, r, a);
        }
      });
    }
    doInstall(u) {
      const i = this.installerPath;
      if (i == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const f = ["dpkg", "apt"], r = this.detectPackageManager(f);
      try {
        Cr.installWithCommandRunner(r, i, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (a) {
        return this.dispatchError(a), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, i, f, r) {
      var a;
      if (u === "dpkg")
        try {
          f(["dpkg", "-i", i]);
        } catch (t) {
          r.warn((a = t.message) !== null && a !== void 0 ? a : t), r.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), f(["apt-get", "install", "-f", "-y"]);
        }
      else if (u === "apt")
        r.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), f([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          i
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
  const e = requireTypes(), d = requireProvider(), p = requireLinuxUpdater();
  let o = class br extends p.LinuxUpdater {
    constructor(u, i) {
      super(u, i);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const i = u.updateInfoAndProvider.provider, f = (0, d.findFile)(i.resolveFiles(u.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: f,
        downloadUpdateOptions: u,
        task: async (r, a) => {
          this.listenerCount(e.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (t) => this.emit(e.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(f.url, r, a);
        }
      });
    }
    doInstall(u) {
      const i = this.installerPath;
      if (i == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        br.installWithCommandRunner(i, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (f) {
        return this.dispatchError(f), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, i, f) {
      var r;
      try {
        i(["pacman", "-U", "--noconfirm", u]);
      } catch (a) {
        f.warn((r = a.message) !== null && r !== void 0 ? r : a), f.warn("pacman installation failed, attempting to update package database and retry");
        try {
          i(["pacman", "-Sy", "--noconfirm"]), i(["pacman", "-U", "--noconfirm", u]);
        } catch (t) {
          throw f.error("Retry after pacman -Sy failed"), t;
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
  const e = requireTypes(), d = requireProvider(), p = requireLinuxUpdater();
  let o = class Tr extends p.LinuxUpdater {
    constructor(u, i) {
      super(u, i);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const i = u.updateInfoAndProvider.provider, f = (0, d.findFile)(i.resolveFiles(u.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: f,
        downloadUpdateOptions: u,
        task: async (r, a) => {
          this.listenerCount(e.DOWNLOAD_PROGRESS) > 0 && (a.onProgress = (t) => this.emit(e.DOWNLOAD_PROGRESS, t)), await this.httpExecutor.download(f.url, r, a);
        }
      });
    }
    doInstall(u) {
      const i = this.installerPath;
      if (i == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const f = ["zypper", "dnf", "yum", "rpm"], r = this.detectPackageManager(f);
      try {
        Tr.installWithCommandRunner(r, i, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (a) {
        return this.dispatchError(a), !1;
      }
      return u.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(u, i, f, r) {
      if (u === "zypper")
        return f(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", i]);
      if (u === "dnf")
        return f(["dnf", "install", "--nogpgcheck", "-y", i]);
      if (u === "yum")
        return f(["yum", "install", "--nogpgcheck", "-y", i]);
      if (u === "rpm")
        return r.warn("Installing with rpm only (no dependency resolution)."), f(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", i]);
      throw new Error(`Package manager ${u} not supported`);
    }
  };
  return RpmUpdater.RpmUpdater = o, RpmUpdater;
}
var MacUpdater = {}, hasRequiredMacUpdater;
function requireMacUpdater() {
  if (hasRequiredMacUpdater) return MacUpdater;
  hasRequiredMacUpdater = 1, Object.defineProperty(MacUpdater, "__esModule", { value: !0 }), MacUpdater.MacUpdater = void 0;
  const e = requireOut(), d = /* @__PURE__ */ requireLib(), p = require$$1, o = require$$1$1, c = require$$4$1, u = requireAppUpdater(), i = requireProvider(), f = require$$1$4, r = require$$0$3;
  let a = class extends u.AppUpdater {
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
        this.debug("Checking for macOS Rosetta environment"), E = (0, f.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${E})`);
      } catch (b) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${b}`);
      }
      let g = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const I = (0, f.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
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
      const C = (0, i.findFile)(s, "zip", ["pkg", "dmg"]);
      if (C == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(s)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const P = n.updateInfoAndProvider.provider, $ = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: C,
        downloadUpdateOptions: n,
        task: async (b, I) => {
          const T = o.join(this.downloadedUpdateHelper.cacheDir, $), A = () => (0, d.pathExistsSync)(T) ? !n.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let w = !0;
          A() && (w = await this.differentialDownloadInstaller(C, n, b, P, $)), w && await this.httpExecutor.download(C.url, b, I);
        },
        done: async (b) => {
          if (!n.disableDifferentialDownload)
            try {
              const I = o.join(this.downloadedUpdateHelper.cacheDir, $);
              await (0, d.copyFile)(b.downloadedFile, I);
            } catch (I) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${I.message}`);
            }
          return this.updateDownloaded(C, b);
        }
      });
    }
    async updateDownloaded(n, s) {
      var m;
      const y = s.downloadedFile, E = (m = n.info.size) !== null && m !== void 0 ? m : (await (0, d.stat)(y)).size, g = this._logger, q = `fileToProxy=${n.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${q})`), this.server = (0, c.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${q})`), this.server.on("close", () => {
        g.info(`Proxy server for native Squirrel.Mac is closed (${q})`);
      });
      const C = (P) => {
        const $ = P.address();
        return typeof $ == "string" ? $ : `http://127.0.0.1:${$ == null ? void 0 : $.port}`;
      };
      return await new Promise((P, $) => {
        const b = (0, r.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), I = Buffer.from(`autoupdater:${b}`, "ascii"), T = `/${(0, r.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (A, w) => {
          const z = A.url;
          if (g.info(`${z} requested`), z === "/") {
            if (!A.headers.authorization || A.headers.authorization.indexOf("Basic ") === -1) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), g.warn("No authenthication info");
              return;
            }
            const X = A.headers.authorization.split(" ")[1], N = Buffer.from(X, "base64").toString("ascii"), [U, ne] = N.split(":");
            if (U !== "autoupdater" || ne !== b) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), g.warn("Invalid authenthication credentials");
              return;
            }
            const L = Buffer.from(`{ "url": "${C(this.server)}${T}" }`);
            w.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), w.end(L);
            return;
          }
          if (!z.startsWith(T)) {
            g.warn(`${z} requested, but not supported`), w.writeHead(404), w.end();
            return;
          }
          g.info(`${T} requested by Squirrel.Mac, pipe ${y}`);
          let J = !1;
          w.on("finish", () => {
            J || (this.nativeUpdater.removeListener("error", $), P([]));
          });
          const H = (0, p.createReadStream)(y);
          H.on("error", (X) => {
            try {
              w.end();
            } catch (N) {
              g.warn(`cannot end response: ${N}`);
            }
            J = !0, this.nativeUpdater.removeListener("error", $), $(new Error(`Cannot pipe "${y}": ${X}`));
          }), w.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": E
          }), H.pipe(w);
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
  return MacUpdater.MacUpdater = a, MacUpdater;
}
var NsisUpdater = {}, windowsExecutableCodeSignatureVerifier = {}, hasRequiredWindowsExecutableCodeSignatureVerifier;
function requireWindowsExecutableCodeSignatureVerifier() {
  if (hasRequiredWindowsExecutableCodeSignatureVerifier) return windowsExecutableCodeSignatureVerifier;
  hasRequiredWindowsExecutableCodeSignatureVerifier = 1, Object.defineProperty(windowsExecutableCodeSignatureVerifier, "__esModule", { value: !0 }), windowsExecutableCodeSignatureVerifier.verifySignature = u;
  const e = requireOut(), d = require$$1$4, p = require$$2, o = require$$1$1;
  function c(a, t) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", a], {
      shell: !0,
      timeout: t
    }];
  }
  function u(a, t, n) {
    return new Promise((s, m) => {
      const y = t.replace(/'/g, "''");
      n.info(`Verifying signature ${y}`), (0, d.execFile)(...c(`"Get-AuthenticodeSignature -LiteralPath '${y}' | ConvertTo-Json -Compress"`, 20 * 1e3), (E, g, q) => {
        var C;
        try {
          if (E != null || q) {
            f(n, E, q, m), s(null);
            return;
          }
          const P = i(g);
          if (P.Status === 0) {
            try {
              const T = o.normalize(P.Path), A = o.normalize(t);
              if (n.info(`LiteralPath: ${T}. Update Path: ${A}`), T !== A) {
                f(n, new Error(`LiteralPath of ${T} is different than ${A}`), q, m), s(null);
                return;
              }
            } catch (T) {
              n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(C = T.message) !== null && C !== void 0 ? C : T.stack}`);
            }
            const b = (0, e.parseDn)(P.SignerCertificate.Subject);
            let I = !1;
            for (const T of a) {
              const A = (0, e.parseDn)(T);
              if (A.size ? I = Array.from(A.keys()).every((z) => A.get(z) === b.get(z)) : T === b.get("CN") && (n.warn(`Signature validated using only CN ${T}. Please add your full Distinguished Name (DN) to publisherNames configuration`), I = !0), I) {
                s(null);
                return;
              }
            }
          }
          const $ = `publisherNames: ${a.join(" | ")}, raw info: ` + JSON.stringify(P, (b, I) => b === "RawData" ? void 0 : I, 2);
          n.warn(`Sign verification failed, installer signed with incorrect certificate: ${$}`), s($);
        } catch (P) {
          f(n, P, null, m), s(null);
          return;
        }
      });
    });
  }
  function i(a) {
    const t = JSON.parse(a);
    delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
    const n = t.SignerCertificate;
    return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
  }
  function f(a, t, n, s) {
    if (r()) {
      a.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, d.execFileSync)(...c("ConvertTo-Json test", 10 * 1e3));
    } catch (m) {
      a.warn(`Cannot execute ConvertTo-Json: ${m.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    t != null && s(t), n && s(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
  }
  function r() {
    const a = p.release();
    return a.startsWith("6.") && !a.startsWith("6.3");
  }
  return windowsExecutableCodeSignatureVerifier;
}
var hasRequiredNsisUpdater;
function requireNsisUpdater() {
  if (hasRequiredNsisUpdater) return NsisUpdater;
  hasRequiredNsisUpdater = 1, Object.defineProperty(NsisUpdater, "__esModule", { value: !0 }), NsisUpdater.NsisUpdater = void 0;
  const e = requireOut(), d = require$$1$1, p = requireBaseUpdater(), o = requireFileWithEmbeddedBlockMapDifferentialDownloader(), c = requireTypes(), u = requireProvider(), i = /* @__PURE__ */ requireLib(), f = requireWindowsExecutableCodeSignatureVerifier(), r = require$$2$1;
  let a = class extends p.BaseUpdater {
    constructor(n, s) {
      super(n, s), this._verifyUpdateCodeSignature = (m, y) => (0, f.verifySignature)(m, y, this._logger);
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
                await (0, i.unlink)(g);
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
        this.spawnLog(d.join(process.resourcesPath, "elevate.exe"), [s].concat(m)).catch((g) => this.dispatchError(g));
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
          oldFile: d.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: n.cancellationToken
        };
        this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (E.onProgress = (g) => this.emit(c.DOWNLOAD_PROGRESS, g)), await new o.FileWithEmbeddedBlockMapDifferentialDownloader(s, this.httpExecutor, E).download();
      } catch (E) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${E.stack || E}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return NsisUpdater.NsisUpdater = a, NsisUpdater;
}
var hasRequiredMain;
function requireMain() {
  return hasRequiredMain || (hasRequiredMain = 1, (function(e) {
    var d = main$1 && main$1.__createBinding || (Object.create ? (function(g, q, C, P) {
      P === void 0 && (P = C);
      var $ = Object.getOwnPropertyDescriptor(q, C);
      (!$ || ("get" in $ ? !q.__esModule : $.writable || $.configurable)) && ($ = { enumerable: !0, get: function() {
        return q[C];
      } }), Object.defineProperty(g, P, $);
    }) : (function(g, q, C, P) {
      P === void 0 && (P = C), g[P] = q[C];
    })), p = main$1 && main$1.__exportStar || function(g, q) {
      for (var C in g) C !== "default" && !Object.prototype.hasOwnProperty.call(q, C) && d(q, g, C);
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const o = /* @__PURE__ */ requireLib(), c = require$$1$1;
    var u = requireBaseUpdater();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return u.BaseUpdater;
    } });
    var i = requireAppUpdater();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return i.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return i.NoOpLogger;
    } });
    var f = requireProvider();
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return f.Provider;
    } });
    var r = requireAppImageUpdater();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return r.AppImageUpdater;
    } });
    var a = requireDebUpdater();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return a.DebUpdater;
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
          const g = c.join(process.resourcesPath, "package-type");
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
console.log("App starting...");
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL, MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron"), RENDERER_DIST = path.join(process.env.APP_ROOT, "dist_renderer");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
console.log("VITE_DEV_SERVER_URL:", VITE_DEV_SERVER_URL);
console.log("RENDERER_DIST:", RENDERER_DIST);
let splash, win;
function createSplashWindow() {
  if (splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: !0,
    frame: !1,
    alwaysOnTop: !0,
    icon: path.join(process.env.VITE_PUBLIC || "", "icon.png")
  }), VITE_DEV_SERVER_URL)
    splash.loadURL(`${VITE_DEV_SERVER_URL}/splash.html`);
  else {
    const e = path.join(RENDERER_DIST, "splash.html");
    splash.loadFile(e).catch(() => {
      splash == null || splash.loadURL('data:text/html;charset=utf-8,<html><body style="background:#0F172A;color:white;display:flex;justify-content:center;align-items:center;"><h1>Quick Runbooks</h1></body></html>');
    });
  }
  splash.center();
}
function createMainWindow() {
  if (win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#0F172A",
    show: !1,
    // Hide initially
    icon: path.join(process.env.VITE_PUBLIC || "", "icon.png"),
    // Use new icon
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !1
    }
  }), win.webContents.on("did-finish-load", () => {
    win == null || win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), VITE_DEV_SERVER_URL)
    console.log(`Loading URL: ${VITE_DEV_SERVER_URL}`), win.loadURL(VITE_DEV_SERVER_URL).catch((e) => console.error("Failed to load URL", e));
  else {
    const e = path.join(RENDERER_DIST, "index.html");
    console.log(`Loading File: ${e}`), win.loadFile(e).catch((d) => console.error("Failed to load file", d));
  }
  win.once("ready-to-show", () => {
    setTimeout(() => {
      splash == null || splash.destroy(), win == null || win.show();
    }, 2500);
  });
}
app.on("window-all-closed", () => {
  process.platform !== "darwin" && app.quit();
});
app.on("activate", () => {
  BrowserWindow.getAllWindows().length === 0 && createMainWindow();
});
app.whenReady().then(() => {
  createSplashWindow(), createMainWindow();
});
const CONFIG_FILE = path.join(app.getPath("userData"), "config.json"), DEFAULT_DOCS_DIR = path.join(app.getPath("documents"), "QuickRunbooks");
function getConfig() {
  try {
    if (fs$1.existsSync(CONFIG_FILE)) {
      const e = fs$1.readFileSync(CONFIG_FILE, "utf-8"), d = JSON.parse(e);
      return d.runbooksPath && !d.sources && (d.sources = [d.runbooksPath], delete d.runbooksPath, saveConfig(d)), d.sources || (d.sources = [DEFAULT_DOCS_DIR]), d;
    }
  } catch (e) {
    console.error("Failed to read config", e);
  }
  return { sources: [DEFAULT_DOCS_DIR] };
}
function saveConfig(e) {
  try {
    fs$1.writeFileSync(CONFIG_FILE, JSON.stringify(e, null, 2), "utf-8");
  } catch (d) {
    console.error("Failed to write config", d);
  }
}
function ensureSourcesExist(e) {
  e.forEach((d) => {
    if (!fs$1.existsSync(d))
      try {
        fs$1.mkdirSync(d, { recursive: !0 });
      } catch (p) {
        console.error("Could not create directory", d, p);
      }
  });
}
function parseRunbookFile(e) {
  try {
    const d = path.extname(e).toLowerCase(), p = fs$1.readFileSync(e, "utf-8");
    let o = {};
    if (d === ".json")
      o = JSON.parse(p), o.format = "json";
    else if (d === ".md") {
      const c = matter(p);
      o = c.data, o.format = "md", o.steps || (o.steps = parseMarkdownSteps(c.content));
    }
    return !o.id || (o.sourcePath = path.dirname(e), o.id || (o.id = path.basename(e, d)), o.title || (o.title = o.id || "Untitled Runbook"), Array.isArray(o.tags) || (o.tags = []), o.type !== "qrun") ? null : (o.service || (o.service = "IAAS"), o.category || (o.category = "Alert"), Array.isArray(o.steps) || (o.steps = []), o);
  } catch (d) {
    console.error(`Error parsing file ${e}`, d);
  }
  return null;
}
function parseMarkdownSteps(e) {
  const d = [], p = e.split(`
`);
  let o = null;
  return p.forEach((c) => {
    if (c.startsWith("## "))
      o && d.push(o), o = { title: c.replace("## ", "").trim(), content: [] };
    else if (o)
      if (c.trim().startsWith("```")) {
        const u = c.trim().replace("```", "");
        if (u)
          o.content.push({ type: "code", language: u, code: "" });
        else {
          const i = o.content[o.content.length - 1];
          i && i.type === "code" || o.content.push({ type: "code", language: "text", code: "" });
        }
      } else {
        const u = o.content[o.content.length - 1];
        u && u.type === "code" ? u.code ? u.code += `
` + c : u.code = c : !u || u.type !== "text" ? o.content.push({ type: "text", text: c }) : u.text += `
` + c;
      }
  }), o && d.push(o), d.forEach((c) => {
    c.content.forEach((u) => {
      u.type === "code" && u.code.endsWith("```") && (u.code = u.code.substring(0, u.code.length - 3).trim()), u.type === "text" && (u.text = u.text.trim());
    });
  }), d;
}
function serializeToMarkdown(e) {
  const { steps: d, sourcePath: p, format: o, ...c } = e, u = { ...c };
  let i = "";
  return d && d.length > 0 && (i = d.map((f) => {
    let r = `## ${f.title}

`;
    return f.content.forEach((a) => {
      a.type === "code" ? r += "```" + (a.language || "") + `
` + a.code + "\n```\n\n" : a.type === "list" ? (a.items.forEach((t) => r += `- ${t}
`), r += `
`) : r += a.text + `

`;
    }), r;
  }).join("")), matter.stringify(i, u);
}
ipcMain.handle("get-sources", () => getConfig().sources);
ipcMain.handle("add-source", async () => {
  if (!win) return { success: !1 };
  const e = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  });
  if (!e.canceled && e.filePaths.length > 0) {
    const d = e.filePaths[0], p = getConfig();
    return p.sources.includes(d) || (p.sources.push(d), saveConfig(p)), { success: !0, sources: p.sources };
  }
  return { success: !1 };
});
ipcMain.handle("remove-source", async (e, d) => {
  const p = getConfig();
  return p.sources = p.sources.filter((o) => o !== d), saveConfig(p), { success: !0, sources: p.sources };
});
ipcMain.handle("get-runbooks", async () => {
  try {
    const d = getConfig().sources;
    ensureSourcesExist(d);
    let p = [];
    return d.forEach((o) => {
      fs$1.existsSync(o) && fs$1.readdirSync(o).forEach((u) => {
        if (u.endsWith(".json") || u.endsWith(".md")) {
          const i = parseRunbookFile(path.join(o, u));
          i && p.push(i);
        }
      });
    }), p;
  } catch (e) {
    return console.error("Error reading runbooks:", e), [];
  }
});
ipcMain.handle("save-runbook", async (e, d) => {
  try {
    const p = getConfig(), o = d.sourcePath || p.sources[0];
    fs$1.existsSync(o) || fs$1.mkdirSync(o, { recursive: !0 });
    let c, u;
    if (d.format === "md")
      c = path.join(o, `${d.id}.md`), u = serializeToMarkdown(d);
    else {
      c = path.join(o, `${d.id}.json`);
      const { sourcePath: i, format: f, ...r } = d;
      u = JSON.stringify(r, null, 2);
    }
    return fs$1.writeFileSync(c, u, "utf-8"), { success: !0 };
  } catch (p) {
    return console.error("Error saving runbook:", p), { success: !1, error: p.message };
  }
});
ipcMain.handle("delete-runbook", async (e, d) => {
  try {
    const p = getConfig();
    let o = "";
    if (d.sourcePath) {
      const c = d.format === "md" ? ".md" : ".json";
      o = path.join(d.sourcePath, `${d.id}${c}`);
    } else {
      const c = p.sources;
      for (const u of c) {
        const i = path.join(u, `${d.id}.json`), f = path.join(u, `${d.id}.md`);
        if (fs$1.existsSync(i)) {
          o = i;
          break;
        }
        if (fs$1.existsSync(f)) {
          o = f;
          break;
        }
      }
    }
    return o && fs$1.existsSync(o) ? (fs$1.unlinkSync(o), { success: !0 }) : { success: !1, error: "File not found" };
  } catch (p) {
    return console.error("Error deleting runbook:", p), { success: !1, error: p.message };
  }
});
ipcMain.handle("clone-repository", async (e, d, p = {}) => {
  try {
    if (!d) return { success: !1, error: "URL is required" };
    if (!/^https?:\/\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+(\.git)?$/.test(d))
      return { success: !1, error: "Invalid Repository URL. Access denied." };
    const { interactive: o } = p, c = d.split("/");
    let u = c[c.length - 1];
    u.endsWith(".git") && (u = u.slice(0, -4)), u = u.replace(/[^a-zA-Z0-9-_]/g, ""), u || (u = `repo-${Date.now()}`);
    const i = path.join(app.getPath("documents"), "QuickRunbooks", "Repos");
    fs$1.existsSync(i) || fs$1.mkdirSync(i, { recursive: !0 });
    const f = path.join(i, u);
    return fs$1.existsSync(f) ? { success: !1, error: `Directory ${u} already exists.` } : new Promise((r) => {
      console.log(`Cloning ${d} into ${f} (Interactive: ${o})`);
      let a = `git clone --depth 1 "${d}" "${f}"`, t = {
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        timeout: 3e4
      };
      o && (a = `start /wait cmd /c "git clone --depth 1 ${d} ${f} & if errorlevel 1 pause"`, t = {
        env: process.env,
        // Allow all envs
        timeout: 0
        // No timeout (user might verify 2FA)
      }), exec(a, t, (n, s, m) => {
        let y = !1;
        if (o)
          fs$1.existsSync(f) && fs$1.readdirSync(f).length > 0 && (y = !0);
        else if (!n)
          y = !0;
        else {
          const E = m || n.message;
          console.error("Clone error:", E), r({ success: !1, error: E.includes("Authentication failed") ? "AUTH_FAILED" : E });
          return;
        }
        if (y) {
          const E = path.join(f, "qrun");
          if (!fs$1.existsSync(E)) {
            try {
              fs$1.rmSync(f, { recursive: !0, force: !0 });
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
  if (console.log("Manual check for updates triggered"), process.env.VITE_DEV_SERVER_URL) {
    console.log("Skipping update check in dev mode");
    return;
  }
  mainExports.autoUpdater.checkForUpdates();
});
ipcMain.handle("start-auto-download", () => {
  console.log("User requested Auto-Update. Starting download..."), mainExports.autoUpdater.downloadUpdate();
});
ipcMain.handle("start-manual-download", (e, d) => {
  if (!d || !d.startsWith("https://")) {
    console.warn("Blocked unsafe manual download URL:", d);
    return;
  }
  console.log("User requested Manual Update. Opening URL:", d), shell.openExternal(d);
});
ipcMain.handle("quit-and-install", () => {
  mainExports.autoUpdater.quitAndInstall();
});
mainExports.autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update...");
});
mainExports.autoUpdater.on("update-available", (e) => {
  console.log("Update available:", e), win == null || win.webContents.send("update-available", e);
});
mainExports.autoUpdater.on("update-not-available", (e) => {
  console.log("Update not available:", e), win == null || win.webContents.send("update-not-available", e);
});
mainExports.autoUpdater.on("error", (e) => {
  console.error("Update error:", e), win == null || win.webContents.send("update-error", e.toString());
});
mainExports.autoUpdater.on("download-progress", (e) => {
  console.log("Download progress:", e.percent);
});
mainExports.autoUpdater.on("update-downloaded", (e) => {
  console.log("Update downloaded:", e), win == null || win.webContents.send("update-downloaded", e);
});
const TEMPLATE_MD = `---
title: New Runbook
id: new-runbook
service: IAAS
category: Compute
tags: [tag1, tag2]
shortDescription: A short description.
fullDescription: A full description.
type: qrun
---

## Step 1

Content here.
`, TEMPLATE_JSON = `{
  "id": "new-runbook",
  "title": "New Runbook",
  "service": "IAAS",
  "category": "Compute",
  "tags": ["tag1", "tag2"],
  "shortDescription": "A short description.",
  "fullDescription": "A full description.",
  "type": "qrun",
  "steps": [
     {
       "title": "Step 1",
       "content": [
         { "type": "text", "text": "Content here" }
       ]
     }
  ]
}`;
ipcMain.handle("download-template", async (e, d) => {
  if (!win) return { success: !1, error: "No window" };
  try {
    const p = d === "md" ? "template.md" : "template.json", o = d === "md" ? TEMPLATE_MD : TEMPLATE_JSON, { filePath: c } = await dialog.showSaveDialog(win, {
      title: "Download Template",
      defaultPath: p,
      filters: [
        { name: d === "md" ? "Markdown" : "JSON", extensions: [d] }
      ]
    });
    return c ? (fs$1.writeFileSync(c, o, "utf-8"), { success: !0 }) : { success: !1, error: "Cancelled" };
  } catch (p) {
    return { success: !1, error: p.message };
  }
});
ipcMain.handle("refresh-sources", async () => {
  try {
    const d = getConfig().sources || [], p = [];
    for (const o of d)
      if (fs$1.existsSync(path.join(o, ".git")))
        try {
          await new Promise((c, u) => {
            exec("git pull", { cwd: o }, (i, f, r) => {
              if (i) {
                p.push({ source: o, success: !1, error: r || i.message }), u(i);
                return;
              }
              p.push({ source: o, success: !0, output: f }), c();
            });
          }).catch(() => {
          });
        } catch {
        }
    return { success: !0, results: p };
  } catch (e) {
    return { success: !1, error: e.message };
  }
});
ipcMain.handle("get-app-version", () => app.getVersion());
ipcMain.handle("import-file", async () => {
  if (!win) return { success: !1, error: "No window" };
  try {
    const { filePaths: e } = await dialog.showOpenDialog(win, {
      filters: [{ name: "Runbooks", extensions: ["json", "md"] }],
      properties: ["openFile"]
    });
    if (e && e.length > 0) {
      const d = e[0];
      if (!parseRunbookFile(d))
        return { success: !1, error: "Invalid Runbook file. File must contain 'type: qrun' and valid structure." };
      const c = getConfig().sources[0];
      fs$1.existsSync(c) || fs$1.mkdirSync(c, { recursive: !0 });
      const u = path.basename(d), i = path.join(c, u);
      return fs$1.copyFileSync(d, i), { success: !0 };
    }
    return { success: !1, error: "Canceled" };
  } catch (e) {
    return { success: !1, error: e.message };
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
