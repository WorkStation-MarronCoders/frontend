<script setup>

import NavBar from "@/Public/Presentation/nav-bar.component.vue";
import {ref} from "vue";
const user = ref({
  name: '',
  nickname: '',
  address: '',
  phone: '',
  email: ''
})
</script>

<template>
 <NavBar/>

  <div class = "content">
    <img src="../../../assets/backgrounds/profile-bg.jpg" alt="profile background" class="bg-image"/>
    <pv-card class="profile-card">
      <template #title>
        <div class="card-header">
          <pv-avatar icon="pi pi-user" size="xlarge"/>
          <span>{{user.name}}</span>
        <pv-button aria-label="edit">EDIT</pv-button>
        </div>

      </template>
      <template #content>
        <p>{{ $t('profile.nickname') }} {{user.nickname}}</p>
        <p>{{ $t('profile.address') }} {{user.address}}</p>
        <p>{{ $t('profile.phone') }} {{user.phone}}</p>
        <p>{{ $t('profile.email') }} {{user.email}}</p>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.content {
  position: relative;
}

.bg-image{
  width: 100%;
  max-height: 100vh;
}

.profile-card {
  position: absolute;
  top: 30%;
  right: 10%;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  color: #0f0e2f;
}

.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>