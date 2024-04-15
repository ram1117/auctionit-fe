'use client'

import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || ''
)

export default socket
