/// <reference types="vite/client" />
/// <reference types="vite-plugin-electron/electron-env" />

interface Window {
  electronAPI: {
    getRunbooks: () => Promise<any[]>;
    saveRunbook: (runbook: any) => Promise<{ success: boolean; error?: string }>;
    deleteRunbook: (runbook: any) => Promise<{ success: boolean; error?: string }>;
    getSources: () => Promise<string[]>;
    addSource: () => Promise<{ success: boolean; sources?: string[] }>;
    removeSource: (path: string) => Promise<{ success: boolean; sources?: string[] }>;
    cloneRepository: (url: string, options?: { interactive?: boolean }) => Promise<{ success: boolean; sources?: string[]; error?: string }>;
    checkForUpdates: () => Promise<void>;
    quitAndInstall: () => Promise<void>;
    onUpdateAvailable: (callback: (info: any) => void) => void;
    onUpdateDownloaded: (callback: (info: any) => void) => void;
    onUpdateNotAvailable: (callback: () => void) => void;
    onUpdateError: (callback: (err: any) => void) => void;
    downloadTemplate: (format: 'json' | 'md') => Promise<{ success: boolean; error?: string }>;
    importRunbook: () => Promise<{ success: boolean; error?: string }>;
    startAutoDownload: () => Promise<void>;
    startManualDownload: (url: string) => Promise<void>;
    getAppVersion: () => Promise<string>;
    refreshSources: () => Promise<{ success: boolean; results?: any[]; error?: string }>;
  }
}
