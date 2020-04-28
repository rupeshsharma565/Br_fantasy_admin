import React, { Component } from 'react';

import {
  Card,
  CardBody,
  Col,
  Row,
  Form,
  CardGroup,
  Button,
  InputGroupText,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { userActions } from '../../_actions';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpassword: '',
      newpassword: '',
      confirmnewpassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    
  }
  componentDidMount() {
    
  }
  componentWillReceiveProps(nextProps) {
    // if (nextProps.users.isPasswordChange) {
      
    //   this.setState({
    //     currentpassword: '',
    //     newpassword: '',
    //     confirmnewpassword: ''
    //   })
    // }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  changePassword() {
   let data={
      oldpassword: this.state.currentpassword,
      password: this.state.newpassword
   }
   if (!this.state.currentpassword && !this.state.newpassword && !this.state.confirmnewpassword) {
      toast('Please fill form.');
   }else  if (this.state.currentpassword === this.state.newpassword ) {
      toast('Current password and New password should not be same.');
   } else if (this.state.confirmnewpassword!==this.state.newpassword) {
      toast('Confirm password and New confirm password should  be same.');
   } else {
     console.log(data);
     this.props.dispatch(userActions.changePassword(data));
   }
  
  }
 
  render() {

    return (
      <div className="animated fadeIn ">
      <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form name="form" >
                      <p className="text-muted">Change Password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Current Password" name="currentpassword" autoComplete="off" value={this.state.currentpassword} onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="New Password" name="newpassword" autoComplete="off" value={this.state.newpassword} onChange={this.handleChange} />
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Confirm New Password" name="confirmnewpassword" autoComplete="off" value={this.state.confirmnewpassword} onChange={this.handleChange} />
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={() =>this.changePassword()}>Submit</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
       
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { subadmin, authentication } = state;
  const { user } = authentication;

  return {
    user,
    subadmin
  };
}
export default connect(mapStateToProps)(ChangePassword);
