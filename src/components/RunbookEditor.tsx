import React, { useState } from 'react';
import type { QRun } from '../types';
import './RunbookEditor.css';
import './QRunList.css';

interface RunbookEditorProps {
  initialData?: Partial<QRun>;
  onSave: (run: QRun) => void;
  onCancel: () => void;
  sources?: string[];
}

export const RunbookEditor: React.FC<RunbookEditorProps> = ({ initialData, onSave, onCancel, sources = [] }) => {
  const [formData, setFormData] = useState<Partial<QRun>>(initialData || {
    title: '',
    shortDescription: '',
    fullDescription: '',
    service: 'IAAS',
    category: 'Alert',
    type: 'qrun',
    tags: [],
    steps: []
  });

  // Safe navigation for tags
  const [tagInput, setTagInput] = useState<string>((formData.tags || []).join(', '));
  const [targetSource, setTargetSource] = useState<string>(sources[0] || '');

  const handleTagsChange = (value: string) => {
    setTagInput(value);
    const tags = value.split(',').map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...(prev.steps || []), { title: '', content: [] }]
    }));
  };

  const updateStepTitle = (index: number, title: string) => {
    const newSteps = [...(formData.steps || [])];
    newSteps[index] = { ...newSteps[index], title };
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addContent = (stepIndex: number, type: 'text' | 'code') => {
    const newSteps = [...(formData.steps || [])];
    const newContent = type === 'text' 
      ? { type: 'text' as const, text: '' }
      : { type: 'code' as const, language: 'sql', code: '' };
    
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      content: [...newSteps[stepIndex].content, newContent]
    };
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const updateStepContent = (stepIndex: number, contentIndex: number, value: string, field: 'text' | 'code' = 'text') => {
    const newSteps = [...(formData.steps || [])];
    const item = newSteps[stepIndex].content[contentIndex];
    
    if (item.type === 'text') {
      newSteps[stepIndex].content[contentIndex] = { ...item, text: value };
    } else if (item.type === 'code') {
      newSteps[stepIndex].content[contentIndex] = { ...item, [field]: value };
    }
    
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };
  
  const removeStep = (index: number) => {
      setFormData(prev => ({
          ...prev, 
          steps: prev.steps?.filter((_, i) => i !== index)
      }))
  }

  const removeContent = (stepIndex: number, contentIndex: number) => {
      const newSteps = [...(formData.steps || [])];
      newSteps[stepIndex].content = newSteps[stepIndex].content.filter((_, i) => i !== contentIndex);
      setFormData(prev => ({ ...prev, steps: newSteps }));
  }

  const handleSave = () => {
    if (!formData.title || !formData.category || !formData.service) {
        alert("Title, Service, and Category are required.");
        return;
    }
    
    const newRun: QRun = {
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      shortDescription: formData.shortDescription || '',
      fullDescription: formData.fullDescription || '',
      service: formData.service as 'IAAS' | 'PAAS' | 'SAAS',
      category: formData.category as 'Database' | 'Network' | 'Compute' | 'Alert',
      type: 'qrun', // Force strict type
      tags: formData.tags || [],
      steps: formData.steps || [],
      sourcePath: initialData ? initialData.sourcePath : targetSource
    };
    
    onSave(newRun);
  };

  return (
      <div className="editor-container">
          {/* Top Actions (Minimal) */}
          <div className="editor-header-sticky">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {!initialData && sources.length > 0 && (
                      <div className="source-selector">
                          <label style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>Save to:</label>
                          <select 
                            value={targetSource} 
                            onChange={(e) => setTargetSource(e.target.value)}
                            style={{ 
                                background: 'var(--bg-tertiary)', 
                                border: '1px solid var(--border-color)', 
                                color: 'var(--text-primary)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}
                          >
                              {sources.map(s => <option key={s} value={s}>{s.split(/[/\\]/).pop()}</option>)}
                          </select>
                      </div>
                  )}
              </div>
              <div className="editor-actions">
                  <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
              </div>
          </div>

          <div className="editor-scroll-area">
              
              {/* DOCUMENT TITLE */}
              <input
                type="text"
                className="doc-title-input"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Untitled Runbook"
                autoFocus
              />

              {/* DOCUMENT METADATA (Pills) */}
              <div className="doc-meta-row">
                  <div className="meta-pill">
                      <span className="meta-label">Service:</span>
                      <select 
                        className="meta-input-transparent"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value as 'IAAS' | 'PAAS' | 'SAAS'})}
                      >
                          <option value="IAAS">IAAS</option>
                          <option value="PAAS">PAAS</option>
                          <option value="SAAS">SAAS</option>
                      </select>
                  </div>

                  <div className="meta-pill">
                      <span className="meta-label">Category:</span>
                      <select 
                        className="meta-input-transparent"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as 'Database' | 'Network' | 'Compute' | 'Alert'})}
                      >
                          <option value="Alert">Alert</option>
                          <option value="Database">Database</option>
                          <option value="Network">Network</option>
                          <option value="Compute">Compute</option>
                      </select>
                  </div>

                  <div className="meta-pill">
                      <span className="meta-label">Tags:</span>
                      <input 
                          type="text" 
                          className="meta-input-transparent"
                          value={tagInput}
                          onChange={(e) => handleTagsChange(e.target.value)}
                          placeholder="tag1, tag2..."
                      />
                  </div>
              </div>

               {/* DOCUMENT DESCRIPTION */}
               <div className="doc-section">
                   <textarea
                       className="doc-desc-input"
                       value={formData.fullDescription}
                       onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                       placeholder="Write a description of the failure scenario here..."
                   />
               </div>

              {/* STEPS TIMELINE */}
              <div className="steps-wrapper">
                  {(formData.steps || []).map((step, sIdx) => (
                      <div key={sIdx} className="doc-step-item">
                          <div className="step-marker-num">{sIdx + 1}</div>
                          
                          <div className="step-hover-actions">
                              <button className="delete-step-btn" onClick={() => removeStep(sIdx)} title="Delete Step">×</button>
                          </div>

                          <input
                                type="text"
                                className="step-title-simple"
                                value={step.title}
                                onChange={(e) => updateStepTitle(sIdx, e.target.value)}
                                placeholder={`Step ${sIdx+1} Title`}
                           />

                          <div className="doc-step-content">
                             {(step.content || []).map((content, cIdx) => (
                                 <div key={cIdx} className="content-block-wrapper">
                                    {content.type === 'text' ? (
                                        <textarea
                                            className="step-body-simple"
                                            value={content.text}
                                            onChange={(e) => updateStepContent(sIdx, cIdx, e.target.value)}
                                            placeholder="Type styled instructions..."
                                        />
                                    ) : content.type === 'code' ? (
                                        <div className="step-block-code">
                                            <textarea 
                                                className="code-textarea"
                                                value={content.code}
                                                onChange={(e) => updateStepContent(sIdx, cIdx, e.target.value, 'code')}
                                                placeholder="SELECT * FROM..."
                                            />
                                        </div>
                                    ) : null}
                                    <button className="remove-content-btn remove-content-btn-style" onClick={() => removeContent(sIdx, cIdx)} title="Remove block">×</button>
                                 </div>
                             ))}
                             
                             {/* Mini Actions for Content */}
                             <div className="step-actions">
                                 <button className="small-btn" onClick={() => addContent(sIdx, 'text')}>+ Text</button>
                                 <button className="small-btn" onClick={() => addContent(sIdx, 'code')}>+ Code</button>
                             </div>
                          </div>
                      </div>
                  ))}

                  <button className="add-step-ghost" onClick={addStep}>
                      <span style={{fontSize:'1.2em', marginRight: '8px'}}>+</span> Add a new step
                  </button>
              </div>

          </div>
      </div>
  );
};
