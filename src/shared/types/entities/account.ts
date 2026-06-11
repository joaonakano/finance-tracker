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
