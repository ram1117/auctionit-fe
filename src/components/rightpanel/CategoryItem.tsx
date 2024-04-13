import Link from 'next/link'
import ImageWrapper from '../../atoms/ImageWrapper'
import { CategoryType } from './types'

interface CategoryItemProps {
  category: CategoryType
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <li>
      <Link
        href={`/category/${category.id}`}
        className="flex lg:gap-2 py-1 px-2 lg:py-2 lg:px-4 border border-primary items-center rounded-lg"
      >
        <ImageWrapper
          src={category.iconUrl}
          alt={`${category.type} Icon`}
          containerClassName="h-3 w-3 lg:h-6 lg:w-6 hidden lg:block"
        />
        <h4 className="text-nowrap lg:text-wrap">{category.type}</h4>
      </Link>
    </li>
  )
}

export default CategoryItem
