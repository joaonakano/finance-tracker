import { useAuth } from "@clerk/react"
import { Account } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseAccountsResult = {
    accountId: string | null | undefined
    account: Account | null | undefined
    isLoading: boolean
    error: Error | null
}

export const useGetAccount = (id?: string): UseAccountsResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["account", userId, id],
        queryFn: async () => {
            if (!userId || !id) {
                throw new Error("Usuario não encontrado")
            }

            const response = await window.api.accounts.getById({
                user_id: userId,
                id,
            })

            if (!response) {
                throw new Error("Falha ao localizar conta")
            }

            return response
        },
        enabled: !!userId && isLoaded && !!id,
    })

    return {
        accountId: userId,
        account: data ?? null,
        isLoading,
        error,
    }
}
