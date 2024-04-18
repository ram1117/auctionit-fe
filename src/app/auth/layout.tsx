interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className=" flex flex-col min-h-screen items-center justify-start z-[999] py-8">
      <div className="my-8 bg-white w-11/12 overflow-y-scroll lg:w-2/3 h-4/5 flex flex-col items-center justify-start rounded-md border-2 border-primary max-w-[768px] relative">
        {children}
      </div>
    </main>
  )
}

export default AuthLayout
