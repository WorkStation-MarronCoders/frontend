<script setup>
import { ref } from 'vue';
import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue';

const backgroundImg = 'https://www.coworkingcafe.com/blog/wp-content/uploads/sites/79/2025/03/WORKSPACE-PHOTOS-RESIZE-121.jpg';
const name = ref('');
const email = ref('');
const password = ref('');
const phoneNumber = ref('');
</script>

<template>
  <div class="register-container" :style="{ backgroundImage: `url(${backgroundImg})` }">
    <div class="register-card">
      <div class="header-container">
        <h1>{{ $t('register.title') }}</h1>
        <LanguageSwitcher class="language-switcher-header" />
      </div>
      <h2>{{ $t('register.heading') }}</h2>
      
      <div class="form-container">
        <div class="input-group">
          <pv-float-label>
            <pv-input-text id="name" v-model="name" />
            <label for="name">{{ $t('register.name') }}</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label>
            <pv-input-text id="email" v-model="email" type="email" />
            <label for="email">{{ $t('register.email') }}</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label>
            <pv-input-text id="password" v-model="password" type="password" />
            <label for="password">{{ $t('register.password') }}</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label>
            <pv-input-text id="phone" v-model="phoneNumber" />
            <label for="phone">{{ $t('register.phone') }}</label>
          </pv-float-label>
        </div>
        
        <pv-button :label="$t('register.button')" class="register-button" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.register-card {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
  font-weight: 400;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

:deep(.p-float-label) {
  width: 100%;
}

:deep(.p-inputtext) {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 4px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.language-switcher-header {
  margin-left: 1rem;
}
</style>