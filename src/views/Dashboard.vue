<script setup>
import Header from './components/Header.vue'
import CardBox from './components/CardBox.vue'
</script>

<template>
    <div class="">
        <Header></Header>
        <div class="d-flex flex-wrap align-items-start justify-content-start gap-5 mt-5 ms-5">
            <CardBox 
            icon='<i class="fa-light fa-user-tie"></i>' 
            title="Professores" 
            subtitle="R$ 56,50" 
            color="green" />
            <CardBox 
                icon='<i class="fa-light fa-users-line"></i>' 
                title="Alunos" 
                subtitle="20" 
                color="Orange"/>
            <CardBox 
                icon='<i class="fa-light fa-screen-users"></i>' 
                title="Turmas" 
                subtitle="20" 
                color="Red"/>  
            <CardBox 
                icon='<i class="fa-light fa-court-sport"></i>' 
                title="Modalidades" 
                subtitle="teste" 
                color="Blue"/>  
        </div>
    </div>
</template>

