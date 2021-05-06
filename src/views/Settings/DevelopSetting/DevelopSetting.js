import React, { Component } from 'react';
import RmInput from './../../../component/comman'
import {
  Card,
  CardBody,
  CardHeader,
   InputGroup,
   InputGroupAddon,
  Button,
  Input,
  Row,
  Col,
  Collapse,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  
} from 'reactstrap';
import { connect } from 'react-redux';
import { globalAction } from '../../../_actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';
class DevelopSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupModalToggle: false,
      formData:{},
      collapse: false,
      accordion: true,
      items: [],
      keyList:{},
      listSetting:[]
    };
    this.popupModalToggle= this.popupModalToggle.bind(this);
    this.setRecordInModel= this.setRecordInModel.bind(this);
    this.handleSelectChange=this.handleSelectChange.bind(this);
    this.updateModelSubmit=this.updateModelSubmit.bind(this);
    this.keyDropDownName=this.keyDropDownName.bind(this);
  }


  componentDidMount() {
    let data={
      apiurl:"/api/settings/list",
      mainstatename:"globsetting",
      secondname:"listsetting",
      constantreq:"settingList"
    }
    this.props.dispatch(globalAction.getGlobalList(data))
  }
  componentWillReceiveProps(newProps) {
    const { globalReducer } = newProps;
    if(globalReducer && globalReducer.editsetting &&  globalReducer.editsetting.error===false){
      this.setState({popupModalToggle:false});
    }
    if(globalReducer && globalReducer.listsetting &&  globalReducer.listsetting.data && globalReducer.listsetting.data.list){
    let listsettingWthParent=globalReducer.listsetting.data.list;

    let parentList={};
    listsettingWthParent.forEach(itemParent=>{      
      if(itemParent.keyorder!= 0){
        let childObj=[];
        
        listsettingWthParent.forEach(itemChild=>{
          if(itemParent.id===itemChild.parent){
            childObj.push(itemChild);
                       
          }
        })

        parentList[itemParent.keylable]=childObj;
      }
    })    
    this.setState({listSetting:parentList});
    }
  }
 
  setRecordInModel(codeArr){
    //let formData=this.state.formData;
    if(codeArr.keytype==="enum"){
      codeArr[codeArr.keyname]={value:codeArr.keyvalue,label:this.keyDropDownName(codeArr)};
    }
    this.setState({formData:codeArr});
    this.popupModalToggle();
  }

  popupModalToggle() {
     this.setState({
      popupModalToggle: !this.state.popupModalToggle    
     });
   }


   handleSelectChange(e){
     
     
    let formData=this.state.formData;
    if(formData.keytype==="enum"){
      formData[formData.keyname]={value:e.value,label:e.label};
      formData["keyvalue"]=e.value;
    }else{
      formData["keyvalue"]=e.target.value;
    }
    this.setState({
        formData
    })
}

updateModelSubmit(e){
  e.preventDefault();
  let data={
    apiurl:"/api/settings/edit",
    mainstatename:"globsetting",
    secondname:"editsetting",
    constantreq:"settingEdit",
    parameter:this.state.formData
  }
  this.props.dispatch(globalAction.getGlobalList(data))
}

keyDropDownName(formData){
  let keylistvalue=(formData.keylistvalue)?JSON.parse(formData.keylistvalue):""; 
  let keyList=this.state.keyList;
  keylistvalue.forEach(item=>{
    keyList[formData["keyname"]+"_"+item.value]=item.label;
  });
  //this.setState({keyList});
  return keyList[formData["keyname"]+"_"+formData["keyvalue"]];
}
  
  render() {
    let {globalReducer}=this.props;
    let {listsetting}=globalReducer;
    
    let keylistvalue=(this.state.formData && this.state.formData.keylistvalue)?JSON.parse(this.state.formData.keylistvalue):""; 
    
    //let listsettingWthParent=(listsetting && listsetting.data && listsetting.data.list && listsetting.data.list.lenght>0)?listsetting.data.list:[];
    //listsettingWthParent=listsettingWthParent.filter(item=>((item.parent===item.id)?console.log("listsettingWthParent---->>>",item):{}));
        
    return (
      <div className="animated fadeIn">
        <Row>
        <Modal
          isOpen={this.state.popupModalToggle}
          toggle={this.popupModalToggle}
          className="{this.props.className} my-modal"
        >
          <ModalHeader toggle={this.popupModalToggle}>
           Update Key Value 
                </ModalHeader>
          <form onSubmit={this.updateModelSubmit}>
          <ModalBody>
             <Row>
              <Col xs="4">
                <FormGroup>
                  <Label htmlFor="pname">{this.state.formData.keylable}</Label>
                  
                  <RmInput avfield={AvField} details={this.state.formData} triggerUpdate={this.handleSelectChange} />
                  
                </FormGroup>
              </Col>
              </Row>
            
            </ModalBody>
  
            <ModalFooter>
              <Button color="primary">
                Submit
              </Button>{' '}
              <Button color="secondary" onClick={this.popupModalToggle}>
                Cancel
              </Button>
            </ModalFooter>
            </form>
          </Modal>



          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Common Setting
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
                <div id="accordion">
                {(this.state.listSetting)?Object.keys(this.state.listSetting).map((itemParent,indexParent)=>(
                  <div className="parentbox">
                    <Row xl={12}>
                   <strong>{itemParent}</strong>
                   </Row>
                {(this.state.listSetting[itemParent] && Object.values(this.state.listSetting[itemParent]))?(Object.values(this.state.listSetting[itemParent])).map(item=>{
                    return(
                <Row xl={12} className={"child-margen"}>
                  <Col xl={6}>
                 {item.keylable}
                  </Col>
                 
                  <Col xl={4}> 
                    {(item.keytype==="enum")?this.keyDropDownName(item):item.keyvalue} 
                  </Col>
                  <Col xl={2}  > 
                  
                  <i className="cui-note h2" onClick={()=>this.setRecordInModel(item)}></i>
                   </Col>
                  </Row>
                   )
                  }):null}
                   </div>
                )):null}
                </div>
                 </CardBody>
                 </Card>

                 </Col>
        </Row>
      </div>
    );
  }
}
// export default FootballSetting;
function mapStateToProps(state) {
  const { globalReducer, authentication } = state;
  const { user } = authentication;

  return {
    user,
    globalReducer
  };
}
export default connect(mapStateToProps)(DevelopSetting);
