import { FileExclamationPoint } from "lucide-react";

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-500 px-4">
            <div className="flex flex-col items-center text-center max-w-md bg-white backdrop-blur-md p-8 rounded-2xl shadow-lg">

                <div className="mb-4 rounded-full bg-neutral-200 p-4">
                    <FileExclamationPoint className="w-10 h-10 text-green-600" />
                </div>
                
                <h1 className="font-bold text-4xl tracking-tight">
                    Erro 404!
                </h1>

                <p className="mt-2 text-base">
                    Página não encontrada. Verifique o endereço ou volte para uma área válida do sistema.
                </p>

                <button
                    className="mt-6 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    onClick={() => window.history.back()}
                >
                    Voltar
                </button>
            </div>
        </div>
    )
}