'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  const [openPopup, setOpenPopup] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpenPopup((prev) => !prev)}
        className="uppercase w-2/3 py-2 my-16 bg-button-primary text-white font-medium rounded-lg"
      >
        Login
      </button>
      {openPopup && <LoginForm closePopup={setOpenPopup} />}
    </>
  )
}

export default Login
