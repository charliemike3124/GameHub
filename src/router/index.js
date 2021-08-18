import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Lobby from '@/views/Lobby.vue'
import DndMap from "@/components/DndMap/DndMap.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Lobby',
    name: 'Lobby',
    component: Lobby
  },
  {
    path: '/TestComponent',
    name: 'DndMap',
    component: DndMap
  },
]

const router = new VueRouter({
  routes
})

export default router
