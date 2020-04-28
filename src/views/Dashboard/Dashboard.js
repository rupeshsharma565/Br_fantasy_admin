import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { connect } from 'react-redux';
import { dashboardActions } from '../../_actions';


//const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

/*const brandPrimary = getStyle('--primary')*/
//const brandSuccess = getStyle('--success')
/*const brandInfo = getStyle('--info')
//const brandWarning = getStyle('--warning')
//const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};*/
/*
const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};*/


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      dashboarddata:{},
       barChart : {
          labels: [],
          datasets: [
            {
              label: 'Users',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [],
              permissions:[]
            },
          ],
        },
    };
  }

  componentDidMount() {
    this.props.dispatch(dashboardActions.getAllStaticCount());

    let user = JSON.parse(localStorage.getItem('user'));
    var permissions = [];
    if(user && user.menus){
      var i;
      var j;
      if(user.menus.length){
        for (i = 0; i < user.menus.length; i++) { 
          if(user.menus[i].hasOwnProperty("children")){
            for (j = 0; j < user.menus[i].children.length; j++) { 
              permissions.push(user.menus[i].children[j].url);
            }
          }else{
            permissions.push(user.menus[i].url);
          }
        }
      }
      this.setState({
        permissions:permissions
      })
      
    }
  }

  componentWillReceiveProps(next_state){
    if(next_state.dashboard && next_state.dashboard.dashboarddata && next_state.dashboard.dashboarddata.barChartData.data.length>0 && next_state.dashboard.dashboarddata.barChartData.data.length>0)
    {

      this.setState({ barChart : {
          labels: next_state.dashboard.dashboarddata.barChartData.labels,//this.state.barChatLables,
          datasets: [
            {
              label: 'Users',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: next_state.dashboard.dashboarddata.barChartData.data,//this.state.barChatData,
            },
          ],
        },})
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    const {  dashboard} = this.props;
    let { dashboarddata } = dashboard;
    return (
     <div className="animated fadeIn"> 
       <Row className="social-main" >
       
        <Col xs="1" > <div title="Web Users" className="social-icons" > <i  className="fa fa-user fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.web:0} </span> </div></Col>
        <Col xs="1" > <div title="Android" className="social-icons" > <i className="fa fa-android fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.android:0} </span> </div> </Col>
        <Col xs="1" > <div title="Iphone" className="social-icons" > <i className="fa fa-apple fa-lg "></i><span className="social-count"> {dashboarddata?dashboarddata.social.ios:0} </span> </div> </Col>
      {/*   <Col xs="1" > <div title="Facebook" className="social-icons" > <i  className="fa fa-facebook-official fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.fb:0} </span> </div></Col>
        <Col xs="1" > <div title="Google" className="social-icons" > <i className="fa fa-google fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.google:0} </span> </div> </Col>
         <Col xs="1" > <div title="Admin" className="social-icons" > <i  className="fa fa-user fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.admin:0} </span> </div></Col>
        <Col xs="1" > <div title="Sub Admin" className="social-icons" > <i  className="fa fa-user fa-lg "></i> <span className="social-count" > {dashboarddata?dashboarddata.social.subadmin:0} </span> </div></Col> */}
        </Row>
        <Row>
          {
          (this.state.permissions && this.state.permissions.includes("/users/allusers")) ?
          <Col xs="6" sm="2" lg="2">
          <a className="dash-count" href={`/#/users/allusers`}>
            <Card className="text-white bg-info">
            
              <CardBody className="pb-0">
                <div className="text-value">{dashboarddata?dashboarddata.totalusr:0}</div>
                <div>Total user</div>
              </CardBody>
            
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
          : ""
          }
          {
          (this.state.permissions && this.state.permissions.includes("/subadmin")) ?
          <Col xs="6" sm="2" lg="2">
          <a className="dash-count" href={`/#/subadmin`}>
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                
                <div className="text-value">{dashboarddata?dashboarddata.totalsbadmin:0}</div>
                <div>Total subadmin</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Line data={cardChartData1} options={cardChartOpts1} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
            : ""
          }
          {
          (this.state.permissions && this.state.permissions.includes("/withdraw")) ?
           <Col xs="6" sm="2" lg="2">
           <a className="dash-count" href={`/#/withdraw`}>
            <Card className="text-white" style={{backgroundColor:'burlywood'}}>
              <CardBody className="pb-0">
                
                <div className="text-value">{dashboarddata?dashboarddata.withdrawals:0}</div>
                <div>Withdrawals</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Bar data={cardChartData4} options={cardChartOpts4} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
            : ""
          }

          {
          (this.state.permissions && this.state.permissions.includes("/kyc/approved")) ?
          <Col xs="6" sm="2" lg="2">
          <a className="dash-count" href={`/#/kyc/approved`}>
            <Card className="text-white bg-green">
              <CardBody className="pb-0">
                
                <div className="text-value">{dashboarddata?dashboarddata.approve:0}</div>
                <div>Approved Kyc</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Bar data={cardChartData4} options={cardChartOpts4} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
            : ""
          }
          {
          (this.state.permissions && this.state.permissions.includes("/kyc/notapproved")) ?
          <Col xs="6" sm="2" lg="2">
          <a className="dash-count" href={`/#/kyc/notapproved`}>
            <Card className="text-white bg-red">
              <CardBody className="pb-0">
                
                <div className="text-value">{dashboarddata?dashboarddata.notApproved:0}</div>
                <div>N-Approved Kyc</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Bar data={cardChartData4} options={cardChartOpts4} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
            : ""
          }
          {
          (this.state.permissions && this.state.permissions.includes("/communication/notifications")) ?
          <Col xs="6" sm="2" lg="2">
          <a className="dash-count" href={`/#/communication/notifications`}>
            <Card className="text-white" style={{backgroundColor:'gray'}}>
              <CardBody className="pb-0">
                
                <div className="text-value">{dashboarddata?dashboarddata.notification:0}</div>
                <div>Notification</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '40px' }}>
                {/* <Bar data={cardChartData4} options={cardChartOpts4} height={70} /> */}
              </div>
            </Card>
            </a>
          </Col>
            : ""
          }
        </Row>
        {
          (this.state.permissions && this.state.permissions.includes("/users/allusers")) ?
        <Row>
        <Col xs="12">
        <Card>
            <CardHeader>
              Users 
              <div className="card-header-actions">
                <a href={`/#/users/allusers`} className="card-header-action">
                  <small className="text-muted">Lists</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={this.state.barChart} options={options} />
              </div>
            </CardBody>
          </Card>
          </Col>
        </Row>
            : ""
          }
      </div>
    );
  }
}

//export default Dashboard;
function mapStateToProps(state) {
  const { dashboard} = state;
  
  return {
    dashboard
  };
}
export default connect(mapStateToProps)(Dashboard);