import { useAuth } from "@clerk/react"
import { convertAmountFromMiliunits } from "@renderer/lib/utils"
import { GetTransactionsInput, TransactionWithRelations } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseGetTransactionsFilters = Omit<GetTransactionsInput, "user_id">

type UseGetTransactionsResult = {
    transactions: TransactionWithRelations[]
    isLoading: boolean
    error: Error | null
}

export const useGetTransactions = (
    filters: UseGetTransactionsFilters = {}
): UseGetTransactionsResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["transactions", userId, filters],
        queryFn: async () => {
            if (!userId) {
                throw new Error("Usuário nao encontrado")
            }

            return window.api.transactions.getAll({
                user_id: userId,
                ...filters,
            })
        },
        enabled: !!userId && isLoaded,
    })

    return {
        transactions: data?.map((transaction) => ({
            ...transaction,
            amount: convertAmountFromMiliunits(transaction.amount)
        })) ?? [],
        isLoading,
        error,
    }
}
