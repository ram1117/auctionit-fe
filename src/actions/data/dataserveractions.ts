'use server'

import {
  getAdminAuctions,
  getAdminItems,
  updateNotification,
} from '../../services/apiService'

export const GetItemsAction = async (status: string) => {
  return await getAdminItems(status)
}

export const GetAuctionsAction = async (status: string) => {
  return await getAdminAuctions(status)
}

export const UpdateNotificationAction = async (
  id: string,
  enabled: boolean,
  token: string
) => {
  const response = await updateNotification(id, enabled, token)
  return await response.json()
}
