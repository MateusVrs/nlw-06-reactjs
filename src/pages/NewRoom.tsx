import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import logInImg from '../assets/images/log-in.svg'

import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom() {
    return(
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
                    <form>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">
                            <img src={logInImg} alt="LogIn" />
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente: <a href="/">Clique aqui</a></p>
                </div>
            </main>
        </div>
    )
}