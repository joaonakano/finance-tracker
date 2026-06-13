import { useAuth } from "@clerk/react"
import { Category } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseCategoriesResult = {
    accountId: string | null | undefined
    category: Category | null | undefined
    isLoading: boolean
    error: Error | null
}

export const useGetCategory = (id?: string): UseCategoriesResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["category", userId, id],
        queryFn: async () => {
            if (!userId || !id) {
                throw new Error("Usuário não encontrado")
            }

            const response = await window.api.categories.getById({
                user_id: userId,
                id,
            })

            if (!response) {
                throw new Error("Falha ao localizar categoria")
            }

            return response
        },
        enabled: !!userId && isLoaded && !!id,
    })

    return {
        accountId: userId,
        category: data ?? null,
        isLoading,
        error,
    }
}
