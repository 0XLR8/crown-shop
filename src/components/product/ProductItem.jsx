import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartReducer";

export const ProductItem = ({id, categoryId, imageUrl, name, price, stock}) => {
	const dispatch = useDispatch();
	const isProductAvailable = stock > 0;

	return (
		<div className={isProductAvailable ? 'product-item' : 'product-item product-disabled'}>
			<div className="product-image" style={{backgroundImage: `url(${imageUrl})`}}>
				{isProductAvailable ?
					<button 
						className="product-button" 
						onClick={() => dispatch(cartActions.handleAddCart({id, name, price, imageUrl, categoryId}))}
					>
						ADD TO CART
					</button>
					:
					<p className="out-of-stock">OUR OF STOCK</p>
				}
			</div>
			<div className="d-flex justify-content-between">
				<p>{name}</p>
				<p>${price}</p>
			</div>
		</div>
	)
}
