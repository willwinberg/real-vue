<template>
  <div>
    <h1>Event Create</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <base-input
        label="Title"
        v-model="event.title"
        placeholder="Title"
        class="field"
      />
      <base-input
        label="Description"
        v-model="event.description"
        placeholder="Description"
        class="field"
      />
      <h3>Where is your event?</h3>
      <base-input
        label="Location"
        v-model="event.location"
        placeholder="Location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
    <!-- <p>Event by, {{ user.id }}</p> -->
    <!-- <p>There are {{ categoriesLength }} categories</p> -->
    <!-- <p>{{ getEventById(2) }}</p> -->
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name
  //   },
  //   userID() {
  //     return this.$store.state.user.id
  //   }
  // }
  // computed: mapState({
  //   userName: state => state.user.name,
  //   userID: state => state.user.id,
  //   catagories: state => state.user.catagories
  // })
  // computed: mapState({
  //   user1: 'user',
  //   catagories1: 'catagories'
  // })
  // computed: {
  // getEventById() {
  //   return this.$store.getters.getEventById
  // },
  //   categoriesLength() {
  //     return this.$store.getters.categoriesLength
  //   },
  //   ...mapGetters(['getEventById']),
  //   ...mapState(['user', 'catagories'])
  // }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
