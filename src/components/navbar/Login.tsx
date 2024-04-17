'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  const [openPopup, setOpenPopup] = useState(false)

  return <>{openPopup && <LoginForm closePopup={setOpenPopup} />}</>
}

export default Login
