import { signoutUser } from '../../services/apiService'

const SignOut = () => {
  const handleClick = () => {
    signoutUser().then((response) => {
      if (response.success) {
        window.location.href = '/'
        // location.reload()
      }
    })
  }

  return (
    <button
      type="button"
      className="text-center px-6 py-2 bg-button-primary text-white font-medium rounded-lg"
      onClick={handleClick}
    >
      Sign Out
    </button>
  )
}

export default SignOut
