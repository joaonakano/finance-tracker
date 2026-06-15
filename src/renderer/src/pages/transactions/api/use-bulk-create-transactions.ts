import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { BulkCreateTransactionItem } from "@shared/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type BulkCreateValues = {
    transactions: BulkCreateTransactionItem[]
}

export const useBulkCreateTransactions = (options?: {
    onSuccess?: (count: number) => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ transactions }: BulkCreateValues) => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            return window.api.transactions.bulkCreate({
                user_id: userId,
                transactions,
            })
        },
        onSuccess: (count) => {
            toast.success(`${count} transações importadas`)
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            options?.onSuccess?.(count)
        },
        onError: () => {
            toast.error("Falha ao importar transações")
        },
    })
}
