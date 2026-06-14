export interface Transaction {
    id: string
    amount: number
    payee: string
    notes?: string | null
    date: string
    account_id: string
    category_id?: string | null
}

export interface TransactionWithRelations extends Transaction {
    account: string
    category?: string | null
}

export type GetTransactionsInput = {
    user_id: string
    account_id?: string
    start_date?: string
    end_date?: string
}

export type GetTransactionInput = {
    id: string | undefined
    user_id: string
}

export type CreateTransactionInput = {
    user_id: string
    amount: number
    payee: string
    notes?: string | null
    date: string
    account_id: string
    category_id?: string | null
}

export type UpdateTransactionInput = {
    id: string
    user_id: string
    amount: number
    payee: string
    notes?: string | null
    date: string
    account_id: string
    category_id?: string | null
}

export type DeleteTransactionInput = {
    id: string
    user_id: string
}

export type BulkDeleteTransactionsInput = {
    ids: string[]
    user_id: string
}
