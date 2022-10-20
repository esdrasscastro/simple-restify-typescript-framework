import Config from '@config/index'
import RedisClient, { RedisError, RedisClient as IRedisClient } from 'redis'
import { Logger } from '@helpers/Logger'
import { CustomError } from '@errors/CustomError'

class Redis<T> {
    private client: IRedisClient | null = null;
    connected = false;

    configure () {
      if (Config.REDIS_HOST) {
        const source = `${Config.REDIS_HOST}:${Config.REDIS_PORT}`

        Logger.debug(`Tentando conectar no REDIS [${source}]`)

        // 24 horas em segundos
        if (!Config.REDIS_TTL) Config.REDIS_TTL = Number(60 * 60 * 24).toString()

        this.client = RedisClient.createClient({
          host: Config.REDIS_HOST,
          port: parseInt(Config.REDIS_PORT || '')
        })

        this.client.on('end', () => {
          Logger.debug(`A conexão com o REDIS foi finalizada. [${source}]`)
          this.connected = false
        })

        this.client.on('connect', () => {
          Logger.debug(`A conexão com o REDIS foi estabelecida. [${source}]`)
          this.connected = true
        })

        return this
      }

      console.log('Nenhuma configuração de REDIS encontrada')
      return null
    }

    close () {
      if (this.client) { this.client.quit() }
    }

    del (key: string) {
      return new Promise((resolve, reject) => {
        this.client?.del(key, (err, data) => {
          if (!err) resolve(data)
          else reject(err)
        })
      })
    }

    set (key: string, object: T, ttl = 0) {
      return new Promise((resolve, reject) => {
        const input = JSON.stringify(object)
        // Salva o valor no Redis com o TTL passado,
        // ou o definido no arquivo de configuração,
        // ou o padrão de 24 horas
        this.client?.set(key, input, 'EX', ttl || parseInt(Config.REDIS_TTL || ''), (err, data) => {
          const newError: CustomError|null = err;          
          
          if (!newError) {
            resolve(data)
          } else {
            newError.appMessage = 'Não foi possível salvar os dados no Redis'
            newError.code = 'redis_error'
            Logger.error('Erro no framework - Redis', err)
            reject(err)
          }
        })
      })
    }

    get (key: string) {
      return new Promise((resolve, reject) => {
        this.client?.get(key, (err, data) => {
          const newError: CustomError|null = err;

          if (!newError) {
            if (data) {
              try {
              // Tenta fazer o parse do JSON
                const output = JSON.parse(data)
                resolve(output)
              } catch (err: any) {
                const newCatchError = new CustomError(err.message);
                
                // Rejeita se não conseguir realizar o parse
                newCatchError.name = err.name
                newCatchError.stack = err.stack
                newCatchError.appMessage = 'Erro de formatação do JSON'
                newCatchError.code = 'format_error'

                Logger.error('Erro no framework - Redis', newCatchError)
                reject(err)
              }
            } else {
              // Rejeita se a chave não estiver no Redis
              const err = new CustomError('Nenhum registro encontrado para este token')
              err.code = 'empty_session'
              reject(err)
            }
          } else {
            // Problema no acesso ao Redis
            newError.appMessage = 'Erro ao ler dados no Redis'
            newError.code = 'redis_error'
            Logger.error('Erro no framework - Redis', err)
            reject(err)
          }
        })
      })
    }

    update (key: string, object: T, ttl: number) {
      return new Promise((resolve, reject) => {
      // Recebe o objeto salvo no Redis

        this.get(key)
          .then((data) => {
            object = Object.assign({}, data, object)
            return this.set(key, object, ttl)
          })
          .then((data) => {
          // Salva o objeto no Redis
            resolve(data)
          })
          .catch((err) => {
            Logger.error('Erro no framework - Redis', err)
            reject(err)
          })
      })
    }

    getTtl (key: string, minTtl = 0) {
      return new Promise((resolve, reject) => {
        this.client?.ttl(key, (err, ttl) => {
          if(!err) {
            if (minTtl && ttl < minTtl) resolve(null)
            else resolve(ttl)
          } else {
            Logger.error('Erro no framework - Redis', err)
            reject(err)
          }
        });
      })
    }
}

export default new Redis()


