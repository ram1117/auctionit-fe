import Link from 'next/link'
import React from 'react'
import ImageWrapper from '../../atoms/ImageWrapper'
import AlertIcon from '@/public/icons/alert.svg'

interface AlertItemProps {
  alert: any
}

const AlertItem = ({ alert }: AlertItemProps) => {
  return (
    <Link href={alert.href} target="_blank">
      <li className="border rounded-lg p-2 flex gap-2 items-center">
        <ImageWrapper
          src={AlertIcon}
          alt="alert icon"
          containerClassName="h-10 w-10 border rounded-full border-secondary"
          className="p-1"
        />
        <div>
          <h4 className="text-lg font-bold text-green-500">{alert.title}</h4>
          <h5 className="text-sm">${alert.data}</h5>
        </div>
      </li>
    </Link>
  )
}

export default AlertItem
