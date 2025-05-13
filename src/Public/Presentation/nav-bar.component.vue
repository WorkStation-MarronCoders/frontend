<script setup>
  import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue';
  
</script>

<template>

  <nav class="navbar">
    <div class="logo">
      <router-link to="/dashboard">
        <img src="../../../assets/logo.jpg" alt="Buscar espacios de trabajo">
      </router-link>
    </div>
    <router-link to="/dashboard">
      <h1>{{ $t('dashboard.home') }}</h1> 
    </router-link>
    <router-link to="/plans">
      <h1>{{ $t('dashboard.plan') }}</h1> 
    </router-link>
    <router-link to="/dashboard">
      <h1>{{ $t('dashboard.profile') }}</h1> 
    </router-link>

    <LanguageSwitcher/>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  background-color: #ffffff;
  gap: 20px;
}

.logo {
  margin-right: auto;
  margin-left: 20px;
}

.logo img {
  width: 50px;
  height: 50px;
}

.navbar h1 {
  text-decoration: none;
  text-decoration-line: underline;
  text-decoration-color: #0f0e2f;
  color: #000;
}
</style>
