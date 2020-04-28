import { rewardsConstants } from '../_constants';
import { rewardsService } from '../_services';
import { alertActions } from '.';

export const rewardsActions = {
    getAllRewards,updateRewards,getAllRewardsSettings,getAllLevels,updateLevels,
};

function getAllRewards(data) {
    return dispatch => {
        dispatch(request());
        rewardsService.getAllRewards(data)
            .then(
                rewards => {
                    dispatch(success(rewards))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: rewardsConstants.GETALL_REWARDS_REQUEST } }
    function success(rewards) { return { type: rewardsConstants.GETALL_REWARDS_SUCCESS, rewards } }
    function failure(error) { return { type: rewardsConstants.GETALL_REWARDS_FAILURE, error } }
}

function getAllRewardsSettings(data) {
    return dispatch => {
        dispatch(request());
        rewardsService.getAllRewardsSettings(data)
            .then(
                rewards => {
                    dispatch(success(rewards))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: rewardsConstants.REWARDS_SETTINGS_REQUEST } }
    function success(rewards) { return { type: rewardsConstants.REWARDS_SETTINGS_SUCCESS, rewards } }
    function failure(error) { return { type: rewardsConstants.REWARDS_SETTINGS_FAILURE, error } }
}

function updateRewards(data) {
    return dispatch => {
        dispatch(request());
        rewardsService.updateRewards(data)
            .then(
                rewards => {
                 //   console.log("rewards----->>>",rewards);
                    dispatch(success(rewards))
                    dispatch(alertActions.success(rewards.msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: rewardsConstants.UPDATE_STATUS_REWARDS_REQUEST } }
    function success(rewards) { return { type: rewardsConstants.UPDATE_STATUS_REWARDS_SUCCESS, rewards } }
    function failure(error) { return { type: rewardsConstants.UPDATE_STATUS_REWARDS_FAILURE, error } }
}


function getAllLevels(data) {
    return dispatch => {
        dispatch(request());
        rewardsService.getAllLevels(data)
            .then(
                bnsLevels => {
                    dispatch(success(bnsLevels))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: rewardsConstants.GETALL_LEVELS_REQUEST } }
    function success(bnsLevels) { return { type: rewardsConstants.GETALL_LEVELS_SUCCESS, bnsLevels } }
    function failure(error) { return { type: rewardsConstants.GETALL_LEVELS_FAILURE, error } }
}

function updateLevels(data) { 
    console.log("send data" ,data);
    return dispatch => {
        dispatch(request());

        rewardsService.updateLevels(data)
            .then(
                bnsLevels => {
                    console.log("bnsLevels----->>>",bnsLevels);
                    dispatch(success(bnsLevels))
                    dispatch(alertActions.success(bnsLevels.msg));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request() { return { type: rewardsConstants.UPDATE_STATUS_LEVELS_REQUEST } }
    function success(bnsLevels) { return { type: rewardsConstants.UPDATE_STATUS_LEVELS_SUCCESS, bnsLevels } }
    function failure(error) { return { type: rewardsConstants.UPDATE_STATUS_LEVELS_FAILURE, error } }
}