import React, { Component } from 'react';
//import Switch from 'react-switch';
import {
  // Card,
  // CardBody,
  // CardHeader,
  // Col,
  Row,
  // Table,
  // Badge,
  // Button,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  // FormGroup,
  // Input,
  // Label,
  // InputGroup,
  // InputGroupAddon,
  // ListGroup,
  // ListGroupItem
} from 'reactstrap';

//import PaginationComponent from 'react-reactstrap-pagination';
import { connect } from 'react-redux';
import { subadminActions } from '../../_actions';
import { toast } from 'react-toastify';

class UserReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSubAdminModal: false,
      showSubAdminModal: false,
      deleteSubAdminModal: false,
      selectedPage: 1,
      totalpage: 0,
      checked: false
    };
    this.handleChangeCheckedResource = this.handleChangeCheckedResource.bind(
      this
    );
    this.addSubAdminToggle = this.addSubAdminToggle.bind(this);
    this.showSubAdminToggle = this.showSubAdminToggle.bind(this);
    this.deleteSubAdminToggle = this.deleteSubAdminToggle.bind(this);
    this.handleChangeAddSubAdmin = this.handleChangeAddSubAdmin.bind(this);
    this.handleSelectedPaginate = this.handleSelectedPaginate.bind(this);
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.assignResourceSubAdminToggle = this.assignResourceSubAdminToggle.bind(
      this
    );
  }
  componentDidMount() {
    this.props.dispatch(subadminActions.getAllSubAdmin());
    this.props.dispatch(subadminActions.getAllResourceList());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.subadmin.isAdminAdded) {
      this.setState({ addSubAdminModal: false });
      this.props.dispatch(subadminActions.getAllSubAdmin());
    }
    if (nextProps.subadmin.isAdminDeleted) {
      this.setState({ deleteSubAdminModal: false, deleteAdminIdToDelete: 0 });
      this.props.dispatch(subadminActions.getAllSubAdmin());
    }
    if (nextProps.subadmin.total >= 0) {
      this.setState({ totalpage: nextProps.subadmin.total });
    }
    if (nextProps.subadmin.isAssignedResource) {
      this.setState({ assignResourceSubAdminModal: false });
    }
    if (nextProps.subadmin.listOfResource) {
      this.setState({ listOfResource: nextProps.subadmin.listOfResource });
    }
    if (nextProps.subadmin.listOfAssignedResource) {
        let items = this.state.listOfResource.map((array, key) => {
        if (nextProps.subadmin.listOfAssignedResource) {
          let findelement=nextProps.subadmin.listOfAssignedResource.find(x => x.resouresid === array.id);
          if (findelement) {
             array['checketstatus']=true;
          } else {
             array['checketstatus']=false;
          }
        }
        return array;
      }, []);
      this.setState({
        listOfResource: items
      });

    }
  }
  //Show Badge in Table
  getBadge = status => {
    return status === '1' ? 'success' : 'danger';
  };
  //Show Dialog box
  showSubAdminToggle() {
    this.setState({
      showSubAdminModal: !this.state.showSubAdminModal
    });
  }
  showSubAdminInfo(data) {
    this.setState({
      showAdminid: data.id,
      showAdminname: data.name,
      showAdminusername: data.username,
      showAdminstatus: data.status === '1' ? 'Active' : 'Deactive',
      showSubAdminModal: !this.state.showSubAdminModal,
      showAdminusertype: data.usertype,
      showAdmincreated: data.name
    });
  }
  //Add Dialog box
  addSubAdminToggle() {
    this.setState({
      addSubAdminModal: !this.state.addSubAdminModal
    });
  }
  handleChangeAddSubAdmin(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  addSubAdmin() {
    this.setState({ submitted: true });
    const { username, password, name } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      let data = {
        username: username,
        name: name,
        password: password
      };
      dispatch(subadminActions.addSubAdmin(data));
    }
  }
  //Delete Dialog box
  deleteSubAdminToggle() {
    this.setState({
      deleteSubAdminModal: !this.state.deleteSubAdminModal
    });
  }
  deleteSubAdminConfirm(data) {
    this.setState({
      deleteAdminusername: data.username,
      deleteAdminIdToDelete: data.id,
      deleteSubAdminModal: !this.state.deleteSubAdminModal
    });
  }
  deleteSubAdminAfterConfirm() {
    this.setState({ submitted: true });
    const { deleteAdminIdToDelete } = this.state;
    const { dispatch } = this.props;
    if (deleteAdminIdToDelete) {
      //alert(deleteAdminIdToDelete)
      dispatch(subadminActions.deleteSubAdmin({ id: deleteAdminIdToDelete }));
    }
  }
  //Pagination
  handleSelectedPaginate(selectedPage) {
    let data = {
      limit: 10,
      page: selectedPage,
      search: ''
    };
    this.props.dispatch(subadminActions.getAllSubAdmin(data));
  }
  //Search
  handleChangeSearch(e) {
    const { value } = e.target;
    let data = {
      limit: 10,
      page: 1,
      search: value.replace(/^\s+|\s+$/g, '')
    };
    this.props.dispatch(subadminActions.getAllSubAdmin(data));
  }
  //Assign Resource
  assignResourceSubAdmin(subadmindetails) {
    
    this.setState({
      assignResourceSubAdminModal: true,
      assignRoleSubAdminId: subadmindetails.id
    });
    let data={
      userid:subadmindetails.id
    }
     this.props.dispatch(subadminActions.getAssignedResourceList(data));

  }
  assignResourceSubAdminToggle() {
    this.setState({
      assignResourceSubAdminModal: !this.state.assignResourceSubAdminModal
    });
  }
  handleSelectResourceChange(checked) {
    this.setState({ checked });
  }
  handleChangeCheckedResource(resource) {
    console.log(resource);
    let {listOfResource}=this.state;
    let findelement=listOfResource.find(x => x.id === resource.id);
    let findindex=listOfResource.findIndex(x => x.id === resource.id);
    console.log(findelement);
    console.log(findindex);

    listOfResource[findindex].checketstatus=!listOfResource[findindex].checketstatus;
     this.setState({
        listOfResource,
      });
    
  }
  submitAssignedRole() {
    let listOfResource = this.state.listOfResource;
    let checkedResource = [];
    for (let index = 0; index < listOfResource.length; index++) {
      let resource = listOfResource[index];

      if (resource.checketstatus) {
        checkedResource.push(resource.id);
      }
    }
    if (checkedResource.length > 0) {
      // alert(checkedResource)
      let reqData = {
        userid: this.state.assignRoleSubAdminId,
        resouresid: checkedResource
      };
      this.props.dispatch(subadminActions.saveAssignResourceSubAdmin(reqData));
    } else {
      toast('Please select resource');
    }
  }
  render() {
   
    return (
      <div className="animated fadeIn custom_background">
        <Row>
         Comming Soon
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { subadmin, authentication } = state;
  const { user } = authentication;

  return {
    user,
    subadmin
  };
}
export default connect(mapStateToProps)(UserReport);
