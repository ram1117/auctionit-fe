'use client'

import NavList from './NavList'
import Login from './Login'
import SignOut from './SignOut'
import { getUserInfo } from '../../services/apiService'
import { useEffect, useState } from 'react'

const NavPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    getUserInfo().then((data) => {
      if (data.username) {
        setIsLoggedIn(true)
      }
    })
  }, [])

  return (
    <nav className="h-full p-4">
      <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4">
        Auction It
      </h2>
      <div className="py-4 mb-4 flex flex-col items-center">
        {isLoggedIn && (
          <>
            <NavList />
            <SignOut />
          </>
        )}
        {!isLoggedIn && <Login />}
      </div>
    </nav>
  )
}

export default NavPanel
