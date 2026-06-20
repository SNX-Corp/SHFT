// Password gate for the private SHFT hub. HTTP Basic Auth at the edge.
// The password lives in the SITE_PASSWORD env var (a Vercel secret), never in this file.
export const config = { matcher: '/:path*' };

export default function middleware(request) {
  const PASSWORD = process.env.SITE_PASSWORD || '';
  const auth = request.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      const idx = decoded.indexOf(':');
      const pass = idx === -1 ? decoded : decoded.slice(idx + 1);
      if (PASSWORD.length > 0 && pass === PASSWORD) {
        return; // correct password -> let the request through
      }
    } catch (e) { /* fall through to 401 */ }
  }
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="SHFT (private)", charset="UTF-8"',
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
