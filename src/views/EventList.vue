<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
    </template>
    <template v-if="eventsTotal > page * 3">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService.js' // in store now
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  // using vuex state now
  // data() {
  //   return {
  //     events: []
  //   }
  // },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    }) // call action from inside created lifecycle hook
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1 // this works in js :]
    },
    eventsTotal() {
      return this.event.eventsTotal
    },
    ...mapState(['event', 'user']) // gives access to state for events to be printed above
  }
}
</script>

<style></style>
