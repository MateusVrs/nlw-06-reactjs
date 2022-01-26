import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkimg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question, QuestionProps } from '../components/Question'

import '../styles/room.scss'

import { useNavigate, useParams, Link } from 'react-router-dom'

import { useRoom } from '../hooks/useRoom'

import { ref, remove, update } from 'firebase/database'
import { database } from '../services/firebase'
import { ToggleDark } from '../components/ToggleDark'


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const navigate = useNavigate()
    const params = useParams<RoomParams>()
    const roomId = params.id!

    const { questions, title } = useRoom(roomId)

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
            await remove(ref(database, `rooms/${roomId}/questions/${questionId}`))
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isAnswered: true
        })
    }

    async function handleHighlightQuestion(question: QuestionProps, questionId: string) {
        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isHighlighted: !question.isHighlighted
        })
    }

    async function handleEndRoom() {
        await update(ref(database, `rooms/${roomId}`), {
            endedAt: new Date()
        })

        navigate('/')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to='/'><img src={logoImg} alt="Letmeask" /></Link>
                    <div>
                        <RoomCode code={roomId} />
                        <Button
                            isOutlined
                            onClick={handleEndRoom}
                        >
                            Encerrar sala
                        </Button>
                    </div>
                </div>
                <ToggleDark />
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >
                                            <img src={checkimg} alt="Marcar perguntar como respondida" />
                                        </button>

                                        <button
                                            type='button'
                                            onClick={() => handleHighlightQuestion(question, question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a perguntar" />
                                        </button>
                                    </>
                                )}

                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover perguntar" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}