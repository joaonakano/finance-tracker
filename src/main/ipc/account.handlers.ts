import { ipcMain } from "electron";
import { IPC_CHANNELS } from "@shared/ipc";
import {
    BulkDeleteAccountsInput,
    CreateAccountInput,
    DeleteAccountInput,
    GetAccountInput,
    UpdateAccountInput
} from "@shared/types";
import { AccountRepository } from "../repositories/account.repository";

export function registerAccountHandlers() {
    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_GET_ALL,
        async (_, user_id: string) => {
            try {
                const accounts = AccountRepository.getAll(user_id)

                return JSON.parse(JSON.stringify(accounts))
            } catch (err) {
                console.error('[IPC] accounts:get_all error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_GET_BY_ID,
        async (_, data: GetAccountInput) => {
            try {
                const account = AccountRepository.getById(data)

                return account ? JSON.parse(JSON.stringify(account)) : undefined
            } catch (err) {
                console.error('[IPC] accounts:get_by_id error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_CREATE,
        async (_, data: CreateAccountInput) => {
            try {
                const account = AccountRepository.create(data)

                return JSON.parse(JSON.stringify(account))
            } catch (err) {
                console.error('[IPC] accounts:create error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_UPDATE,
        async (_, data: UpdateAccountInput) => {
            try {
                const account = AccountRepository.update(data)

                return account ? JSON.parse(JSON.stringify(account)) : undefined
            } catch (err) {
                console.error('[IPC] accounts:update error:', err)
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_DELETE,
        async (_, data: DeleteAccountInput) => {
            try {
                return AccountRepository.delete(data)
            } catch (err) {
                console.error('[IPC] accounts:delete error:', err)
                return false
            }
        }
    )

    ipcMain.handle(
        IPC_CHANNELS.ACCOUNTS_BULK_DELETE,
        async (_, data: BulkDeleteAccountsInput) => {
            try {
                return AccountRepository.bulkDelete(data)
            } catch (err) {
                console.error('[IPC] accounts:bulk_delete error:', err)
                return 0
            }
        }
    )
}
