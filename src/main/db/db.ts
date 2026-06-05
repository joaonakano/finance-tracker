import { app } from "electron"
import { createRequire } from "module"
import path from "path"

const require = createRequire(import.meta.url)
const Database = require("better-sqlite3")

const dbPath = path.join(app.getPath('userData'), 'finance.db')

export const db = new Database(dbPath)