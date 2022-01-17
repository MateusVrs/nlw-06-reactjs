import { Home } from "./pages/Home"
import { NewRoom } from './pages/NewRoom'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createContext, useState } from 'react'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from "./services/firebase"

type User = {
  id: string
  name: string
  avatar: string
}

type AuthcontextType = {
  user: User | undefined
  signInWithGoogle: () => void
}

const Authcontext = createContext({} as AuthcontextType)

function App() {
  const [user, setUser] = useState<User>();

  function signInWithGoogle(){
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then(result => {
      if(result.user) {
        const { displayName, photoURL, uid } = result.user

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.')
        }
        
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
        
    })
  }

  return (
    <BrowserRouter>
      <Authcontext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="rooms/new" element={<NewRoom />} />
        </Routes>
      </Authcontext.Provider>
    </BrowserRouter>
  );
}

export default App;
