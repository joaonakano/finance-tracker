import { db } from "../db/db";

export class AccountRepository {
    static getAll() {
        const query = db.prepare(`
            SELECT *
            FROM accounts    
        `).all()

        return query
    }
}