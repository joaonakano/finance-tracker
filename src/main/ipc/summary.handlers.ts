import { ipcMain } from "electron"
import { IPC_CHANNELS } from "@shared/ipc"
import { SummaryInput } from "@shared/types"

import { SummaryRepository } from "../repositories/summary.repository"

export function registerSummaryHandlers() {
    ipcMain.handle(
        IPC_CHANNELS.SUMMARY_GET_BY_MONTH,
        async (_, data: SummaryInput) => {
            try {
                const summary = SummaryRepository.getByMonth(data)

                return JSON.parse(JSON.stringify(summary))
            } catch (err) {
                console.error("[IPC] summary:getByMonth error:", err)

                return {
                    currentPeriod: { income: 0, expenses: 0, remaining: 0 },
                    lastPeriod: { income: 0, expenses: 0, remaining: 0 },
                    incomeChange: 0,
                    expensesChange: 0,
                    remainingChange: 0,
                    categories: [],
                    accounts: [],
                    days: [],
                }
            }
        }
    )
}
