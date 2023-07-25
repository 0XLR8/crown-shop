import { Link } from "react-router-dom"
import { CartItem } from "./CartItem"; 
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from "../../store/cartReducer";

export const CartContent = () => {
    const dispatch = useDispatch();
    const {auth} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);

    return (
        <div className="cart-content">
            {
                cart.map(item => 
                    <CartItem 
                        key={item.id} 
                        cart={item}
                    />)
            }
            <Link 
                to={auth ? '/checkout' : '/auth?redirect=checkout'} 
                onClick={() => dispatch(cartActions.setShowCart(false))} 
                className="dropdown-trigger" 
            >
                CHECKOUT
            </Link>
        </div>
    )
}
