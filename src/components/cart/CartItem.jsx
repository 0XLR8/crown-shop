import { Trash3 } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { cartActions } from "../../store/cartReducer";

export const CartItem = ({cart}) => {
    const {id, name, imageUrl, price, count} = cart;
    const dispatch = useDispatch();
    
    return (
        <div className="cart-item">
            <img src={imageUrl} alt={name} />
            <div className="cart-info">
                <p>{name}</p>
                <p>{count} x ${price}</p>
            </div>
            <Trash3 className="cart-trash" onClick={() => dispatch(cartActions.handleCartRemove(id))}/>
        </div>
    )
}
