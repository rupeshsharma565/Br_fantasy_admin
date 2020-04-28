import { subadminConstants } from '../_constants';

export function subadmin(state = {}, action) {
  // console.log("action.typeaction.typeaction.type  ", action);

  switch (action.type) {
    case subadminConstants.GETALL_REQUEST:
      return {
        loading: true,
        items:state.items,
        listOfResource: state.listOfResource,
        total:state.total
      };
    case subadminConstants.GETALL_SUCCESS:
      return {
        items: action.subadmins.listOfSubAdmins.list,
        listOfResource: state.listOfResource,
        total: action.subadmins.listOfSubAdmins.total
      };
    case subadminConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case subadminConstants.SUB_ADMIN_ADD_SUCCESS:
      return {
        ...state, isAdminAdded: true
      };

    case subadminConstants.SUB_ADMIN_ADD_FAILURE:
      return {
        ...state
      };
    case subadminConstants.SUB_ADMIN_DELETE_SUCCESS:
      return {
        ...state, isAdminDeleted: true
      };
    case subadminConstants.SUB_ADMIN_DELETE_FAILURE:
      return {
        ...state
      };

    case subadminConstants.GET_RESOUCE_SUCCESS:
      return {
         
        listOfResource: action.resources.listOfResource,
        items: state.items,
        total: state.total,
        
      };
    case subadminConstants.GET_RESOUCE_FAILURE:
      return {
        error: action.error
      };

    case subadminConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS:
      return {
        ...state, isAssignedResource: true
      };
    case subadminConstants.SAVE_ASSIGNED_RESOUCE_FAILURE:
      return {
        ...state
      };
      case subadminConstants.GET_ASSIGNED_RESOUCE_SUCCESS:
      return {
        listOfAssignedResource: action.assignedresources.listOfAssignedResource,
        items: state.items,
        total: state.total
      };
    case subadminConstants.GET_ASSIGNED_RESOUCE_FAILURE:
      return {
        //error: action.error,
        listOfAssignedResource:[],
        items: state.items,
        total: state.total,
      };

    case subadminConstants.UPDATE_STATUS_REQUEST:
      return {
        loading: true,
        items:state.items,
        listOfResource: state.listOfResource,
        total:state.total
      };
    case subadminConstants.UPDATE_STATUS_SUCCESS:
      return {
        isStatusUpdated:true,
        items:state.items,
        listOfResource: state.listOfResource,
        total: state.total
      };
    case subadminConstants.UPDATE_STATUS_FAILURE:
      return {
        error: action.error,
        items:state.items,
        listOfResource: state.listOfResource,
        total:state.total
      };

      case subadminConstants.GET_SELMENU_REQUEST:
      return {
        loading: false,
        items:state.items,
        listOfResource: state.listOfResource,
        total:state.total,
        getselmenu:state.getselmenu
      };
    case subadminConstants.GET_SELMENU_SUCCESS:
      return {
        loading:false,
        items:state.items,
        listOfResource: state.listOfResource,
        total: state.total,
        getselmenu: action.getsubmenu.getselmenu
      };
    case subadminConstants.GET_SELMENU_FAILURE:
      return {
        loading:false,
        error: action.error,
        items:state.items,
        listOfResource: state.listOfResource,
        total:state.total,
        getselmenu:state.getselmenu
      };


    default:
      return state
  }
}