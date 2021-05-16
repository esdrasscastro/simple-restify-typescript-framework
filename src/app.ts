import { Request, Response } from 'restify'
import config from '@config/index'
import Server from '@binaries/Server'
import Factory from '@binaries/Factory'

Server.get('/', (req: Request, res: Response) => {
  res.send(200, 'Aplicação ALM está rodando')
})

Server.listen(process.env.PORT, () => {
  Factory.loadModules()

  console.info(
    '> O \x1b[33m%s\x1b[0m está rodando no ambiente \x1b[33m%s\x1b[0m e porta \x1b[33m%d\x1b[0m',
    config.APP_NAME,
    config.NODE_ENV,
    config.PORT)
})

// Finaliza a aplicação e todos os seus processos e conexões
process.on('SIGINT', () => {
  console.info('\t\r> \x1b[33m%s\x1b[0m', 'Aplicação encerrada.')
  process.exit()
})

export default Server
