import { get, ref } from "firebase/database"
import { database } from "../../services/firebase"

import React, { ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"

type RoomParams = {
    id: string;
}

type ProtectedRouteProps = {
    element: ReactNode
}

type RoomValueType = {
    userId: string, 
    title: string
}

export function ProtectedRoute(props: ProtectedRouteProps) {
    const params = useParams<RoomParams>()
    const [canEnter, setCanEnter] = useState(false)
    const { user } = useAuth()
    const roomId = params.id!

    useEffect(() => {
        async function canEnterInRoom(roomId: string) {
            await get(ref(database, `rooms/${roomId}`)).then(roomInfo => {
                const roomValue: RoomValueType = roomInfo.val()
                const result = roomValue.userId === user?.id
                setCanEnter(result)
            })
        }

        canEnterInRoom(roomId)

    }, [roomId, user?.id])

    return (
        <React.Fragment>
            {!canEnter || props.element }
        </React.Fragment>
    )
}