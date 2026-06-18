import { useState } from "react"
import { subDays, format } from "date-fns"
import { formatDateRange } from "@renderer/lib/utils"
import { useGetSummary } from "@renderer/pages/summary/api/use-get-summary"

import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"
import { FaPiggyBank } from "react-icons/fa"

import { DataCard, DataCardHardLoading } from "@/components/data-card"

function defaultFrom(): string {
    return format(subDays(new Date(), 30), "yyyy-MM-dd")
}

function defaultTo(): string {
    return format(new Date(), "yyyy-MM-dd")
}

export const DataGrid = () => {   
    const [from, setFrom] = useState<string>(defaultFrom)
    const [to, setTo] = useState<string>(defaultTo)

    const { data, isLoading, error } = useGetSummary({ from, to })

    const dateRangeLabel = formatDateRange({ from, to })

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardHardLoading />
                <DataCardHardLoading />
                <DataCardHardLoading />
            </div>
        )
    }
    if (error) return <div>Erro: {error.message}</div>

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
            <DataCard
                title="Remaining"
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Income"
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <DataCard
                title="Expenses"
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
         
        </div>
    )
}