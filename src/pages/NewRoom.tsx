import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logInImg from '../assets/images/log-in.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { ref, update, push, child } from 'firebase/database'
import { database } from '../services/firebase'

import '../styles/auth.scss'

import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'


export function NewRoom() {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === ''){
            return;
        }

        const newPostRef = push(child(ref(database), 'rooms'))
        const newRoomData = {
            title: newRoom,
            userId: user?.id
        }

        const firebaseRoom = await update(newPostRef, newRoomData)

        navigate(`/rooms/${newPostRef.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            <img src={logInImg} alt="LogIn" />
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente: <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}