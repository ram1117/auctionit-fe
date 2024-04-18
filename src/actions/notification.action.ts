'use server'
import { revalidatePath } from 'next/cache'
import { NotificationActionType } from '../components/auctionspage/auction/Bell'
import { postNotification } from '../services/apiService'

const NotificationAction = async (
  auctionId: string,
  enabled: boolean,
  path: string
): Promise<NotificationActionType> => {
  try {
    const response = await postNotification(auctionId, enabled)

    if (response.status !== 201) {
      const error = await response.json()
      return { errors: [error.message] }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: [error.message] }
    }
    return { errors: ['Soemthing went wrong.'] }
  }

  revalidatePath(path)
  return { success: true }
}

export default NotificationAction
