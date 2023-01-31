import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteLogoutUserTokenMutation } from '../../store/slices/api/apiSlice.js';
import { resetUser } from '../../store/slices/user/userSlice';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ setIsSignedIn, toggleModal }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const toggle = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen)
  };

  const [
    deleteLogoutUserTokenFromApi,
    // {
    // isLoading: isLoadingLogoutUserTokenFromApi,
    // isSuccess: isSuccessLogoutUserTokenFromApi,
    // isError: isErrorLogoutUserTokenFromApi,
    // error: errorULogoutserTokenFromApi,
    // }
  ] = useDeleteLogoutUserTokenMutation();

  const removeSessionToken = () => {
    window.sessionStorage.removeItem('token');
  }

  const handleSignout = () => {
    removeSessionToken();
    deleteLogoutUserTokenFromApi({ userId: user.id, token: window.sessionStorage.getItem('token') });
    setIsSignedIn(false);
    dispatch(resetUser());
  }

  return (
    <div className="pa4 tc">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
          <img src="https://images.rawpixel.com/image_png_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjgzMi10ZS0wMl8xLnBuZw.png" className="br-100 ba h3 w3 dib" alt="avatar" style={{ marginBottom: '50px' }} />
        </DropdownToggle>
        <DropdownMenu
          className="b--transparent shadow-5"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
        >
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <Link to='/' style={{ textDecoration: 'none' }} onClick={() => handleSignout()}><DropdownItem>Sign Out</DropdownItem></Link>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ProfileIcon;
