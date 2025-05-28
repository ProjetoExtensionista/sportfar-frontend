<script setup>
import Header from './components/Header.vue'
</script>

<template>
    <div id="class">
        <Header>
        </Header>
        <div class="d-flex h-100" style="margin-top: 20px;">
            <button class="btn-add rounded">
                <p class="mb-0">Criar Turma</p>
            </button>
            <div class="main-block h-100 w-100">
                <div class="sub-header d-flex align-items-end w-100">
                    <div class="opt-title d-flex align-items-center justify-content-center">
                        <p class="mb-0">Formulário para criação de turmas</p>
                    </div>
                </div>
                <div class="d-flex submain-block h-100 w-100">
                    <div class="col-6 p-7 form">
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="modality" class="col-sm-2 col-form-label">Modalidade</label>
                            <select id="modality" class="form-select" >
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="date" class="col-sm-2 col-form-label">Data de Realização</label>
                            <div class="double-input d-flex">
                                <input type="date" class="form-control" id="start_date">
                                <input type="date" class="form-control" id="final_date"> 
                            </div>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="workload" class="col-sm-2 col-form-label">Carga Horária</label>
                            <input type="text" class="form-control" id="workload" v-model="workload" @input="filterNumbers" placeholder="4">
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Dia da Semana</label>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                         <div class="mb-3 d-flex justify-content-center">
                            <label for="teacher" class="col-sm-2 col-form-label">Professor</label>
                            <input type="text" class="form-control" id="teacher" placeholder="Selecione o(s) professor(es)">
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="customRange1" class="form-label">Example range</label>
                            <input type="range" step="10" class="form-range" id="customRange1" list="tickmarks">
                            <datalist id="tickmarks">
                                <option value="0">0</option>
                                <option value="10">2</option>
                                <option value="20"></option>
                                <option value="30"></option>
                                <option value="40"></option>
                                <option value="50"></option>
                                <option value="60"></option>
                                <option value="70"></option>
                                <option value="80"></option>
                                <option value="90"></option>
                                <option value="100"></option>
                            </datalist>
                        </div>
                        <div class="mb-3 d-flex justify-content-center">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Carga Horária</label>
                            <div class="double-input d-flex">
                                <input type="time" class="form-control" id="inputPassword">
                                <input type="time" class="form-control" id="inputPassword"> 
                            </div>
                        </div>
                    </div>
                    <div class="col-6 px-5">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      workload: ''
    };
  },
  methods: {
    filterNumbers() {
      this.workload = this.workload.replace(/\D/g, '');
    }
  }
};
</script>

<style scoped>
body, p, h1, h2, h3, h4, h5, h6, label, span {
    font-family: "Montserrat", sans-serifs;
}

/* espacamentos */
.p-6 {
    padding: 4rem;
}

.p-7 {
    padding: 5rem;
}

#class {
    overflow: hidden;
    height: 100vh;
    max-height: 100vh;
}

#class .btn-add {
    bottom: 20px;
    right: 20px;
    position: absolute;
    background-color: white;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #c3c3c3a2;
    box-shadow: 4px 4px 8px 0px #00000040;
    padding: 12px 24px;
}

#class .btn-add p {
    font-size: 16px;
    font-weight: 700;
}

#class .submain-block {
    border-top: 3px solid #d9d9d9;
    border-left: 3px solid #d9d9d9;
}

#class .submain-block .form label {
    min-width: 170px;
}

#class .submain-block .form select, #class .submain-block .form input, #class .submain-block .form .double-input{
    width: 100%;
    max-width: 360px;
    margin: 0;
}

#class .submain-block .form .double-input select, #class .submain-block .form .double-input input{
    width: 50%;
    max-width: 180px;
    margin: 0;
}

#class .submain-block .form .double-input input:last-child{
    border-left: 0px solid transparent;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
}

#class .submain-block .form .double-input input:first-child{
    border-top-right-radius:0;
    border-bottom-right-radius:0;
}

#class .sub-header {
    margin-top: 3px;
    height: 90px;
    padding-left: 82px;
}


#class .sub-header .opt-title {
    position: relative;
    height: 56px;
}

#class .sub-header .opt-title p {
    height: fit-content;
    font-weight: 700;
}

#class .menu-modalities{
    transition: all ease-in-out 0.4s;
    width: 305px;
    height: calc(100vh - 200px);
    padding: 10px;
}

#class .main-search {
    padding: 10px;
    height: 90px;
}

#class .main-search .input-search {
    font-size: 16px;
    height: 36px;
    padding: 12px 30px;
}

#class .main-search .input-icon {
    font-size: 14px;
    top: calc(50% - 6.5px);
    left: 10px;
}


#class .menu-modalities .filters {
    border-bottom: 3px solid #d9d9d9;
    padding: 24px 32px;
}

#class .menu-modalities .filters:last-child {
    border-bottom: 0px solid transparent;
}

#class .menu-modalities .filters.search {
    height: calc(100% - 257px);
    overflow: hidden;
}

#class .menu-modalities .filters.search .results {
    border: 1px solid #d9d9d9;
    border-radius: 0.75rem;
    padding: 4px 12px;
    max-height: calc(100% - 87px);
    overflow: auto;
}

#class .input-search {
    color: #d9d9d9;
    padding: 4px 12px 4px 24px;
    border-radius: 0.75rem;
}

#class input[type=text] {
    color: #212529;
    font-size: 14px;
    border-color: #d9d9d9;
}

#class .input-icon {
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

</style>
