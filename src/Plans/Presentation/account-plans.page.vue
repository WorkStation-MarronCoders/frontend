<script setup>
    import navBarComponent from '@/Public/Presentation/nav-bar.component.vue';
</script>

<template>
    <navBarComponent />
    <div class="container">
        <h1>{{$t('plans.title')}}</h1>
        <div class="plans-wrapper">
            <div class="plan-card">
                <div class="circle">{{$t('plans.basic.name')}}</div>
                <div class="info-box">
                    <h2>{{$t('plans.characteristics')}}</h2>
                    <div class="text">
                        <p>{{$t('plans.basic.description')}} </p>
                    </div>
                    <h2>{{$t('plans.basic.price')}}</h2>
                    <button>{{$t('plans.button')}}</button>
                </div>
            </div>

            <div class="plan-card">
                <div class="circle">{{$t('plans.intermediate.name')}}</div>
                <div class="info-box">
                    <h2>{{$t('plans.characteristics')}}</h2>
                    <div class="text">
                        <p>{{$t('plans.intermediate.description')}} </p>
                    </div>
                    <h2>{{$t('plans.intermediate.price')}}</h2>
                    <button>{{$t('plans.button')}}</button>
                </div>
            </div>

            <div class="plan-card">
                <div class="circle">{{$t('plans.premium.name')}}</div>
                <div class="info-box">
                    <h2>{{$t('plans.characteristics')}}</h2>
                    <div class="text">
                        <p>{{$t('plans.premium.description')}} </p>
                    </div>
                    <h2>{{$t('plans.premium.price')}}</h2>
                    <button>{{$t('plans.button')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.container {
  background-color: #f4f4f4; 
  min-height: 100vh;
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
    border: none;
    border-radius: 20%;
    height: 40px ;
    cursor: pointer;
}

</style>
