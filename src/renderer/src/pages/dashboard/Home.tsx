import { Button } from "@renderer/components/ui/button";
import { DashboardLayout } from "./components/layout";
import { useGetAccounts } from "../accounts/api/use-get-accounts";

export default function Home() {

    const { accounts, isLoading, error, accountId } = useGetAccounts()

    const lidarComClique = () => {
        console.log("Contas carregadas:", accounts);
        console.log("ID do usuário:", accountId);
    }
    
    if (isLoading) return <div>Carregando contas...</div>;
    if (error) return <div>Erro: {error.message}</div>;

    return (
        <>
            <DashboardLayout>
                <Button
                    onClick={lidarComClique}
                >Clique em Mim</Button>
            </DashboardLayout>
        </>
    )
}