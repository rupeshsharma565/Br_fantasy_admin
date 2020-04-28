import React, { Component } from 'react';
//import Switch from 'react-switch';
import { CONST } from '../../_config';
import { CSVLink } from "react-csv";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker} from 'react-dates';
import { authHeader } from '../../_helpers';
import ImageUploader from 'react-images-upload';
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

import axios from 'axios';
import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import {rewardsActions} from '../../_actions';
//import { toast } from 'react-toastify';
import { AvForm, AvField } from 'availity-reactstrap-validation';

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
      totalpage: 0,
      addRewardsModal:false,
      selectedValType:'',
      valueTypeList:[],
      prizeBreaker: [],
      levelsListData:[],
      rewardsSettings:null,
      ModelTitle:null,
      isUpdatelevel:false,
      levelFrmData:[{id:null,bmin:null,bmax:null,bval:null}],
      formData:{ id:null,title:null, gametype:'' ,pcode:'',pctype:'',ofr_val:'',ofr_val_type:'',
      ofr_min_val:'',ofr_max_val:'',users_limit:'',userid:'',mtype:'',desc:'',
      matchid:'',status:'',image:[],sdate:null,edate:null,pc_ofr_type:'',
     }

    };
    this.addRewardsToggle = this.addRewardsToggle.bind(this);
    this.addBtnForModel = this.addBtnForModel.bind(this);
    this.addRewards=this.addRewards.bind(this);
    this.handleChangeAddRewards = this.handleChangeAddRewards.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.setRecordInModel= this.setRecordInModel.bind(this);
    this.resetModelValue = this.resetModelValue.bind(this);
    this.imageSetInForm = this.imageSetInForm.bind(this); 
    this.updFrmFeildVal = this.updFrmFeildVal.bind(this);
    this.handleRmLevel = this.handleRmLevel.bind(this);
    this.addBnusLevels= this.addBnusLevels.bind(this);
     
  }
  componentDidMount() {
      let data = {
      "limit": 10,
      "page": 1,
      "apitype":"list"
    }
   
    //this.props.dispatch(rewardsActions.getAllRewards(data));
     this.props.dispatch(rewardsActions.getAllLevels(data));
   
  }
  componentWillReceiveProps(nextProps) {

    console.log("next props---",nextProps)
      let data = {
        "limit": 10,
        "page": 1,
        "apitype":"list"
      }
      if(nextProps.rewards && nextProps.rewards.items && nextProps.rewards.items.list && nextProps.rewards.items.list.length>0){
        this.setState({levelsListData:nextProps.rewards.items.list});
      }
     // this.resetModelValue();
      //this.props.dispatch(rewardsActions.getAllLevels(data));

  }
    handleChangeSearch(e) {
    const { value } = e.target;

    let data = {
      "limit": 10,
      "page": 1,
      "apitype":"list",
      "search": value.replace(/^\s+|\s+$/g, ''),
    }
    this.props.dispatch(rewardsActions.getAllLevels(data));
  }
  udpateStatus(codeArr,call_type,status=null) {
    let data={  
      id:codeArr.id,
      apitype:'edit',
      call_type:call_type, 
      status:status,
    }
    this.props.dispatch(rewardsActions.updateLevels(data));
  }

  handleSelectedPaginate(selectedPage) {
    this.setState({ isCSV: false });
    let formthis=this;
    this.setState({selectedPage:selectedPage},()=>{
    let data = {
      "limit": 10,
      "page": selectedPage,
      search: '',
    }
    formthis.props.dispatch(rewardsActions.getAllLevels(data));
  });
  }


   //Add Dialog box
  addRewardsToggle() {
   // console.log("mmm--->>>",this.state.addRewardsModal);
    this.setState({
      addRewardsModal: !this.state.addRewardsModal
    });
  }

addBtnForModel() {
   // console.log("mmm--->>>",this.state.addRewardsModal);
   this.resetModelValue();
    this.setState({
      addRewardsModal: !this.state.addRewardsModal
    });
  }

addRewards=()=> { 
    this.setState({ submitted: true });
    const { formData} = this.state;
    const { dispatch } = this.props;
    console.log("values ",formData);
    if (formData.pcode && formData.pctype) { 
      if(formData.id){
        formData.apitype="edit";
      }
        else {
          formData.apitype="create";
        }
      dispatch(rewardsActions.updateRewards(formData));
    }

    
  }

  addBnusLevels=()=> {  
    this.setState({ submitted: true });
    const { levelFrmData,isUpdatelevel} = this.state;
    const { dispatch } = this.props;
    
    if (levelFrmData) { 
      let data = {
      levels:levelFrmData,
    };
      if(isUpdatelevel===true){
        data.apitype="edit";
      }
        else {
          data.apitype="create";
        }
      dispatch(rewardsActions.updateLevels(data));
    }

    
  }

   setRecordInModel (codeArr, idx ) {
    idx=0;
    let levelFrmData=this.state.levelFrmData;
    levelFrmData[idx]["bmin"]=codeArr.bmin;
    levelFrmData[idx]["bmax"]=codeArr.bmax;
    levelFrmData[idx]["bval"]=codeArr.bval;
    levelFrmData[idx]["id"]=codeArr.id;
    this.setState({ 
      ModelTitle:'Update',
      levelFrmData: levelFrmData ,
      isUpdatelevel:true,
      addRewardsModal: !this.state.addRewardsModal,

    });
  }

  resetModelValue(){
   let formData=this.state.formData;
    formData["id"]=null;
    formData["title"]='';
    formData["gametype"]='';
    formData["pcode"]='';
   
    this.setState({ 
      formData: formData,
    });
  }

  handleChangeAddRewards(e) {
    const { name, value } = e.target;
    console.log(e.target);
    let formData=this.state.formData;
    formData[name]=value;
    this.setState({ formData: formData });
  }
 updFrmFeildVal = idx => e => {

  const { name, value } = e.target;
    let levelFrmData=this.state.levelFrmData;
    levelFrmData[idx][name]=value;
    this.setState({ levelFrmData: levelFrmData });
    console.log(levelFrmData);
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

   handleAddPrizeBreaker = () => {
    let levelFrmData=this.state.levelFrmData;

    this.setState({
      levelFrmData: this.state.levelFrmData.concat([{ bmin: '',bmax: '',bval: '' }])
    });
  };

  handleRmLevel = idx => () => {
    this.setState({
      levelFrmData: this.state.levelFrmData.filter((s, sidx) => idx !== sidx)
    });
  };
  render() { 
    const { bnsLevels } = this.props;
    let { listOfLevels } = (bnsLevels)?bnsLevels:'';
    console.log("this.state.levelsListData----->>>  ",this.state.levelsListData);
    return (
      <div className="animated fadeIn custom_background">
         
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> Rewards{' '}
                    <small className="text-muted">List</small>
                  </Col>
                  { /*
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
                        placeholder="PCODE"
                        onChange={this.handleChangeSearch}
                        autoComplete="off"
                      />
                    </InputGroup>
                  </Col> */ }
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
                      <th scope="col">MIN</th>
                      <th scope="col">MAX</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.levelsListData
                      ? this.state.levelsListData.map((codeArr, index) => (
                          <tr key={index}>
                            <td>{this.state.selectedPage===0 ||this.state.selectedPage===1?(index + 1):((this.state.selectedPage-1)*10) + (index + 1)}</td>
                            <td>{codeArr.bmin}</td>
                            <td>{codeArr.bmax}</td>
                            <td>{codeArr.bval}</td>
                            <td><i className="cui-note h2" onClick={()=>this.setRecordInModel(codeArr,index)}></i></td>
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
          isOpen={this.state.addRewardsModal}
          toggle={this.addRewardsToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.addRewardsToggle}>
            {(this.state.ModelTitle)?this.state.ModelTitle:"Add"} Level
          </ModalHeader>
          <AvForm onValidSubmit={this.addBnusLevels}> 
          <ModalBody>
             <Row>
             {
                 this.state.levelFrmData.map((levelFrmData, idx) => ( 
                      <FormGroup row row key={idx}>
                            <Col md="3">
                              <Input type="text" name="bmin" value={this.state.levelFrmData[idx]['bmin']}  placeholder="Min"   autoComplete="off" onChange={this.updFrmFeildVal(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text" name="bmax" value={this.state.levelFrmData[idx]['bmax']}  placeholder="Max"   autoComplete="off" onChange={this.updFrmFeildVal(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text"  name="bval"  value={this.state.levelFrmData[idx]['bval']} placeholder="Amount"  autoComplete="off"  onChange={this.updFrmFeildVal(idx)}/>
                            </Col>
                            <Col md="1">
                             {(idx>0)? (
                            <Button color="info" onClick={this.handleRmLevel(idx)}>
                              Remove
                            </Button>
                          ):''}
                            </Col>
                                
                      </FormGroup>
                  ))
                }
                
              { (this.state.isUpdatelevel!=true)?
              <Button
               color="success" onClick={this.handleAddPrizeBreaker}>
                Add New
              </Button>
              :''
            }
       
            </Row>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addRewardsToggle}>
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
  const { rewards, authentication ,bnsLevels } = state;
  return {
    bnsLevels,
    rewards 
  };
}
export default connect(mapStateToProps)(Rewards);
