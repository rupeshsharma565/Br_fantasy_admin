import { globalConstants } from '../_constants';
import { globalService } from '../_services';
import { alertActions } from './';

export const globalAction = {
  getGlobalList
}
function getGlobalList(data) {
  return dispatch => {
    dispatch(request());
    globalService.getGlobalList(data).then(
      setting => {
        dispatch(success(setting));
        dispatch(alertActions.success(setting[data["secondname"]].msg));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.success(error.msg));
      }
    );
  };
  function request() {
    return {constantreq:data.constantreq,mainstatename:data.mainstatename,typename:data.secondname, type: globalConstants[data.constantreq].GETALL_REQUEST };
  }
  function success(mainstatename) {    
    let mainobj={
      [data.mainstatename]:mainstatename
    };

    return {constantreq:data.constantreq,mainstatename:data.mainstatename,typename:data.secondname, type: globalConstants[data.constantreq].GETALL_SUCCESS,mainobj };
  }
  function failure(error) {
    return {constantreq:data.constantreq,mainstatename:data.mainstatename,typename:data.secondname, type: globalConstants[data.constantreq].GETALL_FAILURE, error };
  }
}

