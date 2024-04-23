'use server'
import { z } from 'zod'
import { updateUsername } from '../services/apiService'
import { UpdateUsernameFormType } from '../components/account/NickName'
import { revalidatePath } from 'next/cache'

const validationSchema = z.object({
  username: z
    .string()
    .min(8, { message: 'Should be between 8 and 12 characters' })
    .max(12, { message: 'Should be between 8 and 12 characters' })
    .regex(/^\S+$/, { message: 'Should not have white spaces' }),
})

const UsernameAction = async (
  formState: UpdateUsernameFormType,
  formData: FormData
): Promise<UpdateUsernameFormType> => {
  const validation = validationSchema.safeParse({
    username: formData.get('username'),
  })

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors }
  }

  try {
    const response = await updateUsername(validation.data)

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
  revalidatePath('/account')
  return { success: true, errors: {} }
}

export default UsernameAction
