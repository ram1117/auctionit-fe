'use client'

import FormSubmit from '../../atoms/FormSubmit'
import UpdateItemAction from '../../actions/updateitem.action'
import { useFormState } from 'react-dom'

interface UpdateItemFormProps {
  notforSale: boolean
  itemId: string
}

export interface UpdateItemFormStateType {
  errors: {
    _form?: string[]
  }
}

const UpdateItemForm = ({ notforSale, itemId }: UpdateItemFormProps) => {
  const buttonStyle = notforSale
    ? '!bg-button-primary !text-white'
    : '!bg-slate-200 !text-primary-text'

  const initialState: UpdateItemFormStateType = { errors: {} }
  const bindedAction = UpdateItemAction.bind(null, itemId, !notforSale)
  const [formState, formAction] = useFormState(bindedAction, initialState)

  return (
    <form action={formAction}>
      <FormSubmit
        pendingText="Updating.."
        buttonText="Not For Sale"
        className={`${buttonStyle} shadow-md shadow-slate-300`}
      />
      {formState.errors['_form'] && (
        <p className="text-red-700 text-xs">
          {formState.errors['_form']?.join(', ')}
        </p>
      )}
    </form>
  )
}

export default UpdateItemForm
