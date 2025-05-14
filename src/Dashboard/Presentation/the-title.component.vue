<template>
    <div class="workstation">
        <h1>{{$t('dashboard.title')}}</h1>
        <div class="separator"></div>
        <p>{{$t('dashboard.description')}}</p>
    </div>
</template>

<style scoped>
    .workstation {
        background-image: url("../../../assets/fondo.jpg");
        position: relative;
        background-size: cover;
        background-position: center;
        height: 60vh; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white; 
    }

    .workstation::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    .workstation h1 {
        font-size: 3rem;
        position: relative;
    }

    .separator {
        width: 70%;
        height: 2px;
        margin-top: 0;
        position: relative;
        background-color: rgb(255, 255, 255); 
    }

    .workstation p {
        font-size: 1.5rem;
        position: relative;
    }
</style>
