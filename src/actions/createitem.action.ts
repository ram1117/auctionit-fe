'use server'
import { z } from 'zod'
import { ItemFormStateType } from '../components/admin/AddItemForm'
import { revalidatePath } from 'next/cache'
import { createNewItem } from '../services/apiService'
import uploadImage from '../utils/supabase'

const IMAGE_SIZE = 100000
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const validationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'should be between 3 and 60 characters' })
    .max(60, { message: 'should be between 3 and 60 characters' }),
  description: z
    .string()
    .min(10, { message: 'should be at least 10 characters long' }),
  item_type_id: z
    .string()
    .refine((value) => value !== '0', 'Please select a value'),
  item_image: z
    .any()
    .refine((file) => file !== null, 'Image required')
    .refine(
      (file) => file?.size < IMAGE_SIZE,
      'File size should be less than 1 Mb'
    )
    .refine(
      (file) => IMAGE_TYPES.includes(file?.type),
      'Only jpeg, png, jpg images allowed'
    ),
})

const CreateItemAction = async (
  formState: ItemFormStateType,
  formData: FormData
): Promise<ItemFormStateType> => {
  console.log(formData.get('item_image'))

  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validation.success)
    return { errors: validation.error.flatten().fieldErrors }

  const { item_image, ...payload } = validation.data
  const url = await uploadImage(item_image)

  try {
    const response = await createNewItem({
      ...payload,
      imageUrl: url,
    })

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

  revalidatePath('/admin/items')
  return { errors: {} }
}

export default CreateItemAction
