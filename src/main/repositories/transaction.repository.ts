import { randomUUID } from "crypto"

import {
    BulkDeleteTransactionsInput,
    CreateTransactionInput,
    DeleteTransactionInput,
    GetTransactionInput,
    GetTransactionsInput,
    TransactionWithRelations,
    UpdateTransactionInput,
} from "@shared/types"

import { db } from "../db/db"

export class TransactionRepository {
    static getAll(data: GetTransactionsInput): TransactionWithRelations[] {
        const conditions = ["accounts.user_id = ?"]
        const params: unknown[] = [data.user_id]

        if (data.account_id) {
            conditions.push("transactions.account_id = ?")
            params.push(data.account_id)
        }

        if (data.start_date) {
            conditions.push("transactions.date >= ?")
            params.push(data.start_date)
        }

        if (data.end_date) {
            conditions.push("transactions.date <= ?")
            params.push(data.end_date)
        }

        return db.prepare(`
            SELECT
                transactions.id,
                transactions.amount,
                transactions.payee,
                transactions.notes,
                transactions.date,
                transactions.account_id,
                transactions.category_id,
                accounts.name AS account,
                categories.name AS category
            FROM transactions
            INNER JOIN accounts
                ON transactions.account_id = accounts.id
            LEFT JOIN categories
                ON transactions.category_id = categories.id
                AND categories.user_id = accounts.user_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY transactions.date DESC
        `).all(...params) as TransactionWithRelations[]
    }

    static getById(data: GetTransactionInput): TransactionWithRelations | undefined {
        return db.prepare(`
            SELECT
                transactions.id,
                transactions.amount,
                transactions.payee,
                transactions.notes,
                transactions.date,
                transactions.account_id,
                transactions.category_id,
                accounts.name AS account,
                categories.name AS category
            FROM transactions
            INNER JOIN accounts
                ON transactions.account_id = accounts.id
            LEFT JOIN categories
                ON transactions.category_id = categories.id
                AND categories.user_id = accounts.user_id
            WHERE transactions.id = ?
              AND accounts.user_id = ?
        `).get(data.id, data.user_id) as TransactionWithRelations | undefined
    }

    static create(data: CreateTransactionInput): TransactionWithRelations | undefined {
        if (!this.accountBelongsToUser(data.account_id, data.user_id)) {
            return undefined
        }

        if (data.category_id && !this.categoryBelongsToUser(data.category_id, data.user_id)) {
            return undefined
        }

        const id = randomUUID()

        db.prepare(`
            INSERT INTO transactions (
                id,
                amount,
                payee,
                notes,
                date,
                account_id,
                category_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
            id,
            data.amount,
            data.payee,
            data.notes ?? null,
            data.date,
            data.account_id,
            data.category_id ?? null
        )

        return this.getById({
            id,
            user_id: data.user_id,
        })
    }

    static update(data: UpdateTransactionInput): TransactionWithRelations | undefined {
        if (!this.accountBelongsToUser(data.account_id, data.user_id)) {
            return undefined
        }

        if (data.category_id && !this.categoryBelongsToUser(data.category_id, data.user_id)) {
            return undefined
        }

        const result = db.prepare(`
            UPDATE transactions
            SET amount = ?,
                payee = ?,
                notes = ?,
                date = ?,
                account_id = ?,
                category_id = ?
            WHERE id = ?
              AND EXISTS (
                  SELECT 1
                  FROM accounts
                  WHERE accounts.id = transactions.account_id
                    AND accounts.user_id = ?
              )
        `).run(
            data.amount,
            data.payee,
            data.notes ?? null,
            data.date,
            data.account_id,
            data.category_id ?? null,
            data.id,
            data.user_id
        )

        if (result.changes === 0) {
            return undefined
        }

        return this.getById({
            id: data.id,
            user_id: data.user_id,
        })
    }

    static delete(data: DeleteTransactionInput): boolean {
        const result = db.prepare(`
            DELETE FROM transactions
            WHERE id = ?
              AND EXISTS (
                  SELECT 1
                  FROM accounts
                  WHERE accounts.id = transactions.account_id
                    AND accounts.user_id = ?
              )
        `).run(data.id, data.user_id)

        return result.changes > 0
    }

    static bulkDelete(data: BulkDeleteTransactionsInput): number {
        if (data.ids.length === 0) {
            return 0
        }

        const placeholders = data.ids.map(() => "?").join(", ")

        const result = db.prepare(`
            DELETE FROM transactions
            WHERE id IN (${placeholders})
              AND EXISTS (
                  SELECT 1
                  FROM accounts
                  WHERE accounts.id = transactions.account_id
                    AND accounts.user_id = ?
              )
        `).run(...data.ids, data.user_id)

        return result.changes
    }

    private static accountBelongsToUser(account_id: string, user_id: string): boolean {
        const account = db.prepare(`
            SELECT id
            FROM accounts
            WHERE id = ?
              AND user_id = ?
        `).get(account_id, user_id)

        return !!account
    }

    private static categoryBelongsToUser(category_id: string, user_id: string): boolean {
        const category = db.prepare(`
            SELECT id
            FROM categories
            WHERE id = ?
              AND user_id = ?
        `).get(category_id, user_id)

        return !!category
    }
}
