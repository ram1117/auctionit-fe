import Link from 'next/link'
import InputField from '../../atoms/InputField'
import { FormEvent, useState } from 'react'
import { signinUser } from '../../services/apiService'

interface LoginFormProps {
  closePopup: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm = ({ closePopup }: LoginFormProps) => {
  const [error, setError] = useState()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signinUser({
      email: formData.get('email'),
      password: formData.get('password'),
    }).then((response) => {
      if (response.error) setError(response.message)
      if (response.success) {
        location.reload()
        closePopup((prev) => !prev)
      }
    })
  }

  return (
    <section className="fixed inset-0 flex flex-col items-center justify-center border-2 border-red-500 z-[999] backdrop-blur">
      <div className="bg-white w-11/12 lg:w-2/3 h-2/3 flex flex-col items-center justify-start rounded-md border-2 max-w-[768px] relative">
        <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4 my-8">
          Auction It
        </h2>
        <form className="w-9/12 lg:w-2/3" onSubmit={handleSubmit}>
          <InputField
            label="E-mail"
            type="email"
            id="email"
            name="email"
            required
          />
          <InputField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
          />
          {error && <p className="my-2 text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-2 my-4 bg-button-primary text-white font-medium rounded-lg"
            >
              Sign In
            </button>
            <button
              type="button"
              className="px-6 py-2 my-4 font-medium rounded-lg border-2 bg-slate-200"
              onClick={() => closePopup(false)}
            >
              Cancel
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
