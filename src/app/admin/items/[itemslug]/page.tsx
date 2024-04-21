import Link from 'next/link'
import BackButton from '../../../../atoms/BackButton'
import ImageWrapper from '../../../../atoms/ImageWrapper'
import { getItemDetails } from '../../../../services/apiService'
import NoPhotoImage from '@/public/no-image.jpg'
import Timer from '../../../../components/auctionspage/auction/Timer'
import UpdateItemForm from '../../../../components/admin/UpdateItemForm'
import CreateAuctionForm from '../../../../components/admin/CreateAuctionForm'

const Page = async ({ params }: { params: { itemslug: string } }) => {
  const itemId = params.itemslug
  const itemDetails = await getItemDetails(itemId)
  const winningBid = itemDetails.win_bid

  if (itemDetails.error) {
    return (
      <main className="p-4">
        <p className="text-red-500 text-center">{itemDetails.message}</p>
      </main>
    )
  }
  const itemImage =
    itemDetails.imageUrl.length === 0 ? NoPhotoImage : itemDetails.imageUrl

  return (
    <main className="p-4">
      <BackButton />
      <section className="px-2 lg:px-10 my-4">
        <header className="flex items-center justify-between flex-col md:flex-row gap-2">
          <h1 className="text-xl gap-4 lg:text-4xl font-bold">
            {itemDetails.name}
          </h1>
          <UpdateItemForm
            notforSale={itemDetails.not_for_sale}
            itemId={itemDetails.id}
          />
        </header>

        <div className="w-full my-4 lg:my-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div className="relative p-4 flex flex-col items-center justify-center rounded-xl shadow-lg shadow-slate-300">
              <ImageWrapper
                src={itemImage}
                alt="auction item image"
                containerClassName="w-4/5 aspect-square"
                className="rounded-full"
              />
              {itemDetails.isSold && (
                <h4 className="rotate absolute top-2 left-12 text-4xl font-black track-wider text-green-500 border-4 p-4 border-green-500">
                  SOLD
                </h4>
              )}
              {itemDetails.not_for_sale && (
                <h4 className="rotate absolute -top-8 left-20 text-2xl lg:text-4xl font-black track-wider text-red-500 border-4 p-4 border-red-500">
                  NOT FOR SALE
                </h4>
              )}
            </div>

            <div className=" p-2 rounded-xl shadow-lg shadow-slate-300 h-[45vh] lg:h-full overflow-y-auto">
              <div className="border-b p-4 flex items-center justify-between">
                <h5 className="text-lg font-bold  ">Auctions</h5>
                <CreateAuctionForm item_id={itemDetails.id}></CreateAuctionForm>
              </div>

              <ul className="my-4">
                {itemDetails.auctions.map((auction: any) => (
                  <Link href={`/auctions/${auction.id}`} key={auction.id}>
                    <li className="border rounded-md p-2">
                      <p className="">{auction.id}</p>
                      <Timer
                        time={auction.deadline}
                        isCancelled={auction.isCancelled}
                        className="!flex-row !gap-2 !p-1 w-max"
                        fontSize="!text-lg"
                      />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className=" p-2 rounded-xl shadow-lg shadow-slate-300">
            <h5 className="text-lg font-bold border-b p-2 ">Winning Bid</h5>
            {!winningBid && <p className="py-8">N/A</p>}
            {winningBid && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-around my-4 py-4">
                <div className="border p-4 rounded-xl">
                  <h2 className="text-sm">Name</h2>
                  <h2 className="text-base font-semibold">
                    {winningBid.bidder.fullname}
                  </h2>
                </div>
                <div className="border p-4 rounded-xl">
                  <h2 className="text-sm">Email</h2>
                  <h2 className="text-base font-semibold">
                    {winningBid.bidder.email}
                  </h2>
                </div>
                <div className="border p-4 rounded-xl">
                  <h2 className="text-sm">Location</h2>
                  <h2 className="text-base font-semibold">
                    {winningBid.bidder.location}
                  </h2>
                </div>
                <div className="border p-4 rounded-xl">
                  <h2 className="text-sm">Price</h2>
                  <h2 className="text-base font-semibold">
                    ${winningBid.price}
                  </h2>
                </div>
              </div>
            )}
          </div>
          <div className="p-8 rounded-xl shadow-lg shadow-slate-300">
            <h5 className="tracking-tight text-lg uppercase font-roboto font-medium">
              Information
            </h5>
            <p className="my-4 tracking-tight">{itemDetails.description}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page
