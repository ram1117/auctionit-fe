import NavList from './NavList'
import AuthOption from './AuthOption'
import { getUserRole } from '../../utils/authHelpers'

const NavPanel = async () => {
  const userRole = await getUserRole()
  console.log()
  return (
    <nav className="h-full p-4">
      <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4">
        Auction It
      </h2>
      <div className="py-4 mb-4 flex flex-col items-center">
        {userRole && <NavList role={userRole} />}
        <AuthOption isLoggedIn={userRole ? true : false} />
      </div>
    </nav>
  )
}

export default NavPanel
