import { format } from "date-fns"
import { useGetSummary } from "@renderer/pages/summary/api/use-get-summary"
import { useAccountFilter } from "@renderer/hooks/use-account-filter"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { Chart, ChartLoading } from "./chart"
import { SpendingPie, SpendingPieLoading } from "./spending-pie"

export const DataCharts = () => {
    const { accountId } = useAccountFilter()
    const { from, to } = useDateFilter()

    const { data, isLoading, error } = useGetSummary({
        from: format(from, "yyyy-MM-dd"),
        to: format(to, "yyyy-MM-dd"),
        account_id: accountId !== "all" ? accountId : undefined,
    })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                    <ChartLoading />
                </div>
                <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                    <SpendingPieLoading />
                </div>
            </div>
        )

    }

    if (error) {
        console.log("Data-charts error:", error)
        return (
            <div>
                <p>
                    Ocorreu um problema ao tentar processar o gráfico... 
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
                <Chart data={data?.days} />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <SpendingPie data={data?.categories} />
            </div>
        </div>
    )
}