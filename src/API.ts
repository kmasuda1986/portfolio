/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAccountInput = {
  id?: string | null,
  walletAddress?: string | null,
  username?: string | null,
  profileImageKey?: string | null,
  profileBannerKey?: string | null,
  biography?: string | null,
};

export type ModelAccountConditionInput = {
  walletAddress?: ModelStringInput | null,
  username?: ModelStringInput | null,
  profileImageKey?: ModelStringInput | null,
  profileBannerKey?: ModelStringInput | null,
  biography?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  not?: ModelAccountConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Account = {
  __typename: "Account",
  id: string,
  walletAddress?: string | null,
  username?: string | null,
  profileImageKey?: string | null,
  profileBannerKey?: string | null,
  biography?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateAccountInput = {
  id: string,
  walletAddress?: string | null,
  username?: string | null,
  profileImageKey?: string | null,
  profileBannerKey?: string | null,
  biography?: string | null,
};

export type DeleteAccountInput = {
  id: string,
};

export type ModelAccountFilterInput = {
  id?: ModelIDInput | null,
  walletAddress?: ModelStringInput | null,
  username?: ModelStringInput | null,
  profileImageKey?: ModelStringInput | null,
  profileBannerKey?: ModelStringInput | null,
  biography?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  not?: ModelAccountFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelAccountConnection = {
  __typename: "ModelAccountConnection",
  items:  Array<Account | null >,
  nextToken?: string | null,
};

export type CreateAccountMutationVariables = {
  input: CreateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type CreateAccountMutation = {
  createAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountMutationVariables = {
  input: UpdateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type UpdateAccountMutation = {
  updateAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountMutationVariables = {
  input: DeleteAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type DeleteAccountMutation = {
  deleteAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts?:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      id: string,
      walletAddress?: string | null,
      username?: string | null,
      profileImageKey?: string | null,
      profileBannerKey?: string | null,
      biography?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAccountSubscription = {
  onCreateAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount?:  {
    __typename: "Account",
    id: string,
    walletAddress?: string | null,
    username?: string | null,
    profileImageKey?: string | null,
    profileBannerKey?: string | null,
    biography?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
