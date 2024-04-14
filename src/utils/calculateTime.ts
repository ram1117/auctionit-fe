export const calculateHours = (date: string) => {
  const today = new Date()
  const futureDay = new Date(date)

  const difference = (futureDay.getTime() - today.getTime()) / 1000 / (60 * 60)
  const newDate = new Date(0, 0)
  newDate.setMinutes(difference * 60)
  const result = newDate.toTimeString().slice(0, 5)
  return result.split(':')
}
