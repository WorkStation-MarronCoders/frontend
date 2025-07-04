<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue'

const showNav = ref(true)
const isMobile = ref(window.innerWidth <= 768)

function toggleNav() {
  if (isMobile.value) {
    showNav.value = !showNav.value
  }
}

function handleResize() {
  isMobile.value = window.innerWidth <= 768
  showNav.value = !isMobile.value // mostrar siempre si no es móvil
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div v-if="isMobile" class="mobile-menu-trigger">
    <button @click="toggleNav" aria-label="Abrir menú de navegación">
      ☰ <span class="menu-label">WORKSTATION</span>
    </button>
  </div>

  <nav v-show="showNav" class="navbar" role="navigation" aria-label="Barra de navegación principal">
    <div class="logo">
      <router-link to="/dashboard" aria-label="Ir al inicio del panel">
        <img src="../../../assets/logo.jpg" alt="Logo del sitio" />
      </router-link>
    </div>

    <div class="nav-links">
      <router-link to="/properties" aria-label="Propiedades"><h1>{{ $t('dashboard.properties') }}</h1></router-link>
      <router-link to="/plans" aria-label="Planes disponibles"><h1>{{ $t('dashboard.plan') }}</h1></router-link>
      <router-link to="/profile" aria-label="Mi perfil"><h1>{{ $t('dashboard.profile') }}</h1></router-link>
    </div>

    <div class="nav-actions">
      <router-link to="/login" aria-label="Cerrar sesión">
        <pv-button :label="$t('dashboard.logout')" class="logout-button" />
      </router-link>
      <LanguageSwitcher/>
    </div>
  </nav>
</template>

<style scoped>
.mobile-menu-trigger button {
  background: none;
  border: none;
  font-size: 2rem;
  color: #0f0e2f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-label {
  font-size: 1.2rem;
  font-weight: 500;
  color: #0f0e2f;
  margin-left: 3.5rem;
}


@media (max-width: 768px) {
  .mobile-menu-trigger {
    display: block;
  }

  .navbar {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .nav-links {
    justify-content: center;
    flex-direction: column;
    gap: 0.75rem;
  }

  .nav-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .logout-button {
    width: 100%;
  }
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo img {
  width: 50px;
  height: 50px;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links h1 {
  font-size: clamp(1rem, 2vw, 1.5rem);
  text-decoration: underline;
  color: #000;
  margin: 0;
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.logout-button {
  background-color: #0f0e2f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #c8e6c9;
  color: #000;
}
</style>