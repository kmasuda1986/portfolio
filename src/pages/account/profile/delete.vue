<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <h2><span class="light-blue--text">D</span>elete account</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col class="text-center" cols="12" md="6">
        <p>
          アカウントを削除しました。<br>
          3秒後にトップページへ遷移します。
        </p>
        <v-btn
          color="light-blue"
          outlined
          @click="goToTop"
        >
          トップページへ戻る
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AccountProfileDeletePage',

  setup() {
    /** Use router */
    const router = useRouter()

    /**
     * onMounted
     */
    onMounted(() => {
      setTimeout(goToTop, 3000)
    })

    /**
     * goToTop
     */
    const goToTop = () => {
      router.push('/')
    }

    return {
      router,
      goToTop,
    }
  },
})
</script>

