import Link from 'next/link'
import ImageWrapper from '../../atoms/ImageWrapper'
import NoPhotoImage from '@/public/no-image.jpg'

interface ItemCardProps {
  item: any
}

const ItemCard = ({ item }: ItemCardProps) => {
  const itemImage = item.imageUrl.length === 0 ? NoPhotoImage : item.imageUrl

  return (
    <Link href={`/admin/items/${item.id}`}>
      <li className="bg-white flex flex-col items-center justify-center gap-4 p-4 shadow-lg shadow-slate-300 rounded-lg aspect-square">
        <ImageWrapper
          src={itemImage}
          alt="item image"
          containerClassName="w-3/5 aspect-square"
          className="rounded-full"
        />
        <h4 className="text-lg font-bold px-4 text-center font-nunito">
          {item.name}
        </h4>
      </li>
    </Link>
  )
}

export default ItemCard
