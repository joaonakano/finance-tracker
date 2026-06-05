import { ipcMain } from "electron";
import { IPC_CHANNELS } from "@shared/ipc";
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
}