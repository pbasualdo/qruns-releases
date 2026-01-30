/// <reference types="node" />
import { describe, it, expect } from 'vitest';

describe('Smoke Test', () => {
    it('should pass a basic sanity check', () => {
        expect(1 + 1).toBe(2);
    });

    it('should have access to environment variables', () => {
        expect(process.env).toBeDefined();
    });
});

describe('Data Integrity', () => {
    it('should be able to parse a mock runbook structure', () => {
        const mockRunbook = {
            id: 'test-runbook',
            title: 'Test Runbook',
            steps: [
                { title: 'Step 1', content: [{ type: 'text', text: 'Hello' }] }
            ]
        };
        expect(mockRunbook.id).toBe('test-runbook');
        expect(mockRunbook.steps.length).toBe(1);
    });
});
