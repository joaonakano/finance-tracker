import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { PropsSingle } from "react-day-picker"

import { cn } from "@renderer/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ptBR } from "date-fns/locale"

type Props = {
    value?: Date;
    onChange?: PropsSingle["onSelect"];
    disabled?: boolean
}

export const DatePicker = ({
    value,
    onChange,
    disabled
}: Props) => {
    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal cursor-pointer",
                        !value && "text-muted-foreground",
                    )}   
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value ? format(value, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar 
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                    autoFocus
                    locale={ptBR}
                />
            </PopoverContent>
        </Popover>
    )
}