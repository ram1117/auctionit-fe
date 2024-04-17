'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SignoutAction = async () => {
  cookies().delete('token')
  cookies().delete('role')
  revalidatePath('/', 'layout')
  redirect('/')
}

export default SignoutAction
