import { ipcMain } from "electron"
import { IPC_CHANNELS } from "@shared/ipc"
import { SeedDefaultsInput } from "@shared/types"

import { OnboardingRepository } from "../repositories/onboarding.repository"

export function registerOnboardingHandlers() {
    ipcMain.handle(
        IPC_CHANNELS.ONBOARDING_SEED_DEFAULTS,
        async (_, data: SeedDefaultsInput) => {
            try {
                const seeded = OnboardingRepository.seedDefaultsIfNeeded(data.user_id)

                return { seeded }
            } catch (err) {
                console.error("[IPC] onboarding:seedDefaults error:", err)
                return { seeded: false }
            }
        }
    )
}
