import EventService from '@/services/EventService.js' // modules now

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  perPage: 3
}

export const mutations = {
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
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Event posted sccussfully'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem creating event: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    //why {}s? payload can be sigle var or object
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: `There was a problem feting events: ${error.message}`
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id) // so we're do doing more api calls than necessary
    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      // must be returned so then will work in router
      return EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
          return response.data
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: `There was a problem feting event: ${error.message}`
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}

export const getters = {
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
