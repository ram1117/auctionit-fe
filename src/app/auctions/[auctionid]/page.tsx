import BackButton from '../../../atoms/BackButton'

const AuctionPage = ({ params }: { params: { auctionid: string } }) => {
  const auctionId = params.auctionid
  return (
    <main className="p-4">
      <BackButton />
      <h2>{auctionId}</h2>
    </main>
  )
}

export default AuctionPage
