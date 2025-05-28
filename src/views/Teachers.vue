<script setup>
import { ref, computed, onMounted } from 'vue'
import Header from './components/Header.vue'
import CardBoxTeacher from './components/CardBoxTeacher.vue'
// import { getProfessores } from './services/professor.js'

const professores = ref([])

const buscaNome = ref('')
const buscaEmail = ref('')
const buscaTelefone = ref('')

const coresDisponiveis = [
  '#0D6EFD', // futsal
  '#FF6607', // basquete
  '#2F7345', // handbal
  '#FFC107', // vôlei
  '#607D8B'  // default
]

function corAleatoria() {
  const index = Math.floor(Math.random() * coresDisponiveis.length)
  return coresDisponiveis[index]
}

// Dados mock para teste
const professoresMock = [
  {
    fullName: "Lucas Silva",
    email: "lucas.silva@example.com",
    phone: "(54) 99179-1247",
    photo: "foto1.jpg",
  },
  {
    fullName: "Ana Pereira",
    email: "ana.pereira@example.com",
    phone: "(11) 12345-6789",
    photo: "foto2.jpg",
  },
  {
    fullName: "Carlos Souza",
    email: "carlos.souza@example.com",
    phone: "(21) 98765-4321",
    photo: "foto3.jpg",
  }
]

// Função para usar a api, remover o mock
async function carregarProfessores() {
  /*
  try {
    const dados = await getProfessores()
    professores.value = dados.map(p => ({
      name: p.fullName,
      email: p.email,
      phone: p.phone,
      photo: p.photo,
      cor: corAleatoria()
    }))
  } catch (error) {
    console.error('Erro ao carregar professores:', error)
  }
  */

  // Usando dados mock para teste:
  professores.value = professoresMock.map(p => ({
    name: p.fullName,
    email: p.email,
    phone: p.phone,
    photo: p.photo,
    cor: corAleatoria()
  }))
}

onMounted(() => {
  carregarProfessores()
})

function limparTexto(texto) {
  return texto
    .toLowerCase()
    .replace(/\s/g, '')       // remove espaços
    .replace(/[\(\)\-\.\@]/g, '') // remove parênteses, traços, pontos e arrobas
}

// Filtra os professores
const professoresFiltrados = computed(() => {
  return professores.value.filter(prof => {
    const nomeMatch = prof.name.toLowerCase().startsWith(buscaNome.value.trim().toLowerCase())
    const emailMatch = prof.email.toLowerCase().startsWith(buscaEmail.value.trim().toLowerCase())

    const telefoneLimpo = limparTexto(prof.phone)
    const buscaTelefoneLimpo = limparTexto(buscaTelefone.value)

    const telefoneMatch = telefoneLimpo.startsWith(buscaTelefoneLimpo)

    return nomeMatch && emailMatch && telefoneMatch
  })
})
</script>

<template>
  <div class="pagina">
    <Header></Header>

    <div class="container-principal">
      <aside class="filtros">
        <h2>Filtros</h2>

        <label for="nome">Nome:</label>
        <input id="nome" type="text" v-model="buscaNome" placeholder="Filtrar por nome" />

        <label for="email">Email:</label>
        <input id="email" type="text" v-model="buscaEmail" placeholder="Filtrar por email" />

        <label for="telefone">Telefone:</label>
        <input id="telefone" type="text" v-model="buscaTelefone" placeholder="Filtrar por telefone" />
      </aside>

      <section class="conteudo-professores">
        <h1 class="titulo">LISTA PROFESSORES</h1>

        <div class="lista-cards">
          <CardBoxTeacher
            v-for="prof in professoresFiltrados"
            :key="prof.email"
            :name="prof.name"
            :email="prof.email"
            :phone="prof.phone"
            :photo="prof.photo"
            :cor="prof.cor"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pagina {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container-principal {
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
  background-color: #f9f9f9;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.filtros {
  width: 25%;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filtros label {
  font-weight: 600;
  margin-top: 10px;
}

.filtros input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.conteudo-professores {
  width: 75%;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.titulo {
  font-size: 24px;
  margin-bottom: 16px;
}

.lista-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
}

@media (max-width: 1024px) {
  .container-principal {
    flex-wrap: wrap;
  }

  .filtros,
  .conteudo-professores {
    width: 100%;
  }

  .conteudo-professores {
    margin-top: 20px;
  }
}

@media (max-width: 480px) {
  .titulo {
    font-size: 20px;
  }

  .filtros label,
  .filtros input {
    font-size: 13px;
  }

  .lista-cards {
    justify-content: center;
  }
}
</style>
