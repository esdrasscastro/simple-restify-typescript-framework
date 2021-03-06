import { Request, Response } from 'restify'

export default class Example {
  init = (req: Request, res: Response): void => {
    res.send(200, 'init')
  }

  teste = (req: Request, res: Response): void => {
    res.send(200, 'teste')
  }

  example = (req: Request, res: Response): void => {
    res.send(200, 'example')
  }

  exampleTest = (req: Request, res: Response): void => {
    res.send(200, 'example teste')
  }
}
