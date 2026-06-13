import { BulkDeleteCategoriesInput, Category, CreateCategoryInput, DeleteCategoryInput, GetCategoryInput, UpdateCategoryInput } from "@shared/types";
import { db } from "../db/db";
import { randomUUID } from "crypto";

export class CategoryRepository {
    static getAll(user_id: string): Category[] {
        const query = db.prepare(`
            SELECT *
            FROM categories
            WHERE user_id = ?
        `).all(user_id) as Category[]

        return query
    }

    static create(data: CreateCategoryInput): Category {
        const category: Category = {
            id: randomUUID(),
            user_id: data.user_id,
            name: data.name,
            plaid_id: data.plaid_id ?? undefined
        }

        const query = db.prepare(`
            INSERT INTO categories (
                id,
                user_id,
                name,
                plaid_id
            )
            VALUES (?, ?, ?, ?)
        `)

        query.run(
            category.id,
            category.user_id,
            category.name,
            category.plaid_id ?? null
        )

        return category
    }

    static getById(data: GetCategoryInput): Category | undefined {
        const query = db.prepare(`
            SELECT *
            FROM categories
            WHERE id = ?
              AND user_id = ?
        `).get(data.id, data.user_id) as Category | undefined

        return query
    }

    static update(data: UpdateCategoryInput): Category | undefined {
        const query = db.prepare(`
            UPDATE categories
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

    static delete(data: DeleteCategoryInput): boolean {
        const query = db.prepare(`
            DELETE FROM categories
            WHERE id = ?
              AND user_id = ?
        `)

        const result = query.run(data.id, data.user_id)

        return result.changes > 0
    }

    static bulkDelete(data: BulkDeleteCategoriesInput): number {
        if (data.ids.length === 0) {
            return 0
        }

        const placeholders = data.ids.map(() => '?').join(', ')
        const query = db.prepare(`
            DELETE FROM categories
            WHERE user_id = ?
              AND id IN (${placeholders})
        `)

        const result = query.run(data.user_id, ...data.ids)

        return result.changes
    }
}
