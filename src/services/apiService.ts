import { SORT_BY } from '../constants'
import { getJWTCookie } from '../utils/authHelpers'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const apiGetRequest = async (url: string) => {
  try {
    const response: any = await fetch(url, {
      cache: 'no-store',
      credentials: 'include',
    }).then((response) => response.json())

    return response
  } catch (error) {
    throw error
  }
}

const apiGetRequestSSR = async (url: string, cookie: string) => {
  try {
    const response: any = await fetch(url, {
      headers: { 'Content-type': 'application/json', Cookie: cookie },
      cache: 'no-store',
    }).then((response) => response.json())

    return response
  } catch (error) {
    throw error
  }
}

const apiPostRequest = async (url: string, data: any) => {
  try {
    const response: any = await fetch(url, {
      method: API_METHODS.POST,
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
    })
    return response
  } catch (error) {
    throw error
  }
}

const apiPostRequestSSR = async (url: string, data: any, cookie: string) => {
  try {
    const response: any = await fetch(url, {
      method: API_METHODS.POST,
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json', Cookie: cookie },
    }).then((response) => response.json())
    return response
  } catch (error) {
    throw error
  }
}

export const getItemCategories = async () => {
  return apiGetRequest(`${baseUrl}/items/types`)
}

export const getLiveAuctions = async (
  sortBy: string = SORT_BY.NEWEST,
  pageNo = 1,
  categoryId: number
) => {
  return await apiGetRequest(
    `${baseUrl}/auctions/live?page=${pageNo}&sortby=${sortBy}&category=${categoryId}`
  )
}

export const getAuction = async (id: string) => {
  return await apiGetRequest(`${baseUrl}/auctions/auction/${id}`)
}

export const getUserInfo = async () => {
  const cookie = (await getJWTCookie()) || ''
  return await apiGetRequestSSR(`${baseUrl}/user/profile`, cookie)
}

export const signinUser = (data: any) => {
  return apiPostRequest(`${baseUrl}/auth/signin`, data)
}

export const signoutUser = () => {
  return apiPostRequest(`${baseUrl}/auth/signout`, {})
}

export const postDataSSR = () => {
  return apiPostRequestSSR('', {}, '')
}

export const postData = () => {
  return apiPostRequest('', {})
}

export const getDataSSR = () => {
  return apiGetRequestSSR('', '')
}
