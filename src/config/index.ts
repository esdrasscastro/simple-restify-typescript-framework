import dotenv from 'dotenv'
import Path from 'path'

const envConfig = dotenv.config()

if (envConfig.error) {
  throw envConfig.error
}

// carrega o arquivo de configuração conforme a variavel NODE_ENV.
const env = process.env.NODE_ENV || 'dev'

const path = Path.dirname(__filename)
const rootPath = Path.dirname(Path.dirname(__filename))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(`${path}/env/${env}.json`)
config.rootPath = rootPath

export default {
  ...process.env,
  ...config
}
