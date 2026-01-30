import React, { useState, useEffect } from 'react';
import type { QRun, CategoryConfig } from '../types';
import './RunbookEditor.css';
import './QRunList.css';

interface RunbookEditorProps {
  initialData?: Partial<QRun>;
  onSave: (run: QRun) => void;
  onCancel: () => void;
  onDelete?: (run: QRun) => void;
  sources?: string[];
}

const LANGUAGES = ['BASH', 'SQL', 'POWERSHELL', 'YAML', 'JSON', 'PYTHON', 'JAVASCRIPT', 'TYPESCRIPT', 'MARKDOWN', 'XML'];

export const RunbookEditor: React.FC<RunbookEditorProps> = ({ initialData, onSave, onCancel, onDelete, sources = [] }) => {
  const [formData, setFormData] = useState<Partial<QRun>>(() => {
    const defaults = {
      title: '',
      shortDescription: '',
      fullDescription: '',
      service: 'IAAS' as const,
      category: 'Alert' as const,
      type: 'qrun' as const,
      tags: [],
      steps: []
    };
    return initialData ? { ...defaults, ...initialData } : defaults;
  });

  // Safe navigation for tags
  const [tagInput, setTagInput] = useState<string>((formData.tags || []).join(', '));
  const [targetSource, setTargetSource] = useState<string>(sources[0] || '');
  const [owners, setOwners] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryConfig[]>([]);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getAppConfig().then(config => {
        if (config.owners) setOwners(config.owners);
        if (config.categories) setCategories(config.categories);
      });
    }
  }, []);

  // Sync targetSource when sources load late
  useEffect(() => {
    if (sources.length > 0 && !targetSource) {
      setTargetSource(sources[0]);
    }
  }, [sources, targetSource]);

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

  const updateStepMetadata = (index: number, field: 'title' | 'ownership' | 'timeEstimation', value: string) => {
    const newSteps = [...(formData.steps || [])];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const addContent = (stepIndex: number, type: 'text' | 'code' | 'image' | 'expected') => {
    const newSteps = [...(formData.steps || [])];
    
    if (type === 'image') {
        const targetDir = initialData?.sourcePath || targetSource;
        if (!targetDir) {
            alert("Please select a save location first.");
            return;
        }
        
        window.electronAPI.pickImage(targetDir).then(result => {
            if (result.success && result.path) {
                setFormData(prev => {
                    const newSteps = [...(prev.steps || [])];
                    const newContent = { type: 'image' as const, path: result.path as string, alt: '' };
                    newSteps[stepIndex] = {
                        ...newSteps[stepIndex],
                        content: [...(newSteps[stepIndex].content || []), newContent]
                    };
                    return { ...prev, steps: newSteps };
                });
            } else if (!result.success && result.error !== 'No image selected') {
                alert("Failed to pick image: " + (result.error || "Unknown error"));
            }
        }).catch(err => {
            console.error("IPC Error picking image:", err);
            alert("An error occurred while opening the image picker.");
        });
        return;
    }

    const newContent = type === 'text' 
      ? { type: 'text' as const, text: '' }
      : type === 'expected'
      ? { type: 'expected' as const, text: '' }
      : { type: 'code' as const, language: 'BASH', code: '' };
    
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      content: [...newSteps[stepIndex].content, newContent]
    };
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const updateStepContent = (stepIndex: number, contentIndex: number, value: string, field: 'text' | 'code' | 'language' = 'text') => {
    const newSteps = [...(formData.steps || [])];
    const item = newSteps[stepIndex].content[contentIndex];
    
    if (item.type === 'text' || item.type === 'expected') {
      newSteps[stepIndex].content[contentIndex] = { ...item, text: value } as any;
    } else if (item.type === 'code') {
      newSteps[stepIndex].content[contentIndex] = { ...item, [field]: value } as any;
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
      category: formData.category as string,
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
                            title="Target Source"
                            value={targetSource} 
                            onChange={(e) => {
                                setTargetSource(e.target.value);
                                setFormData(prev => ({ ...prev, sourcePath: e.target.value }));
                            }}
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
                  {initialData && !initialData.readonly && onDelete && (
                      <button 
                        className="btn btn-secondary" 
                        style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                        onClick={() => onDelete(initialData as QRun)}
                      >
                         Delete
                      </button>
                  )}
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
                        title="Service Type"
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
                        title="Category"
                        className="meta-input-transparent"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                          {categories.map(cat => (
                              <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                          {formData.category && !categories.find(c => c.name === formData.category) && (
                              <option value={formData.category}>{formData.category} (Custom)</option>
                          )}
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

                           <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap' }}>
                               <div style={{ flex: 1, minWidth: '300px' }}>
                                   <input
                                        type="text"
                                        className="step-title-simple"
                                        value={step.title}
                                        onChange={(e) => updateStepMetadata(sIdx, 'title', e.target.value)}
                                        placeholder={`Step ${sIdx+1} Title`}
                                   />
                                   <div className="step-meta-inputs" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                        {step.ownership !== undefined && (
                                            <div className="meta-field-group">
                                                <span className="meta-label-tiny">Owner</span>
                                                <select 
                                                    className="meta-input-mini" 
                                                    title="Select Step Owner"
                                                    value={step.ownership || ''} 
                                                    onChange={(e) => updateStepMetadata(sIdx, 'ownership', e.target.value)}
                                                >
                                                    <option value="">Select Owner...</option>
                                                    {owners.map(o => (
                                                        <option key={o} value={o}>{o}</option>
                                                    ))}
                                                    {!owners.includes(step.ownership || '') && step.ownership && (
                                                        <option value={step.ownership}>{step.ownership} (External)</option>
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                        {step.timeEstimation !== undefined && (
                                            <div className="meta-field-group">
                                                <span className="meta-label-tiny">Time</span>
                                                <input 
                                                    type="text" 
                                                    className="meta-input-mini" 
                                                    style={{ width: '60px' }}
                                                    placeholder="5m" 
                                                    value={step.timeEstimation || ''} 
                                                    onChange={(e) => updateStepMetadata(sIdx, 'timeEstimation', e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                               </div>
                           </div>

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
                                    ) : content.type === 'expected' ? (
                                            <textarea
                                                className="step-body-simple"
                                                value={content.text}
                                                onChange={(e) => updateStepContent(sIdx, cIdx, e.target.value)}
                                                placeholder="Expected Result: (e.g. Service is RUNNING)"
                                                style={{ color: 'var(--accent-primary)', borderLeft: '3px solid var(--accent-primary)', paddingLeft: '1rem', fontStyle: 'italic' }}
                                            />
                                    ) : content.type === 'code' ? (
                                        <div className="step-block-code">
                                            <div className="code-block-header-editor">
                                                <select 
                                                    className="lang-selector-mini"
                                                    title="Select Code Language"
                                                    value={content.language}
                                                    onChange={(e) => updateStepContent(sIdx, cIdx, e.target.value, 'language')}
                                                >
                                                    {LANGUAGES.map(lang => (
                                                        <option key={lang} value={lang}>{lang}</option>
                                                    ))}
                                                    {!LANGUAGES.includes(content.language?.toUpperCase() || '') && content.language && (
                                                        <option value={content.language}>{content.language.toUpperCase()}</option>
                                                    )}
                                                </select>
                                                <button 
                                                    className="copy-btn-preview" 
                                                    disabled
                                                    style={{ opacity: 0.5, cursor: 'default' }}
                                                >
                                                    Preview
                                                </button>
                                            </div>
                                            <textarea 
                                                className="code-textarea"
                                                value={content.code}
                                                onChange={(e) => updateStepContent(sIdx, cIdx, e.target.value, 'code')}
                                                placeholder="Enter code here..."
                                            />
                                        </div>
                                    ) : content.type === 'image' ? (
                                        <div className="step-block-image mb-1">
                                            <div className="image-thumbnail-wrapper">
                                                <img 
                                                    src={content.path.startsWith('http') ? content.path : `qrun-asset:///${(formData.sourcePath || targetSource).replace(/\\/g, '/')}/${content.path}`} 
                                                    alt={content.alt} 
                                                    className="image-thumbnail"
                                                />
                                                <div className="image-overlay-hint">
                                                    <span>Preview</span>
                                                </div>
                                            </div>
                                            <input 
                                                type="text"
                                                className="meta-input-mini"
                                                placeholder="Alt text..."
                                                value={content.alt || ''}
                                                style={{ marginTop: '0.5rem', width: '100%' }}
                                                onChange={(e) => {
                                                    const newSteps = [...(formData.steps || [])];
                                                    const item = newSteps[sIdx].content[cIdx];
                                                    if (item.type === 'image') {
                                                        newSteps[sIdx].content[cIdx] = { ...item, alt: e.target.value };
                                                        setFormData(prev => ({ ...prev, steps: newSteps }));
                                                    }
                                                }}
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
                                 <button className="small-btn" onClick={() => addContent(sIdx, 'image')}>+ Image</button>
                                 <button className="small-btn" onClick={() => addContent(sIdx, 'expected')}>+ Expected</button>
                                 <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                                     {step.ownership === undefined && <button className="small-btn" onClick={() => updateStepMetadata(sIdx, 'ownership', '')}>+ Owner</button>}
                                     {step.timeEstimation === undefined && <button className="small-btn" onClick={() => updateStepMetadata(sIdx, 'timeEstimation', '')}>+ Time</button>}
                                 </div>
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
