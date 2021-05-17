/* eslint-disable @typescript-eslint/ban-types */
import config from '@config/index'
import server from '@binaries/Server'
import Path from 'path'
import glob from 'glob'
import { Request, Response, Next, Server, RequestHandlerType } from 'restify'

export default new class Factory {
    Config = config;
    Server: Server = server;
    modulesImported = 0;

    /**
     * Carrega as rotas que se encontra na pasta modules
     */
    loadModules = (): void => {
      const route = `${this.Config.rootPath}/modules/**/route.*s`
      glob.sync(route)
        .forEach((file) => {
          require(Path.resolve(file))
          this.modulesImported += 1

          file = file.replace(`${this.Config.rootPath}/modules/`, '')
          file = file.replace(/\/route.(ts|js)/g, '')

          console.info('As rotas do módulo \x1b[33m%s\x1b[0m foram carregadas', file)
        })
    }

    /**
     * Cria uma instancia de uma classe fornecida e retorna o método desta classe para ser executada na rota acionada
     * @param ClassName Nome da classe a ser criada uma instância
     * @param method Nome do método a ser executado da classe instanciada
     * @returns Função da classe
     */
    build = (ClassName: Object, method: string) => {
      return (req: Request, res: Response, next: Next) => {
        let Obj = Object.assign(ClassName)
        Obj = new Obj()
        return Obj[method](req, res, next)
      }
    }

    /**
     * Cria um rota do tipo GET que não utiliza middlewares
     *
     * @param path Rota a ser adicionada
     * @param ClassName Import da classe a ser executada
     * @param method Nome do método a ser executado na classe
     */
    getCustom = (path: string | RegExp, ClassName: Object, method?: string): void => {
      if (!method) method = 'init'
      this.Server.get(path, this.build(ClassName, method))
    }

    /**
     * Cria uma rota do tipo GET
     * @param path Rota a ser adicionada
     * @param middlewares Middleware a ser acionado quando a rota for chamada
     * @param method Método request da classe utilizada
     */
    get = (path: string | RegExp, middlewares: [], method: RequestHandlerType): void => {
      this.Server.get(path, middlewares, method)
    }

    /**
     * Cria um rota do tipo POST que não utiliza middlewares
     *
     * @param path Rota a ser adicionada
     * @param ClassName Import da classe a ser executada
     * @param method Nome do método a ser executado na classe
     */
     postCustom = (path: string | RegExp, ClassName: Object, method?: string): void => {
       if (!method) method = 'init'
       this.Server.post(path, this.build(ClassName, method))
     }

     /**
     * Cria uma rota do tipo POST
     * @param path Rota a ser adicionada
     * @param middlewares Middleware a ser acionado quando a rota for chamada
     * @param method Método request da classe utilizada
     */
    post = (path: string | RegExp, middlewares: [], method: RequestHandlerType): void => {
      this.Server.post(path, middlewares, method)
    }
}()
