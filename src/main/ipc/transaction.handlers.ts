import { ipcMain } from "electron"
import { IPC_CHANNELS } from "@shared/ipc"
import {
    BulkDeleteTransactionsInput,
    CreateTransactionInput,
    DeleteTransactionInput,
    GetTransactionInput,
    GetTransactionsInput,
    UpdateTransactionInput,
} from "@shared/types"

import { TransactionRepository } from "../repositories/transaction.repository"

export function registerTransactionHandlers() {
    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_GET_ALL,
        async (_, data: GetTransactionsInput) => {
            try {
                const transactions = TransactionRepository.getAll(data)

                return JSON.parse(JSON.stringify(transactions))
            } catch (err) {
                console.error("[IPC] transactions:get_all error:", err)
                return []
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_GET_BY_ID,
        async (_, data: GetTransactionInput) => {
            try {
                const transaction = TransactionRepository.getById(data)

                return transaction ? JSON.parse(JSON.stringify(transaction)) : undefined
            } catch (err) {
                console.error("[IPC] transactions:get_by_id error:", err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_CREATE,
        async (_, data: CreateTransactionInput) => {
            try {
                const transaction = TransactionRepository.create(data)

                return transaction ? JSON.parse(JSON.stringify(transaction)) : undefined
            } catch (err) {
                console.error("[IPC] transactions:create error:", err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_UPDATE,
        async (_, data: UpdateTransactionInput) => {
            try {
                const transaction = TransactionRepository.update(data)

                return transaction ? JSON.parse(JSON.stringify(transaction)) : undefined
            } catch (err) {
                console.error("[IPC] transactions:update error:", err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_DELETE,
        async (_, data: DeleteTransactionInput) => {
            try {
                return TransactionRepository.delete(data)
            } catch (err) {
                console.error("[IPC] transactions:delete error:", err)
                return false
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.TRANSACTIONS_BULK_DELETE,
        async (_, data: BulkDeleteTransactionsInput) => {
            try {
                return TransactionRepository.bulkDelete(data)
            } catch (err) {
                console.error("[IPC] transactions:bulk_delete error:", err)
                return 0
            }
        }
    )
}
