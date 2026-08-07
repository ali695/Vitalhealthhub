const http = require('http');

process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-only-session-secret-at-least-32-characters';
process.env.ADMIN_USERNAME = 'security-test-admin';
process.env.ADMIN_PASSWORD = 'security-test-password';
process.env.SESSION_DB_PATH = '.runtime/tests/sessions.db';
process.env.CONTENT_DB_PATH = '.runtime/tests/content.db';

const app = require('../server');
const failures = [];
let assertions = 0;

function assert(condition, message) {
  assertions += 1;
  if (!condition) failures.push(message);
}

function request(server, pathname, options = {}) {
  const address = server.address();
  const body = options.body || '';
  const headers = { ...(options.headers || {}) };
  if (body && !headers['Content-Length']) headers['Content-Length'] = Buffer.byteLength(body);
  return new Promise((resolve, reject) => {
    const req = http.request({
      host: '127.0.0.1',
      port: address.port,
      path: pathname,
      method: options.method || 'GET',
      headers,
    }, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { responseBody += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: responseBody }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function run() {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    for (const exposedPath of ['/server.js', '/server/admin.js', '/database/db.js', '/database/vitalhealth.db', '/package.json', '/templates/blog.ejs']) {
      const response = await request(server, exposedPath);
      assert(response.status === 404, `${exposedPath} should return 404, received ${response.status}`);
    }

    const missing = await request(server, '/definitely-not-a-real-page');
    assert(missing.status === 404, `unknown paths should return 404, received ${missing.status}`);
    assert(/Page not found/i.test(missing.body), 'custom 404 page was not returned');
    assert(Boolean(missing.headers['content-security-policy']), 'Content-Security-Policy header is missing');
    assert(Boolean(missing.headers['permissions-policy']), 'Permissions-Policy header is missing');
    assert(!missing.headers['x-powered-by'], 'X-Powered-By should be disabled');

    const protectedAdmin = await request(server, '/admin');
    assert(protectedAdmin.status === 303, `unauthenticated admin should redirect, received ${protectedAdmin.status}`);
    assert(protectedAdmin.headers.location === '/admin/login', 'unauthenticated admin redirect target is incorrect');

    const loginPage = await request(server, '/admin/login');
    const cookie = (loginPage.headers['set-cookie'] || [])[0]?.split(';')[0] || '';
    const token = loginPage.body.match(/name="_csrf" value="([a-f0-9]+)"/)?.[1] || '';
    assert(loginPage.status === 200, `login page should return 200, received ${loginPage.status}`);
    assert(Boolean(cookie), 'login page did not issue a session cookie');
    assert(Boolean(token), 'login page did not issue a CSRF token');

    const noCsrf = await request(server, '/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: cookie, Origin: `http://127.0.0.1:${server.address().port}` },
      body: 'username=security-test-admin&password=security-test-password',
    });
    assert(noCsrf.status === 403, `login without CSRF should return 403, received ${noCsrf.status}`);

    const credentials = new URLSearchParams({
      _csrf: token,
      username: 'security-test-admin',
      password: 'security-test-password',
    }).toString();
    const login = await request(server, '/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: cookie, Origin: `http://127.0.0.1:${server.address().port}` },
      body: credentials,
    });
    const authenticatedCookie = (login.headers['set-cookie'] || [])[0]?.split(';')[0] || '';
    assert(login.status === 303, `valid login should redirect, received ${login.status}`);
    assert(login.headers.location === '/admin', 'valid login redirect target is incorrect');
    assert(Boolean(authenticatedCookie), 'valid login did not rotate the session cookie');

    const admin = await request(server, '/admin/blogs', { headers: { Cookie: authenticatedCookie } });
    assert(admin.status === 200, `authenticated admin should return 200, received ${admin.status}`);
    assert(/name="_csrf" value="[a-f0-9]+"/.test(admin.body), 'admin POST forms did not receive CSRF fields');

    const protectedMutation = await request(server, '/admin/pages/regenerate-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Cookie: authenticatedCookie, Origin: `http://127.0.0.1:${server.address().port}` },
      body: '',
    });
    assert(protectedMutation.status === 403, `admin mutation without CSRF should return 403, received ${protectedMutation.status}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  console.log(JSON.stringify({ assertions, failures }, null, 2));
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
