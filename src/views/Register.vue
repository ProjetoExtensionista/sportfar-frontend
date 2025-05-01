<template>
    <div class="main-block register vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="rounded login-box">
            <div class="p-4">
                <h4 class="text-center mb-2">Crie uma conta</h4>
                <p class="text-center mb-0 subtitle">Insira seus dados abaixo para criar conta</p>
            </div>
            <div class="line"></div>
            <div class="p-4">
                <div class="mb-2">
                    <label for="name" class="form-label"><p class="mb-0">Nome</p></label>
                    <input type="name" class="form-control" id="name">
                </div>
                <div class="mb-2">
                    <label for="email" class="form-label"><p class="mb-0">Email</p></label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="mb-2 position-relative">
                    <i data-input="password" data-enable="0" class="password-icon fa-light fa-eye"></i>
                    <label for="password" class="form-label"><p class="mb-0">Senha</p></label>
                    <input type="password" class="form-control" id="password">
                </div>
                <div class="position-relative">
                    <i data-input="confirm-password" data-enable="0" class="password-icon fa-light fa-eye"></i>
                    <label for="confirm-password" class="form-label"><p class="mb-0">Confirmar senha</p></label>
                    <input type="password" class="form-control" id="confirm-password">
                </div>
                <button type="button" class="mt-4 position-relative d-flex align-items-center justify-content-center btn main-btn w-100">
                    <div class="btn-hover"></div>
                    <p class="mb-0">Cadastrar-se</p>
                </button>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <p class="p-link subtitle mb-0 l-spacing-2">Já tem uma conta?</p> <a class="mb-0 " href="./assets/login.html">Login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import '../assets/js/global.js'
</script>

<style scoped src="../assets/css/global.css"></style>
<style scoped src="../assets/css/authentication.css"></style>
