import Link from 'next/link'
import SignOut from './SignOut'

interface AuthOptionProps {
  isLoggedIn: boolean
}

const AuthOption = async ({ isLoggedIn }: AuthOptionProps) => {
  return (
    <>
      {!isLoggedIn && (
        <Link
          href="/auth/signin"
          className="text-center text-sm lg:text-base py-1 px-4 lg:px-10 lg:py-2 bg-button-primary text-white font-medium rounded-lg"
        >
          Login
        </Link>
      )}
      {isLoggedIn && <SignOut />}
    </>
  )
}

export default AuthOption
