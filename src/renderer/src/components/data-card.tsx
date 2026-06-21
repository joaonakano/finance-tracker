import { type ComponentType } from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn, formatCurrency, formatPercentage } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

import { CountUp } from "./count-up"

import { Skeleton } from "@/components/ui/skeleton"

const boxVariant = cva(
    "shrink-0 size-10 rounded-xl flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-blue-50 text-blue-600",
                success: "bg-emerald-50 text-emerald-600",
                danger: "bg-rose-50 text-rose-600",
                warning: "bg-amber-50 text-amber-600",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

const iconVariant = cva(
    "size-5",
    {
        variants: {
            variant: {
                default: "text-blue-600",
                success: "text-emerald-600",
                danger: "text-rose-600",
                warning: "text-amber-600",
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariants, IconVariants {
    icon: ComponentType<{ className?: string }>
    title: string
    value?: number
    dateRange: string
    percentageChange?: number
}

export const DataCard = ({
    icon: Icon,
    title,
    value = 0,
    variant,
    dateRange,
    percentageChange = 0,
}: DataCardProps) => {
    return (
        <Card className="hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between gap-x-4 pb-2">
                <div className="space-y-1">
                    <CardDescription className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {title}
                    </CardDescription>
                    <CardTitle className="text-2xl font-bold text-slate-800 line-clamp-1">
                        <CountUp
                            preserveValue
                            start={0}
                            end={value}
                            decimals={2}
                            decimalPlaces={2}
                            formattingFn={formatCurrency}
                        />
                    </CardTitle>
                </div>
                <div className={cn(boxVariant({ variant }))}>
                    <Icon className={cn(iconVariant({ variant }))} />
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm">
                    <span className={cn(
                        "font-medium",
                        percentageChange > 0 && "text-emerald-600",
                        percentageChange < 0 && "text-rose-600",
                        percentageChange === 0 && "text-slate-500",
                    )}>
                        {formatPercentage(percentageChange, { addPrefix: true })}
                    </span>
                    <span className="text-slate-400 text-xs">
                        do período anterior
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

export const DataCardHardLoading = () => {
    return (
        <Card className="border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between gap-x-4 pb-2">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-32" />
                </div>
                <Skeleton className="size-10 rounded-xl" />
            </CardHeader>
            <CardContent className="pt-0">
                <Skeleton className="h-4 w-28" />
            </CardContent>
        </Card>
    )
}
