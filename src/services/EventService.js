import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Acccept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(perPage, page, eventsTotal) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`, eventsTotal)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
