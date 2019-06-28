import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Bill winnerberger'
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education'
    ],
    events: [
      // { id: 1, text: '...', done: true },
      // { id: 2, text: '...', done: false },
      // { id: 3, text: '...', done: true },
      // { id: 4, text: '...', done: false }
    ],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      //why {}s? payload can be sigle var of object
      EventService.getEvents(perPage, page)
        .then(response => {
          console.log('Total events: ', response.headers['x-total-count'])
          commit(
            'SET_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('Error occured: ', error)
        })
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id) // so we're do doing more api calls than necessary
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error', error.response)
          })
      }
    }
  },
  getters: {
    // categoriesLength: state => {
    //   return state.categories.length
    // },
    // doneTodos: state => {
    //   return state.todos.filter(todo => todo.done)
    // },
    // activeTodosCount: (state, getters) => {
    //   // just an example. this would be bad prectice in production. expensive
    //   return state.todos.length - getters.doneTodos.length
    // },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
