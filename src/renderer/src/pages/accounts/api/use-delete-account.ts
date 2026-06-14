import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteAccountValues = {
    id: string
}

export const useDeleteAccount = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: DeleteAccountValues) => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            const deleted = await window.api.accounts.delete({
                id,
                user_id: userId,
            })

            if (!deleted) {
                throw new Error("Conta não encontrada")
            }

            return id
        },
        onSuccess: (id) => {
            toast.success("Conta removida")
            queryClient.invalidateQueries({ queryKey: ["accounts", userId] })
            queryClient.removeQueries({ queryKey: ["account", userId, id] })
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao remover conta")
        },
    })
}
