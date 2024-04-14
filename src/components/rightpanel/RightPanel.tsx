import CategoriesContainer from './CategoriesContainer'
import AlertsContainer from './AlertsContainer'

const RightPanel = () => {
  return (
    <div className="p-4 grid h-screen grid-cols-1 grid-rows-2">
      <CategoriesContainer />
      <AlertsContainer />
    </div>
  )
}

export default RightPanel
