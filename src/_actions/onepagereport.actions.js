import { onepagereportConstants } from '../_constants';
import { onepagereportService } from '../_services';
import { alertActions } from './';

export const onepagereportActions = {
    onepagereportfilter,
    addSubAdmin,
    deleteSubAdmin,
    getAllResourceList,
    saveAssignResourceSubAdmin,
    getAssignedResourceList,
    udpateStatus,
    getMatchList,
    getContestList,
    getPoolList,
    getOnePageReport,
    getTeamPlayerList,
    getTeamPlayerAll,
    updateTeamPlayer,
    //getOnePageReportExport
};

function onepagereportfilter(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.onepagereportfilter(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: onepagereportConstants.GETALL_FILTER_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_FILTER_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_FILTER_FAILURE, error } }
}
function getMatchList(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.getMatchList(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: onepagereportConstants.GETALL_MATCH_FILTER_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_MATCH_FILTER_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_MATCH_FILTER_FAILURE, error } }
}

function getContestList(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.getContestList(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: onepagereportConstants.GETALL_CONTEST_FILTER_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_CONTEST_FILTER_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_CONTEST_FILTER_FAILURE, error } }
}

function getPoolList(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.getPoolList(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: onepagereportConstants.GETALL_POOL_FILTER_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_POOL_FILTER_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_POOL_FILTER_FAILURE, error } }
}

function getOnePageReport(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.getOnePageReport(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_FAILURE, error } }
}

// function getOnePageReportExport(data) {
//     return dispatch => {
//         dispatch(request());
//         onepagereportService.getOnePageReport(data)
//             .then(
//                 onepagereportsExport => {
//                     dispatch(success(onepagereportsExport))
//                 },
//                 error => {
//                     dispatch(failure(error))
//                 }
//             );
//     };
//     function request() { return { type: onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_REQUEST } }
//     function success(onepagereportsExport) { return { type: onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_SUCCESS, onepagereportsExport } }
//     function failure(error) { return { type: onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_FAILURE, error } }
// }





function addSubAdmin(data) {
    return dispatch => {

        onepagereportService.addSubAdmin(data)
            .then(
                addonepagereport => {
                    dispatch(success(addonepagereport));
                    dispatch(alertActions.success('Subadmin added !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: onepagereportConstants.LOGIN_REQUEST, user } }
    function success(addonepagereport) { return { type: onepagereportConstants.SUB_ADMIN_ADD_SUCCESS, addonepagereport } }
    function failure(error) { return { type: onepagereportConstants.SUB_ADMIN_ADD_FAILURE, error } }
}
function deleteSubAdmin(data) {
    //console.log("Enter into action  ", data);

    return dispatch => {

        onepagereportService.deletesubAdminService(data)
            .then(
                deleteonepagereport => {
                    dispatch(success(deleteonepagereport));
                    dispatch(alertActions.success('Subadmin deleted !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: onepagereportConstants.LOGIN_REQUEST, user } }
    function success(deleteonepagereport) { return { type: onepagereportConstants.SUB_ADMIN_DELETE_SUCCESS, deleteonepagereport } }
    function failure(error) { return { type: onepagereportConstants.SUB_ADMIN_DELETE_FAILURE, error } }
}
function getAllResourceList() {
    return dispatch => {
        // dispatch(request());
        onepagereportService.getAllResourceList()
            .then(
                resources => {
                    dispatch(success(resources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: onepagereportConstants.GETALL_REQUEST } }
    function success(resources) { return { type: onepagereportConstants.GET_RESOUCE_SUCCESS, resources } }
    function failure(error) { return { type: onepagereportConstants.GET_RESOUCE_FAILURE, error } }
}
function getAssignedResourceList(data) {
    return dispatch => {
        // dispatch(request());
        onepagereportService.getAssignedResourceList(data)
            .then(
                assignedresources => {
                    dispatch(success(assignedresources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: onepagereportConstants.GETALL_REQUEST } }
    function success(assignedresources) { return { type: onepagereportConstants.GET_ASSIGNED_RESOUCE_SUCCESS, assignedresources } }
    function failure(error) { return { type: onepagereportConstants.GET_ASSIGNED_RESOUCE_FAILURE, error } }
}
function saveAssignResourceSubAdmin(data) {
    return dispatch => {
        
        onepagereportService.saveAssignResourceSubAdmin(data)
            .then(
                saveassignedresources => {
                    dispatch(success(saveassignedresources));
                    dispatch(alertActions.success(saveassignedresources.updateResource.msg));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: onepagereportConstants.GETALL_REQUEST } }
    function success(saveassignedresources) { return { type: onepagereportConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS, saveassignedresources } }
    function failure(error) { return { type: onepagereportConstants.SAVE_ASSIGNED_RESOUCE_FAILURE, error } }
}
function udpateStatus(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.udpateStatus(data)
            .then(
                updatestatusonepagereport => {
                    dispatch(success(updatestatusonepagereport));
                    dispatch(alertActions.success('Status updated successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: onepagereportConstants.UPDATE_STATUS_REQUEST, user } }
    function success(addonepagereport) { return { type: onepagereportConstants.UPDATE_STATUS_SUCCESS, addonepagereport } }
    function failure(error) { return { type: onepagereportConstants.UPDATE_STATUS_FAILURE, error } }
}


function getTeamPlayerList(data) {
    return dispatch => {
        // dispatch(request());
        onepagereportService.getTeamPlayerList(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: onepagereportConstants.GETALL_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GET_TEAM_PLAYER_LIST_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GET_TEAM_PLAYER_LIST_FAILURE, error } }
}


function getTeamPlayerAll(data) {
    return dispatch => {
        // dispatch(request());
        onepagereportService.getTeamPlayerAll(data)
            .then(
                onepagereports => {
                    dispatch(success(onepagereports));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: onepagereportConstants.GETALL_REQUEST } }
    function success(onepagereports) { return { type: onepagereportConstants.GETALL_TEAM_PLAYER_LIST_SUCCESS, onepagereports } }
    function failure(error) { return { type: onepagereportConstants.GETALL_TEAM_PLAYER_LIST_FAILURE, error } }
}



function updateTeamPlayer(data) {
    return dispatch => {
        dispatch(request());
        onepagereportService.updateTeamPlayer(data)
            .then(
                updateteamplayer => {
                    dispatch(success(updateteamplayer));
                    dispatch(alertActions.success('Team player updated successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: onepagereportConstants.UPDATE_TEAM_PLAYER_REQUEST, user } }
    function success(addonepagereport) { return { type: onepagereportConstants.UPDATE_TEAM_PLAYER_SUCCESS, addonepagereport } }
    function failure(error) { return { type: onepagereportConstants.UPDATE_TEAM_PLAYER_FAILURE, error } }
}

