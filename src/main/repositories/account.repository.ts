import { db } from "../db/db";
import { randomUUID } from "crypto";
import {
    Account,
    BulkDeleteAccountsInput,
    CreateAccountInput,
    DeleteAccountInput,
    GetAccountInput,
    UpdateAccountInput
} from "@shared/types";

export class AccountRepository {
    static getAll(user_id: string): Account[] {
        const query = db.prepare(`
            SELECT *
            FROM accounts
            WHERE user_id = ?
        `).all(user_id) as Account[]

        return query
    }

    static create(data: CreateAccountInput): Account {
        const account: Account = {
            id: randomUUID(),
            user_id: data.user_id,
            name: data.name,
            plaid_id: data.plaid_id ?? undefined
        }

        const query = db.prepare(`
            INSERT INTO accounts (
                id,
                user_id,
                name,
                plaid_id
            )
            VALUES (?, ?, ?, ?)
        `)

        query.run(
            account.id,
            account.user_id,
            account.name,
            account.plaid_id ?? null
        )

        return account
    }

    static getById(data: GetAccountInput): Account | undefined {
        const query = db.prepare(`
            SELECT *
            FROM accounts
            WHERE id = ?
              AND user_id = ?
        `).get(data.id, data.user_id) as Account | undefined

        return query
    }

    static update(data: UpdateAccountInput): Account | undefined {
        const query = db.prepare(`
            UPDATE accounts
            SET name = ?,
                plaid_id = ?
            WHERE id = ?
              AND user_id = ?
        `)

        const result = query.run(
            data.name,
            data.plaid_id ?? null,
            data.id,
            data.user_id
        )

        if (result.changes === 0) {
            return undefined
        }

        return this.getById({
            id: data.id,
            user_id: data.user_id
        })
    }

    static delete(data: DeleteAccountInput): boolean {
        const query = db.prepare(`
            DELETE FROM accounts
            WHERE id = ?
              AND user_id = ?
        `)

        const result = query.run(data.id, data.user_id)

        return result.changes > 0
    }

    static bulkDelete(data: BulkDeleteAccountsInput): number {
        if (data.ids.length === 0) {
            return 0
        }

        const placeholders = data.ids.map(() => '?').join(', ')
        const query = db.prepare(`
            DELETE FROM accounts
            WHERE user_id = ?
              AND id IN (${placeholders})
        `)

        const result = query.run(data.user_id, ...data.ids)

        return result.changes
    }
}
