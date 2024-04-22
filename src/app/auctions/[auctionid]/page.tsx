import BackButton from '../../../atoms/BackButton'
import ImageWrapper from '../../../atoms/ImageWrapper'
import { getAuction, getNotificationStatus } from '../../../services/apiService'
import NoPhotoImage from '@/public/no-image.jpg'
import Timer from '../../../components/auctionspage/auction/Timer'
import Price from '../../../components/auctionspage/auction/Price'
import Bidding from '../../../components/auctionspage/auction/Bidding'
import FollowPanel from '../../../components/auctionspage/auction/FollowPanel'
import { getUserRole } from '../../../utils/authHelpers'

const AuctionPage = async ({ params }: { params: { auctionid: string } }) => {
  const auctionId = params.auctionid
  const auction = await getAuction(auctionId)
  const userRole = (await getUserRole()) || ''
  if (auction.error) {
    return (
      <main className="p-4">
        <p className="text-red-500 text-center">{auction.message}</p>
      </main>
    )
  }

  const itemImage =
    auction.item.imageUrl.length === 0 ? NoPhotoImage : auction.item.imageUrl

  const topBid = auction.bids[0] ? auction.bids[0] : undefined
  const bidData = topBid
    ? { price: topBid.price, username: topBid.bidder.username }
    : undefined

  const auctionEnded = new Date(auction.deadline) < new Date()
  const subscription = await getNotificationStatus(auctionId)

  return (
    <main className="p-4">
      <BackButton />
      <section className="px-2 lg:px-10 my-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl gap-4 lg:text-4xl font-bold font-nunito">
            {auction.item.name}
          </h1>
          <FollowPanel auctionId={auctionId} subscription={subscription} />
        </header>

        <div className="w-full my-4 lg:my-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative p-4 flex flex-col items-center justify-center rounded-xl shadow-md shadow-slate-300 bg-white ">
              <ImageWrapper
                src={itemImage}
                alt="auction item image"
                containerClassName="w-4/5 aspect-square"
                className="rounded-full"
              />
              {auctionEnded && (
                <h4 className="rotate absolute -top-4 left-20 text-2xl lg:text-4xl font-black track-wider text-red-500 p-4 border-4 border-red-500">
                  ENDED
                </h4>
              )}

              {auction.isCancelled && (
                <h4 className="rotate absolute -top-4 left-20 text-2xl lg:text-4xl font-black track-wider text-red-500 p-4 border-4 border-red-500">
                  CANCELLED
                </h4>
              )}
            </div>

            <div className=" p-2 rounded-xl shadow-md shadow-slate-300 bg-white ">
              <div className="grid grid-cols-2">
                {
                  <Timer
                    time={auction.deadline}
                    isCancelled={auction.isCancelled}
                  />
                }
                <Price price={auction.start_value}></Price>
              </div>

              <Bidding
                topBid={bidData}
                auctionId={auction.id}
                auctionEnded={auctionEnded}
                userRole={userRole}
                isCancelled={auction.isCancelled}
              />
            </div>
          </div>
          <div className="p-8 my-8 rounded-xl shadow-md shadow-slate-300 bg-white ">
            <h5 className="tracking-tight text-lg uppercase font-roboto font-medium">
              Information
            </h5>
            <p className="my-4 tracking-tight">{auction.item.description}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuctionPage
