'use client'

import NavPanel from './NavPanel'
import ImageWrapper from '../../atoms/ImageWrapper'
import { useState } from 'react'
import MenuIcon from '@/public/menuicons/menu.svg'

const MobileMenu = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const handleClick = () => {
    setOpenMenu((prev) => !prev)
  }

  return (
    <div className="flex justify-end lg:hidden relative p-4">
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
          <div className="absolute bg-slate-100 z-[999] top-14 w-2/3 shadow-lg shadow-slate-200 rounded-lg">
            <NavPanel />
          </div>
        </>
      )}
    </div>
  )
}

export default MobileMenu
