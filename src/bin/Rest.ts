import Https from 'https'
import Fetch, { RequestInit, RequestInfo, Response, HeadersInit, BodyInit } from 'node-fetch'
import Fs from 'fs'
import Path from 'path'

import ProcessTimer from '@binaries/ProcessTimer'

export default class Rest {
    private processTimer: ProcessTimer;
    private httpsAgent?: Https.Agent | undefined = undefined;
    private Fetch = Fetch;
    private timeout?: number
    private defaultTimeout = 8000;
    private url: RequestInfo = '';
    private options: RequestInit | undefined;
    private cookies: Array<{ key: string, value: string}> = [];

    constructor () {
      this.processTimer = new ProcessTimer()

      this.httpsAgent = new Https.Agent({
        ca: Fs.readFileSync(
          Path.resolve(__dirname, '../certificates/global.crt')
        )
      })

      this.Fetch = Fetch
      this.timeout = this.defaultTimeout
    }

    getProcesstimer (): ProcessTimer {
      return this.processTimer
    }

    setRequestTimeout (milliseconds: number): Rest {
      this.timeout = milliseconds * 1000 || this.defaultTimeout
      return this
    }

    setHttpsAgent (httpsAgent: Https.Agent | undefined): Rest {
      this.httpsAgent = httpsAgent
      return this
    }

    clearCookie (): void {
      this.cookies = []
    }

    addCookie (value: string): void {
      const values = value.split('=')
      let alreadyExist = false

      if (values.length) {
        alreadyExist = this.cookies.some((cookie) => cookie.key === values[0])
        if (!alreadyExist) {
          this.cookies.push({
            key: values[0],
            value: values[1]
          })
        }
      }
    }

    getCookie (): string {
      const prepare = this.cookies
        .map((cookie: { key: string, value: string}) => {
          if (cookie.key) return cookie.key.concat('=', cookie.value)
          return ''
        }).filter((item: string) => item)

      return prepare.join(';')
    }

    setHeader (headers: HeadersInit): Rest {
      if (this.options) this.options.headers = headers
      return this
    }

    addHeader (key: string, value: string): Rest {
      if (!this.options) this.options = {}

      this.options.headers = { ...this.options.headers, [key]: value }
      return this
    }

    private async fetch (): Promise<Response> {
      if (!this.options) this.options = {}
      if (this.httpsAgent) this.options.agent = this.httpsAgent
      if (this.options.method === 'GET') delete this.options.body

      this.options.headers = {
        connection: 'keep-alive',
        accept: '*/*',
        'Content-Type': 'application/json',
        ...this.options.headers,
        cookie: this.getCookie()
      }

      const response = this.Fetch(this.url, this.options)
        .then(response => {
          this.processTimer.stop()
          return response
        })

      return response
    }

    get (url: string, opts?: RequestInit | undefined): Promise<Response> {
      this.configureRequest('GET', url, opts)
      return this.fetch()
    }

    post (url: string, body: BodyInit, opts?: RequestInit | undefined): Promise<Response> {
      if (!this.options) this.options = {}
      this.options.body = (typeof body === 'string') ? body : JSON.stringify(body)

      this.configureRequest('POST', url, opts)
      return this.fetch()
    }

    configureRequest (method: string | undefined, url: string, opts: RequestInit | undefined): void {
      this.url = url

      if (!this.options && opts) {
        this.options = opts
      } else if (this.options && opts) {
        this.options = {
          ...this.options,
          ...opts
        }
      } else if (!this.options) {
        this.options = {}
      }

      this.options.method = method
      this.options.timeout = this.timeout
      this.options.agent = this.httpsAgent
    }
}
