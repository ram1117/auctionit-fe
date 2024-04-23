import ImageWrapper from './ImageWrapper'
import ErrorIcon from '@/public/icons/error.svg'

interface ErrorUiProps {
  title?: string
}
const ErrorUi = ({ title = '' }: ErrorUiProps) => {
  const errorText = title.length > 0 ? title : 'Something went wrong'

  return (
    <div className="w-full h-[50vh] flex items-center justify-center flex-col gap-8">
      <ImageWrapper
        src={ErrorIcon}
        alt="Error Icon"
        containerClassName="h-20 w-20 lg:w-24 lg:h-24"
      />
      <h5 className="text-lg font-bold font-nunito">{errorText}</h5>
    </div>
  )
}

export default ErrorUi
