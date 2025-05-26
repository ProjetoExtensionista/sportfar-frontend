<script setup>
import Header from './components/Header.vue'
import CardBox from './components/CardBox.vue'
</script>

<template>
    <div class="">
        <Header></Header>
    </div>
</template>

<script>

import { ref } from 'vue'

import {
  createUserType,
  getUserTypeById,
  updateUserType,
  deleteUserType
} from '../services/userType'


</script>



<style>
</style>