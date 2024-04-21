import BackButton from '../../atoms/BackButton'
import { getItemsWon } from '../../services/apiService'

const ItemsPage = async () => {
  const items = await getItemsWon()
  console.log(items)
  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <h1 className="pb-4 w-max mx-auto track-tight text-lg lg:text-2xl font-bold text-center border-b">
        Items Won
      </h1>
      {/* <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <Item item={item} key={item.id} />
        ))}
      </ul> */}
    </main>
  )
}
export default ItemsPage
