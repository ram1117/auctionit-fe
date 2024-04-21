'use client'

import InputField from '../../atoms/InputField'
import FormSubmit from '../../atoms/FormSubmit'
import { useEffect, useState } from 'react'
import { getItemCategories } from '../../services/apiService'
import CreateItemAction from '../../actions/createitem.action'
import { useFormState } from 'react-dom'

interface AddItemFormProps {
  setFormOpen: (value: React.SetStateAction<boolean>) => void
}

export interface ItemFormStateType {
  success?: boolean
  errors: {
    _form?: string[]
    name?: string[]
    item_image?: string[]
    description?: string[]
    item_type_id?: string[]
  }
}

const AddItemForm = ({ setFormOpen }: AddItemFormProps) => {
  const [categories, setCategories] = useState([])
  const [fetchError, setFetchError] = useState('')

  const initialState: ItemFormStateType = { success: false, errors: {} }
  const [formState, formAction] = useFormState(CreateItemAction, initialState)

  useEffect(() => {
    getItemCategories().then((response) => {
      if (response.error) setFetchError(response.message)
      setCategories(response)
    })
  }, [])

  return (
    <section className="fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center z-[999]">
      <form
        action={formAction}
        className="w-10/12 lg:w-2/3 max-w-[650px] bg-white p-4 lg:p-8 rounded-lg border-2 border-primary"
      >
        <InputField
          type="text"
          label="Name"
          id="name"
          name="name"
          errorMsg={formState.errors['name']?.join(', ')}
        />
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="border-2 rounded-md p-2"
          />
        </div>
        {formState.errors['description'] && (
          <p className="text-red-800 text-sm">
            {formState.errors['description']?.join(', ')}
          </p>
        )}
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="item_type_id">Item Type</label>
          <select
            id="item_type_id"
            name="item_type_id"
            className="border-2 rounded-md p-2 bg-white"
            defaultValue={0}
          >
            <option key={0} value={0} className="" disabled>
              -- Select a type --
            </option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.type}
              </option>
            ))}
          </select>
          {formState.errors['item_type_id'] && (
            <p className="text-red-800 text-sm">
              {formState.errors['item_type_id']?.join(', ')}
            </p>
          )}
        </div>
        <InputField
          type="file"
          label="Image"
          id="item_image"
          name="item_image"
        />
        {formState.errors['item_image'] && (
          <p className="text-red-800 text-sm">
            {formState.errors['item_image']?.join(', ')}
          </p>
        )}
        {fetchError && (
          <p className="text-red-500 my-4 text-center">Error Fetching data </p>
        )}
        {formState.errors['_form'] && (
          <p className="text-red-800 text-sm">
            {formState.errors['_form']?.join(', ')}
          </p>
        )}
        <div className="flex items-center justify-between flex-col gap-2 lg:gap-4 md:flex-row">
          <FormSubmit className="px-12" />
          <button
            className="py-2 px-12 bg-slate-200 border rounded-md"
            onClick={() => setFormOpen((prev) => !prev)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddItemForm
