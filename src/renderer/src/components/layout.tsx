import { Header } from "@renderer/components/header"

type Props = {
    children: React.ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100/80 flex justify-center items-start py-6 px-4">
            <div className="max-w-screen-2xl w-full bg-white/70 backdrop-blur-xl rounded-3xl p-8 lg:p-9 shadow-[0_20px_60px_rgba(0,20,40,0.08)] border border-white/80">
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}
