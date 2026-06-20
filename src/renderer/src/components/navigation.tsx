import { Menu, PieChart, ArrowLeftRight, Wallet, Tag, Settings } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { useMedia } from "react-use"
import { useState } from "react"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const routes = [
    {
        href: "/",
        label: "Dashboard",
        icon: PieChart,
    },
    {
        href: "/transactions",
        label: "Transações",
        icon: ArrowLeftRight,
    },
    {
        href: "/accounts",
        label: "Contas",
        icon: Wallet,
    },
    {
        href: "/categories",
        label: "Categorias",
        icon: Tag,
    },
    {
        href: "/settings",
        label: "Configurações",
        icon: Settings,
    },
]

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    const isMobile = useMedia("(max-width: 1024px)", false)

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname

    const onClick = (href: string) => {
        navigate(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="font-normal border-slate-200 hover:bg-slate-50 transition mb-6"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-1 pt-12">
                        {routes.map((route) => {
                            const isActive = pathname === route.href
                            const Icon = route.icon
                            return (
                                <Button
                                    key={route.href}
                                    variant={isActive ? "secondary" : "ghost"}
                                    onClick={() => onClick(route.href)}
                                    className="w-full justify-start gap-3"
                                >
                                    <Icon className="size-4" />
                                    {route.label}
                                </Button>
                            )
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className="hidden lg:flex items-center gap-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm mb-8 flex-wrap">
            {routes.map((route) => {
                const isActive = pathname === route.href
                const Icon = route.icon
                return (
                    <button
                        key={route.href}
                        onClick={() => onClick(route.href)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                            isActive
                                ? "bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(26,43,74,0.25)]"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                        }`}
                    >
                        <Icon className="size-4" />
                        {route.label}
                    </button>
                )
            })}
        </nav>
    )
}
