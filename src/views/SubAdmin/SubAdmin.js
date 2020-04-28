import React, { Component } from 'react';
import Switch from 'react-switch';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { subadminActions } from '../../_actions';
import { toast } from 'react-toastify';
import { CONST } from '../../_config';

class SubAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSubAdminModal: false,
      showSubAdminModal: false,
      deleteSubAdminModal: false,
      selectedPage: 0,
      totalpage: 0,
      checked: false,
      objmenuchecked:{}
    };
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.addSubAdminToggle = this.addSubAdminToggle.bind(this);
    this.showSubAdminToggle = this.showSubAdminToggle.bind(this);
    this.deleteSubAdminToggle = this.deleteSubAdminToggle.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.assignResourceSubAdminToggle = this.assignResourceSubAdminToggle.bind(this);
    this.udpateStatus = this.udpateStatus.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(subadminActions.getAllSubAdmin());
    this.props.dispatch(subadminActions.getAllResourceList());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.subadmin.getselmenu) {
      let objmenuchecked={};
      nextProps.subadmin.getselmenu.forEach(function(itemSelMenu){
        objmenuchecked[itemSelMenu["menuid"]]=true;
        
      })
      objmenuchecked[1]=true;
      this.setState({objmenuchecked:objmenuchecked});
    }

    if (nextProps.subadmin.isAdminAdded) {
      this.setState({ addSubAdminModal: false });
      this.props.dispatch(subadminActions.getAllSubAdmin());
    }
    if (nextProps.subadmin.isAdminDeleted) {
      this.setState({ deleteSubAdminModal: false, deleteAdminIdToDelete: 0 });
      this.props.dispatch(subadminActions.getAllSubAdmin());
    }
    if (nextProps.subadmin.total >= 0) {
      this.setState({ totalpage: nextProps.subadmin.total });
    }
    if (nextProps.subadmin.isAssignedResource) {
      this.setState({ assignResourceSubAdminModal: false });
    }
    if (nextProps.subadmin.listOfResource) {
      this.setState({ listOfResource: nextProps.subadmin.listOfResource });
    }
    if (nextProps.subadmin.listOfAssignedResource) {
        let items = this.state.listOfResource.map((array, key) => {
        if (nextProps.subadmin.listOfAssignedResource) {
          let findelement=nextProps.subadmin.listOfAssignedResource.find(x => x.resouresid === array.id);
          if (findelement) {
             array['checketstatus']=true;
          } else {
             array['checketstatus']=false;
          }
        }
        return array;
      }, []);
      this.setState({
        listOfResource: items
      });
    }else {
      console.log("Else else else...");
      
      if (this.state.listOfResource) {
         this.state.listOfResource.map((array, key) => {
          array['checketstatus']=false;
          return array;
        }, []);
        //console.log("items1  ",JSON.stringify(items1));
      }
      
    }
 
    if (nextProps.subadmin.isStatusUpdated) {
       let data = {
          "limit": 10,
          "page": this.state.selectedPage,
          "search": ''
        }
        this.props.dispatch(subadminActions.getAllSubAdmin(data));
    }
  }
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  //Show Dialog box
  showSubAdminToggle() {
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal
    });
  }
  showSubAdminInfo(data) {
    this.setState({
      showAdminid: data.id,
      showAdminname: data.name,
      showAdminusername: data.email,
      showAdminstatus: data.status === '1' ? 'Active' : 'Deactive',
      showSubAdminModal: !this.state.showSubAdminModal,
      showAdminusertype: data.usertype,
      showAdmincreated: data.name
    });
  }
  //Add Dialog box
  addSubAdminToggle() {
    this.setState({
      addSubAdminModal: !this.state.addSubAdminModal
    });
  }
  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addSubAdmin=()=> {
    this.setState({ submitted: true });
    const { email,phone, password, name } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      let data = {
        email: email,
        phone: phone,
        name: name,
        password: password
      };
      dispatch(subadminActions.addSubAdmin(data));
    }
  }
  //Delete Dialog box
  deleteSubAdminToggle() {
    this.setState({
      deleteSubAdminModal: !this.state.deleteSubAdminModal
    });
  }
  deleteSubAdminConfirm(data) {
    this.setState({
      deleteAdminusername: data.username,
      deleteAdminIdToDelete: data.id,
      deleteSubAdminModal: !this.state.deleteSubAdminModal
    });
  }
  deleteSubAdminAfterConfirm() {
    this.setState({ submitted: true });
    const { deleteAdminIdToDelete } = this.state;
    const { dispatch } = this.props;
    if (deleteAdminIdToDelete) {
      //alert(deleteAdminIdToDelete)
      dispatch(subadminActions.deleteSubAdmin({ id: deleteAdminIdToDelete }));
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
    this.props.dispatch(subadminActions.getAllSubAdmin(data));
  }
  //Search
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      limit: 10,
      page: 1,
      search: value.replace(/^\s+|\s+$/g, '')
    };
    //str.replace(/^\s+|\s+$/g, '');
    this.props.dispatch(subadminActions.getAllSubAdmin(data));
  }
  //Assign Resource
  assignResourceSubAdmin(subadmindetails) {
      // let items = this.state.listOfResource.map((array, key) => {
      //   array['checketstatus']=false;
      //   return array;
      // }, []);
      // console.log("items  ",JSON.stringify(items));
     
      //this.setState({objmenuchecked:{1:true}});  //Raman
    
      let dataSelSubMenu={
        userid:subadmindetails.id
      };
      this.props.dispatch(subadminActions.getSelectedSubMenu(dataSelSubMenu));
      
      this.setState({
        assignResourceSubAdminModal: true,
        assignRoleSubAdminId: subadmindetails.id,
        //listOfResource: items
      });
      let data={
        userid:subadmindetails.id
      }
      this.props.dispatch(subadminActions.getAssignedResourceList(data));
  }
  assignResourceSubAdminToggle() {
    //objmenuchecked
    this.setState({
      assignResourceSubAdminModal: !this.state.assignResourceSubAdminModal
    });
  }
  handleSelectResourceChange(checked) {
    this.setState({ checked });
  }
  handleChangeCheckedResource(resourceid,parentid,arrsubmenu) {
    console.log("tttt--->>>",resourceid==="1")
    if(resourceid!=="1")
    {

        let objmenuchecked=this.state.objmenuchecked;
        let menustatus=(objmenuchecked[resourceid])?objmenuchecked[resourceid]:false;
        objmenuchecked[resourceid]=!(menustatus);
        
        //console.log("objmenuchecked--->>>",objmenuchecked)
        //this.setState({objmenuchecked:objmenuchecked});
        if(parentid!==0)//Sub Menu
        {
          let chkchild=0;
          arrsubmenu.forEach(function(itemSubMenu){
            if(objmenuchecked[itemSubMenu.id]===true)
            {
              chkchild++;
            }
          })
          let parentstatus=false;
          
          if(chkchild>0)
          {
            parentstatus=true;
          }
          objmenuchecked[parentid]=parentstatus;
        }

        if(parentid===0)//Main Menu
        {
          arrsubmenu.forEach(function(itemSubMenu){
              objmenuchecked[itemSubMenu.id]=objmenuchecked[resourceid];
          })
        }
        
        if(objmenuchecked[5]===true || objmenuchecked[7]===true || objmenuchecked[6]===true || objmenuchecked[8]===true || objmenuchecked[9]===true)
        {
          //User Select Fix
          objmenuchecked[2]=true;
          objmenuchecked[3]=true;
          objmenuchecked[4]=true;
        }

        this.setState({objmenuchecked:objmenuchecked});
    }
  }



  submitAssignedRole() {
    // let listOfResource = this.state.listOfResource;
     let checkedResource = [];
    // for (let index = 0; index < listOfResource.length; index++) {
    //   let resource = listOfResource[index];

    //   if (resource.checketstatus) {
    //     checkedResource.push(resource.id);
    //   }
    // }
    let objmenuchecked=this.state.objmenuchecked;
    //checkedResource.push("1");
    let chktrue=0;
    Object.keys(objmenuchecked).forEach(function(itemStatus){
      if(objmenuchecked[itemStatus]===true)
      {
        chktrue++;
        checkedResource.push(itemStatus);
      }
    })
    if (chktrue>0) {
      // alert(checkedResource)
      let reqData = {
        userid: this.state.assignRoleSubAdminId,
        menus: checkedResource
      };
      this.props.dispatch(subadminActions.saveAssignResourceSubAdmin(reqData));
    } else {
      toast('Please select resource');
    }
  }
  udpateStatus(subadmin) {
    let data={
      userid:subadmin.id,
      status:subadmin.status==="1"?"0":"1"
    }
    this.props.dispatch(subadminActions.udpateStatus(data));
  }
  render() {
    const { subadmin } = this.props;
    let { items } = subadmin;
    return (
      <div className="animated fadeIn custom_background">
        {subadmin.loading?<div className="loader"></div>:null}
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> SubAdmin{' '}
                    <small className="text-muted">List</small>
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
                  <Col xl="1" />
                  <Col xl="2">
                    <Button
                      onClick={this.addSubAdminToggle}
                      className="mr-1"
                      color="success"
                    >
                      Add SubAdmin
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">NAME</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">PHONE</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">UPDATE INFO</th>
                      <th scope="col">ASSIGN ROLE</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((subadmin, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td>{subadmin.name}</td>
                            <td>{subadmin.username}</td>
                            <td>{subadmin.phone}</td>
                            <td>
                              <Badge color={this.getBadge(subadmin.status)}>
                                {subadmin.status === '1'
                                  ? 'Active'
                                  : 'Inactive'}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                className="mr-1"
                                onClick={() => this.showSubAdminInfo(subadmin)}
                                color="info"
                                style={{ cursor: 'pointer' }}
                              >
                                Show
                              </Badge>{' '}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Badge
                                className="mr-1"
                                onClick={() =>
                                  this.deleteSubAdminConfirm(subadmin)
                                }
                                color="danger"
                                style={{ cursor: 'pointer' }}
                              >
                                Delete
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                className="mr-1"
                                onClick={() =>
                                  this.assignResourceSubAdmin(subadmin)
                                }
                                color="info"
                                style={{ cursor: 'pointer' }}
                              >
                                Assign Role
                              </Badge>
                            </td>
                            <td>
                              {subadmin.status === "0"  ?<span><Button className="btn-sm btn-square btn-success" onClick={()=>this.udpateStatus(subadmin)}>Active&nbsp;&nbsp;&nbsp;</Button> &nbsp;</span>:null} 
                              {subadmin.status === "1"  ?<span><Button className="btn-sm btn-square btn-danger"  onClick={()=>this.udpateStatus(subadmin)}>Inactive</Button>&nbsp;</span>:null}
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
        <Modal
          isOpen={this.state.addSubAdminModal}
          toggle={this.addSubAdminToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.addSubAdminToggle}>
            Add SubAdmin
          </ModalHeader>
          <AvForm onValidSubmit={this.addSubAdmin}>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Name</Label>
                  <AvField
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    onChange={this.handleChangeAddSubAdmin}
                    validate={{
                      required: { value: true, errorMessage: "Name is required" },
                      pattern: { value: CONST.PATTERN.name, errorMessage: 'Please enter valid name' },
                      maxLength: { value: 50, errorMessage: 'Your name must be 50 character' },
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Phone No</Label>
                  <AvField
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    onChange={this.handleChangeAddSubAdmin}
                    validate={{
                      required: { value: true, errorMessage: "Phone No is required" },
                      pattern: { value: CONST.PATTERN.mobile10verify, errorMessage: 'Please enter valid phone no' },
                      maxLength: { value: 10, errorMessage: 'Your phone no must be 10 character' },
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Email</Label>
                  <AvField
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    onChange={this.handleChangeAddSubAdmin}
                    validate={{
                      required: { value: true, errorMessage: "Email is required" },
                      pattern: { value: CONST.PATTERN.email, errorMessage: 'Please enter valid email' },
                      maxLength: { value: 100, errorMessage: 'Your email must be 100 character' },
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="fpname">Password</Label>
                  <AvField
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    onChange={this.handleChangeAddSubAdmin}
                    validate={{
                      required: { value: true, errorMessage: "Password is required" },
                      pattern: { value: CONST.PATTERN.password, errorMessage: 'Please enter valid password' },
                      maxLength: { value: 100, errorMessage: 'Your password must be 100 character' },
                    }}  
                  />
                </FormGroup>
              </Col>
            </Row>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addSubAdminToggle}>
              Cancel
            </Button>
          </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.showSubAdminModal}
          toggle={this.showSubAdminToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.showSubAdminToggle}>
            SubAdmin Info
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="showAdminid">Subadmin Id</Label>
                  <Input
                    type="text"
                    name="showAdminid"
                    value={this.state.showAdminid}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Name</Label>
                  <Input
                    type="text"
                    name="showAdminname"
                    value={this.state.showAdminname}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Email</Label>
                  <Input
                    type="text"
                    name="showAdminusername"
                    value={this.state.showAdminusername}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Status</Label>
                  <Input
                    type="text"
                    name="showAdminstatus"
                    value={this.state.showAdminstatus}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.showSubAdminToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.deleteSubAdminModal}
          toggle={this.deleteSubAdminToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.deleteSubAdminToggle}>
            Delete SubAdmin{' '}
          </ModalHeader>
          <ModalBody>
            <span>
              Are you sure you want to delete {this.state.deleteAdminusername} ?{' '}
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.deleteSubAdminToggle}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => this.deleteSubAdminAfterConfirm()}
            >
              Confirm Delete
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.assignResourceSubAdminModal}
          toggle={this.assignResourceSubAdminToggle}
          className={'my-modal ' + this.props.className}>
        >
          <ModalHeader toggle={this.assignResourceSubAdminToggle}>
            Assign Resource
          </ModalHeader>
          <ModalBody>
            <ListGroup>
            <Row>
              {this.state.listOfResource
                ? this.state.listOfResource.map((resource, i) => (
                    <Col xl={4} key={i}> <ListGroupItem className="justify-content-between mainmenu" key={i}>
                     <span className="capitalize fontbold"> {resource.mname}</span>
                      <Switch
                        className="float-right"
                        onChange={()=>this.handleChangeCheckedResource(resource.id,0,resource.submenu)}
                        checked={(this.state.objmenuchecked[resource.id])}
                        id={resource.id}
                      />
                     <div className="submenu">
                     {
                       ((resource.submenu)?resource.submenu:[]).map((itemSubmenu,indexSubmenu)=>(
                      <ListGroupItem className="justify-content-between" key={indexSubmenu}>
                            <span className="capitalize"> {itemSubmenu.name}</span>
                            <Switch
                              className="float-right "
                              onChange={()=>this.handleChangeCheckedResource(itemSubmenu.id,resource.id,resource.submenu)}
                              checked={(this.state.objmenuchecked[itemSubmenu.id])}
                              id={resource.id}
                            />
                      </ListGroupItem> 
                      ))
                     }
                     </div>
                    </ListGroupItem>
                    </Col>
                  ))
                : null}
                </Row>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.submitAssignedRole()}>
              Submit
            </Button>
            <Button
              color="secondary"
              onClick={this.assignResourceSubAdminToggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
export default connect(mapStateToProps)(SubAdmin);
