/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpServer } from 'http-server'

export class Server extends HttpServer {
  static readonly defaultPort = 3000

  constructor(options: any = {
    root: '.'
  }) {
    super(options)
  }

  listen(port = Server.defaultPort) {
    return new Promise((resolve) => {
      super.listen(port, resolve)
    })
  }

  close() {
    super.close()
  }
}

const maybeRunIndex = process.argv.indexOf(__filename)

if (~maybeRunIndex && maybeRunIndex === process.argv.length - 1) {
  void new Server().listen()
}
