import NavlistItem from './NavListItem'
import HomeIcon from '@/public/menuicons/home.svg'
import PlusIcon from '@/public/menuicons/subscription.svg'
import AuctionIcon from '@/public/menuicons/auction.svg'
import AccountIcon from '@/public/menuicons/account.svg'
import ItemIcon from '@/public/menuicons/items.svg'

const NavList = () => {
  return (
    <ul className="uppercase font-roboto text-secondary-text font-semibold flex flex-col items-start gap-6 p-4">
      <NavlistItem title="Home" src={HomeIcon} alt="Home Icon" href="/" />
      <NavlistItem
        title="Following"
        src={PlusIcon}
        alt="Subscription Icon"
        href="/subscribed"
      />
      <NavlistItem
        title="My Auctions"
        src={AuctionIcon}
        alt="Auction Icon"
        href="/auctions"
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
    </ul>
  )
}

export default NavList
