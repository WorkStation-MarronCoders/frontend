<script setup>
import { useRouter } from 'vue-router'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'
import theTitleComponent from './the-title.component.vue'

const router = useRouter()

</script>

<template>
  <div class="dashboard-container">
    <nav-bar-component />
    <theTitleComponent />
    
    <section class="services" role="region" aria-label="Accesos rápidos del dashboard">
  <router-link to="/search" aria-label="Buscar espacios de trabajo">
    <div class="service-card">
      <img src="../../../assets/buscar.png" alt="Icono de búsqueda de espacios de trabajo" />
      <div class="service-info">
        <p>{{ $t('dashboard.search') }}</p>
      </div>
    </div>
  </router-link>

  <router-link to="/dashboard" aria-label="Comparar espacios disponibles">
    <div class="service-card">
      <img src="../../../assets/comparar.jpg" alt="Icono de comparación de espacios" />
      <div class="service-info">
        <p>{{ $t('dashboard.compare') }}</p>
      </div>
    </div>
  </router-link>

  <router-link to="/add-property" aria-label="Publicar mi propiedad">
    <div class="service-card">
      <img src="../../../assets/propietario.jpeg" alt="Icono para agregar propiedad" />
      <div class="service-info">
        <p>{{ $t('dashboard.rent') }}</p>
      </div>
    </div>
  </router-link>
</section>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 10px;
}

.services {
  display: flex;
  flex-wrap: wrap;
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
  width: 100%;
  max-width: 400px;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background-color: #c8e6c9;
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

a {
  text-decoration: none;
  color: inherit; 
}

@media (max-width: 768px) {
  .services {
    flex-direction: column;
    align-items: stretch;
  }

  .service-card {
    flex-direction: column;
    text-align: center;
  }

  .service-info {
    padding-left: 0;
    padding-top: 10px;
  }

  .service-card img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
}

</style>
