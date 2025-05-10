<template>
    <div class="main-block register vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="rounded login-box">
            <div class="p-4">
                <img src="../assets/images/logo-login.png" alt="">
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
                    <i  :class="['password-icon', 'fa-light', isPasswordVisible ? 'fa-eye-slash' : 'fa-eye']" @click="togglePassword"></i>
                    <label for="password" class="form-label"><p class="mb-0">Senha</p></label>
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password">
                </div>
                <div class="position-relative">
                    <i :class="['password-icon', 'fa-light', isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye']" @click="toggleConfirmPassword"></i>
                    <label for="confirm-password" class="form-label"><p class="mb-0">Confirmar senha</p></label>
                    <input :type="isConfirmPasswordVisible ? 'text' : 'password'" class="form-control" id="confirm-password">
                </div>
                <button type="button" class="mt-4 position-relative d-flex align-items-center justify-content-center btn main-btn w-100">
                    <div class="btn-hover"></div>
                    <p class="mb-0">Cadastrar-se</p>
                </button>
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <p class="p-link subtitle mb-0 l-spacing-2">Já tem uma conta?</p> <a class="mb-0 " href="login">Login</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isPasswordVisible = ref(false)

function togglePassword() {
  isPasswordVisible.value = !isPasswordVisible.value
}

const isConfirmPasswordVisible = ref(false)

function toggleConfirmPassword() {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value
}


</script>


<style>

/* espa'camento global do site */
.Register .px-10 {
    padding-right: 10px;
    padding-left: 10px;
}

.Register .px-8 {
    padding-right: 8px;
    padding-left: 8px;
}

/* btn global do site */
.Register .main-btn {
    overflow: hidden;
    background-color: var(--main-color);
}

.Register .main-btn .btn-hover {
    transition: 0.4s ease-in all;
    position: absolute;
    width: 0;
    height: 100%;
    border-radius: 40px;
    background-color: transparent;
}

.Register .main-btn:hover .btn-hover {
    width: 140%;
    background-color: #37d7528f;
}

.Register .main-btn p {
    z-index: 10;
    color: white;
    font-weight: 700 !important;
}

/* Inicio CSS-Global */
.Register .pt-100 {
    padding-top: 100px;
}

.Register .py-100 {
    padding: 100px 0;
}

.Register .py-200 {
    padding: 200px 0;
}

.Register .pt-150 {
    padding-top: 150px !important;
}

.Register .mt-100 {
    margin-top: 100px;
}

.Register .mb-200 {
    margin-bottom: 200px;
}

.Register .mb-100 {
    margin-bottom: 100px;
}

.Register .mb-60 {
    margin-bottom: 60px;
}

.Register .shadow {
    box-shadow: 0 0 3px rgba(30, 41, 59, 0.15) !important;
}

.Register .shadow-lg {
    box-shadow: 0 10px 25px rgba(30, 41, 59, 0.15) !important;
}

.Register .shadow-md {
    box-shadow: 0 5px 13px rgba(30, 41, 59, 0.2) !important;
}

/* CSS Global */
.Register body {
    background-image: white;
    overflow-x: hidden;
}

.Register p, .Register h1, .Register h2, .Register h3, .Register h4, .Register h5, .Register h6, .Register body{
    font-family: "Montserrat", sans-serif;
}

.Register .l-spacing-2{
    letter-spacing:0.28px;
}
.Register .line {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
}

.Register a { 
    color: #312f2f;
    font-size: 12px;
    font-weight: 800 ;
    margin-left: 4px;  
    transition: 0.2s ease-in-out all;
}

.Register a:hover { 
    color: var(--main-color);
}

/* Bloco Principal */
.Register .main-block {
    background-image: white;
}

.Register .main-block.login {
    overflow-x: hidden;
    min-height: 532px;
}

/* Login-box */
.Register .login-box {
    background-color: white;
    width: 350px;
    height: fit-content;
    box-shadow: 0px 0px 20px #f3f3f3;
}

.Register .login-box p {
    font-weight: 400;
    font-size: 14px;
}

.Register .login-box h4{
    font-weight: 600;
}

.Register .login-box input, .login-box button{
    height: 36px;
}

.Register .login-box input{
    color: #818181;
    background-color: #2d82d61c;
    box-shadow: 0px 0px 20px #f3f3f3;
    border: 0px;
    border-bottom: 2px solid var(--border-color);
}

.Register .login-box .subtitle{
    color: var(--subtitle-color);
    font-family: "Poppins", sans-serif;
}

.Register .login-box .info-subtitle{
    font-size: 12px;
    color: var(--subtitle-color);
    font-family: "Poppins", sans-serif;
}

.Register .login-box .info-link{
    font-size: 10px;
}

.Register .form-control:focus {
    color: #818181;
    background-color: #2d82d60f;
    border-color: var(--border-color);
    outline: 0;
    box-shadow: 0px 0px 20px #f3f3f3;
}

.Register .password-icon.fa-eye {
    position: absolute;
    right: 8px;
    bottom: 10px;
}

.Register .password-icon.fa-eye-slash {
    position: absolute;
    right: 7px;
    bottom: 10px;
}

/* Media-login-box */

@media screen and (max-width: 390px){
    .Register .login-box {
        width: calc(100vw - 40px);
    }
}

@media screen and (max-height: 550px){
    .Register .main-block.register {
        overflow-x: hidden;
        min-height: 732px;
    }
    
}
</style>
