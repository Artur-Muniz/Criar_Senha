const slider = document.getElementById('slider');

const tamanho = document.getElementById('tamanho');
tamanho.innerHTML = `Quantidade de caracteres: ${slider.value}`;

const facilP = document.getElementById('facilPronunciar')
const facilL = document.getElementById('facilLer')
const todos = document.getElementById('todos')

const letraMa = document.getElementById('letraMaiuscula')
const letraMi = document.getElementById('letraMinuscula')
const numeros = document.getElementById('numeros')
const simbolos = document.getElementById('simbolos')
const repeticao = document.getElementById('repeticao')

const letra = "abcdefghijklmnopqrstuvwxyz"
const letraM = letra.toUpperCase()
const numero = "0123456789"
const simbolo = "!@#$%&*()_+-=[]{}|;:,.<>?/"


const criar = document.getElementById('criar')
const retorno = document.getElementById('retorno')
const senhaForca = document.getElementById('senhaForca')
const barraForca = document.getElementById('barraForca')

slider.oninput = function() {
  tamanho.innerHTML = `Quantidade de caracteres: ${this.value}`
}

// const dificuldades = document.querySelectorAll('input[name = "opcao"]');
//queryselector e buscar com o name para fazer um onchange ao mesmo tempo
// window.addEventListener('load', () => {
//   document.getElementById('facilPronunciar').click()
// })

// dificuldades.forEach(element => {
//   element.addEventListener("change", () => {
//       trataTudo();
//   })
  
// })

// function trataTudo(){
//   const difSelecionada = document.querySelector('input[name = "opcao"]:checked').value;

//   letraMa.checked = true
//   letraMi.checked = true
//   numeros.checked = true
//   simbolos.checked = true

//   //nao usar else nunca!
//   if (difSelecionada == "facilP") {
//     numeros.checked = false
//     simbolos.checked = false
//     return
//   }

//   if (difSelecionada == "facilL") {
//     simbolos.checked = false
//     return
//   }
// }

facilP.onchange = function() {
  if (facilP.checked) {
    letraMa.checked = true
    letraMi.checked = true
    numeros.checked = false
    simbolos.checked = false
  }
}

facilL.onchange = function() {
  if (facilL.checked) {
    letraMa.checked = true
    letraMi.checked = true
    numeros.checked = true
    simbolos.checked = false
  }
}

todos.onchange = function() {
  if (todos.checked) {
    letraMa.checked = true
    letraMi.checked = true
    numeros.checked = true
    simbolos.checked = true
  }
}

letraMa.onclick = function(e) {
  e.preventDefault()
}
letraMi.onclick = function(e) {
  e.preventDefault()
}
numeros.onclick = function(e) {
  e.preventDefault()
}
simbolos.onclick = function(e) {
  e.preventDefault()
}

function gerarSenha(caracteres) {
  let senha = ''
  let ultimoCarac = ''

  for (i = 0; i < slider.value; i++) {
    let itens = Math.floor(Math.random() * caracteres.length)

    if (repeticao.checked) {
      while (caracteres[itens] === ultimoCarac) {
        itens = Math.floor(Math.random() * caracteres.length)
      }
    }

    senha += caracteres[itens]
    ultimoCarac = caracteres[itens]
  }
  return senha
}

criar.onclick = function(e) {
  e.preventDefault()

  let caracteres = ''
  let resultado = ''
  let corBarra = ''

  if (facilP.checked) {
    caracteres = letra + letraM
    resultado = gerarSenha(caracteres)
  } else if (facilL.checked) {
    caracteres = letra.replace(/[l]/g, "") + letraM.replace(/[IO]/g, "") + numero.replace(/[10]/g, "")
    resultado = gerarSenha(caracteres)
    console.log(caracteres)
  } else if (todos.checked) {
    caracteres = letra + letraM + numero + simbolo
    resultado = gerarSenha(caracteres)
  } else {
    return alert('Selecione uma opção')
  }
  
  retorno.innerText = resultado
  
  const forca = forcaSenha(resultado)

  if(forca <= 30){
    corBarra = 'red'
  }else if(forca >= 31 & forca <= 60){
    corBarra = 'yellow'
  }else{
    corBarra = 'green'
  }

  barraForca.innerHTML = `<div id="progresso" style="height: 100%; width: ${forca}%; background-color: ${corBarra}; border-radius: 12px"></div>` 
  
  senhaForca.innerHTML = forca + "%"
}

function forcaSenha(senha) {
  let forca = ''
  if (senha.length >= 8 & senha.length <= 11) {
    forca = 10
  } else if (senha.length >= 12 & senha.length <= 15) {
    forca = 20
  } else if (senha.length >= 16 & senha.length <= 20) {
    forca = 30
  } else if (senha.length >= 21 & senha.length <= 25) {
    forca = 40
  } else if (senha.length >= 26) {
    forca = 50
  }

  if (/[a-z]/.test(senha)) {
    forca += 10
  }
  if (/[A-Z]/.test(senha)) {
    forca += 10
  }
  if (/\d/.test(senha)) {
    forca += 10
  }
  if (/[!@#$%&*()_+\-=\[\]{}|;:',.<>?/]/.test(senha)) {
    forca += 10
  }
  if (repeticao.checked) {
    forca += 10
  }



  return forca
}

retorno.onclick = function(){
  navigator.clipboard.writeText(retorno.innerText)
  .then(() => {
    alert("Senha copiada!")
  })
}