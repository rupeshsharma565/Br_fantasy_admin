import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button ,FormGroup,} from 'reactstrap';
//import Switch from 'react-switch';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions';
const statusOption = [{ value: 1, name: "Active" },{ value: 0, name: "Deactive" }];
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPoolModal: false,
      addPrizeModal: false,
      showPoolModal: false,
      editPoolModal: false,
      showPrizeModal:false,
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      combined: false,
      single: false,
      multiple: false,
      addPoolStatus:statusOption[0].value,
      shareholders: [{ name: "" }]
    };
    this.udpateUserKYC = this.udpateUserKYC.bind(this);
    this.udpateUserStatus = this.udpateUserStatus.bind(this);
    this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
    this.showPrizeToggle = this.showPrizeToggle.bind(this);
    this.handleChangeAddPool1 = this.handleChangeAddPool1.bind(this);
    this.addPrizeToggle = this.addPrizeToggle.bind(this);
    this.addPoolToggle = this.addPoolToggle.bind(this);
    this.handleChangeAddPool = this.handleChangeAddPool.bind(this);
    this.showPrizeClose = this.showPrizeClose.bind(this);
    this.handleOptionStatus = this.handleOptionStatus.bind(this);
    this.handleParameterKeyValueChange = this.handleParameterKeyValueChange.bind(this);
  }
  componentDidMount() {
    console.log("this.props.match.params.id   ",this.props.match.params.id);
    let data={
      userid:this.props.match.params.id
    }
    this.props.dispatch(userActions.getAllInfo(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.users.kycStatusUpdate) {
      // this.setState({ addPoolModal: false });
      // let data={
      //   contestid:this.props.match.params.id
      // }
      // this.props.dispatch(userActions.getPoolList(data));
      let data={
      userid:this.props.match.params.id
    }
    this.props.dispatch(userActions.getAllInfo(data));
    }
    if (nextProps.users.prizeAdded) {
      this.setState({ addPrizeModal: false });
    }
    if (nextProps.users.prizeList) {
      this.setState({ prizeList: nextProps.users.prizeList ,showPrizeModal: !this.state.showPrizeModal});
    }
  }
  //Show Badge in Table
  getBadge = status => {
    return status === true ? 'success' : 'danger';
  }
  addPoolToggle() {
    this.setState({
      addPoolModal: !this.state.addPoolModal
    });
  }
  showPrizeToggle(pool) {
    console.log("poolpool  ",pool);
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
    console.log("poolpool  ",pool);
    this.setState({
      showPrizeModal:false
    });
  }
  handleChangeAddPool(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleChangeAddPool1(name, value) {
   console.log('name  ',name);
   console.log('value  ',value);
   
    this.setState({ [name]: value });
  }
  handleOptionStatus(e) {
    const { name, value } = e.target;
   console.log(name +"  "+value);
    this.setState({addPoolStatus: value });
  }
  addPool() {
    // console.log("this.state.pooljoinfee  ",this.state.pooljoinfee);
    // console.log("this.state.pooltotalwining  ",this.state.pooltotalwining);
    // console.log("this.state.poolwinners  ",this.state.poolwinners);
    // console.log("this.state.poolmaxteams  ",this.state.poolmaxteams);
    // console.log("this.state.addPoolStatus  ",this.state.addPoolStatus);
    // console.log("this.state.combined  ",this.state.combined);
    // console.log("this.state.single  ",this.state.single);
    // console.log("this.state.multiple  ",this.state.multiple);
        
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
    console.log(data);
    
    this.props.dispatch(userActions.addPool(data));
  }
  addPrizeToggle(pool) {
    console.log(pool);
    this.setState({
      poolid:pool.id,
      shareholders:[],
      addPrizeModal: !this.state.addPrizeModal
    });
  }
  handleOptionStatusPrize(e) {
    const { name, value } = e.target;
   console.log(name +"  "+value);
    this.setState({addPrizeStatus: value });
  }
  addPrize() {
    console.log("this.state.pooljoinfee  ",this.state.shareholders);
    
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
    console.log("newShareholders  ",newShareholders);
    this.setState({ shareholders: newShareholders });
  };
  handleAddPrizeBreaker = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ pmin: '',pmax: '',pamount: '' }])
    });
  };
  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };
  udpateUserStatus = (user,status) => {
    console.log(user);
    console.log(status);
    let data={
      userid:user.id,
      status:status
    }
    this.props.dispatch(userActions.updateUserStatus(data));
  }
  udpateUserKYC = (user,type) => {
    console.log(user);
    console.log(type);
    let data={
      userid:user.id,
      atype:type,
      status:1
    }
    console.log(data);
    
    this.props.dispatch(userActions.udpateUserKYC(data));
  }
  render() {

    const {users}=this.props;
    const {userInfo}=users;
 
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                  <FormGroup row>
                          <Col xl="3"><strong><i className="icon-info pr-1"></i>EditUser id: {this.props.match.params.id}</strong></Col>
                          <Col xl="6">
                            <Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,'bank')}>Bank Verified</Button>&nbsp;&nbsp;&nbsp;
                            <Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,'pancard')}>PAN Verified</Button>&nbsp;&nbsp;&nbsp;
                          </Col>
                          {userInfo?
                          <Col xl="3">
                          {/* <Button className="btn-sm btn-square btn-success"  onClick={() => this.udpateUserKYC(userInfo,2)}>Phone Verified</Button>&nbsp;&nbsp;&nbsp; */}
                          
                          { userInfo.status === "0" || userInfo.status === "2" ?<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateUserStatus(userInfo,1)}>Active&nbsp;&nbsp;&nbsp;</Button> &nbsp;</span>:null} 
                          { userInfo.status === "1" || userInfo.status === "2" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(userInfo,0)}>Inactive</Button>&nbsp;</span>:null}
                          { userInfo.status === "1" || userInfo.status === "0" ?<span><Button className="btn-sm btn-square btn-danger"  onClick={() => this.udpateUserStatus(userInfo,2)}>Block&nbsp;&nbsp;&nbsp;</Button>&nbsp;</span>:null}
                          </Col>:null}
                    
                  </FormGroup>
              </CardHeader>
              <CardBody>
                  {
                    
                   
                   userInfo? 
                   <Row>
                      <Col xs="3">
                      {userInfo.id}
                      </Col>
                      <Col xs="3">
                      {userInfo.id}
                      </Col>
                      <Col xs="6"/>
                      
                      <Col xs="3">
                      Username
                      </Col>
                      <Col xs="3">
                      {userInfo.username}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Is User Verified
                      </Col>
                      <Col xs="3">
                      {userInfo.isuserverify}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Status
                      </Col>
                      <Col xs="3">
                      {userInfo.status}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      DOB
                      </Col>
                      <Col xs="3">
                      {userInfo.dob}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Gender
                      </Col>
                      <Col xs="3">
                      {userInfo.gender}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Account Holder Name
                      </Col>
                      <Col xs="3">
                      {userInfo.acholdername}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      Account No
                      </Col>
                      <Col xs="3">
                      {userInfo.acno}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Bank Name
                      </Col>
                      <Col xs="3">
                      {userInfo.bankname}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      IFSC Code
                      </Col>
                      <Col xs="3">
                      {userInfo.ifsccode}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Is Bank Verified
                      </Col>
                      <Col xs="3">
                      {userInfo.isbankdverify}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN Number
                      </Col>
                      <Col xs="3">
                      {userInfo.pannumber}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN Name
                      </Col>
                      <Col xs="3">
                      {userInfo.panname}
                      </Col>
                      <Col xs="6"/>

                      <Col xs="3">
                      PAN DOB
                      </Col>
                      <Col xs="3">
                      {userInfo.pandob}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      PAN Image
                      </Col>
                      <Col xs="3">
                      {userInfo.panimage}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Is PAN Verified
                      </Col>
                      <Col xs="3">
                      {userInfo.ispanverify}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Created
                      </Col>
                      <Col xs="3">
                      {userInfo.created}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Profile Picture
                      </Col>
                      <Col xs="3">
                      {userInfo.profilepic}
                      </Col>
                      <Col xs="6"/>



                      <Col xs="3">
                      Login Date
                      </Col>
                      <Col xs="3">
                      {userInfo.logindate}
                      </Col>
                      <Col xs="6"/>


                      <Col xs="3">
                      Login Type
                      </Col>
                      <Col xs="3">
                      {userInfo.logintype}
                      </Col>
                      <Col xs="6"/>
                      <Col xs="3">
                      Device Type
                      </Col>
                      <Col xs="3">
                      {userInfo.devicetype}
                      </Col>
                      <Col xs="6"/>


                    </Row>
                    :null
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
  const { users} = state;
  
  return {
    users
  };
}
export default connect(mapStateToProps)(EditUser);