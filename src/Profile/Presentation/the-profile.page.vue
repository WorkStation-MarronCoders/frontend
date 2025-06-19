<script setup>

import NavBar from "@/Public/Presentation/nav-bar.component.vue";
import {ref} from "vue";
const user = ref({
  name: 'Pedro',
  nickname: 'Picapiedra',
  address: '12234 Av. Londres',
  phone: '12424115515',
  email: 'idfsfdfa@gmail.com'
})
</script>

<template>
  <div class="profile">
    <NavBar />

    <div class="content" role="region" aria-label="Sección de perfil de usuario">
      <img
        src="../../../assets/backgrounds/profile-bg.jpg"
        alt="Fondo decorativo del perfil"
        class="bg-image"
        aria-hidden="true"
      />

      <div class="profile-card-container">
        <pv-card class="profile-card" aria-label="Tarjeta con información del perfil de usuario">
          <template #title>
            <div class="card-header">
              <pv-avatar icon="pi pi-user" size="xlarge" aria-label="Avatar de usuario" />
              <span class="user-name">{{ user.name }}</span>
              <pv-button
                class="button"
                aria-label="Editar información del perfil"
              >
                {{ $t('profile.edit') }}
              </pv-button>
            </div>
          </template>

          <template #content>
            <p><strong>{{ $t('profile.nickname') }}</strong> {{ user.nickname }}</p>
            <p><strong>{{ $t('profile.address') }}</strong> {{ user.address }}</p>
            <p><strong>{{ $t('profile.phone') }}</strong> {{ user.phone }}</p>
            <p><strong>{{ $t('profile.email') }}</strong> {{ user.email }}</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>


<style scoped>
.profile {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 10px;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
}

.profile-card-container {
  margin-top: -80px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.profile-card {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  color: #0f0e2f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.button {
  background-color: #0f0e2f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-card-container {
    margin-top: -40px;
  }

  .button {
    width: 100%;
    text-align: center;
  }
}

</style>