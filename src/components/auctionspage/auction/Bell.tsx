'use client'

import ImageWrapper from '../../../atoms/ImageWrapper'
import BellEnabled from '@/public/icons/bell.svg'
import BellDisabled from '@/public/icons/bell-disabled.svg'
import LoadingIcon from '@/public/icons/loading.svg'
import {
  getTokenFromDatabase,
  postNotificationToken,
  updateNotification,
} from '../../../services/apiService'
import setPushNotificationToken from '../../../utils/usePushNotificationToken'
import { useState } from 'react'

interface BellProps {
  auctionId: string
  enabled: boolean
}

export interface NotificationActionType {
  success?: boolean
  errors?: string[]
}

const Bell = ({ auctionId, enabled }: BellProps) => {
  const [iconEnabled, setIconEnabled] = useState(enabled)
  const BellIcon = iconEnabled ? BellDisabled : BellEnabled

  const [errors, setErrors] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const existingTokens = await getTokenFromDatabase()
    const deviceToken = await setPushNotificationToken()

    if (deviceToken && !existingTokens.includes(deviceToken)) {
      const response = await postNotificationToken(deviceToken)
      if (response.status !== 201) {
        setErrors('Unable to set notification')
      }
    }
    const notificationResponse = await updateNotification(auctionId, enabled)
    if (notificationResponse.status !== 201) {
      setErrors('Unable to set notification')
    }
    setIconEnabled((prev) => !prev)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <ImageWrapper
          src={loading ? LoadingIcon : BellIcon}
          alt={loading ? 'Loading Icon' : 'Notification Bell Icon'}
          containerClassName="h-8 w-8 lg:h-10 lg:w-10 shadow-lg shadow-slate-300 rounded-full"
          className="p-2"
        />
      </button>
      {errors && <p></p>}
    </form>
  )
}

export default Bell