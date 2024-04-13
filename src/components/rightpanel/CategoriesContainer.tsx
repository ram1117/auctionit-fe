import CategoryItem from './CategoryItem'
import { CategoryType } from './types'

const CategoriesContainer = async () => {
  const categories = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/item/itemtypes`
  ).then((response) => response.json())
  return (
    <section className="py-4 uppercase font-roboto">
      <h2 className=" text-lg lg:text-xl font-bold border-b py-4 hidden lg:block">
        Categories
      </h2>
      <ul className="lg:h-4/5 overflow-scroll text-secondary-text font-semibold flex lg:flex-wrap gap-1 lg:gap-4 p-1 lg:p-4 my-1 lg:my-4 text-sm lg:text-base">
        {categories.map((category: CategoryType) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </section>
  )
}

export default CategoriesContainer
