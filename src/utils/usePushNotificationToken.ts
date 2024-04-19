import { getToken } from 'firebase/messaging'
import { messaging } from '../firebase'

const setPushNotificationToken = async () => {
  const permission = await Notification.requestPermission()

  if (permission === 'granted') {
    const token = await getToken(messaging, { vapidKey: process.env.VAPID_KEY })
    return token
  } else console.error('error getting notification token')
  return null
}

export default setPushNotificationToken
