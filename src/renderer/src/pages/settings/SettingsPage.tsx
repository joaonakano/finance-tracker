import { UserProfile, ClerkLoaded, ClerkLoading } from "@clerk/react"
import { Loader2, UserCog } from "lucide-react"
import { DashboardLayout } from "@renderer/components/layout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="pb-10 space-y-6">
        {/* Page heading */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-linear-to-br from-[#1a2b4a] to-[#2d4a7a] flex items-center justify-center shadow-sm">
            <UserCog className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Configurações</h1>
            <p className="text-sm text-slate-500">Gerencie sua conta e preferências do sistema</p>
          </div>
        </div>

        {/* Clerk Account Management */}
        <ClerkLoading>
          <div className="flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </div>
        </ClerkLoading>

        <ClerkLoaded>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-semibold text-slate-800">Conta</h2>
              <p className="text-sm text-slate-500">
                Atualize seus dados de perfil, e-mail, senha e conexões
              </p>
            </div>
            <div className="[&_.cl-rootBox]:w-full [&_.cl-rootBox]:rounded-none [&_.cl-rootBox]:shadow-none [&_.cl-cardBox]:w-full [&_.cl-cardBox]:shadow-none [&_.cl-cardBox]:border-0 [&_.cl-cardBox]:rounded-none [&_.cl-card]:w-full [&_.cl-card]:shadow-none [&_.cl-card]:border-0 [&_.cl-card]:rounded-none [&_.cl-navbar]:hidden [&_.cl-main]:w-full [&_.cl-pageScrollBox]:p-0">
              <UserProfile routing="path" path="/settings" />
            </div>
          </div>
        </ClerkLoaded>
      </div>
    </DashboardLayout>
  )
}
