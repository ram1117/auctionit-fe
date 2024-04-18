import CategoryItem from './CategoryItem'
import { CategoryType } from './types'

interface CategoriesContainerProps {
  handleCategoryClick: (category: number) => void
  categories: any
}

const CategoriesContainer = ({
  handleCategoryClick,
  categories,
}: CategoriesContainerProps) => {
  return (
    <section className="py-1 m-1">
      <ul className="lg:h-4/5 overflow-y-scroll text-secondary-text font-semibold flex lg:flex-wrap gap-1 lg:gap-4 p-1 lg:p-4 my-1 lg:my-4 text-sm lg:text-base">
        <button
          className="capitalize tracking-tight text-sm flex gap-2 border rounded-md py-1 lg:py-2 px-4 border-primary items-center"
          onClick={() => handleCategoryClick(0)}
        >
          <h4 className="text-nowrap lg:text-wrap">All</h4>
        </button>
        {categories.map((category: CategoryType) => (
          <CategoryItem
            key={category.id}
            category={category}
            handleCategoryClick={handleCategoryClick}
          />
        ))}
      </ul>
    </section>
  )
}

export default CategoriesContainer
