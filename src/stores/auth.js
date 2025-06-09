import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    checkAuth() {
      const token = localStorage.getItem('authToken');
      this.isLoggedIn = !!token;
    },
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('authToken');
    },
  },
});