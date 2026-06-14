import { useAuth } from "@clerk/react"
import { TransactionWithRelations } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseGetTransactionResult = {
    transaction: TransactionWithRelations | null | undefined
    isLoading: boolean
    error: Error | null
}

export const useGetTransaction = (id?: string): UseGetTransactionResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["transaction", userId, id],
        queryFn: async () => {
            if (!userId || !id) {
                throw new Error("Usuário não encontrado")
            }

            const response = await window.api.transactions.getById({
                user_id: userId,
                id,
            })

            if (!response) {
                throw new Error("Transação não encontrada")
            }

            return response
        },
        enabled: !!userId && isLoaded && !!id,
    })

    return {
        transaction: data ?? null,
        isLoading,
        error,
    }
}
