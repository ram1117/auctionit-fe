import React from 'react'
import ImageWrapper from '../../atoms/ImageWrapper'
import Link from 'next/link'

interface NavlistItemProps {
  href: string
  title: string
  src: string
  alt: string
}

const NavlistItem = ({ href, src, alt, title }: NavlistItemProps) => {
  return (
    <li className="uppercase flex gap-1 items-center">
      <ImageWrapper src={src} alt={alt} containerClassName="h-6 w-6" />
      <Link href={href}>{title}</Link>
    </li>
  )
}

export default React.memo(NavlistItem)
