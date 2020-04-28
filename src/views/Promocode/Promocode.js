import React, { Component } from 'react';
//import Switch from 'react-switch';
import { CONST } from '../../_config';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { overrideLoaderCss, loaderColorCode } from '../../_helpers';
import DateTimePicker from 'react-datetime-picker';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  //Badge,
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

  // ListGroup,
  // ListGroupItem
} from 'reactstrap';
import moment from 'moment'
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import {promocodeActions} from '../../_actions';
//import { toast } from 'react-toastify';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ClipLoader } from 'react-spinners';

class Promocode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
      totalpage: 0,
      addPromocodeModal:false,
      selectedValType:'',
      valueTypeList:[],
      promocodeSettings:null,
      ModelTitle:null,
      formData:{ id:null,title:null, gametype:'' ,pcode:'',pctype:'',pc_val:'',pc_val_type:'',
      pc_min_val:'',pc_max_val:'',users_limit:'',userid:'',mtype:'',desc:'',
      matchid:'',status:'',image:[],sdate:null,edate:null,pc_ofr_type:'',
     },
     typeset:0,
     checkSelect:false,
     isLoading :false,

    };
    this.addPromocodeToggle = this.addPromocodeToggle.bind(this);
    this.addBtnForModel = this.addBtnForModel.bind(this);
    this.addPromocode=this.addPromocode.bind(this);
    this.updFrmFieldVal = this.updFrmFieldVal.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onDateChange1 = this.onDateChange1.bind(this);
    this.onFocusChange1 = this.onFocusChange1.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.setRecordInModel= this.setRecordInModel.bind(this);
    this.resetModelValue = this.resetModelValue.bind(this);
    this.imageSetInForm = this.imageSetInForm.bind(this); 
    this.onChangeSelect=this.onChangeSelect.bind(this);
    this.onDateChangeDateTime=this.onDateChangeDateTime.bind(this);
     this.handleSelectedPaginate=this.handleSelectedPaginate.bind(this);
  }
  componentDidMount() {
      let data = {
      "limit": 10,
      "page": 1,
      "apitype":"list"
    }
   
    this.props.dispatch(promocodeActions.getAllPromocode(data));
    let data1={};
    this.props.dispatch(promocodeActions.getAllPromocodeSettings(data1)); 
    
   
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.promocode.items) {
      this.setState({promocodeData:nextProps.promocode.items.list,
                    //promocodeSettings:nextProps.promocode.settings,
                    totalpage:nextProps.promocode.items.total});
    }
    if(nextProps.promocode.paymenttype)
    {
      /*let data={};
      //this.props.dispatch(promocodeActions.getAllPromocodeSettings(data));*/
      this.setState({
        promocodeSettings:nextProps.promocode.paymenttype,
        });  
        console.log("nextProps.promocode.paymenttype--->>>",nextProps.promocode.paymenttype)
    }

    if(nextProps.promocode.isUpdate)
    {
      this.setState({
        addPromocodeModal: false
      });
      let data = {
        "limit": 10,
        "page": 1,
        "apitype":"list"
      }
      this.resetModelValue();
      this.props.dispatch(promocodeActions.getAllPromocode(data));
    }

  }
    handleChangeSearch(e) {
    const { value } = e.target;

    let data = {
      "limit": 10,
      "page": 1,
      "apitype":"list",
      "search": value.replace(/^\s+|\s+$/g, ''),
    }
    this.props.dispatch(promocodeActions.getAllPromocode(data));
  }
  udpateStatus(codeArr,call_type,status=null) {
    let data={  
      id:codeArr.id,
      apitype:'edit',
      call_type:call_type, 
      status:status,
    }
    this.props.dispatch(promocodeActions.updatePromocode(data));
  }

  handleSelectedPaginate(selectedPage) {

    let formthis=this;
    this.setState({selectedPage:selectedPage},()=>{
    let data = {
      "limit": 10,
      "page": selectedPage,
      search: '',
      "apitype":"list"
    }
    formthis.props.dispatch(promocodeActions.getAllPromocode(data));
  });
  }


   //Add Dialog box
  addPromocodeToggle() {
   // console.log("mmm--->>>",this.state.addPromocodeModal);
    this.setState({
      addPromocodeModal: !this.state.addPromocodeModal
    });
  }

addBtnForModel() {
   // console.log("mmm--->>>",this.state.addPromocodeModal);
   this.resetModelValue();
    this.setState({
      addPromocodeModal: !this.state.addPromocodeModal
    });
  }

addPromocode=()=> {  
    this.setState({ submitted: true });
    const { formData} = this.state;
    formData.sdate=this.state.startdate;
    formData.edate=this.state.enddate;
    const { dispatch } = this.props;
    //console.log("values ",dispatch);
    /*if(formData.pc_val_type=='perval' && formData.pc_val>100){
       dispatch(alertActions.success("Please less then 100 perctange"));
    }*/
    if (formData.pcode && formData.pc_val>0) { 
      if(formData.id){
        formData.apitype="edit";
      }
        else {
          formData.apitype="create";
        }
       this.setState({
      isLoading: true
    });
      dispatch(promocodeActions.updatePromocode(formData));

      this.setState({
      isLoading: false
    });
    }

    
  }

   setRecordInModel(codeArr){
    let startdate = new Date(parseInt(codeArr.sdate)*1000);
    let enddate = new Date(parseInt(codeArr.edate)*1000);
    console.log("codaData===>>>",startdate,enddate);
   let formData=this.state.formData;
    formData["title"]=codeArr.title;
    formData["gametype"]=codeArr.gametype;
    formData["pcode"]=codeArr.pcode;
    formData["pctype"]=codeArr.pctype;
    formData["pc_val"]=codeArr.pc_val;
    formData["pc_val_type"]=codeArr.pc_val_type;
    formData["pc_min_val"]=codeArr.pc_min_val;
    formData["pc_max_val"]=codeArr.pc_max_val;
    formData["users_limit"]=codeArr.users_limit;
    formData["userid"]=codeArr.userid;
    formData["mtype"]=codeArr.mtype;
    formData["desc"]=codeArr.desc;
    formData["matchid"]=codeArr.matchid;
    formData["status"]=codeArr.status;
    formData["sdate"]=(parseInt(codeArr.sdate)*1000);
    formData["edate"]=(parseInt(codeArr.edate)*1000);
    formData["pc_ofr_type"]=codeArr.pc_ofr_type;
    formData["id"]=codeArr.id;
    formData["image"]=[];
    this.setState({ 
      ModelTitle:'Update',
      formData: formData ,
      addPromocodeModal: !this.state.addPromocodeModal,
      startdate:new Date(parseInt(codeArr.sdate)*1000),
      enddate:new Date(parseInt(codeArr.edate)*1000)
    });
  }

  resetModelValue(){
   let formData=this.state.formData;
    formData["id"]=null;
    formData["title"]='';
    formData["gametype"]='';
    formData["pcode"]='';
    formData["pctype"]='';
    formData["pc_val"]='';
    formData["pc_val_type"]='';
    formData["pc_min_val"]='';
    formData["pc_max_val"]='';
    formData["users_limit"]='';
    formData["userid"]='';
    formData["mtype"]='';
    formData["desc"]='';
    formData["matchid"]='';
    formData["status"]='';
    formData["sdate"]=null;//codeArr.sdate;
    formData["edate"]=null; //codeArr.edate;
    formData["pc_ofr_type"]='';
    formData["image"]=[];
    this.setState({ 
      formData: formData,
      startdate:"",
      enddate:""
    });
  }

  updFrmFieldVal(e) {
    const { name, value } = e.target;
    console.log("e.target--->>>>",e.target);
    let formData=this.state.formData;
    formData[name]=value;
    this.setState({ formData: formData });
  }

  onChangeSelect(e){
    const { name, value } = e.target;
    console.log("e.target--->>>>",e.target);
    let formData=this.state.formData;
    formData[name]=value;
    let typeset=0;
    let checkSelect=false;
    if(value==="perval")
    {
      typeset=100;
      checkSelect=true;
    }else if(value==="perval")
    {
      checkSelect=true;
    }
    else if(value==="amtval")
    {
      checkSelect=true;
    }

    this.setState({ formData: formData,
      typeset:typeset,
      checkSelect:checkSelect
    });
   console.log("this.state.formData.pc_val_type--111-->>",formData[name],this.state.formData.pc_val_type);
  }

  onDateChange = (date) => {
    //this.setState(() => ({ date }));
    let formData=this.state.formData;
    formData["sdate"]=date;
    this.setState({ formData: formData });
  }

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }))
  }

  onDateChange1 = (date) => {
   // this.setState(() => ({ date }));
    let formData=this.state.formData;
    formData["edate"]=date;
    this.setState({ formData: formData });

  }
  
  onFocusChange1 = ({ focused }) => {
    this.setState(() => ({ calendarFocused1: focused }))
  } 

   //Upload team logo
  imageSetInForm(picture) {
    console.log("Picture upload",picture);
    let formData=this.state.formData;
    if(picture.length>0 ){
       formData["image"]=picture[0];
    this.setState({ formData: formData });
    console.log(this.state.formData);
    }
  }


  onDateChangeDateTime=(startdate)=>{
console.log("e======>>>",startdate);
this.setState({startdate});
  }

  onDateChangeEnd=(enddate)=>{
    console.log("e======>>>",enddate);
    this.setState({enddate});
  }

  render() {
    let formthis=this;
    const { promocode } = this.props;
    let { items } = promocode;
    console.log("items.settings.offer_value_type----->>> ",(items)?items.settings.offer_value_type:"");
    let objCodeValueType={};
    let newObjCodeValueType={};
    if(this.state.promocodeSettings)
    {
      //objCodeValueType["0"]="--Select--";
      objCodeValueType= this.state.promocodeSettings.offer_value_type;//items.settings.offer_value_type;
      newObjCodeValueType[""]="--Select--";
     if(objCodeValueType){
        Object.values(objCodeValueType).forEach(function(itemCVT,index){
        newObjCodeValueType[Object.keys(objCodeValueType)[index]]=itemCVT;
       })
    }
     console.log("newObjCodeValueType--->>>",newObjCodeValueType);
    }
    return (
      <div className="animated fadeIn custom_background">
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

        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> Promocode{' '}
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
                        placeholder="Search"
                        onChange={this.handleChangeSearch}
                        autoComplete="off"
                      />
                    </InputGroup>
                  </Col>
                  <Col xl="3">
                   <Button
                      onClick={this.addBtnForModel}
                      className="mr-1"
                      color="success"
                    >
                      Add
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">TITLE</th>
                      <th scope="col">PROMO CODE</th>
                      <th scope="col">START DATE</th>
                      <th scope="col">END DATE</th>
                      <th scope="col">VALUE</th>
                      <th scope="col">STATUS</th>
                      <th scope="col">MIN</th>
                      <th scope="col">MAX</th>
                      <th scope="col">PCLIMIT</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.list.map((codeArr, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td>{codeArr.title}</td>
                           
                            <td>{codeArr.pcode}</td>
                            <td>{moment(new Date(parseInt(codeArr.sdate)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}</td>
                            <td>{moment(new Date(parseInt(codeArr.edate)*1000)).utcOffset("+05:30").format("YYYY-MM-DD")}</td>
                            <td>{codeArr.pc_val} {items.settings.offer_value_type[codeArr.pc_val_type]}</td>
                            <td>
                            {codeArr.status === "0" ?<span><Button className="btn-sm btn-square btn-primary" onClick={() => this.udpateStatus(codeArr,"statusUpdate",1)}>Deactivated</Button> </span>:<span><Button className="btn-sm btn-square btn-success" onClick={() => this.udpateStatus(codeArr,"statusUpdate",0)}>Activated</Button> </span>} 
                            </td>
                            <td>{codeArr.pc_min_val}</td>
                            <td>{codeArr.pc_max_val}</td>
                            <td>{codeArr.users_limit}</td>
                            <td><i className="cui-note h2" onClick={()=>this.setRecordInModel(codeArr)}></i></td>
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
          isOpen={this.state.addPromocodeModal}
          toggle={this.addPromocodeToggle}
          className="{this.props.className} my-modal"
        >
          <ModalHeader toggle={this.addPromocodeToggle}>
            {(this.state.ModelTitle)?this.state.ModelTitle:"Add"} Promo Code
          </ModalHeader>
          <AvForm onValidSubmit={this.addPromocode}>
          <ModalBody>
             <Row>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="pname">Title</Label>
                  <AvField
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="off"
                    value={this.state.formData.title}
                    onChange={this.updFrmFieldVal}
                    validate={{
                      required: { value: true, errorMessage: "Title is required" },
                      //pattern: { value: CONST.PATTERN.name, errorMessage: 'Please enter valid title' },
                      maxLength: { value: 50, errorMessage: 'Your title must be 50 character' },
                    }}
                  />
                </FormGroup>
              </Col>
           
              <Col xs="2">
                <FormGroup>
                  <Label htmlFor="pid">Promo Code</Label>
                  <AvField
                    type="text"
                    name="pcode"
                    id="pcode"
                    autoComplete="off"
                    value={this.state.formData.pcode}
                    onChange={this.updFrmFieldVal}
                    validate={{
                      required: { value: true, errorMessage: "Promo code is required" },
                      pattern: { value: CONST.PATTERN.address, errorMessage: 'Please enter valid promo code' },
                      minLength: { value: 4, errorMessage: 'Promo Code must be 4-10 character' },
                      maxLength: { value: 10, errorMessage: 'Promo Code must be 4-10 character' },
                    }}
                  />
                </FormGroup>
              </Col>

               <Col xs="1">
                <FormGroup>
                  <Label htmlFor="fpname">Users Limit</Label>
                  <AvField
                    type="text"
                    title="Users Limit"
                    name="users_limit"
                    id="users_limit"
                    autoComplete="off"
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.users_limit}   
                    validate={{
                        pattern: { value: CONST.PATTERN.username, errorMessage: 'Please enter valid limit' },
                      }}  
                  />
                </FormGroup>
              </Col>
              <Col xs="3">  
                 <FormGroup>
                  <Label htmlFor="fpname">Code Value Type</Label>
                  <Input
                    type="select"
                    name="pc_val_type"
                    id="pc_val_type"
                    autoComplete="off"
                    onChange={this.onChangeSelect}
                    value={this.state.formData.pc_val_type}      
                    validate={{
                      required: { value: true, errorMessage: "Code value type is required" },
                      }}  >
                       {newObjCodeValueType ? 
                             Object.keys(newObjCodeValueType).map((e, key) => {
                                return (<option key={key} value={e}>{Object.values(newObjCodeValueType)[key]}</option>)
                              })
                           :null } 
                  </Input>
                </FormGroup>
              </Col>

               <Col xs="2">
                <FormGroup>
                  <Label htmlFor="pid">Code Value</Label>
                  <AvField
                    type="text"
                    name="pc_val"
                    id="pc_val"
                    autoComplete="off"
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.pc_val} 
                    readOnly={!this.state.checkSelect}
                    max= {(this.state.typeset===100)?100:100000000}
                    validate={{
                      required: { value: true, errorMessage: "Code Value is required" },
                      //pattern: { value: CONST.PATTERN.username, errorMessage: 'Please enter valid Code Value' },
                      //maxLength: { value:((this.state.typeset===0)?10:3) , errorMessage: ((this.state.typeset===100)?"You enter must be 12 character":"")},
                    }}
                  />
                </FormGroup>
              </Col>
              
              </Row>
              <Row>
              <Col xs="2">
               <Label htmlFor="fpname">Start Date</Label>
                            {/* <SingleDatePicker
                                date={this.state.formData.sdate} 
                                onDateChange={this.onDateChange}
                                focused={this.state.calendarFocused} 
                                onFocusChange={this.onFocusChange} 
                                numberOfMonths={1}
                                small={true}
                                displayFormat="DD/MM/YYYY"
                                placeholder="Start Date"
                                isOutsideRange={day => (moment().diff(day) > 0)}
                            /> */}
                             <DateTimePicker
                              onChange={formthis.onDateChangeDateTime}
                              value={formthis.state.startdate}
                              format={"dd/MM/yyyy"}
                              required={true}
                              //minDate={new Date()}
                            />
                      </Col>
                      <Col xs="2">
                       <Label htmlFor="fpname">End Date</Label>
                            {/* <SingleDatePicker
                                date={this.state.formData.edate} 
                                onDateChange={this.onDateChange1}
                                focused={this.state.calendarFocused1} 
                                onFocusChange={this.onFocusChange1} 
                                numberOfMonths={1}
                                small={true}
                                isOutsideRange={day => (moment().diff(day) > 0)}
                                placeholder="End Date"
                                displayFormat="DD/MM/YYYY"
                            /> */}
                             <DateTimePicker
                              onChange={this.onDateChangeEnd}
                              value={formthis.state.enddate}
                              format={"dd/MM/yyyy"}
                              required={true}
                              //minDate={new Date()}
                            />
                      </Col>

              <Col xs="2">
                <FormGroup>
                  <Label htmlFor="fpname">Min Amount</Label>
                  <AvField
                    type="text"
                    name="pc_min_val"
                    id="pc_min_val"
                    autoComplete="off"
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.pc_min_val}  
                    min={1}  
                    validate={{
                          required: { value: true, errorMessage: "Min amount is required" },
                          pattern: { value: CONST.PATTERN.username, errorMessage: 'Please enter valid amount' },
                      }}  
                  />
                </FormGroup>
              </Col>

              <Col xs="2">
                <FormGroup>
                  <Label htmlFor="fpname">Max Amount</Label>
                  <AvField
                    type="text"
                    name="pc_max_val"
                    id="pc_max_val"
                    autoComplete="off"
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.pc_max_val}    
                    validate={{
                          required: { value: true, errorMessage: "Max amount is required" },
                          pattern: { value: CONST.PATTERN.username, errorMessage: 'Please enter valid amount' },
                      }}  
                  />
                </FormGroup>
              </Col>
{/*}
             <Col xs="2">
                <FormGroup>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Add Image"
                    withLabel={false}
                    withPreview={false}
                    onChange={this.imageSetInForm}
                    maxFileSize={5242880}
                  />
                </FormGroup>
              </Col> */ }
            </Row>

             <Row>
               <Col xs="12">
                <FormGroup>
                  <Label htmlFor="fpname">Description</Label>
                  <AvField
                   type="textarea"
                    name="desc"
                    id="desc"
                    autoComplete="off"
                    onChange={this.updFrmFieldVal}
                    value={this.state.formData.desc}
                  />
                </FormGroup>
              </Col>
            </Row>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addPromocodeToggle}>
              Cancel
            </Button>
          </ModalFooter>
          </AvForm>
        </Modal>
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { promocode, authentication } = state;
  return {
    promocode
  };
}
export default connect(mapStateToProps)(Promocode);
