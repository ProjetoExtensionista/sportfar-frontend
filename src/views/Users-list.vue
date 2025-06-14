<template>
    <div id="modalities">
        <Header>
        </Header>
        <div class="d-flex" style="margin-top: 20px;">
            <button class="btn-add rounded" @click="abrirModal = true">
                <p class="mb-0">Adicionar Usuário</p>
            </button>
            <div>
                <div class="menu-modalities d-flex flex-column">
                    <div class="filters search">
                        <div>
                            <p class="title-filter">Buscar Usuário</p>
                        </div>
                        <div class=" mb-3 position-relative">
                            <input type="text" class="input-search form-control" v-model="buscaNome"
                                placeholder="Digite o nome do usuário">
                            <i class="input-icon fa-regular fa-magnifying-glass"></i>
                        </div>

                        <div class=" mb-3 position-relative">
                            <input type="text" class="input-search form-control" v-model="buscaEmail"
                                placeholder="Digite o e-mail do usuário">
                            <i class="input-icon fa-regular fa-magnifying-glass"></i>
                        </div>

                        <div class=" mb-3 position-relative">
                            <input type="text" class="input-search form-control" v-model="buscaNumero"
                                placeholder="Digite o número do usuário">
                            <i class="input-icon fa-regular fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-block w-100">
                <div class="sub-header d-flex align-items-end w-100">
                    <div
                        v-for="(item, index) in modalities"
                        :key="index"
                        class="opt-modality d-flex align-items-center justify-content-center"
                        :class="{ active: selected === item.value }"
                        @click="selectModality(item.value)"
                    >
                        <p class="mb-0">{{ item.label }}</p>

                        <div v-if="selected === item.value" class="curve-2">
                        <div></div>
                        </div>
                        <div v-if="selected === item.value" class="curve-1">
                        <div></div>
                        </div>
                    </div>
                </div>
                <div class="submain-block">
                    <div v-if="tableValues.length > 0" class="card-space d-flex flex-wrap align-items-start justify-content-start">
                        <TableList :tableHeader="tableHeader" :tableValues="usuariosFiltrados" />
                    </div>
                    <div v-else class=" d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <p class="subtitle mt-0 mb-5">Ainda não foi registrado nenhum usuário</p>
                        <img src="../assets/images/caixa.png" alt="Caixa" width="120">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="abrirModal" class="modal-overlay">
    <div class="modal-content">
      <!-- Botão de fechar -->
      <button class="fechar-modal" @click="abrirModal = false">×</button>

      <h2>Cadastrar Professor</h2>

      <div class="modal-grid">
        <!-- Criar novo usuário -->
        <section class="modal-section">
          <h3>Criar novo usuário</h3>
          <input v-model="novoUsuario.full_name" placeholder="Nome completo" />
          <input v-model="novoUsuario.cpf" placeholder="CPF" />
          <input v-model="novoUsuario.birth_date" type="date" placeholder="Data de nascimento" />
          <input v-model="novoUsuario.email" placeholder="Email" />
          <input v-model="novoUsuario.address" placeholder="Endereço" />
          <input v-model="novoUsuario.city" placeholder="Cidade" />
          <input v-model="novoUsuario.cep" placeholder="CEP" />
          <input v-model="novoUsuario.phone" placeholder="Telefone (opcional)" />
          <input v-model="novoUsuario.password" placeholder="Senha" />

          <button @click="criarNovoUsuario">Criar</button>
        </section>

        <!-- Relacionar com usuário existente -->
        <section class="modal-section">
          <h3>Relacionar usuário existente</h3>
          <input v-model="filtroEmail" placeholder="Filtrar por email" />

          <ul class="usuarios-lista">
            <li v-for="user in usuariosFiltrados" :key="user.email" class="usuario-item">
              <span>{{ user.nome }} ({{ user.email }})</span>
              <button @click="relacionarUsuarioExistente(user)">Relacionar</button>
            </li>
          </ul>
        </section>
      </div>
    </div>
    </div>

</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Header from './components/Header.vue'
import TableList from './components/TableList.vue'
import UserService from '../services/UsersService';

const selected = ref('todos')

const modalities = [
  { label: 'Todos', value: 'todos' },
  { label: 'Alunos', value: 'alunos' },
  { label: 'Professores', value: 'professores' }

]

function selectModality(value: string) {
  selected.value = value
}


const tableHeader = ["Nome", "Email", "Telefone"];

const tableValues = ref<any[]>([])
const buscaNome = ref('')
const buscaEmail = ref('')
const buscaNumero = ref('')


const usuariosFiltrados = computed(() => {
  return tableValues.value.filter(user => {
    const nomeMatch = user.Nome.toLowerCase().includes(buscaNome.value.trim().toLowerCase())
    const emailMatch = user.Email.toLowerCase().includes(buscaEmail.value.trim().toLowerCase())
    const telefoneMatch = user.Telefone.toLowerCase().includes(buscaNumero.value.trim().toLowerCase())

    const tipoMatch =
      selected.value === 'todos' || (user.Tipo && user.Tipo.toLowerCase() === selected.value)


    return nomeMatch && emailMatch && telefoneMatch && tipoMatch
  })
})


const loadUsers = async () => {
  try {
    const [professoresRes, alunosRes] = await Promise.all([
      UserService.getByType(1),
      UserService.getByType(2)
    ])

    const professores = (professoresRes.data ?? []).map((user: any) => ({
      Nome: user.fullName,
      Email: user.email,
      Telefone: user.phone,
      Tipo: 'professores'
    }))

    const alunos = (alunosRes.data ?? []).map((user: any) => ({
      Nome: user.fullName,
      Email: user.email,
      Telefone: user.phone,
      Tipo: 'alunos'
    }))

    // Junta todos
    tableValues.value = [...professores, ...alunos]

  } catch (error) {
    console.error("Erro ao carregar usuários:", error)
  }
}




onMounted(loadUsers)


const abrirModal = ref(false)

const novoUsuario = ref({
  full_name: '',
  cpf: '',
  birth_date: '',
  email: '',
  password: '',
  address: '',
  city: '',
  cep: '',
  phone: '',
  type: ''
})

// MODELO 1: CRIANDO USUARIO DO ZERO
function criarNovoUsuario() {
    const camposObrigatorios = [
    'full_name', 'cpf', 'birth_date', 'email',
    'address', 'city', 'cep', 'password'
    ]

    const labels = {
    full_name: 'Nome completo',
    cpf: 'CPF',
    birth_date: 'Data de nascimento',
    email: 'Email',
    password: 'Senha',
    address: 'Endereço',
    city: 'Cidade',
    cep: 'CEP'
    }

    const faltando = camposObrigatorios.filter(
    campo => !novoUsuario.value[campo]?.toString().trim()
    )

    if (faltando.length > 0) {
    const faltandoLabel = faltando.map(campo => labels[campo] || campo)
    alert(`Preencha todos os campos obrigatórios:\n- ${faltandoLabel.join('\n- ')}`)
    return
    }

    try {
    // Simulação de chamada à API — substitua por sua função real
    // await apiCriarUsuario(novoUsuario.value)
    console.log('Usuário criado:', novoUsuario.value)

    // Adiciona à lista de professores
    professores.value.push({
        name: novoUsuario.value.full_name,
        email: novoUsuario.value.email,
        phone: novoUsuario.value.phone || '',
        photo: novoUsuario.value.photo || 'foto1.jpg', // substitua por real se aplicável
        cor: corAleatoria()
    })

    // Remove da lista de usuários (caso esteja lá por algum motivo)
    usuariosExistentes.value = usuariosExistentes.value.filter(
        u => u.email !== novoUsuario.value.email
    )

    // Limpa o formulário
    Object.keys(novoUsuario.value).forEach(key => {
        novoUsuario.value[key] = ''
    })

    // Fecha o modal
    abrirModal.value = false
    } catch (error) {
    console.error('Erro ao criar usuário:', error)
    alert('Erro ao criar o usuário. Tente novamente.')
    }
}



</script>




<style scoped>
body, p, h1, h2, h3, h4, h5, h6, label, span {
    font-family: "Montserrat", sans-serifs;
}

#modalities {
    overflow: hidden;
    height: 100vh;
    max-height: 100vh;
}

#modalities .btn-add {
    bottom: 20px;
    right: 82px;
    position: absolute;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: #c3c3c3a2;
    text-decoration: none !important;
    padding: 12px 24px;
}

#modalities .btn-add p {
    color: #212529;
    font-size: 16px;
    font-weight: 700;
}


#modalities .submain-block {
    height: calc(100% - 93px);
    border-top: 3px solid #d9d9d9;
    border-left: 3px solid #d9d9d9;
    border-top-left-radius: 32px;
}

#modalities .submain-block .subtitle{
    font-size: 17px;
    font-weight: 600;
    color: #212529;
}

#modalities .sub-header {
    margin-top: 3px;
    height: 90px;
    padding-left: 100px;
}

#modalities .sub-header .opt-modality.active {
    position: relative;
    bottom: -3px;
    background-color: white;
    border-radius: 32px 32px 0 0;
    border-top: 3px solid #d9d9d9;
    border-left: 3px solid #d9d9d9;
    border-right: 3px solid #d9d9d9;
}

#modalities .sub-header .opt-modality {
    position: relative;
    width: 140px;
    height: 56px;
    cursor: pointer;

}

#modalities .sub-header .opt-modality p {
    height: fit-content;
    font-weight: 700;
}
#modalities .sub-header .curve-2 {
    position: absolute;
    background-color: white;
    right: -32px;
    top: 25px;
}

#modalities .sub-header .curve-2 div {
    width: 32px;
    height: 28px;
    border: 3px solid #d9d9d9;
    border-radius: 0 0 0 32px;
    background-color: #ffffff;
    border-right: 0;
    border-top: 0px solid;
}

#modalities .sub-header .curve-1 {
    position: absolute;
    background-color: white;
    left: -32px;
    top: 25px;
}

#modalities .sub-header .curve-1 div {
    width: 32px;
    height: 28px;
    border: 3px solid #d9d9d9;
    border-radius: 0 0 32px 0;
    background-color: #ffffff;
    border-left: 0;
    border-top: 0px solid;
}

#modalities .menu-modalities{
    transition: all ease-in-out 0.4s;
    width: 305px;
    height: calc(100vh - 200px);
    padding: 10px;
}

#modalities .main-search {
    padding: 10px;
    height: 90px;
}

#modalities .main-search .input-search {
    font-size: 16px;
    height: 36px;
    padding: 12px 30px;
}

#modalities .main-search .input-icon {
    font-size: 14px;
    top: calc(50% - 6.5px);
    left: 10px;
}


#modalities .menu-modalities .filters {
    border-bottom: 3px solid #d9d9d9;
    padding: 24px 32px;
}

#modalities .menu-modalities .filters:last-child {
    border-bottom: 0px solid transparent;
}

#modalities .menu-modalities .filters.search {
    height: calc(100% - 257px);
    overflow: hidden;
}

#modalities .menu-modalities .filters.search .results {
    border: 1px solid #d9d9d9;
    border-radius: 0.75rem;
    padding: 4px 12px;
    max-height: calc(100% - 87px);
    overflow: auto;
}

#modalities .input-search {
    color: #d9d9d9;
    padding: 4px 12px 4px 24px;
    border-radius: 0.75rem;
}

#modalities input[type=text] {
    color: #212529;
    font-size: 14px;
    border-color: #d9d9d9;
}

#modalities .input-icon {
    color: #d9d9d9;
    position: absolute;
    top: calc(50% - 5px);
    left: 8px;
    font-size: 12px;
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #ffffff00;
}

::-webkit-scrollbar-thumb {
    background: #d9d9d9;
}

::-webkit-scrollbar-thumb:hover {
    background: #d9d9d9;
}

.card-space {
    margin: 40px 40px 0 40px;
    gap: 16px;
    height: calc(80% - 93px);
    overflow-y: auto;
}
@media screen and (min-width:1440px) {
    .card-box {
        width: calc(25% - 12px);
        height: 180px;
    }
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 95%;
  max-width: 900px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.fechar-modal {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.modal-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}


</style>
