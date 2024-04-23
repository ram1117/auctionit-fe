'use client'

import { useEffect, useState } from 'react'
import BackButton from '../../../atoms/BackButton'
import { getAdminItems } from '../../../services/apiService'
import ItemCard from '../../../components/admin/ItemCard'
import AddItemForm from '../../../components/admin/AddItemForm'
import Loader from '../../../atoms/Loadert'
import ErrorUi from '../../../atoms/ErrorUi'

enum STATUS {
  SOLD = 'sold',
  UNSOLD = 'unsold',
  NO_FOR_SALE = 'nosale',
}

const Page = () => {
  const [items, setItems] = useState([])
  const [itemStatus, setItemStatus] = useState(STATUS.UNSOLD)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    getAdminItems(itemStatus).then((response) => {
      setLoading(false)
      if (response.error) {
        setError(response.message)
      } else setItems(response)
    })
  }, [itemStatus])

  const handleClick = (status: STATUS) => {
    setItemStatus(status)
  }

  const handleFormButtonClick = () => {
    setFormOpen((prev) => !prev)
  }

  return (
    <main className="p-4">
      <BackButton />
      <div className="flex justify-between px-4 py-2 items-center border-b gap-2">
        <h1 className="track-wider text-lg lg:text-2xl font-bold font-nunito lg:my-4">
          Items
        </h1>
        <button
          onClick={handleFormButtonClick}
          className="border-1 py-2 px-2 lg:px-4 bg-button-primary text-white rounded-lg text-sm lg:text-base font-medium font-roboto track-wider"
        >
          Add item
        </button>
      </div>
      <ul className="flex gap-2 lg:gap-4 my-4 justify-center sm:justify-end items-center text-sm">
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(STATUS.UNSOLD)}>Unsold</button>
        </li>
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(STATUS.SOLD)}>Sold</button>
        </li>
        <li className="px-2">
          <button onClick={() => handleClick(STATUS.NO_FOR_SALE)}>
            Not for Sale
          </button>
        </li>
      </ul>
      <div className="">
        {loading && <Loader></Loader>}
        {error && <ErrorUi title="Error getting data.." />}
        {!loading && (
          <ul className="my-4 lg:my-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 grid-height">
            {items.map((item: any) => (
              <ItemCard item={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
      {formOpen && <AddItemForm setFormOpen={setFormOpen} />}
    </main>
  )
}

export default Page
