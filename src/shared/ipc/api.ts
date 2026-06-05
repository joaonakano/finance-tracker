import { Account } from "@shared/types"

export interface Api {
    accounts: {
        getAll(user_id: string): Promise<Account[]>
    }
}