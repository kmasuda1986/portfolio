// eslint-disable-next-line import/no-named-as-default
import API from '@aws-amplify/api'
import { listAccounts } from '~/graphql/queries'
import { createAccount, updateAccount, deleteAccount } from '~/graphql/mutations'
import { ModelAccountFilterInput, UpdateAccountInput } from '~/API'

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
          walletAddress,
        },
      },
    })

    return {
      status: 'success',
      data,
    }
  }

  /**
   * update
   */
  const update = async (input: UpdateAccountInput) => {
    await API.graphql({
      query: updateAccount,
      variables: {
        input
      }
    })
  }

  /**
   * destroy
   *
   * @param id string
   */
  const destroy = async (id: string) => {
    await API.graphql({
      query: deleteAccount,
      variables: {
        input: {
          id,
        },
      },
    })

    return {
      status: 'success',
      data: {},
    }
  }

  return {
    findOne,
    create,
    update,
    destroy,
  }
}
