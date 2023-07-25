export const OrderItemProduct = ({product}) => {
  return (
    <div className='my-2'>
        {product.count} x {product.name}
    </div>
  )
}
