import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    }
  }

  toggle = () => {
    // console.log(this.state.dropdownOpen)
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
    // console.log(this.state.dropdownOpen)
    /*     this.setState({
          dropdownOpen: !this.state.dropdownOpen,
        }) */
  }

  render() {
    return (
      <div className="pa4 tc">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
            <img src="https://images.rawpixel.com/image_png_1300/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjgzMi10ZS0wMl8xLnBuZw.png" className="br-100 ba h3 w3 dib" alt="avatar" style={{ marginBottom: '50px' }} />
          </DropdownToggle>
          <DropdownMenu
            className="b--transparent shadow-5"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
            <DropdownItem onClick={() => this.props.onRouteChange('signout')}>Sign Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

export default ProfileIcon;
