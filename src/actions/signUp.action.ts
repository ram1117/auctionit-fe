'use server'

import { redirect } from 'next/navigation'
import { SignupFormStateType } from '../app/auth/signup/page'
import { z } from 'zod'
import { signupUser } from '../services/apiService'

const validationSchema = z
  .object({
    fullname: z
      .string()
      .min(6, { message: 'Should be at least 6 characters long' })
      .regex(/^[A-Za-z\s]+$/, {
        message: 'Only alphabets and spaces allowed in full name',
      }),
    email: z.string().email('Please enter a valid E-mail'),

    username: z
      .string()
      .min(8, { message: 'Should be between 8 and 12 characters' })
      .max(12, { message: 'Should be between 8 and 12 characters' })
      .regex(/^\S+$/, { message: 'Should not have white spaces' }),

    password: z
      .string()
      .min(8, { message: 'Should be at least 8 characters long' })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          'Should contain at least one capital, one small letter, one special character and one number',
      }),
    password1: z.string(),
    location: z.string().min(4, { message: 'Minimum 4 characters long' }),
  })
  .refine((schema) => schema.password === schema.password1, {
    message: 'Passwords should match',
    path: ['password1'],
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
    console.log(response.status)
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
