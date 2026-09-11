import { useUser } from "@clerk/react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Hand } from "lucide-react"
import { useCallback, useState } from "react"
import { useLocation } from "react-router"

import { useDateFilter } from "@/hooks/use-date-filter"
import { Button } from "@/components/ui/button"
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

const MONTHS = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export function WelcomeMsg() {
    const { user, isLoaded } = useUser()
    const { month, setMonth, previousMonth, nextMonth, goToCurrentMonth } = useDateFilter()
    const location = useLocation()

    const firstName = user?.firstName ?? user?.username ?? ""
    const isSettingsPage = location.pathname.startsWith("/settings")
    const subtitle = SUBTITLES[location.pathname] ?? SUBTITLES["/"]

    const [pickerYear, setPickerYear] = useState(() => month.getFullYear())

    const onOpenChange = useCallback(
        (open: boolean) => {
            if (open) {
                setPickerYear(month.getFullYear())
            }
        },
        [month]
    )

    const selectMonth = (monthIndex: number) => {
        setMonth(new Date(pickerYear, monthIndex, 1))
    }

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
                <div className="flex items-center gap-1">
                    <button
                        onClick={previousMonth}
                        aria-label="Mês anterior"
                        className="size-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
                    >
                        <ChevronLeft className="size-5" />
                    </button>

                    <Popover onOpenChange={onOpenChange}>
                        <PopoverTrigger asChild>
                            <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
                                <div className="text-center">
                                    <div className="text-[11px] uppercase tracking-wide text-blue-200/70">
                                        Mês
                                    </div>
                                    <div className="text-lg font-bold mt-0.5 whitespace-nowrap capitalize">
                                        {format(month, "MMM yyyy", { locale: ptBR })}
                                    </div>
                                </div>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-3" align="end">
                            <div className="flex items-center justify-between mb-2">
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => setPickerYear((y) => y - 1)}
                                    aria-label="Ano anterior"
                                >
                                    <ChevronLeft className="size-4" />
                                </Button>
                                <span className="font-semibold text-foreground">
                                    {pickerYear}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon-sm"
                                    onClick={() => setPickerYear((y) => y + 1)}
                                    aria-label="Próximo ano"
                                >
                                    <ChevronRight className="size-4" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-1 w-56">
                                {MONTHS.map((name, index) => {
                                    const selected =
                                        pickerYear === month.getFullYear() &&
                                        index === month.getMonth()

                                    return (
                                        <PopoverClose asChild key={name}>
                                            <Button
                                                variant={selected ? "default" : "ghost"}
                                                size="sm"
                                                className={selected ? "" : "text-muted-foreground"}
                                                onClick={() => selectMonth(index)}
                                            >
                                                {name.slice(0, 3)}
                                            </Button>
                                        </PopoverClose>
                                    )
                                })}
                            </div>
                            <div className="mt-2 border-t pt-2">
                                <PopoverClose asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={goToCurrentMonth}
                                    >
                                        Mês atual
                                    </Button>
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <button
                        onClick={nextMonth}
                        aria-label="Próximo mês"
                        className="size-10 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer"
                    >
                        <ChevronRight className="size-5" />
                    </button>
                </div>
            )}
        </div>
    )
}
