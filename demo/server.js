const polka = require('polka')
const serveStatic = require('serve-static')

const server = polka()

server.use(serveStatic('demo/static'))

server.listen(8030)
