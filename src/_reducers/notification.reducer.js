import { notificationConstants } from '../_constants';

export function notification(state = {}, action) {
  //console.log("action.typeaction.typeaction.type  ", action); 

  switch (action.type) {

    case notificationConstants.GET_NOTE_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case notificationConstants.GET_NOTE_LIST_SUCCESS:
      return {
        notificnlist:action.notificnlist
      };
    case notificationConstants.GET_NOTE_LIST_FAILURE:
      return {
        error: action.error
      };

    case notificationConstants.GET_NOTE_DETAIL_REQUEST:
      return {
        loading: true
      };
    case notificationConstants.GET_NOTE_DETAIL_SUCCESS:
      return {
        ...state,
        ...action.setting
      };
    case notificationConstants.GET_NOTE_DETAIL_FAILURE:
      return {
        error: action.error
      };

    case notificationConstants.ADD_SUCCESS:
      return {
        ...state,
        settindAdded: true
      };
    case notificationConstants.ADD_FAILURE:
      return {
        error: action.error
      };

    case notificationConstants.UPDATE_SUCCESS:
      return {
        ...state,
        settindUpdated: true
      };
    case notificationConstants.UPDATE_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
}
