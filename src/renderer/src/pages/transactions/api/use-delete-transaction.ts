import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteTransactionValues = {
    id: string
}

export const useDeleteTransaction = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: DeleteTransactionValues) => {
            if (!userId) {
                throw new Error("Usuario nao encontrado")
            }

            const deleted = await window.api.transactions.delete({
                id,
                user_id: userId,
            })

            if (!deleted) {
                throw new Error("Transacao nao encontrada")
            }

            return id
        },
        onSuccess: (id) => {
            toast.success("Transacao removida")
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            queryClient.removeQueries({ queryKey: ["transaction", userId, id] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao remover transacao")
        },
    })
}
