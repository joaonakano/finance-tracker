import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCategory = (options?: {
    onSuccess?: () => void
}) => {
    const { userId } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (values: CategoryFormValues) => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            return window.api.categories.create({
                user_id: userId,
                name: values.name,
            })
        },
        onSuccess: () => {
            toast.success("Categoria criada")
            queryClient.invalidateQueries({ queryKey: ["categories", userId] })
            options?.onSuccess?.()
        },
        onError: () => {
            toast.error("Falha ao criar categoria")
        }
    })
}
