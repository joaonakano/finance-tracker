import { Menu } from "lucide-react"
import { useLocation, useNavigate } from "react-router"
import { useMedia } from "react-use"
import { useState } from "react"

import { NavButton } from "./nav-button"
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
    },
    {
        href: "/transactions",
        label: "Despesas",
    },
    {
        href: "/accounts",
        label: "Contas",
    },
    {
        href: "/categories",
        label: "Categorias",
    },
    {
        href: "/settings",
        label: "Configurações",
    }
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
                        className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-12">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }
    
    return (
        <nav className="hidden lg:flex items-center gap-x-2 flex-wrap">
            {routes.map((route) => (
                <NavButton
                    key={route.href}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}