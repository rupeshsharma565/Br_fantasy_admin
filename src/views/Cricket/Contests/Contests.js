
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
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
  // InputGroup,
  // InputGroupAddon,
  ListGroup,

} from 'reactstrap';
import axios from 'axios';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
import ImageUploader from 'react-images-upload';

import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { cricketActions } from '../../../_actions';
import { toast } from 'react-toastify';
import { AvForm, AvField } from 'availity-reactstrap-validation';
class Contensts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addContenstModal: false,
      showContenstModal: false,
      editContenstModal: false,
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      typeset: 0,
      checkSelect: false,
      formData: { dis_val: 0, max_dis_val: 0, dis_type: "", cpypoolstatus: 0, cpybfrtim: 0 },
      cpyobj: {}
    };
    this.onDropEdit = this.onDropEdit.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.addContenst = this.addContenst.bind(this);
    this.editContenst = this.editContenst.bind(this);
    this.updFrmFieldVal = this.updFrmFieldVal.bind(this);
    this.addContenstToggle = this.addContenstToggle.bind(this);
    this.showContenstToggle = this.showContenstToggle.bind(this);
    this.editContenstToggle = this.editContenstToggle.bind(this);
    this.handleChangeAddContenst = this.handleChangeAddContenst.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.assignResourceContenstToggle = this.assignResourceContenstToggle.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.updateFavStatus = this.updateFavStatus.bind(this);
    this.checkedHandal = this.checkedHandal.bind(this);
    this.editContestFun = this.editContestFun.bind(this);
  }

  checkedHandal = (contest) => {

    let cpyobj = {};
    cpyobj = this.state.cpyobj;
    let status = (this.state.cpyobj[contest.id] === true || this.state.cpyobj[contest.id] === false) ? this.state.cpyobj[contest.id] : ((contest.cpypoolstatus && contest.cpypoolstatus === "1") ? true : false);
    cpyobj[contest.id] = (!status);
    this.setState({ cpyobj: cpyobj });
    const formData = new FormData();
    formData.append('id', contest.id);
    formData.append('cpypoolstatus', contest.cpypoolstatus);
    formData.append('atype', "poolStatus");
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/editcontests`, formData, config)
      .then(response => {

        if (!response.data.error) {
          toast(response.data.msg);
          this.props.dispatch(cricketActions.getContenstsList());
        } else {
          toast(response.data.msg);
        }

      })
      .catch(error => { });
  }
  componentDidMount() {
    this.props.dispatch(cricketActions.getContenstsList());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.subadmin.isAdminAdded) {
      this.setState({ addContenstModal: false });
      this.props.dispatch(cricketActions.getAllContenst());
    }
    if (nextProps.subadmin.isAdminDeleted) {
      this.setState({ editContenstModal: false, deleteAdminIdToDelete: 0 });
      this.props.dispatch(cricketActions.getAllContenst());
    }
    //console.log("nextProps.subadmin.total  ", nextProps.subadmin.total);
    if (nextProps.subadmin.total >= 0) {
      this.setState({ totalpage: nextProps.subadmin.total });
    }
    if (nextProps.subadmin.isAssignedResource) {
      this.setState({ assignResourceContenstModal: false });
    }
  }
  //Show Badge in Table
  getBadge = status => {
    return status === true ? 'success' : 'danger';
  }
  //Show Dialog box
  showContenstToggle() {
    this.setState({
      showContenstModal: !this.state.showContenstModal
    });
  }
  showContenstInfo(data) {
    console.log(JSON.stringify(data))
    this.setState({
      showContenstid: data.id,
      showContensttitle: data.title,
      showContestsubtitle: data.subtitle,
      showAdminstatus: data.status === true ? 'Active' : 'Deactive',
      showContenstModal: !this.state.showContenstModal,
    });
  }
  //Add Dialog box
  addContenstToggle() {

    this.setState({
      addContenstModal: !this.state.addContenstModal,
      formData: { dis_val: 0, max_dis_val: 0, dis_type: "", cpypoolstatus: "0", cpybfrtim: 0 }
    });
  }
  handleChangeAddContenst(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addContenst() {
    this.setState({ submitted: true });

    if (this.state.contensttitle && this.state.contenstsubtitle && this.state.contestlogo) {
      const formData = new FormData();
      formData.append('title', this.state.contensttitle);
      formData.append('subtitle', this.state.contenstsubtitle);
      formData.append('contestlogo', this.state.contestlogo);
      formData.append('dis_val', this.state.formData.dis_val);
      formData.append('cpypoolstatus', this.state.formData.cpypoolstatus);
      formData.append('cpybfrtim', this.state.formData.cpybfrtim);
      formData.append('max_dis_val', 0); //this.state.formData.max_dis_val);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios
        .post(CONST.BACKEND_URL + `/api/addcontests`, formData, config)
        .then(response => {

          if (!response.data.error) {
            toast(response.data.msg);
            this.setState({
              addContenstModal: false
            });
            this.props.dispatch(cricketActions.getContenstsList());
          } else {
            toast(response.data.msg);
          }

        })
        .catch(error => { });

    } else {
      toast("Add all required fields");
    }
  }
  //Delete Dialog box
  editContenstToggle() {
    this.setState({
      editContenstModal: !this.state.editContenstModal

    });
  }
  deleteContenstConfirm(data) {
    //const { dispatch } = this.props;
    let formData = this.state.formData;
    formData['dis_val'] = data.dis_val;
    formData['max_dis_val'] = data.max_dis_val;
    formData['cpypoolstatus'] = data.cpypoolstatus;
    formData['cpybfrtim'] = data.cpybfrtim;
    this.setState({
      editcontenstid: data.id,
      editcontensttitle: data.title,
      editcontenstsubtitle: data.subtitle,
      editcontenstcontestlogo: data.contestlogo,
      editcontenststatus: data.status,
      formData: formData,
      editContenstModal: !this.state.editContenstModal
    });
  }
  deleteContenstAfterConfirm() {
    this.setState({ submitted: true });
    const { deleteAdminIdToDelete } = this.state;
    const { dispatch } = this.props;
    if (deleteAdminIdToDelete) {
      //alert(deleteAdminIdToDelete)
      dispatch(cricketActions.deleteContenst({ id: deleteAdminIdToDelete }));
    }
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    let data = {
      limit: 10,
      page: selectedPage,
      search: ''
    };
    this.props.dispatch(cricketActions.getAllContenst(data));
  }
  //Search
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      limit: 10,
      page: 1,
      search: value.replace(/^\s+|\s+$/g, '')
    };
    this.props.dispatch(cricketActions.getAllContenst(data));
  }
  //Assign Resource
  assignResourceContenst(subadmindetails) {
    this.props.dispatch(cricketActions.getAllResourceList());
    this.setState({
      assignResourceContenstModal: true,
      assignRoleContenstId: subadmindetails.id
    });
  }
  assignResourceContenstToggle() {
    this.setState({
      assignResourceContenstModal: !this.state.assignResourceContenstModal
    });
  }
  handleSelectResourceChange(checked) {
    this.setState({ checked });
  }
  handleChangeCheckedResource(checked, e, id) {
    this.setState({ [id]: checked });
  }
  submitAssignedRole() {
    let listOfResource = this.props.subadmin.listOfResource;
    let checkedResource = [];
    for (let index = 0; index < listOfResource.length; index++) {
      let resource = listOfResource[index];
      if (this.state[resource.id]) {
        checkedResource.push(resource.id);
      }
    }
    if (checkedResource.length > 0) {
      // alert(checkedResource)
      let reqData = {
        userid: this.state.assignRoleContenstId,
        resouresid: checkedResource
      };
      this.props.dispatch(cricketActions.saveAssignResourceContenst(reqData));
    } else {
      toast('Please select resource');
    }
  }
  onDrop1(picture) {
    this.setState({ contestlogo: picture[0] });
  }
  onDropEdit(picture) {
    this.setState({ editcontestlogo: picture[0] });
  }
  editContenst() {
    this.setState({ submitted: true });
    this.editContestFun();
  }

  editContestFun = () => {
    if (this.state.editcontensttitle || this.state.editcontenstsubtitle || this.state.editcontestlogo) {
      const formData = new FormData();
      formData.append('id', this.state.editcontenstid);
      formData.append('title', this.state.editcontensttitle);
      formData.append('subtitle', this.state.editcontenstsubtitle);
      formData.append('contestlogo', this.state.editcontestlogo);
      formData.append('dis_val', this.state.formData.dis_val);
      formData.append('cpypoolstatus', this.state.formData.cpypoolstatus);
      formData.append('cpybfrtim', this.state.formData.cpybfrtim);
      formData.append('max_dis_val', 0);//this.state.formData.max_dis_val);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };
      axios
        .post(CONST.BACKEND_URL + `/api/editcontests`, formData, config)
        .then(response => {
          //alert("The file is successfully uploaded");         
          if (!response.data.error) {
            toast(response.data.msg);
            this.setState({
              editContenstModal: false
            });
            this.props.dispatch(cricketActions.getContenstsList());
          } else {
            toast(response.data.msg);
          }

        })
        .catch(error => { });

    }

  }
  onChangeSelect(e) {
    const { name, value } = e.target;
    console.log("e.target--->>>>", e.target);
    let formData = this.state.formData;
    formData[name] = value;
    let typeset = 0;
    let checkSelect = false;
    if (value === "perval") {
      typeset = 100;
      checkSelect = true;
    } else if (value === "perval") {
      checkSelect = true;
    }
    else if (value === "amtval") {
      checkSelect = true;
    }

    this.setState({
      formData: formData,
      typeset: typeset,
      checkSelect: checkSelect
    });
  }

  updFrmFieldVal(e) {
    const { name, value } = e.target;
    let formData = this.state.formData;
    formData[name] = value;
    this.setState({ formData: formData });
  }

  updateFavStatus(contests) {
    /*
       const formData = new FormData();
       formData.append('id',  contests.id);
       formData.append('favstatus',  contests.favstatus);
       formData.append('atype',  "favStatusUpdate");
       const config = {
         headers: {
           'content-type': 'multipart/form-data',
           Authorization: authHeader().Authorization
         }
       };
       axios
         .post(CONST.BACKEND_URL + `/api/editcontests`, formData, config)
         .then(response => {
          
             if (!response.data.error) {
                toast(response.data.msg);
                 this.props.dispatch(cricketActions.getContenstsList());
             }else{
                toast(response.data.msg);
             }
           
         })
         .catch(error => {}); */
  }


  render() {
    const { cricket } = this.props;
    let { contenstsList } = cricket;
    this.roleData = [{ value: 1, name: "Active" }, { value: 0, name: "Deactive" }];
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> Contest{' '}
                    <small className="text-muted">List</small>
                  </Col>
                  <Col xl="3">
                    {/* <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Button type="button" color="primary">
                          <i className="fa fa-search" />
                        </Button>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="UserName"
                        onChange={this.handleChangeSearch}
                        autoComplete="off"
                      />
                    </InputGroup> */}
                  </Col>
                  <Col xl="1" />
                  <Col xl="2">
                    <Button
                      onClick={this.addContenstToggle}
                      className="mr-1"
                      color="success"
                    >
                      Add Contest
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">ID</th>
                      <th scope="col">TITLE</th>
                      <th scope="col">SUBTITLE</th>
                      <th scope="col">Bonus Deduction (%)</th>
                      { /* <th scope="col"> Copy Pool (Minute) </th>
                       <th scope="col">Max Discount </th>
                     <th scope="col">Favorite</th> */ }
                      <th scope="col">STATUS</th>
                      <th scope="col">Update INFO</th>

                    </tr>
                  </thead>
                  <tbody>
                    {contenstsList
                      ? contenstsList.map((contenst, index) => (
                        <tr key={contenst.id}>
                          <td><img
                            src={contenst.contestlogo}
                            width="50"
                            height="50"
                            className="img-avatar"
                            onError={(e) => { e.target.src = CONST.BACKEND_URL + '/uploads/icons/dummy.png' }}
                            alt=""
                          /></td>
                          <td>{contenst.id}</td>
                          <td>{contenst.title}</td>
                          <td>{contenst.subtitle}</td>
                          <td>{contenst.dis_val}</td>
                          { /*  <td>
                            {(contenst.cpypoolstatus=="1")?contenst.cpybfrtim:""} 
                            <Switch
                            className="float-right"
                            id={contenst.id}
                            onChange={()=>this.checkedHandal(contenst)}
                            checked={(formthis.state.cpyobj[contenst.id]===true || formthis.state.cpyobj[contenst.id]===false)?formthis.state.cpyobj[contenst.id]: ((contenst.cpypoolstatus=="1")?true:false)}
                            />
                            

                            </td> 
                           <td><span id={'heart_'+index} onClick={()=>this.updateFavStatus(contenst)}>{(contenst.favstatus>0)?<span className="heart-red"><i className="fa fa-heart fa-lg mt-4"></i></span>:<span className="heart-red"><i className="fa fa-heart-o fa-lg mt-4"></i></span> }</span></td> */}
                          <td>
                            <Badge color={this.getBadge(contenst.status)}>
                              {contenst.status === true
                                ? 'Active'
                                : 'Inactive'}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              className="mr-1"
                              onClick={() => this.showContenstInfo(contenst)}
                              color="info"
                              style={{ cursor: 'pointer' }}
                            >
                              Show
                              </Badge>{' '}
                              &nbsp;&nbsp;&nbsp;
                              <Badge
                              className="mr-1"
                              onClick={() =>
                                this.deleteContenstConfirm(contenst)
                              }
                              color="warning"
                              style={{ cursor: 'pointer' }}
                            >
                              Edit
                              </Badge>

                              &nbsp;&nbsp;&nbsp;
                              <Badge
                              className="mr-1"
                              href={`#/cricket/contests/${contenst.id}`}
                              color="info"
                              style={{ cursor: 'pointer' }}
                            >
                              Pool
                              </Badge>
                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </Table>
                {this.state.totalpage > 10 ? (
                  <PaginationComponent
                    totalcontenstsList={parseInt(this.state.totalpage)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.addContenstModal}
          toggle={this.addContenstToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.addContenstToggle}>
            Add Contest
          </ModalHeader>
          <AvForm onValidSubmit={this.addContenst} >
            <ModalBody>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="pid">Title <span className="required">*</span></Label>
                    <AvField
                      type="text"
                      name="contensttitle"
                      id="contensttitle"
                      autoComplete="off"
                      onChange={this.handleChangeAddContenst}
                      validate={{
                        required: { value: true, errorMessage: "Title is required" },

                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="fpname">SubTitle <span className="required">*</span></Label>
                    <AvField
                      type="text"
                      name="contenstsubtitle"
                      id="contenstsubtitle"
                      autoComplete="off"
                      onChange={this.handleChangeAddContenst}
                      validate={{
                        required: { value: true, errorMessage: "Sub title is required" },

                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>

                { /*
            <Col xs="6">  
                 <FormGroup>
                  <Label htmlFor="pid">Discount Type</Label>
                  <Input
                    type="select"
                    name="dis_type"
                    id="dis_type"
                    autoComplete="off"
                    onChange={this.onChangeSelect}  
                    value={this.state.formData.dis_type} 
                      >
                  { <option  key="0" value="">Select Discount Type</option>}
                  { <option  key="1" value="perval"> Percentage </option> }
                  { <option key="2" value="amtval"> Amount </option> }  
                  </Input>
                </FormGroup>
              </Col>
           */ }

                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="pid">Discount Value (%)</Label>
                    <AvField
                      type="number"
                      name="dis_val"
                      id="dis_val"
                      autoComplete="off"
                      onChange={this.updFrmFieldVal}
                      value={this.state.formData.dis_val}
                      min="0"
                      max="100"

                    />
                  </FormGroup>
                </Col>
                { /*
              <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Cpoy Pool</Label>
                  <Input
                    type="select"
                    name="cpypoolstatus"
                    id="cpypoolstatus" 
                    onChange={this.onChangeSelect}
                    value={this.state.formData.cpypoolstatus} 
                  >
                  { <option  key="0" value="0">Off</option>}
                  { <option  key="1" value="1"> On </option> }
                </Input>
                </FormGroup>
              </Col>

              <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Close Time</Label>
                  <AvField
                    type="number"
                    name="cpybfrtim"
                    id="cpybfrtim" 
                    autoComplete="off" 
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.cpybfrtim} 
                    min="0"
                    max= "60"
                   
                  />
                </FormGroup>
              </Col>
              
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="pid">Max Discount Value </Label>
                  <AvField
                    type="text"
                    name="max_dis_val"
                    id="max_dis_val" 
                    autoComplete="off" 
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.max_dis_val} 
                  />
                </FormGroup>
              </Col> */}

              </Row>

              <Row>
                <Col xs="12">

                  <FormGroup>
                    <Label htmlFor="pname">Logo <span className="required">*</span></Label>
                    <ImageUploader
                      withIcon={false}
                      buttonText="Contest Logo"
                      withLabel={false}
                      withPreview={true}
                      onChange={this.onDrop1}
                      maxFileSize={5242880}
                    />
                  </FormGroup>
                </Col>

              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.addContenst()}>
                Submit
            </Button>{' '}
              <Button color="secondary" onClick={this.addContenstToggle}>
                Cancel
            </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.showContenstModal}
          toggle={this.showContenstToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.showContenstToggle}>
            Contest Info
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="showContenstid">Contest Id</Label>
                  <Input
                    type="text"
                    name="showContenstid"
                    value={this.state.showContenstid}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Title</Label>
                  <Input
                    type="text"
                    name="showContensttitle"
                    value={this.state.showContensttitle}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">SubTitle</Label>
                  <Input
                    type="text"
                    name="showContestsubtitle"
                    value={this.state.showContestsubtitle}
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
            <Button color="secondary" onClick={this.showContenstToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.editContenstModal}
          toggle={this.editContenstToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.editContenstToggle}>
            Edit Contest{' '}
          </ModalHeader>
          <AvForm onValidSubmit={this.editContenst}>
            <ModalBody>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="pid">Title</Label>
                    <Input
                      type="text"
                      name="editcontensttitle"
                      id="editcontensttitle"
                      autoComplete="off"
                      value={this.state.editcontensttitle}
                      onChange={this.handleChangeAddContenst}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="fpname">SubTitle</Label>
                    <Input
                      type="text"
                      name="editcontenstsubtitle"
                      id="editcontenstsubtitle"
                      autoComplete="off"
                      value={this.state.editcontenstsubtitle}
                      onChange={this.handleChangeAddContenst}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>

                { /*
            <Col xs="6">  
                 <FormGroup>
                  <Label htmlFor="pid">Discount Type</Label>
                  <Input
                    type="select"
                    name="dis_type"
                    id="dis_type"
                    autoComplete="off"
                    onChange={this.onChangeSelect}  
                    value={this.state.formData.dis_type} 
                      >
                  { <option  key="0" value="">Select Discount Type</option>}
                  { <option  key="1" value="perval"> Percentage </option> }
                  { <option key="2" value="amtval"> Amount </option> }  
                  </Input>
                </FormGroup>
              </Col>
           */ }

                <Col xs="6">
                  <FormGroup>
                    <Label htmlFor="pid">Discount Value (%)</Label>
                    <AvField
                      type="number"
                      name="dis_val"
                      id="dis_val"
                      autoComplete="off"
                      onChange={this.updFrmFieldVal}
                      value={this.state.formData.dis_val}
                      min="0"
                      max="100"

                    />
                  </FormGroup>
                </Col>
                { /*
              <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Cpoy Pool</Label>
                  <Input
                    type="select"
                    name="cpypoolstatus"
                    id="cpypoolstatus" 
                    onChange={this.onChangeSelect}
                    value={this.state.formData.cpypoolstatus} 
                  >
                  { <option  key="0" value="0">Off</option>}
                  { <option  key="1" value="1"> On </option> }
                </Input>
                </FormGroup>
              </Col>

              <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Close Time</Label>
                  <AvField
                    type="number"
                    name="cpybfrtim"
                    id="cpybfrtim" 
                    autoComplete="off" 
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.cpybfrtim} 
                    min="0"
                    max= "60"
                   
                  />
                </FormGroup>
              </Col>
             
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="pid">Max Discount Value </Label>
                  <AvField
                    type="text"
                    name="max_dis_val"
                    id="max_dis_val" 
                    autoComplete="off" 
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.max_dis_val} 
                  />
                </FormGroup>
              </Col> */}

              </Row>
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="pname">Logo</Label>
                    <ImageUploader
                      withIcon={false}
                      buttonText="Contest Logo"
                      withLabel={false}
                      withPreview={false}
                      onChange={this.onDropEdit}
                      maxFileSize={5242880}
                    />
                    <img
                      src={this.state.editcontenstcontestlogo}
                      width="50"
                      height="50"
                      className="img-avatar"
                      alt=""
                    />
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.editContenstToggle}>
                Cancel
            </Button>
              <Button color="info" >
                Update
            </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
        <Modal
          isOpen={this.state.assignResourceContenstModal}
          toggle={this.assignResourceContenstToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.assignResourceContenstToggle}>
            Assign Resource
          </ModalHeader>
          <ModalBody>
            <ListGroup>

            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">
              Submit
            </Button>{' '}
            <Button
              color="secondary"
              onClick={this.assignResourceContenstToggle}
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
  const { cricket, authentication, subadmin } = state;
  const { user } = authentication;

  return {
    user,
    cricket,
    subadmin
  };
}
export default connect(mapStateToProps)(Contensts);
