'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getLiveAuctions } from '../../services/apiService'
import AuctionItem from './AuctionItem'
import CategoriesContainer from '../rightpanel/CategoriesContainer'
import { SORT_BY } from '../../constants'
import Loader from '../../atoms/Loadert'
import ErrorUi from '../../atoms/ErrorUi'

interface AuctionsContainerProps {
  categories: any
}

const AuctionsContainer = ({ categories }: AuctionsContainerProps) => {
  const [auctions, setAuctions] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [endOfData, setEndOfData] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const [categoryId, setCategoryId] = useState(0)
  const loaderRef = useRef(null)

  const handleClick = async (sort: string) => {
    setSortBy(sort)
    setPageNo(1)
    setEndOfData(false)
    setHasError(false)
    setAuctions([])
    setCategoryId(0)
    setLoading(true)
  }

  const handleCategoryClick = (category: number) => {
    setSortBy('newest')
    setPageNo(1)
    setEndOfData(false)
    setHasError(false)
    setAuctions([])
    setCategoryId(category)
    setLoading(true)
  }

  const fetchData = useCallback(
    function () {
      if (!endOfData) {
        getLiveAuctions(sortBy, pageNo, categoryId)
          .then((data) => {
            if (data.length !== 0) {
              setAuctions((prev: any) => [...prev, ...data])
              setPageNo((prev) => prev + 1)
            } else {
              setEndOfData(true)
            }
            setLoading(false)
          })
          .catch(() => {
            setHasError(true)
          })
      }
    },
    [pageNo, sortBy, endOfData, categoryId]
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
    <section className="relative">
      <CategoriesContainer
        handleCategoryClick={handleCategoryClick}
        categories={categories}
      />
      <ul className="flex gap-2 lg:gap-4 justify-center sm:justify-end items-center text-sm">
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(SORT_BY.NEWEST)}>Newest</button>
        </li>
        <li className="border-r border-r-black px-2">
          <button onClick={() => handleClick(SORT_BY.POPULAR)}>Popular</button>
        </li>
        <li>
          <button onClick={() => handleClick(SORT_BY.ENDING_SOON)}>
            Ending Soon
          </button>
        </li>
      </ul>

      {hasError && <ErrorUi title="Error getting auctions.." />}
      <div>
        {auctions.length === 0 && !loading && (
          <h2 className="text-center text-base lg:text-lg my-18">
            No Live Auctions at the moment
          </h2>
        )}
        {loading && <Loader></Loader>}
        <ul className="h-[80vh] my-8 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6">
          {!loading &&
            auctions.map((auction: any) => (
              <AuctionItem key={auction.id} auction={auction} />
            ))}
          <li ref={loaderRef} className="h-1" />
        </ul>
      </div>

      {endOfData && (
        <p className="my-1 text-center text-xs text-gray-700 w-full">
          --------------------------------------
        </p>
      )}
    </section>
  )
}

export default AuctionsContainer
