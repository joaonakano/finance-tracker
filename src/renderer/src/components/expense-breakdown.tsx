import { format } from "date-fns"
import { Tag, Wallet } from "lucide-react"

import { useAccountFilter } from "@renderer/hooks/use-account-filter"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { useGetSummary } from "@renderer/pages/dashboard/api/use-get-summary"
import { SpendingBreakdownList } from "./spending-breakdown-list"
import { Skeleton } from "./ui/skeleton"

export const ExpenseBreakdown = () => {
    const { accountId } = useAccountFilter()
    const { month } = useDateFilter()

    const { data, isLoading, error } = useGetSummary({
        month: format(month, "yyyy-MM"),
        account_id: accountId !== "all" ? accountId : undefined,
    })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Skeleton className="h-80 w-full rounded-xl" />
                <Skeleton className="h-80 w-full rounded-xl" />
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <p>Ocorreu um problema ao tentar processar os gastos...</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingBreakdownList
                title="Gastos por categoria"
                icon={Tag}
                data={data?.categories ?? []}
            />
            <SpendingBreakdownList
                title="Gastos por conta"
                icon={Wallet}
                data={data?.accounts ?? []}
            />
        </div>
    )
}
