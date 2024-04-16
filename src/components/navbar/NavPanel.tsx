import NavList from './NavList'
import Login from './Login'

const NavPanel = () => {
  return (
    <nav className="h-full p-4">
      <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4">
        Auction It
      </h2>
      <div className="py-4 mb-4 flex flex-col items-center">
        <NavList />
        <Login />
      </div>
    </nav>
  )
}

export default NavPanel
