import { withdrawConstants } from '../_constants';

export function withdraw(state = {}, action) {
   //console.log("action.typeaction.typeaction.type  ", action.withdraw);

  switch (action.type) {
    case withdrawConstants.GETALL_WITHDRAW_REQUEST:
      return {
        loading: true,
        items:state.items,
      };
    case withdrawConstants.GETALL_WITHDRAW_SUCCESS:
      return {
        items: action.withdraw.listOfWithdraws.list,
        total: action.withdraw.listOfWithdraws.total,
      };
    case withdrawConstants.GETALL_WITHDRAW_FAILURE:
      return {
        loading: false,
        error: action.error
      };

    case withdrawConstants.UPDATE_STATUS_WITHDRAW_REQUEST:
      return {
        loading: true,
        items:state.items,
        total:state.total,
      };
    case withdrawConstants.UPDATE_STATUS_WITHDRAW_SUCCESS:
      return {
        isUpdate: true,
        items: state.items,
        total:state.total,
      };
    case withdrawConstants.UPDATE_STATUS_WITHDRAW_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}