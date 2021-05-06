import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
  login,
  logout,
  getAll,
  updateUserStatus,
  getAllNotification,
  getAllCONTACT,
  getAllInfo,
  udpateUserKYC,
  udpateUserDetails,
  changePassword
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password)
      .then(
        user => {
          dispatch(success(user));
          history.push({ pathname: '#/' });
          window.location.reload();
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
function getAll(data) {
  return dispatch => {
    dispatch(request());
    userService.getAll(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
  function request() { return { type: userConstants.GETALL_REQUEST } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function updateUserStatus(data) {
  return dispatch => {
    userService.updateUserStatus(data).then(
      userstatus => {
        dispatch(success(userstatus));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };
  function success(userstatus) {
    return { type: userConstants.UPDATE_USER_STATUS_SUCCESS, userstatus };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_USER_STATUS_FAILURE, error };
  }
}

function getAllNotification(data) {
  return dispatch => {
    dispatch(request());
    userService.getAllNotification(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
  function request() { return { type: userConstants.GETALL_REQUEST_NOTIFICATION } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS_NOTIFICATION, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE_NOTIFICATION, error } }
}


function getAllCONTACT(data) {
  return dispatch => {
    dispatch(request());
    userService.getAllCONTACT(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
  function request() { return { type: userConstants.GETALL_REQUEST_CONTACT } }
  function success(users) { return { type: userConstants.GETALL_SUCCESS_CONTACT, users } }
  function failure(error) { return { type: userConstants.GETALL_FAILURE_CONTACT, error } }
}

function getAllInfo(data) {
  return dispatch => {
    dispatch(request());
    userService.getAllInfo(data)
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };
  function request() { return { type: userConstants.REQUEST_INFO_USER_INFO } }
  function success(users) { return { type: userConstants.SUCCESS_INFO_USER_INFO, users } }
  function failure(error) { return { type: userConstants.FAILURE_INFO_USER_INFO, error } }
}

function udpateUserKYC(data) {
  return dispatch => {
    dispatch(request());
    userService.udpateUserKYC(data).then(
      userstatus => {
        dispatch(success(userstatus));
        dispatch(alertActions.success('Updated successfully'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() { return { type: userConstants.REQUEST_INFO_USER_INFO } }
  function success(userstatus) {
    return { type: userConstants.UPDATE_KYC_SUCCESS, userstatus };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_KYC_FAILURE, error };
  }
}

function udpateUserDetails(data) {
  return dispatch => {
    dispatch(request());
    userService.udpateUserDetails(data).then(
      userstatus => {
        dispatch(success(userstatus));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() { return { type: userConstants.UPDATE_DETAILS_REQUEST } }
  function success(userstatus) {
    return { type: userConstants.UPDATE_DETAILS_SUCCESS, userstatus };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_DETAILS_FAILURE, error };
  }
}

function changePassword(data) {
  return dispatch => {
    dispatch(request());
    userService.changePassword(data).then(
      userstatus => {
        dispatch(success(userstatus));
        dispatch(alertActions.success('Password change successfully.'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() { return { type: userConstants.CHANGE_PASSWORD_REQUEST } }
  function success(userstatus) {
    return { type: userConstants.CHANGE_PASSWORD_SUCCESS, userstatus };
  }
  function failure(error) {
    return { type: userConstants.CHANGE_PASSWORD_FAILURE, error };
  }
}
