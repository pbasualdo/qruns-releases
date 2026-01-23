import React, { useState, useEffect } from 'react';
import './SourcesModal.css';

interface SourcesModalProps {
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
        <div>
            <div className="clone-input-container">
                <input 
                   type="text" 
                   placeholder="https://github.com/user/repo.git"
                   value={url}
                   onChange={e => { setUrl(e.target.value); setStatus('IDLE'); }}
                   className="clone-input"
                   onKeyDown={e => { if (e.key === 'Enter') handleClone(false); }}
                   disabled={status === 'CLONING'}
                />
                <button 
                  onClick={() => handleClone(false)} 
                  disabled={status === 'CLONING' || !url}
                  className="btn btn-primary"
                >
                    {status === 'CLONING' ? '...' : 'Clone'}
                </button>
            </div>

            {status === 'AUTH_REQUIRED' && (
                 <div className="auth-required-box">
                    <p className="auth-required-text">
                        🔒 <strong>Authentication Required</strong><br/>
                        This appears to be a private repository.
                    </p>
                    <button 
                        className="btn btn-secondary btn-full" 
                        onClick={() => handleClone(true)}
                    >
                        Launch Interactive Terminal
                    </button>
                 </div>
            )}
            
            {status === 'ERROR' && (
                <p className="error-text">Error: {errorMsg}</p>
            )}
            
            {status === 'IDLE' && (
                <p className="help-text">
                   Supports public and private (interactive) repositories.
                </p>
            )}
        </div>
    );
};

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose, onUpdate }) => {
    const [sources, setSources] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen && window.electronAPI) {
            window.electronAPI.getSources().then(setSources);
        }
    }, [isOpen]);

    const handleAdd = async () => {
        if (window.electronAPI) {
            const result = await window.electronAPI.addSource();
            if (result.success && result.sources) {
                setSources(result.sources);
                onUpdate();
            }
        }
    };

    const handleRemove = async (path: string) => {
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
            const btn = document.getElementById('sync-btn');
            if (btn) btn.textContent = 'Syncing...';
            
            try {
                if (!window.electronAPI.refreshSources) {
                    throw new Error("refreshSources API not found. Please restart the application.");
                }
                const result = await window.electronAPI.refreshSources();
                
                if (result.success) {
                    const changes = result.results?.filter(r => r.success && r.output && !r.output.includes('Already up to date.'));
                    const errors = result.results?.filter(r => !r.success);
                    
                    let msg = 'Sync completed.';
                    if (changes && changes.length > 0) {
                        msg += ` Updated ${changes.length} sources.`;
                    } else {
                        msg += ' All sources up to date.';
                    }
                    
                    if (errors && errors.length > 0) {
                        msg += `\nErrors in ${errors.length} sources.`;
                    }
                    
                    alert(msg);
                    onUpdate(); // Reload if needed
                } else {
                    alert('Sync failed: ' + result.error);
                }
            } catch (err) {
                console.error(err);
                alert('Error syncing sources: ' + (err as Error).message);
            } finally {
                if (btn) btn.textContent = 'Sync Sources';
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Manage Sources</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <p className="modal-desc">Add folders containing runbooks (.json or .md). The app will aggregate them all.</p>
                    
                    <div className="sources-list">
                        {sources.map(src => (
                            <div key={src} className="source-item">
                                <span className="source-path" title={src}>{src}</span>
                                <button className="remove-source-btn" onClick={() => handleRemove(src)} title="Remove source">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"></path></svg>
                                </button>
                            </div>
                        ))}
                        {sources.length === 0 && <div className="empty-sources">No sources configured.</div>}
                    </div>

                    <div className="clone-section">
                         <h3>Clone from URL</h3>
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
                             return { success: false, error: "Electron API unavailable" };
                         }} />
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="footer-group">
                        <button id="sync-btn" className="btn btn-secondary" onClick={handleSync} title="Git Pull on all sources">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px' }}><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l5 1.55a9 9 0 0 0 13.9 4.95"></path></svg>
                            Sync Sources
                        </button>
                        <button className="btn btn-secondary" onClick={async () => {
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
                        }}>
                             Install Templates
                        </button>
                    </div>
                    <div className="footer-group">
                        <button className="btn btn-secondary" onClick={handleAdd}>+ Add Folder</button>
                        <button className="btn btn-primary" onClick={onClose}>Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
