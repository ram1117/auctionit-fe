import { SORT_BY } from '../constants'
import { getJWTCookie } from '../utils/authHelpers'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
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

const apiPatchRequestSSR = async (url: string, data: any) => {
  const cookie = (await getJWTCookie()) || ''

  try {
    const response: any = await fetch(url, {
      method: API_METHODS.PATCH,
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

export const updateNotification = (
  id: string,
  enabled: boolean,
  token: string
) => {
  if (enabled)
    return apiPostRequest(
      `${baseUrl}/notification/unsubscribe/${id}?token=${token}`,
      {}
    )
  else
    return apiPostRequest(
      `${baseUrl}/notification/subscribe/${id}?token=${token}`,
      {}
    )
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

export const subscribeToFirebaseTopics = () => {
  return apiPostRequest(`${baseUrl}/notification/subscribeall`, {})
}

export const updateUsername = async (data: any) => {
  return apiPatchRequestSSR(`${baseUrl}/user/username`, data)
}

export const updatePassword = async (data: any) => {
  return apiPatchRequestSSR(`${baseUrl}/user/password`, data)
}

export const getAdminItems = async (status: string) => {
  return apiGetRequest(`${baseUrl}/items/allitems?status=${status}`)
}

export const getItemDetails = (id: string) => {
  return apiGetRequestSSR(`${baseUrl}/items/item/${id}`)
}

export const createNewItem = (data: any) => {
  return apiPostRequestSSR(`${baseUrl}/items`, data)
}

export const updateItem = async (id: string, notforSale: boolean) => {
  return apiPatchRequestSSR(`${baseUrl}/items/${id}?status=${notforSale}`, {})
}

export const getAuctionCategories = () => {
  return apiGetRequest(`${baseUrl}/auctions/auction/categories`)
}

export const createNewAuction = (data: any) => {
  return apiPostRequestSSR(`${baseUrl}/auctions`, data)
}

export const getAdminAuctions = (status: string) => {
  return apiGetRequest(`${baseUrl}/auctions/admin/auctions?status=${status}`)
}

export const cancelAuction = (itemId: string) => {
  return apiPatchRequestSSR(`${baseUrl}/auctions/${itemId}`, {})
}
