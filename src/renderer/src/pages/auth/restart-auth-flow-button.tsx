import { ArrowLeft } from "lucide-react"

/**
 * O SDK do Clerk mantém o progresso de um fluxo (ex: verificação de e-mail,
 * redefinição de senha) no seu próprio estado interno, que não é limpo por
 * uma navegação normal do react-router entre /sign-in e /sign-up. Por isso,
 * um botão "Voltar" precisa forçar um reload completo da página para
 * reiniciar o Clerk do zero — o mesmo efeito de fechar e reabrir o app.
 *
 * Fica ancorado dentro do card (posição absoluta relativa ao painel do
 * formulário), não na viewport, para acompanhar o card em qualquer resolução.
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
            title="Voltar"
            aria-label="Voltar"
            className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-900/5 hover:text-slate-600 cursor-pointer"
        >
            <ArrowLeft className="size-4" />
        </button>
    )
}
