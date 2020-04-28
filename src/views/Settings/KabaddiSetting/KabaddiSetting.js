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
  Table
  
} from 'reactstrap';
import { connect } from 'react-redux';
import { settingActions } from '../../../_actions';

class KabaddiSetting extends Component {
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
      gtype: data.type,
      gametype: 'kabaddi',
      mtype: data.type,
      playing:data.playing,
      makesubstitute:data.makesubstitute,
      touch:data.touch,
      raidbonus:data.raidbonus,
      successtackle:data.successtackle,
      unsuccessraid:data.unsuccessraid,
      supertackle:data.supertackle,
      pushallout:data.pushallout,
      getallout:data.getallout,
      greencard:data.greencard,
      yellowcard:data.yellowcard,
      redcard:data.redcard
    };
    console.log(data1);

    this.props.dispatch(settingActions.addGlobalPoints(data1));
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getGlobalPoints({gametype:'kabaddi'}));
    //this.props.dispatch(settingActions.getCatptainsSetting({gametype:'kabaddi'}));
    this.props.dispatch(settingActions.getMainSetting());
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.kabaddi) {
      let items = Object.keys(setting.kabaddi).reduce((array, key) => {
        return [...array, { ...setting.kabaddi[key], type: key }];
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
    //   this.props.dispatch(settingActions.getCatptainsSetting({gametype:'kabaddi'}));
    // }

     if (setting.settingUpdated1) {
      this.props.dispatch(settingActions.getGlobalPoints({gametype:'kabaddi'}));
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
      gametype:"kabaddi",
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
                <i className="fa fa-align-justify" /> Kabaddi Setting
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
                        <h5 className="m-0 p-0">Kabaddi Match Settings</h5>
                      </Button>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.accordion}
                      data-parent="#accordion"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                    >
                      <CardBody className="card-body-scroll">

                      <Table className="table wicket_divtd">
                      <thead>
                      <tr className="custom_row" >
                             
                                <th>Playing</th>
                                <th>Make Substitute</th>
                                <th>Touch</th>
                                <th>Raid Bonus</th>
                                <th>Success Tackle</th>
                                <th>Unsuccess Raid</th>
                                <th>Super Tackle</th>
                                <th>Push all out</th>
                                <th>Get all out</th>
                                <th>Green Card</th>
                                <th>Yellow Card</th>
                                <th>Red Card</th>
                                <th></th>
                              </tr>
                              </thead>
                  <tbody>
                       {/* <div style={{width:'100%', height:'100%', overflow: 'auto'}} > */}
                        {this.state.items
                          ? this.state.items.map((matchdetails, index) => (
                              <tr key={index} className="custom_row">
                             
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'playing'}
                                        value={this.state.items[index].playing}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                    
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'makesubstitute'}
                                        value={matchdetails.makesubstitute}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                   
                                    
                                </td>
                                <td >
                                   
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'touch'}
                                        value={matchdetails.touch}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                   
                                    
                                </td>
                                <td >
                                 
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'raidbonus'}
                                        value={matchdetails.raidbonus}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                 
                                </td>
                                <td >
                                  
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'successtackle'}
                                        value={matchdetails.successtackle}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      />
                                 
                                  <br />
                                </td>
                                <td >
                                  
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'unsuccessraid'}
                                          value={matchdetails.unsuccessraid}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                    
                                    
                                </td>

                                <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'supertackle'}
                                          value={matchdetails.supertackle}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                  
                                    
                                </td>

                                 <td >
                                   
                                         <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'pushallout'}
                                          value={matchdetails.pushallout}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                   
                                   
                                </td>
                                  <td >
                                    
                                         <Input
                                            type="text"
                                            id={matchdetails.type}
                                            name={'getallout'}
                                            value={matchdetails.getallout}
                                            placeholder=""
                                            onChange={this.handleChangeAddSubAdmin}
                                          />
                                  
                                    
                                </td>

                                 <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'greencard'}
                                          value={matchdetails.greencard}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                   
                                    <br />

                                    
                                </td>
                                  <td >
                                   
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'yellowcard'}
                                          value={matchdetails.yellowcard}
                                          placeholder=""
                                          onChange={this.handleChangeAddSubAdmin}
                                        />
                                    
                                    
                                </td>

                                <td >
                                    
                                        <Input
                                          type="text"
                                          id={matchdetails.type}
                                          name={'redcard'}
                                          value={matchdetails.redcard}
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
                              ></hr>
                              
                              </tr>
                               
                            ))
                          : null}
                        {/* </div> */}
                        </tbody>
                        </Table>
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
// export default KabaddiSetting;
function mapStateToProps(state) {
  // console.log("state   ", state);
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(KabaddiSetting);
