import { db } from "./db";

export function setupSchema() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS accounts (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            plaid_id TEXT
        );

        CREATE TABLE IF NOT EXISTS categories (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            name TEXT NOT NULL,
            plaid_id TEXT
        );

        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            
            amount INTEGER NOT NULL,
            payee TEXT NOT NULL,
            notes TEXT,
            date TEXT NOT NULL,
            
            account_id TEXT NOT NULL,
            category_id TEXT,

            FOREIGN KEY (account_id)
                REFERENCES accounts(id)
            ON DELETE CASCADE,

            FOREIGN KEY (category_id)
                REFERENCES categories(id)
            ON DELETE SET NULL
        );
    `)
}