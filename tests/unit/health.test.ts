import { describe, expect, it } from 'vitest';
import { GET } from '@/pages/health';

describe('/health', () => {
  it('returns ok and is never cached', async () => {
    // The handler ignores its context, so an empty object is enough here.
    const response = await GET({} as Parameters<typeof GET>[0]);

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(await response.json()).toEqual({ status: 'ok' });
  });
});
