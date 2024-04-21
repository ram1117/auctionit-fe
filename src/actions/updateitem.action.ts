'use server'

import { revalidatePath } from 'next/cache'
import { UpdateItemFormStateType } from '../components/admin/UpdateItemForm'
import { updateItem } from '../services/apiService'

const UpdateItemAction = async (
  itemId: string,
  notforSale: boolean
): Promise<UpdateItemFormStateType> => {
  try {
    const response = await updateItem(itemId, notforSale)

    if (response.status !== 200) {
      const error = await response.json()
      return { errors: { _form: [error.message] } }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    }
    return { errors: { _form: ['Soemthing went wrong.'] } }
  }

  revalidatePath(`/admin/items/${itemId}`)
  return { errors: {} }
}

export default UpdateItemAction
