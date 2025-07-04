<script setup>
import { useRouter } from "vue-router";
import navBarComponent from "@/Public/Presentation/nav-bar.component.vue";
import theTitleComponent from "./the-title.component.vue";

const router = useRouter();
</script>

<template>
  <div class="dashboard-container">
    <nav-bar-component />
    <theTitleComponent />

    <section
      class="services"
      role="region"
      aria-label="Accesos rápidos del dashboard"
    >
      <router-link to="/search" aria-label="Buscar espacios de trabajo">
        <div class="service-card">
          <img
            src="../../../assets/buscar.png"
            alt="Icono de búsqueda de espacios de trabajo"
          />
          <div class="service-info">
            <p>{{ $t("dashboard.search") }}</p>
          </div>
        </div>
      </router-link>

      <router-link to="/properties" aria-label="Comparar espacios disponibles">
        <div class="service-card">
          <img
            src="../../../assets/comparar.jpg"
            alt="Icono de comparación de espacios"
          />
          <div class="service-info">
            <p>{{ $t("dashboard.compare") }}</p>
          </div>
        </div>
      </router-link>

      <router-link to="/add-property" aria-label="Publicar mi propiedad">
        <div class="service-card">
          <img
            src="../../../assets/propietario.jpeg"
            alt="Icono para agregar propiedad"
          />
          <div class="service-info">
            <p>{{ $t("dashboard.rent") }}</p>
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
  padding: clamp(0.75rem, 2vw, 1.5rem);
}

.services {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.service-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 1rem;
  margin: 0.75rem 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}


.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  background-color: #e0f2f1;
}

.service-card img {
  width: 140px;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  background-color: #e0e0e0; /* relleno suave si hay transparencias */
}


.service-info {
  flex: 1;
  padding-left: 1rem;
}

.service-info p {
  font-size: clamp(1rem, 2.2vw, 1.3rem);
  font-weight: 600;
  color: #212121;
}

a {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 1024px) {
  .service-card {
    max-width: 95%;
  }
}

@media (max-width: 768px) {
  .services {
    flex-direction: column;
    align-items: stretch;
  }

  .service-card {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .service-card img {
    width: 80px;
    height: 80px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 auto;
  }

  .service-info {
    padding-left: 0;
    padding-top: 0.5rem;
  }

  .service-info p {
    font-size: clamp(0.9rem, 4vw, 1rem);
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 0.5rem;
  }

  .service-card {
    padding: 0.75rem;
  }

  .service-info p {
    font-size: 1rem;
  }
}

</style>