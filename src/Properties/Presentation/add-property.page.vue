<template>
  <div class="properties">
    <navBarComponent />

      <div class="add-property">
      <h1>{{ $t("addProperty.title") }}</h1>

      <form @submit.prevent="submitForm">
        <div>
          <label>{{ $t("addProperty.name") }}</label>
          <input v-model="form.name" required />
        </div>

        <div>
          <label>{{ $t("addProperty.description") }}</label>
          <textarea v-model="form.description" required></textarea>
        </div>

        <div>
          <label>{{ $t("addProperty.location") }}</label>
          <input v-model="form.location" required />
        </div>

        <div>
          <label>{{ $t("addProperty.price") }}</label>
          <input type="number" v-model.number="form.price" required />
        </div>

        <div class="file-upload">
          
          <label>{{ $t("addProperty.photos") }}</label>

          <div class="text">
            <label class="custom-file-label">
            <input type="file" multiple @change="handleFileUpload" />
            
            {{  $t("addProperty.chooseFiles")  }}
          </label>
          </div>
        </div>

        <div class="photo" v-if="previewPhotos.length">
          <h3>{{ $t("addProperty.preview") }}</h3>
          <div class="photo-preview">
            <img
                v-for="(url, index) in previewPhotos"
                :key="index"
                :src="url"
                alt="Preview"
                width="150"
            />
          </div>
        </div>

        <button type="submit">{{ $t("addProperty.submit") }}</button>
      </form>

      
      </div>

  </div>
  
</template>

<script setup>
import { ref } from 'vue'
import navBarComponent from '@/Public/Presentation/nav-bar.component.vue'

const form = ref({
  name: '',
  description: '',
  location: '',
  price: null,
  photos: [],
})

const previewPhotos = ref([])

function handleFileUpload(event) {
  const files = event.target.files
  form.value.photos = files
  previewPhotos.value = Array.from(files).map(file =>
      URL.createObjectURL(file)
  )
}

function submitForm() {
  console.log('Propiedad enviada:', form.value)
  alert('Propiedad enviada (simulado)')
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
}

</style>
