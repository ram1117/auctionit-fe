import NavList from './NavList'
import AuthOption from '../auth/AuthOption'
import { getUserRole } from '../../utils/authHelpers'
// import MobileMenu from './MobileMenu'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import React from 'react'

const NavPanel = async () => {
  const userRole = await getUserRole()
  return (
    <nav className="h-full p-1 px-4 lg:p-4 flex lg:flex-col items-center justify-between lg:justify-start">
      <div>
        <Link href="/">
          <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center lg:border-b py-1 lg:py-4">
            Auction It
          </h2>
        </Link>

        <div className="hidden lg:block">
          {userRole && <NavList role={userRole} />}
        </div>
      </div>

      <div className="py-1 lg:py-4 lg:mb-4 flex lg:flex-col items-center">
        <AuthOption isLoggedIn={userRole ? true : false} />
        {userRole && <MobileMenu role={userRole} />}
      </div>
    </nav>
  )
}

export default React.memo(NavPanel)
