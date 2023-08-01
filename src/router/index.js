import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import LibraryView from '../views/LibraryView.vue'
import AlbumView from '../views/AlbumView.vue'
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,      
    },
    {
      path: '/library/:id',
      name: 'album',
      component: AlbumView,      
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,      
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
