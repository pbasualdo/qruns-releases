import React, { useState } from 'react';
import './HelpModal.css';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'intro' | 'markdown' | 'json' | 'sources' | 'about'>('intro');

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
                        <button className={`help-nav-btn ${activeTab === 'json' ? 'active' : ''}`} onClick={() => setActiveTab('json')}>JSON Format</button>
                        <button className={`help-nav-btn ${activeTab === 'sources' ? 'active' : ''}`} onClick={() => setActiveTab('sources')}>Managing Sources</button>
                        <button className={`help-nav-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
                    </div>
                    <div className="help-content-area">
                        {activeTab === 'intro' && (
                            <div className="help-section">
                                <h3>Welcome to Quick Runbooks</h3>
                                <p>Quick Runbooks allows you to aggregate, view, and execute operational runbooks from multiple local folders or Git repositories.</p>
                                <p>You can write your runbooks in either <strong>Markdown</strong> (recommended for ease of writing) or <strong>JSON</strong> (for structured data).</p>
                            </div>
                        )}

                        {activeTab === 'markdown' && (
                            <div className="help-section">
                                <h3>Markdown Format (.md)</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <button 
                                        className="btn btn-secondary btn-small"
                                        onClick={() => window.electronAPI?.downloadTemplate('md')}
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

                        {activeTab === 'json' && (
                            <div className="help-section">
                                <h3>JSON Format (.json)</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <button 
                                        className="btn btn-secondary btn-small"
                                        onClick={() => window.electronAPI?.downloadTemplate('json')}
                                    >
                                        Download Template (.json)
                                    </button>
                                </div>
                                <p>JSON provides a strict structure, useful if you are generating runbooks programmatically.</p>
                                <div className="code-snippet">
<pre>{`{
  "id": "db-backup-manual",
  "title": "Manual Database Backup",
  "service": "IAAS",
  "category": "Database",
  "tags": ["sql", "backup"],
  "shortDescription": "Trigger a manual backup",
  "fullDescription": "Triggers a full backup of the primary SQL instance",
  "type": "qrun",
  "steps": [
    {
      "title": "Connect to Database",
      "content": [
        { "type": "text", "text": "Open SSMS and connect to the primary instance." },
        { "type": "code", "language": "sql", "code": "SELECT @@VERSION" }
      ]
    },
    {
      "title": "Execute Backup",
      "content": [
         { "type": "code", "language": "sql", "code": "BACKUP DATABASE [MyDB] TO DISK = 'NUL'" }
      ]
    }
  ]
}`}</pre>
                                </div>
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

                        {activeTab === 'about' && (
                            <div className="help-section">
                                <h3>About Quick Runbooks</h3>
                                <div className="about-card" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', marginTop: '1rem' }}>
                                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quick Runbooks</p>
                                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>v0.0.0</p>
                                    <p>A modern, efficient runbook executor for operations teams.</p>
                                    <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />
                                    <p><strong>Created by:</strong> Me</p>
                                    <p><strong>License:</strong> Private</p>
                                    <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                                        Built with React, Vite, and Electron.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
