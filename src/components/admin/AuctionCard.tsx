import Link from 'next/link'
import ImageWrapper from '../../atoms/ImageWrapper'
import NoPhoto from '@/public/no-image.jpg'
import AuctionCancelForm from './AuctionCancelForm'
import { calculateHours } from '../../utils/calculateTime'

interface AuctionCardProps {
  auction: any
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const ItemImage =
    auction.item.imageUrl === '' ? NoPhoto : auction.item.imageUrl

  const [dHour, dMins] = calculateHours(auction.deadline)
  const timeLeft = auction.isCancelled
    ? 'Cancelled'
    : auction.isComplete
      ? 'Ended'
      : `${dHour}:${dMins}`

  return (
    <li className="relative grid grid-cols-5 px-4 py-12 lg:px-8 gap-2 rounded-lg bg-white shadow-md shadow-slate-300">
      <div className="col-span-2">
        <ImageWrapper
          src={ItemImage}
          alt="Item Image"
          containerClassName="w-4/5 aspect-square"
          className="rounded-full"
        ></ImageWrapper>
      </div>
      <div className="col-span-3">
        <Link href={`/auctions/${auction.id}`} className="col-span-3 underline">
          <h5 className="text-lg font-semibold text-left w-full text-nowrap text-ellipsis overflow-hidden">
            {auction.item.name}
          </h5>
        </Link>
        <div className="grid grid-cols-3 w-full my-2">
          <div className=" text-center flex flex-col items-center justify-center">
            <p className="text-sm font-light ">Start Price</p>
            <p className="text-sm font-semibold">$ {auction.start_value}</p>
          </div>
          <div className=" text-center flex flex-col items-center justify-center">
            <p className="text-sm font-light">Total Bids</p>
            <p className="text-sm font-semibold">{auction._count.bids}</p>
          </div>
          <div className=" text-center flex flex-col items-center justify-center">
            <p className="text-sm font-light">Time Left</p>
            <p className="text-sm font-semibold">{timeLeft}</p>
          </div>
        </div>
      </div>
      <div className="absolute w-max right-2 -bottom-2">
        {!auction.isCancelled && !auction.isComplete && (
          <AuctionCancelForm auctionId={auction.id}></AuctionCancelForm>
        )}
      </div>
      {auction.isComplete && !auction.isCancelled && (
        <h4 className="rotate absolute top-8 left-12 text-lg lg:text-2xl font-black track-wider text-green-500 border-4 p-4 border-green-500">
          ENDED
        </h4>
      )}
      {auction.isCancelled && (
        <h4 className="rotate absolute top-8 left-12 text-lg lg:text-2xl font-black track-wider text-red-500 border-4 p-4 border-red-500">
          CANCELLED
        </h4>
      )}
    </li>
  )
}

export default AuctionCard
