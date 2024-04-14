import { SORT_BY } from '../app/constants'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const apiGetRequest = async (url: string) => {
  try {
    const response: any = await fetch(url).then((response) => response.json())

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
  pageNo = 1
) => {
  console.log(`${baseUrl}/auctions/live?page=${pageNo}&sortby=${sortBy}`)

  return apiGetRequest(
    `${baseUrl}/auctions/live?page=${pageNo}&sortby=${sortBy}`
  )
}

export const postData = () => {
  return apiPostRequest('', {})
}
