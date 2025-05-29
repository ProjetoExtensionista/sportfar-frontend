<template>
    <header class=" w-100 d-flex align-items-center justify-content-center" id="header">
        <div class="w-100 position-relative">
            <div class=" w-100 h-100 d-flex align-items-center">
                <div class="logo-header">
                    <img src="../../assets/images/logo.png" alt="" width="160">
                </div>
                <div class="ms-auto links-header d-flex gap-4 align-items-center">
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
            <div class="line-header"></div>
        </div>
    </header>
</template>

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

#header .line-header {
    width: calc(100% + 164px);
    height: 6px;
    position: absolute;
    bottom: -20px;
    left: -82px;
    background-image: linear-gradient(90deg, #1BE7FF 0%, #6EEB83 25%, #E4FF1A 50%, #FFB800 75%, #FF5714 100%);
}
</style>
