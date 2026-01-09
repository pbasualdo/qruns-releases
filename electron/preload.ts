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
  onUpdateAvailable: (callback: any) => ipcRenderer.on('update-available', (_event, info) => callback(info)),
  onUpdateDownloaded: (callback: any) => ipcRenderer.on('update-downloaded', (_event, info) => callback(info)),
  onUpdateError: (callback: any) => ipcRenderer.on('update-error', (_event, err) => callback(err)),
})
