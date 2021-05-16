import config from '@config/index'
import server from '@binaries/Server'
import Path from 'path'
import glob from 'glob'
import { Request, Response, Next } from 'restify'

export default new class Factory {
    Config = config;
    Server = server;
    Routes = [];

    /**
     * Carrega as rotas que se encontra na pasta modules
     */
    loadModules = (): void => {
      try {
        const route = `${this.Config.rootPath}/modules/**/route.ts`
        glob.sync(route)
          .forEach((file) => {
            require(Path.resolve(file))
            file = file.replace(`${this.Config.rootPath}/modules/`, '')
            file = file.replace('/route.ts', '')
            console.log('O módulo \x1b[33m%s\x1b[0m foi carregado', file)
          })
      } catch (error) {
        console.error(error)
      }
    }

    /**
     * Cria uma instancia de uma classe fornecida e retorna o método desta classe para ser executada na rota acionada
     * @param ClassName Nome da classe a ser criada uma instância
     * @param method Nome do método a ser executado da classe instanciada
     * @returns Função da classe
     */
    build = (ClassName, method: string) => {
      return (req: Request, res: Response, next: Next) => {
        const obj = new ClassName()
        return obj[method](req, res, next)
      }
    }

    /**
     * Cria um rota do tipo GET
     *
     * @param path Rota a ser adicionada
     * @param ClassName Import da classe a ser executada
     * @param method Nome do método a ser executado na classe
     */
    get = (path: string | RegExp, ClassName, method?: string): void => {
      this.fetch('get', path, ClassName, method)
    }

    /**
     * Cria um rota do tipo POST
     *
     * @param path Rota a ser adicionada
     * @param ClassName Import da classe a ser executada
     * @param method Nome do método a ser executado na classe
     */
     post = (path: string | RegExp, ClassName, method?: string): void => {
       this.fetch('post', path, ClassName, method)
     }

     private fetch = (httpMethod = 'get', path: string | RegExp, ClassName, method?: string): void => {
       if (!method) method = 'init'
       this.Server[httpMethod](path, this.build(ClassName, method))
     }
}()
