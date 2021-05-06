import { privateContest } from '../_constants';
import { privateContestService } from '../_services';
import { alertActions } from '.';

export const privateContestActions = {
    getAllPrivateContest,updatePrivateContest
};

function getAllPrivateContest(data) {
    return dispatch => {
        dispatch(request());
        privateContestService.getAllPrivateContest(data)
            .then(
                    privatecnst => {
                    dispatch(success(privatecnst))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: privateContest.GETALL_PRIVATECONTEST_REQUEST } }
    function success(privatecnst) { return { type: privateContest.GETALL_PRIVATECONTEST_SUCCESS, privatecnst } }
    function failure(error) { return { type: privateContest.GETALL_PRIVATECONTEST_FAILURE, error } }
}

function updatePrivateContest(data) {
    return dispatch => {
        dispatch(request());
       /* if(data.pc_val_type=='perval' && data.pc_val>100){
            dispatch(alertActions.success("Please enter code value less then 100 percentage"));
        } */
        privateContestService.updatePrivateContest(data)
            .then(
                privatecnst => {
                  //  console.log("rewards----->>>",rewards);
                    dispatch(success(privatecnst))
                    dispatch(alertActions.success(privatecnst.msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: privateContest.UPDATE_PRIVATECONTEST_REQUEST } }
    function success(privatecnst) { return { type: privateContest.UPDATE_PRIVATECONTEST_SUCCESS, privatecnst } }
    function failure(error) { return { type: privateContest.UPDATE_PRIVATECONTEST_FAILURE, error } }
}