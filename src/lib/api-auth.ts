// Check if a request is from the local network
export function isLocalRequest(request: Request | { headers: Headers }): boolean {
  const host = request.headers.get('host') || '';
  const forwarded = request.headers.get('x-forwarded-for') || '';

  // Localhost / 127.0.0.1
  if (host.includes('localhost') || host.includes('127.0.0.1')) return true;

  // Private network IPs: 192.168.x.x, 10.x.x.x, 172.16-31.x.x
  const privateRanges = [/^192\.168\./, /^10\./, /^172\.(1[6-9]|2\d|3[01])\./, /^127\./];
  const clientIp = forwarded.split(',')[0]?.trim() || '';

  if (privateRanges.some(r => r.test(host.split(':')[0])) ||
      privateRanges.some(r => r.test(clientIp))) {
    return true;
  }

  return false;
}

// Get the appropriate API key based on request origin
export function getApiKey(request: Request | { headers: Headers }): string | null {
  if (isLocalRequest(request)) {
    // Local network: use server's default key
    return process.env.AI_API_KEY || null;
  }
  // Public network: use client-provided key (from x-api-key header)
  return request.headers.get('x-api-key') || null;
}
