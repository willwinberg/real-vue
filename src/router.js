import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
// import User from './views/User.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from '@/components/NotFound'

import NetworkIssue from '@/components/NetworkIssue'

Vue.use(Router)

const router = new Router({
  mode: 'history', // enables history mode, aka changes url without loading page -- almost always wanted
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true // send params in as props
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true, // because true --->
      // does not display formatting until data is fetched
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            // ---> if we have param that matches name as prop it will be sent as prop
            routeTo.params.event = event
            next()
          })
          // on error, redirect to 404 passing in name of missing resource
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({ name: '404', params: { resource: 'event' } })
            } else {
              next({ name: 'network-issue' })
            }
          })
      }
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
      // props: true
    },
    {
      path: '*',
      redirect: { name: '404', params: { resource: 'page' } }
    }
    // { path: '*', component: NotFoundPage }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach((routeTo, routeFrom, next) => {
  NProgress.done()
  next()
})

export default router
