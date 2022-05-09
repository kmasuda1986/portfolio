import { Storage } from 'aws-amplify';

type CreateStorageKeyInput = {
  imageType: string
  accountId: string
  extension: string
}

export default function useStorage() {
  /**
   * createStorageKey
   *
   * @param input CreateStorageKeyInput
   * @returns string
   */
  const createStorageKey = (input: CreateStorageKeyInput): string => {
    let key = ''
    if (input.imageType === 'profileImage') {
      key = `image/profile-image/${input.accountId}${input.extension}`
    }

    return key
  }

  const get = async (key: string) => {
    return await Storage.get(key)
  }

  /**
   * put
   *
   * @param storageKey 
   * @param file 
   * @returns Promise<string>
   */
  const put = async (storageKey: string, file: any): Promise<string> => {
    const result = await Storage.put(storageKey, file)
    
    return result.key
  }

  return {
    createStorageKey,
    get,
    put
  }
}
