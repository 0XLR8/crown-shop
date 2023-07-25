import { createContext, useEffect, useState } from "react";
import { getCategories } from "../firebase";

export const ProductsContext = createContext(null);

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategories();
            setProducts(res);
            setLoading(false);
        }

        fetchCategories();
    }, [])

    return(
        <ProductsContext.Provider value={{
            products,
            loading,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}