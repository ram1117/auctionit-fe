import React from 'react'
import ImageWrapper from '../../atoms/ImageWrapper'
import { calculateHours } from '../../utils/calculateTime'
import NoimageImage from '@/public/no-image.jpg'
import Link from 'next/link'

interface AuctionItemProps {
  auction: any
}

const AuctionItem = ({ auction }: AuctionItemProps) => {
  const image =
    auction.item.imageUrl === '' ? NoimageImage : auction.item.imageUrl

  const hasEnded = new Date(auction.deadline) < new Date()

  const [hours, minutes] = calculateHours(auction.deadline)
  const bidsCount =
    auction['_count'].bids > 0 ? `${auction['_count'].bids}` : 'No'
  if (!auction.item) return <li>Error</li>

  return (
    <Link href={`/auctions/${auction.id}`}>
      <li className="rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white shadow-lg shadow-slate-200">
        <ImageWrapper
          src={image}
          alt="item image"
          containerClassName="w-4/5 aspect-square"
          sizes="(max-width:768px) 100vw, 50vw"
          className="rounded-full"
        />
        <h2 className="font-bold text-lg mx-2 overflow-hidden text-center text-ellipsis w-full text-nowrap">
          {auction.item.name}
        </h2>
        {hasEnded && <h3>Auction Ended</h3>}
        {!hasEnded && (
          <h3>
            Ends in:{' '}
            <span className="text-green-500 font-bold">
              {hours} Hrs {minutes} m
            </span>
          </h3>
        )}
        <h3 className="text-sm">
          <span className="text-base font-bold">{bidsCount}</span> bids
        </h3>
      </li>
    </Link>
  )
}

export default React.memo(AuctionItem)
