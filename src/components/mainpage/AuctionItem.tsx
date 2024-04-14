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
  const [hours, minutes] = calculateHours(auction.deadline)

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
        <h2 className="font-bold text-lg">{auction.item.name}</h2>
        <h3>
          Ends in:{' '}
          <span className="text-green-500 font-bold">
            {hours} Hrs {minutes} m
          </span>
        </h3>
      </li>
    </Link>
  )
}

export default React.memo(AuctionItem)