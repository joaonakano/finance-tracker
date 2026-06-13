export interface Category {
    id: string
    user_id: string
    name: string
    plaid_id?: string
}

export type CreateCategoryInput = {
    user_id: string
    name: string
    plaid_id?: string | null
}

export type GetCategoryInput = {
    id: string | undefined
    user_id: string
}

export type UpdateCategoryInput = {
    id: string
    user_id: string
    name: string
    plaid_id?: string | null
}

export type DeleteCategoryInput = {
    id: string
    user_id: string
}

export type BulkDeleteCategoriesInput = {
    ids: string[]
    user_id: string
}
