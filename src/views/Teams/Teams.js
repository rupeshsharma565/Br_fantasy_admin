import React, { Component } from 'react';
import axios from 'axios';
import { authHeader } from '../../_helpers';
import { CONST } from '../../_config';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import swal from 'sweetalert';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import PaginationComponent from 'react-reactstrap-pagination';
import ImageUploader from 'react-images-upload';

//import Select from 'react-select';

import { connect } from 'react-redux';
import { teamActions } from '../../_actions';

class Teams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectedOption: null,
      query: '',
      people: [],
      file: null,
      imagePath: [],
      isLoading: false,
      fpname:'',
      pname:'',
      playertype:0,
      atype:'international',
      selectedPage1:0,
      AUTitle:"Add",
      sspid:"0",
      hiddenmode:true,
      disablemode:true,
      readonlymode:true
    };
    this.handleChangeModalSelectAtype = this.handleChangeModalSelectAtype.bind(this);
    this.resetPlayer = this.resetPlayer.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.handleChangeModalAddPlayer = this.handleChangeModalAddPlayer.bind(this);
    this.handleChangeModalSelectRole = this.handleChangeModalSelectRole.bind(this);
    this.handleChangeModalSelectRole = this.handleChangeModalSelectRole.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDrop1 = this.onDrop1.bind(this);
    this.editPlayerToggle= this.editPlayerToggle.bind(this);
    this.deletePlayer=this.deletePlayer.bind(this);

  }

  componentDidMount() {
      let data = {
      limit: 10,
      page: 1,
      search: ''
    };
    this.props.dispatch(teamActions.getPlayerList(data));
    this.props.dispatch(teamActions.getCountryList());
    this.props.dispatch(teamActions.getRoleList());
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.search('');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.team.roleList) {
      this.setState({ playertype: nextProps.team.roleList[0].id });
    }
    if (nextProps.team.countryList) {
      console.log(nextProps.team.countryList[0].name);
      
      this.setState({ pcountry: nextProps.team.countryList[0].name });
    }
    if (nextProps.team.playerAdded) {
      this.setState({ 
                modal: false,
                playerImage: '' ,
                playerImageURL: '' ,
      });
      let data = {
        limit: 10,
        page: this.state.selectedPage1,
        search: ''
      };
      this.resetPlayer();
      this.props.dispatch(teamActions.getPlayerList(data));
    }
  }
  handleChange = selectedOption => {
    console.log('selectedOption  ', selectedOption);
    //this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeModalAddPlayer(e) {
    const { name, value } = e.target;
    console.log('name  ', name);
    console.log('value  ', value);
    this.setState({ [name]: value });
  }
  handleChangeModalSelectRole(e) {
    const { name, value } = e.target;
    console.log('name  ', name);
    console.log('value  ', value);
    this.setState({playertype: value });
  }
  handleChangeModalSelectAtype(e) {
    const {  value } = e.target;
     //console.log('name  ', name);
     console.log('value  ', value);
     let hiddenmode=false;
     let disablemode=false;
     let readonlymode=true;
    if(value==="domestic")
    {
      hiddenmode=true;
      disablemode=false;
      readonlymode=false;
    }
    
    this.setState({atype: value,
      hiddenmode:hiddenmode,
      disablemode:disablemode,
      readonlymode:readonlymode
      });
  }
  handleChangeModalSelectCountry(e) {
    const { name, value } = e.target;
    console.log('name  ', name);
    console.log('value  ', value);
    this.setState({ [name]: value });
  }
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  onChange1 = value => {
    console.log("value---->>>",value)
    if (value[0] && value[0].pid) {
      this.setState({
        pid: value[0].pid,
        fpname: value[0].fullName,
        pname: value[0].name
      });
     //Hit API for get player details
    fetch(`https://cricapi.com/api/playerStats?apikey=`+CONST.MATCHSCORETOKEN+`&pid=${value[0].pid}`)
    .then(resp => resp.json())
    .then(json => {
     
      console.log("asdf "+JSON.stringify(json));
      console.log("playerdetails  "+json.imageURL);
      this.setState({
        selectedplayerDataimageURL:json.imageURL,
      });
    });


    }
    
  };
  search = query => {
    console.log('====================================', query);
    if (query !== '') {
      // const url = `https://swapi.co/api/people?search=${query}`;
      // const token = {};
      // this.token = token;
      // fetch(url)
      //   .then(results => results.json())
      //   .then(data => {
      //     console.log('data  ', data);
      //     // options=[]
      //     options = data.results
      //       ? data.results.map(singleFile => {
      //           //console.log(singleFile); luke
      //           return { value: singleFile.name, label: singleFile.name };
      //         })
      //       : 0;
      //     console.log('options ', options);
      //   });
    } else {
    }
  };
  toggle() {
   
    this.setState({
      modal: !this.state.modal,
      disablemode:false,
      hiddenmode:false,
      readonlymode:true,
      AUTitle:"Add",
      playerImage: '' ,
      playerImageURL: '' ,
      selectedplayerDataimageURL:'',
      fpname: "",
      sspid: "0",
      pname: "",
      country: "",
      playertype: "",
      atype: "international",
      iscap: "",
      isvcap: "",
      gameid:"",
    });
    
  }
  onDrop(pictureFiles, pictureDataURLs) {
    console.log('pictureFilespictureFilespictureFiles  ', pictureFiles);
    //CONST.BACKEND_URL +"/uploads/teamlogo/"
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
    console.log('picturespictures  ', this.state.pictures);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imgtype', 'playerimg');
    formData.append('images[]', this.state.file);
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
          this.setState({ imagePath: response.data.data[0] });
          console.log(
            'response.data.dataresponse.data.data ',
            response.data.data[0]
          );
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  resetPlayer() {
    this.setState({
      fpname:'',
      pid:'',
      pname:'',
      pcountry:'',
      imagePath:'',
      playerImage:''
    })
  }
  addPlayer() {
    const { fpname, pid, pname, pcountry, playertype,atype} = this.state;
    let piddata=atype==='international'?pid:0;
    let countrydata=atype==='international'?pcountry:'India';
    let reqData ={};
    if(this.state.sspid=== "0")
    {
      reqData = {
        fullname: fpname,
        pid: piddata,
        pname: pname,
        country: countrydata,
        playertype: (playertype)?playertype:"1",
        atype: atype,
        iscap: 0,
        isvcap: 0,
        gameid:1,
        pimgnames: this.state.playerImage,
        sspid:"0"
      };
    }
    else
    {
      reqData = {
        fullname: fpname,
        pid: this.state.sspid,
        pname: pname,
        country: countrydata,
        playertype: (playertype)?playertype:"1",
        atype: atype,
        iscap: 0,
        isvcap: 0,
        gameid:1,
        pimgnames: this.state.playerImage,
        sspid:this.state.sspid
      };
    }

    console.log("reqData==>>",reqData);
    this.props.dispatch(teamActions.addPlayer(reqData));
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    //  console.log("selected ", selectedPage);
    this.setState({ selectedPage1: selectedPage });
    let data = {
      limit: 10,
      page: selectedPage,
      search: ''
    };
    //const { dispatch } = this.props;
    this.props.dispatch(teamActions.getPlayerList(data));
    //this.props.dispatch(subadminActions.getAllSubAdmin(data));
  }
  showMessage() {
    return 'Not Found';
  }
  //Upload team logo
  onDrop1(picture) {
    const formData = new FormData();
    formData.append('imgtype', 'playerimg');
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
                playerImage: response.data.data[0] ,
                playerImageURL: CONST.BACKEND_URL +"/uploads/players/"+response.data.data[0] ,
            });
          console.log('response.',response.data.data);
        } else {
          alert('Error to upload image');
        }
      })
      .catch(error => {});
    
  }
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      limit: 10,
      page: 1,
      search: value.replace(/^\s+|\s+$/g, '')
    };
    this.props.dispatch(teamActions.getPlayerList(data));
  }

  editPlayerToggle(teamdetail){
    console.log("teamdetail===>>>",teamdetail);
    
    this.setState({
      modal: !this.state.modal,
      disablemode:true,
      hiddenmode:true,
      readonlymode:(teamdetail.ttype==="in")?true:false,
      AUTitle:"Update",
      fpname: teamdetail.fullname,
      sspid: teamdetail.pid,
      pname: teamdetail.pname,
      pcountry: teamdetail.country,
      playertype: teamdetail.playertype,
      atype:(teamdetail.ttype==="in")?"international":"domestic",
      iscap: teamdetail.iscap,
      isvcap: teamdetail.isvcap,
      gameid:teamdetail.gameid,
      playerImageURL: teamdetail.pimg,
    });
  }


  deletePlayer(playerid){
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
                      pids : [playerid]
                    };
                    var object = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authHeader().Authorization
                      },
                      body: JSON.stringify(args1)
                    }

                    var apiUrl = CONST.BACKEND_URL + "/api/deleteplayer";
                    fetch(apiUrl, object)
                      .then(function (response) {
                          response.json().then(json => {
                            if (json.error === false) {
                              swal({
                                title: "Deleted",
                                text: "Player deleted successfully",
                                icon: "success",
                              });
                              let data = {
                                limit: 10,
                                page: 1,
                                search: ''
                              };
                              formthis.props.dispatch(teamActions.getPlayerList(data));
                            }
                            else {
                              swal({
                                title: "Wrong!",
                                text: json.msg,
                                icon: "warning",
                              });  
                            }
                          })
                        
                      }).catch(error => {
                        swal({
                          title: "Error!",
                          text: error.toString(),
                          icon: "error",
                        });  
                      });
                    ////////////////

                  }
                })
  }

  render() {
    const { team } = this.props;
    let { items, total ,roleList,countryList} = team;
    
    console.log("roleList===>>",roleList);
   // console.log(countryList);
    this.countryData = countryList?countryList.map(person => ({ value: person.name, name: person.name })):[];
    this.roleData = roleList?roleList.map(person => ({ value: person.id, name: person.fullname })):[];
    //this.atype = [{value:'international',name : 'International'}];
    this.atype = [{value:'international',name : 'International'},{value:'domestic',name : 'Domestic'}];
    
    return (
      <div className="animated fadeIn">
        {team.loading?<div className="loader"></div>:null}
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" /> Player{' '}
                    <small className="text-muted">List</small>
                  </Col>
                  
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
                        placeholder="Search Player"
                        onChange={this.handleChangeSearch}
                        autoComplete="off"
                      />
                    </InputGroup>
                  </Col>
                  <Col xl="2">
                    <Button
                      onClick={this.toggle}
                      className="mr-1 float-right"
                      color="success"
                    >
                      Add Player
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Pic</th>
                      <th scope="col">Player Name</th>
                      <th scope="col">Player Role</th>
                      <th scope="col">Country</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((player, index) => (
                          <tr key={player.pid}>
                            <td>{this.state.selectedPage1===0 ||this.state.selectedPage1===1?(index + 1):((this.state.selectedPage1-1)*10) + (index + 1)}</td>
                            <td>
                              <img
                                src={player.pimg}
                                width="50"
                                height="50"
                                className="img-avatar"
                                 onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}}
                                alt=""
                              />
                            </td>
                            <td>{player.pname}</td>
                            <td>{player.ptype}</td>
                            <td>{player.country}</td>
                            <td><i className="cui-note h2" onClick={()=>this.editPlayerToggle(player)}></i></td>
                            <td><i className="cui-trash h5" onClick={()=>this.deletePlayer(player.pid)}></i></td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {parseInt(total) > 10 ? (
                  <PaginationComponent
                    totalItems={parseInt(total)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal}  toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{(this.state.AUTitle)?this.state.AUTitle:"Add"} Player</ModalHeader>
          <ModalBody>
            <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="fpname">Player Type </Label>
                    <Input
                      type="select"
                      name="atype"
                      id="atype"
                      disabled={this.state.disablemode}
                      onChange={this.handleChangeModalSelectAtype}
                      value={this.state.atype}>
                      {
                        this.atype.map((e, key) => {
                          return <option key={key} value={e.value}>{e.name}</option>;
                        })
                      }
                    </Input>
                  </FormGroup>
                </Col>
            </Row>
            {
              (this.state.hiddenmode===false)?
              <Row>
                <Col xs="12">
                  <FormGroup>
                    <Label htmlFor="playername">Find Player</Label>
                    <AsyncTypeahead
                      isLoading={this.state.isLoading}
                      labelKey={option => `${option.name}`}
                      onChange={this.onChange1}
                      onSearch={query => {
                        let data=query.replace(/^\s+|\s+$/g, '');
                        console.log("MATCHSCORETOKEN=",CONST.MATCHSCORETOKEN,"data=",data);
                        
                        this.setState({ isLoading: true });
                        fetch(
                          `https://cricapi.com/api/playerFinder?apikey=`+CONST.MATCHSCORETOKEN+`&name=${data}`
                        )
                          .then(resp => resp.json())
                          .then(json => {
                            console.log(json.data);
                            this.setState({
                              isLoading: false,
                              options: json.data,
                              selectedplayerDataimageURL:''
                            });
                          });
                      }}
                      options={this.state.options}
                    />
                  </FormGroup>
                </Col>
              </Row>:null
            }
            {<img  src={this.state.selectedplayerDataimageURL}  width="60"  height="60"  className="img-avatar"  alt=""/>}
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="fpname">Full Player Name</Label>
                  <Input
                    type="text"
                    name="fpname"
                    id="fpname"
                    onChange={this.handleChangeModalAddPlayer}
                    value={this.state.fpname}
                    readOnly={(this.state.readonlymode===true)?"readonly":""}
                    disabled={this.state.readonlymode===true?true:false}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pname">Player Name</Label>
                  <Input
                    type="text"
                    name="pname"
                    id="pname"
                    onChange={this.handleChangeModalAddPlayer}
                    value={this.state.pname}
                    readOnly={(this.state.readonlymode===true)?"readonly":""}
                    disabled={this.state.readonlymode===true?true:false}
                  />
                </FormGroup>
              </Col>
            </Row>
            {this.state.atype==='international'?<Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="pcountry">Player Country</Label>
                  <Input
                    type="select"
                    name="pcountry"
                    id="pcountry"
                    onChange={this.handleChangeModalAddPlayer}
                    value={this.state.pcountry}>
                      {
                       this.countryData.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                       })
                      }
                  </Input>
                </FormGroup>
              </Col>
            </Row>:null}
            <Row>
              <Col xs="12">
                <FormGroup>
                  <Label htmlFor="prole">Role</Label>
                  <Input
                    type="select"
                    name="playertype"
                    id="playertype"
                    onChange={this.handleChangeModalSelectRole}
                    value={this.state.playertype}>
                    {
                       this.roleData.map((e, key) => {
                        return <option key={key} value={e.value}>{e.name}</option>;
                       })
                    }
                  </Input>
                  
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <FormGroup>
                  <ImageUploader
                    withIcon={false}
                    buttonText="Upload Player Image"
                    withLabel={false}
                    withPreview={false}
                    onChange={this.onDrop1}
                    withLabel={true}
                    label="Max file size: 100kb"
                    maxFileSize={100000}
                  />
                  {this.state.playerImageURL?<img
                                src={this.state.playerImageURL}
                                width="50"
                                height="50"
                                className="img-avatar"
                                alt=""
                  />:null}
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addPlayer()}>
              {this.state.AUTitle}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { team, authentication } = state;
  //console.log("state  ", state)
  const { user } = authentication;
  return {
    user,
    team
  };
}
export default connect(mapStateToProps)(Teams);
