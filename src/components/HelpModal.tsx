import React, { useState } from 'react';
import './HelpModal.css';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'intro' | 'markdown' | 'sources' | 'security' | 'updates' | 'about'>('intro');
    const [appVersion, setAppVersion] = useState<string>('');
    const [changelog, setChangelog] = useState<string>('');

    React.useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.getAppVersion().then(v => setAppVersion(v));
            window.electronAPI.getChangelog().then((c: string) => setChangelog(c));
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="help-modal-overlay" onClick={onClose}>
            <div className="help-modal-content" onClick={e => e.stopPropagation()}>
                <div className="help-modal-header">
                    <h2>Documentation</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="help-body">
                    <div className="help-sidebar">
                        <button className={`help-nav-btn ${activeTab === 'intro' ? 'active' : ''}`} onClick={() => setActiveTab('intro')}>Introduction</button>
                        <button className={`help-nav-btn ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>Markdown Format</button>
                        <button className={`help-nav-btn ${activeTab === 'sources' ? 'active' : ''}`} onClick={() => setActiveTab('sources')}>Managing Sources</button>
                        <button className={`help-nav-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security & Privacy</button>
                        <button className={`help-nav-btn ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>Update Log</button>
                        <button className={`help-nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
                    </div>
                    <div className="help-content-area">
                        {activeTab === 'intro' && (
                            <div className="help-section">
                                <h3>Welcome to IT Quick Runbooks</h3>
                                <p>IT Quick Runbooks allows you to aggregate, view, and execute operational runbooks from multiple local folders or Git repositories.</p>
                                <p>All runbooks are written in <strong>Markdown</strong>, making them easy to read, write, and version control.</p>
                            </div>
                        )}

                        {activeTab === 'markdown' && (
                            <div className="help-section">
                                <h3>Markdown Format (.md)</h3>
                                <div className="help-intro-header">
                                    <button 
                                        className="btn btn-secondary btn-small"
                                        onClick={() => window.electronAPI?.downloadTemplate()}
                                    >
                                        Download Template (.md)
                                    </button>
                                </div>
                                <p>Markdown files are the easiest way to write runbooks. They use YAML Frontmatter for metadata and standard headers for steps.</p>
                                
                                <div className="code-snippet">
<pre>{`---
title: Restart Application Service
id: restart-app-service
service: IAAS
category: Compute
tags: [service, restart, production]
shortDescription: Safely restarts the main web service.
fullDescription: This runbook details the procedure to restart the web service with zero downtime.
type: qrun
---

## Stop Load Balancer Traffic

First, drain connections from the load balancer.

\`\`\`bash
# Example Command
az network lb address-pool address remove ...
\`\`\`

## Restart Service

Restart the systemd service unit.

\`\`\`bash
sudo systemctl restart my-app.service
\`\`\`

## Verify Health

Check the health endpoint.

\`\`\`bash
curl -I http://localhost:8080/health
\`\`\`
`}</pre>
                                </div>
                                <p><strong>Key Rules:</strong></p>
                                <ul>
                                    <li>Use <code>---</code> to enclose the metadata at the top.</li>
                                    <li>Use <code>## Header 2</code> for each new step title.</li>
                                    <li>Code blocks <code>```</code> are automatically formatted as copyable widgets.</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'sources' && (
                            <div className="help-section">
                                <h3>Managing Sources</h3>
                                <p>You can load runbooks from multiple locations.</p>
                                <h4>1. Local Folders</h4>
                                <p>Click the <strong>Folder Icon</strong> in the header and select "Add Local Folder". This is great for private runbooks stored on your machine.</p>
                                
                                <h4>2. Git Repositories</h4>
                                <p>You can clone repositories directly into the app:</p>
                                <ol>
                                    <li>Open the Sources Manager.</li>
                                    <li>Paste the Git HTTPS URL (e.g., <code>https://github.com/org/repo.git</code>).</li>
                                    <li>If it's a <strong>Public</strong> repo, just hit Enter.</li>
                                    <li>If it's a <strong>Private</strong> repo, click "Cloning" and if it fails, use the <strong>"Launch Interactive Terminal"</strong> button to authenticate securely.</li>
                                </ol>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="help-section">
                                <h3>Security & Data Management</h3>
                                
                                <div className="security-item">
                                    <h4>🔒 Data Locality</h4>
                                    <p>Your runbooks, configuration, and credentials never leave your machine. All data is stored locally in your Application Data folder.</p>
                                </div>

                                <div className="security-item">
                                    <h4>🌐 Network Isolation</h4>
                                    <p>The application only makes outbound connections to:</p>
                                    <ul>
                                        <li><strong>Iconify API</strong>: To fetch category icons during configuration.</li>
                                        <li><strong>Git Providers</strong>: Only for repositories you explicitly add as sources.</li>
                                    </ul>
                                </div>

                                <div className="security-item">
                                    <h4>🛡️ Privacy First</h4>
                                    <p>There is <strong>no telemetry, no tracking, and no hidden data collection</strong>. What you do in the app is entirely private.</p>
                                </div>

                                <div className="security-item">
                                    <h4>📂 Source Integrity</h4>
                                    <p>Runbooks are stored and displayed as Markdown data. The application <strong>does not execute any scripts</strong>. It provides a structured viewer for your procedures and snippets, ensuring a safe and transparent environment.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'updates' && (
                            <div className="help-section">
                                <h3>Update Log</h3>
                                <p>Stay up to date with the latest features and fixes.</p>
                                <div className="changelog-container">
                                    {changelog.split('\n').map((line, i) => {
                                        if (line.startsWith('## [')) {
                                            return <h4 key={i} className="changelog-version">{line.replace('## ', '')}</h4>;
                                        }
                                        if (line.startsWith('### ')) {
                                            return <h5 key={i} className="changelog-type">{line.replace('### ', '')}</h5>;
                                        }
                                        if (line.startsWith('- ')) {
                                            return <div key={i} className="changelog-item">{line}</div>;
                                        }
                                        if (line.trim() === '') return <br key={i} />;
                                        return <p key={i} className="changelog-text">{line}</p>;
                                    })}
                                </div>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="help-section">
                                <h3>About IT Quick Runbooks</h3>
                                <div className="about-card">
                                    <p className="about-title">IT Quick Runbooks</p>
                                    <p className="about-version">v{appVersion || '...'}</p>
                                    <p>A modern, efficient runbook executor for operations teams.</p>
                                    <hr className="about-divider" />
                                    <p><strong>Created by:</strong> Pablo E. Basualdo</p>
                                    <p><strong>License:</strong> Private</p>
                                    <p className="about-footer">
                                        Built with React, Vite, and Electron.
                                    </p>
                                    <div className="about-actions mt-1">
                                        <button 
                                            className="btn btn-primary feedback-btn"
                                            onClick={() => window.open('https://github.com/pbasualdo/qruns-releases/issues', '_blank')}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                            Leave Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
