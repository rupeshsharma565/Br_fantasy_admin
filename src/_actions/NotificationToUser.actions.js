import { matchConstants } from '../_constants';
import { matchService } from '../_services';
import { alertActions } from './';


export const matchActions = {
  getListMatches,
  addMatches,
  deleteSubAdmin,
  getAllResourceList,
  saveAssignResourceSubAdmin,
  getTeamList,
  addTeam
};

// for get  getListMatches

function getListMatches(data) {
  return dispatch => {
    dispatch(request());
    matchService.getListMatches(data)
      .then(
        matches => {
          dispatch(success(matches))
          //dispatch(alertActions.success('Admin fetch'));
        },
        error => {
          dispatch(failure(error))
        }
      );
  };
  function request() { return { type: matchConstants.GETALL_REQUEST } }
  function success(matches) { return { type: matchConstants.GETALL_SUCCESS, matches } }
  function failure(error) { return { type: matchConstants.GETALL_FAILURE, error } }
}
function addMatches(data) {
  return dispatch => {

    matchService.addSubAdmin(data)
      .then(
        addsubadmin => {
          dispatch(success(addsubadmin));
          dispatch(alertActions.success('Subadmin added !'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  //function request(user) { return { type: matchConstants.LOGIN_REQUEST, user } }
  function success(addsubadmin) { return { type: matchConstants.SUB_ADMIN_ADD_SUCCESS, addsubadmin } }
  function failure(error) { return { type: matchConstants.SUB_ADMIN_ADD_FAILURE, error } }
}
function getTeamList(data) {
  return dispatch => {

    matchService.getTeamList(data)
      .then(
        teamList => {
          dispatch(success(teamList));
          // dispatch(alertActions.success('Subadmin added !'));
        },
        error => {
          dispatch(failure(error));
          // dispatch(alertActions.error(error));
        }
      );
  };

  //function request(user) { return { type: matchConstants.LOGIN_REQUEST, user } }
  function success(teamList) { return { type: matchConstants.TEAM_GET_SUCCESS, teamList } }
  function failure(error) { return { type: matchConstants.TEAM_GET_FAILURE, error } }
}

function addTeam(data) {
  return dispatch => {

    matchService.addTeam(data)
      .then(
        addTeam => {
          console.log("addTeam ------------------", addTeam);

          dispatch(success(addTeam));
          dispatch(alertActions.success('team added !'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };
  function success(addTeam) { return { type: matchConstants.TEAM_GET_SUCCESS, addTeam } }
  function failure(error) { return { type: matchConstants.TEAM_GET_FAILURE, error } }
}

function deleteSubAdmin(data) {
  //console.log("Enter into action  ", data);

  return dispatch => {

    matchService.deletesubAdminService(data)
      .then(
        deletesubadmin => {
          dispatch(success(deletesubadmin));
          dispatch(alertActions.success('Subadmin deleted !'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  //function request(user) { return { type: matchConstants.LOGIN_REQUEST, user } }
  function success(deletesubadmin) { return { type: matchConstants.SUB_ADMIN_DELETE_SUCCESS, deletesubadmin } }
  function failure(error) { return { type: matchConstants.SUB_ADMIN_DELETE_FAILURE, error } }
}
function getAllResourceList() {
  return dispatch => {
    // dispatch(request());
    matchService.getAllResourceList()
      .then(
        resources => {
          dispatch(success(resources));
        },
        error => {
          dispatch(failure(error))
        }
      );
  };
  // function request() { return { type: matchConstants.GETALL_REQUEST } }
  function success(resources) { return { type: matchConstants.GET_RESOUCE_SUCCESS, resources } }
  function failure(error) { return { type: matchConstants.GET_RESOUCE_FAILURE, error } }
}
function saveAssignResourceSubAdmin(data) {
  return dispatch => {

    matchService.saveAssignResourceSubAdmin(data)
      .then(
        saveassignedresources => {
          dispatch(success(saveassignedresources));
        },
        error => {
          dispatch(failure(error))
        }
      );
  };
  // function request() { return { type: matchConstants.GETALL_REQUEST } }
  function success(saveassignedresources) { return { type: matchConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS, saveassignedresources } }
  function failure(error) { return { type: matchConstants.SAVE_ASSIGNED_RESOUCE_FAILURE, error } }
}
