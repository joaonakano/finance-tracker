import {
    Account,
    BulkDeleteAccountsInput,
    BulkDeleteCategoriesInput,
    Category,
    CreateAccountInput,
    CreateCategoryInput,
    DeleteAccountInput,
    DeleteCategoryInput,
    GetAccountInput,
    GetCategoryInput,
    UpdateAccountInput,
    UpdateCategoryInput
} from "@shared/types"

export interface Api {
    accounts: {
        getAll(user_id: string): Promise<Account[]>
        getById(data: GetAccountInput): Promise<Account | undefined>
        create(data: CreateAccountInput): Promise<Account>
        update(data: UpdateAccountInput): Promise<Account | undefined>
        delete(data: DeleteAccountInput): Promise<boolean>
        bulkDelete(data: BulkDeleteAccountsInput): Promise<number>
    },
    
    categories: {
        getAll(user_id: string): Promise<Category[]>
        getById(data: GetCategoryInput): Promise<Category | undefined>
        create(data: CreateCategoryInput): Promise<Category>
        update(data: UpdateCategoryInput): Promise<Category | undefined>
        delete(data: DeleteCategoryInput): Promise<boolean>
        bulkDelete(data: BulkDeleteCategoriesInput): Promise<number>       
    }
}
