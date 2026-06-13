import { useAuth } from "@clerk/react"
import { Category } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseCategoriesResult = {
    accountId: string | null | undefined
    categories: Category[]
    isLoading: boolean
    error: Error | null
}

export const useGetCategories = (): UseCategoriesResult => {
    const { userId, isLoaded } = useAuth()

    const { data, isLoading, error } = useQuery({
        queryKey: ["categories", userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            const response = await window.api.categories.getAll(userId)

            if (!response) {
                throw new Error("Falha ao localizar categorias")
            }

            console.log(response)
            return response
        },
        enabled: !!userId && isLoaded,
    })

    return {
        accountId: userId,
        categories: data ?? [],
        isLoading,
        error
    }
}