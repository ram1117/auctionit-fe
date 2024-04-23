'use client'

import { useState } from 'react'
import { useFormState } from 'react-dom'
import InputField from '../../atoms/InputField'
import FormSubmit from '../../atoms/FormSubmit'
import PasswordAction from '../../actions/password.action'

export interface UpdatePasswordFormType {
  success?: boolean
  errors: {
    _form?: string[]
    password?: string[]
  }
}

const Password = () => {
  const [openForm, setOpenForm] = useState(false)

  const handleClick = () => {
    setOpenForm((prev) => !prev)
  }

  const initialState: UpdatePasswordFormType = {
    success: false,
    errors: { _form: [] },
  }
  const [formState, formAction] = useFormState(PasswordAction, initialState)

  return (
    <div>
      <div className="my-4 p-4 flex justify-center items-center justify-between">
        <div>
          <h5 className="font-light text-sm">Password</h5>
          <h5 className="text-xl font-bold">*********</h5>{' '}
        </div>

        <button
          className="px-6 py-2 rounded-lg bg-button-primary text-white text-sm lg:text-base font-medium font-roboto track-wider"
          onClick={handleClick}
        >
          Change
        </button>
      </div>
      {openForm && (
        <div className="p-4">
          <form action={formAction} className="border rounded-lg p-4">
            <InputField
              label="Change Password"
              type="password"
              name="password"
              id="password"
              required
              errorMsg={formState.errors['password']?.join(',')}
            />
            {formState.errors['_form'] && (
              <p className="text-sm text-red-700">
                {formState.errors['_form']}
              </p>
            )}
            {formState.success && (
              <p className="text-sm text-green-500">Changed successfully</p>
            )}
            <FormSubmit className="!my-1" />
          </form>
        </div>
      )}
    </div>
  )
}

export default Password
