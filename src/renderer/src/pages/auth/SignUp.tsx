import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/react"
import { Loader2, UserPlus } from "lucide-react"
import { Link } from "react-router"
import logo from "../../../../../resources/logo.svg"

export const SignUpPage = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/80 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,20,40,0.08)] border border-white/80 bg-white/70 backdrop-blur-xl">
                {/* Left: form */}
                <div className="flex flex-col items-center justify-center px-8 py-14">
                    <div className="w-full max-w-sm space-y-8">
                        <div className="text-center space-y-2">
                            <img src={logo} alt="Logo" className="size-10 mx-auto mb-4 brightness-0" />
                            <h1 className="font-bold text-3xl text-slate-800 flex items-center justify-center gap-2">
                                <UserPlus className="size-6" />
                                Criar conta
                            </h1>
                            <p className="text-sm text-slate-500">
                                Registre-se para começar a usar o Finance Tracker
                            </p>
                        </div>

                        <ClerkLoaded>
                            <SignUp
                                signInUrl="/sign-in"
                                appearance={{
                                    elements: {
                                        footer: 'hidden'
                                    }
                                }}
                            />
                        </ClerkLoaded>
                        <ClerkLoading>
                            <div className="flex justify-center">
                                <Loader2 className="size-8 animate-spin text-slate-400" />
                            </div>
                        </ClerkLoading>

                        <p className="text-center text-sm text-slate-500">
                            Já tem uma conta?{" "}
                            <Link
                                to="/sign-in"
                                className="font-medium text-[#2d4a7a] hover:text-[#1a2b4a] underline underline-offset-4 transition-colors"
                            >
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right: brand panel */}
                <div className="hidden lg:flex flex-col items-center justify-center bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] px-10 py-14 text-white">
                    <img src={logo} alt="Logo" className="size-20 mb-6 brightness-0 invert" />
                    <h2 className="text-2xl font-bold mb-2">Finance Tracker</h2>
                    <p className="text-blue-200/70 text-center text-sm max-w-xs">
                        Controle suas finanças com clareza e simplicidade.
                    </p>
                </div>
            </div>
        </div>
    )
}
