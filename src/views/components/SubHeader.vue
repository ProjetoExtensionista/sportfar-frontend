<template>
    <div class="sub-header d-flex align-items-end w-100">
        <div class="opt-title d-flex align-items-center justify-content-center">
            <p class="mb-0">Formulário para criação de turmas</p>
        </div>
    </div>
</template>

<style scoped>
.sub-header {
    margin-top: 3px;
    height: 90px;
    padding-left: 82px;
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