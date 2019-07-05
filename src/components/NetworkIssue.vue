<template>
  <div>
    <h1>Uh oh!</h1>
    <h3>Looks like there is a network issue</h3>
    <router-link :to="{ name: 'event-list' }">Back to homepage</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
