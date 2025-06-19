<template>
  <div class="search-page container mx-auto p-4">
    <nav-bar-component />

    <section class="search-header flex items-center mb-6" role="search" aria-label="Barra de búsqueda de espacios">
      <input
        v-model="query"
        @keyup.enter="performSearch"
        type="text"
        :placeholder="$t('searchResults.searchPlaceholder')"
        class="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        aria-label="Campo de búsqueda"
      />
      <button
        @click="performSearch"
        class="ml-2 px-4 py-2 border rounded-full"
        aria-label="Botón para realizar búsqueda"
      >
        {{ $t('searchResults.searchButton') }}
      </button>
    </section>

    <div class="flex flex-wrap gap-4">
      <aside class="filters w-full md:w-1/4 pr-4" role="region" aria-label="Filtros de búsqueda">
        <h2 class="font-bold mb-2">{{ $t('searchResults.filters') }}</h2>

        <div class="mb-4">
          <h3 class="font-semibold">{{ $t('searchResults.projectType') }}</h3>
          <label>
            <input type="radio" value="Equipo" v-model="filters.type" aria-label="Proyecto en equipo" />
            {{ $t('searchResults.team') }}
          </label><br />
          <label>
            <input type="radio" value="Solitario" v-model="filters.type" aria-label="Proyecto solitario" />
            {{ $t('searchResults.solo') }}
          </label>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold">{{ $t('searchResults.fixedPrice') }}</h3>
          <label>
            {{ $t('searchResults.min') }}:
            <input
              type="number"
              v-model.number="filters.priceMin"
              class="border rounded px-2 py-1 w-full"
              aria-label="Precio mínimo"
            />
          </label>
          <label>
            {{ $t('searchResults.max') }}:
            <input
              type="number"
              v-model.number="filters.priceMax"
              class="border rounded px-2 py-1 w-full mt-1"
              aria-label="Precio máximo"
            />
          </label>
        </div>

        <div class="mb-4">
          <h3 class="font-semibold">{{ $t('searchResults.timeRequired') }}</h3>
          <label>
            <input type="radio" value="1" v-model="filters.time" aria-label="Duración de 1 hora" />
            {{ $t('searchResults.oneHour') }}
          </label><br />
          <label>
            <input type="radio" value="+1" v-model="filters.time" aria-label="Duración mayor a 1 hora" />
            {{ $t('searchResults.moreThanOneHour') }}
          </label>
        </div>
      </aside>

      <main class="results w-full md:w-3/4" role="region" aria-label="Resultados de búsqueda">
        <div class="results-header mb-4 flex items-center">
          <span class="font-bold">{{ $t('searchResults.title') }}</span>
          <small class="ml-2">{{ paginatedText }}</small>
          <button @click="sortBy('price')" class="ml-auto underline" aria-label="Ordenar por precio">
            {{ $t('searchResults.sort') }}
          </button>
        </div>

        <div role="list">
          <div
            class="result-card border rounded p-4 mb-4"
            v-for="item in filteredResults"
            :key="item.id"
            role="listitem"
            :aria-label="`Resultado: ${$t(item.title)}, ubicación: ${item.location}, rating: ${item.rating}`"
          >
            <h3 class="font-semibold mb-1">{{ $t(item.title) }}</h3>
            <p class="mb-2">{{ $t(item.description) }}</p>
            <p class="mb-2"><strong>{{ $t('searchResults.location') }}:</strong> {{ item.location }}</p>
            <div class="flex items-center">
              <span>⭐ {{ item.rating }}</span><span class="ml-2">💬 {{ item.reviews }}</span>
              <button
                class="ml-auto px-3 py-1 border rounded bg-gray-200"
                aria-label="Seleccionar resultado {{ $t(item.title) }}"
              >
                {{ $t('searchResults.select') }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, computed } from 'vue'
  import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'
  
  const query = ref('');
  const filters = ref({ type: '', priceMin: null, priceMax: null, time: '' });
  const results = ref([
    {
      id: 1,
      title: 'searchResults.item1.title',
      description: 'searchResults.item1.description',
      location: 'San Miguel 300-398, Lima 15047',
      rating: 0,
      reviews: 0
    },
    {
      id: 2,
      title: 'searchResults.item2.title',
      description: 'searchResults.item2.description',
      location: 'C. Piura, Miraflores 15074',
      rating: 0,
      reviews: 0
    }
  ])
  
  
  const performSearch = () => {
    console.log('Searching for', query.value);
  };
  
  const filteredResults = computed(() => {
    return results.value.filter(item => {
      return (!filters.value.type || item.title.includes(filters.value.type)) &&
             (!filters.value.time || true) &&
             (filters.value.priceMin === null || true) &&
             (filters.value.priceMax === null || true);
    });
  });
  
  const paginatedText = computed(() => '1-20 de ' + results.value.length + ' resultados');
  </script>
  
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
  