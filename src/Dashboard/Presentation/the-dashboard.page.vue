<script setup>
 import navBarComponent  from '@/Public/Presentation/nav-bar.component.vue';
 import theTitleComponent from './the-title.component.vue';   
</script>

<template>
    <div class="dashboard-container">
        <nav-bar-component></nav-bar-component>

        <theTitleComponent></theTitleComponent>

        <section class="services">
            <div class="service-card">
                <img src="../../../assets/buscar.png" alt="Buscar espacios de trabajo">
                <div class="service-info">
                    <p>{{$t('dashboard.search')}}</p>
                </div>
            </div>
            <div class="service-card">
                <img src="../../../assets/comparar.jpg" alt="Comparación de opciones">
                <div class="service-info">
                    <p>{{$t('dashboard.compare')}}</p>
                </div>
            </div>
            <div class="service-card">
                <img src="../../../assets/propietario.jpeg" alt="Espacios de trabajo físicos">
                <div class="service-info">
                    <p>{{$t('dashboard.rent')}}</p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.dashboard-container {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.services {
    display: flex;
    flex-direction: row; 
    gap: 20px;
    align-items: center;
    justify-content: center;
}

.service-card {
    display: flex;
    align-items: center;
    background: white;
    width: 400px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    margin: 10px 0;
    transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.service-card img {
    width: 150px; 
    height: 150px;
    border-radius: 5px;
    object-fit: cover;
}

.service-info {
    flex: 1;
    padding-left: 15px;
}

.service-info p {
    font-size: 1.2rem;
    font-weight: bold;
    color: #000000;
}
</style>
