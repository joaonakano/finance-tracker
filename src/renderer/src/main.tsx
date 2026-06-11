import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, useNavigate } from 'react-router'

import { RoutesApp } from '@/routes/routes'
import { QueryProvider } from '@/providers/query-provider'
import { SheetProvider } from './providers/sheet-provider'

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
    >
      <QueryProvider>
        <SheetProvider />
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
