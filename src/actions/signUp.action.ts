'use server'

import { redirect } from 'next/navigation'
import { SignupFormStateType } from '../app/auth/signup/page'
import { z } from 'zod'
import { signupUser } from '../services/apiService'

const validationSchema = z.object({
  fullname: z.string(),
  email: z.string().email('Please enter a valid E-mail'),
  username: z.string(),
  password: z.string(),
  password1: z.string(),
  location: z.string(),
})

const SignupAction = async (
  formState: SignupFormStateType,
  formData: FormData
): Promise<SignupFormStateType> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors }
  }

  try {
    const response = await signupUser(validation.data)
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

  redirect('/auth/signin')
}

export default SignupAction
