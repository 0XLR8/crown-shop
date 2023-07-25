import { Loader } from "../components/Loader";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

export const CategoriesRoute = () => {
    const {productsPending} = useSelector((state) => state.products)

    if(productsPending){
        return <Loader />
    }

    return (
        <Outlet />
    )
}
