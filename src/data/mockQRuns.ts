import type { QRun } from '../types';
import run1 from './runbooks/1.json';
import run2 from './runbooks/2.json';
import run3 from './runbooks/3.json';

// We cast to QRun because JSON imports are inferred as general objects
// and we want to ensure they match our strict TypeScript interface.
const runs: QRun[] = [
  run1 as unknown as QRun,
  run2 as unknown as QRun,
  run3 as unknown as QRun
];

export const mockQRuns: QRun[] = runs;
