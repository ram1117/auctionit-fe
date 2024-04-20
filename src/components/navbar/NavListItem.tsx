import React from 'react'
import ImageWrapper from '../../atoms/ImageWrapper'

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
      <a href={href}>{title}</a>
    </li>
  )
}

export default React.memo(NavlistItem)
