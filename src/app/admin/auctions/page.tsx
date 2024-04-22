'use client'

import { useEffect, useState } from 'react'
import BackButton from '../../../atoms/BackButton'
import { getAdminAuctions } from '../../../services/apiService'
import AuctionCard from '../../../components/admin/AuctionCard'

enum STATUS {
  ALL = 'all',
  LIVE = 'live',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
}

const Page = () => {
  const [auctions, setAuctions] = useState([])
  const [auctionStatus, setAuctionStatus] = useState(STATUS.ALL)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminAuctions(auctionStatus).then((response) => {
      if (response.error) {
        setError(response.message)
      } else setAuctions(response)
    })
    setLoading(false)
  }, [auctionStatus])

  const handleClick = (status: STATUS) => {
    setAuctionStatus(status)
  }

  return (
    <main className="p-4">
      <BackButton />
      <div className="flex justify-between px-4 py-2 items-center flex-col md:flex-row gap-2 border-b">
        <h1 className="track-wider text-lg lg:text-2xl font-bold font-nunito lg:my-4">
          Auctions
        </h1>
        <ul className="flex gap-2 lg:gap-4 justify-center sm:justify-end items-center text-sm">
          <li className="border-r border-r-black px-2">
            <button onClick={() => handleClick(STATUS.ALL)}>All</button>
          </li>
          <li className="border-r border-r-black px-2">
            <button onClick={() => handleClick(STATUS.LIVE)}>Live</button>
          </li>
          <li className="border-r border-r-black px-2">
            <button onClick={() => handleClick(STATUS.ENDED)}>Ended</button>
          </li>
          <li className="px-2">
            <button onClick={() => handleClick(STATUS.CANCELLED)}>
              Cancelled
            </button>
          </li>
        </ul>
      </div>

      <div className="">
        {loading && <p className="text-center">loading</p>}
        {error && <p className="text-center">Error getting data</p>}
        {!loading && (
          <ul className="my-4 lg:my-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3 gap-4">
            {auctions.map((auction: any) => (
              <AuctionCard auction={auction} key={auction.id} />
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Page
