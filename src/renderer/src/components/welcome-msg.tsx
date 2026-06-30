import { useUser } from "@clerk/react"
import { format, subDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Hand } from "lucide-react"
import { useCallback, useState } from "react"
import { DateRange } from "react-day-picker"
import { useLocation } from "react-router"

import { useDateFilter } from "@/hooks/use-date-filter"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const SUBTITLES: Record<string, string> = {
    "/": "Esse é o resumo das suas finanças",
    "/transactions": "Gerencie suas transações financeiras",
    "/accounts": "Gerencie suas contas bancárias",
    "/categories": "Organize suas categorias",
    "/settings": "Ajuste as preferências do sistema",
}

export function WelcomeMsg() {
    const { user, isLoaded } = useUser()
    const { from, to, setDateRange } = useDateFilter()
    const location = useLocation()

    const firstName = user?.firstName ?? user?.username ?? ""
    const isSettingsPage = location.pathname.startsWith("/settings")
    const subtitle = SUBTITLES[location.pathname] ?? SUBTITLES["/"]

    // Draft guarda a seleção em edição. Quando undefined, usa o range aplicado.
    const [draft, setDraft] = useState<DateRange>()

    // Range exibido no calendário: draft se existir, senão o aplicado.
    const displayRange = draft ?? { from, to }

    // Ao abrir o popover, sincroniza com o range aplicado (limpa draft).
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
        <div className="bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] rounded-2xl p-7 lg:p-8 mb-7 text-white flex justify-between items-center flex-wrap gap-4 shadow-[0_8px_32px_rgba(26,43,74,0.15)]">
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-1 flex items-center gap-2">
                    <Hand className="size-6 lg:size-7" />
                    Bem-vindo{isLoaded && firstName ? ", " : " "}
                    <span className="font-light opacity-90">{firstName}</span>
                </h1>
                <p className="text-sm lg:text-base text-blue-200/80">
                    {subtitle}
                </p>
            </div>

            {!isSettingsPage && (
            <Popover onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <button className="flex gap-8 bg-white/10 px-6 py-3 rounded-xl backdrop-blur-xs hover:bg-white/20 transition cursor-pointer">
                        <div className="text-center">
                            <div className="text-[11px] uppercase tracking-wide text-blue-200/70">
                                Período atual
                            </div>
                            <div className="text-lg font-bold mt-0.5 whitespace-nowrap">
                                {format(from, "dd MMMM", { locale: ptBR })} a{" "}
                                {format(to, "dd MMMM yyyy", { locale: ptBR })}
                            </div>
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                        autoFocus
                        mode="range"
                        defaultMonth={displayRange?.from}
                        selected={displayRange}
                        onSelect={onSelect}
                        numberOfMonths={2}
                        locale={ptBR}
                    />
                    <div className="p-4 w-full grid grid-cols-2 gap-2">
                        <PopoverClose asChild>
                            <Button
                                onClick={onReset}
                                disabled={!hasValidRange}
                                className="w-full"
                                variant="outline"
                            >
                                Resetar
                            </Button>
                        </PopoverClose>
                        <PopoverClose asChild>
                            <Button
                                onClick={onApply}
                                disabled={!hasValidRange}
                                className="w-full"
                            >
                                Aplicar
                            </Button>
                        </PopoverClose>
                    </div>
                </PopoverContent>
            </Popover>
            )}
        </div>
    )
}
