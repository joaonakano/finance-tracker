import { Account, CreateAccountInput } from "@shared/types"

export interface Api {
    accounts: {
        getAll(user_id: string): Promise<Account[]>
        create(data: CreateAccountInput): Promise<Account>
    }
}
