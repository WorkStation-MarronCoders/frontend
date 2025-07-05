<script setup>
import { ref, computed, onMounted } from "vue";
import navBarComponent from "@/Public/Presentation/nav-bar.component.vue";
import { OfficeSearchAPIService } from "../Search/Application/office-search-api.service";
import { OfficeAssembler } from "../Search/Application/office.assembler";

const query = ref("");
const filters = ref({
  capacityMin: null,
  capacityMax: null,
  priceMin: null,
  priceMax: null,
});
const results = ref([]);
const selectedOffice = ref(null);
const isSearching = ref(false);

const apiService = new OfficeSearchAPIService();

const performSearch = async () => {
  if (isSearching.value) {
    console.log("🔄 Search already in progress, skipping...");
    return;
  }

  try {
    isSearching.value = true;
    selectedOffice.value = null;

    if (query.value.trim()) {
      console.log("🔍 Searching for location:", query.value.trim());
      const response = await apiService.getOfficeByLocation(query.value.trim());

      console.log("📡 API Response:", response);

      const offices = OfficeAssembler.toEntitiesFromResponse(response);
      results.value = offices;

      if (results.value.length === 0) {
        console.log("⚠️ No offices found for location:", query.value.trim());
      }
    } else {
      await fetchOffices();
    }
  } catch (error) {
    console.error("❌ Error al buscar oficina:", error);

    if (error.response?.status === 404) {
      console.log("⚠️ No office found for location:", query.value.trim());
      results.value = [];
    } else {
      console.error("❌ Unexpected error:", error);
      results.value = [];
    }
  } finally {
    isSearching.value = false;
  }
};

const handleEnterKey = (event) => {
  event.preventDefault();
  performSearch();
};

const handleSearchClick = (event) => {
  event.preventDefault();
  performSearch();
};

const fetchOffices = async () => {
  if (isSearching.value) return;

  try {
    isSearching.value = true;
    const response = await apiService.getAllOffices();
    results.value = OfficeAssembler.toEntitiesFromResponse(response);
  } catch (error) {
    console.error("Error fetching offices:", error);
  } finally {
    isSearching.value = false;
  }
};

const selectOffice = async (office) => {
  selectedOffice.value = { ...office, services: [] };
  console.log("not implemented yet");
};

const filteredResults = computed(() => {
  return results.value.filter((item) => {
    const capacityMinOk =
      !filters.value.capacityMin || item.capacity >= filters.value.capacityMin;

    const capacityMaxOk =
      !filters.value.capacityMax || item.capacity <= filters.value.capacityMax;

    const priceMinOk =
      !filters.value.priceMin || item.costPerDay >= filters.value.priceMin;

    const priceMaxOk =
      !filters.value.priceMax || item.costPerDay <= filters.value.priceMax;

    return capacityMinOk && capacityMaxOk && priceMinOk && priceMaxOk;
  });
});

const clearFilters = () => {
  filters.value = {
    capacityMin: null,
    capacityMax: null,
    priceMin: null,
    priceMax: null,
  };
};

const hasActiveFilters = computed(() => {
  return (
    filters.value.capacityMin ||
    filters.value.capacityMax ||
    filters.value.priceMin ||
    filters.value.priceMax
  );
});

const paginatedText = computed(() => {
  const filtered = filteredResults.value.length;
  const total = results.value.length;

  if (filtered === total) {
    return `1-${total} de ${total} resultados`;
  } else {
    return `1-${filtered} de ${total} resultados (${filtered} filtrados)`;
  }
});

const getResultsStats = computed(() => {
  if (results.value.length === 0) return null;

  const capacities = results.value.map((office) => office.capacity);
  const prices = results.value.map((office) => office.costPerDay);

  return {
    capacity: {
      min: Math.min(...capacities),
      max: Math.max(...capacities),
    },
    price: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
  };
});

onMounted(fetchOffices);
</script>

<template>
  <div class="search-page container mx-auto p-4">
    <nav-bar-component />

    <!-- Sección del buscador actualizada -->
    <section
      class="search-header flex items-center mb-6"
      role="search"
      aria-label="Buscar oficinas"
    >
      <input
        v-model="query"
        @keyup.enter="handleEnterKey"
        type="text"
        placeholder="Buscar oficinas..."
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        aria-label="Campo de búsqueda"
        :disabled="isSearching"
      />
      <button
        @click="handleSearchClick"
        class="green-button"
        :class="{ 'opacity-50 cursor-not-allowed': isSearching }"
        :disabled="isSearching"
        aria-label="Buscar"
      >
        {{ isSearching ? "Buscando..." : "Buscar" }}
      </button>
    </section>

    <div class="flex flex-wrap gap-4">
      <!-- Sección de filtros mejorada -->
      <aside
        class="filters w-full md:w-1/4 pr-4"
        role="region"
        aria-label="Filtros de búsqueda"
      >
        <div class="bg-white rounded-lg shadow-sm border p-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold text-lg">Filtros</h2>
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Limpiar filtros
            </button>
          </div>

          <!-- Filtro por Capacidad -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3 text-gray-700">
              Capacidad (personas)
            </h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Mínimo</label>
                <input
                  v-model.number="filters.capacityMin"
                  type="number"
                  min="1"
                  placeholder="Ej: 5"
                  class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Máximo</label>
                <input
                  v-model.number="filters.capacityMax"
                  type="number"
                  min="1"
                  placeholder="Ej: 20"
                  class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Filtro por Precio -->
          <div class="mb-6">
            <h3 class="font-semibold mb-3 text-gray-700">
              Precio por día (S/.)
            </h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Mínimo</label>
                <input
                  v-model.number="filters.priceMin"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="Ej: 50"
                  class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Máximo</label>
                <input
                  v-model.number="filters.priceMax"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="Ej: 200"
                  class="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Información de rangos disponibles -->
          <div
            v-if="getResultsStats"
            class="text-xs text-gray-500 bg-gray-50 p-3 rounded"
          >
            <p class="mb-1">
              <strong>Capacidad:</strong> {{ getResultsStats.capacity.min }} -
              {{ getResultsStats.capacity.max }} personas
            </p>
            <p>
              <strong>Precio:</strong> S/.{{ getResultsStats.capacity.min }} -
              S/.{{ getResultsStats.price.max }}
            </p>
          </div>

          <!-- Indicador de filtros activos -->
          <div
            v-if="hasActiveFilters"
            class="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400"
          >
            <p class="text-sm text-blue-800 font-medium">Filtros activos:</p>
            <ul class="text-xs text-blue-700 mt-1 space-y-1">
              <li v-if="filters.capacityMin">
                Capacidad mínima: {{ filters.capacityMin }} personas
              </li>
              <li v-if="filters.capacityMax">
                Capacidad máxima: {{ filters.capacityMax }} personas
              </li>
              <li v-if="filters.priceMin">
                Precio mínimo: S/.{{ filters.priceMin }}
              </li>
              <li v-if="filters.priceMax">
                Precio máximo: S/.{{ filters.priceMax }}
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- Sección de resultados mejorada -->
      <main
        class="results w-full md:w-3/4"
        role="region"
        aria-label="Resultados de búsqueda"
      >
        <div v-if="!selectedOffice">
          <div class="results-header mb-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-bold text-lg">Resultados</span>
                <small class="ml-2 text-gray-600">{{ paginatedText }}</small>
              </div>
              <!-- Indicador de filtros activos en el header -->
              <div v-if="hasActiveFilters" class="flex items-center space-x-2">
                <span class="text-sm text-blue-600">
                  <i class="fas fa-filter"></i> Filtros aplicados
                </span>
                <button
                  @click="clearFilters"
                  class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Limpiar
                </button>
              </div>
            </div>

            <!-- Alerta si no hay resultados por filtros -->
            <div
              v-if="
                results.length > 0 &&
                filteredResults.length === 0 &&
                hasActiveFilters
              "
              class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded"
            >
              <p class="text-yellow-800 text-sm">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                No se encontraron oficinas que coincidan con los filtros
                aplicados.
                <button @click="clearFilters" class="underline ml-1">
                  Limpiar filtros
                </button>
              </p>
            </div>
          </div>

          <!-- Mostrar mensaje cuando no hay resultados -->
          <div
            v-if="filteredResults.length === 0 && !hasActiveFilters"
            class="text-center py-8"
          >
            <p class="text-gray-500 text-lg">
              {{
                query.trim()
                  ? `No se encontraron oficinas para "${query.trim()}"`
                  : "No hay oficinas disponibles"
              }}
            </p>
            <p class="text-gray-400 text-sm mt-2">
              Intenta con una búsqueda diferente.
            </p>
          </div>

          <!-- Lista de resultados -->
          <div v-else role="list" class="space-y-4">
            <div
              v-for="item in filteredResults"
              :key="item.id"
              class="result-card border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              role="listitem"
            >
              <div class="flex justify-between items-start mb-3">
                <h3 class="font-semibold text-lg text-primary">
                  {{ item.location }}
                </h3>
                <span
                  class="text-sm px-2 py-1 rounded-full"
                  :class="
                    item.available
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ item.available ? "Disponible" : "No disponible" }}
                </span>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-3">
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-users mr-2"></i>
                  <span
                    ><strong>Capacidad:</strong>
                    {{ item.capacity }} personas</span
                  >
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-dollar-sign mr-2"></i>
                  <span
                    ><strong>Precio:</strong> S/.{{ item.costPerDay }}/día</span
                  >
                </div>
              </div>

              <button
                @click="selectOffice(item)"
                class="green-button w-full md:w-auto"
                :disabled="!item.available"
              >
                {{ item.available ? "Ver detalles" : "No disponible" }}
              </button>
            </div>
          </div>
        </div>

        <!-- Detalle de oficina (sin cambios) -->
        <div v-else class="result-card border rounded p-4 bg-white shadow-md">
          <h2 class="font-bold text-xl mb-2 text-primary">
            Detalle de oficina
          </h2>
          <p><strong>Ubicación:</strong> {{ selectedOffice.location }}</p>
          <p><strong>Capacidad:</strong> {{ selectedOffice.capacity }}</p>
          <p>
            <strong>Precio por día:</strong> S/.{{ selectedOffice.costPerDay }}
          </p>
          <p>
            <strong>Disponible:</strong>
            {{ selectedOffice.available ? "Sí" : "No" }}
          </p>

          <button @click="selectedOffice = null" class="green-button mt-4">
            Volver a resultados
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  background-color: #f9fafb;
  min-height: 100vh;
  padding: 2rem 1rem;
  color: #111827;
  font-family: "Inter", sans-serif;
}

.search-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: 10px;
  gap: 1rem;
}

.search-header input[type="text"] {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #d1d5db;
  background-color: #fff;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-header input[type="text"]:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.search-header button {
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  background-color: #6366f1;
  color: white;
  font-weight: 500;
  border: none;
  transition: background-color 0.2s;
}

.search-header button:hover {
  background-color: #4f46e5;
}

.filters {
  width: 100%;
  max-width: 280px;
  padding-right: 1rem;
}

.filters h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.results {
  flex: 1;
}

.result-card {
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  transition: transform 0.2s, box-shadow 0.2s;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}

.result-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.result-card p {
  margin: 0.3rem 0;
  font-size: 0.95rem;
  color: #374151;
}

.result-card button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #e5e7eb;
  font-weight: 500;
  border: 1px solid #d1d5db;
  transition: background-color 0.2s;
}

.result-card button:hover {
  background-color: #d1d5db;
}

.details-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.details-card h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.details-card h3 {
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.details-card ul {
  list-style-type: disc;
  padding-left: 1.25rem;
}

.details-card li {
  margin-bottom: 0.5rem;
}

.details-card button {
  margin-top: 2rem;
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
}

.details-card button:hover {
  background-color: #e5e7eb;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.green-button:hover {
  background-color: #047857;
}

.filters input[type="number"] {
  -moz-appearance: textfield;
}

.filters input[type="number"]::-webkit-outer-spin-button,
.filters input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hover effects para las cards */
.result-card {
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.green-button {
  background-color: #10b981;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.green-button:hover:not(:disabled) {
  background-color: #059669;
}

.green-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .filters {
    margin-bottom: 1rem;
  }

  .result-card {
    margin-bottom: 1rem;
  }
}

.filters .bg-blue-50 {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }

  .filters,
  .results {
    width: 100%;
  }
}
</style>
