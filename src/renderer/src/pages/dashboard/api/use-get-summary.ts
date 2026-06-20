import { useAuth } from "@clerk/react"
import { convertAmountFromMiliunits } from "@renderer/lib/utils"
import { CategorySummary, ActiveDay, SummaryInput } from "@shared/types"
import { useQuery } from "@tanstack/react-query"

type UseGetSummaryFilters = Omit<SummaryInput, "user_id">

type SummaryData = {
    incomeAmount: number
    incomeChange: number
    expensesAmount: number
    expensesChange: number
    remainingAmount: number
    remainingChange: number
    categories: CategorySummary[]
    days: ActiveDay[]
}

type UseGetSummaryResult = {
    data: SummaryData | undefined
    isLoading: boolean
    error: Error | null
}

export const useGetSummary = (
    filters: UseGetSummaryFilters = {}
): UseGetSummaryResult => {
    const { userId, isLoaded } = useAuth()

    const { data: rawData, isLoading, error } = useQuery({
        queryKey: ["summary", userId, filters],
        queryFn: async () => {
            if (!userId) {
                throw new Error("Usuário não encontrado")
            }

            return window.api.summary.getByDate({
                user_id: userId,
                ...filters,
            })
        },
        enabled: !!userId && isLoaded,
    })

    const data: SummaryData | undefined = rawData
        ? {
              incomeAmount: convertAmountFromMiliunits(
                  rawData.currentPeriod.income
              ),
              incomeChange: rawData.incomeChange,
              expensesAmount: convertAmountFromMiliunits(
                  rawData.currentPeriod.expenses
              ),
              expensesChange: rawData.expensesChange,
              remainingAmount: convertAmountFromMiliunits(
                  rawData.currentPeriod.remaining
              ),
              remainingChange: rawData.remainingChange,
              categories: rawData.categories.map((c) => ({
                  ...c,
                  value: convertAmountFromMiliunits(c.value),
              })),
              days: rawData.days.map((d) => ({
                  ...d,
                  income: convertAmountFromMiliunits(d.income),
                  expenses: convertAmountFromMiliunits(d.expenses),
              })),
          }
        : undefined

    return { data, isLoading, error }
}
