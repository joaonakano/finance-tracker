import { db } from "../db/db";
import { randomUUID } from "crypto";
import { Account, CreateAccountInput } from "@shared/types";

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
}
