import { promocodeConstants } from '../_constants';
import { promocodeService } from '../_services';
import { alertActions } from '.';

export const promocodeActions = {
    getAllPromocode,updatePromocode,getAllPromocodeSettings,
};

function getAllPromocode(data) {
    return dispatch => {
        dispatch(request());
        promocodeService.getAllPromocode(data)
            .then(
                promocode => {
                    dispatch(success(promocode))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: promocodeConstants.GETALL_PROMOCODE_REQUEST } }
    function success(promocode) { return { type: promocodeConstants.GETALL_PROMOCODE_SUCCESS, promocode } }
    function failure(error) { return { type: promocodeConstants.GETALL_PROMOCODE_FAILURE, error } }
}

function getAllPromocodeSettings(data) {
    return dispatch => {
        dispatch(request());
        promocodeService.getAllPromocodeSettings(data)
            .then(
                promocode => {
                    dispatch(success(promocode))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: promocodeConstants.PROMOCODE_SETTINGS_REQUEST } }
    function success(promocode) { return { type: promocodeConstants.PROMOCODE_SETTINGS_SUCCESS, promocode } }
    function failure(error) { return { type: promocodeConstants.PROMOCODE_SETTINGS_FAILURE, error } }
}

function updatePromocode(data) {
    return dispatch => {
        dispatch(request());
       /* if(data.pc_val_type=='perval' && data.pc_val>100){
            dispatch(alertActions.success("Please enter code value less then 100 percentage"));
        } */
        promocodeService.updatePromocode(data)
            .then(
                promocode => {
                  //  console.log("rewards----->>>",rewards);
                    dispatch(success(promocode))
                    dispatch(alertActions.success(promocode.msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: promocodeConstants.UPDATE_STATUS_PROMOCODE_REQUEST } }
    function success(promocode) { return { type: promocodeConstants.UPDATE_STATUS_PROMOCODE_SUCCESS, promocode } }
    function failure(error) { return { type: promocodeConstants.UPDATE_STATUS_PROMOCODE_FAILURE, error } }
}