'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getLiveAuctions } from '../../services/apiService'
import AuctionItem from './AuctionItem'
import { SORT_BY } from '../../app/constants'

const AuctionsContainer = () => {
  const [auctions, setAuctions] = useState<any>([])
  const [hasError, setHasError] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const loaderRef = useRef(null)

  const handleClick = async (sort: string) => {
    setSortBy(sort)
    setPageNo(1)
  }

  const fetchData = useCallback(() => {
    getLiveAuctions(sortBy, pageNo)
      .then((data) => {
        setAuctions((prev: any) => [...prev, ...data])
      })
      .catch(() => {
        setHasError(true)
      })

    setPageNo((prev) => prev + 1)
  }, [pageNo, sortBy])

  useEffect(() => {
    const loader = loaderRef.current
    const observer = new IntersectionObserver(async (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        fetchData()
        setPageNo((prev) => prev + 1)
      }
    })

    if (loader) observer.observe(loader)

    return () => {
      if (loader) observer.unobserve(loader)
    }
  }, [fetchData])

  return (
    <section className="my-4">
      <ul className="flex gap-2 lg:gap-4 justify-end">
        <li>
          <button onClick={() => handleClick(SORT_BY.NEWEST)}>Newest</button>
        </li>
        <li>
          <button onClick={() => handleClick(SORT_BY.POPULAR)}>Popular</button>
        </li>
        <li>
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
      <ul className="overflow-scroll h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {auctions.map((auction: any) => (
          <AuctionItem key={auction.id} auction={auction} />
        ))}
        <li ref={loaderRef}></li>
      </ul>
    </section>
  )
}

export default AuctionsContainer
