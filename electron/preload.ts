import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electronAPI', {
  getRunbooks: () => ipcRenderer.invoke('get-runbooks'),
  saveRunbook: (runbook: any) => ipcRenderer.invoke('save-runbook', runbook),
  deleteRunbook: (runbook: any) => ipcRenderer.invoke('delete-runbook', runbook),
  getSources: () => ipcRenderer.invoke('get-sources'),
  addSource: () => ipcRenderer.invoke('add-source'),
  removeSource: (path: string) => ipcRenderer.invoke('remove-source', path),
  cloneRepository: (url: string, options?: any) => ipcRenderer.invoke('clone-repository', url, options),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
  onUpdateAvailable: (callback: (info: any) => void) => ipcRenderer.on('update-available', (_event, info) => callback(info)),
  onUpdateDownloaded: (callback: (info: any) => void) => ipcRenderer.on('update-downloaded', (_event, info) => callback(info)),
  onUpdateNotAvailable: (callback: () => void) => ipcRenderer.on('update-not-available', () => callback()),
  onUpdateError: (callback: (err: any) => void) => ipcRenderer.on('update-error', (_event, err) => callback(err)),
  downloadTemplate: (format: 'json' | 'md') => ipcRenderer.invoke('download-template', format),
  importRunbook: () => ipcRenderer.invoke('import-file'),
  startAutoDownload: () => ipcRenderer.invoke('start-auto-download'),
  startManualDownload: (url: string) => ipcRenderer.invoke('start-manual-download', url),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  refreshSources: () => ipcRenderer.invoke('refresh-sources'),
})
