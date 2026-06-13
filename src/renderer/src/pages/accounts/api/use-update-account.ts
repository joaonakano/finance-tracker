import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { AccountFormValues } from "@/pages/accounts/components/account-form"

type UpdateAccountValues = AccountFormValues & {
    id: string
}

export const useUpdateAccount = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: UpdateAccountValues) => {
            if (!userId) {
                throw new Error("Usuario não encontrado")
            }

            const account = await window.api.accounts.update({
                id: values.id,
                user_id: userId,
                name: values.name,
            })

            if (!account) {
                throw new Error("Conta não encontrada")
            }

            return account
        },
        onSuccess: (account) => {
            toast.success("Conta atualizada")
            queryClient.invalidateQueries({ queryKey: ["accounts", userId] })
            queryClient.invalidateQueries({ queryKey: ["account", userId, account.id] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao atualizar conta")
        },
    })
}
