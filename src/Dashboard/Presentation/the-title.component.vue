<template>
  <div class="workstation" role="banner" aria-label="Encabezado del panel principal con fondo visual">
    <h1>{{$t('dashboard.title')}}</h1>
    <div class="separator"></div>
    <p>{{$t('dashboard.description')}}</p>
  </div>
</template>

<style scoped>
.workstation {
  background-image: url("../../../assets/fondo.jpg");
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 60vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
}

.workstation::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.workstation h1,
.workstation p,
.separator {
  position: relative;
  z-index: 1;
}

.workstation h1 {
  font-size: 3rem;
}

.separator {
  width: 70%;
  height: 2px;
  background-color: white;
  margin: 10px 0;
}

.workstation p {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .workstation h1 {
    font-size: 2rem;
  }

  .workstation p {
    font-size: 1rem;
  }
}
</style>