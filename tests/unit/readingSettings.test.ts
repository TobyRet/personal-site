import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  parseSettings,
  saveSettings,
  STORAGE_KEY,
  toAttributes,
} from '@/lib/readingSettings';

describe('parseSettings', () => {
  it('returns defaults for missing or malformed data', () => {
    expect(parseSettings(null)).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings('not json')).toEqual(DEFAULT_SETTINGS);
    expect(parseSettings('42')).toEqual(DEFAULT_SETTINGS);
  });

  it('keeps known values and replaces unknown ones', () => {
    expect(
      parseSettings(
        JSON.stringify({ textSize: 'xl', font: 'comic', theme: 'dark' }),
      ),
    ).toEqual({ textSize: 'xl', font: 'serif', theme: 'dark' });
  });
});

describe('toAttributes', () => {
  it('removes attributes for default values', () => {
    expect(toAttributes(DEFAULT_SETTINGS)).toEqual({
      'data-text-size': null,
      'data-reading-font': null,
      'data-theme': null,
    });
  });

  it('sets attributes for chosen values', () => {
    expect(
      toAttributes({ textSize: 'l', font: 'sans', theme: 'light' }),
    ).toEqual({
      'data-text-size': 'l',
      'data-reading-font': 'sans',
      'data-theme': 'light',
    });
  });
});

describe('storage', () => {
  it('round-trips through storage', () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
    };
    saveSettings(storage, { textSize: 'xl', font: 'sans', theme: 'dark' });
    expect(store.has(STORAGE_KEY)).toBe(true);
    expect(loadSettings(storage)).toEqual({
      textSize: 'xl',
      font: 'sans',
      theme: 'dark',
    });
  });

  it('falls back to defaults when storage throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(loadSettings(broken)).toEqual(DEFAULT_SETTINGS);
    expect(() => saveSettings(broken, DEFAULT_SETTINGS)).not.toThrow();
  });
});
