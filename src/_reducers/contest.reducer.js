import { contestConstants } from '../_constants';

export function contest(state = {}, action) {
  // console.log("action.typeaction.typeaction.type  ", action);

  switch (action.type) {
    case contestConstants.CONTEST_GETALL_REQUEST:
      return {
        loading: true
      };
    case contestConstants.CONTEST_GETALL_SUCCESS:
      return {
        items: action.contest.listOfContests
      };
    case contestConstants.CONTEST_GETALL_FAILURE:
      return {
        error: action.error
      };

    case contestConstants.CONTEST_UPDATE_STATUS_SUCCESS:
      return {
        ...state, isStatusUpdated: true
      };
    case contestConstants.CONTEST_UPDATE_STATUS_FAILURE:
      return {
        error: action.error
      };

    case contestConstants.CONTEST_ADD_STATUS_SUCCESS:
      return {
        ...state, isContenstAdded: true
      };
    case contestConstants.CONTEST_ADD_STATUS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}