'use server'

import { z } from 'zod'
import { updatePassword } from '../services/apiService'
import { revalidatePath } from 'next/cache'
import { UpdatePasswordFormType } from '../components/account/Password'

const validationSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Should be at least 8 characters long' })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        'Should contain at least one capital, one small letter, one special character and one number',
    }),
})

const PasswordAction = async (
  formState: UpdatePasswordFormType,
  formData: FormData
): Promise<UpdatePasswordFormType> => {
  const validation = validationSchema.safeParse({
    password: formData.get('password'),
  })

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors }
  }

  try {
    const response = await updatePassword(validation.data)

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

export default PasswordAction
