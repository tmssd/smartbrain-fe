import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ toggleModal, onRouteChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen)
  };

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
          <DropdownItem onClick={() => onRouteChange('signout')}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default ProfileIcon;
