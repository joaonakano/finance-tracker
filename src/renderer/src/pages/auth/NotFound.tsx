import { FileQuestion } from "lucide-react"
import { Link } from "react-router"

export function NotFoundPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/80 flex items-center justify-center p-4">
            <div className="flex flex-col items-center text-center max-w-md bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,20,40,0.08)] border border-white/80">
                <div className="mb-6 rounded-2xl bg-slate-100 p-4">
                    <FileQuestion className="size-10 text-[#2d4a7a]" />
                </div>

                <h1 className="font-bold text-4xl tracking-tight text-slate-800">
                    Erro 404
                </h1>

                <p className="mt-3 text-sm text-slate-500">
                    Página não encontrada. Verifique o endereço ou volte para uma área válida do sistema.
                </p>

                <div className="flex gap-3 mt-8">
                    <button
                        className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition cursor-pointer font-medium text-sm"
                        onClick={() => window.history.back()}
                    >
                        Voltar
                    </button>
                    <Link
                        to="/"
                        className="px-5 py-2.5 rounded-xl bg-[#1a2b4a] text-white hover:bg-[#2d4a7a] transition font-medium text-sm"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
