import { toast } from "sonner"
import { useAuth } from "@clerk/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CategoryFormValues } from "../components/category-form"

type UpdateCategoryValues = CategoryFormValues & {
    id: string
}

export const useUpdateCategory = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: UpdateCategoryValues) => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            const category = await window.api.categories.update({
                id: values.id,
                user_id: userId,
                name: values.name,
            })

            if (!category) {
                throw new Error("Categoria não encontrada")
            }

            return category
        },
        onSuccess: (category) => {
            toast.success("Categoria atualizada")
            queryClient.invalidateQueries({ queryKey: ["categories", userId] })
            queryClient.invalidateQueries({ queryKey: ["category", userId, category.id] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao atualizar categoria")
        },
    })
}
