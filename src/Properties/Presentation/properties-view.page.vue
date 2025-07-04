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
          :aria-label="`Oficina: ${office.location}, Capacidad: ${office.capacity} personas, Precio: $${office.costPerDay} por día`"
        >
          <template #title>
            {{ office.location }}
          </template>

          <template #content>
            <div class="office-details">
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
                    <span class="service-name">{{ service.name }}</span>
                    <span v-if="service.cost" class="service-cost"
                      >(${{ service.cost }})</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <template #footer>
            <div class="card-footer">
              <pv-button
                :label="$t('offices.edit')"
                severity="secondary"
                outlined
                size="small"
                @click="handleEdit(office.id)"
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

    <pv-toast />
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

const first = ref(0);
const rowsPerPage = ref(5);

const paginatedOffices = computed(() => {
  const start = first.value;
  const end = start + rowsPerPage.value;
  return offices.value.slice(start, end);
});

onMounted(async () => {
  try {
    const response = await officesService.getAllOffices();
    offices.value = OfficeAssembler.toEntitiesFromResponse(response);
  } catch (error) {
    console.error("Error fetching offices:", error);
  }
});

const handleDelete = async (id) => {
  try {
    await officesService.deleteOffice(id);
    offices.value = offices.value.filter((o) => o.id !== id);
    const totalPages = Math.ceil(offices.value.length / rowsPerPage.value);
    const currentPage = Math.floor(first.value / rowsPerPage.value);
    if (currentPage >= totalPages && totalPages > 0) {
      first.value = (totalPages - 1) * rowsPerPage.value;
    }
  } catch (error) {
    console.error("Error deleting office:", error);
  }
};

const handleEdit = (id) => {
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
  transition: transform 0.3s, box-shadow 0.3s;
}

.office-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
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
  align-items: center;
  padding: 0.2rem 0;
  font-size: 0.8rem;
}

.service-name {
  color: #ccc;
}

.service-cost {
  color: #90ee90;
  font-weight: bold;
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

/* Speed dial styles (same as original) */
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
