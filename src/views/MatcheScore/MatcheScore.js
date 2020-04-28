import React, { Component } from 'react';
//import Switch from 'react-switch';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  //Badge,
  Button,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  FormGroup,
  Input,
  //Label,
  InputGroup,
  InputGroupAddon,
  // ListGroup,
  // ListGroupItem
} from 'reactstrap';
import moment from 'moment'

import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { withdrawActions } from '../../_actions';
//import { toast } from 'react-toastify';

class MatcheScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addWithdrawModal: false,
      showWithdrawModal: false,
      deleteWithdrawModal: false,
      selectedPage: 0,
      totalpage: 0,
      checked: false
    };
    this.udpateStatus = this.udpateStatus.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
  }
  componentDidMount() {
      let data = {
      "limit": 10,
      "page": 1,
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.withdraw.isUpdate) {
      this.props.dispatch(withdrawActions.getAllWithdraw());
    }
  }
    handleChangeSearch(e) {
    const { value } = e.target;
    // console.log("name ", name);
    //  console.log("value ", value);
    //this.setState({ [name]: value });

    let data = {
      "limit": 10,
      "page": 1,
      "search": value.replace(/^\s+|\s+$/g, ''),
    }
    this.props.dispatch(withdrawActions.getAllWithdraw(data));
  }
  udpateStatus(withdraw) {
    let data={
      id:withdraw.id,
      status:"1"
    }
    this.props.dispatch(withdrawActions.updateWithdraw(data));
  }
  render() {
    const { withdraw } = this.props;
    let { items } = withdraw;
    return (
      <div className="animated fadeIn custom_background">
        {withdraw.loading?<div className="loader"></div>:null}
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> WithdrawRequest{' '}
                    <small className="text-muted">List</small>
                  </Col>
                  <Col xl="3">
                  </Col>
                  <Col xl="3">
                   <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary">
                          <i className="fa fa-search" />
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Email"
                        onChange={this.handleChangeSearch}
                        autoComplete="off"
                      />
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
                      <th scope="col">AMOUNT</th>
                      <th scope="col">DATE</th>
                      <th scope="col">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((withdraw, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td><a block color="link" href={`#/users/allusers/${withdraw.userid}`}>{withdraw.phone}</a></td>
                            <td><a block color="link" href={`#/users/allusers/${withdraw.userid}`}>{withdraw.email}</a></td>
                            <td>{withdraw.amount}</td>
                             <td>{moment(new Date(parseInt(withdraw.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}</td>
                            <td>
                            {withdraw.status === "0" ?<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateStatus(withdraw,1)}>Pay</Button> </span>:"Paid"} 
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {this.state.totalpage > 10 ? (
                  <PaginationComponent
                    totalItems={parseInt(this.state.totalpage)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { withdraw, authentication } = state;
  const { user } = authentication;

  return {
    user,
    withdraw
  };
}
export default connect(mapStateToProps)(MatcheScore);
