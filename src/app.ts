import { Request, Response } from 'restify'
import config from '@config/index'
import Server from '@binaries/Server'
import Factory from '@binaries/Factory'
import Redis from '@binaries/Redis'
import { Logger, TerminalColors } from '@helpers/Logger'

Server.get('/', (req: Request, res: Response) => {
  res.send(200, 'Aplicação ALM está rodando')
})

Server.listen(process.env.PORT, () => {
  Factory.loadModules()
  Redis.configure()

  Logger.info(
    'O %s está rodando no ambiente %s e porta %s',
    `${TerminalColors.YELLOW}${config.APP_NAME}${TerminalColors.WHITE}`,
    `${TerminalColors.YELLOW}${config.NODE_ENV}${TerminalColors.WHITE}`,
    `${TerminalColors.YELLOW}${config.PORT}${TerminalColors.WHITE}`)
})

// Finaliza a aplicação e todos os seus processos e conexões
process.on('SIGINT', () => {
  Logger.info('\t\r%s', `${TerminalColors.YELLOW}Aplicação Encerrada!${TerminalColors.WHITE}`)
  
  process.exit()
})

export default Server
