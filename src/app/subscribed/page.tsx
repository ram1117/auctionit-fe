import { getSubscribedAuctions } from '../../services/apiService'

const AuctionsPage = async () => {
  const auctions = await getSubscribedAuctions()
  console.log(auctions)
  return <></>
}

export default AuctionsPage
