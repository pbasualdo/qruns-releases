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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                   type="text" 
                   placeholder="https://github.com/user/repo.git"
                   value={url}
                   onChange={e => { setUrl(e.target.value); setStatus('IDLE'); }}
                   style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
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
                 <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.15)', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        🔒 <strong>Authentication Required</strong><br/>
                        This appears to be a private repository.
                    </p>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => handleClone(true)}
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Launch Interactive Terminal
                    </button>
                 </div>
            )}
            
            {status === 'ERROR' && (
                <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Error: {errorMsg}</p>
            )}
            
            {status === 'IDLE' && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
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
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        ))}
                        {sources.length === 0 && <div className="empty-sources">No sources configured.</div>}
                    </div>

                    <div className="clone-section" style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                         <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Clone from URL</h3>
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
                    <button className="btn btn-secondary" onClick={handleAdd}>+ Add Folder</button>
                    <button className="btn btn-primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </div>
    );
};
