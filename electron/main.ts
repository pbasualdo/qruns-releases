import { app, BrowserWindow, ipcMain, dialog, shell, protocol, net } from 'electron'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { exec } from 'node:child_process'
// import log from 'electron-log';
import type { QRun, QRunStep } from './types.js';

// log.transports.file.level = 'info';
console.log('App starting...');

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

// Register custom protocol scheme
protocol.registerSchemesAsPrivileged([
  { scheme: 'qrun-asset', privileges: { secure: true, standard: true, supportFetchAPI: true, bypassCSP: true, stream: true } }
]);

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
       splash?.loadURL('data:text/html;charset=utf-8,<html><body style="background:#0F172A;color:white;display:flex;justify-content:center;align-items:center;"><h1>IT Quick Runbooks</h1></body></html>');
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
    icon: path.join(process.env.VITE_PUBLIC || '', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
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
    // Setup custom protocol handler
    protocol.handle('qrun-asset', async (request) => {
        try {
            const urlString = request.url;
            console.log(`[Protocol] Raw request: ${urlString}`);
            
            // 1. Get everything after the scheme and colon, then remove any leading slashes
            let pathPart = urlString.substring(urlString.indexOf(':') + 1).replace(/^\/+/, '');
            
            // 2. Decode segments (e.g. %20 -> space)
            let filePath = decodeURIComponent(pathPart);
            
            // 3. Robust Windows Drive Handling
            if (process.platform === 'win32') {
                // If we have "C/path" or "c/path" (missing colon due to being seen as host), re-add it
                if (!/^[a-zA-Z]:/.test(filePath) && /^[a-zA-Z](\/|\\)/.test(filePath)) {
                    filePath = filePath[0] + ':' + filePath.slice(1);
                }
                // Normalize slashes for Windows
                filePath = filePath.replace(/\//g, path.sep);
            }

            // 4. Ensure normalized
            filePath = path.normalize(filePath);
            
            console.log(`[Protocol] Final Resolved Path: ${filePath}`);
            
            if (fs.existsSync(filePath)) {
                return net.fetch(pathToFileURL(filePath).toString());
            }
            
            console.error(`[Protocol] File NOT found: ${filePath}`);
            return new Response('Not Found', { status: 404 });
        } catch (e) {
            console.error('[Protocol] Error handling request:', e);
            return new Response('Internal Error', { status: 500 });
        }
    });

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
      
      // Ensure owners exists
      if (!config.owners) {
        config.owners = ['Admin', 'Dev', 'Security', 'SRE'];
        saveConfig(config);
      }

      // Ensure categories exists (Default Icons)
      if (!config.categories) {
        config.categories = [
          { name: 'Database', svg: '<path d="M7 21h10a2 2 0 0 0 2-2V9.437a2 2 0 0 0-.611-1.432l-9.009-9.009A2 2 0 0 0 7.962 1H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>', color: 'var(--accent-secondary)' },
          { name: 'Network', svg: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line>' },
          { name: 'Compute', svg: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>' },
          { name: 'Alert', svg: '<polygon points="12 2 2 22 22 22 12 2"></polygon><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', color: 'var(--danger)' },
          { name: 'Storage', svg: '<path d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"></path><path d="M3 9h18"></path><path d="M3 15h18"></path>' },
          { name: 'Security', svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', color: 'var(--accent-primary)' },
          { name: 'Web', svg: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>' },
          { name: 'SRE', svg: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>', color: 'var(--accent-secondary)' }
        ];
        saveConfig(config);
      }
      
      return config;
    }
  } catch (e) {
    console.error("Failed to read config", e);
  }
  return { 
    sources: [DEFAULT_DOCS_DIR], 
    firstRunComplete: false, 
    owners: ['Admin', 'Dev', 'Security', 'SRE'],
    categories: [
      { name: 'Database', svg: '<path d="M7 21h10a2 2 0 0 0 2-2V9.437a2 2 0 0 0-.611-1.432l-9.009-9.009A2 2 0 0 0 7.962 1H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>', color: 'var(--accent-secondary)' },
      { name: 'Network', svg: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line>' },
      { name: 'Compute', svg: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>' },
      { name: 'Alert', svg: '<polygon points="12 2 2 22 22 22 12 2"></polygon><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', color: 'var(--danger)' }
    ]
  };
}

// Helper to save configuration
function saveConfig(config: any) {
  try {
    const tempFile = CONFIG_FILE + '.tmp';
    fs.writeFileSync(tempFile, JSON.stringify(config, null, 2), 'utf-8');
    if (fs.existsSync(tempFile)) {
        fs.renameSync(tempFile, CONFIG_FILE);
    }
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

// Helper to scan for all files matching criteria recursively
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Skip system/meta directories
            if (file !== '.git' && file !== 'node_modules' && file !== 'dist' && file !== 'build') {
                getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            if (file.toLowerCase().endsWith('.md')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
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
    const content = fs.readFileSync(filePath, 'utf-8');
    let data: Partial<QRun> = {};

    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.md') {
      const parsed = matter(content);
      data = parsed.data;
      
      // Parse MarkDown Body to Steps if not in frontmatter
      if (!data.steps) {
        data.steps = parseMarkdownSteps(parsed.content);
      }
    } else {
      return null; // Ignore non-markdown
    }

    /* if (!data.id) return null; */

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
    const validTypes = ['qrun', 'quick-runbook', 'quick-runbooks', 'runbooks', 'runbook'];
    const lowerType = String(data.type || '').toLowerCase();
    
    if (!validTypes.includes(lowerType)) {
        // If it's missing or wrong, return null (strict filter)
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
      // Check for metadata
      const ownershipMatch = line.match(/^Ownership:\s*(.*)$/i);
      const expectedMatch = line.match(/^Expected:\s*(.*)$/i);
      const timeMatch = line.match(/^Time:\s*(.*)$/i);

      if (ownershipMatch) {
          currentStep.ownership = ownershipMatch[1].trim();
      } else if (expectedMatch) {
          // Migration: convert to content block
          currentStep.content.push({ type: 'expected', text: expectedMatch[1].trim() });
      } else if (timeMatch) {
          currentStep.timeEstimation = timeMatch[1].trim();
      } else if (line.trim().match(/^!\[(.*)\]\((.*)\)$/)) {
          const match = line.trim().match(/^!\[(.*)\]\((.*)\)$/);
          if (match) {
              currentStep.content.push({ type: 'image', alt: match[1], path: match[2] });
          }
      } else if (line.trim().startsWith('```')) {
          // Check for code block start/end
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { steps, sourcePath: _, ...meta } = runbook;
    // Don't save steps in frontmatter
    const frontmatter = { ...meta };
    
    let body = '';
    if (steps && steps.length > 0) {
        body = steps.map((s: QRunStep) => {
            let stepContent = `## ${s.title}\n\n`;
            if (s.ownership) stepContent += `Ownership: ${s.ownership}\n`;
            if (s.timeEstimation) stepContent += `Time: ${s.timeEstimation}\n`;
            if (s.ownership || s.timeEstimation) stepContent += '\n';

            s.content.forEach((c) => {
                if (c.type === 'image') {
                    stepContent += `![${c.alt || ''}](${c.path})\n\n`;
                } else if (c.type === 'code') {
                    stepContent += '```' + (c.language || '') + '\n' + c.code + '\n```\n\n';
                } else if (c.type === 'list') {
                     c.items.forEach((it: string) => stepContent += `- ${it}\n`);
                     stepContent += '\n';
                } else if (c.type === 'text') {
                    stepContent += (c as any).text + '\n\n';
                } else if (c.type === 'expected') {
                    stepContent += `Expected: ${c.text}\n\n`;
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
    // Robust parent window resolution
    const parent = win || BrowserWindow.getFocusedWindow();
    
    if (!parent) {
        return { success: false, error: 'No parent window found. Please ensure the app is in focus.' };
    }

    try {
        const result = await dialog.showOpenDialog(parent, {
            properties: ['openDirectory'],
            title: 'Select Runbooks Folder'
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
    } catch (err) {
        console.error('[IPC] add-source error:', err);
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
    
    const REPOS_DIR = path.join(app.getPath('documents'), 'QuickRunbooks', 'Repos');
    const allRunbooks: QRun[] = [];

    sources.forEach((dir: string) => {
        if (fs.existsSync(dir)) {
            // Check if this source directory is INSIDE the managed Repos directory
            const isManagedRepo = dir.toLowerCase().startsWith(REPOS_DIR.toLowerCase());
            
            const files = getAllFiles(dir);
            files.forEach(filePath => {
                const rb = parseRunbookFile(filePath);
                if (rb) {
                    rb.readonly = isManagedRepo;
                    // SourcePath is the directory of the file (for relative assets)
                    rb.sourcePath = path.dirname(filePath); 
                    allRunbooks.push(rb);
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

// Get Changelog
ipcMain.handle('get-changelog', async () => {
    try {
        // Find CHANGELOG.md relative to app root
        const changelogPath = path.join(process.env.APP_ROOT || app.getAppPath(), 'CHANGELOG.md');
        if (fs.existsSync(changelogPath)) {
            return fs.readFileSync(changelogPath, 'utf8');
        }
        return "No changelog found at " + changelogPath;
    } catch (e) {
        console.error("Error reading changelog:", e);
        return "Error loading changelog: " + (e as Error).message;
    }
});

// Save runbook
ipcMain.handle('save-runbook', async (_, runbook: QRun) => {
  try {
    const config = getConfig();
    // Use existing path or default to first source
    const targetDir = runbook.sourcePath || config.sources[0]; 
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const filePath = path.join(targetDir, `${runbook.id}.md`);
    const content = serializeToMarkdown(runbook);

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
    if (runbook.readonly) {
        return { success: false, error: "Cannot delete a runbook that is part of a repository." };
    }
    // We need the full object or at least source/format/id to delete correct file
    const config = getConfig();
    // Fallback search if sourcePath missing (inefficient but safe)
    let targetFile = '';
    
    if (runbook.sourcePath) {
        targetFile = path.join(runbook.sourcePath, `${runbook.id}.md`);
    } else {
        // Search
         const sources = config.sources;
         for (const dir of sources) {
             const mdPath = path.join(dir, `${runbook.id}.md`);
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
            let execOptions: { env: Record<string, string | undefined>; timeout: number } = {
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
                    // VALIDATION: Prefer 'qrun' folder, but allow root if missing
                    let effectiveSource = targetDir;
                    const qrunPath = path.join(targetDir, 'qrun');
                    
                    if (fs.existsSync(qrunPath) && fs.statSync(qrunPath).isDirectory()) {
                        effectiveSource = qrunPath;
                        console.log(`[Clone] Using 'qrun' subfolder as source: ${effectiveSource}`);
                    } else {
                        console.log(`[Clone] 'qrun' subfolder not found. Using root as source: ${effectiveSource}`);
                    }

                    // Success - Add to sources
                    const config = getConfig();
                    if (!config.sources.includes(effectiveSource)) {
                        config.sources.push(effectiveSource);
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

Ownership: Admin
Expected: System Ready
Time: 5m

Description of step one.

## 2. Step Two

Ownership: Admin
Expected: Process Verified
Time: 10m

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


ipcMain.handle('download-template', async () => {
    try {
        const parent = win || BrowserWindow.getFocusedWindow();
        const defaultName = 'template.md';
        const content = TEMPLATE_MD;

        const { filePath } = await dialog.showSaveDialog(parent!, {
            title: 'Download Template',
            defaultPath: defaultName,
            filters: [
                { name: 'Markdown', extensions: ['md'] }
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
    const parent = win || BrowserWindow.getFocusedWindow();
    
    if (!parent) return { success: false, error: "No window found" };
    
    try {
        const { canceled: _canceled, filePaths } = await dialog.showOpenDialog(parent, {
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
ipcMain.handle('qrun:pick-image', async (_, targetDir: string) => {
    const parent = win || BrowserWindow.getFocusedWindow();
    
    if (!parent) return { success: false, error: "No window" };
    
    try {
        const { canceled: _canceled, filePaths } = await dialog.showOpenDialog(parent, {
            title: 'Pick an image',
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif', 'webp', 'jpeg'] }
            ],
            properties: ['openFile']
        });

        if (filePaths && filePaths.length > 0) {
            const srcPath = filePaths[0];
            const assetsDir = path.join(targetDir, 'assets');
            
            if (!fs.existsSync(assetsDir)) {
                fs.mkdirSync(assetsDir, { recursive: true });
            }

            const fileName = `${Date.now()}-${path.basename(srcPath)}`;
            const destPath = path.join(assetsDir, fileName);
            const relativePath = `assets/${fileName}`;

            fs.copyFileSync(srcPath, destPath);
            return { success: true, path: relativePath };
        }
        return { success: false, error: "No image selected" };
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
});
