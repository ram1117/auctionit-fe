'use client'

import { useEffect, useState } from 'react'
import socket from '../../../utils/socket'

interface BiddingProps {
  topBid: any | undefined
  auctionId: string
}

const Bidding = ({ topBid, auctionId }: BiddingProps) => {
  const [bid, setBid] = useState(topBid)
  const bidValue = bid ? `$ ${bid.price}` : 'No bids'

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

      <form className="w-full grid grid-cols-2 gap-4">
        <input
          className="p-2 rounded-md border-2 border-button-primary"
          type="number"
          max={9999999}
          min={bid?.price}
          required
        />
        <button
          type="submit"
          className="bg-button-primary text-white rounded-md shadow-md shadow-slate-400"
        >
          Place Bid
        </button>
      </form>
    </div>
  )
}

export default Bidding
