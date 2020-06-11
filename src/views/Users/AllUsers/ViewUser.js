import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, 
Row, Button ,FormGroup,Input,
Modal,
ModalHeader,
ModalBody,
ModalFooter

} from 'reactstrap';
import { CONST } from '../../../_config';
import moment from 'moment';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';
const statusOption = [{ value: 1, name: "Active" },{ value: 0, name: "Deactive" }];
class ViewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPoolModal: false,
      addPrizeModal: false,
      showPoolModal: false,
      editPoolModal: false,
      showPrizeModal:false,
      confirmModelValue:{'subject':'','msg':'','mdlTitle':'','user':{},'type':''},
      tblheader:{tbl_status:null,startDate:null,endDate:null},
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      combined: false,
      single: false,
      multiple: false,
      toggleOther:false,
      addPoolStatus:statusOption[0].value,
      shareholders: [{ name: "" }],
      isEdit:false,
      bankdata:false,
    };
    this.showImageToggle = this.showImageToggle.bind(this);
    this.showConfirmToggle = this.showConfirmToggle.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.udpateUserKYC = this.udpateUserKYC.bind(this);
    this.callUpdateKYC = this.callUpdateKYC.bind(this);
    this.udpateUserStatus = this.udpateUserStatus.bind(this);
    this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
    this.showPrizeToggle = this.showPrizeToggle.bind(this);
    this.handleChangeAddPool1 = this.handleChangeAddPool1.bind(this);
    this.addPrizeToggle = this.addPrizeToggle.bind(this);
    this.addPoolToggle = this.addPoolToggle.bind(this);
    this.handleChangeAddPool = this.handleChangeAddPool.bind(this);
    this.showPrizeClose = this.showPrizeClose.bind(this);
    this.handleOptionStatus = this.handleOptionStatus.bind(this);
    this.formFieldUpdate = this.formFieldUpdate.bind(this);
    this.handleParameterKeyValueChange = this.handleParameterKeyValueChange.bind(this);
  }
  componentDidMount() {
    let data={
      userid:this.props.match.params.id
    }
    this.props.dispatch(userActions.getAllInfo(data));
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.users.loading===false) {
        this.setState({loading:false});
    }
    if (nextProps.users.kycStatusUpdate) {
      let data={
        userid:this.props.match.params.id
      }
      this.props.dispatch(userActions.getAllInfo(data));
    }
    if (nextProps.users.detailsUpdate) {
      let data={
        userid:this.props.match.params.id
      }
      this.props.dispatch(userActions.getAllInfo(data));
      this.setState({isEdit:!this.state.isEdit})
    }
    if (nextProps.users.prizeAdded) {
      this.setState({ addPrizeModal: false });
    }
    if (nextProps.users.prizeList) {
      this.setState({ prizeList: nextProps.users.prizeList ,showPrizeModal: !this.state.showPrizeModal});
    }
    if (nextProps.users.userInfo) {
      this.setState({ userInfo: nextProps.users.userInfo});
    }
    if (nextProps.users.isUpdate) {
       let data={
        userid:this.props.match.params.id
      }
      this.props.dispatch(userActions.getAllInfo(data));
    }
  }
  getBadge = status => {
    return status === true ? 'success' : 'danger';
  }
  addPoolToggle() {
    this.setState({
      addPoolModal: !this.state.addPoolModal
    });
  }
  showPrizeToggle(pool) {
    this.setState({
      prizeList:[],
      
    });
    if (pool.id) {
       let data={
          poolcontestid:pool.id
        }
        this.props.dispatch(userActions.getPrize(data));
    }
  }
  showPrizeClose(pool) {
    this.setState({
      showPrizeModal:false
    });
  }
  handleChangeAddPool(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleChangeAddPool1(name, value) {
    this.setState({ [name]: value });
  }
  handleOptionStatus(e) {
    const { name, value } = e.target;
    this.setState({addPoolStatus: value });
  }
  addPool() {       
    let data={
      contestid:this.props.match.params.id,
      joinfee:this.state.pooljoinfee,
      totalwining:this.state.pooltotalwining,
      winners:this.state.poolwinners,
      maxteams:this.state.poolmaxteams,
      c:this.state.combined?1:0,
      m:this.state.multiple?1:0,
      s:this.state.single?1:0,
      status:this.state.addPoolStatus
    };  
    this.props.dispatch(userActions.addPool(data));
  }
  addPrizeToggle(pool) {
    this.setState({
      poolid:pool.id,
      shareholders:[],
      addPrizeModal: !this.state.addPrizeModal
    });
  }
  handleOptionStatusPrize(e) {
    const { name, value } = e.target;
    this.setState({addPrizeStatus: value });
  }
  addPrize() {
    let data={
      poolcontestid:this.state.poolid,
      prizekeyvalue:this.state.shareholders,
    };
   this.props.dispatch(userActions.addPrize(data));
  }
  handleParameterKeyValueChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      console.log("evt.target.name   ",evt.target.name);
      return { ...shareholder, [evt.target.name]: evt.target.value };
    });
    this.setState({ shareholders: newShareholders });
  }
  handleAddPrizeBreaker = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ pmin: '',pmax: '',pamount: '' }])
    });
  }
  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  }
  udpateUserStatus = (user,status) => {
    let data={
      userid:user.id,
      status:status
    }
    this.props.dispatch(userActions.updateUserStatus(data));
  }
  udpateUserKYC = (user,type) => {
    let bankdata=false;
    if(type==='bank' || type==='bankreject'){
      bankdata=true;
    }
    let notifyData=this.state.confirmModelValue;
    notifyData['user']=user;
    notifyData['type']=type;
    this.setState({
          showConfirmVerify: !this.state.showConfirmVerify,
          confirmModelValue:notifyData,
          bankdata:bankdata,
        });
  }
  callUpdateKYC = () => {
     this.setState({
          showConfirmVerify: !this.state.showConfirmVerify,
          loading: false,
        });
    let notifyData =this.state.confirmModelValue;
    let data={
      userid:notifyData.user.id,
      atype:notifyData.type,
      msg:notifyData.msg,
      status:1
    }
    if(notifyData.msg!=='' && notifyData.type && notifyData.user.id){
         
      this.props.dispatch(userActions.udpateUserKYC(data));
    }

  }

  
  handleChangeInput(e) {

    const { value } = e.target;
    var userInfo = {...this.state.userInfo};
    userInfo.name = value;
    this.setState({userInfo})
  }
  updateUserInfo(userinfo) {

    let data={
      name:this.state.userInfo.name,
      userid:userinfo.id,
    };
   this.props.dispatch(userActions.udpateUserDetails(data));
  }
    //Delete Dialog box
  showImageToggle(image) {
    if (image) {
       this.setState({
          showImageModal: !this.state.showImageModal,
          imageURL:image
        });
    } else {
       this.setState({
          showImageModal: !this.state.showImageModal,
          imageURL:''
        });
    }
   
  }
showConfirmToggle(){
       this.setState({showConfirmVerify: !this.state.showConfirmVerify,}); 
  }
  formFieldUpdate(e) {
    const { name, value } = e.target;
    let verifyData=this.state.confirmModelValue;
    let toggleOther=false;
  if(value==='Other'){
    verifyData['msg']='';
    toggleOther=true;
  }
  if(name==='other_text'){
    toggleOther=true;
    verifyData['msg']=value;
  }else{
    verifyData[name]=value;
  }
  this.setState({ confirmModelValue: verifyData,toggleOther:toggleOther });
  }

  render() {
    const formthis= this;
    const {users}=this.props;
    const {userInfo}=users;
    return (
      <div className="animated fadeIn">
      {(users.loading || formthis.state.loading)?<div className="loader"></div>:null}
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                  <FormGroup row>
                          <Col xl="3"><strong><i className="icon-info pr-1"></i>ViewUser id: {this.props.match.params.id}</strong></Col>
                          <Col xl="3">

    {(userInfo && userInfo.acno)?((userInfo.isbankdverify==="0")? <Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,'bank')}>Bank Verify</Button>:<h6>Bank Verified</h6>):"Bank not filled" }&nbsp;&nbsp;&nbsp;
    {(userInfo && userInfo.pannumber)?((userInfo && userInfo.ispanverify==="0")?<Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,'pancard')}>PAN Verify</Button>:<h6>PAN Verified</h6>):"PAN not filled"}&nbsp;&nbsp;&nbsp;
                            {/* <Button className="btn-sm btn-square btn-success"  onClick={() => this.setState({isEdit:!this.state.isEdit})}>&nbsp;&nbsp;&nbsp;Edit&nbsp;&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp; */} 
                            
                          </Col>
                          {userInfo?
                          <Col xl="2">
                          {/* <Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,2)}>Phone Verified</Button>&nbsp;&nbsp;&nbsp; */}
                          
                          { userInfo.status === "0" || userInfo.status === "2" ?<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateUserStatus(userInfo,1)}>Active&nbsp;&nbsp;&nbsp;</Button> &nbsp;</span>:null} 
                          { userInfo.status === "1" || userInfo.status === "2" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(userInfo,0)}>Inactive</Button>&nbsp;</span>:null}
                          { userInfo.status === "1" || userInfo.status === "0" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(userInfo,2)}>Block&nbsp;&nbsp;&nbsp;</Button>&nbsp;</span>:null}
                          </Col>:null}
                          <Col xl="3">
                          {(userInfo && userInfo.acno)?<span><Button className="btn-sm btn-square btn-danger" onClick={() => this.udpateUserKYC(userInfo,"bankreject")}>Bank Reject</Button>&nbsp;&nbsp;&nbsp;</span>:null}
                          {(userInfo && userInfo.pannumber)?<span><Button className="btn-sm btn-square btn-danger" onClick={() => this.udpateUserKYC(userInfo,"panreject")}>PAN Reject</Button></span>:null}
                          </Col>
                    
                  </FormGroup> 
              </CardHeader>
              <CardBody>
                  {
                   userInfo? 
                   <Row>
                    <Col xs="3">
                      Team Name
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="off"
                          value={userInfo.teamname}
                          onChange={this.handleChangeInput}
                          disabled={!this.state.isEdit}
                        />
                      </Col>
                      {/* {
                        this.state.isEdit?<Col xs="6">
                          <Button className="btn-sm btn-square btn-success"  onClick={() => this.updateUserInfo(userInfo)}>Update</Button>
                        </Col>:<Col xs="6"/>
                      
                      } */}
                      <Col xs="6"/>
                      <Col xs="3">
                      DOB
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.dob?moment(new Date(parseInt(userInfo.dob)*1000)).utcOffset("+05:30").format("YYYY-MM-DD"):'DOB not available'}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Gender
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.gender}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Acccount Holder Name
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.acholdername}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Account No.
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.acno}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Bank Name
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.bankname}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      IFSC Code
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.ifsccode}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>
                      <Col xs="3">
                      State
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="off"
                          value={userInfo.state}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>

                      <Col xs="6"/>
                      
                      <Col xs="3">
                      Bank Image
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                      <img
                            src={userInfo.image===null || userInfo.image===""?'images/bank_identity.png':userInfo.image}
                            width="100"
                            height="100"
                            style={{cursor:'pointer'}}
                            onClick={() =>
                                  this.showImageToggle(userInfo.image)
                            }
                            alt=""
                          />
                        
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Is Bank Verified
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.isbankdverify ==='1'? 'Verified':'Not Verified'}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN No.
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.pannumber}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled

                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN Name
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.panname}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      PAN DOB
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={(userInfo.pandob)?moment(new Date(parseInt(userInfo.pandob)*1000)).utcOffset("+05:30").format("YYYY-MM-DD"):""}
                          
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN Image
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                      <img
                            src={userInfo.panimage===null || userInfo.panimage===""?'images/pan_dummy.png':userInfo.panimage}
                            width="100"
                            height="100"
                            style={{cursor:'pointer'}}
                            onClick={() =>
                                  this.showImageToggle(userInfo.panimage)
                            }
                            alt=""
                          />
                        {/* <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.panimage}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        /> */}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Is PAN Verified
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.ispanverify ==='1'? 'Verified':'Not Verified'}
                          
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Created
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={moment(new Date(parseInt(userInfo.created)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Profile Pic.
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                       <img
                            src={userInfo.profilepic===null ||userInfo.profilepic==='' ? 'images/user.png':userInfo.profilepic}
                            width="50"
                            height="50"
                            onClick={() =>this.showImageToggle(userInfo.profilepic)}
                            style={{cursor:'pointer'}}
                            onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                            className="img-avatar"
                            alt=""
                          />
                      </Col>
                      <Col xs="6"/>



                      <Col xs="3">
                      Login Date
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={(userInfo.logindate && userInfo.logindate!=="0")?moment(new Date(parseInt(userInfo.logindate)*1000)).utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss"):""}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/>


                      {/* <Col xs="3">
                      logintype
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.logintype}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                      </Col>
                      <Col xs="6"/> */}
                      {/* <Col xs="3">
                      devicetype 
                      </Col>
                      <Col xs="3" className="for_padding_bottom">
                        <Input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="off"
                          value={userInfo.devicetype}
                          onChange={this.handleChangeAddSubAdmin}
                          disabled
                        />
                        
                      </Col> */}
                      
                      <Col xs="6"/>


                    </Row>
                    :null
                  }
              </CardBody> 
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showImageModal} toggle={this.showImageToggle} className={this.props.className+" modal-lg"}>
          <ModalHeader toggle={this.showImageToggle}>
              Image
          </ModalHeader>
          <ModalBody className="add_skillhead">
              {this.state.imageURL?<img src={this.state.imageURL}  alt=""/>:"Image not found."}
          </ModalBody>
          <ModalFooter>
              <Button color="secondary" onClick={this.showImageToggle}>
                  Cancel
              </Button>
              
          </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.showConfirmVerify} toggle={this.showConfirmToggle} className={this.props.className+" modal-lg"}>
          <ModalHeader toggle={this.showConfirmToggle}>
              {(this.state.userInfo)?this.state.userInfo.verify_titles[this.state.confirmModelValue.type]:''}
          </ModalHeader>
          <ModalBody className="add_skillhead">
          <Row> 
          {(this.state.bankdata===true)?
                <Col xl="6">
              <Input
                    type="text"
                    name="bstate"
                    id="bstate"
                    autoComplete="off"
                    value={this.state.userInfo.state}      
                    disabled
                    >
                  </Input>
                </Col>
                :'' }

          <Col xl="6">
              <Input
                    type="select"
                    name="msg"
                    id="msg"
                    autoComplete="off"
                    onChange={this.formFieldUpdate}
                    value={this.state.confirmModelValue.msg}      
                      >
                  {(this.state.userInfo && this.state.userInfo.verify_msg )?this.state.userInfo.verify_msg.map((item,index)=>(
                    <option key={index} value={item}>{item}</option> 
                 
                  )):'' }        
                  </Input>
                </Col>
                </Row>
                {(this.state.toggleOther)?
                  <Row>
                <Col xl="12">
              <Input
                    type="text"
                    name="other_text"
                    id="other_text"
                    autoComplete="off"
                    onChange={this.formFieldUpdate}
                    value={this.state.confirmModelValue.msg}      
                      >
                  </Input>
                </Col>
                </Row>
                :'' }
                
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.callUpdateKYC}>
                  Confirm
              </Button>
              <Button color="secondary" onClick={this.showConfirmToggle}>
                  Cancel
              </Button>
              
          </ModalFooter>
      </Modal>
     
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { users} = state;
  
  return {
    users
  };
}
export default connect(mapStateToProps)(ViewUser);