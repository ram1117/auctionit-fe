import AuctionsContainer from '../components/mainpage/AuctionsContainer'
import { getItemCategories } from '../services/apiService'

const Home = async () => {
  const categories = await getItemCategories()

  return (
    <main className="my-1 lg:my-0 p-4 border-2 min-h-screen">
      <AuctionsContainer categories={categories} />
    </main>
  )
}

export default Home
