import React, { useState, useRef, useEffect } from 'react';
import type { QRun, QRunStep, CategoryConfig } from '../types';
import { RunbookEditor } from './RunbookEditor';
import { useTheme } from '../context/ThemeContext';
import { ACCENTS, type AccentColor } from '../context/ThemeConstants';
import './QRunList.css';
import { SettingsModal } from './SettingsModal';
import { HelpModal } from './HelpModal';

// PrismJS imports
import Prism from 'prismjs';
import './prism-theme.css';

// Import necessary languages for Prism
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-markup'; // For XML

export const QRunList: React.FC = () => {
    const { theme, toggleTheme, accent, setAccent, viewMode, setViewMode, uiScale } = useTheme();
    
    // -- Data State --
    const [runbooks, setRunbooks] = useState<QRun[]>([]);
    
    // -- View State --
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'IAAS' | 'PAAS'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [categories, setCategories] = useState<CategoryConfig[]>([]);
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  // -- Editor State --
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // -- Update State --
  const [updateStatus, setUpdateStatus] = useState<string | null>(null); // 'available', 'downloading', 'ready', 'error'
  const [updateInfo, setUpdateInfo] = useState<{ version: string } | null>(null);

    const [appVersion, setAppVersion] = useState<string>('');

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
        // Apply syntax highlighting
        Prism.highlightAll();
    }, [selectedRunId, isEditing]);

    React.useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.getAppVersion().then(v => setAppVersion(v));
        }
    }, []);

  // -- Load Data --
    const loadRunbooks = async () => {
        if (window.electronAPI) {
            try {
                const [loadedRuns, sources, config] = await Promise.all([
                    window.electronAPI.getRunbooks(),
                    window.electronAPI.getSources(),
                    window.electronAPI.getAppConfig()
                ]);
                setRunbooks(loadedRuns);
                setAvailableSources(sources);
                if (config.categories) setCategories(config.categories);
                
                if (window.electronAPI) {
                    window.electronAPI.appReady();
                    setTimeout(() => {
                        window.electronAPI.checkForUpdates();
                    }, 5000);
                }
            } catch (e) {
                console.error("Failed to load data from Electron", e);
            }
        } else {
            setRunbooks([]);
        }
    };

  React.useEffect(() => {
    loadRunbooks();

    if (window.electronAPI) {
        window.electronAPI.onUpdateAvailable((info) => {
            console.log('Update available:', info);
            setUpdateStatus('available'); // Wait for user choice
            setUpdateInfo(info);
        });
        window.electronAPI.onUpdateDownloaded((info) => {
            console.log('Update downloaded:', info);
            setUpdateStatus('ready');
            setUpdateInfo(info);
        });
        window.electronAPI.onUpdateError((err) => {
            console.error('Update error:', err);
            setUpdateStatus('error');
            setTimeout(() => setUpdateStatus(null), 5000);
        });
        window.electronAPI.onUpdateNotAvailable(() => {
            console.log('Update not available');
            setUpdateStatus('not-available');
            setTimeout(() => setUpdateStatus(null), 3000);
        });

        // Check for first run
        window.electronAPI.getAppConfig().then(config => {
            if (!config.firstRunComplete) {
                // Show prompt
                setShowInstallPrompt(true);
            }
        });
    }
  }, []);

  const handleCheckForUpdates = () => {
      if (window.electronAPI) {
          setUpdateStatus('checking');
          window.electronAPI.checkForUpdates();
      }
  };

  // -- Derived State --
  const filteredRuns = runbooks.filter(run => {
    // Filter by SERVICE (IAAS/PAAS/SAAS) instead of category
    const matchFilter = activeFilter === 'ALL' || (run.service || 'IAAS') === activeFilter;
    const matchSearch = (run.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (run.tags || []).some(t => (t || '').toLowerCase().includes(searchQuery.toLowerCase()));
    const matchTag = selectedTag ? (run.tags || []).includes(selectedTag) : true;
    return matchFilter && matchSearch && matchTag;
  });

  const selectedRun = filteredRuns.find(r => r.id === selectedRunId);
  const uniqueTags = Array.from(new Set(
    runbooks
      .filter(r => activeFilter === 'ALL' || (r.service || 'IAAS') === activeFilter)
      .flatMap(r => r.tags || [])
  )).sort();

  // -- Handlers --
  const handleCreate = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedRunId(null);
  };

  const handleEdit = () => {
    if (selectedRun) {
      setIsEditing(true);
      setIsCreating(false);
    }
  };

  const handleRefresh = async () => {
    await loadRunbooks();
  };

  const handleSave = async (run: QRun) => {
    if (window.electronAPI) {
      const result = await window.electronAPI.saveRunbook(run);
      if (!result.success) {
        alert('Failed to save runbook: ' + result.error);
        return;
      }
    }

    await loadRunbooks(); // Reload to get updated aggregation
    setIsCreating(false);
    setIsEditing(false);
    if (!selectedRunId) setSelectedRunId(run.id);
  };

  const handleDelete = async (run: QRun) => {
    if (!window.electronAPI) return;
    
    if (confirm(`Are you sure you want to delete "${run.title}"? This will permanently remove the file from your local storage.`)) {
        const result = await window.electronAPI.deleteRunbook(run);
        if (result.success) {
            await loadRunbooks();
            setIsEditing(false);
            setIsCreating(false);
            setSelectedRunId(null);
        } else {
            alert("Error deleting runbook: " + result.error);
        }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleCycleViewMode = () => {
      const modes: ('super-compact' | 'compact' | 'comfortable' | 'detailed')[] = ['super-compact', 'compact', 'comfortable', 'detailed'];
      const currentIdx = modes.indexOf(viewMode);
      const nextMode = modes[(currentIdx + 1) % modes.length];
      setViewMode(nextMode);
  };

  // -- Render Helpers --
   const renderIcon = (category: string) => {
       const catName = category || '';
       const config = categories.find(c => c.name.toLowerCase() === catName.toLowerCase());
       
       if (config) {
           return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={config.color || "currentColor"} strokeWidth="2" dangerouslySetInnerHTML={{ __html: config.svg }} />;
       }

       // Fallback
       return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>;
   };

  const renderStepContent = (content: QRunStep['content'][0], idx: number) => {
    switch (content.type) {
      case 'text':
        return <p key={idx}>{content.text}</p>;
      case 'code':
        return (
          <div key={idx} className="code-block">
            <div className="code-header">
              <span className="lang-badge">{content.language.toUpperCase()}</span>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText(content.code)}>Copy</button>
            </div>
            <pre className={`language-${content.language.toLowerCase()}`}>
              <code className={`language-${content.language.toLowerCase()}`}>
                {content.code}
              </code>
            </pre>
          </div>
        );
      case 'list':
        return <ul key={idx} className="pl-4">{content.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
      case 'image': {
        const currentSource = selectedRun?.sourcePath || '';
        const normalizedSource = currentSource.replace(/\\/g, '/');
        const fullPath = content.path.startsWith('http') ? content.path : `qrun-asset:///${normalizedSource}/${content.path}`;
        return (
          <div key={idx} className="step-image-block mb-1">
            <div className="image-thumbnail-wrapper">
              <img 
                src={fullPath} 
                alt={content.alt} 
                className="image-thumbnail"
                onClick={() => setExpandedImage(fullPath)}
              />
              <div className="image-overlay-hint" onClick={() => setExpandedImage(fullPath)}>
                <span>Click to expand</span>
              </div>
            </div>
          </div>
        );
      }
      case 'expected':
        return (
          <div key={idx} className="step-expected-block">
              <span className="expected-label">Expected:</span>
              {content.text}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`app-shell ui-scale-${uiScale}`}>
      {/* 1. Global Header */}
      <header className="app-header">
        <div className="brand-area">
          <span className="logo-icon">⚡</span>
          <h1>IT Quick Runbooks</h1>
          <span className="count">v1.3</span>
        </div>
        <div className="header-actions">
           <div className="accent-picker" style={{ display: 'flex', gap: '4px', marginRight: '8px' }}>
              {(Object.keys(ACCENTS) as AccentColor[]).map(color => (
                  <button 
                    key={color}
                    onClick={() => setAccent(color)}
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: ACCENTS[color].primary,
                        boxShadow: accent === color ? '0 0 0 2px var(--bg-secondary), 0 0 0 3px var(--text-primary)' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.1s'
                    }}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  />
              ))}
           </div>
           <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? (
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
           </button>
            <button className="icon-btn" title="Settings" onClick={() => setIsSettingsOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
           <button className="icon-btn" title="Help / Guide" onClick={() => setIsHelpOpen(true)}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
           </button>
        </div>
      </header>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onUpdate={loadRunbooks}
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      {showInstallPrompt && (
          <div className="modal-overlay">
              <div className="modal-content" style={{maxWidth: '400px'}}>
                  <div className="modal-header">
                      <h2>Welcome to IT Quick Runbooks!</h2>
                  </div>
                  <div className="modal-body">
                      <p>Do you want to install a <strong>starter kit</strong> of example runbooks (SQL, Network, HR, etc.) to help you get started?</p>
                      <p className="text-tertiary text-small">You can always install them later from 'Settings &gt; Sources'.</p>
                  </div>
                  <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={() => {
                          setShowInstallPrompt(false);
                          if (window.electronAPI) window.electronAPI.setAppConfig({ firstRunComplete: true });
                      }}>No, thanks</button>
                      <button className="btn btn-primary" onClick={async () => {
                          if (window.electronAPI) {
                              const res = await window.electronAPI.installExamples();
                              if (res.success) {
                                  alert(`Installed ${res.count} examples!`);
                                  await loadRunbooks();
                              } else {
                                  alert('Error installing examples: ' + res.error);
                              }
                              // Config handles setting firstRunComplete on server side on success, but we can double check
                              setShowInstallPrompt(false);
                          }
                      }}>Yes, install them</button>
                  </div>
              </div>
          </div>
      )}

      {/* 2. App Body */}
      <div className="app-body">
         {/* Sidebar: Command Center */}
         <aside className="sidebar">
            <div className="sidebar-toolbar">
               <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search runbooks..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
               <div className="filter-row">
                  <button className={`filter-btn ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => { setActiveFilter('ALL'); setSelectedTag(null); }}>ALL</button>
                  <button className={`filter-btn ${activeFilter === 'IAAS' ? 'active' : ''}`} onClick={() => { setActiveFilter('IAAS'); setSelectedTag(null); }}>IAAS</button>
                  <button className={`filter-btn ${activeFilter === 'PAAS' ? 'active' : ''}`} onClick={() => { setActiveFilter('PAAS'); setSelectedTag(null); }}>PAAS</button>
                  <button className="filter-btn create-btn" onClick={handleCreate} title="Create New">+</button>
                   <button 
                    className="filter-btn" 
                    title="Import Runbook"
                    onClick={async () => {
                        if (window.electronAPI) {
                            try {
                                const result = await window.electronAPI.importRunbook();
                                if (result.success) {
                                    alert('Runbook imported successfully!');
                                    await loadRunbooks();
                                } else if (result.error && result.error !== 'Canceled') {
                                    alert('Import failed: ' + result.error);
                                }
                            } catch (e) {
                                console.error(e);
                                alert('An error occurred during import: ' + (e as Error).message);
                            }
                        }
                    }}
                  >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </button>
                  <button 
                    className="filter-btn" 
                    title={`Style: ${viewMode}`}
                    onClick={handleCycleViewMode}
                  >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </button>
               </div>
               {/* Tag Cloud */}
               {uniqueTags.length > 0 && (
                   <div className="tag-cloud">
                       {uniqueTags.map(tag => (
                           <button 
                               key={tag} 
                               className={`tag-chip ${selectedTag === tag ? 'active' : ''}`}
                               onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                           >
                               {tag}
                           </button>
                       ))}
                   </div>
               )}
            </div>

            <div className={`run-list-container view-mode-${viewMode}`}>
               {filteredRuns.map(run => (
                  <button 
                    key={run.id}
                    className={`run-list-item ${selectedRunId === run.id ? 'selected' : ''}`}
                    onClick={() => { setSelectedRunId(run.id); setIsEditing(false); setIsCreating(false); }}
                  >
                     <div className="item-content-wrapper">
                         <div className="item-title-row">
                             {viewMode !== 'super-compact' && renderIcon(run.category)}
                             <div className="item-title">{run.title}</div>
                         </div>
                         
                         {(viewMode === 'comfortable' || viewMode === 'detailed') && (
                             <div className="item-meta">
                                <span className="item-badge">{run.category}</span>
                                <span className="item-desc">{run.shortDescription}</span>
                             </div>
                         )}

                         {viewMode === 'detailed' && (
                             <>
                                 <div className="item-tags">
                                     {run.tags.map(t => <span key={t} className="tag-micro">{t}</span>)}
                                 </div>
                                 <div className="item-full-desc">{run.fullDescription}</div>
                             </>
                         )}
                     </div>
                  </button>
               ))}
               {filteredRuns.length === 0 && <div className="empty-state">No results</div>}
            </div>

            <div className="sidebar-footer">
                <div className="copyright">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <span>© 2026 IT Quick Runbooks</span>
                        <span className="text-tertiary" style={{fontSize: '0.8em'}}>v{appVersion}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button 
                            className="btn-link text-tertiary" 
                            style={{ 
                                fontSize: '0.7em', 
                                textDecoration: 'underline', 
                                cursor: 'pointer', 
                                background: 'none', 
                                border: 'none', 
                                padding: 0,
                                opacity: (updateStatus === 'checking' || updateStatus === 'downloading') ? 0.5 : 1
                            }}
                            onClick={handleCheckForUpdates}
                            disabled={updateStatus === 'checking' || updateStatus === 'downloading'}
                        >
                            {updateStatus === 'checking' ? 'Checking...' : 'Check for Updates'}
                        </button>
                        {updateStatus === 'error' && <span style={{ color: 'var(--danger)', fontSize: '0.8em' }}>Error</span>}
                        {updateStatus === 'not-available' && <span style={{ color: 'var(--success)', fontSize: '0.8em' }}>Up to date</span>}
                    </div>
                </div>
                {updateStatus === 'available' && (
                    <div className="update-status" style={{flexDirection: 'column', gap: '5px', alignItems: 'flex-start'}}>
                        <span className="text-small text-tertiary">
                            Update v{updateInfo?.version} available:
                        </span>
                        <div style={{display: 'flex', gap: '5px'}}>
                            <button 
                                className="btn btn-primary btn-small" 
                                style={{fontSize: '0.7em', padding: '2px 6px'}}
                                onClick={() => {
                                    setUpdateStatus('downloading');
                                    window.electronAPI.startAutoDownload();
                                }}
                            >
                                ⚡ Auto
                            </button>
                            <button 
                                className="btn btn-secondary btn-small" 
                                style={{fontSize: '0.7em', padding: '2px 6px'}}
                                onClick={() => {
                                    setUpdateStatus(null); // Clear status as browser handles it
                                    // Construct download URL if path is not absolute URL (GitHub releases usually provide full url in assets usually, but electron-updater info object might differ)
                                    // Usually info.path or we can construct it. Let's assume info has proper release info.
                                    // Electron-updater info object has `path` which is usually the file name, and `releaseName`, `releaseNotes`.
                                    // Safest is to open the releases page if specific URL is hard to get, OR try to find the asset url.
                                    // Let's open the release page for safety if we can't find exact url, or just the standard specific URL if present.
                                    // Actually, let's open the GitHub Releases page to be safe and consistent with the "Manual update" strategy.
                                    const releaseUrl = `https://github.com/pbasualdo/qruns/releases/tag/v${updateInfo?.version}`;
                                    window.electronAPI.startManualDownload(releaseUrl);
                                }}
                            >
                                📥 Manual
                            </button>
                        </div>
                    </div>
                )}
                {updateStatus === 'downloading' && (
                    <div className="update-status">
                        <span className="text-small text-tertiary">
                            Downloading update {updateInfo?.version && `(v${updateInfo.version})`}...
                        </span>
                    </div>
                )}
                {updateStatus === 'ready' && (
                   <div className="update-status">
                       <button className="btn btn-primary btn-small" onClick={() => window.electronAPI.quitAndInstall()}>
                           Restart to Update {updateInfo?.version && `(v${updateInfo.version})`}
                       </button>
                   </div>
                )}
            </div>
         </aside>

         {/* Main View: Reading/Editing */}
         <main className="main-view">
            {isCreating ? (
                <RunbookEditor onSave={handleSave} onCancel={handleCancel} sources={availableSources} />
            ) : isEditing && selectedRun ? (
                <RunbookEditor initialData={selectedRun} onSave={handleSave} onCancel={handleCancel} onDelete={handleDelete} sources={availableSources} />
             ) : selectedRun ? (
                <>
                   <div className="view-header compact">
                      <div className="view-header-top">
                         <div className="title-group">
                             <div className="title-row">
                                 <h2>{selectedRun.title}</h2>
                                 <div className="header-badges">
                                     <span className="item-badge text-small">{selectedRun.service}</span>
                                     <span className="item-badge text-small secondary" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                         {renderIcon(selectedRun.category)}
                                         {selectedRun.category}
                                     </span>
                                     {selectedRun.readonly && (
                                         <span className="status-badge protected" title="Protected runbook">
                                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                             Protected
                                         </span>
                                     )}
                                 </div>
                             </div>
                             <p className="header-desc">{selectedRun.fullDescription}</p>
                             <div className="header-tags">
                                {selectedRun.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                             </div>
                         </div>
                         <div className="view-actions">
                            {selectedRun && !selectedRun.readonly && (
                                <button className="btn btn-secondary" onClick={() => handleDelete(selectedRun)} title="Delete">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path></svg>
                                    Delete
                                </button>
                            )}
                            <button className="btn btn-secondary" onClick={() => handleEdit()} title="Edit Runbook">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                Edit
                            </button>
                            <button className="btn btn-secondary" onClick={handleRefresh} title="Reload Library">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5 1.55a9 9 0 0 0 13.9 4.95"></path></svg>
                                Refresh
                            </button>
                         </div>
                      </div>
                   </div>

                   <div className="view-content" ref={contentRef}>
                      {selectedRun.steps.map((step, idx) => (
                         <div key={idx} className="step-item">
                            <div className="step-marker">
                               <div className="marker-dot"></div>
                               <div className="marker-line"></div>
                            </div>
                            <div className="step-details">
                                <h3 className="step-title">Step {idx + 1}: {step.title}</h3>
                                {(step.ownership || step.timeEstimation) && (
                                    <div className="step-meta-badges">
                                        {step.ownership && <span className="meta-badge-item">👤 {step.ownership}</span>}
                                        {step.timeEstimation && <span className="meta-badge-item">⏱️ {step.timeEstimation}</span>}
                                    </div>
                                )}
                                <div className="step-body">
                                   {step.content.map((c, i) => renderStepContent(c, i))}
                                </div>
                            </div>
                         </div>
                      ))}
                   </div>
                </>
            ) : (
                <div className="empty-state">Select a runbook to view details</div>
            )}
         </main>
      </div>
      {/* Image Lightbox */}
      {expandedImage && (
        <div className="image-lightbox" onClick={() => setExpandedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={expandedImage} alt="Expanded view" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setExpandedImage(null)}>×</button>
            <div className="lightbox-actions">
              <button 
                className="btn btn-secondary btn-small" 
                onClick={() => window.open(expandedImage)}
              >
                Open in new window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
