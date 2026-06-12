import {
    Account,
    BulkDeleteAccountsInput,
    CreateAccountInput,
    DeleteAccountInput,
    GetAccountInput,
    UpdateAccountInput
} from "@shared/types"

export interface Api {
    accounts: {
        getAll(user_id: string): Promise<Account[]>
        getById(data: GetAccountInput): Promise<Account | undefined>
        create(data: CreateAccountInput): Promise<Account>
        update(data: UpdateAccountInput): Promise<Account | undefined>
        delete(data: DeleteAccountInput): Promise<boolean>
        bulkDelete(data: BulkDeleteAccountsInput): Promise<number>
    }
}
