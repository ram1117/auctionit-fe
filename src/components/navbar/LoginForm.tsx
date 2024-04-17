'use client'

import Link from 'next/link'
import InputField from '../../atoms/InputField'
import { useFormState } from 'react-dom'
import SignInAction from '../../actions/signIn.action'
import { useSearchParams } from 'next/navigation'

export interface LoginFormStateType {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

const LoginForm = () => {
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/'

  const initialState: LoginFormStateType = { errors: { _form: [''] } }
  const bindedFormAction = SignInAction.bind(null, nextUrl)
  const [formState, formAction] = useFormState(bindedFormAction, initialState)

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center z-[999] backdrop-blur">
      <div className="bg-white w-11/12 lg:w-2/3 h-2/3 flex flex-col items-center justify-start rounded-md border-2 max-w-[768px] relative">
        <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4 my-8">
          Auction It
        </h2>
        <form className="w-9/12 lg:w-2/3" action={formAction}>
          <InputField
            label="E-mail"
            type="text"
            id="email"
            name="email"
            errorMsg={formState.errors['email']?.join(', ')}
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            errorMsg={formState.errors['password']?.join(', ')}
          />
          {formState.errors['_form'] && (
            <p className="my-2 text-red-500 text-sm">
              {formState.errors['_form']?.join(' , ')}
            </p>
          )}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 my-4 bg-button-primary text-white font-medium rounded-lg"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="my-6">
          Don&apos;t have an account?{' '}
          <span className="text-lg font-bold text-green-600">
            <Link href="/auth/signup">Sign Up</Link>
          </span>
        </p>
      </div>
    </section>
  )
}

export default LoginForm
