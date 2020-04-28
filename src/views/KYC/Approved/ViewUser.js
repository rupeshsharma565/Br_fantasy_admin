import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table,Button ,Badge,FormGroup,Modal,ModalHeader,ModalBody,Label,ModalFooter,Input} from 'reactstrap';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import { cricketActions } from '../../../_actions';
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
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      combined: false,
      single: false,
      multiple: false,
      addPoolStatus:statusOption[0].value,
      shareholders: [{ name: "" }]
    };
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
      contestid:this.props.match.params.id
    }
    this.props.dispatch(cricketActions.getPoolList(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cricket.poolAdded) {
      this.setState({ addPoolModal: false });
     let data={
      contestid:this.props.match.params.id
      }
      this.props.dispatch(cricketActions.getPoolList(data));

    }
    if (nextProps.cricket.prizeAdded) {
      this.setState({ addPrizeModal: false });
    }
    if (nextProps.cricket.prizeList) {
      this.setState({ prizeList: nextProps.cricket.prizeList ,showPrizeModal: !this.state.showPrizeModal});
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
        this.props.dispatch(cricketActions.getPrize(data));
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
    
    this.props.dispatch(cricketActions.addPool(data));
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
   this.props.dispatch(cricketActions.addPrize(data));
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
  render() {

    const {cricket}=this.props;
    const {poolList}=cricket;
 
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                  <FormGroup row>
                    <Col xl="10"><strong><i className="icon-info pr-1"></i>ViewUser id: {this.props.match.params.id}</strong></Col>
                    <Col xl="2">
                      <Button  onClick={this.addPoolToggle}  className="mr-1"  color="success">
                        Add ViewUser
                      </Button>
                    </Col>
                  </FormGroup>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">FEE</th>
                      <th scope="col">TOTAL WINNING</th>
                      <th scope="col">MAX TEAM</th>
                      <th scope="col">WINNERS</th>
                      <th scope="col">PRIZE</th>
                      <th scope="col">SHOW PRIZE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      poolList ? poolList.map((pool, index) => (
                        <tr key={pool.id}>
                          <td>{pool.id}</td>
                          <td>{pool.joinfee}</td>
                          <td>{pool.totalwining}</td>
                          <td>{pool.maxteams}</td>
                          <td>{pool.winners}</td>
                          <td>
                            <Badge
                              className="mr-1" onClick={() => this.addPrizeToggle(pool)}  color="info"
                              style={{ cursor: 'pointer' }}>
                              Prize
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              className="mr-1" onClick={() => this.showPrizeToggle(pool)}  color="info"
                              style={{ cursor: 'pointer' }}>
                              Show Prize
                            </Badge>
                          </td>
                        </tr>
                      )):null
                    } 
                  </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.addPoolModal}
          toggle={this.addPoolToggle}
          className={this.props.className}
          >
          <ModalHeader toggle={this.addPoolToggle}>
            Add ViewUser
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pid">Joining Fee</Label>
                  <Input
                    type="text"
                    name="pooljoinfee"
                    id="pooljoinfee"
                    autoComplete="off"
                    onChange={this.handleChangeAddPool}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="fpname">Total Wining</Label>
                  <Input
                    type="text"
                    name="pooltotalwining"
                    id="pooltotalwining"
                    autoComplete="off"
                    onChange={this.handleChangeAddPool}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="fpname">winners</Label>
                  <Input
                    type="text"
                    name="poolwinners"
                    id="poolwinners"
                    autoComplete="off"
                    onChange={this.handleChangeAddPool}
                  />
                </FormGroup>
              </Col>
            </Row>
             <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="poolmaxteams">Max Teams</Label>
                  <Input
                    type="text"
                    name="poolmaxteams"
                    id="poolmaxteams"
                    autoComplete="off"
                    onChange={this.handleChangeAddPool}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="poolmaxteams">ViewUser Type</Label>
                  <Row>
                    <Col xs="4">
                    Combined
                    <Switch
                              name="combined"
                              id="combined"
                              className="float-right"
                              onChange={()=>this.handleChangeAddPool1("combined",!this.state.combined)}
                              checked={
                                this.state.combined
                              }
                              
                            />
                    </Col>
                    <Col xs="4">
                    Single<Switch
                              name="single"
                              id="single"
                              className="float-right"
                              onChange={()=>this.handleChangeAddPool1("single",!this.state.single)}
                              checked={
                                this.state.single
                              }
                             
                            />
                    </Col>
                    <Col xs="4">
                    Multiple<Switch
                              name="multiple"
                              id="multiple"
                              className="float-right"
                              onChange={()=>this.handleChangeAddPool1("multiple",!this.state.multiple)}
                              checked={
                                this.state.multiple
                              }
                            />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="poolmaxteams">Status</Label>
                   <Input
                    type="select"
                    name="playertype"
                    id="playertype"
                    onChange={this.handleOptionStatus}
                    value={this.state.addPoolStatus}>
                    {
                       statusOption.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                       })
                    }
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addPool()}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addPoolToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.addPrizeModal}
          toggle={this.addPrizeToggle}
          className={this.props.className}
          >
          <ModalHeader toggle={this.addPrizeToggle}>
            Add Prize
          </ModalHeader>
          <ModalBody>
              <FormGroup row>
                    <Col md="6">
                      <Label >Range</Label>
                    </Col>
                    <Col md="6">
                      <Label >Amount</Label>
                    </Col>
              </FormGroup>
               {
                 this.state.shareholders.map((shareholder, idx) => (
                      <FormGroup row key={idx}>
                            <Col md="3">
                              <Input type="text" name="pmin" value={shareholder.pmin}  placeholder="Min"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text" name="pmax" value={shareholder.pmax}  placeholder="Max"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="3">
                              <Input type="text"  name="pamount"  value={shareholder.pamount} placeholder="Amount"  autoComplete="off"  onChange={this.handleParameterKeyValueChange(idx)}/>
                            </Col>
                            <Col md="1">
                            <Button color="info" onClick={this.handleRemoveShareholder(idx)}>
                              Remove
                            </Button>
                            </Col>
                                
                      </FormGroup>
                  ))
              }
              <Button
               color="success" onClick={this.handleAddPrizeBreaker}>
                Add Prize
              </Button>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addPrize()}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.addPrizeToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.showPrizeModal}
          toggle={this.showPrizeToggle}
          className={this.props.className}
          >
          <ModalHeader toggle={this.showPrizeClose}>
            Add Prize
          </ModalHeader>
          <ModalBody>
              <FormGroup row>
                    <Col md="6">
                      <Label >Range</Label>
                    </Col>
                    <Col md="6">
                      <Label >Amount</Label>
                    </Col>
              </FormGroup>
               {
                 this.state.prizeList?this.state.prizeList.map((shareholder, idx) => (
                      <FormGroup row key={idx}>
                            <Col md="3">
                              <Input type="text" name="pmin" value={shareholder.pmin}  placeholder="Min"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)} disabled/>
                            </Col>
                            <Col md="3">
                              <Input type="text" name="pmax" value={shareholder.pmax}  placeholder="Max"   autoComplete="off" onChange={this.handleParameterKeyValueChange(idx)} disabled/>
                            </Col>
                            <Col md="3">
                              <Input type="text"  name="pamount"  value={shareholder.pamount} placeholder="Amount"  autoComplete="off"  onChange={this.handleParameterKeyValueChange(idx)} disabled/>
                            </Col>
                      </FormGroup>
                  )):null
              }
             
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.showPrizeClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { cricket} = state;
  
  return {
    cricket
  };
}
export default connect(mapStateToProps)(ViewUser);