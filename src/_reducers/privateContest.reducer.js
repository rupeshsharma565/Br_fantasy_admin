import { privateContest } from '../_constants';

export function privatecnst(state = {}, action) {
   
  switch (action.type) {
    case privateContest.GETALL_PRIVATECONTEST_REQUEST:
      return {
        isLoading: true,
        items:state.items,
      };
    case privateContest.GETALL_PRIVATECONTEST_SUCCESS:
      return {
       ...state, items: action.privatecnst.listOfPrivateContest,isLoading: false,
      };
    case privateContest.GETALL_PRIVATECONTEST_FAILURE:
      return {
        isLoading: false,
        error: action.error
      };
     

    case privateContest.UPDATE_PRIVATECONTEST_REQUEST:
      return {
        isLoading: true,
        items:state.items,
      };
    case privateContest.UPDATE_PRIVATECONTEST_SUCCESS:
      return {
       ...state, isUpdate: false,
        items: state.items,
      };
    case privateContest.UPDATE_PRIVATECONTEST_FAILURE:
      return {
        isLoading: false,
        error: action.error
      };

    default:
      return state
  }
}