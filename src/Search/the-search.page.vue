<script setup>
import { ref, computed, onMounted } from 'vue'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'

const query = ref('')
const filters = ref({ type: '', priceMin: null, priceMax: null, time: '' })
const results = ref([])
const selectedOffice = ref(null)

const fetchOffices = async () => {
  try {
    const res = await fetch('https://tu-api.com/api/offices')
    const data = await res.json()
    results.value = data // [{ id, location, capacity, costPerDay, available }]
  } catch (error) {
    console.error('Error fetching offices:', error)
  }
}

const fetchOfficeServices = async (officeId) => {
  try {
    const res = await fetch(`https://tu-api.com/api/offices/${officeId}/services`)
    const data = await res.json()
    selectedOffice.value.services = data // [{ name, description, cost }]
  } catch (error) {
    console.error('Error fetching office services:', error)
  }
}

const performSearch = () => {
  selectedOffice.value = null
  // Filtros podrían aplicarse desde backend idealmente
}

const selectOffice = async (office) => {
  selectedOffice.value = { ...office, services: [] }
  await fetchOfficeServices(office.id)
}

const filteredResults = computed(() => {
  return results.value.filter(item => {
    const priceOk = (!filters.value.priceMin || item.costPerDay >= filters.value.priceMin) &&
                    (!filters.value.priceMax || item.costPerDay <= filters.value.priceMax)
    return priceOk
  })
})

const paginatedText = computed(() => '1-' + filteredResults.value.length + ' de ' + results.value.length + ' resultados')

onMounted(fetchOffices)
</script>

<template>
  <div class="search-page container mx-auto p-4">
    <nav-bar-component />

    <!-- Buscador -->
    <section class="search-header flex items-center mb-6" role="search" aria-label="Buscar oficinas">
      <input
        v-model="query"
        @keyup.enter="performSearch"
        type="text"
        placeholder="Buscar oficinas..."
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        aria-label="Campo de búsqueda"
      />
      <button
        @click="performSearch"
        class="ml-2 px-4 py-2 border rounded-full"
        aria-label="Buscar"
      >
        Buscar
      </button>
    </section>

    <div class="flex flex-wrap gap-4">
      <!-- Filtros -->
      <aside class="filters w-full md:w-1/4 pr-4" role="region" aria-label="Filtros de búsqueda">
        <h2 class="font-bold mb-2">Filtros</h2>
        <!-- Aquí van los filtros si los deseas implementar -->
      </aside>

      <!-- Resultados o Detalle -->
      <main class="results w-full md:w-3/4" role="region" aria-label="Resultados de búsqueda">
        <div v-if="!selectedOffice">
          <div class="results-header mb-4 flex items-center">
            <span class="font-bold">Resultados</span>
            <small class="ml-2">{{ paginatedText }}</small>
          </div>

          <div role="list">
            <div
              v-for="item in filteredResults"
              :key="item.id"
              class="result-card border rounded p-4 mb-4"
              role="listitem"
            >
              <h3 class="font-semibold mb-1">Ubicación: {{ item.location }}</h3>
              <p><strong>Capacidad:</strong> {{ item.capacity }}</p>
              <p><strong>Precio por día:</strong> S/.{{ item.costPerDay }}</p>
              <p><strong>Disponible:</strong> {{ item.available ? 'Sí' : 'No' }}</p>
              <button
                @click="selectOffice(item)"
                class="ml-auto px-3 py-1 border rounded bg-gray-200"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>

        <!-- Detalle -->
        <div v-else class="result-card border rounded p-4">
          <h2 class="font-bold text-lg mb-2">Detalle de oficina</h2>
          <p><strong>Ubicación:</strong> {{ selectedOffice.location }}</p>
          <p><strong>Capacidad:</strong> {{ selectedOffice.capacity }}</p>
          <p><strong>Precio por día:</strong> S/.{{ selectedOffice.costPerDay }}</p>
          <p><strong>Disponible:</strong> {{ selectedOffice.available ? 'Sí' : 'No' }}</p>

          <h3 class="font-semibold mt-4 mb-2">Servicios disponibles</h3>
          <ul v-if="selectedOffice.services.length > 0">
            <li v-for="(service, index) in selectedOffice.services" :key="index">
              <strong>{{ service.name }}</strong>: {{ service.description }} (S/.{{ service.cost }})
            </li>
          </ul>
          <p v-else>No hay servicios registrados.</p>

          <button
            @click="selectedOffice = null"
            class="mt-4 px-3 py-1 border rounded bg-gray-100"
          >
            Volver a resultados
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

  
  <style scoped>
  .search-page {
    background-color: #f4f4f4;
    min-height: 100vh;
    padding: 10px;
    color: #333;
  }
  
  .search-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    margin-top: 10px;
  }
  
  .search-header input[type="text"] {
    flex: 1;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .search-header button {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: #0f0e2f;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .search-header button:hover {
    background-color: #2c3e50;
  }
  
  .filters {
    width: 25%;
    padding-right: 1rem;
  }
  
  .filters h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .results {
    width: 75%;
  }
  
  .result-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .result-card h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .result-card p {
    margin: 0.5rem 0;
  }
  
  .result-card .flex {
    align-items: center;
  }
  
  .result-card button {
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.4rem 0.8rem;
    margin-left: auto;
  }
  
  .result-card button:hover {
    background-color: #ddd;
  }
  
  aside label, aside h3 {
    display: block;
    margin-top: 1rem;
  }
  
  aside input[type="radio"],
  aside input[type="number"] {
    margin-top: 0.3rem;
  }
  
  aside input[type="number"] {
    width: 100%;
    padding: 0.3rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .flex {
    display: flex;
  }
  
  .container {
    margin: auto;
  }

  @media (max-width: 768px) {
  .filters {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .results {
    width: 100%;
  }
}

  </style>
  