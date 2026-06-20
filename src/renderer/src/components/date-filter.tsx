import { Button } from "./ui/button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./ui/popover"
import { formatDateRange } from "@renderer/lib/utils"
import { useDateFilter } from "@renderer/hooks/use-date-filter"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { subDays } from "date-fns"
import { ChevronDown } from "lucide-react"
import { Calendar } from "./ui/calendar"

export const DateFilter = () => {
    const { from, to, setDateRange } = useDateFilter()

    const [date, setDate] = useState<DateRange | undefined>({ from, to })

    const onApply = () => {
        if (date?.from && date?.to) {
            setDateRange(date.from, date.to)
        }
    }

    const onReset = () => {
        setDate(undefined)
        setDateRange(subDays(new Date(), 30), new Date())
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={false}
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
                    disabled={false}
                    autoFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                <div className="p-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant="outline"
                        >
                            Resetar
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button
                            onClick={onApply}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Aplicar
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}
