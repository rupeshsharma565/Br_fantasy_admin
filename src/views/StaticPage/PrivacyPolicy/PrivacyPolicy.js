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
import { EditorState, convertToRaw,ContentState } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class PrivacyPolicy extends Component {
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
    this.props.dispatch(settingActions.getstaticpage({slug:'pandp'}));
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.staticpageDetails) {

      const html = setting.staticpageDetails.content;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        // this.state = {
        //   editorState
        // };
        this.setState({editorState:editorState})
      }

      this.setState({
        title: setting.staticpageDetails.title,
        content: setting.staticpageDetails.content,
      });
    }
    if (setting.isStaticUpdate) {
     this.props.dispatch(settingActions.getstaticpage({slug:'pandp'}));
    }
  }
  updateSetting(data) {
    
    let data1 = {
      title: this.state.title,
      slug: 'pandp',
      content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
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

  onEditorStateChange = (editorState) => {
    this.setState({
       editorState,
     });
   };

  render() {
    let {setting}=this.props;
    let {staticpageDetails}=setting;

    return (
      <div className="animated fadeIn">
       {staticpageDetails  ? <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Privacy Policy
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
                {/* <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Input type="textarea" id="content"  name="content" placeholder="Enter description" rows="4"  value={this.state.content}  onChange={this.handleChangeUpdate}  />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="description">Description</Label>
                      <Editor
                        currentState={this.state.editorState}
                        editorState={this.state.editorState}
                        wrapperClassName="home-wrapper"
                        editorClassName="home-editor"
                        toolbar={{
                          fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Roboto', 'Times New Roman', 'Verdana'],
                          }
                        }}
                        onEditorStateChange={this.onEditorStateChange}
                        placeholder=""
                        hashtag={{}}
                      />
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
export default connect(mapStateToProps)(PrivacyPolicy);
