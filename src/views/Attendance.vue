<template>
  <Header />

  <div class="container mt-5 mb-4">
    <CardTitlePage
      icon='<i class="fa-light fa-user-tie"></i>'
      :title="classroomName"
      :subtitle="`${day} às ${time}`"
      :professor="teacher"
      color="#FF6607"
      :img="findImageInAssets('basquete-completo.png')"
    />

    <div class="content-wrapper">
      <div class="students">
        <div
          v-for="(student, index) in attendanceData"
          :key="student.usr_id + '-' + index"
          class="student-card py-3 px-4"
        >
          <div class="d-flex align-items-center">
            <div class="icon">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="info">
              <h5 class="mb-0">{{ student.usr_name }}</h5>
              <p class="mb-0">
                Data de nascimento:
                <b>{{ student.data_nascimento }}</b>
              </p>
            </div>
          </div>
          <div class="attendance-check">
            <input
              type="checkbox"
              v-model="student.absence"
              :checked="student.abs_type === null"
            />
          </div>
        </div>
      </div>
      <button class="btn btn-primary" @click="save" title="Enviar presenças">
        Enviar presenças
      </button>
    </div>
    <div
      class="toast-container position-fixed bottom-0 start-0 p-3"
      style="z-index: 1055"
    >
      <div
        v-if="showToast"
        class="toast align-items-center text-white bg-danger border-0 show"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">Erro ao carregar dados</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import CardTitlePage from "./components/CardTitlePage.vue";
import classService from "../services/classService.js";
import { findImageInAssets } from "../utils/fileUtils";

const classroomName = ref("");
const teacher = ref("");
const day = ref("");
const time = ref("");
const attendanceData = ref([]);

const showToast = ref(false);
const toastMessage = ref("");

const route = useRoute();

async function getDados(id) {
  const response = await classService.getAbsencesByClassRoomId(id);
  if (response.success) {
    attendanceData.value = response.data.map((student) => ({
      ...student,
      absence: student.abs_type === null,
    }));
  } else {
    showErrorToast("Erro ao carregar presenças.");
  }
}

function showErrorToast(message) {
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 4000);
}

onMounted(() => {
  const id = route.params.id ?? null;
  classroomName.value = route.query.nome_turma;
  teacher.value = route.query.prof ?? "";
  day.value = route.query.dia ?? "";
  time.value = route.query.hora ?? "";

  if (id) getDados(id);
});

async function save() {
  const classroomId = route.params.id;

  try {
    const promises = attendanceData.value.map((student) => {
      const absenceData = {
        classroom_id: Number(classroomId),
        user_id: student.usr_id,
        type_id: student.absence ? 1 : 2,
      };

      if (student.abs_id) {
        absenceData.abs_id = student.abs_id;
      }

      return absenceService.save(absenceData);
    });

    await Promise.all(promises);

    alert("Presenças enviadas com sucesso!");
  } catch (error) {
    console.error(error);
    showErrorToast("Erro ao enviar presenças.");
  }
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

.students {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 30px;
}

.student-card {
  border: 2px solid #ff6607;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.icon {
  border: 2px solid #ff6607;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 30px;
  margin-right: 20px;
}

.attendance-check {
  border-left: 2px solid #d9d9d9;
  height: 100%;
  display: flex;
  align-items: center;
}

.attendance-check input {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: 40px;
}

button {
  display: block;
  background-color: #2f7345;
  border: none;
  color: #fff;
  padding: 8px 24px;
  border-radius: 4px;
  margin-left: auto;
}
</style>
