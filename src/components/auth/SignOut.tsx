'use client'

import SignoutAction from '../../actions/signOut.action'

const SignOut = () => {
  return (
    <form action={SignoutAction}>
      <button
        type="submit"
        className="text-center text-sm lg:text-base py-1 px-2 lg:px-6 lg:py-2 bg-button-primary text-white font-medium rounded-lg"
      >
        Sign Out
      </button>
    </form>
  )
}

export default SignOut
