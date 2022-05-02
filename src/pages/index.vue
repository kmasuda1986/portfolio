<template>
  <div class="my-10">
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <h2 class="text-xl">
          <vue-typer :text="typingTextList" />
        </h2>
        <h1 class="mb-5 text-6xl">
          増田 健太郎
        </h1>
        <p class="mb-5">
          With a clear vision to create and maintain the most sustainable and strong meme economy on the Binance Smart Chain (BSC), both the contract and project was created carefully by the team.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const typingTextList = ref([
      'My portfolio.',
      'Welcome to my site.',
      'I love development.',
      ':)',
    ])

    return {
      typingTextList
    }
  },
})
</script>

<style scoped>
</style>
