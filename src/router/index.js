import { createRouter, createWebHistory } from 'vue-router'
import AddTask from '../views/AddTask.vue'
import ListTask from '../views/ListTasks.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/add',
      name : 'Add Tasks',
      component : AddTask
    },
    {
      path : '/',
      name : 'List Tasks',
      component : ListTask
    }
  ]
})

export default router
