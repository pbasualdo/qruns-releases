import React, { useState, useEffect } from 'react';
import './SettingsModal.css';
import { useTheme } from '../context/ThemeContext';
import { type CategoryConfig } from '../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
}

// Helper Component for Clone Logic
const CloneSection: React.FC<{ onClone: (url: string, interactive: boolean) => Promise<{ success: boolean; error?: string }> }> = ({ onClone }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'IDLE' | 'CLONING' | 'ERROR' | 'AUTH_REQUIRED'>('IDLE');
    const [errorMsg, setErrorMsg] = useState('');

    const handleClone = async (interactive: boolean) => {
        if (!url) return;
        setStatus('CLONING');
        const res = await onClone(url, interactive);
        if (res.success) {
            setStatus('IDLE');
            setUrl('');
            if (interactive) alert('Clone successful. You may close the terminal.');
        } else {
            console.error(res.error);
            if (res.error === 'AUTH_FAILED' && !interactive) {
                setStatus('AUTH_REQUIRED');
            } else {
                setStatus('ERROR');
                setErrorMsg(res.error || 'Unknown error');
            }
        }
    };

    return (
        <div className="settings-card clone-card">
            <h4>Clone Git Repository</h4>
            <p className="text-tertiary">Download a remote repository into your local sources.</p>
            
            <div className="clone-form mt-1">
                <input 
                   type="text" 
                   placeholder="https://github.com/user/repo.git"
                   value={url}
                   onChange={e => { setUrl(e.target.value); setStatus('IDLE'); }}
                   className="search-input"
                   onKeyDown={e => { if (e.key === 'Enter') handleClone(false); }}
                   disabled={status === 'CLONING'}
                />
                <button 
                  onClick={() => handleClone(false)} 
                  disabled={status === 'CLONING' || !url}
                  className="btn btn-primary"
                >
                    {status === 'CLONING' ? 'Cloning...' : 'Clone'}
                </button>
            </div>

            {status === 'AUTH_REQUIRED' && (
                 <div className="alert alert-warning mt-1">
                    <div className="alert-content">
                        <strong>Authentication Required</strong>
                        <p>This repository requires a login. We can open an interactive terminal for you.</p>
                        <button 
                            className="btn btn-secondary btn-small mt-05" 
                            onClick={() => handleClone(true)}
                        >
                            Launch Terminal
                        </button>
                    </div>
                 </div>
            )}
            
            {status === 'ERROR' && (
                <div className="error-message mt-05">Error: {errorMsg}</div>
            )}
        </div>
    );
};

    export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onUpdate }) => {
    const [activeTab, setActiveTab] = useState<'general' | 'display' | 'sources' | 'categories'>('general');
    const { viewMode, setViewMode, uiScale, setUIScale } = useTheme();
    const [owners, setOwners] = useState<string[]>([]);
    const [newOwner, setNewOwner] = useState('');
    const [sources, setSources] = useState<string[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);

    // Categories State
    const [categories, setCategories] = useState<CategoryConfig[]>([]);
    const [newCatName, setNewCatName] = useState('');
    const [newCatSVG, setNewCatSVG] = useState('');
    const [newCatColor, setNewCatColor] = useState('');

    // Icon Search State
    const [iconQuery, setIconQuery] = useState('');
    const [iconResults, setIconResults] = useState<string[]>([]);
    const [isSearchingIcons, setIsSearchingIcons] = useState(false);

    useEffect(() => {
        if (isOpen && window.electronAPI) {
            window.electronAPI.getAppConfig().then(config => {
                if (config.owners) setOwners(config.owners);
                if (config.categories) setCategories(config.categories);
            });
            window.electronAPI.getSources().then(setSources);
        }
    }, [isOpen]);

    // -- Owner Handlers --
    const handleAddOwner = () => {
        if (newOwner.trim() && !owners.includes(newOwner.trim())) {
            const updated = [...owners, newOwner.trim()];
            setOwners(updated);
            setNewOwner('');
            saveOwners(updated);
        }
    };

    const handleRemoveOwner = (owner: string) => {
        const updated = owners.filter(o => o !== owner);
        setOwners(updated);
        saveOwners(updated);
    };

    const saveOwners = (updatedOwners: string[]) => {
        if (window.electronAPI) {
            window.electronAPI.setAppConfig({ owners: updatedOwners });
        }
    };

    // -- Source Handlers --
    const handleAddSource = async () => {
        if (window.electronAPI) {
            const result = await window.electronAPI.addSource();
            if (result.success && result.sources) {
                setSources(result.sources);
                onUpdate();
            }
        }
    };

    const handleRemoveSource = async (path: string) => {
        if (window.electronAPI) {
            const result = await window.electronAPI.removeSource(path);
            if (result.success && result.sources) {
                setSources(result.sources);
                onUpdate();
            }
        }
    };

    const handleSync = async () => {
        if (window.electronAPI) {
            setIsSyncing(true);
            try {
                const result = await window.electronAPI.refreshSources();
                if (result.success) {
                    const changes = result.results?.filter(r => r.success && r.output && !r.output.includes('Already up to date.'));
                    let msg = changes && changes.length > 0 
                        ? `Sync completed. Updated ${changes.length} sources.` 
                        : 'Sync completed. All sources up to date.';
                    alert(msg);
                    onUpdate();
                } else {
                    alert('Sync failed: ' + result.error);
                }
            } catch (err) {
                alert('Error syncing sources: ' + (err as Error).message);
            } finally {
                setIsSyncing(false);
            }
        }
    };

    const handleInstallTemplates = async () => {
        if (window.electronAPI) {
            if (confirm("Install example templates? This will copy default runbooks to your first source folder.")) {
                const res = await window.electronAPI.installExamples();
                if (res.success) {
                    alert(`Installed ${res.count} examples.`);
                    onUpdate();
                } else {
                    alert('Error: ' + res.error);
                }
            }
        }
    };

    // -- Icon Search Handlers --
    const handleSearchIcons = async () => {
        if (!iconQuery.trim()) return;
        setIsSearchingIcons(true);
        try {
            const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(iconQuery)}&limit=32`);
            const data = await response.json();
            setIconResults(data.icons || []);
        } catch (err) {
            console.error('Error searching icons:', err);
        } finally {
            setIsSearchingIcons(false);
        }
    };

    const handleSelectIcon = async (iconName: string) => {
        try {
            const response = await fetch(`https://api.iconify.design/${iconName}.svg`);
            const svgText = await response.text();
            // Extract the inner content of the SVG tag (between <svg ...> and </svg>)
            const match = svgText.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
            if (match && match[1]) {
                setNewCatSVG(match[1].trim());
            } else {
                // Fallback if regex fails, though Iconify SVGs are standard
                setNewCatSVG(svgText);
            }
        } catch (err) {
            console.error('Error fetching icon SVG:', err);
        }
    };

    const handleAddCategory = () => {
        if (!newCatName.trim()) return;
        const updated = [...categories, { name: newCatName.trim(), svg: newCatSVG, color: newCatColor }];
        setCategories(updated);
        setNewCatName('');
        setNewCatSVG('');
        setNewCatColor('');
        saveCategories(updated);
    };

    const handleRemoveCategory = (name: string) => {
        if (categories.length <= 1) {
            alert("You must keep at least one category.");
            return;
        }
        const updated = categories.filter(c => c.name !== name);
        setCategories(updated);
        saveCategories(updated);
    };

    const saveCategories = (updated: CategoryConfig[]) => {
        if (window.electronAPI) {
            window.electronAPI.setAppConfig({ categories: updated });
            onUpdate(); // Trigger refresh in parent
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="settings-window" onClick={e => e.stopPropagation()}>
                <header className="settings-header">
                    <div className="title-area">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        <h2>Application Settings</h2>
                    </div>
                    <button className="settings-close" onClick={onClose}>×</button>
                </header>

                <div className="settings-shell">
                    <nav className="settings-nav">
                        <button 
                            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <span className="nav-icon">👤</span>
                            <span className="nav-label">General</span>
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'display' ? 'active' : ''}`}
                            onClick={() => setActiveTab('display')}
                        >
                            <span className="nav-icon">🎨</span>
                            <span className="nav-label">Display</span>
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'sources' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sources')}
                        >
                            <span className="nav-icon">📂</span>
                            <span className="nav-label">Sources</span>
                        </button>
                        <button 
                            className={`nav-item ${activeTab === 'categories' ? 'active' : ''}`}
                            onClick={() => setActiveTab('categories')}
                        >
                            <span className="nav-icon">🏷️</span>
                            <span className="nav-label">Categories</span>
                        </button>
                    </nav>

                    <main className="settings-content">
                        {activeTab === 'general' && (
                            <div className="tab-pane">
                                <div className="pane-header">
                                    <h3>General Configuration</h3>
                                    <p className="text-tertiary">Global settings for the runbook engine.</p>
                                </div>
                                
                                <div className="settings-card mt-1">
                                    <h4>Step Owners</h4>
                                    <p className="text-tertiary">Manage the users or groups that can own a runbook step.</p>
                                    
                                    <div className="owner-editor mt-1">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="search-input" 
                                                placeholder="Add owner (e.g. SRE, DevOps)..." 
                                                value={newOwner}
                                                onChange={e => setNewOwner(e.target.value)}
                                                onKeyPress={e => e.key === 'Enter' && handleAddOwner()}
                                            />
                                            <button className="btn btn-primary" onClick={handleAddOwner}>Add</button>
                                        </div>
                                        
                                        <div className="tag-gallery mt-1">
                                            {owners.map(owner => (
                                                <div key={owner} className="settings-tag">
                                                    <span>{owner}</span>
                                                    <button className="remove-tag" onClick={() => handleRemoveOwner(owner)}>×</button>
                                                </div>
                                            ))}
                                            {owners.length === 0 && <p className="empty-msg">No owners defined.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'display' && (
                            <div className="tab-pane">
                                <div className="pane-header">
                                    <h3>Display & Interface</h3>
                                    <p className="text-tertiary">Customize how the runbooks and interface looks.</p>
                                </div>

                                <div className="settings-card mt-1">
                                    <h4>List Visualization</h4>
                                    <p className="text-tertiary">Select how much information to show in the sidebar list.</p>
                                    <div className="view-mode-selector mt-1">
                                        {(['super-compact', 'compact', 'comfortable', 'detailed'] as const).map(mode => (
                                            <button 
                                                key={mode}
                                                className={`selector-btn ${viewMode === mode ? 'active' : ''}`}
                                                onClick={() => setViewMode(mode)}
                                            >
                                                {mode.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="settings-card mt-1">
                                    <h4>GUI Scaling</h4>
                                    <p className="text-tertiary">Reduce the size of the interface for high-density screens.</p>
                                    <div className="view-mode-selector mt-1">
                                        {(['normal', 'compact'] as const).map(scale => (
                                            <button 
                                                key={scale}
                                                className={`selector-btn ${uiScale === scale ? 'active' : ''}`}
                                                onClick={() => setUIScale(scale)}
                                            >
                                                {scale === 'normal' ? 'Normal (Default)' : 'Compact (Reduced)'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sources' && (
                            <div className="tab-pane">
                                <div className="pane-header">
                                    <h3>Library Sources</h3>
                                    <p className="text-tertiary">Connect local folders or remote repositories.</p>
                                </div>
                                
                                <div className="settings-card mt-1">
                                    <div className="card-header-flex">
                                        <h4>Local Folders</h4>
                                        <button className="btn btn-secondary btn-small" onClick={handleAddSource}>+ Add Folder</button>
                                    </div>
                                    <div className="sources-list mt-1">
                                        {sources.map(src => (
                                            <div key={src} className="source-row">
                                                <div className="source-info">
                                                    <span className="source-icon">📁</span>
                                                    <span className="source-path" title={src}>{src}</span>
                                                </div>
                                                <button className="btn-icon-danger" onClick={() => handleRemoveSource(src)} title="Remove Source">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path></svg>
                                                </button>
                                            </div>
                                        ))}
                                        {sources.length === 0 && <p className="empty-msg">No local sources configured.</p>}
                                    </div>
                                </div>

                                <CloneSection onClone={async (url, interactive) => {
                                    if (window.electronAPI) {
                                        const result = await window.electronAPI.cloneRepository(url, { interactive });
                                        if (result.success && result.sources) {
                                            setSources(result.sources);
                                            onUpdate();
                                            return { success: true };
                                        } else {
                                            return { success: false, error: result.error };
                                        }
                                    }
                                    return { success: false, error: "Electron unavailable" };
                                }} />

                                <div className="settings-card mt-1">
                                    <h4>Starter Templates</h4>
                                    <p className="text-tertiary">New to runbooks? Populate your library with production-ready examples for SQL, Network, HR, and more.</p>
                                    <div className="mt-1">
                                        <button className="btn btn-secondary btn-small" onClick={handleInstallTemplates}>Install Starter Library</button>
                                    </div>
                                </div>

                                <div className="mt-2 pt-1 border-top">
                                    <button className="btn btn-secondary" onClick={handleSync} disabled={isSyncing}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-6"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5 1.55a9 9 0 0 0 13.9 4.95"></path></svg>
                                        {isSyncing ? 'Syncing...' : 'Force Sync All Sources'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'categories' && (
                            <div className="tab-pane">
                                <div className="pane-header">
                                    <h3>Category Management</h3>
                                    <p className="text-tertiary">Define operational categories and their visual markers.</p>
                                </div>

                                <div className="settings-card mt-1">
                                    <h4>Add New Category</h4>
                                    <div className="category-editor-form mt-1">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="search-input" 
                                                placeholder="Name (e.g. Kubernetes)..." 
                                                value={newCatName}
                                                onChange={e => setNewCatName(e.target.value)}
                                            />
                                            <input 
                                                type="text" 
                                                className="search-input color-input" 
                                                placeholder="Color (optional)..." 
                                                value={newCatColor}
                                                onChange={e => setNewCatColor(e.target.value)}
                                            />
                                        </div>
                                        <textarea 
                                            className="search-input svg-textarea" 
                                            placeholder="SVG Content (e.g. <path d='...' />)"
                                            value={newCatSVG}
                                            onChange={e => setNewCatSVG(e.target.value)}
                                        />
                                        <button className="btn btn-primary" onClick={handleAddCategory} disabled={!newCatName.trim()}>
                                            Add Category
                                        </button>
                                    </div>

                                    <div className="icon-search-section mt-1 pt-1 border-top">
                                        <h5>Import Icon (Iconify)</h5>
                                        <div className="input-group mt-05">
                                            <input 
                                                type="text" 
                                                className="search-input" 
                                                placeholder="Search icons (e.g. cloud, database)..." 
                                                value={iconQuery}
                                                onChange={e => setIconQuery(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Enter') handleSearchIcons(); }}
                                            />
                                            <button className="btn btn-secondary" onClick={handleSearchIcons} disabled={isSearchingIcons}>
                                                {isSearchingIcons ? '...' : 'Search'}
                                            </button>
                                        </div>

                                        {iconResults.length > 0 && (
                                            <div className="icon-results-grid mt-1">
                                                {iconResults.map(iconName => (
                                                    <div 
                                                        key={iconName} 
                                                        className="icon-result-item" 
                                                        onClick={() => handleSelectIcon(iconName)}
                                                        title={iconName}
                                                    >
                                                        <img 
                                                            src={`https://api.iconify.design/${iconName}.svg`} 
                                                            alt={iconName} 
                                                            style={{ width: '20px', height: '20px' }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="settings-card mt-1">
                                    <h4>Configured Categories</h4>
                                    <div className="sources-list categories-scroll-list mt-1">
                                        {categories.map(cat => (
                                            <div key={cat.name} className="source-row">
                                                <div className="source-info">
                                                    <div className="cat-preview-icon">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={cat.color || "currentColor"} strokeWidth="2" dangerouslySetInnerHTML={{ __html: cat.svg }} />
                                                    </div>
                                                    <span className="source-path text-bold">{cat.name}</span>
                                                </div>
                                                <button className="btn-icon-danger" onClick={() => handleRemoveCategory(cat.name)} title="Remove Category">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>

                <footer className="settings-footer">
                    <button className="btn btn-primary" onClick={onClose}>Done</button>
                </footer>
            </div>
        </div>
    );
};
