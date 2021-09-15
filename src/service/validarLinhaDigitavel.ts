import moment from 'moment'
interface CamposBloco {
  bloco: string
  dvBloco: string
}

const validarBloco = (dados: CamposBloco) => {
  const { bloco, dvBloco } = dados

  let soma = 0
  let peso = 2

  for (let i = bloco.length - 1; i >= 0; i--) {
    let result = parseInt(bloco[i]) * peso

    if (result > 9) {
      result =
        parseInt(result.toString().slice(0, 1)) +
        parseInt(result.toString().slice(1, 2))
    }

    soma += result
    if (peso === 2) peso = 1
    else peso = 2
  }

  const dezena = Math.ceil(soma / 10) * 10
  const resto = soma % dezena

  const dv = dezena - resto

  return dv === parseInt(dvBloco)
}

const validarBlocoModulo10 = (dados: CamposBloco) => {
  const { bloco, dvBloco } = dados

  let soma = 0
  let peso = 2

  for (let i = bloco.length - 1; i >= 0; i--) {
    let result = parseInt(bloco[i]) * peso

    if (result > 9) {
      result =
        parseInt(result.toString().slice(0, 1)) +
        parseInt(result.toString().slice(1, 2))
    }

    soma += result
    if (peso === 2) peso = 1
    else peso = 2
  }

  const resto = soma % 10

  let dv = 0

  if (10 - resto < 10) dv = 10 - resto

  console.log(`dv: ${dv} parseInt(dvBloco): ${parseInt(dvBloco)}`)

  return dv === parseInt(dvBloco)
}

const validarBlocoModulo11 = (dados: CamposBloco) => {
  const { bloco, dvBloco } = dados

  let soma = 0
  let pesos = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4]

  for (let i = bloco.length - 1; i >= 0; i--) {
    let result = parseInt(bloco[i]) * pesos[i]

    soma += result
  }

  const resto = soma % 11

  let dv = 0

  if (resto !== 0 && resto !==  1 && resto !==  10) dv = resto - 11

  return dv === parseInt(dvBloco)
}

const converterRespostaBoletoBancario = (linha: string) => {
  const barCode = `${linha.slice(0, 4)}${linha.slice(32)}${linha.slice(
    4,
    9
  )}${linha.slice(10, 20)}${linha.slice(21, 31)}`

  const amount = `${parseInt(linha.slice(37, 45))},${linha.slice(45)}`

  const expirationDate = moment('1997-10-07')
    .add('days', parseInt(linha.slice(33, 37)))
    .format('YYYY-MM-DD')

  return {
    barCode,
    amount,
    expirationDate,
  }
}

const converterRespostaBoletoConcessionarias = (linha: string) => {
  const barCode = `${linha.slice(0, 11)}${linha.slice(12, 23)}${linha.slice(
    24,
    35
  )}${linha.slice(36, 47)}`

  const amount = `${parseInt(barCode.slice(4, 13))},${barCode.slice(13, 15)}`

  const expirationDate = ''

  return {
    barCode,
    amount,
    expirationDate,
  }
}

const validarLinhaConcessionarias = (linha: string) => {
  let linhaDigitavelBoletoConcessionaria = false

  if (linha.slice(2, 3) === '6' || linha.slice(2, 3) === '7') {
    //Modulo 10
    const bloco1 = validarBlocoModulo10({
      bloco: linha.slice(0, 11),
      dvBloco: linha.slice(11, 12),
    })

    const bloco2 = validarBlocoModulo10({
      bloco: linha.slice(12, 23),
      dvBloco: linha.slice(23, 24),
    })

    const bloco3 = validarBlocoModulo10({
      bloco: linha.slice(24, 35),
      dvBloco: linha.slice(35, 36),
    })

    const bloco4 = validarBlocoModulo10({
      bloco: linha.slice(36, 47),
      dvBloco: linha.slice(47),
    })

    if (bloco1 && bloco2 && bloco3 && bloco4)
      linhaDigitavelBoletoConcessionaria = true

    return linhaDigitavelBoletoConcessionaria
  } else if (linha.slice(2, 3) === '8' || linha.slice(2, 3) === '9') {
    //Modulo 11
    const bloco1 = validarBlocoModulo11({
      bloco: linha.slice(0, 11),
      dvBloco: linha.slice(11, 12),
    })

    const bloco2 = validarBlocoModulo11({
      bloco: linha.slice(12, 23),
      dvBloco: linha.slice(23, 24),
    })

    const bloco3 = validarBlocoModulo11({
      bloco: linha.slice(24, 35),
      dvBloco: linha.slice(35, 36),
    })

    const bloco4 = validarBlocoModulo11({
      bloco: linha.slice(36, 47),
      dvBloco: linha.slice(47),
    })

    if (bloco1 && bloco2 && bloco3 && bloco4)
      linhaDigitavelBoletoConcessionaria = true

    return linhaDigitavelBoletoConcessionaria

  }

  return linhaDigitavelBoletoConcessionaria
}

const validarLinhaDigitavel = (linha: string) => {
  let linhaDigitavelBoletoBancario = false

  const bloco1 = validarBloco({
    bloco: linha.slice(0, 9),
    dvBloco: linha.slice(9, 10),
  })

  const bloco2 = validarBloco({
    bloco: linha.slice(10, 20),
    dvBloco: linha.slice(20, 21),
  })

  const bloco3 = validarBloco({
    bloco: linha.slice(21, 31),
    dvBloco: linha.slice(31, 32),
  })

  if (bloco1 && bloco2 && bloco3) linhaDigitavelBoletoBancario = true

  if (linhaDigitavelBoletoBancario) {
    return converterRespostaBoletoBancario(linha)
  } else if (validarLinhaConcessionarias(linha)) {
    return converterRespostaBoletoConcessionarias(linha)
  } else {
    throw new Error('Linha digitável inválida')
  }
}

export default validarLinhaDigitavel
