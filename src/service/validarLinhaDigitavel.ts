import moment from "moment"; 
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

const converterRespostaBoletoBancario = (linha: string) => {
  const barCode = `${linha.slice(0, 4)}${linha.slice(32)}${linha.slice(4, 9)}${linha.slice(10,20)}${linha.slice(21, 31)}`

  const amount = `${parseInt(linha.slice(37, 45))},${linha.slice(45)}`

  const expirationDate = moment("1997-10-07").add("days", parseInt(linha.slice(33,37))).format("YYYY-MM-DD")

  console.log(expirationDate);

  return {
    barCode,
    amount,
    expirationDate,
  }
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

  if(bloco1 && bloco2 && bloco3) linhaDigitavelBoletoBancario = true

  if (linhaDigitavelBoletoBancario) {
    return converterRespostaBoletoBancario(linha)
  } else {
    throw new Error('Linha digitável inválida')
  }

}

export default validarLinhaDigitavel
