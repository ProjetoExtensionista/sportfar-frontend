<template>
	<div class="card-box overflow-hidden d-flex justify-content-between flex-column " :style="'background-color:' + color + ';'">
		<div class="card-header w-100 p-2">
			<h4 class="mb-2">{{ title }}</h4>
		</div>
		<div class="p-2 ">
			<p class=" mb-0">{{ day }} </p>
			<p class=" mb-0">{{ hour }}</p>
			<p class=" mb-0">Prof. <span class="fw-bold"> {{ professor }}</span></p>
		</div>
	</div>
</template>

<script setup>
defineProps(['icon', 'title', 'color', 'day', 'hour', 'professor'])
</script>

<style scoped>
.card-box {
	min-width: 322px;
	height: 161px;
	box-shadow: 0 0 8px 0px #0000000d;
	transition: box-shadow 0.2s;
	border-radius: 16px;
}

.card-box:hover {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
	box-shadow: 0 0px 0px 2px rgb(0 0 0 / 16%)
}

.card-box p {
	font-weight: 400;
	font-size: 16px;
	color: white;
}

.card-box h4 {
	font-weight: bold;
	color: white;
}
</style>