import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type DeleteCategoryValues = {
    id: string
}

export const useDeleteCategory = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }: DeleteCategoryValues) => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            const deleted = await window.api.categories.delete({
                id,
                user_id: userId,
            })

            if (!deleted) {
                throw new Error("Categoria não encontrada")
            }

            return id
        },
        onSuccess: (id) => {
            toast.success("Categoria removida")
            queryClient.invalidateQueries({ queryKey: ["categories", userId] })
            queryClient.removeQueries({ queryKey: ["category", userId, id] })
            queryClient.invalidateQueries({ queryKey: ["transactions", userId] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao remover categoria")
        },
    })
}
