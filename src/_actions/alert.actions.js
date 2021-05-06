import { alertConstants } from '../_constants';//Raman

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    console.log("messagemessage  ", message);

    let messagetest = message.toString();
    console.log("messagemessage  ", messagetest);

    return { type: alertConstants.ERROR, message: messagetest };
}

function clear() {
    return { type: alertConstants.CLEAR };
}