<template>
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
        <label class="custom-file-label">
          <input type="file" multiple @change="handleFileUpload" />
           {{  $t("addProperty.chooseFiles")  }}
        </label>
      </div>

      <button type="submit">{{ $t("addProperty.submit") }}</button>
    </form>

    <div v-if="previewPhotos.length">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
.add-property {
  max-width: 600px;
  margin: 2rem auto;
}
.add-property form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.photo-preview {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.add-property {
  max-width: 600px;
  margin: 3rem auto;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.add-property h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.add-property form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.add-property label {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
  display: block;
}

.add-property input[type="text"],
.add-property input[type="number"],
.add-property textarea,
.add-property input[type="file"] {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.add-property input:focus,
.add-property textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

.add-property button {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-property button:hover {
  background-color: #45a049;
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
  border: 2px solid #eee;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 640px) {
  .add-property {
    margin: 1rem;
    padding: 1.5rem;
  }

  .photo-preview img {
    width: 100px;
    height: 100px;
  }



}

.file-upload input[type="file"] {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
  width: fit-content;
}

.custom-file-label:hover {
  background-color: #45a049;
}


</style>
