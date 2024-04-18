import SubscribeItem from '../../components/subscribe/SubscribeItem'
import { getSubscribedAuctions } from '../../services/apiService'
import BackButton from '../../atoms/BackButton'

const AuctionsPage = async () => {
  const subscriptions = await getSubscribedAuctions()

  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <h1 className="pb-4 w-max mx-auto track-tight text-lg lg:text-2xl font-bold text-center border-b">
        My Auctions
      </h1>
      <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription: any) => (
          <SubscribeItem
            subscription={subscription}
            key={subscription.auction_id}
          />
        ))}
      </ul>
    </main>
  )
}

export default AuctionsPage
