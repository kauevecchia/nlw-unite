
let participantes = [
  {
    nome: "Kauê Vecchia",
    email: "kaue@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 19, 23),
    dataCheckIn: new Date(2024, 1, 5, 20, 20)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Maria Souza",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Pedro Oliveira",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 12, 20, 20)
  },
  {
    nome: "Ana Rodrigues",
    email: "ana@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 14, 20, 20)
  },
  {
    nome: "Fernanda Santos",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Lucas Costa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 18, 20, 20)
  },
  {
    nome: "Mariana Lima",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 20, 20, 20)
  },
  {
    nome: "Gustavo Almeida",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 22, 20, 20)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = ''
  if(participante.dataCheckIn) {
    dataCheckIn = dayjs(participante.dataCheckIn).fromNow()
  } else {
    dataCheckIn = `
      <button 
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)">
        Confirmar check-in
      </button>
    `
  }

  return `
    <tr>
      <td>
        <strong>${participante.nome}</strong><br>
        <small>${participante.email}</small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}


const atualizarLista = (participantes) => {
  let output = ""

  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista (participantes)

const adicionarParticipante  = (event) => {
  event.preventDefault()


  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Participante já cadastrado!')
  }


  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário 

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // Confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if (confirm(mensagemConfirmacao) == false) {
    return 
  }

  // Encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  // Atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // Atualizar a lista de participantes
  atualizarLista(participantes)
}
