import Restify, { Next, Request, Response } from 'restify'
import cors from 'cors'

const Server = Restify.createServer()

Server.use(cors())

Server.use(
  Restify.plugins.queryParser({
    mapParams: true
  })
)

Server.use(
  Restify.plugins.bodyParser({
    mapParams: true
  })
)

Server.use((req: Request, res: Response, next: Next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.removeHeader('server')
  next()
})

Server.use(Restify.plugins.acceptParser(Server.acceptable))

export default Server
