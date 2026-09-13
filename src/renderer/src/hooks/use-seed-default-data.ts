import { useEffect, useRef } from "react"
import { useAuth } from "@clerk/react"
import { useQueryClient } from "@tanstack/react-query"

/**
 * Garante que todo usuário tenha uma conta e categorias padrão ao acessar o
 * sistema pela primeira vez, evitando que precise cadastrar tudo manualmente
 * antes de registrar sua primeira transação. A checagem de "já tem dados" é
 * feita no backend (ver OnboardingRepository), então é seguro chamar isso a
 * cada login — só semeia dados na primeira vez.
 */
export const useSeedDefaultData = () => {
    const { userId, isLoaded, isSignedIn } = useAuth()
    const queryClient = useQueryClient()
    const seededForUser = useRef<string | null>(null)

    useEffect(() => {
        if (!isLoaded || !isSignedIn || !userId) {
            return
        }

        if (seededForUser.current === userId) {
            return
        }

        seededForUser.current = userId

        window.api.onboarding.seedDefaults({ user_id: userId }).then((result) => {
            if (result.seeded) {
                queryClient.invalidateQueries({ queryKey: ["accounts", userId] })
                queryClient.invalidateQueries({ queryKey: ["categories", userId] })
            }
        }).catch((error) => {
            console.error("[useSeedDefaultData]", error)
        })
    }, [isLoaded, isSignedIn, userId, queryClient])
}
