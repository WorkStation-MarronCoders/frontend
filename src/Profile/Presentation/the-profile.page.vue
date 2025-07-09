<script setup>
import NavBar from "@/Public/Presentation/nav-bar.component.vue";
import { ref, onMounted } from "vue";
import { UserApiService } from "../Application/user-api.service.js";

const user = ref({
  firstName: "",
  lastName: "",
  dni: "",
  phoneNumber: "",
  email: "",
  role: "",
});

const isEditing = ref(false);
const isSaving = ref(false);
const saveMessage = ref("");
const userId = localStorage.getItem("userId");

const fetchUserProfile = async () => {
  try {
    const data = await UserApiService.getUserById(userId);
    user.value = data;
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
  }
};

const saveUserProfile = async () => {
  isSaving.value = true;
  saveMessage.value = "";
  try {
    await UserApiService.updateUser(userId, user.value);
    isEditing.value = false;
    saveMessage.value = "✅ Cambios guardados correctamente.";
    setTimeout(() => (saveMessage.value = ""), 3000);
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
    saveMessage.value = "❌ Hubo un error al guardar.";
  } finally {
    isSaving.value = false;
  }
};

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  saveMessage.value = "";
};

onMounted(fetchUserProfile);
</script>

<template>
  <div class="profile">
    <NavBar />

    <div
      class="content"
      role="region"
      aria-label="Sección de perfil de usuario"
    >
      <img
        src="../../../assets/backgrounds/profile-bg.jpg"
        alt="Fondo decorativo del perfil"
        class="bg-image"
        aria-hidden="true"
      />

      <div class="profile-card-container">
        <pv-card class="profile-card" aria-label="Tarjeta de perfil editable">
          <template #title>
            <div class="card-header">
              <pv-avatar
                icon="pi pi-user"
                size="xlarge"
                aria-label="Avatar de usuario"
              />
              <span class="user-name">
                {{ user.firstName }} {{ user.lastName }}
              </span>
              <pv-button
                class="button"
                @click="toggleEdit"
                aria-label="Editar perfil"
              >
                {{ isEditing ? $t("profile.cancel") : $t("profile.edit") }}
              </pv-button>
            </div>
          </template>

          <template #content>
            <div v-if="isEditing">
              <div class="field-group">
                <label>{{ $t("profile.firstName") }}</label>
                <pv-input-text
                  v-model="user.firstName"
                  :aria-label="$t('profile.firstName')" />
              </div>

              <div class="field-group">
                <label>{{ $t("profile.lastName") }}</label>
                <pv-input-text
                  v-model="user.lastName"
                  :aria-label="$t('profile.lastName')" />
              </div>

              <div class="field-group">
                <label>{{ $t("profile.dni") }}</label>
                <pv-input-text
                  v-model="user.dni"
                  :aria-label="$t('profile.dni')" />
              </div>

              <div class="field-group">
                <label>{{ $t("profile.phone") }}</label>
                <pv-input-text
                  v-model="user.phoneNumber"
                  :aria-label="$t('profile.phone')" />
              </div>

              <div class="field-group">
                <label>{{ $t("profile.email") }}</label>
                <pv-input-text
                  v-model="user.email"
                  :aria-label="$t('profile.email')" />
              </div>

              <div class="field-group">
                <label>{{ $t("profile.role") }}</label>
                <pv-input-text
                  :value="user.role"
                  disabled
                  :aria-label="$t('profile.role')" />
              </div>

              <pv-button
                class="button mt-4"
                :disabled="isSaving"
                @click="saveUserProfile"
                :aria-label="$t('profile.save')"
              >
                {{ isSaving ? "Guardando..." : $t("profile.save") }}
              </pv-button>

              <p v-if="saveMessage" class="status-message">{{ saveMessage }}</p>
            </div>

            <div v-else>
              <p>
                <strong>{{ $t("profile.dni") }}</strong> {{ user.dni }}
              </p>
              <p>
                <strong>{{ $t("profile.phone") }}</strong>
                {{ user.phoneNumber }}
              </p>
              <p>
                <strong>{{ $t("profile.email") }}</strong> {{ user.email }}
              </p>
              <p>
                <strong>{{ $t("profile.role") }}</strong> {{ user.role }}
              </p>
              <p v-if="saveMessage" class="status-message">{{ saveMessage }}</p>
            </div>
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

.status-message {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #2c3e50;
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

.field-group {
  margin-bottom: 1rem;
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
