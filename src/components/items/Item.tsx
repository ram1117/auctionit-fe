import ImageWrapper from '../../atoms/ImageWrapper'
import NoimageImage from '@/public/no-image.jpg'

interface ItemProps {
  item: any
}

const Item = ({ item }: ItemProps) => {
  const image = item.imageUrl === '' ? NoimageImage : item.imageUrl

  return (
    <li className="rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-white shadow-md shadow-slate-300 aspect-square">
      <ImageWrapper
        src={image}
        alt="item image"
        containerClassName="w-3/5 aspect-square"
        sizes="(max-width:768px) 100vw, 50vw"
        className="rounded-full"
      />
      <h2 className="font-bold text-lg mx-2 overflow-hidden text-center text-ellipsis w-full text-nowrap">
        {item.name}
      </h2>
      {item.final_price && (
        <h3 className="text-sm font-semibold text-green-500">
          For - ${item.final_price}
        </h3>
      )}
    </li>
  )
}

export default Item
