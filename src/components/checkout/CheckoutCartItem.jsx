import { Trash3 } from "react-bootstrap-icons";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartReducer";

export const CheckoutCartItem = ({cart}) => {
    const {id, name, price, count, imageUrl} = cart;

    const dispatch = useDispatch();
    const {handleCartRemove, handleCartDecrease, handleCartIncrease} = cartActions;

    return (
        <div className='checkout-item'>
            <img src={imageUrl} alt={name} />
            <p>{name}</p>
            <div className='checkout-quantity'>
                <CaretLeftFill className="checkout-icon" onClick={() => dispatch(handleCartDecrease(id))}/>
                <span className="mx-1">{count}</span>
                <CaretRightFill className="checkout-icon" onClick={() => dispatch(handleCartIncrease(id))}/>
            </div>
            <p>${price}</p>
            <Trash3 className="cart-trash" onClick={() => dispatch(handleCartRemove(id))}/>
        </div>
    )
}
