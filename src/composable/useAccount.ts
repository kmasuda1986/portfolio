// eslint-disable-next-line import/no-named-as-default
import API, { graphqlOperation } from '@aws-amplify/api'
import { listAccounts } from '~/graphql/queries'

/*
const LimitDefault = {
  timeUrl: 900,
  item: 10000,
  max: 10000,
  thread: 50,
  message: 20,
  messageSearch: 1000000000,
  limitPage: 20
} as const
*/

export default function useAccount() {
  /**
   * findOne
   */
  const findOne = async (walletAddress: string): Promise<any> => {
    const data: any = await API.graphql(
      graphqlOperation(listAccounts, {
        limit: 1,
        filter: {
          walletAddress: {
            eq: walletAddress
          }
        }
      })
    )

    return data?.data?.listUsers?.items
  }

  return {
    findOne
  }
}
