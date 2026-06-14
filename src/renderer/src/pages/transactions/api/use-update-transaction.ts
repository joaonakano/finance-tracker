import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { UpdateTransactionInput } from "@shared/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type UpdateTransactionValues = Omit<UpdateTransactionInput, "user_id">

export const useUpdateTransaction = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: UpdateTransactionValues) => {
            if (!userId) {
                throw new Error("Usuario nao encontrado")
            }

            const transaction = await window.api.transactions.update({
                user_id: userId,
                ...values,
            })

            if (!transaction) {
                throw new Error("Transacao nao encontrada")
            }

            return transaction
        },
        onSuccess: (transaction) => {
            toast.success("Transacao atualizada")
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            queryClient.invalidateQueries({ queryKey: ["transaction", userId, transaction.id] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao atualizar transacao")
        },
    })
}
