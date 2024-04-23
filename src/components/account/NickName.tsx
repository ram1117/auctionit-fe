'use client'

import { useState } from 'react'
import InputField from '../../atoms/InputField'
import FormSubmit from '../../atoms/FormSubmit'
import UsernameAction from '../../actions/username.action'
import { useFormState } from 'react-dom'

export interface UpdateUsernameFormType {
  success?: boolean
  errors: {
    _form?: string[]
    username?: string[]
  }
}

interface NickNameProps {
  nickname: string
}

const NickName = ({ nickname }: NickNameProps) => {
  const [openForm, setOpenForm] = useState(false)

  const handleClick = () => {
    setOpenForm((prev) => !prev)
  }

  const initialState: UpdateUsernameFormType = {
    success: false,
    errors: { _form: [] },
  }
  const [formState, formAction] = useFormState(UsernameAction, initialState)

  return (
    <div>
      <div className="my-4 p-4 flex justify-center items-center justify-between">
        <div>
          <h5 className="font-light text-sm">Nick Name</h5>
          <h5 className="text-xl font-bold">{nickname}</h5>{' '}
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
              label="Change Username"
              type="text"
              name="username"
              id="username"
              required
              errorMsg={formState.errors['username']?.join(',')}
            />
            {formState.errors['_form'] && (
              <p className="text-sm text-red-700">
                {formState.errors['_form']}
              </p>
            )}
            {formState.success && (
              <p className="text-sm text-green-500">Changed successfully</p>
            )}
            <FormSubmit className="!my-1"></FormSubmit>
          </form>
        </div>
      )}
    </div>
  )
}

export default NickName
