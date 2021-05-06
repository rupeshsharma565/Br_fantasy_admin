import { paymentConstants } from '../_constants';

export function payment(state = {}, action) {
  // console.log("action.typeaction.typeaction.type  ", action);

  switch (action.type) {
    case paymentConstants.BANK_GETALL_REQUEST:
      return {
        loading: true
      };
    case paymentConstants.BANK_GETALL_SUCCESS:
      return {
        bankList: action.payments.listOfPayments.list,
        bankTotal: action.payments.listOfPayments.total
      };
    case paymentConstants.BANK_GETALL_FAILURE:
      return {
        error: action.error
      };

    case paymentConstants.PANCARD_GETALL_REQUEST:
      return {
        loading: true
      };
    case paymentConstants.PANCARD_GETALL_SUCCESS:
      return {
        pancardList: action.payments.listOfPancard.list,
        pancardTotal: action.payments.listOfPancard.total
      };
    case paymentConstants.PANCARD_GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}