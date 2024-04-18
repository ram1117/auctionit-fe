import NavlistItem from './NavListItem'
import HomeIcon from '@/public/menuicons/home.svg'
import PlusIcon from '@/public/menuicons/subscription.svg'
import AccountIcon from '@/public/menuicons/account.svg'
import ItemIcon from '@/public/menuicons/items.svg'

interface NavListProps {
  role: string | undefined
}

const NavList = ({ role }: NavListProps) => {
  return (
    <ul className="uppercase font-roboto text-secondary-text font-semibold flex flex-col items-start gap-6 p-4">
      <NavlistItem title="Home" src={HomeIcon} alt="Home Icon" href="/" />
      <NavlistItem
        title="Subscribed"
        src={PlusIcon}
        alt="Subscription Icon"
        href="/subscribed"
      />
      <NavlistItem
        title="My Items"
        src={ItemIcon}
        alt="items Icon"
        href="/items"
      />
      <NavlistItem
        title="Account"
        src={AccountIcon}
        alt="Account Icon"
        href="/account"
      />

      {role === 'admin' && (
        <NavlistItem
          title="Dashboard"
          src={AccountIcon}
          alt="Account Icon"
          href="/admin/dashboard"
        />
      )}
    </ul>
  )
}

export default NavList
