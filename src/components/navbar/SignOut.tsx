'use client'

import SignoutAction from '../../actions/signOut.action'

const SignOut = () => {
  return (
    <form action={SignoutAction}>
      <button
        type="submit"
        className="text-center px-6 py-2 bg-button-primary text-white font-medium rounded-lg"
      >
        Sign Out
      </button>
    </form>
  )
}

export default SignOut
