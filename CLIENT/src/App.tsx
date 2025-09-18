import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useUserContext } from "./context/UserContext"

function App() {

  const { user } = useUserContext();
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={!user ? <Navigate to="/login" /> : <Dashboard />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App