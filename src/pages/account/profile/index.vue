<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <h2><span class="light-blue--text">P</span>rofile</h2>
      </v-col>
      <v-col class="text-right" cols="6">
        <v-btn
          to="/account/profile/settings"
          color="light-blue"
          outlined
        >
          setting
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <BannerImage :src="account.profileBannerUri" />
          <v-card-text class="text-center">
            <p class="light-blue--text text-4xl font-semibold">
              {{ account.username }}
            </p>
            <AvatarImage
              class="mb-4"
              :src="account.profileImageUri"
            />
            <v-text-field
              v-model="account.walletAddress"
              prepend-inner-icon="mdi-wallet"
              append-outer-icon="mdi-content-copy"
              outlined
              dense
              readonly
              @click:append-outer="copyText(account.walletAddress)"
            />
            <p class="mb-0">
              {{ account.description }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <TheSnackbar
      ref="theSnackbar"
      color="success"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync } from '@nuxtjs/composition-api'
import useWallet from '~/composable/useWallet'
import { Account } from '~/types/index'

export default defineComponent({
  name: 'AccountProfilePage',

  components: {
    AvatarImage: () => import('~/components/atoms/AvatarImage.vue'),
    BannerImage: () => import('~/components/atoms/BannerImage.vue'),
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
  },

  setup() {
    /** Use wallet */
    const wallet = useWallet()

    /** Account data */
    const account = ref<Account>()

    /** The snackbar */
    const theSnackbar = ref<any>()

    /**
     * Get account
     */
    const getAccount = useAsync(() => {
      account.value = {
        walletAddress: wallet.getWalletAddress(),
        username: '',
        profileImageUri: '',
        profileBannerUri: '',
        description: '',
      }
    })

    /**
     * copyText
     */
    const copyText = (walletAddress: string) => {
      navigator.clipboard.writeText(walletAddress)
      theSnackbar.value.open('コピーしました。')
    }

    return {
      account,
      theSnackbar,
      getAccount,
      copyText,
    }
  },
})
</script>

