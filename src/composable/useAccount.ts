// eslint-disable-next-line import/no-named-as-default
import API from '@aws-amplify/api'
import { listAccounts } from '~/graphql/queries'
import { createAccount } from '~/graphql/mutations'
import { ModelAccountFilterInput } from '~/API'

type Response = {
  status: String
  data: {} | null
}

export default function useAccount() {
  /**
   * findOne
   *
   * @param filter ModelAccountFilterInput
   * @returns Promise<Response>
   */
  const findOne = async (
    filter: ModelAccountFilterInput
  ): Promise<Response> => {
    const { data }: any = await API.graphql({
      query: listAccounts,
      variables: {
        limit: 1,
        filter,
      },
    })

    const getFirstData = (items: {}[]) => {
      return items.length ? items[0] : null
    }

    return {
      status: 'success',
      data: getFirstData(data?.listAccounts?.items),
    }
  }

  /**
   * create
   *
   * @param walletAddress string
   */
  const create = async (walletAddress: string) => {
    const { data }: any = await API.graphql({
      query: createAccount,
      variables: {
        input: {
          walletAddress
        }
      },
    })

    console.log('ポコチン: ', data)

    return {
      status: 'success',
      data: {},
    }
  }

  return {
    findOne,
    create,
  }
}
