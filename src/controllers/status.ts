import { Request, Response } from 'express'

class Status {
  async handle(request: Request, response: Response) {
    return response.json({ message: 'ok' })
  }
}

export default new Status()
