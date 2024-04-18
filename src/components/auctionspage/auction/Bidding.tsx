'use client'

import { useEffect, useState } from 'react'
import socket from '../../../utils/socket'
import PlacebidAction from '../../../actions/placebid.action'
import FormSubmit from '../../../atoms/FormSubmit'
import { useFormState } from 'react-dom'

interface BiddingProps {
  topBid: any | undefined
  auctionId: string
}

export interface PlacebidFormStateType {
  success?: boolean
  errors: {
    _form?: string[]
    price?: string[]
  }
}

const Bidding = ({ topBid, auctionId }: BiddingProps) => {
  const [bid, setBid] = useState(topBid)
  const bidValue = bid ? bid.price : 0

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit('place-bid-join', auctionId)
      })

      socket.on('new_bid_placed', (data: any) => {
        setBid(data)
      })
    }
  }, [auctionId])

  const bindedAction = PlacebidAction.bind(null, auctionId, bidValue)

  const initialState: PlacebidFormStateType = {
    success: false,
    errors: { _form: [] },
  }

  const [formState, formAction] = useFormState(bindedAction, initialState)

  return (
    <div className="p-4 my-4">
      <h5 className="font-light text-xs lg:text-sm text-center">Top Bid</h5>
      <div
        className="flex items-center justify-around my-4 py-8 border rounded-md bg-blue-100 border-secondary animate-border-flash"
        key={bidValue}
      >
        <h5 className="text-lg lg:text-2xl font-semibold">{bidValue}</h5>
        <p className="text-sm">
          <span className="font-bold">{bid?.username}</span>
        </p>
      </div>

      <form
        className="w-full grid grid-cols-2 gap-4 items-center"
        action={formAction}
      >
        <input
          className="p-2 rounded-md border-2"
          type="number"
          step={0.05}
          name="price"
          id="price"
          required
        />

        <FormSubmit
          buttonText="Place Bid"
          pendingText="Placing..."
          className="!my-0"
        />
        {formState.success && (
          <p className="text-sm text-green-700 font-bold">
            {'Bid Placed successfully'}
          </p>
        )}

        <p className="text-sm text-red-700">
          {formState?.errors['price']?.join(',')}
        </p>
        <p className="text-sm text-red-700">
          {formState?.errors['_form']?.join(',')}
        </p>
      </form>
    </div>
  )
}

export default Bidding
