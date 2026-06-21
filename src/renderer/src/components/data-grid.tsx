import { format } from "date-fns"
import { formatDateRange } from "@renderer/lib/utils"
import { useGetSummary } from "@renderer/pages/dashboard/api/use-get-summary"
import { useAccountFilter } from "@renderer/hooks/use-account-filter"
import { useDateFilter } from "@renderer/hooks/use-date-filter"

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react"

import { DataCard, DataCardHardLoading } from "@/components/data-card"

export const DataGrid = () => {   
    const { from, to } = useDateFilter()
    const { accountId } = useAccountFilter()

    const fromStr = format(from, "yyyy-MM-dd")
    const toStr = format(to, "yyyy-MM-dd")

    const { data, isLoading, error } = useGetSummary({
        from: fromStr,
        to: toStr,
        account_id: accountId !== "all" ? accountId : undefined,
    })

    const dateRangeLabel = formatDateRange({ from, to })

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
                dateRange={dateRangeLabel}
            />
         
        </div>
    )
}
