import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { CreateTransactionInput } from "@shared/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type CreateTransactionValues = Omit<CreateTransactionInput, "user_id">

export const useCreateTransaction = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: CreateTransactionValues) => {
            if (!userId) {
                throw new Error("Usuario nao encontrado")
            }

            const transaction = await window.api.transactions.create({
                user_id: userId,
                ...values,
            })

            if (!transaction) {
                throw new Error("Falha ao criar transacao")
            }

            return transaction
        },
        onSuccess: () => {
            toast.success("Transacao criada")
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao criar transacao")
        },
    })
}
