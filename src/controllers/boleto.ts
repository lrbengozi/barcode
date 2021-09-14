import { Request, Response } from 'express'

class Boleto {
  async handle(request: Request, response: Response) {
    return response.json({ message: 'boleto' })
  }
}

export default new Boleto()
