import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { CheckoutCartItem } from '../components/checkout/CheckoutCartItem';
import { completeCheckout } from '../utils/utils';
import { ThankYou } from '../components/checkout/ThankYou';
import { addOrder } from '../firebase';
import { cartActions } from '../store/cartReducer';

export const Checkout = () => {
    const {auth, authPending} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);

    const total = cart.reduce((acc, curr) => acc + (curr.count * curr.price), 0);

    const handleCompleteCheckout = async () => {
        setCheckoutLoading(true);
        try{
            await completeCheckout();
            await addOrder(auth.id, cart);
            
            dispatch(cartActions.setCart([]))
            setCheckoutLoading(false);
            setCheckoutCompleted(true);
        } catch(er) {
            setCheckoutLoading(false)
        }
    }   

    if(authPending || checkoutLoading){
        return <Loader />
    }

    if(!auth){
        return <Navigate to='/auth' />
    }

    if(checkoutCompleted){
        return <ThankYou />
    }

    if(!Boolean(cart.length)){
        return <h3 className='text-center pt-5'>No items in cart.</h3>
    }

    return (
        <div className='checkout'>
            <div className='checkout-item'>
                <p>Product</p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Remove</p>
            </div>
            {
                cart.map(cartItem => <CheckoutCartItem key={cartItem.id} cart={cartItem} />)
            }
            <h2 className='checkout-total my-4'>TOTAL: ${total}</h2>
            <button onClick={handleCompleteCheckout} className='buy-btn'>Buy</button>
        </div>
    )
}
