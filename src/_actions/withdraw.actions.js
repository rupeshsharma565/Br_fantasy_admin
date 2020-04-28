import { withdrawConstants } from '../_constants';
import { withdrawService } from '../_services';
import { alertActions } from './';

export const withdrawActions = {
    getAllWithdraw,
    updateWithdraw
};

function getAllWithdraw(data) {
    return dispatch => {
        dispatch(request());
        withdrawService.getAllWithdraw(data)
            .then(
                withdraw => {
                    dispatch(success(withdraw))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: withdrawConstants.GETALL_WITHDRAW_REQUEST } }
    function success(withdraw) { return { type: withdrawConstants.GETALL_WITHDRAW_SUCCESS, withdraw } }
    function failure(error) { return { type: withdrawConstants.GETALL_WITHDRAW_FAILURE, error } }
}

function updateWithdraw(data) {
    return dispatch => {
        dispatch(request());
        withdrawService.updateWithdraw(data)
            .then(
                withdraw => {
                    dispatch(success(withdraw))
                    dispatch(alertActions.success('Paid Successfully'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: withdrawConstants.UPDATE_STATUS_WITHDRAW_REQUEST } }
    function success(withdraw) { return { type: withdrawConstants.UPDATE_STATUS_WITHDRAW_SUCCESS, withdraw } }
    function failure(error) { return { type: withdrawConstants.UPDATE_STATUS_WITHDRAW_FAILURE, error } }
}