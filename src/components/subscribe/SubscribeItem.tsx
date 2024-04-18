import ImageWrapper from '../../atoms/ImageWrapper'
import NoPhoto from '@/public/no-image.jpg'
import { calculateHours } from '../../utils/calculateTime'
import Link from 'next/link'

interface SubscribeItemProps {
  subscription: any
}

const SubscribeItem = ({ subscription }: SubscribeItemProps) => {
  const { auction } = subscription
  const { item } = subscription.auction

  const hasEnded = new Date(auction.deadline) < new Date()
  const [dhours, dminutes] = calculateHours(auction.deadline)
  const textcolor = parseInt(dhours) < 1 ? 'text-red-700' : 'text-green-500'
  const itemImage = item.imageUrl !== '' ? item.imageUrl : NoPhoto

  return (
    <Link href={`/auctions/${auction.id}`}>
      <li className="border rounded-lg flex gap-2 items-center p-4 shadow-lg shadow-slate-300">
        <ImageWrapper
          src={itemImage}
          alt="Item Image"
          containerClassName="h-12 w-12"
          className="rounded-full"
        />
        <div className="p-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          {hasEnded && <h3>Auction Ended</h3>}
          {!hasEnded && (
            <h5 className="text-xs font-light">
              Ends in{' '}
              <span className={`${textcolor} text-base font-bold mx-1`}>
                {dhours}:{dminutes}
              </span>
            </h5>
          )}
        </div>
      </li>
    </Link>
  )
}

export default SubscribeItem
