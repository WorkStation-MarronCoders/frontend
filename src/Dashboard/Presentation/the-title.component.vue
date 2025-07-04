<template>
  <div class="workstation" role="banner" aria-label="Encabezado del panel principal con fondo visual">
    <h1 tabindex="0">{{$t('dashboard.title')}}</h1>
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
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
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
  font-size: clamp(1.5rem, 6vw, 3rem);
  line-height: 1.2;
}

.separator {
  width: 70%;
  height: 2px;
  background-color: white;
  margin: 10px 0;
}

.workstation p {
  font-size: clamp(0.9rem, 3vw, 1.5rem);
}


@media (max-width: 768px) {
  .workstation {
    padding: 1.5rem;
    min-height: 50vh;
  }

  .separator {
    width: 60%;
    margin: 8px 0;
  }
}

@media (max-width: 480px) {
  .workstation {
    padding: 1rem;
    min-height: 40vh;
  }

  .workstation h1 {
    font-size: 1.5rem;
  }

  .workstation p {
    font-size: 0.9rem;
  }

  .separator {
    width: 50%;
  }
}
</style>
