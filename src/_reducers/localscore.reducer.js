import { localscoreConstants } from '../_constants';

export function localscore(state = {}, action) {
  // console.log("action.typeaction.typeaction.type  ", action);

  switch (action.type) {
    case localscoreConstants.GETALL_CRICKET_SCORE_REQUEST:
      return {
        loading: true,
      };
    case localscoreConstants.GETALL_CRICKET_SCORE_SUCCESS:
      return {
        listPlayers: state.listPlayers,
        localmatchlist: state.localmatchlist,
        loading: false,
        liveData: action.localscores.liveData,
        localmatchdetail: state.localmatchdetail
      };
    case localscoreConstants.GETALL_CRICKET_SCORE_FAILURE:
      return {
        loading: false,
        error: action.error
      };

      case localscoreConstants.GETALL_PLAYER_LIST_REQUEST:
      return {
        loading: true,
      };
    case localscoreConstants.GETALL_PLAYER_LIST_SUCCESS:
      return {
        loading: false,
        liveData: state.liveData,
        listPlayers: action.localscores.listPlayers,
        localmatchlist: state.localmatchlist,
        localmatchdetail: state.localmatchdetail
      };
    case localscoreConstants.GETALL_PLAYER_LIST_FAILURE:
      return {
        loading: false,
        error: action.error
      };

      case localscoreConstants.GETALL_LOCAL_MATCH_LIST_REQUEST:
      return {
        loading: true,
      };
    case localscoreConstants.GETALL_LOCAL_MATCH_LIST_SUCCESS:
      return {
        loading: false,
        localmatchlist: action.localscores.localmatchlist,
        listPlayers: state.listPlayers,
        liveData: state.liveData,
        localmatchdetail: state.localmatchdetail
      };
    case localscoreConstants.GETALL_LOCAL_MATCH_LIST_FAILURE:
      return {
        loading: false,
        error: action.error
      };


      case localscoreConstants.UPDATE_SCORE_STATUS_REQUEST:
      return {
        loading: true,
      };
    case localscoreConstants.UPDATE_SCORE_STATUS_SUCCESS:
      return {
        listPlayers: state.listPlayers,
        localmatchlist: state.localmatchlist,
        liveData: state.liveData,
        localmatchdetail: state.localmatchdetail,
        loading: false,
        //savescore: action.localscores.savescore
      };
    case localscoreConstants.UPDATE_SCORE_STATUS_FAILURE:
      return {
        loading: false,
        error: action.error
      };

      case localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_REQUEST:
      return {
        loading: true,
      };
    case localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_SUCCESS:
      return {
        listPlayers: state.listPlayers,
        localmatchlist: state.localmatchlist,
        liveData: state.liveData,
        loading: false,
        localmatchdetail: action.localscores.localmatchdetail
      };
    case localscoreConstants.GET_LOCAL_MATCHDETAIL_STATUS_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}