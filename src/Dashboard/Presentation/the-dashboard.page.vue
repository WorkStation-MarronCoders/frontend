<script setup>
import { useRouter } from 'vue-router'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'
import theTitleComponent from './the-title.component.vue'

const router = useRouter()

function goToAddProperty() {
  router.push('/add-property')
}
</script>

<template>
  <div class="dashboard-container">
    <nav-bar-component />
    <theTitleComponent />

    <section class="services">
      <div class="service-card">
        <img src="../../../assets/buscar.png" alt="Buscar espacios de trabajo" />
        <div class="service-info">
          <p>{{ $t('dashboard.search') }}</p>
        </div>
      </div>

      <div class="service-card">
        <img src="../../../assets/comparar.jpg" alt="Comparación de opciones" />
        <div class="service-info">
          <p>{{ $t('dashboard.compare') }}</p>
        </div>
      </div>

      <div class="service-card">
        <img src="../../../assets/propietario.jpeg" alt="Espacios de trabajo físicos" />
        <div class="service-info">
          <p>{{ $t('dashboard.rent') }}</p>
        </div>
      </div>

      <!-- ✅ Tarjeta para Agregar Propiedad -->
      <div class="service-card add-property" @click="goToAddProperty" style="cursor: pointer;">
        <img src="https://via.placeholder.com/150?text=Add+Property" alt="Agregar propiedad" />
        <div class="service-info">
          <p>{{ $t('dashboard.addProperty') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
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

/* Estilo especial para la tarjeta de "Agregar Propiedad" */
.add-property {
  border: 2px dashed #4CAF50;
  background-color: #e8f5e9;
}

.add-property:hover {
  background-color: #c8e6c9;
}
</style>
