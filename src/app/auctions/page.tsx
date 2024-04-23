import SubscribeItem from '../../components/subscribe/SubscribeItem'
import { getPlacedBids } from '../../services/apiService'
import BackButton from '../../atoms/BackButton'
import PageHeader from '../../atoms/PageHeader'

const AuctionsPage = async () => {
  const bids = await getPlacedBids()

  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <PageHeader title="My Auctions" />
      <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-fr">
        {bids.map((bid: any) => (
          <SubscribeItem auction={bid.auction} price={bid.price} key={bid.id} />
        ))}
      </ul>
    </main>
  )
}

export default AuctionsPage
