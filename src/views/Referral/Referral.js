import React, { Component } from 'react';
//import Switch from 'react-switch';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  // Table,
  // Badge,
  Button,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  FormGroup,
  Input,
  Label,Alert
  // InputGroup,
  // InputGroupAddon,
  // ListGroup,
  // ListGroupItem
} from 'reactstrap';

//import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { settingActions } from '../../_actions';
import { toast } from 'react-toastify';

class Referral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addReferralModal: false,
      showReferralModal: false,
      deleteReferralModal: false,
      selectedPage: 0,
      totalpage: 0,
      checked: false
    };
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.addReferralToggle = this.addReferralToggle.bind(this);
    this.showReferralToggle = this.showReferralToggle.bind(this);
    this.deleteReferralToggle = this.deleteReferralToggle.bind(this);
    this.handleChangeAddReferral = this.handleChangeAddReferral.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.assignResourceReferralToggle = this.assignResourceReferralToggle.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getReferralPoint());
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.setting.referralDetails) {
      this.setState({referralDetails:nextProps.setting.referralDetails})
    }
    if (nextProps.setting.isSettingUpdate) {
        this.props.dispatch(settingActions.getReferralPoint());
    }

    
    
  }
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  //Show Dialog box
  showReferralToggle() {
    this.setState({
      showReferralModal: !this.state.showReferralModal
    });
  }
  showReferralInfo(data) {
    this.setState({
      showAdminid: data.id,
      showAdminname: data.name,
      showAdminusername: data.username,
      showAdminstatus: data.status === '1' ? 'Active' : 'Deactive',
      showReferralModal: !this.state.showReferralModal,
      showAdminusertype: data.usertype,
      showAdmincreated: data.name
    });
  }
  //Add Dialog box
  addReferralToggle() {
    this.setState({
      addReferralModal: !this.state.addReferralModal
    });
  }
  handleChangeAddReferral(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addReferral() {
    this.setState({ submitted: true });
    const { username, password, name } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      let data = {
        username: username,
        name: name,
        password: password
      };
      dispatch(settingActions.addReferral(data));
    }
  }
  //Delete Dialog box
  deleteReferralToggle() {
    this.setState({
      deleteReferralModal: !this.state.deleteReferralModal
    });
  }
  deleteReferralConfirm(data) {
    this.setState({
      deleteAdminusername: data.username,
      deleteAdminIdToDelete: data.id,
      deleteReferralModal: !this.state.deleteReferralModal
    });
  }
  deleteReferralAfterConfirm() {
    this.setState({ submitted: true });
    const { deleteAdminIdToDelete } = this.state;
    const { dispatch } = this.props;
    if (deleteAdminIdToDelete) {
      //alert(deleteAdminIdToDelete)
      dispatch(settingActions.deleteReferral({ id: deleteAdminIdToDelete }));
    }
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    let data = {
      limit: 10,
      page: selectedPage,
      search: ''
    };
    this.setState({ selectedPage: selectedPage })
    this.props.dispatch(settingActions.getAllReferral(data));
  }
  //Search
  handleInputChange(e) {
    let { value ,id} = e.target;

    let referralDetails = this.state.referralDetails;
    let temp = {...referralDetails[id]};
    temp['amount'] = value;
    referralDetails[id] = temp;
    this.setState({
      referralDetails: referralDetails
    });
  }
  //Assign Resource
  assignResourceReferral(subadmindetails) {
      // let items = this.state.listOfResource.map((array, key) => {
      //   array['checketstatus']=false;
      //   return array;
      // }, []);
      // console.log("items  ",JSON.stringify(items));
      
      this.setState({
        assignResourceReferralModal: true,
        assignRoleReferralId: subadmindetails.id,
        //listOfResource: items
      });
      let data={
        userid:subadmindetails.id
      }
      this.props.dispatch(settingActions.getAssignedResourceList(data));
  }
  assignResourceReferralToggle() {
    this.setState({
      assignResourceReferralModal: !this.state.assignResourceReferralModal
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
        userid: this.state.assignRoleReferralId,
        resouresid: checkedResource
      };
      this.props.dispatch(settingActions.saveAssignResourceReferral(reqData));
    } else {
      toast('Please select resource');
    }
  }
  updateSetting(type) {
    
    var index = this.state.referralDetails.findIndex(x => x.rtype === type);
    console.log(index);
    console.log(this.state.referralDetails[index]);
    let reqData={
      rtype:this.state.referralDetails[index].rtype,
      amount:this.state.referralDetails[index].amount
    }
    this.props.dispatch(settingActions.updateReferralPoint(reqData));
  }
  render() {
    
    return (
      <div className="animated fadeIn custom_background">
        
        {this.state.referralDetails?<Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
              </CardHeader>
              <CardBody>
                <Row>

                    <Col xl={1}/>
                  <Col xl={2}><Label htmlFor="pid">Welcome Bonus</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[1].rtype}
                            id={1}
                            value={this.state.referralDetails[1].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col>
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[1].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>


                   <Col xl={1}/>
                  <Col xl={2}><Label htmlFor="pid">Referral Bonus Used User</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[4].rtype}
                            id={4}
                            value={this.state.referralDetails[4].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col>
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[4].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>


                <Col xl={1}/>
                  <Col xl={2}><Label htmlFor="pid">Refer User Bonus</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[0].rtype}
                            id={0}
                            value={this.state.referralDetails[0].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col>
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[0].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>

                

                 
                   <Col xl={1}/>
                  <Col xl={2}><Label htmlFor="pid">Bonus(%)</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[5].rtype}
                            id={5}
                            value={this.state.referralDetails[5].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col>
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[5].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>


                   <Col xl={1}/>
                  <Col xl={2}><Label htmlFor="pid">Referral MAX Amount</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[6].rtype}
                            id={6}
                            value={this.state.referralDetails[6].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col>
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[6].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>

                  <Col xl={1}/>
                  {/* <Col xl={2}><Label htmlFor="pid">Deduct bonus %</Label></Col>
                  <Col xl={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name={this.state.referralDetails[2].rtype}
                            id={2}
                            value={this.state.referralDetails[2].amount}
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                  </Col> 
                  <Col xl={6}> <Button
                        onClick={()=>this.updateSetting(this.state.referralDetails[2].rtype)}
                        className="mr-1"
                        color="success"
                      >
                       Update
                      </Button>
                  </Col>
                  */}
                  <Col xl={3}/>
                  <Col xl={3}>
                       
                  </Col>
                  <Col xl={6}/>
                </Row>

                <Alert color="primary">
                    Description for this module: - <br/>
                    Suppose UserA sharing his/her refer code to UserB.<br/>
                    <li>
                    <b>Welcome Bonus</b><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp; With or without using refer code each user will receive this bonus amount.<br/>
                    </li>
                    <li>
                    <b>Referral Bonus Used User</b><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; UserB will receive this bonus amount instantly after sign up with refer code of UserA.<br/>
                    </li>
                    <li>
                    <b>Refer User Bonus</b><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; This is total bonus amount which UserA is going to receive when UserB will join pool. (Would not be able to receive total bonus amount in one time. This will based upon Bonus % and Max amount)<br/>
                    </li>
                    <li>
                    <b>Bonus(%)</b><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; When UserB will join a pool then this much % bonus amount of entry fee will receive by UserA in one time.<br/>
                    </li>
                    <li>
                    <b>Referral MAX Amount</b><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; This is maximum bonus amount in one time (pool join) receive by UserA.
                    </li>
                </Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>:null}
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(Referral);
