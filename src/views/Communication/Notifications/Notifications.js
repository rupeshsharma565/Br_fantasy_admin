import React, { Component } from 'react';

import { Card, CardBody, CardHeader, Col, Row, Table, 
 FormGroup,
   Input,
   InputGroup,
   InputGroupAddon,
   Button,
 } from 'reactstrap';
import PaginationComponent from "react-reactstrap-pagination";
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';
import moment from 'moment'

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
       totalpage: 0,
       selectedPage:0
    }
    this.udpateUserStatus = this.udpateUserStatus.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount");
     let data = {
      limit: 10,
      page: 1,
      search: ''
    };
    this.props.dispatch(userActions.getAllNotification(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.notificationtotal) {
      this.setState({ totalpage: nextProps.users.notificationtotal })
    }
    if (nextProps.users.isUpdate) {
       let data = {
          "limit": 10,
          "page": this.state.selectedPage,
          "search": '',
          atype:'kycnonapproved'
        }
        //this.props.dispatch(userActions.getAll(data));
        this.props.dispatch(userActions.getAllNotification(data));
    }
  }
  getBadge = (status) => {
    return status === "1" ? 'success' :
      'danger'
  }
  handleSelectedPaginate(selectedPage) {
    console.log("selectedPage--->>",selectedPage)
    let data = {
      limit: 10,
      page: selectedPage,
      search: '',
      atype:'kycnonapproved'
    }
    this.setState({ selectedPage: selectedPage })
  

    //this.props.dispatch(userActions.getAll(data));
    this.props.dispatch(userActions.getAllNotification(data));
  }
  //Search  onClick={() => this.deleteSubAdminAfterConfirm(user,1)}
 handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      "limit": 10,
      "page": 1,
      "search": value.replace(/^\s+|\s+$/g, ''),
    }
    this.props.dispatch(userActions.getAllNotification(data));
  }
  udpateUserStatus = (user,status) => {
    console.log(user);
    console.log(status);
    let data={
      userid:user.id,
      status:status
    }
    this.props.dispatch(userActions.updateUserStatus(data));
  }
  render() {

    const { users } = this.props;
    let { notificationitems } = users;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify"></i> User <small className="text-muted">List</small>
                  </Col>
                  <Col xl="3"></Col>
                 <Col xl="3">
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                      <Input type="text" id="search" name="search" placeholder="search" onChange={this.handleChangeSearch} autoComplete="off" />
                    </InputGroup>
                  </Col> 
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PHONE</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">TEAM NAME</th>
                      <th scope="col">SUBJECT</th>
                      <th scope="col">MESSAGE</th>
                      <th scope="col">DATE</th>
                      {/* <th scope="col">PHONE VERIFY</th>
                      <th scope="col">BANK VERIFY</th>
                      <th scope="col">PAN VERIFY</th>
                      <th scope="col">STATUS</th> */}
                      {/* <th scope="col">ACTION</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      notificationitems ? notificationitems.map((user, index) => <tr key={index}>
                        <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                        <td><a block color="link" href={`#/users/allusers/${user.userid}`}>{user.phone}</a></td>
                        <td><a block color="link" href={`#/users/allusers/${user.userid}`}>{user.email}</a></td>
                        <td><a block color="link" href={`#/users/allusers/${user.userid}`}>{user.teamname}</a></td>
                        <td>{user.subject}</td>
                        <td>{user.message}</td>
                        
                        <td>{moment(new Date(parseInt(user.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD HH:mm")}</td>

                         {/* <td>
                          {user.status === "0" || user.status === "2" ?<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateUserStatus(user,1)}>Active&nbsp;&nbsp;&nbsp;</Button> &nbsp;</span>:null} 
                          {user.status === "1" || user.status === "2" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(user,0)}>Inactive</Button>&nbsp;</span>:null}
                          {user.status === "1" || user.status === "0" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(user,2)}>Block&nbsp;&nbsp;&nbsp;</Button>&nbsp;</span>:null}
                        </td> */}
                      </tr >
                      ) : null
                    }
                  </tbody>
                </Table>
                {
                parseInt(this.state.totalpage) > 10 ?
                 (<PaginationComponent totalItems={parseInt(this.state.totalpage)} pageSize={10} onSelect={this.handleSelectedPaginate} />) 
                 : (null)
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}
export default connect(mapStateToProps)(Notifications);

