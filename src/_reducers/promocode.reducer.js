import { promocodeConstants } from '../_constants';

export function promocode(state = {}, action) {
   
  switch (action.type) {
    case promocodeConstants.GETALL_PROMOCODE_REQUEST:
      return {
        loading: true,
        items:state.items,
      };
    case promocodeConstants.GETALL_PROMOCODE_SUCCESS:
      return {
       ...state, items: action.promocode.listOfPromocode,
      };
    case promocodeConstants.GETALL_PROMOCODE_FAILURE:
      return {
        loading: false,
        error: action.error
      };
     

    case promocodeConstants.UPDATE_STATUS_PROMOCODE_REQUEST:
      return {
        loading: true,
        items:state.items,
      };
    case promocodeConstants.UPDATE_STATUS_PROMOCODE_SUCCESS:
      return {
       ...state, isUpdate: true,
        items: state.items,
      };
    case promocodeConstants.UPDATE_STATUS_PROMOCODE_FAILURE:
      return {
        loading: false,
        error: action.error
      };


      case promocodeConstants.PROMOCODE_SETTINGS_REQUEST:
      return {
        loading: true,
        paymenttype:state.items,
      };
    case promocodeConstants.PROMOCODE_SETTINGS_SUCCESS:
      return {
       ...state, paymenttype: action.promocode.paymenttype,
      };
    case promocodeConstants.PROMOCODE_SETTINGS_FAILURE:
      return {
        loading: false,
        error: action.error
      };

    default:
      return state
  }
}