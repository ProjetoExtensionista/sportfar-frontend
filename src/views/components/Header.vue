<template>
<header class=" w-100 d-flex align-items-center justify-content-center" id="header">
    <div class="w-100">
        <div class=" w-100 h-100 d-flex align-items-center">
            <div class="logo-header">
                <img src="../../assets/images/logo.png" alt="" width="160">
            </div>
            <div class="links-header d-flex gap-4 align-items-center">
                <a href="#home" class="">
                    <p class="mb-0 active">Home</p>
                </a>
                <a href="#" class="">
                    <p class="mb-0">Modalidades</p>
                </a>
                <a href="#" class="">
                    <p class="mb-0">Turmas</p>
                </a>
                <a href="#" class="">
                    <p class="mb-0">Professores</p>
                </a>
                <a href="#" class="">
                    <p class="mb-0">Calendário</p>
                </a>
            </div>
        </div>
    </div>
</header>
</template>

<style>

#header {
    height: 70px;
    padding: 16px 82px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.15);
    background-color: white;
}

#header .logo-header {
    margin-right: 60px;
}

#header .links-header {
    border-radius: 8px;
    padding: 8px 30px;
    background-color: #F8F9FA;
    height: 50px;
    width: 100%;
    
}

#header .links-header a {
    text-decoration: none;
}

#header .links-header p {
    color: #929293;
    font-family: "Montserrat", sans-serif;
}

#header .links-header .active {
    color: #191919;
}

</style>
