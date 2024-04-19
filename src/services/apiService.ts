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

const apiGetRequestSSR = async (url: string) => {
  const cookie = (await getJWTCookie()) || ''
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

const apiPostRequestSSR = async (url: string, data: any) => {
  const cookie = (await getJWTCookie()) || ''

  try {
    const response: any = await fetch(url, {
      method: API_METHODS.POST,
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json', Cookie: cookie },
    })
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
  return await apiGetRequestSSR(`${baseUrl}/auctions/auction/${id}`)
}

export const getUserInfo = async () => {
  return await apiGetRequestSSR(`${baseUrl}/user/profile`)
}

export const signinUser = (data: any) => {
  return apiPostRequest(`${baseUrl}/auth/signin`, data)
}

export const signupUser = (data: any) => {
  return apiPostRequest(`${baseUrl}/auth/signup`, data)
}

export const signoutUser = () => {
  return apiPostRequest(`${baseUrl}/auth/signout`, {})
}

export const getPlacedBids = async () => {
  return apiGetRequestSSR(`${baseUrl}/bid/user/all`)
}

export const getNotificationStatus = async (auctionId: string) => {
  return await apiGetRequestSSR(`${baseUrl}/subscribe/${auctionId}`)
}

export const getItemsWon = async () => {
  return apiGetRequestSSR(`${baseUrl}/items/user/items`)
}

export const postBid = async (data: any) => {
  return apiPostRequestSSR(`${baseUrl}/bid`, data)
}

export const updateNotification = (id: string, enabled: boolean) => {
  console.log('Notification  ', enabled)
  if (enabled)
    return apiPostRequest(`${baseUrl}/notification/unsubscribe/${id}`, {})
  else return apiPostRequest(`${baseUrl}/notification/subscribe/${id}`, {})
}

export const getTokenFromDatabase = () => {
  return apiGetRequest(`${baseUrl}/notification/tokens/`)
}

export const postNotificationToken = (token: string) => {
  return apiPostRequest(`${baseUrl}/notification/token/`, {
    device_type: 'browser',
    notification_token: token,
  })
}
