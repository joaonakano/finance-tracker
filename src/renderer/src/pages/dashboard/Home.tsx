import { DashboardLayout } from "./components/layout";

export default function Home() {
    const lidarComClique = async () => {
        try {
            const resposta = await window.api.accounts.getAll()

            console.log(resposta)
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
            <DashboardLayout>
                <button onClick={lidarComClique}>
                    Teste banco
                </button>
            </DashboardLayout>
        </>
    )
}