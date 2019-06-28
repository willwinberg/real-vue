import Vue from 'vue'
import Vuex from 'vuex'
// import EventService from '@/services/EventService.js' // modules now
import * as user from '@/store/modules/user'
import * as event from '@/store/modules/event'
import * as notification from '@/store/modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  categories: [
    'sustainability',
    'nature',
    'animal welfare',
    'housing',
    'education'
  ]
})
