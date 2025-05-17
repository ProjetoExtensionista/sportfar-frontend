<template>
    <div class="card-box shadow-sm rounded d-flex justify-content-between p-3 bg-white">
      <div>
        <h4 class="fw-semibold text-muted ">{{ title }}</h4>
        <p class="fw-bold mb-0">{{ subtitle }} <span class="fs-6 text-primary ms-2">Ver todos</span></p>
      </div>
      <div class="rounded icon-wrapper" :style="'background-color:'+color">
        <div v-html="icon"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['icon', 'title', 'subtitle', 'color'])
  </script>
  
  <style>
  .card-box {
    min-width: 300px;
    height: 160px;
    box-shadow: 0 0 8px 0px #0000000d;
    transition: box-shadow 0.2s;
    display: flex;
  }
  
  .card-box:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .icon-wrapper {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: white;
  }

  </style>
  