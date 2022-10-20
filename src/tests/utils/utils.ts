/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Response } from 'restify'

const RequestInstance = require('restify/lib/request')
const ResponseInstance = require('restify/lib/response')

const res: Response = ResponseInstance
res.send = (code?: number, body?: any): any => {
  res.code = parseInt(Number(code).toString())
}

export default {
  Request: RequestInstance,
  Response: res
}
