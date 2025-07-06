<script setup>
import { useRouter } from "vue-router";
import navBarComponent from "@/Public/Presentation/nav-bar.component.vue";
import theTitleComponent from "./the-title.component.vue";

const router = useRouter();
</script>

<template>
  <div class="dashboard-container">
    <nav-bar-component />
    <theTitleComponent />

    <section class="users-section">
    <h2 class="section-title">{{ $t("dashboard.users") }}</h2>
    <div class="user-cards">
      <div class="user-card">
        <i class="pi pi-code user-icon" aria-hidden="true"></i>
        <h3 class="user-title">{{ $t("dashboard.developer") }}</h3>
        <p class="user-description">
          {{ $t("dashboard.developerDescription") }}
        </p>
      </div>

      <div class="user-card">
        <i class="pi pi-briefcase user-icon" aria-hidden="true"></i>
        <h3 class="user-title">{{ $t("dashboard.corporate") }}</h3>
        <p class="user-description">
          {{ $t("dashboard.corporateDescription") }}
        </p>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 10px;
}

.users-section {
  background:  #0f0e2f;
  padding: 2rem 1rem;
  color: #ffffff;
  text-align: center;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 2.5rem;
  font-weight: 700;
  color: #eaf2ff;
}

.user-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  place-items: center;
}

.user-card {
  background-color: #171836;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.user-card:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
}

.user-icon {
  font-size: 3rem;
  color: #63c7d2;
  transition: color 0.3s ease;
}

.user-card:hover .user-icon {
  color: #17e3b7;
}

.user-title {
  font-size: 2rem;
  font-weight: 600;
  color: white;
}

.user-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #d2d7ff;
}

@media (max-width: 1024px) {
  .user-cards {
    gap: 1.5rem;
  }

  .user-card {
    max-width: 320px;
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .users-section {
    padding: 3rem 1rem;
  }

  .user-card {
    min-height: 240px;
  }

  .user-title {
    font-size: 1.3rem;
  }

  .user-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .user-card {
    padding: 1.25rem;
    border-radius: 12px;
  }

  .user-description {
    font-size: 0.9rem;
  }
}


</style>