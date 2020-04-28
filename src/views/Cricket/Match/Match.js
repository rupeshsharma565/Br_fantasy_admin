import React, { Component } from 'react';
import Switch from 'react-switch';

// import Select from 'react-select';
import { authHeader } from '../../../_helpers';
import { CONST } from '../../../_config';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  FormGroup,
  Button
} from 'reactstrap';

import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { matchActions } from '../../../_actions';

const selectOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 }
];

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      checked: false,
      getId: 0,
      selectedOption: selectOptions[0]
    };
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(
      this
    );
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(matchActions.getListMatches());
  }
  componentWillReceiveProps(nextProps) {}
  handleChangeCheckedResource(matchs) {
    //console.log(contest);

    let data = {
      status: matchs.status ? '0' : '1',
      id: matchs.id
    };
    this.props.dispatch(matchActions.updateContestStatus(data));
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };
  addNewContest = () => {
    const data = new FormData();
    data.append('contestlogo', this.state.selectedFile);
    data.append('title', this.state.addTitle);
    data.append('subtitle', this.state.addSubtitle);
    data.append('status', this.state.addStatus);

    console.log('this.state.addTitle  ', this.state.addTitle);
    console.log('this.state.addSubtitle  ', this.state.addSubtitle);
    console.log('this.state.addStatus  ', this.state.addStatus);
    console.log('this.state.selectedFile  ', this.state.selectedFile.name);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: authHeader().Authorization
      }
    };
    axios
      .post(CONST.BACKEND_URL + `/api/addcontests`, data, config)
      .then(response => {
        console.log('response   ', response);
        if (response.data.error === false) {
          toast(response.data.msg);
        } else {
          toast(response.data.msg);
        }
      })
      .catch(error => {
        console.log('========================33333333============');
        console.log(error);
        console.log('====================================');
      });
  };
  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    console.log(name + ' ::: ' + value);
    this.setState({ [name]: value });
  }
  handleSelectChange = selectedOption => {
    //this.setState({ selectedOption });
    this.setState({ addStatus: selectedOption.value });
    this.setState({ selectedOption });
    //console.log(`Option selected:`, selectedOption.value);
  };
  render() {
    const { match } = this.props;
    let { items } = match;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="6">
                    <i className="fa fa-align-justify" />{' '}
                    <strong>MATCH Listing</strong>
                    <div className="card-header-actions">
                      <Button
                        onClick={this.addSubAdminToggle}
                        className="mr-1"
                        color="success"
                      >
                        Add Team
                      </Button>
                    </div>
                  </Col>
                  <Col xl="2" />
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th scope="col">Match No</th>
                      <th scope="col">Match ID</th>
                      <th scope="col">Match Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      ? items.map((matchs, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{matchs.matchid}</td>
                            <td>{matchs.matchname}</td>
                            <Switch
                              className="float-right"
                              onChange={() =>
                                this.handleChangeCheckedResource(matchs)
                              }
                              checked={matchs.status}
                              id={matchs.id}
                            />
                            <td />
                          </tr>
                        ))
                      : null}
                  </tbody>
                </Table>
                {this.state.totalpage > 10 ? (
                  <PaginationComponent
                    totalItems={parseInt(this.state.totalpage)}
                    pageSize={10}
                    onSelect={this.handleSelectedPaginate}
                  />
                ) : null}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { match, authentication } = state;
  const { user } = authentication;

  return {
    user,
    match
  };
}
export default connect(mapStateToProps)(Match);
