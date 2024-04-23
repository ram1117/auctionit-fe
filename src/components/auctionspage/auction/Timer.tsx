import { calculateHours } from '../../../utils/calculateTime'

interface TimerProps {
  time: string
  isCancelled: string
  className?: string
  fontSize?: string
}

const Timer = ({
  time,
  isCancelled,
  className = '',
  fontSize = '',
}: TimerProps) => {
  const [dhours, dminutes] = calculateHours(time)
  const textcolor =
    parseInt(dhours) < 1 || isCancelled ? 'text-red-700' : 'text-green-500'

  const returnTime = isCancelled ? `Cancelled` : `${dhours}:${dminutes}`

  return (
    <div
      className={`p-4 flex flex-col items-center justify-center ${className}`}
    >
      <h5 className="font-light text-xs lg:text-sm text-center">Time Left</h5>
      <h5
        className={`text-lg lg:text-2xl font-semibold ${textcolor} ${fontSize}`}
      >
        {returnTime}
      </h5>
    </div>
  )
}

export default Timer
