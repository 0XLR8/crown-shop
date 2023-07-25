import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const AuthNav = ({handleLogOut}) => {
  return (
    <>
        <Link to='/orders'>Orders</Link>
        <Dropdown.Divider />
        <Link onClick={handleLogOut}>Log out</Link>
    </>
  )
}
