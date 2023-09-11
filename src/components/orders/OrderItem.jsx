import { convertDate } from "../../utils/utils";
import { OrderItemProduct } from "./OrderItemProduct";

export const OrderItem = ({order}) => {
    const {orderId, createdAt, orderItems} = order;

    return (
        <div className='order-item'>
            <p>{orderId}</p>
            <p>{convertDate(createdAt)}</p>
            <div>
                {orderItems.map(item => <OrderItemProduct key={item.id} product={item} />)}
            </div>
        </div>
    )
}
