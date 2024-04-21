'use client'

import { useEffect, useState } from 'react'
import PlacebidAction from '../../../actions/placebid.action'
import FormSubmit from '../../../atoms/FormSubmit'
import { useFormState } from 'react-dom'
import { Socket, io } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'

interface BiddingProps {
  topBid: any | undefined
  auctionId: string
  auctionEnded: boolean
  userRole: string
  isCancelled: boolean
}

export interface PlacebidFormStateType {
  success?: boolean
  errors: {
    _form?: string[]
    price?: string[]
  }
}

const Bidding = ({
  topBid,
  auctionId,
  auctionEnded,
  userRole,
  isCancelled,
}: BiddingProps) => {
  const [bid, setBid] = useState(topBid)
  const bidValue = bid ? bid.price : 0

  useEffect(() => {
    const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || ''
    )
    if (socket) {
      socket.on('connect', () => {
        socket.emit('place-bid-join', auctionId)
      })
      socket.on('new_bid_placed', (data: any) => {
        setBid(data)
      })
    }
  })

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
        className="flex items-center justify-center my-4 py-8 border rounded-md bg-blue-100 border-secondary animate-border-flash"
        key={bidValue}
      >
        {bidValue <= 0 && (
          <h5 className="text-lg lg:text-2xl font-semibold">No Bids yet</h5>
        )}
        {bidValue > 0 && (
          <div className="w-full flex gap-2 justify-around items-center">
            <h5 className="text-lg lg:text-2xl font-semibold">$ {bidValue}</h5>
            <p className="text-sm">
              <span className="font-bold">{bid?.username}</span>
            </p>
          </div>
        )}
      </div>
      {!auctionEnded && userRole === 'user' && !isCancelled && (
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
      )}
    </div>
  )
}

export default Bidding
