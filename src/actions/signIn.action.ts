'use server'
import { z } from 'zod'
import { signinUser } from '../services/apiService'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { LoginFormStateType } from '../components/navbar/LoginForm'

const validationSchema = z.object({
  email: z.string().email('Please enter valid email'),
  password: z.string().min(8, { message: 'At lease 8 characters' }),
})

const SignInAction = async (
  formState: LoginFormStateType,
  formData: FormData
): Promise<LoginFormStateType> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors }
  }

  try {
    const response = await signinUser(validation.data)
    if (response.status !== 201) {
      const error = await response.json()
      return { errors: { _form: [error.message] } }
    }

    const { role } = await response.json()
    const cookie = response.headers.get('Set-cookie')
    if (cookie) {
      const jwtToken = cookie.split(';')[0].split('=')[1]
      cookies().set('token', jwtToken, { httpOnly: true, maxAge: 86400 })
      cookies().set('role', role, { httpOnly: true, maxAge: 86400 })
    }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    }
    return { errors: { _form: ['Soemthing went wrong.'] } }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export default SignInAction
