<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <h2><span class="light-blue--text">P</span>rofile settings</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <div class="text-center">
          <AvatarImage class="my-2" :src="profileImageUri" />
        </div>
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="onSave">
            <validation-provider
              v-slot="{ errors }"
              name="プロフィール画像"
              rules="mimes:image/gif,image/jpeg,image/png"
            >
              <v-file-input
                v-model="profileImageFile"
                class="pb-3"
                accept="image/*"
                label="プロフィール画像"
                prepend-icon=""
                hint="推奨: 350px x 350px, 最大サイズ: 100MB, 拡張子: .jpeg .jpg .png .gif"
                :error-messages="errors"
                persistent-hint
                show-size
                outlined
                @change="swichProfileImage"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="ウォレットアドレス"
              rules="required"
            >
              <v-text-field
                v-model="accountData.walletAddress"
                class="pb-3"
                label="ウォレットアドレス"
                :error-messages="errors"
                disabled
                outlined
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="ユーザー名"
              rules="max:45"
            >
              <v-text-field
                v-model="accountData.username"
                class="pb-3"
                label="ユーザー名"
                counter="45"
                :error-messages="errors"
                outlined
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="自己紹介"
              rules="max:140"
              auto-grow
            >
              <v-textarea
                v-model="accountData.biography"
                class="pb-3"
                label="自己紹介"
                counter="140"
                :error-messages="errors"
                outlined
              />
            </validation-provider>
            <v-btn
              color="light-blue"
              type="submit"
              :loading="saveBtnLoading"
              :disabled="invalid"
              outlined
            >
              保存
            </v-btn>
            <v-btn
              :disabled="saveBtnLoading"
              text
              @click="router.push('/account/profile')"
            >
              戻る
            </v-btn>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-btn
          color="red"
          outlined
          :disabled="saveBtnLoading"
          @click="openAccountDeleteDialog"
        >
          アカウントを削除
        </v-btn>
      </v-col>
    </v-row>
    <AccountDeleteDialog ref="accountDeleteDialog" @deleteAccount="onDelete" />
    <TheSnackbar ref="theSnackbar" :color="theSnackbarColor" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useRouter,
} from '@nuxtjs/composition-api'
import useAccount from '~/composable/useAccount'
import useStorage from '~/composable/useStorage'
import useWallet from '~/composable/useWallet'
import { Account } from '~/types/index'

export default defineComponent({
  name: 'AccountProfileSettings',

  components: {
    AccountDeleteDialog: () =>
      import('~/components/molecules/dialogs/AccountDeleteDialog.vue'),
    AvatarImage: () => import('~/components/atoms/AvatarImage.vue'),
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
  },

  middleware: ['auth'],

  setup() {
    /** Use router */
    const router = useRouter()

    /** Use account */
    const account = useAccount()

    /** Use storage */
    const storage = useStorage()

    /** Use wallet */
    const wallet = useWallet()

    /** Account data */
    const accountData = ref<Account>({
      id: '',
      walletAddress: '',
      username: '',
      profileImageKey: '',
      profileBannerKey: '',
      biography: '',
    })

    /** Profile image file */
    const profileImageFile = ref<File | null>(null)

    /** Profile image uri */
    const profileImageUri = ref<string>('')

    /** Save buttom loading flug */
    const saveBtnLoading = ref<boolean>(false)

    /** Account delete dialog */
    const accountDeleteDialog = ref<any>(null)

    /** The snackbar */
    const theSnackbar = ref<any>(null)

    /** The snackbar color */
    const theSnackbarColor = ref<string>('')

    const openAccountDeleteDialog = () => {
      const refs: any = accountDeleteDialog.value
      refs.open()
    }

    /**
     * Get account
     */
    const getAccount = useAsync(async () => {
      const { data }: any = await account.findOne({
        walletAddress: {
          eq: wallet.getWalletAddress(),
        },
      })

      accountData.value = {
        id: data.id,
        walletAddress: data.walletAddress,
        username: data.username,
        profileImageKey: data.profileImageKey,
        profileBannerKey: '',
        biography: data.biography,
      }

      profileImageUri.value = await storage.get(data.profileImageKey)
    })

    /**
     * reload
     */
    const reload = async () => {
      const { data }: any = await account.findOne({
        walletAddress: {
          eq: wallet.getWalletAddress(),
        },
      })

      accountData.value = {
        id: data.id,
        walletAddress: data.walletAddress,
        username: data.username,
        profileImageKey: data.profileImageKey,
        profileBannerKey: '',
        biography: data.biography,
      }

      profileImageUri.value = await storage.get(data.profileImageKey)
    }

    /**
     * onSave
     *
     * @returns Promise<any>
     */
    const onSave = async (): Promise<any> => {
      try {
        saveBtnLoading.value = true

        if (profileImageFile.value) {
          // プロフィール画像をアップロード
          const storageKey = storage.createStorageKey({
            imageType: 'profileImage',
            accountId: accountData.value.id,
            extension: `.${profileImageFile.value.name.split('.').pop()}`,
          })

          // S3にアップロードしたキーをセット
          accountData.value.profileImageKey = await storage.put(
            storageKey,
            profileImageFile.value
          )
        }

        await account.update(accountData.value)

        await reload()

        theSnackbarColor.value = 'success'
        theSnackbar.value.open('更新に成功しました。')
        saveBtnLoading.value = false
      } catch (error: any) {
        theSnackbarColor.value = 'error'
        theSnackbar.value.open(error.message)
      }
    }

    /**
     * onDelete
     *
     * @returns Promise<any>
     */
    const onDelete = async (): Promise<any> => {
      await account.destroy(accountData.value.id)

      router.push('/account/profile/delete')
    }

    /**
     * swichProfileImage
     */
    const swichProfileImage = () => {
      if (profileImageFile.value) {
        profileImageUri.value = URL.createObjectURL(profileImageFile.value)
      } else {
        profileImageUri.value = ''
      }
    }

    return {
      router,
      accountData,
      profileImageFile,
      profileImageUri,
      saveBtnLoading,
      accountDeleteDialog,
      theSnackbar,
      theSnackbarColor,
      openAccountDeleteDialog,
      getAccount,
      reload,
      onSave,
      onDelete,
      swichProfileImage,
    }
  },
})
</script>
