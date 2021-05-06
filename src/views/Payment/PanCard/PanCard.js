import React, { Component } from 'react';
//import Switch from 'react-switch';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  FormGroup,
} from 'reactstrap';

import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { paymentActions } from '../../../_actions';
import { toast } from 'react-toastify';
import { CONST } from '../../../_config';

class PanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPaymentModal: false,
      showPaymentModal: false,
      deletePaymentModal: false,
      selectedPage: 1,
      totalpage: 0,
      checked: false
    };
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.addPaymentToggle = this.addPaymentToggle.bind(this);
    this.showPaymentToggle = this.showPaymentToggle.bind(this);
    this.deletePaymentToggle = this.deletePaymentToggle.bind(this);
    this.handleChangeAddPayment = this.handleChangeAddPayment.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.assignResourcePaymentToggle = this.assignResourcePaymentToggle.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(paymentActions.getPanCardDetails());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.payment.isAdminAdded) {
      this.setState({ addPaymentModal: false });
      this.props.dispatch(paymentActions.getAllPayment());
    }
    if (nextProps.payment.isAdminDeleted) {
      this.setState({ deletePaymentModal: false, deleteAdminIdToDelete: 0 });
      this.props.dispatch(paymentActions.getAllPayment());
    }
    if (nextProps.payment.total >= 0) {
      this.setState({ totalpage: nextProps.payment.total });
    }
    if (nextProps.payment.isAssignedResource) {
      this.setState({ assignResourcePaymentModal: false });
    }
    if (nextProps.payment.listOfResource) {
      this.setState({ listOfResource: nextProps.payment.listOfResource });
    }
    if (nextProps.payment.listOfAssignedResource) {
        let pancardList = this.state.listOfResource.map((array, key) => {
        if (nextProps.payment.listOfAssignedResource) {
          let findelement=nextProps.payment.listOfAssignedResource.find(x => x.resouresid === array.id);
          if (findelement) {
             array['checketstatus']=true;
          } else {
             array['checketstatus']=false;
          }
        }
        return array;
      }, []);
      this.setState({
        listOfResource: pancardList
      });

    }
  }
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  //Show Dialog box
  showPaymentToggle() {
    this.setState({
      showPaymentModal: !this.state.showPaymentModal
    });
  }
  showPaymentInfo(data) {
    this.setState({
      showAdminid: data.id,
      showAdminname: data.name,
      showAdminusername: data.username,
      showAdminstatus: data.status === '1' ? 'Active' : 'Deactive',
      showPaymentModal: !this.state.showPaymentModal,
      showAdminusertype: data.usertype,
      showAdmincreated: data.name
    });
  }
  //Add Dialog box
  addPaymentToggle() {
    this.setState({
      addPaymentModal: !this.state.addPaymentModal
    });
  }
  handleChangeAddPayment(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addPayment() {
    this.setState({ submitted: true });
    const { username, password, name } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      let data = {
        username: username,
        name: name,
        password: password
      };
      dispatch(paymentActions.addPayment(data));
    }
  }
  //Delete Dialog box
  deletePaymentToggle() {
    this.setState({
      deletePaymentModal: !this.state.deletePaymentModal
    });
  }
  deletePaymentConfirm(data) {
    this.setState({
      deleteAdminusername: data.username,
      deleteAdminIdToDelete: data.id,
      deletePaymentModal: !this.state.deletePaymentModal
    });
  }
  deletePaymentAfterConfirm() {
    this.setState({ submitted: true });
    const { deleteAdminIdToDelete } = this.state;
    const { dispatch } = this.props;
    if (deleteAdminIdToDelete) {
      //alert(deleteAdminIdToDelete)
      dispatch(paymentActions.deletePayment({ id: deleteAdminIdToDelete }));
    }
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    let data = {
      limit: 10,
      page: selectedPage,
      search: ''
    };
    this.props.dispatch(paymentActions.getAllPayment(data));
  }
  //Search
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      limit: 10,
      page: 1,
      search: value.replace(/^\s+|\s+$/g, '')
    };
    this.props.dispatch(paymentActions.getAllPayment(data));
  }
  //Assign Resource
  assignResourcePayment(paymentdetails) {
    
    this.setState({
      assignResourcePaymentModal: true,
      assignRolePaymentId: paymentdetails.id
    });
    let data={
      userid:paymentdetails.id
    }
     this.props.dispatch(paymentActions.getAssignedResourceList(data));

  }
  assignResourcePaymentToggle() {
    this.setState({
      assignResourcePaymentModal: !this.state.assignResourcePaymentModal
    });
  }
  handleSelectResourceChange(checked) {
    this.setState({ checked });
  }
  handleChangeCheckedResource(resource) {
    console.log(resource);
    let {listOfResource}=this.state;
    let findelement=listOfResource.find(x => x.id === resource.id);
    let findindex=listOfResource.findIndex(x => x.id === resource.id);
    console.log(findelement);
    console.log(findindex);

    listOfResource[findindex].checketstatus=!listOfResource[findindex].checketstatus;
     this.setState({
        listOfResource,
      });
    
  }
  submitAssignedRole() {
    let listOfResource = this.state.listOfResource;
    let checkedResource = [];
    for (let index = 0; index < listOfResource.length; index++) {
      let resource = listOfResource[index];

      if (resource.checketstatus) {
        checkedResource.push(resource.id);
      }
    }
    if (checkedResource.length > 0) {
      // alert(checkedResource)
      let reqData = {
        userid: this.state.assignRolePaymentId,
        resouresid: checkedResource
      };
      this.props.dispatch(paymentActions.saveAssignResourcePayment(reqData));
    } else {
      toast('Please select resource');
    }
  }
  render() {
    const { payment } = this.props;
    let { pancardList } = payment;
    return (
      <div className="animated fadeIn custom_background">
       {payment.loading?<div className="loader"></div>:null}
       {true ? <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> Pancard{' '}
                    <small className="text-muted">List</small>
                  </Col>
                  
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PAN-NUMBER</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pancardList
                      ? pancardList.map((payment, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>{payment.panname}</td>
                            <td>{payment.pannumber}</td>
                            <td>
                              <img
                                src={payment.panimage}
                                width="50"
                                height="50"
                                ref={img => this.img = img}
                                onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                                className="img-avatar"
                                alt=""
                              />
                            </td>
                            <td>
                              <Badge color={this.getBadge(payment.status)}>
                                {payment.status === '1'
                                  ? 'Active'
                                  : 'Inactive'}
                              </Badge>
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
        </Row> :null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { payment, authentication } = state;
  const { user } = authentication;

  return {
    user,
    payment
  };
}
export default connect(mapStateToProps)(PanCard);
