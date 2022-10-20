import { Response as NodeFetchResponse } from 'node-fetch'

interface Callback {
  (error?: Error | null, response?: any, httpResponse?: NodeFetchResponse): any
}

export {
  Callback
}
