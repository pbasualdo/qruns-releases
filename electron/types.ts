export type QRunService = 'IAAS' | 'PAAS' | 'SAAS';
export type QRunCategory = 'Database' | 'Network' | 'Compute' | 'Alert';

export interface QRunStep {
  title: string;
  content: (
    | { type: 'text'; text: string }
    | { type: 'code'; language: string; code: string }
    | { type: 'list'; items: string[] }
  )[];
}

export interface QRun {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: 'qrun';
  service: QRunService;
  category: QRunCategory;
  tags: string[];
  steps: QRunStep[];
  sourcePath?: string;
  format?: 'json' | 'md';
}
