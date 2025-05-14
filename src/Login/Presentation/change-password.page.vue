<script setup>
import { ref } from 'vue';
import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue';

const backgroundImg = 'https://www.staffingattiffanies.com/wp-content/uploads/2019/04/Celebrity-Household-Management-Agency-1024x685.jpg';
const newPassword = ref('');
const confirmPassword = ref('');
</script>

<template>
  <div class="change-password-container" :style="{ backgroundImage: `url(${backgroundImg})` }">
    <div class="change-password-card">
      <div class="header-container">
        <h1>{{ $t('change-password.title') }}</h1>
        <LanguageSwitcher class="language-switcher-header" />
      </div>
      <h2>{{ $t('change-password.heading') }}</h2>
      
      <div class="form-container">
        <div class="input-group">
          <pv-float-label>
            <pv-input-text 
              id="new-password" 
              v-model="newPassword" 
              type="password" 
            />
            <label for="new-password">{{ $t('change-password.new_password') }}</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label>
            <pv-input-text 
              id="confirm-password" 
              v-model="confirmPassword" 
              type="password" 
            />
            <label for="confirm-password">{{ $t('change-password.confirm_password') }}</label>
          </pv-float-label>
        </div>
        
        <pv-button :label="$t('change-password.button')" class="submit-button" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.change-password-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.change-password-card {
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

.submit-button {
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