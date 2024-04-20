import { CategoryType } from './types'

interface CategoryItemProps {
  category: CategoryType
  handleCategoryClick: (category: number) => void
}

const CategoryItem = ({ category, handleCategoryClick }: CategoryItemProps) => {
  return (
    <button
      className="capitalize tracking-tight text-sm gap-2 border rounded-md py-1 lg:py-2 px-2"
      onClick={() => {
        handleCategoryClick(category.id)
      }}
    >
      <h4 className="text-nowrap lg:text-wrap w-full items-center">
        {category.type}
      </h4>
    </button>
  )
}

export default CategoryItem
