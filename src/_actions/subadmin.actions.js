import { subadminConstants } from '../_constants';
import { subadminService } from '../_services';
import { alertActions } from './';

export const subadminActions = {
    getAllSubAdmin,
    addSubAdmin,
    deleteSubAdmin,
    getAllResourceList,
    saveAssignResourceSubAdmin,
    getAssignedResourceList,
    udpateStatus,
    getSelectedSubMenu
};

function getAllSubAdmin(data) {
    return dispatch => {
        dispatch(request());
        subadminService.getAllSubAdmin(data)
            .then(
                subadmins => {
                    dispatch(success(subadmins))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: subadminConstants.GETALL_REQUEST } }
    function success(subadmins) { return { type: subadminConstants.GETALL_SUCCESS, subadmins } }
    function failure(error) { return { type: subadminConstants.GETALL_FAILURE, error } }
}
function addSubAdmin(data) {
    return dispatch => {

        subadminService.addSubAdmin(data)
            .then(
                addsubadmin => {
                    dispatch(success(addsubadmin));
                    dispatch(alertActions.success('Subadmin added !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: subadminConstants.LOGIN_REQUEST, user } }
    function success(addsubadmin) { return { type: subadminConstants.SUB_ADMIN_ADD_SUCCESS, addsubadmin } }
    function failure(error) { return { type: subadminConstants.SUB_ADMIN_ADD_FAILURE, error } }
}
function deleteSubAdmin(data) {
    //console.log("Enter into action  ", data);

    return dispatch => {

        subadminService.deletesubAdminService(data)
            .then(
                deletesubadmin => {
                    dispatch(success(deletesubadmin));
                    dispatch(alertActions.success('Subadmin deleted !'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    //function request(user) { return { type: subadminConstants.LOGIN_REQUEST, user } }
    function success(deletesubadmin) { return { type: subadminConstants.SUB_ADMIN_DELETE_SUCCESS, deletesubadmin } }
    function failure(error) { return { type: subadminConstants.SUB_ADMIN_DELETE_FAILURE, error } }
}
function getAllResourceList() {
    return dispatch => {
        // dispatch(request());
        subadminService.getAllResourceList()
            .then(
                resources => {
                    dispatch(success(resources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: subadminConstants.GETALL_REQUEST } }
    function success(resources) { return { type: subadminConstants.GET_RESOUCE_SUCCESS, resources } }
    function failure(error) { return { type: subadminConstants.GET_RESOUCE_FAILURE, error } }
}
function getAssignedResourceList(data) {
    return dispatch => {
        // dispatch(request());
        subadminService.getAssignedResourceList(data)
            .then(
                assignedresources => {
                    dispatch(success(assignedresources));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    // function request() { return { type: subadminConstants.GETALL_REQUEST } }
    function success(assignedresources) { return { type: subadminConstants.GET_ASSIGNED_RESOUCE_SUCCESS, assignedresources } }
    function failure(error) { return { type: subadminConstants.GET_ASSIGNED_RESOUCE_FAILURE, error } }
}
function saveAssignResourceSubAdmin(data) {
    return dispatch => {
        
        subadminService.saveAssignResourceSubAdmin(data)
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
    // function request() { return { type: subadminConstants.GETALL_REQUEST } }
    function success(saveassignedresources) { return { type: subadminConstants.SAVE_ASSIGNED_RESOUCE_SUCCESS, saveassignedresources } }
    function failure(error) { return { type: subadminConstants.SAVE_ASSIGNED_RESOUCE_FAILURE, error } }
}
function udpateStatus(data) {
    return dispatch => {
        dispatch(request());
        subadminService.udpateStatus(data)
            .then(
                updatestatussubadmin => {
                    dispatch(success(updatestatussubadmin));
                    dispatch(alertActions.success('Status updated successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: subadminConstants.UPDATE_STATUS_REQUEST, user } }
    function success(addsubadmin) { return { type: subadminConstants.UPDATE_STATUS_SUCCESS, addsubadmin } }
    function failure(error) { return { type: subadminConstants.UPDATE_STATUS_FAILURE, error } }
}


function getSelectedSubMenu(data) {
    return dispatch => {
        dispatch(request());
        subadminService.getSelectedSubMenu(data)
            .then(
                getsubmenu => {
                    dispatch(success(getsubmenu))
                    //dispatch(alertActions.success('Admin fetch'));
                },
                error => {
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: subadminConstants.GET_SELMENU_REQUEST } }
    function success(getsubmenu) { return { type: subadminConstants.GET_SELMENU_SUCCESS, getsubmenu } }
    function failure(error) { return { type: subadminConstants.GET_SELMENU_FAILURE, error } }
}