<template>
    <div class="card-box overflow-hidden d-flex justify-content-between flex-column">
      <div class="card-header w-100 p-2">
        <h4 class="mb-0">{{ title }}</h4> 
      </div>
      <div class="card-body p-2 d-flex justify-content-between align-items-end">
        <p class="mb-0 d-flex">{{ valor }}</p>
        <div class="icon-box d-flex justify-content-center align-items-center" :style="'background-color:'+colorIcon+';'">
            <i :class="icon" class="icon d-flex justify-content-end"></i>
        </div>
      </div>
    </div>
  </template>
  
  

<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  valor: string 
  colorIcon: string
}>()
</script>


<style scoped>
.card-box {
	min-width: 322px;
	height: 161px;
	box-shadow: 0 0 8px 0px #0000000d;
	border-radius: 16px;
    background-color: white;
    border: 1px solid #dfdada63
}

.card-box:hover {
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
    border-bottom: 2px solid #dfdada63
}

.card-body {
	position: relative;
}

.card-body p {
	font-weight: 600;
	font-size: 28px;
	color: rgb(27, 26, 26);
}

.card-body img {
	position: absolute;
	right: 0;
	bottom: 16px;
}
.card-box h4 {
	font-weight: bold;
	color: #212529;
}
.icon {	
	font-size: 31px;
	color: white;
}
.icon-box {
    height: 64px;
    width: 64px;
    border-radius: 18px;
}

@media screen and (min-width:1440px) {
    .card-box {
        width: calc(25% - 12px);
        height: 180px;
    }
}

@media screen and (min-width:1200px) {
    .card-box {
        width: calc(25% - 12px);
        height: 180px;
    }
}

@media screen and (min-width:778px) {
    .card-box {
        width: calc(25% - 12px);
        height: 180px;
    }
}
</style>




<!-- professor, modalidades, turma,  -->