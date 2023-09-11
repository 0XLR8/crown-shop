import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigation } from "./components/navigation/Navigation"
import { Home } from "./routes/Home"
import { Register } from "./routes/Register"
import { CategoriesRoute } from "./routes/CategoriesRoute"
import { NotFound } from "./routes/NotFound"
import { Products } from "./routes/Products"
import { Checkout } from "./routes/Checkout"
import { ResetPassword } from "./routes/ResetPassword"
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { Orders } from "./routes/Orders";
import { useEffect } from "react";
import { authObserver, getUser } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/authReducer"
import { cartActions } from "./store/cartReducer"
import { fetchProductsAsync } from "./store/productsReducer";

export const App = () => {
	const {cart} = useSelector(state => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		authObserver(async (user) => {
			if(user){
				const currentUser = await getUser(user.uid);
				dispatch(authActions.setCurrentUser(currentUser))
			} else {
				dispatch(authActions.setCurrentUser(null))
			}
			dispatch(authActions.setAuthPending(false))
		})
	}, [dispatch])

	useEffect(() => {
		dispatch(fetchProductsAsync());

        const sessionCart = localStorage.getItem('cart');

        if(sessionCart){
            dispatch(cartActions.setCart(JSON.parse(sessionCart)));
        }

    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

	return (
		<div className="main p-5">
			<Router>
				<Routes>
					<Route path='/' element={<Navigation />}>
						<Route element={<CategoriesRoute/>}>
							<Route index element={<Home />} />
							<Route path='shop/:id' element={<Products />} />
						</Route>
						<Route element={<ProtectedRoute />}>
							<Route path='orders' element={<Orders />} />
						</Route>
						<Route path='checkout' element={<Checkout />} />
						<Route path='auth'>
							<Route index  element={<Register />} />
							<Route path="reset" element={<ResetPassword />} />
						</Route>
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}
