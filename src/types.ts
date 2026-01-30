export type QRunService = 'IAAS' | 'PAAS' | 'SAAS';
export type QRunCategory = string;

export interface CategoryConfig {
  name: string;
  svg: string;
  color?: string;
}

export interface QRunStep {
  title: string;
  ownership?: string;
  timeEstimation?: string;
  content: (
    | { type: 'text'; text: string }
    | { type: 'code'; language: string; code: string }
    | { type: 'image'; path: string; alt?: string }
    | { type: 'list'; items: string[] }
    | { type: 'expected'; text: string }
  )[];
}

export interface QRun {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: 'qrun';       // Strict: must be 'qrun'
  service: QRunService; // replaces old keys for sidebar tabs
  category: QRunCategory; // replaces old keys for icons
  tags: string[];
  steps: QRunStep[];
  sourcePath?: string;
  readonly?: boolean;
}
