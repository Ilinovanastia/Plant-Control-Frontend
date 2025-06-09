<template>
    <div class="login-page">
    <Background />
    <div class="login-container">
      <h2>Вход</h2>
      <form @submit.prevent="handleSubmit">
          <input type="text" v-model="username" placeholder="Username" required>
          <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit" @click="login">Войти</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Background from './BackgroundComponent.vue';
import { useAuthStore } from '@/stores/auth';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const token = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfSwiaWF0IjoxNzQ0Mjk5MjE4LCJleHAiOjE3NDQ3MzEyMTh9.-hdv9yH8zwG72BEeFT0HehhH1f6YSxmGUX5wmBS4aVE');

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Неверные учетные данные');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    router.push('/home');
  } catch (error) {
    errorMessage.value = 'Ошибка входа';
    console.error('Ошибка входа:', error);
  }
};

const login = async () => {
  localStorage.setItem('authToken', token.value);
  authStore.login();
};
</script>
  
<style scoped>
.login-page {
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

.login-container {
  height: 80%;
  padding: 20px;
  border-radius: 10px;
  z-index: 1;
}

.login-container form, .login-container button{
  margin-top: 10%;
}

form {
  display: flex;
  flex-direction: column;
}

form input {
  padding: 10px 45px;
  font-size: 1em;
  background-color: #ffffff;
  color: #4b8b7b;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
}

.error-message {
  color: red;
}

h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #ffffff;
}

button {
    padding: 10px 45px;
    font-size: 1em;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin: 5px;
  }
</style>