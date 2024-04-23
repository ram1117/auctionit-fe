'use client'

import ImageWrapper from '../../atoms/ImageWrapper'
import { useState } from 'react'
import MenuIcon from '@/public/menuicons/menu.svg'
import NavList from './NavList'

interface MobileMenuProps {
  role: string | undefined
}

const MobileMenu = ({ role }: MobileMenuProps) => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleClick = () => {
    setOpenMenu((prev) => !prev)
  }

  return (
    <div className="flex justify-between lg:hidden relative p-4">
      <button onClick={handleClick}>
        <ImageWrapper
          src={MenuIcon}
          alt="Menu Icon"
          containerClassName="h-8 w-8"
        />
      </button>
      {openMenu && (
        <>
          <div className="absolute h-0 w-0 top-10 right-6 border-x-8 border-x-transparent border-b-[16px] border-b-slate-100"></div>
          <div className="absolute right-4 bg-slate-100 z-[999] top-14 w-2/3 shadow-md shadow-slate-300 rounded-lg w-max p-6">
            <NavList role={role} />
          </div>
        </>
      )}
    </div>
  )
}

export default MobileMenu
