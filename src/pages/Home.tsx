import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import logInImg from '../assets/images/log-in.svg'

import '../styles/auth.scss'

import { Button } from '../components/Button'

import { useNavigate } from 'react-router-dom'

export function Home() {
    const navigate = useNavigate()

    function handleCreateRoom() {
        navigate('/rooms/new')

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
                    <button onClick={handleCreateRoom} >
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className='div-line'>
                        <hr />ou entre em uma sala<hr />
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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