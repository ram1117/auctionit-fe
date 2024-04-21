'use server'

import { revalidatePath } from 'next/cache'
import { UpdateAuctionFormType } from '../components/admin/AuctionCancelForm'
import { cancelAuction } from '../services/apiService'

const UpdateAuctionAction = async (
  itemId: string
): Promise<UpdateAuctionFormType> => {
  try {
    const response = await cancelAuction(itemId)

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

  revalidatePath('/admin/auctions')

  return { success: true, errors: {} }
}

export default UpdateAuctionAction
