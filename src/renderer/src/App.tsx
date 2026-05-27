import { HashRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/dashboard/Home"
import { Show, SignIn, SignInButton, SignUpButton,  } from "@clerk/react"

function App(): React.JSX.Element {
  return (
    // <HashRouter>
    //   <Routes>
    //     <Show when="signed-out">
    //       <Route path="/" element={<Home />} />
    //     </Show>
    //     <Show when="signed-in">
    //       <Route path="/sign-in/*" element={<SignInPage />} />
    //       <Route path="/sign-up/*" element={<SignInPage />} />
    //     </Show>
    //   </Routes>
    // </HashRouter>
    <HashRouter>
        <Routes>
            <Route
              path="/" 
              element={
              <Show fallback={<p>Users that are signed-out can see this.</p>} when="signed-in">
                <p>Users that are signed-in can see this.</p>
              </Show>
              }
            />             
        </Routes>
    </HashRouter>
  )
}

export default App
