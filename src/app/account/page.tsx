import BackButton from '../../atoms/BackButton'
import { getUserInfo } from '../../services/apiService'
import ImageWrapper from '../../atoms/ImageWrapper'
import UserIcon from '@/public/icons/user.svg'
import NickName from '../../components/account/NickName'
import Password from '../../components/account/Password'
import PageHeader from '../../atoms/PageHeader'

const AccountPage = async () => {
  const userInfo = await getUserInfo()
  return (
    <main className="min-h-screen p-4">
      <BackButton />
      <PageHeader title="Account" />
      <section className="max-w-[650px] my-8 mx-auto bg-white rounded-md shadow-md shadow-slate-300 px-4">
        <div className="my-4 p-4 flex justify-center items-start lg:items-center justify-between border-b flex-col lg:flex-row gap-4">
          <div className="flex gap-2 items-center justify-center">
            <ImageWrapper
              src={UserIcon}
              alt="user icon"
              containerClassName="h-10 w-10 lg:h-16 lg:w-16"
            />
            <div>
              <h5 className="text-base lg:text-xl font-bold">
                {userInfo.fullname}
              </h5>
              <h5 className="text-sm lg:text-base">{userInfo.location}</h5>
            </div>
          </div>
          <h5 className="lg:text-base text-sm">{userInfo.email}</h5>
        </div>
        <NickName nickname={userInfo.username} />
        <Password />
      </section>
    </main>
  )
}

export default AccountPage
