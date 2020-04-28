import { dashboardConstants } from '../_constants';
import { dashboardService } from '../_services';
import { alertActions } from './';

export const dashboardActions = {
    getAllStaticCount,
    adddashboard,
    deletedashboard,
    getAllResourceList,
    saveAssignResourcedashboard,
    getAssignedResourceList,
    udpateStatus
};

function getAllStaticCount(data) {
    return dispatch => {
        dispatch(request());
        dashboardService.getAllStaticCount(data)
            .then(
                dashboards => {
                    dispatch(success(dashboards))
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: dashboardConstants.GETALL_DASHBOARD_REQUEST } }
    function success(dashboards) { return { type: dashboardConstants.GETALL_DASHBOARD_SUCCESS, dashboards } }
    function failure(error) { return { type: dashboardConstants.GETALL_DASHBOARD_FAILURE, error } }
}
function adddashboard(data) {
    return dispatch => {

        dashboardService.adddashboard(data)
            .then(
                adddashboard => {
                    dispatch(success(adddashboard));
                    dispatch(alertActions.success('dashboard added !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: dashboardConstants.LOGIN_REQUEST, user } }
    function success(adddashboard) { return { type: dashboardConstants.SUB_ADMIN_ADD_SUCCESS, adddashboard } }
    function failure(error) { return { type: dashboardConstants.SUB_ADMIN_ADD_FAILURE, error } }
}
function deletedashboard(data) {
    //console.log("Enter into action  ", data);

    return dispatch => {

        dashboardService.deletedashboardService(data)
            .then(
                deletedashboard => {
                    dispatch(success(deletedashboard));
                    dispatch(alertActions.success('dashboard deleted !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: dashboardConstants.LOGIN_REQUEST, user } }
    function success(deletedashboard) { return { type: dashboardConstants.SUB_ADMIN_DELETE_SUCCESS, deletedashboard } }
    function failure(error) { return { type: dashboardConstants.SUB_ADMIN_DELETE_FAILURE, error } }
}
function getAllResourceList() {
    return dispatch => {
        // dispatch(request());
        dashboardService.getAllResourceList()
            .then(
                resources => {
                    dispatch(success(resources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: dashboardConstants.GETALL_REQUEST } }
    function success(resources) { return { type: dashboardConstants.GET_RESOUCE_SUCCESS, resources } }
    function failure(error) { return { type: dashboardConstants.GET_RESOUCE_FAILURE, error } }
}
function getAssignedResourceList(data) {
    return dispatch => {
        // dispatch(request());
        dashboardService.getAssignedResourceList(data)
            .then(
                assignedresources => {
                    dispatch(success(assignedresources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: dashboardConstants.GETALL_REQUEST } }
    function success(assignedresources) { return { type: dashboardConstants.GET_ASSIGNED_RESOUCE_SUCCESS, assignedresources } }
    function failure(error) { return { type: dashboardConstants.GET_ASSIGNED_RESOUCE_FAILURE, error } }
}
function saveAssignResourcedashboard(data) {
    return dispatch => {
        
        dashboardService.saveAssignResourcedashboard(data)
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
    // function request() { return { type: dashboardConstants.GETALL_REQUEST } }
    function success(saveassignedresources) { return { type: dashboardConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS, saveassignedresources } }
    function failure(error) { return { type: dashboardConstants.SAVE_ASSIGNED_RESOUCE_FAILURE, error } }
}
function udpateStatus(data) {
    return dispatch => {
        dispatch(request());
        dashboardService.udpateStatus(data)
            .then(
                updatestatusdashboard => {
                    dispatch(success(updatestatusdashboard));
                    dispatch(alertActions.success('Status updated successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: dashboardConstants.UPDATE_STATUS_REQUEST, user } }
    function success(adddashboard) { return { type: dashboardConstants.UPDATE_STATUS_SUCCESS, adddashboard } }
    function failure(error) { return { type: dashboardConstants.UPDATE_STATUS_FAILURE, error } }
}