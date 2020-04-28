import { teamConstants } from '../_constants';
import { teamService } from '../_services';
import { alertActions } from '.';

export const teamActions = {
    uploadPlayerImage,
    addPlayer,
    getPlayerList,
    getCountryList,
    getRoleList
};
function getPlayerList(data) {
    return dispatch => {
        dispatch(request());
        teamService.getPlayerList(data)
            .then(
                players => {
                    dispatch(success(players))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: teamConstants.PLAYER_GET_REQUEST } }
    function success(players) { return { type: teamConstants.PLAYER_GET_SUCCESS, players } }
    function failure(error) { return { type: teamConstants.PLAYER_GET_FAILURE, error } }
}
function addPlayer(data) {
    return dispatch => {

        teamService.addPlayer(data)
            .then(
                addplayerres => {
                    dispatch(success(addplayerres));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function success(addplayerres) { return { type: teamConstants.PLAYER_ADD_SUCCESS, addplayerres } }
    function failure(error) { return { type: teamConstants.PLAYER_ADD_FAILURE, error } }
}
function uploadPlayerImage(formData) {
    return dispatch => {

        let response = teamService.uploadPlayerImg(formData)
            .then(
                data => {
                    dispatch(success(data));
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            ).catch(function (error) {
                console.log("errora asdfasdf", error);
            });

        ;
        console.log("responseresponseresponseresponse  ", response);

    };
    function success(data) { return { type: teamConstants.PLAYER_IMAGE_UPLOAD_SUCCESS, data } }
    function failure(error) { return { type: teamConstants.PLAYER_IMAGE_UPLOAD_FAILURE, error } }
}
function getCountryList() {
    return dispatch => {
        teamService.getCountryList()
            .then(
                countries => {
                    dispatch(success(countries))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(countries) { return { type: teamConstants.GET_COUNTRY_SUCCESS, countries } }
    function failure(error) { return { type: teamConstants.GET_COUNTRY_FAILURE, error } }
}
function getRoleList() {
    return dispatch => {
        teamService.getRoleList()
            .then(
                playerroles => {
                    dispatch(success(playerroles))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function success(playerroles) { return { type: teamConstants.GET_ROLES_SUCCESS, playerroles } }
    function failure(error) { return { type: teamConstants.GET_ROLES_FAILURE, error } }
}