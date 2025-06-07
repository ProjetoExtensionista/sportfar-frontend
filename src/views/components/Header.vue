<template>
    <header class="w-100 d-flex align-items-center justify-content-center" id="header">
        <div class="w-100 position-relative">
            <div class="w-100 h-100 d-flex align-items-center">
                <div class="logo-header">
                    <img src="../../assets/images/logo.png" alt="Logo" width="160" />
                </div>
                <div class="ms-auto links-header d-flex gap-4 align-items-center pe-0">
                    <router-link to="/" class="">
                        <p :class="{ active: $route.name === 'Home' }" class="mb-0">Home</p>
                    </router-link>
                    <router-link to="/modalidades">
                        <p :class="{ active: $route.name === 'modalidades' }" class="mb-0">Modalidades</p>
                    </router-link>
                    <router-link to="/turmas">
                        <p :class="{ active: $route.name === 'turmas' }" class="mb-0">Turmas</p>
                    </router-link>
                    <router-link to="/teachers">
                        <p :class="{ active: $route.name === 'Teachers' }" class="mb-0">Professores</p>
                    </router-link>
                    <router-link to="/calendario">
                        <p :class="{ active: $route.name === 'calendario' }" class="mb-0">Calendário</p>
                    </router-link>
                    <div class="" data-bs-toggle="modal" data-bs-target="#logoutModal">
                        <p class="logout mb-0">sair</p>
                    </div>
                </div>
            </div>
            <div class="line-header"></div>
        </div>
        <div class="modal fade" id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Deseja sair do sistema?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn cancel-btn" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn logout-btn" @click="logoutBtn">Sair</button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>

function logoutBtn() {
 
  const token = sessionStorage.getItem('accesstoken');
    if (token) {
      sessionStorage.removeItem('accesstoken');
       window.location.href = "/login";
    }
}

</script>

<style scoped> 


#header {
    height: 90px;
    padding: 16px 82px;
    background-color: white;
}

@media screen and (max-height: 740px){
    #header {
        height: 70px;
    }
}

#header .logo-header {
    margin-right: 60px;
}

#header .links-header {
    border-radius: 8px;
    padding: 8px 30px;
    height: 50px;
}

#header .links-header a {
    text-decoration: none;
}

#header .links-header p {
    transition: all ease-in-out 0.2s;
    color: #929293;
    font-family: "Montserrat", sans-serif;
}

#header .links-header .active {
    color: #191919;
}

#header .links-header a:hover p{
    color: #191919;
}

#header .logout:hover  {
  color: #191919;
  cursor: pointer;
}


#header .line-header {
    width: calc(100% + 164px);
    height: 6px;
    position: absolute;
    bottom: -20px;
    left: -82px;
    background-image: linear-gradient(90deg, #1BE7FF 0%, #6EEB83 25%, #E4FF1A 50%, #FFB800 75%, #FF5714 100%);
}

.modal-content  {
    max-width: 350px;
    margin: 0 auto;
    border: 1px solid #c3c3c3a2;
}

.modal-header {
    border-bottom: 0px solid transparent;
}

.modal-header h5 {
    font-size: 18px;
}

.modal-footer {
    border-top: 0px solid transparent;
}

.btn-close {
    font-size: 10px;
}

.logout-btn {
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: #c3c3c3a2;
    text-decoration: none !important;
    padding: 6px 24px;
    font-weight: 600;
}

.logout-btn:hover {
    border-color: #c3c3c3a2;
}

.cancel-btn {
    background-color: rgb(196, 79, 79);
    border-width: 1px;
    border-style: solid;
    border-color: rgb(196, 79, 79);
    text-decoration: none !important;
    padding: 6px 24px;
    font-weight: 600;
    color: white;
}

.cancel-btn:hover {
    background-color: rgb(196, 79, 79);
    border-color: rgb(196, 79, 79);
    color: white;
}
</style>
