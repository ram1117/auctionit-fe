'use server'
import { z } from 'zod'
import { PlacebidFormStateType } from '../components/auctionspage/auction/Bidding'
import { postBid } from '../services/apiService'

const PlacebidAction = async (
  auctionId: string,
  currentValue: number,
  formState: PlacebidFormStateType,
  formData: FormData
): Promise<PlacebidFormStateType> => {
  const validationSchema = z.object({
    price: z
      .number()
      .gt(currentValue, {
        message: `Bid price should be higher than $${currentValue}`,
      })
      .max(999999, { message: 'Value cannot be greater than 999999' }),
  })

  const price = formData.get('price') as string
  const data = parseFloat(price)

  const validate = validationSchema.safeParse({ price: data })

  if (!validate.success) {
    return { errors: validate.error.flatten().fieldErrors }
  }

  try {
    const response = await postBid({ auction_id: auctionId, ...validate.data })

    if (response.status !== 201) {
      const message = await response.json()
      return { errors: { _form: [message.message] } }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    }
    return { errors: { _form: ['Soemthing went wrong.'] } }
  }

  return { success: true, errors: {} }
}

export default PlacebidAction
