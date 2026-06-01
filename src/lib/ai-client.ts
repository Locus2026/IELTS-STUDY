// Client-side utility: reads user's API key from localStorage and attaches to AI requests
export function getClientApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('user-api-key');
}

// Enhanced fetch that adds x-api-key header if user configured one
export async function aiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const key = getClientApiKey();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (key) headers.set('x-api-key', key);
  return fetch(url, { ...options, headers });
}
