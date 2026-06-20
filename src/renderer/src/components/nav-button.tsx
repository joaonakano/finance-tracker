import { Link } from "react-router"
import { cn } from "@renderer/lib/utils"
import { type LucideIcon } from "lucide-react"

type Props = {
    href: string
    label: string
    icon?: LucideIcon
    isActive?: boolean
}

export function NavButton({ href, label, icon: Icon, isActive }: Props) {
    return (
        <Link
            to={href}
            className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                    ? "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(26,43,74,0.25)]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            )}
        >
            {Icon && <Icon className="size-4" />}
            {label}
        </Link>
    )
}
