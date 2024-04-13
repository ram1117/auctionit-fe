import NavList from './NavList'
const NavPanel = () => {
  return (
    <nav className="h-full p-4">
      <h2 className="font-lobstertwo text-2xl lg:text-3xl font-bold text-center border-b py-4">
        Auction It
      </h2>
      <div className="uppercase py-4 mb-4 flex flex-col items-center">
        <NavList />
        <button className="uppercase w-2/3 py-2 my-16 bg-button-primary text-white font-medium rounded-lg">
          Login
        </button>
      </div>
    </nav>
  )
}

export default NavPanel
