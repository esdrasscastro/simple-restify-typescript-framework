import Path from 'path'

import CustomEnv from 'custom-env'
CustomEnv.env(true)

const rootPath = Path.dirname(Path.dirname(__filename))
process.env.ROOT_PATH = rootPath

export default {
  ...process.env,
}
