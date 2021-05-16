import { Request, Response } from 'restify'

export default class Teste {
    teste = (req: Request, res: Response): void => {
      res.send(200, 'teste')
    }
}
