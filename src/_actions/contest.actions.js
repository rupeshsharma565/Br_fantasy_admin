import { contestConstants } from '../_constants';
import { contestService } from '../_services';


export const contestActions = {
    getAllContest,
    updateContestStatus,
    addContest
};

function getAllContest(data) {
    return dispatch => {
        dispatch(request());
        contestService.getAllContest(data)
            .then(
                contest => {
                    dispatch(success(contest))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: contestConstants.CONTEST_GETALL_REQUEST } }
    function success(contest) { return { type: contestConstants.CONTEST_GETALL_SUCCESS, contest } }
    function failure(error) { return { type: contestConstants.CONTEST_GETALL_FAILURE, error } }
}

function updateContestStatus(data) {
    return dispatch => {
        contestService.updateContestStatus(data)
            .then(
                contest => {
                    dispatch(success(contest))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(contest) { return { type: contestConstants.CONTEST_UPDATE_STATUS_SUCCESS, contest } }
    function failure(error) { return { type: contestConstants.CONTEST_UPDATE_STATUS_FAILURE, error } }
}


function addContest(data) {
    return dispatch => {
        contestService.addContest(data)
            .then(
                contest => {
                    dispatch(success(contest))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(contest) { return { type: contestConstants.CONTEST_ADD_STATUS_SUCCESS, contest } }
    function failure(error) { return { type: contestConstants.CONTEST_ADD_STATUS_FAILURE, error } }
}