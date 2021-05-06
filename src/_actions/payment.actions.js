import { paymentConstants } from '../_constants';
import { paymentService } from '../_services';
//import { alertActions } from './';

export const paymentActions = {
    getBankDetails,
    getPanCardDetails
};
function getBankDetails(data) {
    return dispatch => {
        dispatch(request());
        paymentService.getBankDetails(data)
            .then(
                payments => {
                    dispatch(success(payments))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: paymentConstants.BANK_GETALL_REQUEST } }
    function success(payments) { return { type: paymentConstants.BANK_GETALL_SUCCESS, payments } }
    function failure(error) { return { type: paymentConstants.BANK_GETALL_FAILURE, error } }
}
function getPanCardDetails(data) {
    return dispatch => {
        dispatch(request());
        paymentService.getPanCardDetails(data)
            .then(
                payments => {
                    dispatch(success(payments))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: paymentConstants.PANCARD_GETALL_REQUEST } }
    function success(payments) { return { type: paymentConstants.PANCARD_GETALL_SUCCESS, payments } }
    function failure(error) { return { type: paymentConstants.PANCARD_GETALL_FAILURE, error } }
}