import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav,  } from 'reactstrap';
import * as moment from 'moment';
import PropTypes from 'prop-types';
//import { Route, Redirect } from 'react-router'
//import { AppHeaderDropdown,  AppSidebarToggler } from '@coreui/react';
import {  AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class DefaultHeader extends Component {
  constructor(props) {
		
		super(props)
		
		this.state = {
			time: new Date()
		}
		
	}
  componentDidMount() {
		
		setInterval(this.update, 1000)
		
	}
	
	update = () => {
		
		this.setState({
			time: new Date()
		})
		
	}
  changePassword = () => {
    window.location.hash = "#/changepassword";
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()
		const s = this.state.time.getSeconds()

    return (
        <div>

        <header>
    <div className="logo">
      <a href="index.html"> <img className="small_logo" src="images/logo_icon.png" alt="img"/> <img className="large_logo" src="images/logo.png"
          alt="img"/> </a>
    </div>
    <div className="header_rightcol">
      <ul className="pull-left">
        <li>
          <AppSidebarToggler className="d-md-down-none" display="lg" />
        </li>
        
      </ul>
      <ul className="datetime_head">
        <li > {moment(Date.now()).format("DD-MM-YYYY")} 
        {`  `+ h % 12}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'}
        </li>
      </ul>
      <ul className="pull-right">
        <li> 
            <Nav className="ml-auto" navbar>
              <AppHeaderDropdown direction="down">
                  <DropdownToggle nav>
                      <img src={ '../../assets/img/avatars/admin.svg'} className="img-avatar" alt="" />
                  </DropdownToggle>
                  <DropdownMenu right style={{ right: 'auto' }}>
                      <DropdownItem onClick={()=> this.changePassword()}><i className="fa fa-wrench"></i>Change Password </DropdownItem>
                      <DropdownItem onClick={e=> this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                  </DropdownMenu>
              </AppHeaderDropdown>
            </Nav>
          </li>
      </ul>
    </div>
  </header>
      </div>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
