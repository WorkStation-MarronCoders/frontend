<template>
  <div class="offices-page">
    <nav-bar-component />

    <div
      class="container mx-auto p-4"
      role="region"
      aria-label="Listado de oficinas"
    >
      <h1 class="text-2xl font-bold mb-6">{{ $t("offices.title") }}</h1>

      <div class="offices-grid">
        <pv-card
          v-for="office in paginatedOffices"
          :key="office.id"
          class="office-card"
          :class="{ editing: editingOffice === office.id }"
          :aria-label="`Oficina: ${office.location}, Capacidad: ${office.capacity} personas, Precio: $${office.costPerDay} por día`"
        >
          <template #title>
            <div v-if="editingOffice !== office.id">
              {{ office.location }}
            </div>
            <div v-else class="edit-field">
              <label class="edit-label">Ubicación:</label>
              <input
                v-model="editForm.location"
                type="text"
                class="edit-input"
                @keyup.enter="saveEdit(office.id)"
                @keyup.escape="cancelEdit"
              />
            </div>
          </template>

          <template #content>
            <div class="office-details">
              <!-- Modo vista -->
              <div v-if="editingOffice !== office.id">
                <p class="capacity">
                  <strong>{{ $t("offices.capacity") }}:</strong>
                  {{ office.capacity }} personas
                </p>
                <p class="cost">
                  <strong>{{ $t("offices.costPerDay") }}:</strong> ${{
                    office.costPerDay
                  }}/día
                </p>
                <p class="availability">
                  <strong>{{ $t("offices.status") }}:</strong>
                  <span :class="office.available ? 'available' : 'unavailable'">
                    {{
                      office.available
                        ? $t("offices.available")
                        : $t("offices.unavailable")
                    }}
                  </span>
                </p>
                <div
                  v-if="office.services && office.services.length > 0"
                  class="services-section"
                >
                  <strong>{{ $t("offices.services") }}:</strong>
                  <ul class="services-list">
                    <li
                      v-for="service in office.services"
                      :key="service.name"
                      class="service-item"
                    >
                      <div class="service-info">
                        <span class="service-name">{{ service.name }}</span>
                        <span
                          v-if="service.description"
                          class="service-description"
                          >{{ service.description }}</span
                        >
                      </div>
                      <span v-if="service.cost" class="service-cost"
                        >(${{ service.cost }})</span
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Modo edición -->
              <div v-else class="edit-form">
                <div class="edit-field">
                  <label class="edit-label">Capacidad:</label>
                  <input
                    v-model.number="editForm.capacity"
                    type="number"
                    class="edit-input"
                    min="1"
                    @keyup.enter="saveEdit(office.id)"
                    @keyup.escape="cancelEdit"
                  />
                </div>

                <div class="edit-field">
                  <label class="edit-label">Precio por día:</label>
                  <input
                    v-model.number="editForm.costPerDay"
                    type="number"
                    class="edit-input"
                    min="0"
                    step="0.01"
                    @keyup.enter="saveEdit(office.id)"
                    @keyup.escape="cancelEdit"
                  />
                </div>

                <div class="edit-field">
                  <label class="edit-label">Estado:</label>
                  <select
                    v-model="editForm.available"
                    class="edit-select"
                    @keyup.enter="saveEdit(office.id)"
                    @keyup.escape="cancelEdit"
                  >
                    <option :value="true">Disponible</option>
                    <option :value="false">No disponible</option>
                  </select>
                </div>

                <div class="edit-field">
                  <label class="edit-label">Servicios:</label>
                  <div class="services-edit">
                    <div
                      v-for="(service, index) in editForm.services"
                      :key="index"
                      class="service-edit-item"
                    >
                      <div class="service-inputs">
                        <input
                          v-model="service.name"
                          type="text"
                          class="service-input"
                          placeholder="Nombre del servicio"
                        />
                        <textarea
                          v-model="service.description"
                          class="service-description-input"
                          placeholder="Descripción del servicio"
                          rows="2"
                        ></textarea>
                        <input
                          v-model.number="service.cost"
                          type="number"
                          class="service-cost-input"
                          placeholder="Costo"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        @click="removeService(index)"
                        class="remove-service-btn"
                        type="button"
                      >
                        ×
                      </button>
                    </div>
                    <button
                      @click="addService"
                      class="add-service-btn"
                      type="button"
                    >
                      + Agregar servicio
                    </button>
                  </div>
                </div>

                <div class="edit-actions">
                  <button
                    @click="saveEdit(office.id)"
                    class="save-btn"
                    :disabled="saving"
                  >
                    {{ saving ? "Guardando..." : "Guardar" }}
                  </button>
                  <button
                    @click="cancelEdit"
                    class="cancel-btn"
                    :disabled="saving"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="card-footer" v-if="editingOffice !== office.id">
              <pv-button
                :label="$t('offices.edit')"
                severity="secondary"
                outlined
                size="small"
                @click="startEdit(office)"
                :aria-label="`Editar oficina ${office.location}`"
                class="edit-button"
              />
              <pv-button
                :label="$t('offices.delete')"
                severity="danger"
                size="small"
                @click="handleDelete(office.id)"
                :aria-label="`Eliminar oficina ${office.location}`"
                class="delete-button"
              />
            </div>
          </template>
        </pv-card>
      </div>

      <div class="pagination-container">
        <pv-paginator
          v-model:first="first"
          :rows="rowsPerPage"
          :total-records="offices.length"
          :rows-per-page-options="[5, 10, 20]"
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          @page="onPageChange"
        />
      </div>
    </div>

    <pv-speed-dial
      :model="items"
      direction="up"
      :style="{ position: 'fixed', right: '2rem', bottom: '2rem' }"
      class="speed-dial"
      aria-label="Menú flotante para agregar oficina"
    />

    <pv-toast ref="toast" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import navBarComponent from "@/Public/Presentation/nav-bar.component.vue";
import { OfficesAPIService } from "../Application/office-api.service";
import { OfficeAssembler } from "../Application/office.assembler";

const router = useRouter();
const officesService = new OfficesAPIService();
const offices = ref([]);
const toast = ref();

const first = ref(0);
const rowsPerPage = ref(5);

// Estados para edición
const editingOffice = ref(null);
const saving = ref(false);
const editForm = ref({
  location: "",
  capacity: 0,
  costPerDay: 0,
  available: true,
  services: [],
});

const paginatedOffices = computed(() => {
  const start = first.value;
  const end = start + rowsPerPage.value;
  return offices.value.slice(start, end);
});

onMounted(async () => {
  try {
    const response = await officesService.getAllOffices();
    console.log("🔍 Raw API response:", response);
    console.log("🔍 Response data:", response.data);

    offices.value = OfficeAssembler.toEntitiesFromResponse(response);
    console.log("🔍 Assembled offices:", offices.value);
  } catch (error) {
    console.error("Error fetching offices:", error);
  }
});

const startEdit = (office) => {
  editingOffice.value = office.id;
  editForm.value = {
    location: office.location,
    capacity: office.capacity,
    costPerDay: office.costPerDay,
    available: office.available,
    services: office.services ? [...office.services] : [],
  };
};

const cancelEdit = () => {
  editingOffice.value = null;
  editForm.value = {
    location: "",
    capacity: 0,
    costPerDay: 0,
    available: true,
    services: [],
  };
};

const saveEdit = async (officeId) => {
  if (saving.value) return;

  saving.value = true;

  try {
    // Aquí harías la llamada a tu API para actualizar la oficina
    const updatedOffice = {
      id: officeId,
      ...editForm.value,
    };
    console.log("📦 Enviando payload al backend:", updatedOffice);
    await officesService.updateOffice(officeId, updatedOffice);

    // Actualizar el estado local
    const index = offices.value.findIndex((o) => o.id === officeId);
    if (index !== -1) {
      offices.value[index] = { ...offices.value[index], ...editForm.value };
    }

    // Mostrar mensaje de éxito
    toast.value.add({
      severity: "success",
      summary: "Éxito",
      detail: "Oficina actualizada correctamente",
      life: 3000,
    });

    cancelEdit();
  } catch (error) {
    console.error("Error updating office:", error);

    // Mostrar mensaje de error
    toast.value.add({
      severity: "error",
      summary: "Error",
      detail: "Error al actualizar la oficina",
      life: 3000,
    });
  } finally {
    saving.value = false;
  }
};

const addService = () => {
  editForm.value.services.push({ name: "", description: "", cost: 0 });
};

const removeService = (index) => {
  editForm.value.services.splice(index, 1);
};

const handleDelete = async (id) => {
  try {
    await officesService.deleteOffice(id);
    offices.value = offices.value.filter((o) => o.id !== id);
    const totalPages = Math.ceil(offices.value.length / rowsPerPage.value);
    const currentPage = Math.floor(first.value / rowsPerPage.value);
    if (currentPage >= totalPages && totalPages > 0) {
      first.value = (totalPages - 1) * rowsPerPage.value;
    }

    toast.value.add({
      severity: "success",
      summary: "Éxito",
      detail: "Oficina eliminada correctamente",
      life: 3000,
    });
  } catch (error) {
    console.error("Error deleting office:", error);
    toast.value.add({
      severity: "error",
      summary: "Error",
      detail: "Error al eliminar la oficina",
      life: 3000,
    });
  }
};

const handleEdit = (id) => {
  // Esta función ya no se usa, pero la mantengo por compatibilidad
  router.push(`/edit-office/${id}`);
};

const onPageChange = (event) => {
  first.value = event.first;
  rowsPerPage.value = event.rows;
};

const items = ref([
  {
    label: "Add Office",
    icon: "pi pi-plus",
    command: () => {
      router.push("/add-office");
    },
  },
]);
</script>

<style scoped>
.offices-page {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 10px;
  color: #fff;
}

.offices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.office-card {
  background: #0f0e2f;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, max-height 0.3s ease;
  overflow: hidden;
}

.office-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.office-card.editing {
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(144, 238, 144, 0.3);
  border: 2px solid #90ee90;
}

:deep(.p-card-title) {
  color: #fff !important;
  font-size: 1.2rem;
  font-weight: bold;
}

:deep(.p-card-content) {
  color: #fff !important;
}

.office-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.capacity,
.cost,
.availability {
  margin: 0;
  font-size: 0.9rem;
}

.available {
  color: #28a745;
  font-weight: bold;
}

.unavailable {
  color: #dc3545;
  font-weight: bold;
}

.services-section {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #444;
}

.services-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
}

.service-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4rem 0;
  font-size: 0.8rem;
  border-bottom: 1px solid #333;
}

.service-item:last-child {
  border-bottom: none;
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}

.service-name {
  color: #ccc;
  font-weight: bold;
}

.service-description {
  color: #aaa;
  font-size: 0.75rem;
  font-style: italic;
}

.service-cost {
  color: #90ee90;
  font-weight: bold;
  margin-left: 0.5rem;
}

/* Estilos para modo edición */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.edit-label {
  font-size: 0.9rem;
  font-weight: bold;
  color: #90ee90;
}

.edit-input,
.edit-select {
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.9rem;
}

.edit-input:focus,
.edit-select:focus {
  outline: none;
  border-color: #90ee90;
  box-shadow: 0 0 0 2px rgba(144, 238, 144, 0.2);
}

.services-edit {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service-edit-item {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #16213e;
}

.service-inputs {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.service-input {
  padding: 0.4rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.8rem;
}

.service-description-input {
  padding: 0.4rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.8rem;
  resize: vertical;
  min-height: 2.5rem;
  font-family: inherit;
}

.service-description-input:focus {
  outline: none;
  border-color: #90ee90;
  box-shadow: 0 0 0 2px rgba(144, 238, 144, 0.2);
}

.service-cost-input {
  padding: 0.4rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #1a1a2e;
  color: #fff;
  font-size: 0.8rem;
}

.remove-service-btn {
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
  align-self: flex-start;
  margin-top: 0.2rem;
}

.remove-service-btn:hover {
  background: #c82333;
}

.add-service-btn {
  background: #90ee90;
  color: #0f0e2f;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: bold;
}

.add-service-btn:hover {
  background: #98fb98;
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.save-btn {
  flex: 1;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem;
  font-weight: bold;
  cursor: pointer;
}

.save-btn:hover:not(:disabled) {
  background: #218838;
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  flex: 1;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn:hover:not(:disabled) {
  background: #5a6268;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 1rem;
}

.edit-button {
  flex: 1;
}

.delete-button {
  flex: 1;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

:deep(.p-paginator) {
  background: #0f0e2f;
  border: 1px solid #444;
  border-radius: 8px;
  color: #fff;
}

:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-next),
:deep(.p-paginator .p-paginator-prev),
:deep(.p-paginator .p-paginator-first),
:deep(.p-paginator .p-paginator-last) {
  color: #fff;
  background: transparent;
  border: 1px solid #444;
  margin: 0 2px;
}

:deep(.p-paginator .p-paginator-page:hover),
:deep(.p-paginator .p-paginator-next:hover),
:deep(.p-paginator .p-paginator-prev:hover),
:deep(.p-paginator .p-paginator-first:hover),
:deep(.p-paginator .p-paginator-last:hover) {
  background: #90ee90;
  color: #0f0e2f;
}

:deep(.p-paginator .p-paginator-page.p-highlight) {
  background: #90ee90;
  color: #0f0e2f;
  border-color: #90ee90;
}

:deep(.p-dropdown) {
  background: #0f0e2f;
  border: 1px solid #444;
  color: #fff;
}

:deep(.p-dropdown:hover) {
  border-color: #90ee90;
}

/* Speed dial styles */
:deep(.p-speeddial-button) {
  background: #90ee90 !important;
  width: 3.5rem;
  height: 3.5rem;
  color: #0f0e2f !important;
  border: none !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-speeddial-button:hover) {
  background: #98fb98 !important;
  transform: scale(1.1);
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

:deep(.p-speeddial-action) {
  background: #90ee90;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  color: #0f0e2f;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.p-speeddial-action:hover) {
  background: #98fb98;
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
