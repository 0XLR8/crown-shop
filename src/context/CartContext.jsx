import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [showCartMenu, setShowCartMenu] = useState(false);

    useEffect(() => {
        const sessionCart = localStorage.getItem('cart');

        if(sessionCart){
            setCart(JSON.parse(sessionCart));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    const handleCartAdd = (item) => {
        const findDoubleItem = cart.find(cartItem => cartItem.id === item.id);

        if(findDoubleItem){
            const newCart = cart.map(cartItem => {
                if(cartItem.id === findDoubleItem.id){
                    cartItem.count += 1;
                }
                return cartItem
            })
            setCart(newCart);
            return;
        }

        setCart([
            ...cart,
            {
                ...item,
                count: 1
            }
        ])
    }

    const handleCartRemove = (id) => {
        const newCart = cart.filter(cartItem => cartItem.id !== id);

        setCart(newCart);
    }

    const handleCartDecrease = (id) => {
        const newCart = cart.map(cartItem => {
            if(cartItem.id === id){
                cartItem.count -= 1;
            }
            return cartItem;
        }).filter(cartItem => cartItem.count > 0);
        
        setCart(newCart);
    }

    const handleCartIncrease = (id) => {
        const newCart = cart.map(cartItem => {
            if(cartItem.id === id){
                cartItem.count += 1;
            }
            return cartItem;
        })
        
        setCart(newCart);
    }

    return(
        <CartContext.Provider value={{
            cart,
            setCart,
            showCartMenu,
            setShowCartMenu,
            handleCartRemove,
            handleCartAdd,
            handleCartDecrease,
            handleCartIncrease
        }}>
            {children}
        </CartContext.Provider>
    )
}