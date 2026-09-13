import { useState, type ComponentType } from "react"
import { ChevronDown } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { CategorySummary } from "@shared/types"

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354", "#00C49F", "#FFBB28"]

type Props = {
    title: string
    icon: ComponentType<{ className?: string }>
    data: CategorySummary[]
    emptyLabel?: string
}

export const SpendingBreakdownList = ({
    title,
    icon: Icon,
    data,
    emptyLabel = "Sem gastos neste período",
}: Props) => {
    const [expanded, setExpanded] = useState<string | null>(null)
    const total = data.reduce((sum, item) => sum + item.value, 0)

    return (
        <Card className="border-none h-full">
            <CardHeader>
                <CardTitle className="text-xl line-clamp-1 flex items-center gap-2">
                    <Icon className="size-5 text-[#2d4a7a]" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex items-center justify-center py-14 text-muted-foreground text-sm">
                        {emptyLabel}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {data.map((item, index) => {
                            const percent = total === 0 ? 0 : (item.value / total) * 100
                            const isExpanded = expanded === item.name
                            const hasItems = !!item.items?.length
                            const color = COLORS[index % COLORS.length]

                            return (
                                <div key={item.name}>
                                    <button
                                        type="button"
                                        onClick={() => hasItems && setExpanded(isExpanded ? null : item.name)}
                                        className={cn(
                                            "w-full flex items-center gap-3 text-left",
                                            hasItems && "cursor-pointer"
                                        )}
                                    >
                                        <span
                                            className="size-2.5 rounded-full shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 text-sm">
                                                <span className="font-medium text-slate-700 truncate flex items-center gap-1">
                                                    {item.name}
                                                    {hasItems && (
                                                        <ChevronDown
                                                            className={cn(
                                                                "size-3.5 text-muted-foreground transition-transform",
                                                                isExpanded && "rotate-180"
                                                            )}
                                                        />
                                                    )}
                                                </span>
                                                <span className="font-semibold text-slate-800 shrink-0">
                                                    {formatCurrency(item.value)}
                                                </span>
                                            </div>
                                            <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{ width: `${percent}%`, backgroundColor: color }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground w-10 text-right shrink-0">
                                            {formatPercentage(percent)}
                                        </span>
                                    </button>

                                    {isExpanded && hasItems && (
                                        <div className="mt-2 ml-5.5 pl-3 border-l-2 border-slate-100 space-y-1.5">
                                            {item.items!.map((sub) => (
                                                <div
                                                    key={sub.name}
                                                    className="flex items-center justify-between gap-2 text-xs text-muted-foreground"
                                                >
                                                    <span className="truncate">{sub.name}</span>
                                                    <span className="font-medium text-slate-600 shrink-0">
                                                        {formatCurrency(sub.value)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
