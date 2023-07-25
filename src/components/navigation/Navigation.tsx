import {Link, Outlet} from 'react-router-dom';
import { Logo } from './Logo';
import { UserDropdown } from './UserDropdown';
import { CartDropdown } from '../cart/CartDropdown';

export const Navigation = () => {
    return (
        <>
            <div className='navigation d-flex align-items-center mb-5'>
                <Logo />
                <Link className='navigation-link' to='/'>Shop</Link>
                <UserDropdown />
                <CartDropdown />
            </div>
            <Outlet />
        </>
    )
}
