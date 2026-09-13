import { ArrowLeft } from "lucide-react"

/**
 * O SDK do Clerk mantém o progresso de um fluxo (ex: verificação de e-mail,
 * redefinição de senha) no seu próprio estado interno, que não é limpo por
 * uma navegação normal do react-router entre /sign-in e /sign-up. Por isso,
 * um botão "Voltar" precisa forçar um reload completo da página para
 * reiniciar o Clerk do zero — o mesmo efeito de fechar e reabrir o app.
 */
export const RestartAuthFlowButton = () => {
    const handleRestart = () => {
        if (window.location.pathname === "/sign-in") {
            window.location.reload()
        } else {
            window.location.pathname = "/sign-in"
        }
    }

    return (
        <button
            type="button"
            onClick={handleRestart}
            title="Reiniciar o formulário e voltar para o login"
            className="fixed top-6 left-6 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-500 shadow-sm backdrop-blur-xl transition-colors hover:bg-white hover:text-slate-800 cursor-pointer"
        >
            <ArrowLeft className="size-4" />
            Voltar
        </button>
    )
}
