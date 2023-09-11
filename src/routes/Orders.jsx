import { useEffect, useState } from "react"
import { Loader } from "../components/Loader";
import { getOrders } from "../firebase";
import { useSelector } from 'react-redux';
import { OrderItem } from "../components/orders/OrderItem";

export const Orders = () => {
    const {auth} = useSelector((state) => state.auth);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const orders = await getOrders(auth.id);
            orders.sort((a,b) => b.createdAt.toMillis() - a.createdAt.toMillis());
            setOrders(orders);
            setLoading(false);
        }

        fetchOrders();
    }, [auth.id])

    if(loading){
        return <Loader />
    }

    return (
        <div className="orders">
            <h1 className="mb-5">Orders</h1>
            {!Boolean(orders.length) && <p className="text-center mt-5">No orders available</p> }
            {Boolean(orders.length) && (
                <>
                    <div className="order-item">
                        <p>Order Id</p>
                        <p>Created At</p>
                        <p>Order Items</p>
                    </div>
                    {
                        orders.map(order => <OrderItem key={order.orderId} order={order}/>)
                    }
                </>
            )}
        </div>
    )
}
