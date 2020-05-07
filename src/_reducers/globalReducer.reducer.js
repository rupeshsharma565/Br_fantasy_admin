import { globalConstants } from '../_constants';

export function globalReducer(state = {}, action) {
 if(action.type && action.constantreq){
  switch (action.type) {
    case globalConstants[action.constantreq].GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case globalConstants[action.constantreq].GETALL_SUCCESS:
      return {
        ...state,
        [action.typename]:action.mainobj[action.mainstatename][action.typename],
      };
    case globalConstants[action.constantreq].GETALL_FAILURE:
      return {
        ...state,
        [action.typename]: action.error
        //[action.typename]:action.mainobj[action.mainstatename][action.typename],
      };
    default:
      return state;
  }
}
else{
  switch (action.type) {
    default:
      return state;
  }
}
}
