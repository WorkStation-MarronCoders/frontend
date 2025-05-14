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
    <router-link to="/profile">
      <h1>{{ $t('dashboard.profile') }}</h1> 
    </router-link>

    <router-link to="/login">
      <pv-button :label="$t('dashboard.logout')" class="logout-button" />
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

.logout-button{
  background-color: #0f0e2f; 
  color: rgb(255, 255, 255);
  border: #0f0e2f;
}

.logout-button:hover{
  background-color: #c8e6c9; 
  color: #000;
  border: #c8e6c9;
}
</style>
