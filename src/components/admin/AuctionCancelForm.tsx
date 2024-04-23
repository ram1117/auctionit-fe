import FormSubmit from '../../atoms/FormSubmit'
import UpdateAuctionAction from '../../actions/updateAuction.action'
import { useFormState } from 'react-dom'

interface AuctionCancelFormProps {
  auctionId: string
}

export interface UpdateAuctionFormType {
  success?: boolean
  errors: { _form?: string[] }
}

const AuctionCancelForm = ({ auctionId }: AuctionCancelFormProps) => {
  const bindedAction = UpdateAuctionAction.bind(null, auctionId)
  const initialState: UpdateAuctionFormType = { errors: {} }

  const [formState, formAction] = useFormState(bindedAction, initialState)

  return (
    <form action={formAction}>
      <FormSubmit
        buttonText="Cancel"
        pendingText="Cancelling"
        className="py-1 !text-xs"
      ></FormSubmit>
      {formState.errors['_form'] && (
        <p className="text-xs font-red-500">
          {formState.errors['_form'].join(', ')}
        </p>
      )}
    </form>
  )
}

export default AuctionCancelForm
