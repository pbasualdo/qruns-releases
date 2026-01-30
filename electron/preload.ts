import { ipcRenderer, contextBridge } from 'electron'
import type { QRun } from './types.js';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  getRunbooks: () => ipcRenderer.invoke('get-runbooks'),
  saveRunbook: (runbook: QRun) => ipcRenderer.invoke('save-runbook', runbook),
  deleteRunbook: (runbook: QRun) => ipcRenderer.invoke('delete-runbook', runbook),
  getSources: () => ipcRenderer.invoke('get-sources'),
  addSource: () => ipcRenderer.invoke('add-source'),
  removeSource: (path: string) => ipcRenderer.invoke('remove-source', path),
  cloneRepository: (url: string, options?: { interactive?: boolean }) => ipcRenderer.invoke('clone-repository', url, options),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
  onUpdateAvailable: (callback: (info: { version: string }) => void) => ipcRenderer.on('update-available', (_event, info) => callback(info)),
  onUpdateDownloaded: (callback: (info: { version: string }) => void) => ipcRenderer.on('update-downloaded', (_event, info) => callback(info)),
  onUpdateNotAvailable: (callback: (info: { version: string }) => void) => ipcRenderer.on('update-not-available', (_event, info) => callback(info)),
  onUpdateError: (callback: (err: string) => void) => ipcRenderer.on('update-error', (_event, err) => callback(err)),
  downloadTemplate: () => ipcRenderer.invoke('download-template'),
  pickImage: (targetDir: string) => ipcRenderer.invoke('qrun:pick-image', targetDir),
  importRunbook: () => ipcRenderer.invoke('import-file'),
  startAutoDownload: () => ipcRenderer.invoke('start-auto-download'),
  startManualDownload: (url: string) => ipcRenderer.invoke('start-manual-download', url),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  refreshSources: () => ipcRenderer.invoke('refresh-sources'),
  appReady: () => ipcRenderer.send('app-ready'),
  
  // Example & Config
  installExamples: () => ipcRenderer.invoke('install-examples'),
  getAppConfig: () => ipcRenderer.invoke('get-app-config'),
  setAppConfig: (config: Partial<{ firstRunComplete: boolean; sources: string[]; owners: string[] }>) => ipcRenderer.invoke('set-app-config', config),
})
