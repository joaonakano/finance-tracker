import { HelpCircle } from "lucide-react"

import { DashboardLayout } from "@renderer/components/layout"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@renderer/components/ui/accordion"

// Conteúdo provisório — substitua as perguntas e respostas abaixo pelo
// texto definitivo do FAQ quando estiver pronto.
const FAQ_ITEMS = [
    {
        question: "Como faço para adicionar um gasto?",
        answer: "Gastos e receitas são entendidos como transações pelo sistema, então, é necessário acessar o módulo de Transações e clicar em “Adicionar transação”, incluir as informações de Data, Valor, Beneficiário, Conta e Categoria, pois essas são obrigatórias. Em seguida, deve-se confirmar o valor como gasto ao clicar no botão de “+” em verde, ele irá mudar para uma coloração avermelhada, indicando uma despesa.",
    },
    {
        question: "Como funciona a importação de transações via CSV?",
        answer: "A importação de arquivos CSV segue uma regra fixa para evitar incompatibilidades: o usuário deve discriminar as colunas do arquivo com colunas existentes no sistema, como VALOR, DATA, BENEFICIÁRIO e (opcionalmente) OBSERVAÇÕES. Em seguida, deve-se informar ao menos uma conta e uma categoria para essas transações, podendo adicionar individualmente através dos campos ou na opção \"Aplicar a todos\".",
    },
    {
        question: "Como são calculadas as variações percentuais do dashboard?",
        answer: "testestestestes",
    },
    {
        question: "Posso gerenciar múltiplas contas e categorias?",
        answer: "testestestest",
    },
    {
        question: "Meus dados ficam salvos onde?",
        answer: "testestestestes.",
    },
]

export default function FaqPage() {
    return (
        <DashboardLayout>
            <div className="pb-10 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center shadow-sm">
                        <HelpCircle className="size-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Perguntas frequentes</h1>
                        <p className="text-sm text-slate-500">Tire suas dúvidas sobre o uso do sistema</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-6">
                    <Accordion type="single" collapsible>
                        {FAQ_ITEMS.map((item, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-slate-800">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-500">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </DashboardLayout>
    )
}
