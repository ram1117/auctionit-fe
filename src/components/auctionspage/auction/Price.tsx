interface PriceProps {
  price: number
}

const Price = ({ price }: PriceProps) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h5 className="font-light text-xs lg:text-sm text-center">Start Price</h5>
      <h5 className="text-lg lg:text-2xl font-semibold">$ {price}</h5>
    </div>
  )
}

export default Price
