<template>
  <div class="properties">
    <navBarComponent />

      <div class="add-property" role="form" aria-label="Formulario para añadir una nueva propiedad">
  <h1>{{ $t("addProperty.title") }}</h1>

  <form @submit.prevent="submitForm">
    <div>
      <label for="property-name">{{ $t("addProperty.name") }}</label>
      <input id="property-name" v-model="form.name" required aria-label="Nombre de la propiedad" />
    </div>

    <div>
      <label for="property-description">{{ $t("addProperty.description") }}</label>
      <textarea id="property-description" v-model="form.description" required aria-label="Descripción de la propiedad"></textarea>
    </div>

    <div>
      <label for="property-location">{{ $t("addProperty.location") }}</label>
      <input id="property-location" v-model="form.location" required aria-label="Ubicación de la propiedad" />
    </div>

    <div>
      <label for="property-price">{{ $t("addProperty.price") }}</label>
      <input id="property-price" type="number" v-model.number="form.price" required aria-label="Precio de la propiedad" />
    </div>

    <button type="submit" aria-label="Enviar formulario para añadir propiedad">
      {{ $t("addProperty.submit") }}
    </button>
  </form>
</div>

  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'
import { PropertiesAPIService } from '../Application/property-api.service'
import { Property } from '../Domain/property.entity'

const router = useRouter()
const propertiesService = new PropertiesAPIService()

const form = ref({
  name: '',
  description: '',
  location: '',
  price: null
})

const submitForm = async () => {
  try {
    const propertyData = new Property({
      name: form.value.name,
      description: form.value.description,
      location: form.value.location,
      price: form.value.price
    })
    
    await propertiesService.createProperty(propertyData)
    form.value = {
      name: '',
      description: '',
      location: '',
      price: null
    }
    router.push('/properties')
  } catch (error) {
    console.error('Error creating property:', error)
  }
}
</script>

<style scoped>
.properties {
  background-color: #f4f4f4;
  padding: 10px;
  min-height: 100vh;
}

.add-property {
  max-width: 600px;
  margin: 2rem auto;
  padding: 15px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.add-property form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.add-property h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.photo-preview h3 {
  color: #333;
}

.add-property label {
  font-weight: bold;
  color: #0f0e2f;
  margin-bottom: 5px;
  display: block;
}

.add-property input,
.add-property textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background: #e2dede;
  color: black;
  border: none;
  border-radius: 5px;
  transition: box-shadow 0.3s;
}

.add-property input:focus,
.add-property textarea:focus {
  outline: none;
  box-shadow: 0 0 5px #0f0e2f;
}

.add-property button {
  background: #0f0e2f;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

.add-property button:hover {
  background: #2c3e50;
}

.custom-file-label {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #0f0e2f;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.custom-file-label:hover {
  background: #2c3e50;
}

.file-upload input[type="file"] {
  display: none; 
}

.text label {
  color: white
}

.photo-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  justify-content: center;
}

.photo-preview img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #ddd;
}

.photo h3{
  color: #0f0e2f;
}

@media (max-width: 640px) {
  .add-property {
    padding: 1rem;
  }

  .photo-preview img {
    width: 100px;
    height: 100px;
  }
  
  .add-property form > div {
    margin-bottom: 1rem;
  }
}

</style>
