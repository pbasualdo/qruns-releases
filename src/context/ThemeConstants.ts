export type Theme = 'dark' | 'light';
export type AccentColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan';
export type ViewMode = 'super-compact' | 'compact' | 'comfortable' | 'detailed';
export type UIScale = 'normal' | 'compact';

export const ACCENTS: Record<AccentColor, { primary: string; secondary: string }> = {
    indigo: { primary: '#6366F1', secondary: '#818CF8' },
    emerald: { primary: '#10B981', secondary: '#34D399' },
    rose: { primary: '#F43F5E', secondary: '#FB7185' },
    amber: { primary: '#F59E0B', secondary: '#FBBF24' },
    cyan: { primary: '#06B6D4', secondary: '#22D3EE' }
};
