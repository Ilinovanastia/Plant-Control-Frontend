import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/components/LandingPage.vue';
import Login from '@/components/LoginComponent.vue';
import HomePage from '@/views/HomePage.vue';
import FieldCard from '@/components/FieldCard.vue';
import AddField from '@/components/AddField.vue';
import ProfilePageView from '@/views/ProfilePageView.vue';
import FieldInfo from '@/components/FieldInfo.vue';
import CameraComponentView from '@/views/CameraComponentView.vue';

const routes = [
  {
    path: '/FieldCard',
    name: 'FieldCard',
    component: FieldCard,
  },
  {
    path: '/Home',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
   {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/RegisterComponent.vue'),
  },
  {
    path: '/add-field/:fieldId?',
    name: 'AddField',
    component: AddField,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/field-info/:fieldId',
    name: 'FieldInfo',
    component: FieldInfo,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/profile',
    name: 'ProfilePageView',
    component: ProfilePageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/camera',
    name: 'CameraComponentView',
    component: CameraComponentView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
    console.log('To:', to.name, to.path);
    console.log('From:', from.name, from.path);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isLoggedIn = localStorage.getItem('authToken');
    console.log('Requires Auth:', requiresAuth);
    console.log('Is Logged In:', isLoggedIn);
  
    if (requiresAuth && !isLoggedIn && to.name !== 'Login' && to.name !== 'Register' && to.name !== 'LandingPage') {
      console.log('Redirecting to /login');
      next('/');
    } else {
      next();
    }
  });

export default router;