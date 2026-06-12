export interface Account {
    id: string
    user_id: string
    name: string
    plaid_id?: string
}

export type CreateAccountInput = {
    user_id: string
    name: string
    plaid_id?: string | null
}

export type GetAccountInput = {
    id: string
    user_id: string
}

export type UpdateAccountInput = {
    id: string
    user_id: string
    name: string
    plaid_id?: string | null
}

export type DeleteAccountInput = {
    id: string
    user_id: string
}

export type BulkDeleteAccountsInput = {
    ids: string[]
    user_id: string
}
