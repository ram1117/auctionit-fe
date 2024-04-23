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
      <ul className="overflow-x-auto text-secondary-text font-semibold flex lg:grid lg:grid-cols-6 gap-1 lg:gap-4 p-1 lg:p-4 my-1 lg:my-4 text-sm lg:text-base">
        <button
          className="capitalize tracking-tight text-sm gap-2 rounded-md py-1 lg:py-2 px-6 bg-white shadow-md shadow-slate-300"
          onClick={() => handleCategoryClick(0)}
        >
          All
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
