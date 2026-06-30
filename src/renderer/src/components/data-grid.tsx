import { format } from "date-fns"
import { formatDateRange } from "@renderer/lib/utils"
import { useGetSummary } from "@renderer/pages/dashboard/api/use-get-summary"
import { useAccountFilter } from "@renderer/hooks/use-account-filter"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@clerk/react"

import { PiggyBank, RefreshCw, TrendingDown, TrendingUp } from "lucide-react"

import { DataCard, DataCardHardLoading } from "@/components/data-card"
import { Button } from "@/components/ui/button"

export const DataGrid = () => {   
    const { from, to } = useDateFilter()
    const { accountId } = useAccountFilter()
    const queryClient = useQueryClient()
    const { userId } = useAuth()

    const fromStr = format(from, "yyyy-MM-dd")
    const toStr = format(to, "yyyy-MM-dd")

    const { data, isLoading, error, isFetching } = useGetSummary({
        from: fromStr,
        to: toStr,
        account_id: accountId !== "all" ? accountId : undefined,
    })

    const dateRangeLabel = formatDateRange({ from, to })

    const handleRefresh = () => {
        queryClient.invalidateQueries({ queryKey: ["summary", userId] })
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-2 mb-8">
                <DataCardHardLoading />
                <DataCardHardLoading />
                <DataCardHardLoading />
            </div>
        )
    }
    if (error) return <div>Erro: {error.message}</div>

    return (
        <div>
            <div className="flex items-center justify-end mb-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRefresh}
                    disabled={isFetching}
                    className="size-8"
                    title="Atualizar dados"
                >
                    <RefreshCw className={isFetching ? "animate-spin size-4" : "size-4"} />
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-2 mb-8">
                <DataCard
                    title="Disponível"
                    value={data?.remainingAmount}
                    percentageChange={data?.remainingChange}
                    icon={PiggyBank}
                    variant="warning"
                    dateRange={dateRangeLabel}
                />
                <DataCard
                    title="Receitas"
                    value={data?.incomeAmount}
                    percentageChange={data?.incomeChange}
                    icon={TrendingUp}
                    variant="success"
                    dateRange={dateRangeLabel}
                />
                <DataCard
                    title="Despesas"
                    value={data?.expensesAmount}
                    percentageChange={data?.expensesChange}
                    icon={TrendingDown}
                    variant="danger"
                    invertColors
                    dateRange={dateRangeLabel}
                />
            </div>
        </div>
    )
}
