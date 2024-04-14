'use client'

import { useEffect } from 'react'

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <section>
      <h2>Something Went Wrong</h2>
    </section>
  )
}

export default Error
