import { formatCurrency } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type CategoryItem = {
    name: string
    value: number
}

export const CategoryTooltip =  ({ active, payload }: any) => {
    if (!active) return null

    const name = payload[0].payload.name
    const value = payload[0].value
    const items: CategoryItem[] | undefined = payload[0].payload.items

    return (
        <div className="rounded-sm bg-white shadow-sm border overflow-hidden max-w-64">
            <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
                {name}
            </div>
            <Separator />
            <div className="p-2 px-3 space-y-1">
                <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center gap-x-2">
                        <div className="size-1.5 bg-rose-500 rounded-full" />
                            <p className="text-sm text-muted-foreground">
                                Despesas
                            </p>
                        <p className="text text-right font-medium">
                            {formatCurrency(value * -1)}
                        </p>
                    </div>
                </div>
            </div>
            {items && items.length > 0 && (
                <>
                    <Separator />
                    <div className="p-2 px-3 space-y-1">
                        <p className="text-xs text-muted-foreground">
                            Inclui:
                        </p>
                        {items.map((item) => (
                            <div
                                key={item.name}
                                className="flex items-center justify-between gap-x-4 text-xs"
                            >
                                <span className="text-muted-foreground truncate">
                                    {item.name}
                                </span>
                                <span className="font-medium shrink-0">
                                    {formatCurrency(item.value * -1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}