<template>
  <div class="properties">
    <navBarComponent />

    <pv-card class="add-office-card">
      <template #title>
        <h1>{{ $t("addOffice.title") }}</h1>
      </template>

      <template #content>
        <form @submit.prevent="submitForm" class="office-form">
          <!-- Location -->
          <pv-float-label>
            <pv-input-text
              id="office-location"
              v-model="form.location"
              required
              :aria-label="$t('addOffice.location')"
              class="w-full"
            />
            <label for="office-location">{{ $t("addOffice.location") }}</label>
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
              :aria-label="$t('addOffice.capacity')"
              class="w-full"
            />
            <label for="office-capacity">{{ $t("addOffice.capacity") }}</label>
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
              required
              min="0"
              :aria-label="$t('addOffice.costPerDay')"
              class="w-full"
            />
            <label for="office-cost">{{ $t("addOffice.costPerDay") }}</label>
          </pv-float-label>
          <small v-if="backendErrors.CostPerDay" class="error-text">
            {{ backendErrors.CostPerDay[0] }}
          </small>

          <!-- Available -->
          <div class="available-section">
            <select-button
              v-model="form.available"
              :options="availableOptions"
              option-label="label"
              option-value="value"
            />
          </div>

          <pv-divider />

          <!-- Services Section -->
          <div class="services-section">
            <h3>{{ $t("addOffice.services") }}</h3>

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
                  <!-- Service Name -->
                  <pv-float-label>
                    <pv-input-text
                      :id="`service-name-${index}`"
                      v-model="service.name"
                      required
                      :aria-label="$t('addOffice.serviceName')"
                      class="w-full"
                    />
                    <label :for="`service-name-${index}`">{{
                      $t("addOffice.serviceName")
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

                  <!-- Service Description -->
                  <pv-float-label>
                    <pv-input-text
                      :id="`service-description-${index}`"
                      v-model="service.description"
                      :aria-label="$t('addOffice.serviceDescription')"
                      class="w-full"
                    />
                    <label :for="`service-description-${index}`">{{
                      $t("addOffice.serviceDescription")
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

                  <!-- Service Cost -->
                  <pv-float-label>
                    <pv-input-text
                      :id="`service-cost-${index}`"
                      type="number"
                      v-model.number="service.cost"
                      min="0"
                      :aria-label="$t('addOffice.serviceCost')"
                      class="w-full"
                    />
                    <label :for="`service-cost-${index}`">{{
                      $t("addOffice.serviceCost")
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
                    :aria-label="$t('addOffice.removeService')"
                    severity="danger"
                    size="small"
                    class="remove-service-btn"
                  >
                    {{ $t("addOffice.removeService") }}
                  </pv-button>
                </div>
              </template>
            </pv-card>

            <pv-button
              type="button"
              @click="addService"
              :aria-label="$t('addOffice.addService')"
              severity="success"
              outlined
              class="add-service-btn"
            >
              {{ $t("addOffice.addService") }}
            </pv-button>
          </div>

          <pv-divider />

          <!-- Submit Button -->
          <pv-button
            type="submit"
            :aria-label="$t('addOffice.submit')"
            class="submit-btn"
          >
            {{ $t("addOffice.submit") }}
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

const availableOptions = ref([
  { label: "Disponible", value: true },
  { label: "No Disponible", value: false },
]);

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
.add-office-card {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.error-text {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}

.office-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.available-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.services-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.service-card {
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}

.service-fields {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.remove-service-btn {
  align-self: flex-start;
}

.add-service-btn {
  align-self: flex-start;
}

.submit-btn {
  align-self: center;
  padding: 12px 30px;
  font-size: 16px;
}

.w-full {
  width: 100%;
}
</style>
