'use client'

import { useEffect, useState } from 'react'
import FormSubmit from '../../atoms/FormSubmit'
import { getAuctionCategories } from '../../services/apiService'
import { useFormState } from 'react-dom'
import CreateAuctionAction from '../../actions/createauction.action'

interface CreateAuctionFormProps {
  item_id: string
}

export interface CreateAuctionFormType {
  success?: boolean
  errors: {
    _form?: string[]
    auction_categoryId?: string[]
    start_value?: string[]
  }
}

const CreateAuctionForm = ({ item_id }: CreateAuctionFormProps) => {
  const [openForm, setOpenForm] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [categories, setCategories] = useState([])

  const handleClick = () => {
    setOpenForm((prev) => !prev)
  }

  useEffect(() => {
    getAuctionCategories().then((data) => {
      if (data.error) {
        setFetchError(data.message)
      }
      setCategories(data)
    })
  }, [])

  const bindedAction = CreateAuctionAction.bind(null, item_id)
  const initialState: CreateAuctionFormType = { errors: {} }
  const [formState, formAction] = useFormState(bindedAction, initialState)

  return (
    <>
      <button
        className="py-2 px-4 bg-button-primary text-white font-semibold rounded-lg shadow-lg shadow-slate-300"
        onClick={handleClick}
      >
        + Create
      </button>
      {openForm && (
        <section className="fixed inset-0 z-[999] backdrop-blur-md flex items-center justify-center">
          <form
            action={formAction}
            className="w-10/12 lg:w-2/3 p-4 lg:p-8 max-w-[650px] min-h-[50vh] bg-white border-2 border-primary rounded-lg"
          >
            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="start_value">Starting Value</label>
              <input
                type="number"
                id="start_value"
                name="start_value"
                className="border-2 rounded-md p-2"
                required
                min={0}
                max={999999}
                step={0.05}
              />
            </div>
            {formState.errors['start_value'] && (
              <p className="text-red-800 text-sm">
                {formState.errors['start_value']?.join(', ')}
              </p>
            )}

            <div className="flex flex-col gap-2 my-4">
              <label htmlFor="auction_categoryId">Item Type</label>
              <select
                id="auction_categoryId"
                name="auction_categoryId"
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
              {formState.errors['auction_categoryId'] && (
                <p className="text-red-800 text-sm">
                  {formState.errors['auction_categoryId']?.join(', ')}
                </p>
              )}
            </div>

            {formState.errors['_form'] && (
              <p className="text-red-800 text-sm">
                {formState.errors['_form']?.join(', ')}
              </p>
            )}
            <div className="flex items-center justify-between flex-col gap-2 lg:gap-4 md:flex-row">
              <FormSubmit className="px-12" />
              <button
                className="py-2 px-12 bg-slate-200 border rounded-md"
                onClick={() => setOpenForm((prev) => !prev)}
              >
                Cancel
              </button>
            </div>
          </form>
          {fetchError && <p className="text-xs text-red-700">{fetchError}</p>}
        </section>
      )}
    </>
  )
}

export default CreateAuctionForm
