<template>
    <Header></Header>
  <div class="container">

    <!-- Header -->
     <div class="container-header">
         <div class="header">
           <button  @click="goBack" class="back-button">←</button>
           <div>
             <h1>Todas as Turmas</h1>
             <p class="subtitle">Relatórios Privados</p>
           </div>
         </div>
     
         <!-- Tabs -->
         <div class="tabs">
           <button>TÓPICO</button>
           <button class="active">Turmas</button>
           <button>TÓPICO</button>
           <button>TÓPICO</button>
         </div>
     </div>

    <p class="total-turmas">
      Número Total de Turmas: <strong>{{ totalTurmas }}</strong>
    </p>

    <!-- Accordion -->
    <div class="accordion">
      <div
        v-for="(ano, index) in turmasPorAno"
        :key="ano.ano"
        class="accordion-item"
      >
        <div class="accordion-header" @click="toggle(index)">
          <div>
            <span
              class="arrow"
              :class="{ rotated: ano.aberto }"
            >▼</span>
            Turmas de {{ ano.ano }}
          </div>
          <span class="open-text">Click para abrir</span>
        </div>

        <div
          class="accordion-content"
          v-show="ano.aberto"
        >
          <div v-if="ano.turmas.length > 0">
            <div v-if="ano.turmas.length > 0" class="cards">
                <CardModality
                v-for="(turma, turmaIndex) in ano.turmas"
                :key="turmaIndex"
                icon='<i class="fa-light fa-user-tie"></i>'
                :title="turma.nome"
                :day="turma.dia || ''"
                :hour="turma.horario"
                :professor="turma.professor"
                :color="turma.cor"
                img="futebol.png"
                />
            </div>
         </div>
          <div v-else>
            <p>Sem turmas cadastradas para {{ ano.ano }}.</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import CardModality from './components/CardModality.vue'
import { useRouter } from 'vue-router';
import router from '../router';

const turmasPorAno = ref([
  {
    ano: 2024,
    aberto: false,
    turmas: [],
  },
  {
    ano: 2023,
    aberto: true,
    turmas: [
      {
        nome: 'Futsal às Sextas-Feiras',
        professor: 'Rodrigo Medeiros',
        horario: 'Das 08:00 às 10:00 horas',
        cor: '#0D6EFD',
      },
      {
        nome: 'Basquete às Terças-Feiras',
        professor: 'Rodrigo Medeiros',
        horario: 'Das 14:00 às 16:00 horas',
        cor: '#FF6607',
      },
      {
        nome: 'Basquete às Terças-Feiras',
        professor: 'Rodrigo Medeiros',
        horario: 'Das 14:00 às 16:00 horas',
        cor: '#FFC107',
      },
      {
        nome: 'Vôlei aos Sábados',
        professor: 'Rodrigo Medeiros',
        horario: 'Das 10:00 às 12:00 horas',
        cor: '#2F7345',
      },
      {
        nome: 'Vôlei aos Sábados',
        professor: 'Rodrigo Medeiros',
        horario: 'Das 10:00 às 12:00 horas',
        cor: '#FF6607',
      },
    ],
  },
  {
    ano: 2022,
    aberto: false,
    turmas: [],
  },
])

const goBack = () => {
      router.go(-1);
}

const toggle = (index) => {
  turmasPorAno.value[index].aberto = !turmasPorAno.value[index].aberto
}

// Computed para total de turmas
const totalTurmas = computed(() =>
  turmasPorAno.value.reduce((acc, ano) => acc + ano.turmas.length, 0)
)
</script>

<style scoped>
/* Reset básico */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  color: #333;
}

/* Container principal */
.container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 2px solid #D9D9D9;
}

/* Header */
.header {
  display: flex;
  align-items: center;
 
}

.container-header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #CFD3D7;
    align-items: center;
    border-radius: 8px;   
}

.back-button {
  margin-right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

h1 {
  font-size: 24px;
}

.subtitle {
  color: gray;
  font-size: 14px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tabs button {
  padding: 6px 16px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

.tabs .active {
  background: #b3b3b3;
}

/* Total */
.total-turmas {
  margin: 20px 0;
}

/* Accordion */
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;
}

.accordion-header {
  background: #f1f1f1;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accordion-header div {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.arrow {
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.3s;
}

.arrow.rotated {
  transform: rotate(180deg);
}

.open-text {
  font-size: 12px;
  color: gray;
}

.accordion-content {
  padding: 16px;
  background: white;
  width: 100%;
}

/* Cards grid */
.cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
}
</style>
