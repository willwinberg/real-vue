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
    <template v-if="hasNextPage">
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
import store from '@/store/store'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1

  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      // send current params in to component through param called page
      routeTo.params.page = currentPage
      next()
    })
}

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  // using vuex state now
  // data() {
  //   return {
  //     events: []
  //   }
  // },
  // created() {
  //   this.$store.dispatch('event/fetchEvents', {
  //     perPage: 3,
  //     page: this.page
  //   }) // call action from inside created lifecycle hook
  // },
  computed: {
    // page() {
    //   return parseInt(this.$route.query.page) || 1 // this works in js :]
    // },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'user']) // gives access to state for events to be printed above
  }
}
</script>

<style></style>
