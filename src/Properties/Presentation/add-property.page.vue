<template>
  <div class="add-property-page">
    <nav-bar-component />

    <div class="form-container">
      <h1>{{ $t("addProperty.title") }}</h1>

      <form @submit.prevent="submitForm">
        <!-- NOMBRE -->
        <div class="form-group">
          <label>{{ $t("addProperty.name") }}</label>
          <input v-model="form.name" type="text" placeholder="Ej. Oficina Premium San Isidro" required />
        </div>

        <!-- DESCRIPCIÓN -->
        <div class="form-group">
          <label>{{ $t("addProperty.description") }}</label>
          <textarea v-model="form.description" placeholder="Describe el espacio, comodidades, etc." required></textarea>
        </div>

        <!-- UBICACIÓN -->
        <div class="form-group">
          <label>{{ $t("addProperty.location") }}</label>
          <input v-model="form.location" type="text" placeholder="Ej. Av. Javier Prado 123, Lima" required />
        </div>

        <!-- PRECIO -->
        <div class="form-group">
          <label>{{ $t("addProperty.price") }}</label>
          <input v-model.number="form.price" type="number" min="0" placeholder="$ por hora" required />
        </div>

        <!-- TIPO DE OFICINA -->
        <div class="form-group">
          <label>{{ $t("addProperty.type") }}</label>
          <select v-model="form.type" required>
            <option disabled value="">{{ $t("addProperty.select") }}</option>
            <option value="private">{{ $t("addProperty.types.private") }}</option>
            <option value="shared">{{ $t("addProperty.types.shared") }}</option>
            <option value="meeting">{{ $t("addProperty.types.meeting") }}</option>
          </select>
        </div>

        <!-- MODALIDAD DE TRABAJO -->
        <div class="form-group">
          <label>{{ $t("addProperty.teamMode") }}</label>
          <select v-model="form.teamMode" required>
            <option disabled value="">{{ $t("addProperty.select") }}</option>
            <option value="solo">{{ $t("addProperty.modes.solo") }}</option>
            <option value="team">{{ $t("addProperty.modes.team") }}</option>
          </select>
        </div>

        <!-- TIEMPO REQUERIDO -->
        <div class="form-group">
          <label>{{ $t("addProperty.duration") }}</label>
          <select v-model="form.duration" required>
            <option disabled value="">{{ $t("addProperty.select") }}</option>
            <option value="1h">1h</option>
            <option value="2h">2h</option>
            <option value="full">Día completo</option>
          </select>
        </div>


        <!-- FOTOS -->
        <div class="form-group file-upload">
          <label>{{ $t("addProperty.photos") }}</label>
          <label class="custom-file-label">
            <input type="file" multiple @change="handleFileUpload" />
            📁 {{ $t("addProperty.chooseFiles") }}
          </label>
        </div>

        <!-- BOTÓN -->
        <button type="submit">{{ $t("addProperty.submit") }}</button>
      </form>

      <!-- PREVISUALIZACIÓN -->
      <div v-if="previewPhotos.length" class="photo-preview">
        <h3>{{ $t("addProperty.preview") }}</h3>
        <div class="photo-list">
          <img v-for="(url, index) in previewPhotos" :key="index" :src="url" />
        </div>
      </div>
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
  type: '',
  teamMode: '',
  duration: '',
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
:root {
  --gray-light: #D3D4D8;
  --cultured: #F5F5F5;
  --accent: #00aabb;
  --accent-dark: #007e91;
  --text-dark: #2C2C2C;
}

/* Responsive Layout */
@media (max-width: 640px) {
  .form-container {
    padding: 1.5rem;
  }

  input,
  select,
  textarea {
    font-size: 0.95rem;
  }
}

.add-property-page {
  background-color: var(--cultured);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  padding: 2rem 1rem;
}

.form-container {
  max-width: 720px;
  margin: 0 auto;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--gray-light);
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
}

input,
textarea,
select {
  padding: 0.85rem 1rem;
  font-size: 1rem;
  background-color: var(--cultured);
  border: 1.5px solid var(--gray-light);
  border-radius: 8px;
  color: var(--text-dark);
  transition: border-color 0.3s ease;
}

select{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--cultured);
  border: 1.5px solid var(--gray-light);
  border-radius: 8px;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  color: var(--text-dark);
  transition: border-color 0.3s ease;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23666' d='M2 0L0 2h4L2 0zM2 5l2-2H0l2 2z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.65rem;
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--accent-dark);
  background-color: white;
  outline: none;
}

/* Placeholder estilo más gris */
::placeholder {
  color: #999;
}

/* Botón */
button {
  padding: 0.9rem;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  background-color: var(--accent-dark);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--accent);
}

/* File upload */
.file-upload input[type="file"] {
  display: none;
}

.custom-file-label {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  background-color: var(--cultured);
  color: var(--text-dark);
  border: 1.5px solid var(--gray-light);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.custom-file-label:hover {
  background-color: var(--accent);
  color: white;
  border-color: var(--accent-dark);
}

/* Preview de imágenes */
.photo-preview {
  margin-top: 2rem;
}

.photo-preview h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.photo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.photo-list img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid var(--gray-light);
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

</style>
