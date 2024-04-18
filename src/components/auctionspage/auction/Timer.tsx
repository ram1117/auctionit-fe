import { calculateHours } from '../../../utils/calculateTime'

interface TimerProps {
  time: string
}

const Timer = ({ time }: TimerProps) => {
  const [dhours, dminutes] = calculateHours(time)
  const textcolor = parseInt(dhours) < 1 ? 'text-red-700' : 'text-green-500'

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h5 className="font-light text-xs lg:text-sm text-center">Time Left</h5>
      <h5 className={`text-lg lg:text-2xl font-semibold ${textcolor}`}>
        {dhours}:{dminutes}
      </h5>
    </div>
  )
}

export default Timer
