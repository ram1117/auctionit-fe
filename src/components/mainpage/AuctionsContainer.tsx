'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getLiveAuctions } from '../../services/apiService'
import AuctionItem from './AuctionItem'
import { SORT_BY } from '../../app/constants'

const AuctionsContainer = () => {
  const [auctions, setAuctions] = useState<any>([])
  const [hasError, setHasError] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [endOfData, setEndOfData] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const loaderRef = useRef(null)

  const handleClick = async (sort: string) => {
    setSortBy(sort)
    setPageNo(1)
    setEndOfData(false)
    setHasError(false)
    setAuctions([])
  }

  const fetchData = useCallback(
    function () {
      if (!endOfData) {
        getLiveAuctions(sortBy, pageNo)
          .then((data) => {
            if (data.length !== 0) {
              setAuctions((prev: any) => [...prev, ...data])
              setPageNo((prev) => prev + 1)
            } else {
              setEndOfData(true)
            }
          })
          .catch(() => {
            setHasError(true)
          })
      }
    },
    [pageNo, sortBy, endOfData]
  )

  useEffect(() => {
    const loader = loaderRef.current
    const observer = new IntersectionObserver(async (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        fetchData()
      }
    })

    if (loader) observer.observe(loader)

    return () => {
      if (loader) observer.unobserve(loader)
    }
  }, [fetchData])

  return (
    <section className="my-4 relative">
      <ul className="flex gap-2 lg:gap-4 justify-end items-center">
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(SORT_BY.NEWEST)}>Newest</button>
        </li>
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(SORT_BY.POPULAR)}>Popular</button>
        </li>
        <li className="">
          <button onClick={() => handleClick(SORT_BY.ENDING_SOON)}>
            Ending Soon
          </button>
        </li>
      </ul>
      {hasError && (
        <h2 className="text-center text-base lg:text-lg text-red-700">
          Error fetching data
        </h2>
      )}
      <div className="my-4">{hasError}</div>
      <ul className="overflow-scroll h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:gap-6">
        {auctions.map((auction: any) => (
          <AuctionItem key={auction.id} auction={auction} />
        ))}
        <li ref={loaderRef} className="h-1" />
      </ul>
      {endOfData && (
        <p className="my-4 text-center text-xs text-gray-700 w-full">
          End of Data
        </p>
      )}
    </section>
  )
}

export default AuctionsContainer
