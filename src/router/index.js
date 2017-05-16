import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/StartPage'
import TugBoatPage from '@/components/TugBoatPage'
import ShipAgentPage from '@/components/ShipAgentPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage',
      component: StartPage
    },
    {
      path: '/TugBoatPage',
      name: 'TugBoatPage',
      component: TugBoatPage
    },
    {
      path: '/ShipAgentPage',
      name: 'ShipAgentPage',
      component: ShipAgentPage
    }
  ]
})
