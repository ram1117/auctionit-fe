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
          className="uppercase w-2/3 py-2 my-16 bg-button-primary text-white font-medium rounded-lg text-center"
        >
          Login
        </Link>
      )}
      {isLoggedIn && <SignOut />}
    </>
  )
}

export default AuthOption
