import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  Row,
  Modal,
  Label,
  Input,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';
import axios from 'axios';
import { authHeader } from '../../../_helpers';
import ImageUploader from 'react-images-upload';

import { CONST } from '../../../_config';
import { connect } from 'react-redux';
import { settingActions } from '../../../_actions';
import swal from 'sweetalert';

const statusOption = [{ value: 1, name: "Active" },{ value: 0, name: "Deactive" }];

class Slider extends Component {
  constructor(props) {
    super(props);
    this.onDrop1 = this.onDrop1.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.showImageToggle = this.showImageToggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addImageToggle = this.addImageToggle.bind(this);
    this.addSlider = this.addSlider.bind(this);
    this.handleOptionStatus = this.handleOptionStatus.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
    this.deleteSlider=this.deleteSlider.bind(this);
    this.state = {
      collapse: false,
      accordion: true,
      addImageModal:false,
      sliderImage:'',
      sliderImageURL:'',
      addSliderStatus:statusOption[0].value,
      items: []
    };
  }
  toggleAccordion(tab) {
    const state = !this.state.accordion;
    this.setState({
      accordion: state
    });
  }
  addSlider() {

    let data1 = {
      img:this.state.sliderImage,
      status:this.state.addSliderStatus ,
      gameid:1,
      atype:'add',
      title:this.state.title
    };
    console.log(data1);

    this.props.dispatch(settingActions.addSlider(data1));
  }
  updateSlider(data,status) {
    let data1 = {
      id:data.id,
      img:data.img,
      title:data.title,
      status:status,
      gameid:1,
      atype:'edit',
    };
    console.log(data1);
    this.props.dispatch(settingActions.udpateSlider(data1));
  }
  componentDidMount() {
    this.props.dispatch(settingActions.getSliderList());
  }
  componentWillReceiveProps(newProps) {
    const { setting } = newProps;
    if (setting.mainsettings) {
      this.setState({
        totalpoints: setting.mainsettings.totalpoints,
        maxteam: setting.mainsettings.maxteam,
      });
    }
    if (setting.isSliderAdded) {
       this.setState({
          addImageModal: false,
      });
      this.props.dispatch(settingActions.getSliderList());
    }
    if (setting.isSliderUpdated) {
      this.props.dispatch(settingActions.getSliderList());
    }
  }
  handleChangeAddSubAdmin(e) {
    console.log('e.target.id  ', e.target.id);
    console.log('e.target.name  ', e.target.name);
    console.log('e.target.name  ', e.target.value);
    this.setState({ [e.target.name]: e.target.value});
  }
  showImageToggle(image) {
    if (image) {
       this.setState({
          showImageModal: !this.state.showImageModal,
          imageURL:image
        });
    } else {
       this.setState({
          showImageModal: !this.state.showImageModal,
          imageURL:''
        });
    }
  }
  addImageToggle() {
   this.setState({
          addImageModal: !this.state.addImageModal,
    });
    
  }
  onDrop1(picture) {
    const formData = new FormData();
    formData.append('imgtype', 'slider');
    formData.append('images[]', picture[picture.length - 1]);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/uploadmultipleimg`, formData, config)
      .then(response => {
        //alert("The file is successfully uploaded");
        console.log('response  data ', response.data);
        if (response.data.code === 0) {
          this.setState({ 
                sliderImage: response.data.data[0] ,
                sliderImageURL: CONST.BACKEND_URL +"/uploads/slider/"+response.data.data[0] ,
          });
          console.log('response.',response.data.data);
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
  }
  handleInputChange(e) {
    const { name, value } = e.target;
    console.log('name  ', name);
    console.log('value  ', value);
    this.setState({ [name]: value });
  }
  handleOptionStatus(e) {
    const { name, value } = e.target;
    console.log(name +"  "+value);
    this.setState({addSliderStatus: value });
  }


  deleteSlider(sliderid){
    var formthis = this;
    swal({
         html:true,
         title: "Are you sure?",
         text: "You want to delete",
         icon: "warning",
         buttons: [
           'No, cancel it!',
           'Yes, Delete!'
         ],
         dangerMode: true,
       }).then(function (isConfirm) {
         if (isConfirm) {
           /////////////
           var args1 = {
             id : sliderid
           };
           var object = {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
               'Authorization': authHeader().Authorization
             },
             body: JSON.stringify(args1)
           }

           var apiUrl = CONST.BACKEND_URL + "/api/deleteslider";
           fetch(apiUrl, object)
             .then(function (response) {
                 response.json().then(json => {
                   if (json.error === false) {
                     swal({
                       title: "Deleted",
                       text: "Slider Image deleted successfully",
                       icon: "success",
                     });
                     formthis.props.dispatch(settingActions.getSliderList());
                   }
                   else {
                     swal({
                       title: "Wrong!",
                       text: "Something went wrong",
                       icon: "warning",
                     });  
                   }
                 })
               
             }).catch(error => {
               swal({
                 title: "Error!",
                 text: "Something went wrong",
                 icon: "error",
               });  
             });
           ////////////////

         }
       })
}

  render() {
    let {setting}=this.props;
    let {sliderList}=setting;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xl="2">
                    <i className="fa fa-align-justify" /> Slider
                    <div className="card-header-actions" />
                  </Col>
                  <Col xl="8" />
                  <Col xl="2">
                    <Button
                      onClick={this.addImageToggle}
                      className="mr-1"
                      color="success"
                    >
                      Add Slider
                    </Button>
                  </Col>
                  </Row>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">TITLE</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">ACTION</th>
                      <th scope="col">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliderList
                      ? sliderList.map((subadmin, index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{subadmin.title}</td>
                            <td><img
                            src={subadmin.imgurl}
                            width="100"
                            height="100"
                            className="img-avatar"
                            style={{cursor:'pointer'}}
                            onClick={() =>
                                  this.showImageToggle(subadmin.imgurl)
                            }
                            alt=""
                          /></td>
                            <td>
                              {subadmin.status === "0"  ?<span><Button className="btn-sm btn-square btn-success" onClick={()=>this.updateSlider(subadmin,1)}>Active&nbsp;&nbsp;&nbsp;</Button> &nbsp;</span>:null} 
                              {subadmin.status === "1"  ?<span><Button className="btn-sm btn-square btn-danger"  onClick={()=>this.updateSlider(subadmin,0)}>Inactive</Button>&nbsp;</span>:null}
                            </td>
                            <td><i className="cui-trash h5" onClick={()=>this.deleteSlider(subadmin.id)}></i></td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.showImageModal} toggle={this.showImageToggle} className={this.props.className}>
            <ModalHeader toggle={this.showImageToggle}>
                Image
            </ModalHeader>
            <ModalBody>
                {this.state.imageURL?<img src={this.state.imageURL} width="400" height="400"  alt=""/>:"Image not found."}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.showImageToggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.addImageModal} toggle={this.addImageToggle} className={this.props.className}>
            <ModalHeader toggle={this.addImageModal}>
                Image
            </ModalHeader>
            <ModalBody>
              <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="pname">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        onChange={this.handleInputChange}
                        value={this.state.title}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <ImageUploader
                      withIcon={false}
                      buttonText="Upload Slider Image"
                      withLabel={false}
                      withPreview={false}
                      onChange={this.onDrop1}
                      maxFileSize={5242880}
                    />
                      {this.state.sliderImageURL?
                        <img
                        src={this.state.sliderImageURL}
                        width="50"
                        height="50"
                        className="img-avatar"
                        alt=""
                        />
                        :null}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="pname">Status</Label>
                      <Input type="select" name="status" id="status" onChange={this.handleOptionStatus} value={this.state.addSliderStatus}> 
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
              <Button color="primary" onClick={()=> this.addSlider()}> Submit
              </Button>{' '}
              <Button color="secondary" onClick={this.addImageToggle}>
                  Cancel
              </Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}
// export default Slider;
function mapStateToProps(state) {
  // console.log("state   ", state);
  const { setting, authentication } = state;
  const { user } = authentication;

  return {
    user,
    setting
  };
}
export default connect(mapStateToProps)(Slider);
