import { Request, Response } from 'express'
import validarLinhaDigitavel from '../service/validarLinhaDigitavel'

class Boleto {
  async handle(request: Request, response: Response) {
    const { linhadigitavel } = request.params

    try {
      const message = validarLinhaDigitavel(linhadigitavel)

      return response.status(200).json(message)
    } catch (error) {
      console.log(`Erro ao validar linha ${error}`)
      return response.status(400).json({ message: 'Linha digitável invalida' })
    }
  }
}

export default new Boleto()
