import React, { Component } from 'react';

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
  
} from 'reactstrap';
import { connect } from 'react-redux';
import { settingActions } from '../../../_actions';

class CricketSetting extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateSettingMain = this.updateSettingMain.bind(this);
    this.handleChangeMainSetting = this.handleChangeMainSetting.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.handleChangeUpdateCaptain = this.handleChangeUpdateCaptain.bind(this);
    this.updateCaptainSetting = this.updateCaptainSetting.bind(this);
    this.state = {
      collapse: false,
      accordion: true,
      items: []
    };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggleAccordion(tab) {
    const state = !this.state.accordion;
    this.setState({
      accordion: state
    });
  }
  updateSetting(data) {
    console.log(data);
    let data1 = {
      catch: data.catch,
      four: data.four,
      run: data.run,
      six: data.six,
      gtype: data.type,
      gametype: 'cricket',
      mtype: data.type,
      fifty: data.fifty,
      hundred: data.hundred,
      mdnover: data.mdnover,
      duck: data.duck,
      cap: data.cap,
      vcap: data.vcap,
      wicket: data.wicket,
      wicketlbl: data.wicketlbl,
      catchlbl: data.catchlbl,
      runlbl: data.runlbl,
      sixlbl: data.sixlbl,
      fourlbl: data.fourlbl,
      fiftylbl: data.fiftylbl,
      hundredlbl: data.hundredlbl,
      ducklbl: data.ducklbl,
      mdnoverlbl: data.mdnoverlbl,
      stumped: data.stumped,
      stumpedlbl: data.stumpedlbl,
      playing: data.playing,
      playinglbl: data.playinglbl,
      fourwhb: data.fourwhb,
      fourwhblbl: data.fourwhblbl,
      fivewhb: data.fivewhb,
      fivewhblbl: data.fivewhblbl,
      runout: data.runout,
      runoutlbl: data.runoutlbl,
      thrower:data.thrower,
      catcher:data.catcher,
      srone:data.srone,
      srtwo:data.srtwo,
      srthree:data.srthree,
      erone:data.erone,
      ertwo:data.ertwo,
      erthree:data.erthree,
      erfour:data.erfour,
      erfive:data.erfive,
      ersix:data.ersix,
      srmball:data.srmball,
      ermover:data.ermover
    };
    console.log(data1);

    this.props.dispatch(settingActions.addGlobalPoints(data1));
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getGlobalPoints({gametype:'cricket'}));
    //this.props.dispatch(settingActions.getCatptainsSetting({gametype:'cricket'}));
    this.props.dispatch(settingActions.getMainSetting());
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.cricket) {
      let items = Object.keys(setting.cricket).reduce((array, key) => {
        return [...array, { ...setting.cricket[key], type: key }];
      }, []);
      console.log('items  ', items);
      this.setState({
        items: items
      });
    }
    if (setting.captainsettings) {
      this.setState({
        cap:   setting.captainsettings.cap,
        vcap:  setting.captainsettings.vcap
      });
    }
    // if (setting.settingUpdated) {
    //   this.props.dispatch(settingActions.getCatptainsSetting({gametype:'cricket'}));
    // }

     if (setting.settingUpdated1) {
      this.props.dispatch(settingActions.getGlobalPoints({gametype:'cricket'}));
    }
    if (setting.mainsettings) {
      this.setState({
        totalpoints: setting.mainsettings.totalpoints,
        maxteam: setting.mainsettings.maxteam,
      });
    }
    if (setting.settindUpdated) {
      this.props.dispatch(settingActions.getMainSetting());
    }
  }
  handleChangeUpdateCaptain(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);
    console.log('e.target.name  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value});
  }

  handleChangeAddSubAdmin(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);

    var index = this.state.items.findIndex(x => x.type === e.target.id);
    let items = [...this.state.items];
    let item = { ...items[index] };
    item[e.target.name] = e.target.value;
    items[index] = item;
    this.setState({ items: items });
  }
  updateCaptainSetting(data) {
    console.log(data);
    let data1 = {
      gametype:"cricket",
      cap: this.state.cap,
      vcap: this.state.vcap,
    };
    console.log(data1);

    this.props.dispatch(settingActions.updateCatptainsSetting(data1));
  }
  handleChangeMainSetting(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);
    console.log('e.target.name  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value});
  }
  updateSettingMain(data) {
    console.log(data);
    let data1 = {
      maxteam:this.state.maxteam,
      totalpoints:this.state.totalpoints
    };
    console.log(data1);
    this.props.dispatch(settingActions.updateMainSetting(data1));
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Cricket Setting
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
                <div id="accordion">
                  <Card>
                    <CardHeader id="headingOne">
                      <Button
                        block
                        color="link"
                        className="text-left m-0 p-0"
                        onClick={() => this.toggleAccordion(0)}
                        aria-expanded={this.state.accordion}
                        aria-controls="collapseOne"
                      >
                        <h5 className="m-0 p-0">Cricket Match Settings</h5>
                      </Button>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll">

                      <table className="table wicket_divtd">
                      <tr className="custom_row" >
                             
                                <td>wicket</td>
                                <td>catch</td>
                                <td>run</td>
                                <td>four</td>
                                <td>six</td>
                                <td>duck</td>
                                <td>hundred</td>
                                <td>fifty</td>
                                <td>mdnover</td>
                                <td>cap</td>
                                <td>vcap</td>
                                <td>stumped</td>
                                <td>playing</td>
                                <td>runout</td>
                                 <td>fourwhb</td>
                                <td>fivewhb</td>
                                
                                <td>thrower</td>
                                <td>catcher</td>
                                <td>60-70 r/100 b</td>
                                <td>50-59.9 r/100 b</td>
                                <td>Below 50 r/100 b</td>
                                <td>Below 4 r/ov</td>
                                <td>4-4.99 r/ov</td>
                                <td>5-6 r/ov</td>
                                <td>9-10 r/ov</td>
                                <td>10.1-11 r/ov</td>
                                <td>Above 11 r/ov</td>
                                <td>Sr min balls</td>
                                <td>Er min ov</td>

                                
                                <hr
                                  style={{
                                      color: 'inherit',
                                      backgroundColor: 'inherit',
                                      height: '1px',
                                      width: '100%',
                                  }}
                              />
                              
                              </tr>
                       {/* <div style={{width:'100%', height:'100%', overflow: 'auto'}} > */}
                        {this.state.items
                          ? this.state.items.map((matchdetails, index) => (
                              <tr key={index} className="custom_row">
                             
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'wicket'}
                                        value={this.state.items[index].wicket}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                    
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'catch'}
                                        value={matchdetails.catch}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                   
                                    
                                </td>
                                <td >
                                   
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'run'}
                                        value={matchdetails.run}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                   
                                    
                                </td>
                                <td >
                                 
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'four'}
                                        value={matchdetails.four}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                 
                                </td>
                                <td >
                                  
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'six'}
                                        value={matchdetails.six}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                 
                                  <br />
                                </td>
                                <td >
                                  
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'duck'}
                                          value={matchdetails.duck}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                    
                                    
                                </td>

                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'hundred'}
                                          value={matchdetails.hundred}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                    
                                </td>

                                 <td >
                                   
                                         <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'fifty'}
                                          value={matchdetails.fifty}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                   
                                   
                                </td>
                                  <td >
                                    
                                         <Input
                                            type="text"
                                            id={matchdetails.type}
                                            name={'mdnover'}
                                            value={matchdetails.mdnover}
                                            placeholder=""
                                            onChange={this.handleChangeAddSubAdmin}
                                          />
                                  
                                    
                                </td>

                                 <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'cap'}
                                          value={matchdetails.cap}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                   
                                    <br />

                                    
                                </td>
                                  <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'vcap'}
                                          value={matchdetails.vcap}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                    
                                    
                                </td>

                                <td >
                                    
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'stumped'}
                                          value={matchdetails.stumped}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                    
                                </td>
                               
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'playing'}
                                          value={matchdetails.playing}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                    
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'runout'}
                                          value={matchdetails.runout}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                    
                                </td>
                                <td >
                                    
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'fourwhb'}
                                          value={matchdetails.fourwhb}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'fivewhb'}
                                          value={matchdetails.fivewhb}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>





                                
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'thrower'}
                                          value={matchdetails.thrower}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'catcher'}
                                          value={matchdetails.catcher}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td  >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'srone'}
                                          value={matchdetails.srone}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'srtwo'}
                                          value={matchdetails.srtwo}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'srthree'}
                                          value={matchdetails.srthree}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'erone'}
                                          value={matchdetails.erone}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'ertwo'}
                                          value={matchdetails.ertwo}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'erthree'}
                                          value={matchdetails.erthree}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'erfour'}
                                          value={matchdetails.erfour}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'erfive'}
                                          value={matchdetails.erfive}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'ersix'}
                                          value={matchdetails.ersix}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'srmball'}
                                          value={matchdetails.srmball}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'ermover'}
                                          value={matchdetails.ermover}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                </td>
                                
                                <td > 
                                  <Button
                                    tdor="success"
                                    className="btn-success"
                                    onClick={() =>
                                      this.updateSetting(matchdetails)
                                    }
                                  >
                                    {matchdetails.type}
                                  </Button>
                                  
                                </td>
                                <hr
                                  style={{
                                      color: 'inherit',
                                      backgroundColor: 'inherit',
                                      height: '1px',
                                      width: '100%',
                                  }}
                              />
                              
                              </tr>
                               
                            ))
                          : null}
                        {/* </div> */}
                        </table>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <div id="accordion11" className="hidden">
                <Card>
                  <CardHeader id="headingOne11">
                    <Button
                      block
                      color="link"
                      className="text-left m-0 p-0"
                      
                      aria-expanded={true}
                      aria-controls="collapseOne"
                    >
                      <h5 className="m-0 p-0"> Global Setting</h5>
                    </Button>
                  </CardHeader>
                  <Collapse
                    isOpen={true}
                    data-parent="#accordion"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                  >
                    <CardBody>
                      
                          <Row > 
                          <Col xl="3">
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <Button type="button" color="primary">
                                    Total Credits
                                  </Button>
                                </InputGroupAddon>
                                <Input  type="text"  id={'totalpoints'}  name={'totalpoints'}  value={this.state.totalpoints}  placeholder="" onChange={this.handleChangeMainSetting} />
                              </InputGroup>
                            </Col>
                            <Col xl="3">
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <Button type="button" color="primary">
                                    Max Team
                                  </Button>
                                </InputGroupAddon>
                                <Input  type="text"  id={'maxteam'}  name={'maxteam'}  value={this.state.maxteam}  placeholder="" onChange={this.handleChangeMainSetting} />
                              </InputGroup>
                            </Col>
                          <Col xl="1">
                              <Button
                                color="primary"
                                onClick={() =>
                                  this.updateSettingMain("matchdetails")
                                }
                              >
                                Update
                              </Button>
                            </Col>
                      </Row>
                    </CardBody>
                  </Collapse>
                </Card>
              </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
// export default CricketSetting;
function mapStateToProps(state) {
  // console.log("state   ", state);
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(CricketSetting);
