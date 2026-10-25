import { describe, expect, it } from 'vitest';
import {
  THEME_KEY,
  effectiveTheme,
  loadTheme,
  parseTheme,
  saveTheme,
} from '@/lib/theme';

const memoryStorage = () => {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  };
};

const brokenStorage = {
  getItem: () => {
    throw new Error('blocked');
  },
  setItem: () => {
    throw new Error('blocked');
  },
};

describe('parseTheme', () => {
  it('accepts light and dark only', () => {
    expect(parseTheme('light')).toBe('light');
    expect(parseTheme('dark')).toBe('dark');
    expect(parseTheme('system')).toBeNull();
    expect(parseTheme(null)).toBeNull();
  });
});

describe('effectiveTheme', () => {
  it('follows the device until a choice is saved', () => {
    expect(effectiveTheme(null, true)).toBe('dark');
    expect(effectiveTheme(null, false)).toBe('light');
    expect(effectiveTheme('light', true)).toBe('light');
  });
});

describe('loadTheme and saveTheme', () => {
  it('round-trips a choice', () => {
    const storage = memoryStorage();
    saveTheme(storage, 'dark');
    expect(storage.getItem(THEME_KEY)).toBe('dark');
    expect(loadTheme(storage)).toBe('dark');
  });

  it('falls back to following the device when storage fails', () => {
    expect(loadTheme(brokenStorage)).toBeNull();
    expect(() => saveTheme(brokenStorage, 'dark')).not.toThrow();
  });
});
