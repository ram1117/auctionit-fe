import ImageWrapper from '../../atoms/ImageWrapper'
import { CategoryType } from './types'

interface CategoryItemProps {
  category: CategoryType
  handleCategoryClick: (category: number) => void
}

const CategoryItem = ({ category, handleCategoryClick }: CategoryItemProps) => {
  return (
    <button
      className="capitalize tracking-tight text-sm flex gap-2 border rounded-md py-1 lg:py-2 px-4 border-primary items-center"
      onClick={() => {
        handleCategoryClick(category.id)
      }}
    >
      <ImageWrapper
        src={category.iconUrl}
        alt={`${category.type} Icon`}
        containerClassName="h-3 w-3 lg:h-6 lg:w-6 hidden lg:block"
      />
      <h4 className="text-nowrap lg:text-wrap">{category.type}</h4>
    </button>
  )
}

export default CategoryItem
