import {
    Account,
    BulkCreateTransactionsInput,
    BulkDeleteAccountsInput,
    BulkDeleteCategoriesInput,
    BulkDeleteTransactionsInput,
    Category,
    CreateAccountInput,
    CreateCategoryInput,
    CreateTransactionInput,
    DeleteAccountInput,
    DeleteCategoryInput,
    DeleteTransactionInput,
    GetAccountInput,
    GetCategoryInput,
    GetTransactionInput,
    GetTransactionsInput,
    SummaryInput,
    SummaryOutput,
    TransactionWithRelations,
    UpdateAccountInput,
    UpdateCategoryInput,
    UpdateTransactionInput,
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
    },

    transactions: {
        getAll(data: GetTransactionsInput): Promise<TransactionWithRelations[]>
        getById(data: GetTransactionInput): Promise<TransactionWithRelations | undefined>
        create(data: CreateTransactionInput): Promise<TransactionWithRelations | undefined>
        update(data: UpdateTransactionInput): Promise<TransactionWithRelations | undefined>
        delete(data: DeleteTransactionInput): Promise<boolean>
        bulkDelete(data: BulkDeleteTransactionsInput): Promise<number>
        bulkCreate(data: BulkCreateTransactionsInput): Promise<number>
    },

    summary: {
        getByDate(data: SummaryInput): Promise<SummaryOutput>
    }
}
