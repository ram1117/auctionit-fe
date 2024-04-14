import AuctionsContainer from '../components/mainpage/AuctionsContainer'

const Home = async () => {
  return (
    <main className="my-1 lg:my-0 p-4 border-2 min-h-screen">
      <h1 className="text-xl lg:text-3xl text-center font-bold">
        Live Auctions
      </h1>
      <AuctionsContainer />
    </main>
  )
}

export default Home
