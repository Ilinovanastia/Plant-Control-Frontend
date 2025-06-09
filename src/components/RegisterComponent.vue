<template>
    <div class="register-page">
    <Background />
    <div class="register-container">
      <h2>Регистрация</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="username" placeholder="Username" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit">Зарегистрироваться</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Background from './BackgroundComponent.vue';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Ошибка регистрации');
    }

    const loginResponse = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.msg || 'Ошибка входа после регистрации');
    }

    const loginData = await loginResponse.json();
    localStorage.setItem('authToken', loginData.token);

    router.push('/home');

  } catch (error) {
    errorMessage.value = 'Ошибка регистрации: ' + error.message;
    console.error('Ошибка регистрации:', error);
  }
};
</script>
  
<style scoped>
.register-page {
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

.register-container {
  height: 80%;
  padding: 20px;
  border-radius: 10px;
  z-index: 1;
}

.register-container form, .register-container button{
  margin-top: 10%;
}

.error-message {
  color: red;
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

input:focus {
  outline: none;
}

h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #ffffff;
}

button {
  padding: 10px 45px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5px;
  }
</style>