import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

/**
 * Starts a local HTTP server to serve the built renderer files.
 * This gives the renderer a proper origin (http://localhost:PORT)
 * so that Clerk authentication works in production Electron builds.
 */
export function startLocalServer(
  rendererDir: string,
  preferredPort = 5173
): Promise<{ server: http.Server; port: number }> {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const url = req.url ?? '/'

      // Strip query string for file lookup
      const pathname = url.split('?')[0]
      const safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '')
      let filePath = path.join(rendererDir, safePath || 'index.html')

      // SPA fallback: if the path doesn't map to a file, serve index.html
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        filePath = path.join(rendererDir, 'index.html')
      }

      const ext = path.extname(filePath).toLowerCase()
      const contentType = MIME_TYPES[ext] || 'application/octet-stream'

      try {
        const content = fs.readFileSync(filePath)
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
      }
    })

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        server.listen(0, '127.0.0.1')
      } else {
        reject(err)
      }
    })

    server.listen(preferredPort, '127.0.0.1', () => {
      const addr = server.address()
      if (addr && typeof addr === 'object') {
        resolve({ server, port: addr.port })
      } else {
        reject(new Error('Failed to get server address'))
      }
    })
  })
}
