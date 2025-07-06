<template>
  <div class="properties">
    <navBarComponent />

    <pv-card class="add-office-card">
      <template #title>
        <h1>{{ $t("addProperty.title") }}</h1>
      </template>

      <template #content>
        <form @submit.prevent="submitForm" class="office-form">
          <!-- Location -->
          <pv-float-label>
            <pv-input-text
              id="office-location"
              v-model="form.location"
              required
              :aria-label="$t('addProperty.location')"
              class="w-full"
            />
            <label class="text" for="office-location">{{ $t("addProperty.location") }}</label>
          </pv-float-label>
          <small v-if="backendErrors.Location" class="error-text">
            {{ backendErrors.Location[0] }}
          </small>

          <!-- Capacity -->
          <pv-float-label>
            <pv-input-text
              id="office-capacity"
              type="number"
              v-model.number="form.capacity"
              required
              min="1"
              :aria-label="$t('addProperty.capacity')"
              class="w-full"
            />
            <label for="office-capacity">{{ $t("addProperty.capacity") }}</label>
          </pv-float-label>
          <small v-if="backendErrors.Capacity" class="error-text">
            {{ backendErrors.Capacity[0] }}
          </small>

          <!-- Cost per Day -->
          <pv-float-label>
            <pv-input-text
              id="office-cost"
              type="number"
              v-model.number="form.costPerDay"
              mode="currency"
              currency="PEN"
              locale="es-PE"
              required
              min="0"
              :aria-label="$t('addProperty.price')"
              class="w-full"
            />
            <label for="office-cost">{{ $t("addProperty.price") }}</label>
          </pv-float-label>
          <small v-if="backendErrors.CostPerDay" class="error-text">
            {{ backendErrors.CostPerDay[0] }}
          </small>

          <div class="available-section">
            <select-button
              v-model="form.available"
              :options="availableOptions"
              option-label="label"
              option-value="value"
            />
          </div>

          <pv-divider />

          <div class="services-section">
            <h3>{{ $t("addProperty.services.title") }}</h3>

            <small v-if="backendErrors.Services" class="error-text">
              {{ backendErrors.Services[0] }}
            </small>

            <pv-card
              v-for="(service, index) in form.services"
              :key="index"
              class="service-card"
            >
              <template #content>
                <div class="service-fields">

                  <pv-float-label>
                    <pv-input-text
                      :id="`service-name-${index}`"
                      v-model="service.name"
                      required
                      :aria-label="$t('addProperty.services.name')"
                      class="w-full"
                    />
                    <label :for="`service-name-${index}`">{{
                      $t("addProperty.services.name")
                    }}</label>
                  </pv-float-label>
                  <small
                    v-if="
                      backendErrors[`Services[${index}].Name`] ||
                      backendErrors[`Services.${index}.Name`]
                    "
                    class="error-text"
                  >
                    {{
                      backendErrors[`Services[${index}].Name`] ||
                      backendErrors[`Services.${index}.Name`][0]
                    }}
                  </small>


                  <pv-float-label>
                    <pv-input-text
                      :id="`service-description-${index}`"
                      v-model="service.description"
                      :aria-label="$t('addProperty.services.description')"
                      class="w-full"
                    />
                    <label :for="`service-description-${index}`">{{
                      $t("addProperty.services.description")
                    }}</label>
                  </pv-float-label>
                  <small
                    v-if="
                      backendErrors[`Services[${index}].Description`] ||
                      backendErrors[`Services.${index}.Description`]
                    "
                    class="error-text"
                  >
                    {{
                      backendErrors[`Services[${index}].Description`] ||
                      backendErrors[`Services.${index}.Description`][0]
                    }}
                  </small>


                  <pv-float-label>
                    <pv-input-text
                      :id="`service-cost-${index}`"
                      type="number"
                      v-model.number="service.cost"
                      min="0"
                      :aria-label="$t('addProperty.services.cost')"
                      class="w-full"
                    />
                    <label :for="`service-cost-${index}`">{{
                      $t("addProperty.services.cost")
                    }}</label>
                  </pv-float-label>
                  <small
                    v-if="
                      backendErrors[`Services[${index}].Cost`] ||
                      backendErrors[`Services.${index}.Cost`]
                    "
                    class="error-text"
                  >
                    {{
                      backendErrors[`Services[${index}].Cost`] ||
                      backendErrors[`Services.${index}.Cost`][0]
                    }}
                  </small>

                  <pv-button
                    type="button"
                    @click="removeService(index)"
                    :aria-label="$t('addProperty.services.removeService')"
                    severity="danger"
                    size="small"
                    class="remove-service-btn"
                  >
                    {{ $t("addProperty.services.removeService") }}
                  </pv-button>
                </div>
              </template>
            </pv-card>

            <pv-button
              type="button"
              @click="addService"
              :aria-label="$t('addProperty.services.add')"
              severity="success"
              outlined
              class="add-service-btn"
            >
              {{ $t("addProperty.services.add") }}
            </pv-button>
          </div>

          <pv-divider />


          <pv-button
            type="submit"
            :aria-label="$t('addProperty.submit')"
            class="submit-btn"
          >
            {{ $t("addProperty.submit") }}
          </pv-button>
        </form>
      </template>
    </pv-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import navBarComponent from "@/Public/Presentation/nav-bar.component.vue";
import { OfficesAPIService } from "../Application/office-api.service";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const availableOptions = ref([
  { label: t("properties.disponible"), value: true },
  { label: t("properties.nodisponible"), value: false },
]);

const router = useRouter();
const officesService = new OfficesAPIService();

const form = ref({
  location: "",
  capacity: null,
  costPerDay: null,
  available: true,
  services: [],
});

const backendErrors = ref({});

const addService = () => {
  form.value.services.push({
    name: "",
    description: "",
    cost: null,
  });
};

const removeService = (index) => {
  form.value.services.splice(index, 1);
};

const submitForm = async () => {
  backendErrors.value = {};
  try {
    const officeData = {
      location: form.value.location,
      capacity: form.value.capacity,
      costPerDay: form.value.costPerDay,
      available: form.value.available,
      services: form.value.services.map((service) => ({
        name: service.name,
        description: service.description,
        cost: service.cost,
      })),
    };

    await officesService.createOffice(officeData);

    form.value = {
      location: "",
      capacity: null,
      costPerDay: null,
      available: true,
      services: [],
    };

    router.push({ name: "properties" });
  } catch (error) {
    if (error.response?.data?.errors) {
      backendErrors.value = error.response.data.errors;
    } else {
      console.error("Unexpected error:", error);
      backendErrors.value = {
        general: ["Unexpected error occurred. Please try again."],
      };
    }
  }
};
</script>

<style scoped>
.properties {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 10px;
  color: #0f0e2f;
}

.add-office-card {
  max-width: 800px;
  margin: 20px auto;
  padding: 24px;
  background-color: #ffffff;
  color: #0f0e2f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

h1, h3, label {
  color: #0f0e2f;
  font-weight: 600;
}

.office-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #0f0e2f;
}

input[type="text"],
input[type="number"],
.p-inputtext {
  background-color: #f9f9f9;
  color: #0f0e2f;
  border: 1px solid #0f0e2f;
  padding: 10px;
  border-radius: 6px;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

input[type="text"]:focus,
input[type="number"]:focus,
.p-inputtext:focus {
  border-color: #1f1e4a;
  box-shadow: 0 0 0 2px rgba(15, 14, 47, 0.2);
  outline: none;
}

.error-text {
  color: #b00020;
  font-size: 0.875rem;
  margin-top: 4px;
}

.available-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.services-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.service-card {
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  color: #0f0e2f;
  border-radius: 8px;
}

.service-fields {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.submit-btn {
  align-self: center;
  padding: 12px 30px;
  font-size: 16px;
  background-color: #0f0e2f;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #1f1e4a;
}

.add-service-btn {
  align-self: flex-start;
  border: 1px solid #0f0e2f;
  background-color: transparent;
  color: #0f0e2f;
  border-radius: 6px;
  padding: 8px 20px;
  transition: all 0.2s ease;
}

.add-service-btn:hover {
  background-color: #1f1e4a;
  color: #ffffff;
  border-color: #1f1e4a;
}

.remove-service-btn {
  align-self: flex-start;
  background-color: #ffffff;
  border: 1px solid #b00020;
  color: #b00020;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.remove-service-btn:hover {
  background-color: #b00020;
  color: #ffffff;
}

.w-full {
  width: 100%;
}

.p-selectbutton .p-button {
  background-color: #ffffff;
  border: 1px solid #0f0e2f;
  color: #0f0e2f;
  transition: all 0.2s ease;
  padding: 8px 14px;
  font-weight: 500;
  border-radius: 6px;
}

.p-selectbutton .p-button.p-highlight {
  background-color: #0f0e2f;
  color: #ffffff;
  border-color: #0f0e2f;
}

.p-selectbutton .p-button:hover {
  background-color: #1f1e4a;
  color: #ffffff;
  border-color: #1f1e4a;
}

.p-divider {
  border-top: 1px solid #cccccc;
}

:deep(.p-float-label > label) {
  color: #6c757d !important;
}

:deep(.p-inputtext:focus),
:deep(.p-inputtext:hover) {
  border-color: #1f1e4a !important;
  box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
}

:deep(.add-service-btn) {
  background: #0f0e2f !important;
  color: #ffffff !important;
}

:deep(.add-service-btn :hover) {
  background: #111033 !important;
  transform: scale(1.2);
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

:deep(.submit-btn) {
  background: #0f0e2f !important;
  color: #ffffff !important;
}

:deep(.submit-btn :hover) {
  background: #111033 !important;
  transform: scale(1.1);
  transition: all 0.5s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

</style>
