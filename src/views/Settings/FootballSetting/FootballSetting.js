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

class FootballSetting extends Component {
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
    let data1 = {
      gtype: data.type,
      gametype: 'football',
      mtype: data.type,
      playfiftyfivemin: data.playfiftyfivemin,
      playlessfiftyfive: data.playlessfiftyfive,
      goalfor: data.goalfor,
      goalmid: data.goalmid,
      goalgk: data.goalgk,
      goaldef: data.goaldef,
      assist: data.assist,
      passes: data.passes,
      shotontarget: data.shotontarget,
      cleansheetmid: data.cleansheetmid,
      cleansheetgk: data.cleansheetgk,
      cleansheetdef: data.cleansheetdef,
      goalsaved: data.goalsaved,
      penaltysavegk: data.penaltysavegk,
      tackles: data.tackles,
      yellowcard: data.yellowcard,
      redcard: data.redcard,
      owngoal: data.owngoal,
      goalsconcededgk: data.goalsconcededgk,
      goalsconcededdef: data.goalsconcededdef,
      penaltymissed: data.penaltymissed
 
    };
    this.props.dispatch(settingActions.addGlobalPoints(data1));
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getGlobalPoints({gametype:'football'}));
    //this.props.dispatch(settingActions.getCatptainsSetting({gametype:'football'}));
    this.props.dispatch(settingActions.getMainSetting());
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.football) {
      let items = Object.keys(setting.football).reduce((array, key) => {
        return [...array, { ...setting.football[key], type: key }];
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
    //   this.props.dispatch(settingActions.getCatptainsSetting({gametype:'football'}));
    // }

     if (setting.settingUpdated1) {
      this.props.dispatch(settingActions.getGlobalPoints({gametype:'football'}));
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
      gametype:"football",
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
    console.log("this.state.items--->>",this.state.items)
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Football Setting
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
                        <h5 className="m-0 p-0">Football Match Settings</h5>
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

                        <th>Played 55 minutes or more</th>
                        <th>Played less than 55 minutes</th>
                        <th>For every goal scored (Forward)</th>
                        <th>For every goal scored (Midfielder)</th>
                        <th>For every goal scored (GK)</th>
                        <th>For every goal scored (Defender)</th>
                        <th>For every assist</th>
                        <th>For every 10 passes completed</th>
                        <th>For every 2 shots on target</th>
                        <th>Clean sheet (Midfielder)</th>
                        <th>Clean sheet (GK)</th>
                        <th>Clean sheet (Defender)</th>
                        <th>For every 3 shots saved(GK)</th>
                        <th>For every penalty saved (GK)</th>
                        <th>For every 3 successful tackles made</th>
                        <th>Yellow card</th>
                        <th>Red card</th>
                        <th>For every own goal</th>
                        <th>For every 2 goals conceded (GK)</th>
                        <th>For every 2 goals conceded (Defender)</th>
                        <th>For every penalty missed</th>
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
                                        name={'playfiftyfivemin'}
                                        value={this.state.items[index].playfiftyfivemin}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'playlessfiftyfive'}
                                        value={this.state.items[index].playlessfiftyfive}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goaldef'}
                                        value={this.state.items[index].goalfor}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goalmid'}
                                        value={this.state.items[index].goalmid}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goalgk'}
                                        value={this.state.items[index].goalgk}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goaldef'}
                                        value={this.state.items[index].goaldef}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'assist'}
                                        value={this.state.items[index].assist}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'passes'}
                                        value={this.state.items[index].passes}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'shotontarget'}
                                        value={this.state.items[index].shotontarget}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'cleansheetmid'}
                                        value={this.state.items[index].cleansheetmid}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'cleansheetgk'}
                                        value={this.state.items[index].cleansheetgk}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'cleansheetdef'}
                                        value={this.state.items[index].cleansheetdef}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goalsaved'}
                                        value={this.state.items[index].goalsaved}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'penaltysavegk'}
                                        value={this.state.items[index].penaltysavegk}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'tackles'}
                                        value={this.state.items[index].tackles}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'yellowcard'}
                                        value={this.state.items[index].yellowcard}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                
                              <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'redcard'}
                                        value={this.state.items[index].redcard}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>

                                 <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'owngoal'}
                                        value={this.state.items[index].owngoal}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>

                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goalsconcededgk'}
                                        value={this.state.items[index].goalsconcededgk}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>

                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'goalsconcededdef'}
                                        value={this.state.items[index].goalsconcededdef}
                                        placeholder=""
                                        onChange={this.handleChangeAddSubAdmin}
                                      /> 
                                </td>
                                
                                <td >
                                      <Input
                                        type="text"
                                        id={matchdetails.type}
                                        name={'penaltymissed'}
                                        value={this.state.items[index].penaltymissed}
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
// export default FootballSetting;
function mapStateToProps(state) {
  // console.log("state   ", state);
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(FootballSetting);
