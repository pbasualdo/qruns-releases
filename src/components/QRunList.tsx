import React, { useState, useRef, useEffect } from 'react';
import { mockQRuns } from '../data/mockQRuns';
import type { QRun, QRunStep } from '../types';
import { RunbookEditor } from './RunbookEditor';
import { useTheme, ACCENTS, type AccentColor } from '../context/ThemeContext';
import './QRunList.css';
import { SourcesModal } from './SourcesModal';
import { HelpModal } from './HelpModal';

export const QRunList: React.FC = () => {
  const { theme, toggleTheme, accent, setAccent } = useTheme();
  
  // -- Data State --
  const [runbooks, setRunbooks] = useState<QRun[]>([]);
  
  // -- View State --
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'IAAS' | 'PAAS'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [availableSources, setAvailableSources] = useState<string[]>([]);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  // -- Editor State --
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // -- Update State --
  const [updateStatus, setUpdateStatus] = useState<string | null>(null); // 'available', 'downloading', 'ready', 'error'
  const [updateInfo, setUpdateInfo] = useState<any>(null);

    const [appVersion, setAppVersion] = useState<string>('');

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    }, [selectedRunId]);

    React.useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.getAppVersion().then(v => setAppVersion(v));
        }
    }, []);

  // -- Load Data --
  const loadRunbooks = async () => {
    if (window.electronAPI) {
      try {
        const [loadedRuns, sources] = await Promise.all([
            window.electronAPI.getRunbooks(),
            window.electronAPI.getSources()
        ]);
        setRunbooks(loadedRuns);
        setAvailableSources(sources);
        if (window.electronAPI) {
           window.electronAPI.appReady();
           setTimeout(() => {
                window.electronAPI.checkForUpdates();
           }, 5000);
        }
      } catch (e) {
        console.error("Failed to load runbooks/sources from Electron", e);
      }
    } else {
      setRunbooks(mockQRuns);
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

  const selectedRun = runbooks.find(r => r.id === selectedRunId);
  const uniqueTags = Array.from(new Set(runbooks.flatMap(r => r.tags || []))).sort();

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

  const handleCancel = () => {
    setIsEditing(false);
    setIsCreating(false);
  };

  // -- Render Helpers --
  const renderIcon = (category: string) => {
      // Icon depends on CATEGORY (Database, Network, etc)
      const cat = (category || '').toLowerCase();
      switch(cat) {
          case 'alert': 
             return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2"><polygon points="12 2 2 22 22 22 12 2"></polygon><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
          case 'database':
             return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2"><path d="M7 21h10a2 2 0 0 0 2-2V9.437a2 2 0 0 0-.611-1.432l-9.009-9.009A2 2 0 0 0 7.962 1H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path></svg>;
          case 'network':
             return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line></svg>;
          case 'compute':
             return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
          default:
             return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>;
      }
  };

  const renderStepContent = (content: QRunStep['content'][0], idx: number) => {
    if (content.type === 'code') {
        return (
            <div key={idx} className="code-block">
                <div className="code-header">
                    <span className="lang-badge">{content.language.toUpperCase()}</span>
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(content.code)}>Copy</button>
                </div>
                <pre><code>{content.code}</code></pre>
            </div>
        );
    }
    if (content.type === 'list') {
        return <ul key={idx} className="pl-4">{content.items.map((it, i) => <li key={i}>{it}</li>)}</ul>;
    }
    return <p key={idx}>{content.text}</p>;
  };

  return (
    <div className="app-shell">
      {/* 1. Global Header */}
      <header className="app-header">
        <div className="brand-area">
          <span className="logo-icon">⚡</span>
          <h1>Quick Runbooks</h1>
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
            <button className="icon-btn" title="Manage Sources" onClick={() => {
                if (window.electronAPI) {
                    setIsSourcesModalOpen(true);
                } else {
                    alert('Sources management is only available in the Electron app.');
                }
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            </button>
           <button className="icon-btn" title="Help / Guide" onClick={() => setIsHelpOpen(true)}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
           </button>
        </div>
      </header>
      
      <SourcesModal 
        isOpen={isSourcesModalOpen} 
        onClose={() => setIsSourcesModalOpen(false)} 
        onUpdate={loadRunbooks}
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      {showInstallPrompt && (
          <div className="modal-overlay">
              <div className="modal-content" style={{maxWidth: '400px'}}>
                  <div className="modal-header">
                      <h2>Welcome to Quick Runbooks!</h2>
                  </div>
                  <div className="modal-body">
                      <p>Do you want to install a set of <strong>example templates</strong> (SQL, Network, HR, etc.) to help you get started?</p>
                      <p className="text-tertiary text-small">You can always install them later from 'Manage Sources'.</p>
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
                  <button className={`filter-btn ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveFilter('ALL')}>ALL</button>
                  <button className={`filter-btn ${activeFilter === 'IAAS' ? 'active' : ''}`} onClick={() => setActiveFilter('IAAS')}>IAAS</button>
                  <button className={`filter-btn ${activeFilter === 'PAAS' ? 'active' : ''}`} onClick={() => setActiveFilter('PAAS')}>PAAS</button>
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

            <div className="run-list-container">
               {filteredRuns.map(run => (
                  <button 
                    key={run.id}
                    className={`run-list-item ${selectedRunId === run.id ? 'selected' : ''}`}
                    onClick={() => { setSelectedRunId(run.id); setIsEditing(false); setIsCreating(false); }}
                  >
                     <div className="item-title">{run.title}</div>
                     <div className="item-meta">
                        {renderIcon(run.category)}
                        <span className="item-badge">{run.category}</span>
                        <span className="item-desc">{run.shortDescription}</span>
                     </div>
                  </button>
               ))}
               {filteredRuns.length === 0 && <div className="empty-state">No results</div>}
            </div>

            <div className="sidebar-footer">
                <div className="copyright">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                        <span>© 2026 Quick Runbooks</span>
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
                <RunbookEditor initialData={selectedRun} onSave={handleSave} onCancel={handleCancel} />
            ) : selectedRun ? (
                <>
                   <div className="view-header">
                      <div className="view-header-top">
                         <div className="title-group">
                            <h2>{selectedRun.title}</h2>
                            <div className="flex-row gap-05 mt-05">
                               <span className="item-badge text-small">{selectedRun.service}</span>
                               <span className="item-badge text-small" style={{background: 'var(--bg-tertiary)', color: 'var(--text-secondary)'}}>{selectedRun.category}</span>
                               <span className="text-tertiary">| {selectedRun.fullDescription}</span>
                               <span className="status-badge" style={{marginLeft: 'auto', background: 'var(--bg-tertiary)', color: 'var(--text-tertiary)'}}>
                                 {selectedRun.format === 'md' ? 'MARKDOWN' : 'JSON'}
                               </span>
                            </div>
                         </div>
                         <div className="view-actions">
                            <button className="btn btn-secondary" onClick={() => handleEdit()}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                Edit
                            </button>
                            <button className="btn btn-secondary" onClick={handleRefresh}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5 1.55a9 9 0 0 0 13.9 4.95"></path></svg>
                                Refresh
                            </button>
                         </div>
                      </div>
                       <div className="flex-row gap-05">
                          {selectedRun.tags.map(t => <span key={t} className="item-badge">{t}</span>)}
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
    </div>
  );
};
