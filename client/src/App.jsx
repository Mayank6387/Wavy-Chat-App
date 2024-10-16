import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/auth/Auth"
import Chat from "./pages/chat/chat"
import Profile from "./pages/profile/Profile"

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="*" element={<Navigate to="/auth"/>}></Route>
      </Routes>
    </>
  )
}

export default App
