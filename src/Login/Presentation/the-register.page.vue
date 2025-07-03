<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import LanguageSwitcher from "../../Public/Presentation/language-switcher.component.vue";

const router = useRouter();
const backgroundImg =
  "https://www.coworkingcafe.com/blog/wp-content/uploads/sites/79/2025/03/WORKSPACE-PHOTOS-RESIZE-121.jpg";

// Form fields matching CreateUserCommand
const firstName = ref("");
const lastName = ref("");
const dni = ref("");
const phoneNumber = ref("");
const email = ref("");
const role = ref(null);
const nickname = ref("");
const description = ref("");
const businessName = ref("");
const extraInfo = ref("");

const formSubmitted = ref(false);
const touchedFields = ref({
  firstName: false,
  lastName: false,
  dni: false,
  phoneNumber: false,
  email: false,
  role: false,
  nickname: false,
  description: false,
  businessName: false,
  extraInfo: false,
});

// User role options
const userRoleOptions = ref([
  { label: "Busco oficinas", value: "Seeker" },
  { label: "Ofrezco oficinas", value: "Lessor" },
]);

const isFormValid = computed(() => {
  return (
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    dni.value.trim() !== "" &&
    phoneNumber.value.trim() !== "" &&
    email.value.trim() !== "" &&
    role.value !== null
  );
});

const handleRegister = async () => {
  formSubmitted.value = true;
  if (!isFormValid.value) return;

  try {
    // Prepare data to match CreateUserCommand structure
    const userData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      dni: dni.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
      email: email.value.trim(),
      role: role.value,
      nickname: nickname.value.trim() || null,
      description: description.value.trim() || null,
      businessName: businessName.value.trim() || null,
      extraInfo: extraInfo.value.trim() || null,
    };

    console.log("User data to submit:", userData);

    // Uncomment when you have the API service ready
    // await userService.createUser(userData);

    router.push("/dashboard");
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const handleBlur = (field) => {
  touchedFields.value[field] = true;
};

const isFieldInvalid = (field, value) => {
  if (field === "role") {
    return (
      (touchedFields.value[field] || formSubmitted.value) && value === null
    );
  }
  return (
    (touchedFields.value[field] || formSubmitted.value) && value.trim() === ""
  );
};

const isOptionalFieldInvalid = (field, value) => {
  // Optional fields are never invalid, just show validation styling if they have content
  return false;
};
</script>

<template>
  <div
    class="register-container"
    :style="{ backgroundImage: `url(${backgroundImg})` }"
  >
    <div
      class="register-card"
      role="form"
      aria-label="Formulario de registro de usuario"
    >
      <div class="header-container">
        <h1>{{ $t("register.title") }}</h1>
        <LanguageSwitcher class="language-switcher-header" />
      </div>
      <h2>{{ $t("register.heading") }}</h2>

      <div class="form-container">
        <!-- Required Fields Section -->
        <div class="form-section">
          <h3>{{ $t("register.requiredInfo") }}</h3>

          <div class="input-row">
            <div class="input-group">
              <pv-float-label>
                <pv-input-text
                  id="firstName"
                  v-model="firstName"
                  :class="{
                    'p-invalid': isFieldInvalid('firstName', firstName),
                  }"
                  @blur="handleBlur('firstName')"
                  aria-required="true"
                  :aria-invalid="isFieldInvalid('firstName', firstName)"
                  aria-label="Nombre"
                />
                <label for="firstName">{{ $t("register.firstName") }}*</label>
              </pv-float-label>
            </div>

            <div class="input-group">
              <pv-float-label>
                <pv-input-text
                  id="lastName"
                  v-model="lastName"
                  :class="{ 'p-invalid': isFieldInvalid('lastName', lastName) }"
                  @blur="handleBlur('lastName')"
                  aria-required="true"
                  :aria-invalid="isFieldInvalid('lastName', lastName)"
                  aria-label="Apellido"
                />
                <label for="lastName">{{ $t("register.lastName") }}*</label>
              </pv-float-label>
            </div>
          </div>

          <div class="input-group">
            <pv-float-label>
              <pv-input-text
                id="dni"
                v-model="dni"
                :class="{ 'p-invalid': isFieldInvalid('dni', dni) }"
                @blur="handleBlur('dni')"
                aria-required="true"
                :aria-invalid="isFieldInvalid('dni', dni)"
                aria-label="DNI"
                maxlength="8"
              />
              <label for="dni">{{ $t("register.dni") }}*</label>
            </pv-float-label>
          </div>

          <div class="input-group">
            <pv-float-label>
              <pv-input-text
                id="email"
                v-model="email"
                type="email"
                :class="{ 'p-invalid': isFieldInvalid('email', email) }"
                @blur="handleBlur('email')"
                aria-required="true"
                :aria-invalid="isFieldInvalid('email', email)"
                aria-label="Correo electrónico"
              />
              <label for="email">{{ $t("register.email") }}*</label>
            </pv-float-label>
          </div>

          <div class="input-group">
            <pv-float-label>
              <pv-input-text
                id="phone"
                v-model="phoneNumber"
                :class="{
                  'p-invalid': isFieldInvalid('phoneNumber', phoneNumber),
                }"
                @blur="handleBlur('phoneNumber')"
                aria-required="true"
                :aria-invalid="isFieldInvalid('phoneNumber', phoneNumber)"
                aria-label="Número de teléfono"
                maxlength="9"
              />
              <label for="phone">{{ $t("register.phone") }}*</label>
            </pv-float-label>
          </div>
          <div class="input-group">
            <pv-float-label>
              <pv-input-text
                id="password"
                v-model="password"
                :class="{ 'p-invalid': isFieldInvalid('password', password) }"
                @blur="handleBlur('password')"
                aria-required="true"
                :aria-invalid="isFieldInvalid('password', password)"
                aria-label="Contraseña"
                maxlength="20"
              />
              <label for="password">password</label>
            </pv-float-label>
          </div>

          <div class="input-group">
            <label for="role" class="role-label"
              >{{ $t("register.role") }}*</label
            >
            <select-button
              id="role"
              v-model="role"
              :options="userRoleOptions"
              option-label="label"
              option-value="value"
              :class="{ 'p-invalid': isFieldInvalid('role', role) }"
              @blur="handleBlur('role')"
              aria-required="true"
              :aria-invalid="isFieldInvalid('role', role)"
            />
          </div>
        </div>

        <pv-divider />

        <!-- Optional Fields Section -->
        <!-- Optional Fields Section -->
        <transition name="fade-slide">
          <div class="form-section" v-if="role === 'Lessor'">
            <h3>{{ $t("register.optionalInfo") }}</h3>

            <div class="input-group">
              <pv-float-label>
                <pv-input-text
                  id="nickname"
                  v-model="nickname"
                  @blur="handleBlur('nickname')"
                  aria-label="Apodo o nombre de usuario"
                />
                <label for="nickname">{{ $t("register.nickname") }}</label>
              </pv-float-label>
            </div>

            <div class="input-group">
              <pv-float-label>
                <pv-input-text
                  id="businessName"
                  v-model="businessName"
                  @blur="handleBlur('businessName')"
                  aria-label="Nombre de empresa"
                />
                <label for="businessName">{{
                  $t("register.businessName")
                }}</label>
              </pv-float-label>
            </div>

            <div class="input-group">
              <pv-float-label>
                <textarea
                  id="description"
                  v-model="description"
                  @blur="handleBlur('description')"
                  aria-label="Descripción personal"
                  rows="3"
                  class="p-inputtextarea"
                />
                <label for="description">{{
                  $t("register.description")
                }}</label>
              </pv-float-label>
            </div>

            <div class="input-group">
              <pv-float-label>
                <textarea
                  id="extraInfo"
                  v-model="extraInfo"
                  @blur="handleBlur('extraInfo')"
                  aria-label="Información adicional"
                  rows="3"
                  class="p-inputtextarea"
                />
                <label for="extraInfo">{{ $t("register.extraInfo") }}</label>
              </pv-float-label>
            </div>
          </div>
        </transition>

        <pv-button
          :label="$t('register.button')"
          class="register-button"
          @click="handleRegister"
          :disabled="!isFormValid"
          aria-label="Registrar nueva cuenta"
        />
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
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
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

h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #444;
  font-weight: 500;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-group {
  margin-bottom: 1rem;
  width: 100%;
}

.role-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 500;
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

:deep(.p-inputtextarea) {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

:deep(.p-selectbutton) {
  width: 100%;
}

:deep(.p-selectbutton .p-button) {
  flex: 1;
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border-radius: 4px;
  font-size: 1.1rem;
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

:deep(.p-invalid) {
  border-color: #dc3545 !important;
}

:deep(.p-invalid:enabled:focus) {
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
}

@media (max-width: 768px) {
  .register-card {
    padding: 1rem;
    max-width: 95%;
  }

  .input-row {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .language-switcher-header {
    margin-left: 0;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
