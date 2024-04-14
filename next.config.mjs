/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zkapgrjeqxzbewuhtvdn.supabase.co',
      },
    ],
  },
}

export default nextConfig
