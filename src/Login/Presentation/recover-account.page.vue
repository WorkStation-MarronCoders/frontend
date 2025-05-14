<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LanguageSwitcher from '../../Public/Presentation/language-switcher.component.vue';

const router = useRouter();
const backgroundImg = 'https://cdn.mos.cms.futurecdn.net/X5NGnGzooL96BuJBcgnWtA.jpg';
const email = ref('');

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const handleSubmit = () => {
  if (isValidEmail.value) {
    router.push('/change-password');
  }
};
</script>

<template>
  <div class="recover-container" :style="{ backgroundImage: `url(${backgroundImg})` }">
    <div class="recover-card">
      <div class="header-container">
        <h1>{{ $t('recover-account.title') }}</h1>
        <LanguageSwitcher class="language-switcher-header" />
      </div>
      <h2>{{ $t('recover-account.heading') }}</h2>
      
      <p class="instructions">
        {{ $t('recover-account.instructions') }}
      </p>

      <div class="form-container">
        <div class="input-group">
          <pv-float-label>
            <pv-input-text id="email" v-model="email" type="email" />
            <label for="email">{{ $t('recover-account.email') }}</label>
          </pv-float-label>
        </div>
        
        <pv-button 
          :label="$t('recover-account.button')" 
          class="submit-button" 
          :disabled="!isValidEmail"
          @click="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.recover-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.recover-card {
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
  margin-bottom: 1rem;
  color: #666;
  font-weight: 400;
}

.instructions {
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.5;
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