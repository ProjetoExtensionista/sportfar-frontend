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
                    <div v-for="(item, index) in modalities" :key="index"
                        class="opt-modality d-flex align-items-center justify-content-center"
                        :class="{ active: selected === item.value }" @click="selectModality(item.value)">
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
                    <div v-if="usuariosFiltrados.length > 0"
                        class="card-space d-flex flex-wrap align-items-start justify-content-start overflow-y: auto;">
                        <div class="table-scroll">
                            <table class="overflow-hidden">
                                <thead>
                                    <tr class="bg-2">
                                        <th class="th-nome">Nome</th>
                                        <th class="th-email">Email</th>
                                        <th class="th-telefone">Telefone</th>
                                        <th class="th-editar btn-actions-row">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(usuario, index) in usuariosFiltrados" :key="index"
                                        :class="{ 'bg-2': (index + 1) % 2 === 0 }">
                                        <td>
                                            <h5 class="mb-0">{{ usuario.fullName }}</h5>
                                        </td>
                                        <td>
                                            <h5 class="mb-0">{{ usuario.email }}</h5>
                                        </td>
                                        <td>
                                            <h5 class="mb-0">{{ usuario.phone }}</h5>
                                        </td>
                                        <td class="btn-actions-row">
                                            <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                                                <a @click.prevent="editarUsuario(usuario.raw)"
                                                    class="btn-action d-flex align-items-center justify-content-center">
                                                    <i class="fa-light fa-pencil-alt"></i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
            <div class="modal-grid">
                <!-- Criar novo usuário -->
                <section class="modal-section">
                    <form @submit.prevent="criarNovoUsuario">
                        <h2>Formulário para cadastro de usuário</h2>
                        <div class="form-header">
                            <div class="form-sections">
                                <section>
                                    <h3>Dados pessoais do responsável</h3>
                                    <div class="field">
                                        <label>Nome:</label>
                                        <input type="text" v-model="novoUsuario.fullName" placeholder="Nome completo"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>Nascimento:</label>
                                        <input type="date" v-model="novoUsuario.birthDate" placeholder="dd/mm/aaaa"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>CPF:</label>
                                        <input type="text" v-model="novoUsuario.cpf" placeholder="000.000.000-00"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>Celular:</label>
                                        <input type="tel" v-model="novoUsuario.phone" placeholder="(00) 00000-0000"
                                            required />
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <h3>Endereço</h3>
                                    <div class="field">
                                        <label>Rua:</label>
                                        <input type="text" v-model="rua" placeholder="Nome da rua" required />
                                    </div>
                                    <div class="field">
                                        <label>Número:</label>
                                        <input type="text" v-model="numero" placeholder="Número da casa" required />
                                    </div>
                                    <div class="field">
                                        <label>Bairro:</label>
                                        <input type="text" v-model="bairro" placeholder="Nome do bairro" required />
                                    </div>
                                    <div class="field">
                                        <label>CEP:</label>
                                        <input type="text" v-model="novoUsuario.cep" placeholder="00000-000" required />
                                    </div>
                                    <div class="field">
                                        <label>Cidade:</label>
                                        <input type="text" v-model="novoUsuario.city" placeholder="Nome da cidade"
                                            required />
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <h3>Login</h3>
                                    <div class="field">
                                        <label>E-mail:</label>
                                        <input type="email" v-model="novoUsuario.email" placeholder="email@dominio.com"
                                            required />
                                        <small class="aviso">A senha temporária será enviada neste e-mail!</small>
                                    </div>

                                    <div class="field">
                                        <label>Senha:</label>
                                        <div class="input-senha-wrapper">
                                            <input :type="mostrarSenha ? 'text' : 'password'"
                                                v-model="novoUsuario.password" placeholder="Digite uma senha"
                                                required />
                                            <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                                class="icone-senha" @click="mostrarSenha = !mostrarSenha"
                                                title="Mostrar/ocultar senha"></i>
                                        </div>
                                    </div>

                                    <!-- Seção separada apenas para tipos -->
                                    <div class="tipos-usuario">
                                        <label>Tipo de Usuário</label>
                                        <div class="checkbox-group">
                                            <label>
                                                <input type="checkbox" v-model="novoUsuario.isEducador"
                                                    @change="alterarTipo('Educador', novoUsuario.isEducador)" />
                                                Educador
                                            </label>
                                            <label>
                                                <input type="checkbox" v-model="novoUsuario.isResponsavel"
                                                    @change="alterarTipo('Responsável', novoUsuario.isResponsavel)" />
                                                Responsável
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <div class="dependente-btn">
                                        <button class="btn-adicionar" type="button" @click="abrirModalDependente">
                                            <i class="fas fa-plus-circle"></i> Adicionar dependente
                                        </button>
                                    </div>

                                    <div class="lista-dependentes" v-if="dependentes.length > 0">
                                        <div class="dependente-card" v-for="(dep, index) in dependentes" :key="index">
                                            <div class="dependente-nome">{{ dep.fullName }}</div>
                                            <div class="btn-actions">
                                                <button @click="editarDependente(index)" title="Editar">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button @click="excluirDependente(index)" title="Excluir">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <button class="btn-salvar" @click="criarNovoUsuario">
                                    Salvar
                                </button>
                            </div>

                            <div class="image-upload-section">
                                <h3 style="margin-bottom: 20px; color: #333; font-size: 16px;">Foto do perfil</h3>
                                <div class="image-upload-container">
                                    <div class="image-preview" id="imagePreview">
                                        <div class="upload-placeholder">
                                            <svg class="upload-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H11V19H5V3H13V9H21Z" />
                                            </svg>
                                            <div class="upload-text">Clique ou arraste<br />uma foto aqui</div>
                                        </div>
                                        <div class="upload-overlay">
                                            <svg class="change-icon" viewBox="0 0 24 24">
                                                <path
                                                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-image" id="removeImage"
                                        title="Remover imagem">×</button>
                                </div>

                                <input type="file" id="imageInput" accept="image/*" hidden />
                                <button type="button" class="upload-button"
                                    @click="document.getElementById('imageInput').click()">
                                    Selecionar Imagem
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>

    <div v-if="abrirNovoEstudanteModal" class="modal-overlay">
        <div class="modal-content">
            <!-- Botão de fechar -->
            <button class="fechar-modal" @click="fecharNovoDependenteModal">×</button>
            <div class="modal-grid">
                <!-- Criar novo usuário -->
                <section class="modal-section">
                    <form @submit.prevent="salvarDependenteTemporario">
                        <h2>Formulário para cadastro de dependente</h2>
                        <div class="form-header">
                            <div class="form-sections">
                                <section>
                                    <h3>Dados pessoais do dependente</h3>
                                    <div class="field">
                                        <label>Nome:</label>
                                        <input type="text" v-model="novoDependente.fullName" placeholder="Nome completo"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>Nascimento:</label>
                                        <input type="date" v-model="novoDependente.birthDate" placeholder="dd/mm/aaaa"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>CPF:</label>
                                        <input type="text" v-model="novoDependente.cpf" placeholder="000.000.000-00"
                                            required />
                                    </div>
                                    <div class="field">
                                        <label>Celular:</label>
                                        <input type="tel" v-model="novoDependente.phone" placeholder="(00) 00000-0000"
                                            required />
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <h3>Login</h3>
                                    <div class="field">
                                        <label>E-mail:</label>
                                        <input type="email" v-model="novoDependente.email"
                                            placeholder="email@dominio.com" required />
                                        <small class="aviso">A senha temporária será enviada neste e-mail!</small>
                                    </div>
                                    <div class="field">
                                        <label>Senha:</label>
                                        <div class="input-senha-wrapper">
                                            <input :type="mostrarSenha ? 'text' : 'password'"
                                                v-model="novoDependente.password" placeholder="Digite uma senha"
                                                required />
                                            <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                                class="icone-senha" @click="mostrarSenha = !mostrarSenha"
                                                title="Mostrar/ocultar senha"></i>
                                        </div>
                                    </div>
                                </section>

                                <button class="btn-salvar" type="submit" @click="salvarDependenteTemporario">
                                    Salvar
                                </button>
                            </div>

                            <div class="image-upload-section">
                                <h3 style="margin-bottom: 20px; color: #333; font-size: 16px;">Foto do perfil</h3>
                                <div class="image-upload-container">
                                    <div class="image-preview" id="imagePreview">
                                        <div class="upload-placeholder">
                                            <svg class="upload-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H11V19H5V3H13V9H21Z" />
                                            </svg>
                                            <div class="upload-text">Clique ou arraste<br />uma foto aqui</div>
                                        </div>
                                        <div class="upload-overlay">
                                            <svg class="change-icon" viewBox="0 0 24 24">
                                                <path
                                                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-image" id="removeImage"
                                        title="Remover imagem">×</button>
                                </div>

                                <input type="file" id="imageInput" accept="image/*" hidden />
                                <button type="button" class="upload-button"
                                    @click="document.getElementById('imageInput').click()">
                                    Selecionar Imagem
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>

    <!-- Modal cadastro de User -->
    <div v-if="abrirEditarUser" class="modal-overlay">
        <div class="modal-content">
            <!-- Botão de fechar -->
            <button class="fechar-modal" @click="abrirEditarUser = false">×</button>
            <div class="modal-grid">
                <!-- Criar novo usuário -->
                <section class="modal-section">
                    <form @submit.prevent="criarNovoUsuario">
                        <h2>Formulário para cadastro de usuário</h2>
                        <div class="form-header">
                            <div class="form-sections">
                                <section>
                                    <h3>Dados pessoais do responsável</h3>
                                    <div class="field">
                                        <label>Nome:</label>
                                        <input type="text" v-model="novoUsuario.fullName" placeholder="Nome completo" />
                                    </div>
                                    <div class="field">
                                        <label>Nascimento:</label>
                                        <input type="date" v-model="novoUsuario.birthDate" placeholder="dd/mm/aaaa" />
                                    </div>
                                    <div class="field">
                                        <label>CPF:</label>
                                        <input type="text" v-model="novoUsuario.cpf" placeholder="000.000.000-00" />
                                    </div>
                                    <div class="field">
                                        <label>Celular:</label>
                                        <input type="tel" v-model="novoUsuario.phone" placeholder="(00) 00000-0000" />
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <h3>Endereço</h3>
                                    <div class="field">
                                        <label>Rua:</label>
                                        <input type="text" v-model="rua" placeholder="Nome da rua" />
                                    </div>
                                    <div class="field">
                                        <label>Número:</label>
                                        <input type="text" v-model="numero" placeholder="Número da casa" />
                                    </div>
                                    <div class="field">
                                        <label>Bairro:</label>
                                        <input type="text" v-model="bairro" placeholder="Nome do bairro" />
                                    </div>
                                    <div class="field">
                                        <label>CEP:</label>
                                        <input type="text" v-model="novoUsuario.cep" placeholder="00000-000" />
                                    </div>
                                    <div class="field">
                                        <label>Cidade:</label>
                                        <input type="text" v-model="novoUsuario.city" placeholder="Nome da cidade" />
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <h3>Login</h3>
                                    <div class="field">
                                        <label>E-mail:</label>
                                        <input type="email" v-model="novoUsuario.email"
                                            placeholder="email@dominio.com" />
                                        <small class="aviso">A senha temporária será enviada neste e-mail!</small>
                                    </div>

                                    <div class="field">
                                        <label>Senha:</label>
                                        <div class="input-senha-wrapper">
                                            <input :type="mostrarSenha ? 'text' : 'password'"
                                                v-model="novoUsuario.password" placeholder="Digite uma senha" />
                                            <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"
                                                class="icone-senha" @click="mostrarSenha = !mostrarSenha"
                                                title="Mostrar/ocultar senha"></i>
                                        </div>
                                    </div>

                                    <!-- Seção separada apenas para tipos -->
                                    <div class="tipos-usuario">
                                        <label>Tipo de Usuário</label>
                                        <div class="checkbox-group">
                                            <label>
                                                <input type="checkbox" v-model="novoUsuario.isAluno" />
                                                Aluno
                                            </label>
                                            <label>
                                                <input type="checkbox" v-model="novoUsuario.isEducador" />
                                                Educador
                                            </label>
                                            <label>
                                                <input type="checkbox" v-model="novoUsuario.isResponsavel" />
                                                Responsável
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <hr />

                                <section>
                                    <div class="dependente-btn">
                                        <button class="btn-adicionar" type="button" @click="abrirModalDependente">
                                            <i class="fas fa-plus-circle"></i> Adicionar dependente
                                        </button>
                                    </div>

                                    <div class="lista-dependentes" v-if="dependentes.length > 0">
                                        <div class="dependente-card" v-for="(dep, index) in dependentes" :key="index">
                                            <div class="dependente-nome">{{ dep.fullName }}</div>
                                            <div class="btn-actions">
                                                <button @click="editarDependente(index)" title="Editar">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button @click="excluirDependente(index)" title="Excluir">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <form @submit.prevent="modoEdicao ? salvarUsuarioEditado() : criarNovoUsuario()">

                                    <button class="btn-salvar" type="submit">Salvar</button>
                                </form>
                            </div>

                            <div class="image-upload-section">
                                <h3 style="margin-bottom: 20px; color: #333; font-size: 16px;">Foto do perfil</h3>
                                <div class="image-upload-container">
                                    <div class="image-preview" id="imagePreview">
                                        <div class="upload-placeholder">
                                            <svg class="upload-icon" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19A2 2 0 0 0 5 21H11V19H5V3H13V9H21Z" />
                                            </svg>
                                            <div class="upload-text">Clique ou arraste<br />uma foto aqui</div>
                                        </div>
                                        <div class="upload-overlay">
                                            <svg class="change-icon" viewBox="0 0 24 24">
                                                <path
                                                    d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <button type="button" class="remove-image" id="removeImage"
                                        title="Remover imagem">×</button>
                                </div>

                                <input type="file" id="imageInput" accept="image/*" hidden />
                                <button type="button" class="upload-button"
                                    @click="document.getElementById('imageInput').click()">
                                    Selecionar Imagem
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    </div>


</template>


<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
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

const abrirNovoUsuarioModal = ref(false)
const abrirNovoEstudanteModal = ref(false)
const abrirEditarUser = ref(false)
const modoEdicao = ref(false);
const mostrarSenha = ref(false);

const novoUsuario = ref({
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    password: '',
    passwordTemp: true,
    address: '',
    city: '',
    cep: '',
    phone: '',

    isAluno: false,
    isEducador: false,
    isResponsavel: false
})

// Endereço
const rua = ref('')
const numero = ref('')
const bairro = ref('')

const updateAddress = () => {
    novoUsuario.value.address = `${rua.value} ${numero.value}, ${bairro.value}`.trim()
}

watch(rua, updateAddress)
watch(numero, updateAddress)
watch(bairro, updateAddress)

// --- NOVO: LISTA LOCAL DE DEPENDENTES ---
const dependentes = ref<any[]>([]);
const indexEditandoDependente = ref<number | null>(null);

const novoDependente = ref({
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    password: '',
    passwordTemp: true,
    address: '',
    city: '',
    cep: '',
    phone: '',
    Tipo: []
});

// Abrir modal dependente para novo cadastro ou edição
function abrirModalDependente() {
    indexEditandoDependente.value = null;

    novoDependente.value = {
        fullName: '',
        cpf: '',
        birthDate: '',
        email: '',
        password: '',
        phone: '',
        address: novoUsuario.value.address,
        city: novoUsuario.value.city,
        cep: novoUsuario.value.cep,
        passwordTemp: true,
        Tipo: ['Aluno']
    };

    abrirNovoEstudanteModal.value = true;
}

// Salvar dependente localmente (adiciona novo ou atualiza existente)
function salvarDependenteTemporario() {
    // Sempre herda o endereço do responsável
    Object.assign(novoDependente.value, {
        address: novoUsuario.value.address,
        city: novoUsuario.value.city,
        cep: novoUsuario.value.cep
    });

    if (indexEditandoDependente.value !== null) {
        dependentes.value[indexEditandoDependente.value] = JSON.parse(JSON.stringify(novoDependente.value));
    } else {
        dependentes.value.push(JSON.parse(JSON.stringify(novoDependente.value)));
    }

    abrirNovoEstudanteModal.value = false;
    indexEditandoDependente.value = null;
    limparNovoDependente();  // limpa o formulário do modal
}

function editarDependente(index: number) {
    indexEditandoDependente.value = index;

    // Cópia independente: mantém tudo mas quebra a referência reativa
    novoDependente.value = JSON.parse(JSON.stringify(dependentes.value[index]));
    // (use JSON.parse(JSON.stringify(...)) se não tiver structuredClone)

    abrirNovoEstudanteModal.value = true;
}

// Excluir dependente da lista
function excluirDependente(index: number) {
    dependentes.value.splice(index, 1);
}

// Salvar responsável junto com dependentes
async function criarNovoUsuario() {
    novoUsuario.value.birthDate = new Date(novoUsuario.value.birthDate);

    try {
        // Cria o usuário (sem Tipo)
        const response = await UserService.createUser({
            fullName: novoUsuario.value.fullName,
            cpf: novoUsuario.value.cpf,
            birthDate: novoUsuario.value.birthDate,
            email: novoUsuario.value.email,
            password: novoUsuario.value.password,
            passwordTemp: true,
            address: novoUsuario.value.address,
            city: novoUsuario.value.city,
            cep: novoUsuario.value.cep,
            phone: novoUsuario.value.phone
        });

        const novoId = response.id;

        if (!novoId) {
            throw new Error('ID do novo usuário não foi retornado pela API');
        }

        // Se for Educador, chama a rota específica para conceder o tipo
        if (novoUsuario.value.isEducador) {
            await UserService.grantEducatorTypeToUser(novoId);
        }

        // Salvar dependentes, sempre como Aluno
        for (const dep of dependentes.value) {
            await UserService.createUser({
                ...dep,
                address: novoUsuario.value.address,
                city: novoUsuario.value.city,
                cep: novoUsuario.value.cep,
                Tipo: ['Aluno']
            });
        }

        limparNovoUsuario();
        limparNovoDependente();
        dependentes.value = [];
        abrirNovoUsuarioModal.value = false;

        await loadUsers();

    } catch (error) {
        console.error('Erro ao criar novo usuário:', error);
        alert('Erro ao salvar os dados.');
    }
}

function limparNovoUsuario() {
    novoUsuario.value = {
        fullName: '',
        cpf: '',
        birthDate: '',
        email: '',
        password: '',
        passwordTemp: true,
        address: '',
        city: '',
        cep: '',
        phone: '',

        isAluno: false,
        isEducador: false,
        isResponsavel: false
    };
}

function limparNovoDependente() {
    novoDependente.value = {
        fullName: '',
        cpf: '',
        birthDate: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        cep: '',
        passwordTemp: true,
        Tipo: ['Aluno']
    };
}

function fecharNovoDependenteModal() {
    abrirNovoEstudanteModal.value = false;
    limparNovoDependente();
}

function getTiposSelecionados() {
    const tipos = [];
    if (novoUsuario.value.isAluno) tipos.push('Aluno');
    if (novoUsuario.value.isEducador) tipos.push('Educador');
    if (novoUsuario.value.isResponsavel) tipos.push('Responsável');
    return tipos;
}

function alterarTipo(tipo, status) {
    // Impede que "Aluno" seja adicionado em modais errados
    if (tipo === 'Aluno' && abrirNovoUsuarioModal.value) {
        novoUsuario.value.isAluno = false;
        return;
    }

    if (!novoUsuario.value.Tipo) {
        novoUsuario.value.Tipo = [];
    }

    if (status) {
        if (!novoUsuario.value.Tipo.includes(tipo)) {
            novoUsuario.value.Tipo.push(tipo);
        }
    } else {
        novoUsuario.value.Tipo = novoUsuario.value.Tipo.filter(t => t !== tipo);
    }
}


// MODELO 3: EDITAR UM USUARIO

// guarda o ID e se era Educador antes da edição

const usuarioIdEditando = ref(null);
const eraEducador = ref(false);

function editarUsuario(usuario) {
    usuarioIdEditando.value = usuario.id;
    eraEducador.value = usuario.Tipo?.includes('Educador') || false;

    novoUsuario.value = {
        fullName: usuario.fullName || '',
        cpf: usuario.cpf || '',
        birthDate: usuario.birthDate || '',
        email: usuario.email || '',
        address: usuario.address || '',
        city: usuario.city || '',
        cep: usuario.cep || '',
        phone: usuario.phone || '',

        isAluno: usuario.Tipo?.includes('Aluno') || false,
        isEducador: eraEducador.value,
        isResponsavel: usuario.Tipo?.includes('Responsável') || false
    };

    modoEdicao.value = true;
    abrirEditarUser.value = true;
}

async function salvarUsuarioEditado() {
    if (!usuarioIdEditando.value) return;

    const agoraEducador = novoUsuario.value.isEducador;

    try {
        if (!eraEducador.value && agoraEducador) {
            await UserService.grantEducatorTypeToUser(usuarioIdEditando.value);
        }

        if (eraEducador.value && !agoraEducador) {
            await UserService.removeEducatorTypeFromUser(usuarioIdEditando.value);
        }

        await loadUsers();
        abrirEditarUser.value = false;
        modoEdicao.value = false;
        limparNovoUsuario();

    } catch (err) {
        console.error('Erro ao atualizar tipo Educador:', err);
    }
}


</script>




<style scoped>
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
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
    min-height: calc(100vh - 93px);
    border-top: 3px solid #d9d9d9;
    border-left: 3px solid #d9d9d9;
    border-top-left-radius: 32px;
}

#modalities .submain-block .subtitle {
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

#modalities .menu-modalities {
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
}


/* NOVO CSS DA TABELA */
table {
    width: 100%;
    border-spacing: 0;
    border-collapse: separate;
}


table thead {
    height: 70px;
    border-bottom: #ece9e9 1px solid;
}

table thead th {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    padding: 15px;
    font-size: 19px;
    font-weight: 600;
    color: #414141;
    border-right: #ece9e9 3px solid;
}

table tr {
    height: 60px;
    border-bottom: #ece9e9 3px solid;
}

table tr.bg-2 {
    background-color: #eaeaea80;
}

table td {
    flex-grow: 1;
    padding: 15px;
    height: 100%;
    border-right: #ece9e9 3px solid;
}

table tr h5 {
    color: #414141;
    font-size: 19px;
    font-weight: 600;
}

table td:last-child,
table thead th:last-child {
    border-right: #ece9e9 0px solid;
}

table .btn-actions-row {
    width: 149px;
    min-width: 149px;
}

table .btn-actions-row .form-check-input {
    height: 30px;
    width: 60px;
}

table td .btn-action {
    transition: all ease-in-out 0.2s;
    text-decoration: none !important;
    text-align: center;
    height: 30px;
    width: 30px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid rgb(219 219 219);
    cursor: pointer;
}

table td .btn-action:hover {
    background-color: #eaeaea80;
}

table td .btn-action i {
    color: #414141;
}

.table-scroll {
    max-height: 650px;
    overflow-y: auto;
    width: 100%;
    border-radius: 10px;
    border: 3px solid #d9d9d9;
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

    background-image:
        linear-gradient(white, white),
        linear-gradient(90deg, #1BE7FF 0%, #6EEB83 25%, #E4FF1A 50%, #FFB800 75%, #FF5714 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}


/* Modais */

.modal-section h2 {
    margin-bottom: 30px;
}

.modal-section h3 {
    color: #000000;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
}

.modal-section hr {
    border: 0;
    height: 1px;
    background-color: #ccc;
    margin: 20px 0;
}

/* Estrutura do formulário */
.form-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}

.form-sections {
    flex: 1;
}

section {
    margin-bottom: 30px;
}

.field {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
}

/* Inputs genéricos (mantém cor já definida em #modalities input[type=text]) */
input[type="text"],
input[type="email"],
input[type="date"],
input[type="tel"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
}

/* ------------------ */
/*  Upload de Imagem  */
/* ------------------ */

.image-upload-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding-top: 30px;
    margin-right: 20px;
    margin-left: 25px;
}

.image-upload-container {
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
}

.image-preview {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid #e1e5e9;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
    position: relative;
}

.image-preview:hover {
    border-color: #4caf50;
    transform: scale(1.05);
}

.image-preview.dragover {
    border-color: #4caf50;
    background: #e8f5e8;
    transform: scale(1.02);
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
    text-align: center;
    padding: 20px;
}

.upload-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    opacity: 0.6;
}

.upload-text {
    font-size: 12px;
    line-height: 1.4;
}

.upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(76, 175, 80, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
}

.image-preview:hover .upload-overlay {
    opacity: 1;
}

.change-icon {
    width: 30px;
    height: 30px;
    fill: white;
}

#imageInput {
    display: none;
}

.upload-button {
    background: linear-gradient(45deg, #4caf50, #45a049);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

.upload-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.remove-image {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 16px;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.remove-image:hover {
    background: #ff3742;
    transform: scale(1.1);
}

.image-preview.has-image .remove-image {
    display: flex;
}

.btn-upload {
    background-color: #e0e0e0;
}

/* Botões extras */
.btn-salvar {
    background-color: #2e7d32;
    color: white;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
}

.btn-adicionar {
    display: flex;
    background: none;
    border: none;
    font-weight: bold;
    color: #000;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
    margin-left: -4px;
}

.btn-adicionar i {
    margin-right: 8px;
}

.aviso {
    color: #696969cc;
    font-size: 12px;
    margin-top: 15px;
    margin-left: 3px;
}

.row-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
    gap: 10px;
}

/* Seção para tipo de usuário */
.tipos-usuario {
    margin-top: 24px;
    font-size: 18px;
}

.tipos-usuario h3 {
    margin-bottom: 10px;
}

.tipos-usuario .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.tipos-usuario .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;
}

.tipos-usuario .checkbox-group input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #2e7d32;
}

/* Estilo do botão de adicionar dependente */
.dependente-btn {
    margin-top: 20px;
}

.dependente-btn .btn-adicionar {
    font-size: 18px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    border: none;
    background: none;
    cursor: pointer;
    color: #333;
    /* ou sua cor preferida */
    transition: color 0.3s;
}

.dependente-btn .btn-adicionar i {
    margin-right: 10px;
    font-size: 20px;
}

.dependente-btn .btn-adicionar:hover {
    color: #007BFF;
    /* muda cor no hover */
}

/* Cards pequenos dos dependentes */
.lista-dependentes {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 15px;
}

.dependente-card {
    position: relative;
    background: #f9f9f9;
    padding: 10px 15px;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    cursor: default;
    transition: box-shadow 0.3s;
    user-select: none;
}

.dependente-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Nome do dependente */
.dependente-nome {
    font-weight: 600;
    font-size: 14px;
    color: #333;
}

/* Botões ocultos por padrão */
.dependente-card .btn-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

/* Mostrar botões no hover do card */
.dependente-card:hover .btn-actions {
    opacity: 1;
    pointer-events: auto;
}

/* Botões editar e excluir */
.dependente-card .btn-actions button {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #666;
    font-size: 16px;
    padding: 2px 5px;
    transition: color 0.2s;
}

.dependente-card .btn-actions button:hover {
    color: #007BFF;
}


/* Visualizar a Senha*/
.input-senha-wrapper {
    position: relative;
    width: 100%;
}

.input-senha-wrapper input {
    width: 100%;
    padding: 10px 40px 10px 10px;
    /* espaço à direita para o ícone */
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
    box-sizing: border-box;
}

.icone-senha {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    font-size: 18px;
    color: #666;
    cursor: pointer;
}

/* Responsividade */
@media (max-width: 768px) {
    .form-header {
        flex-direction: column;
    }

    .upload-box {
        margin-left: 0;
        margin-top: 20px;
        align-self: center;
    }
}

@media screen and (min-width:1440px) {
    .card-box {
        width: calc(25% - 12px);
        height: 180px;
    }
}
</style>
