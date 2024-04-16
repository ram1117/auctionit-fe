'use server'
import { cookies } from 'next/headers'

export const isLoggedIn = () => {
  const token = cookies().get('token')
  return token && token.value
}

export const getCookie = () => {
  const token = cookies().get('token')
  if (token) return `${token.name}=${token.value}`
  return undefined
}
