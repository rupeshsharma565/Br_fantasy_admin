import { localscoreConstants } from '../_constants';
import { localscoreService } from '../_services';
import { alertActions } from '.';

export const localscoreActions = {
    getLocalMatchList,
    getAllLocalScore,
    getPlayerList,
    addLocalScore,
    getmatchdetail
};

function getAllLocalScore(data) {
    return dispatch => {
        dispatch(request());
        localscoreService.getAllLocalScore(data)
            .then(
                localscores => {
                    dispatch(success(localscores))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: localscoreConstants.GETALL_CRICKET_SCORE_REQUEST } }
    function success(localscores) { return { type: localscoreConstants.GETALL_CRICKET_SCORE_SUCCESS, localscores } }
    function failure(error) { return { type: localscoreConstants.GETALL_CRICKET_SCORE_FAILURE, error } }
}


function getLocalMatchList() {
    return dispatch => {
        dispatch(request());
        localscoreService.getLocalMatchList()
            .then(
                localscores => {
                    dispatch(success(localscores))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: localscoreConstants.GETALL_LOCAL_MATCH_LIST_REQUEST } }
    function success(localscores) { return { type: localscoreConstants.GETALL_LOCAL_MATCH_LIST_SUCCESS, localscores } }
    function failure(error) { return { type: localscoreConstants.GETALL_LOCAL_MATCH_LIST_FAILURE, error } }
}


function getPlayerList(data) {
    return dispatch => {
        dispatch(request());
        localscoreService.getPlayerList(data)
            .then(
                localscores => {
                    dispatch(success(localscores))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: localscoreConstants.GETALL_PLAYER_LIST_REQUEST } }
    function success(localscores) { return { type: localscoreConstants.GETALL_PLAYER_LIST_SUCCESS, localscores } }
    function failure(error) { return { type: localscoreConstants.GETALL_PLAYER_LIST_FAILURE, error } }
}

function addLocalScore(matchid,matchtype,matchlist) {
    return dispatch => {

        localscoreService.addLocalScore(matchid,matchtype,matchlist)
            .then(
                addlocalscore => {
                    dispatch(success(addlocalscore));
                    dispatch(alertActions.success('Score update !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: localscoreConstants.LOGIN_REQUEST, user } }
    function success(addlocalscore) { return { type: localscoreConstants.UPDATE_SCORE_STATUS_SUCCESS, addlocalscore } }
    function failure(error) { return { type: localscoreConstants.UPDATE_SCORE_STATUS_FAILURE, error } }
}


function getmatchdetail(matchid) {
    return dispatch => {
        dispatch(request());
        localscoreService.getmatchdetail(matchid)
            .then(
                localscores => {
                    dispatch(success(localscores))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_REQUEST } }
    function success(localscores) { return { type: localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_SUCCESS, localscores } }
    function failure(error) { return { type: localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_FAILURE, error } }
}
