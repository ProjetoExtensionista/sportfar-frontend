<template>
  <Header></Header>
  <div class="container py-4">
    <h1 class="mb-4">Chamada de Alunos</h1>

    <div class="mb-3">
      <label for="selectDate" class="form-label"
        >Selecione o dia (dd/mm/aaaa):</label
      >
      <input
        type="text"
        id="selectDate"
        class="form-control"
        placeholder="dd/mm/aaaa"
        v-model="dateInput"
        @input="onInput"
        maxlength="10"
      />
      <small v-if="errorMessage" class="text-danger">{{ errorMessage }}</small>
    </div>

    <p v-if="selectedDate">Data selecionada: {{ formattedDate }}</p>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Matrícula</th>
          <th>Nome</th>
          <th>Registrar presença</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.user_id">
          <td>{{ student.user_id }}</td>
          <td>{{ student.nome }}</td>
          <td>
            <div class="d-flex gap-2">
              <select
                class="form-select"
                v-model="student.status"
                @change="updateStatus(student.user_id, $event.target.value)"
              >
                <option value="Presente">Presente</option>
                <option value="Falta">Falta</option>
                <option value="Falta Justificada">Falta Justificada</option>
              </select>
              <button
                class="btn btn-success"
                @click="setStatus(student.user_id, 'Presente')"
                title="Marcar Presente"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                class="btn btn-danger"
                @click="setStatus(student.user_id, 'Falta')"
                title="Marcar Falta"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-end mb-3">
      <button
        class="btn btn-primary"
        @click="save"
        title="Salvar"
        :disabled="!selectedDate"
      >
        Salvar
      </button>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import { ref, computed } from "vue";

const students = ref([
  { user_id: "20230001", nome: "Ana Paula", status: "Presente" },
  { user_id: "20230002", nome: "Bruno Souza", status: "Presente" },
  { user_id: "20230003", nome: "Carla Mendes", status: "Presente" },
  { user_id: "20230004", nome: "Daniel Lima", status: "Presente" },
  { user_id: "20230005", nome: "Eduarda Silva", status: "Presente" },
  { user_id: "20230006", nome: "Felipe Castro", status: "Presente" },
  { user_id: "20230007", nome: "Gabriela Rocha", status: "Presente" },
  { user_id: "20230008", nome: "Henrique Santos", status: "Presente" },
  { user_id: "20230009", nome: "Isabela Teixeira", status: "Presente" },
  { user_id: "20230010", nome: "João Victor", status: "Presente" },
  { user_id: "20230011", nome: "Karen Lopes", status: "Presente" },
  { user_id: "20230012", nome: "Lucas Almeida", status: "Presente" },
  { user_id: "20230013", nome: "Mariana Oliveira", status: "Presente" },
  { user_id: "20230014", nome: "Nicolas Nunes", status: "Presente" },
  { user_id: "20230015", nome: "Otávio Matos", status: "Presente" },
  { user_id: "20230016", nome: "Paula Dias", status: "Presente" },
  { user_id: "20230017", nome: "Rafael Gomes", status: "Presente" },
  { user_id: "20230018", nome: "Sabrina Pires", status: "Presente" },
  { user_id: "20230019", nome: "Thiago Martins", status: "Presente" },
  { user_id: "20230020", nome: "Vanessa Moura", status: "Presente" },
  { user_id: "20230021", nome: "Wesley Souza", status: "Presente" },
  { user_id: "20230022", nome: "Yasmin Braga", status: "Presente" },
  { user_id: "20230023", nome: "Arthur Lima", status: "Presente" },
  { user_id: "20230024", nome: "Beatriz Melo", status: "Presente" },
  { user_id: "20230025", nome: "Carlos Eduardo", status: "Presente" },
  { user_id: "20230026", nome: "Débora Vasconcelos", status: "Presente" },
  { user_id: "20230027", nome: "Emerson Pires", status: "Presente" },
  { user_id: "20230028", nome: "Fernanda Costa", status: "Presente" },
  { user_id: "20230029", nome: "Gustavo Neves", status: "Presente" },
  { user_id: "20230030", nome: "Helena Moreira", status: "Presente" },
]);

const dateInput = ref("");
const selectedDate = ref("");
const errorMessage = ref("");
const absenceList = ref([]);

//valor chumbado apenas pra montar a "requisição"
const CLASSROOM_ID = "45645";

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === +year &&
    date.getMonth() + 1 === +month &&
    date.getDate() === +day
  );
}

function onInput(e) {
  let val = e.target.value;
  val = val.replace(/\D/g, "");

  if (val.length >= 1) {
    let day = val.slice(0, 2);
    if (+day > 31) day = "31";
    val = day + val.slice(2);
  }

  if (val.length >= 3) {
    let month = val.slice(2, 4);
    if (+month > 12) month = "12";
    val = val.slice(0, 2) + month + val.slice(4);
  }

  if (val.length > 8) {
    val = val.slice(0, 8) + val.slice(8, 12);
  }

  if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
  if (val.length > 5) val = val.slice(0, 5) + "/" + val.slice(5, 10);
  if (val.length > 10) val = val.slice(0, 10);

  dateInput.value = val;

  if (val.length === 10) {
    const parts = val.split("/");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts;
      if (yyyy.length === 4 && isValidDate(dd, mm, yyyy)) {
        selectedDate.value = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(
          2,
          "0"
        )}`;
        errorMessage.value = "";
        return;
      } else {
        errorMessage.value = "Data inválida. Por favor, corrija.";
      }
    }
  } else if (val.length > 0) {
    errorMessage.value = "Data incompleta.";
    selectedDate.value = "";
  } else {
    errorMessage.value = "";
    selectedDate.value = "";
  }
}

const formattedDate = computed(() => {
  if (!selectedDate.value) return "";
  const [year, month, day] = selectedDate.value.split("-");
  return `${day}/${month}/${year}`;
});

function updateStatus(user_id, newStatus) {
  const student = students.value.find((a) => a.user_id === user_id);
  if (student) {
    student.status = newStatus;
  }
}

function setStatus(user_id, status) {
  const student = students.value.find((a) => a.user_id === user_id);
  if (student) {
    student.status = status;
  }
}

function save() {
  if (!selectedDate.value) {
    alert("Por favor, selecione uma data válida antes de salvar.");
    return;
  }

  const absentStudents = students.value.filter(
    (student) =>
      student.status === "Falta" || student.status === "Falta Justificada"
  );

  absenceList.value = absentStudents.map((student) => ({
    user_id: student.user_id,
    type_id: student.status, //aqui estou mandando o status em string. o correto é definir um enum com texto = numero
    classroom_id: CLASSROOM_ID,
    date: selectedDate.value, //esse nao está previsto no backend. mas precisamos enviar a data
  }));

  console.log("LISTA DE PRESENÇA", absenceList.value);

  //Aqui seria o local da requisição em que enviaremos o absenceList
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
</style>
