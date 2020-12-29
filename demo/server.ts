import polka from 'polka'
import sirv from 'sirv'

const server = polka()

server.use(sirv('demo/static'))

server.listen(8030)
