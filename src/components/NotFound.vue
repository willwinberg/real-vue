<template>
  <div>
    <h1>Oops!</h1>
    <h3>{{ resource }} is not the page you're looking for</h3>
    <router-link :to="{ name: 'event-list' }">Back to homepage</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
