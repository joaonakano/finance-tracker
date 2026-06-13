import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type BulkDeleteIds = {
    ids: string[]
}

export const useBulkDeleteCategories = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ ids }: BulkDeleteIds) => {
            if (!userId) {
                throw new Error("Usuario não encontrado")
            }
            
            return window.api.categories.bulkDelete({
                user_id: userId,
                ids: ids,
            })
        },
        onSuccess: () => {
            toast.success("Categorias removidas")
            queryClient.invalidateQueries({ queryKey: ["categories", userId] })
            options?.onSuccess?.()
        },
        onError: (error) => {
            toast.error("Falha ao remover categorias")
            console.log(error)
        }
    })
}
