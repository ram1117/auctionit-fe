'use client'

import { useFormStatus } from 'react-dom'

interface FormSubmitProps {
  buttonText?: string
  className?: string
  pendingText?: string
}

const FormSubmit = ({
  buttonText = 'Submit',
  className = '',
  pendingText = 'Submitting...',
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`px-6 py-2 my-4 bg-button-primary text-white font-medium rounded-lg ${className}`}
    >
      {pending ? pendingText : buttonText}
    </button>
  )
}

export default FormSubmit
