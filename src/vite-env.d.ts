import type { QRun } from './types.js';

declare global {
  interface Window {
    electronAPI: {
      getRunbooks: () => Promise<QRun[]>;
      saveRunbook: (runbook: QRun) => Promise<{ success: boolean; error?: string }>;
      deleteRunbook: (runbook: QRun) => Promise<{ success: boolean; error?: string }>;
      getChangelog: () => Promise<string>;
      getSources: () => Promise<string[]>;
      addSource: () => Promise<{ success: boolean; sources?: string[]; error?: string }>;
      removeSource: (path: string) => Promise<{ success: boolean; sources?: string[] }>;
      cloneRepository: (url: string, options?: { interactive?: boolean }) => Promise<{ success: boolean; sources?: string[]; error?: string }>;
      checkForUpdates: () => Promise<void>;
      quitAndInstall: () => Promise<void>;
      onUpdateAvailable: (callback: (info: { version: string }) => void) => void;
      onUpdateDownloaded: (callback: (info: { version: string }) => void) => void;
      onUpdateNotAvailable: (callback: (info: { version: string }) => void) => void;
      onUpdateError: (callback: (err: string) => void) => void;
      downloadTemplate: () => Promise<{ success: boolean; error?: string }>;
      pickImage: (targetDir: string) => Promise<{ success: boolean; path?: string; error?: string }>;
      importRunbook: () => Promise<{ success: boolean; error?: string }>;
      startAutoDownload: () => Promise<void>;
      startManualDownload: (url: string) => Promise<void>;
      getAppVersion: () => Promise<string>;
      refreshSources: () => Promise<{ success: boolean; results?: { source: string; success: boolean; error?: string; output?: string }[]; error?: string }>;
      appReady: () => void;
      installExamples: () => Promise<{ success: boolean; count?: number; error?: string }>;
      getAppConfig: () => Promise<{ firstRunComplete: boolean; sources: string[]; owners: string[]; categories: import('./types.js').CategoryConfig[] }>;
      setAppConfig: (config: Partial<{ firstRunComplete: boolean; sources: string[]; owners: string[]; categories: import('./types.js').CategoryConfig[] }>) => Promise<{ success: boolean }>;
    }
  }
}

export {};
