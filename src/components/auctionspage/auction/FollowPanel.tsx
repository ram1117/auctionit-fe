import Bell from './Bell'

interface FollowPanelProps {
  auctionId: string
  subscription: {
    auction_id: string
    user_id: string
    notificationEnabled: boolean
  }
}

const FollowPanel = ({ auctionId, subscription }: FollowPanelProps) => {
  return (
    <div className="flex gap-2 lg:gap-4 items-center justify-center">
      <Bell auctionId={auctionId} enabled={subscription.notificationEnabled} />
    </div>
  )
}

export default FollowPanel
