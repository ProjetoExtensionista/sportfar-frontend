<template>
  <Header></Header>

  <div class="container mt-5 mb-4">
    <CardTitlePage
      icon='<i class="fa-light fa-user-tie"></i>'
      title="Categoria Sub-15 às 15hrs"
      subtitle="Listagem de aulas"
      professor="Mauricio"
      color="#FF6607"
      img="basquete-completo.png"
    />

    <div class="content-wrapper">
      <div class="classrooms">
      
        <div class="classroom-card py-3 px-4" v-for="clroom in dados">
          <div class="d-flex align-items-center">
            <div class="icon"><i class="fa-solid fa-calendar-day"></i></div>
            <div class="info">
              <h5 class="mb-0">Aula {{clroom.id}}</h5>
              <p class="mb-0">
                Data da aula:
                <b>{{clroom.data}}</b>
              </p>
            </div>
          </div>
          <div class="attendance-btn">
            <button class="btn btn-primary btn-aula" @click="gottoclassrom(clroom.id)" title="Acessar aula">
				Acessar aula
			</button>
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary btn-add" @click="addaula" title="Adicionar aula">
        Adicionar aula
      </button>
    </div>
  </div>
</template>

<script setup>
import CardTitlePage from "./components/CardTitlePage.vue";
import Header from "./components/Header.vue";
import { ref, computed } from "vue";

const dados = ref([
  {id: "1", data: "30/05/2025"},
  {id: "2", data: "05/06/2025"},
]);

function addaula() {
  console.log("Add Aula clicked!")
}

function gottoclassrom(id) {
  console.log("pushing the route: " + id)
}
</script>

<style scoped>
h1 {
  text-align: center;
}
.text-danger {
  color: red;
  margin-top: 0.25rem;
}

.content-wrapper {
  border-left: 5px solid #d9d9d9;
  border-right: 5px solid #d9d9d9;
  border-bottom: 5px solid #d9d9d9;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  padding: 40px;
  margin-top: -15px;
}
.classrooms {
  display: block;
  gap: 40px;
  margin-bottom: 30px;
}
.classroom-card {
  border: 2px solid #ff6607;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.icon {
  border: 2px solid #ff6607;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  font-size: 30px;
  margin-right: 20px;
}
.attendance-btn {
  border-left: 2px solid #d9d9d9;
  height: 100%;
  display: flex;
  align-items: center;
}
.attendance-btn input {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 40px;
}
button {
  display: block;
  background-color: #2f7345;
  border: none;
  justify-self: flex-end;
  padding: 8px 24px;
}
.btn-aula{
	background-color: #fff;
	margin-left: 20px;
	color: #000
}

</style>
