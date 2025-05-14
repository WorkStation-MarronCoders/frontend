<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'
import { PropertiesAPIService } from '../Application/property-api.service'
import { PropertyAssembler } from '../Application/property.assembler'

const router = useRouter()
const propertiesService = new PropertiesAPIService()
const properties = ref([])

onMounted(async () => {
  try {
    const response = await propertiesService.getAll()
    properties.value = PropertyAssembler.toEntitiesFromResponse(response)
  } catch (error) {
    console.error('Error fetching properties:', error)
  }
})

const handleDelete = async (id) => {
  try {
    await propertiesService.deleteProperty(id)
    properties.value = properties.value.filter(p => p.id !== id)
  } catch (error) {
    console.error('Error deleting property:', error)
  }
}

const items = ref([
  {
    label: 'Add Property',
    icon: 'pi pi-plus',
    command: () => {
      router.push('/add-property')
    }
  }
])
</script>

<template>
  <div class="properties-page">
    <nav-bar-component />
    
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">{{ $t('properties.title') }}</h1>
      
      <div class="properties-grid">
        <pv-card v-for="property in properties" :key="property.id" class="property-card">
          <template #title>
            {{ property.name }}
          </template>
          
          <template #content>
            <p class="description">{{ property.description }}</p>
            <p class="location"><strong>{{ $t('properties.location') }}:</strong> {{ property.location }}</p>
            <p class="price"><strong>{{ $t('properties.price') }}:</strong> ${{ property.price }}</p>
          </template>
          
          <template #footer>
            <div class="card-footer">
              <pv-button 
                :label="$t('properties.delete')" 
                class="delete-button"
                @click="handleDelete(property.id)" 
              />
            </div>
          </template>
        </pv-card>
      </div>
    </div>

    <pv-speed-dial
      :model="items"
      direction="up"
      :style="{ position: 'fixed', right: '2rem', bottom: '2rem' }"
      class="speed-dial"
    />
    <pv-toast />
  </div>
</template>

<style scoped>
.properties-page {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 10px;
  color: #fff;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.property-card {
  background: #0f0e2f;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

:deep(.p-card-title) {
  color: #fff !important;
}

:deep(.p-card-content) {
  color: #fff !important;
}

.description {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.location, .price {
  margin-bottom: 0.5rem;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
}

.delete-button:hover {
  background-color: #c82333;
  color: white;
}


:deep(.p-speeddial-button) {
  background: #90EE90 !important;
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
  background: #98FB98 !important;
  transform: scale(1.1);
  transition: all 0.3s ease;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

:deep(.p-speeddial-action) {
  background: #90EE90;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  color: #0f0e2f;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:deep(.p-speeddial-action:hover) {
  background: #98FB98;
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>
