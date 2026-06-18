import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type BulkDeleteTransactionIds = {
    ids: string[]
}

export const useBulkDeleteTransactions = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ ids }: BulkDeleteTransactionIds) => {
            if (!userId) {
                throw new Error("Usuario nao encontrado")
            }

            return window.api.transactions.bulkDelete({
                user_id: userId,
                ids,
            })
        },
        onSuccess: () => {
            toast.success("Transacoes removidas")
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao remover transacoes")
        },
    })
}
