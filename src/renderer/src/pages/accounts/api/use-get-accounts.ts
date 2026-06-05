import { useAuth } from "@clerk/react"
import { Account } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseAccountsResult = {
    accountId: string | null | undefined
    accounts: Account[]
    isLoading: boolean
    error: Error | null
}

export const useGetAccounts = (): UseAccountsResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["accounts", userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            const response = await window.api.accounts.getAll(userId)

            if (!response) {
                throw new Error("Falha ao localizar contas")
            }

            console.log(response)
            return response
        },
        enabled: !!userId && isLoaded,
    })

    return {
        accountId: userId,
        accounts: data ?? [],
        isLoading,
        error
    }
}