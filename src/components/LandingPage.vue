<template>
  <div class="landing-page">
      <Background />
    <div class="landing-page__content">
      <h1>PlantControl.</h1>
      <p>Чистое поле сегодня - богатый урожай завтра</p>
      <div class="landing-page__content-footer">
          <div class = "landing-page__button">
              <button @click="goToRegistration" class="landing-page__button-signin">Зарегистрироваться</button>
              <button @click="goToLogin">Войти</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Background from './BackgroundComponent.vue';

const router = useRouter();

const goToRegistration = () => {
router.push('/register');
};

const goToLogin = () => {
router.push('/login');
};
</script>

<style scoped>
.landing-page {
  position: relative;
  width: 100%;
  height: 87vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
}

.landing-page__content {
  padding: 20px;
  z-index: 1;
  width: 100%;
  height: 80%;
}

h1 {
  font-size: 49px;
  margin-bottom: 10px;
  color: #ffffff;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #ffffff;
}

.landing-page__content-footer {
  height: 70%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.landing-page__button {
  display: flex;
  flex-direction: column;

}

.landing-page__button-signin {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
}

button {
  padding: 10px 45px;
  font-size: 16px;
  background-color: #ffffff;
  color: #4b8b7b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
}
</style>