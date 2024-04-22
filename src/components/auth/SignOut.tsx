'use client'

import SignoutAction from '../../actions/signOut.action'

const SignOut = () => {
  return (
    <form action={SignoutAction}>
      <button
        type="submit"
        className="py-1 px-2 lg:px-6 lg:py-2 bg-button-primary text-white rounded-lg text-center text-sm lg:text-base font-medium font-roboto track-wider"
      >
        Sign Out
      </button>
    </form>
  )
}

export default SignOut
