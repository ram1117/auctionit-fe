'use server'
import { cookies } from 'next/headers'

export const getUserRole = async () => {
  const token = cookies().get('role')
  if (token && token.value) return token.value
  return undefined
}

export const getJWTCookie = async () => {
  const token = cookies().get('token')
  if (token) return `${token.name}=${token.value}`
  return undefined
}
