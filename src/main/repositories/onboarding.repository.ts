import { randomUUID } from "crypto"

import { db } from "../db/db"

const DEFAULT_ACCOUNT_NAME = "Conta Principal"

const DEFAULT_CATEGORY_NAMES = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Saúde",
    "Educação",
    "Lazer",
    "Compras",
    "Salário",
    "Outros",
]

export class OnboardingRepository {
    /**
     * Cria uma conta e categorias padrão para o usuário, apenas se ele ainda
     * não tiver nenhuma conta cadastrada. A checagem e a inserção acontecem
     * de forma síncrona (better-sqlite3), então não há corrida entre chamadas
     * concorrentes: a segunda sempre verá o resultado da primeira.
     */
    static seedDefaultsIfNeeded(userId: string): boolean {
        const existingAccount = db.prepare(`
            SELECT id FROM accounts WHERE user_id = ? LIMIT 1
        `).get(userId)

        if (existingAccount) {
            return false
        }

        const insertAccount = db.prepare(`
            INSERT INTO accounts (id, user_id, name, plaid_id)
            VALUES (?, ?, ?, NULL)
        `)

        const insertCategory = db.prepare(`
            INSERT INTO categories (id, user_id, name, plaid_id)
            VALUES (?, ?, ?, NULL)
        `)

        const seed = db.transaction(() => {
            insertAccount.run(randomUUID(), userId, DEFAULT_ACCOUNT_NAME)

            for (const name of DEFAULT_CATEGORY_NAMES) {
                insertCategory.run(randomUUID(), userId, name)
            }
        })

        seed()

        return true
    }
}
