import * as polka from 'polka'
import * as serveStatic from 'serve-static'

const server = polka()

server.use(serveStatic('demo/static'))

server.listen(8030)
