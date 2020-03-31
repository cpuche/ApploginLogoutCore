<template>
  <h1>Logout</h1>
</template>

<script>
export default {
  asyncData({ store, $axios }) {
    $axios.$get('/logout')
    store.commit('setConnectionStatus', false)
    window.close()
  }
}
</script>

<style></style>
