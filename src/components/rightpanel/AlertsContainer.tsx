'use client'
import { useEffect, useState } from 'react'
import { onMessage } from 'firebase/messaging'
import { messaging } from '../../firebase'
import AlertItem from './AlertItem'

const AlertsContainer = () => {
  const [messages, setMessages] = useState<any>([])

  useEffect(() => {
    onMessage(messaging, (payload) => {
      setMessages((prev: any) => [...prev, payload])
    })
  }, [])

  return (
    <section className="py-4 h-screen overflow-y-auto">
      <h2 className="font-roboto text-lg lg:text-xl font-bold border-b py-4 tracking-wider">
        Alerts
      </h2>
      <ul className="flex flex-col gap-2 my-8">
        {messages.map((item: any) => (
          <AlertItem alert={item.data} key={item.messageId} />
        ))}
      </ul>
    </section>
  )
}

export default AlertsContainer
