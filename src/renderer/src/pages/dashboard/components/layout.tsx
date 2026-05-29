import { Header } from "@renderer/components/Header"

type Props = {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
    return(
        <>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    )
}