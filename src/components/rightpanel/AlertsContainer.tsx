'use client'
import { useEffect, useState } from 'react'
import { onMessage } from 'firebase/messaging'
import firebaseApp from '../../firebase'
import AlertItem from './AlertItem'
import { getMessaging } from 'firebase/messaging'
import {
  getTokenFromDatabase,
  postNotificationToken,
} from '../../services/apiService'
import getPushNotificationToken from '../../utils/usePushNotificationToken'

const AlertsContainer = () => {
  const [messages, setMessages] = useState<any>([])

  const handleClick = async () => {
    try {
      const databaseTokens = await getTokenFromDatabase()
      const token = await getPushNotificationToken()
      if (token && !databaseTokens.includes(token)) {
        await postNotificationToken(token)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('showing notifications')
    const messaging = getMessaging(firebaseApp)
    onMessage(messaging, (payload) => {
      setMessages((prev: any) => [...prev, payload])
    })
  })

  return (
    <section className="py-4 h-screen overflow-y-auto">
      <h2 className="font-roboto text-lg lg:text-xl font-bold border-b py-4 tracking-wider">
        Alerts
      </h2>
      <button className="border-2 p-2" onClick={handleClick}>
        Enable Notifications
      </button>
      <ul className="flex flex-col gap-2 my-8">
        {messages.map((item: any) => (
          <AlertItem alert={item.data} key={item.messageId} />
        ))}
      </ul>
    </section>
  )
}

export default AlertsContainer
