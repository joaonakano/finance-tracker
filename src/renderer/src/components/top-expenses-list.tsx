import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TrendingDown } from "lucide-react"

import { useAccountFilter } from "@renderer/hooks/use-account-filter"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { useGetTransactions } from "@renderer/pages/transactions/api/use-get-transactions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

const LIMIT = 5

export const TopExpensesList = () => {
    const { accountId } = useAccountFilter()
    const { from, to } = useDateFilter()

    const { transactions, isLoading, error } = useGetTransactions({
        account_id: accountId !== "all" ? accountId : undefined,
        start_date: format(from, "yyyy-MM-dd"),
        end_date: format(to, "yyyy-MM-dd"),
    })

    const topExpenses = [...transactions]
        .filter((transaction) => transaction.amount < 0)
        .sort((a, b) => a.amount - b.amount)
        .slice(0, LIMIT)

    return (
        <Card className="border-none">
            <CardHeader>
                <CardTitle className="text-xl line-clamp-1 flex items-center gap-2">
                    <TrendingDown className="size-5 text-rose-500" />
                    Maiores gastos do período
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: LIMIT }).map((_, index) => (
                            <Skeleton key={index} className="h-12 w-full rounded-lg" />
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-sm text-muted-foreground py-6 text-center">
                        Ocorreu um problema ao carregar os gastos deste período.
                    </p>
                ) : topExpenses.length === 0 ? (
                    <div className="flex items-center justify-center py-10 text-muted-foreground text-sm">
                        Sem despesas neste período
                    </div>
                ) : (
                    <div>
                        {topExpenses.map((transaction, index) => (
                            <div
                                key={transaction.id}
                                className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0"
                            >
                                <span className="size-7 rounded-full bg-rose-50 text-rose-600 text-xs font-semibold flex items-center justify-center shrink-0">
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-700 truncate">
                                        {transaction.payee}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {transaction.category ?? "Sem categoria"} · {transaction.account} ·{" "}
                                        {format(new Date(transaction.date + "T00:00:00"), "dd MMM", { locale: ptBR })}
                                    </p>
                                </div>
                                <span className="text-sm font-semibold text-rose-600 shrink-0">
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
