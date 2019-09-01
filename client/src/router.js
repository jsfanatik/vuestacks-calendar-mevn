import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import Calendar from '@/components/Calendar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: Calendar
    }
  ]
})
