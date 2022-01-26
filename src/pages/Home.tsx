import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logInImg from '../assets/images/log-in.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { ref, get } from 'firebase/database'
import { ToggleDark } from '../components/ToggleDark'

export function Home() {
    const navigate = useNavigate()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if(roomCode.trim() === ''){
            return
        }

        const roomRef = await get(ref(database, `rooms/${roomCode}`))

        if(!roomRef.exists()){
            alert('Room does not exists')
            return
        }

        if(roomRef.val().endedAt) {
            alert("Room alredy closed")
            return
        }

        navigate(`/rooms/${roomCode}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <ToggleDark />
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className='div-line'>
                        <hr />ou entre em uma sala<hr />
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            <img src={logInImg} alt="LogIn" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}