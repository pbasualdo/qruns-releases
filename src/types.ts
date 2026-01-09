export type QRunType = 'alert' | 'database' | 'graph' | 'network' | 'compute';

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
  type: QRunType;
  tags: string[];
  category: 'IAAS' | 'PAAS' | 'SAAS'; // For the sidebar tabs
  steps: QRunStep[];
  sourcePath?: string;
  format?: 'json' | 'md';
}
