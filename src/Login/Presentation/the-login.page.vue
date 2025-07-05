<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LanguageSwitcher from "../../Public/Presentation/language-switcher.component.vue";
import { UserApiService } from "../Application/user-api.service";

const loginSceneImg =
  "https://www.tillersystems.com/wp-content/uploads/2020/01/coworking-place-tiller.jpeg";
const email = ref("");
const passwordHash = ref("");
const errorMessage = ref("");
const formSubmitted = ref(false);

const router = useRouter();

const isFormValid = () =>
  email.value.trim() !== "" && passwordHash.value.trim() !== "";

const handleLogin = async () => {
  formSubmitted.value = true;
  errorMessage.value = "";

  if (!isFormValid()) {
    errorMessage.value = "Por favor, completa todos los campos.";
    return;
  }

  try {
    const jwt = await UserApiService.login({
      email: email.value.trim(),
      passwordHash: passwordHash.value.trim(),
    });

    localStorage.setItem("jwt", jwt);
    router.push("/dashboard");
  } catch (error) {
    errorMessage.value =
      error?.message || "No se pudo iniciar sesión. Inténtalo nuevamente.";
    console.error("❌ Error durante el login:", error);
  }
};
</script>

<template>
  <div
    class="login-container"
    :style="{ backgroundImage: `url(${loginSceneImg})` }"
  >
    <div
      class="login-card"
      role="form"
      aria-label="Formulario de inicio de sesión"
    >
      <div class="header-container">
        <h1>{{ $t("login.title") }}</h1>
        <LanguageSwitcher class="language-switcher-header" />
      </div>
      <h2>{{ $t("login.heading") }}</h2>

      <div class="form-container">
        <div class="input-group">
          <pv-float-label>
            <pv-input-text
              id="email"
              v-model="email"
              :class="{ 'p-invalid': formSubmitted && email.trim() === '' }"
              aria-required="true"
              aria-label="Correo electrónico"
            />
            <label for="email">{{ $t("login.username") }}</label>
          </pv-float-label>
        </div>

        <div class="input-group">
          <pv-float-label>
            <pv-input-text
              id="passwordHash"
              type="password"
              v-model="passwordHash"
              :class="{
                'p-invalid': formSubmitted && passwordHash.trim() === '',
              }"
              aria-required="true"
              aria-label="Contraseña"
            />
            <label for="passwordHash">{{ $t("login.password") }}</label>
          </pv-float-label>
        </div>

        <pv-button
          :label="$t('login.button')"
          class="login-button"
          @click="handleLogin"
          aria-label="Botón para iniciar sesión"
        />

        <p v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </p>
      </div>

      <div class="links">
        <div class="signup">
          <span>{{ $t("login.no_account") }}</span>
          <router-link to="/register">{{ $t("login.sign_up") }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
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

.language-switcher-login {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
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

.login-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 4px;
}

.links {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.signup {
  display: flex;
  gap: 0.5rem;
}

a {
  color: #2196f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

span {
  color: #666;
}

@media (max-width: 600px) {
  .login-container {
    padding: 1rem;
    flex-direction: column;
  }

  .login-card {
    max-width: 100%;
    padding: 1rem;
    box-shadow: none;
    border-radius: 0;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
  }

  h2 {
    font-size: 1.2rem;
    text-align: center;
  }

  .form-container {
    gap: 1rem;
  }

  .language-switcher-login {
    flex-direction: column;
    align-items: center;
  }

  .links {
    gap: 0.5rem;
  }
}
</style>
