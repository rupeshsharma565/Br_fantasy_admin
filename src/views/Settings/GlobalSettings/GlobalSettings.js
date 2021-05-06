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
} from 'reactstrap';
import { connect } from 'react-redux';
import { settingActions } from '../../../_actions';

class GlobalSettings extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.updateSetting = this.updateSetting.bind(this);

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
      maxteam:this.state.maxteam,
      totalpoints:this.state.totalpoints
    };
    console.log(data1);

    this.props.dispatch(settingActions.updateMainSetting(data1));
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getMainSetting());
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
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
  handleChangeAddSubAdmin(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);
    console.log('e.target.name  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value});
  }
  render() {
    let {setting}=this.props;
    let {mainsettings}=setting;

    return (
      <div className="animated fadeIn">
        {mainsettings?
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Main Setting
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
               <Row > 
                  <Col xl="3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary">
                            Total Points
                          </Button>
                        </InputGroupAddon>
                        <Input  type="text"  id={'totalpoints'}  name={'totalpoints'}  value={this.state.totalpoints}  placeholder="" onChange={this.handleChangeAddSubAdmin} />
                      </InputGroup>
                    </Col>
                    <Col xl="3">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" color="primary">
                            Max Team
                          </Button>
                        </InputGroupAddon>
                        <Input  type="text"  id={'maxteam'}  name={'maxteam'}  value={this.state.maxteam}  placeholder="" onChange={this.handleChangeAddSubAdmin} />
                      </InputGroup>
                    </Col>
                   <Col xl="1">
                      <Button
                        color="primary"
                        onClick={() =>
                          this.updateSetting("matchdetails")
                        }
                      >
                        Update
                      </Button>
                    </Col>
               </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>:null}
      </div>
    );
  }
}
// export default GlobalSettings;
function mapStateToProps(state) {
  // console.log("state   ", state);
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(GlobalSettings);
