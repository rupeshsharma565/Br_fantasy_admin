import React, { Component } from 'react';
import Switch from "react-switch";

import Select from 'react-select';
import { authHeader } from '../../_helpers';
import { CONST } from '../../_config';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  Card, CardBody, CardHeader,
  Col, Row, Table, Button,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import PaginationComponent from "react-reactstrap-pagination";
import { connect } from 'react-redux';
import { contestActions } from '../../_actions';

const selectOptions = [
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 }
];

//var pushid = {};
class Contest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      checked: false,
      getId: 0,
      selectedOption: selectOptions[0]
    }
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(contestActions.getAllContest());
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.contest.isStatusUpdated) {
      this.props.dispatch(contestActions.getAllContest());
    }

  }
  handleChangeCheckedResource(contest) {
    //console.log(contest);

    let data = {
      status: contest.status ? "0" : "1",
      id: contest.id
    }
    this.props.dispatch(contestActions.updateContestStatus(data));
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  addNewContest = () => {
    const data = new FormData();
    data.append('contestlogo', this.state.selectedFile);
    data.append('title', this.state.addTitle);
    data.append('subtitle', this.state.addSubtitle);
    data.append('status', this.state.addStatus);

    console.log("this.state.addTitle  ", this.state.addTitle);
    console.log("this.state.addSubtitle  ", this.state.addSubtitle);
    console.log("this.state.addStatus  ", this.state.addStatus);
    console.log("this.state.selectedFile  ", this.state.selectedFile.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': authHeader().Authorization
      }
    };
    axios.post(CONST.BACKEND_URL + `/api/addcontests`, data, config)
      .then((response) => {
        console.log("response   ", response);
        if (response.data.error === false) {
          toast(response.data.msg)
        } else {
          toast(response.data.msg)
        }

      })
      .catch((error) => {
        console.log('========================33333333============');
        console.log(error);
        console.log('====================================');
      });
  }
  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    console.log(name + " ::: " + value);
    this.setState({ [name]: value });
  }
  handleSelectChange = (selectedOption) => {
    //this.setState({ selectedOption });
    this.setState({ addStatus: selectedOption.value });
    this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption.value);
  }
  render() {
    const { contest } = this.props
    let { items } = contest;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify"></i> Contest <small className="text-muted">List</small>
                  </Col>
                  <Col xl="2">
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      items ? items.map((subadmin, index) =>
                        <tr key={subadmin.id}>
                          <td>{index}</td>
                          <td><img src={subadmin.contestlogo} onError={(e)=>{e.target.src=CONST.BACKEND_URL + '/uploads/icons/dummy.png'}} alt="" width="50" height="50" />&nbsp;&nbsp;&nbsp;&nbsp;{subadmin.title}</td>
                          <td>
                            <Switch className="float-right"
                              onChange={() => this.handleChangeCheckedResource(subadmin)}
                              checked={subadmin.status}
                              id={subadmin.id}
                            />
                          </td>
                        </tr >
                      ) : null
                    }
                  </tbody>
                </Table>
                {
                  this.state.totalpage > 10 ? <PaginationComponent
                    totalItems={parseInt(this.state.totalpage)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  /> : null
                }
              </CardBody>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify"></i> Add New Contests <small className="text-muted"></small>
                  </Col>
                  <Col xl="2">
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="addTitle">Title</Label>
                      <Input type="text" name="addTitle" value={this.state.addTitle} autoComplete="off" onChange={this.handleChangeAddSubAdmin}   >
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="addSubtitle">Subtitle</Label>
                      <Input type="text" name="addSubtitle" value={this.state.addSubtitle} autoComplete="off" onChange={this.handleChangeAddSubAdmin}  >
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="addStatus">Status</Label>
                      <Select options={selectOptions} name="addStatus" value={this.state.selectedOption} onChange={this.handleSelectChange} isSearchable={false} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <input type="file" name="" id="" onChange={this.handleselectedFile} />
                    </FormGroup>
                  </Col>
                </Row>
                <Button onClick={this.addNewContest} className="mr-1" color="success" >Add New Contest</Button>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProps(state) {

  const { contest, authentication } = state;
  const { user } = authentication;

  return {
    user,
    contest
  };
}
export default connect(mapStateToProps)(Contest);
