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
    console.log("Search already in progress, skipping...");
    return;
  }

  try {
    isSearching.value = true;
    selectedOffice.value = null;

    if (query.value.trim()) {
      const response = await apiService.getOfficeByLocation(query.value.trim());
      const offices = OfficeAssembler.toEntitiesFromResponse(response);
      results.value = offices;

      if (results.value.length === 0) {
        //console.log("No offices found for location:", query.value.trim());
      }
    } else {
      await fetchOffices();
    }
  } catch (error) {
    console.error("Error al buscar oficina:", error);

    if (error.response?.status === 404) {
      results.value = [];
    } else {
      console.error("Unexpected error:", error);
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
  //console.log("not implemented yet");
};

const filteredResults = computed(() => {
  return results.value.filter((item) => {
    const {
      capacityMin,
      capacityMax,
      priceMin,
      priceMax,
      onlyAvailable
    } = filters.value;

    const capacityMinOk = !capacityMin || item.capacity >= capacityMin;
    const capacityMaxOk = !capacityMax || item.capacity <= capacityMax;
    const priceMinOk = !priceMin || item.costPerDay >= priceMin;
    const priceMaxOk = !priceMax || item.costPerDay <= priceMax;
    const availabilityOk = !onlyAvailable || item.available;

    return (
      capacityMinOk && capacityMaxOk &&
      priceMinOk && priceMaxOk && availabilityOk
    );
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
      <aside
        class="filters-panel"
        role="region"
        aria-label="Filtros de búsqueda"
      >

        <div class="filters-card">
          <h2 class="filters-title">{{ $t("search.filters") }}</h2>

          <div class="filters-group">
            <label class="filter-label">{{ $t("search.capacity") }}</label>
            <div class="range-group">
              <input
                type="range"
                v-model.number="filters.capacityMin"
                :min="getResultsStats?.capacity.min || 25"
                :max="filters.capacityMax || getResultsStats?.capacity.max || 50"
              />
              <input
                type="range"
                v-model.number="filters.capacityMax"
                :min="filters.capacityMin || getResultsStats?.capacity.min || 25"
                :max="getResultsStats?.capacity.max || 50"
              />
              <div class="range-values">
                <span>Min: {{ filters.capacityMin }}</span>
                <span>Max: {{ filters.capacityMax }}</span>
              </div>
            </div>
          </div>

          <div class="filters-group">
            <label class="filter-label">{{ $t("search.price") }}</label>
            <div class="range-group">
              <input
                type="range"
                v-model.number="filters.priceMin"
                :min="getResultsStats?.price.min || 0"
                :max="filters.priceMax || getResultsStats?.price.max || 1000"
              />
              <input
                type="range"
                v-model.number="filters.priceMax"
                :min="filters.priceMin || getResultsStats?.price.min || 0"
                :max="getResultsStats?.price.max || 1000"
              />
              <div class="range-values">
                <span>Min: S/.{{ filters.priceMin }}</span>
                <span>Max: S/.{{ filters.priceMax }}</span>
              </div>
            </div>
          </div>

          <div class="filters-group availability-toggle">
            <label class="switch">
              <input type="checkbox" v-model="filters.onlyAvailable" />
              <span class="slider"></span>
            </label>
            <span class="filter-label ml-2">{{ $t("search.onlyAvailable") }}</span>
          </div>


          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="clear-filters-btn"
          >
            {{ $t("search.clearFilters") }}
          </button>

          <div v-if="hasActiveFilters" class="active-filters-card">
            <p class="title">{{ $t("search.hasActiveFilters") }}:</p>
            <div class="tags">
              <span v-if="filters.capacityMin" class="tag">
                <i class="fas fa-users"></i> {{ $t("search.capacitymin") }}{{ filters.capacityMin }}
              </span>
              <span v-if="filters.capacityMax" class="tag">
                <i class="fas fa-users"></i> {{ $t("search.capacitymax") }}{{ filters.capacityMax }}
              </span>
              <span v-if="filters.priceMin" class="tag">
                <i class="fas fa-dollar-sign"></i> {{ $t("search.pricemin") }}{{ filters.priceMin }}
              </span>
              <span v-if="filters.priceMax" class="tag">
                <i class="fas fa-dollar-sign"></i> {{ $t("search.pricemax") }}{{ filters.priceMax }}
              </span>
            </div>
          </div>

        </div>
      </aside>

      <main
        class="results w-full md:w-3/4"
        role="region"
        aria-label="Resultados de búsqueda"
      >
        <div v-if="!selectedOffice">
          <div class="results-header mb-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="font-bold text-lg">{{ $t("search.results") }}</span>
                <small class="ml-2 text-gray-600">{{ paginatedText }}</small>
              </div>

            </div>

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
                {{ $t("search.noresults") }}
              </p>
            </div>
          </div>

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

          <div v-else role="list" class="space-y-4">
            <div
              v-for="item in filteredResults"
              :key="item.id"
              class="result-card border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow"
              role="listitem"
            >
              <div class="flex flex-col md:flex-row gap-4">
                <!-- Imagen de la oficina -->
                <div class="office-image-container">
                  <img
                    :src="item.imageUrl || '/placeholder-office.jpg'"
                    :alt="`Imagen de ${item.location}`"
                    class="office-image"
                    @error="$event.target.src = '/placeholder-office.jpg'"
                  />
                </div>

                <!-- Contenido de la oficina -->
                <div class="flex-1">
                  <div class="flex justify-between items-start mb-3">
                    <h3 class="font-semibold text-lg text-primary">
                      {{ item.location }}
                    </h3>
                  </div>

                  <!-- Descripción -->
                  <p v-if="item.description" class="text-gray-600 mb-3 text-sm leading-relaxed">
                    {{ item.description }}
                  </p>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div class="flex items-center text-gray-600">
                      <i class="fas fa-users mr-2"></i>
                      <span><strong>Capacidad:</strong> {{ item.capacity }} personas</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                      <i class="fas fa-dollar-sign mr-2"></i>
                      <span><strong>Precio:</strong> S/.{{ item.costPerDay }}/día</span>
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
          </div>
        </div>

        <div v-else class="result-card border rounded p-4 bg-white shadow-md">
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Imagen en vista de detalles -->
            <div class="detail-image-container">
              <img
                :src="selectedOffice.imageUrl || '/placeholder-office.jpg'"
                :alt="`Imagen de ${selectedOffice.location}`"
                class="detail-image"
                @error="$event.target.src = '/placeholder-office.jpg'"
              />
            </div>

            <!-- Contenido de detalles -->
            <div class="flex-1">
              <h2 class="font-bold text-xl mb-4 text-primary">
                {{ $t("search.details") }}
              </h2>
              
              <div class="space-y-3">
                <p><strong>{{ $t("search.ubicacion") }}:</strong> {{ selectedOffice.location }}</p>
                
                <div v-if="selectedOffice.description">
                  <p><strong>{{ $t("search.descripcion") }}:</strong></p>
                  <p class="text-gray-600 mt-1 leading-relaxed">{{ selectedOffice.description }}</p>
                </div>
                
                <p><strong>{{ $t("search.capacitacion") }}:</strong> {{ selectedOffice.capacity }} personas</p>
                <p><strong>{{ $t("search.precio") }}:</strong> S/.{{ selectedOffice.costPerDay }}/día</p>
                <p>
                  <strong>{{ $t("search.disponible") }}:</strong>
                  <span :class="selectedOffice.available ? 'text-green-600' : 'text-red-600'">
                    {{ selectedOffice.available ? "Sí" : "No" }}
                  </span>
                </p>
              </div>

              <button @click="selectedOffice = null" class="green-button mt-4">
                Volver a resultados
              </button>
            </div>
          </div>
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
  color: #1e1e3f;
}

.search-header {
  padding: 1rem;
  border-radius: 0.75rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.search-header input[type="text"] {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #a1a1aa;
  background-color: #f9fafb;
  color: #1e1e3f;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search-header input[type="text"]:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px #1e1e3f;
  outline: none;
}

.search-header button {
  background-color: #1e3a8a; 
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.search-header button:hover:not(:disabled) {
  background-color: #1e1e3f; 
}

.search-header button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.filters-panel {
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  animation: fadeIn 0.4s ease-in-out;
}

.filters-card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filters-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e1e3f;
  margin-bottom: 0.5rem;
}

.filters-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-label {
  font-size: 0.95rem;
  color: #374151;
  font-weight: 600;
}

.availability-toggle {
  display: flex;
  align-items: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #d1d5db;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.3s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}

.switch input:checked + .slider {
  background-color: #1e3a8a;
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.range-group input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #d1d5db;
  border-radius: 4px;
  outline: none;
  accent-color: #1e1e3f;
  margin-bottom: 4px;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #4b5563;
  margin-top: -4px;
}

.clear-filters-btn {
  background-color: #1e3a8a;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.2s;
  align-self: start;
}

.clear-filters-btn:hover {
  background-color: #1e1e3f;
}

.active-filters-card {
  background-color: #f3f4f6;
  border-left: 4px solid #1e3a8a;
  padding: 1rem;
  border-radius: 0.75rem;
}

.active-filters-card .title {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

.active-filters-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.active-filters-card .tag {
  background-color: #1e3a8a;
  color: white;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.results {
  flex: 1;
  animation: fadeIn 0.4s ease-in-out;
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
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #1f2937;
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
  background-color: #10b981;
  color: white;
  font-weight: 600;
  border: none;
  transition: background-color 0.2s;
}

.result-card button:hover:not(:disabled) {
  background-color: #059669;
}

.result-card button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Estilos para las imágenes de oficinas */
.office-image-container {
  width: 200px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 0.75rem;
  background-color: #f3f4f6;
}

.office-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.office-image:hover {
  transform: scale(1.05);
}

.detail-image-container {
  width: 100%;
  max-width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 1rem;
  background-color: #f3f4f6;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  .filters-panel {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .filters-card {
    padding: 1rem;
  }

  .range-values {
    font-size: 0.75rem;
  }

  .office-image-container {
    width: 100%;
    height: 180px;
  }

  .detail-image-container {
    max-width: 100%;
    height: 180px;
  }
}


@media (max-width: 768px) {
  .filters {
    margin-bottom: 1rem;
  }

  .result-card {
    margin-bottom: 1rem;
  }

  .flex {
    flex-direction: column;
  }

  .filters,
  .results {
    width: 100%;
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
</style>