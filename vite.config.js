/** @type {import('vite').UserConfig} */
export default {
  root: 'demo',
  build: {
    outDir: '../pages',
    emptyOutDir: true
  },
  plugins: [
    // Set required isolation headers for SharedArrayBuffer use
    {
      name: 'isolation',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          next()
        })
      }
    }
  ]
}