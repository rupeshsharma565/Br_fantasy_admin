import { onepagereportConstants } from '../_constants';

export function onepagereport(state = {}, action) {
   //console.log("action.typeaction.typeaction.type  ", action);

  switch (action.type) {
    case onepagereportConstants.GETALL_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
      };
    case onepagereportConstants.GETALL_FILTER_SUCCESS:
      return {
         filters: action.onepagereports.filters,
      };
    case onepagereportConstants.GETALL_FILTER_FAILURE:
      return {
        error: action.error
      };
    
    case onepagereportConstants.GETALL_MATCH_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
      };
    case onepagereportConstants.GETALL_MATCH_FILTER_SUCCESS:
      return {
         filters:state.filters,
         matchfilter:action.onepagereports.matchfilter
      };
    case onepagereportConstants.GETALL_MATCH_FILTER_FAILURE:
      return {
        error: action.error,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
      };

    case onepagereportConstants.GETALL_CONTEST_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
      };
    case onepagereportConstants.GETALL_CONTEST_FILTER_SUCCESS:
      return {
         filters:state.filters,
         matchfilter:state.matchfilter,
        contestfilter:action.onepagereports.contestfilter
      };
    case onepagereportConstants.GETALL_CONTEST_FILTER_FAILURE:
      return {
        error: action.error,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
      };

    case onepagereportConstants.GETALL_POOL_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
      };
    case onepagereportConstants.GETALL_POOL_FILTER_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:action.onepagereports.poolfilter

      };
    case onepagereportConstants.GETALL_POOL_FILTER_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error
      };

    case onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata
      };
    case onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:action.onepagereports.onepagedata
      };
    case onepagereportConstants.GETALL_ONEPAGE_DATA_FILTER_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error,
        poolfilter:state.poolfilter,
        onepagedata:null
      };

      case onepagereportConstants.GET_TEAM_PLAYER_LIST_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist
      };
    case onepagereportConstants.GET_TEAM_PLAYER_LIST_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:action.onepagereports.teamplaylist
      };
    case onepagereportConstants.GET_TEAM_PLAYER_LIST_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist
      };


      case onepagereportConstants.GETALL_TEAM_PLAYER_LIST_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall
      };
    case onepagereportConstants.GETALL_TEAM_PLAYER_LIST_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:action.onepagereports.teamplayall
      };
    case onepagereportConstants.GETALL_TEAM_PLAYER_LIST_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall
      };


      case onepagereportConstants.UPDATE_TEAM_PLAYER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall
      };
    case onepagereportConstants.UPDATE_TEAM_PLAYER_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall,
        updateteamplayer:true
      };
    case onepagereportConstants.UPDATE_TEAM_PLAYERT_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall,
        updateteamplayer:false
      };


      case onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_REQUEST:
      return {
        loading: true,
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall,
        onepagereportsExport:action.onepagereportsExport
      };
    case onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_SUCCESS:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall,
        updateteamplayer:true,
        onepagereportsExport:action.onepagereportsExport
      };
    case onepagereportConstants.GETALL_EXPORT_ONEPAGE_DATA_FILTER_FAILURE:
      return {
        filters:state.filters,
        matchfilter:state.matchfilter,
        contestfilter:state.contestfilter,
        error: action.error,
        poolfilter:state.poolfilter,
        onepagedata:state.onepagedata,
        teamplaylist:state.teamplaylist,
        teamplayall:state.teamplayall,
        updateteamplayer:false,
        onepagereportsExport:null
      };
     

    default:
      return state
  }
}