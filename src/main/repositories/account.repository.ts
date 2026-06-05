import { db } from "../db/db";

export class AccountRepository {
    static getAll(user_id: string) {
        const query = db.prepare(`
            SELECT *
            FROM accounts
            WHERE user_id = ?
        `).all(user_id)

        return query
    }
}