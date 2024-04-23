import BackButton from '../../atoms/BackButton'
import PageHeader from '../../atoms/PageHeader'
import Item from '../../components/items/Item'
import { getItemsWon } from '../../services/apiService'

const ItemsPage = async () => {
  const items = await getItemsWon()
  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <PageHeader title="Items Won" />
      <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: any) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </main>
  )
}
export default ItemsPage
