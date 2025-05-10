<script setup>
  import { ref } from 'vue';
  import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue';
</script>

<template>
  <nav class="navbar">
    <IconField>
      <InputIcon class="pi pi-search"></InputIcon>
      <InputText v-model="value1" placeholder="Search"></InputText>
    </IconField>

    <router-link to="/dashboard">
      <h1>{{ $t('dashboard.home') }}</h1> 
    </router-link>
    <router-link to="/dashboard">
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
  justify-content: flex-end;
  align-items: center;
  background-color: #D3D4D8;
  gap: 20px;
}

.navbar h1 {
  text-decoration: none;
  text-decoration-line: underline;
  text-decoration-color: #0f0e2f;
  color: #000;
}
</style>
