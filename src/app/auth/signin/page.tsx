'use client'

import Link from 'next/link'
import InputField from '../../../atoms/InputField'
import { useFormState } from 'react-dom'
import SignInAction from '../../../actions/signIn.action'
import { useSearchParams } from 'next/navigation'
import FormSubmit from '../../../atoms/FormSubmit'

export interface LoginFormStateType {
  errors: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

const SigninPage = () => {
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/'

  const initialState: LoginFormStateType = { errors: { _form: [''] } }
  const bindedFormAction = SignInAction.bind(null, nextUrl)
  const [formState, formAction] = useFormState(bindedFormAction, initialState)

  return (
    <div className="w-full p-4 max-w-[576px]">
      <h2 className="text-2xl lg:text-3xl font-bold text-center py-1 my-4">
        Sign In
      </h2>
      <form className="w-full" action={formAction}>
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
        <FormSubmit
          buttonText="Sign in"
          pendingText="Signing in.."
          className="!w-1/2"
        />
      </form>

      <p className="my-6 text-center">
        Don&apos;t have an account?{' '}
        <span className="text-lg font-bold text-green-600">
          <Link href="/auth/signup">Sign Up</Link>
        </span>
      </p>
    </div>
  )
}

export default SigninPage
