<template>
  <div class="my-10">
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="12">
        <h2 class="text-xl">
          <vue-typer :text="typingTextList" />
        </h2>
        <h1 class="mb-5 text-6xl">
          増田 健太郎
        </h1>
        <div class="px-15">
          <HashTag
            v-for="(tag, key) in hashTagList"
            :key="key"
            :text="tag"
            class="mx-1"
          />
        </div>
      </v-col>
      <v-col class="text-center" cols="12">
        <h2 class="text-xl">
          About me
        </h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            経歴
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              depressed
              color="indigo"
            >
              read more
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            職歴
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              depressed
              color="indigo"
            >
              read more
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            目標
          </v-card-title>
          <v-card-text>
            <v-btn
              block
              depressed
              color="indigo"
            >
              read more
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'IndexPage',

  components: {
    HashTag: () => import('~/components/atoms/HashTag.vue')
  },

  setup() {
    const typingTextList = ref([
      'My portfolio.',
      'Welcome to my site.',
      'I love development.',
      ':)',
    ])
    const hashTagList = ref([
      'AWS',
      'Vue.js',
      'Solidity',
      'PHP',
      'Node.js',
      'Python',
      'SQL',
      'Nuxt.js',
      'Laravel',
      'Express.js',
      'DJango',
    ])

    return {
      typingTextList,
      hashTagList
    }
  },
})
</script>

<style scoped>
</style>
