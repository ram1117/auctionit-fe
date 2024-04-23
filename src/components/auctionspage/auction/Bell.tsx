'use client'

import ImageWrapper from '../../../atoms/ImageWrapper'
import BellEnabled from '@/public/icons/bell.svg'
import BellDisabled from '@/public/icons/bell-disabled.svg'
import LoadingIcon from '@/public/icons/loading.svg'
import { useState } from 'react'
import getPushNotificationToken from '../../../utils/usePushNotificationToken'
import { UpdateNotificationAction } from '../../../actions/data/dataserveractions'

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

    const fcmToken = await getPushNotificationToken()
    if (fcmToken) {
      const notificationResponse = await UpdateNotificationAction(
        auctionId,
        enabled,
        fcmToken
      )
      if (notificationResponse.error) {
        setErrors('Unable to set notification')
      }
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
          containerClassName="h-8 w-8 lg:h-10 lg:w-10 shadow-md shadow-slate-300 rounded-full bg-white"
          className="p-2"
        />
      </button>
      {errors && <p></p>}
    </form>
  )
}

export default Bell
