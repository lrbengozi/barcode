import request from 'supertest'
import app from '../../src/app'

describe('GET /boleto - Success', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get(
      '/boleto/21290001192110001210904475617405975870000002000'
    )

    expect(response.status).toBe(200)
  })

  it('should return amount, expirationDate, barCode ', async () => {
    const response = await request(app).get(
      '/boleto/21290001192110001210904475617405975870000002000'
    )

    expect(response.body.amount).toBe('20,00')
    expect(response.body.expirationDate).toBe('2018-07-16')
    expect(response.body.barCode).toBe(
      '21299758700000020000001121100012100447561740'
    )
  })

  it('should return amount, expirationDate, barCode ', async () => {
    const response = await request(app).get(
      '/boleto/836200000005974201110000001010202115852745430094'
    )

    expect(response.body.amount).toBe('97,42')
    expect(response.body.barCode).toBe(
      '83620000000974201110000010102021185274543009'
    )
  })
})

describe('GET /boleto - FAIL', () => {
  it('should return status code 400', async () => {
    const response = await request(app).get(
      '/boleto/21290001111110001210904475617405975870000002000'
    )

    expect(response.status).toBe(400)
  })

  it('should be return error message', async () => {
    const response = await request(app).get(
      '/boleto/21290001111110001210904475617405975870000002000'
    )

    expect(response.body.message).toBe('Linha digitável invalida')
  })

  it('should be return type error message', async () => {
    const response = await request(app).get(
      '/boleto/teste'
    )

    expect(response.body.message).toBe("Deve ser informado apenas numeros!")
  })
})
