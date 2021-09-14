import { Request, Response, NextFunction } from 'express'

class BoletoMiddleware {
  async validate(request: Request, response: Response, next: NextFunction) {
    const { linhadigitavel } = request.params;
    
    if(!parseInt(linhadigitavel)) {
      return response.status(400)
      .json({
        message: "Deve ser informado apenas numeros!"
      })
    }

    next();
  }
}

export default new BoletoMiddleware()
