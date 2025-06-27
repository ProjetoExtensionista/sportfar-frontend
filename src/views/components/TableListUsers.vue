<template>
    <table>
		<thead>
			<tr>
				<th v-for="header in tableHeader" :key="header">{{ header }}</th>
				<th>Editar</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, index) in tableValues" :key="index" class="flex-container flex-nowrap td-reviews-page">
			<td v-for="(header, i) in tableHeader" :key="i":class="['title-categ-list','flex-container',i === 0 ? 'flex-item flex-nowrap flex-align-left first-td' : 'td-center flex-align-left']">
				<div>
					<h5 v-if="i < 2">{{ row[header] }}</h5>
					<p v-else>{{ row[header] }}</p>
				</div>
			</td>
			<td>
				<div class="d-flex w-100 h-100 align-items-center justify-content-end">
					<a href="reviews-edit/151" class="btn-action d-flex align-items-center justify-content-center">
						<i class="fa-light fa-pencil-alt"></i>
					</a>
				</div>
			</td>
			</tr>
		</tbody>
    </table>
</template>

<script setup lang="ts">
const props = defineProps<{
  tableHeader: string[];
  tableValues: Array<Record<string, string>>;
}>();
</script>

<style scoped>

/* tabulacao */
table {
    box-shadow: 0px 2px 3px 0px rgb(167 167 167 / 33%);
    border-radius: 10px;
    width: 100%;
    background-color: #F3F3F3;
    border-spacing: 0;
    border-collapse: collapse;
}

table thead {
    height: 70px;
    border-bottom: #ece9e9 1px solid;
    position: sticky;
    top: 0;
    background: #bebebe;
    color: black;
}

table thead th {
    min-height: 70px;
    flex-grow: 1;
    padding: 15px;
    height: 100%;
    border-right: #ece9e9 2px solid;
}

table tr {
    height: 70px;
    border-bottom: #ece9e9 2px solid;
}

table td {
    min-height: 70px;
    flex-grow: 1;
    padding: 15px;
    height: 100%;
    border-right: #ece9e9 2px solid;
}

table td:last-child, table thead th:last-child {
    border-right: #ece9e9 0px solid;
}

table .btn-actions-row {
    width: 180px;
    max-width: 180px;
}

table .btn-actions-row .form-check-input {
    height: 30px;
    width: 60px;
}

table td .btn-action {
    text-decoration: none !important;
    text-align: center;
    height: 30px;
    width: 30px;
    margin-left: 10px;
    border-radius: 5px;
    background-color: rgb(219 219 219);
    border: none;
    cursor: pointer;
}

table td .btn-action i {
    color: #3d3d3dc6;
}
</style>