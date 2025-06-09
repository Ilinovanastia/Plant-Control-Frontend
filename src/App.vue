<template>
  <div class="app-container">
    <div id="app"  class = 'container'>
      <header>
      </header>
      <main>
        <router-view/>
      </main>
      <footer v-if="showFooter">
        <router-link to="/home">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.52 3.33992L4.13 7.53992C3.23 8.23992 2.5 9.72992 2.5 10.8599V18.2699C2.5 20.5899 4.39 22.4899 6.71 22.4899H18.29C20.61 22.4899 22.5 20.5899 22.5 18.2799V10.9999C22.5 9.78992 21.69 8.23992 20.7 7.54992L14.52 3.21992C13.12 2.23992 10.87 2.28992 9.52 3.33992Z" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 18.49V15.49" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        <router-link to="/camera">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4865 12.4999C21.0865 12.4999 22.1665 11.4999 21.2065 8.21994C20.5565 6.00994 18.6565 4.10994 16.4465 3.45994C13.1665 2.49994 12.1665 3.57994 12.1665 6.17994V9.05994C12.1665 11.4999 13.1665 12.4999 15.1665 12.4999H18.4865Z" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.1664 15.2C19.2364 19.83 14.7964 23.19 9.74643 22.37C5.95643 21.76 2.90643 18.71 2.28643 14.92C1.47643 9.89001 4.81643 5.45001 9.42643 4.51001" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        <router-link to="/profile">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 12.5C15.2614 12.5 17.5 10.2614 17.5 7.5C17.5 4.73858 15.2614 2.5 12.5 2.5C9.73858 2.5 7.5 4.73858 7.5 7.5C7.5 10.2614 9.73858 12.5 12.5 12.5Z" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21.0901 22.5C21.0901 18.63 17.2402 15.5 12.5002 15.5C7.76015 15.5 3.91016 18.63 3.91016 22.5" stroke="#9DB2CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  authStore.checkAuth();
});

const showFooter = computed(() => authStore.isLoggedIn && route.meta.requiresAuth);
</script>

<style scoped>
body {
  margin: 0;
  color: #333;
}

.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #a3c9c1;
}

.container {
  overflow: auto;
  -ms-overflow-style: none;
}

.container::-webkit-scrollbar {
  display: none;
}

#app {
  width: min(100vw, 370px);
  max-height: 90vh;
  overflow: auto;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #ffffff;
  color: rgb(14, 11, 11);
  display: flex;
  justify-content: space-around;
  padding: 10px;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 100;
}

main {
  background-color: #f2f2f2;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: y mandatory;
}
</style>
