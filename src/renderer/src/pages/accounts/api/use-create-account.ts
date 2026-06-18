import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AccountFormValues } from "@/pages/accounts/components/account-form";

export const useCreateAccount = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: AccountFormValues) => {
            if (!userId) {
                throw new Error("Usuario não encontrado")
            }

            return window.api.accounts.create({
                user_id: userId,
                name: values.name,
            })
        },
        onSuccess: () => {
            toast.success("Conta criada")
            queryClient.invalidateQueries({ queryKey: ["accounts", userId] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao criar conta")
        }
    })
}
