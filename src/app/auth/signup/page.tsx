'use client'

import Link from 'next/link'
import InputField from '../../../atoms/InputField'
import { useFormState } from 'react-dom'
import FormSubmit from '../../../atoms/FormSubmit'
import SignupAction from '../../../actions/signUp.action'

export interface SignupFormStateType {
  errors: {
    fullname?: string[]
    username?: string[]
    email?: string[]
    password?: string[]
    password1?: string[]
    location?: string[]
    _form?: string[]
  }
}

const SignupPage = () => {
  const initialState: SignupFormStateType = { errors: { _form: [''] } }
  const [formState, formAction] = useFormState(SignupAction, initialState)

  return (
    <div className="w-full p-4 max-w-[576px]">
      <h2 className="text-2xl lg:text-3xl font-bold text-center py-1 my-4">
        Sign Up
      </h2>
      <form className="w-full" action={formAction}>
        <InputField
          label="Full Name"
          type="text"
          id="fullname"
          name="fullname"
          errorMsg={formState.errors['fullname']?.join(', ')}
        />
        <InputField
          label="Nick Name"
          type="text"
          id="username"
          name="username"
          errorMsg={formState.errors['username']?.join(', ')}
        />
        <InputField
          label="Location"
          type="text"
          id="location"
          name="location"
          errorMsg={formState.errors['location']?.join(', ')}
        />
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
        <InputField
          label="Confirm Password"
          type="password"
          id="password1"
          name="password1"
          errorMsg={formState.errors['password1']?.join(', ')}
        />
        {formState.errors['_form'] && (
          <p className="my-2 text-red-500 text-sm">
            {formState.errors['_form']?.join(' , ')}
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
          <FormSubmit
            buttonText="Sign up"
            pendingText="Signing up.."
            className="!w-1/2"
          />
          <Link
            href="/"
            className="px-6 py-2 font-medium rounded-lg text-center bg-slate-200 w-1/2"
          >
            Cancel
          </Link>
        </div>
      </form>

      <p className="my-6 text-center">
        Already have an account?{' '}
        <span className="text-lg font-bold text-green-600">
          <Link href="/auth/signin">Sign in</Link>
        </span>
      </p>
    </div>
  )
}

export default SignupPage
