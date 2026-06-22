import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, useNavigate } from 'react-router'

import { RoutesApp } from '@/routes/routes'
import { QueryProvider } from '@/providers/query-provider'
import { SheetProvider } from './providers/sheet-provider'

import { ptBR } from '@clerk/localizations'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Chave do Clerk não encontrada no .env")
}

function RootLayout() {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
      afterSignOutUrl='/sign-in'
      // @ts-expect-error – @clerk/localizations v4.x schema desatualizado vs @clerk/react v6.x
      localization={ptBR}
    >
      <QueryProvider>
        <SheetProvider />
        <Toaster />
        <RoutesApp />
      </QueryProvider>
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
  </StrictMode>
)
