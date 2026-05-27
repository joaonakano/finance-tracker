import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/dashboard/Home"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App(): React.JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App
