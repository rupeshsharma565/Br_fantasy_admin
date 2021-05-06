import { settingConstants } from '../_constants';
import { settingService } from '../_services';
import { alertActions } from './';

export const settingActions = {
  getGlobalPoints,
  addGlobalPoints,
  getMainSetting,
  updateMainSetting,
  getCatptainsSetting,
  updateCatptainsSetting,
  getGameType,
  getReferralPoint,
  updateReferralPoint,
  updatestaticpage,
  getstaticpage,
  getSliderList,
  addSlider,
  udpateSlider
}
function getGlobalPoints(data) {
  return dispatch => {
    dispatch(request());
    settingService.getGlobalPoints(data).then(
      setting => {
        dispatch(success(setting));
        //dispatch(alertActions.success('Admin fetch'));setting
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GETALL_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GETALL_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GETALL_FAILURE, error };
  }
}
function addGlobalPoints(data) {
  return dispatch => {
    //dispatch(request());
    settingService.addGlobalPoints(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Updated succesfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  // function request() {
  //   return { type: settingConstants.GETALL_REQUEST };
  // }
  function success(setting) {
    return { type: settingConstants.UPDATE_CRICKET_MATCH_SETTING_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_CRICKET_MATCH_SETTING_FAILURE, error };
  }
}
function getMainSetting() {
  return dispatch => {
    dispatch(request());
    settingService.getMainSetting().then(
      setting => {
        dispatch(success(setting));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GET_MAIN_SETTING_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GET_MAIN_SETTING_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_MAIN_SETTING_FAILURE, error };
  }
}
function updateMainSetting(data) {
  return dispatch => {
    settingService.updateMainSetting(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Updated succesfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function success(setting) {
    return { type: settingConstants.UPDATE_MAIN_SETTING_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_MAIN_SETTING_FAILURE, error };
  }
}
function getCatptainsSetting(data) {
  return dispatch => {
    dispatch(request());
    settingService.getCatptainsSetting(data).then(
      setting => {
        dispatch(success(setting));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GET_CAPTAIN_VC_SETTING_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GET_CAPTAIN_VC_SETTING_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_CAPTAIN_VC_SETTING_FAILURE, error };
  }
}
function updateCatptainsSetting(data) {
  return dispatch => {
    settingService.updateCatptainsSetting(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Updated succesfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(setting) {
    return { type: settingConstants.UPDATE_CAPTAIN_VC_SETTING_SUCCESS1, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_CAPTAIN_VC_SETTING_FAILURE1, error };
  }
}
function getGameType() {
  return dispatch => {
    settingService.getGameType().then(
      setting => {
        dispatch(success(setting));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function success(setting) {
    return { type: settingConstants.GET_GAME_TYPE_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_GAME_TYPE__FAILURE, error };
  }
}
function getReferralPoint(data) {
  return dispatch => {
    dispatch(request());
    settingService.getReferralPoint(data).then(
      setting => {
        dispatch(success(setting));
        //dispatch(alertActions.success('Admin fetch'));setting
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GET_REFERRAL_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GET_REFERRAL_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_REFERRAL_FAILURE, error };
  }
}
function updateReferralPoint(data) {
  return dispatch => {
    dispatch(request());
    settingService.updateReferralPoint(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Update successfully'));//setting
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.UPDATE_REFERRAL_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.UPDATE_REFERRAL_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_REFERRAL_FAILURE, error };
  }
}
function getstaticpage(data) {
  return dispatch => {
    dispatch(request());
    settingService.getstaticpage(data).then(
      setting => {
        dispatch(success(setting));
        //dispatch(alertActions.success('Admin fetch'));setting
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GET_STATIC_PAGE_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GET_STATIC_PAGE_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_STATIC_PAGE_FAILURE, error };
  }
}
function updatestaticpage(data) {
  return dispatch => {
    dispatch(request());
    settingService.updatestaticpage(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Updated successfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.UPDATE_STATIC_PAGE_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.UPDATE_STATIC_PAGE_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_STATIC_PAGE_FAILURE, error };
  }
}

function getSliderList(data) {
  return dispatch => {
    dispatch(request());
    settingService.getSliderList(data).then(
      setting => {
        dispatch(success(setting));
        //dispatch(alertActions.success('Admin fetch'));setting
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.GET_SLIDER_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GET_SLIDER_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GET_SLIDER_FAILURE, error };
  }
}


function addSlider(data) {
  return dispatch => {
    dispatch(request());
    settingService.addSlider(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Added successfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.ADD_SLIDER_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.ADD_SLIDER_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.ADD_SLIDER_FAILURE, error };
  }
}

function udpateSlider(data) {
  return dispatch => {
    dispatch(request());
    settingService.udpateSlider(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success('Updated successfully'));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: settingConstants.UPDATE_SLIDER_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.UPDATE_SLIDER_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_SLIDER_FAILURE, error };
  }
}