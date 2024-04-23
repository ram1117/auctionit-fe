import Link from 'next/link'
import React from 'react'

interface AlertItemProps {
  alert: any
}

const AlertItem = ({ alert }: AlertItemProps) => {
  return (
    <Link href={alert.href}>
      <li className="border rounded-lg p-2 flex gap-2 items-center">
        <div className="">
          <p className="p-2 text-2xl font-black">!</p>
        </div>
        <div>
          <h4 className="text-lg font-bold">{alert.title}</h4>
          <h5 className="text-sm">${alert.data}</h5>
        </div>
      </li>
    </Link>
  )
}

export default AlertItem
