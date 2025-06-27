<template>
    <div id="modalities">
        <Header>
        </Header>
        <div class="d-flex" style="margin-top: 20px;">
            <div class="fab-wrapper">
            <button class="fab" @click="abrirNovoUsuarioModal = true">+</button>
            </div>
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
                    <div v-if="usuariosFiltrados.length > 0" class="card-space d-flex flex-wrap align-items-start justify-content-start">
                        <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(usuario, index) in usuariosFiltrados" :key="index">
                            <td>{{ usuario.fullName }}</td>
                            <td>{{ usuario.email }}</td>
                            <td>{{ usuario.phone }}</td>
                            <td>
                                <button class="btn btn-sm btn-primary" @click="editarUsuario(usuario.raw)">Editar</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div v-else class=" d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <p class="subtitle mt-0 mb-5">Ainda não foi registrado nenhum usuário</p>
                        <img src="../assets/images/caixa.png" alt="Caixa" width="120">
                    </div>
                </div>
            </div>
        </div>
    </div>

<!-- Modal cadastro de User -->
    <div v-if="abrirNovoUsuarioModal" class="modal-overlay">
    <div class="modal-content">
      <!-- Botão de fechar -->
      <button class="fechar-modal" @click="abrirNovoUsuarioModal = false">×</button>

      <h2>Cadastrar Educador</h2>

      <div class="modal-grid">
        <!-- Criar novo usuário -->
        <section class="modal-section">
          <h3>Criar novo usuário</h3>
          <input v-model="novoUsuario.fullName" placeholder="Nome completo" />
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
      </div>
    </div>
    </div>

<!-- Modal editar de User -->
    <div v-if="abrirEditarUser" class="modal-overlay">
    <div class="modal-content">
        <!-- Botão de fechar -->
        <button class="fechar-modal" @click="fecharModalEdicao">×</button>

        <h2>{{ modoEdicao ? 'Editar Usuário' : 'Cadastrar Educador' }}</h2>

        <div class="modal-grid">
        <section class="modal-section">
            <h3>{{ modoEdicao ? 'Editar informações' : 'Criar novo usuário' }}</h3>

            <input v-model="novoUsuario.fullName" placeholder="Nome completo" />
            <input v-model="novoUsuario.cpf" placeholder="CPF" />
            <input v-model="novoUsuario.birth_date" type="date" placeholder="Data de nascimento" />
            <input v-model="novoUsuario.email" placeholder="Email" />
            <input v-model="novoUsuario.address" placeholder="Endereço" />
            <input v-model="novoUsuario.city" placeholder="Cidade" />
            <input v-model="novoUsuario.cep" placeholder="CEP" />
            <input v-model="novoUsuario.phone" placeholder="Telefone (opcional)" />

            <div class="checkbox-group">
                <label>
                    <input
                    type="checkbox"
                    v-model="novoUsuario.isAluno"
                    @change="alterarTipo('Aluno', novoUsuario.isAluno)"
                    /> Aluno
                </label>
                <label>
                    <input
                    type="checkbox"
                    v-model="novoUsuario.isEducador"
                    @change="alterarTipo('Educador', novoUsuario.isEducador)"
                    /> Educador
                </label>
                <label>
                    <input
                    type="checkbox"
                    v-model="novoUsuario.isResponsavel"
                    @change="alterarTipo('Responsável', novoUsuario.isResponsavel)"
                    /> Responsável
                </label>
            </div>

            <button @click="modoEdicao ? salvarEdicaoUsuario() : criarNovoUsuario()">
            {{ modoEdicao ? 'Salvar Alterações' : 'Criar' }}
            </button>
        </section>
        </div>
    </div>
    </div>


</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Header from './components/Header.vue'
import UserService from '../services/UsersService';

const selected = ref('todos')

const modalities = [
  { label: 'Todos', value: 'todos' },
  { label: 'Responsáveis', value: 'Responsável' },
  { label: 'Alunos', value: 'Aluno' },
  { label: 'Educadores', value: 'Educador' }

]

function selectModality(value: string) {
  selected.value = value
}


const tableValues = ref<any[]>([])
const buscaNome = ref('')
const buscaEmail = ref('')
const buscaNumero = ref('')


const usuariosFiltrados = computed(() => {
  return tableValues.value.filter(user => {

    const nomeMatch = user.fullName?.toLowerCase().includes(buscaNome.value.trim().toLowerCase());
    const emailMatch = user.email?.toLowerCase().includes(buscaEmail.value.trim().toLowerCase());
    const telefoneMatch = user.phone?.toLowerCase().includes(buscaNumero.value.trim().toLowerCase());
    const tipoMatch = selected.value === 'todos' || user.Tipo.includes(selected.value);

    return nomeMatch && emailMatch && telefoneMatch && tipoMatch;
  });
});


const loadUsers = async () => {
  try {
    const response = await UserService.getAll();
    const users = response ?? [];

    tableValues.value = users.map((user: any) => ({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        Tipo: user.Tipo,
        raw: user
    }));
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
};





onMounted(loadUsers)

const abrirPermissoesModal = ref(false)
const abrirNovoUsuarioModal = ref(false)

const abrirEditarUser = ref(false)
const modoEdicao = ref(false);


const novoUsuario = ref({
    fullName: '',
    cpf: '',
    birth_date: '',
    email: '',
    password: '',
    address: '',
    city: '',
    cep: '',
    phone: '',
    type: '',

    isAluno: false,
    isEducador: false,
    isResponsavel: false
})

// MODELO 1: CRIANDO USUARIO DO ZERO
function criarNovoUsuario() {
    const camposObrigatorios = [
    'fullName', 'cpf', 'birth_date', 'email',
    'address', 'city', 'cep', 'password'
    ]

    const labels = {
    fullName: 'Nome completo',
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
    Educadores.value.push({
        name: novoUsuario.value.fullName,
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
    abrirNovoUsuarioModal.value = false
    } catch (error) {
    console.error('Erro ao criar usuário:', error)
    alert('Erro ao criar o usuário. Tente novamente.')
    }
}

// MODELO 2: EDITAR UM USUARIO
function editarUsuario(usuario) {
    console.log(usuario)
  // Preenche os campos com os dados existentes
  novoUsuario.value = {
    fullName: usuario.fullName || '',
    cpf: usuario.cpf || '',
    birth_date: usuario.birthDate || '',
    email: usuario.email || '',
    address: usuario.address || '',
    city: usuario.city || '',
    cep: usuario.cep || '',
    phone: usuario.phone || '',

    isAluno: usuario.Tipo?.includes('Aluno') || false,
    isEducador: usuario.Tipo?.includes('Educador') || false,
    isResponsavel: usuario.Tipo?.includes('Responsável') || false
  }

  modoEdicao.value = true
  abrirEditarUser.value = true
}

function fecharModalEdicao() {
  abrirEditarUser.value = false
  modoEdicao.value = false
  Object.keys(novoUsuario.value).forEach(key => {
    novoUsuario.value[key] = ''
  })
}

function alterarTipo(tipo, status) {
  console.log(`Tipo: ${tipo} foi ${status ? 'marcado' : 'desmarcado'}`);

  // Aqui você pode adicionar lógica para atualizar o array novoUsuario.Tipo
  if (!novoUsuario.value.Tipo) {
    novoUsuario.value.Tipo = [];
  }

  if (status) {
    // Adiciona o tipo se ainda não tiver
    if (!novoUsuario.value.Tipo.includes(tipo)) {
      novoUsuario.value.Tipo.push(tipo);
    }
  } else {
    // Remove o tipo se desmarcou
    novoUsuario.value.Tipo = novoUsuario.value.Tipo.filter(t => t !== tipo);
  }

  console.log('Tipos atuais:', novoUsuario.value.Tipo);
}

// Botão flutuante
    const showFabMenu = ref(false)

    const toggleMenu = () => {
    showFabMenu.value = !showFabMenu.value
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

/* Estilo do botão flutuante e menu */
.fab-wrapper {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.fab {
  position: relative;
  background-color: white;
  border: 3px solid transparent;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);

  background-image: 
    linear-gradient(white, white),
    linear-gradient(90deg, #1BE7FF 0%, #6EEB83 25%, #E4FF1A 50%, #FFB800 75%, #FF5714 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.fab-menu {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #c3c3c3a2;
  border-radius: 12px;
  padding: 8px;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0,0,0,0.15);
}

.fab-menu button {
  padding: 8px 16px;
  border: none;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.fab-menu button:hover {
  background-color: #e9ecef;
}

</style>
