import BackButton from '../../atoms/BackButton'
// import { getUserInfo } from '../../services/apiService'

const AccountPage = async () => {
  // const userInfo = await getUserInfo()
  // console.log(userInfo)
  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <h1 className="pb-4 w-max mx-auto track-tight text-lg lg:text-2xl font-bold text-center border-b">
        Account
      </h1>
    </main>
  )
}

export default AccountPage
