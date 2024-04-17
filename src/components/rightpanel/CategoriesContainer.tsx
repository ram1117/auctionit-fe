import CategoryItem from './CategoryItem'
import { CategoryType } from './types'
import { getItemCategories } from '../../services/apiService'
import { useEffect, useState } from 'react'

const CategoriesContainer = () => {
  const [error, setError] = useState<string | undefined>()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getItemCategories().then((response) => {
      if (response.error) {
        setError('Error fetching data')
      } else {
        setCategories(response)
      }
    })
  }, [])

  return (
    <section className="py-1 lg:py-4 m-2 lg:m-0">
      {error && <h3 className="my-4">{error}</h3>}
      <ul className="lg:h-4/5 overflow-y-scroll text-secondary-text font-semibold flex lg:flex-wrap gap-1 lg:gap-4 p-1 lg:p-4 my-1 lg:my-4 text-sm lg:text-base">
        {!error &&
          categories.map((category: CategoryType) => (
            <CategoryItem key={category.id} category={category} />
          ))}
      </ul>
    </section>
  )
}

export default CategoriesContainer
