import { Dropdown } from "react-bootstrap";
import { CustomToggle } from "../CustomToggle";
import { Person } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { signUserOut } from "../../firebase";
import { AuthNav } from "./AuthNav";

export const UserDropdown = () => {
    const {auth} = useSelector((state) => state.auth);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogOut = (e) => {
        e.preventDefault();
        signUserOut();
        setShowUserMenu(false);
    }

    const closeDropdown = () => {
        setShowUserMenu(false);
    }

    return (
        <Dropdown show={showUserMenu} onToggle={() => setShowUserMenu(!showUserMenu)} autoClose='outside' drop='down-centered'>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <Person />
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu">
                {!auth && <Link to='/auth' onClick={closeDropdown}>Sign In</Link>}
                {auth && <AuthNav handleLogOut={handleLogOut} />}
                    
            </Dropdown.Menu>
        </Dropdown>
    )
}
