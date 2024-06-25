import { createRouter, createWebHistory } from 'vue-router';
import Cuaca from './pages/Cuaca.vue';

const routes = [
  {
    path: '/',
    name: 'Cuaca',
    component: Cuaca,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
