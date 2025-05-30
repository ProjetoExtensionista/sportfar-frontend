<template>
    <div class="sub-header d-flex align-items-end w-100">
        <div class="opt-title w-100 d-flex align-items-center justify-content-between">
            <p class="mb-0">Formulário para criação de turmas</p>
            <a href="" class="back-link rounded"><i class="fa-solid fa-arrow-left"></i>Voltar</a>
        </div>
    </div>
</template>

<style scoped>
.sub-header a{
    background-color: white;
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #c3c3c3a2;
    box-shadow: 4px 4px 8px 0px #00000040;
    text-decoration: none !important;
    padding: 4px 12px;
    font-size: 13px;
    color: #212529;
    font-weight: 600;
}

.sub-header a i{
    margin-right: 6px;
    font-size: 12px;
}

.sub-header {
    margin-top: 3px;
    height: 90px;
    padding:0 82px;
}

.sub-header .opt-title {
    position: relative;
    height: 56px;
}

.sub-header .opt-title p {
    height: fit-content;
    font-weight: 700;
}

@media screen and (max-height: 740px) {
    .sub-header {
        margin-top: 3px;
        height: 70px;
        padding-left: 82px;
    }
}
</style>