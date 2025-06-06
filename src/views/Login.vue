<template>
    <div class="main-block login vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="rounded login-box">
            <div class="p-4">
                <img src="" alt="">
            </div>
            <div class="line"></div>
            <div class="p-4">
                <div class="mb-2">
                    <label for="email" class="form-label"><p class="mb-0">Email</p></label>
                    <input type="email" class="form-control" id="email"  ref="email" >
                </div>
                <div class="position-relative">
                    <i :class="['password-icon', 'fa-light', isPasswordVisible ? 'fa-eye-slash' : 'fa-eye']" @click="togglePassword"></i>
                    <div class="d-flex align-items-center justify-content-between">
                        <label for="password" class="form-label"><p class="mb-0">Senha</p></label>
                        <div class="d-flex align-items-center">
                            <p class="p-link info-subtitle mb-0 l-spacing-2">Esqueceu sua senha?</p><a class="mb-0 info-link" href="forgot-pass"> Recuperar </a>
                        </div>
                    </div>
                    <input :type="isPasswordVisible ? 'text' : 'password'" class="form-control" id="password"  ref="password" >
                </div>
                <button type="button" class="mt-4 position-relative d-flex align-items-center justify-content-center btn main-btn w-100" @click="loginBtn">
                    <div class="btn-hover"></div>
                    <p class="mb-0">Entrar</p>
                </button> 
                <div class="d-flex align-items-center justify-content-center mt-2">
                    <p class="p-link subtitle mb-0 l-spacing-2">Criar conta?</p> <a class="mb-0 " href="register"> registre-se </a>
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

import {instanceAuth} from  '../../ConfigAxios.js'

const email = ref(null)
const password = ref(null)

function loginBtn() {
    const emailInfo = email.value.value
    const passInfo = password.value.value

    instanceAuth({
        method: "POST",
        url: "/auth/login",
        data: {
            email: emailInfo,
            password: passInfo
        }
    }).then(response => {

        if(response != null && response.data.accessToken){
            sessionStorage.setItem('accesstoken', response.data.accessToken);

            window.location.href = "/dashboard";
        }
        
    }).catch(error => {
        console.error(error)
    })
}

</script>

<style>

/* espa'camento global do site */
.Login .px-10 {
    padding-right: 10px;
    padding-left: 10px;
}

.Login .px-8 {
    padding-right: 8px;
    padding-left: 8px;
}

/* btn global do site */
.Login .main-btn {
    overflow: hidden;
    background-color: var(--main-color);
}

.Login .main-btn .btn-hover {
    transition: 0.4s ease-in all;
    position: absolute;
    width: 0;
    height: 100%;
    border-radius: 40px;
    background-color: transparent;
}

.Login .main-btn:hover .btn-hover {
    width: 140%;
    background-color: #37d7528f;
}

.Login .main-btn p {
    z-index: 10;
    color: white;
    font-weight: 700 !important;
}

/* Inicio CSS-Global */
.Login .pt-100 {
    padding-top: 100px;
}

.Login .py-100 {
    padding: 100px 0;
}

.Login .py-200 {
    padding: 200px 0;
}

.Login .pt-150 {
    padding-top: 150px !important;
}

.Login .mt-100 {
    margin-top: 100px;
}

.Login .mb-200 {
    margin-bottom: 200px;
}

.Login .mb-100 {
    margin-bottom: 100px;
}

.Login .mb-60 {
    margin-bottom: 60px;
}

.Login .shadow {
    box-shadow: 0 0 3px rgba(30, 41, 59, 0.15) !important;
}

.Login .shadow-lg {
    box-shadow: 0 10px 25px rgba(30, 41, 59, 0.15) !important;
}

.Login .shadow-md {
    box-shadow: 0 5px 13px rgba(30, 41, 59, 0.2) !important;
}

/* CSS Global */
.Login body {
    background-image: white;
    overflow-x: hidden;
}

.Login p, .Login h1, .Login h2, .Login h3, .Login h4, .Login h5, .Login h6, .Login body{
    font-family: "Montserrat", sans-serif;
}

.Login .l-spacing-2{
    letter-spacing:0.28px;
}
.Login .line {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
}

.Login a { 
    color: #312f2f;
    font-size: 12px;
    font-weight: 800 ;
    margin-left: 4px;  
    transition: 0.2s ease-in-out all;
}

.Login a:hover { 
    color: var(--main-color);
}

/* Bloco Principal */
.Login .main-block {
    background-image: white;
}

.Login .main-block.login {
    overflow-x: hidden;
    min-height: 532px;
}

/* Login-box */
.Login .login-box {
    background-color: white;
    width: 350px;
    height: fit-content;
    box-shadow: 0px 0px 20px #f3f3f3;
}

.Login .login-box p {
    font-weight: 400;
    font-size: 14px;
}

.Login .login-box h4{
    font-weight: 600;
}

.Login .login-box input, .login-box button{
    height: 36px;
}

.Login .login-box input{
    color: #818181;
    background-color: #2d82d61c;
    box-shadow: 0px 0px 20px #f3f3f3;
    border: 0px;
    border-bottom: 2px solid var(--border-color);
}

.Login .login-box .subtitle{
    color: var(--subtitle-color);
    font-family: "Poppins", sans-serif;
}

.Login .login-box .info-subtitle{
    font-size: 12px;
    color: var(--subtitle-color);
    font-family: "Poppins", sans-serif;
}

.Login .login-box .info-link{
    font-size: 10px;
}

.Login .form-control:focus {
    color: #818181;
    background-color: #2d82d60f;
    border-color: var(--border-color);
    outline: 0;
    box-shadow: 0px 0px 20px #f3f3f3;
}

.Login .password-icon.fa-eye {
    position: absolute;
    right: 8px;
    bottom: 10px;
}

.Login .password-icon.fa-eye-slash {
    position: absolute;
    right: 7px;
    bottom: 10px;
}

/* Media-login-box */

@media screen and (max-width: 390px){
    .Login .login-box {
        width: calc(100vw - 40px);
    }
}

@media screen and (max-height: 550px){
    .Login .main-block.Login {
        overflow-x: hidden;
        min-height: 732px;
    }
    
}
</style>

