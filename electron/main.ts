import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { exec } from 'node:child_process'
// import log from 'electron-log';
import type { QRun, QRunStep } from './types.js';

// log.transports.file.level = 'info';
console.log('App starting...');

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist_renderer')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

console.log('VITE_DEV_SERVER_URL:', VITE_DEV_SERVER_URL);
console.log('RENDERER_DIST:', RENDERER_DIST);

// Splash Screen Logic
let splash: BrowserWindow | null;
let win: BrowserWindow | null;

function createSplashWindow() {
  splash = new BrowserWindow({
    width: 500,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#0f1115', // Synced with app bg
    icon: path.join(process.env.VITE_PUBLIC || '', 'icon.png'),
  });
  
  if (VITE_DEV_SERVER_URL) {
    splash.loadURL(`${VITE_DEV_SERVER_URL}/splash.html`);
  } else {
    const splashPath = path.join(RENDERER_DIST, 'splash.html');
    splash.loadFile(splashPath).catch(() => {
       splash?.loadURL('data:text/html;charset=utf-8,<html><body style="background:#0F172A;color:white;display:flex;justify-content:center;align-items:center;"><h1>Quick Runbooks</h1></body></html>');
    });
  }
  
  splash.center();
}

function createMainWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#0f1115', // Synced with app bg
    show: false, // Hide initially
    autoHideMenuBar: true, // Hide menu bar
    icon: path.join(process.env.VITE_PUBLIC || '', 'icon.png'), // Use new icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false 
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    console.log(`Loading URL: ${VITE_DEV_SERVER_URL}`);
    win.loadURL(VITE_DEV_SERVER_URL).catch(e => console.error('Failed to load URL', e))
  } else {
    const indexPath = path.join(RENDERER_DIST, 'index.html');
    console.log(`Loading File: ${indexPath}`);
    win.loadFile(indexPath).catch(e => console.error('Failed to load file', e))
  }
  
  // Wait for renderer to signal readiness
  ipcMain.once('app-ready', () => {
      if (win && splash) {
          win.show();
          setTimeout(() => {
              if (splash) {
                  splash.destroy();
                  splash = null;
              }
          }, 100); // 100ms buffer to ensure main window painted
      }
  });

  // Fallback if renderer fails to signal (safety)
  win.once('ready-to-show', () => {
      setTimeout(() => {
          if (splash) {
              win?.show();
              setTimeout(() => {
                if (splash) {
                    splash.destroy();
                    splash = null;
                }
              }, 100);
          }
      }, 5000); // 5s fallback
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow() // On re-activate, we just open main
  }
})

app.whenReady().then(() => {
    createSplashWindow();
    createMainWindow();
});

// --- Data Persistence ---

const CONFIG_FILE = path.join(app.getPath('userData'), 'config.json');
const DEFAULT_DOCS_DIR = path.join(app.getPath('documents'), 'QuickRunbooks');

import matter from 'gray-matter';

// Helper to get configuration
function getConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      const config = JSON.parse(data);
      
      // MIGRATION: Convert single runbooksPath to sources array
      if (config.runbooksPath && !config.sources) {
        config.sources = [config.runbooksPath];
        delete config.runbooksPath;
        saveConfig(config);
      }
      
      // Ensure sources exists
      if (!config.sources) {
        config.sources = [DEFAULT_DOCS_DIR];
      }
      
      // Always try to initialize examples in the first source if available
      // REMOVED for user-controlled flow
      // if (config.sources.length > 0) {
      //    initializeExampleRunbooks(config.sources[0]);
      // }

      return config;
    }
  } catch (e) {
    console.error("Failed to read config", e);
  }
  // Default first run - Do NOT auto-install anymore
  // initializeExampleRunbooks(DEFAULT_DOCS_DIR);
  return { sources: [DEFAULT_DOCS_DIR], firstRunComplete: false };
}

// Helper to save configuration
function saveConfig(config: Partial<QRun>) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (e) {
    console.error("Failed to write config", e);
  }
}

// Helper to ensure all source directories exist
function ensureSourcesExist(sources: string[]) {
  sources.forEach(dir => {
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (e) {
        console.error("Could not create directory", dir, e);
      }
    }
  });
}

// Initializer for Example Runbooks (Renamed/Refactored)
function installExamples(targetDir: string): { success: boolean; count: number; error?: string } {
    try {
        if (!fs.existsSync(targetDir)) {
             fs.mkdirSync(targetDir, { recursive: true });
        }
        
        console.log("Installing example runbooks to:", targetDir);
        
        const examplesPath = path.join(process.env.VITE_PUBLIC || '', 'examples');
        let count = 0;
        
        if (fs.existsSync(examplesPath)) {
            const exampleFiles = fs.readdirSync(examplesPath);
            exampleFiles.forEach(file => {
                const srcPath = path.join(examplesPath, file);
                const destPath = path.join(targetDir, file);
                
                // Copy if missing (don't overwrite user changes)
                if (!fs.existsSync(destPath)) {
                    fs.copyFileSync(srcPath, destPath);
                    console.log(`Copied example: ${file}`);
                    count++;
                }
            });
            return { success: true, count };
        } else {
             console.warn("Example runbooks directory not found:", examplesPath);
             return { success: false, count: 0, error: "Examples directory not found" };
        }

    } catch (e) {
        console.error("Failed to install example runbooks", e);
        return { success: false, count: 0, error: (e as Error).message };
    }
}

// --- File Parsers ---

function parseRunbookFile(filePath: string): QRun | null {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const content = fs.readFileSync(filePath, 'utf-8');
    let data: Partial<QRun> = {};

    if (ext === '.json') {
      data = JSON.parse(content);
      data.format = 'json';
    } else if (ext === '.md') {
      const parsed = matter(content);
      data = parsed.data;
      data.format = 'md';
      
      // Parse MarkDown Body to Steps if not in frontmatter
      if (!data.steps) {
        data.steps = parseMarkdownSteps(parsed.content);
      }
    }

    if (!data.id) return null;

    // --- Validation & Defaults ---
    data.sourcePath = path.dirname(filePath);
    
    // ID: Fallback to filename
    if (!data.id) {
        data.id = path.basename(filePath, ext);
    }
    
    // Title: Fallback to filename or ID
    if (!data.title) {
        data.title = data.id || 'Untitled Runbook';
    }

    // Tags: Ensure array
    if (!Array.isArray(data.tags)) {
        data.tags = [];
    }

    // Type: Strict check
    if (data.type !== 'qrun') {
        // If it's missing or wrong, return null (strict filter)
        // OR: for migration, we could default it?
        // User said: "if there other 'types' remove them".
        // Implies we only want "qrun".
        // Note: Existing files might fail this check until updated.
        // We will update files next.
         return null; 
    }

    // Service: Default to IAAS if missing
    if (!data.service) {
        data.service = 'IAAS';
    }

    // Category: Default to Alert if missing
    if (!data.category) {
        data.category = 'Alert';
    }

    // Steps: Ensure array
    if (!Array.isArray(data.steps)) {
        data.steps = [];
    }

    return data as QRun;

  } catch (err) {
    console.error(`Error parsing file ${filePath}`, err);
  }
  return null;
}

function parseMarkdownSteps(content: string): QRunStep[] {
  const steps: QRunStep[] = [];
  const lines = content.split('\n');
  let currentStep: QRunStep | null = null;

  lines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentStep) steps.push(currentStep);
      currentStep = { title: line.replace('## ', '').trim(), content: [] };
    } else if (currentStep) {
      // Check for code block start/end
       // Simplistic parser for now - assumes standard blocks
       if (line.trim().startsWith('```')) {
           const lang = line.trim().replace('```', '');
           if (lang) {
               currentStep.content.push({ type: 'code', language: lang, code: '' });
           } else {
               // end block? or start without lang? Assume close if last item is code
               const last = currentStep.content[currentStep.content.length-1];
               if (last && last.type === 'code') {
                   // is closing
               } else {
                   // is starting no lang
                   currentStep.content.push({ type: 'code', language: 'text', code: '' });
               }
           }
       } else {
           const last = currentStep.content[currentStep.content.length-1];
           if (last && last.type === 'code') {
                if (last.code) last.code += '\n' + line;
                else last.code = line;
           } else {
               // Text
               if (!last || last.type !== 'text') {
                   currentStep.content.push({ type: 'text', text: line });
               } else {
                   last.text += '\n' + line;
               }
           }
       }
    }
  });
  if (currentStep) steps.push(currentStep);
  
  // Clean up empty code endings
  steps.forEach(s => {
      s.content.forEach((c) => {
          if (c.type === 'code' && c.code.endsWith('```')) {
              c.code = c.code.substring(0, c.code.length - 3).trim();
          }
           if (c.type === 'text') c.text = c.text.trim();
      });
  });

  return steps;
}

function serializeToMarkdown(runbook: QRun): string {
    const { steps, sourcePath, format, ...meta } = runbook;
    // Don't save steps in frontmatter
    const frontmatter = { ...meta };
    
    let body = '';
    if (steps && steps.length > 0) {
        body = steps.map((s: QRunStep) => {
            let stepContent = `## ${s.title}\n\n`;
            s.content.forEach((c) => {
                if (c.type === 'code') {
                    stepContent += '```' + (c.language || '') + '\n' + c.code + '\n```\n\n';
                } else if (c.type === 'list') {
                     c.items.forEach((it: string) => stepContent += `- ${it}\n`);
                     stepContent += '\n';
                } else {
                    stepContent += c.text + '\n\n';
                }
            });
            return stepContent;
        }).join('');
    }
    
    return matter.stringify(body, frontmatter);
}

// --- IPC Handlers ---

// Get Sources
ipcMain.handle('get-sources', () => {
    return getConfig().sources;
});

// Add Source
ipcMain.handle('add-source', async () => {
  if (!win) return { success: false };
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const newPath = result.filePaths[0];
    const config = getConfig();
    if (!config.sources.includes(newPath)) {
        config.sources.push(newPath);
        saveConfig(config);
    }
    return { success: true, sources: config.sources };
  }
  return { success: false };
});

// Remove Source
ipcMain.handle('remove-source', async (_, pathToRemove) => {
    const config = getConfig();
    config.sources = config.sources.filter((s: string) => s !== pathToRemove);
    saveConfig(config);
    return { success: true, sources: config.sources };
});

// Get all runbooks (Aggregated)
ipcMain.handle('get-runbooks', async () => {
  try {
    const config = getConfig();
    const sources = config.sources;
    ensureSourcesExist(sources);
    
    let allRunbooks: QRun[] = [];

    sources.forEach((dir: string) => {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith('.json') || file.endsWith('.md')) {
                    const rb = parseRunbookFile(path.join(dir, file));
                    if (rb) allRunbooks.push(rb);
                }
            });
        }
    });
    
    return allRunbooks;
  } catch (error) {
    console.error('Error reading runbooks:', error);
    return [];
  }
});

// Save runbook
ipcMain.handle('save-runbook', async (_, runbook: QRun) => {
  try {
    const config = getConfig();
    // Use existing path or default to first source
    const targetDir = runbook.sourcePath || config.sources[0]; 
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    let filePath;
    let content;

    // Determine format
    if (runbook.format === 'md') {
        filePath = path.join(targetDir, `${runbook.id}.md`);
        content = serializeToMarkdown(runbook);
    } else {
        // Default to JSON
        filePath = path.join(targetDir, `${runbook.id}.json`);
        // Clean up internal non-persistent props
        const { sourcePath, format, ...cleanRunbook } = runbook;
        content = JSON.stringify(cleanRunbook, null, 2);
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('Error saving runbook:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Delete runbook
ipcMain.handle('delete-runbook', async (_, runbook: QRun) => {
  try {
    // We need the full object or at least source/format/id to delete correct file
    const config = getConfig();
    // Fallback search if sourcePath missing (inefficient but safe)
    let targetFile = '';
    
    if (runbook.sourcePath) {
        const ext = runbook.format === 'md' ? '.md' : '.json';
        targetFile = path.join(runbook.sourcePath, `${runbook.id}${ext}`);
    } else {
        // Search
         const sources = config.sources;
         for (const dir of sources) {
             const jsonPath = path.join(dir, `${runbook.id}.json`);
             const mdPath = path.join(dir, `${runbook.id}.md`);
             if (fs.existsSync(jsonPath)) { targetFile = jsonPath; break; }
             if (fs.existsSync(mdPath)) { targetFile = mdPath; break; }
         }
    }

    if (targetFile && fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
      return { success: true };
    }
    return { success: false, error: "File not found" };
  } catch (error) {
    console.error('Error deleting runbook:', error);
    return { success: false, error: (error as Error).message };
  }
});

// Clone Repository
ipcMain.handle('clone-repository', async (_, url, options = {}) => {
    try {
        if (!url) return { success: false, error: "URL is required" };
        
        // SECURITY: Validate URL to prevent command injection
        // Allow only https/http, alphanumeric, dot, underscore, hyphen
        if (!/^https?:\/\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+(\.git)?$/.test(url)) {
             return { success: false, error: "Invalid Repository URL. Access denied." };
        }

        const { interactive } = options;
        
        // Derive folder name from URL (e.g., https://github.com/foo/bar.git -> bar)
        const parts = url.split('/');
        let repoName = parts[parts.length - 1];
        if (repoName.endsWith('.git')) repoName = repoName.slice(0, -4);
        repoName = repoName.replace(/[^a-zA-Z0-9-_]/g, ''); // Sanitize

        if (!repoName) repoName = `repo-${Date.now()}`;

        // Clone into Documents/QuickRunbooks/Repos
        const reposDir = path.join(app.getPath('documents'), 'QuickRunbooks', 'Repos');
        if (!fs.existsSync(reposDir)) fs.mkdirSync(reposDir, { recursive: true });

        const targetDir = path.join(reposDir, repoName);
        
        if (fs.existsSync(targetDir)) {
             return { success: false, error: `Directory ${repoName} already exists.` };
        }

        return new Promise((resolve) => {
            console.log(`Cloning ${url} into ${targetDir} (Interactive: ${interactive})`);
            
            // Shallow clone for speed
            let command = `git clone --depth 1 "${url}" "${targetDir}"`;
            let execOptions: any = {
                env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
                timeout: 30000 
            };

            if (interactive) {
                // Windows specific: Open a new terminal window and wait for it to close
                command = `start /wait cmd /c "git clone --depth 1 ${url} ${targetDir} & if errorlevel 1 pause"`;
                execOptions = {
                    env: process.env, // Allow all envs
                    timeout: 0 // No timeout (user might verify 2FA)
                };
            }

            exec(command, execOptions, (error, _stdout, stderr) => {
                // In interactive mode, 'start' returns success if the WINDOW opened, not if git succeeded.
                // So we must verify if the directory exists after execution.
                
                let success = false;
                if (interactive) {
                    if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
                         success = true;
                    }
                } else if (!error) {
                    success = true;
                } else {
                     // Check for common errors
                    const msg = stderr || error.message;
                    console.error("Clone error:", msg);
                    resolve({ success: false, error: msg.includes('Authentication failed') ? 'AUTH_FAILED' : msg });
                    return;
                }

                if (success) {
                    // VALIDATION: Must have 'qrun' folder
                    const qrunPath = path.join(targetDir, 'qrun');
                    if (!fs.existsSync(qrunPath)) {
                        // Cleanup
                        try { fs.rmSync(targetDir, { recursive: true, force: true }); } catch (e) { console.error("Cleanup failed", e); }
                        resolve({ success: false, error: "Repository does not contain a 'qrun' folder." });
                        return;
                    }

                    // Success - Add to sources (pointing to qrun subfolder)
                    const config = getConfig();
                    if (!config.sources.includes(qrunPath)) {
                        config.sources.push(qrunPath);
                        saveConfig(config);
                    }
                    resolve({ success: true, sources: config.sources });
                } else {
                     resolve({ success: false, error: "Clone failed." });
                }
            });
        });

    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});

// --- Auto-Update ---

import pkg from 'electron-updater';
const { autoUpdater } = pkg;

// autoUpdater.logger = log;
autoUpdater.autoDownload = false; // We will manually trigger download
autoUpdater.autoInstallOnAppQuit = true;

ipcMain.handle('check-for-updates', () => {
  console.log('Manual check for updates triggered');
  if (process.env.VITE_DEV_SERVER_URL) {
      console.log('Skipping update check in dev mode');
      // Mock an update available for testing UI
      // win?.webContents.send('update-available', { version: '9.9.9' });
      return; 
  }
  autoUpdater.checkForUpdates();
});

ipcMain.handle('start-auto-download', () => {
    console.log('User requested Auto-Update. Starting download...');
    autoUpdater.downloadUpdate();
});

ipcMain.handle('start-manual-download', (_event, url) => {
    // SECURITY: Only allow HTTPS protocol
    if (!url || !url.startsWith('https://')) {
        console.warn('Blocked unsafe manual download URL:', url);
        return; 
    }
    console.log('User requested Manual Update. Opening URL:', url);
    shell.openExternal(url);
});

ipcMain.handle('quit-and-install', () => {
  autoUpdater.quitAndInstall();
});

// Event forwarding
autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
});

autoUpdater.on('update-available', (info: { version: string }) => {
    console.log('Update available:', info);
    win?.webContents.send('update-available', info);
    // DO NOT auto download. Wait for user action.
});

autoUpdater.on('update-not-available', (info: { version: string }) => {
    console.log('Update not available:', info);
    win?.webContents.send('update-not-available', info);
});

autoUpdater.on('error', (err: Error) => {
    console.error('Update error:', err);
    win?.webContents.send('update-error', err.toString());
});

autoUpdater.on('download-progress', (progressObj: { percent: number }) => {
    console.log('Download progress:', progressObj.percent);
    // Optionally send progress
});

autoUpdater.on('update-downloaded', (info: { version: string }) => {
    console.log('Update downloaded:', info);
    win?.webContents.send('update-downloaded', info);
});



// --- Templates & Import ---

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

## 1. Step One

Description of step one.

## 2. Step Two

Description of step two.

## 3. Step Three

Description of step three.

## 4. Step Four

Description of step four.

## 5. Step Five

Description of step five.

## 6. Step Six

Description of step six.

## 7. Step Seven

Description of step seven.

## 8. Step Eight

Description of step eight.

## 9. Step Nine

Description of step nine.

## 10. Step Ten

Description of step ten.
`;

const TEMPLATE_JSON = `{
  "id": "new-runbook",
  "title": "New Runbook",
  "service": "IAAS",
  "category": "Compute",
  "tags": ["tag1", "tag2"],
  "shortDescription": "A short description.",
  "fullDescription": "A full description.",
  "type": "qrun",
  "steps": [
     { "title": "1. Step One", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "2. Step Two", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "3. Step Three", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "4. Step Four", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "5. Step Five", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "6. Step Six", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "7. Step Seven", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "8. Step Eight", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "9. Step Nine", "content": [{ "type": "text", "text": "Content here" }] },
     { "title": "10. Step Ten", "content": [{ "type": "text", "text": "Content here" }] }
  ]
}`;

ipcMain.handle('download-template', async (_, format: 'json' | 'md') => {
    if (!win) return { success: false, error: "No window" };
    
    try {
        const defaultName = format === 'md' ? 'template.md' : 'template.json';
        const content = format === 'md' ? TEMPLATE_MD : TEMPLATE_JSON;

        const { filePath } = await dialog.showSaveDialog(win, {
            title: 'Download Template',
            defaultPath: defaultName,
            filters: [
                { name: format === 'md' ? 'Markdown' : 'JSON', extensions: [format] }
            ]
        });

        if (filePath) {
            fs.writeFileSync(filePath, content, 'utf-8');
            return { success: true };
        } else {
             return { success: false, error: "Cancelled" };
        }
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});

// Refresh Sources (Git Pull)
ipcMain.handle('refresh-sources', async () => {
    try {
        const config = getConfig();
        const sources = config.sources || [];
        const results: { source: string; success: boolean; error?: string; output?: string }[] = [];

        for (const dir of sources) {
            if (fs.existsSync(path.join(dir, '.git'))) {
                // It's a git repo
                try {
                    await new Promise<void>((resolve, reject) => {
                        exec('git pull', { cwd: dir }, (error, stdout, stderr) => {
                            if (error) {
                                results.push({ source: dir, success: false, error: stderr || error.message });
                                reject(error); // Just to finish promise, we catch outside if needed but we want to continue loop
                                return; // Handled
                            }
                            results.push({ source: dir, success: true, output: stdout });
                            resolve();
                        });
                    }).catch(() => {}); // Catch reject to continue loop
                } catch (e) {
                    // Already handled in inner callback logically
                }
            } else {
                // Not a git repo, skip
            }
        }
        return { success: true, results };
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});

// IPC: Install Examples
ipcMain.handle('install-examples', async () => {
    try {
        const config = getConfig();
        const targetDir = (config.sources && config.sources.length > 0) ? config.sources[0] : DEFAULT_DOCS_DIR;
        
        const result = installExamples(targetDir);
        
        // Mark first run as complete if successful (or even if partly successful)
        if (result.success) {
            config.firstRunComplete = true;
            saveConfig(config);
        }
        
        return result;
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});

// IPC: Get App Config
ipcMain.handle('get-app-config', () => {
    return getConfig();
});

// IPC: Set App Config
ipcMain.handle('set-app-config', (_, newConfig) => {
    const config = getConfig();
    const updated = { ...config, ...newConfig };
    saveConfig(updated);
    return updated;
});

// Expose app version
ipcMain.handle('get-app-version', () => {
    return app.getVersion();
});

ipcMain.handle('import-file', async () => {
    if (!win) return { success: false, error: "No window" };
    
    try {
        const { filePaths } = await dialog.showOpenDialog(win, {
            filters: [{ name: 'Runbooks', extensions: ['json', 'md'] }],
            properties: ['openFile']
        });

        if (filePaths && filePaths.length > 0) {
            const srcFile = filePaths[0];

            // VALIDATION: Check if file is valid runbook BEFORE copying
            const validationCheck = parseRunbookFile(srcFile);
            if (!validationCheck) {
                return { success: false, error: "Invalid Runbook file. File must contain 'type: qrun' and valid structure." };
            }

            const config = getConfig();
            const targetDir = config.sources[0]; // Default to first source
            
            // Validate target exists
            if (!fs.existsSync(targetDir)) {
                 fs.mkdirSync(targetDir, { recursive: true });
            }

            const fileName = path.basename(srcFile);
            const targetFile = path.join(targetDir, fileName);

            // Prevent overwrite/collision? For now, we overwrite or duplicate.
            // Let's copy.
            fs.copyFileSync(srcFile, targetFile);
            
            return { success: true };
        }
        return { success: false, error: "Canceled" };
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});
