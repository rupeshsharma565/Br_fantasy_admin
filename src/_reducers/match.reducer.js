import { matchConstants } from '../_constants';

export function match(state = {}, action) {
  // console.log('action.1111 ', action);

  switch (action.type) {
    case matchConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case matchConstants.GETALL_SUCCESS:
      return {
        items: action.matches.listOfMatches1,
        total: 44
      };

    case matchConstants.GETALL_SUCCESS_TEAM:
      return {
        items: action.matches.addteamres,
        total: 87
      };

    case matchConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case matchConstants.TEAM_REQUEST:
      return {
        loading: true
      };
    case matchConstants.TEAM_ADD_SUCCESS:
      return {
        ...state,
        teamAdded: true
      };
    case matchConstants.TEAM_ADD_FAILURE:
      return {
        error: action.error
      };

    case matchConstants.TEAM_GET_SUCCESS:
      return {
        teamList: action
      };
    case matchConstants.TEAM_GET_FAILURE:
      return {
        error: action.error
      };

    case matchConstants.SUB_ADMIN_ADD_SUCCESS:
      return {
        ...state,
        isAdminAdded: true
      };

    case matchConstants.SUB_ADMIN_ADD_FAILURE:
      return {
        ...state
      };
    case matchConstants.SUB_ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        isAdminDeleted: true
      };
    case matchConstants.SUB_ADMIN_DELETE_FAILURE:
      return {
        ...state
      };

    case matchConstants.GET_RESOUCE_SUCCESS:
      return {
        ...state,
        listOfResource: action.resources.listOfResource
      };
    case matchConstants.GET_RESOUCE_FAILURE:
      return {
        error: action.error
      };

    case matchConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS:
      return {
        ...state,
        isAssignedResource: true
      };
    case matchConstants.SAVE_ASSIGNED_RESOUCE_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
