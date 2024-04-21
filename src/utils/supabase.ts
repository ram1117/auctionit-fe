import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

const StorageUrl = process.env.SUPABASE_STORAGE_URL || ''
const ServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

const supabaseClient: SupabaseClient = createClient(StorageUrl, ServiceKey)

const uploadImage = async (image: File) => {
  const filepath = `/${uuidv4()}${image.name}`

  try {
    const { data } = await supabaseClient.storage
      .from('itemimages')
      .upload(filepath, image, {
        contentType: 'image/jpg' || 'image/jpeg' || 'image/png',
        upsert: true,
      })

    const {
      data: { publicUrl },
    } = supabaseClient.storage.from('itemimages').getPublicUrl(data?.path || '')

    return publicUrl
  } catch (error) {
    console.error(error)
  }
}

export default uploadImage
