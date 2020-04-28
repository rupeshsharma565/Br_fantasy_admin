import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Button,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import { settingActions } from '../../../_actions';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    }
    this.updateSetting = this.updateSetting.bind(this);
    this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getstaticpage({slug:'support'}));
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.staticpageDetails) {
      this.setState({
        title: setting.staticpageDetails.title,
        content: setting.staticpageDetails.content,
      });
    }
    if (setting.isStaticUpdate) {
     this.props.dispatch(settingActions.getstaticpage({slug:'support'}));
    }
  }
  updateSetting(data) {
    
    let data1 = {
      title: this.state.title,
      slug: 'support',
      content: this.state.content,
    };
    console.log(data1);
    this.props.dispatch(settingActions.updatestaticpage(data1));
  }
  handleChangeUpdate(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);
    console.log('e.target.name  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value});
  }
  render() {
    let {setting}=this.props;
    let {staticpageDetails}=setting;

    return (
      <div className="animated fadeIn">
       {staticpageDetails  ? <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Support
                <div className="card-header-actions" />
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="Title">Title</Label>
                      <Input type="text" id="title" name="title" placeholder="Enter title" value={this.state.title}  onChange={this.handleChangeUpdate}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input type="textarea" id="content"  name="content" placeholder="Enter description" rows="4"  value={this.state.content}  onChange={this.handleChangeUpdate}  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                   <Button type="button" color="primary" onClick={()=>this.updateSetting()}>
                            Update
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row> :null
        
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { setting, authentication } = state;
  const { user } = authentication;
  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(Support);
