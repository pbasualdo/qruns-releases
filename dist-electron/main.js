import require$$1$3, { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs$1 from "node:fs";
import { exec } from "node:child_process";
import require$$1 from "path";
import require$$0$1 from "child_process";
import require$$1$1 from "os";
import require$$0 from "fs";
import require$$0$2 from "util";
import require$$0$3 from "events";
import require$$0$4 from "http";
import require$$1$2 from "https";
import require$$0$5 from "constants";
import require$$0$6 from "stream";
import require$$5 from "assert";
import require$$0$7 from "crypto";
import require$$1$4 from "tty";
import require$$2 from "url";
import require$$14 from "zlib";
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var src$1 = { exports: {} }, electronLogPreload = { exports: {} }, hasRequiredElectronLogPreload;
function requireElectronLogPreload() {
  return hasRequiredElectronLogPreload || (hasRequiredElectronLogPreload = 1, (function(i) {
    let f = {};
    try {
      f = require("electron");
    } catch {
    }
    f.ipcRenderer && d(f), i.exports = d;
    function d({ contextBridge: s, ipcRenderer: t }) {
      if (!t)
        return;
      t.on("__ELECTRON_LOG_IPC__", (e, u) => {
        window.postMessage({ cmd: "message", ...u });
      }), t.invoke("__ELECTRON_LOG__", { cmd: "getOptions" }).catch((e) => console.error(new Error(
        `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`
      )));
      const n = {
        sendToMain(e) {
          try {
            t.send("__ELECTRON_LOG__", e);
          } catch (u) {
            console.error("electronLog.sendToMain ", u, "data:", e), t.send("__ELECTRON_LOG__", {
              cmd: "errorHandler",
              error: { message: u?.message, stack: u?.stack },
              errorName: "sendToMain"
            });
          }
        },
        log(...e) {
          n.sendToMain({ data: e, level: "info" });
        }
      };
      for (const e of ["error", "warn", "info", "verbose", "debug", "silly"])
        n[e] = (...u) => n.sendToMain({
          data: u,
          level: e
        });
      if (s && process.contextIsolated)
        try {
          s.exposeInMainWorld("__electronLog", n);
        } catch {
        }
      typeof window == "object" ? window.__electronLog = n : __electronLog = n;
    }
  })(electronLogPreload)), electronLogPreload.exports;
}
var renderer = { exports: {} }, scope, hasRequiredScope;
function requireScope() {
  if (hasRequiredScope) return scope;
  hasRequiredScope = 1, scope = i;
  function i(f) {
    return Object.defineProperties(d, {
      defaultLabel: { value: "", writable: !0 },
      labelPadding: { value: !0, writable: !0 },
      maxLabelLength: { value: 0, writable: !0 },
      labelLength: {
        get() {
          switch (typeof d.labelPadding) {
            case "boolean":
              return d.labelPadding ? d.maxLabelLength : 0;
            case "number":
              return d.labelPadding;
            default:
              return 0;
          }
        }
      }
    });
    function d(s) {
      d.maxLabelLength = Math.max(d.maxLabelLength, s.length);
      const t = {};
      for (const n of f.levels)
        t[n] = (...e) => f.logData(e, { level: n, scope: s });
      return t.log = t.info, t;
    }
  }
  return scope;
}
var Buffering_1, hasRequiredBuffering;
function requireBuffering() {
  if (hasRequiredBuffering) return Buffering_1;
  hasRequiredBuffering = 1;
  class i {
    constructor({ processMessage: d }) {
      this.processMessage = d, this.buffer = [], this.enabled = !1, this.begin = this.begin.bind(this), this.commit = this.commit.bind(this), this.reject = this.reject.bind(this);
    }
    addMessage(d) {
      this.buffer.push(d);
    }
    begin() {
      this.enabled = [];
    }
    commit() {
      this.enabled = !1, this.buffer.forEach((d) => this.processMessage(d)), this.buffer = [];
    }
    reject() {
      this.enabled = !1, this.buffer = [];
    }
  }
  return Buffering_1 = i, Buffering_1;
}
var Logger_1, hasRequiredLogger;
function requireLogger() {
  if (hasRequiredLogger) return Logger_1;
  hasRequiredLogger = 1;
  const i = requireScope(), f = requireBuffering();
  class d {
    static instances = {};
    dependencies = {};
    errorHandler = null;
    eventLogger = null;
    functions = {};
    hooks = [];
    isDev = !1;
    levels = null;
    logId = null;
    scope = null;
    transports = {};
    variables = {};
    constructor({
      allowUnknownLevel: t = !1,
      dependencies: n = {},
      errorHandler: e,
      eventLogger: u,
      initializeFn: r,
      isDev: o = !1,
      levels: a = ["error", "warn", "info", "verbose", "debug", "silly"],
      logId: l,
      transportFactories: c = {},
      variables: m
    } = {}) {
      this.addLevel = this.addLevel.bind(this), this.create = this.create.bind(this), this.initialize = this.initialize.bind(this), this.logData = this.logData.bind(this), this.processMessage = this.processMessage.bind(this), this.allowUnknownLevel = t, this.buffering = new f(this), this.dependencies = n, this.initializeFn = r, this.isDev = o, this.levels = a, this.logId = l, this.scope = i(this), this.transportFactories = c, this.variables = m || {};
      for (const y of this.levels)
        this.addLevel(y, !1);
      this.log = this.info, this.functions.log = this.log, this.errorHandler = e, e?.setOptions({ ...n, logFn: this.error }), this.eventLogger = u, u?.setOptions({ ...n, logger: this });
      for (const [y, v] of Object.entries(c))
        this.transports[y] = v(this, n);
      d.instances[l] = this;
    }
    static getInstance({ logId: t }) {
      return this.instances[t] || this.instances.default;
    }
    addLevel(t, n = this.levels.length) {
      n !== !1 && this.levels.splice(n, 0, t), this[t] = (...e) => this.logData(e, { level: t }), this.functions[t] = this[t];
    }
    catchErrors(t) {
      return this.processMessage(
        {
          data: ["log.catchErrors is deprecated. Use log.errorHandler instead"],
          level: "warn"
        },
        { transports: ["console"] }
      ), this.errorHandler.startCatching(t);
    }
    create(t) {
      return typeof t == "string" && (t = { logId: t }), new d({
        dependencies: this.dependencies,
        errorHandler: this.errorHandler,
        initializeFn: this.initializeFn,
        isDev: this.isDev,
        transportFactories: this.transportFactories,
        variables: { ...this.variables },
        ...t
      });
    }
    compareLevels(t, n, e = this.levels) {
      const u = e.indexOf(t), r = e.indexOf(n);
      return r === -1 || u === -1 ? !0 : r <= u;
    }
    initialize(t = {}) {
      this.initializeFn({ logger: this, ...this.dependencies, ...t });
    }
    logData(t, n = {}) {
      this.buffering.enabled ? this.buffering.addMessage({ data: t, date: /* @__PURE__ */ new Date(), ...n }) : this.processMessage({ data: t, ...n });
    }
    processMessage(t, { transports: n = this.transports } = {}) {
      if (t.cmd === "errorHandler") {
        this.errorHandler.handle(t.error, {
          errorName: t.errorName,
          processType: "renderer",
          showDialog: !!t.showDialog
        });
        return;
      }
      let e = t.level;
      this.allowUnknownLevel || (e = this.levels.includes(t.level) ? t.level : "info");
      const u = {
        date: /* @__PURE__ */ new Date(),
        logId: this.logId,
        ...t,
        level: e,
        variables: {
          ...this.variables,
          ...t.variables
        }
      };
      for (const [r, o] of this.transportEntries(n))
        if (!(typeof o != "function" || o.level === !1) && this.compareLevels(o.level, t.level))
          try {
            const a = this.hooks.reduce((l, c) => l && c(l, o, r), u);
            a && o({ ...a, data: [...a.data] });
          } catch (a) {
            this.processInternalErrorFn(a);
          }
    }
    processInternalErrorFn(t) {
    }
    transportEntries(t = this.transports) {
      return (Array.isArray(t) ? t : Object.entries(t)).map((e) => {
        switch (typeof e) {
          case "string":
            return this.transports[e] ? [e, this.transports[e]] : null;
          case "function":
            return [e.name, e];
          default:
            return Array.isArray(e) ? e : null;
        }
      }).filter(Boolean);
    }
  }
  return Logger_1 = d, Logger_1;
}
var RendererErrorHandler_1, hasRequiredRendererErrorHandler;
function requireRendererErrorHandler() {
  if (hasRequiredRendererErrorHandler) return RendererErrorHandler_1;
  hasRequiredRendererErrorHandler = 1;
  const i = console.error;
  class f {
    logFn = null;
    onError = null;
    showDialog = !1;
    preventDefault = !0;
    constructor({ logFn: s = null } = {}) {
      this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.startCatching = this.startCatching.bind(this), this.logFn = s;
    }
    handle(s, {
      logFn: t = this.logFn,
      errorName: n = "",
      onError: e = this.onError,
      showDialog: u = this.showDialog
    } = {}) {
      try {
        e?.({ error: s, errorName: n, processType: "renderer" }) !== !1 && t({ error: s, errorName: n, showDialog: u });
      } catch {
        i(s);
      }
    }
    setOptions({ logFn: s, onError: t, preventDefault: n, showDialog: e }) {
      typeof s == "function" && (this.logFn = s), typeof t == "function" && (this.onError = t), typeof n == "boolean" && (this.preventDefault = n), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: s, showDialog: t } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: s, showDialog: t }), window.addEventListener("error", (n) => {
        this.preventDefault && n.preventDefault?.(), this.handleError(n.error || n);
      }), window.addEventListener("unhandledrejection", (n) => {
        this.preventDefault && n.preventDefault?.(), this.handleRejection(n.reason || n);
      }));
    }
    handleError(s) {
      this.handle(s, { errorName: "Unhandled" });
    }
    handleRejection(s) {
      const t = s instanceof Error ? s : new Error(JSON.stringify(s));
      this.handle(t, { errorName: "Unhandled rejection" });
    }
  }
  return RendererErrorHandler_1 = f, RendererErrorHandler_1;
}
var transform_1, hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform_1;
  hasRequiredTransform = 1, transform_1 = { transform: i };
  function i({
    logger: f,
    message: d,
    transport: s,
    initialData: t = d?.data || [],
    transforms: n = s?.transforms
  }) {
    return n.reduce((e, u) => typeof u == "function" ? u({ data: e, logger: f, message: d, transport: s }) : e, t);
  }
  return transform_1;
}
var console_1$1, hasRequiredConsole$1;
function requireConsole$1() {
  if (hasRequiredConsole$1) return console_1$1;
  hasRequiredConsole$1 = 1;
  const { transform: i } = requireTransform();
  console_1$1 = d;
  const f = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  function d(t) {
    return Object.assign(n, {
      format: "{h}:{i}:{s}.{ms}{scope} › {text}",
      transforms: [s],
      writeFn({ message: { level: e, data: u } }) {
        const r = f[e] || f.info;
        setTimeout(() => r(...u));
      }
    });
    function n(e) {
      n.writeFn({
        message: { ...e, data: i({ logger: t, message: e, transport: n }) }
      });
    }
  }
  function s({
    data: t = [],
    logger: n = {},
    message: e = {},
    transport: u = {}
  }) {
    if (typeof u.format == "function")
      return u.format({
        data: t,
        level: e?.level || "info",
        logger: n,
        message: e,
        transport: u
      });
    if (typeof u.format != "string")
      return t;
    t.unshift(u.format), typeof t[1] == "string" && t[1].match(/%[1cdfiOos]/) && (t = [`${t[0]}${t[1]}`, ...t.slice(2)]);
    const r = e.date || /* @__PURE__ */ new Date();
    return t[0] = t[0].replace(/\{(\w+)}/g, (o, a) => {
      switch (a) {
        case "level":
          return e.level;
        case "logId":
          return e.logId;
        case "scope": {
          const l = e.scope || n.scope?.defaultLabel;
          return l ? ` (${l})` : "";
        }
        case "text":
          return "";
        case "y":
          return r.getFullYear().toString(10);
        case "m":
          return (r.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return r.getDate().toString(10).padStart(2, "0");
        case "h":
          return r.getHours().toString(10).padStart(2, "0");
        case "i":
          return r.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return r.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return r.getMilliseconds().toString(10).padStart(3, "0");
        case "iso":
          return r.toISOString();
        default:
          return e.variables?.[a] || o;
      }
    }).trim(), t;
  }
  return console_1$1;
}
var ipc$1, hasRequiredIpc$1;
function requireIpc$1() {
  if (hasRequiredIpc$1) return ipc$1;
  hasRequiredIpc$1 = 1;
  const { transform: i } = requireTransform();
  ipc$1 = d;
  const f = /* @__PURE__ */ new Set([Promise, WeakMap, WeakSet]);
  function d(n) {
    return Object.assign(e, {
      depth: 5,
      transforms: [t]
    });
    function e(u) {
      if (!window.__electronLog) {
        n.processMessage(
          {
            data: ["electron-log: logger isn't initialized in the main process"],
            level: "error"
          },
          { transports: ["console"] }
        );
        return;
      }
      try {
        const r = i({
          initialData: u,
          logger: n,
          message: u,
          transport: e
        });
        __electronLog.sendToMain(r);
      } catch (r) {
        n.transports.console({
          data: ["electronLog.transports.ipc", r, "data:", u.data],
          level: "error"
        });
      }
    }
  }
  function s(n) {
    return Object(n) !== n;
  }
  function t({
    data: n,
    depth: e,
    seen: u = /* @__PURE__ */ new WeakSet(),
    transport: r = {}
  } = {}) {
    const o = e || r.depth || 5;
    return u.has(n) ? "[Circular]" : o < 1 ? s(n) ? n : Array.isArray(n) ? "[Array]" : `[${typeof n}]` : ["function", "symbol"].includes(typeof n) ? n.toString() : s(n) ? n : f.has(n.constructor) ? `[${n.constructor.name}]` : Array.isArray(n) ? n.map((a) => t({
      data: a,
      depth: o - 1,
      seen: u
    })) : n instanceof Date ? n.toISOString() : n instanceof Error ? n.stack : n instanceof Map ? new Map(
      Array.from(n).map(([a, l]) => [
        t({ data: a, depth: o - 1, seen: u }),
        t({ data: l, depth: o - 1, seen: u })
      ])
    ) : n instanceof Set ? new Set(
      Array.from(n).map(
        (a) => t({ data: a, depth: o - 1, seen: u })
      )
    ) : (u.add(n), Object.fromEntries(
      Object.entries(n).map(
        ([a, l]) => [
          a,
          t({ data: l, depth: o - 1, seen: u })
        ]
      )
    ));
  }
  return ipc$1;
}
var hasRequiredRenderer;
function requireRenderer() {
  return hasRequiredRenderer || (hasRequiredRenderer = 1, (function(i) {
    const f = requireLogger(), d = requireRendererErrorHandler(), s = requireConsole$1(), t = requireIpc$1();
    typeof process == "object" && process.type === "browser" && console.warn(
      "electron-log/renderer is loaded in the main process. It could cause unexpected behaviour."
    ), i.exports = n(), i.exports.Logger = f, i.exports.default = i.exports;
    function n() {
      const e = new f({
        allowUnknownLevel: !0,
        errorHandler: new d(),
        initializeFn: () => {
        },
        logId: "default",
        transportFactories: {
          console: s,
          ipc: t
        },
        variables: {
          processType: "renderer"
        }
      });
      return e.errorHandler.setOptions({
        logFn({ error: u, errorName: r, showDialog: o }) {
          e.transports.console({
            data: [r, u].filter(Boolean),
            level: "error"
          }), e.transports.ipc({
            cmd: "errorHandler",
            error: {
              cause: u?.cause,
              code: u?.code,
              name: u?.name,
              message: u?.message,
              stack: u?.stack
            },
            errorName: r,
            logId: e.logId,
            showDialog: o
          });
        }
      }), typeof window == "object" && window.addEventListener("message", (u) => {
        const { cmd: r, logId: o, ...a } = u.data || {}, l = f.getInstance({ logId: o });
        r === "message" && l.processMessage(a, { transports: ["console"] });
      }), new Proxy(e, {
        get(u, r) {
          return typeof u[r] < "u" ? u[r] : (...o) => e.logData(o, { level: r });
        }
      });
    }
  })(renderer)), renderer.exports;
}
var packageJson, hasRequiredPackageJson;
function requirePackageJson() {
  if (hasRequiredPackageJson) return packageJson;
  hasRequiredPackageJson = 1;
  const i = require$$0, f = require$$1;
  packageJson = {
    findAndReadPackageJson: d,
    tryReadJsonAt: s
  };
  function d() {
    return s(e()) || s(n()) || s(process.resourcesPath, "app.asar") || s(process.resourcesPath, "app") || s(process.cwd()) || { name: void 0, version: void 0 };
  }
  function s(...u) {
    if (u[0])
      try {
        const r = f.join(...u), o = t("package.json", r);
        if (!o)
          return;
        const a = JSON.parse(i.readFileSync(o, "utf8")), l = a?.productName || a?.name;
        return !l || l.toLowerCase() === "electron" ? void 0 : l ? { name: l, version: a?.version } : void 0;
      } catch {
        return;
      }
  }
  function t(u, r) {
    let o = r;
    for (; ; ) {
      const a = f.parse(o), l = a.root, c = a.dir;
      if (i.existsSync(f.join(o, u)))
        return f.resolve(f.join(o, u));
      if (o === l)
        return null;
      o = c;
    }
  }
  function n() {
    const u = process.argv.filter((o) => o.indexOf("--user-data-dir=") === 0);
    return u.length === 0 || typeof u[0] != "string" ? null : u[0].replace("--user-data-dir=", "");
  }
  function e() {
    try {
      return require.main?.filename;
    } catch {
      return;
    }
  }
  return packageJson;
}
var NodeExternalApi_1, hasRequiredNodeExternalApi;
function requireNodeExternalApi() {
  if (hasRequiredNodeExternalApi) return NodeExternalApi_1;
  hasRequiredNodeExternalApi = 1;
  const i = require$$0$1, f = require$$1$1, d = require$$1, s = requirePackageJson();
  class t {
    appName = void 0;
    appPackageJson = void 0;
    platform = process.platform;
    getAppLogPath(e = this.getAppName()) {
      return this.platform === "darwin" ? d.join(this.getSystemPathHome(), "Library/Logs", e) : d.join(this.getAppUserDataPath(e), "logs");
    }
    getAppName() {
      const e = this.appName || this.getAppPackageJson()?.name;
      if (!e)
        throw new Error(
          "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()"
        );
      return e;
    }
    /**
     * @private
     * @returns {undefined}
     */
    getAppPackageJson() {
      return typeof this.appPackageJson != "object" && (this.appPackageJson = s.findAndReadPackageJson()), this.appPackageJson;
    }
    getAppUserDataPath(e = this.getAppName()) {
      return e ? d.join(this.getSystemPathAppData(), e) : void 0;
    }
    getAppVersion() {
      return this.getAppPackageJson()?.version;
    }
    getElectronLogPath() {
      return this.getAppLogPath();
    }
    getMacOsVersion() {
      const e = Number(f.release().split(".")[0]);
      return e <= 19 ? `10.${e - 4}` : e - 9;
    }
    /**
     * @protected
     * @returns {string}
     */
    getOsVersion() {
      let e = f.type().replace("_", " "), u = f.release();
      return e === "Darwin" && (e = "macOS", u = this.getMacOsVersion()), `${e} ${u}`;
    }
    /**
     * @return {PathVariables}
     */
    getPathVariables() {
      const e = this.getAppName(), u = this.getAppVersion(), r = this;
      return {
        appData: this.getSystemPathAppData(),
        appName: e,
        appVersion: u,
        get electronDefaultDir() {
          return r.getElectronLogPath();
        },
        home: this.getSystemPathHome(),
        libraryDefaultDir: this.getAppLogPath(e),
        libraryTemplate: this.getAppLogPath("{appName}"),
        temp: this.getSystemPathTemp(),
        userData: this.getAppUserDataPath(e)
      };
    }
    getSystemPathAppData() {
      const e = this.getSystemPathHome();
      switch (this.platform) {
        case "darwin":
          return d.join(e, "Library/Application Support");
        case "win32":
          return process.env.APPDATA || d.join(e, "AppData/Roaming");
        default:
          return process.env.XDG_CONFIG_HOME || d.join(e, ".config");
      }
    }
    getSystemPathHome() {
      return f.homedir?.() || process.env.HOME;
    }
    getSystemPathTemp() {
      return f.tmpdir();
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: void 0,
        os: this.getOsVersion()
      };
    }
    isDev() {
      return process.env.NODE_ENV === "development" || process.env.ELECTRON_IS_DEV === "1";
    }
    isElectron() {
      return !!process.versions.electron;
    }
    onAppEvent(e, u) {
    }
    onAppReady(e) {
      e();
    }
    onEveryWebContentsEvent(e, u) {
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(e, u) {
    }
    onIpcInvoke(e, u) {
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(e, u = console.error) {
      const o = { darwin: "open", win32: "start", linux: "xdg-open" }[process.platform] || "xdg-open";
      i.exec(`${o} ${e}`, {}, (a) => {
        a && u(a);
      });
    }
    setAppName(e) {
      this.appName = e;
    }
    setPlatform(e) {
      this.platform = e;
    }
    setPreloadFileForSessions({
      filePath: e,
      // eslint-disable-line no-unused-vars
      includeFutureSession: u = !0,
      // eslint-disable-line no-unused-vars
      getSessions: r = () => []
      // eslint-disable-line no-unused-vars
    }) {
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(e, u) {
    }
    showErrorBox(e, u) {
    }
  }
  return NodeExternalApi_1 = t, NodeExternalApi_1;
}
var ElectronExternalApi_1, hasRequiredElectronExternalApi;
function requireElectronExternalApi() {
  if (hasRequiredElectronExternalApi) return ElectronExternalApi_1;
  hasRequiredElectronExternalApi = 1;
  const i = require$$1, f = requireNodeExternalApi();
  class d extends f {
    /**
     * @type {typeof Electron}
     */
    electron = void 0;
    /**
     * @param {object} options
     * @param {typeof Electron} [options.electron]
     */
    constructor({ electron: t } = {}) {
      super(), this.electron = t;
    }
    getAppName() {
      let t;
      try {
        t = this.appName || this.electron.app?.name || this.electron.app?.getName();
      } catch {
      }
      return t || super.getAppName();
    }
    getAppUserDataPath(t) {
      return this.getPath("userData") || super.getAppUserDataPath(t);
    }
    getAppVersion() {
      let t;
      try {
        t = this.electron.app?.getVersion();
      } catch {
      }
      return t || super.getAppVersion();
    }
    getElectronLogPath() {
      return this.getPath("logs") || super.getElectronLogPath();
    }
    /**
     * @private
     * @param {any} name
     * @returns {string|undefined}
     */
    getPath(t) {
      try {
        return this.electron.app?.getPath(t);
      } catch {
        return;
      }
    }
    getVersions() {
      return {
        app: `${this.getAppName()} ${this.getAppVersion()}`,
        electron: `Electron ${process.versions.electron}`,
        os: this.getOsVersion()
      };
    }
    getSystemPathAppData() {
      return this.getPath("appData") || super.getSystemPathAppData();
    }
    isDev() {
      return this.electron.app?.isPackaged !== void 0 ? !this.electron.app.isPackaged : typeof process.execPath == "string" ? i.basename(process.execPath).toLowerCase().startsWith("electron") : super.isDev();
    }
    onAppEvent(t, n) {
      return this.electron.app?.on(t, n), () => {
        this.electron.app?.off(t, n);
      };
    }
    onAppReady(t) {
      this.electron.app?.isReady() ? t() : this.electron.app?.once ? this.electron.app?.once("ready", t) : t();
    }
    onEveryWebContentsEvent(t, n) {
      return this.electron.webContents?.getAllWebContents()?.forEach((u) => {
        u.on(t, n);
      }), this.electron.app?.on("web-contents-created", e), () => {
        this.electron.webContents?.getAllWebContents().forEach((u) => {
          u.off(t, n);
        }), this.electron.app?.off("web-contents-created", e);
      };
      function e(u, r) {
        r.on(t, n);
      }
    }
    /**
     * Listen to async messages sent from opposite process
     * @param {string} channel
     * @param {function} listener
     */
    onIpc(t, n) {
      this.electron.ipcMain?.on(t, n);
    }
    onIpcInvoke(t, n) {
      this.electron.ipcMain?.handle?.(t, n);
    }
    /**
     * @param {string} url
     * @param {Function} [logFunction]
     */
    openUrl(t, n = console.error) {
      this.electron.shell?.openExternal(t).catch(n);
    }
    setPreloadFileForSessions({
      filePath: t,
      includeFutureSession: n = !0,
      getSessions: e = () => [this.electron.session?.defaultSession]
    }) {
      for (const r of e().filter(Boolean))
        u(r);
      n && this.onAppEvent("session-created", (r) => {
        u(r);
      });
      function u(r) {
        typeof r.registerPreloadScript == "function" ? r.registerPreloadScript({
          filePath: t,
          id: "electron-log-preload",
          type: "frame"
        }) : r.setPreloads([...r.getPreloads(), t]);
      }
    }
    /**
     * Sent a message to opposite process
     * @param {string} channel
     * @param {any} message
     */
    sendIpc(t, n) {
      this.electron.BrowserWindow?.getAllWindows()?.forEach((e) => {
        e.webContents?.isDestroyed() === !1 && e.webContents?.isCrashed() === !1 && e.webContents.send(t, n);
      });
    }
    showErrorBox(t, n) {
      this.electron.dialog?.showErrorBox(t, n);
    }
  }
  return ElectronExternalApi_1 = d, ElectronExternalApi_1;
}
var initialize, hasRequiredInitialize;
function requireInitialize() {
  if (hasRequiredInitialize) return initialize;
  hasRequiredInitialize = 1;
  const i = require$$0, f = require$$1$1, d = require$$1, s = requireElectronLogPreload();
  let t = !1, n = !1;
  initialize = {
    initialize({
      externalApi: r,
      getSessions: o,
      includeFutureSession: a,
      logger: l,
      preload: c = !0,
      spyRendererConsole: m = !1
    }) {
      r.onAppReady(() => {
        try {
          c && e({
            externalApi: r,
            getSessions: o,
            includeFutureSession: a,
            logger: l,
            preloadOption: c
          }), m && u({ externalApi: r, logger: l });
        } catch (y) {
          l.warn(y);
        }
      });
    }
  };
  function e({
    externalApi: r,
    getSessions: o,
    includeFutureSession: a,
    logger: l,
    preloadOption: c
  }) {
    let m = typeof c == "string" ? c : void 0;
    if (t) {
      l.warn(new Error("log.initialize({ preload }) already called").stack);
      return;
    }
    t = !0;
    try {
      m = d.resolve(
        __dirname,
        "../renderer/electron-log-preload.js"
      );
    } catch {
    }
    if (!m || !i.existsSync(m)) {
      m = d.join(
        r.getAppUserDataPath() || f.tmpdir(),
        "electron-log-preload.js"
      );
      const y = `
      try {
        (${s.toString()})(require('electron'));
      } catch(e) {
        console.error(e);
      }
    `;
      i.writeFileSync(m, y, "utf8");
    }
    r.setPreloadFileForSessions({
      filePath: m,
      includeFutureSession: a,
      getSessions: o
    });
  }
  function u({ externalApi: r, logger: o }) {
    if (n) {
      o.warn(
        new Error("log.initialize({ spyRendererConsole }) already called").stack
      );
      return;
    }
    n = !0;
    const a = ["debug", "info", "warn", "error"];
    r.onEveryWebContentsEvent(
      "console-message",
      (l, c, m) => {
        o.processMessage({
          data: [m],
          level: a[c],
          variables: { processType: "renderer" }
        });
      }
    );
  }
  return initialize;
}
var ErrorHandler_1, hasRequiredErrorHandler;
function requireErrorHandler() {
  if (hasRequiredErrorHandler) return ErrorHandler_1;
  hasRequiredErrorHandler = 1;
  class i {
    externalApi = void 0;
    isActive = !1;
    logFn = void 0;
    onError = void 0;
    showDialog = !0;
    constructor({
      externalApi: s,
      logFn: t = void 0,
      onError: n = void 0,
      showDialog: e = void 0
    } = {}) {
      this.createIssue = this.createIssue.bind(this), this.handleError = this.handleError.bind(this), this.handleRejection = this.handleRejection.bind(this), this.setOptions({ externalApi: s, logFn: t, onError: n, showDialog: e }), this.startCatching = this.startCatching.bind(this), this.stopCatching = this.stopCatching.bind(this);
    }
    handle(s, {
      logFn: t = this.logFn,
      onError: n = this.onError,
      processType: e = "browser",
      showDialog: u = this.showDialog,
      errorName: r = ""
    } = {}) {
      s = f(s);
      try {
        if (typeof n == "function") {
          const o = this.externalApi?.getVersions() || {}, a = this.createIssue;
          if (n({
            createIssue: a,
            error: s,
            errorName: r,
            processType: e,
            versions: o
          }) === !1)
            return;
        }
        r ? t(r, s) : t(s), u && !r.includes("rejection") && this.externalApi && this.externalApi.showErrorBox(
          `A JavaScript error occurred in the ${e} process`,
          s.stack
        );
      } catch {
        console.error(s);
      }
    }
    setOptions({ externalApi: s, logFn: t, onError: n, showDialog: e }) {
      typeof s == "object" && (this.externalApi = s), typeof t == "function" && (this.logFn = t), typeof n == "function" && (this.onError = n), typeof e == "boolean" && (this.showDialog = e);
    }
    startCatching({ onError: s, showDialog: t } = {}) {
      this.isActive || (this.isActive = !0, this.setOptions({ onError: s, showDialog: t }), process.on("uncaughtException", this.handleError), process.on("unhandledRejection", this.handleRejection));
    }
    stopCatching() {
      this.isActive = !1, process.removeListener("uncaughtException", this.handleError), process.removeListener("unhandledRejection", this.handleRejection);
    }
    createIssue(s, t) {
      this.externalApi?.openUrl(
        `${s}?${new URLSearchParams(t).toString()}`
      );
    }
    handleError(s) {
      this.handle(s, { errorName: "Unhandled" });
    }
    handleRejection(s) {
      const t = s instanceof Error ? s : new Error(JSON.stringify(s));
      this.handle(t, { errorName: "Unhandled rejection" });
    }
  }
  function f(d) {
    if (d instanceof Error)
      return d;
    if (d && typeof d == "object") {
      if (d.message)
        return Object.assign(new Error(d.message), d);
      try {
        return new Error(JSON.stringify(d));
      } catch (s) {
        return new Error(`Couldn't normalize error ${String(d)}: ${s}`);
      }
    }
    return new Error(`Can't normalize error ${String(d)}`);
  }
  return ErrorHandler_1 = i, ErrorHandler_1;
}
var EventLogger_1, hasRequiredEventLogger;
function requireEventLogger() {
  if (hasRequiredEventLogger) return EventLogger_1;
  hasRequiredEventLogger = 1;
  class i {
    disposers = [];
    format = "{eventSource}#{eventName}:";
    formatters = {
      app: {
        "certificate-error": ({ args: d }) => this.arrayToObject(d.slice(1, 4), [
          "url",
          "error",
          "certificate"
        ]),
        "child-process-gone": ({ args: d }) => d.length === 1 ? d[0] : d,
        "render-process-gone": ({ args: [d, s] }) => s && typeof s == "object" ? { ...s, ...this.getWebContentsDetails(d) } : []
      },
      webContents: {
        "console-message": ({ args: [d, s, t, n] }) => {
          if (!(d < 3))
            return { message: s, source: `${n}:${t}` };
        },
        "did-fail-load": ({ args: d }) => this.arrayToObject(d, [
          "errorCode",
          "errorDescription",
          "validatedURL",
          "isMainFrame",
          "frameProcessId",
          "frameRoutingId"
        ]),
        "did-fail-provisional-load": ({ args: d }) => this.arrayToObject(d, [
          "errorCode",
          "errorDescription",
          "validatedURL",
          "isMainFrame",
          "frameProcessId",
          "frameRoutingId"
        ]),
        "plugin-crashed": ({ args: d }) => this.arrayToObject(d, ["name", "version"]),
        "preload-error": ({ args: d }) => this.arrayToObject(d, ["preloadPath", "error"])
      }
    };
    events = {
      app: {
        "certificate-error": !0,
        "child-process-gone": !0,
        "render-process-gone": !0
      },
      webContents: {
        // 'console-message': true,
        "did-fail-load": !0,
        "did-fail-provisional-load": !0,
        "plugin-crashed": !0,
        "preload-error": !0,
        unresponsive: !0
      }
    };
    externalApi = void 0;
    level = "error";
    scope = "";
    constructor(d = {}) {
      this.setOptions(d);
    }
    setOptions({
      events: d,
      externalApi: s,
      level: t,
      logger: n,
      format: e,
      formatters: u,
      scope: r
    }) {
      typeof d == "object" && (this.events = d), typeof s == "object" && (this.externalApi = s), typeof t == "string" && (this.level = t), typeof n == "object" && (this.logger = n), (typeof e == "string" || typeof e == "function") && (this.format = e), typeof u == "object" && (this.formatters = u), typeof r == "string" && (this.scope = r);
    }
    startLogging(d = {}) {
      this.setOptions(d), this.disposeListeners();
      for (const s of this.getEventNames(this.events.app))
        this.disposers.push(
          this.externalApi.onAppEvent(s, (...t) => {
            this.handleEvent({ eventSource: "app", eventName: s, handlerArgs: t });
          })
        );
      for (const s of this.getEventNames(this.events.webContents))
        this.disposers.push(
          this.externalApi.onEveryWebContentsEvent(
            s,
            (...t) => {
              this.handleEvent(
                { eventSource: "webContents", eventName: s, handlerArgs: t }
              );
            }
          )
        );
    }
    stopLogging() {
      this.disposeListeners();
    }
    arrayToObject(d, s) {
      const t = {};
      return s.forEach((n, e) => {
        t[n] = d[e];
      }), d.length > s.length && (t.unknownArgs = d.slice(s.length)), t;
    }
    disposeListeners() {
      this.disposers.forEach((d) => d()), this.disposers = [];
    }
    formatEventLog({ eventName: d, eventSource: s, handlerArgs: t }) {
      const [n, ...e] = t;
      if (typeof this.format == "function")
        return this.format({ args: e, event: n, eventName: d, eventSource: s });
      const u = this.formatters[s]?.[d];
      let r = e;
      if (typeof u == "function" && (r = u({ args: e, event: n, eventName: d, eventSource: s })), !r)
        return;
      const o = {};
      return Array.isArray(r) ? o.args = r : typeof r == "object" && Object.assign(o, r), s === "webContents" && Object.assign(o, this.getWebContentsDetails(n?.sender)), [this.format.replace("{eventSource}", s === "app" ? "App" : "WebContents").replace("{eventName}", d), o];
    }
    getEventNames(d) {
      return !d || typeof d != "object" ? [] : Object.entries(d).filter(([s, t]) => t).map(([s]) => s);
    }
    getWebContentsDetails(d) {
      if (!d?.loadURL)
        return {};
      try {
        return {
          webContents: {
            id: d.id,
            url: d.getURL()
          }
        };
      } catch {
        return {};
      }
    }
    handleEvent({ eventName: d, eventSource: s, handlerArgs: t }) {
      const n = this.formatEventLog({ eventName: d, eventSource: s, handlerArgs: t });
      n && (this.scope ? this.logger.scope(this.scope) : this.logger)?.[this.level]?.(...n);
    }
  }
  return EventLogger_1 = i, EventLogger_1;
}
var format, hasRequiredFormat;
function requireFormat() {
  if (hasRequiredFormat) return format;
  hasRequiredFormat = 1;
  const { transform: i } = requireTransform();
  format = {
    concatFirstStringElements: f,
    formatScope: s,
    formatText: n,
    formatVariables: t,
    timeZoneFromOffset: d,
    format({ message: e, logger: u, transport: r, data: o = e?.data }) {
      switch (typeof r.format) {
        case "string":
          return i({
            message: e,
            logger: u,
            transforms: [t, s, n],
            transport: r,
            initialData: [r.format, ...o]
          });
        case "function":
          return r.format({
            data: o,
            level: e?.level || "info",
            logger: u,
            message: e,
            transport: r
          });
        default:
          return o;
      }
    }
  };
  function f({ data: e }) {
    return typeof e[0] != "string" || typeof e[1] != "string" || e[0].match(/%[1cdfiOos]/) ? e : [`${e[0]} ${e[1]}`, ...e.slice(2)];
  }
  function d(e) {
    const u = Math.abs(e), r = e > 0 ? "-" : "+", o = Math.floor(u / 60).toString().padStart(2, "0"), a = (u % 60).toString().padStart(2, "0");
    return `${r}${o}:${a}`;
  }
  function s({ data: e, logger: u, message: r }) {
    const { defaultLabel: o, labelLength: a } = u?.scope || {}, l = e[0];
    let c = r.scope;
    c || (c = o);
    let m;
    return c === "" ? m = a > 0 ? "".padEnd(a + 3) : "" : typeof c == "string" ? m = ` (${c})`.padEnd(a + 3) : m = "", e[0] = l.replace("{scope}", m), e;
  }
  function t({ data: e, message: u }) {
    let r = e[0];
    if (typeof r != "string")
      return e;
    r = r.replace("{level}]", `${u.level}]`.padEnd(6, " "));
    const o = u.date || /* @__PURE__ */ new Date();
    return e[0] = r.replace(/\{(\w+)}/g, (a, l) => {
      switch (l) {
        case "level":
          return u.level || "info";
        case "logId":
          return u.logId;
        case "y":
          return o.getFullYear().toString(10);
        case "m":
          return (o.getMonth() + 1).toString(10).padStart(2, "0");
        case "d":
          return o.getDate().toString(10).padStart(2, "0");
        case "h":
          return o.getHours().toString(10).padStart(2, "0");
        case "i":
          return o.getMinutes().toString(10).padStart(2, "0");
        case "s":
          return o.getSeconds().toString(10).padStart(2, "0");
        case "ms":
          return o.getMilliseconds().toString(10).padStart(3, "0");
        case "z":
          return d(o.getTimezoneOffset());
        case "iso":
          return o.toISOString();
        default:
          return u.variables?.[l] || a;
      }
    }).trim(), e;
  }
  function n({ data: e }) {
    const u = e[0];
    if (typeof u != "string")
      return e;
    if (u.lastIndexOf("{text}") === u.length - 6)
      return e[0] = u.replace(/\s?{text}/, ""), e[0] === "" && e.shift(), e;
    const o = u.split("{text}");
    let a = [];
    return o[0] !== "" && a.push(o[0]), a = a.concat(e.slice(1)), o[1] !== "" && a.push(o[1]), a;
  }
  return format;
}
var object = { exports: {} }, hasRequiredObject;
function requireObject() {
  return hasRequiredObject || (hasRequiredObject = 1, (function(i) {
    const f = require$$0$2;
    i.exports = {
      serialize: s,
      maxDepth({ data: t, transport: n, depth: e = n?.depth ?? 6 }) {
        if (!t)
          return t;
        if (e < 1)
          return Array.isArray(t) ? "[array]" : typeof t == "object" && t ? "[object]" : t;
        if (Array.isArray(t))
          return t.map((r) => i.exports.maxDepth({
            data: r,
            depth: e - 1
          }));
        if (typeof t != "object" || t && typeof t.toISOString == "function")
          return t;
        if (t === null)
          return null;
        if (t instanceof Error)
          return t;
        const u = {};
        for (const r in t)
          Object.prototype.hasOwnProperty.call(t, r) && (u[r] = i.exports.maxDepth({
            data: t[r],
            depth: e - 1
          }));
        return u;
      },
      toJSON({ data: t }) {
        return JSON.parse(JSON.stringify(t, d()));
      },
      toString({ data: t, transport: n }) {
        const e = n?.inspectOptions || {}, u = t.map((r) => {
          if (r !== void 0)
            try {
              const o = JSON.stringify(r, d(), "  ");
              return o === void 0 ? void 0 : JSON.parse(o);
            } catch {
              return r;
            }
        });
        return f.formatWithOptions(e, ...u);
      }
    };
    function d(t = {}) {
      const n = /* @__PURE__ */ new WeakSet();
      return function(e, u) {
        if (typeof u == "object" && u !== null) {
          if (n.has(u))
            return;
          n.add(u);
        }
        return s(e, u, t);
      };
    }
    function s(t, n, e = {}) {
      const u = e?.serializeMapAndSet !== !1;
      return n instanceof Error ? n.stack : n && (typeof n == "function" ? `[function] ${n.toString()}` : n instanceof Date ? n.toISOString() : u && n instanceof Map && Object.fromEntries ? Object.fromEntries(n) : u && n instanceof Set && Array.from ? Array.from(n) : n);
    }
  })(object)), object.exports;
}
var style, hasRequiredStyle;
function requireStyle() {
  if (hasRequiredStyle) return style;
  hasRequiredStyle = 1, style = {
    transformStyles: s,
    applyAnsiStyles({ data: t }) {
      return s(t, f, d);
    },
    removeStyles({ data: t }) {
      return s(t, () => "");
    }
  };
  const i = {
    unset: "\x1B[0m",
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m",
    gray: "\x1B[90m"
  };
  function f(t) {
    const n = t.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
    return i[n] || "";
  }
  function d(t) {
    return t + i.unset;
  }
  function s(t, n, e) {
    const u = {};
    return t.reduce((r, o, a, l) => {
      if (u[a])
        return r;
      if (typeof o == "string") {
        let c = a, m = !1;
        o = o.replace(/%[1cdfiOos]/g, (y) => {
          if (c += 1, y !== "%c")
            return y;
          const v = l[c];
          return typeof v == "string" ? (u[c] = !0, m = !0, n(v, o)) : y;
        }), m && e && (o = e(o));
      }
      return r.push(o), r;
    }, []);
  }
  return style;
}
var console_1, hasRequiredConsole;
function requireConsole() {
  if (hasRequiredConsole) return console_1;
  hasRequiredConsole = 1;
  const {
    concatFirstStringElements: i,
    format: f
  } = requireFormat(), { maxDepth: d, toJSON: s } = requireObject(), {
    applyAnsiStyles: t,
    removeStyles: n
  } = requireStyle(), { transform: e } = requireTransform(), u = {
    error: console.error,
    warn: console.warn,
    info: console.info,
    verbose: console.info,
    debug: console.debug,
    silly: console.debug,
    log: console.log
  };
  console_1 = a;
  const o = `%c{h}:{i}:{s}.{ms}{scope}%c ${process.platform === "win32" ? ">" : "›"} {text}`;
  Object.assign(a, {
    DEFAULT_FORMAT: o
  });
  function a(v) {
    return Object.assign(g, {
      colorMap: {
        error: "red",
        warn: "yellow",
        info: "cyan",
        verbose: "unset",
        debug: "gray",
        silly: "gray",
        default: "unset"
      },
      format: o,
      level: "silly",
      transforms: [
        l,
        f,
        m,
        i,
        d,
        s
      ],
      useStyles: process.env.FORCE_STYLES,
      writeFn({ message: q }) {
        (u[q.level] || u.info)(...q.data);
      }
    });
    function g(q) {
      const A = e({ logger: v, message: q, transport: g });
      g.writeFn({
        message: { ...q, data: A }
      });
    }
  }
  function l({ data: v, message: g, transport: q }) {
    return typeof q.format != "string" || !q.format.includes("%c") ? v : [
      `color:${y(g.level, q)}`,
      "color:unset",
      ...v
    ];
  }
  function c(v, g) {
    if (typeof v == "boolean")
      return v;
    const A = g === "error" || g === "warn" ? process.stderr : process.stdout;
    return A && A.isTTY;
  }
  function m(v) {
    const { message: g, transport: q } = v;
    return (c(q.useStyles, g.level) ? t : n)(v);
  }
  function y(v, g) {
    return g.colorMap[v] || g.colorMap.default;
  }
  return console_1;
}
var File_1, hasRequiredFile$2;
function requireFile$2() {
  if (hasRequiredFile$2) return File_1;
  hasRequiredFile$2 = 1;
  const i = require$$0$3, f = require$$0, d = require$$1$1;
  class s extends i {
    asyncWriteQueue = [];
    bytesWritten = 0;
    hasActiveAsyncWriting = !1;
    path = null;
    initialSize = void 0;
    writeOptions = null;
    writeAsync = !1;
    constructor({
      path: e,
      writeOptions: u = { encoding: "utf8", flag: "a", mode: 438 },
      writeAsync: r = !1
    }) {
      super(), this.path = e, this.writeOptions = u, this.writeAsync = r;
    }
    get size() {
      return this.getSize();
    }
    clear() {
      try {
        return f.writeFileSync(this.path, "", {
          mode: this.writeOptions.mode,
          flag: "w"
        }), this.reset(), !0;
      } catch (e) {
        return e.code === "ENOENT" ? !0 : (this.emit("error", e, this), !1);
      }
    }
    crop(e) {
      try {
        const u = t(this.path, e || 4096);
        this.clear(), this.writeLine(`[log cropped]${d.EOL}${u}`);
      } catch (u) {
        this.emit(
          "error",
          new Error(`Couldn't crop file ${this.path}. ${u.message}`),
          this
        );
      }
    }
    getSize() {
      if (this.initialSize === void 0)
        try {
          const e = f.statSync(this.path);
          this.initialSize = e.size;
        } catch {
          this.initialSize = 0;
        }
      return this.initialSize + this.bytesWritten;
    }
    increaseBytesWrittenCounter(e) {
      this.bytesWritten += Buffer.byteLength(e, this.writeOptions.encoding);
    }
    isNull() {
      return !1;
    }
    nextAsyncWrite() {
      const e = this;
      if (this.hasActiveAsyncWriting || this.asyncWriteQueue.length === 0)
        return;
      const u = this.asyncWriteQueue.join("");
      this.asyncWriteQueue = [], this.hasActiveAsyncWriting = !0, f.writeFile(this.path, u, this.writeOptions, (r) => {
        e.hasActiveAsyncWriting = !1, r ? e.emit(
          "error",
          new Error(`Couldn't write to ${e.path}. ${r.message}`),
          this
        ) : e.increaseBytesWrittenCounter(u), e.nextAsyncWrite();
      });
    }
    reset() {
      this.initialSize = void 0, this.bytesWritten = 0;
    }
    toString() {
      return this.path;
    }
    writeLine(e) {
      if (e += d.EOL, this.writeAsync) {
        this.asyncWriteQueue.push(e), this.nextAsyncWrite();
        return;
      }
      try {
        f.writeFileSync(this.path, e, this.writeOptions), this.increaseBytesWrittenCounter(e);
      } catch (u) {
        this.emit(
          "error",
          new Error(`Couldn't write to ${this.path}. ${u.message}`),
          this
        );
      }
    }
  }
  File_1 = s;
  function t(n, e) {
    const u = Buffer.alloc(e), r = f.statSync(n), o = Math.min(r.size, e), a = Math.max(0, r.size - e), l = f.openSync(n, "r"), c = f.readSync(l, u, 0, o, a);
    return f.closeSync(l), u.toString("utf8", 0, c);
  }
  return File_1;
}
var NullFile_1, hasRequiredNullFile;
function requireNullFile() {
  if (hasRequiredNullFile) return NullFile_1;
  hasRequiredNullFile = 1;
  const i = requireFile$2();
  class f extends i {
    clear() {
    }
    crop() {
    }
    getSize() {
      return 0;
    }
    isNull() {
      return !0;
    }
    writeLine() {
    }
  }
  return NullFile_1 = f, NullFile_1;
}
var FileRegistry_1, hasRequiredFileRegistry;
function requireFileRegistry() {
  if (hasRequiredFileRegistry) return FileRegistry_1;
  hasRequiredFileRegistry = 1;
  const i = require$$0$3, f = require$$0, d = require$$1, s = requireFile$2(), t = requireNullFile();
  class n extends i {
    store = {};
    constructor() {
      super(), this.emitError = this.emitError.bind(this);
    }
    /**
     * Provide a File object corresponding to the filePath
     * @param {string} filePath
     * @param {WriteOptions} [writeOptions]
     * @param {boolean} [writeAsync]
     * @return {File}
     */
    provide({ filePath: u, writeOptions: r = {}, writeAsync: o = !1 }) {
      let a;
      try {
        if (u = d.resolve(u), this.store[u])
          return this.store[u];
        a = this.createFile({ filePath: u, writeOptions: r, writeAsync: o });
      } catch (l) {
        a = new t({ path: u }), this.emitError(l, a);
      }
      return a.on("error", this.emitError), this.store[u] = a, a;
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @param {boolean} async
     * @return {File}
     * @private
     */
    createFile({ filePath: u, writeOptions: r, writeAsync: o }) {
      return this.testFileWriting({ filePath: u, writeOptions: r }), new s({ path: u, writeOptions: r, writeAsync: o });
    }
    /**
     * @param {Error} error
     * @param {File} file
     * @private
     */
    emitError(u, r) {
      this.emit("error", u, r);
    }
    /**
     * @param {string} filePath
     * @param {WriteOptions} writeOptions
     * @private
     */
    testFileWriting({ filePath: u, writeOptions: r }) {
      f.mkdirSync(d.dirname(u), { recursive: !0 }), f.writeFileSync(u, "", { flag: "a", mode: r.mode });
    }
  }
  return FileRegistry_1 = n, FileRegistry_1;
}
var file$1, hasRequiredFile$1;
function requireFile$1() {
  if (hasRequiredFile$1) return file$1;
  hasRequiredFile$1 = 1;
  const i = require$$0, f = require$$1$1, d = require$$1, s = requireFileRegistry(), { transform: t } = requireTransform(), { removeStyles: n } = requireStyle(), {
    format: e,
    concatFirstStringElements: u
  } = requireFormat(), { toString: r } = requireObject();
  file$1 = a;
  const o = new s();
  function a(c, { registry: m = o, externalApi: y } = {}) {
    let v;
    return m.listenerCount("error") < 1 && m.on("error", (C, D) => {
      A(`Can't write to ${D}`, C);
    }), Object.assign(g, {
      fileName: l(c.variables.processType),
      format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
      getFile: T,
      inspectOptions: { depth: 5 },
      level: "silly",
      maxSize: 1024 ** 2,
      readAllLogs: F,
      sync: !0,
      transforms: [n, e, u, r],
      writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
      archiveLogFn(C) {
        const D = C.toString(), x = d.parse(D);
        try {
          i.renameSync(D, d.join(x.dir, `${x.name}.old${x.ext}`));
        } catch (b) {
          A("Could not rotate log", b);
          const w = Math.round(g.maxSize / 4);
          C.crop(Math.min(w, 256 * 1024));
        }
      },
      resolvePathFn(C) {
        return d.join(C.libraryDefaultDir, C.fileName);
      },
      setAppName(C) {
        c.dependencies.externalApi.setAppName(C);
      }
    });
    function g(C) {
      const D = T(C);
      g.maxSize > 0 && D.size > g.maxSize && (g.archiveLogFn(D), D.reset());
      const b = t({ logger: c, message: C, transport: g });
      D.writeLine(b);
    }
    function q() {
      v || (v = Object.create(
        Object.prototype,
        {
          ...Object.getOwnPropertyDescriptors(
            y.getPathVariables()
          ),
          fileName: {
            get() {
              return g.fileName;
            },
            enumerable: !0
          }
        }
      ), typeof g.archiveLog == "function" && (g.archiveLogFn = g.archiveLog, A("archiveLog is deprecated. Use archiveLogFn instead")), typeof g.resolvePath == "function" && (g.resolvePathFn = g.resolvePath, A("resolvePath is deprecated. Use resolvePathFn instead")));
    }
    function A(C, D = null, x = "error") {
      const b = [`electron-log.transports.file: ${C}`];
      D && b.push(D), c.transports.console({ data: b, date: /* @__PURE__ */ new Date(), level: x });
    }
    function T(C) {
      q();
      const D = g.resolvePathFn(v, C);
      return m.provide({
        filePath: D,
        writeAsync: !g.sync,
        writeOptions: g.writeOptions
      });
    }
    function F({ fileFilter: C = (D) => D.endsWith(".log") } = {}) {
      q();
      const D = d.dirname(g.resolvePathFn(v));
      return i.existsSync(D) ? i.readdirSync(D).map((x) => d.join(D, x)).filter(C).map((x) => {
        try {
          return {
            path: x,
            lines: i.readFileSync(x, "utf8").split(f.EOL)
          };
        } catch {
          return null;
        }
      }).filter(Boolean) : [];
    }
  }
  function l(c = process.type) {
    switch (c) {
      case "renderer":
        return "renderer.log";
      case "worker":
        return "worker.log";
      default:
        return "main.log";
    }
  }
  return file$1;
}
var ipc, hasRequiredIpc;
function requireIpc() {
  if (hasRequiredIpc) return ipc;
  hasRequiredIpc = 1;
  const { maxDepth: i, toJSON: f } = requireObject(), { transform: d } = requireTransform();
  ipc = s;
  function s(t, { externalApi: n }) {
    return Object.assign(e, {
      depth: 3,
      eventId: "__ELECTRON_LOG_IPC__",
      level: t.isDev ? "silly" : !1,
      transforms: [f, i]
    }), n?.isElectron() ? e : void 0;
    function e(u) {
      u?.variables?.processType !== "renderer" && n?.sendIpc(e.eventId, {
        ...u,
        data: d({ logger: t, message: u, transport: e })
      });
    }
  }
  return ipc;
}
var remote, hasRequiredRemote;
function requireRemote() {
  if (hasRequiredRemote) return remote;
  hasRequiredRemote = 1;
  const i = require$$0$4, f = require$$1$2, { transform: d } = requireTransform(), { removeStyles: s } = requireStyle(), { toJSON: t, maxDepth: n } = requireObject();
  remote = e;
  function e(u) {
    return Object.assign(r, {
      client: { name: "electron-application" },
      depth: 6,
      level: !1,
      requestOptions: {},
      transforms: [s, t, n],
      makeBodyFn({ message: o }) {
        return JSON.stringify({
          client: r.client,
          data: o.data,
          date: o.date.getTime(),
          level: o.level,
          scope: o.scope,
          variables: o.variables
        });
      },
      processErrorFn({ error: o }) {
        u.processMessage(
          {
            data: [`electron-log: can't POST ${r.url}`, o],
            level: "warn"
          },
          { transports: ["console", "file"] }
        );
      },
      sendRequestFn({ serverUrl: o, requestOptions: a, body: l }) {
        const m = (o.startsWith("https:") ? f : i).request(o, {
          method: "POST",
          ...a,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": l.length,
            ...a.headers
          }
        });
        return m.write(l), m.end(), m;
      }
    });
    function r(o) {
      if (!r.url)
        return;
      const a = r.makeBodyFn({
        logger: u,
        message: { ...o, data: d({ logger: u, message: o, transport: r }) },
        transport: r
      }), l = r.sendRequestFn({
        serverUrl: r.url,
        requestOptions: r.requestOptions,
        body: Buffer.from(a, "utf8")
      });
      l.on("error", (c) => r.processErrorFn({
        error: c,
        logger: u,
        message: o,
        request: l,
        transport: r
      }));
    }
  }
  return remote;
}
var createDefaultLogger_1, hasRequiredCreateDefaultLogger;
function requireCreateDefaultLogger() {
  if (hasRequiredCreateDefaultLogger) return createDefaultLogger_1;
  hasRequiredCreateDefaultLogger = 1;
  const i = requireLogger(), f = requireErrorHandler(), d = requireEventLogger(), s = requireConsole(), t = requireFile$1(), n = requireIpc(), e = requireRemote();
  createDefaultLogger_1 = u;
  function u({ dependencies: r, initializeFn: o }) {
    const a = new i({
      dependencies: r,
      errorHandler: new f(),
      eventLogger: new d(),
      initializeFn: o,
      isDev: r.externalApi?.isDev(),
      logId: "default",
      transportFactories: {
        console: s,
        file: t,
        ipc: n,
        remote: e
      },
      variables: {
        processType: "main"
      }
    });
    return a.default = a, a.Logger = i, a.processInternalErrorFn = (l) => {
      a.transports.console.writeFn({
        message: {
          data: ["Unhandled electron-log error", l],
          level: "error"
        }
      });
    }, a;
  }
  return createDefaultLogger_1;
}
var main$2, hasRequiredMain$2;
function requireMain$2() {
  if (hasRequiredMain$2) return main$2;
  hasRequiredMain$2 = 1;
  const i = require$$1$3, f = requireElectronExternalApi(), { initialize: d } = requireInitialize(), s = requireCreateDefaultLogger(), t = new f({ electron: i }), n = s({
    dependencies: { externalApi: t },
    initializeFn: d
  });
  main$2 = n, t.onIpc("__ELECTRON_LOG__", (u, r) => {
    r.scope && n.Logger.getInstance(r).scope(r.scope);
    const o = new Date(r.date);
    e({
      ...r,
      date: o.getTime() ? o : /* @__PURE__ */ new Date()
    });
  }), t.onIpcInvoke("__ELECTRON_LOG__", (u, { cmd: r = "", logId: o }) => r === "getOptions" ? {
    levels: n.Logger.getInstance({ logId: o }).levels,
    logId: o
  } : (e({ data: [`Unknown cmd '${r}'`], level: "error" }), {}));
  function e(u) {
    n.Logger.getInstance(u)?.processMessage(u);
  }
  return main$2;
}
var node$1, hasRequiredNode$1;
function requireNode$1() {
  if (hasRequiredNode$1) return node$1;
  hasRequiredNode$1 = 1;
  const i = requireNodeExternalApi(), f = requireCreateDefaultLogger(), d = new i();
  return node$1 = f({
    dependencies: { externalApi: d }
  }), node$1;
}
var hasRequiredSrc$1;
function requireSrc$1() {
  if (hasRequiredSrc$1) return src$1.exports;
  hasRequiredSrc$1 = 1;
  const i = typeof process > "u" || process.type === "renderer" || process.type === "worker", f = typeof process == "object" && process.type === "browser";
  return i ? (requireElectronLogPreload(), src$1.exports = requireRenderer()) : f ? src$1.exports = requireMain$2() : src$1.exports = requireNode$1(), src$1.exports;
}
var srcExports = requireSrc$1();
const log = /* @__PURE__ */ getDefaultExportFromCjs(srcExports);
var kindOf, hasRequiredKindOf;
function requireKindOf() {
  if (hasRequiredKindOf) return kindOf;
  hasRequiredKindOf = 1;
  var i = Object.prototype.toString;
  kindOf = function(l) {
    if (l === void 0) return "undefined";
    if (l === null) return "null";
    var c = typeof l;
    if (c === "boolean") return "boolean";
    if (c === "string") return "string";
    if (c === "number") return "number";
    if (c === "symbol") return "symbol";
    if (c === "function")
      return e(l) ? "generatorfunction" : "function";
    if (d(l)) return "array";
    if (o(l)) return "buffer";
    if (r(l)) return "arguments";
    if (t(l)) return "date";
    if (s(l)) return "error";
    if (n(l)) return "regexp";
    switch (f(l)) {
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
    if (u(l))
      return "generator";
    switch (c = i.call(l), c) {
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
    return c.slice(8, -1).toLowerCase().replace(/\s/g, "");
  };
  function f(a) {
    return typeof a.constructor == "function" ? a.constructor.name : null;
  }
  function d(a) {
    return Array.isArray ? Array.isArray(a) : a instanceof Array;
  }
  function s(a) {
    return a instanceof Error || typeof a.message == "string" && a.constructor && typeof a.constructor.stackTraceLimit == "number";
  }
  function t(a) {
    return a instanceof Date ? !0 : typeof a.toDateString == "function" && typeof a.getDate == "function" && typeof a.setDate == "function";
  }
  function n(a) {
    return a instanceof RegExp ? !0 : typeof a.flags == "string" && typeof a.ignoreCase == "boolean" && typeof a.multiline == "boolean" && typeof a.global == "boolean";
  }
  function e(a, l) {
    return f(a) === "GeneratorFunction";
  }
  function u(a) {
    return typeof a.throw == "function" && typeof a.return == "function" && typeof a.next == "function";
  }
  function r(a) {
    try {
      if (typeof a.length == "number" && typeof a.callee == "function")
        return !0;
    } catch (l) {
      if (l.message.indexOf("callee") !== -1)
        return !0;
    }
    return !1;
  }
  function o(a) {
    return a.constructor && typeof a.constructor.isBuffer == "function" ? a.constructor.isBuffer(a) : !1;
  }
  return kindOf;
}
var isExtendable, hasRequiredIsExtendable;
function requireIsExtendable() {
  return hasRequiredIsExtendable || (hasRequiredIsExtendable = 1, isExtendable = function(f) {
    return typeof f < "u" && f !== null && (typeof f == "object" || typeof f == "function");
  }), isExtendable;
}
var extendShallow, hasRequiredExtendShallow;
function requireExtendShallow() {
  if (hasRequiredExtendShallow) return extendShallow;
  hasRequiredExtendShallow = 1;
  var i = requireIsExtendable();
  extendShallow = function(t) {
    i(t) || (t = {});
    for (var n = arguments.length, e = 1; e < n; e++) {
      var u = arguments[e];
      i(u) && f(t, u);
    }
    return t;
  };
  function f(s, t) {
    for (var n in t)
      d(t, n) && (s[n] = t[n]);
  }
  function d(s, t) {
    return Object.prototype.hasOwnProperty.call(s, t);
  }
  return extendShallow;
}
var sectionMatter, hasRequiredSectionMatter;
function requireSectionMatter() {
  if (hasRequiredSectionMatter) return sectionMatter;
  hasRequiredSectionMatter = 1;
  var i = requireKindOf(), f = requireExtendShallow();
  sectionMatter = function(r, o) {
    typeof o == "function" && (o = { parse: o });
    var a = s(r), l = { section_delimiter: "---", parse: e }, c = f({}, l, o), m = c.section_delimiter, y = a.content.split(/\r?\n/), v = null, g = n(), q = [], A = [];
    function T(w) {
      a.content = w, v = [], q = [];
    }
    function F(w) {
      A.length && (g.key = t(A[0], m), g.content = w, c.parse(g, v), v.push(g), g = n(), q = [], A = []);
    }
    for (var C = 0; C < y.length; C++) {
      var D = y[C], x = A.length, b = D.trim();
      if (d(b, m)) {
        if (b.length === 3 && C !== 0) {
          if (x === 0 || x === 2) {
            q.push(D);
            continue;
          }
          A.push(b), g.data = q.join(`
`), q = [];
          continue;
        }
        v === null && T(q.join(`
`)), x === 2 && F(q.join(`
`)), A.push(b);
        continue;
      }
      q.push(D);
    }
    return v === null ? T(q.join(`
`)) : F(q.join(`
`)), a.sections = v, a;
  };
  function d(r, o) {
    return !(r.slice(0, o.length) !== o || r.charAt(o.length + 1) === o.slice(-1));
  }
  function s(r) {
    if (i(r) !== "object" && (r = { content: r }), typeof r.content != "string" && !u(r.content))
      throw new TypeError("expected a buffer or string");
    return r.content = r.content.toString(), r.sections = [], r;
  }
  function t(r, o) {
    return r ? r.slice(o.length).trim() : "";
  }
  function n() {
    return { key: "", data: "", content: "" };
  }
  function e(r) {
    return r;
  }
  function u(r) {
    return r && r.constructor && typeof r.constructor.isBuffer == "function" ? r.constructor.isBuffer(r) : !1;
  }
  return sectionMatter;
}
var engines = { exports: {} }, jsYaml$2 = {}, loader$1 = {}, common$2 = {}, hasRequiredCommon$2;
function requireCommon$2() {
  if (hasRequiredCommon$2) return common$2;
  hasRequiredCommon$2 = 1;
  function i(e) {
    return typeof e > "u" || e === null;
  }
  function f(e) {
    return typeof e == "object" && e !== null;
  }
  function d(e) {
    return Array.isArray(e) ? e : i(e) ? [] : [e];
  }
  function s(e, u) {
    var r, o, a, l;
    if (u)
      for (l = Object.keys(u), r = 0, o = l.length; r < o; r += 1)
        a = l[r], e[a] = u[a];
    return e;
  }
  function t(e, u) {
    var r = "", o;
    for (o = 0; o < u; o += 1)
      r += e;
    return r;
  }
  function n(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  return common$2.isNothing = i, common$2.isObject = f, common$2.toArray = d, common$2.repeat = t, common$2.isNegativeZero = n, common$2.extend = s, common$2;
}
var exception$1, hasRequiredException$1;
function requireException$1() {
  if (hasRequiredException$1) return exception$1;
  hasRequiredException$1 = 1;
  function i(f, d) {
    Error.call(this), this.name = "YAMLException", this.reason = f, this.mark = d, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return i.prototype = Object.create(Error.prototype), i.prototype.constructor = i, i.prototype.toString = function(d) {
    var s = this.name + ": ";
    return s += this.reason || "(unknown reason)", !d && this.mark && (s += " " + this.mark.toString()), s;
  }, exception$1 = i, exception$1;
}
var mark, hasRequiredMark;
function requireMark() {
  if (hasRequiredMark) return mark;
  hasRequiredMark = 1;
  var i = requireCommon$2();
  function f(d, s, t, n, e) {
    this.name = d, this.buffer = s, this.position = t, this.line = n, this.column = e;
  }
  return f.prototype.getSnippet = function(s, t) {
    var n, e, u, r, o;
    if (!this.buffer) return null;
    for (s = s || 4, t = t || 75, n = "", e = this.position; e > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(e - 1)) === -1; )
      if (e -= 1, this.position - e > t / 2 - 1) {
        n = " ... ", e += 5;
        break;
      }
    for (u = "", r = this.position; r < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(r)) === -1; )
      if (r += 1, r - this.position > t / 2 - 1) {
        u = " ... ", r -= 5;
        break;
      }
    return o = this.buffer.slice(e, r), i.repeat(" ", s) + n + o + u + `
` + i.repeat(" ", s + this.position - e + n.length) + "^";
  }, f.prototype.toString = function(s) {
    var t, n = "";
    return this.name && (n += 'in "' + this.name + '" '), n += "at line " + (this.line + 1) + ", column " + (this.column + 1), s || (t = this.getSnippet(), t && (n += `:
` + t)), n;
  }, mark = f, mark;
}
var type$1, hasRequiredType$1;
function requireType$1() {
  if (hasRequiredType$1) return type$1;
  hasRequiredType$1 = 1;
  var i = requireException$1(), f = [
    "kind",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "defaultStyle",
    "styleAliases"
  ], d = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function s(n) {
    var e = {};
    return n !== null && Object.keys(n).forEach(function(u) {
      n[u].forEach(function(r) {
        e[String(r)] = u;
      });
    }), e;
  }
  function t(n, e) {
    if (e = e || {}, Object.keys(e).forEach(function(u) {
      if (f.indexOf(u) === -1)
        throw new i('Unknown option "' + u + '" is met in definition of "' + n + '" YAML type.');
    }), this.tag = n, this.kind = e.kind || null, this.resolve = e.resolve || function() {
      return !0;
    }, this.construct = e.construct || function(u) {
      return u;
    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.defaultStyle = e.defaultStyle || null, this.styleAliases = s(e.styleAliases || null), d.indexOf(this.kind) === -1)
      throw new i('Unknown kind "' + this.kind + '" is specified for "' + n + '" YAML type.');
  }
  return type$1 = t, type$1;
}
var schema$1, hasRequiredSchema$1;
function requireSchema$1() {
  if (hasRequiredSchema$1) return schema$1;
  hasRequiredSchema$1 = 1;
  var i = requireCommon$2(), f = requireException$1(), d = requireType$1();
  function s(e, u, r) {
    var o = [];
    return e.include.forEach(function(a) {
      r = s(a, u, r);
    }), e[u].forEach(function(a) {
      r.forEach(function(l, c) {
        l.tag === a.tag && l.kind === a.kind && o.push(c);
      }), r.push(a);
    }), r.filter(function(a, l) {
      return o.indexOf(l) === -1;
    });
  }
  function t() {
    var e = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {}
    }, u, r;
    function o(a) {
      e[a.kind][a.tag] = e.fallback[a.tag] = a;
    }
    for (u = 0, r = arguments.length; u < r; u += 1)
      arguments[u].forEach(o);
    return e;
  }
  function n(e) {
    this.include = e.include || [], this.implicit = e.implicit || [], this.explicit = e.explicit || [], this.implicit.forEach(function(u) {
      if (u.loadKind && u.loadKind !== "scalar")
        throw new f("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }), this.compiledImplicit = s(this, "implicit", []), this.compiledExplicit = s(this, "explicit", []), this.compiledTypeMap = t(this.compiledImplicit, this.compiledExplicit);
  }
  return n.DEFAULT = null, n.create = function() {
    var u, r;
    switch (arguments.length) {
      case 1:
        u = n.DEFAULT, r = arguments[0];
        break;
      case 2:
        u = arguments[0], r = arguments[1];
        break;
      default:
        throw new f("Wrong number of arguments for Schema.create function");
    }
    if (u = i.toArray(u), r = i.toArray(r), !u.every(function(o) {
      return o instanceof n;
    }))
      throw new f("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
    if (!r.every(function(o) {
      return o instanceof d;
    }))
      throw new f("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    return new n({
      include: u,
      explicit: r
    });
  }, schema$1 = n, schema$1;
}
var str$1, hasRequiredStr$1;
function requireStr$1() {
  if (hasRequiredStr$1) return str$1;
  hasRequiredStr$1 = 1;
  var i = requireType$1();
  return str$1 = new i("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(f) {
      return f !== null ? f : "";
    }
  }), str$1;
}
var seq$1, hasRequiredSeq$1;
function requireSeq$1() {
  if (hasRequiredSeq$1) return seq$1;
  hasRequiredSeq$1 = 1;
  var i = requireType$1();
  return seq$1 = new i("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(f) {
      return f !== null ? f : [];
    }
  }), seq$1;
}
var map$1, hasRequiredMap$1;
function requireMap$1() {
  if (hasRequiredMap$1) return map$1;
  hasRequiredMap$1 = 1;
  var i = requireType$1();
  return map$1 = new i("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(f) {
      return f !== null ? f : {};
    }
  }), map$1;
}
var failsafe$1, hasRequiredFailsafe$1;
function requireFailsafe$1() {
  if (hasRequiredFailsafe$1) return failsafe$1;
  hasRequiredFailsafe$1 = 1;
  var i = requireSchema$1();
  return failsafe$1 = new i({
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
  var i = requireType$1();
  function f(t) {
    if (t === null) return !0;
    var n = t.length;
    return n === 1 && t === "~" || n === 4 && (t === "null" || t === "Null" || t === "NULL");
  }
  function d() {
    return null;
  }
  function s(t) {
    return t === null;
  }
  return _null$1 = new i("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: s,
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
  var i = requireType$1();
  function f(t) {
    if (t === null) return !1;
    var n = t.length;
    return n === 4 && (t === "true" || t === "True" || t === "TRUE") || n === 5 && (t === "false" || t === "False" || t === "FALSE");
  }
  function d(t) {
    return t === "true" || t === "True" || t === "TRUE";
  }
  function s(t) {
    return Object.prototype.toString.call(t) === "[object Boolean]";
  }
  return bool$1 = new i("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: s,
    represent: {
      lowercase: function(t) {
        return t ? "true" : "false";
      },
      uppercase: function(t) {
        return t ? "TRUE" : "FALSE";
      },
      camelcase: function(t) {
        return t ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool$1;
}
var int$1, hasRequiredInt$1;
function requireInt$1() {
  if (hasRequiredInt$1) return int$1;
  hasRequiredInt$1 = 1;
  var i = requireCommon$2(), f = requireType$1();
  function d(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function s(r) {
    return 48 <= r && r <= 55;
  }
  function t(r) {
    return 48 <= r && r <= 57;
  }
  function n(r) {
    if (r === null) return !1;
    var o = r.length, a = 0, l = !1, c;
    if (!o) return !1;
    if (c = r[a], (c === "-" || c === "+") && (c = r[++a]), c === "0") {
      if (a + 1 === o) return !0;
      if (c = r[++a], c === "b") {
        for (a++; a < o; a++)
          if (c = r[a], c !== "_") {
            if (c !== "0" && c !== "1") return !1;
            l = !0;
          }
        return l && c !== "_";
      }
      if (c === "x") {
        for (a++; a < o; a++)
          if (c = r[a], c !== "_") {
            if (!d(r.charCodeAt(a))) return !1;
            l = !0;
          }
        return l && c !== "_";
      }
      for (; a < o; a++)
        if (c = r[a], c !== "_") {
          if (!s(r.charCodeAt(a))) return !1;
          l = !0;
        }
      return l && c !== "_";
    }
    if (c === "_") return !1;
    for (; a < o; a++)
      if (c = r[a], c !== "_") {
        if (c === ":") break;
        if (!t(r.charCodeAt(a)))
          return !1;
        l = !0;
      }
    return !l || c === "_" ? !1 : c !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(r.slice(a));
  }
  function e(r) {
    var o = r, a = 1, l, c, m = [];
    return o.indexOf("_") !== -1 && (o = o.replace(/_/g, "")), l = o[0], (l === "-" || l === "+") && (l === "-" && (a = -1), o = o.slice(1), l = o[0]), o === "0" ? 0 : l === "0" ? o[1] === "b" ? a * parseInt(o.slice(2), 2) : o[1] === "x" ? a * parseInt(o, 16) : a * parseInt(o, 8) : o.indexOf(":") !== -1 ? (o.split(":").forEach(function(y) {
      m.unshift(parseInt(y, 10));
    }), o = 0, c = 1, m.forEach(function(y) {
      o += y * c, c *= 60;
    }), a * o) : a * parseInt(o, 10);
  }
  function u(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !i.isNegativeZero(r);
  }
  return int$1 = new f("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: n,
    construct: e,
    predicate: u,
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
  var i = requireCommon$2(), f = requireType$1(), d = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function s(r) {
    return !(r === null || !d.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function t(r) {
    var o, a, l, c;
    return o = r.replace(/_/g, "").toLowerCase(), a = o[0] === "-" ? -1 : 1, c = [], "+-".indexOf(o[0]) >= 0 && (o = o.slice(1)), o === ".inf" ? a === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : o === ".nan" ? NaN : o.indexOf(":") >= 0 ? (o.split(":").forEach(function(m) {
      c.unshift(parseFloat(m, 10));
    }), o = 0, l = 1, c.forEach(function(m) {
      o += m * l, l *= 60;
    }), a * o) : a * parseFloat(o, 10);
  }
  var n = /^[-+]?[0-9]+e/;
  function e(r, o) {
    var a;
    if (isNaN(r))
      switch (o) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (o) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (o) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (i.isNegativeZero(r))
      return "-0.0";
    return a = r.toString(10), n.test(a) ? a.replace("e", ".e") : a;
  }
  function u(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || i.isNegativeZero(r));
  }
  return float$1 = new f("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: s,
    construct: t,
    predicate: u,
    represent: e,
    defaultStyle: "lowercase"
  }), float$1;
}
var json$2, hasRequiredJson$2;
function requireJson$2() {
  if (hasRequiredJson$2) return json$2;
  hasRequiredJson$2 = 1;
  var i = requireSchema$1();
  return json$2 = new i({
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
  var i = requireSchema$1();
  return core$1 = new i({
    include: [
      requireJson$2()
    ]
  }), core$1;
}
var timestamp$1, hasRequiredTimestamp$1;
function requireTimestamp$1() {
  if (hasRequiredTimestamp$1) return timestamp$1;
  hasRequiredTimestamp$1 = 1;
  var i = requireType$1(), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function s(e) {
    return e === null ? !1 : f.exec(e) !== null || d.exec(e) !== null;
  }
  function t(e) {
    var u, r, o, a, l, c, m, y = 0, v = null, g, q, A;
    if (u = f.exec(e), u === null && (u = d.exec(e)), u === null) throw new Error("Date resolve error");
    if (r = +u[1], o = +u[2] - 1, a = +u[3], !u[4])
      return new Date(Date.UTC(r, o, a));
    if (l = +u[4], c = +u[5], m = +u[6], u[7]) {
      for (y = u[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return u[9] && (g = +u[10], q = +(u[11] || 0), v = (g * 60 + q) * 6e4, u[9] === "-" && (v = -v)), A = new Date(Date.UTC(r, o, a, l, c, m, y)), v && A.setTime(A.getTime() - v), A;
  }
  function n(e) {
    return e.toISOString();
  }
  return timestamp$1 = new i("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: s,
    construct: t,
    instanceOf: Date,
    represent: n
  }), timestamp$1;
}
var merge$1, hasRequiredMerge$1;
function requireMerge$1() {
  if (hasRequiredMerge$1) return merge$1;
  hasRequiredMerge$1 = 1;
  var i = requireType$1();
  function f(d) {
    return d === "<<" || d === null;
  }
  return merge$1 = new i("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: f
  }), merge$1;
}
function commonjsRequire(i) {
  throw new Error('Could not dynamically require "' + i + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var binary$1, hasRequiredBinary$1;
function requireBinary$1() {
  if (hasRequiredBinary$1) return binary$1;
  hasRequiredBinary$1 = 1;
  var i;
  try {
    var f = commonjsRequire;
    i = f("buffer").Buffer;
  } catch {
  }
  var d = requireType$1(), s = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function t(r) {
    if (r === null) return !1;
    var o, a, l = 0, c = r.length, m = s;
    for (a = 0; a < c; a++)
      if (o = m.indexOf(r.charAt(a)), !(o > 64)) {
        if (o < 0) return !1;
        l += 6;
      }
    return l % 8 === 0;
  }
  function n(r) {
    var o, a, l = r.replace(/[\r\n=]/g, ""), c = l.length, m = s, y = 0, v = [];
    for (o = 0; o < c; o++)
      o % 4 === 0 && o && (v.push(y >> 16 & 255), v.push(y >> 8 & 255), v.push(y & 255)), y = y << 6 | m.indexOf(l.charAt(o));
    return a = c % 4 * 6, a === 0 ? (v.push(y >> 16 & 255), v.push(y >> 8 & 255), v.push(y & 255)) : a === 18 ? (v.push(y >> 10 & 255), v.push(y >> 2 & 255)) : a === 12 && v.push(y >> 4 & 255), i ? i.from ? i.from(v) : new i(v) : v;
  }
  function e(r) {
    var o = "", a = 0, l, c, m = r.length, y = s;
    for (l = 0; l < m; l++)
      l % 3 === 0 && l && (o += y[a >> 18 & 63], o += y[a >> 12 & 63], o += y[a >> 6 & 63], o += y[a & 63]), a = (a << 8) + r[l];
    return c = m % 3, c === 0 ? (o += y[a >> 18 & 63], o += y[a >> 12 & 63], o += y[a >> 6 & 63], o += y[a & 63]) : c === 2 ? (o += y[a >> 10 & 63], o += y[a >> 4 & 63], o += y[a << 2 & 63], o += y[64]) : c === 1 && (o += y[a >> 2 & 63], o += y[a << 4 & 63], o += y[64], o += y[64]), o;
  }
  function u(r) {
    return i && i.isBuffer(r);
  }
  return binary$1 = new d("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: t,
    construct: n,
    predicate: u,
    represent: e
  }), binary$1;
}
var omap$1, hasRequiredOmap$1;
function requireOmap$1() {
  if (hasRequiredOmap$1) return omap$1;
  hasRequiredOmap$1 = 1;
  var i = requireType$1(), f = Object.prototype.hasOwnProperty, d = Object.prototype.toString;
  function s(n) {
    if (n === null) return !0;
    var e = [], u, r, o, a, l, c = n;
    for (u = 0, r = c.length; u < r; u += 1) {
      if (o = c[u], l = !1, d.call(o) !== "[object Object]") return !1;
      for (a in o)
        if (f.call(o, a))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (e.indexOf(a) === -1) e.push(a);
      else return !1;
    }
    return !0;
  }
  function t(n) {
    return n !== null ? n : [];
  }
  return omap$1 = new i("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: s,
    construct: t
  }), omap$1;
}
var pairs$1, hasRequiredPairs$1;
function requirePairs$1() {
  if (hasRequiredPairs$1) return pairs$1;
  hasRequiredPairs$1 = 1;
  var i = requireType$1(), f = Object.prototype.toString;
  function d(t) {
    if (t === null) return !0;
    var n, e, u, r, o, a = t;
    for (o = new Array(a.length), n = 0, e = a.length; n < e; n += 1) {
      if (u = a[n], f.call(u) !== "[object Object]" || (r = Object.keys(u), r.length !== 1)) return !1;
      o[n] = [r[0], u[r[0]]];
    }
    return !0;
  }
  function s(t) {
    if (t === null) return [];
    var n, e, u, r, o, a = t;
    for (o = new Array(a.length), n = 0, e = a.length; n < e; n += 1)
      u = a[n], r = Object.keys(u), o[n] = [r[0], u[r[0]]];
    return o;
  }
  return pairs$1 = new i("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: d,
    construct: s
  }), pairs$1;
}
var set$1, hasRequiredSet$1;
function requireSet$1() {
  if (hasRequiredSet$1) return set$1;
  hasRequiredSet$1 = 1;
  var i = requireType$1(), f = Object.prototype.hasOwnProperty;
  function d(t) {
    if (t === null) return !0;
    var n, e = t;
    for (n in e)
      if (f.call(e, n) && e[n] !== null)
        return !1;
    return !0;
  }
  function s(t) {
    return t !== null ? t : {};
  }
  return set$1 = new i("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: d,
    construct: s
  }), set$1;
}
var default_safe, hasRequiredDefault_safe;
function requireDefault_safe() {
  if (hasRequiredDefault_safe) return default_safe;
  hasRequiredDefault_safe = 1;
  var i = requireSchema$1();
  return default_safe = new i({
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
  var i = requireType$1();
  function f() {
    return !0;
  }
  function d() {
  }
  function s() {
    return "";
  }
  function t(n) {
    return typeof n > "u";
  }
  return _undefined = new i("tag:yaml.org,2002:js/undefined", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: t,
    represent: s
  }), _undefined;
}
var regexp, hasRequiredRegexp;
function requireRegexp() {
  if (hasRequiredRegexp) return regexp;
  hasRequiredRegexp = 1;
  var i = requireType$1();
  function f(n) {
    if (n === null || n.length === 0) return !1;
    var e = n, u = /\/([gim]*)$/.exec(n), r = "";
    return !(e[0] === "/" && (u && (r = u[1]), r.length > 3 || e[e.length - r.length - 1] !== "/"));
  }
  function d(n) {
    var e = n, u = /\/([gim]*)$/.exec(n), r = "";
    return e[0] === "/" && (u && (r = u[1]), e = e.slice(1, e.length - r.length - 1)), new RegExp(e, r);
  }
  function s(n) {
    var e = "/" + n.source + "/";
    return n.global && (e += "g"), n.multiline && (e += "m"), n.ignoreCase && (e += "i"), e;
  }
  function t(n) {
    return Object.prototype.toString.call(n) === "[object RegExp]";
  }
  return regexp = new i("tag:yaml.org,2002:js/regexp", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: t,
    represent: s
  }), regexp;
}
var _function, hasRequired_function;
function require_function() {
  if (hasRequired_function) return _function;
  hasRequired_function = 1;
  var i;
  try {
    var f = commonjsRequire;
    i = f("esprima");
  } catch {
    typeof window < "u" && (i = window.esprima);
  }
  var d = requireType$1();
  function s(u) {
    if (u === null) return !1;
    try {
      var r = "(" + u + ")", o = i.parse(r, { range: !0 });
      return !(o.type !== "Program" || o.body.length !== 1 || o.body[0].type !== "ExpressionStatement" || o.body[0].expression.type !== "ArrowFunctionExpression" && o.body[0].expression.type !== "FunctionExpression");
    } catch {
      return !1;
    }
  }
  function t(u) {
    var r = "(" + u + ")", o = i.parse(r, { range: !0 }), a = [], l;
    if (o.type !== "Program" || o.body.length !== 1 || o.body[0].type !== "ExpressionStatement" || o.body[0].expression.type !== "ArrowFunctionExpression" && o.body[0].expression.type !== "FunctionExpression")
      throw new Error("Failed to resolve function");
    return o.body[0].expression.params.forEach(function(c) {
      a.push(c.name);
    }), l = o.body[0].expression.body.range, o.body[0].expression.body.type === "BlockStatement" ? new Function(a, r.slice(l[0] + 1, l[1] - 1)) : new Function(a, "return " + r.slice(l[0], l[1]));
  }
  function n(u) {
    return u.toString();
  }
  function e(u) {
    return Object.prototype.toString.call(u) === "[object Function]";
  }
  return _function = new d("tag:yaml.org,2002:js/function", {
    kind: "scalar",
    resolve: s,
    construct: t,
    predicate: e,
    represent: n
  }), _function;
}
var default_full, hasRequiredDefault_full;
function requireDefault_full() {
  if (hasRequiredDefault_full) return default_full;
  hasRequiredDefault_full = 1;
  var i = requireSchema$1();
  return default_full = i.DEFAULT = new i({
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
  var i = requireCommon$2(), f = requireException$1(), d = requireMark(), s = requireDefault_safe(), t = requireDefault_full(), n = Object.prototype.hasOwnProperty, e = 1, u = 2, r = 3, o = 4, a = 1, l = 2, c = 3, m = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, y = /[\x85\u2028\u2029]/, v = /[,\[\]\{\}]/, g = /^(?:!|!!|![a-z\-]+!)$/i, q = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function A(h) {
    return Object.prototype.toString.call(h);
  }
  function T(h) {
    return h === 10 || h === 13;
  }
  function F(h) {
    return h === 9 || h === 32;
  }
  function C(h) {
    return h === 9 || h === 32 || h === 10 || h === 13;
  }
  function D(h) {
    return h === 44 || h === 91 || h === 93 || h === 123 || h === 125;
  }
  function x(h) {
    var O;
    return 48 <= h && h <= 57 ? h - 48 : (O = h | 32, 97 <= O && O <= 102 ? O - 97 + 10 : -1);
  }
  function b(h) {
    return h === 120 ? 2 : h === 117 ? 4 : h === 85 ? 8 : 0;
  }
  function w(h) {
    return 48 <= h && h <= 57 ? h - 48 : -1;
  }
  function z(h) {
    return h === 48 ? "\0" : h === 97 ? "\x07" : h === 98 ? "\b" : h === 116 || h === 9 ? "	" : h === 110 ? `
` : h === 118 ? "\v" : h === 102 ? "\f" : h === 114 ? "\r" : h === 101 ? "\x1B" : h === 32 ? " " : h === 34 ? '"' : h === 47 ? "/" : h === 92 ? "\\" : h === 78 ? "" : h === 95 ? " " : h === 76 ? "\u2028" : h === 80 ? "\u2029" : "";
  }
  function J(h) {
    return h <= 65535 ? String.fromCharCode(h) : String.fromCharCode(
      (h - 65536 >> 10) + 55296,
      (h - 65536 & 1023) + 56320
    );
  }
  function H(h, O, j) {
    O === "__proto__" ? Object.defineProperty(h, O, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: j
    }) : h[O] = j;
  }
  for (var X = new Array(256), N = new Array(256), U = 0; U < 256; U++)
    X[U] = z(U) ? 1 : 0, N[U] = z(U);
  function ne(h, O) {
    this.input = h, this.filename = O.filename || null, this.schema = O.schema || t, this.onWarning = O.onWarning || null, this.legacy = O.legacy || !1, this.json = O.json || !1, this.listener = O.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = h.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
  }
  function L(h, O) {
    return new f(
      O,
      new d(h.filename, h.input, h.position, h.line, h.position - h.lineStart)
    );
  }
  function K(h, O) {
    throw L(h, O);
  }
  function ue(h, O) {
    h.onWarning && h.onWarning.call(null, L(h, O));
  }
  var fe = {
    YAML: function(O, j, Q) {
      var V, _, M;
      O.version !== null && K(O, "duplication of %YAML directive"), Q.length !== 1 && K(O, "YAML directive accepts exactly one argument"), V = /^([0-9]+)\.([0-9]+)$/.exec(Q[0]), V === null && K(O, "ill-formed argument of the YAML directive"), _ = parseInt(V[1], 10), M = parseInt(V[2], 10), _ !== 1 && K(O, "unacceptable YAML version of the document"), O.version = Q[0], O.checkLineBreaks = M < 2, M !== 1 && M !== 2 && ue(O, "unsupported YAML version of the document");
    },
    TAG: function(O, j, Q) {
      var V, _;
      Q.length !== 2 && K(O, "TAG directive accepts exactly two arguments"), V = Q[0], _ = Q[1], g.test(V) || K(O, "ill-formed tag handle (first argument) of the TAG directive"), n.call(O.tagMap, V) && K(O, 'there is a previously declared suffix for "' + V + '" tag handle'), q.test(_) || K(O, "ill-formed tag prefix (second argument) of the TAG directive"), O.tagMap[V] = _;
    }
  };
  function ge(h, O, j, Q) {
    var V, _, M, Z;
    if (O < j) {
      if (Z = h.input.slice(O, j), Q)
        for (V = 0, _ = Z.length; V < _; V += 1)
          M = Z.charCodeAt(V), M === 9 || 32 <= M && M <= 1114111 || K(h, "expected valid JSON character");
      else m.test(Z) && K(h, "the stream contains non-printable characters");
      h.result += Z;
    }
  }
  function de(h, O, j, Q) {
    var V, _, M, Z;
    for (i.isObject(j) || K(h, "cannot merge mappings; the provided source object is unacceptable"), V = Object.keys(j), M = 0, Z = V.length; M < Z; M += 1)
      _ = V[M], n.call(O, _) || (H(O, _, j[_]), Q[_] = !0);
  }
  function we(h, O, j, Q, V, _, M, Z) {
    var Y, E;
    if (Array.isArray(V))
      for (V = Array.prototype.slice.call(V), Y = 0, E = V.length; Y < E; Y += 1)
        Array.isArray(V[Y]) && K(h, "nested arrays are not supported inside keys"), typeof V == "object" && A(V[Y]) === "[object Object]" && (V[Y] = "[object Object]");
    if (typeof V == "object" && A(V) === "[object Object]" && (V = "[object Object]"), V = String(V), O === null && (O = {}), Q === "tag:yaml.org,2002:merge")
      if (Array.isArray(_))
        for (Y = 0, E = _.length; Y < E; Y += 1)
          de(h, O, _[Y], j);
      else
        de(h, O, _, j);
    else
      !h.json && !n.call(j, V) && n.call(O, V) && (h.line = M || h.line, h.position = Z || h.position, K(h, "duplicated mapping key")), H(O, V, _), delete j[V];
    return O;
  }
  function _e(h) {
    var O;
    O = h.input.charCodeAt(h.position), O === 10 ? h.position++ : O === 13 ? (h.position++, h.input.charCodeAt(h.position) === 10 && h.position++) : K(h, "a line break is expected"), h.line += 1, h.lineStart = h.position;
  }
  function ie(h, O, j) {
    for (var Q = 0, V = h.input.charCodeAt(h.position); V !== 0; ) {
      for (; F(V); )
        V = h.input.charCodeAt(++h.position);
      if (O && V === 35)
        do
          V = h.input.charCodeAt(++h.position);
        while (V !== 10 && V !== 13 && V !== 0);
      if (T(V))
        for (_e(h), V = h.input.charCodeAt(h.position), Q++, h.lineIndent = 0; V === 32; )
          h.lineIndent++, V = h.input.charCodeAt(++h.position);
      else
        break;
    }
    return j !== -1 && Q !== 0 && h.lineIndent < j && ue(h, "deficient indentation"), Q;
  }
  function Ee(h) {
    var O = h.position, j;
    return j = h.input.charCodeAt(O), !!((j === 45 || j === 46) && j === h.input.charCodeAt(O + 1) && j === h.input.charCodeAt(O + 2) && (O += 3, j = h.input.charCodeAt(O), j === 0 || C(j)));
  }
  function S(h, O) {
    O === 1 ? h.result += " " : O > 1 && (h.result += i.repeat(`
`, O - 1));
  }
  function R(h, O, j) {
    var Q, V, _, M, Z, Y, E, $, I = h.kind, G = h.result, B;
    if (B = h.input.charCodeAt(h.position), C(B) || D(B) || B === 35 || B === 38 || B === 42 || B === 33 || B === 124 || B === 62 || B === 39 || B === 34 || B === 37 || B === 64 || B === 96 || (B === 63 || B === 45) && (V = h.input.charCodeAt(h.position + 1), C(V) || j && D(V)))
      return !1;
    for (h.kind = "scalar", h.result = "", _ = M = h.position, Z = !1; B !== 0; ) {
      if (B === 58) {
        if (V = h.input.charCodeAt(h.position + 1), C(V) || j && D(V))
          break;
      } else if (B === 35) {
        if (Q = h.input.charCodeAt(h.position - 1), C(Q))
          break;
      } else {
        if (h.position === h.lineStart && Ee(h) || j && D(B))
          break;
        if (T(B))
          if (Y = h.line, E = h.lineStart, $ = h.lineIndent, ie(h, !1, -1), h.lineIndent >= O) {
            Z = !0, B = h.input.charCodeAt(h.position);
            continue;
          } else {
            h.position = M, h.line = Y, h.lineStart = E, h.lineIndent = $;
            break;
          }
      }
      Z && (ge(h, _, M, !1), S(h, h.line - Y), _ = M = h.position, Z = !1), F(B) || (M = h.position + 1), B = h.input.charCodeAt(++h.position);
    }
    return ge(h, _, M, !1), h.result ? !0 : (h.kind = I, h.result = G, !1);
  }
  function te(h, O) {
    var j, Q, V;
    if (j = h.input.charCodeAt(h.position), j !== 39)
      return !1;
    for (h.kind = "scalar", h.result = "", h.position++, Q = V = h.position; (j = h.input.charCodeAt(h.position)) !== 0; )
      if (j === 39)
        if (ge(h, Q, h.position, !0), j = h.input.charCodeAt(++h.position), j === 39)
          Q = h.position, h.position++, V = h.position;
        else
          return !0;
      else T(j) ? (ge(h, Q, V, !0), S(h, ie(h, !1, O)), Q = V = h.position) : h.position === h.lineStart && Ee(h) ? K(h, "unexpected end of the document within a single quoted scalar") : (h.position++, V = h.position);
    K(h, "unexpected end of the stream within a single quoted scalar");
  }
  function k(h, O) {
    var j, Q, V, _, M, Z;
    if (Z = h.input.charCodeAt(h.position), Z !== 34)
      return !1;
    for (h.kind = "scalar", h.result = "", h.position++, j = Q = h.position; (Z = h.input.charCodeAt(h.position)) !== 0; ) {
      if (Z === 34)
        return ge(h, j, h.position, !0), h.position++, !0;
      if (Z === 92) {
        if (ge(h, j, h.position, !0), Z = h.input.charCodeAt(++h.position), T(Z))
          ie(h, !1, O);
        else if (Z < 256 && X[Z])
          h.result += N[Z], h.position++;
        else if ((M = b(Z)) > 0) {
          for (V = M, _ = 0; V > 0; V--)
            Z = h.input.charCodeAt(++h.position), (M = x(Z)) >= 0 ? _ = (_ << 4) + M : K(h, "expected hexadecimal character");
          h.result += J(_), h.position++;
        } else
          K(h, "unknown escape sequence");
        j = Q = h.position;
      } else T(Z) ? (ge(h, j, Q, !0), S(h, ie(h, !1, O)), j = Q = h.position) : h.position === h.lineStart && Ee(h) ? K(h, "unexpected end of the document within a double quoted scalar") : (h.position++, Q = h.position);
    }
    K(h, "unexpected end of the stream within a double quoted scalar");
  }
  function pe(h, O) {
    var j = !0, Q, V = h.tag, _, M = h.anchor, Z, Y, E, $, I, G = {}, B, oe, ae, le;
    if (le = h.input.charCodeAt(h.position), le === 91)
      Y = 93, I = !1, _ = [];
    else if (le === 123)
      Y = 125, I = !0, _ = {};
    else
      return !1;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = _), le = h.input.charCodeAt(++h.position); le !== 0; ) {
      if (ie(h, !0, O), le = h.input.charCodeAt(h.position), le === Y)
        return h.position++, h.tag = V, h.anchor = M, h.kind = I ? "mapping" : "sequence", h.result = _, !0;
      j || K(h, "missed comma between flow collection entries"), oe = B = ae = null, E = $ = !1, le === 63 && (Z = h.input.charCodeAt(h.position + 1), C(Z) && (E = $ = !0, h.position++, ie(h, !0, O))), Q = h.line, Te(h, O, e, !1, !0), oe = h.tag, B = h.result, ie(h, !0, O), le = h.input.charCodeAt(h.position), ($ || h.line === Q) && le === 58 && (E = !0, le = h.input.charCodeAt(++h.position), ie(h, !0, O), Te(h, O, e, !1, !0), ae = h.result), I ? we(h, _, G, oe, B, ae) : E ? _.push(we(h, null, G, oe, B, ae)) : _.push(B), ie(h, !0, O), le = h.input.charCodeAt(h.position), le === 44 ? (j = !0, le = h.input.charCodeAt(++h.position)) : j = !1;
    }
    K(h, "unexpected end of the stream within a flow collection");
  }
  function ye(h, O) {
    var j, Q, V = a, _ = !1, M = !1, Z = O, Y = 0, E = !1, $, I;
    if (I = h.input.charCodeAt(h.position), I === 124)
      Q = !1;
    else if (I === 62)
      Q = !0;
    else
      return !1;
    for (h.kind = "scalar", h.result = ""; I !== 0; )
      if (I = h.input.charCodeAt(++h.position), I === 43 || I === 45)
        a === V ? V = I === 43 ? c : l : K(h, "repeat of a chomping mode identifier");
      else if (($ = w(I)) >= 0)
        $ === 0 ? K(h, "bad explicit indentation width of a block scalar; it cannot be less than one") : M ? K(h, "repeat of an indentation width identifier") : (Z = O + $ - 1, M = !0);
      else
        break;
    if (F(I)) {
      do
        I = h.input.charCodeAt(++h.position);
      while (F(I));
      if (I === 35)
        do
          I = h.input.charCodeAt(++h.position);
        while (!T(I) && I !== 0);
    }
    for (; I !== 0; ) {
      for (_e(h), h.lineIndent = 0, I = h.input.charCodeAt(h.position); (!M || h.lineIndent < Z) && I === 32; )
        h.lineIndent++, I = h.input.charCodeAt(++h.position);
      if (!M && h.lineIndent > Z && (Z = h.lineIndent), T(I)) {
        Y++;
        continue;
      }
      if (h.lineIndent < Z) {
        V === c ? h.result += i.repeat(`
`, _ ? 1 + Y : Y) : V === a && _ && (h.result += `
`);
        break;
      }
      for (Q ? F(I) ? (E = !0, h.result += i.repeat(`
`, _ ? 1 + Y : Y)) : E ? (E = !1, h.result += i.repeat(`
`, Y + 1)) : Y === 0 ? _ && (h.result += " ") : h.result += i.repeat(`
`, Y) : h.result += i.repeat(`
`, _ ? 1 + Y : Y), _ = !0, M = !0, Y = 0, j = h.position; !T(I) && I !== 0; )
        I = h.input.charCodeAt(++h.position);
      ge(h, j, h.position, !1);
    }
    return !0;
  }
  function ve(h, O) {
    var j, Q = h.tag, V = h.anchor, _ = [], M, Z = !1, Y;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = _), Y = h.input.charCodeAt(h.position); Y !== 0 && !(Y !== 45 || (M = h.input.charCodeAt(h.position + 1), !C(M))); ) {
      if (Z = !0, h.position++, ie(h, !0, -1) && h.lineIndent <= O) {
        _.push(null), Y = h.input.charCodeAt(h.position);
        continue;
      }
      if (j = h.line, Te(h, O, r, !1, !0), _.push(h.result), ie(h, !0, -1), Y = h.input.charCodeAt(h.position), (h.line === j || h.lineIndent > O) && Y !== 0)
        K(h, "bad indentation of a sequence entry");
      else if (h.lineIndent < O)
        break;
    }
    return Z ? (h.tag = Q, h.anchor = V, h.kind = "sequence", h.result = _, !0) : !1;
  }
  function qe(h, O, j) {
    var Q, V, _, M, Z = h.tag, Y = h.anchor, E = {}, $ = {}, I = null, G = null, B = null, oe = !1, ae = !1, le;
    for (h.anchor !== null && (h.anchorMap[h.anchor] = E), le = h.input.charCodeAt(h.position); le !== 0; ) {
      if (Q = h.input.charCodeAt(h.position + 1), _ = h.line, M = h.position, (le === 63 || le === 58) && C(Q))
        le === 63 ? (oe && (we(h, E, $, I, G, null), I = G = B = null), ae = !0, oe = !0, V = !0) : oe ? (oe = !1, V = !0) : K(h, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), h.position += 1, le = Q;
      else if (Te(h, j, u, !1, !0))
        if (h.line === _) {
          for (le = h.input.charCodeAt(h.position); F(le); )
            le = h.input.charCodeAt(++h.position);
          if (le === 58)
            le = h.input.charCodeAt(++h.position), C(le) || K(h, "a whitespace character is expected after the key-value separator within a block mapping"), oe && (we(h, E, $, I, G, null), I = G = B = null), ae = !0, oe = !1, V = !1, I = h.tag, G = h.result;
          else if (ae)
            K(h, "can not read an implicit mapping pair; a colon is missed");
          else
            return h.tag = Z, h.anchor = Y, !0;
        } else if (ae)
          K(h, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return h.tag = Z, h.anchor = Y, !0;
      else
        break;
      if ((h.line === _ || h.lineIndent > O) && (Te(h, O, o, !0, V) && (oe ? G = h.result : B = h.result), oe || (we(h, E, $, I, G, B, _, M), I = G = B = null), ie(h, !0, -1), le = h.input.charCodeAt(h.position)), h.lineIndent > O && le !== 0)
        K(h, "bad indentation of a mapping entry");
      else if (h.lineIndent < O)
        break;
    }
    return oe && we(h, E, $, I, G, null), ae && (h.tag = Z, h.anchor = Y, h.kind = "mapping", h.result = E), ae;
  }
  function Re(h) {
    var O, j = !1, Q = !1, V, _, M;
    if (M = h.input.charCodeAt(h.position), M !== 33) return !1;
    if (h.tag !== null && K(h, "duplication of a tag property"), M = h.input.charCodeAt(++h.position), M === 60 ? (j = !0, M = h.input.charCodeAt(++h.position)) : M === 33 ? (Q = !0, V = "!!", M = h.input.charCodeAt(++h.position)) : V = "!", O = h.position, j) {
      do
        M = h.input.charCodeAt(++h.position);
      while (M !== 0 && M !== 62);
      h.position < h.length ? (_ = h.input.slice(O, h.position), M = h.input.charCodeAt(++h.position)) : K(h, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; M !== 0 && !C(M); )
        M === 33 && (Q ? K(h, "tag suffix cannot contain exclamation marks") : (V = h.input.slice(O - 1, h.position + 1), g.test(V) || K(h, "named tag handle cannot contain such characters"), Q = !0, O = h.position + 1)), M = h.input.charCodeAt(++h.position);
      _ = h.input.slice(O, h.position), v.test(_) && K(h, "tag suffix cannot contain flow indicator characters");
    }
    return _ && !q.test(_) && K(h, "tag name cannot contain such characters: " + _), j ? h.tag = _ : n.call(h.tagMap, V) ? h.tag = h.tagMap[V] + _ : V === "!" ? h.tag = "!" + _ : V === "!!" ? h.tag = "tag:yaml.org,2002:" + _ : K(h, 'undeclared tag handle "' + V + '"'), !0;
  }
  function Fe(h) {
    var O, j;
    if (j = h.input.charCodeAt(h.position), j !== 38) return !1;
    for (h.anchor !== null && K(h, "duplication of an anchor property"), j = h.input.charCodeAt(++h.position), O = h.position; j !== 0 && !C(j) && !D(j); )
      j = h.input.charCodeAt(++h.position);
    return h.position === O && K(h, "name of an anchor node must contain at least one character"), h.anchor = h.input.slice(O, h.position), !0;
  }
  function be(h) {
    var O, j, Q;
    if (Q = h.input.charCodeAt(h.position), Q !== 42) return !1;
    for (Q = h.input.charCodeAt(++h.position), O = h.position; Q !== 0 && !C(Q) && !D(Q); )
      Q = h.input.charCodeAt(++h.position);
    return h.position === O && K(h, "name of an alias node must contain at least one character"), j = h.input.slice(O, h.position), n.call(h.anchorMap, j) || K(h, 'unidentified alias "' + j + '"'), h.result = h.anchorMap[j], ie(h, !0, -1), !0;
  }
  function Te(h, O, j, Q, V) {
    var _, M, Z, Y = 1, E = !1, $ = !1, I, G, B, oe, ae;
    if (h.listener !== null && h.listener("open", h), h.tag = null, h.anchor = null, h.kind = null, h.result = null, _ = M = Z = o === j || r === j, Q && ie(h, !0, -1) && (E = !0, h.lineIndent > O ? Y = 1 : h.lineIndent === O ? Y = 0 : h.lineIndent < O && (Y = -1)), Y === 1)
      for (; Re(h) || Fe(h); )
        ie(h, !0, -1) ? (E = !0, Z = _, h.lineIndent > O ? Y = 1 : h.lineIndent === O ? Y = 0 : h.lineIndent < O && (Y = -1)) : Z = !1;
    if (Z && (Z = E || V), (Y === 1 || o === j) && (e === j || u === j ? oe = O : oe = O + 1, ae = h.position - h.lineStart, Y === 1 ? Z && (ve(h, ae) || qe(h, ae, oe)) || pe(h, oe) ? $ = !0 : (M && ye(h, oe) || te(h, oe) || k(h, oe) ? $ = !0 : be(h) ? ($ = !0, (h.tag !== null || h.anchor !== null) && K(h, "alias node should not have any properties")) : R(h, oe, e === j) && ($ = !0, h.tag === null && (h.tag = "?")), h.anchor !== null && (h.anchorMap[h.anchor] = h.result)) : Y === 0 && ($ = Z && ve(h, ae))), h.tag !== null && h.tag !== "!")
      if (h.tag === "?") {
        for (h.result !== null && h.kind !== "scalar" && K(h, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + h.kind + '"'), I = 0, G = h.implicitTypes.length; I < G; I += 1)
          if (B = h.implicitTypes[I], B.resolve(h.result)) {
            h.result = B.construct(h.result), h.tag = B.tag, h.anchor !== null && (h.anchorMap[h.anchor] = h.result);
            break;
          }
      } else n.call(h.typeMap[h.kind || "fallback"], h.tag) ? (B = h.typeMap[h.kind || "fallback"][h.tag], h.result !== null && B.kind !== h.kind && K(h, "unacceptable node kind for !<" + h.tag + '> tag; it should be "' + B.kind + '", not "' + h.kind + '"'), B.resolve(h.result) ? (h.result = B.construct(h.result), h.anchor !== null && (h.anchorMap[h.anchor] = h.result)) : K(h, "cannot resolve a node with !<" + h.tag + "> explicit tag")) : K(h, "unknown tag !<" + h.tag + ">");
    return h.listener !== null && h.listener("close", h), h.tag !== null || h.anchor !== null || $;
  }
  function je(h) {
    var O = h.position, j, Q, V, _ = !1, M;
    for (h.version = null, h.checkLineBreaks = h.legacy, h.tagMap = {}, h.anchorMap = {}; (M = h.input.charCodeAt(h.position)) !== 0 && (ie(h, !0, -1), M = h.input.charCodeAt(h.position), !(h.lineIndent > 0 || M !== 37)); ) {
      for (_ = !0, M = h.input.charCodeAt(++h.position), j = h.position; M !== 0 && !C(M); )
        M = h.input.charCodeAt(++h.position);
      for (Q = h.input.slice(j, h.position), V = [], Q.length < 1 && K(h, "directive name must not be less than one character in length"); M !== 0; ) {
        for (; F(M); )
          M = h.input.charCodeAt(++h.position);
        if (M === 35) {
          do
            M = h.input.charCodeAt(++h.position);
          while (M !== 0 && !T(M));
          break;
        }
        if (T(M)) break;
        for (j = h.position; M !== 0 && !C(M); )
          M = h.input.charCodeAt(++h.position);
        V.push(h.input.slice(j, h.position));
      }
      M !== 0 && _e(h), n.call(fe, Q) ? fe[Q](h, Q, V) : ue(h, 'unknown document directive "' + Q + '"');
    }
    if (ie(h, !0, -1), h.lineIndent === 0 && h.input.charCodeAt(h.position) === 45 && h.input.charCodeAt(h.position + 1) === 45 && h.input.charCodeAt(h.position + 2) === 45 ? (h.position += 3, ie(h, !0, -1)) : _ && K(h, "directives end mark is expected"), Te(h, h.lineIndent - 1, o, !1, !0), ie(h, !0, -1), h.checkLineBreaks && y.test(h.input.slice(O, h.position)) && ue(h, "non-ASCII line breaks are interpreted as content"), h.documents.push(h.result), h.position === h.lineStart && Ee(h)) {
      h.input.charCodeAt(h.position) === 46 && (h.position += 3, ie(h, !0, -1));
      return;
    }
    if (h.position < h.length - 1)
      K(h, "end of the stream or a document separator is expected");
    else
      return;
  }
  function ke(h, O) {
    h = String(h), O = O || {}, h.length !== 0 && (h.charCodeAt(h.length - 1) !== 10 && h.charCodeAt(h.length - 1) !== 13 && (h += `
`), h.charCodeAt(0) === 65279 && (h = h.slice(1)));
    var j = new ne(h, O), Q = h.indexOf("\0");
    for (Q !== -1 && (j.position = Q, K(j, "null byte is not allowed in input")), j.input += "\0"; j.input.charCodeAt(j.position) === 32; )
      j.lineIndent += 1, j.position += 1;
    for (; j.position < j.length - 1; )
      je(j);
    return j.documents;
  }
  function Ue(h, O, j) {
    O !== null && typeof O == "object" && typeof j > "u" && (j = O, O = null);
    var Q = ke(h, j);
    if (typeof O != "function")
      return Q;
    for (var V = 0, _ = Q.length; V < _; V += 1)
      O(Q[V]);
  }
  function p(h, O) {
    var j = ke(h, O);
    if (j.length !== 0) {
      if (j.length === 1)
        return j[0];
      throw new f("expected a single document in the stream, but found more");
    }
  }
  function ee(h, O, j) {
    return typeof O == "object" && O !== null && typeof j > "u" && (j = O, O = null), Ue(h, O, i.extend({ schema: s }, j));
  }
  function se(h, O) {
    return p(h, i.extend({ schema: s }, O));
  }
  return loader$1.loadAll = Ue, loader$1.load = p, loader$1.safeLoadAll = ee, loader$1.safeLoad = se, loader$1;
}
var dumper$1 = {}, hasRequiredDumper$1;
function requireDumper$1() {
  if (hasRequiredDumper$1) return dumper$1;
  hasRequiredDumper$1 = 1;
  var i = requireCommon$2(), f = requireException$1(), d = requireDefault_full(), s = requireDefault_safe(), t = Object.prototype.toString, n = Object.prototype.hasOwnProperty, e = 9, u = 10, r = 13, o = 32, a = 33, l = 34, c = 35, m = 37, y = 38, v = 39, g = 42, q = 44, A = 45, T = 58, F = 61, C = 62, D = 63, x = 64, b = 91, w = 93, z = 96, J = 123, H = 124, X = 125, N = {};
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
    var Z, Y, E, $, I, G, B;
    if (M === null) return {};
    for (Z = {}, Y = Object.keys(M), E = 0, $ = Y.length; E < $; E += 1)
      I = Y[E], G = String(M[I]), I.slice(0, 2) === "!!" && (I = "tag:yaml.org,2002:" + I.slice(2)), B = _.compiledTypeMap.fallback[I], B && n.call(B.styleAliases, G) && (G = B.styleAliases[G]), Z[I] = G;
    return Z;
  }
  function L(_) {
    var M, Z, Y;
    if (M = _.toString(16).toUpperCase(), _ <= 255)
      Z = "x", Y = 2;
    else if (_ <= 65535)
      Z = "u", Y = 4;
    else if (_ <= 4294967295)
      Z = "U", Y = 8;
    else
      throw new f("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + Z + i.repeat("0", Y - M.length) + M;
  }
  function K(_) {
    this.schema = _.schema || d, this.indent = Math.max(1, _.indent || 2), this.noArrayIndent = _.noArrayIndent || !1, this.skipInvalid = _.skipInvalid || !1, this.flowLevel = i.isNothing(_.flowLevel) ? -1 : _.flowLevel, this.styleMap = ne(this.schema, _.styles || null), this.sortKeys = _.sortKeys || !1, this.lineWidth = _.lineWidth || 80, this.noRefs = _.noRefs || !1, this.noCompatMode = _.noCompatMode || !1, this.condenseFlow = _.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(_, M) {
    for (var Z = i.repeat(" ", M), Y = 0, E = -1, $ = "", I, G = _.length; Y < G; )
      E = _.indexOf(`
`, Y), E === -1 ? (I = _.slice(Y), Y = G) : (I = _.slice(Y, E + 1), Y = E + 1), I.length && I !== `
` && ($ += Z), $ += I;
    return $;
  }
  function fe(_, M) {
    return `
` + i.repeat(" ", _.indent * M);
  }
  function ge(_, M) {
    var Z, Y, E;
    for (Z = 0, Y = _.implicitTypes.length; Z < Y; Z += 1)
      if (E = _.implicitTypes[Z], E.resolve(M))
        return !0;
    return !1;
  }
  function de(_) {
    return _ === o || _ === e;
  }
  function we(_) {
    return 32 <= _ && _ <= 126 || 161 <= _ && _ <= 55295 && _ !== 8232 && _ !== 8233 || 57344 <= _ && _ <= 65533 && _ !== 65279 || 65536 <= _ && _ <= 1114111;
  }
  function _e(_) {
    return we(_) && !de(_) && _ !== 65279 && _ !== r && _ !== u;
  }
  function ie(_, M) {
    return we(_) && _ !== 65279 && _ !== q && _ !== b && _ !== w && _ !== J && _ !== X && _ !== T && (_ !== c || M && _e(M));
  }
  function Ee(_) {
    return we(_) && _ !== 65279 && !de(_) && _ !== A && _ !== D && _ !== T && _ !== q && _ !== b && _ !== w && _ !== J && _ !== X && _ !== c && _ !== y && _ !== g && _ !== a && _ !== H && _ !== F && _ !== C && _ !== v && _ !== l && _ !== m && _ !== x && _ !== z;
  }
  function S(_) {
    var M = /^\n* /;
    return M.test(_);
  }
  var R = 1, te = 2, k = 3, pe = 4, ye = 5;
  function ve(_, M, Z, Y, E) {
    var $, I, G, B = !1, oe = !1, ae = Y !== -1, le = -1, he = Ee(_.charCodeAt(0)) && !de(_.charCodeAt(_.length - 1));
    if (M)
      for ($ = 0; $ < _.length; $++) {
        if (I = _.charCodeAt($), !we(I))
          return ye;
        G = $ > 0 ? _.charCodeAt($ - 1) : null, he = he && ie(I, G);
      }
    else {
      for ($ = 0; $ < _.length; $++) {
        if (I = _.charCodeAt($), I === u)
          B = !0, ae && (oe = oe || // Foldable line = too long, and not more-indented.
          $ - le - 1 > Y && _[le + 1] !== " ", le = $);
        else if (!we(I))
          return ye;
        G = $ > 0 ? _.charCodeAt($ - 1) : null, he = he && ie(I, G);
      }
      oe = oe || ae && $ - le - 1 > Y && _[le + 1] !== " ";
    }
    return !B && !oe ? he && !E(_) ? R : te : Z > 9 && S(_) ? ye : oe ? pe : k;
  }
  function qe(_, M, Z, Y) {
    _.dump = (function() {
      if (M.length === 0)
        return "''";
      if (!_.noCompatMode && U.indexOf(M) !== -1)
        return "'" + M + "'";
      var E = _.indent * Math.max(1, Z), $ = _.lineWidth === -1 ? -1 : Math.max(Math.min(_.lineWidth, 40), _.lineWidth - E), I = Y || _.flowLevel > -1 && Z >= _.flowLevel;
      function G(B) {
        return ge(_, B);
      }
      switch (ve(M, I, _.indent, $, G)) {
        case R:
          return M;
        case te:
          return "'" + M.replace(/'/g, "''") + "'";
        case k:
          return "|" + Re(M, _.indent) + Fe(ue(M, E));
        case pe:
          return ">" + Re(M, _.indent) + Fe(ue(be(M, $), E));
        case ye:
          return '"' + je(M) + '"';
        default:
          throw new f("impossible error: invalid scalar style");
      }
    })();
  }
  function Re(_, M) {
    var Z = S(_) ? String(M) : "", Y = _[_.length - 1] === `
`, E = Y && (_[_.length - 2] === `
` || _ === `
`), $ = E ? "+" : Y ? "" : "-";
    return Z + $ + `
`;
  }
  function Fe(_) {
    return _[_.length - 1] === `
` ? _.slice(0, -1) : _;
  }
  function be(_, M) {
    for (var Z = /(\n+)([^\n]*)/g, Y = (function() {
      var oe = _.indexOf(`
`);
      return oe = oe !== -1 ? oe : _.length, Z.lastIndex = oe, Te(_.slice(0, oe), M);
    })(), E = _[0] === `
` || _[0] === " ", $, I; I = Z.exec(_); ) {
      var G = I[1], B = I[2];
      $ = B[0] === " ", Y += G + (!E && !$ && B !== "" ? `
` : "") + Te(B, M), E = $;
    }
    return Y;
  }
  function Te(_, M) {
    if (_ === "" || _[0] === " ") return _;
    for (var Z = / [^ ]/g, Y, E = 0, $, I = 0, G = 0, B = ""; Y = Z.exec(_); )
      G = Y.index, G - E > M && ($ = I > E ? I : G, B += `
` + _.slice(E, $), E = $ + 1), I = G;
    return B += `
`, _.length - E > M && I > E ? B += _.slice(E, I) + `
` + _.slice(I + 1) : B += _.slice(E), B.slice(1);
  }
  function je(_) {
    for (var M = "", Z, Y, E, $ = 0; $ < _.length; $++) {
      if (Z = _.charCodeAt($), Z >= 55296 && Z <= 56319 && (Y = _.charCodeAt($ + 1), Y >= 56320 && Y <= 57343)) {
        M += L((Z - 55296) * 1024 + Y - 56320 + 65536), $++;
        continue;
      }
      E = N[Z], M += !E && we(Z) ? _[$] : E || L(Z);
    }
    return M;
  }
  function ke(_, M, Z) {
    var Y = "", E = _.tag, $, I;
    for ($ = 0, I = Z.length; $ < I; $ += 1)
      h(_, M, Z[$], !1, !1) && ($ !== 0 && (Y += "," + (_.condenseFlow ? "" : " ")), Y += _.dump);
    _.tag = E, _.dump = "[" + Y + "]";
  }
  function Ue(_, M, Z, Y) {
    var E = "", $ = _.tag, I, G;
    for (I = 0, G = Z.length; I < G; I += 1)
      h(_, M + 1, Z[I], !0, !0) && ((!Y || I !== 0) && (E += fe(_, M)), _.dump && u === _.dump.charCodeAt(0) ? E += "-" : E += "- ", E += _.dump);
    _.tag = $, _.dump = E || "[]";
  }
  function p(_, M, Z) {
    var Y = "", E = _.tag, $ = Object.keys(Z), I, G, B, oe, ae;
    for (I = 0, G = $.length; I < G; I += 1)
      ae = "", I !== 0 && (ae += ", "), _.condenseFlow && (ae += '"'), B = $[I], oe = Z[B], h(_, M, B, !1, !1) && (_.dump.length > 1024 && (ae += "? "), ae += _.dump + (_.condenseFlow ? '"' : "") + ":" + (_.condenseFlow ? "" : " "), h(_, M, oe, !1, !1) && (ae += _.dump, Y += ae));
    _.tag = E, _.dump = "{" + Y + "}";
  }
  function ee(_, M, Z, Y) {
    var E = "", $ = _.tag, I = Object.keys(Z), G, B, oe, ae, le, he;
    if (_.sortKeys === !0)
      I.sort();
    else if (typeof _.sortKeys == "function")
      I.sort(_.sortKeys);
    else if (_.sortKeys)
      throw new f("sortKeys must be a boolean or a function");
    for (G = 0, B = I.length; G < B; G += 1)
      he = "", (!Y || G !== 0) && (he += fe(_, M)), oe = I[G], ae = Z[oe], h(_, M + 1, oe, !0, !0, !0) && (le = _.tag !== null && _.tag !== "?" || _.dump && _.dump.length > 1024, le && (_.dump && u === _.dump.charCodeAt(0) ? he += "?" : he += "? "), he += _.dump, le && (he += fe(_, M)), h(_, M + 1, ae, !0, le) && (_.dump && u === _.dump.charCodeAt(0) ? he += ":" : he += ": ", he += _.dump, E += he));
    _.tag = $, _.dump = E || "{}";
  }
  function se(_, M, Z) {
    var Y, E, $, I, G, B;
    for (E = Z ? _.explicitTypes : _.implicitTypes, $ = 0, I = E.length; $ < I; $ += 1)
      if (G = E[$], (G.instanceOf || G.predicate) && (!G.instanceOf || typeof M == "object" && M instanceof G.instanceOf) && (!G.predicate || G.predicate(M))) {
        if (_.tag = Z ? G.tag : "?", G.represent) {
          if (B = _.styleMap[G.tag] || G.defaultStyle, t.call(G.represent) === "[object Function]")
            Y = G.represent(M, B);
          else if (n.call(G.represent, B))
            Y = G.represent[B](M, B);
          else
            throw new f("!<" + G.tag + '> tag resolver accepts not "' + B + '" style');
          _.dump = Y;
        }
        return !0;
      }
    return !1;
  }
  function h(_, M, Z, Y, E, $) {
    _.tag = null, _.dump = Z, se(_, Z, !1) || se(_, Z, !0);
    var I = t.call(_.dump);
    Y && (Y = _.flowLevel < 0 || _.flowLevel > M);
    var G = I === "[object Object]" || I === "[object Array]", B, oe;
    if (G && (B = _.duplicates.indexOf(Z), oe = B !== -1), (_.tag !== null && _.tag !== "?" || oe || _.indent !== 2 && M > 0) && (E = !1), oe && _.usedDuplicates[B])
      _.dump = "*ref_" + B;
    else {
      if (G && oe && !_.usedDuplicates[B] && (_.usedDuplicates[B] = !0), I === "[object Object]")
        Y && Object.keys(_.dump).length !== 0 ? (ee(_, M, _.dump, E), oe && (_.dump = "&ref_" + B + _.dump)) : (p(_, M, _.dump), oe && (_.dump = "&ref_" + B + " " + _.dump));
      else if (I === "[object Array]") {
        var ae = _.noArrayIndent && M > 0 ? M - 1 : M;
        Y && _.dump.length !== 0 ? (Ue(_, ae, _.dump, E), oe && (_.dump = "&ref_" + B + _.dump)) : (ke(_, ae, _.dump), oe && (_.dump = "&ref_" + B + " " + _.dump));
      } else if (I === "[object String]")
        _.tag !== "?" && qe(_, _.dump, M, $);
      else {
        if (_.skipInvalid) return !1;
        throw new f("unacceptable kind of an object to dump " + I);
      }
      _.tag !== null && _.tag !== "?" && (_.dump = "!<" + _.tag + "> " + _.dump);
    }
    return !0;
  }
  function O(_, M) {
    var Z = [], Y = [], E, $;
    for (j(_, Z, Y), E = 0, $ = Y.length; E < $; E += 1)
      M.duplicates.push(Z[Y[E]]);
    M.usedDuplicates = new Array($);
  }
  function j(_, M, Z) {
    var Y, E, $;
    if (_ !== null && typeof _ == "object")
      if (E = M.indexOf(_), E !== -1)
        Z.indexOf(E) === -1 && Z.push(E);
      else if (M.push(_), Array.isArray(_))
        for (E = 0, $ = _.length; E < $; E += 1)
          j(_[E], M, Z);
      else
        for (Y = Object.keys(_), E = 0, $ = Y.length; E < $; E += 1)
          j(_[Y[E]], M, Z);
  }
  function Q(_, M) {
    M = M || {};
    var Z = new K(M);
    return Z.noRefs || O(_, Z), h(Z, 0, _, !0, !0) ? Z.dump + `
` : "";
  }
  function V(_, M) {
    return Q(_, i.extend({ schema: s }, M));
  }
  return dumper$1.dump = Q, dumper$1.safeDump = V, dumper$1;
}
var hasRequiredJsYaml$2;
function requireJsYaml$2() {
  if (hasRequiredJsYaml$2) return jsYaml$2;
  hasRequiredJsYaml$2 = 1;
  var i = requireLoader$1(), f = requireDumper$1();
  function d(s) {
    return function() {
      throw new Error("Function " + s + " is deprecated and cannot be used.");
    };
  }
  return jsYaml$2.Type = requireType$1(), jsYaml$2.Schema = requireSchema$1(), jsYaml$2.FAILSAFE_SCHEMA = requireFailsafe$1(), jsYaml$2.JSON_SCHEMA = requireJson$2(), jsYaml$2.CORE_SCHEMA = requireCore$1(), jsYaml$2.DEFAULT_SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_FULL_SCHEMA = requireDefault_full(), jsYaml$2.load = i.load, jsYaml$2.loadAll = i.loadAll, jsYaml$2.safeLoad = i.safeLoad, jsYaml$2.safeLoadAll = i.safeLoadAll, jsYaml$2.dump = f.dump, jsYaml$2.safeDump = f.safeDump, jsYaml$2.YAMLException = requireException$1(), jsYaml$2.MINIMAL_SCHEMA = requireFailsafe$1(), jsYaml$2.SAFE_SCHEMA = requireDefault_safe(), jsYaml$2.DEFAULT_SCHEMA = requireDefault_full(), jsYaml$2.scan = d("scan"), jsYaml$2.parse = d("parse"), jsYaml$2.compose = d("compose"), jsYaml$2.addConstructor = d("addConstructor"), jsYaml$2;
}
var jsYaml$1, hasRequiredJsYaml$1;
function requireJsYaml$1() {
  if (hasRequiredJsYaml$1) return jsYaml$1;
  hasRequiredJsYaml$1 = 1;
  var i = requireJsYaml$2();
  return jsYaml$1 = i, jsYaml$1;
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
      stringify: function(i, f) {
        const d = Object.assign({ replacer: null, space: 2 }, f);
        return JSON.stringify(i, d.replacer, d.space);
      }
    }, engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          return wrap !== !1 && (str = `(function() {
return ` + str.trim() + `;
}());`), eval(str) || {};
        } catch (i) {
          if (wrap !== !1 && /(unexpected|identifier)/i.test(i.message))
            return parse(str, options, !1);
          throw new SyntaxError(i);
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
  return hasRequiredStripBomString || (hasRequiredStripBomString = 1, stripBomString = function(i) {
    return typeof i == "string" && i.charAt(0) === "\uFEFF" ? i.slice(1) : i;
  }), stripBomString;
}
var hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, (function(i) {
    const f = requireStripBomString(), d = requireKindOf();
    i.define = function(s, t, n) {
      Reflect.defineProperty(s, t, {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: n
      });
    }, i.isBuffer = function(s) {
      return d(s) === "buffer";
    }, i.isObject = function(s) {
      return d(s) === "object";
    }, i.toBuffer = function(s) {
      return typeof s == "string" ? Buffer.from(s) : s;
    }, i.toString = function(s) {
      if (i.isBuffer(s)) return f(String(s));
      if (typeof s != "string")
        throw new TypeError("expected input to be a string or buffer");
      return f(s);
    }, i.arrayify = function(s) {
      return s ? Array.isArray(s) ? s : [s] : [];
    }, i.startsWith = function(s, t, n) {
      return typeof n != "number" && (n = t.length), s.slice(0, n) === t;
    };
  })(utils$2)), utils$2;
}
var defaults, hasRequiredDefaults;
function requireDefaults() {
  if (hasRequiredDefaults) return defaults;
  hasRequiredDefaults = 1;
  const i = requireEngines(), f = requireUtils$2();
  return defaults = function(d) {
    const s = Object.assign({}, d);
    return s.delimiters = f.arrayify(s.delims || s.delimiters || "---"), s.delimiters.length === 1 && s.delimiters.push(s.delimiters[0]), s.language = (s.language || s.lang || "yaml").toLowerCase(), s.engines = Object.assign({}, i, s.parsers, s.engines), s;
  }, defaults;
}
var engine, hasRequiredEngine;
function requireEngine() {
  if (hasRequiredEngine) return engine;
  hasRequiredEngine = 1, engine = function(f, d) {
    let s = d.engines[f] || d.engines[i(f)];
    if (typeof s > "u")
      throw new Error('gray-matter engine "' + f + '" is not registered');
    return typeof s == "function" && (s = { parse: s }), s;
  };
  function i(f) {
    switch (f.toLowerCase()) {
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
        return f;
    }
  }
  return engine;
}
var stringify, hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const i = requireKindOf(), f = requireEngine(), d = requireDefaults();
  stringify = function(t, n, e) {
    if (n == null && e == null)
      switch (i(t)) {
        case "object":
          n = t.data, e = {};
          break;
        case "string":
          return t;
        default:
          throw new TypeError("expected file to be a string or object");
      }
    const u = t.content, r = d(e);
    if (n == null) {
      if (!r.data) return t;
      n = r.data;
    }
    const o = t.language || r.language, a = f(o, r);
    if (typeof a.stringify != "function")
      throw new TypeError('expected "' + o + '.stringify" to be a function');
    n = Object.assign({}, t.data, n);
    const l = r.delimiters[0], c = r.delimiters[1], m = a.stringify(n, e).trim();
    let y = "";
    return m !== "{}" && (y = s(l) + s(m) + s(c)), typeof t.excerpt == "string" && t.excerpt !== "" && u.indexOf(t.excerpt.trim()) === -1 && (y += s(t.excerpt) + s(c)), y + s(u);
  };
  function s(t) {
    return t.slice(-1) !== `
` ? t + `
` : t;
  }
  return stringify;
}
var excerpt, hasRequiredExcerpt;
function requireExcerpt() {
  if (hasRequiredExcerpt) return excerpt;
  hasRequiredExcerpt = 1;
  const i = requireDefaults();
  return excerpt = function(f, d) {
    const s = i(d);
    if (f.data == null && (f.data = {}), typeof s.excerpt == "function")
      return s.excerpt(f, s);
    const t = f.data.excerpt_separator || s.excerpt_separator;
    if (t == null && (s.excerpt === !1 || s.excerpt == null))
      return f;
    const n = typeof s.excerpt == "string" ? s.excerpt : t || s.delimiters[0], e = f.content.indexOf(n);
    return e !== -1 && (f.excerpt = f.content.slice(0, e)), f;
  }, excerpt;
}
var toFile, hasRequiredToFile;
function requireToFile() {
  if (hasRequiredToFile) return toFile;
  hasRequiredToFile = 1;
  const i = requireKindOf(), f = requireStringify(), d = requireUtils$2();
  return toFile = function(s) {
    return i(s) !== "object" && (s = { content: s }), i(s.data) !== "object" && (s.data = {}), s.contents && s.content == null && (s.content = s.contents), d.define(s, "orig", d.toBuffer(s.content)), d.define(s, "language", s.language || ""), d.define(s, "matter", s.matter || ""), d.define(s, "stringify", function(t, n) {
      return n && n.language && (s.language = n.language), f(s, t, n);
    }), s.content = d.toString(s.content), s.isEmpty = !1, s.excerpt = "", s;
  }, toFile;
}
var parse, hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse;
  hasRequiredParse$1 = 1;
  const i = requireEngine(), f = requireDefaults();
  return parse = function(d, s, t) {
    const n = f(t), e = i(d, n);
    if (typeof e.parse != "function")
      throw new TypeError('expected "' + d + '.parse" to be a function');
    return e.parse(s, n);
  }, parse;
}
var grayMatter, hasRequiredGrayMatter;
function requireGrayMatter() {
  if (hasRequiredGrayMatter) return grayMatter;
  hasRequiredGrayMatter = 1;
  const i = require$$0, f = requireSectionMatter(), d = requireDefaults(), s = requireStringify(), t = requireExcerpt(), n = requireEngines(), e = requireToFile(), u = requireParse$1(), r = requireUtils$2();
  function o(l, c) {
    if (l === "")
      return { data: {}, content: l, excerpt: "", orig: l };
    let m = e(l);
    const y = o.cache[m.content];
    if (!c) {
      if (y)
        return m = Object.assign({}, y), m.orig = y.orig, m;
      o.cache[m.content] = m;
    }
    return a(m, c);
  }
  function a(l, c) {
    const m = d(c), y = m.delimiters[0], v = `
` + m.delimiters[1];
    let g = l.content;
    m.language && (l.language = m.language);
    const q = y.length;
    if (!r.startsWith(g, y, q))
      return t(l, m), l;
    if (g.charAt(q) === y.slice(-1))
      return l;
    g = g.slice(q);
    const A = g.length, T = o.language(g, m);
    T.name && (l.language = T.name, g = g.slice(T.raw.length));
    let F = g.indexOf(v);
    return F === -1 && (F = A), l.matter = g.slice(0, F), l.matter.replace(/^\s*#[^\n]+/gm, "").trim() === "" ? (l.isEmpty = !0, l.empty = l.content, l.data = {}) : l.data = u(l.language, l.matter, m), F === A ? l.content = "" : (l.content = g.slice(F + v.length), l.content[0] === "\r" && (l.content = l.content.slice(1)), l.content[0] === `
` && (l.content = l.content.slice(1))), t(l, m), (m.sections === !0 || typeof m.section == "function") && f(l, m.section), l;
  }
  return o.engines = n, o.stringify = function(l, c, m) {
    return typeof l == "string" && (l = o(l, m)), s(l, c, m);
  }, o.read = function(l, c) {
    const m = i.readFileSync(l, "utf8"), y = o(m, c);
    return y.path = l, y;
  }, o.test = function(l, c) {
    return r.startsWith(l, d(c).delimiters[0]);
  }, o.language = function(l, c) {
    const y = d(c).delimiters[0];
    o.test(l) && (l = l.slice(y.length));
    const v = l.slice(0, l.search(/\r?\n/));
    return {
      raw: v,
      name: v ? v.trim() : ""
    };
  }, o.cache = {}, o.clearCache = function() {
    o.cache = {};
  }, grayMatter = o, grayMatter;
}
var grayMatterExports = requireGrayMatter();
const matter = /* @__PURE__ */ getDefaultExportFromCjs(grayMatterExports);
var main$1 = {}, fs = {}, universalify = {}, hasRequiredUniversalify;
function requireUniversalify() {
  return hasRequiredUniversalify || (hasRequiredUniversalify = 1, universalify.fromCallback = function(i) {
    return Object.defineProperty(function(...f) {
      if (typeof f[f.length - 1] == "function") i.apply(this, f);
      else
        return new Promise((d, s) => {
          f.push((t, n) => t != null ? s(t) : d(n)), i.apply(this, f);
        });
    }, "name", { value: i.name });
  }, universalify.fromPromise = function(i) {
    return Object.defineProperty(function(...f) {
      const d = f[f.length - 1];
      if (typeof d != "function") return i.apply(this, f);
      f.pop(), i.apply(this, f).then((s) => d(null, s), d);
    }, "name", { value: i.name });
  }), universalify;
}
var polyfills, hasRequiredPolyfills;
function requirePolyfills() {
  if (hasRequiredPolyfills) return polyfills;
  hasRequiredPolyfills = 1;
  var i = require$$0$5, f = process.cwd, d = null, s = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return d || (d = f.call(process)), d;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var t = process.chdir;
    process.chdir = function(e) {
      d = null, t.call(process, e);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, t);
  }
  polyfills = n;
  function n(e) {
    i.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && u(e), e.lutimes || r(e), e.chown = l(e.chown), e.fchown = l(e.fchown), e.lchown = l(e.lchown), e.chmod = o(e.chmod), e.fchmod = o(e.fchmod), e.lchmod = o(e.lchmod), e.chownSync = c(e.chownSync), e.fchownSync = c(e.fchownSync), e.lchownSync = c(e.lchownSync), e.chmodSync = a(e.chmodSync), e.fchmodSync = a(e.fchmodSync), e.lchmodSync = a(e.lchmodSync), e.stat = m(e.stat), e.fstat = m(e.fstat), e.lstat = m(e.lstat), e.statSync = y(e.statSync), e.fstatSync = y(e.fstatSync), e.lstatSync = y(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(g, q, A) {
      A && process.nextTick(A);
    }, e.lchmodSync = function() {
    }), e.chown && !e.lchown && (e.lchown = function(g, q, A, T) {
      T && process.nextTick(T);
    }, e.lchownSync = function() {
    }), s === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : (function(g) {
      function q(A, T, F) {
        var C = Date.now(), D = 0;
        g(A, T, function x(b) {
          if (b && (b.code === "EACCES" || b.code === "EPERM" || b.code === "EBUSY") && Date.now() - C < 6e4) {
            setTimeout(function() {
              e.stat(T, function(w, z) {
                w && w.code === "ENOENT" ? g(A, T, x) : F(b);
              });
            }, D), D < 100 && (D += 10);
            return;
          }
          F && F(b);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(e.rename)), e.read = typeof e.read != "function" ? e.read : (function(g) {
      function q(A, T, F, C, D, x) {
        var b;
        if (x && typeof x == "function") {
          var w = 0;
          b = function(z, J, H) {
            if (z && z.code === "EAGAIN" && w < 10)
              return w++, g.call(e, A, T, F, C, D, b);
            x.apply(this, arguments);
          };
        }
        return g.call(e, A, T, F, C, D, b);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(q, g), q;
    })(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ (function(g) {
      return function(q, A, T, F, C) {
        for (var D = 0; ; )
          try {
            return g.call(e, q, A, T, F, C);
          } catch (x) {
            if (x.code === "EAGAIN" && D < 10) {
              D++;
              continue;
            }
            throw x;
          }
      };
    })(e.readSync);
    function u(g) {
      g.lchmod = function(q, A, T) {
        g.open(
          q,
          i.O_WRONLY | i.O_SYMLINK,
          A,
          function(F, C) {
            if (F) {
              T && T(F);
              return;
            }
            g.fchmod(C, A, function(D) {
              g.close(C, function(x) {
                T && T(D || x);
              });
            });
          }
        );
      }, g.lchmodSync = function(q, A) {
        var T = g.openSync(q, i.O_WRONLY | i.O_SYMLINK, A), F = !0, C;
        try {
          C = g.fchmodSync(T, A), F = !1;
        } finally {
          if (F)
            try {
              g.closeSync(T);
            } catch {
            }
          else
            g.closeSync(T);
        }
        return C;
      };
    }
    function r(g) {
      i.hasOwnProperty("O_SYMLINK") && g.futimes ? (g.lutimes = function(q, A, T, F) {
        g.open(q, i.O_SYMLINK, function(C, D) {
          if (C) {
            F && F(C);
            return;
          }
          g.futimes(D, A, T, function(x) {
            g.close(D, function(b) {
              F && F(x || b);
            });
          });
        });
      }, g.lutimesSync = function(q, A, T) {
        var F = g.openSync(q, i.O_SYMLINK), C, D = !0;
        try {
          C = g.futimesSync(F, A, T), D = !1;
        } finally {
          if (D)
            try {
              g.closeSync(F);
            } catch {
            }
          else
            g.closeSync(F);
        }
        return C;
      }) : g.futimes && (g.lutimes = function(q, A, T, F) {
        F && process.nextTick(F);
      }, g.lutimesSync = function() {
      });
    }
    function o(g) {
      return g && function(q, A, T) {
        return g.call(e, q, A, function(F) {
          v(F) && (F = null), T && T.apply(this, arguments);
        });
      };
    }
    function a(g) {
      return g && function(q, A) {
        try {
          return g.call(e, q, A);
        } catch (T) {
          if (!v(T)) throw T;
        }
      };
    }
    function l(g) {
      return g && function(q, A, T, F) {
        return g.call(e, q, A, T, function(C) {
          v(C) && (C = null), F && F.apply(this, arguments);
        });
      };
    }
    function c(g) {
      return g && function(q, A, T) {
        try {
          return g.call(e, q, A, T);
        } catch (F) {
          if (!v(F)) throw F;
        }
      };
    }
    function m(g) {
      return g && function(q, A, T) {
        typeof A == "function" && (T = A, A = null);
        function F(C, D) {
          D && (D.uid < 0 && (D.uid += 4294967296), D.gid < 0 && (D.gid += 4294967296)), T && T.apply(this, arguments);
        }
        return A ? g.call(e, q, A, F) : g.call(e, q, F);
      };
    }
    function y(g) {
      return g && function(q, A) {
        var T = A ? g.call(e, q, A) : g.call(e, q);
        return T && (T.uid < 0 && (T.uid += 4294967296), T.gid < 0 && (T.gid += 4294967296)), T;
      };
    }
    function v(g) {
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
  var i = require$$0$6.Stream;
  legacyStreams = f;
  function f(d) {
    return {
      ReadStream: s,
      WriteStream: t
    };
    function s(n, e) {
      if (!(this instanceof s)) return new s(n, e);
      i.call(this);
      var u = this;
      this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, e = e || {};
      for (var r = Object.keys(e), o = 0, a = r.length; o < a; o++) {
        var l = r[o];
        this[l] = e[l];
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
          u._read();
        });
        return;
      }
      d.open(this.path, this.flags, this.mode, function(c, m) {
        if (c) {
          u.emit("error", c), u.readable = !1;
          return;
        }
        u.fd = m, u.emit("open", m), u._read();
      });
    }
    function t(n, e) {
      if (!(this instanceof t)) return new t(n, e);
      i.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, e = e || {};
      for (var u = Object.keys(e), r = 0, o = u.length; r < o; r++) {
        var a = u[r];
        this[a] = e[a];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = d.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return legacyStreams;
}
var clone_1, hasRequiredClone;
function requireClone() {
  if (hasRequiredClone) return clone_1;
  hasRequiredClone = 1, clone_1 = f;
  var i = Object.getPrototypeOf || function(d) {
    return d.__proto__;
  };
  function f(d) {
    if (d === null || typeof d != "object")
      return d;
    if (d instanceof Object)
      var s = { __proto__: i(d) };
    else
      var s = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(d).forEach(function(t) {
      Object.defineProperty(s, t, Object.getOwnPropertyDescriptor(d, t));
    }), s;
  }
  return clone_1;
}
var gracefulFs, hasRequiredGracefulFs;
function requireGracefulFs() {
  if (hasRequiredGracefulFs) return gracefulFs;
  hasRequiredGracefulFs = 1;
  var i = require$$0, f = requirePolyfills(), d = requireLegacyStreams(), s = requireClone(), t = require$$0$2, n, e;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (n = /* @__PURE__ */ Symbol.for("graceful-fs.queue"), e = /* @__PURE__ */ Symbol.for("graceful-fs.previous")) : (n = "___graceful-fs.queue", e = "___graceful-fs.previous");
  function u() {
  }
  function r(g, q) {
    Object.defineProperty(g, n, {
      get: function() {
        return q;
      }
    });
  }
  var o = u;
  if (t.debuglog ? o = t.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (o = function() {
    var g = t.format.apply(t, arguments);
    g = "GFS4: " + g.split(/\n/).join(`
GFS4: `), console.error(g);
  }), !i[n]) {
    var a = commonjsGlobal[n] || [];
    r(i, a), i.close = (function(g) {
      function q(A, T) {
        return g.call(i, A, function(F) {
          F || y(), typeof T == "function" && T.apply(this, arguments);
        });
      }
      return Object.defineProperty(q, e, {
        value: g
      }), q;
    })(i.close), i.closeSync = (function(g) {
      function q(A) {
        g.apply(i, arguments), y();
      }
      return Object.defineProperty(q, e, {
        value: g
      }), q;
    })(i.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      o(i[n]), require$$5.equal(i[n].length, 0);
    });
  }
  commonjsGlobal[n] || r(commonjsGlobal, i[n]), gracefulFs = l(s(i)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !i.__patched && (gracefulFs = l(i), i.__patched = !0);
  function l(g) {
    f(g), g.gracefulify = l, g.createReadStream = ge, g.createWriteStream = de;
    var q = g.readFile;
    g.readFile = A;
    function A(ie, Ee, S) {
      return typeof Ee == "function" && (S = Ee, Ee = null), R(ie, Ee, S);
      function R(te, k, pe, ye) {
        return q(te, k, function(ve) {
          ve && (ve.code === "EMFILE" || ve.code === "ENFILE") ? c([R, [te, k, pe], ve, ye || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var T = g.writeFile;
    g.writeFile = F;
    function F(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return T(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? c([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    var C = g.appendFile;
    C && (g.appendFile = D);
    function D(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = null), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return C(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? c([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    var x = g.copyFile;
    x && (g.copyFile = b);
    function b(ie, Ee, S, R) {
      return typeof S == "function" && (R = S, S = 0), te(ie, Ee, S, R);
      function te(k, pe, ye, ve, qe) {
        return x(k, pe, ye, function(Re) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? c([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
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
          qe && (qe.code === "EMFILE" || qe.code === "ENFILE") ? c([
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
      var H = d(g);
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
        return we(k, pe, ye, function(Re, Fe) {
          Re && (Re.code === "EMFILE" || Re.code === "ENFILE") ? c([te, [k, pe, ye, ve], Re, qe || Date.now(), Date.now()]) : typeof ve == "function" && ve.apply(this, arguments);
        });
      }
    }
    return g;
  }
  function c(g) {
    o("ENQUEUE", g[0].name, g[1]), i[n].push(g), v();
  }
  var m;
  function y() {
    for (var g = Date.now(), q = 0; q < i[n].length; ++q)
      i[n][q].length > 2 && (i[n][q][3] = g, i[n][q][4] = g);
    v();
  }
  function v() {
    if (clearTimeout(m), m = void 0, i[n].length !== 0) {
      var g = i[n].shift(), q = g[0], A = g[1], T = g[2], F = g[3], C = g[4];
      if (F === void 0)
        o("RETRY", q.name, A), q.apply(null, A);
      else if (Date.now() - F >= 6e4) {
        o("TIMEOUT", q.name, A);
        var D = A.pop();
        typeof D == "function" && D.call(null, T);
      } else {
        var x = Date.now() - C, b = Math.max(C - F, 1), w = Math.min(b * 1.2, 100);
        x >= w ? (o("RETRY", q.name, A), q.apply(null, A.concat([F]))) : i[n].push(g);
      }
      m === void 0 && (m = setTimeout(v, 0));
    }
  }
  return gracefulFs;
}
var hasRequiredFs;
function requireFs() {
  return hasRequiredFs || (hasRequiredFs = 1, (function(i) {
    const f = requireUniversalify().fromCallback, d = requireGracefulFs(), s = [
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
    ].filter((t) => typeof d[t] == "function");
    Object.assign(i, d), s.forEach((t) => {
      i[t] = f(d[t]);
    }), i.exists = function(t, n) {
      return typeof n == "function" ? d.exists(t, n) : new Promise((e) => d.exists(t, e));
    }, i.read = function(t, n, e, u, r, o) {
      return typeof o == "function" ? d.read(t, n, e, u, r, o) : new Promise((a, l) => {
        d.read(t, n, e, u, r, (c, m, y) => {
          if (c) return l(c);
          a({ bytesRead: m, buffer: y });
        });
      });
    }, i.write = function(t, n, ...e) {
      return typeof e[e.length - 1] == "function" ? d.write(t, n, ...e) : new Promise((u, r) => {
        d.write(t, n, ...e, (o, a, l) => {
          if (o) return r(o);
          u({ bytesWritten: a, buffer: l });
        });
      });
    }, typeof d.writev == "function" && (i.writev = function(t, n, ...e) {
      return typeof e[e.length - 1] == "function" ? d.writev(t, n, ...e) : new Promise((u, r) => {
        d.writev(t, n, ...e, (o, a, l) => {
          if (o) return r(o);
          u({ bytesWritten: a, buffers: l });
        });
      });
    }), typeof d.realpath.native == "function" ? i.realpath.native = f(d.realpath.native) : process.emitWarning(
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
  const i = require$$1;
  return utils$1.checkPath = function(d) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(d.replace(i.parse(d).root, ""))) {
      const t = new Error(`Path contains invalid characters: ${d}`);
      throw t.code = "EINVAL", t;
    }
  }, utils$1;
}
var hasRequiredMakeDir;
function requireMakeDir() {
  if (hasRequiredMakeDir) return makeDir;
  hasRequiredMakeDir = 1;
  const i = /* @__PURE__ */ requireFs(), { checkPath: f } = /* @__PURE__ */ requireUtils$1(), d = (s) => {
    const t = { mode: 511 };
    return typeof s == "number" ? s : { ...t, ...s }.mode;
  };
  return makeDir.makeDir = async (s, t) => (f(s), i.mkdir(s, {
    mode: d(t),
    recursive: !0
  })), makeDir.makeDirSync = (s, t) => (f(s), i.mkdirSync(s, {
    mode: d(t),
    recursive: !0
  })), makeDir;
}
var mkdirs, hasRequiredMkdirs;
function requireMkdirs() {
  if (hasRequiredMkdirs) return mkdirs;
  hasRequiredMkdirs = 1;
  const i = requireUniversalify().fromPromise, { makeDir: f, makeDirSync: d } = /* @__PURE__ */ requireMakeDir(), s = i(f);
  return mkdirs = {
    mkdirs: s,
    mkdirsSync: d,
    // alias
    mkdirp: s,
    mkdirpSync: d,
    ensureDir: s,
    ensureDirSync: d
  }, mkdirs;
}
var pathExists_1, hasRequiredPathExists;
function requirePathExists() {
  if (hasRequiredPathExists) return pathExists_1;
  hasRequiredPathExists = 1;
  const i = requireUniversalify().fromPromise, f = /* @__PURE__ */ requireFs();
  function d(s) {
    return f.access(s).then(() => !0).catch(() => !1);
  }
  return pathExists_1 = {
    pathExists: i(d),
    pathExistsSync: f.existsSync
  }, pathExists_1;
}
var utimes, hasRequiredUtimes;
function requireUtimes() {
  if (hasRequiredUtimes) return utimes;
  hasRequiredUtimes = 1;
  const i = requireGracefulFs();
  function f(s, t, n, e) {
    i.open(s, "r+", (u, r) => {
      if (u) return e(u);
      i.futimes(r, t, n, (o) => {
        i.close(r, (a) => {
          e && e(o || a);
        });
      });
    });
  }
  function d(s, t, n) {
    const e = i.openSync(s, "r+");
    return i.futimesSync(e, t, n), i.closeSync(e);
  }
  return utimes = {
    utimesMillis: f,
    utimesMillisSync: d
  }, utimes;
}
var stat, hasRequiredStat;
function requireStat() {
  if (hasRequiredStat) return stat;
  hasRequiredStat = 1;
  const i = /* @__PURE__ */ requireFs(), f = require$$1, d = require$$0$2;
  function s(c, m, y) {
    const v = y.dereference ? (g) => i.stat(g, { bigint: !0 }) : (g) => i.lstat(g, { bigint: !0 });
    return Promise.all([
      v(c),
      v(m).catch((g) => {
        if (g.code === "ENOENT") return null;
        throw g;
      })
    ]).then(([g, q]) => ({ srcStat: g, destStat: q }));
  }
  function t(c, m, y) {
    let v;
    const g = y.dereference ? (A) => i.statSync(A, { bigint: !0 }) : (A) => i.lstatSync(A, { bigint: !0 }), q = g(c);
    try {
      v = g(m);
    } catch (A) {
      if (A.code === "ENOENT") return { srcStat: q, destStat: null };
      throw A;
    }
    return { srcStat: q, destStat: v };
  }
  function n(c, m, y, v, g) {
    d.callbackify(s)(c, m, v, (q, A) => {
      if (q) return g(q);
      const { srcStat: T, destStat: F } = A;
      if (F) {
        if (o(T, F)) {
          const C = f.basename(c), D = f.basename(m);
          return y === "move" && C !== D && C.toLowerCase() === D.toLowerCase() ? g(null, { srcStat: T, destStat: F, isChangingCase: !0 }) : g(new Error("Source and destination must not be the same."));
        }
        if (T.isDirectory() && !F.isDirectory())
          return g(new Error(`Cannot overwrite non-directory '${m}' with directory '${c}'.`));
        if (!T.isDirectory() && F.isDirectory())
          return g(new Error(`Cannot overwrite directory '${m}' with non-directory '${c}'.`));
      }
      return T.isDirectory() && a(c, m) ? g(new Error(l(c, m, y))) : g(null, { srcStat: T, destStat: F });
    });
  }
  function e(c, m, y, v) {
    const { srcStat: g, destStat: q } = t(c, m, v);
    if (q) {
      if (o(g, q)) {
        const A = f.basename(c), T = f.basename(m);
        if (y === "move" && A !== T && A.toLowerCase() === T.toLowerCase())
          return { srcStat: g, destStat: q, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (g.isDirectory() && !q.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${m}' with directory '${c}'.`);
      if (!g.isDirectory() && q.isDirectory())
        throw new Error(`Cannot overwrite directory '${m}' with non-directory '${c}'.`);
    }
    if (g.isDirectory() && a(c, m))
      throw new Error(l(c, m, y));
    return { srcStat: g, destStat: q };
  }
  function u(c, m, y, v, g) {
    const q = f.resolve(f.dirname(c)), A = f.resolve(f.dirname(y));
    if (A === q || A === f.parse(A).root) return g();
    i.stat(A, { bigint: !0 }, (T, F) => T ? T.code === "ENOENT" ? g() : g(T) : o(m, F) ? g(new Error(l(c, y, v))) : u(c, m, A, v, g));
  }
  function r(c, m, y, v) {
    const g = f.resolve(f.dirname(c)), q = f.resolve(f.dirname(y));
    if (q === g || q === f.parse(q).root) return;
    let A;
    try {
      A = i.statSync(q, { bigint: !0 });
    } catch (T) {
      if (T.code === "ENOENT") return;
      throw T;
    }
    if (o(m, A))
      throw new Error(l(c, y, v));
    return r(c, m, q, v);
  }
  function o(c, m) {
    return m.ino && m.dev && m.ino === c.ino && m.dev === c.dev;
  }
  function a(c, m) {
    const y = f.resolve(c).split(f.sep).filter((g) => g), v = f.resolve(m).split(f.sep).filter((g) => g);
    return y.reduce((g, q, A) => g && v[A] === q, !0);
  }
  function l(c, m, y) {
    return `Cannot ${y} '${c}' to a subdirectory of itself, '${m}'.`;
  }
  return stat = {
    checkPaths: n,
    checkPathsSync: e,
    checkParentPaths: u,
    checkParentPathsSync: r,
    isSrcSubdir: a,
    areIdentical: o
  }, stat;
}
var copy_1, hasRequiredCopy$1;
function requireCopy$1() {
  if (hasRequiredCopy$1) return copy_1;
  hasRequiredCopy$1 = 1;
  const i = requireGracefulFs(), f = require$$1, d = requireMkdirs().mkdirs, s = requirePathExists().pathExists, t = requireUtimes().utimesMillis, n = /* @__PURE__ */ requireStat();
  function e(J, H, X, N) {
    typeof X == "function" && !N ? (N = X, X = {}) : typeof X == "function" && (X = { filter: X }), N = N || function() {
    }, X = X || {}, X.clobber = "clobber" in X ? !!X.clobber : !0, X.overwrite = "overwrite" in X ? !!X.overwrite : X.clobber, X.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), n.checkPaths(J, H, "copy", X, (U, ne) => {
      if (U) return N(U);
      const { srcStat: L, destStat: K } = ne;
      n.checkParentPaths(J, L, H, "copy", (ue) => ue ? N(ue) : X.filter ? r(u, K, J, H, X, N) : u(K, J, H, X, N));
    });
  }
  function u(J, H, X, N, U) {
    const ne = f.dirname(X);
    s(ne, (L, K) => {
      if (L) return U(L);
      if (K) return a(J, H, X, N, U);
      d(ne, (ue) => ue ? U(ue) : a(J, H, X, N, U));
    });
  }
  function r(J, H, X, N, U, ne) {
    Promise.resolve(U.filter(X, N)).then((L) => L ? J(H, X, N, U, ne) : ne(), (L) => ne(L));
  }
  function o(J, H, X, N, U) {
    return N.filter ? r(a, J, H, X, N, U) : a(J, H, X, N, U);
  }
  function a(J, H, X, N, U) {
    (N.dereference ? i.stat : i.lstat)(H, (L, K) => L ? U(L) : K.isDirectory() ? F(K, J, H, X, N, U) : K.isFile() || K.isCharacterDevice() || K.isBlockDevice() ? l(K, J, H, X, N, U) : K.isSymbolicLink() ? w(J, H, X, N, U) : K.isSocket() ? U(new Error(`Cannot copy a socket file: ${H}`)) : K.isFIFO() ? U(new Error(`Cannot copy a FIFO pipe: ${H}`)) : U(new Error(`Unknown file: ${H}`)));
  }
  function l(J, H, X, N, U, ne) {
    return H ? c(J, X, N, U, ne) : m(J, X, N, U, ne);
  }
  function c(J, H, X, N, U) {
    if (N.overwrite)
      i.unlink(X, (ne) => ne ? U(ne) : m(J, H, X, N, U));
    else return N.errorOnExist ? U(new Error(`'${X}' already exists`)) : U();
  }
  function m(J, H, X, N, U) {
    i.copyFile(H, X, (ne) => ne ? U(ne) : N.preserveTimestamps ? y(J.mode, H, X, U) : A(X, J.mode, U));
  }
  function y(J, H, X, N) {
    return v(J) ? g(X, J, (U) => U ? N(U) : q(J, H, X, N)) : q(J, H, X, N);
  }
  function v(J) {
    return (J & 128) === 0;
  }
  function g(J, H, X) {
    return A(J, H | 128, X);
  }
  function q(J, H, X, N) {
    T(H, X, (U) => U ? N(U) : A(X, J, N));
  }
  function A(J, H, X) {
    return i.chmod(J, H, X);
  }
  function T(J, H, X) {
    i.stat(J, (N, U) => N ? X(N) : t(H, U.atime, U.mtime, X));
  }
  function F(J, H, X, N, U, ne) {
    return H ? D(X, N, U, ne) : C(J.mode, X, N, U, ne);
  }
  function C(J, H, X, N, U) {
    i.mkdir(X, (ne) => {
      if (ne) return U(ne);
      D(H, X, N, (L) => L ? U(L) : A(X, J, U));
    });
  }
  function D(J, H, X, N) {
    i.readdir(J, (U, ne) => U ? N(U) : x(ne, J, H, X, N));
  }
  function x(J, H, X, N, U) {
    const ne = J.pop();
    return ne ? b(J, ne, H, X, N, U) : U();
  }
  function b(J, H, X, N, U, ne) {
    const L = f.join(X, H), K = f.join(N, H);
    n.checkPaths(L, K, "copy", U, (ue, fe) => {
      if (ue) return ne(ue);
      const { destStat: ge } = fe;
      o(ge, L, K, U, (de) => de ? ne(de) : x(J, X, N, U, ne));
    });
  }
  function w(J, H, X, N, U) {
    i.readlink(H, (ne, L) => {
      if (ne) return U(ne);
      if (N.dereference && (L = f.resolve(process.cwd(), L)), J)
        i.readlink(X, (K, ue) => K ? K.code === "EINVAL" || K.code === "UNKNOWN" ? i.symlink(L, X, U) : U(K) : (N.dereference && (ue = f.resolve(process.cwd(), ue)), n.isSrcSubdir(L, ue) ? U(new Error(`Cannot copy '${L}' to a subdirectory of itself, '${ue}'.`)) : J.isDirectory() && n.isSrcSubdir(ue, L) ? U(new Error(`Cannot overwrite '${ue}' with '${L}'.`)) : z(L, X, U)));
      else
        return i.symlink(L, X, U);
    });
  }
  function z(J, H, X) {
    i.unlink(H, (N) => N ? X(N) : i.symlink(J, H, X));
  }
  return copy_1 = e, copy_1;
}
var copySync_1, hasRequiredCopySync;
function requireCopySync() {
  if (hasRequiredCopySync) return copySync_1;
  hasRequiredCopySync = 1;
  const i = requireGracefulFs(), f = require$$1, d = requireMkdirs().mkdirsSync, s = requireUtimes().utimesMillisSync, t = /* @__PURE__ */ requireStat();
  function n(x, b, w) {
    typeof w == "function" && (w = { filter: w }), w = w || {}, w.clobber = "clobber" in w ? !!w.clobber : !0, w.overwrite = "overwrite" in w ? !!w.overwrite : w.clobber, w.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: z, destStat: J } = t.checkPathsSync(x, b, "copy", w);
    return t.checkParentPathsSync(x, z, b, "copy"), e(J, x, b, w);
  }
  function e(x, b, w, z) {
    if (z.filter && !z.filter(b, w)) return;
    const J = f.dirname(w);
    return i.existsSync(J) || d(J), r(x, b, w, z);
  }
  function u(x, b, w, z) {
    if (!(z.filter && !z.filter(b, w)))
      return r(x, b, w, z);
  }
  function r(x, b, w, z) {
    const H = (z.dereference ? i.statSync : i.lstatSync)(b);
    if (H.isDirectory()) return q(H, x, b, w, z);
    if (H.isFile() || H.isCharacterDevice() || H.isBlockDevice()) return o(H, x, b, w, z);
    if (H.isSymbolicLink()) return C(x, b, w, z);
    throw H.isSocket() ? new Error(`Cannot copy a socket file: ${b}`) : H.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${b}`) : new Error(`Unknown file: ${b}`);
  }
  function o(x, b, w, z, J) {
    return b ? a(x, w, z, J) : l(x, w, z, J);
  }
  function a(x, b, w, z) {
    if (z.overwrite)
      return i.unlinkSync(w), l(x, b, w, z);
    if (z.errorOnExist)
      throw new Error(`'${w}' already exists`);
  }
  function l(x, b, w, z) {
    return i.copyFileSync(b, w), z.preserveTimestamps && c(x.mode, b, w), v(w, x.mode);
  }
  function c(x, b, w) {
    return m(x) && y(w, x), g(b, w);
  }
  function m(x) {
    return (x & 128) === 0;
  }
  function y(x, b) {
    return v(x, b | 128);
  }
  function v(x, b) {
    return i.chmodSync(x, b);
  }
  function g(x, b) {
    const w = i.statSync(x);
    return s(b, w.atime, w.mtime);
  }
  function q(x, b, w, z, J) {
    return b ? T(w, z, J) : A(x.mode, w, z, J);
  }
  function A(x, b, w, z) {
    return i.mkdirSync(w), T(b, w, z), v(w, x);
  }
  function T(x, b, w) {
    i.readdirSync(x).forEach((z) => F(z, x, b, w));
  }
  function F(x, b, w, z) {
    const J = f.join(b, x), H = f.join(w, x), { destStat: X } = t.checkPathsSync(J, H, "copy", z);
    return u(X, J, H, z);
  }
  function C(x, b, w, z) {
    let J = i.readlinkSync(b);
    if (z.dereference && (J = f.resolve(process.cwd(), J)), x) {
      let H;
      try {
        H = i.readlinkSync(w);
      } catch (X) {
        if (X.code === "EINVAL" || X.code === "UNKNOWN") return i.symlinkSync(J, w);
        throw X;
      }
      if (z.dereference && (H = f.resolve(process.cwd(), H)), t.isSrcSubdir(J, H))
        throw new Error(`Cannot copy '${J}' to a subdirectory of itself, '${H}'.`);
      if (i.statSync(w).isDirectory() && t.isSrcSubdir(H, J))
        throw new Error(`Cannot overwrite '${H}' with '${J}'.`);
      return D(J, w);
    } else
      return i.symlinkSync(J, w);
  }
  function D(x, b) {
    return i.unlinkSync(b), i.symlinkSync(x, b);
  }
  return copySync_1 = n, copySync_1;
}
var copy, hasRequiredCopy;
function requireCopy() {
  if (hasRequiredCopy) return copy;
  hasRequiredCopy = 1;
  const i = requireUniversalify().fromCallback;
  return copy = {
    copy: i(/* @__PURE__ */ requireCopy$1()),
    copySync: /* @__PURE__ */ requireCopySync()
  }, copy;
}
var rimraf_1, hasRequiredRimraf;
function requireRimraf() {
  if (hasRequiredRimraf) return rimraf_1;
  hasRequiredRimraf = 1;
  const i = requireGracefulFs(), f = require$$1, d = require$$5, s = process.platform === "win32";
  function t(y) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((g) => {
      y[g] = y[g] || i[g], g = g + "Sync", y[g] = y[g] || i[g];
    }), y.maxBusyTries = y.maxBusyTries || 3;
  }
  function n(y, v, g) {
    let q = 0;
    typeof v == "function" && (g = v, v = {}), d(y, "rimraf: missing path"), d.strictEqual(typeof y, "string", "rimraf: path should be a string"), d.strictEqual(typeof g, "function", "rimraf: callback function required"), d(v, "rimraf: invalid options argument provided"), d.strictEqual(typeof v, "object", "rimraf: options should be object"), t(v), e(y, v, function A(T) {
      if (T) {
        if ((T.code === "EBUSY" || T.code === "ENOTEMPTY" || T.code === "EPERM") && q < v.maxBusyTries) {
          q++;
          const F = q * 100;
          return setTimeout(() => e(y, v, A), F);
        }
        T.code === "ENOENT" && (T = null);
      }
      g(T);
    });
  }
  function e(y, v, g) {
    d(y), d(v), d(typeof g == "function"), v.lstat(y, (q, A) => {
      if (q && q.code === "ENOENT")
        return g(null);
      if (q && q.code === "EPERM" && s)
        return u(y, v, q, g);
      if (A && A.isDirectory())
        return o(y, v, q, g);
      v.unlink(y, (T) => {
        if (T) {
          if (T.code === "ENOENT")
            return g(null);
          if (T.code === "EPERM")
            return s ? u(y, v, T, g) : o(y, v, T, g);
          if (T.code === "EISDIR")
            return o(y, v, T, g);
        }
        return g(T);
      });
    });
  }
  function u(y, v, g, q) {
    d(y), d(v), d(typeof q == "function"), v.chmod(y, 438, (A) => {
      A ? q(A.code === "ENOENT" ? null : g) : v.stat(y, (T, F) => {
        T ? q(T.code === "ENOENT" ? null : g) : F.isDirectory() ? o(y, v, g, q) : v.unlink(y, q);
      });
    });
  }
  function r(y, v, g) {
    let q;
    d(y), d(v);
    try {
      v.chmodSync(y, 438);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw g;
    }
    try {
      q = v.statSync(y);
    } catch (A) {
      if (A.code === "ENOENT")
        return;
      throw g;
    }
    q.isDirectory() ? c(y, v, g) : v.unlinkSync(y);
  }
  function o(y, v, g, q) {
    d(y), d(v), d(typeof q == "function"), v.rmdir(y, (A) => {
      A && (A.code === "ENOTEMPTY" || A.code === "EEXIST" || A.code === "EPERM") ? a(y, v, q) : A && A.code === "ENOTDIR" ? q(g) : q(A);
    });
  }
  function a(y, v, g) {
    d(y), d(v), d(typeof g == "function"), v.readdir(y, (q, A) => {
      if (q) return g(q);
      let T = A.length, F;
      if (T === 0) return v.rmdir(y, g);
      A.forEach((C) => {
        n(f.join(y, C), v, (D) => {
          if (!F) {
            if (D) return g(F = D);
            --T === 0 && v.rmdir(y, g);
          }
        });
      });
    });
  }
  function l(y, v) {
    let g;
    v = v || {}, t(v), d(y, "rimraf: missing path"), d.strictEqual(typeof y, "string", "rimraf: path should be a string"), d(v, "rimraf: missing options"), d.strictEqual(typeof v, "object", "rimraf: options should be object");
    try {
      g = v.lstatSync(y);
    } catch (q) {
      if (q.code === "ENOENT")
        return;
      q.code === "EPERM" && s && r(y, v, q);
    }
    try {
      g && g.isDirectory() ? c(y, v, null) : v.unlinkSync(y);
    } catch (q) {
      if (q.code === "ENOENT")
        return;
      if (q.code === "EPERM")
        return s ? r(y, v, q) : c(y, v, q);
      if (q.code !== "EISDIR")
        throw q;
      c(y, v, q);
    }
  }
  function c(y, v, g) {
    d(y), d(v);
    try {
      v.rmdirSync(y);
    } catch (q) {
      if (q.code === "ENOTDIR")
        throw g;
      if (q.code === "ENOTEMPTY" || q.code === "EEXIST" || q.code === "EPERM")
        m(y, v);
      else if (q.code !== "ENOENT")
        throw q;
    }
  }
  function m(y, v) {
    if (d(y), d(v), v.readdirSync(y).forEach((g) => l(f.join(y, g), v)), s) {
      const g = Date.now();
      do
        try {
          return v.rmdirSync(y, v);
        } catch {
        }
      while (Date.now() - g < 500);
    } else
      return v.rmdirSync(y, v);
  }
  return rimraf_1 = n, n.sync = l, rimraf_1;
}
var remove_1, hasRequiredRemove;
function requireRemove() {
  if (hasRequiredRemove) return remove_1;
  hasRequiredRemove = 1;
  const i = requireGracefulFs(), f = requireUniversalify().fromCallback, d = /* @__PURE__ */ requireRimraf();
  function s(n, e) {
    if (i.rm) return i.rm(n, { recursive: !0, force: !0 }, e);
    d(n, e);
  }
  function t(n) {
    if (i.rmSync) return i.rmSync(n, { recursive: !0, force: !0 });
    d.sync(n);
  }
  return remove_1 = {
    remove: f(s),
    removeSync: t
  }, remove_1;
}
var empty, hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  const i = requireUniversalify().fromPromise, f = /* @__PURE__ */ requireFs(), d = require$$1, s = /* @__PURE__ */ requireMkdirs(), t = /* @__PURE__ */ requireRemove(), n = i(async function(r) {
    let o;
    try {
      o = await f.readdir(r);
    } catch {
      return s.mkdirs(r);
    }
    return Promise.all(o.map((a) => t.remove(d.join(r, a))));
  });
  function e(u) {
    let r;
    try {
      r = f.readdirSync(u);
    } catch {
      return s.mkdirsSync(u);
    }
    r.forEach((o) => {
      o = d.join(u, o), t.removeSync(o);
    });
  }
  return empty = {
    emptyDirSync: e,
    emptydirSync: e,
    emptyDir: n,
    emptydir: n
  }, empty;
}
var file, hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const i = requireUniversalify().fromCallback, f = require$$1, d = requireGracefulFs(), s = /* @__PURE__ */ requireMkdirs();
  function t(e, u) {
    function r() {
      d.writeFile(e, "", (o) => {
        if (o) return u(o);
        u();
      });
    }
    d.stat(e, (o, a) => {
      if (!o && a.isFile()) return u();
      const l = f.dirname(e);
      d.stat(l, (c, m) => {
        if (c)
          return c.code === "ENOENT" ? s.mkdirs(l, (y) => {
            if (y) return u(y);
            r();
          }) : u(c);
        m.isDirectory() ? r() : d.readdir(l, (y) => {
          if (y) return u(y);
        });
      });
    });
  }
  function n(e) {
    let u;
    try {
      u = d.statSync(e);
    } catch {
    }
    if (u && u.isFile()) return;
    const r = f.dirname(e);
    try {
      d.statSync(r).isDirectory() || d.readdirSync(r);
    } catch (o) {
      if (o && o.code === "ENOENT") s.mkdirsSync(r);
      else throw o;
    }
    d.writeFileSync(e, "");
  }
  return file = {
    createFile: i(t),
    createFileSync: n
  }, file;
}
var link, hasRequiredLink;
function requireLink() {
  if (hasRequiredLink) return link;
  hasRequiredLink = 1;
  const i = requireUniversalify().fromCallback, f = require$$1, d = requireGracefulFs(), s = /* @__PURE__ */ requireMkdirs(), t = requirePathExists().pathExists, { areIdentical: n } = /* @__PURE__ */ requireStat();
  function e(r, o, a) {
    function l(c, m) {
      d.link(c, m, (y) => {
        if (y) return a(y);
        a(null);
      });
    }
    d.lstat(o, (c, m) => {
      d.lstat(r, (y, v) => {
        if (y)
          return y.message = y.message.replace("lstat", "ensureLink"), a(y);
        if (m && n(v, m)) return a(null);
        const g = f.dirname(o);
        t(g, (q, A) => {
          if (q) return a(q);
          if (A) return l(r, o);
          s.mkdirs(g, (T) => {
            if (T) return a(T);
            l(r, o);
          });
        });
      });
    });
  }
  function u(r, o) {
    let a;
    try {
      a = d.lstatSync(o);
    } catch {
    }
    try {
      const m = d.lstatSync(r);
      if (a && n(m, a)) return;
    } catch (m) {
      throw m.message = m.message.replace("lstat", "ensureLink"), m;
    }
    const l = f.dirname(o);
    return d.existsSync(l) || s.mkdirsSync(l), d.linkSync(r, o);
  }
  return link = {
    createLink: i(e),
    createLinkSync: u
  }, link;
}
var symlinkPaths_1, hasRequiredSymlinkPaths;
function requireSymlinkPaths() {
  if (hasRequiredSymlinkPaths) return symlinkPaths_1;
  hasRequiredSymlinkPaths = 1;
  const i = require$$1, f = requireGracefulFs(), d = requirePathExists().pathExists;
  function s(n, e, u) {
    if (i.isAbsolute(n))
      return f.lstat(n, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), u(r)) : u(null, {
        toCwd: n,
        toDst: n
      }));
    {
      const r = i.dirname(e), o = i.join(r, n);
      return d(o, (a, l) => a ? u(a) : l ? u(null, {
        toCwd: o,
        toDst: n
      }) : f.lstat(n, (c) => c ? (c.message = c.message.replace("lstat", "ensureSymlink"), u(c)) : u(null, {
        toCwd: n,
        toDst: i.relative(r, n)
      })));
    }
  }
  function t(n, e) {
    let u;
    if (i.isAbsolute(n)) {
      if (u = f.existsSync(n), !u) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: n,
        toDst: n
      };
    } else {
      const r = i.dirname(e), o = i.join(r, n);
      if (u = f.existsSync(o), u)
        return {
          toCwd: o,
          toDst: n
        };
      if (u = f.existsSync(n), !u) throw new Error("relative srcpath does not exist");
      return {
        toCwd: n,
        toDst: i.relative(r, n)
      };
    }
  }
  return symlinkPaths_1 = {
    symlinkPaths: s,
    symlinkPathsSync: t
  }, symlinkPaths_1;
}
var symlinkType_1, hasRequiredSymlinkType;
function requireSymlinkType() {
  if (hasRequiredSymlinkType) return symlinkType_1;
  hasRequiredSymlinkType = 1;
  const i = requireGracefulFs();
  function f(s, t, n) {
    if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
    i.lstat(s, (e, u) => {
      if (e) return n(null, "file");
      t = u && u.isDirectory() ? "dir" : "file", n(null, t);
    });
  }
  function d(s, t) {
    let n;
    if (t) return t;
    try {
      n = i.lstatSync(s);
    } catch {
      return "file";
    }
    return n && n.isDirectory() ? "dir" : "file";
  }
  return symlinkType_1 = {
    symlinkType: f,
    symlinkTypeSync: d
  }, symlinkType_1;
}
var symlink, hasRequiredSymlink;
function requireSymlink() {
  if (hasRequiredSymlink) return symlink;
  hasRequiredSymlink = 1;
  const i = requireUniversalify().fromCallback, f = require$$1, d = /* @__PURE__ */ requireFs(), s = /* @__PURE__ */ requireMkdirs(), t = s.mkdirs, n = s.mkdirsSync, e = /* @__PURE__ */ requireSymlinkPaths(), u = e.symlinkPaths, r = e.symlinkPathsSync, o = /* @__PURE__ */ requireSymlinkType(), a = o.symlinkType, l = o.symlinkTypeSync, c = requirePathExists().pathExists, { areIdentical: m } = /* @__PURE__ */ requireStat();
  function y(q, A, T, F) {
    F = typeof T == "function" ? T : F, T = typeof T == "function" ? !1 : T, d.lstat(A, (C, D) => {
      !C && D.isSymbolicLink() ? Promise.all([
        d.stat(q),
        d.stat(A)
      ]).then(([x, b]) => {
        if (m(x, b)) return F(null);
        v(q, A, T, F);
      }) : v(q, A, T, F);
    });
  }
  function v(q, A, T, F) {
    u(q, A, (C, D) => {
      if (C) return F(C);
      q = D.toDst, a(D.toCwd, T, (x, b) => {
        if (x) return F(x);
        const w = f.dirname(A);
        c(w, (z, J) => {
          if (z) return F(z);
          if (J) return d.symlink(q, A, b, F);
          t(w, (H) => {
            if (H) return F(H);
            d.symlink(q, A, b, F);
          });
        });
      });
    });
  }
  function g(q, A, T) {
    let F;
    try {
      F = d.lstatSync(A);
    } catch {
    }
    if (F && F.isSymbolicLink()) {
      const b = d.statSync(q), w = d.statSync(A);
      if (m(b, w)) return;
    }
    const C = r(q, A);
    q = C.toDst, T = l(C.toCwd, T);
    const D = f.dirname(A);
    return d.existsSync(D) || n(D), d.symlinkSync(q, A, T);
  }
  return symlink = {
    createSymlink: i(y),
    createSymlinkSync: g
  }, symlink;
}
var ensure, hasRequiredEnsure;
function requireEnsure() {
  if (hasRequiredEnsure) return ensure;
  hasRequiredEnsure = 1;
  const { createFile: i, createFileSync: f } = /* @__PURE__ */ requireFile(), { createLink: d, createLinkSync: s } = /* @__PURE__ */ requireLink(), { createSymlink: t, createSymlinkSync: n } = /* @__PURE__ */ requireSymlink();
  return ensure = {
    // file
    createFile: i,
    createFileSync: f,
    ensureFile: i,
    ensureFileSync: f,
    // link
    createLink: d,
    createLinkSync: s,
    ensureLink: d,
    ensureLinkSync: s,
    // symlink
    createSymlink: t,
    createSymlinkSync: n,
    ensureSymlink: t,
    ensureSymlinkSync: n
  }, ensure;
}
var utils, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  function i(d, { EOL: s = `
`, finalEOL: t = !0, replacer: n = null, spaces: e } = {}) {
    const u = t ? s : "";
    return JSON.stringify(d, n, e).replace(/\n/g, s) + u;
  }
  function f(d) {
    return Buffer.isBuffer(d) && (d = d.toString("utf8")), d.replace(/^\uFEFF/, "");
  }
  return utils = { stringify: i, stripBom: f }, utils;
}
var jsonfile$1, hasRequiredJsonfile$1;
function requireJsonfile$1() {
  if (hasRequiredJsonfile$1) return jsonfile$1;
  hasRequiredJsonfile$1 = 1;
  let i;
  try {
    i = requireGracefulFs();
  } catch {
    i = require$$0;
  }
  const f = requireUniversalify(), { stringify: d, stripBom: s } = requireUtils();
  async function t(a, l = {}) {
    typeof l == "string" && (l = { encoding: l });
    const c = l.fs || i, m = "throws" in l ? l.throws : !0;
    let y = await f.fromCallback(c.readFile)(a, l);
    y = s(y);
    let v;
    try {
      v = JSON.parse(y, l ? l.reviver : null);
    } catch (g) {
      if (m)
        throw g.message = `${a}: ${g.message}`, g;
      return null;
    }
    return v;
  }
  const n = f.fromPromise(t);
  function e(a, l = {}) {
    typeof l == "string" && (l = { encoding: l });
    const c = l.fs || i, m = "throws" in l ? l.throws : !0;
    try {
      let y = c.readFileSync(a, l);
      return y = s(y), JSON.parse(y, l.reviver);
    } catch (y) {
      if (m)
        throw y.message = `${a}: ${y.message}`, y;
      return null;
    }
  }
  async function u(a, l, c = {}) {
    const m = c.fs || i, y = d(l, c);
    await f.fromCallback(m.writeFile)(a, y, c);
  }
  const r = f.fromPromise(u);
  function o(a, l, c = {}) {
    const m = c.fs || i, y = d(l, c);
    return m.writeFileSync(a, y, c);
  }
  return jsonfile$1 = {
    readFile: n,
    readFileSync: e,
    writeFile: r,
    writeFileSync: o
  }, jsonfile$1;
}
var jsonfile, hasRequiredJsonfile;
function requireJsonfile() {
  if (hasRequiredJsonfile) return jsonfile;
  hasRequiredJsonfile = 1;
  const i = requireJsonfile$1();
  return jsonfile = {
    // jsonfile exports
    readJson: i.readFile,
    readJsonSync: i.readFileSync,
    writeJson: i.writeFile,
    writeJsonSync: i.writeFileSync
  }, jsonfile;
}
var outputFile_1, hasRequiredOutputFile;
function requireOutputFile() {
  if (hasRequiredOutputFile) return outputFile_1;
  hasRequiredOutputFile = 1;
  const i = requireUniversalify().fromCallback, f = requireGracefulFs(), d = require$$1, s = /* @__PURE__ */ requireMkdirs(), t = requirePathExists().pathExists;
  function n(u, r, o, a) {
    typeof o == "function" && (a = o, o = "utf8");
    const l = d.dirname(u);
    t(l, (c, m) => {
      if (c) return a(c);
      if (m) return f.writeFile(u, r, o, a);
      s.mkdirs(l, (y) => {
        if (y) return a(y);
        f.writeFile(u, r, o, a);
      });
    });
  }
  function e(u, ...r) {
    const o = d.dirname(u);
    if (f.existsSync(o))
      return f.writeFileSync(u, ...r);
    s.mkdirsSync(o), f.writeFileSync(u, ...r);
  }
  return outputFile_1 = {
    outputFile: i(n),
    outputFileSync: e
  }, outputFile_1;
}
var outputJson_1, hasRequiredOutputJson;
function requireOutputJson() {
  if (hasRequiredOutputJson) return outputJson_1;
  hasRequiredOutputJson = 1;
  const { stringify: i } = requireUtils(), { outputFile: f } = /* @__PURE__ */ requireOutputFile();
  async function d(s, t, n = {}) {
    const e = i(t, n);
    await f(s, e, n);
  }
  return outputJson_1 = d, outputJson_1;
}
var outputJsonSync_1, hasRequiredOutputJsonSync;
function requireOutputJsonSync() {
  if (hasRequiredOutputJsonSync) return outputJsonSync_1;
  hasRequiredOutputJsonSync = 1;
  const { stringify: i } = requireUtils(), { outputFileSync: f } = /* @__PURE__ */ requireOutputFile();
  function d(s, t, n) {
    const e = i(t, n);
    f(s, e, n);
  }
  return outputJsonSync_1 = d, outputJsonSync_1;
}
var json$1, hasRequiredJson$1;
function requireJson$1() {
  if (hasRequiredJson$1) return json$1;
  hasRequiredJson$1 = 1;
  const i = requireUniversalify().fromPromise, f = /* @__PURE__ */ requireJsonfile();
  return f.outputJson = i(/* @__PURE__ */ requireOutputJson()), f.outputJsonSync = /* @__PURE__ */ requireOutputJsonSync(), f.outputJSON = f.outputJson, f.outputJSONSync = f.outputJsonSync, f.writeJSON = f.writeJson, f.writeJSONSync = f.writeJsonSync, f.readJSON = f.readJson, f.readJSONSync = f.readJsonSync, json$1 = f, json$1;
}
var move_1, hasRequiredMove$1;
function requireMove$1() {
  if (hasRequiredMove$1) return move_1;
  hasRequiredMove$1 = 1;
  const i = requireGracefulFs(), f = require$$1, d = requireCopy().copy, s = requireRemove().remove, t = requireMkdirs().mkdirp, n = requirePathExists().pathExists, e = /* @__PURE__ */ requireStat();
  function u(c, m, y, v) {
    typeof y == "function" && (v = y, y = {}), y = y || {};
    const g = y.overwrite || y.clobber || !1;
    e.checkPaths(c, m, "move", y, (q, A) => {
      if (q) return v(q);
      const { srcStat: T, isChangingCase: F = !1 } = A;
      e.checkParentPaths(c, T, m, "move", (C) => {
        if (C) return v(C);
        if (r(m)) return o(c, m, g, F, v);
        t(f.dirname(m), (D) => D ? v(D) : o(c, m, g, F, v));
      });
    });
  }
  function r(c) {
    const m = f.dirname(c);
    return f.parse(m).root === m;
  }
  function o(c, m, y, v, g) {
    if (v) return a(c, m, y, g);
    if (y)
      return s(m, (q) => q ? g(q) : a(c, m, y, g));
    n(m, (q, A) => q ? g(q) : A ? g(new Error("dest already exists.")) : a(c, m, y, g));
  }
  function a(c, m, y, v) {
    i.rename(c, m, (g) => g ? g.code !== "EXDEV" ? v(g) : l(c, m, y, v) : v());
  }
  function l(c, m, y, v) {
    d(c, m, {
      overwrite: y,
      errorOnExist: !0
    }, (q) => q ? v(q) : s(c, v));
  }
  return move_1 = u, move_1;
}
var moveSync_1, hasRequiredMoveSync;
function requireMoveSync() {
  if (hasRequiredMoveSync) return moveSync_1;
  hasRequiredMoveSync = 1;
  const i = requireGracefulFs(), f = require$$1, d = requireCopy().copySync, s = requireRemove().removeSync, t = requireMkdirs().mkdirpSync, n = /* @__PURE__ */ requireStat();
  function e(l, c, m) {
    m = m || {};
    const y = m.overwrite || m.clobber || !1, { srcStat: v, isChangingCase: g = !1 } = n.checkPathsSync(l, c, "move", m);
    return n.checkParentPathsSync(l, v, c, "move"), u(c) || t(f.dirname(c)), r(l, c, y, g);
  }
  function u(l) {
    const c = f.dirname(l);
    return f.parse(c).root === c;
  }
  function r(l, c, m, y) {
    if (y) return o(l, c, m);
    if (m)
      return s(c), o(l, c, m);
    if (i.existsSync(c)) throw new Error("dest already exists.");
    return o(l, c, m);
  }
  function o(l, c, m) {
    try {
      i.renameSync(l, c);
    } catch (y) {
      if (y.code !== "EXDEV") throw y;
      return a(l, c, m);
    }
  }
  function a(l, c, m) {
    return d(l, c, {
      overwrite: m,
      errorOnExist: !0
    }), s(l);
  }
  return moveSync_1 = e, moveSync_1;
}
var move, hasRequiredMove;
function requireMove() {
  if (hasRequiredMove) return move;
  hasRequiredMove = 1;
  const i = requireUniversalify().fromCallback;
  return move = {
    move: i(/* @__PURE__ */ requireMove$1()),
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
  const i = require$$0$3;
  let f = class extends i.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(t) {
      this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(t) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(t) {
      this.cancelled ? t() : this.once("cancel", t);
    }
    createPromise(t) {
      if (this.cancelled)
        return Promise.reject(new d());
      const n = () => {
        if (e != null)
          try {
            this.removeListener("cancel", e), e = null;
          } catch {
          }
      };
      let e = null;
      return new Promise((u, r) => {
        let o = null;
        if (e = () => {
          try {
            o != null && (o(), o = null);
          } finally {
            r(new d());
          }
        }, this.cancelled) {
          e();
          return;
        }
        this.onCancel(e), t(u, r, (a) => {
          o = a;
        });
      }).then((u) => (n(), u)).catch((u) => {
        throw n(), u;
      });
    }
    removeParentCancelHandler() {
      const t = this._parent;
      t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  CancellationToken.CancellationToken = f;
  class d extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return CancellationToken.CancellationError = d, CancellationToken;
}
var error = {}, hasRequiredError;
function requireError() {
  if (hasRequiredError) return error;
  hasRequiredError = 1, Object.defineProperty(error, "__esModule", { value: !0 }), error.newError = i;
  function i(f, d) {
    const s = new Error(f);
    return s.code = d, s;
  }
  return error;
}
var httpExecutor = {}, src = { exports: {} }, browser = { exports: {} }, ms, hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var i = 1e3, f = i * 60, d = f * 60, s = d * 24, t = s * 7, n = s * 365.25;
  ms = function(a, l) {
    l = l || {};
    var c = typeof a;
    if (c === "string" && a.length > 0)
      return e(a);
    if (c === "number" && isFinite(a))
      return l.long ? r(a) : u(a);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(a)
    );
  };
  function e(a) {
    if (a = String(a), !(a.length > 100)) {
      var l = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        a
      );
      if (l) {
        var c = parseFloat(l[1]), m = (l[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return c * n;
          case "weeks":
          case "week":
          case "w":
            return c * t;
          case "days":
          case "day":
          case "d":
            return c * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return c * d;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return c * f;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return c * i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return c;
          default:
            return;
        }
      }
    }
  }
  function u(a) {
    var l = Math.abs(a);
    return l >= s ? Math.round(a / s) + "d" : l >= d ? Math.round(a / d) + "h" : l >= f ? Math.round(a / f) + "m" : l >= i ? Math.round(a / i) + "s" : a + "ms";
  }
  function r(a) {
    var l = Math.abs(a);
    return l >= s ? o(a, l, s, "day") : l >= d ? o(a, l, d, "hour") : l >= f ? o(a, l, f, "minute") : l >= i ? o(a, l, i, "second") : a + " ms";
  }
  function o(a, l, c, m) {
    var y = l >= c * 1.5;
    return Math.round(a / c) + " " + m + (y ? "s" : "");
  }
  return ms;
}
var common$1, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  function i(f) {
    s.debug = s, s.default = s, s.coerce = o, s.disable = u, s.enable = n, s.enabled = r, s.humanize = requireMs(), s.destroy = a, Object.keys(f).forEach((l) => {
      s[l] = f[l];
    }), s.names = [], s.skips = [], s.formatters = {};
    function d(l) {
      let c = 0;
      for (let m = 0; m < l.length; m++)
        c = (c << 5) - c + l.charCodeAt(m), c |= 0;
      return s.colors[Math.abs(c) % s.colors.length];
    }
    s.selectColor = d;
    function s(l) {
      let c, m = null, y, v;
      function g(...q) {
        if (!g.enabled)
          return;
        const A = g, T = Number(/* @__PURE__ */ new Date()), F = T - (c || T);
        A.diff = F, A.prev = c, A.curr = T, c = T, q[0] = s.coerce(q[0]), typeof q[0] != "string" && q.unshift("%O");
        let C = 0;
        q[0] = q[0].replace(/%([a-zA-Z%])/g, (x, b) => {
          if (x === "%%")
            return "%";
          C++;
          const w = s.formatters[b];
          if (typeof w == "function") {
            const z = q[C];
            x = w.call(A, z), q.splice(C, 1), C--;
          }
          return x;
        }), s.formatArgs.call(A, q), (A.log || s.log).apply(A, q);
      }
      return g.namespace = l, g.useColors = s.useColors(), g.color = s.selectColor(l), g.extend = t, g.destroy = s.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (y !== s.namespaces && (y = s.namespaces, v = s.enabled(l)), v),
        set: (q) => {
          m = q;
        }
      }), typeof s.init == "function" && s.init(g), g;
    }
    function t(l, c) {
      const m = s(this.namespace + (typeof c > "u" ? ":" : c) + l);
      return m.log = this.log, m;
    }
    function n(l) {
      s.save(l), s.namespaces = l, s.names = [], s.skips = [];
      const c = (typeof l == "string" ? l : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of c)
        m[0] === "-" ? s.skips.push(m.slice(1)) : s.names.push(m);
    }
    function e(l, c) {
      let m = 0, y = 0, v = -1, g = 0;
      for (; m < l.length; )
        if (y < c.length && (c[y] === l[m] || c[y] === "*"))
          c[y] === "*" ? (v = y, g = m, y++) : (m++, y++);
        else if (v !== -1)
          y = v + 1, g++, m = g;
        else
          return !1;
      for (; y < c.length && c[y] === "*"; )
        y++;
      return y === c.length;
    }
    function u() {
      const l = [
        ...s.names,
        ...s.skips.map((c) => "-" + c)
      ].join(",");
      return s.enable(""), l;
    }
    function r(l) {
      for (const c of s.skips)
        if (e(l, c))
          return !1;
      for (const c of s.names)
        if (e(l, c))
          return !0;
      return !1;
    }
    function o(l) {
      return l instanceof Error ? l.stack || l.message : l;
    }
    function a() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return s.enable(s.load()), s;
  }
  return common$1 = i, common$1;
}
var hasRequiredBrowser;
function requireBrowser() {
  return hasRequiredBrowser || (hasRequiredBrowser = 1, (function(i, f) {
    f.formatArgs = s, f.save = t, f.load = n, f.useColors = d, f.storage = e(), f.destroy = /* @__PURE__ */ (() => {
      let r = !1;
      return () => {
        r || (r = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), f.colors = [
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
    function d() {
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
    function s(r) {
      if (r[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + r[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !this.useColors)
        return;
      const o = "color: " + this.color;
      r.splice(1, 0, o, "color: inherit");
      let a = 0, l = 0;
      r[0].replace(/%[a-zA-Z%]/g, (c) => {
        c !== "%%" && (a++, c === "%c" && (l = a));
      }), r.splice(l, 0, o);
    }
    f.log = console.debug || console.log || (() => {
    });
    function t(r) {
      try {
        r ? f.storage.setItem("debug", r) : f.storage.removeItem("debug");
      } catch {
      }
    }
    function n() {
      let r;
      try {
        r = f.storage.getItem("debug") || f.storage.getItem("DEBUG");
      } catch {
      }
      return !r && typeof process < "u" && "env" in process && (r = process.env.DEBUG), r;
    }
    function e() {
      try {
        return localStorage;
      } catch {
      }
    }
    i.exports = requireCommon$1()(f);
    const { formatters: u } = i.exports;
    u.j = function(r) {
      try {
        return JSON.stringify(r);
      } catch (o) {
        return "[UnexpectedJSONParseError]: " + o.message;
      }
    };
  })(browser, browser.exports)), browser.exports;
}
var node = { exports: {} }, hasFlag, hasRequiredHasFlag;
function requireHasFlag() {
  return hasRequiredHasFlag || (hasRequiredHasFlag = 1, hasFlag = (i, f = process.argv) => {
    const d = i.startsWith("-") ? "" : i.length === 1 ? "-" : "--", s = f.indexOf(d + i), t = f.indexOf("--");
    return s !== -1 && (t === -1 || s < t);
  }), hasFlag;
}
var supportsColor_1, hasRequiredSupportsColor;
function requireSupportsColor() {
  if (hasRequiredSupportsColor) return supportsColor_1;
  hasRequiredSupportsColor = 1;
  const i = require$$1$1, f = require$$1$4, d = requireHasFlag(), { env: s } = process;
  let t;
  d("no-color") || d("no-colors") || d("color=false") || d("color=never") ? t = 0 : (d("color") || d("colors") || d("color=true") || d("color=always")) && (t = 1), "FORCE_COLOR" in s && (s.FORCE_COLOR === "true" ? t = 1 : s.FORCE_COLOR === "false" ? t = 0 : t = s.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(s.FORCE_COLOR, 10), 3));
  function n(r) {
    return r === 0 ? !1 : {
      level: r,
      hasBasic: !0,
      has256: r >= 2,
      has16m: r >= 3
    };
  }
  function e(r, o) {
    if (t === 0)
      return 0;
    if (d("color=16m") || d("color=full") || d("color=truecolor"))
      return 3;
    if (d("color=256"))
      return 2;
    if (r && !o && t === void 0)
      return 0;
    const a = t || 0;
    if (s.TERM === "dumb")
      return a;
    if (process.platform === "win32") {
      const l = i.release().split(".");
      return Number(l[0]) >= 10 && Number(l[2]) >= 10586 ? Number(l[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in s)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((l) => l in s) || s.CI_NAME === "codeship" ? 1 : a;
    if ("TEAMCITY_VERSION" in s)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(s.TEAMCITY_VERSION) ? 1 : 0;
    if (s.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in s) {
      const l = parseInt((s.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (s.TERM_PROGRAM) {
        case "iTerm.app":
          return l >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(s.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(s.TERM) || "COLORTERM" in s ? 1 : a;
  }
  function u(r) {
    const o = e(r, r && r.isTTY);
    return n(o);
  }
  return supportsColor_1 = {
    supportsColor: u,
    stdout: n(e(!0, f.isatty(1))),
    stderr: n(e(!0, f.isatty(2)))
  }, supportsColor_1;
}
var hasRequiredNode;
function requireNode() {
  return hasRequiredNode || (hasRequiredNode = 1, (function(i, f) {
    const d = require$$1$4, s = require$$0$2;
    f.init = a, f.log = u, f.formatArgs = n, f.save = r, f.load = o, f.useColors = t, f.destroy = s.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), f.colors = [6, 2, 3, 4, 5, 1];
    try {
      const c = requireSupportsColor();
      c && (c.stderr || c).level >= 2 && (f.colors = [
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
    f.inspectOpts = Object.keys(process.env).filter((c) => /^debug_/i.test(c)).reduce((c, m) => {
      const y = m.substring(6).toLowerCase().replace(/_([a-z])/g, (g, q) => q.toUpperCase());
      let v = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(v) ? v = !0 : /^(no|off|false|disabled)$/i.test(v) ? v = !1 : v === "null" ? v = null : v = Number(v), c[y] = v, c;
    }, {});
    function t() {
      return "colors" in f.inspectOpts ? !!f.inspectOpts.colors : d.isatty(process.stderr.fd);
    }
    function n(c) {
      const { namespace: m, useColors: y } = this;
      if (y) {
        const v = this.color, g = "\x1B[3" + (v < 8 ? v : "8;5;" + v), q = `  ${g};1m${m} \x1B[0m`;
        c[0] = q + c[0].split(`
`).join(`
` + q), c.push(g + "m+" + i.exports.humanize(this.diff) + "\x1B[0m");
      } else
        c[0] = e() + m + " " + c[0];
    }
    function e() {
      return f.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function u(...c) {
      return process.stderr.write(s.formatWithOptions(f.inspectOpts, ...c) + `
`);
    }
    function r(c) {
      c ? process.env.DEBUG = c : delete process.env.DEBUG;
    }
    function o() {
      return process.env.DEBUG;
    }
    function a(c) {
      c.inspectOpts = {};
      const m = Object.keys(f.inspectOpts);
      for (let y = 0; y < m.length; y++)
        c.inspectOpts[m[y]] = f.inspectOpts[m[y]];
    }
    i.exports = requireCommon$1()(f);
    const { formatters: l } = i.exports;
    l.o = function(c) {
      return this.inspectOpts.colors = this.useColors, s.inspect(c, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, l.O = function(c) {
      return this.inspectOpts.colors = this.useColors, s.inspect(c, this.inspectOpts);
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
  const i = require$$0$6;
  let f = class extends i.Transform {
    constructor(s, t, n) {
      super(), this.total = s, this.cancellationToken = t, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(s, t, n) {
      if (this.cancellationToken.cancelled) {
        n(new Error("cancelled"), null);
        return;
      }
      this.transferred += s.length, this.delta += s.length;
      const e = Date.now();
      e >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = e + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((e - this.start) / 1e3))
      }), this.delta = 0), n(null, s);
    }
    _flush(s) {
      if (this.cancellationToken.cancelled) {
        s(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, s(null);
    }
  };
  return ProgressCallbackTransform.ProgressCallbackTransform = f, ProgressCallbackTransform;
}
var hasRequiredHttpExecutor;
function requireHttpExecutor() {
  if (hasRequiredHttpExecutor) return httpExecutor;
  hasRequiredHttpExecutor = 1, Object.defineProperty(httpExecutor, "__esModule", { value: !0 }), httpExecutor.DigestTransform = httpExecutor.HttpExecutor = httpExecutor.HttpError = void 0, httpExecutor.createHttpError = o, httpExecutor.parseJson = c, httpExecutor.configureRequestOptionsFromUrl = v, httpExecutor.configureRequestUrl = g, httpExecutor.safeGetHeader = T, httpExecutor.configureRequestOptions = C, httpExecutor.safeStringifyJson = D;
  const i = require$$0$7, f = requireSrc(), d = require$$0, s = require$$0$6, t = require$$2, n = requireCancellationToken(), e = requireError(), u = requireProgressCallbackTransform(), r = (0, f.default)("electron-builder");
  function o(x, b = null) {
    return new l(x.statusCode || -1, `${x.statusCode} ${x.statusMessage}` + (b == null ? "" : `
` + JSON.stringify(b, null, "  ")) + `
Headers: ` + D(x.headers), b);
  }
  const a = /* @__PURE__ */ new Map([
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
  class l extends Error {
    constructor(b, w = `HTTP error: ${a.get(b) || b}`, z = null) {
      super(w), this.statusCode = b, this.description = z, this.name = "HttpError", this.code = `HTTP_ERROR_${b}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  httpExecutor.HttpError = l;
  function c(x) {
    return x.then((b) => b == null || b.length === 0 ? null : JSON.parse(b));
  }
  class m {
    constructor() {
      this.maxRedirects = 10;
    }
    request(b, w = new n.CancellationToken(), z) {
      C(b);
      const J = z == null ? void 0 : JSON.stringify(z), H = J ? Buffer.from(J) : void 0;
      if (H != null) {
        r(J);
        const { headers: X, ...N } = b;
        b = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": H.length,
            ...X
          },
          ...N
        };
      }
      return this.doApiRequest(b, w, (X) => X.end(H));
    }
    doApiRequest(b, w, z, J = 0) {
      return r.enabled && r(`Request: ${D(b)}`), w.createPromise((H, X, N) => {
        const U = this.createRequest(b, (ne) => {
          try {
            this.handleResponse(ne, b, w, H, X, J, z);
          } catch (L) {
            X(L);
          }
        });
        this.addErrorAndTimeoutHandlers(U, X, b.timeout), this.addRedirectHandlers(U, b, X, J, (ne) => {
          this.doApiRequest(ne, w, z, J).then(H).catch(X);
        }), z(U, X), N(() => U.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(b, w, z, J, H) {
    }
    addErrorAndTimeoutHandlers(b, w, z = 60 * 1e3) {
      this.addTimeOutHandler(b, w, z), b.on("error", w), b.on("aborted", () => {
        w(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(b, w, z, J, H, X, N) {
      var U;
      if (r.enabled && r(`Response: ${b.statusCode} ${b.statusMessage}, request options: ${D(w)}`), b.statusCode === 404) {
        H(o(b, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (b.statusCode === 204) {
        J();
        return;
      }
      const ne = (U = b.statusCode) !== null && U !== void 0 ? U : 0, L = ne >= 300 && ne < 400, K = T(b, "location");
      if (L && K != null) {
        if (X > this.maxRedirects) {
          H(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(m.prepareRedirectUrlOptions(K, w), z, N, X).then(J).catch(H);
        return;
      }
      b.setEncoding("utf8");
      let ue = "";
      b.on("error", H), b.on("data", (fe) => ue += fe), b.on("end", () => {
        try {
          if (b.statusCode != null && b.statusCode >= 400) {
            const fe = T(b, "content-type"), ge = fe != null && (Array.isArray(fe) ? fe.find((de) => de.includes("json")) != null : fe.includes("json"));
            H(o(b, `method: ${w.method || "GET"} url: ${w.protocol || "https:"}//${w.hostname}${w.port ? `:${w.port}` : ""}${w.path}

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
    async downloadToBuffer(b, w) {
      return await w.cancellationToken.createPromise((z, J, H) => {
        const X = [], N = {
          headers: w.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        g(b, N), C(N), this.doDownload(N, {
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
    doDownload(b, w, z) {
      const J = this.createRequest(b, (H) => {
        if (H.statusCode >= 400) {
          w.callback(new Error(`Cannot download "${b.protocol || "https:"}//${b.hostname}${b.path}", status ${H.statusCode}: ${H.statusMessage}`));
          return;
        }
        H.on("error", w.callback);
        const X = T(H, "location");
        if (X != null) {
          z < this.maxRedirects ? this.doDownload(m.prepareRedirectUrlOptions(X, b), w, z++) : w.callback(this.createMaxRedirectError());
          return;
        }
        w.responseHandler == null ? F(w, H) : w.responseHandler(H, w.callback);
      });
      this.addErrorAndTimeoutHandlers(J, w.callback, b.timeout), this.addRedirectHandlers(J, b, w.callback, z, (H) => {
        this.doDownload(H, w, z++);
      }), J.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(b, w, z) {
      b.on("socket", (J) => {
        J.setTimeout(z, () => {
          b.abort(), w(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(b, w) {
      const z = v(b, { ...w }), J = z.headers;
      if (J?.authorization) {
        const H = m.reconstructOriginalUrl(w), X = y(b, w);
        m.isCrossOriginRedirect(H, X) && (r.enabled && r(`Given the cross-origin redirect (from ${H.host} to ${X.host}), the Authorization header will be stripped out.`), delete J.authorization);
      }
      return z;
    }
    static reconstructOriginalUrl(b) {
      const w = b.protocol || "https:";
      if (!b.hostname)
        throw new Error("Missing hostname in request options");
      const z = b.hostname, J = b.port ? `:${b.port}` : "", H = b.path || "/";
      return new t.URL(`${w}//${z}${J}${H}`);
    }
    static isCrossOriginRedirect(b, w) {
      if (b.hostname.toLowerCase() !== w.hostname.toLowerCase())
        return !0;
      if (b.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
      ["80", ""].includes(b.port) && w.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
      ["443", ""].includes(w.port))
        return !1;
      if (b.protocol !== w.protocol)
        return !0;
      const z = b.port, J = w.port;
      return z !== J;
    }
    static retryOnServerError(b, w = 3) {
      for (let z = 0; ; z++)
        try {
          return b();
        } catch (J) {
          if (z < w && (J instanceof l && J.isServerError() || J.code === "EPIPE"))
            continue;
          throw J;
        }
    }
  }
  httpExecutor.HttpExecutor = m;
  function y(x, b) {
    try {
      return new t.URL(x);
    } catch {
      const w = b.hostname, z = b.protocol || "https:", J = b.port ? `:${b.port}` : "", H = `${z}//${w}${J}`;
      return new t.URL(x, H);
    }
  }
  function v(x, b) {
    const w = C(b), z = y(x, b);
    return g(z, w), w;
  }
  function g(x, b) {
    b.protocol = x.protocol, b.hostname = x.hostname, x.port ? b.port = x.port : b.port && delete b.port, b.path = x.pathname + x.search;
  }
  class q extends s.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(b, w = "sha512", z = "base64") {
      super(), this.expected = b, this.algorithm = w, this.encoding = z, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, i.createHash)(w);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(b, w, z) {
      this.digester.update(b), z(null, b);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(b) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (w) {
          b(w);
          return;
        }
      b(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, e.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, e.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  httpExecutor.DigestTransform = q;
  function A(x, b, w) {
    return x != null && b != null && x !== b ? (w(new Error(`checksum mismatch: expected ${b} but got ${x} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function T(x, b) {
    const w = x.headers[b];
    return w == null ? null : Array.isArray(w) ? w.length === 0 ? null : w[w.length - 1] : w;
  }
  function F(x, b) {
    if (!A(T(b, "X-Checksum-Sha2"), x.options.sha2, x.callback))
      return;
    const w = [];
    if (x.options.onProgress != null) {
      const X = T(b, "content-length");
      X != null && w.push(new u.ProgressCallbackTransform(parseInt(X, 10), x.options.cancellationToken, x.options.onProgress));
    }
    const z = x.options.sha512;
    z != null ? w.push(new q(z, "sha512", z.length === 128 && !z.includes("+") && !z.includes("Z") && !z.includes("=") ? "hex" : "base64")) : x.options.sha2 != null && w.push(new q(x.options.sha2, "sha256", "hex"));
    const J = (0, d.createWriteStream)(x.destination);
    w.push(J);
    let H = b;
    for (const X of w)
      X.on("error", (N) => {
        J.close(), x.options.cancellationToken.cancelled || x.callback(N);
      }), H = H.pipe(X);
    J.on("finish", () => {
      J.close(x.callback);
    });
  }
  function C(x, b, w) {
    w != null && (x.method = w), x.headers = { ...x.headers };
    const z = x.headers;
    return b != null && (z.authorization = b.startsWith("Basic") || b.startsWith("Bearer") ? b : `token ${b}`), z["User-Agent"] == null && (z["User-Agent"] = "electron-builder"), (w == null || w === "GET" || z["Cache-Control"] == null) && (z["Cache-Control"] = "no-cache"), x.protocol == null && process.versions.electron != null && (x.protocol = "https:"), x;
  }
  function D(x, b) {
    return JSON.stringify(x, (w, z) => w.endsWith("Authorization") || w.endsWith("authorization") || w.endsWith("Password") || w.endsWith("PASSWORD") || w.endsWith("Token") || w.includes("password") || w.includes("token") || b != null && b.has(w) ? "<stripped sensitive data>" : z, 2);
  }
  return httpExecutor;
}
var MemoLazy = {}, hasRequiredMemoLazy;
function requireMemoLazy() {
  if (hasRequiredMemoLazy) return MemoLazy;
  hasRequiredMemoLazy = 1, Object.defineProperty(MemoLazy, "__esModule", { value: !0 }), MemoLazy.MemoLazy = void 0;
  let i = class {
    constructor(s, t) {
      this.selector = s, this.creator = t, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const s = this.selector();
      if (this._value !== void 0 && f(this.selected, s))
        return this._value;
      this.selected = s;
      const t = this.creator(s);
      return this.value = t, t;
    }
    set value(s) {
      this._value = s;
    }
  };
  MemoLazy.MemoLazy = i;
  function f(d, s) {
    if (typeof d == "object" && d !== null && (typeof s == "object" && s !== null)) {
      const e = Object.keys(d), u = Object.keys(s);
      return e.length === u.length && e.every((r) => f(d[r], s[r]));
    }
    return d === s;
  }
  return MemoLazy;
}
var publishOptions = {}, hasRequiredPublishOptions;
function requirePublishOptions() {
  if (hasRequiredPublishOptions) return publishOptions;
  hasRequiredPublishOptions = 1, Object.defineProperty(publishOptions, "__esModule", { value: !0 }), publishOptions.githubUrl = i, publishOptions.githubTagPrefix = f, publishOptions.getS3LikeProviderBaseUrl = d;
  function i(e, u = "github.com") {
    return `${e.protocol || "https"}://${e.host || u}`;
  }
  function f(e) {
    var u;
    return e.tagNamePrefix ? e.tagNamePrefix : !((u = e.vPrefixedTagName) !== null && u !== void 0) || u ? "v" : "";
  }
  function d(e) {
    const u = e.provider;
    if (u === "s3")
      return s(e);
    if (u === "spaces")
      return n(e);
    throw new Error(`Not supported provider: ${u}`);
  }
  function s(e) {
    let u;
    if (e.accelerate == !0)
      u = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
    else if (e.endpoint != null)
      u = `${e.endpoint}/${e.bucket}`;
    else if (e.bucket.includes(".")) {
      if (e.region == null)
        throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
      e.region === "us-east-1" ? u = `https://s3.amazonaws.com/${e.bucket}` : u = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
    } else e.region === "cn-north-1" ? u = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : u = `https://${e.bucket}.s3.amazonaws.com`;
    return t(u, e.path);
  }
  function t(e, u) {
    return u != null && u.length > 0 && (u.startsWith("/") || (e += "/"), e += u), e;
  }
  function n(e) {
    if (e.name == null)
      throw new Error("name is missing");
    if (e.region == null)
      throw new Error("region is missing");
    return t(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
  }
  return publishOptions;
}
var retry = {}, hasRequiredRetry;
function requireRetry() {
  if (hasRequiredRetry) return retry;
  hasRequiredRetry = 1, Object.defineProperty(retry, "__esModule", { value: !0 }), retry.retry = f;
  const i = requireCancellationToken();
  async function f(d, s) {
    var t;
    const { retries: n, interval: e, backoff: u = 0, attempt: r = 0, shouldRetry: o, cancellationToken: a = new i.CancellationToken() } = s;
    try {
      return await d();
    } catch (l) {
      if (await Promise.resolve((t = o?.(l)) !== null && t !== void 0 ? t : !0) && n > 0 && !a.cancelled)
        return await new Promise((c) => setTimeout(c, e + u * r)), await f(d, { ...s, retries: n - 1, attempt: r + 1 });
      throw l;
    }
  }
  return retry;
}
var rfc2253Parser = {}, hasRequiredRfc2253Parser;
function requireRfc2253Parser() {
  if (hasRequiredRfc2253Parser) return rfc2253Parser;
  hasRequiredRfc2253Parser = 1, Object.defineProperty(rfc2253Parser, "__esModule", { value: !0 }), rfc2253Parser.parseDn = i;
  function i(f) {
    let d = !1, s = null, t = "", n = 0;
    f = f.trim();
    const e = /* @__PURE__ */ new Map();
    for (let u = 0; u <= f.length; u++) {
      if (u === f.length) {
        s !== null && e.set(s, t);
        break;
      }
      const r = f[u];
      if (d) {
        if (r === '"') {
          d = !1;
          continue;
        }
      } else {
        if (r === '"') {
          d = !0;
          continue;
        }
        if (r === "\\") {
          u++;
          const o = parseInt(f.slice(u, u + 2), 16);
          Number.isNaN(o) ? t += f[u] : (u++, t += String.fromCharCode(o));
          continue;
        }
        if (s === null && r === "=") {
          s = t, t = "";
          continue;
        }
        if (r === "," || r === ";" || r === "+") {
          s !== null && e.set(s, t), s = null, t = "";
          continue;
        }
      }
      if (r === " " && !d) {
        if (t.length === 0)
          continue;
        if (u > n) {
          let o = u;
          for (; f[o] === " "; )
            o++;
          n = o;
        }
        if (n >= f.length || f[n] === "," || f[n] === ";" || s === null && f[n] === "=" || s !== null && f[n] === "+") {
          u = n - 1;
          continue;
        }
      }
      t += r;
    }
    return e;
  }
  return rfc2253Parser;
}
var uuid = {}, hasRequiredUuid;
function requireUuid() {
  if (hasRequiredUuid) return uuid;
  hasRequiredUuid = 1, Object.defineProperty(uuid, "__esModule", { value: !0 }), uuid.nil = uuid.UUID = void 0;
  const i = require$$0$7, f = requireError(), d = "options.name must be either a string or a Buffer", s = (0, i.randomBytes)(16);
  s[0] = s[0] | 1;
  const t = {}, n = [];
  for (let l = 0; l < 256; l++) {
    const c = (l + 256).toString(16).substr(1);
    t[c] = l, n[l] = c;
  }
  class e {
    constructor(c) {
      this.ascii = null, this.binary = null;
      const m = e.check(c);
      if (!m)
        throw new Error("not a UUID");
      this.version = m.version, m.format === "ascii" ? this.ascii = c : this.binary = c;
    }
    static v5(c, m) {
      return o(c, "sha1", 80, m);
    }
    toString() {
      return this.ascii == null && (this.ascii = a(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(c, m = 0) {
      if (typeof c == "string")
        return c = c.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(c) ? c === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (t[c[14] + c[15]] & 240) >> 4,
          variant: u((t[c[19] + c[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(c)) {
        if (c.length < m + 16)
          return !1;
        let y = 0;
        for (; y < 16 && c[m + y] === 0; y++)
          ;
        return y === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (c[m + 6] & 240) >> 4,
          variant: u((c[m + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, f.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(c) {
      const m = Buffer.allocUnsafe(16);
      let y = 0;
      for (let v = 0; v < 16; v++)
        m[v] = t[c[y++] + c[y++]], (v === 3 || v === 5 || v === 7 || v === 9) && (y += 1);
      return m;
    }
  }
  uuid.UUID = e, e.OID = e.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function u(l) {
    switch (l) {
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
  (function(l) {
    l[l.ASCII = 0] = "ASCII", l[l.BINARY = 1] = "BINARY", l[l.OBJECT = 2] = "OBJECT";
  })(r || (r = {}));
  function o(l, c, m, y, v = r.ASCII) {
    const g = (0, i.createHash)(c);
    if (typeof l != "string" && !Buffer.isBuffer(l))
      throw (0, f.newError)(d, "ERR_INVALID_UUID_NAME");
    g.update(y), g.update(l);
    const A = g.digest();
    let T;
    switch (v) {
      case r.BINARY:
        A[6] = A[6] & 15 | m, A[8] = A[8] & 63 | 128, T = A;
        break;
      case r.OBJECT:
        A[6] = A[6] & 15 | m, A[8] = A[8] & 63 | 128, T = new e(A);
        break;
      default:
        T = n[A[0]] + n[A[1]] + n[A[2]] + n[A[3]] + "-" + n[A[4]] + n[A[5]] + "-" + n[A[6] & 15 | m] + n[A[7]] + "-" + n[A[8] & 63 | 128] + n[A[9]] + "-" + n[A[10]] + n[A[11]] + n[A[12]] + n[A[13]] + n[A[14]] + n[A[15]];
        break;
    }
    return T;
  }
  function a(l) {
    return n[l[0]] + n[l[1]] + n[l[2]] + n[l[3]] + "-" + n[l[4]] + n[l[5]] + "-" + n[l[6]] + n[l[7]] + "-" + n[l[8]] + n[l[9]] + "-" + n[l[10]] + n[l[11]] + n[l[12]] + n[l[13]] + n[l[14]] + n[l[15]];
  }
  return uuid.nil = new e("00000000-0000-0000-0000-000000000000"), uuid;
}
var xml = {}, sax = {}, hasRequiredSax;
function requireSax() {
  return hasRequiredSax || (hasRequiredSax = 1, (function(i) {
    (function(f) {
      f.parser = function(S, R) {
        return new s(S, R);
      }, f.SAXParser = s, f.SAXStream = a, f.createStream = o, f.MAX_BUFFER_LENGTH = 64 * 1024;
      var d = [
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
      f.EVENTS = [
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
      function s(S, R) {
        if (!(this instanceof s))
          return new s(S, R);
        var te = this;
        n(te), te.q = te.c = "", te.bufferCheckPosition = f.MAX_BUFFER_LENGTH, te.opt = R || {}, te.opt.lowercase = te.opt.lowercase || te.opt.lowercasetags, te.looseCase = te.opt.lowercase ? "toLowerCase" : "toUpperCase", te.tags = [], te.closed = te.closedRoot = te.sawRoot = !1, te.tag = te.error = null, te.strict = !!S, te.noscript = !!(S || te.opt.noscript), te.state = w.BEGIN, te.strictEntities = te.opt.strictEntities, te.ENTITIES = te.strictEntities ? Object.create(f.XML_ENTITIES) : Object.create(f.ENTITIES), te.attribList = [], te.opt.xmlns && (te.ns = Object.create(v)), te.opt.unquotedAttributeValues === void 0 && (te.opt.unquotedAttributeValues = !S), te.trackPosition = te.opt.position !== !1, te.trackPosition && (te.position = te.line = te.column = 0), J(te, "onready");
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
      function t(S) {
        for (var R = Math.max(f.MAX_BUFFER_LENGTH, 10), te = 0, k = 0, pe = d.length; k < pe; k++) {
          var ye = S[d[k]].length;
          if (ye > R)
            switch (d[k]) {
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
                U(S, "Max buffer length exceeded: " + d[k]);
            }
          te = Math.max(te, ye);
        }
        var ve = f.MAX_BUFFER_LENGTH - te;
        S.bufferCheckPosition = ve + S.position;
      }
      function n(S) {
        for (var R = 0, te = d.length; R < te; R++)
          S[d[R]] = "";
      }
      function e(S) {
        X(S), S.cdata !== "" && (H(S, "oncdata", S.cdata), S.cdata = ""), S.script !== "" && (H(S, "onscript", S.script), S.script = "");
      }
      s.prototype = {
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
          e(this);
        }
      };
      var u;
      try {
        u = require("stream").Stream;
      } catch {
        u = function() {
        };
      }
      u || (u = function() {
      });
      var r = f.EVENTS.filter(function(S) {
        return S !== "error" && S !== "end";
      });
      function o(S, R) {
        return new a(S, R);
      }
      function a(S, R) {
        if (!(this instanceof a))
          return new a(S, R);
        u.apply(this), this._parser = new s(S, R), this.writable = !0, this.readable = !0;
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
      a.prototype = Object.create(u.prototype, {
        constructor: {
          value: a
        }
      }), a.prototype.write = function(S) {
        return typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(S) && (this._decoder || (this._decoder = new TextDecoder("utf8")), S = this._decoder.decode(S, { stream: !0 })), this._parser.write(S.toString()), this.emit("data", S), !0;
      }, a.prototype.end = function(S) {
        if (S && S.length && this.write(S), this._decoder) {
          var R = this._decoder.decode();
          R && (this._parser.write(R), this.emit("data", R));
        }
        return this._parser.end(), !0;
      }, a.prototype.on = function(S, R) {
        var te = this;
        return !te._parser["on" + S] && r.indexOf(S) !== -1 && (te._parser["on" + S] = function() {
          var k = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          k.splice(0, 0, S), te.emit.apply(te, k);
        }), u.prototype.on.call(te, S, R);
      };
      var l = "[CDATA[", c = "DOCTYPE", m = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", v = { xml: m, xmlns: y }, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, q = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, A = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function F(S) {
        return S === " " || S === `
` || S === "\r" || S === "	";
      }
      function C(S) {
        return S === '"' || S === "'";
      }
      function D(S) {
        return S === ">" || F(S);
      }
      function x(S, R) {
        return S.test(R);
      }
      function b(S, R) {
        return !x(S, R);
      }
      var w = 0;
      f.STATE = {
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
      }, f.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, f.ENTITIES = {
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
      }, Object.keys(f.ENTITIES).forEach(function(S) {
        var R = f.ENTITIES[S], te = typeof R == "number" ? String.fromCharCode(R) : R;
        f.ENTITIES[S] = te;
      });
      for (var z in f.STATE)
        f.STATE[f.STATE[z]] = z;
      w = f.STATE;
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
        return S.sawRoot && !S.closedRoot && L(S, "Unclosed root tag"), S.state !== w.BEGIN && S.state !== w.BEGIN_WHITESPACE && S.state !== w.TEXT && U(S, "Unexpected end"), X(S), S.c = "", S.closed = !0, J(S, "onend"), s.call(S, S.strict, S.opt), S;
      }
      function L(S, R) {
        if (typeof S != "object" || !(S instanceof s))
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
          te.ns && pe.ns !== te.ns && Object.keys(te.ns).forEach(function(p) {
            H(S, "onopennamespace", {
              prefix: p,
              uri: te.ns[p]
            });
          });
          for (var ye = 0, ve = S.attribList.length; ye < ve; ye++) {
            var qe = S.attribList[ye], Re = qe[0], Fe = qe[1], be = ue(Re, !0), Te = be.prefix, je = be.local, ke = Te === "" ? "" : te.ns[Te] || "", Ue = {
              name: Re,
              value: Fe,
              prefix: Te,
              local: je,
              uri: ke
            };
            Te && Te !== "xmlns" && !ke && (L(
              S,
              "Unbound namespace prefix: " + JSON.stringify(Te)
            ), Ue.uri = Te), S.tag.attributes[Re] = Ue, H(S, "onattribute", Ue);
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
          var Fe = S.tags[S.tags.length - 1] || S;
          S.opt.xmlns && ve.ns !== Fe.ns && Object.keys(ve.ns).forEach(function(be) {
            var Te = ve.ns[be];
            H(S, "onclosenamespace", { prefix: be, uri: Te });
          });
        }
        R === 0 && (S.closedRoot = !0), S.tagName = S.attribValue = S.attribName = "", S.attribList.length = 0, S.state = w.TEXT;
      }
      function we(S) {
        var R = S.entity, te = R.toLowerCase(), k, pe = "";
        return S.ENTITIES[R] ? S.ENTITIES[R] : S.ENTITIES[te] ? S.ENTITIES[te] : (R = te, R.charAt(0) === "#" && (R.charAt(1) === "x" ? (R = R.slice(2), k = parseInt(R, 16), pe = k.toString(16)) : (R = R.slice(1), k = parseInt(R, 10), pe = k.toString(10))), R = R.replace(/^0+/, ""), isNaN(k) || pe.toLowerCase() !== R || k < 0 || k > 1114111 ? (L(S, "Invalid character entity"), "&" + S.entity + ";") : String.fromCodePoint(k));
      }
      function _e(S, R) {
        R === "<" ? (S.state = w.OPEN_WAKA, S.startTagPosition = S.position) : F(R) || (L(S, "Non-whitespace before first tag."), S.textNode = R, S.state = w.TEXT);
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
              k === "<" && !(R.sawRoot && R.closedRoot && !R.strict) ? (R.state = w.OPEN_WAKA, R.startTagPosition = R.position) : (!F(k) && (!R.sawRoot || R.closedRoot) && L(R, "Text data outside of root node."), k === "&" ? R.state = w.TEXT_ENTITY : R.textNode += k);
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
              else if (!F(k)) if (x(g, k))
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
              R.doctype && R.doctype !== !0 && R.sgmlDecl ? (R.state = w.DOCTYPE_DTD, R.doctype += "<!" + R.sgmlDecl + k, R.sgmlDecl = "") : (R.sgmlDecl + k).toUpperCase() === l ? (H(R, "onopencdata"), R.state = w.CDATA, R.sgmlDecl = "", R.cdata = "") : (R.sgmlDecl + k).toUpperCase() === c ? (R.state = w.DOCTYPE, (R.doctype || R.sawRoot) && L(
                R,
                "Inappropriately located doctype declaration"
              ), R.doctype = "", R.sgmlDecl = "") : k === ">" ? (H(R, "onsgmldeclaration", R.sgmlDecl), R.sgmlDecl = "", R.state = w.TEXT) : (C(k) && (R.state = w.SGML_DECL_QUOTED), R.sgmlDecl += k);
              continue;
            case w.SGML_DECL_QUOTED:
              k === R.q && (R.state = w.SGML_DECL, R.q = ""), R.sgmlDecl += k;
              continue;
            case w.DOCTYPE:
              k === ">" ? (R.state = w.TEXT, H(R, "ondoctype", R.doctype), R.doctype = !0) : (R.doctype += k, k === "[" ? R.state = w.DOCTYPE_DTD : C(k) && (R.state = w.DOCTYPE_QUOTED, R.q = k));
              continue;
            case w.DOCTYPE_QUOTED:
              R.doctype += k, k === R.q && (R.q = "", R.state = w.DOCTYPE);
              continue;
            case w.DOCTYPE_DTD:
              k === "]" ? (R.doctype += k, R.state = w.DOCTYPE) : k === "<" ? (R.state = w.OPEN_WAKA, R.startTagPosition = R.position) : C(k) ? (R.doctype += k, R.state = w.DOCTYPE_DTD_QUOTED, R.q = k) : R.doctype += k;
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
              k === "?" ? R.state = w.PROC_INST_ENDING : F(k) ? R.state = w.PROC_INST_BODY : R.procInstName += k;
              continue;
            case w.PROC_INST_BODY:
              if (!R.procInstBody && F(k))
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
              x(q, k) ? R.tagName += k : (K(R), k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : (F(k) || L(R, "Invalid character in tag name"), R.state = w.ATTRIB));
              continue;
            case w.OPEN_TAG_SLASH:
              k === ">" ? (ge(R, !0), de(R)) : (L(
                R,
                "Forward-slash in opening tag not followed by >"
              ), R.state = w.ATTRIB);
              continue;
            case w.ATTRIB:
              if (F(k))
                continue;
              k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : x(g, k) ? (R.attribName = k, R.attribValue = "", R.state = w.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME:
              k === "=" ? R.state = w.ATTRIB_VALUE : k === ">" ? (L(R, "Attribute without value"), R.attribValue = R.attribName, fe(R), ge(R)) : F(k) ? R.state = w.ATTRIB_NAME_SAW_WHITE : x(q, k) ? R.attribName += k : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_NAME_SAW_WHITE:
              if (k === "=")
                R.state = w.ATTRIB_VALUE;
              else {
                if (F(k))
                  continue;
                L(R, "Attribute without value"), R.tag.attributes[R.attribName] = "", R.attribValue = "", H(R, "onattribute", {
                  name: R.attribName,
                  value: ""
                }), R.attribName = "", k === ">" ? ge(R) : x(g, k) ? (R.attribName = k, R.state = w.ATTRIB_NAME) : (L(R, "Invalid attribute name"), R.state = w.ATTRIB);
              }
              continue;
            case w.ATTRIB_VALUE:
              if (F(k))
                continue;
              C(k) ? (R.q = k, R.state = w.ATTRIB_VALUE_QUOTED) : (R.opt.unquotedAttributeValues || U(R, "Unquoted attribute value"), R.state = w.ATTRIB_VALUE_UNQUOTED, R.attribValue = k);
              continue;
            case w.ATTRIB_VALUE_QUOTED:
              if (k !== R.q) {
                k === "&" ? R.state = w.ATTRIB_VALUE_ENTITY_Q : R.attribValue += k;
                continue;
              }
              fe(R), R.q = "", R.state = w.ATTRIB_VALUE_CLOSED;
              continue;
            case w.ATTRIB_VALUE_CLOSED:
              F(k) ? R.state = w.ATTRIB : k === ">" ? ge(R) : k === "/" ? R.state = w.OPEN_TAG_SLASH : x(g, k) ? (L(R, "No whitespace between attributes"), R.attribName = k, R.attribValue = "", R.state = w.ATTRIB_NAME) : L(R, "Invalid attribute name");
              continue;
            case w.ATTRIB_VALUE_UNQUOTED:
              if (!D(k)) {
                k === "&" ? R.state = w.ATTRIB_VALUE_ENTITY_U : R.attribValue += k;
                continue;
              }
              fe(R), k === ">" ? ge(R) : R.state = w.ATTRIB;
              continue;
            case w.CLOSE_TAG:
              if (R.tagName)
                k === ">" ? de(R) : x(q, k) ? R.tagName += k : R.script ? (R.script += "</" + R.tagName + k, R.tagName = "", R.state = w.SCRIPT) : (F(k) || L(R, "Invalid tagname in closing tag"), R.state = w.CLOSE_TAG_SAW_WHITE);
              else {
                if (F(k))
                  continue;
                b(g, k) ? R.script ? (R.script += "</" + k, R.state = w.SCRIPT) : L(R, "Invalid tagname in closing tag.") : R.tagName = k;
              }
              continue;
            case w.CLOSE_TAG_SAW_WHITE:
              if (F(k))
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
                R.opt.unparsedEntities && !Object.values(f.XML_ENTITIES).includes(Re) ? (R.entity = "", R.state = ve, R.write(Re)) : (R[qe] += Re, R.entity = "", R.state = ve);
              } else x(R.entity.length ? T : A, k) ? R.entity += k : (L(R, "Invalid character in entity name"), R[qe] += "&" + R.entity + k, R.entity = "", R.state = ve);
              continue;
            default:
              throw new Error(R, "Unknown state: " + R.state);
          }
        return R.position >= R.bufferCheckPosition && t(R), R;
      }
      String.fromCodePoint || (function() {
        var S = String.fromCharCode, R = Math.floor, te = function() {
          var k = 16384, pe = [], ye, ve, qe = -1, Re = arguments.length;
          if (!Re)
            return "";
          for (var Fe = ""; ++qe < Re; ) {
            var be = Number(arguments[qe]);
            if (!isFinite(be) || // `NaN`, `+Infinity`, or `-Infinity`
            be < 0 || // not a valid Unicode code point
            be > 1114111 || // not a valid Unicode code point
            R(be) !== be)
              throw RangeError("Invalid code point: " + be);
            be <= 65535 ? pe.push(be) : (be -= 65536, ye = (be >> 10) + 55296, ve = be % 1024 + 56320, pe.push(ye, ve)), (qe + 1 === Re || pe.length > k) && (Fe += S.apply(null, pe), pe.length = 0);
          }
          return Fe;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: te,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = te;
      })();
    })(i);
  })(sax)), sax;
}
var hasRequiredXml;
function requireXml() {
  if (hasRequiredXml) return xml;
  hasRequiredXml = 1, Object.defineProperty(xml, "__esModule", { value: !0 }), xml.XElement = void 0, xml.parseXml = e;
  const i = requireSax(), f = requireError();
  class d {
    constructor(r) {
      if (this.name = r, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !r)
        throw (0, f.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!t(r))
        throw (0, f.newError)(`Invalid element name: ${r}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(r) {
      const o = this.attributes === null ? null : this.attributes[r];
      if (o == null)
        throw (0, f.newError)(`No attribute "${r}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return o;
    }
    removeAttribute(r) {
      this.attributes !== null && delete this.attributes[r];
    }
    element(r, o = !1, a = null) {
      const l = this.elementOrNull(r, o);
      if (l === null)
        throw (0, f.newError)(a || `No element "${r}"`, "ERR_XML_MISSED_ELEMENT");
      return l;
    }
    elementOrNull(r, o = !1) {
      if (this.elements === null)
        return null;
      for (const a of this.elements)
        if (n(a, r, o))
          return a;
      return null;
    }
    getElements(r, o = !1) {
      return this.elements === null ? [] : this.elements.filter((a) => n(a, r, o));
    }
    elementValueOrEmpty(r, o = !1) {
      const a = this.elementOrNull(r, o);
      return a === null ? "" : a.value;
    }
  }
  xml.XElement = d;
  const s = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function t(u) {
    return s.test(u);
  }
  function n(u, r, o) {
    const a = u.name;
    return a === r || o === !0 && a.length === r.length && a.toLowerCase() === r.toLowerCase();
  }
  function e(u) {
    let r = null;
    const o = i.parser(!0, {}), a = [];
    return o.onopentag = (l) => {
      const c = new d(l.name);
      if (c.attributes = l.attributes, r === null)
        r = c;
      else {
        const m = a[a.length - 1];
        m.elements == null && (m.elements = []), m.elements.push(c);
      }
      a.push(c);
    }, o.onclosetag = () => {
      a.pop();
    }, o.ontext = (l) => {
      a.length > 0 && (a[a.length - 1].value = l);
    }, o.oncdata = (l) => {
      const c = a[a.length - 1];
      c.value = l, c.isCData = !0;
    }, o.onerror = (l) => {
      throw l;
    }, o.write(u), r;
  }
  return xml;
}
var hasRequiredOut;
function requireOut() {
  return hasRequiredOut || (hasRequiredOut = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.CURRENT_APP_PACKAGE_FILE_NAME = i.CURRENT_APP_INSTALLER_FILE_NAME = i.XElement = i.parseXml = i.UUID = i.parseDn = i.retry = i.githubTagPrefix = i.githubUrl = i.getS3LikeProviderBaseUrl = i.ProgressCallbackTransform = i.MemoLazy = i.safeStringifyJson = i.safeGetHeader = i.parseJson = i.HttpExecutor = i.HttpError = i.DigestTransform = i.createHttpError = i.configureRequestUrl = i.configureRequestOptionsFromUrl = i.configureRequestOptions = i.newError = i.CancellationToken = i.CancellationError = void 0, i.asArray = l;
    var f = requireCancellationToken();
    Object.defineProperty(i, "CancellationError", { enumerable: !0, get: function() {
      return f.CancellationError;
    } }), Object.defineProperty(i, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } });
    var d = requireError();
    Object.defineProperty(i, "newError", { enumerable: !0, get: function() {
      return d.newError;
    } });
    var s = requireHttpExecutor();
    Object.defineProperty(i, "configureRequestOptions", { enumerable: !0, get: function() {
      return s.configureRequestOptions;
    } }), Object.defineProperty(i, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return s.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(i, "configureRequestUrl", { enumerable: !0, get: function() {
      return s.configureRequestUrl;
    } }), Object.defineProperty(i, "createHttpError", { enumerable: !0, get: function() {
      return s.createHttpError;
    } }), Object.defineProperty(i, "DigestTransform", { enumerable: !0, get: function() {
      return s.DigestTransform;
    } }), Object.defineProperty(i, "HttpError", { enumerable: !0, get: function() {
      return s.HttpError;
    } }), Object.defineProperty(i, "HttpExecutor", { enumerable: !0, get: function() {
      return s.HttpExecutor;
    } }), Object.defineProperty(i, "parseJson", { enumerable: !0, get: function() {
      return s.parseJson;
    } }), Object.defineProperty(i, "safeGetHeader", { enumerable: !0, get: function() {
      return s.safeGetHeader;
    } }), Object.defineProperty(i, "safeStringifyJson", { enumerable: !0, get: function() {
      return s.safeStringifyJson;
    } });
    var t = requireMemoLazy();
    Object.defineProperty(i, "MemoLazy", { enumerable: !0, get: function() {
      return t.MemoLazy;
    } });
    var n = requireProgressCallbackTransform();
    Object.defineProperty(i, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return n.ProgressCallbackTransform;
    } });
    var e = requirePublishOptions();
    Object.defineProperty(i, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return e.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(i, "githubUrl", { enumerable: !0, get: function() {
      return e.githubUrl;
    } }), Object.defineProperty(i, "githubTagPrefix", { enumerable: !0, get: function() {
      return e.githubTagPrefix;
    } });
    var u = requireRetry();
    Object.defineProperty(i, "retry", { enumerable: !0, get: function() {
      return u.retry;
    } });
    var r = requireRfc2253Parser();
    Object.defineProperty(i, "parseDn", { enumerable: !0, get: function() {
      return r.parseDn;
    } });
    var o = requireUuid();
    Object.defineProperty(i, "UUID", { enumerable: !0, get: function() {
      return o.UUID;
    } });
    var a = requireXml();
    Object.defineProperty(i, "parseXml", { enumerable: !0, get: function() {
      return a.parseXml;
    } }), Object.defineProperty(i, "XElement", { enumerable: !0, get: function() {
      return a.XElement;
    } }), i.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", i.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(c) {
      return c == null ? [] : Array.isArray(c) ? c : [c];
    }
  })(out)), out;
}
var jsYaml = {}, loader = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  function i(e) {
    return typeof e > "u" || e === null;
  }
  function f(e) {
    return typeof e == "object" && e !== null;
  }
  function d(e) {
    return Array.isArray(e) ? e : i(e) ? [] : [e];
  }
  function s(e, u) {
    var r, o, a, l;
    if (u)
      for (l = Object.keys(u), r = 0, o = l.length; r < o; r += 1)
        a = l[r], e[a] = u[a];
    return e;
  }
  function t(e, u) {
    var r = "", o;
    for (o = 0; o < u; o += 1)
      r += e;
    return r;
  }
  function n(e) {
    return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
  }
  return common.isNothing = i, common.isObject = f, common.toArray = d, common.repeat = t, common.isNegativeZero = n, common.extend = s, common;
}
var exception, hasRequiredException;
function requireException() {
  if (hasRequiredException) return exception;
  hasRequiredException = 1;
  function i(d, s) {
    var t = "", n = d.reason || "(unknown reason)";
    return d.mark ? (d.mark.name && (t += 'in "' + d.mark.name + '" '), t += "(" + (d.mark.line + 1) + ":" + (d.mark.column + 1) + ")", !s && d.mark.snippet && (t += `

` + d.mark.snippet), n + " " + t) : n;
  }
  function f(d, s) {
    Error.call(this), this.name = "YAMLException", this.reason = d, this.mark = s, this.message = i(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return f.prototype = Object.create(Error.prototype), f.prototype.constructor = f, f.prototype.toString = function(s) {
    return this.name + ": " + i(this, s);
  }, exception = f, exception;
}
var snippet, hasRequiredSnippet;
function requireSnippet() {
  if (hasRequiredSnippet) return snippet;
  hasRequiredSnippet = 1;
  var i = requireCommon();
  function f(t, n, e, u, r) {
    var o = "", a = "", l = Math.floor(r / 2) - 1;
    return u - n > l && (o = " ... ", n = u - l + o.length), e - u > l && (a = " ...", e = u + l - a.length), {
      str: o + t.slice(n, e).replace(/\t/g, "→") + a,
      pos: u - n + o.length
      // relative position
    };
  }
  function d(t, n) {
    return i.repeat(" ", n - t.length) + t;
  }
  function s(t, n) {
    if (n = Object.create(n || null), !t.buffer) return null;
    n.maxLength || (n.maxLength = 79), typeof n.indent != "number" && (n.indent = 1), typeof n.linesBefore != "number" && (n.linesBefore = 3), typeof n.linesAfter != "number" && (n.linesAfter = 2);
    for (var e = /\r?\n|\r|\0/g, u = [0], r = [], o, a = -1; o = e.exec(t.buffer); )
      r.push(o.index), u.push(o.index + o[0].length), t.position <= o.index && a < 0 && (a = u.length - 2);
    a < 0 && (a = u.length - 1);
    var l = "", c, m, y = Math.min(t.line + n.linesAfter, r.length).toString().length, v = n.maxLength - (n.indent + y + 3);
    for (c = 1; c <= n.linesBefore && !(a - c < 0); c++)
      m = f(
        t.buffer,
        u[a - c],
        r[a - c],
        t.position - (u[a] - u[a - c]),
        v
      ), l = i.repeat(" ", n.indent) + d((t.line - c + 1).toString(), y) + " | " + m.str + `
` + l;
    for (m = f(t.buffer, u[a], r[a], t.position, v), l += i.repeat(" ", n.indent) + d((t.line + 1).toString(), y) + " | " + m.str + `
`, l += i.repeat("-", n.indent + y + 3 + m.pos) + `^
`, c = 1; c <= n.linesAfter && !(a + c >= r.length); c++)
      m = f(
        t.buffer,
        u[a + c],
        r[a + c],
        t.position - (u[a] - u[a + c]),
        v
      ), l += i.repeat(" ", n.indent) + d((t.line + c + 1).toString(), y) + " | " + m.str + `
`;
    return l.replace(/\n$/, "");
  }
  return snippet = s, snippet;
}
var type, hasRequiredType;
function requireType() {
  if (hasRequiredType) return type;
  hasRequiredType = 1;
  var i = requireException(), f = [
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
  ], d = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function s(n) {
    var e = {};
    return n !== null && Object.keys(n).forEach(function(u) {
      n[u].forEach(function(r) {
        e[String(r)] = u;
      });
    }), e;
  }
  function t(n, e) {
    if (e = e || {}, Object.keys(e).forEach(function(u) {
      if (f.indexOf(u) === -1)
        throw new i('Unknown option "' + u + '" is met in definition of "' + n + '" YAML type.');
    }), this.options = e, this.tag = n, this.kind = e.kind || null, this.resolve = e.resolve || function() {
      return !0;
    }, this.construct = e.construct || function(u) {
      return u;
    }, this.instanceOf = e.instanceOf || null, this.predicate = e.predicate || null, this.represent = e.represent || null, this.representName = e.representName || null, this.defaultStyle = e.defaultStyle || null, this.multi = e.multi || !1, this.styleAliases = s(e.styleAliases || null), d.indexOf(this.kind) === -1)
      throw new i('Unknown kind "' + this.kind + '" is specified for "' + n + '" YAML type.');
  }
  return type = t, type;
}
var schema, hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1;
  var i = requireException(), f = requireType();
  function d(n, e) {
    var u = [];
    return n[e].forEach(function(r) {
      var o = u.length;
      u.forEach(function(a, l) {
        a.tag === r.tag && a.kind === r.kind && a.multi === r.multi && (o = l);
      }), u[o] = r;
    }), u;
  }
  function s() {
    var n = {
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
    }, e, u;
    function r(o) {
      o.multi ? (n.multi[o.kind].push(o), n.multi.fallback.push(o)) : n[o.kind][o.tag] = n.fallback[o.tag] = o;
    }
    for (e = 0, u = arguments.length; e < u; e += 1)
      arguments[e].forEach(r);
    return n;
  }
  function t(n) {
    return this.extend(n);
  }
  return t.prototype.extend = function(e) {
    var u = [], r = [];
    if (e instanceof f)
      r.push(e);
    else if (Array.isArray(e))
      r = r.concat(e);
    else if (e && (Array.isArray(e.implicit) || Array.isArray(e.explicit)))
      e.implicit && (u = u.concat(e.implicit)), e.explicit && (r = r.concat(e.explicit));
    else
      throw new i("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    u.forEach(function(a) {
      if (!(a instanceof f))
        throw new i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (a.loadKind && a.loadKind !== "scalar")
        throw new i("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (a.multi)
        throw new i("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), r.forEach(function(a) {
      if (!(a instanceof f))
        throw new i("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var o = Object.create(t.prototype);
    return o.implicit = (this.implicit || []).concat(u), o.explicit = (this.explicit || []).concat(r), o.compiledImplicit = d(o, "implicit"), o.compiledExplicit = d(o, "explicit"), o.compiledTypeMap = s(o.compiledImplicit, o.compiledExplicit), o;
  }, schema = t, schema;
}
var str, hasRequiredStr;
function requireStr() {
  if (hasRequiredStr) return str;
  hasRequiredStr = 1;
  var i = requireType();
  return str = new i("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(f) {
      return f !== null ? f : "";
    }
  }), str;
}
var seq, hasRequiredSeq;
function requireSeq() {
  if (hasRequiredSeq) return seq;
  hasRequiredSeq = 1;
  var i = requireType();
  return seq = new i("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(f) {
      return f !== null ? f : [];
    }
  }), seq;
}
var map, hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  var i = requireType();
  return map = new i("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(f) {
      return f !== null ? f : {};
    }
  }), map;
}
var failsafe, hasRequiredFailsafe;
function requireFailsafe() {
  if (hasRequiredFailsafe) return failsafe;
  hasRequiredFailsafe = 1;
  var i = requireSchema();
  return failsafe = new i({
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
  var i = requireType();
  function f(t) {
    if (t === null) return !0;
    var n = t.length;
    return n === 1 && t === "~" || n === 4 && (t === "null" || t === "Null" || t === "NULL");
  }
  function d() {
    return null;
  }
  function s(t) {
    return t === null;
  }
  return _null = new i("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: s,
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
  var i = requireType();
  function f(t) {
    if (t === null) return !1;
    var n = t.length;
    return n === 4 && (t === "true" || t === "True" || t === "TRUE") || n === 5 && (t === "false" || t === "False" || t === "FALSE");
  }
  function d(t) {
    return t === "true" || t === "True" || t === "TRUE";
  }
  function s(t) {
    return Object.prototype.toString.call(t) === "[object Boolean]";
  }
  return bool = new i("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: f,
    construct: d,
    predicate: s,
    represent: {
      lowercase: function(t) {
        return t ? "true" : "false";
      },
      uppercase: function(t) {
        return t ? "TRUE" : "FALSE";
      },
      camelcase: function(t) {
        return t ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), bool;
}
var int, hasRequiredInt;
function requireInt() {
  if (hasRequiredInt) return int;
  hasRequiredInt = 1;
  var i = requireCommon(), f = requireType();
  function d(r) {
    return 48 <= r && r <= 57 || 65 <= r && r <= 70 || 97 <= r && r <= 102;
  }
  function s(r) {
    return 48 <= r && r <= 55;
  }
  function t(r) {
    return 48 <= r && r <= 57;
  }
  function n(r) {
    if (r === null) return !1;
    var o = r.length, a = 0, l = !1, c;
    if (!o) return !1;
    if (c = r[a], (c === "-" || c === "+") && (c = r[++a]), c === "0") {
      if (a + 1 === o) return !0;
      if (c = r[++a], c === "b") {
        for (a++; a < o; a++)
          if (c = r[a], c !== "_") {
            if (c !== "0" && c !== "1") return !1;
            l = !0;
          }
        return l && c !== "_";
      }
      if (c === "x") {
        for (a++; a < o; a++)
          if (c = r[a], c !== "_") {
            if (!d(r.charCodeAt(a))) return !1;
            l = !0;
          }
        return l && c !== "_";
      }
      if (c === "o") {
        for (a++; a < o; a++)
          if (c = r[a], c !== "_") {
            if (!s(r.charCodeAt(a))) return !1;
            l = !0;
          }
        return l && c !== "_";
      }
    }
    if (c === "_") return !1;
    for (; a < o; a++)
      if (c = r[a], c !== "_") {
        if (!t(r.charCodeAt(a)))
          return !1;
        l = !0;
      }
    return !(!l || c === "_");
  }
  function e(r) {
    var o = r, a = 1, l;
    if (o.indexOf("_") !== -1 && (o = o.replace(/_/g, "")), l = o[0], (l === "-" || l === "+") && (l === "-" && (a = -1), o = o.slice(1), l = o[0]), o === "0") return 0;
    if (l === "0") {
      if (o[1] === "b") return a * parseInt(o.slice(2), 2);
      if (o[1] === "x") return a * parseInt(o.slice(2), 16);
      if (o[1] === "o") return a * parseInt(o.slice(2), 8);
    }
    return a * parseInt(o, 10);
  }
  function u(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && r % 1 === 0 && !i.isNegativeZero(r);
  }
  return int = new f("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: n,
    construct: e,
    predicate: u,
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
  var i = requireCommon(), f = requireType(), d = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function s(r) {
    return !(r === null || !d.test(r) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    r[r.length - 1] === "_");
  }
  function t(r) {
    var o, a;
    return o = r.replace(/_/g, "").toLowerCase(), a = o[0] === "-" ? -1 : 1, "+-".indexOf(o[0]) >= 0 && (o = o.slice(1)), o === ".inf" ? a === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : o === ".nan" ? NaN : a * parseFloat(o, 10);
  }
  var n = /^[-+]?[0-9]+e/;
  function e(r, o) {
    var a;
    if (isNaN(r))
      switch (o) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === r)
      switch (o) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === r)
      switch (o) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (i.isNegativeZero(r))
      return "-0.0";
    return a = r.toString(10), n.test(a) ? a.replace("e", ".e") : a;
  }
  function u(r) {
    return Object.prototype.toString.call(r) === "[object Number]" && (r % 1 !== 0 || i.isNegativeZero(r));
  }
  return float = new f("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: s,
    construct: t,
    predicate: u,
    represent: e,
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
  var i = requireType(), f = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), d = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function s(e) {
    return e === null ? !1 : f.exec(e) !== null || d.exec(e) !== null;
  }
  function t(e) {
    var u, r, o, a, l, c, m, y = 0, v = null, g, q, A;
    if (u = f.exec(e), u === null && (u = d.exec(e)), u === null) throw new Error("Date resolve error");
    if (r = +u[1], o = +u[2] - 1, a = +u[3], !u[4])
      return new Date(Date.UTC(r, o, a));
    if (l = +u[4], c = +u[5], m = +u[6], u[7]) {
      for (y = u[7].slice(0, 3); y.length < 3; )
        y += "0";
      y = +y;
    }
    return u[9] && (g = +u[10], q = +(u[11] || 0), v = (g * 60 + q) * 6e4, u[9] === "-" && (v = -v)), A = new Date(Date.UTC(r, o, a, l, c, m, y)), v && A.setTime(A.getTime() - v), A;
  }
  function n(e) {
    return e.toISOString();
  }
  return timestamp = new i("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: s,
    construct: t,
    instanceOf: Date,
    represent: n
  }), timestamp;
}
var merge, hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  var i = requireType();
  function f(d) {
    return d === "<<" || d === null;
  }
  return merge = new i("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: f
  }), merge;
}
var binary, hasRequiredBinary;
function requireBinary() {
  if (hasRequiredBinary) return binary;
  hasRequiredBinary = 1;
  var i = requireType(), f = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function d(e) {
    if (e === null) return !1;
    var u, r, o = 0, a = e.length, l = f;
    for (r = 0; r < a; r++)
      if (u = l.indexOf(e.charAt(r)), !(u > 64)) {
        if (u < 0) return !1;
        o += 6;
      }
    return o % 8 === 0;
  }
  function s(e) {
    var u, r, o = e.replace(/[\r\n=]/g, ""), a = o.length, l = f, c = 0, m = [];
    for (u = 0; u < a; u++)
      u % 4 === 0 && u && (m.push(c >> 16 & 255), m.push(c >> 8 & 255), m.push(c & 255)), c = c << 6 | l.indexOf(o.charAt(u));
    return r = a % 4 * 6, r === 0 ? (m.push(c >> 16 & 255), m.push(c >> 8 & 255), m.push(c & 255)) : r === 18 ? (m.push(c >> 10 & 255), m.push(c >> 2 & 255)) : r === 12 && m.push(c >> 4 & 255), new Uint8Array(m);
  }
  function t(e) {
    var u = "", r = 0, o, a, l = e.length, c = f;
    for (o = 0; o < l; o++)
      o % 3 === 0 && o && (u += c[r >> 18 & 63], u += c[r >> 12 & 63], u += c[r >> 6 & 63], u += c[r & 63]), r = (r << 8) + e[o];
    return a = l % 3, a === 0 ? (u += c[r >> 18 & 63], u += c[r >> 12 & 63], u += c[r >> 6 & 63], u += c[r & 63]) : a === 2 ? (u += c[r >> 10 & 63], u += c[r >> 4 & 63], u += c[r << 2 & 63], u += c[64]) : a === 1 && (u += c[r >> 2 & 63], u += c[r << 4 & 63], u += c[64], u += c[64]), u;
  }
  function n(e) {
    return Object.prototype.toString.call(e) === "[object Uint8Array]";
  }
  return binary = new i("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: d,
    construct: s,
    predicate: n,
    represent: t
  }), binary;
}
var omap, hasRequiredOmap;
function requireOmap() {
  if (hasRequiredOmap) return omap;
  hasRequiredOmap = 1;
  var i = requireType(), f = Object.prototype.hasOwnProperty, d = Object.prototype.toString;
  function s(n) {
    if (n === null) return !0;
    var e = [], u, r, o, a, l, c = n;
    for (u = 0, r = c.length; u < r; u += 1) {
      if (o = c[u], l = !1, d.call(o) !== "[object Object]") return !1;
      for (a in o)
        if (f.call(o, a))
          if (!l) l = !0;
          else return !1;
      if (!l) return !1;
      if (e.indexOf(a) === -1) e.push(a);
      else return !1;
    }
    return !0;
  }
  function t(n) {
    return n !== null ? n : [];
  }
  return omap = new i("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: s,
    construct: t
  }), omap;
}
var pairs, hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  var i = requireType(), f = Object.prototype.toString;
  function d(t) {
    if (t === null) return !0;
    var n, e, u, r, o, a = t;
    for (o = new Array(a.length), n = 0, e = a.length; n < e; n += 1) {
      if (u = a[n], f.call(u) !== "[object Object]" || (r = Object.keys(u), r.length !== 1)) return !1;
      o[n] = [r[0], u[r[0]]];
    }
    return !0;
  }
  function s(t) {
    if (t === null) return [];
    var n, e, u, r, o, a = t;
    for (o = new Array(a.length), n = 0, e = a.length; n < e; n += 1)
      u = a[n], r = Object.keys(u), o[n] = [r[0], u[r[0]]];
    return o;
  }
  return pairs = new i("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: d,
    construct: s
  }), pairs;
}
var set, hasRequiredSet;
function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  var i = requireType(), f = Object.prototype.hasOwnProperty;
  function d(t) {
    if (t === null) return !0;
    var n, e = t;
    for (n in e)
      if (f.call(e, n) && e[n] !== null)
        return !1;
    return !0;
  }
  function s(t) {
    return t !== null ? t : {};
  }
  return set = new i("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: d,
    construct: s
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
  var i = requireCommon(), f = requireException(), d = requireSnippet(), s = require_default(), t = Object.prototype.hasOwnProperty, n = 1, e = 2, u = 3, r = 4, o = 1, a = 2, l = 3, c = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, m = /[\x85\u2028\u2029]/, y = /[,\[\]\{\}]/, v = /^(?:!|!!|![a-z\-]+!)$/i, g = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function q(p) {
    return Object.prototype.toString.call(p);
  }
  function A(p) {
    return p === 10 || p === 13;
  }
  function T(p) {
    return p === 9 || p === 32;
  }
  function F(p) {
    return p === 9 || p === 32 || p === 10 || p === 13;
  }
  function C(p) {
    return p === 44 || p === 91 || p === 93 || p === 123 || p === 125;
  }
  function D(p) {
    var ee;
    return 48 <= p && p <= 57 ? p - 48 : (ee = p | 32, 97 <= ee && ee <= 102 ? ee - 97 + 10 : -1);
  }
  function x(p) {
    return p === 120 ? 2 : p === 117 ? 4 : p === 85 ? 8 : 0;
  }
  function b(p) {
    return 48 <= p && p <= 57 ? p - 48 : -1;
  }
  function w(p) {
    return p === 48 ? "\0" : p === 97 ? "\x07" : p === 98 ? "\b" : p === 116 || p === 9 ? "	" : p === 110 ? `
` : p === 118 ? "\v" : p === 102 ? "\f" : p === 114 ? "\r" : p === 101 ? "\x1B" : p === 32 ? " " : p === 34 ? '"' : p === 47 ? "/" : p === 92 ? "\\" : p === 78 ? "" : p === 95 ? " " : p === 76 ? "\u2028" : p === 80 ? "\u2029" : "";
  }
  function z(p) {
    return p <= 65535 ? String.fromCharCode(p) : String.fromCharCode(
      (p - 65536 >> 10) + 55296,
      (p - 65536 & 1023) + 56320
    );
  }
  function J(p, ee, se) {
    ee === "__proto__" ? Object.defineProperty(p, ee, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: se
    }) : p[ee] = se;
  }
  for (var H = new Array(256), X = new Array(256), N = 0; N < 256; N++)
    H[N] = w(N) ? 1 : 0, X[N] = w(N);
  function U(p, ee) {
    this.input = p, this.filename = ee.filename || null, this.schema = ee.schema || s, this.onWarning = ee.onWarning || null, this.legacy = ee.legacy || !1, this.json = ee.json || !1, this.listener = ee.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = p.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function ne(p, ee) {
    var se = {
      name: p.filename,
      buffer: p.input.slice(0, -1),
      // omit trailing \0
      position: p.position,
      line: p.line,
      column: p.position - p.lineStart
    };
    return se.snippet = d(se), new f(ee, se);
  }
  function L(p, ee) {
    throw ne(p, ee);
  }
  function K(p, ee) {
    p.onWarning && p.onWarning.call(null, ne(p, ee));
  }
  var ue = {
    YAML: function(ee, se, h) {
      var O, j, Q;
      ee.version !== null && L(ee, "duplication of %YAML directive"), h.length !== 1 && L(ee, "YAML directive accepts exactly one argument"), O = /^([0-9]+)\.([0-9]+)$/.exec(h[0]), O === null && L(ee, "ill-formed argument of the YAML directive"), j = parseInt(O[1], 10), Q = parseInt(O[2], 10), j !== 1 && L(ee, "unacceptable YAML version of the document"), ee.version = h[0], ee.checkLineBreaks = Q < 2, Q !== 1 && Q !== 2 && K(ee, "unsupported YAML version of the document");
    },
    TAG: function(ee, se, h) {
      var O, j;
      h.length !== 2 && L(ee, "TAG directive accepts exactly two arguments"), O = h[0], j = h[1], v.test(O) || L(ee, "ill-formed tag handle (first argument) of the TAG directive"), t.call(ee.tagMap, O) && L(ee, 'there is a previously declared suffix for "' + O + '" tag handle'), g.test(j) || L(ee, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        j = decodeURIComponent(j);
      } catch {
        L(ee, "tag prefix is malformed: " + j);
      }
      ee.tagMap[O] = j;
    }
  };
  function fe(p, ee, se, h) {
    var O, j, Q, V;
    if (ee < se) {
      if (V = p.input.slice(ee, se), h)
        for (O = 0, j = V.length; O < j; O += 1)
          Q = V.charCodeAt(O), Q === 9 || 32 <= Q && Q <= 1114111 || L(p, "expected valid JSON character");
      else c.test(V) && L(p, "the stream contains non-printable characters");
      p.result += V;
    }
  }
  function ge(p, ee, se, h) {
    var O, j, Q, V;
    for (i.isObject(se) || L(p, "cannot merge mappings; the provided source object is unacceptable"), O = Object.keys(se), Q = 0, V = O.length; Q < V; Q += 1)
      j = O[Q], t.call(ee, j) || (J(ee, j, se[j]), h[j] = !0);
  }
  function de(p, ee, se, h, O, j, Q, V, _) {
    var M, Z;
    if (Array.isArray(O))
      for (O = Array.prototype.slice.call(O), M = 0, Z = O.length; M < Z; M += 1)
        Array.isArray(O[M]) && L(p, "nested arrays are not supported inside keys"), typeof O == "object" && q(O[M]) === "[object Object]" && (O[M] = "[object Object]");
    if (typeof O == "object" && q(O) === "[object Object]" && (O = "[object Object]"), O = String(O), ee === null && (ee = {}), h === "tag:yaml.org,2002:merge")
      if (Array.isArray(j))
        for (M = 0, Z = j.length; M < Z; M += 1)
          ge(p, ee, j[M], se);
      else
        ge(p, ee, j, se);
    else
      !p.json && !t.call(se, O) && t.call(ee, O) && (p.line = Q || p.line, p.lineStart = V || p.lineStart, p.position = _ || p.position, L(p, "duplicated mapping key")), J(ee, O, j), delete se[O];
    return ee;
  }
  function we(p) {
    var ee;
    ee = p.input.charCodeAt(p.position), ee === 10 ? p.position++ : ee === 13 ? (p.position++, p.input.charCodeAt(p.position) === 10 && p.position++) : L(p, "a line break is expected"), p.line += 1, p.lineStart = p.position, p.firstTabInLine = -1;
  }
  function _e(p, ee, se) {
    for (var h = 0, O = p.input.charCodeAt(p.position); O !== 0; ) {
      for (; T(O); )
        O === 9 && p.firstTabInLine === -1 && (p.firstTabInLine = p.position), O = p.input.charCodeAt(++p.position);
      if (ee && O === 35)
        do
          O = p.input.charCodeAt(++p.position);
        while (O !== 10 && O !== 13 && O !== 0);
      if (A(O))
        for (we(p), O = p.input.charCodeAt(p.position), h++, p.lineIndent = 0; O === 32; )
          p.lineIndent++, O = p.input.charCodeAt(++p.position);
      else
        break;
    }
    return se !== -1 && h !== 0 && p.lineIndent < se && K(p, "deficient indentation"), h;
  }
  function ie(p) {
    var ee = p.position, se;
    return se = p.input.charCodeAt(ee), !!((se === 45 || se === 46) && se === p.input.charCodeAt(ee + 1) && se === p.input.charCodeAt(ee + 2) && (ee += 3, se = p.input.charCodeAt(ee), se === 0 || F(se)));
  }
  function Ee(p, ee) {
    ee === 1 ? p.result += " " : ee > 1 && (p.result += i.repeat(`
`, ee - 1));
  }
  function S(p, ee, se) {
    var h, O, j, Q, V, _, M, Z, Y = p.kind, E = p.result, $;
    if ($ = p.input.charCodeAt(p.position), F($) || C($) || $ === 35 || $ === 38 || $ === 42 || $ === 33 || $ === 124 || $ === 62 || $ === 39 || $ === 34 || $ === 37 || $ === 64 || $ === 96 || ($ === 63 || $ === 45) && (O = p.input.charCodeAt(p.position + 1), F(O) || se && C(O)))
      return !1;
    for (p.kind = "scalar", p.result = "", j = Q = p.position, V = !1; $ !== 0; ) {
      if ($ === 58) {
        if (O = p.input.charCodeAt(p.position + 1), F(O) || se && C(O))
          break;
      } else if ($ === 35) {
        if (h = p.input.charCodeAt(p.position - 1), F(h))
          break;
      } else {
        if (p.position === p.lineStart && ie(p) || se && C($))
          break;
        if (A($))
          if (_ = p.line, M = p.lineStart, Z = p.lineIndent, _e(p, !1, -1), p.lineIndent >= ee) {
            V = !0, $ = p.input.charCodeAt(p.position);
            continue;
          } else {
            p.position = Q, p.line = _, p.lineStart = M, p.lineIndent = Z;
            break;
          }
      }
      V && (fe(p, j, Q, !1), Ee(p, p.line - _), j = Q = p.position, V = !1), T($) || (Q = p.position + 1), $ = p.input.charCodeAt(++p.position);
    }
    return fe(p, j, Q, !1), p.result ? !0 : (p.kind = Y, p.result = E, !1);
  }
  function R(p, ee) {
    var se, h, O;
    if (se = p.input.charCodeAt(p.position), se !== 39)
      return !1;
    for (p.kind = "scalar", p.result = "", p.position++, h = O = p.position; (se = p.input.charCodeAt(p.position)) !== 0; )
      if (se === 39)
        if (fe(p, h, p.position, !0), se = p.input.charCodeAt(++p.position), se === 39)
          h = p.position, p.position++, O = p.position;
        else
          return !0;
      else A(se) ? (fe(p, h, O, !0), Ee(p, _e(p, !1, ee)), h = O = p.position) : p.position === p.lineStart && ie(p) ? L(p, "unexpected end of the document within a single quoted scalar") : (p.position++, O = p.position);
    L(p, "unexpected end of the stream within a single quoted scalar");
  }
  function te(p, ee) {
    var se, h, O, j, Q, V;
    if (V = p.input.charCodeAt(p.position), V !== 34)
      return !1;
    for (p.kind = "scalar", p.result = "", p.position++, se = h = p.position; (V = p.input.charCodeAt(p.position)) !== 0; ) {
      if (V === 34)
        return fe(p, se, p.position, !0), p.position++, !0;
      if (V === 92) {
        if (fe(p, se, p.position, !0), V = p.input.charCodeAt(++p.position), A(V))
          _e(p, !1, ee);
        else if (V < 256 && H[V])
          p.result += X[V], p.position++;
        else if ((Q = x(V)) > 0) {
          for (O = Q, j = 0; O > 0; O--)
            V = p.input.charCodeAt(++p.position), (Q = D(V)) >= 0 ? j = (j << 4) + Q : L(p, "expected hexadecimal character");
          p.result += z(j), p.position++;
        } else
          L(p, "unknown escape sequence");
        se = h = p.position;
      } else A(V) ? (fe(p, se, h, !0), Ee(p, _e(p, !1, ee)), se = h = p.position) : p.position === p.lineStart && ie(p) ? L(p, "unexpected end of the document within a double quoted scalar") : (p.position++, h = p.position);
    }
    L(p, "unexpected end of the stream within a double quoted scalar");
  }
  function k(p, ee) {
    var se = !0, h, O, j, Q = p.tag, V, _ = p.anchor, M, Z, Y, E, $, I = /* @__PURE__ */ Object.create(null), G, B, oe, ae;
    if (ae = p.input.charCodeAt(p.position), ae === 91)
      Z = 93, $ = !1, V = [];
    else if (ae === 123)
      Z = 125, $ = !0, V = {};
    else
      return !1;
    for (p.anchor !== null && (p.anchorMap[p.anchor] = V), ae = p.input.charCodeAt(++p.position); ae !== 0; ) {
      if (_e(p, !0, ee), ae = p.input.charCodeAt(p.position), ae === Z)
        return p.position++, p.tag = Q, p.anchor = _, p.kind = $ ? "mapping" : "sequence", p.result = V, !0;
      se ? ae === 44 && L(p, "expected the node content, but found ','") : L(p, "missed comma between flow collection entries"), B = G = oe = null, Y = E = !1, ae === 63 && (M = p.input.charCodeAt(p.position + 1), F(M) && (Y = E = !0, p.position++, _e(p, !0, ee))), h = p.line, O = p.lineStart, j = p.position, be(p, ee, n, !1, !0), B = p.tag, G = p.result, _e(p, !0, ee), ae = p.input.charCodeAt(p.position), (E || p.line === h) && ae === 58 && (Y = !0, ae = p.input.charCodeAt(++p.position), _e(p, !0, ee), be(p, ee, n, !1, !0), oe = p.result), $ ? de(p, V, I, B, G, oe, h, O, j) : Y ? V.push(de(p, null, I, B, G, oe, h, O, j)) : V.push(G), _e(p, !0, ee), ae = p.input.charCodeAt(p.position), ae === 44 ? (se = !0, ae = p.input.charCodeAt(++p.position)) : se = !1;
    }
    L(p, "unexpected end of the stream within a flow collection");
  }
  function pe(p, ee) {
    var se, h, O = o, j = !1, Q = !1, V = ee, _ = 0, M = !1, Z, Y;
    if (Y = p.input.charCodeAt(p.position), Y === 124)
      h = !1;
    else if (Y === 62)
      h = !0;
    else
      return !1;
    for (p.kind = "scalar", p.result = ""; Y !== 0; )
      if (Y = p.input.charCodeAt(++p.position), Y === 43 || Y === 45)
        o === O ? O = Y === 43 ? l : a : L(p, "repeat of a chomping mode identifier");
      else if ((Z = b(Y)) >= 0)
        Z === 0 ? L(p, "bad explicit indentation width of a block scalar; it cannot be less than one") : Q ? L(p, "repeat of an indentation width identifier") : (V = ee + Z - 1, Q = !0);
      else
        break;
    if (T(Y)) {
      do
        Y = p.input.charCodeAt(++p.position);
      while (T(Y));
      if (Y === 35)
        do
          Y = p.input.charCodeAt(++p.position);
        while (!A(Y) && Y !== 0);
    }
    for (; Y !== 0; ) {
      for (we(p), p.lineIndent = 0, Y = p.input.charCodeAt(p.position); (!Q || p.lineIndent < V) && Y === 32; )
        p.lineIndent++, Y = p.input.charCodeAt(++p.position);
      if (!Q && p.lineIndent > V && (V = p.lineIndent), A(Y)) {
        _++;
        continue;
      }
      if (p.lineIndent < V) {
        O === l ? p.result += i.repeat(`
`, j ? 1 + _ : _) : O === o && j && (p.result += `
`);
        break;
      }
      for (h ? T(Y) ? (M = !0, p.result += i.repeat(`
`, j ? 1 + _ : _)) : M ? (M = !1, p.result += i.repeat(`
`, _ + 1)) : _ === 0 ? j && (p.result += " ") : p.result += i.repeat(`
`, _) : p.result += i.repeat(`
`, j ? 1 + _ : _), j = !0, Q = !0, _ = 0, se = p.position; !A(Y) && Y !== 0; )
        Y = p.input.charCodeAt(++p.position);
      fe(p, se, p.position, !1);
    }
    return !0;
  }
  function ye(p, ee) {
    var se, h = p.tag, O = p.anchor, j = [], Q, V = !1, _;
    if (p.firstTabInLine !== -1) return !1;
    for (p.anchor !== null && (p.anchorMap[p.anchor] = j), _ = p.input.charCodeAt(p.position); _ !== 0 && (p.firstTabInLine !== -1 && (p.position = p.firstTabInLine, L(p, "tab characters must not be used in indentation")), !(_ !== 45 || (Q = p.input.charCodeAt(p.position + 1), !F(Q)))); ) {
      if (V = !0, p.position++, _e(p, !0, -1) && p.lineIndent <= ee) {
        j.push(null), _ = p.input.charCodeAt(p.position);
        continue;
      }
      if (se = p.line, be(p, ee, u, !1, !0), j.push(p.result), _e(p, !0, -1), _ = p.input.charCodeAt(p.position), (p.line === se || p.lineIndent > ee) && _ !== 0)
        L(p, "bad indentation of a sequence entry");
      else if (p.lineIndent < ee)
        break;
    }
    return V ? (p.tag = h, p.anchor = O, p.kind = "sequence", p.result = j, !0) : !1;
  }
  function ve(p, ee, se) {
    var h, O, j, Q, V, _, M = p.tag, Z = p.anchor, Y = {}, E = /* @__PURE__ */ Object.create(null), $ = null, I = null, G = null, B = !1, oe = !1, ae;
    if (p.firstTabInLine !== -1) return !1;
    for (p.anchor !== null && (p.anchorMap[p.anchor] = Y), ae = p.input.charCodeAt(p.position); ae !== 0; ) {
      if (!B && p.firstTabInLine !== -1 && (p.position = p.firstTabInLine, L(p, "tab characters must not be used in indentation")), h = p.input.charCodeAt(p.position + 1), j = p.line, (ae === 63 || ae === 58) && F(h))
        ae === 63 ? (B && (de(p, Y, E, $, I, null, Q, V, _), $ = I = G = null), oe = !0, B = !0, O = !0) : B ? (B = !1, O = !0) : L(p, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), p.position += 1, ae = h;
      else {
        if (Q = p.line, V = p.lineStart, _ = p.position, !be(p, se, e, !1, !0))
          break;
        if (p.line === j) {
          for (ae = p.input.charCodeAt(p.position); T(ae); )
            ae = p.input.charCodeAt(++p.position);
          if (ae === 58)
            ae = p.input.charCodeAt(++p.position), F(ae) || L(p, "a whitespace character is expected after the key-value separator within a block mapping"), B && (de(p, Y, E, $, I, null, Q, V, _), $ = I = G = null), oe = !0, B = !1, O = !1, $ = p.tag, I = p.result;
          else if (oe)
            L(p, "can not read an implicit mapping pair; a colon is missed");
          else
            return p.tag = M, p.anchor = Z, !0;
        } else if (oe)
          L(p, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return p.tag = M, p.anchor = Z, !0;
      }
      if ((p.line === j || p.lineIndent > ee) && (B && (Q = p.line, V = p.lineStart, _ = p.position), be(p, ee, r, !0, O) && (B ? I = p.result : G = p.result), B || (de(p, Y, E, $, I, G, Q, V, _), $ = I = G = null), _e(p, !0, -1), ae = p.input.charCodeAt(p.position)), (p.line === j || p.lineIndent > ee) && ae !== 0)
        L(p, "bad indentation of a mapping entry");
      else if (p.lineIndent < ee)
        break;
    }
    return B && de(p, Y, E, $, I, null, Q, V, _), oe && (p.tag = M, p.anchor = Z, p.kind = "mapping", p.result = Y), oe;
  }
  function qe(p) {
    var ee, se = !1, h = !1, O, j, Q;
    if (Q = p.input.charCodeAt(p.position), Q !== 33) return !1;
    if (p.tag !== null && L(p, "duplication of a tag property"), Q = p.input.charCodeAt(++p.position), Q === 60 ? (se = !0, Q = p.input.charCodeAt(++p.position)) : Q === 33 ? (h = !0, O = "!!", Q = p.input.charCodeAt(++p.position)) : O = "!", ee = p.position, se) {
      do
        Q = p.input.charCodeAt(++p.position);
      while (Q !== 0 && Q !== 62);
      p.position < p.length ? (j = p.input.slice(ee, p.position), Q = p.input.charCodeAt(++p.position)) : L(p, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Q !== 0 && !F(Q); )
        Q === 33 && (h ? L(p, "tag suffix cannot contain exclamation marks") : (O = p.input.slice(ee - 1, p.position + 1), v.test(O) || L(p, "named tag handle cannot contain such characters"), h = !0, ee = p.position + 1)), Q = p.input.charCodeAt(++p.position);
      j = p.input.slice(ee, p.position), y.test(j) && L(p, "tag suffix cannot contain flow indicator characters");
    }
    j && !g.test(j) && L(p, "tag name cannot contain such characters: " + j);
    try {
      j = decodeURIComponent(j);
    } catch {
      L(p, "tag name is malformed: " + j);
    }
    return se ? p.tag = j : t.call(p.tagMap, O) ? p.tag = p.tagMap[O] + j : O === "!" ? p.tag = "!" + j : O === "!!" ? p.tag = "tag:yaml.org,2002:" + j : L(p, 'undeclared tag handle "' + O + '"'), !0;
  }
  function Re(p) {
    var ee, se;
    if (se = p.input.charCodeAt(p.position), se !== 38) return !1;
    for (p.anchor !== null && L(p, "duplication of an anchor property"), se = p.input.charCodeAt(++p.position), ee = p.position; se !== 0 && !F(se) && !C(se); )
      se = p.input.charCodeAt(++p.position);
    return p.position === ee && L(p, "name of an anchor node must contain at least one character"), p.anchor = p.input.slice(ee, p.position), !0;
  }
  function Fe(p) {
    var ee, se, h;
    if (h = p.input.charCodeAt(p.position), h !== 42) return !1;
    for (h = p.input.charCodeAt(++p.position), ee = p.position; h !== 0 && !F(h) && !C(h); )
      h = p.input.charCodeAt(++p.position);
    return p.position === ee && L(p, "name of an alias node must contain at least one character"), se = p.input.slice(ee, p.position), t.call(p.anchorMap, se) || L(p, 'unidentified alias "' + se + '"'), p.result = p.anchorMap[se], _e(p, !0, -1), !0;
  }
  function be(p, ee, se, h, O) {
    var j, Q, V, _ = 1, M = !1, Z = !1, Y, E, $, I, G, B;
    if (p.listener !== null && p.listener("open", p), p.tag = null, p.anchor = null, p.kind = null, p.result = null, j = Q = V = r === se || u === se, h && _e(p, !0, -1) && (M = !0, p.lineIndent > ee ? _ = 1 : p.lineIndent === ee ? _ = 0 : p.lineIndent < ee && (_ = -1)), _ === 1)
      for (; qe(p) || Re(p); )
        _e(p, !0, -1) ? (M = !0, V = j, p.lineIndent > ee ? _ = 1 : p.lineIndent === ee ? _ = 0 : p.lineIndent < ee && (_ = -1)) : V = !1;
    if (V && (V = M || O), (_ === 1 || r === se) && (n === se || e === se ? G = ee : G = ee + 1, B = p.position - p.lineStart, _ === 1 ? V && (ye(p, B) || ve(p, B, G)) || k(p, G) ? Z = !0 : (Q && pe(p, G) || R(p, G) || te(p, G) ? Z = !0 : Fe(p) ? (Z = !0, (p.tag !== null || p.anchor !== null) && L(p, "alias node should not have any properties")) : S(p, G, n === se) && (Z = !0, p.tag === null && (p.tag = "?")), p.anchor !== null && (p.anchorMap[p.anchor] = p.result)) : _ === 0 && (Z = V && ye(p, B))), p.tag === null)
      p.anchor !== null && (p.anchorMap[p.anchor] = p.result);
    else if (p.tag === "?") {
      for (p.result !== null && p.kind !== "scalar" && L(p, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + p.kind + '"'), Y = 0, E = p.implicitTypes.length; Y < E; Y += 1)
        if (I = p.implicitTypes[Y], I.resolve(p.result)) {
          p.result = I.construct(p.result), p.tag = I.tag, p.anchor !== null && (p.anchorMap[p.anchor] = p.result);
          break;
        }
    } else if (p.tag !== "!") {
      if (t.call(p.typeMap[p.kind || "fallback"], p.tag))
        I = p.typeMap[p.kind || "fallback"][p.tag];
      else
        for (I = null, $ = p.typeMap.multi[p.kind || "fallback"], Y = 0, E = $.length; Y < E; Y += 1)
          if (p.tag.slice(0, $[Y].tag.length) === $[Y].tag) {
            I = $[Y];
            break;
          }
      I || L(p, "unknown tag !<" + p.tag + ">"), p.result !== null && I.kind !== p.kind && L(p, "unacceptable node kind for !<" + p.tag + '> tag; it should be "' + I.kind + '", not "' + p.kind + '"'), I.resolve(p.result, p.tag) ? (p.result = I.construct(p.result, p.tag), p.anchor !== null && (p.anchorMap[p.anchor] = p.result)) : L(p, "cannot resolve a node with !<" + p.tag + "> explicit tag");
    }
    return p.listener !== null && p.listener("close", p), p.tag !== null || p.anchor !== null || Z;
  }
  function Te(p) {
    var ee = p.position, se, h, O, j = !1, Q;
    for (p.version = null, p.checkLineBreaks = p.legacy, p.tagMap = /* @__PURE__ */ Object.create(null), p.anchorMap = /* @__PURE__ */ Object.create(null); (Q = p.input.charCodeAt(p.position)) !== 0 && (_e(p, !0, -1), Q = p.input.charCodeAt(p.position), !(p.lineIndent > 0 || Q !== 37)); ) {
      for (j = !0, Q = p.input.charCodeAt(++p.position), se = p.position; Q !== 0 && !F(Q); )
        Q = p.input.charCodeAt(++p.position);
      for (h = p.input.slice(se, p.position), O = [], h.length < 1 && L(p, "directive name must not be less than one character in length"); Q !== 0; ) {
        for (; T(Q); )
          Q = p.input.charCodeAt(++p.position);
        if (Q === 35) {
          do
            Q = p.input.charCodeAt(++p.position);
          while (Q !== 0 && !A(Q));
          break;
        }
        if (A(Q)) break;
        for (se = p.position; Q !== 0 && !F(Q); )
          Q = p.input.charCodeAt(++p.position);
        O.push(p.input.slice(se, p.position));
      }
      Q !== 0 && we(p), t.call(ue, h) ? ue[h](p, h, O) : K(p, 'unknown document directive "' + h + '"');
    }
    if (_e(p, !0, -1), p.lineIndent === 0 && p.input.charCodeAt(p.position) === 45 && p.input.charCodeAt(p.position + 1) === 45 && p.input.charCodeAt(p.position + 2) === 45 ? (p.position += 3, _e(p, !0, -1)) : j && L(p, "directives end mark is expected"), be(p, p.lineIndent - 1, r, !1, !0), _e(p, !0, -1), p.checkLineBreaks && m.test(p.input.slice(ee, p.position)) && K(p, "non-ASCII line breaks are interpreted as content"), p.documents.push(p.result), p.position === p.lineStart && ie(p)) {
      p.input.charCodeAt(p.position) === 46 && (p.position += 3, _e(p, !0, -1));
      return;
    }
    if (p.position < p.length - 1)
      L(p, "end of the stream or a document separator is expected");
    else
      return;
  }
  function je(p, ee) {
    p = String(p), ee = ee || {}, p.length !== 0 && (p.charCodeAt(p.length - 1) !== 10 && p.charCodeAt(p.length - 1) !== 13 && (p += `
`), p.charCodeAt(0) === 65279 && (p = p.slice(1)));
    var se = new U(p, ee), h = p.indexOf("\0");
    for (h !== -1 && (se.position = h, L(se, "null byte is not allowed in input")), se.input += "\0"; se.input.charCodeAt(se.position) === 32; )
      se.lineIndent += 1, se.position += 1;
    for (; se.position < se.length - 1; )
      Te(se);
    return se.documents;
  }
  function ke(p, ee, se) {
    ee !== null && typeof ee == "object" && typeof se > "u" && (se = ee, ee = null);
    var h = je(p, se);
    if (typeof ee != "function")
      return h;
    for (var O = 0, j = h.length; O < j; O += 1)
      ee(h[O]);
  }
  function Ue(p, ee) {
    var se = je(p, ee);
    if (se.length !== 0) {
      if (se.length === 1)
        return se[0];
      throw new f("expected a single document in the stream, but found more");
    }
  }
  return loader.loadAll = ke, loader.load = Ue, loader;
}
var dumper = {}, hasRequiredDumper;
function requireDumper() {
  if (hasRequiredDumper) return dumper;
  hasRequiredDumper = 1;
  var i = requireCommon(), f = requireException(), d = require_default(), s = Object.prototype.toString, t = Object.prototype.hasOwnProperty, n = 65279, e = 9, u = 10, r = 13, o = 32, a = 33, l = 34, c = 35, m = 37, y = 38, v = 39, g = 42, q = 44, A = 45, T = 58, F = 61, C = 62, D = 63, x = 64, b = 91, w = 93, z = 96, J = 123, H = 124, X = 125, N = {};
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
  function L(E, $) {
    var I, G, B, oe, ae, le, he;
    if ($ === null) return {};
    for (I = {}, G = Object.keys($), B = 0, oe = G.length; B < oe; B += 1)
      ae = G[B], le = String($[ae]), ae.slice(0, 2) === "!!" && (ae = "tag:yaml.org,2002:" + ae.slice(2)), he = E.compiledTypeMap.fallback[ae], he && t.call(he.styleAliases, le) && (le = he.styleAliases[le]), I[ae] = le;
    return I;
  }
  function K(E) {
    var $, I, G;
    if ($ = E.toString(16).toUpperCase(), E <= 255)
      I = "x", G = 2;
    else if (E <= 65535)
      I = "u", G = 4;
    else if (E <= 4294967295)
      I = "U", G = 8;
    else
      throw new f("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + I + i.repeat("0", G - $.length) + $;
  }
  var ue = 1, fe = 2;
  function ge(E) {
    this.schema = E.schema || d, this.indent = Math.max(1, E.indent || 2), this.noArrayIndent = E.noArrayIndent || !1, this.skipInvalid = E.skipInvalid || !1, this.flowLevel = i.isNothing(E.flowLevel) ? -1 : E.flowLevel, this.styleMap = L(this.schema, E.styles || null), this.sortKeys = E.sortKeys || !1, this.lineWidth = E.lineWidth || 80, this.noRefs = E.noRefs || !1, this.noCompatMode = E.noCompatMode || !1, this.condenseFlow = E.condenseFlow || !1, this.quotingType = E.quotingType === '"' ? fe : ue, this.forceQuotes = E.forceQuotes || !1, this.replacer = typeof E.replacer == "function" ? E.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function de(E, $) {
    for (var I = i.repeat(" ", $), G = 0, B = -1, oe = "", ae, le = E.length; G < le; )
      B = E.indexOf(`
`, G), B === -1 ? (ae = E.slice(G), G = le) : (ae = E.slice(G, B + 1), G = B + 1), ae.length && ae !== `
` && (oe += I), oe += ae;
    return oe;
  }
  function we(E, $) {
    return `
` + i.repeat(" ", E.indent * $);
  }
  function _e(E, $) {
    var I, G, B;
    for (I = 0, G = E.implicitTypes.length; I < G; I += 1)
      if (B = E.implicitTypes[I], B.resolve($))
        return !0;
    return !1;
  }
  function ie(E) {
    return E === o || E === e;
  }
  function Ee(E) {
    return 32 <= E && E <= 126 || 161 <= E && E <= 55295 && E !== 8232 && E !== 8233 || 57344 <= E && E <= 65533 && E !== n || 65536 <= E && E <= 1114111;
  }
  function S(E) {
    return Ee(E) && E !== n && E !== r && E !== u;
  }
  function R(E, $, I) {
    var G = S(E), B = G && !ie(E);
    return (
      // ns-plain-safe
      (I ? (
        // c = flow-in
        G
      ) : G && E !== q && E !== b && E !== w && E !== J && E !== X) && E !== c && !($ === T && !B) || S($) && !ie($) && E === c || $ === T && B
    );
  }
  function te(E) {
    return Ee(E) && E !== n && !ie(E) && E !== A && E !== D && E !== T && E !== q && E !== b && E !== w && E !== J && E !== X && E !== c && E !== y && E !== g && E !== a && E !== H && E !== F && E !== C && E !== v && E !== l && E !== m && E !== x && E !== z;
  }
  function k(E) {
    return !ie(E) && E !== T;
  }
  function pe(E, $) {
    var I = E.charCodeAt($), G;
    return I >= 55296 && I <= 56319 && $ + 1 < E.length && (G = E.charCodeAt($ + 1), G >= 56320 && G <= 57343) ? (I - 55296) * 1024 + G - 56320 + 65536 : I;
  }
  function ye(E) {
    var $ = /^\n* /;
    return $.test(E);
  }
  var ve = 1, qe = 2, Re = 3, Fe = 4, be = 5;
  function Te(E, $, I, G, B, oe, ae, le) {
    var he, Se = 0, xe = null, De = !1, Ce = !1, tr = G !== -1, Ge = -1, Xe = te(pe(E, 0)) && k(pe(E, E.length - 1));
    if ($ || ae)
      for (he = 0; he < E.length; Se >= 65536 ? he += 2 : he++) {
        if (Se = pe(E, he), !Ee(Se))
          return be;
        Xe = Xe && R(Se, xe, le), xe = Se;
      }
    else {
      for (he = 0; he < E.length; Se >= 65536 ? he += 2 : he++) {
        if (Se = pe(E, he), Se === u)
          De = !0, tr && (Ce = Ce || // Foldable line = too long, and not more-indented.
          he - Ge - 1 > G && E[Ge + 1] !== " ", Ge = he);
        else if (!Ee(Se))
          return be;
        Xe = Xe && R(Se, xe, le), xe = Se;
      }
      Ce = Ce || tr && he - Ge - 1 > G && E[Ge + 1] !== " ";
    }
    return !De && !Ce ? Xe && !ae && !B(E) ? ve : oe === fe ? be : qe : I > 9 && ye(E) ? be : ae ? oe === fe ? be : qe : Ce ? Fe : Re;
  }
  function je(E, $, I, G, B) {
    E.dump = (function() {
      if ($.length === 0)
        return E.quotingType === fe ? '""' : "''";
      if (!E.noCompatMode && (U.indexOf($) !== -1 || ne.test($)))
        return E.quotingType === fe ? '"' + $ + '"' : "'" + $ + "'";
      var oe = E.indent * Math.max(1, I), ae = E.lineWidth === -1 ? -1 : Math.max(Math.min(E.lineWidth, 40), E.lineWidth - oe), le = G || E.flowLevel > -1 && I >= E.flowLevel;
      function he(Se) {
        return _e(E, Se);
      }
      switch (Te(
        $,
        le,
        E.indent,
        ae,
        he,
        E.quotingType,
        E.forceQuotes && !G,
        B
      )) {
        case ve:
          return $;
        case qe:
          return "'" + $.replace(/'/g, "''") + "'";
        case Re:
          return "|" + ke($, E.indent) + Ue(de($, oe));
        case Fe:
          return ">" + ke($, E.indent) + Ue(de(p($, ae), oe));
        case be:
          return '"' + se($) + '"';
        default:
          throw new f("impossible error: invalid scalar style");
      }
    })();
  }
  function ke(E, $) {
    var I = ye(E) ? String($) : "", G = E[E.length - 1] === `
`, B = G && (E[E.length - 2] === `
` || E === `
`), oe = B ? "+" : G ? "" : "-";
    return I + oe + `
`;
  }
  function Ue(E) {
    return E[E.length - 1] === `
` ? E.slice(0, -1) : E;
  }
  function p(E, $) {
    for (var I = /(\n+)([^\n]*)/g, G = (function() {
      var Se = E.indexOf(`
`);
      return Se = Se !== -1 ? Se : E.length, I.lastIndex = Se, ee(E.slice(0, Se), $);
    })(), B = E[0] === `
` || E[0] === " ", oe, ae; ae = I.exec(E); ) {
      var le = ae[1], he = ae[2];
      oe = he[0] === " ", G += le + (!B && !oe && he !== "" ? `
` : "") + ee(he, $), B = oe;
    }
    return G;
  }
  function ee(E, $) {
    if (E === "" || E[0] === " ") return E;
    for (var I = / [^ ]/g, G, B = 0, oe, ae = 0, le = 0, he = ""; G = I.exec(E); )
      le = G.index, le - B > $ && (oe = ae > B ? ae : le, he += `
` + E.slice(B, oe), B = oe + 1), ae = le;
    return he += `
`, E.length - B > $ && ae > B ? he += E.slice(B, ae) + `
` + E.slice(ae + 1) : he += E.slice(B), he.slice(1);
  }
  function se(E) {
    for (var $ = "", I = 0, G, B = 0; B < E.length; I >= 65536 ? B += 2 : B++)
      I = pe(E, B), G = N[I], !G && Ee(I) ? ($ += E[B], I >= 65536 && ($ += E[B + 1])) : $ += G || K(I);
    return $;
  }
  function h(E, $, I) {
    var G = "", B = E.tag, oe, ae, le;
    for (oe = 0, ae = I.length; oe < ae; oe += 1)
      le = I[oe], E.replacer && (le = E.replacer.call(I, String(oe), le)), (_(E, $, le, !1, !1) || typeof le > "u" && _(E, $, null, !1, !1)) && (G !== "" && (G += "," + (E.condenseFlow ? "" : " ")), G += E.dump);
    E.tag = B, E.dump = "[" + G + "]";
  }
  function O(E, $, I, G) {
    var B = "", oe = E.tag, ae, le, he;
    for (ae = 0, le = I.length; ae < le; ae += 1)
      he = I[ae], E.replacer && (he = E.replacer.call(I, String(ae), he)), (_(E, $ + 1, he, !0, !0, !1, !0) || typeof he > "u" && _(E, $ + 1, null, !0, !0, !1, !0)) && ((!G || B !== "") && (B += we(E, $)), E.dump && u === E.dump.charCodeAt(0) ? B += "-" : B += "- ", B += E.dump);
    E.tag = oe, E.dump = B || "[]";
  }
  function j(E, $, I) {
    var G = "", B = E.tag, oe = Object.keys(I), ae, le, he, Se, xe;
    for (ae = 0, le = oe.length; ae < le; ae += 1)
      xe = "", G !== "" && (xe += ", "), E.condenseFlow && (xe += '"'), he = oe[ae], Se = I[he], E.replacer && (Se = E.replacer.call(I, he, Se)), _(E, $, he, !1, !1) && (E.dump.length > 1024 && (xe += "? "), xe += E.dump + (E.condenseFlow ? '"' : "") + ":" + (E.condenseFlow ? "" : " "), _(E, $, Se, !1, !1) && (xe += E.dump, G += xe));
    E.tag = B, E.dump = "{" + G + "}";
  }
  function Q(E, $, I, G) {
    var B = "", oe = E.tag, ae = Object.keys(I), le, he, Se, xe, De, Ce;
    if (E.sortKeys === !0)
      ae.sort();
    else if (typeof E.sortKeys == "function")
      ae.sort(E.sortKeys);
    else if (E.sortKeys)
      throw new f("sortKeys must be a boolean or a function");
    for (le = 0, he = ae.length; le < he; le += 1)
      Ce = "", (!G || B !== "") && (Ce += we(E, $)), Se = ae[le], xe = I[Se], E.replacer && (xe = E.replacer.call(I, Se, xe)), _(E, $ + 1, Se, !0, !0, !0) && (De = E.tag !== null && E.tag !== "?" || E.dump && E.dump.length > 1024, De && (E.dump && u === E.dump.charCodeAt(0) ? Ce += "?" : Ce += "? "), Ce += E.dump, De && (Ce += we(E, $)), _(E, $ + 1, xe, !0, De) && (E.dump && u === E.dump.charCodeAt(0) ? Ce += ":" : Ce += ": ", Ce += E.dump, B += Ce));
    E.tag = oe, E.dump = B || "{}";
  }
  function V(E, $, I) {
    var G, B, oe, ae, le, he;
    for (B = I ? E.explicitTypes : E.implicitTypes, oe = 0, ae = B.length; oe < ae; oe += 1)
      if (le = B[oe], (le.instanceOf || le.predicate) && (!le.instanceOf || typeof $ == "object" && $ instanceof le.instanceOf) && (!le.predicate || le.predicate($))) {
        if (I ? le.multi && le.representName ? E.tag = le.representName($) : E.tag = le.tag : E.tag = "?", le.represent) {
          if (he = E.styleMap[le.tag] || le.defaultStyle, s.call(le.represent) === "[object Function]")
            G = le.represent($, he);
          else if (t.call(le.represent, he))
            G = le.represent[he]($, he);
          else
            throw new f("!<" + le.tag + '> tag resolver accepts not "' + he + '" style');
          E.dump = G;
        }
        return !0;
      }
    return !1;
  }
  function _(E, $, I, G, B, oe, ae) {
    E.tag = null, E.dump = I, V(E, I, !1) || V(E, I, !0);
    var le = s.call(E.dump), he = G, Se;
    G && (G = E.flowLevel < 0 || E.flowLevel > $);
    var xe = le === "[object Object]" || le === "[object Array]", De, Ce;
    if (xe && (De = E.duplicates.indexOf(I), Ce = De !== -1), (E.tag !== null && E.tag !== "?" || Ce || E.indent !== 2 && $ > 0) && (B = !1), Ce && E.usedDuplicates[De])
      E.dump = "*ref_" + De;
    else {
      if (xe && Ce && !E.usedDuplicates[De] && (E.usedDuplicates[De] = !0), le === "[object Object]")
        G && Object.keys(E.dump).length !== 0 ? (Q(E, $, E.dump, B), Ce && (E.dump = "&ref_" + De + E.dump)) : (j(E, $, E.dump), Ce && (E.dump = "&ref_" + De + " " + E.dump));
      else if (le === "[object Array]")
        G && E.dump.length !== 0 ? (E.noArrayIndent && !ae && $ > 0 ? O(E, $ - 1, E.dump, B) : O(E, $, E.dump, B), Ce && (E.dump = "&ref_" + De + E.dump)) : (h(E, $, E.dump), Ce && (E.dump = "&ref_" + De + " " + E.dump));
      else if (le === "[object String]")
        E.tag !== "?" && je(E, E.dump, $, oe, he);
      else {
        if (le === "[object Undefined]")
          return !1;
        if (E.skipInvalid) return !1;
        throw new f("unacceptable kind of an object to dump " + le);
      }
      E.tag !== null && E.tag !== "?" && (Se = encodeURI(
        E.tag[0] === "!" ? E.tag.slice(1) : E.tag
      ).replace(/!/g, "%21"), E.tag[0] === "!" ? Se = "!" + Se : Se.slice(0, 18) === "tag:yaml.org,2002:" ? Se = "!!" + Se.slice(18) : Se = "!<" + Se + ">", E.dump = Se + " " + E.dump);
    }
    return !0;
  }
  function M(E, $) {
    var I = [], G = [], B, oe;
    for (Z(E, I, G), B = 0, oe = G.length; B < oe; B += 1)
      $.duplicates.push(I[G[B]]);
    $.usedDuplicates = new Array(oe);
  }
  function Z(E, $, I) {
    var G, B, oe;
    if (E !== null && typeof E == "object")
      if (B = $.indexOf(E), B !== -1)
        I.indexOf(B) === -1 && I.push(B);
      else if ($.push(E), Array.isArray(E))
        for (B = 0, oe = E.length; B < oe; B += 1)
          Z(E[B], $, I);
      else
        for (G = Object.keys(E), B = 0, oe = G.length; B < oe; B += 1)
          Z(E[G[B]], $, I);
  }
  function Y(E, $) {
    $ = $ || {};
    var I = new ge($);
    I.noRefs || M(E, I);
    var G = E;
    return I.replacer && (G = I.replacer.call({ "": G }, "", G)), _(I, 0, G, !0, !0) ? I.dump + `
` : "";
  }
  return dumper.dump = Y, dumper;
}
var hasRequiredJsYaml;
function requireJsYaml() {
  if (hasRequiredJsYaml) return jsYaml;
  hasRequiredJsYaml = 1;
  var i = requireLoader(), f = requireDumper();
  function d(s, t) {
    return function() {
      throw new Error("Function yaml." + s + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
    };
  }
  return jsYaml.Type = requireType(), jsYaml.Schema = requireSchema(), jsYaml.FAILSAFE_SCHEMA = requireFailsafe(), jsYaml.JSON_SCHEMA = requireJson(), jsYaml.CORE_SCHEMA = requireCore(), jsYaml.DEFAULT_SCHEMA = require_default(), jsYaml.load = i.load, jsYaml.loadAll = i.loadAll, jsYaml.dump = f.dump, jsYaml.YAMLException = requireException(), jsYaml.types = {
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
  }, jsYaml.safeLoad = d("safeLoad", "load"), jsYaml.safeLoadAll = d("safeLoadAll", "loadAll"), jsYaml.safeDump = d("safeDump", "dump"), jsYaml;
}
var main = {}, hasRequiredMain$1;
function requireMain$1() {
  if (hasRequiredMain$1) return main;
  hasRequiredMain$1 = 1, Object.defineProperty(main, "__esModule", { value: !0 }), main.Lazy = void 0;
  class i {
    constructor(d) {
      this._value = null, this.creator = d;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const d = this.creator();
      return this.value = d, d;
    }
    set value(d) {
      this._value = d, this.creator = null;
    }
  }
  return main.Lazy = i, main;
}
var re = { exports: {} }, constants, hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const i = "2.0.0", f = 256, d = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, s = 16, t = f - 6;
  return constants = {
    MAX_LENGTH: f,
    MAX_SAFE_COMPONENT_LENGTH: s,
    MAX_SAFE_BUILD_LENGTH: t,
    MAX_SAFE_INTEGER: d,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: i,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, constants;
}
var debug_1, hasRequiredDebug;
function requireDebug() {
  return hasRequiredDebug || (hasRequiredDebug = 1, debug_1 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...f) => console.error("SEMVER", ...f) : () => {
  }), debug_1;
}
var hasRequiredRe;
function requireRe() {
  return hasRequiredRe || (hasRequiredRe = 1, (function(i, f) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: d,
      MAX_SAFE_BUILD_LENGTH: s,
      MAX_LENGTH: t
    } = requireConstants(), n = requireDebug();
    f = i.exports = {};
    const e = f.re = [], u = f.safeRe = [], r = f.src = [], o = f.safeSrc = [], a = f.t = {};
    let l = 0;
    const c = "[a-zA-Z0-9-]", m = [
      ["\\s", 1],
      ["\\d", t],
      [c, s]
    ], y = (g) => {
      for (const [q, A] of m)
        g = g.split(`${q}*`).join(`${q}{0,${A}}`).split(`${q}+`).join(`${q}{1,${A}}`);
      return g;
    }, v = (g, q, A) => {
      const T = y(q), F = l++;
      n(g, F, q), a[g] = F, r[F] = q, o[F] = T, e[F] = new RegExp(q, A ? "g" : void 0), u[F] = new RegExp(T, A ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${c}*`), v("MAINVERSION", `(${r[a.NUMERICIDENTIFIER]})\\.(${r[a.NUMERICIDENTIFIER]})\\.(${r[a.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${r[a.NUMERICIDENTIFIERLOOSE]})\\.(${r[a.NUMERICIDENTIFIERLOOSE]})\\.(${r[a.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${r[a.NONNUMERICIDENTIFIER]}|${r[a.NUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${r[a.NONNUMERICIDENTIFIER]}|${r[a.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASE", `(?:-(${r[a.PRERELEASEIDENTIFIER]}(?:\\.${r[a.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${r[a.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${r[a.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${c}+`), v("BUILD", `(?:\\+(${r[a.BUILDIDENTIFIER]}(?:\\.${r[a.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${r[a.MAINVERSION]}${r[a.PRERELEASE]}?${r[a.BUILD]}?`), v("FULL", `^${r[a.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${r[a.MAINVERSIONLOOSE]}${r[a.PRERELEASELOOSE]}?${r[a.BUILD]}?`), v("LOOSE", `^${r[a.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${r[a.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${r[a.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${r[a.XRANGEIDENTIFIER]})(?:\\.(${r[a.XRANGEIDENTIFIER]})(?:\\.(${r[a.XRANGEIDENTIFIER]})(?:${r[a.PRERELEASE]})?${r[a.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${r[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[a.XRANGEIDENTIFIERLOOSE]})(?:\\.(${r[a.XRANGEIDENTIFIERLOOSE]})(?:${r[a.PRERELEASELOOSE]})?${r[a.BUILD]}?)?)?`), v("XRANGE", `^${r[a.GTLT]}\\s*${r[a.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${r[a.GTLT]}\\s*${r[a.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${d}})(?:\\.(\\d{1,${d}}))?(?:\\.(\\d{1,${d}}))?`), v("COERCE", `${r[a.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", r[a.COERCEPLAIN] + `(?:${r[a.PRERELEASE]})?(?:${r[a.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", r[a.COERCE], !0), v("COERCERTLFULL", r[a.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${r[a.LONETILDE]}\\s+`, !0), f.tildeTrimReplace = "$1~", v("TILDE", `^${r[a.LONETILDE]}${r[a.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${r[a.LONETILDE]}${r[a.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${r[a.LONECARET]}\\s+`, !0), f.caretTrimReplace = "$1^", v("CARET", `^${r[a.LONECARET]}${r[a.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${r[a.LONECARET]}${r[a.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${r[a.GTLT]}\\s*(${r[a.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${r[a.GTLT]}\\s*(${r[a.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${r[a.GTLT]}\\s*(${r[a.LOOSEPLAIN]}|${r[a.XRANGEPLAIN]})`, !0), f.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${r[a.XRANGEPLAIN]})\\s+-\\s+(${r[a.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${r[a.XRANGEPLAINLOOSE]})\\s+-\\s+(${r[a.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports)), re.exports;
}
var parseOptions_1, hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const i = Object.freeze({ loose: !0 }), f = Object.freeze({});
  return parseOptions_1 = (s) => s ? typeof s != "object" ? i : s : f, parseOptions_1;
}
var identifiers, hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const i = /^[0-9]+$/, f = (s, t) => {
    if (typeof s == "number" && typeof t == "number")
      return s === t ? 0 : s < t ? -1 : 1;
    const n = i.test(s), e = i.test(t);
    return n && e && (s = +s, t = +t), s === t ? 0 : n && !e ? -1 : e && !n ? 1 : s < t ? -1 : 1;
  };
  return identifiers = {
    compareIdentifiers: f,
    rcompareIdentifiers: (s, t) => f(t, s)
  }, identifiers;
}
var semver$1, hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const i = requireDebug(), { MAX_LENGTH: f, MAX_SAFE_INTEGER: d } = requireConstants(), { safeRe: s, t } = requireRe(), n = requireParseOptions(), { compareIdentifiers: e } = requireIdentifiers();
  class u {
    constructor(o, a) {
      if (a = n(a), o instanceof u) {
        if (o.loose === !!a.loose && o.includePrerelease === !!a.includePrerelease)
          return o;
        o = o.version;
      } else if (typeof o != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof o}".`);
      if (o.length > f)
        throw new TypeError(
          `version is longer than ${f} characters`
        );
      i("SemVer", o, a), this.options = a, this.loose = !!a.loose, this.includePrerelease = !!a.includePrerelease;
      const l = o.trim().match(a.loose ? s[t.LOOSE] : s[t.FULL]);
      if (!l)
        throw new TypeError(`Invalid Version: ${o}`);
      if (this.raw = o, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > d || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > d || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > d || this.patch < 0)
        throw new TypeError("Invalid patch version");
      l[4] ? this.prerelease = l[4].split(".").map((c) => {
        if (/^[0-9]+$/.test(c)) {
          const m = +c;
          if (m >= 0 && m < d)
            return m;
        }
        return c;
      }) : this.prerelease = [], this.build = l[5] ? l[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(o) {
      if (i("SemVer.compare", this.version, this.options, o), !(o instanceof u)) {
        if (typeof o == "string" && o === this.version)
          return 0;
        o = new u(o, this.options);
      }
      return o.version === this.version ? 0 : this.compareMain(o) || this.comparePre(o);
    }
    compareMain(o) {
      return o instanceof u || (o = new u(o, this.options)), this.major < o.major ? -1 : this.major > o.major ? 1 : this.minor < o.minor ? -1 : this.minor > o.minor ? 1 : this.patch < o.patch ? -1 : this.patch > o.patch ? 1 : 0;
    }
    comparePre(o) {
      if (o instanceof u || (o = new u(o, this.options)), this.prerelease.length && !o.prerelease.length)
        return -1;
      if (!this.prerelease.length && o.prerelease.length)
        return 1;
      if (!this.prerelease.length && !o.prerelease.length)
        return 0;
      let a = 0;
      do {
        const l = this.prerelease[a], c = o.prerelease[a];
        if (i("prerelease compare", a, l, c), l === void 0 && c === void 0)
          return 0;
        if (c === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === c)
          continue;
        return e(l, c);
      } while (++a);
    }
    compareBuild(o) {
      o instanceof u || (o = new u(o, this.options));
      let a = 0;
      do {
        const l = this.build[a], c = o.build[a];
        if (i("build compare", a, l, c), l === void 0 && c === void 0)
          return 0;
        if (c === void 0)
          return 1;
        if (l === void 0)
          return -1;
        if (l === c)
          continue;
        return e(l, c);
      } while (++a);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(o, a, l) {
      if (o.startsWith("pre")) {
        if (!a && l === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (a) {
          const c = `-${a}`.match(this.options.loose ? s[t.PRERELEASELOOSE] : s[t.PRERELEASE]);
          if (!c || c[1] !== a)
            throw new Error(`invalid identifier: ${a}`);
        }
      }
      switch (o) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", a, l);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", a, l);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", a, l), this.inc("pre", a, l);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", a, l), this.inc("pre", a, l);
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
          const c = Number(l) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [c];
          else {
            let m = this.prerelease.length;
            for (; --m >= 0; )
              typeof this.prerelease[m] == "number" && (this.prerelease[m]++, m = -2);
            if (m === -1) {
              if (a === this.prerelease.join(".") && l === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(c);
            }
          }
          if (a) {
            let m = [a, c];
            l === !1 && (m = [a]), e(this.prerelease[0], a) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = m) : this.prerelease = m;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${o}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return semver$1 = u, semver$1;
}
var parse_1, hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const i = requireSemver$1();
  return parse_1 = (d, s, t = !1) => {
    if (d instanceof i)
      return d;
    try {
      return new i(d, s);
    } catch (n) {
      if (!t)
        return null;
      throw n;
    }
  }, parse_1;
}
var valid_1, hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const i = requireParse();
  return valid_1 = (d, s) => {
    const t = i(d, s);
    return t ? t.version : null;
  }, valid_1;
}
var clean_1, hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const i = requireParse();
  return clean_1 = (d, s) => {
    const t = i(d.trim().replace(/^[=v]+/, ""), s);
    return t ? t.version : null;
  }, clean_1;
}
var inc_1, hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const i = requireSemver$1();
  return inc_1 = (d, s, t, n, e) => {
    typeof t == "string" && (e = n, n = t, t = void 0);
    try {
      return new i(
        d instanceof i ? d.version : d,
        t
      ).inc(s, n, e).version;
    } catch {
      return null;
    }
  }, inc_1;
}
var diff_1, hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const i = requireParse();
  return diff_1 = (d, s) => {
    const t = i(d, null, !0), n = i(s, null, !0), e = t.compare(n);
    if (e === 0)
      return null;
    const u = e > 0, r = u ? t : n, o = u ? n : t, a = !!r.prerelease.length;
    if (!!o.prerelease.length && !a) {
      if (!o.patch && !o.minor)
        return "major";
      if (o.compareMain(r) === 0)
        return o.minor && !o.patch ? "minor" : "patch";
    }
    const c = a ? "pre" : "";
    return t.major !== n.major ? c + "major" : t.minor !== n.minor ? c + "minor" : t.patch !== n.patch ? c + "patch" : "prerelease";
  }, diff_1;
}
var major_1, hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const i = requireSemver$1();
  return major_1 = (d, s) => new i(d, s).major, major_1;
}
var minor_1, hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const i = requireSemver$1();
  return minor_1 = (d, s) => new i(d, s).minor, minor_1;
}
var patch_1, hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const i = requireSemver$1();
  return patch_1 = (d, s) => new i(d, s).patch, patch_1;
}
var prerelease_1, hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const i = requireParse();
  return prerelease_1 = (d, s) => {
    const t = i(d, s);
    return t && t.prerelease.length ? t.prerelease : null;
  }, prerelease_1;
}
var compare_1, hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const i = requireSemver$1();
  return compare_1 = (d, s, t) => new i(d, t).compare(new i(s, t)), compare_1;
}
var rcompare_1, hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const i = requireCompare();
  return rcompare_1 = (d, s, t) => i(s, d, t), rcompare_1;
}
var compareLoose_1, hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const i = requireCompare();
  return compareLoose_1 = (d, s) => i(d, s, !0), compareLoose_1;
}
var compareBuild_1, hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const i = requireSemver$1();
  return compareBuild_1 = (d, s, t) => {
    const n = new i(d, t), e = new i(s, t);
    return n.compare(e) || n.compareBuild(e);
  }, compareBuild_1;
}
var sort_1, hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const i = requireCompareBuild();
  return sort_1 = (d, s) => d.sort((t, n) => i(t, n, s)), sort_1;
}
var rsort_1, hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const i = requireCompareBuild();
  return rsort_1 = (d, s) => d.sort((t, n) => i(n, t, s)), rsort_1;
}
var gt_1, hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const i = requireCompare();
  return gt_1 = (d, s, t) => i(d, s, t) > 0, gt_1;
}
var lt_1, hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const i = requireCompare();
  return lt_1 = (d, s, t) => i(d, s, t) < 0, lt_1;
}
var eq_1, hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const i = requireCompare();
  return eq_1 = (d, s, t) => i(d, s, t) === 0, eq_1;
}
var neq_1, hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const i = requireCompare();
  return neq_1 = (d, s, t) => i(d, s, t) !== 0, neq_1;
}
var gte_1, hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const i = requireCompare();
  return gte_1 = (d, s, t) => i(d, s, t) >= 0, gte_1;
}
var lte_1, hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const i = requireCompare();
  return lte_1 = (d, s, t) => i(d, s, t) <= 0, lte_1;
}
var cmp_1, hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const i = requireEq(), f = requireNeq(), d = requireGt(), s = requireGte(), t = requireLt(), n = requireLte();
  return cmp_1 = (u, r, o, a) => {
    switch (r) {
      case "===":
        return typeof u == "object" && (u = u.version), typeof o == "object" && (o = o.version), u === o;
      case "!==":
        return typeof u == "object" && (u = u.version), typeof o == "object" && (o = o.version), u !== o;
      case "":
      case "=":
      case "==":
        return i(u, o, a);
      case "!=":
        return f(u, o, a);
      case ">":
        return d(u, o, a);
      case ">=":
        return s(u, o, a);
      case "<":
        return t(u, o, a);
      case "<=":
        return n(u, o, a);
      default:
        throw new TypeError(`Invalid operator: ${r}`);
    }
  }, cmp_1;
}
var coerce_1, hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const i = requireSemver$1(), f = requireParse(), { safeRe: d, t: s } = requireRe();
  return coerce_1 = (n, e) => {
    if (n instanceof i)
      return n;
    if (typeof n == "number" && (n = String(n)), typeof n != "string")
      return null;
    e = e || {};
    let u = null;
    if (!e.rtl)
      u = n.match(e.includePrerelease ? d[s.COERCEFULL] : d[s.COERCE]);
    else {
      const m = e.includePrerelease ? d[s.COERCERTLFULL] : d[s.COERCERTL];
      let y;
      for (; (y = m.exec(n)) && (!u || u.index + u[0].length !== n.length); )
        (!u || y.index + y[0].length !== u.index + u[0].length) && (u = y), m.lastIndex = y.index + y[1].length + y[2].length;
      m.lastIndex = -1;
    }
    if (u === null)
      return null;
    const r = u[2], o = u[3] || "0", a = u[4] || "0", l = e.includePrerelease && u[5] ? `-${u[5]}` : "", c = e.includePrerelease && u[6] ? `+${u[6]}` : "";
    return f(`${r}.${o}.${a}${l}${c}`, e);
  }, coerce_1;
}
var lrucache, hasRequiredLrucache;
function requireLrucache() {
  if (hasRequiredLrucache) return lrucache;
  hasRequiredLrucache = 1;
  class i {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(d) {
      const s = this.map.get(d);
      if (s !== void 0)
        return this.map.delete(d), this.map.set(d, s), s;
    }
    delete(d) {
      return this.map.delete(d);
    }
    set(d, s) {
      if (!this.delete(d) && s !== void 0) {
        if (this.map.size >= this.max) {
          const n = this.map.keys().next().value;
          this.delete(n);
        }
        this.map.set(d, s);
      }
      return this;
    }
  }
  return lrucache = i, lrucache;
}
var range, hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const i = /\s+/g;
  class f {
    constructor(U, ne) {
      if (ne = t(ne), U instanceof f)
        return U.loose === !!ne.loose && U.includePrerelease === !!ne.includePrerelease ? U : new f(U.raw, ne);
      if (U instanceof n)
        return this.raw = U.value, this.set = [[U]], this.formatted = void 0, this;
      if (this.options = ne, this.loose = !!ne.loose, this.includePrerelease = !!ne.includePrerelease, this.raw = U.trim().replace(i, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((K) => !v(K[0])), this.set.length === 0)
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
      const L = ((this.options.includePrerelease && m) | (this.options.loose && y)) + ":" + U, K = s.get(L);
      if (K)
        return K;
      const ue = this.options.loose, fe = ue ? r[o.HYPHENRANGELOOSE] : r[o.HYPHENRANGE];
      U = U.replace(fe, H(this.options.includePrerelease)), e("hyphen replace", U), U = U.replace(r[o.COMPARATORTRIM], a), e("comparator trim", U), U = U.replace(r[o.TILDETRIM], l), e("tilde trim", U), U = U.replace(r[o.CARETTRIM], c), e("caret trim", U);
      let ge = U.split(" ").map((ie) => A(ie, this.options)).join(" ").split(/\s+/).map((ie) => J(ie, this.options));
      ue && (ge = ge.filter((ie) => (e("loose invalid filter", ie, this.options), !!ie.match(r[o.COMPARATORLOOSE])))), e("range list", ge);
      const de = /* @__PURE__ */ new Map(), we = ge.map((ie) => new n(ie, this.options));
      for (const ie of we) {
        if (v(ie))
          return [ie];
        de.set(ie.value, ie);
      }
      de.size > 1 && de.has("") && de.delete("");
      const _e = [...de.values()];
      return s.set(L, _e), _e;
    }
    intersects(U, ne) {
      if (!(U instanceof f))
        throw new TypeError("a Range is required");
      return this.set.some((L) => q(L, ne) && U.set.some((K) => q(K, ne) && L.every((ue) => K.every((fe) => ue.intersects(fe, ne)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(U) {
      if (!U)
        return !1;
      if (typeof U == "string")
        try {
          U = new u(U, this.options);
        } catch {
          return !1;
        }
      for (let ne = 0; ne < this.set.length; ne++)
        if (X(this.set[ne], U, this.options))
          return !0;
      return !1;
    }
  }
  range = f;
  const d = requireLrucache(), s = new d(), t = requireParseOptions(), n = requireComparator(), e = requireDebug(), u = requireSemver$1(), {
    safeRe: r,
    t: o,
    comparatorTrimReplace: a,
    tildeTrimReplace: l,
    caretTrimReplace: c
  } = requireRe(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: y } = requireConstants(), v = (N) => N.value === "<0.0.0-0", g = (N) => N.value === "", q = (N, U) => {
    let ne = !0;
    const L = N.slice();
    let K = L.pop();
    for (; ne && L.length; )
      ne = L.every((ue) => K.intersects(ue, U)), K = L.pop();
    return ne;
  }, A = (N, U) => (N = N.replace(r[o.BUILD], ""), e("comp", N, U), N = D(N, U), e("caret", N), N = F(N, U), e("tildes", N), N = b(N, U), e("xrange", N), N = z(N, U), e("stars", N), N), T = (N) => !N || N.toLowerCase() === "x" || N === "*", F = (N, U) => N.trim().split(/\s+/).map((ne) => C(ne, U)).join(" "), C = (N, U) => {
    const ne = U.loose ? r[o.TILDELOOSE] : r[o.TILDE];
    return N.replace(ne, (L, K, ue, fe, ge) => {
      e("tilde", N, L, K, ue, fe, ge);
      let de;
      return T(K) ? de = "" : T(ue) ? de = `>=${K}.0.0 <${+K + 1}.0.0-0` : T(fe) ? de = `>=${K}.${ue}.0 <${K}.${+ue + 1}.0-0` : ge ? (e("replaceTilde pr", ge), de = `>=${K}.${ue}.${fe}-${ge} <${K}.${+ue + 1}.0-0`) : de = `>=${K}.${ue}.${fe} <${K}.${+ue + 1}.0-0`, e("tilde return", de), de;
    });
  }, D = (N, U) => N.trim().split(/\s+/).map((ne) => x(ne, U)).join(" "), x = (N, U) => {
    e("caret", N, U);
    const ne = U.loose ? r[o.CARETLOOSE] : r[o.CARET], L = U.includePrerelease ? "-0" : "";
    return N.replace(ne, (K, ue, fe, ge, de) => {
      e("caret", N, K, ue, fe, ge, de);
      let we;
      return T(ue) ? we = "" : T(fe) ? we = `>=${ue}.0.0${L} <${+ue + 1}.0.0-0` : T(ge) ? ue === "0" ? we = `>=${ue}.${fe}.0${L} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.0${L} <${+ue + 1}.0.0-0` : de ? (e("replaceCaret pr", de), ue === "0" ? fe === "0" ? we = `>=${ue}.${fe}.${ge}-${de} <${ue}.${fe}.${+ge + 1}-0` : we = `>=${ue}.${fe}.${ge}-${de} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.${ge}-${de} <${+ue + 1}.0.0-0`) : (e("no pr"), ue === "0" ? fe === "0" ? we = `>=${ue}.${fe}.${ge}${L} <${ue}.${fe}.${+ge + 1}-0` : we = `>=${ue}.${fe}.${ge}${L} <${ue}.${+fe + 1}.0-0` : we = `>=${ue}.${fe}.${ge} <${+ue + 1}.0.0-0`), e("caret return", we), we;
    });
  }, b = (N, U) => (e("replaceXRanges", N, U), N.split(/\s+/).map((ne) => w(ne, U)).join(" ")), w = (N, U) => {
    N = N.trim();
    const ne = U.loose ? r[o.XRANGELOOSE] : r[o.XRANGE];
    return N.replace(ne, (L, K, ue, fe, ge, de) => {
      e("xRange", N, L, K, ue, fe, ge, de);
      const we = T(ue), _e = we || T(fe), ie = _e || T(ge), Ee = ie;
      return K === "=" && Ee && (K = ""), de = U.includePrerelease ? "-0" : "", we ? K === ">" || K === "<" ? L = "<0.0.0-0" : L = "*" : K && Ee ? (_e && (fe = 0), ge = 0, K === ">" ? (K = ">=", _e ? (ue = +ue + 1, fe = 0, ge = 0) : (fe = +fe + 1, ge = 0)) : K === "<=" && (K = "<", _e ? ue = +ue + 1 : fe = +fe + 1), K === "<" && (de = "-0"), L = `${K + ue}.${fe}.${ge}${de}`) : _e ? L = `>=${ue}.0.0${de} <${+ue + 1}.0.0-0` : ie && (L = `>=${ue}.${fe}.0${de} <${ue}.${+fe + 1}.0-0`), e("xRange return", L), L;
    });
  }, z = (N, U) => (e("replaceStars", N, U), N.trim().replace(r[o.STAR], "")), J = (N, U) => (e("replaceGTE0", N, U), N.trim().replace(r[U.includePrerelease ? o.GTE0PRE : o.GTE0], "")), H = (N) => (U, ne, L, K, ue, fe, ge, de, we, _e, ie, Ee) => (T(L) ? ne = "" : T(K) ? ne = `>=${L}.0.0${N ? "-0" : ""}` : T(ue) ? ne = `>=${L}.${K}.0${N ? "-0" : ""}` : fe ? ne = `>=${ne}` : ne = `>=${ne}${N ? "-0" : ""}`, T(we) ? de = "" : T(_e) ? de = `<${+we + 1}.0.0-0` : T(ie) ? de = `<${we}.${+_e + 1}.0-0` : Ee ? de = `<=${we}.${_e}.${ie}-${Ee}` : N ? de = `<${we}.${_e}.${+ie + 1}-0` : de = `<=${de}`, `${ne} ${de}`.trim()), X = (N, U, ne) => {
    for (let L = 0; L < N.length; L++)
      if (!N[L].test(U))
        return !1;
    if (U.prerelease.length && !ne.includePrerelease) {
      for (let L = 0; L < N.length; L++)
        if (e(N[L].semver), N[L].semver !== n.ANY && N[L].semver.prerelease.length > 0) {
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
  const i = /* @__PURE__ */ Symbol("SemVer ANY");
  class f {
    static get ANY() {
      return i;
    }
    constructor(a, l) {
      if (l = d(l), a instanceof f) {
        if (a.loose === !!l.loose)
          return a;
        a = a.value;
      }
      a = a.trim().split(/\s+/).join(" "), e("comparator", a, l), this.options = l, this.loose = !!l.loose, this.parse(a), this.semver === i ? this.value = "" : this.value = this.operator + this.semver.version, e("comp", this);
    }
    parse(a) {
      const l = this.options.loose ? s[t.COMPARATORLOOSE] : s[t.COMPARATOR], c = a.match(l);
      if (!c)
        throw new TypeError(`Invalid comparator: ${a}`);
      this.operator = c[1] !== void 0 ? c[1] : "", this.operator === "=" && (this.operator = ""), c[2] ? this.semver = new u(c[2], this.options.loose) : this.semver = i;
    }
    toString() {
      return this.value;
    }
    test(a) {
      if (e("Comparator.test", a, this.options.loose), this.semver === i || a === i)
        return !0;
      if (typeof a == "string")
        try {
          a = new u(a, this.options);
        } catch {
          return !1;
        }
      return n(a, this.operator, this.semver, this.options);
    }
    intersects(a, l) {
      if (!(a instanceof f))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new r(a.value, l).test(this.value) : a.operator === "" ? a.value === "" ? !0 : new r(this.value, l).test(a.semver) : (l = d(l), l.includePrerelease && (this.value === "<0.0.0-0" || a.value === "<0.0.0-0") || !l.includePrerelease && (this.value.startsWith("<0.0.0") || a.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && a.operator.startsWith(">") || this.operator.startsWith("<") && a.operator.startsWith("<") || this.semver.version === a.semver.version && this.operator.includes("=") && a.operator.includes("=") || n(this.semver, "<", a.semver, l) && this.operator.startsWith(">") && a.operator.startsWith("<") || n(this.semver, ">", a.semver, l) && this.operator.startsWith("<") && a.operator.startsWith(">")));
    }
  }
  comparator = f;
  const d = requireParseOptions(), { safeRe: s, t } = requireRe(), n = requireCmp(), e = requireDebug(), u = requireSemver$1(), r = requireRange();
  return comparator;
}
var satisfies_1, hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const i = requireRange();
  return satisfies_1 = (d, s, t) => {
    try {
      s = new i(s, t);
    } catch {
      return !1;
    }
    return s.test(d);
  }, satisfies_1;
}
var toComparators_1, hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const i = requireRange();
  return toComparators_1 = (d, s) => new i(d, s).set.map((t) => t.map((n) => n.value).join(" ").trim().split(" ")), toComparators_1;
}
var maxSatisfying_1, hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const i = requireSemver$1(), f = requireRange();
  return maxSatisfying_1 = (s, t, n) => {
    let e = null, u = null, r = null;
    try {
      r = new f(t, n);
    } catch {
      return null;
    }
    return s.forEach((o) => {
      r.test(o) && (!e || u.compare(o) === -1) && (e = o, u = new i(e, n));
    }), e;
  }, maxSatisfying_1;
}
var minSatisfying_1, hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const i = requireSemver$1(), f = requireRange();
  return minSatisfying_1 = (s, t, n) => {
    let e = null, u = null, r = null;
    try {
      r = new f(t, n);
    } catch {
      return null;
    }
    return s.forEach((o) => {
      r.test(o) && (!e || u.compare(o) === 1) && (e = o, u = new i(e, n));
    }), e;
  }, minSatisfying_1;
}
var minVersion_1, hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const i = requireSemver$1(), f = requireRange(), d = requireGt();
  return minVersion_1 = (t, n) => {
    t = new f(t, n);
    let e = new i("0.0.0");
    if (t.test(e) || (e = new i("0.0.0-0"), t.test(e)))
      return e;
    e = null;
    for (let u = 0; u < t.set.length; ++u) {
      const r = t.set[u];
      let o = null;
      r.forEach((a) => {
        const l = new i(a.semver.version);
        switch (a.operator) {
          case ">":
            l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
          /* fallthrough */
          case "":
          case ">=":
            (!o || d(l, o)) && (o = l);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${a.operator}`);
        }
      }), o && (!e || d(e, o)) && (e = o);
    }
    return e && t.test(e) ? e : null;
  }, minVersion_1;
}
var valid, hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const i = requireRange();
  return valid = (d, s) => {
    try {
      return new i(d, s).range || "*";
    } catch {
      return null;
    }
  }, valid;
}
var outside_1, hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const i = requireSemver$1(), f = requireComparator(), { ANY: d } = f, s = requireRange(), t = requireSatisfies(), n = requireGt(), e = requireLt(), u = requireLte(), r = requireGte();
  return outside_1 = (a, l, c, m) => {
    a = new i(a, m), l = new s(l, m);
    let y, v, g, q, A;
    switch (c) {
      case ">":
        y = n, v = u, g = e, q = ">", A = ">=";
        break;
      case "<":
        y = e, v = r, g = n, q = "<", A = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (t(a, l, m))
      return !1;
    for (let T = 0; T < l.set.length; ++T) {
      const F = l.set[T];
      let C = null, D = null;
      if (F.forEach((x) => {
        x.semver === d && (x = new f(">=0.0.0")), C = C || x, D = D || x, y(x.semver, C.semver, m) ? C = x : g(x.semver, D.semver, m) && (D = x);
      }), C.operator === q || C.operator === A || (!D.operator || D.operator === q) && v(a, D.semver))
        return !1;
      if (D.operator === A && g(a, D.semver))
        return !1;
    }
    return !0;
  }, outside_1;
}
var gtr_1, hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  const i = requireOutside();
  return gtr_1 = (d, s, t) => i(d, s, ">", t), gtr_1;
}
var ltr_1, hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const i = requireOutside();
  return ltr_1 = (d, s, t) => i(d, s, "<", t), ltr_1;
}
var intersects_1, hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const i = requireRange();
  return intersects_1 = (d, s, t) => (d = new i(d, t), s = new i(s, t), d.intersects(s, t)), intersects_1;
}
var simplify, hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const i = requireSatisfies(), f = requireCompare();
  return simplify = (d, s, t) => {
    const n = [];
    let e = null, u = null;
    const r = d.sort((c, m) => f(c, m, t));
    for (const c of r)
      i(c, s, t) ? (u = c, e || (e = c)) : (u && n.push([e, u]), u = null, e = null);
    e && n.push([e, null]);
    const o = [];
    for (const [c, m] of n)
      c === m ? o.push(c) : !m && c === r[0] ? o.push("*") : m ? c === r[0] ? o.push(`<=${m}`) : o.push(`${c} - ${m}`) : o.push(`>=${c}`);
    const a = o.join(" || "), l = typeof s.raw == "string" ? s.raw : String(s);
    return a.length < l.length ? a : s;
  }, simplify;
}
var subset_1, hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const i = requireRange(), f = requireComparator(), { ANY: d } = f, s = requireSatisfies(), t = requireCompare(), n = (l, c, m = {}) => {
    if (l === c)
      return !0;
    l = new i(l, m), c = new i(c, m);
    let y = !1;
    e: for (const v of l.set) {
      for (const g of c.set) {
        const q = r(v, g, m);
        if (y = y || q !== null, q)
          continue e;
      }
      if (y)
        return !1;
    }
    return !0;
  }, e = [new f(">=0.0.0-0")], u = [new f(">=0.0.0")], r = (l, c, m) => {
    if (l === c)
      return !0;
    if (l.length === 1 && l[0].semver === d) {
      if (c.length === 1 && c[0].semver === d)
        return !0;
      m.includePrerelease ? l = e : l = u;
    }
    if (c.length === 1 && c[0].semver === d) {
      if (m.includePrerelease)
        return !0;
      c = u;
    }
    const y = /* @__PURE__ */ new Set();
    let v, g;
    for (const b of l)
      b.operator === ">" || b.operator === ">=" ? v = o(v, b, m) : b.operator === "<" || b.operator === "<=" ? g = a(g, b, m) : y.add(b.semver);
    if (y.size > 1)
      return null;
    let q;
    if (v && g) {
      if (q = t(v.semver, g.semver, m), q > 0)
        return null;
      if (q === 0 && (v.operator !== ">=" || g.operator !== "<="))
        return null;
    }
    for (const b of y) {
      if (v && !s(b, String(v), m) || g && !s(b, String(g), m))
        return null;
      for (const w of c)
        if (!s(b, String(w), m))
          return !1;
      return !0;
    }
    let A, T, F, C, D = g && !m.includePrerelease && g.semver.prerelease.length ? g.semver : !1, x = v && !m.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    D && D.prerelease.length === 1 && g.operator === "<" && D.prerelease[0] === 0 && (D = !1);
    for (const b of c) {
      if (C = C || b.operator === ">" || b.operator === ">=", F = F || b.operator === "<" || b.operator === "<=", v) {
        if (x && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === x.major && b.semver.minor === x.minor && b.semver.patch === x.patch && (x = !1), b.operator === ">" || b.operator === ">=") {
          if (A = o(v, b, m), A === b && A !== v)
            return !1;
        } else if (v.operator === ">=" && !s(v.semver, String(b), m))
          return !1;
      }
      if (g) {
        if (D && b.semver.prerelease && b.semver.prerelease.length && b.semver.major === D.major && b.semver.minor === D.minor && b.semver.patch === D.patch && (D = !1), b.operator === "<" || b.operator === "<=") {
          if (T = a(g, b, m), T === b && T !== g)
            return !1;
        } else if (g.operator === "<=" && !s(g.semver, String(b), m))
          return !1;
      }
      if (!b.operator && (g || v) && q !== 0)
        return !1;
    }
    return !(v && F && !g && q !== 0 || g && C && !v && q !== 0 || x || D);
  }, o = (l, c, m) => {
    if (!l)
      return c;
    const y = t(l.semver, c.semver, m);
    return y > 0 ? l : y < 0 || c.operator === ">" && l.operator === ">=" ? c : l;
  }, a = (l, c, m) => {
    if (!l)
      return c;
    const y = t(l.semver, c.semver, m);
    return y < 0 ? l : y > 0 || c.operator === "<" && l.operator === "<=" ? c : l;
  };
  return subset_1 = n, subset_1;
}
var semver, hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const i = requireRe(), f = requireConstants(), d = requireSemver$1(), s = requireIdentifiers(), t = requireParse(), n = requireValid$1(), e = requireClean(), u = requireInc(), r = requireDiff(), o = requireMajor(), a = requireMinor(), l = requirePatch(), c = requirePrerelease(), m = requireCompare(), y = requireRcompare(), v = requireCompareLoose(), g = requireCompareBuild(), q = requireSort(), A = requireRsort(), T = requireGt(), F = requireLt(), C = requireEq(), D = requireNeq(), x = requireGte(), b = requireLte(), w = requireCmp(), z = requireCoerce(), J = requireComparator(), H = requireRange(), X = requireSatisfies(), N = requireToComparators(), U = requireMaxSatisfying(), ne = requireMinSatisfying(), L = requireMinVersion(), K = requireValid(), ue = requireOutside(), fe = requireGtr(), ge = requireLtr(), de = requireIntersects(), we = requireSimplify(), _e = requireSubset();
  return semver = {
    parse: t,
    valid: n,
    clean: e,
    inc: u,
    diff: r,
    major: o,
    minor: a,
    patch: l,
    prerelease: c,
    compare: m,
    rcompare: y,
    compareLoose: v,
    compareBuild: g,
    sort: q,
    rsort: A,
    gt: T,
    lt: F,
    eq: C,
    neq: D,
    gte: x,
    lte: b,
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
    SemVer: d,
    re: i.re,
    src: i.src,
    tokens: i.t,
    SEMVER_SPEC_VERSION: f.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: f.RELEASE_TYPES,
    compareIdentifiers: s.compareIdentifiers,
    rcompareIdentifiers: s.rcompareIdentifiers
  }, semver;
}
var DownloadedUpdateHelper = {}, lodash_isequal = { exports: {} };
lodash_isequal.exports;
var hasRequiredLodash_isequal;
function requireLodash_isequal() {
  return hasRequiredLodash_isequal || (hasRequiredLodash_isequal = 1, (function(i, f) {
    var d = 200, s = "__lodash_hash_undefined__", t = 1, n = 2, e = 9007199254740991, u = "[object Arguments]", r = "[object Array]", o = "[object AsyncFunction]", a = "[object Boolean]", l = "[object Date]", c = "[object Error]", m = "[object Function]", y = "[object GeneratorFunction]", v = "[object Map]", g = "[object Number]", q = "[object Null]", A = "[object Object]", T = "[object Promise]", F = "[object Proxy]", C = "[object RegExp]", D = "[object Set]", x = "[object String]", b = "[object Symbol]", w = "[object Undefined]", z = "[object WeakMap]", J = "[object ArrayBuffer]", H = "[object DataView]", X = "[object Float32Array]", N = "[object Float64Array]", U = "[object Int8Array]", ne = "[object Int16Array]", L = "[object Int32Array]", K = "[object Uint8Array]", ue = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", ge = "[object Uint32Array]", de = /[\\^$.*+?()[\]{}|]/g, we = /^\[object .+?Constructor\]$/, _e = /^(?:0|[1-9]\d*)$/, ie = {};
    ie[X] = ie[N] = ie[U] = ie[ne] = ie[L] = ie[K] = ie[ue] = ie[fe] = ie[ge] = !0, ie[u] = ie[r] = ie[J] = ie[a] = ie[H] = ie[l] = ie[c] = ie[m] = ie[v] = ie[g] = ie[A] = ie[C] = ie[D] = ie[x] = ie[z] = !1;
    var Ee = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, S = typeof self == "object" && self && self.Object === Object && self, R = Ee || S || Function("return this")(), te = f && !f.nodeType && f, k = te && !0 && i && !i.nodeType && i, pe = k && k.exports === te, ye = pe && Ee.process, ve = (function() {
      try {
        return ye && ye.binding && ye.binding("util");
      } catch {
      }
    })(), qe = ve && ve.isTypedArray;
    function Re(P, W) {
      for (var ce = -1, me = P == null ? 0 : P.length, Pe = 0, Ae = []; ++ce < me; ) {
        var $e = P[ce];
        W($e, ce, P) && (Ae[Pe++] = $e);
      }
      return Ae;
    }
    function Fe(P, W) {
      for (var ce = -1, me = W.length, Pe = P.length; ++ce < me; )
        P[Pe + ce] = W[ce];
      return P;
    }
    function be(P, W) {
      for (var ce = -1, me = P == null ? 0 : P.length; ++ce < me; )
        if (W(P[ce], ce, P))
          return !0;
      return !1;
    }
    function Te(P, W) {
      for (var ce = -1, me = Array(P); ++ce < P; )
        me[ce] = W(ce);
      return me;
    }
    function je(P) {
      return function(W) {
        return P(W);
      };
    }
    function ke(P, W) {
      return P.has(W);
    }
    function Ue(P, W) {
      return P?.[W];
    }
    function p(P) {
      var W = -1, ce = Array(P.size);
      return P.forEach(function(me, Pe) {
        ce[++W] = [Pe, me];
      }), ce;
    }
    function ee(P, W) {
      return function(ce) {
        return P(W(ce));
      };
    }
    function se(P) {
      var W = -1, ce = Array(P.size);
      return P.forEach(function(me) {
        ce[++W] = me;
      }), ce;
    }
    var h = Array.prototype, O = Function.prototype, j = Object.prototype, Q = R["__core-js_shared__"], V = O.toString, _ = j.hasOwnProperty, M = (function() {
      var P = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "");
      return P ? "Symbol(src)_1." + P : "";
    })(), Z = j.toString, Y = RegExp(
      "^" + V.call(_).replace(de, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), E = pe ? R.Buffer : void 0, $ = R.Symbol, I = R.Uint8Array, G = j.propertyIsEnumerable, B = h.splice, oe = $ ? $.toStringTag : void 0, ae = Object.getOwnPropertySymbols, le = E ? E.isBuffer : void 0, he = ee(Object.keys, Object), Se = nr(R, "DataView"), xe = nr(R, "Map"), De = nr(R, "Promise"), Ce = nr(R, "Set"), tr = nr(R, "WeakMap"), Ge = nr(Object, "create"), Xe = er(Se), Tr = er(xe), Pr = er(De), Or = er(Ce), Dr = er(tr), pr = $ ? $.prototype : void 0, dr = pr ? pr.valueOf : void 0;
    function Qe(P) {
      var W = -1, ce = P == null ? 0 : P.length;
      for (this.clear(); ++W < ce; ) {
        var me = P[W];
        this.set(me[0], me[1]);
      }
    }
    function $r() {
      this.__data__ = Ge ? Ge(null) : {}, this.size = 0;
    }
    function Fr(P) {
      var W = this.has(P) && delete this.__data__[P];
      return this.size -= W ? 1 : 0, W;
    }
    function Ir(P) {
      var W = this.__data__;
      if (Ge) {
        var ce = W[P];
        return ce === s ? void 0 : ce;
      }
      return _.call(W, P) ? W[P] : void 0;
    }
    function Nr(P) {
      var W = this.__data__;
      return Ge ? W[P] !== void 0 : _.call(W, P);
    }
    function Lr(P, W) {
      var ce = this.__data__;
      return this.size += this.has(P) ? 0 : 1, ce[P] = Ge && W === void 0 ? s : W, this;
    }
    Qe.prototype.clear = $r, Qe.prototype.delete = Fr, Qe.prototype.get = Ir, Qe.prototype.has = Nr, Qe.prototype.set = Lr;
    function Ye(P) {
      var W = -1, ce = P == null ? 0 : P.length;
      for (this.clear(); ++W < ce; ) {
        var me = P[W];
        this.set(me[0], me[1]);
      }
    }
    function Ur() {
      this.__data__ = [], this.size = 0;
    }
    function kr(P) {
      var W = this.__data__, ce = sr(W, P);
      if (ce < 0)
        return !1;
      var me = W.length - 1;
      return ce == me ? W.pop() : B.call(W, ce, 1), --this.size, !0;
    }
    function Mr(P) {
      var W = this.__data__, ce = sr(W, P);
      return ce < 0 ? void 0 : W[ce][1];
    }
    function jr(P) {
      return sr(this.__data__, P) > -1;
    }
    function Br(P, W) {
      var ce = this.__data__, me = sr(ce, P);
      return me < 0 ? (++this.size, ce.push([P, W])) : ce[me][1] = W, this;
    }
    Ye.prototype.clear = Ur, Ye.prototype.delete = kr, Ye.prototype.get = Mr, Ye.prototype.has = jr, Ye.prototype.set = Br;
    function Ze(P) {
      var W = -1, ce = P == null ? 0 : P.length;
      for (this.clear(); ++W < ce; ) {
        var me = P[W];
        this.set(me[0], me[1]);
      }
    }
    function Hr() {
      this.size = 0, this.__data__ = {
        hash: new Qe(),
        map: new (xe || Ye)(),
        string: new Qe()
      };
    }
    function Gr(P) {
      var W = ur(this, P).delete(P);
      return this.size -= W ? 1 : 0, W;
    }
    function Wr(P) {
      return ur(this, P).get(P);
    }
    function Yr(P) {
      return ur(this, P).has(P);
    }
    function Vr(P, W) {
      var ce = ur(this, P), me = ce.size;
      return ce.set(P, W), this.size += ce.size == me ? 0 : 1, this;
    }
    Ze.prototype.clear = Hr, Ze.prototype.delete = Gr, Ze.prototype.get = Wr, Ze.prototype.has = Yr, Ze.prototype.set = Vr;
    function ar(P) {
      var W = -1, ce = P == null ? 0 : P.length;
      for (this.__data__ = new Ze(); ++W < ce; )
        this.add(P[W]);
    }
    function zr(P) {
      return this.__data__.set(P, s), this;
    }
    function Jr(P) {
      return this.__data__.has(P);
    }
    ar.prototype.add = ar.prototype.push = zr, ar.prototype.has = Jr;
    function ze(P) {
      var W = this.__data__ = new Ye(P);
      this.size = W.size;
    }
    function Kr() {
      this.__data__ = new Ye(), this.size = 0;
    }
    function Xr(P) {
      var W = this.__data__, ce = W.delete(P);
      return this.size = W.size, ce;
    }
    function Qr(P) {
      return this.__data__.get(P);
    }
    function Zr(P) {
      return this.__data__.has(P);
    }
    function et(P, W) {
      var ce = this.__data__;
      if (ce instanceof Ye) {
        var me = ce.__data__;
        if (!xe || me.length < d - 1)
          return me.push([P, W]), this.size = ++ce.size, this;
        ce = this.__data__ = new Ze(me);
      }
      return ce.set(P, W), this.size = ce.size, this;
    }
    ze.prototype.clear = Kr, ze.prototype.delete = Xr, ze.prototype.get = Qr, ze.prototype.has = Zr, ze.prototype.set = et;
    function rt(P, W) {
      var ce = lr(P), me = !ce && gt(P), Pe = !ce && !me && hr(P), Ae = !ce && !me && !Pe && qr(P), $e = ce || me || Pe || Ae, Ie = $e ? Te(P.length, String) : [], Ne = Ie.length;
      for (var Oe in P)
        _.call(P, Oe) && !($e && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Oe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Pe && (Oe == "offset" || Oe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Ae && (Oe == "buffer" || Oe == "byteLength" || Oe == "byteOffset") || // Skip index properties.
        ft(Oe, Ne))) && Ie.push(Oe);
      return Ie;
    }
    function sr(P, W) {
      for (var ce = P.length; ce--; )
        if (Er(P[ce][0], W))
          return ce;
      return -1;
    }
    function tt(P, W, ce) {
      var me = W(P);
      return lr(P) ? me : Fe(me, ce(P));
    }
    function ir(P) {
      return P == null ? P === void 0 ? w : q : oe && oe in Object(P) ? lt(P) : mt(P);
    }
    function mr(P) {
      return or(P) && ir(P) == u;
    }
    function gr(P, W, ce, me, Pe) {
      return P === W ? !0 : P == null || W == null || !or(P) && !or(W) ? P !== P && W !== W : nt(P, W, ce, me, gr, Pe);
    }
    function nt(P, W, ce, me, Pe, Ae) {
      var $e = lr(P), Ie = lr(W), Ne = $e ? r : Je(P), Oe = Ie ? r : Je(W);
      Ne = Ne == u ? A : Ne, Oe = Oe == u ? A : Oe;
      var Me = Ne == A, We = Oe == A, Le = Ne == Oe;
      if (Le && hr(P)) {
        if (!hr(W))
          return !1;
        $e = !0, Me = !1;
      }
      if (Le && !Me)
        return Ae || (Ae = new ze()), $e || qr(P) ? yr(P, W, ce, me, Pe, Ae) : st(P, W, Ne, ce, me, Pe, Ae);
      if (!(ce & t)) {
        var Be = Me && _.call(P, "__wrapped__"), He = We && _.call(W, "__wrapped__");
        if (Be || He) {
          var Ke = Be ? P.value() : P, Ve = He ? W.value() : W;
          return Ae || (Ae = new ze()), Pe(Ke, Ve, ce, me, Ae);
        }
      }
      return Le ? (Ae || (Ae = new ze()), ut(P, W, ce, me, Pe, Ae)) : !1;
    }
    function it(P) {
      if (!Rr(P) || ht(P))
        return !1;
      var W = wr(P) ? Y : we;
      return W.test(er(P));
    }
    function ot(P) {
      return or(P) && _r(P.length) && !!ie[ir(P)];
    }
    function at(P) {
      if (!pt(P))
        return he(P);
      var W = [];
      for (var ce in Object(P))
        _.call(P, ce) && ce != "constructor" && W.push(ce);
      return W;
    }
    function yr(P, W, ce, me, Pe, Ae) {
      var $e = ce & t, Ie = P.length, Ne = W.length;
      if (Ie != Ne && !($e && Ne > Ie))
        return !1;
      var Oe = Ae.get(P);
      if (Oe && Ae.get(W))
        return Oe == W;
      var Me = -1, We = !0, Le = ce & n ? new ar() : void 0;
      for (Ae.set(P, W), Ae.set(W, P); ++Me < Ie; ) {
        var Be = P[Me], He = W[Me];
        if (me)
          var Ke = $e ? me(He, Be, Me, W, P, Ae) : me(Be, He, Me, P, W, Ae);
        if (Ke !== void 0) {
          if (Ke)
            continue;
          We = !1;
          break;
        }
        if (Le) {
          if (!be(W, function(Ve, rr) {
            if (!ke(Le, rr) && (Be === Ve || Pe(Be, Ve, ce, me, Ae)))
              return Le.push(rr);
          })) {
            We = !1;
            break;
          }
        } else if (!(Be === He || Pe(Be, He, ce, me, Ae))) {
          We = !1;
          break;
        }
      }
      return Ae.delete(P), Ae.delete(W), We;
    }
    function st(P, W, ce, me, Pe, Ae, $e) {
      switch (ce) {
        case H:
          if (P.byteLength != W.byteLength || P.byteOffset != W.byteOffset)
            return !1;
          P = P.buffer, W = W.buffer;
        case J:
          return !(P.byteLength != W.byteLength || !Ae(new I(P), new I(W)));
        case a:
        case l:
        case g:
          return Er(+P, +W);
        case c:
          return P.name == W.name && P.message == W.message;
        case C:
        case x:
          return P == W + "";
        case v:
          var Ie = p;
        case D:
          var Ne = me & t;
          if (Ie || (Ie = se), P.size != W.size && !Ne)
            return !1;
          var Oe = $e.get(P);
          if (Oe)
            return Oe == W;
          me |= n, $e.set(P, W);
          var Me = yr(Ie(P), Ie(W), me, Pe, Ae, $e);
          return $e.delete(P), Me;
        case b:
          if (dr)
            return dr.call(P) == dr.call(W);
      }
      return !1;
    }
    function ut(P, W, ce, me, Pe, Ae) {
      var $e = ce & t, Ie = vr(P), Ne = Ie.length, Oe = vr(W), Me = Oe.length;
      if (Ne != Me && !$e)
        return !1;
      for (var We = Ne; We--; ) {
        var Le = Ie[We];
        if (!($e ? Le in W : _.call(W, Le)))
          return !1;
      }
      var Be = Ae.get(P);
      if (Be && Ae.get(W))
        return Be == W;
      var He = !0;
      Ae.set(P, W), Ae.set(W, P);
      for (var Ke = $e; ++We < Ne; ) {
        Le = Ie[We];
        var Ve = P[Le], rr = W[Le];
        if (me)
          var Sr = $e ? me(rr, Ve, Le, W, P, Ae) : me(Ve, rr, Le, P, W, Ae);
        if (!(Sr === void 0 ? Ve === rr || Pe(Ve, rr, ce, me, Ae) : Sr)) {
          He = !1;
          break;
        }
        Ke || (Ke = Le == "constructor");
      }
      if (He && !Ke) {
        var cr = P.constructor, fr = W.constructor;
        cr != fr && "constructor" in P && "constructor" in W && !(typeof cr == "function" && cr instanceof cr && typeof fr == "function" && fr instanceof fr) && (He = !1);
      }
      return Ae.delete(P), Ae.delete(W), He;
    }
    function vr(P) {
      return tt(P, Et, ct);
    }
    function ur(P, W) {
      var ce = P.__data__;
      return dt(W) ? ce[typeof W == "string" ? "string" : "hash"] : ce.map;
    }
    function nr(P, W) {
      var ce = Ue(P, W);
      return it(ce) ? ce : void 0;
    }
    function lt(P) {
      var W = _.call(P, oe), ce = P[oe];
      try {
        P[oe] = void 0;
        var me = !0;
      } catch {
      }
      var Pe = Z.call(P);
      return me && (W ? P[oe] = ce : delete P[oe]), Pe;
    }
    var ct = ae ? function(P) {
      return P == null ? [] : (P = Object(P), Re(ae(P), function(W) {
        return G.call(P, W);
      }));
    } : wt, Je = ir;
    (Se && Je(new Se(new ArrayBuffer(1))) != H || xe && Je(new xe()) != v || De && Je(De.resolve()) != T || Ce && Je(new Ce()) != D || tr && Je(new tr()) != z) && (Je = function(P) {
      var W = ir(P), ce = W == A ? P.constructor : void 0, me = ce ? er(ce) : "";
      if (me)
        switch (me) {
          case Xe:
            return H;
          case Tr:
            return v;
          case Pr:
            return T;
          case Or:
            return D;
          case Dr:
            return z;
        }
      return W;
    });
    function ft(P, W) {
      return W = W ?? e, !!W && (typeof P == "number" || _e.test(P)) && P > -1 && P % 1 == 0 && P < W;
    }
    function dt(P) {
      var W = typeof P;
      return W == "string" || W == "number" || W == "symbol" || W == "boolean" ? P !== "__proto__" : P === null;
    }
    function ht(P) {
      return !!M && M in P;
    }
    function pt(P) {
      var W = P && P.constructor, ce = typeof W == "function" && W.prototype || j;
      return P === ce;
    }
    function mt(P) {
      return Z.call(P);
    }
    function er(P) {
      if (P != null) {
        try {
          return V.call(P);
        } catch {
        }
        try {
          return P + "";
        } catch {
        }
      }
      return "";
    }
    function Er(P, W) {
      return P === W || P !== P && W !== W;
    }
    var gt = mr(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? mr : function(P) {
      return or(P) && _.call(P, "callee") && !G.call(P, "callee");
    }, lr = Array.isArray;
    function yt(P) {
      return P != null && _r(P.length) && !wr(P);
    }
    var hr = le || _t;
    function vt(P, W) {
      return gr(P, W);
    }
    function wr(P) {
      if (!Rr(P))
        return !1;
      var W = ir(P);
      return W == m || W == y || W == o || W == F;
    }
    function _r(P) {
      return typeof P == "number" && P > -1 && P % 1 == 0 && P <= e;
    }
    function Rr(P) {
      var W = typeof P;
      return P != null && (W == "object" || W == "function");
    }
    function or(P) {
      return P != null && typeof P == "object";
    }
    var qr = qe ? je(qe) : ot;
    function Et(P) {
      return yt(P) ? rt(P) : at(P);
    }
    function wt() {
      return [];
    }
    function _t() {
      return !1;
    }
    i.exports = vt;
  })(lodash_isequal, lodash_isequal.exports)), lodash_isequal.exports;
}
var hasRequiredDownloadedUpdateHelper;
function requireDownloadedUpdateHelper() {
  if (hasRequiredDownloadedUpdateHelper) return DownloadedUpdateHelper;
  hasRequiredDownloadedUpdateHelper = 1, Object.defineProperty(DownloadedUpdateHelper, "__esModule", { value: !0 }), DownloadedUpdateHelper.DownloadedUpdateHelper = void 0, DownloadedUpdateHelper.createTempUpdateFile = u;
  const i = require$$0$7, f = require$$0, d = requireLodash_isequal(), s = /* @__PURE__ */ requireLib(), t = require$$1;
  let n = class {
    constructor(o) {
      this.cacheDir = o, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
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
      return t.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(o, a, l, c) {
      if (this.versionInfo != null && this.file === o && this.fileInfo != null)
        return d(this.versionInfo, a) && d(this.fileInfo.info, l.info) && await (0, s.pathExists)(o) ? o : null;
      const m = await this.getValidCachedUpdateFile(l, c);
      return m === null ? null : (c.info(`Update has already been downloaded to ${o}).`), this._file = m, m);
    }
    async setDownloadedFile(o, a, l, c, m, y) {
      this._file = o, this._packageFile = a, this.versionInfo = l, this.fileInfo = c, this._downloadedFileInfo = {
        fileName: m,
        sha512: c.info.sha512,
        isAdminRightsRequired: c.info.isAdminRightsRequired === !0
      }, y && await (0, s.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, s.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(o, a) {
      const l = this.getUpdateInfoFile();
      if (!await (0, s.pathExists)(l))
        return null;
      let m;
      try {
        m = await (0, s.readJson)(l);
      } catch (q) {
        let A = "No cached update info available";
        return q.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), A += ` (error on read: ${q.message})`), a.info(A), null;
      }
      if (!(m?.fileName !== null))
        return a.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (o.info.sha512 !== m.sha512)
        return a.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m.sha512}, expected: ${o.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const v = t.join(this.cacheDirForPendingUpdate, m.fileName);
      if (!await (0, s.pathExists)(v))
        return a.info("Cached update file doesn't exist"), null;
      const g = await e(v);
      return o.info.sha512 !== g ? (a.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${g}, expected: ${o.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = m, v);
    }
    getUpdateInfoFile() {
      return t.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  DownloadedUpdateHelper.DownloadedUpdateHelper = n;
  function e(r, o = "sha512", a = "base64", l) {
    return new Promise((c, m) => {
      const y = (0, i.createHash)(o);
      y.on("error", m).setEncoding(a), (0, f.createReadStream)(r, {
        ...l,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", m).on("end", () => {
        y.end(), c(y.read());
      }).pipe(y, { end: !1 });
    });
  }
  async function u(r, o, a) {
    let l = 0, c = t.join(o, r);
    for (let m = 0; m < 3; m++)
      try {
        return await (0, s.unlink)(c), c;
      } catch (y) {
        if (y.code === "ENOENT")
          return c;
        a.warn(`Error on remove temp update file: ${y}`), c = t.join(o, `${l++}-${r}`);
      }
    return c;
  }
  return DownloadedUpdateHelper;
}
var ElectronAppAdapter = {}, AppAdapter = {}, hasRequiredAppAdapter;
function requireAppAdapter() {
  if (hasRequiredAppAdapter) return AppAdapter;
  hasRequiredAppAdapter = 1, Object.defineProperty(AppAdapter, "__esModule", { value: !0 }), AppAdapter.getAppCacheDir = d;
  const i = require$$1, f = require$$1$1;
  function d() {
    const s = (0, f.homedir)();
    let t;
    return process.platform === "win32" ? t = process.env.LOCALAPPDATA || i.join(s, "AppData", "Local") : process.platform === "darwin" ? t = i.join(s, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || i.join(s, ".cache"), t;
  }
  return AppAdapter;
}
var hasRequiredElectronAppAdapter;
function requireElectronAppAdapter() {
  if (hasRequiredElectronAppAdapter) return ElectronAppAdapter;
  hasRequiredElectronAppAdapter = 1, Object.defineProperty(ElectronAppAdapter, "__esModule", { value: !0 }), ElectronAppAdapter.ElectronAppAdapter = void 0;
  const i = require$$1, f = requireAppAdapter();
  let d = class {
    constructor(t = require$$1$3.app) {
      this.app = t;
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
      return this.isPackaged ? i.join(process.resourcesPath, "app-update.yml") : i.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, f.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(t) {
      this.app.once("quit", (n, e) => t(e));
    }
  };
  return ElectronAppAdapter.ElectronAppAdapter = d, ElectronAppAdapter;
}
var electronHttpExecutor = {}, hasRequiredElectronHttpExecutor;
function requireElectronHttpExecutor() {
  return hasRequiredElectronHttpExecutor || (hasRequiredElectronHttpExecutor = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.ElectronHttpExecutor = i.NET_SESSION_NAME = void 0, i.getNetSession = d;
    const f = requireOut();
    i.NET_SESSION_NAME = "electron-updater";
    function d() {
      return require$$1$3.session.fromPartition(i.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class s extends f.HttpExecutor {
      constructor(n) {
        super(), this.proxyLoginCallback = n, this.cachedSession = null;
      }
      async download(n, e, u) {
        return await u.cancellationToken.createPromise((r, o, a) => {
          const l = {
            headers: u.headers || void 0,
            redirect: "manual"
          };
          (0, f.configureRequestUrl)(n, l), (0, f.configureRequestOptions)(l), this.doDownload(l, {
            destination: e,
            options: u,
            onCancel: a,
            callback: (c) => {
              c == null ? r(e) : o(c);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(n, e) {
        n.headers && n.headers.Host && (n.host = n.headers.Host, delete n.headers.Host), this.cachedSession == null && (this.cachedSession = d());
        const u = require$$1$3.net.request({
          ...n,
          session: this.cachedSession
        });
        return u.on("response", e), this.proxyLoginCallback != null && u.on("login", this.proxyLoginCallback), u;
      }
      addRedirectHandlers(n, e, u, r, o) {
        n.on("redirect", (a, l, c) => {
          n.abort(), r > this.maxRedirects ? u(this.createMaxRedirectError()) : o(f.HttpExecutor.prepareRedirectUrlOptions(c, e));
        });
      }
    }
    i.ElectronHttpExecutor = s;
  })(electronHttpExecutor)), electronHttpExecutor;
}
var GenericProvider = {}, util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util;
  hasRequiredUtil = 1, Object.defineProperty(util, "__esModule", { value: !0 }), util.newBaseUrl = f, util.newUrlFromBase = d, util.getChannelFilename = s;
  const i = require$$2;
  function f(t) {
    const n = new i.URL(t);
    return n.pathname.endsWith("/") || (n.pathname += "/"), n;
  }
  function d(t, n, e = !1) {
    const u = new i.URL(t, n), r = n.search;
    return r != null && r.length !== 0 ? u.search = r : e && (u.search = `noCache=${Date.now().toString(32)}`), u;
  }
  function s(t) {
    return `${t}.yml`;
  }
  return util;
}
var Provider = {}, lodash_escaperegexp, hasRequiredLodash_escaperegexp;
function requireLodash_escaperegexp() {
  if (hasRequiredLodash_escaperegexp) return lodash_escaperegexp;
  hasRequiredLodash_escaperegexp = 1;
  var i = "[object Symbol]", f = /[\\^$.*+?()[\]{}|]/g, d = RegExp(f.source), s = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, t = typeof self == "object" && self && self.Object === Object && self, n = s || t || Function("return this")(), e = Object.prototype, u = e.toString, r = n.Symbol, o = r ? r.prototype : void 0, a = o ? o.toString : void 0;
  function l(g) {
    if (typeof g == "string")
      return g;
    if (m(g))
      return a ? a.call(g) : "";
    var q = g + "";
    return q == "0" && 1 / g == -1 / 0 ? "-0" : q;
  }
  function c(g) {
    return !!g && typeof g == "object";
  }
  function m(g) {
    return typeof g == "symbol" || c(g) && u.call(g) == i;
  }
  function y(g) {
    return g == null ? "" : l(g);
  }
  function v(g) {
    return g = y(g), g && d.test(g) ? g.replace(f, "\\$&") : g;
  }
  return lodash_escaperegexp = v, lodash_escaperegexp;
}
var hasRequiredProvider;
function requireProvider() {
  if (hasRequiredProvider) return Provider;
  hasRequiredProvider = 1, Object.defineProperty(Provider, "__esModule", { value: !0 }), Provider.Provider = void 0, Provider.findFile = e, Provider.parseUpdateInfo = u, Provider.getFileList = r, Provider.resolveFiles = o;
  const i = requireOut(), f = requireJsYaml(), d = require$$2, s = requireUtil(), t = requireLodash_escaperegexp();
  let n = class {
    constructor(l) {
      this.runtimeOptions = l, this.requestHeaders = null, this.executor = l.executor;
    }
    // By default, the blockmap file is in the same directory as the main file
    // But some providers may have a different blockmap file, so we need to override this method
    getBlockMapFiles(l, c, m, y = null) {
      const v = (0, s.newUrlFromBase)(`${l.pathname}.blockmap`, l);
      return [(0, s.newUrlFromBase)(`${l.pathname.replace(new RegExp(t(m), "g"), c)}.blockmap`, y ? new d.URL(y) : l), v];
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const l = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (l === "x64" ? "" : `-${l}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(l) {
      return `${l}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(l) {
      this.requestHeaders = l;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(l, c, m) {
      return this.executor.request(this.createRequestOptions(l, c), m);
    }
    createRequestOptions(l, c) {
      const m = {};
      return this.requestHeaders == null ? c != null && (m.headers = c) : m.headers = c == null ? this.requestHeaders : { ...this.requestHeaders, ...c }, (0, i.configureRequestUrl)(l, m), m;
    }
  };
  Provider.Provider = n;
  function e(a, l, c) {
    var m;
    if (a.length === 0)
      throw (0, i.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const y = a.filter((g) => g.url.pathname.toLowerCase().endsWith(`.${l.toLowerCase()}`)), v = (m = y.find((g) => [g.url.pathname, g.info.url].some((q) => q.includes(process.arch)))) !== null && m !== void 0 ? m : y.shift();
    return v || (c == null ? a[0] : a.find((g) => !c.some((q) => g.url.pathname.toLowerCase().endsWith(`.${q.toLowerCase()}`))));
  }
  function u(a, l, c) {
    if (a == null)
      throw (0, i.newError)(`Cannot parse update info from ${l} in the latest release artifacts (${c}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let m;
    try {
      m = (0, f.load)(a);
    } catch (y) {
      throw (0, i.newError)(`Cannot parse update info from ${l} in the latest release artifacts (${c}): ${y.stack || y.message}, rawData: ${a}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return m;
  }
  function r(a) {
    const l = a.files;
    if (l != null && l.length > 0)
      return l;
    if (a.path != null)
      return [
        {
          url: a.path,
          sha2: a.sha2,
          sha512: a.sha512
        }
      ];
    throw (0, i.newError)(`No files provided: ${(0, i.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function o(a, l, c = (m) => m) {
    const y = r(a).map((q) => {
      if (q.sha2 == null && q.sha512 == null)
        throw (0, i.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, i.safeStringifyJson)(q)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, s.newUrlFromBase)(c(q.url), l),
        info: q
      };
    }), v = a.packages, g = v == null ? null : v[process.arch] || v.ia32;
    return g != null && (y[0].packageInfo = {
      ...g,
      path: (0, s.newUrlFromBase)(c(g.path), l).href
    }), y;
  }
  return Provider;
}
var hasRequiredGenericProvider;
function requireGenericProvider() {
  if (hasRequiredGenericProvider) return GenericProvider;
  hasRequiredGenericProvider = 1, Object.defineProperty(GenericProvider, "__esModule", { value: !0 }), GenericProvider.GenericProvider = void 0;
  const i = requireOut(), f = requireUtil(), d = requireProvider();
  let s = class extends d.Provider {
    constructor(n, e, u) {
      super(u), this.configuration = n, this.updater = e, this.baseUrl = (0, f.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const n = this.updater.channel || this.configuration.channel;
      return n == null ? this.getDefaultChannelName() : this.getCustomChannelName(n);
    }
    async getLatestVersion() {
      const n = (0, f.getChannelFilename)(this.channel), e = (0, f.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let u = 0; ; u++)
        try {
          return (0, d.parseUpdateInfo)(await this.httpRequest(e), n, e);
        } catch (r) {
          if (r instanceof i.HttpError && r.statusCode === 404)
            throw (0, i.newError)(`Cannot find channel "${n}" update info: ${r.stack || r.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (r.code === "ECONNREFUSED" && u < 3) {
            await new Promise((o, a) => {
              try {
                setTimeout(o, 1e3 * u);
              } catch (l) {
                a(l);
              }
            });
            continue;
          }
          throw r;
        }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
  };
  return GenericProvider.GenericProvider = s, GenericProvider;
}
var providerFactory = {}, BitbucketProvider = {}, hasRequiredBitbucketProvider;
function requireBitbucketProvider() {
  if (hasRequiredBitbucketProvider) return BitbucketProvider;
  hasRequiredBitbucketProvider = 1, Object.defineProperty(BitbucketProvider, "__esModule", { value: !0 }), BitbucketProvider.BitbucketProvider = void 0;
  const i = requireOut(), f = requireUtil(), d = requireProvider();
  let s = class extends d.Provider {
    constructor(n, e, u) {
      super({
        ...u,
        isUseMultipleRangeRequest: !1
      }), this.configuration = n, this.updater = e;
      const { owner: r, slug: o } = n;
      this.baseUrl = (0, f.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${r}/${o}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const n = new i.CancellationToken(), e = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), u = (0, f.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(u, void 0, n);
        return (0, d.parseUpdateInfo)(r, e, u);
      } catch (r) {
        throw (0, i.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
    toString() {
      const { owner: n, slug: e } = this.configuration;
      return `Bitbucket (owner: ${n}, slug: ${e}, channel: ${this.channel})`;
    }
  };
  return BitbucketProvider.BitbucketProvider = s, BitbucketProvider;
}
var GitHubProvider = {}, hasRequiredGitHubProvider;
function requireGitHubProvider() {
  if (hasRequiredGitHubProvider) return GitHubProvider;
  hasRequiredGitHubProvider = 1, Object.defineProperty(GitHubProvider, "__esModule", { value: !0 }), GitHubProvider.GitHubProvider = GitHubProvider.BaseGitHubProvider = void 0, GitHubProvider.computeReleaseNotes = o;
  const i = requireOut(), f = requireSemver(), d = require$$2, s = requireUtil(), t = requireProvider(), n = /\/tag\/([^/]+)$/;
  class e extends t.Provider {
    constructor(l, c, m) {
      super({
        ...m,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = l, this.baseUrl = (0, s.newBaseUrl)((0, i.githubUrl)(l, c));
      const y = c === "github.com" ? "api.github.com" : c;
      this.baseApiUrl = (0, s.newBaseUrl)((0, i.githubUrl)(l, y));
    }
    computeGithubBasePath(l) {
      const c = this.options.host;
      return c && !["github.com", "api.github.com"].includes(c) ? `/api/v3${l}` : l;
    }
  }
  GitHubProvider.BaseGitHubProvider = e;
  let u = class extends e {
    constructor(l, c, m) {
      super(l, "github.com", m), this.options = l, this.updater = c;
    }
    get channel() {
      const l = this.updater.channel || this.options.channel;
      return l == null ? this.getDefaultChannelName() : this.getCustomChannelName(l);
    }
    async getLatestVersion() {
      var l, c, m, y, v;
      const g = new i.CancellationToken(), q = await this.httpRequest((0, s.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, g), A = (0, i.parseXml)(q);
      let T = A.element("entry", !1, "No published versions on GitHub"), F = null;
      try {
        if (this.updater.allowPrerelease) {
          const z = ((l = this.updater) === null || l === void 0 ? void 0 : l.channel) || ((c = f.prerelease(this.updater.currentVersion)) === null || c === void 0 ? void 0 : c[0]) || null;
          if (z === null)
            F = n.exec(T.element("link").attribute("href"))[1];
          else
            for (const J of A.getElements("entry")) {
              const H = n.exec(J.element("link").attribute("href"));
              if (H === null)
                continue;
              const X = H[1], N = ((m = f.prerelease(X)) === null || m === void 0 ? void 0 : m[0]) || null, U = !z || ["alpha", "beta"].includes(z), ne = N !== null && !["alpha", "beta"].includes(String(N));
              if (U && !ne && !(z === "beta" && N === "alpha")) {
                F = X;
                break;
              }
              if (N && N === z) {
                F = X;
                break;
              }
            }
        } else {
          F = await this.getLatestTagName(g);
          for (const z of A.getElements("entry"))
            if (n.exec(z.element("link").attribute("href"))[1] === F) {
              T = z;
              break;
            }
        }
      } catch (z) {
        throw (0, i.newError)(`Cannot parse releases feed: ${z.stack || z.message},
XML:
${q}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (F == null)
        throw (0, i.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let C, D = "", x = "";
      const b = async (z) => {
        D = (0, s.getChannelFilename)(z), x = (0, s.newUrlFromBase)(this.getBaseDownloadPath(String(F), D), this.baseUrl);
        const J = this.createRequestOptions(x);
        try {
          return await this.executor.request(J, g);
        } catch (H) {
          throw H instanceof i.HttpError && H.statusCode === 404 ? (0, i.newError)(`Cannot find ${D} in the latest release artifacts (${x}): ${H.stack || H.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : H;
        }
      };
      try {
        let z = this.channel;
        this.updater.allowPrerelease && (!((y = f.prerelease(F)) === null || y === void 0) && y[0]) && (z = this.getCustomChannelName(String((v = f.prerelease(F)) === null || v === void 0 ? void 0 : v[0]))), C = await b(z);
      } catch (z) {
        if (this.updater.allowPrerelease)
          C = await b(this.getDefaultChannelName());
        else
          throw z;
      }
      const w = (0, t.parseUpdateInfo)(C, D, x);
      return w.releaseName == null && (w.releaseName = T.elementValueOrEmpty("title")), w.releaseNotes == null && (w.releaseNotes = o(this.updater.currentVersion, this.updater.fullChangelog, A, T)), {
        tag: F,
        ...w
      };
    }
    async getLatestTagName(l) {
      const c = this.options, m = c.host == null || c.host === "github.com" ? (0, s.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new d.URL(`${this.computeGithubBasePath(`/repos/${c.owner}/${c.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const y = await this.httpRequest(m, { Accept: "application/json" }, l);
        return y == null ? null : JSON.parse(y).tag_name;
      } catch (y) {
        throw (0, i.newError)(`Unable to find latest version on GitHub (${m}), please ensure a production release exists: ${y.stack || y.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(l) {
      return (0, t.resolveFiles)(l, this.baseUrl, (c) => this.getBaseDownloadPath(l.tag, c.replace(/ /g, "-")));
    }
    getBaseDownloadPath(l, c) {
      return `${this.basePath}/download/${l}/${c}`;
    }
  };
  GitHubProvider.GitHubProvider = u;
  function r(a) {
    const l = a.elementValueOrEmpty("content");
    return l === "No content." ? "" : l;
  }
  function o(a, l, c, m) {
    if (!l)
      return r(m);
    const y = [];
    for (const v of c.getElements("entry")) {
      const g = /\/tag\/v?([^/]+)$/.exec(v.element("link").attribute("href"))[1];
      f.lt(a, g) && y.push({
        version: g,
        note: r(v)
      });
    }
    return y.sort((v, g) => f.rcompare(v.version, g.version));
  }
  return GitHubProvider;
}
var GitLabProvider = {}, hasRequiredGitLabProvider;
function requireGitLabProvider() {
  if (hasRequiredGitLabProvider) return GitLabProvider;
  hasRequiredGitLabProvider = 1, Object.defineProperty(GitLabProvider, "__esModule", { value: !0 }), GitLabProvider.GitLabProvider = void 0;
  const i = requireOut(), f = require$$2, d = requireLodash_escaperegexp(), s = requireUtil(), t = requireProvider();
  let n = class extends t.Provider {
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
    normalizeFilename(u) {
      return u.replace(/ |_/g, "-");
    }
    constructor(u, r, o) {
      super({
        ...o,
        // GitLab might not support multiple range requests efficiently
        isUseMultipleRangeRequest: !1
      }), this.options = u, this.updater = r, this.cachedLatestVersion = null;
      const l = u.host || "gitlab.com";
      this.baseApiUrl = (0, s.newBaseUrl)(`https://${l}/api/v4`);
    }
    get channel() {
      const u = this.updater.channel || this.options.channel;
      return u == null ? this.getDefaultChannelName() : this.getCustomChannelName(u);
    }
    async getLatestVersion() {
      const u = new i.CancellationToken(), r = (0, s.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl);
      let o;
      try {
        const A = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, T = await this.httpRequest(r, A, u);
        if (!T)
          throw (0, i.newError)("No latest release found", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
        o = JSON.parse(T);
      } catch (A) {
        throw (0, i.newError)(`Unable to find latest release on GitLab (${r}): ${A.stack || A.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
      const a = o.tag_name;
      let l = null, c = "", m = null;
      const y = async (A) => {
        c = (0, s.getChannelFilename)(A);
        const T = o.assets.links.find((C) => C.name === c);
        if (!T)
          throw (0, i.newError)(`Cannot find ${c} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        m = new f.URL(T.direct_asset_url);
        const F = this.options.token ? { "PRIVATE-TOKEN": this.options.token } : void 0;
        try {
          const C = await this.httpRequest(m, F, u);
          if (!C)
            throw (0, i.newError)(`Empty response from ${m}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          return C;
        } catch (C) {
          throw C instanceof i.HttpError && C.statusCode === 404 ? (0, i.newError)(`Cannot find ${c} in the latest release artifacts (${m}): ${C.stack || C.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : C;
        }
      };
      try {
        l = await y(this.channel);
      } catch (A) {
        if (this.channel !== this.getDefaultChannelName())
          l = await y(this.getDefaultChannelName());
        else
          throw A;
      }
      if (!l)
        throw (0, i.newError)(`Unable to parse channel data from ${c}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
      const v = (0, t.parseUpdateInfo)(l, c, m);
      v.releaseName == null && (v.releaseName = o.name), v.releaseNotes == null && (v.releaseNotes = o.description || null);
      const g = /* @__PURE__ */ new Map();
      for (const A of o.assets.links)
        g.set(this.normalizeFilename(A.name), A.direct_asset_url);
      const q = {
        tag: a,
        assets: g,
        ...v
      };
      return this.cachedLatestVersion = q, q;
    }
    /**
     * Utility function to convert GitlabReleaseAsset to Map<string, string>
     * Maps asset names to their download URLs
     */
    convertAssetsToMap(u) {
      const r = /* @__PURE__ */ new Map();
      for (const o of u.links)
        r.set(this.normalizeFilename(o.name), o.direct_asset_url);
      return r;
    }
    /**
     * Find blockmap file URL in assets map for a specific filename
     */
    findBlockMapInAssets(u, r) {
      const o = [`${r}.blockmap`, `${this.normalizeFilename(r)}.blockmap`];
      for (const a of o) {
        const l = u.get(a);
        if (l)
          return new f.URL(l);
      }
      return null;
    }
    async fetchReleaseInfoByVersion(u) {
      const r = new i.CancellationToken(), o = [`v${u}`, u];
      for (const a of o) {
        const l = (0, s.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(a)}`, this.baseApiUrl);
        try {
          const c = { "Content-Type": "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, m = await this.httpRequest(l, c, r);
          if (m)
            return JSON.parse(m);
        } catch (c) {
          if (c instanceof i.HttpError && c.statusCode === 404)
            continue;
          throw (0, i.newError)(`Unable to find release ${a} on GitLab (${l}): ${c.stack || c.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
        }
      }
      throw (0, i.newError)(`Unable to find release with version ${u} (tried: ${o.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
    }
    setAuthHeaderForToken(u) {
      const r = {};
      return u != null && (u.startsWith("Bearer") ? r.authorization = u : r["PRIVATE-TOKEN"] = u), r;
    }
    /**
     * Get version info for blockmap files, using cache when possible
     */
    async getVersionInfoForBlockMap(u) {
      if (this.cachedLatestVersion && this.cachedLatestVersion.version === u)
        return this.cachedLatestVersion.assets;
      const r = await this.fetchReleaseInfoByVersion(u);
      return r && r.assets ? this.convertAssetsToMap(r.assets) : null;
    }
    /**
     * Find blockmap URLs from version assets
     */
    async findBlockMapUrlsFromAssets(u, r, o) {
      let a = null, l = null;
      const c = await this.getVersionInfoForBlockMap(r);
      c && (a = this.findBlockMapInAssets(c, o));
      const m = await this.getVersionInfoForBlockMap(u);
      if (m) {
        const y = o.replace(new RegExp(d(r), "g"), u);
        l = this.findBlockMapInAssets(m, y);
      }
      return [l, a];
    }
    async getBlockMapFiles(u, r, o, a = null) {
      if (this.options.uploadTarget === "project_upload") {
        const l = u.pathname.split("/").pop() || "", [c, m] = await this.findBlockMapUrlsFromAssets(r, o, l);
        if (!m)
          throw (0, i.newError)(`Cannot find blockmap file for ${o} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        if (!c)
          throw (0, i.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
        return [c, m];
      } else
        return super.getBlockMapFiles(u, r, o, a);
    }
    resolveFiles(u) {
      return (0, t.getFileList)(u).map((r) => {
        const a = [
          r.url,
          // Original filename
          this.normalizeFilename(r.url)
          // Normalized filename (spaces/underscores → dashes)
        ].find((c) => u.assets.has(c)), l = a ? u.assets.get(a) : void 0;
        if (!l)
          throw (0, i.newError)(`Cannot find asset "${r.url}" in GitLab release assets. Available assets: ${Array.from(u.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new f.URL(l),
          info: r
        };
      });
    }
    toString() {
      return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
    }
  };
  return GitLabProvider.GitLabProvider = n, GitLabProvider;
}
var KeygenProvider = {}, hasRequiredKeygenProvider;
function requireKeygenProvider() {
  if (hasRequiredKeygenProvider) return KeygenProvider;
  hasRequiredKeygenProvider = 1, Object.defineProperty(KeygenProvider, "__esModule", { value: !0 }), KeygenProvider.KeygenProvider = void 0;
  const i = requireOut(), f = requireUtil(), d = requireProvider();
  let s = class extends d.Provider {
    constructor(n, e, u) {
      super({
        ...u,
        isUseMultipleRangeRequest: !1
      }), this.configuration = n, this.updater = e, this.defaultHostname = "api.keygen.sh";
      const r = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, f.newBaseUrl)(`https://${r}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const n = new i.CancellationToken(), e = (0, f.getChannelFilename)(this.getCustomChannelName(this.channel)), u = (0, f.newUrlFromBase)(e, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const r = await this.httpRequest(u, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, n);
        return (0, d.parseUpdateInfo)(r, e, u);
      } catch (r) {
        throw (0, i.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${r.stack || r.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(n) {
      return (0, d.resolveFiles)(n, this.baseUrl);
    }
    toString() {
      const { account: n, product: e, platform: u } = this.configuration;
      return `Keygen (account: ${n}, product: ${e}, platform: ${u}, channel: ${this.channel})`;
    }
  };
  return KeygenProvider.KeygenProvider = s, KeygenProvider;
}
var PrivateGitHubProvider = {}, hasRequiredPrivateGitHubProvider;
function requirePrivateGitHubProvider() {
  if (hasRequiredPrivateGitHubProvider) return PrivateGitHubProvider;
  hasRequiredPrivateGitHubProvider = 1, Object.defineProperty(PrivateGitHubProvider, "__esModule", { value: !0 }), PrivateGitHubProvider.PrivateGitHubProvider = void 0;
  const i = requireOut(), f = requireJsYaml(), d = require$$1, s = require$$2, t = requireUtil(), n = requireGitHubProvider(), e = requireProvider();
  let u = class extends n.BaseGitHubProvider {
    constructor(o, a, l, c) {
      super(o, "api.github.com", c), this.updater = a, this.token = l;
    }
    createRequestOptions(o, a) {
      const l = super.createRequestOptions(o, a);
      return l.redirect = "manual", l;
    }
    async getLatestVersion() {
      const o = new i.CancellationToken(), a = (0, t.getChannelFilename)(this.getDefaultChannelName()), l = await this.getLatestVersionInfo(o), c = l.assets.find((v) => v.name === a);
      if (c == null)
        throw (0, i.newError)(`Cannot find ${a} in the release ${l.html_url || l.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const m = new s.URL(c.url);
      let y;
      try {
        y = (0, f.load)(await this.httpRequest(m, this.configureHeaders("application/octet-stream"), o));
      } catch (v) {
        throw v instanceof i.HttpError && v.statusCode === 404 ? (0, i.newError)(`Cannot find ${a} in the latest release artifacts (${m}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
      return y.assets = l.assets, y;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(o) {
      return {
        accept: o,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(o) {
      const a = this.updater.allowPrerelease;
      let l = this.basePath;
      a || (l = `${l}/latest`);
      const c = (0, t.newUrlFromBase)(l, this.baseUrl);
      try {
        const m = JSON.parse(await this.httpRequest(c, this.configureHeaders("application/vnd.github.v3+json"), o));
        return a ? m.find((y) => y.prerelease) || m[0] : m;
      } catch (m) {
        throw (0, i.newError)(`Unable to find latest version on GitHub (${c}), please ensure a production release exists: ${m.stack || m.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(o) {
      return (0, e.getFileList)(o).map((a) => {
        const l = d.posix.basename(a.url).replace(/ /g, "-"), c = o.assets.find((m) => m != null && m.name === l);
        if (c == null)
          throw (0, i.newError)(`Cannot find asset "${l}" in: ${JSON.stringify(o.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new s.URL(c.url),
          info: a
        };
      });
    }
  };
  return PrivateGitHubProvider.PrivateGitHubProvider = u, PrivateGitHubProvider;
}
var hasRequiredProviderFactory;
function requireProviderFactory() {
  if (hasRequiredProviderFactory) return providerFactory;
  hasRequiredProviderFactory = 1, Object.defineProperty(providerFactory, "__esModule", { value: !0 }), providerFactory.isUrlProbablySupportMultiRangeRequests = u, providerFactory.createClient = r;
  const i = requireOut(), f = requireBitbucketProvider(), d = requireGenericProvider(), s = requireGitHubProvider(), t = requireGitLabProvider(), n = requireKeygenProvider(), e = requirePrivateGitHubProvider();
  function u(o) {
    return !o.includes("s3.amazonaws.com");
  }
  function r(o, a, l) {
    if (typeof o == "string")
      throw (0, i.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const c = o.provider;
    switch (c) {
      case "github": {
        const m = o, y = (m.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || m.token;
        return y == null ? new s.GitHubProvider(m, a, l) : new e.PrivateGitHubProvider(m, a, y, l);
      }
      case "bitbucket":
        return new f.BitbucketProvider(o, a, l);
      case "gitlab":
        return new t.GitLabProvider(o, a, l);
      case "keygen":
        return new n.KeygenProvider(o, a, l);
      case "s3":
      case "spaces":
        return new d.GenericProvider({
          provider: "generic",
          url: (0, i.getS3LikeProviderBaseUrl)(o),
          channel: o.channel || null
        }, a, {
          ...l,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const m = o;
        return new d.GenericProvider(m, a, {
          ...l,
          isUseMultipleRangeRequest: m.useMultipleRangeRequest !== !1 && u(m.url)
        });
      }
      case "custom": {
        const m = o, y = m.updateProvider;
        if (!y)
          throw (0, i.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new y(m, a, l);
      }
      default:
        throw (0, i.newError)(`Unsupported provider: ${c}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return providerFactory;
}
var GenericDifferentialDownloader = {}, DifferentialDownloader = {}, DataSplitter = {}, downloadPlanBuilder = {}, hasRequiredDownloadPlanBuilder;
function requireDownloadPlanBuilder() {
  if (hasRequiredDownloadPlanBuilder) return downloadPlanBuilder;
  hasRequiredDownloadPlanBuilder = 1, Object.defineProperty(downloadPlanBuilder, "__esModule", { value: !0 }), downloadPlanBuilder.OperationKind = void 0, downloadPlanBuilder.computeOperations = f;
  var i;
  (function(e) {
    e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
  })(i || (downloadPlanBuilder.OperationKind = i = {}));
  function f(e, u, r) {
    const o = n(e.files), a = n(u.files);
    let l = null;
    const c = u.files[0], m = [], y = c.name, v = o.get(y);
    if (v == null)
      throw new Error(`no file ${y} in old blockmap`);
    const g = a.get(y);
    let q = 0;
    const { checksumToOffset: A, checksumToOldSize: T } = t(o.get(y), v.offset, r);
    let F = c.offset;
    for (let C = 0; C < g.checksums.length; F += g.sizes[C], C++) {
      const D = g.sizes[C], x = g.checksums[C];
      let b = A.get(x);
      b != null && T.get(x) !== D && (r.warn(`Checksum ("${x}") matches, but size differs (old: ${T.get(x)}, new: ${D})`), b = void 0), b === void 0 ? (q++, l != null && l.kind === i.DOWNLOAD && l.end === F ? l.end += D : (l = {
        kind: i.DOWNLOAD,
        start: F,
        end: F + D
        // oldBlocks: null,
      }, s(l, m, x, C))) : l != null && l.kind === i.COPY && l.end === b ? l.end += D : (l = {
        kind: i.COPY,
        start: b,
        end: b + D
        // oldBlocks: [checksum]
      }, s(l, m, x, C));
    }
    return q > 0 && r.info(`File${c.name === "file" ? "" : " " + c.name} has ${q} changed blocks`), m;
  }
  const d = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function s(e, u, r, o) {
    if (d && u.length !== 0) {
      const a = u[u.length - 1];
      if (a.kind === e.kind && e.start < a.end && e.start > a.start) {
        const l = [a.start, a.end, e.start, e.end].reduce((c, m) => c < m ? c : m);
        throw new Error(`operation (block index: ${o}, checksum: ${r}, kind: ${i[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${a.start} until ${a.end} and ${e.start} until ${e.end}
rel: ${a.start - l} until ${a.end - l} and ${e.start - l} until ${e.end - l}`);
      }
    }
    u.push(e);
  }
  function t(e, u, r) {
    const o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    let l = u;
    for (let c = 0; c < e.checksums.length; c++) {
      const m = e.checksums[c], y = e.sizes[c], v = a.get(m);
      if (v === void 0)
        o.set(m, l), a.set(m, y);
      else if (r.debug != null) {
        const g = v === y ? "(same size)" : `(size: ${v}, this size: ${y})`;
        r.debug(`${m} duplicated in blockmap ${g}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      l += y;
    }
    return { checksumToOffset: o, checksumToOldSize: a };
  }
  function n(e) {
    const u = /* @__PURE__ */ new Map();
    for (const r of e)
      u.set(r.name, r);
    return u;
  }
  return downloadPlanBuilder;
}
var hasRequiredDataSplitter;
function requireDataSplitter() {
  if (hasRequiredDataSplitter) return DataSplitter;
  hasRequiredDataSplitter = 1, Object.defineProperty(DataSplitter, "__esModule", { value: !0 }), DataSplitter.DataSplitter = void 0, DataSplitter.copyData = e;
  const i = requireOut(), f = require$$0, d = require$$0$6, s = requireDownloadPlanBuilder(), t = Buffer.from(`\r
\r
`);
  var n;
  (function(r) {
    r[r.INIT = 0] = "INIT", r[r.HEADER = 1] = "HEADER", r[r.BODY = 2] = "BODY";
  })(n || (n = {}));
  function e(r, o, a, l, c) {
    const m = (0, f.createReadStream)("", {
      fd: a,
      autoClose: !1,
      start: r.start,
      // end is inclusive
      end: r.end - 1
    });
    m.on("error", l), m.once("end", c), m.pipe(o, {
      end: !1
    });
  }
  let u = class extends d.Writable {
    constructor(o, a, l, c, m, y) {
      super(), this.out = o, this.options = a, this.partIndexToTaskIndex = l, this.partIndexToLength = m, this.finishHandler = y, this.partIndex = -1, this.headerListBuffer = null, this.readState = n.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = c.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(o, a, l) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${o.length} bytes`);
        return;
      }
      this.handleData(o).then(l).catch(l);
    }
    async handleData(o) {
      let a = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, i.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const l = Math.min(this.ignoreByteCount, o.length);
        this.ignoreByteCount -= l, a = l;
      } else if (this.remainingPartDataCount > 0) {
        const l = Math.min(this.remainingPartDataCount, o.length);
        this.remainingPartDataCount -= l, await this.processPartData(o, 0, l), a = l;
      }
      if (a !== o.length) {
        if (this.readState === n.HEADER) {
          const l = this.searchHeaderListEnd(o, a);
          if (l === -1)
            return;
          a = l, this.readState = n.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === n.BODY)
            this.readState = n.INIT;
          else {
            this.partIndex++;
            let y = this.partIndexToTaskIndex.get(this.partIndex);
            if (y == null)
              if (this.isFinished)
                y = this.options.end;
              else
                throw (0, i.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const v = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (v < y)
              await this.copyExistingData(v, y);
            else if (v > y)
              throw (0, i.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (a = this.searchHeaderListEnd(o, a), a === -1) {
              this.readState = n.HEADER;
              return;
            }
          }
          const l = this.partIndexToLength[this.partIndex], c = a + l, m = Math.min(c, o.length);
          if (await this.processPartStarted(o, a, m), this.remainingPartDataCount = l - (m - a), this.remainingPartDataCount > 0)
            return;
          if (a = c + this.boundaryLength, a >= o.length) {
            this.ignoreByteCount = this.boundaryLength - (o.length - c);
            return;
          }
        }
      }
    }
    copyExistingData(o, a) {
      return new Promise((l, c) => {
        const m = () => {
          if (o === a) {
            l();
            return;
          }
          const y = this.options.tasks[o];
          if (y.kind !== s.OperationKind.COPY) {
            c(new Error("Task kind must be COPY"));
            return;
          }
          e(y, this.out, this.options.oldFileFd, c, () => {
            o++, m();
          });
        };
        m();
      });
    }
    searchHeaderListEnd(o, a) {
      const l = o.indexOf(t, a);
      if (l !== -1)
        return l + t.length;
      const c = a === 0 ? o : o.slice(a);
      return this.headerListBuffer == null ? this.headerListBuffer = c : this.headerListBuffer = Buffer.concat([this.headerListBuffer, c]), -1;
    }
    onPartEnd() {
      const o = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== o)
        throw (0, i.newError)(`Expected length: ${o} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(o, a, l) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(o, a, l);
    }
    processPartData(o, a, l) {
      this.actualPartLength += l - a;
      const c = this.out;
      return c.write(a === 0 && o.length === l ? o : o.slice(a, l)) ? Promise.resolve() : new Promise((m, y) => {
        c.on("error", y), c.once("drain", () => {
          c.removeListener("error", y), m();
        });
      });
    }
  };
  return DataSplitter.DataSplitter = u, DataSplitter;
}
var multipleRangeDownloader = {}, hasRequiredMultipleRangeDownloader;
function requireMultipleRangeDownloader() {
  if (hasRequiredMultipleRangeDownloader) return multipleRangeDownloader;
  hasRequiredMultipleRangeDownloader = 1, Object.defineProperty(multipleRangeDownloader, "__esModule", { value: !0 }), multipleRangeDownloader.executeTasksUsingMultipleRangeRequests = s, multipleRangeDownloader.checkIsRangesSupported = n;
  const i = requireOut(), f = requireDataSplitter(), d = requireDownloadPlanBuilder();
  function s(e, u, r, o, a) {
    const l = (c) => {
      if (c >= u.length) {
        e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
        return;
      }
      const m = c + 1e3;
      t(e, {
        tasks: u,
        start: c,
        end: Math.min(u.length, m),
        oldFileFd: o
      }, r, () => l(m), a);
    };
    return l;
  }
  function t(e, u, r, o, a) {
    let l = "bytes=", c = 0;
    const m = /* @__PURE__ */ new Map(), y = [];
    for (let q = u.start; q < u.end; q++) {
      const A = u.tasks[q];
      A.kind === d.OperationKind.DOWNLOAD && (l += `${A.start}-${A.end - 1}, `, m.set(c, q), c++, y.push(A.end - A.start));
    }
    if (c <= 1) {
      const q = (A) => {
        if (A >= u.end) {
          o();
          return;
        }
        const T = u.tasks[A++];
        if (T.kind === d.OperationKind.COPY)
          (0, f.copyData)(T, r, u.oldFileFd, a, () => q(A));
        else {
          const F = e.createRequestOptions();
          F.headers.Range = `bytes=${T.start}-${T.end - 1}`;
          const C = e.httpExecutor.createRequest(F, (D) => {
            D.on("error", a), n(D, a) && (D.pipe(r, {
              end: !1
            }), D.once("end", () => q(A)));
          });
          e.httpExecutor.addErrorAndTimeoutHandlers(C, a), C.end();
        }
      };
      q(u.start);
      return;
    }
    const v = e.createRequestOptions();
    v.headers.Range = l.substring(0, l.length - 2);
    const g = e.httpExecutor.createRequest(v, (q) => {
      if (!n(q, a))
        return;
      const A = (0, i.safeGetHeader)(q, "content-type"), T = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(A);
      if (T == null) {
        a(new Error(`Content-Type "multipart/byteranges" is expected, but got "${A}"`));
        return;
      }
      const F = new f.DataSplitter(r, u, m, T[1] || T[2], y, o);
      F.on("error", a), q.pipe(F), q.on("end", () => {
        setTimeout(() => {
          g.abort(), a(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    e.httpExecutor.addErrorAndTimeoutHandlers(g, a), g.end();
  }
  function n(e, u) {
    if (e.statusCode >= 400)
      return u((0, i.createHttpError)(e)), !1;
    if (e.statusCode !== 206) {
      const r = (0, i.safeGetHeader)(e, "accept-ranges");
      if (r == null || r === "none")
        return u(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
    }
    return !0;
  }
  return multipleRangeDownloader;
}
var ProgressDifferentialDownloadCallbackTransform = {}, hasRequiredProgressDifferentialDownloadCallbackTransform;
function requireProgressDifferentialDownloadCallbackTransform() {
  if (hasRequiredProgressDifferentialDownloadCallbackTransform) return ProgressDifferentialDownloadCallbackTransform;
  hasRequiredProgressDifferentialDownloadCallbackTransform = 1, Object.defineProperty(ProgressDifferentialDownloadCallbackTransform, "__esModule", { value: !0 }), ProgressDifferentialDownloadCallbackTransform.ProgressDifferentialDownloadCallbackTransform = void 0;
  const i = require$$0$6;
  var f;
  (function(s) {
    s[s.COPY = 0] = "COPY", s[s.DOWNLOAD = 1] = "DOWNLOAD";
  })(f || (f = {}));
  let d = class extends i.Transform {
    constructor(t, n, e) {
      super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = e, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = f.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(t, n, e) {
      if (this.cancellationToken.cancelled) {
        e(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == f.COPY) {
        e(null, t);
        return;
      }
      this.transferred += t.length, this.delta += t.length;
      const u = Date.now();
      u >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = u + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((u - this.start) / 1e3))
      }), this.delta = 0), e(null, t);
    }
    beginFileCopy() {
      this.operationType = f.COPY;
    }
    beginRangeDownload() {
      this.operationType = f.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
    _flush(t) {
      if (this.cancellationToken.cancelled) {
        t(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, t(null);
    }
  };
  return ProgressDifferentialDownloadCallbackTransform.ProgressDifferentialDownloadCallbackTransform = d, ProgressDifferentialDownloadCallbackTransform;
}
var hasRequiredDifferentialDownloader;
function requireDifferentialDownloader() {
  if (hasRequiredDifferentialDownloader) return DifferentialDownloader;
  hasRequiredDifferentialDownloader = 1, Object.defineProperty(DifferentialDownloader, "__esModule", { value: !0 }), DifferentialDownloader.DifferentialDownloader = void 0;
  const i = requireOut(), f = /* @__PURE__ */ requireLib(), d = require$$0, s = requireDataSplitter(), t = require$$2, n = requireDownloadPlanBuilder(), e = requireMultipleRangeDownloader(), u = requireProgressDifferentialDownloadCallbackTransform();
  let r = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(c, m, y) {
      this.blockAwareFileInfo = c, this.httpExecutor = m, this.options = y, this.fileMetadataBuffer = null, this.logger = y.logger;
    }
    createRequestOptions() {
      const c = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, i.configureRequestUrl)(this.options.newUrl, c), (0, i.configureRequestOptions)(c), c;
    }
    doDownload(c, m) {
      if (c.version !== m.version)
        throw new Error(`version is different (${c.version} - ${m.version}), full download is required`);
      const y = this.logger, v = (0, n.computeOperations)(c, m, y);
      y.debug != null && y.debug(JSON.stringify(v, null, 2));
      let g = 0, q = 0;
      for (const T of v) {
        const F = T.end - T.start;
        T.kind === n.OperationKind.DOWNLOAD ? g += F : q += F;
      }
      const A = this.blockAwareFileInfo.size;
      if (g + q + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== A)
        throw new Error(`Internal error, size mismatch: downloadSize: ${g}, copySize: ${q}, newSize: ${A}`);
      return y.info(`Full: ${o(A)}, To download: ${o(g)} (${Math.round(g / (A / 100))}%)`), this.downloadFile(v);
    }
    downloadFile(c) {
      const m = [], y = () => Promise.all(m.map((v) => (0, f.close)(v.descriptor).catch((g) => {
        this.logger.error(`cannot close file "${v.path}": ${g}`);
      })));
      return this.doDownloadFile(c, m).then(y).catch((v) => y().catch((g) => {
        try {
          this.logger.error(`cannot close files: ${g}`);
        } catch (q) {
          try {
            console.error(q);
          } catch {
          }
        }
        throw v;
      }).then(() => {
        throw v;
      }));
    }
    async doDownloadFile(c, m) {
      const y = await (0, f.open)(this.options.oldFile, "r");
      m.push({ descriptor: y, path: this.options.oldFile });
      const v = await (0, f.open)(this.options.newFile, "w");
      m.push({ descriptor: v, path: this.options.newFile });
      const g = (0, d.createWriteStream)(this.options.newFile, { fd: v });
      await new Promise((q, A) => {
        const T = [];
        let F;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const H = [];
          let X = 0;
          for (const U of c)
            U.kind === n.OperationKind.DOWNLOAD && (H.push(U.end - U.start), X += U.end - U.start);
          const N = {
            expectedByteCounts: H,
            grandTotal: X
          };
          F = new u.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), T.push(F);
        }
        const C = new i.DigestTransform(this.blockAwareFileInfo.sha512);
        C.isValidateOnEnd = !1, T.push(C), g.on("finish", () => {
          g.close(() => {
            m.splice(1, 1);
            try {
              C.validate();
            } catch (H) {
              A(H);
              return;
            }
            q(void 0);
          });
        }), T.push(g);
        let D = null;
        for (const H of T)
          H.on("error", A), D == null ? D = H : D = D.pipe(H);
        const x = T[0];
        let b;
        if (this.options.isUseMultipleRangeRequest) {
          b = (0, e.executeTasksUsingMultipleRangeRequests)(this, c, x, y, A), b(0);
          return;
        }
        let w = 0, z = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const J = this.createRequestOptions();
        J.redirect = "manual", b = (H) => {
          var X, N;
          if (H >= c.length) {
            this.fileMetadataBuffer != null && x.write(this.fileMetadataBuffer), x.end();
            return;
          }
          const U = c[H++];
          if (U.kind === n.OperationKind.COPY) {
            F && F.beginFileCopy(), (0, s.copyData)(U, x, y, A, () => b(H));
            return;
          }
          const ne = `bytes=${U.start}-${U.end - 1}`;
          J.headers.range = ne, (N = (X = this.logger) === null || X === void 0 ? void 0 : X.debug) === null || N === void 0 || N.call(X, `download range: ${ne}`), F && F.beginRangeDownload();
          const L = this.httpExecutor.createRequest(J, (K) => {
            K.on("error", A), K.on("aborted", () => {
              A(new Error("response has been aborted by the server"));
            }), K.statusCode >= 400 && A((0, i.createHttpError)(K)), K.pipe(x, {
              end: !1
            }), K.once("end", () => {
              F && F.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => b(H), 1e3)) : b(H);
            });
          });
          L.on("redirect", (K, ue, fe) => {
            this.logger.info(`Redirect to ${a(fe)}`), z = fe, (0, i.configureRequestUrl)(new t.URL(z), J), L.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(L, A), L.end();
        }, b(0);
      });
    }
    async readRemoteBytes(c, m) {
      const y = Buffer.allocUnsafe(m + 1 - c), v = this.createRequestOptions();
      v.headers.range = `bytes=${c}-${m}`;
      let g = 0;
      if (await this.request(v, (q) => {
        q.copy(y, g), g += q.length;
      }), g !== y.length)
        throw new Error(`Received data length ${g} is not equal to expected ${y.length}`);
      return y;
    }
    request(c, m) {
      return new Promise((y, v) => {
        const g = this.httpExecutor.createRequest(c, (q) => {
          (0, e.checkIsRangesSupported)(q, v) && (q.on("error", v), q.on("aborted", () => {
            v(new Error("response has been aborted by the server"));
          }), q.on("data", m), q.on("end", () => y()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(g, v), g.end();
      });
    }
  };
  DifferentialDownloader.DifferentialDownloader = r;
  function o(l, c = " KB") {
    return new Intl.NumberFormat("en").format((l / 1024).toFixed(2)) + c;
  }
  function a(l) {
    const c = l.indexOf("?");
    return c < 0 ? l : l.substring(0, c);
  }
  return DifferentialDownloader;
}
var hasRequiredGenericDifferentialDownloader;
function requireGenericDifferentialDownloader() {
  if (hasRequiredGenericDifferentialDownloader) return GenericDifferentialDownloader;
  hasRequiredGenericDifferentialDownloader = 1, Object.defineProperty(GenericDifferentialDownloader, "__esModule", { value: !0 }), GenericDifferentialDownloader.GenericDifferentialDownloader = void 0;
  const i = requireDifferentialDownloader();
  let f = class extends i.DifferentialDownloader {
    download(s, t) {
      return this.doDownload(s, t);
    }
  };
  return GenericDifferentialDownloader.GenericDifferentialDownloader = f, GenericDifferentialDownloader;
}
var types = {}, hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, (function(i) {
    Object.defineProperty(i, "__esModule", { value: !0 }), i.UpdaterSignal = i.UPDATE_DOWNLOADED = i.DOWNLOAD_PROGRESS = i.CancellationToken = void 0, i.addHandler = s;
    const f = requireOut();
    Object.defineProperty(i, "CancellationToken", { enumerable: !0, get: function() {
      return f.CancellationToken;
    } }), i.DOWNLOAD_PROGRESS = "download-progress", i.UPDATE_DOWNLOADED = "update-downloaded";
    class d {
      constructor(n) {
        this.emitter = n;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(n) {
        s(this.emitter, "login", n);
      }
      progress(n) {
        s(this.emitter, i.DOWNLOAD_PROGRESS, n);
      }
      updateDownloaded(n) {
        s(this.emitter, i.UPDATE_DOWNLOADED, n);
      }
      updateCancelled(n) {
        s(this.emitter, "update-cancelled", n);
      }
    }
    i.UpdaterSignal = d;
    function s(t, n, e) {
      t.on(n, e);
    }
  })(types)), types;
}
var hasRequiredAppUpdater;
function requireAppUpdater() {
  if (hasRequiredAppUpdater) return AppUpdater;
  hasRequiredAppUpdater = 1, Object.defineProperty(AppUpdater, "__esModule", { value: !0 }), AppUpdater.NoOpLogger = AppUpdater.AppUpdater = void 0;
  const i = requireOut(), f = require$$0$7, d = require$$1$1, s = require$$0$3, t = /* @__PURE__ */ requireLib(), n = requireJsYaml(), e = requireMain$1(), u = require$$1, r = requireSemver(), o = requireDownloadedUpdateHelper(), a = requireElectronAppAdapter(), l = requireElectronHttpExecutor(), c = requireGenericProvider(), m = requireProviderFactory(), y = require$$14, v = requireGenericDifferentialDownloader(), g = requireTypes();
  let q = class Ar extends s.EventEmitter {
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
    set channel(C) {
      if (this._channel != null) {
        if (typeof C != "string")
          throw (0, i.newError)(`Channel must be a string, but got: ${C}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (C.length === 0)
          throw (0, i.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = C, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(C) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: C
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, l.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(C) {
      this._logger = C ?? new T();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(C) {
      this.clientPromise = null, this._appUpdateConfigPath = C, this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(C) {
      C && (this._isUpdateSupported = C);
    }
    /**
     * Allows developer to override default logic for determining if the user is below the rollout threshold.
     * The default logic compares the staging percentage with numerical representation of user ID.
     * An override can define custom logic, or bypass it if needed.
     */
    get isUserWithinRollout() {
      return this._isUserWithinRollout;
    }
    set isUserWithinRollout(C) {
      C && (this._isUserWithinRollout = C);
    }
    constructor(C, D) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new g.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (w) => this.checkIfUpdateSupported(w), this._isUserWithinRollout = (w) => this.isStagingMatch(w), this.clientPromise = null, this.stagingUserIdPromise = new e.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new e.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (w) => {
        this._logger.error(`Error: ${w.stack || w.message}`);
      }), D == null ? (this.app = new a.ElectronAppAdapter(), this.httpExecutor = new l.ElectronHttpExecutor((w, z) => this.emit("login", w, z))) : (this.app = D, this.httpExecutor = null);
      const x = this.app.version, b = (0, r.parse)(x);
      if (b == null)
        throw (0, i.newError)(`App version is not a valid semver version: "${x}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = b, this.allowPrerelease = A(b), C != null && (this.setFeedURL(C), typeof C != "string" && C.requestHeaders && (this.requestHeaders = C.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(C) {
      const D = this.createProviderRuntimeOptions();
      let x;
      typeof C == "string" ? x = new c.GenericProvider({ provider: "generic", url: C }, this, {
        ...D,
        isUseMultipleRangeRequest: (0, m.isUrlProbablySupportMultiRangeRequests)(C)
      }) : x = (0, m.createClient)(C, this, D), this.clientPromise = Promise.resolve(x);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let C = this.checkForUpdatesPromise;
      if (C != null)
        return this._logger.info("Checking for update (already in progress)"), C;
      const D = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), C = this.doCheckForUpdates().then((x) => (D(), x)).catch((x) => {
        throw D(), this.emit("error", x, `Cannot check for updates: ${(x.stack || x).toString()}`), x;
      }), this.checkForUpdatesPromise = C, C;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(C) {
      return this.checkForUpdates().then((D) => D?.downloadPromise ? (D.downloadPromise.then(() => {
        const x = Ar.formatDownloadNotification(D.updateInfo.version, this.app.name, C);
        new require$$1$3.Notification(x).show();
      }), D) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), D));
    }
    static formatDownloadNotification(C, D, x) {
      return x == null && (x = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), x = {
        title: x.title.replace("{appName}", D).replace("{version}", C),
        body: x.body.replace("{appName}", D).replace("{version}", C)
      }, x;
    }
    async isStagingMatch(C) {
      const D = C.stagingPercentage;
      let x = D;
      if (x == null)
        return !0;
      if (x = parseInt(x, 10), isNaN(x))
        return this._logger.warn(`Staging percentage is NaN: ${D}`), !0;
      x = x / 100;
      const b = await this.stagingUserIdPromise.value, z = i.UUID.parse(b).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${x}, percentage: ${z}, user id: ${b}`), z < x;
    }
    computeFinalHeaders(C) {
      return this.requestHeaders != null && Object.assign(C, this.requestHeaders), C;
    }
    async isUpdateAvailable(C) {
      const D = (0, r.parse)(C.version);
      if (D == null)
        throw (0, i.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${C.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const x = this.currentVersion;
      if ((0, r.eq)(D, x) || !await Promise.resolve(this.isUpdateSupported(C)) || !await Promise.resolve(this.isUserWithinRollout(C)))
        return !1;
      const w = (0, r.gt)(D, x), z = (0, r.lt)(D, x);
      return w ? !0 : this.allowDowngrade && z;
    }
    checkIfUpdateSupported(C) {
      const D = C?.minimumSystemVersion, x = (0, d.release)();
      if (D)
        try {
          if ((0, r.lt)(x, D))
            return this._logger.info(`Current OS version ${x} is less than the minimum OS version required ${D} for version ${x}`), !1;
        } catch (b) {
          this._logger.warn(`Failed to compare current OS version(${x}) with minimum OS version(${D}): ${(b.message || b).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((x) => (0, m.createClient)(x, this, this.createProviderRuntimeOptions())));
      const C = await this.clientPromise, D = await this.stagingUserIdPromise.value;
      return C.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": D })), {
        info: await C.getLatestVersion(),
        provider: C
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
      const C = await this.getUpdateInfoAndProvider(), D = C.info;
      if (!await this.isUpdateAvailable(D))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${D.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", D), {
          isUpdateAvailable: !1,
          versionInfo: D,
          updateInfo: D
        };
      this.updateInfoAndProvider = C, this.onUpdateAvailable(D);
      const x = new i.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: D,
        updateInfo: D,
        cancellationToken: x,
        downloadPromise: this.autoDownload ? this.downloadUpdate(x) : null
      };
    }
    onUpdateAvailable(C) {
      this._logger.info(`Found version ${C.version} (url: ${(0, i.asArray)(C.files).map((D) => D.url).join(", ")})`), this.emit("update-available", C);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(C = new i.CancellationToken()) {
      const D = this.updateInfoAndProvider;
      if (D == null) {
        const b = new Error("Please check update first");
        return this.dispatchError(b), Promise.reject(b);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, i.asArray)(D.info.files).map((b) => b.url).join(", ")}`);
      const x = (b) => {
        if (!(b instanceof i.CancellationError))
          try {
            this.dispatchError(b);
          } catch (w) {
            this._logger.warn(`Cannot dispatch error event: ${w.stack || w}`);
          }
        return b;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: D,
        requestHeaders: this.computeRequestHeaders(D.provider),
        cancellationToken: C,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((b) => {
        throw x(b);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(C) {
      this.emit("error", C, (C.stack || C).toString());
    }
    dispatchUpdateDownloaded(C) {
      this.emit(g.UPDATE_DOWNLOADED, C);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, n.load)(await (0, t.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(C) {
      const D = C.fileExtraDownloadHeaders;
      if (D != null) {
        const x = this.requestHeaders;
        return x == null ? D : {
          ...D,
          ...x
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const C = u.join(this.app.userDataPath, ".updaterId");
      try {
        const x = await (0, t.readFile)(C, "utf-8");
        if (i.UUID.check(x))
          return x;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${x}`);
      } catch (x) {
        x.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${x}`);
      }
      const D = i.UUID.v5((0, f.randomBytes)(4096), i.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${D}`);
      try {
        await (0, t.outputFile)(C, D);
      } catch (x) {
        this._logger.warn(`Couldn't write out staging user ID: ${x}`);
      }
      return D;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const C = this.requestHeaders;
      if (C == null)
        return !0;
      for (const D of Object.keys(C)) {
        const x = D.toLowerCase();
        if (x === "authorization" || x === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let C = this.downloadedUpdateHelper;
      if (C == null) {
        const D = (await this.configOnDisk.value).updaterCacheDirName, x = this._logger;
        D == null && x.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const b = u.join(this.app.baseCachePath, D || this.app.name);
        x.debug != null && x.debug(`updater cache dir: ${b}`), C = new o.DownloadedUpdateHelper(b), this.downloadedUpdateHelper = C;
      }
      return C;
    }
    async executeDownload(C) {
      const D = C.fileInfo, x = {
        headers: C.downloadUpdateOptions.requestHeaders,
        cancellationToken: C.downloadUpdateOptions.cancellationToken,
        sha2: D.info.sha2,
        sha512: D.info.sha512
      };
      this.listenerCount(g.DOWNLOAD_PROGRESS) > 0 && (x.onProgress = (de) => this.emit(g.DOWNLOAD_PROGRESS, de));
      const b = C.downloadUpdateOptions.updateInfoAndProvider.info, w = b.version, z = D.packageInfo;
      function J() {
        const de = decodeURIComponent(C.fileInfo.url.pathname);
        return de.toLowerCase().endsWith(`.${C.fileExtension.toLowerCase()}`) ? u.basename(de) : C.fileInfo.info.url;
      }
      const H = await this.getOrCreateDownloadHelper(), X = H.cacheDirForPendingUpdate;
      await (0, t.mkdir)(X, { recursive: !0 });
      const N = J();
      let U = u.join(X, N);
      const ne = z == null ? null : u.join(X, `package-${w}${u.extname(z.path) || ".7z"}`), L = async (de) => {
        await H.setDownloadedFile(U, ne, b, D, N, de), await C.done({
          ...b,
          downloadedFile: U
        });
        const we = u.join(X, "current.blockmap");
        return await (0, t.pathExists)(we) && await (0, t.copyFile)(we, u.join(H.cacheDir, "current.blockmap")), ne == null ? [U] : [U, ne];
      }, K = this._logger, ue = await H.validateDownloadedPath(U, b, D, K);
      if (ue != null)
        return U = ue, await L(!1);
      const fe = async () => (await H.clear().catch(() => {
      }), await (0, t.unlink)(U).catch(() => {
      })), ge = await (0, o.createTempUpdateFile)(`temp-${N}`, X, K);
      try {
        await C.task(ge, x, ne, fe), await (0, i.retry)(() => (0, t.rename)(ge, U), {
          retries: 60,
          interval: 500,
          shouldRetry: (de) => de instanceof Error && /^EBUSY:/.test(de.message) ? !0 : (K.warn(`Cannot rename temp file to final file: ${de.message || de.stack}`), !1)
        });
      } catch (de) {
        throw await fe(), de instanceof i.CancellationError && (K.info("cancelled"), this.emit("update-cancelled", b)), de;
      }
      return K.info(`New version ${w} has been downloaded to ${U}`), await L(!0);
    }
    async differentialDownloadInstaller(C, D, x, b, w) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const z = D.updateInfoAndProvider.provider, J = await z.getBlockMapFiles(C.url, this.app.version, D.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
        this._logger.info(`Download block maps (old: "${J[0]}", new: ${J[1]})`);
        const H = async (K) => {
          const ue = await this.httpExecutor.downloadToBuffer(K, {
            headers: D.requestHeaders,
            cancellationToken: D.cancellationToken
          });
          if (ue == null || ue.length === 0)
            throw new Error(`Blockmap "${K.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(ue).toString());
          } catch (fe) {
            throw new Error(`Cannot parse blockmap "${K.href}", error: ${fe}`);
          }
        }, X = {
          newUrl: C.url,
          oldFile: u.join(this.downloadedUpdateHelper.cacheDir, w),
          logger: this._logger,
          newFile: x,
          isUseMultipleRangeRequest: z.isUseMultipleRangeRequest,
          requestHeaders: D.requestHeaders,
          cancellationToken: D.cancellationToken
        };
        this.listenerCount(g.DOWNLOAD_PROGRESS) > 0 && (X.onProgress = (K) => this.emit(g.DOWNLOAD_PROGRESS, K));
        const N = async (K, ue) => {
          const fe = u.join(ue, "current.blockmap");
          await (0, t.outputFile)(fe, (0, y.gzipSync)(JSON.stringify(K)));
        }, U = async (K) => {
          const ue = u.join(K, "current.blockmap");
          try {
            if (await (0, t.pathExists)(ue))
              return JSON.parse((0, y.gunzipSync)(await (0, t.readFile)(ue)).toString());
          } catch (fe) {
            this._logger.warn(`Cannot parse blockmap "${ue}", error: ${fe}`);
          }
          return null;
        }, ne = await H(J[1]);
        await N(ne, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
        let L = await U(this.downloadedUpdateHelper.cacheDir);
        return L == null && (L = await H(J[0])), await new v.GenericDifferentialDownloader(C.info, this.httpExecutor, X).download(L, ne), !1;
      } catch (z) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${z.stack || z}`), this._testOnlyOptions != null)
          throw z;
        return !0;
      }
    }
  };
  AppUpdater.AppUpdater = q;
  function A(F) {
    const C = (0, r.prerelease)(F);
    return C != null && C.length > 0;
  }
  class T {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(C) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(C) {
    }
  }
  return AppUpdater.NoOpLogger = T, AppUpdater;
}
var hasRequiredBaseUpdater;
function requireBaseUpdater() {
  if (hasRequiredBaseUpdater) return BaseUpdater;
  hasRequiredBaseUpdater = 1, Object.defineProperty(BaseUpdater, "__esModule", { value: !0 }), BaseUpdater.BaseUpdater = void 0;
  const i = require$$0$1, f = requireAppUpdater();
  let d = class extends f.AppUpdater {
    constructor(t, n) {
      super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(t = !1, n = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
        require$$1$3.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(t) {
      return super.executeDownload({
        ...t,
        done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(t = !1, n = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const e = this.downloadedUpdateHelper, u = this.installerPath, r = e == null ? null : e.downloadedFileInfo;
      if (u == null || r == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${n}`), this.doInstall({
          isSilent: t,
          isForceRunAfter: n,
          isAdminRightsRequired: r.isAdminRightsRequired
        });
      } catch (o) {
        return this.dispatchError(o), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (t !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    spawnSyncLog(t, n = [], e = {}) {
      this._logger.info(`Executing: ${t} with args: ${n}`);
      const u = (0, i.spawnSync)(t, n, {
        env: { ...process.env, ...e },
        encoding: "utf-8",
        shell: !0
      }), { error: r, status: o, stdout: a, stderr: l } = u;
      if (r != null)
        throw this._logger.error(l), r;
      if (o != null && o !== 0)
        throw this._logger.error(l), new Error(`Command ${t} exited with code ${o}`);
      return a.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(t, n = [], e = void 0, u = "ignore") {
      return this._logger.info(`Executing: ${t} with args: ${n}`), new Promise((r, o) => {
        try {
          const a = { stdio: u, env: e, detached: !0 }, l = (0, i.spawn)(t, n, a);
          l.on("error", (c) => {
            o(c);
          }), l.unref(), l.pid !== void 0 && r(!0);
        } catch (a) {
          o(a);
        }
      });
    }
  };
  return BaseUpdater.BaseUpdater = d, BaseUpdater;
}
var AppImageUpdater = {}, FileWithEmbeddedBlockMapDifferentialDownloader = {}, hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader;
function requireFileWithEmbeddedBlockMapDifferentialDownloader() {
  if (hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader) return FileWithEmbeddedBlockMapDifferentialDownloader;
  hasRequiredFileWithEmbeddedBlockMapDifferentialDownloader = 1, Object.defineProperty(FileWithEmbeddedBlockMapDifferentialDownloader, "__esModule", { value: !0 }), FileWithEmbeddedBlockMapDifferentialDownloader.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const i = /* @__PURE__ */ requireLib(), f = requireDifferentialDownloader(), d = require$$14;
  let s = class extends f.DifferentialDownloader {
    async download() {
      const u = this.blockAwareFileInfo, r = u.size, o = r - (u.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(o, r - 1);
      const a = t(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await n(this.options.oldFile), a);
    }
  };
  FileWithEmbeddedBlockMapDifferentialDownloader.FileWithEmbeddedBlockMapDifferentialDownloader = s;
  function t(e) {
    return JSON.parse((0, d.inflateRawSync)(e).toString());
  }
  async function n(e) {
    const u = await (0, i.open)(e, "r");
    try {
      const r = (await (0, i.fstat)(u)).size, o = Buffer.allocUnsafe(4);
      await (0, i.read)(u, o, 0, o.length, r - o.length);
      const a = Buffer.allocUnsafe(o.readUInt32BE(0));
      return await (0, i.read)(u, a, 0, a.length, r - o.length - a.length), await (0, i.close)(u), t(a);
    } catch (r) {
      throw await (0, i.close)(u), r;
    }
  }
  return FileWithEmbeddedBlockMapDifferentialDownloader;
}
var hasRequiredAppImageUpdater;
function requireAppImageUpdater() {
  if (hasRequiredAppImageUpdater) return AppImageUpdater;
  hasRequiredAppImageUpdater = 1, Object.defineProperty(AppImageUpdater, "__esModule", { value: !0 }), AppImageUpdater.AppImageUpdater = void 0;
  const i = requireOut(), f = require$$0$1, d = /* @__PURE__ */ requireLib(), s = require$$0, t = require$$1, n = requireBaseUpdater(), e = requireFileWithEmbeddedBlockMapDifferentialDownloader(), u = requireProvider(), r = requireTypes();
  let o = class extends n.BaseUpdater {
    constructor(l, c) {
      super(l, c);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(l) {
      const c = l.updateInfoAndProvider.provider, m = (0, u.findFile)(c.resolveFiles(l.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: m,
        downloadUpdateOptions: l,
        task: async (y, v) => {
          const g = process.env.APPIMAGE;
          if (g == null)
            throw (0, i.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (l.disableDifferentialDownload || await this.downloadDifferential(m, g, y, c, l)) && await this.httpExecutor.download(m.url, y, v), await (0, d.chmod)(y, 493);
        }
      });
    }
    async downloadDifferential(l, c, m, y, v) {
      try {
        const g = {
          newUrl: l.url,
          oldFile: c,
          logger: this._logger,
          newFile: m,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          requestHeaders: v.requestHeaders,
          cancellationToken: v.cancellationToken
        };
        return this.listenerCount(r.DOWNLOAD_PROGRESS) > 0 && (g.onProgress = (q) => this.emit(r.DOWNLOAD_PROGRESS, q)), await new e.FileWithEmbeddedBlockMapDifferentialDownloader(l.info, this.httpExecutor, g).download(), !1;
      } catch (g) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${g.stack || g}`), process.platform === "linux";
      }
    }
    doInstall(l) {
      const c = process.env.APPIMAGE;
      if (c == null)
        throw (0, i.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, s.unlinkSync)(c);
      let m;
      const y = t.basename(c), v = this.installerPath;
      if (v == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      t.basename(v) === y || !/\d+\.\d+\.\d+/.test(y) ? m = c : m = t.join(t.dirname(c), t.basename(v)), (0, f.execFileSync)("mv", ["-f", v, m]), m !== c && this.emit("appimage-filename-updated", m);
      const g = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return l.isForceRunAfter ? this.spawnLog(m, [], g) : (g.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, f.execFileSync)(m, [], { env: g })), !0;
    }
  };
  return AppImageUpdater.AppImageUpdater = o, AppImageUpdater;
}
var DebUpdater = {}, LinuxUpdater = {}, hasRequiredLinuxUpdater;
function requireLinuxUpdater() {
  if (hasRequiredLinuxUpdater) return LinuxUpdater;
  hasRequiredLinuxUpdater = 1, Object.defineProperty(LinuxUpdater, "__esModule", { value: !0 }), LinuxUpdater.LinuxUpdater = void 0;
  const i = requireBaseUpdater();
  let f = class extends i.BaseUpdater {
    constructor(s, t) {
      super(s, t);
    }
    /**
     * Returns true if the current process is running as root.
     */
    isRunningAsRoot() {
      var s;
      return ((s = process.getuid) === null || s === void 0 ? void 0 : s.call(process)) === 0;
    }
    /**
     * Sanitizies the installer path for using with command line tools.
     */
    get installerPath() {
      var s, t;
      return (t = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/\\/g, "\\\\").replace(/ /g, "\\ ")) !== null && t !== void 0 ? t : null;
    }
    runCommandWithSudoIfNeeded(s) {
      if (this.isRunningAsRoot())
        return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(s[0], s.slice(1));
      const { name: t } = this.app, n = `"${t} would like to update"`, e = this.sudoWithArgs(n);
      this._logger.info(`Running as non-root user, using sudo to install: ${e}`);
      let u = '"';
      return (/pkexec/i.test(e[0]) || e[0] === "sudo") && (u = ""), this.spawnSyncLog(e[0], [...e.length > 1 ? e.slice(1) : [], `${u}/bin/bash`, "-c", `'${s.join(" ")}'${u}`]);
    }
    sudoWithArgs(s) {
      const t = this.determineSudoCommand(), n = [t];
      return /kdesudo/i.test(t) ? (n.push("--comment", s), n.push("-c")) : /gksudo/i.test(t) ? n.push("--message", s) : /pkexec/i.test(t) && n.push("--disable-internal-agent"), n;
    }
    hasCommand(s) {
      try {
        return this.spawnSyncLog("command", ["-v", s]), !0;
      } catch {
        return !1;
      }
    }
    determineSudoCommand() {
      const s = ["gksudo", "kdesudo", "pkexec", "beesu"];
      for (const t of s)
        if (this.hasCommand(t))
          return t;
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
    detectPackageManager(s) {
      var t;
      const n = (t = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || t === void 0 ? void 0 : t.trim();
      if (n)
        return n;
      for (const e of s)
        if (this.hasCommand(e))
          return e;
      return this._logger.warn(`No package manager found in the list: ${s.join(", ")}. Defaulting to the first one: ${s[0]}`), s[0];
    }
  };
  return LinuxUpdater.LinuxUpdater = f, LinuxUpdater;
}
var hasRequiredDebUpdater;
function requireDebUpdater() {
  if (hasRequiredDebUpdater) return DebUpdater;
  hasRequiredDebUpdater = 1, Object.defineProperty(DebUpdater, "__esModule", { value: !0 }), DebUpdater.DebUpdater = void 0;
  const i = requireProvider(), f = requireTypes(), d = requireLinuxUpdater();
  let s = class br extends d.LinuxUpdater {
    constructor(n, e) {
      super(n, e);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const e = n.updateInfoAndProvider.provider, u = (0, i.findFile)(e.resolveFiles(n.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: u,
        downloadUpdateOptions: n,
        task: async (r, o) => {
          this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(f.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(u.url, r, o);
        }
      });
    }
    doInstall(n) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
        return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
      const u = ["dpkg", "apt"], r = this.detectPackageManager(u);
      try {
        br.installWithCommandRunner(r, e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return n.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(n, e, u, r) {
      var o;
      if (n === "dpkg")
        try {
          u(["dpkg", "-i", e]);
        } catch (a) {
          r.warn((o = a.message) !== null && o !== void 0 ? o : a), r.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), u(["apt-get", "install", "-f", "-y"]);
        }
      else if (n === "apt")
        r.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), u([
          "apt",
          "install",
          "-y",
          "--allow-unauthenticated",
          // needed for unsigned .debs
          "--allow-downgrades",
          // allow lower version installs
          "--allow-change-held-packages",
          e
        ]);
      else
        throw new Error(`Package manager ${n} not supported`);
    }
  };
  return DebUpdater.DebUpdater = s, DebUpdater;
}
var PacmanUpdater = {}, hasRequiredPacmanUpdater;
function requirePacmanUpdater() {
  if (hasRequiredPacmanUpdater) return PacmanUpdater;
  hasRequiredPacmanUpdater = 1, Object.defineProperty(PacmanUpdater, "__esModule", { value: !0 }), PacmanUpdater.PacmanUpdater = void 0;
  const i = requireTypes(), f = requireProvider(), d = requireLinuxUpdater();
  let s = class Cr extends d.LinuxUpdater {
    constructor(n, e) {
      super(n, e);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const e = n.updateInfoAndProvider.provider, u = (0, f.findFile)(e.resolveFiles(n.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: u,
        downloadUpdateOptions: n,
        task: async (r, o) => {
          this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(i.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(u.url, r, o);
        }
      });
    }
    doInstall(n) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      try {
        Cr.installWithCommandRunner(e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (u) {
        return this.dispatchError(u), !1;
      }
      return n.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(n, e, u) {
      var r;
      try {
        e(["pacman", "-U", "--noconfirm", n]);
      } catch (o) {
        u.warn((r = o.message) !== null && r !== void 0 ? r : o), u.warn("pacman installation failed, attempting to update package database and retry");
        try {
          e(["pacman", "-Sy", "--noconfirm"]), e(["pacman", "-U", "--noconfirm", n]);
        } catch (a) {
          throw u.error("Retry after pacman -Sy failed"), a;
        }
      }
    }
  };
  return PacmanUpdater.PacmanUpdater = s, PacmanUpdater;
}
var RpmUpdater = {}, hasRequiredRpmUpdater;
function requireRpmUpdater() {
  if (hasRequiredRpmUpdater) return RpmUpdater;
  hasRequiredRpmUpdater = 1, Object.defineProperty(RpmUpdater, "__esModule", { value: !0 }), RpmUpdater.RpmUpdater = void 0;
  const i = requireTypes(), f = requireProvider(), d = requireLinuxUpdater();
  let s = class xr extends d.LinuxUpdater {
    constructor(n, e) {
      super(n, e);
    }
    /*** @private */
    doDownloadUpdate(n) {
      const e = n.updateInfoAndProvider.provider, u = (0, f.findFile)(e.resolveFiles(n.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: u,
        downloadUpdateOptions: n,
        task: async (r, o) => {
          this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (a) => this.emit(i.DOWNLOAD_PROGRESS, a)), await this.httpExecutor.download(u.url, r, o);
        }
      });
    }
    doInstall(n) {
      const e = this.installerPath;
      if (e == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const u = ["zypper", "dnf", "yum", "rpm"], r = this.detectPackageManager(u);
      try {
        xr.installWithCommandRunner(r, e, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
      } catch (o) {
        return this.dispatchError(o), !1;
      }
      return n.isForceRunAfter && this.app.relaunch(), !0;
    }
    static installWithCommandRunner(n, e, u, r) {
      if (n === "zypper")
        return u(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", e]);
      if (n === "dnf")
        return u(["dnf", "install", "--nogpgcheck", "-y", e]);
      if (n === "yum")
        return u(["yum", "install", "--nogpgcheck", "-y", e]);
      if (n === "rpm")
        return r.warn("Installing with rpm only (no dependency resolution)."), u(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", e]);
      throw new Error(`Package manager ${n} not supported`);
    }
  };
  return RpmUpdater.RpmUpdater = s, RpmUpdater;
}
var MacUpdater = {}, hasRequiredMacUpdater;
function requireMacUpdater() {
  if (hasRequiredMacUpdater) return MacUpdater;
  hasRequiredMacUpdater = 1, Object.defineProperty(MacUpdater, "__esModule", { value: !0 }), MacUpdater.MacUpdater = void 0;
  const i = requireOut(), f = /* @__PURE__ */ requireLib(), d = require$$0, s = require$$1, t = require$$0$4, n = requireAppUpdater(), e = requireProvider(), u = require$$0$1, r = require$$0$7;
  let o = class extends n.AppUpdater {
    constructor(l, c) {
      super(l, c), this.nativeUpdater = require$$1$3.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
        this._logger.warn(m), this.emit("error", m);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(l) {
      this._logger.debug != null && this._logger.debug(l);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((l) => {
        l && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(l) {
      let c = l.updateInfoAndProvider.provider.resolveFiles(l.updateInfoAndProvider.info);
      const m = this._logger, y = "sysctl.proc_translated";
      let v = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), v = (0, u.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${v})`);
      } catch (C) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${C}`);
      }
      let g = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const D = (0, u.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${D}`), g = g || D;
      } catch (C) {
        m.warn(`uname shell command to check for arm64 failed: ${C}`);
      }
      g = g || process.arch === "arm64" || v;
      const q = (C) => {
        var D;
        return C.url.pathname.includes("arm64") || ((D = C.info.url) === null || D === void 0 ? void 0 : D.includes("arm64"));
      };
      g && c.some(q) ? c = c.filter((C) => g === q(C)) : c = c.filter((C) => !q(C));
      const A = (0, e.findFile)(c, "zip", ["pkg", "dmg"]);
      if (A == null)
        throw (0, i.newError)(`ZIP file not provided: ${(0, i.safeStringifyJson)(c)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const T = l.updateInfoAndProvider.provider, F = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: A,
        downloadUpdateOptions: l,
        task: async (C, D) => {
          const x = s.join(this.downloadedUpdateHelper.cacheDir, F), b = () => (0, f.pathExistsSync)(x) ? !l.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let w = !0;
          b() && (w = await this.differentialDownloadInstaller(A, l, C, T, F)), w && await this.httpExecutor.download(A.url, C, D);
        },
        done: async (C) => {
          if (!l.disableDifferentialDownload)
            try {
              const D = s.join(this.downloadedUpdateHelper.cacheDir, F);
              await (0, f.copyFile)(C.downloadedFile, D);
            } catch (D) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${D.message}`);
            }
          return this.updateDownloaded(A, C);
        }
      });
    }
    async updateDownloaded(l, c) {
      var m;
      const y = c.downloadedFile, v = (m = l.info.size) !== null && m !== void 0 ? m : (await (0, f.stat)(y)).size, g = this._logger, q = `fileToProxy=${l.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${q})`), this.server = (0, t.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${q})`), this.server.on("close", () => {
        g.info(`Proxy server for native Squirrel.Mac is closed (${q})`);
      });
      const A = (T) => {
        const F = T.address();
        return typeof F == "string" ? F : `http://127.0.0.1:${F?.port}`;
      };
      return await new Promise((T, F) => {
        const C = (0, r.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), D = Buffer.from(`autoupdater:${C}`, "ascii"), x = `/${(0, r.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (b, w) => {
          const z = b.url;
          if (g.info(`${z} requested`), z === "/") {
            if (!b.headers.authorization || b.headers.authorization.indexOf("Basic ") === -1) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), g.warn("No authenthication info");
              return;
            }
            const X = b.headers.authorization.split(" ")[1], N = Buffer.from(X, "base64").toString("ascii"), [U, ne] = N.split(":");
            if (U !== "autoupdater" || ne !== C) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), g.warn("Invalid authenthication credentials");
              return;
            }
            const L = Buffer.from(`{ "url": "${A(this.server)}${x}" }`);
            w.writeHead(200, { "Content-Type": "application/json", "Content-Length": L.length }), w.end(L);
            return;
          }
          if (!z.startsWith(x)) {
            g.warn(`${z} requested, but not supported`), w.writeHead(404), w.end();
            return;
          }
          g.info(`${x} requested by Squirrel.Mac, pipe ${y}`);
          let J = !1;
          w.on("finish", () => {
            J || (this.nativeUpdater.removeListener("error", F), T([]));
          });
          const H = (0, d.createReadStream)(y);
          H.on("error", (X) => {
            try {
              w.end();
            } catch (N) {
              g.warn(`cannot end response: ${N}`);
            }
            J = !0, this.nativeUpdater.removeListener("error", F), F(new Error(`Cannot pipe "${y}": ${X}`));
          }), w.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": v
          }), H.pipe(w);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${q})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${A(this.server)}, ${q})`), this.nativeUpdater.setFeedURL({
            url: A(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${D.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(c), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", F), this.nativeUpdater.checkForUpdates()) : T([]);
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
  return MacUpdater.MacUpdater = o, MacUpdater;
}
var NsisUpdater = {}, windowsExecutableCodeSignatureVerifier = {}, hasRequiredWindowsExecutableCodeSignatureVerifier;
function requireWindowsExecutableCodeSignatureVerifier() {
  if (hasRequiredWindowsExecutableCodeSignatureVerifier) return windowsExecutableCodeSignatureVerifier;
  hasRequiredWindowsExecutableCodeSignatureVerifier = 1, Object.defineProperty(windowsExecutableCodeSignatureVerifier, "__esModule", { value: !0 }), windowsExecutableCodeSignatureVerifier.verifySignature = n;
  const i = requireOut(), f = require$$0$1, d = require$$1$1, s = require$$1;
  function t(o, a) {
    return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", o], {
      shell: !0,
      timeout: a
    }];
  }
  function n(o, a, l) {
    return new Promise((c, m) => {
      const y = a.replace(/'/g, "''");
      l.info(`Verifying signature ${y}`), (0, f.execFile)(...t(`"Get-AuthenticodeSignature -LiteralPath '${y}' | ConvertTo-Json -Compress"`, 20 * 1e3), (v, g, q) => {
        var A;
        try {
          if (v != null || q) {
            u(l, v, q, m), c(null);
            return;
          }
          const T = e(g);
          if (T.Status === 0) {
            try {
              const x = s.normalize(T.Path), b = s.normalize(a);
              if (l.info(`LiteralPath: ${x}. Update Path: ${b}`), x !== b) {
                u(l, new Error(`LiteralPath of ${x} is different than ${b}`), q, m), c(null);
                return;
              }
            } catch (x) {
              l.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(A = x.message) !== null && A !== void 0 ? A : x.stack}`);
            }
            const C = (0, i.parseDn)(T.SignerCertificate.Subject);
            let D = !1;
            for (const x of o) {
              const b = (0, i.parseDn)(x);
              if (b.size ? D = Array.from(b.keys()).every((z) => b.get(z) === C.get(z)) : x === C.get("CN") && (l.warn(`Signature validated using only CN ${x}. Please add your full Distinguished Name (DN) to publisherNames configuration`), D = !0), D) {
                c(null);
                return;
              }
            }
          }
          const F = `publisherNames: ${o.join(" | ")}, raw info: ` + JSON.stringify(T, (C, D) => C === "RawData" ? void 0 : D, 2);
          l.warn(`Sign verification failed, installer signed with incorrect certificate: ${F}`), c(F);
        } catch (T) {
          u(l, T, null, m), c(null);
          return;
        }
      });
    });
  }
  function e(o) {
    const a = JSON.parse(o);
    delete a.PrivateKey, delete a.IsOSBinary, delete a.SignatureType;
    const l = a.SignerCertificate;
    return l != null && (delete l.Archived, delete l.Extensions, delete l.Handle, delete l.HasPrivateKey, delete l.SubjectName), a;
  }
  function u(o, a, l, c) {
    if (r()) {
      o.warn(`Cannot execute Get-AuthenticodeSignature: ${a || l}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, f.execFileSync)(...t("ConvertTo-Json test", 10 * 1e3));
    } catch (m) {
      o.warn(`Cannot execute ConvertTo-Json: ${m.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    a != null && c(a), l && c(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${l}. Failing signature validation due to unknown stderr.`));
  }
  function r() {
    const o = d.release();
    return o.startsWith("6.") && !o.startsWith("6.3");
  }
  return windowsExecutableCodeSignatureVerifier;
}
var hasRequiredNsisUpdater;
function requireNsisUpdater() {
  if (hasRequiredNsisUpdater) return NsisUpdater;
  hasRequiredNsisUpdater = 1, Object.defineProperty(NsisUpdater, "__esModule", { value: !0 }), NsisUpdater.NsisUpdater = void 0;
  const i = requireOut(), f = require$$1, d = requireBaseUpdater(), s = requireFileWithEmbeddedBlockMapDifferentialDownloader(), t = requireTypes(), n = requireProvider(), e = /* @__PURE__ */ requireLib(), u = requireWindowsExecutableCodeSignatureVerifier(), r = require$$2;
  let o = class extends d.BaseUpdater {
    constructor(l, c) {
      super(l, c), this._verifyUpdateCodeSignature = (m, y) => (0, u.verifySignature)(m, y, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(l) {
      l && (this._verifyUpdateCodeSignature = l);
    }
    /*** @private */
    doDownloadUpdate(l) {
      const c = l.updateInfoAndProvider.provider, m = (0, n.findFile)(c.resolveFiles(l.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: l,
        fileInfo: m,
        task: async (y, v, g, q) => {
          const A = m.packageInfo, T = A != null && g != null;
          if (T && l.disableWebInstaller)
            throw (0, i.newError)(`Unable to download new version ${l.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !T && !l.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (T || l.disableDifferentialDownload || await this.differentialDownloadInstaller(m, l, y, c, i.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, y, v);
          const F = await this.verifySignature(y);
          if (F != null)
            throw await q(), (0, i.newError)(`New version ${l.updateInfoAndProvider.info.version} is not signed by the application owner: ${F}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (T && await this.differentialDownloadWebPackage(l, A, g, c))
            try {
              await this.httpExecutor.download(new r.URL(A.path), g, {
                headers: l.requestHeaders,
                cancellationToken: l.cancellationToken,
                sha512: A.sha512
              });
            } catch (C) {
              try {
                await (0, e.unlink)(g);
              } catch {
              }
              throw C;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(l) {
      let c;
      try {
        if (c = (await this.configOnDisk.value).publisherName, c == null)
          return null;
      } catch (m) {
        if (m.code === "ENOENT")
          return null;
        throw m;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(c) ? c : [c], l);
    }
    doInstall(l) {
      const c = this.installerPath;
      if (c == null)
        return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
      const m = ["--updated"];
      l.isSilent && m.push("/S"), l.isForceRunAfter && m.push("--force-run"), this.installDirectory && m.push(`/D=${this.installDirectory}`);
      const y = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      y != null && m.push(`--package-file=${y}`);
      const v = () => {
        this.spawnLog(f.join(process.resourcesPath, "elevate.exe"), [c].concat(m)).catch((g) => this.dispatchError(g));
      };
      return l.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), v(), !0) : (this.spawnLog(c, m).catch((g) => {
        const q = g.code;
        this._logger.info(`Cannot run installer: error code: ${q}, error message: "${g.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), q === "UNKNOWN" || q === "EACCES" ? v() : q === "ENOENT" ? require$$1$3.shell.openPath(c).catch((A) => this.dispatchError(A)) : this.dispatchError(g);
      }), !0);
    }
    async differentialDownloadWebPackage(l, c, m, y) {
      if (c.blockMapSize == null)
        return !0;
      try {
        const v = {
          newUrl: new r.URL(c.path),
          oldFile: f.join(this.downloadedUpdateHelper.cacheDir, i.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: l.cancellationToken
        };
        this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (v.onProgress = (g) => this.emit(t.DOWNLOAD_PROGRESS, g)), await new s.FileWithEmbeddedBlockMapDifferentialDownloader(c, this.httpExecutor, v).download();
      } catch (v) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${v.stack || v}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return NsisUpdater.NsisUpdater = o, NsisUpdater;
}
var hasRequiredMain;
function requireMain() {
  return hasRequiredMain || (hasRequiredMain = 1, (function(i) {
    var f = main$1 && main$1.__createBinding || (Object.create ? (function(g, q, A, T) {
      T === void 0 && (T = A);
      var F = Object.getOwnPropertyDescriptor(q, A);
      (!F || ("get" in F ? !q.__esModule : F.writable || F.configurable)) && (F = { enumerable: !0, get: function() {
        return q[A];
      } }), Object.defineProperty(g, T, F);
    }) : (function(g, q, A, T) {
      T === void 0 && (T = A), g[T] = q[A];
    })), d = main$1 && main$1.__exportStar || function(g, q) {
      for (var A in g) A !== "default" && !Object.prototype.hasOwnProperty.call(q, A) && f(q, g, A);
    };
    Object.defineProperty(i, "__esModule", { value: !0 }), i.NsisUpdater = i.MacUpdater = i.RpmUpdater = i.PacmanUpdater = i.DebUpdater = i.AppImageUpdater = i.Provider = i.NoOpLogger = i.AppUpdater = i.BaseUpdater = void 0;
    const s = /* @__PURE__ */ requireLib(), t = require$$1;
    var n = requireBaseUpdater();
    Object.defineProperty(i, "BaseUpdater", { enumerable: !0, get: function() {
      return n.BaseUpdater;
    } });
    var e = requireAppUpdater();
    Object.defineProperty(i, "AppUpdater", { enumerable: !0, get: function() {
      return e.AppUpdater;
    } }), Object.defineProperty(i, "NoOpLogger", { enumerable: !0, get: function() {
      return e.NoOpLogger;
    } });
    var u = requireProvider();
    Object.defineProperty(i, "Provider", { enumerable: !0, get: function() {
      return u.Provider;
    } });
    var r = requireAppImageUpdater();
    Object.defineProperty(i, "AppImageUpdater", { enumerable: !0, get: function() {
      return r.AppImageUpdater;
    } });
    var o = requireDebUpdater();
    Object.defineProperty(i, "DebUpdater", { enumerable: !0, get: function() {
      return o.DebUpdater;
    } });
    var a = requirePacmanUpdater();
    Object.defineProperty(i, "PacmanUpdater", { enumerable: !0, get: function() {
      return a.PacmanUpdater;
    } });
    var l = requireRpmUpdater();
    Object.defineProperty(i, "RpmUpdater", { enumerable: !0, get: function() {
      return l.RpmUpdater;
    } });
    var c = requireMacUpdater();
    Object.defineProperty(i, "MacUpdater", { enumerable: !0, get: function() {
      return c.MacUpdater;
    } });
    var m = requireNsisUpdater();
    Object.defineProperty(i, "NsisUpdater", { enumerable: !0, get: function() {
      return m.NsisUpdater;
    } }), d(requireTypes(), i);
    let y;
    function v() {
      if (process.platform === "win32")
        y = new (requireNsisUpdater()).NsisUpdater();
      else if (process.platform === "darwin")
        y = new (requireMacUpdater()).MacUpdater();
      else {
        y = new (requireAppImageUpdater()).AppImageUpdater();
        try {
          const g = t.join(process.resourcesPath, "package-type");
          if (!(0, s.existsSync)(g))
            return y;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const q = (0, s.readFileSync)(g).toString().trim();
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
    Object.defineProperty(i, "autoUpdater", {
      enumerable: !0,
      get: () => y || v()
    });
  })(main$1)), main$1;
}
var mainExports = requireMain();
log.transports.file.level = "info";
log.info("App starting...");
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
    icon: path.join(process.env.VITE_PUBLIC || "", "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname$1, "preload.cjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      sandbox: !1
      // Required for some Node APIs if used, but false is safer if possible. Keeping false as per current config check.
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
      const i = fs$1.readFileSync(CONFIG_FILE, "utf-8"), f = JSON.parse(i);
      return f.runbooksPath && !f.sources && (f.sources = [f.runbooksPath], delete f.runbooksPath, saveConfig(f)), f.sources || (f.sources = [DEFAULT_DOCS_DIR]), f;
    }
  } catch (i) {
    console.error("Failed to read config", i);
  }
  return { sources: [DEFAULT_DOCS_DIR] };
}
function saveConfig(i) {
  try {
    fs$1.writeFileSync(CONFIG_FILE, JSON.stringify(i, null, 2), "utf-8");
  } catch (f) {
    console.error("Failed to write config", f);
  }
}
function ensureSourcesExist(i) {
  i.forEach((f) => {
    if (!fs$1.existsSync(f))
      try {
        fs$1.mkdirSync(f, { recursive: !0 });
      } catch (d) {
        console.error("Could not create directory", f, d);
      }
  });
}
function parseRunbookFile(i) {
  try {
    const f = path.extname(i).toLowerCase(), d = fs$1.readFileSync(i, "utf-8");
    let s = {};
    if (f === ".json")
      s = JSON.parse(d), s.format = "json";
    else if (f === ".md") {
      const t = matter(d);
      s = t.data, s.format = "md", s.steps || (s.steps = parseMarkdownSteps(t.content));
    }
    return !s || (s.sourcePath = path.dirname(i), s.id || (s.id = path.basename(i, f)), s.title || (s.title = s.id || "Untitled Runbook"), Array.isArray(s.tags) || (s.tags = []), s.type !== "qrun") ? null : (s.service || (s.service = "IAAS"), s.category || (s.category = "Alert"), Array.isArray(s.steps) || (s.steps = []), s);
  } catch (f) {
    console.error(`Error parsing file ${i}`, f);
  }
  return null;
}
function parseMarkdownSteps(i) {
  const f = [], d = i.split(`
`);
  let s = null;
  return d.forEach((t) => {
    if (t.startsWith("## "))
      s && f.push(s), s = { title: t.replace("## ", "").trim(), content: [] };
    else if (s)
      if (t.trim().startsWith("```")) {
        const n = t.trim().replace("```", "");
        if (n)
          s.content.push({ type: "code", language: n, code: "" });
        else {
          const e = s.content[s.content.length - 1];
          e && e.type === "code" || s.content.push({ type: "code", language: "text", code: "" });
        }
      } else {
        const n = s.content[s.content.length - 1];
        n && n.type === "code" ? n.code ? n.code += `
` + t : n.code = t : !n || n.type !== "text" ? s.content.push({ type: "text", text: t }) : n.text += `
` + t;
      }
  }), s && f.push(s), f.forEach((t) => {
    t.content.forEach((n) => {
      n.type === "code" && n.code.endsWith("```") && (n.code = n.code.substring(0, n.code.length - 3).trim()), n.type === "text" && (n.text = n.text.trim());
    });
  }), f;
}
function serializeToMarkdown(i) {
  const { steps: f, sourcePath: d, format: s, ...t } = i, n = { ...t };
  let e = "";
  return f && f.length > 0 && (e = f.map((u) => {
    let r = `## ${u.title}

`;
    return u.content.forEach((o) => {
      o.type === "code" ? r += "```" + (o.language || "") + `
` + o.code + "\n```\n\n" : o.type === "list" ? (o.items.forEach((a) => r += `- ${a}
`), r += `
`) : r += o.text + `

`;
    }), r;
  }).join("")), matter.stringify(e, n);
}
ipcMain.handle("get-sources", () => getConfig().sources);
ipcMain.handle("add-source", async () => {
  if (!win) return { success: !1 };
  const i = await dialog.showOpenDialog(win, {
    properties: ["openDirectory"]
  });
  if (!i.canceled && i.filePaths.length > 0) {
    const f = i.filePaths[0], d = getConfig();
    return d.sources.includes(f) || (d.sources.push(f), saveConfig(d)), { success: !0, sources: d.sources };
  }
  return { success: !1 };
});
ipcMain.handle("remove-source", async (i, f) => {
  const d = getConfig();
  return d.sources = d.sources.filter((s) => s !== f), saveConfig(d), { success: !0, sources: d.sources };
});
ipcMain.handle("get-runbooks", async () => {
  try {
    const f = getConfig().sources;
    ensureSourcesExist(f);
    let d = [];
    return f.forEach((s) => {
      fs$1.existsSync(s) && fs$1.readdirSync(s).forEach((n) => {
        if (n.endsWith(".json") || n.endsWith(".md")) {
          const e = parseRunbookFile(path.join(s, n));
          e && d.push(e);
        }
      });
    }), d;
  } catch (i) {
    return console.error("Error reading runbooks:", i), [];
  }
});
ipcMain.handle("save-runbook", async (i, f) => {
  try {
    const d = getConfig(), s = f.sourcePath || d.sources[0];
    fs$1.existsSync(s) || fs$1.mkdirSync(s, { recursive: !0 });
    let t, n;
    if (f.format === "md")
      t = path.join(s, `${f.id}.md`), n = serializeToMarkdown(f);
    else {
      t = path.join(s, `${f.id}.json`);
      const { sourcePath: e, format: u, ...r } = f;
      n = JSON.stringify(r, null, 2);
    }
    return fs$1.writeFileSync(t, n, "utf-8"), { success: !0 };
  } catch (d) {
    return console.error("Error saving runbook:", d), { success: !1, error: d.message };
  }
});
ipcMain.handle("delete-runbook", async (i, f) => {
  try {
    const d = getConfig();
    let s = "";
    if (f.sourcePath) {
      const t = f.format === "md" ? ".md" : ".json";
      s = path.join(f.sourcePath, `${f.id}${t}`);
    } else {
      const t = d.sources;
      for (const n of t) {
        const e = path.join(n, `${f.id}.json`), u = path.join(n, `${f.id}.md`);
        if (fs$1.existsSync(e)) {
          s = e;
          break;
        }
        if (fs$1.existsSync(u)) {
          s = u;
          break;
        }
      }
    }
    return s && fs$1.existsSync(s) ? (fs$1.unlinkSync(s), { success: !0 }) : { success: !1, error: "File not found" };
  } catch (d) {
    return console.error("Error deleting runbook:", d), { success: !1, error: d.message };
  }
});
ipcMain.handle("clone-repository", async (i, f, d = {}) => {
  try {
    if (!f) return { success: !1, error: "URL is required" };
    if (!/^https?:\/\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+(\.git)?$/.test(f))
      return { success: !1, error: "Invalid Repository URL. Access denied." };
    const { interactive: s } = d, t = f.split("/");
    let n = t[t.length - 1];
    n.endsWith(".git") && (n = n.slice(0, -4)), n = n.replace(/[^a-zA-Z0-9-_]/g, ""), n || (n = `repo-${Date.now()}`);
    const e = path.join(app.getPath("documents"), "QuickRunbooks", "Repos");
    fs$1.existsSync(e) || fs$1.mkdirSync(e, { recursive: !0 });
    const u = path.join(e, n);
    return fs$1.existsSync(u) ? { success: !1, error: `Directory ${n} already exists.` } : new Promise((r) => {
      console.log(`Cloning ${f} into ${u} (Interactive: ${s})`);
      let o = `git clone --depth 1 "${f}" "${u}"`, a = {
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
        timeout: 3e4
      };
      s && (o = `start /wait cmd /c "git clone --depth 1 ${f} ${u} & if errorlevel 1 pause"`, a = {
        env: process.env,
        // Allow all envs
        timeout: 0
        // No timeout (user might verify 2FA)
      }), exec(o, a, (l, c, m) => {
        let y = !1;
        if (s)
          fs$1.existsSync(u) && fs$1.readdirSync(u).length > 0 && (y = !0);
        else if (!l)
          y = !0;
        else {
          const v = m || l.message;
          console.error("Clone error:", v), r({ success: !1, error: v.includes("Authentication failed") ? "AUTH_FAILED" : v });
          return;
        }
        if (y) {
          const v = path.join(u, "qrun");
          if (!fs$1.existsSync(v)) {
            try {
              fs$1.rmSync(u, { recursive: !0, force: !0 });
            } catch (q) {
              console.error("Cleanup failed", q);
            }
            r({ success: !1, error: "Repository does not contain a 'qrun' folder." });
            return;
          }
          const g = getConfig();
          g.sources.includes(v) || (g.sources.push(v), saveConfig(g)), r({ success: !0, sources: g.sources });
        } else
          r({ success: !1, error: "Clone failed." });
      });
    });
  } catch (s) {
    return { success: !1, error: s.message };
  }
});
mainExports.autoUpdater.logger = log;
mainExports.autoUpdater.autoDownload = !1;
mainExports.autoUpdater.autoInstallOnAppQuit = !0;
ipcMain.handle("check-for-updates", () => {
  if (log.info("Manual check for updates triggered"), process.env.VITE_DEV_SERVER_URL) {
    log.info("Skipping update check in dev mode");
    return;
  }
  mainExports.autoUpdater.checkForUpdates();
});
ipcMain.handle("start-auto-download", () => {
  log.info("User requested Auto-Update. Starting download..."), mainExports.autoUpdater.downloadUpdate();
});
ipcMain.handle("start-manual-download", (i, f) => {
  if (!f || !f.startsWith("https://")) {
    log.warn("Blocked unsafe manual download URL:", f);
    return;
  }
  log.info("User requested Manual Update. Opening URL:", f), shell.openExternal(f);
});
ipcMain.handle("quit-and-install", () => {
  mainExports.autoUpdater.quitAndInstall();
});
mainExports.autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
});
mainExports.autoUpdater.on("update-available", (i) => {
  log.info("Update available:", i), win?.webContents.send("update-available", i);
});
mainExports.autoUpdater.on("update-not-available", (i) => {
  log.info("Update not available:", i), win?.webContents.send("update-not-available", i);
});
mainExports.autoUpdater.on("error", (i) => {
  log.error("Update error:", i), win?.webContents.send("update-error", i.toString());
});
mainExports.autoUpdater.on("download-progress", (i) => {
  log.info("Download progress:", i.percent);
});
mainExports.autoUpdater.on("update-downloaded", (i) => {
  log.info("Update downloaded:", i), win?.webContents.send("update-downloaded", i);
});
app.whenReady().then(createWindow);
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
ipcMain.handle("download-template", async (i, f) => {
  if (!win) return { success: !1, error: "No window" };
  try {
    const d = f === "md" ? "template.md" : "template.json", s = f === "md" ? TEMPLATE_MD : TEMPLATE_JSON, { filePath: t } = await dialog.showSaveDialog(win, {
      title: "Download Template",
      defaultPath: d,
      filters: [
        { name: f === "md" ? "Markdown" : "JSON", extensions: [f] }
      ]
    });
    return t ? (fs$1.writeFileSync(t, s, "utf-8"), { success: !0 }) : { success: !1, error: "Cancelled" };
  } catch (d) {
    return { success: !1, error: d.message };
  }
});
ipcMain.handle("refresh-sources", async () => {
  try {
    const f = getConfig().sources || [], d = [];
    for (const s of f)
      if (fs$1.existsSync(path.join(s, ".git")))
        try {
          await new Promise((t, n) => {
            exec("git pull", { cwd: s }, (e, u, r) => {
              if (e) {
                d.push({ source: s, success: !1, error: r || e.message }), n(e);
                return;
              }
              d.push({ source: s, success: !0, output: u }), t();
            });
          }).catch(() => {
          });
        } catch {
        }
    return { success: !0, results: d };
  } catch (i) {
    return { success: !1, error: i.message };
  }
});
ipcMain.handle("get-app-version", () => app.getVersion());
ipcMain.handle("import-file", async () => {
  if (!win) return { success: !1, error: "No window" };
  try {
    const { filePaths: i } = await dialog.showOpenDialog(win, {
      filters: [{ name: "Runbooks", extensions: ["json", "md"] }],
      properties: ["openFile"]
    });
    if (i && i.length > 0) {
      const f = i[0];
      if (!parseRunbookFile(f))
        return { success: !1, error: "Invalid Runbook file. File must contain 'type: qrun' and valid structure." };
      const t = getConfig().sources[0];
      fs$1.existsSync(t) || fs$1.mkdirSync(t, { recursive: !0 });
      const n = path.basename(f), e = path.join(t, n);
      return fs$1.copyFileSync(f, e), { success: !0 };
    }
    return { success: !1, error: "Canceled" };
  } catch (i) {
    return { success: !1, error: i.message };
  }
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
