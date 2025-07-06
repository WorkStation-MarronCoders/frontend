<script setup>
import NavBar from "@/Public/Presentation/nav-bar.component.vue";
import { ref, onMounted } from "vue";
import { UserApiService } from "../Application/user-api.service";

const user = ref({
  firstName: "",
  lastName: "",
  dni: "",
  phoneNumber: "",
  email: "",
  role: "",
});

const isEditing = ref(false);

const fetchUserProfile = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("⚠️ No se encontró el userId en localStorage.");
      return;
    }
    const userData = await UserApiService.getUserById(userId);
    user.value = userData;
  } catch (error) {
    console.error("❌ Error al obtener el perfil del usuario:", error);
  }
};

const saveChanges = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) throw new Error("No se encontró userId.");

    const payload = {
      email: user.value.email,
      phoneNumber: user.value.phoneNumber,
    };

    await UserApiService.updateUserContact(userId, payload);
    isEditing.value = false;
    console.log("✅ Cambios guardados correctamente.");
  } catch (error) {
    console.error("❌ Error al guardar cambios:", error);
  }
};

onMounted(fetchUserProfile);
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
              <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
              <pv-button
                class="button"
                aria-label="Editar información del perfil"
                @click="isEditing = !isEditing"
              >
                {{ isEditing ? $t("profile.cancel") : $t("profile.edit") }}
              </pv-button>
            </div>
          </template>

          <template #content>
            <p>
              <strong>{{ $t("profile.dni") }}</strong> {{ user.dni }}
            </p>

            <p v-if="isEditing">
              <strong>{{ $t("profile.phone") }}</strong>
              <pv-input-text v-model="user.phoneNumber" />
            </p>
            <p v-else>
              <strong>{{ $t("profile.phone") }}</strong> {{ user.phoneNumber }}
            </p>

            <p v-if="isEditing">
              <strong>{{ $t("profile.email") }}</strong>
              <pv-input-text v-model="user.email" />
            </p>
            <p v-else>
              <strong>{{ $t("profile.email") }}</strong> {{ user.email }}
            </p>

            <p>
              <strong>{{ $t("profile.role") }}</strong> {{ user.role }}
            </p>

            <pv-button
              v-if="isEditing"
              class="save-button"
              @click="saveChanges"
              aria-label="Guardar cambios"
            >
              {{ $t("profile.save") }}
            </pv-button>
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
  max-width: 440px;
  background-color: #ffffff;
  border-radius: 12px;
  color: #0f0e2f;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.user-name {
  font-weight: 600;
  font-size: 1.2rem;
  color: #1e1e3f;
}

.button,
.save-button {
  background-color: #0f0e2f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-card-container {
    margin-top: -40px;
  }

  .button,
  .save-button {
    width: 100%;
    text-align: center;
  }
}
</style>
