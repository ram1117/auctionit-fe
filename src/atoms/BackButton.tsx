'use client'

import ImageWrapper from './ImageWrapper'
import BackIcon from '@/public/icons/back-arrow.svg'
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.back()
  }
  return (
    <div className="py-4 ps-8">
      <button
        className="bg-white rounded-full shadow-lg shadow-slate-300"
        onClick={handleClick}
      >
        <ImageWrapper
          src={BackIcon}
          alt="Back Arrow Icon"
          containerClassName="h-10 w-10 p-4"
          className="p-3"
        />
      </button>
    </div>
  )
}

export default BackButton
