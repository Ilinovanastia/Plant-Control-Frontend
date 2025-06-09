import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './stores'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(store); 
app.mount('#app')