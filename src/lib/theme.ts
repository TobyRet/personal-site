/**
 * The light and dark theme switch. A saved choice is stored in localStorage
 * and applied as `data-theme` on <html>, which tokens.css reads. With no
 * saved choice the site follows the device. Storage can fail (private mode,
 * blocked site data), so every read and write is wrapped.
 */

export const THEME_KEY = 'theme';

export type Theme = 'light' | 'dark';

/** A stored value, or null for "follow the device". */
export function parseTheme(raw: string | null): Theme | null {
  return raw === 'light' || raw === 'dark' ? raw : null;
}

/** The theme in use: the saved choice, or the device's preference. */
export function effectiveTheme(
  saved: Theme | null,
  prefersDark: boolean,
): Theme {
  return saved ?? (prefersDark ? 'dark' : 'light');
}

export function loadTheme(
  storage: Pick<Storage, 'getItem'> | undefined,
): Theme | null {
  try {
    return parseTheme(storage?.getItem(THEME_KEY) ?? null);
  } catch {
    return null;
  }
}

export function saveTheme(
  storage: Pick<Storage, 'setItem'> | undefined,
  theme: Theme,
): void {
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {
    // Storage is unavailable. The theme still applies until the page closes.
  }
}
