<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex text-center"
        flat
        tile
      >
        <v-card-text class="white--text">
          © {{ new Date().getFullYear() }} Kentaro Masuda.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DefaultLayout',

  setup() {
    const data = ref({
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    })

    return {
      data
    }
  },
})
</script>
