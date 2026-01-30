"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  getRunbooks: () => electron.ipcRenderer.invoke("get-runbooks"),
  saveRunbook: (runbook) => electron.ipcRenderer.invoke("save-runbook", runbook),
  deleteRunbook: (runbook) => electron.ipcRenderer.invoke("delete-runbook", runbook),
  getSources: () => electron.ipcRenderer.invoke("get-sources"),
  addSource: () => electron.ipcRenderer.invoke("add-source"),
  removeSource: (path) => electron.ipcRenderer.invoke("remove-source", path),
  cloneRepository: (url, options) => electron.ipcRenderer.invoke("clone-repository", url, options),
  checkForUpdates: () => electron.ipcRenderer.invoke("check-for-updates"),
  quitAndInstall: () => electron.ipcRenderer.invoke("quit-and-install"),
  onUpdateAvailable: (callback) => electron.ipcRenderer.on("update-available", (_event, info) => callback(info)),
  onUpdateDownloaded: (callback) => electron.ipcRenderer.on("update-downloaded", (_event, info) => callback(info)),
  onUpdateNotAvailable: (callback) => electron.ipcRenderer.on("update-not-available", (_event, info) => callback(info)),
  onUpdateError: (callback) => electron.ipcRenderer.on("update-error", (_event, err) => callback(err)),
  downloadTemplate: () => electron.ipcRenderer.invoke("download-template"),
  pickImage: (targetDir) => electron.ipcRenderer.invoke("qrun:pick-image", targetDir),
  importRunbook: () => electron.ipcRenderer.invoke("import-file"),
  startAutoDownload: () => electron.ipcRenderer.invoke("start-auto-download"),
  startManualDownload: (url) => electron.ipcRenderer.invoke("start-manual-download", url),
  getAppVersion: () => electron.ipcRenderer.invoke("get-app-version"),
  refreshSources: () => electron.ipcRenderer.invoke("refresh-sources"),
  appReady: () => electron.ipcRenderer.send("app-ready"),
  // Example & Config
  installExamples: () => electron.ipcRenderer.invoke("install-examples"),
  getAppConfig: () => electron.ipcRenderer.invoke("get-app-config"),
  setAppConfig: (config) => electron.ipcRenderer.invoke("set-app-config", config)
});
