import { getMessaging, getToken } from 'firebase/messaging'
import firebaseApp from '../firebase'

const getPushNotificationToken = async () => {
  const messaging = getMessaging(firebaseApp)

  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    const token = await getToken(messaging, { vapidKey: process.env.VAPID_KEY })
    return token
  } else console.error('error getting notification token')
  return null
}

export default getPushNotificationToken
