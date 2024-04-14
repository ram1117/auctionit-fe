import CategoryItem from './CategoryItem'
import { CategoryType } from './types'
import { getItemCategories } from '../../services/apiService'

const CategoriesContainer = async () => {
  const categories = await getItemCategories()

  return (
    <section className="py-1 lg:py-4 uppercase font-roboto m-2 lg:m-0">
      <h2 className="text-lg lg:text-xl font-bold border-b py-4 hidden lg:block">
        Categories
      </h2>
      {categories.error && <h3 className="my-4">{categories.error}</h3>}
      <ul className="lg:h-4/5 overflow-scroll text-secondary-text font-semibold flex lg:flex-wrap gap-1 lg:gap-4 p-1 lg:p-4 my-1 lg:my-4 text-sm lg:text-base">
        {!categories.error &&
          categories.map((category: CategoryType) => (
            <CategoryItem key={category.id} category={category} />
          ))}
      </ul>
    </section>
  )
}

export default CategoriesContainer
