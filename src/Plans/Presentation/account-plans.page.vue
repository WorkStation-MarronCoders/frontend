<script setup>
    import navBarComponent from '@/Public/Presentation/nav-bar.component.vue';
</script>

<template>
  <div class="acount-plans">
    <navBarComponent />

    <div class="container" role="region" aria-label="Planes de cuenta disponibles">
      <h1>{{ $t('plans.title') }}</h1>

      <div class="plans-wrapper">
        <div class="plan-card" aria-labelledby="plan-basic-title">
          <div class="circle" aria-hidden="true">{{ $t('plans.basic.name') }}</div>
          <div class="info-box">
            <h2 id="plan-basic-title">{{ $t('plans.basic.name') }}</h2>
            <h3>{{ $t('plans.characteristics') }}</h3>
            <div class="text">
              <p>{{ $t('plans.basic.description') }}</p>
            </div>
            <h3>{{ $t('plans.basic.price') }}</h3>
            <button aria-label="Seleccionar plan Básico">{{ $t('plans.button') }}</button>
          </div>
        </div>

        <div class="plan-card" aria-labelledby="plan-intermediate-title">
          <div class="circle" aria-hidden="true">{{ $t('plans.intermediate.name') }}</div>
          <div class="info-box">
            <h2 id="plan-intermediate-title">{{ $t('plans.intermediate.name') }}</h2>
            <h3>{{ $t('plans.characteristics') }}</h3>
            <div class="text">
              <p>{{ $t('plans.intermediate.description') }}</p>
            </div>
            <h3>{{ $t('plans.intermediate.price') }}</h3>
            <button aria-label="Seleccionar plan Intermedio">{{ $t('plans.button') }}</button>
          </div>
        </div>

        <div class="plan-card" aria-labelledby="plan-premium-title">
          <div class="circle" aria-hidden="true">{{ $t('plans.premium.name') }}</div>
          <div class="info-box">
            <h2 id="plan-premium-title">{{ $t('plans.premium.name') }}</h2>
            <h3>{{ $t('plans.characteristics') }}</h3>
            <div class="text">
              <p>{{ $t('plans.premium.description') }}</p>
            </div>
            <h3>{{ $t('plans.premium.price') }}</h3>
            <button aria-label="Seleccionar plan Premium">{{ $t('plans.button') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>

.acount-plans{
    padding: 10px;
    background-color: #f4f4f4; 
    min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: #000;
}

.plans-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
}


.plan-card {
    background-color: #ffffff;
    position: relative;
    border: 2px solid #000;
    border-radius: 10%;
    width: 350px;
    height: 450px;
    text-align: center;
    margin: 20px;
    padding-top: 50px;
}

.circle {
    font-size: 1.5rem;
    position: absolute;
    top: -65px;
    left: 30%;
    border: 2px solid #ffffff;
    color: #ffffff;
    background-color: #092459;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.info-box {
    padding: 40px;
    color: #201c1c;
}
.text {
    text-align: justify;
    font-size: 1rem;
}

button {
    background-color: #092459;
    color: #ffffff;
    border: none;
    border-radius: 20%;
    height: 40px ;
    cursor: pointer;
}

@media (max-width: 768px) {
  .plans-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .plan-card {
    width: 90%;
    height: auto;
    padding-top: 80px;
  }

  .circle {
    width: 100px;
    height: 100px;
    font-size: 1.2rem;
    top: -50px;
    left: calc(50% - 50px); 
  }

  .info-box {
    padding: 20px;
  }

  button {
    width: 100%;
    border-radius: 10px;
  }
}


</style>
