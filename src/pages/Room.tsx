import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'

import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ref, push, child, update, onChildAdded, get, DataSnapshot, onChildRemoved } from 'firebase/database'
import { database } from '../services/firebase'

type FirebaseQuestions = {
    content: string,
    author: {
        name: string,
        avatar: string,
    },
    isHighlighted: boolean,
    isAnswered: boolean
}

type RoomParams = {
    id: string;
}

type Question = {
    id: string,
    content: string,
    author: {
        name: string,
        avatar: string,
    },
    isHighlighted: boolean,
    isAnswered: boolean
}

export function Room() {
    const { user } = useAuth()
    const params = useParams<RoomParams>()
    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('')

    const roomId = params.id!

    function handleRoomQuestions(question: DataSnapshot, isAdd: boolean) {
        const questionObject = question.val()
        const firebaseQuestion: FirebaseQuestions = questionObject

        const structuredQuestion = {
            id: question.key!,
            ...firebaseQuestion
        }

        if(isAdd === true) {
            setQuestions(oldQuestions => [...oldQuestions, structuredQuestion])
        }else {
            setQuestions(oldQuestions => oldQuestions.filter(x => x.id !== question.key))
        }
    }

    useEffect(() => {
        const roomRef = ref(database, `rooms/${roomId}`)
        const questionsRef = ref(database, `rooms/${roomId}/questions`)

        get(roomRef).then(result => {
            setTitle(result.val().title)
        })

        onChildAdded(questionsRef, question => {
            handleRoomQuestions(question, true)
        })

        onChildRemoved(questionsRef, question => {
            handleRoomQuestions(question, false)
        })

    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()
        if (newQuestion.trim() === '') {
            return
        }

        if (!user) {
            throw new Error('You must be logged in')
        }

        const questionsRef = push(child(ref(database), `rooms/${roomId}/questions`))
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await update(questionsRef, question)

        setNewQuestion('')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder='O que você quer perguntar?'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {user ? (
                            <div className='user-info'>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                {JSON.stringify(questions)}
            </main>
        </div>
    )
}