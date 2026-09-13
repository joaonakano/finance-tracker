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
        answer: "A importação de arquivos CSV segue uma regra fixa para evitar incompatibilidades: o usuário deve discriminar as colunas do arquivo com colunas existentes no sistema, como VALOR, DATA, BENEFICIÁRIO e (opcionalmente) OBSERVAÇÕES. Em seguida, deve informar ao menos uma conta e uma categoria para essas transações, podendo adicionar individualmente através dos campos ou na opção \"Aplicar a todos\".",
    },
    {
        question: "Como são calculadas as variações percentuais do dashboard?",
        answer: "As variações percentuais exibidas no dashboard são calculadas dividindo-se o valor do gasto pelo total de cada período (tanto para o mês anterior quanto para o mês atual). Em seguida, o sistema apura a diferença entre os valores proporcionais encontrados (mês anterior menos o mês atual) para identificar a oscilação. Com base nesse resultado, os percentuais são classificados como positivos (quando há crescimento), negativos (quando há redução) ou zero, sendo esta última opção aplicada quando não há dados suficientes em um dos períodos para realizar a comparação com precisão.",
    },
    {
        question: "Como eu vejo os gastos por contas?",
        answer: "Em qualquer módulo vai existir o botão Contas logo abaixo da mensagem de boas-vindas, esse botão pode ser clicado e alterado para uma conta existente no sistema. A partir da seleção, todas as transações que incluam a conta referida poderão ser visualizadas. É importante notar que é apenas uma conta por vez que será filtrada.",
    },
    {
        question: "Como faço para ver meus gastos?",
        answer: "As despesas podem ser visualizadas de duas formas: pelo painel de Dashboard ou pelo módulo de Transações. O sistema permite apenas a listagem das despesas com valor, beneficiário e data. Se for o caso de uma análise dessas transações, a Dashboard é mais indicada por apresentar o total e as datas de forma bem mais visual e compreensível.",
    },
    {
        question: "Como devo ler a dashboard?",
        answer: "A dashboard representa níveis de informações já calculadas: Disponível, Receitas e Despesas. O bloco Disponível representa o saldo restante de uma subtração simples entre Receitas e Despesas. O bloco Receitas indica a soma entre todas as transações positivas no sistema no período referido, enquanto o bloco Despesas indica as transações negativas. Os gráficos são divididos entre Transações e Ranking de Categorias. O gráfico de Transações apresenta os dias do período e uma correspondência nas datas em que houve pelo menos um registro de receita ou despesa. Por outro lado, o Ranking de Categorias exibe as categorias com mais despesas registradas durante esse intervalo.",
    },
    {
        question: "Como faço para criar uma conta de usuário?",
        answer: "A criação de conta pode ser acessada via tela de login > “Não tem uma conta? Registre-se”. O usuário deve estritamente informar um e-mail de acesso, um nome de usuário e senha para seguir com a criação. Esse processo é online, pois utiliza-se uma ferramenta de autenticação de terceiros.",
    },
    {
        question: "Funciona sem internet?",
        answer: "Não, o sistema, em sua fase atual, não permite utilização sem internet, pois o provedor de autenticação é externo e exige conexão integral para acesso aos módulos. Existe planejamento para inclusão de uma ferramenta de autenticação que não exija a conexão, no entanto, ainda não há data prévia para publicação.",
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
