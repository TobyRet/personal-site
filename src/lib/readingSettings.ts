/**
 * Reader settings for the "Aa" control: text size, reading font and theme.
 * Stored in localStorage and applied as data attributes on <html>, which
 * tokens.css reads. Storage can fail (private mode, blocked site data), so
 * every read and write is wrapped and falls back to the defaults.
 */

export const STORAGE_KEY = 'reading-settings';

export type TextSize = 'm' | 'l' | 'xl';
export type ReadingFont = 'serif' | 'sans';
export type Theme = 'system' | 'light' | 'dark';

export interface ReadingSettings {
  textSize: TextSize;
  font: ReadingFont;
  theme: Theme;
}

export const DEFAULT_SETTINGS: ReadingSettings = {
  textSize: 'm',
  font: 'serif',
  theme: 'system',
};

const TEXT_SIZES: readonly TextSize[] = ['m', 'l', 'xl'];
const FONTS: readonly ReadingFont[] = ['serif', 'sans'];
const THEMES: readonly Theme[] = ['system', 'light', 'dark'];

function pick<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

/** Parses stored JSON. Anything unknown or malformed becomes the default. */
export function parseSettings(raw: string | null): ReadingSettings {
  if (!raw) return DEFAULT_SETTINGS;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== 'object' || data === null) return DEFAULT_SETTINGS;
    const record = data as Record<string, unknown>;
    return {
      textSize: pick(record['textSize'], TEXT_SIZES, DEFAULT_SETTINGS.textSize),
      font: pick(record['font'], FONTS, DEFAULT_SETTINGS.font),
      theme: pick(record['theme'], THEMES, DEFAULT_SETTINGS.theme),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** The data attributes for a set of settings. Defaults remove the attribute. */
export function toAttributes(
  settings: ReadingSettings,
): Record<string, string | null> {
  return {
    'data-text-size': settings.textSize === 'm' ? null : settings.textSize,
    'data-reading-font': settings.font === 'serif' ? null : settings.font,
    'data-theme': settings.theme === 'system' ? null : settings.theme,
  };
}

export function applySettings(
  root: HTMLElement,
  settings: ReadingSettings,
): void {
  for (const [name, value] of Object.entries(toAttributes(settings))) {
    if (value === null) root.removeAttribute(name);
    else root.setAttribute(name, value);
  }
}

export function loadSettings(
  storage: Pick<Storage, 'getItem'> | undefined,
): ReadingSettings {
  try {
    return parseSettings(storage?.getItem(STORAGE_KEY) ?? null);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(
  storage: Pick<Storage, 'setItem'> | undefined,
  settings: ReadingSettings,
): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage is unavailable. The setting still applies until the page closes.
  }
}
