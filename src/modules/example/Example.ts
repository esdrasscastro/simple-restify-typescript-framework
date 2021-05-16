import { Request, Response } from 'restify'

export default class Example {
  init = (req: Request, res: Response): void => {
    res.send(200, 'init method')
  }

  teste = (req: Request, res: Response): void => {
    res.send(200, 'example')
  }
}
