import './styles/global.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import { SignInPage } from './pages/auth/SignIn'
import Home from './pages/dashboard/Home'

import { SignUpPage } from './pages/auth/SignUp'
import { ProtectedRoute } from './routes/ProtectedRoute'

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
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
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
