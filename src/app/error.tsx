'use client'

import { useEffect } from 'react'
import ErrorUi from '../atoms/ErrorUi'

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section className="h-screen w-full">
      <ErrorUi />
    </section>
  )
}

export default Error
