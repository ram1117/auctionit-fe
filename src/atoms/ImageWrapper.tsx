import Image from 'next/image'
import { StaticImageData } from 'next/image'

interface ImageWrapperProps {
  src: string | StaticImageData
  alt: string
  containerClassName: string
  sizes?: string
  className?: string
}

const ImageWrapper = ({
  src,
  alt,
  containerClassName,
  sizes = '',
  className = '',
}: ImageWrapperProps) => {
  return (
    <div className={`relative ${containerClassName}`}>
      <Image
        src={src}
        alt={alt}
        className={`${className}`}
        sizes={sizes}
        fill
      />
    </div>
  )
}

export default ImageWrapper
