import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Button,
  Input,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,ModalFooter,InputGroup,
  InputGroupAddon, 
} from 'reactstrap';
import { connect } from 'react-redux';
import { settingActions ,userActions } from '../../_actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ImageUploader from 'react-images-upload';
import { CONST } from '../../_config';
import axios from 'axios';
import { authHeader ,overrideLoaderCss, loaderColorCode } from '../../_helpers';
import moment from 'moment'
import swal from 'sweetalert';
import { ClipLoader } from 'react-spinners';
import PaginationComponent from 'react-reactstrap-pagination';


class NotificationToUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
      totalpage: 0,
      title: '',
      content: '',
      editorState: "",
      arrimagename:"",
      notifilist:[],
      descriptionState:"",
      selectimage:"",
      checkevent:"",
      selectId:"",
      useridlist:{},
      getalluser:[],
      selectedUsers:[],
      checkSelectedTeam:false,
      sendUserList:{},
      formData:{sendToUser:null,title:null,description:null},
      isLoading :false,
    }
    this.onChange = (editorState) => this.setState({editorState});
    this.updateSetting = this.updateSetting.bind(this);
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
    this.onDropNewPlayer1 = this.onDropNewPlayer1.bind(this);
    this.NotificationList=this.NotificationList.bind(this);
    this.addPoolToggle = this.addPoolToggle.bind(this);
    this.editNotification=this.editNotification.bind(this);
    this.addNotification=this.addNotification.bind(this);
    this.deleteNotification=this.deleteNotification.bind(this);
    this.showSubAdminInfo = this.showSubAdminInfo.bind(this);
    this.showSubAdminToggle = this.showSubAdminToggle.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.userSearch = this.userSearch.bind(this);
    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.UserChkAndUncheck = this.UserChkAndUncheck.bind(this);
    this.handleSelectedPaginate=this.handleSelectedPaginate.bind(this);
    this.setEditor = (editor) => {
      this.editor = editor;
    };
    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }
  componentDidMount() {
    this.focusEditor();
    this.NotificationList();
    this.props.dispatch(settingActions.getstaticpage({slug:'aboutus'}));
  }
 

 componentWillReceiveProps(nextProps) {
    if(nextProps.users)
    {
      this.setState({getalluser:nextProps.users.items});

    }
  }

   handleCheckChange = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;    
    let useridlist=this.state.useridlist;
    let sendUserList=this.state.sendUserList;
    useridlist[item]=isChecked;
    if(e.target.checked===true)
    {      
      sendUserList[item]=0;  
    }
    else
    {
      delete sendUserList[item];
    }
     this.setState({useridlist:useridlist,sendUserList:sendUserList});  
  }

  UserChkAndUncheck = (e,user) => {
    const item = e.target.value;
    const isChecked = e.target.checked;    
    let useridlist=this.state.useridlist;
    let sendUserList=this.state.sendUserList;
    let selectedUsers= this.state.selectedUsers;
    useridlist[item]=isChecked;
    if(e.target.checked===true)
    {      
      sendUserList[item]=0;  
      selectedUsers[item]= user;
    }
    else
    {
      delete sendUserList[item];
      delete selectedUsers[item];
    }

    if(selectedUsers.length<0){
      selectedUsers=[];
    }else{
      selectedUsers=Object.values(selectedUsers);
    }
     this.setState({useridlist:useridlist,sendUserList:sendUserList});  
  }
   showSubAdminInfo(data) {
    let data1 = {
          "limit": 10,
          "page": 1,
          "search": '',
          atype:'alluser'
        }
        this.props.dispatch(userActions.getAll(data1));
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal,
      submittedAddPlayer: false,
      checkSelectedTeam:false
    });
  }

  showSubAdminToggle() {
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal,
    });
  }

  userSearch(e) {
  
    var phone = e.target.value;
    
    let data1 = {
          "limit": 10,
          "page": 1,
          "search": phone,
          atype:'alluser'
        }
        this.props.dispatch(userActions.getAll(data1));
  }

   handleSelectedUser=(e)=>{
    let isChecked = e.target.checked;
console.log("e.target.checked--->>>",e.target.checked);
    if(isChecked===true){    
      let selectedUsers= this.state.selectedUsers;
      this.setState({getalluser:selectedUsers,checkSelectedTeam:false});
      console.log("ttttt",selectedUsers);
    }else{
      console.log("ffffff",isChecked);
      let data1 = {
          "limit": 10,
          "page": 1,
          "search": '',
          atype:'alluser'
        }
        this.props.dispatch(userActions.getAll(data1));
    this.setState({
      checkSelectedTeam:false
    });
    }
    
  }

  onEditorStateChange = (descriptionState) => {
    let formData= this.state.formData;
    formData['description']=descriptionState.target.value;
   this.setState({
    descriptionState:descriptionState.target.value,
    formData:formData,
    });
  };
  updateSetting(data) {
    let formthis=this;
   formthis.setState({
      isLoading: true
    });
    let imgurl="";
    const formData = new FormData();
    if(this.state.arrimagename.error===false)
    {
      imgurl=(this.state.arrimagename.data)?this.state.arrimagename.data[0]:"";
      formData.append('img', imgurl);
    }else if(this.state.selectimage){
      formData.append('img', this.state.selectimage);
    }
    else
    {
      formData.append('img', "");
    } 
    
      formData.append('title', formthis.state.formData.title);
      formData.append('message',formthis.state.formData.description);
      
      if(this.state.sendUserList){
        let uids=this.state.sendUserList;
       
        formData.append('userid',JSON.stringify(uids)); 
      }
      
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: authHeader().Authorization
        }
      };

      let apievent=`/api/addnotification`;
      if(formthis.state.checkevent==="edit") 
      {
      
        formData.append('id', formthis.state.selectId);
        formData.append('atype', "edit");
      }
      else
      {
        formData.append('atype', "add");
      }
      formthis.setState({
       addPoolModal: !formthis.state.addPoolModal,
    });
      axios.post(CONST.BACKEND_URL + apievent, formData, config).then(response => {
        formthis.NotificationList();
        formthis.setState({
          useridlist:{},
          sendUserList:{},

        });
      })
   }
   handleChangeUpdate(e) {
    let fieldname= e.target.name;
    let fieldvalue= e.target.value;
    let formData = this.state.formData;
    let sendUserList = this.state.sendUserList;
    let useridlist = this.state.useridlist;
    formData[fieldname]=fieldvalue;
    if(fieldname==='sendToUser'){
      if(fieldvalue!=='selected'){
        formData[fieldname]=null;
        sendUserList={};
        useridlist={};
      }
    }
    this.setState({
      formData:formData,sendUserList:sendUserList,
      useridlist:useridlist,
    });
  }

  onDropNewPlayer1(picture) {
    let formthis=this;

    const formData = new FormData();
    formData.append('images[]', picture[picture.length - 1]);
    formData.append('imgtype', "noti");
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'Authorization': authHeader().Authorization
      }
  };
  axios.post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
      //.then(handleResponse)
      .then((response) => {
          //alert("The file is successfully uploaded1111111111111");

          formthis.setState({arrimagename:response.data,
            selectimage:""});
          return response.data;
      })
      .catch((error) => {

      });
}


NotificationList(){ 
  let formthis=this;
    const formData = new FormData();
    formData.append('page',  formthis.state.selectedPage);
    const config = {
      headers: {
          'content-type': 'multipart/form-data',
          'Authorization': authHeader().Authorization
      }
  };
  axios.post(CONST.BACKEND_URL + `/api/notificationlist`, formData, config)
      //.then(handleResponse)
      .then((response) => {
          //alert("The file is successfully uploaded1111111111111");
         // dispatch(alertActions.success('Subadmin added !'));
  
          if(response.data.data.total){
            formthis.setState({totalpage:response.data.data.total},()=>{
              
            });
          }
          formthis.setState({notifilist:response.data.data.list,isLoading: false});
          return response.data;
      })
      .catch((error) => {

      });
}

addPoolToggle() {
  this.setState({
    addPoolModal: !this.state.addPoolModal,
    title:"",
    editorState:"",
    arrimagename:[],
    descriptionState:"",
    selectId:"",
    selectimage:""
  });
}

addNotification(){
  this.addPoolToggle();
  this.resetFormData();
  this.setState({checkevent:"add",});
}

resetFormData(){
  let formData=this.state.formData;
  formData['title']=null;
  formData['description']=null;
  formData['sendToUser']=null;
 this.setState({formData:formData,sendUserList:{},
      useridlist:{}}); 
}

editNotification(item){ 
  this.setState({
    addPoolModal: !this.state.addPoolModal,
    checkevent:"edit",
    title:item.title,
    descriptionState:item.message,
    selectimage:item.img,
    selectId:item._id["$oid"],
  },()=>{
     //console.log("selcted id=====",g);
  });
 
}

deleteNotification(item){
  let formthis=this;
  swal({
    html:true,
    title: "Are you sure?",
    text: "You want to delete",
    icon: "warning",
    buttons: [
      'No, cancel it!',
      'Yes, Delete!'
    ],
    dangerMode: true,
  }).then(function (isConfirm) {
    if (isConfirm) {

  const config = { 
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: authHeader().Authorization
    }
  };
  const formData = new FormData();
  let apievent=`/api/addnotification`;
    formData.append('id', item._id["$oid"]);
    formData.append('atype', 'delete');
    formData.append('sendAll', 0);
  axios.post(CONST.BACKEND_URL + apievent, formData, config).then(response => {
    swal({
      title: "Deleted",
      text: "Notification deleted successfully",
      icon: "success",
    });
    formthis.NotificationList();
   
  })
}
  })
}

 handleSelectedPaginate(selectedPage) {
    //this.setState({ isCSV: false });
    console.log("selectedPage---->>>",selectedPage);
    let formthis=this;
    this.setState({selectedPage:selectedPage},()=>{
    formthis.NotificationList();
  });
  }

  render() {    
    let {setting}=this.props;
    let {staticpageDetails}=setting;
    let formthis=this;
    let sno=0;
    //const { editorState } = this.state;
    return (
      <div className="animated fadeIn">


      {/** loader section start */}
        <div className={"loaderdiv" + ((this.state.isLoading === true) ? "" : " hidden")}>
          <ClipLoader
            css={overrideLoaderCss}
            sizeUnit={"px"}
            size={60}
            color={loaderColorCode}
            loading={this.state.isLoading}
          />
        </div>
        {/** loader section end */}

       {staticpageDetails? <Row>
          <Col xl="12">
          
       
            <Card>
            <Modal isOpen={this.state.addPoolModal} toggle={this.addPoolToggle} className={ 'my-modal ' + this.props.className}>
    <ModalHeader toggle={this.addPoolToggle}>
    {(formthis.state.checkevent==="edit")?"Update":"Add"} Notification
    </ModalHeader>
    <ModalBody>
              <CardHeader>
                <i className="fa fa-align-justify" /> Notification
                <div className="card-header-actions" />
              </CardHeader>
               <AvForm onValidSubmit={this.updateSetting}>
              <CardBody>
                 <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="Title">Title*</Label>
                      <AvField type="text" id="title" name="title"
                      placeholder="Enter title" 
                      value={this.state.title}  
                      onChange={this.handleChangeUpdate} 
                      readOnly={true} 
                      validate={{
                      required: { value: true, errorMessage: "title is required" },
                      }} 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input type="textarea" id="content"  name="content" placeholder="Enter description" rows="4"  value={this.state.content}  onChange={this.handleChangeUpdate}  />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description*</Label>

                     <textarea  className="form-control" rows="5"
                      value={this.state.descriptionState} 
                      onChange={this.onEditorStateChange}
                      readOnly={true} 
                       validate={{
                      required: { value: true, errorMessage: "Description is required" },
                      }} 
                      />
                    </FormGroup>
                  </Col>
                </Row>
                  {(formthis.state.checkevent!=="edit")?
                   <Row>
                <Col xl="4" >
                <Input
                    type="select"
                    name="sendToUser"
                    id="sendToUser"
                    autoComplete="off"
                    onChange={this.handleChangeUpdate}
                    value={this.state.formData.sendToUser}      
                      >
                   { <option key='1' value='all'>All</option>}
                  { <option key='2' value='selected'>Select Users</option>}          
                  </Input>
                  </Col>
                  { (this.state.formData.sendToUser)?
                <Col xl="3" >
                  <Button onClick={this.showSubAdminInfo} className="mr-1 float-right" color="success" >Select Users</Button>
                Selected Users : {Object.keys(this.state.sendUserList).length} 
                </Col>
                :null }

                 </Row>
:null
              }
               
                <Row>
                  <Col xs="12">
                  <img src={(formthis.state.selectimage)?formthis.state.selectimage: CONST.BACKEND_URL + '/uploads/notifications/'+((this.state.arrimagename.data)?this.state.arrimagename.data[0]:"")} width="50" height="50" alt=""   /> 
                 {(formthis.state.checkevent!=="edit")?
                  <ImageUploader singleImage={true} withIcon={false} buttonText="Upload Notification" withLabel={false} withPreview={false} onChange={this.onDropNewPlayer1} maxFileSize={5242880} />
                  :null
                }
                  </Col>
                </Row>
                 {(formthis.state.checkevent!=="edit")?
                <Row>
                  <Col xs="12">
                   <Button color="primary" >
                          {(formthis.state.checkevent==="edit")?"Update":"Add"}  
                    </Button>
                  </Col>
                </Row>
                :null }
                    
              </CardBody>
              </AvForm>
              </ModalBody>
            </Modal>
            <CardHeader>
                        <FormGroup row>
                          <Col xl="8"><strong>
                             </strong></Col>
                            
                             <Button  onClick={this.addNotification}  className="mr-1"  color="success">
                              Add Notification
                            </Button>
                            
                        </FormGroup>
                      </CardHeader>
              <CardBody>
              <Table responsive striped hover >
              <thead>
                  <tr>
                    <th>Title</th>
                    <th>created</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                   {
                     this.state.notifilist.map(function(item,index){
                      return(<tr key={index}>
                      <td>{item.title}</td>
                      <td>{moment(new Date(parseInt(item.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD hh:mm")}</td>
                     <td><span onClick={()=>formthis.editNotification(item)}><i className="fa fa-eye fa-lg"></i></span>{' '}
                      <span onClick={()=>formthis.deleteNotification(item)}><i className="cui-trash h5"></i></span></td>
                      </tr>)
                     })
                   }
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
        </Row> :null
        }

        <Modal isOpen={this.state.showSubAdminModal} toggle={this.showSubAdminToggle} className={'my-modal ' + this.props.className} >
          <ModalHeader toggle={this.showSubAdminToggle}>Add Users</ModalHeader>
          <ModalBody>
            <Row>
              <Col xl={12}>
                <Card>
                  <CardHeader>
                    <FormGroup row>
                      <Col xl="12">
                        <i className="fa fa-align-justify"></i><strong>USERS LIST</strong>
                      </Col>
                      <Col xl="3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                          </InputGroupAddon>
                          <Input type="text" id="search" name="search" placeholder="search" onChange={this.userSearch} autoComplete="off" />
                          
                        </InputGroup>
                      </Col>
                      <Col xl="6">
                      <InputGroup className="chksel">
                          Selected Users : 
                          <input type="checkbox" name="chkPro" checked={formthis.state.checkSelectedTeam}  onChange={formthis.handleSelectedUser} />
                        </InputGroup>
                      </Col>
                     {/* <Col xl="3">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary" ><i className="fa fa-search"></i></Button>
                          </InputGroupAddon>
                          <Input type="text" id="search" name="search" placeholder="CountryName" onChange={this.countrySearch} autoComplete="off" />
                        </InputGroup>
                      </Col> */ }
                    </FormGroup>
                  </CardHeader>
                  <CardBody>
                  <table className="fixed_header">
                      <thead>
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">TEAM NAME</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">PHONE</th>
                          <th scope="col">SELECT USER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.getalluser
                          ? this.state.getalluser.map(function(suser, index){
                            
                            
                                return(
                                <tr key={suser.id}>
                                  <td>{++sno}</td>
                                  <td>{suser.teamname}</td>
                                  <td>{suser.email}</td>
                                  <td>{suser.phone}</td>
                                  <td> <input type="checkbox" id={"chkid"+suser.id} name={'chkPro'+suser.id} value={suser.id} checked={(formthis.state.useridlist[suser.id]===true)?true:false} defaultChecked={suser.checketstatus} onChange={(e)=>formthis.UserChkAndUncheck(e,suser)} /></td>
                                  
                                </tr>
                              )
                          
                        })
                          : null
                         }
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.showSubAdminToggle}>Close</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}
function mapStateToProps(state) {
  const { setting, authentication, users} = state;
  const { user } = authentication;
  return {
    user,
    setting,
    users
  };
}
export default connect(mapStateToProps)(NotificationToUser);
