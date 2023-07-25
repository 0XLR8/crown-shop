import { CustomToggle } from "../CustomToggle";
import { Dropdown } from "react-bootstrap";
import { Bag } from "react-bootstrap-icons";
import { useEffect } from "react";
import { CartContent } from "./CartContent";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartReducer";

export const CartDropdown = () => {
    const {cart, showCartMenu} = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!Boolean(cart.length)){
            dispatch(cartActions.setShowCart(false))
        }
    }, [cart, dispatch])

    const totalCartItems = cart.reduce((acc, cartItem) => acc + cartItem.count, 0);

    return (
        <Dropdown 
            show={showCartMenu} 
            onToggle={() => dispatch(cartActions.setShowCart(!showCartMenu))} 
            autoClose="outside" 
            drop="down-centered" 
            className="cart-icon"
        >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <Bag />
                <div className="cart-number">{totalCartItems}</div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
                {cart.length ?
                    <CartContent />
                    :
                    <p className="text-center">Cart is empty</p>
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
