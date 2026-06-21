import { ClerkLoaded, ClerkLoading, useUser, useClerk } from "@clerk/react"
import { Loader2, Bell, HelpCircle, ChevronDown, LogOut } from "lucide-react"
import { useState } from "react"

import { HeaderLogo } from "@/components/header-logo"
import { Navigation } from "@/components/navigation"
import { WelcomeMsg } from "@/components/welcome-msg"

export function Header() {
    const { user, isLoaded } = useUser()
    const { signOut } = useClerk()
    const [profileOpen, setProfileOpen] = useState(false)

    const initials = isLoaded && user
        ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase()
        : "??"

    const displayName = user?.fullName ?? user?.username ?? "Usuário"

    return (
        <header className="mb-8">
            {/* Top row: logo + actions */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <HeaderLogo />

                <div className="flex items-center gap-4">
                    {/* Notification bell */}
                    <button
                        className="relative size-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:border-[#2d4a7a] hover:text-[#2d4a7a] transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
                        title="Notificações"
                    >
                        <Bell className="size-[18px]" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                            3
                        </span>
                    </button>

                    {/* Help button */}
                    <button
                        className="size-11 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:border-[#2d4a7a] hover:text-[#2d4a7a] transition-all hover:-translate-y-0.5 hover:shadow-sm cursor-pointer"
                        title="Ajuda"
                    >
                        <HelpCircle className="size-[18px]" />
                    </button>

                    {/* Loading */}
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400" />
                    </ClerkLoading>

                    {/* User profile */}
                    <ClerkLoaded>
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-[#2d4a7a] hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                            >
                                <div className="size-[38px] rounded-full bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center text-white font-semibold text-[15px]">
                                    {initials}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="font-semibold text-sm text-slate-800">
                                        {displayName}
                                    </span>
                                    <span className="text-[11px] text-slate-500 font-medium">
                                        Administrador
                                    </span>
                                </div>
                                <ChevronDown className="size-3 text-slate-400 ml-1" />
                            </button>

                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg z-20 py-1">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="font-semibold text-sm text-slate-800">
                                                {displayName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {user?.primaryEmailAddress?.emailAddress}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                        >
                                            <LogOut className="size-4" />
                                            Sair
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </ClerkLoaded>
                </div>
            </div>

            {/* Navigation tabs */}
            <Navigation />

            {/* Welcome message */}
            <WelcomeMsg />
        </header>
    )
}
