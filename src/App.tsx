import { Home } from "./pages/Home"
import { NewRoom } from './pages/NewRoom'
import { Room } from "./pages/Room";

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { AuthContextProvider } from './contexts/AuthContext'
import { DarkContextProvider } from "./contexts/DarkContext";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoom } from "./pages/AdminRoom";


function App() {

  return (
    <BrowserRouter>
      <DarkContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms/new" element={<NewRoom />} />
            <Route path="/rooms/:id" element={<Room />} />

            <Route path="/admin/rooms/:id" element={<ProtectedRoute element={<AdminRoom />} />} />
          </Routes>
        </AuthContextProvider>
      </DarkContextProvider>
    </BrowserRouter>
  );
}

export default App;
