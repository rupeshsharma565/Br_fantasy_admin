import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Badge,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Input,
} from "reactstrap";
import Switch from "react-switch";
import { connect } from "react-redux";
import { cricketActions } from "../../../_actions";
const statusOption = [
  { value: 1, name: "Active" },
  { value: 0, name: "Deactive" },
];
class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addPoolModal: false,
      addPrizeModal: false,
      showPoolModal: false,
      editPoolModal: false,
      showPrizeModal: false,
      selectedPage: 1,
      totalpage: 0,
      checked: false,
      combined: false,
      single: false,
      multiple: false,
      addPoolStatus: statusOption[0].value,
      prizeBreaker: [],
      prizBrkTotAmt: 0,
      LastIndexOfBrkPrize: 0,
      disabledSubmitButton: false,
      prizBrkTotAmtMax: 0,
      poolwinners: 0,
      pooltotalwining: 0,
      poolmaxteams: 0,
      pooljoinfee: 0,
    };
    //this.handleRemoveShareholder = this.handleRemoveShareholder.bind(this);
    this.showPrizeToggle = this.showPrizeToggle.bind(this);
    this.handleChangeAddPool1 = this.handleChangeAddPool1.bind(this);
    this.addPrizeToggle = this.addPrizeToggle.bind(this);
    this.addPoolToggle = this.addPoolToggle.bind(this);
    this.handleChangeAddPool = this.handleChangeAddPool.bind(this);
    this.showPrizeClose = this.showPrizeClose.bind(this);
    this.handleOptionStatus = this.handleOptionStatus.bind(this);
    this.handleParameterKeyValueChange = this.handleParameterKeyValueChange.bind(
      this
    );
    this.handleRemoveprizeBreaker = this.handleRemoveprizeBreaker.bind(this);
    this.handleAddPrizeBreaker = this.handleAddPrizeBreaker.bind(this);
  }
  componentDidMount() {
    // console.log("this.props.match.params.id   ", this.props.match.params.id);
    let data = {
      contestid: this.props.match.params.id,
    };
    this.props.dispatch(cricketActions.getPoolList(data));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cricket.poolAdded) {
      this.setState({ addPoolModal: false });
      let data = {
        contestid: this.props.match.params.id,
      };
      this.props.dispatch(cricketActions.getPoolList(data));
    }
    if (nextProps.cricket.poolAddedAndPrize) {
      this.setState({ addPoolModal: false, prizeBreaker: [] });
      let data = {
        contestid: this.props.match.params.id,
      };
      this.props.dispatch(cricketActions.getPoolList(data));
    }
    if (nextProps.cricket.prizeList) {
      this.setState({
        prizeList: nextProps.cricket.prizeList,
        showPrizeModal: !this.state.showPrizeModal,
      });
    }
  }
  //Show Badge in Table
  getBadge = (status) => {
    return status === true ? "success" : "danger";
  };
  addPoolToggle() {
    this.setState({
      addPoolModal: !this.state.addPoolModal,
    });
  }
  showPrizeToggle(pool) {
    //console.log("poolpool  ", pool);
    this.setState({
      prizeList: [],
    });
    if (pool.id) {
      let data = {
        poolcontestid: pool.id,
      };
      this.props.dispatch(cricketActions.getPrize(data));
    }
  }
  showPrizeClose(pool) {
    // console.log("poolpool  ", pool);
    this.setState({
      showPrizeModal: false,
    });
  }
  handleChangeAddPool(e) {
    const { name, value } = e.target;
    // console.log("checkwin", name, value);
    this.setState({ [name]: parseFloat(value) });

    let pooljoinfee = 0,
      poolmaxteams = 0;

    if (name === "pooljoinfee") {
      pooljoinfee = value ? value : 0;
      poolmaxteams = this.state.poolmaxteams ? this.state.poolmaxteams : 0;
      this.setState({
        pooltotalwining:
          pooljoinfee && poolmaxteams ? pooljoinfee * poolmaxteams : 0,
      });
    }
    if (name === "poolmaxteams") {
      poolmaxteams = value ? value : 0;
      pooljoinfee = this.state.pooljoinfee ? this.state.pooljoinfee : 0;

      this.setState({
        pooltotalwining:
          pooljoinfee && poolmaxteams ? pooljoinfee * poolmaxteams : 0,
      });
    }

    // if (this.state.poolwinners > this.state.poolmaxteams) {
    //   this.setState({
    //     disabledSubmitButton: true,
    //   });
    // } else if (this.state.poolwinners < this.state.poolmaxteams) {
    //   this.setState({
    //     disabledSubmitButton: false,
    //   });
    // }

    if (name === "poolwinners") {
      let poolwinners = this.state.poolwinners;

      if (poolwinners > poolmaxteams) {
        return e.preventDefault();
      } else {
        // this.setState({
        //   poolwinners: poolwinners,
        // });
        // console.log(poolwinners, poolmaxteams);
      }
    }
  }
  handleChangeAddPool1(name, value) {
    // console.log("name  ", name);
    // console.log("value  ", value);
    if (name === "single") {
      this.setState({
        single: !this.state.single,
        multiple: false,
      });
    } else if (name === "multiple") {
      this.setState({
        single: false,
        multiple: !this.state.multiple,
      });
    } else {
      this.setState({ [name]: value });
    }
  }
  handleOptionStatus(e) {
    const { name, value } = e.target;
    // console.log(name + "  " + value);
    this.setState({ addPoolStatus: value });
  }
  addPool() {
    let data = {
      contestid: this.props.match.params.id,
      joinfee: this.state.pooljoinfee,
      totalwining: this.state.pooltotalwining,
      winners: this.state.poolwinners,
      maxteams: this.state.poolmaxteams,
      c: this.state.combined ? 1 : 0,
      m: this.state.multiple ? 1 : 0,
      s: this.state.single ? 1 : 0,
      status: this.state.addPoolStatus,
      prizekeyvalue: this.state.prizeBreaker,
    };
    // console.log(data);

    this.props.dispatch(cricketActions.addPoolAndPrize(data));
  }
  addPrizeToggle(pool) {
    // console.log(pool);
    this.setState({
      poolid: pool.id,
      shareholders: [],
      addPrizeModal: !this.state.addPrizeModal,
    });
  }
  handleOptionStatusPrize(e) {
    const { name, value } = e.target;
    // console.log(name + "  " + value);
    this.setState({ addPrizeStatus: value });
  }
  addPrize() {
    // console.log("this.state.pooljoinfee  ", this.state.shareholders);

    let data = {
      poolcontestid: this.state.poolid,
      prizekeyvalue: this.state.shareholders,
    };
    this.props.dispatch(cricketActions.addPrize(data));
  }
  handleParameterKeyValueChange = (idx) => (evt) => {
    // console.log("idx", idx);
    const newprizeBreaker = this.state.prizeBreaker.map(
      (prizeBreaker, sidx) => {
        if (idx !== sidx) return prizeBreaker;
        // console.log("evt.target.name   ", evt.target.name);
        return { ...prizeBreaker, [evt.target.name]: evt.target.value };
      }
    );
    let prizBrkTotAmt = 0;
    let prizBrkTotAmtMax = 0;
    newprizeBreaker.forEach((item, index, arr) => {
      prizBrkTotAmt =
        prizBrkTotAmt + (item.pamount ? parseFloat(item.pamount) : 0);
    });
    prizBrkTotAmtMax = newprizeBreaker
      ? parseFloat(newprizeBreaker[newprizeBreaker.length - 1]["pmax"])
      : 0;

    this.setState({
      prizeBreaker: newprizeBreaker,
      prizBrkTotAmt: prizBrkTotAmt,
      prizBrkTotAmtMax: prizBrkTotAmtMax,
    });
  };
  handleAddPrizeBreaker = () => {
    this.setState({
      prizeBreaker: this.state.prizeBreaker.concat([
        { pmin: "", pmax: "", pamount: "" },
      ]),
    });
  };
  handleRemoveprizeBreaker = (idx) => () => {
    this.setState({
      prizeBreaker: this.state.prizeBreaker.filter((s, sidx) => idx !== sidx),
    });
  };
  render() {
    // console.log("prizBrkTotAmtMax", this.state.prizBrkTotAmtMax);
    const { cricket } = this.props;
    const { poolList } = cricket;
    //  console.log("prizeBreakerprizeBreaker", this.state.prizeBreaker);
    return (
      <div className="animated fade In">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <FormGroup row>
                  <Col xl="10">
                    <strong>
                      <i className="icon-info pr-1"></i>Pool id:{" "}
                      {this.props.match.params.id}
                    </strong>
                  </Col>
                  <Col xl="2">
                    <Button
                      onClick={this.addPoolToggle}
                      className="mr-1"
                      color="success"
                    >
                      Add Pool
                    </Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              <CardBody>
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">FEE</th>
                      <th scope="col">TOTAL WINNING</th>
                      <th scope="col">MAX TEAM</th>
                      <th scope="col">WINNERS</th>
                      {/* <th scope="col">PRIZE</th> */}
                      <th scope="col">SHOW PRIZE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {poolList
                      ? poolList.map((pool, index) => (
                        <tr key={pool.id}>
                          <td>{pool.id}</td>
                          <td>{pool.joinfee}</td>
                          <td>{pool.totalwining}</td>
                          <td>{pool.maxteams}</td>
                          <td>{pool.winners}</td>
                          {/* <td>
                            <Badge
                              className="mr-1" onClick={() => this.addPrizeToggle(pool)}  color="info"
                              style={{ cursor: 'pointer' }}>
                              Prize
                            </Badge>
                          </td> */}
                          <td>
                            <Badge
                              className="mr-1"
                              onClick={() => this.showPrizeToggle(pool)}
                              color="info"
                              style={{ cursor: "pointer" }}
                            >
                              Show Prize
                              </Badge>
                          </td>
                        </tr>
                      ))
                      : null}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.showPrizeModal}
          toggle={this.showPrizeToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.showPrizeClose}>Add Prize</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label>Range</Label>
              </Col>
              <Col md="6">
                <Label>Amount</Label>
              </Col>
            </FormGroup>
            {this.state.prizeList
              ? this.state.prizeList.map((shareholder, idx) => (
                <FormGroup row key={idx}>
                  <Col md="3">
                    <Input
                      type="text"
                      name="pmin"
                      value={shareholder.pmin}
                      placeholder="Min"
                      autoComplete="off"
                      onChange={this.handleParameterKeyValueChange(idx)}
                      disabled
                    />
                  </Col>
                  <Col md="3">
                    <Input
                      type="text"
                      name="pmax"
                      value={shareholder.pmax}
                      placeholder="Max"
                      autoComplete="off"
                      onChange={this.handleParameterKeyValueChange(idx)}
                      disabled
                    />
                  </Col>
                  <Col md="3">
                    <Input
                      type="text"
                      name="pamount"
                      value={shareholder.pamount}
                      placeholder="Amount"
                      autoComplete="off"
                      onChange={this.handleParameterKeyValueChange(idx)}
                      disabled
                    />
                  </Col>
                </FormGroup>
              ))
              : null}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.showPrizeClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.addPoolModal}
          toggle={this.addPoolToggle}
          className={"my-modal " + this.props.className}
        >
          <ModalHeader toggle={this.addPoolToggle}>
            Add pool and prize
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="6">
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="pid">Joining Fee</Label>
                      <Input
                        type="text"
                        name="pooljoinfee"
                        id="pooljoinfee"
                        autoComplete="off"
                        onChange={this.handleChangeAddPool}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="poolmaxteams">Max Teams</Label>
                      <Input
                        type="text"
                        name="poolmaxteams"
                        id="poolmaxteams"
                        autoComplete="off"
                        onChange={this.handleChangeAddPool}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="fpname">Total Winning</Label>
                      <Input
                        type="text"
                        name="pooltotalwining"
                        id="pooltotalwining"
                        autoComplete="off"
                        onChange={this.handleChangeAddPool}
                        value={this.state.pooltotalwining || ""}
                      // disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="fpname">winners</Label>
                      <Input
                        type="text"
                        name="poolwinners"
                        id="poolwinners"
                        autoComplete="off"
                        onChange={this.handleChangeAddPool}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="text-danger">
                    {this.state.poolwinners > this.state.poolmaxteams ? (
                      <span className={"alertmsg"}>
                        * "Winners" should'nt be greater then "Max team"
                      </span>
                    ) : null}
                  </Col>
                </Row>

                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="poolmaxteams">Pool Type</Label>
                      <Row>
                        <Col xs="4">
                          Confirmed
                          <Switch
                            name="combined"
                            id="combined"
                            className="float-right"
                            onChange={() =>
                              this.handleChangeAddPool1(
                                "combined",
                                !this.state.combined
                              )
                            }
                            checked={this.state.combined}
                          />
                        </Col>
                        <Col xs="4">
                          Single
                          <Switch
                            name="single"
                            id="single"
                            className="float-right"
                            onChange={() =>
                              this.handleChangeAddPool1(
                                "single",
                                !this.state.single
                              )
                            }
                            checked={this.state.single}
                          />
                        </Col>
                        <Col xs="4">
                          Multiple
                          <Switch
                            name="multiple"
                            id="multiple"
                            className="float-right"
                            onChange={() =>
                              this.handleChangeAddPool1(
                                "multiple",
                                !this.state.multiple
                              )
                            }
                            checked={this.state.multiple}
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="poolmaxteams">Status</Label>
                      <Input
                        type="select"
                        name="playertype"
                        id="playertype"
                        onChange={this.handleOptionStatus}
                        value={this.state.addPoolStatus}
                      >
                        {statusOption.map((e, key) => {
                          return (
                            <option key={key} value={e.value}>
                              {e.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col xs="6">
                <FormGroup row>
                  <Col md="6">
                    <Label>Range</Label>
                  </Col>
                  <Col md="6">
                    <Label>Amount</Label>
                  </Col>
                  <Col md="12" className="text-danger">
                    {this.state.pooltotalwining < this.state.prizBrkTotAmt ? (
                      <span className={"alertmsg"}>
                        * "Amount" should'nt be greater then "Total Wining"
                      </span>
                    ) : null}
                  </Col>
                  <Col md="12" className="text-danger">
                    {this.state.prizBrkTotAmtMax > this.state.poolwinners ? (
                      <span className={"alertmsg"}>
                        * "Range" should'nt be greater then "Max Teams"
                      </span>
                    ) : null}
                  </Col>
                </FormGroup>
                {this.state.prizeBreaker.map((prizeBreaker, idx) => (
                  <FormGroup row key={idx}>
                    <Col md="3">
                      <Input
                        type="text"
                        name="pmin"
                        value={prizeBreaker.pmin}
                        placeholder="Min"
                        autoComplete="off"
                        onChange={this.handleParameterKeyValueChange(idx)}
                      />
                    </Col>
                    <Col md="3">
                      <Input
                        type="text"
                        name="pmax"
                        value={prizeBreaker.pmax}
                        placeholder="Max"
                        autoComplete="off"
                        onChange={this.handleParameterKeyValueChange(idx)}
                      />
                    </Col>
                    <Col md="3">
                      <Input
                        type="text"
                        name="pamount"
                        value={prizeBreaker.pamount}
                        placeholder="Amount"
                        autoComplete="off"
                        onChange={this.handleParameterKeyValueChange(idx)}
                      />
                    </Col>
                    <Col md="1">
                      <Button
                        color="info"
                        onClick={this.handleRemoveprizeBreaker(idx)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </FormGroup>
                ))}
                <Button color="success" onClick={this.handleAddPrizeBreaker}>
                  Add Prize
                </Button>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              disabled={
                this.state.poolwinners > this.state.poolmaxteams ? true : false
              }
              onClick={() => this.addPool()}
            >
              {" "}
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={this.addPoolToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cricket } = state;

  return {
    cricket,
  };
}
export default connect(mapStateToProps)(Pool);
