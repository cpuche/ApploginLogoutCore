<template>
  <div>
    <h1>
      Connected
      <v-icon v-if="apiConnectionEstatus" color="green darken"
        >mdi-cloud-check</v-icon
      >
      <v-icon v-else color="red darken">mdi-cloud-alert</v-icon>
    </h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapState(['apiConnectionEstatus'])
  }
}
</script>
