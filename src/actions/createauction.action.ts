'use server'
import { z } from 'zod'
import { CreateAuctionFormType } from '../components/admin/CreateAuctionForm'
import { createNewAuction } from '../services/apiService'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const validationSchema = z.object({
  start_value: z.string(),
  auction_categoryId: z
    .string()
    .refine((value) => value !== '0', 'Please select a value'),
})

const CreateAuctionAction = async (
  item_id: string,
  formState: CreateAuctionFormType,
  formData: FormData
): Promise<CreateAuctionFormType> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!validation.success)
    return { errors: validation.error.flatten().fieldErrors }

  try {
    const response = await createNewAuction({ ...validation.data, item_id })

    if (response.status !== 201) {
      const error = await response.json()
      return { errors: { _form: [error.message] } }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    }
    return { errors: { _form: ['Soemthing went wrong.'] } }
  }

  revalidatePath('/admin/auctions/')
  redirect('/admin/auctions/')
  return { success: true, errors: {} }
}

export default CreateAuctionAction
