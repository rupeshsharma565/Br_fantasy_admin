import React, { Component } from 'react';
import { overrideLoaderCss, loaderColorCode } from '../../_helpers';
import { } from 'reactstrap';
import { connect } from 'react-redux';
import {privateContestActions} from '../../_actions';
import { toast } from 'react-toastify';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ClipLoader } from 'react-spinners';
import {
  Col,
  Row,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Card,CardHeader,CardBody,
} from 'reactstrap';
class PrivateContest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
      totalpage: 0,
      ranksSlabeModal:false,
      selectedValType:'',
      formData:{ id:null,contestsize:2},
      ranksData:{new:{},old:{},total:0},
      selectedSlabs:{},
      typeset:0,
      checkSelect:false,
      editIcon:false,
      isLoading :false,
    };
    this.editranksToggle = this.editranksToggle.bind(this);
    this.updFrmFieldVal = this.updFrmFieldVal.bind(this);
    this.onChangeCall = this.onChangeCall.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.resetModelValue = this.resetModelValue.bind(this);
    this.handleSelectedPaginate=this.handleSelectedPaginate.bind(this);
    this.editranks=this.editranks.bind(this);
    this.editranksUpdate=this.editranksUpdate.bind(this);
    this.ranksValueUpdate=this.ranksValueUpdate.bind(this);
    this.getSlabsofContestSize=this.getSlabsofContestSize.bind(this);
    this.showEditIcon=this.showEditIcon.bind(this);
  }
  componentDidMount() {
      let data = {
      "limit": 10,
      "page": 1,
      "atype":"list"
    }
   
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));   
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.privatecnst.listOfPrivateContest) {

      this.setState({privatecontestData:nextProps.privatecnst.listOfPrivateContest.list,
                    totalpage:nextProps.privatecnst.listOfPrivateContest.total
                  });

    }
   if (nextProps.privatecnst.isLoading===false) {
      this.setState({isLoading: false});
    }
  }
    handleChangeSearch(e) {
    const { value } = e.target;

    let data = {
      "limit": 10,
      "page": 1,
      "atype":"list",
      "search": value.replace(/^\s+|\s+$/g, ''),
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));
  }
  udpateStatus(codeArr,call_type,status=null) {
    let data={  
      id:codeArr.id,
      atype:'edit',
      call_type:call_type, 
      status:status,
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.updatePrivateContest(data));
 
  }

  handleSelectedPaginate(selectedPage) {

    let formthis=this;
    this.setState({selectedPage:selectedPage},()=>{
    let data = {
      "limit": 10,
      "page": selectedPage,
      search: '',
      "atype":"list"
    }
    this.setState({isLoading: true});
    formthis.props.dispatch(privateContestActions.getAllPrivateContest(data));
  });
  }
 

  resetModelValue(){
   let formData=this.state.formData;
    formData["id"]=null;
    formData["contestsize"]='';
    this.setState({ 
      formData: formData,
    });
  }

  updFrmFieldVal(e) {
    const { name, value } = e.target;
    let formData=this.state.formData;
    formData[name]=value;
    this.setState({ formData: formData });
  }

ranksValueUpdate(e) {
    //let ranksData=this.state.ranksData;
   // console.log("---------->>>",e.target)
  //   let { name, value } = e.target;
  //   let rnew=ranksData['new'];
  //   let old=ranksData['old'];
  //   value=parseInt(value);
  //   name=name.split("-");
  //   if(name[1]!=undefined && value ){
  //     let index=parseInt(name[1]);
  //     rnew[index].percent=value;
  //     ranksData['old']=old;
  //     ranksData['new']=rnew;
  //     console.log("aftreyyyy",rnew);
     
  // }
  //   //return true;
  //     this.setState({ ranksData: ranksData },()=>{
  //      // console.log("ranksData------>>>",ranksData)
  //     });
}

  //Add Dialog box
  editranksToggle() {
   // console.log("mmm--->>>",this.state.addPromocodeModal);
   /*let selectedSlabs=this.state.selectedSlabs;
   let ranksData=this.state.ranksData;
   console.log("dfdddddddd",selectedSlabs);
   if(selectedSlabs.ranks){
       ranksData['new']=selectedSlabs.ranks;
       ranksData['old']=selectedSlabs.ranks;
  }*/
    this.setState({
    //  ranksData:ranksData,
      ranksSlabeModal: !this.state.ranksSlabeModal
    });
  }

  showEditIcon(){

    let formData=this.state.formData;
    this.setState({
      editIcon: !this.state.editIcon
    });
    if(this.state.editIcon){
      let data = {
      "limit": 10,
      "page": 1,
      "atype":"getbycnstsize",
      "contestsize":2,
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));
    formData['contestsize']=2
    this.setState({ formData:formData});
    }else{
      let data = {
      "limit": 10,
      "page": 1,
      "atype":"getbycnstsize",
      "contestsize":100,
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));
  }
    
  }
  updateCheckBox =(item,winner)=>{

    let data = {
      "limit": 10,
      "page": 1,
      "atype":"upsert",
      "id":item['_id']['$oid'],
      "winner":winner,
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));
  }

  editranks =(item) =>{

    let ranksData=this.state.ranksData;
    ranksData['new']=item.ranks;
    ranksData['old']=item.ranks;
     this.setState({
      selectedSlabs:item,
      ranksData:ranksData,
      ranksSlabeModal: !this.state.ranksSlabeModal
    },()=>{
      
    });
  }

  editranksUpdate(){
    let ranksData=this.state.ranksData;
    let selectedSlabs=this.state.selectedSlabs;
    let total=0;
    ranksData.old.forEach((item,index)=>{
      total=total+item.percent;
      if(index>0){
        if(ranksData.old[index].percent > ranksData.old[index-1].percent)
        {
          let rank=(item.pmin && item.pmax && item.pmin===item.pmax) ? item.pmin : item.pmin+"-"+item.pmax
          return toast("Invalid percent of Rank "+rank);
        }

      } 

    })

    if(total<100 || total>100){
        return toast("Invalid total percent "+total);
    }

    let data = {
      "limit": 10,
      "page": 1,
      "atype":"upsertrank",
      "ranks":ranksData.old,
      "rankid":selectedSlabs['_id']['$oid'],
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));


    
  }
  onChangeCall(e) {
   const { value } = e.target;
   let formData=this.state.formData;
   //let { privatecnst } = this.props;
   //let {items}=privatecnst; 
    formData["contestsize"]=value;//items[value]['contestsize'];
   // formData['id']=items['list'][value]['_id']['$oid'];
    this.setState({ formData: formData },()=>{
      //console.log(this.state.formData);
    });
   
  }

  getSlabsofContestSize(){
    let formData=this.state.formData;
    let selectedPage=this.state.selectedPage;
    let data = {
      "limit": 10,
      "page": selectedPage,
      "atype":"getbycnstsize",
      "contestsize":formData['contestsize'],
    }
    this.setState({isLoading: true});
    this.props.dispatch(privateContestActions.getAllPrivateContest(data));
  }

  render() {
    let formthis=this;
    let { privatecnst } = this.props;
    let itemsWin = privatecnst.items;
    let totalper=this.state.ranksData.total;
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
                  <Col xl="3">
                    <i className="fa fa-align-justify" />Private Contest
                    <small className="text-muted">List</small> 
                 </Col>
               { (!formthis.state.editIcon)?
                <Col xl="9">
                <AvForm className="row" onValidSubmit={this.getSlabsofContestSize}>
                <Col xl="3">
                Contest Size
                </Col>
                
                  <Col xl="2">
                     <AvField
                      type="number"
                      name="contestsize"
                      id="contestsize"
                      autoComplete="off"
                      onChange={(e)=>this.onChangeCall(e)}
                      value={this.state.formData.contestsize} 
                      max= {100}
                      validate={{
                        required: { value: true, errorMessage: "Contest Size value is required" },
                       
                      }}
                    />
               
              </Col>
              <Col xl="2">
                <Button color="primary" >
                  Submit
                </Button>
            </Col>
          { /* <Col xl="2">
             <Button color="primary" onClick={this.showEditIcon}>
                  Edit
                </Button>
            </Col>*/ }
          </AvForm>
          </Col>
          :''}
                </FormGroup>

              
              </CardHeader>
              <CardBody>
              <Row>
                 {
                (itemsWin && itemsWin.winnerslabs) ? 
                 (itemsWin.winnerslabs).map((item,index) => {
                  return(
                    <Col  xl="3" className="rankprivate_tablenos" key={index}>
                      <table>
                        <tr className="rankinner_privateboxes">
                          <table>
                            <thead> 
                              <tr className="privatethead_odsinner">
                                <th colSpan="3"> 
                                <label className="custom_bcheckad"> 
                                {(item && item.winner)?item.winner :"0"} Winners  
                                {
                                  (formthis.state.editIcon)?
                                  <span className="custom_slab_edit" onClick={()=>formthis.editranks(item)}> <i class="fa fa-edit" ></i></span>  
                                : 
                              
                                  <span>
                                  <input type="checkbox" value={(item._id.$oid) ? item._id.$oid :""} checked={(itemsWin.selectedSlabs)?((itemsWin.selectedSlabs.winnerslabs.includes(item.winner))?"checked":"" ):""}  onChange={()=>formthis.updateCheckBox(itemsWin.selectedSlabs,item.winner)}/> 
                                  <span className="checkmark"></span></span>

                              }
                              </label>
                                </th> 
                              </tr>
                            </thead>
                            <tbody>
                            {
                              (item.ranks && item.ranks.length>0) ?
                              (item.ranks).map((item2,index2) => {
                                return(
                                  <tr key={index2}>
                                    <td> Rank <strong>{(item2.pmin && item2.pmax && item2.pmin===item2.pmax) ? item2.pmin : item2.pmin+"-"+item2.pmax} </strong> </td>
                                    <td> {(item2.percent) ? item2.percent+"%" :""} </td>
                                    { /*<td> <i className="fa fa-inr"> </i> {item2.percent} </td>*/ }
                                  </tr>
                                )
                              
                              })
                              : ""
                            }
                            </tbody>
                          </table>
                        </tr>
                      </table>
                    </Col>
                  )
                 }) : ""
              }



                 

              
              </Row>
              </CardBody>
            </Card>
        </Col>
      </Row>



      <Modal
          isOpen={this.state.ranksSlabeModal}
          toggle={this.editranksToggle}
          className=""
        >
          <ModalHeader toggle={this.ranksSlabeModal}>
            Ranks Percent Update
          </ModalHeader>
          <AvForm onValidSubmit={this.editranksUpdate}>
          <ModalBody>
             <Row>
             {(this.state.selectedSlabs && this.state.selectedSlabs.ranks && this.state.selectedSlabs.ranks.length>0)
              ?
              this.state.selectedSlabs.ranks.map((item,index)=>{ totalper=totalper+item.percent
              return (
              <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Rank {(item.pmin && item.pmax && item.pmin===item.pmax) ? item.pmin : item.pmin+"-"+item.pmax}</Label>
                  <AvField
                    type="text"
                    name={'per-'+index}
                    id={'slab_'+index}
                    autoComplete="off"
                    onChange={(e)=>this.ranksValueUpdate(e)}
                    value={formthis.state.ranksData.new[index].percent} 
                    max= {100}
                    validate={{
                      required: { value: true, errorMessage: "Percent Value is required" },
                     
                    }}
                  />
                </FormGroup>
              </Col>
              )  
            })
            
            
              :''


        }

        { /* 

          <Col xs="3">
                <FormGroup>
                  <Label htmlFor="pid">Total</Label>
                  <AvField
                    type="text"
                    name="total"
                    id="total"
                    autoComplete="off"
                    value={formthis.state.ranksData.total} 
                    max= {100}
                    validate={{
                      required: { value: true, errorMessage: "Percent Value is required" },
                     
                    }}
                  />
                </FormGroup>
              </Col>
        <div>{totalper}</div>

        */ }
      </Row>
       </ModalBody>
       <ModalFooter>
            <Button color="primary" >
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.editranksToggle}>
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
  const { privatecnst } = state;
  return {
    privatecnst
  };
}
export default connect(mapStateToProps)(PrivateContest);
