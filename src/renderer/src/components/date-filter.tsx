import { Button } from "./ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover"
import { formatDateRange } from "@renderer/lib/utils"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { useCallback, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { ChevronDown } from "lucide-react"
import { Calendar } from "./ui/calendar"

export const DateFilter = () => {
    const { from, to, setDateRange } = useDateFilter()

    // Draft guarda a seleção em edição dentro do popover.
    // Quando undefined, o calendário mostra os valores aplicados (from/to).
    const [draft, setDraft] = useState<DateRange>()

    // Determina o range a exibir no calendário: draft se existir, senão o aplicado.
    const displayRange = draft ?? { from, to }

    // Quando o popover abre, limpa o draft para refletir o range aplicado.
    const onOpenChange = useCallback(
        (open: boolean) => {
            if (open) {
                setDraft(undefined)
            }
        },
        []
    )

    const onSelect = useCallback((range: DateRange | undefined) => {
        setDraft(range)
    }, [])

    const onApply = useCallback(() => {
        const active = draft ?? displayRange
        if (active?.from && active?.to) {
            setDateRange(active.from, active.to)
            setDraft(undefined)
        }
    }, [draft, displayRange, setDateRange])

    const onReset = useCallback(() => {
        setDraft(undefined)
        setDateRange(subDays(new Date(), 30), new Date())
    }, [setDateRange])

    const hasValidRange = !!(displayRange?.from && displayRange?.to)

    return (
        <Popover onOpenChange={onOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="lg:w-auto w-full h-9 rounded-lg px-3 font-normal bg-white border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-800 transition"
                >
                    <span>{formatDateRange({ from, to })}</span>
                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0"
                align="start"
            >
                <Calendar
                    autoFocus
                    mode="range"
                    defaultMonth={displayRange?.from}
                    selected={displayRange}
                    onSelect={onSelect}
                    numberOfMonths={2}
                />
                <div className="p-4 w-full flex items-center gap-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!hasValidRange}
                            variant="outline"
                            className="flex-1"
                        >
                            Resetar
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={onApply}
                            disabled={!hasValidRange}
                            className="flex-1"
                        >
                            Aplicar
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}
