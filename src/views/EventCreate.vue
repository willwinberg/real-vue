<template>
  <div>
    <h1>Event Create, {{ user.name }}</h1>
    <p>Event by, {{ user.id }}</p>
    <p>There are {{ categoriesLength }} categories</p>
    <p>{{ getEventById(2) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
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
  computed: {
    // getEventById() {
    //   return this.$store.getters.getEventById
    // },
    categoriesLength() {
      return this.$store.getters.categoriesLength
    },
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'catagories'])
  }
}
</script>

<style></style>
