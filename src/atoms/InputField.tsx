interface InputFieldProps {
  label: string
  type: string
  name: string
  id: string
  required?: boolean
  placeholder?: string
  errorMsg?: string | undefined
}

const InputField = ({
  label,
  type,
  name,
  id,
  required = false,
  placeholder = '',
  errorMsg = undefined,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 my-4">
      <label htmlFor={id}>{label}</label>
      <input
        className="border-2 rounded-md p-2"
        type={type}
        name={name}
        id={id}
        required={required}
        placeholder={placeholder}
      />
      {errorMsg && <p className="text-red-800 text-sm">{errorMsg}</p>}
    </div>
  )
}

export default InputField
