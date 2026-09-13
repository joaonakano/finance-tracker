import { Header } from "@renderer/components/header"

type Props = {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen w-full bg-linear-to-br from-slate-50 to-slate-100/80">
            <div className="w-full px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
