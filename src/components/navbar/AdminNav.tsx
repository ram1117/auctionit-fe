import NavListItem from './NavListItem'
import AdminIcon from '@/public/icons/admin.svg'

const AdminNav = () => {
  return (
    <div>
      <h4 className="py-2 my-4 border-b uppercase text-lg font-bold">Admin</h4>
      <div className="ps-2 flex flex-col gap-4">
        <NavListItem
          title="Items"
          src={AdminIcon}
          alt="ADmin Action Icon"
          href="/admin/items"
        />
        <NavListItem
          title="Auctions"
          src={AdminIcon}
          alt="ADmin Action Icon"
          href="/admin/auctions"
        />
      </div>
    </div>
  )
}

export default AdminNav
