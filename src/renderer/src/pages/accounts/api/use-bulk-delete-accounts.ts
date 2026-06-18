import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type BulkDeleteIds = {
    ids: string[]
}

export const useBulkDeleteAccounts = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ ids }: BulkDeleteIds) => {
            if (!userId) {
                throw new Error("Usuario não encontrado")
            }
            
            return window.api.accounts.bulkDelete({
                user_id: userId,
                ids: ids,
            })
        },
        onSuccess: () => {
            toast.success("Contas removidas")
            queryClient.invalidateQueries({ queryKey: ["accounts", userId] })
            queryClient.invalidateQueries({ queryKey: ["summary"] })
            options?.onSuccess?.()
        },
        onError: (error) => {
            toast.error("Falha ao remover contas")
            console.log(error)
        }
    })
}
