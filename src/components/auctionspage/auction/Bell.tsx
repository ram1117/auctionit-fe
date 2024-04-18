'use client'

import ImageWrapper from '../../../atoms/ImageWrapper'
import BellIcon from '@/public/icons/bell.svg'
import BellIconLight from '@/public/icons/bell-lite.svg'
import { useFormState } from 'react-dom'
import NotificationAction from '../../../actions/notification.action'
import { usePathname } from 'next/navigation'

interface BellProps {
  auctionId: string
  enabled: boolean
}

export interface NotificationActionType {
  success?: boolean
  errors?: string[]
}

const Bell = ({ auctionId, enabled }: BellProps) => {
  const path = usePathname()

  const initialsState: NotificationActionType = { errors: [] }
  const bindedAction = NotificationAction.bind(null, auctionId, enabled, path)
  const [formState, formAction] = useFormState(bindedAction, initialsState)
  const Bell = enabled ? BellIconLight : BellIcon
  const bellStyle = enabled ? 'bg-button-primary' : ' bg-white'

  return (
    <form action={formAction}>
      <button type="submit">
        <ImageWrapper
          src={Bell}
          alt="Notification Bell Icon"
          containerClassName={`h-8 w-8 lg:h-10 lg:w-10 shadow-lg shadow-slate-300 rounded-full ${bellStyle}`}
          className="p-2"
        />
      </button>
      {formState.errors && <p></p>}
    </form>
  )
}

export default Bell
