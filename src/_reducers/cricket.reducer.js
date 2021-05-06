import { cricketConstants } from '../_constants';

export function cricket(state = {}, action) {
  
  switch (action.type) {
    case cricketConstants.CRICKET_MATCH_GETALL_REQUEST:
      return {
        loading: true
      };
    case cricketConstants.CRICKET_MATCH_GETALL_SUCCESS:
      return {
        ...state,items: action.cricketmatch.listOfMatches
      };
    case cricketConstants.CRICKET_MATCH_GETALL_FAILURE:
      return {
       ...state, error: action.error
      };
    case cricketConstants.CRICKET_MATCH_TEAM_SEARCH_REQUEST:
      return {
        loading: true
      };
    case cricketConstants.CRICKET_MATCH_TEAM_SEARCH_SUCCESS:
      return {
        ...state,
        teamsList: action.cricketmatch.teamsList
      };
    case cricketConstants.CRICKET_MATCH_TEAM_SEARCH_FAILURE:
      return {
      ...state,  error: action.error
      };

    case cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_SUCCESS1:
      return {
        ...state,
        playerList1: action.cricketmatch.playerList
      };
    case cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_FAILURE1:
      return {
       ...state, error: action.error
      };

    case cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_SUCCESS2:
      return {
        ...state,
        playerList2: action.cricketmatch.playerList
      };
    case cricketConstants.GET_CRICKET_MATCH_TEAM_PLAYER_LIST_FAILURE2:
      return {
       ...state, error: action.error
      };

    case cricketConstants.GET_CRICKET_MATCH_LIST_API_SUCCESS:
      return {
        ...state,
        matchList: action.cricketmatch.matchList
      };
    case cricketConstants.GET_CRICKET_MATCH_LIST_API_FAILURE:
      return {
       ...state, error: action.error
      };


    case cricketConstants.CRICKET_TEAM_GET_SUCCESS:
      return {
        teamList: action.teamList,
        upcommingmatch:state.upcommingmatch
      };
    case cricketConstants.CRICKET_TEAM_GET_FAILURE:
      return {
       ...state, error: action.error
      };
    case cricketConstants.CRICKET_PLAYER_GETALL_REQUEST:
      return {
        loading: true,
        teamList:state.teamList,
        playerList: state.playerList
      };

    case cricketConstants.CRICKET_PLAYER_GETALL_SUCCESS:
      return {
        teamList:state.teamList,
        playerList: action.playerList.playerList
      };
    case cricketConstants.CRICKET_PLAYER_GETALL_FAILURE:
      return {
       ...state, error: action.error
      };


    case cricketConstants.CRICKET_TEAM_ADD_SUCCESS:
      return {
        ...state, teamAdded: true
      };
    case cricketConstants.CRICKET_TEAM_ADD_FAILURE:
      return {
       ...state, error: action.error
      };


    case cricketConstants.CRICKET_PLAYER_ADD_SUCCESS:
      return {
        ...state, playerAdded1: true
      };
    case cricketConstants.CRICKET_PLAYER_ADD_FAILURE:
      return {
      ...state,  error: action.error
      };

    case cricketConstants.CRICKET_MATCH_ADD_SUCCESS:
      return {
        ...state, matchAdded: true
      };
    case cricketConstants.CRICKET_MATCH_ADD_FAILURE:
      return {
      ...state,  error: action.error
      };

    case cricketConstants.GET_CONTESTS_SUCCESS:
      return { ...state, contenstsList: action.contenstsList.listOfContests }
    case cricketConstants.GET_CONTESTS_FAILURE:
      return {
       ...state, error: action.error
      };

    case cricketConstants.CRICKET_CONTESTS_ADD_SUCCESS:
      return {
        ...state, playerAdded: true
      };
    case cricketConstants.CRICKET_CONTESTS_ADD_FAILURE:
      return {
       ...state, error: action.error
      };

      case cricketConstants.CRICKET_CONTESTS_POOL_LIST_SUCCESS:
      return {
        items: state.items,
        contenstsList: state.contenstsList,
        assignedContestList: state.assignedContestList,
        poolList: action.pool.listOfPool
      };
    case cricketConstants.CRICKET_CONTESTS_POOL_LIST_FAILURE:
      return {
        items: state.items,
        contenstsList: state.contenstsList,
        assignedContestList: state.assignedContestList,
        poolList: [],
        error: action.error,
      };
    case cricketConstants.CRICKET_CONTESTS_POOL_ADD_SUCCESS:
      return {
        ...state, poolAdded: true
      };
    case cricketConstants.CRICKET_CONTESTS_POOL_ADD_FAILURE:
      return {
       ...state, error: action.error
      };
    case cricketConstants.CRICKET_CONTESTS_PRIZE_ADD_SUCCESS:
      return {
        ...state, prizeAdded: true
      };
    case cricketConstants.CRICKET_CONTESTS_PRIZE_ADD_FAILURE:
      return {
      ...state,  error: action.error
      };

    case cricketConstants.CRICKET_CONTESTS_PRIZE_GET_SUCCESS:
      return {
        ...state, prizeList:action.getprizelist
      };
    case cricketConstants.CRICKET_CONTESTS_PRIZE_GET_FAILURE:
      return {
        ...state,error: action.error
      };

    case cricketConstants.CRICKET_CONTESTS_MATCH_SHOW_SUCCESS:
      return {
        ...state, matchDetails:action.matchDetails
    };
    case cricketConstants.CRICKET_CONTESTS_MATCH_SHOW_FAILURE:
      return {
        ...state,error: action.error
    };
    case cricketConstants.CRICKET_CONTESTS_ASSIGN_MATCH_SHOW_SUCCESS:
      return {
        assignedContestList:action.assigncontestotmatch.assignedContestList,
        contenstsList:state.contenstsList,
        items:state.items
      };
    case cricketConstants.CRICKET_CONTESTS_ASSIGN__MATCH_SHOW_FAILURE:
      return {
       contenstsList:state.contenstsList,
        items:state.items,
        assignedContestList:[]
      };
    case cricketConstants.CRICKET_UPDATE_STATUS_CONTESTS_ASSIGN_MATCH_SHOW_SUCCESS:
      return {
        ...state, assignedContestStatus:true
      };
    case cricketConstants.CRICKET_UPDATE_STATUS_CONTESTS_ASSIGN__MATCH_SHOW_FAILURE:
      return {
      ...state
      };

    case cricketConstants.Assigned_Pool_Contest_LIST_SUCCESS:
      return {
        assignedContestPoolList:action.matchDetails.assignedContestList,
        assignedContestList:state.assignedContestList,
        contenstsList:state.contenstsList,
        items:state.items,
        poolList:state.poolList
      };
    case cricketConstants.Assigned_Pool_Contest_LIST_FAILURE:
      return {
        contenstsList:state.contenstsList,
        items:state.items,
        assignedContestList:state.assignedContestList,
        assignedContestPoolList:[],
        poolList:state.poolList
      };

      case cricketConstants.Assigned_Pool_Contest_UPDATE_SUCCESS:
      return {
        udpatePoolListStatus:true,
        assignedContestPoolList:state.assignedContestPoolList,
        assignedContestList:state.assignedContestList,
        contenstsList:state.contenstsList,
        items:state.items,
        poolList:state.poolList
      };
    case cricketConstants.Assigned_Pool_Contest_UPDATE_FAILURE:
      return {
        contenstsList:state.contenstsList,
        items:state.items,
        assignedContestList:state.assignedContestList,
        assignedContestPoolList:state.assignedContestPoolList,
        poolList:state.poolList
      };

    case cricketConstants.PLAYER_IMAGE_LIST_BY_ID_SUCCESS:
      return {
        listOfPlayerImage: action.playerDetails.playerImageList,
        assignedContestPoolList:state.assignedContestPoolList,
        assignedContestList:state.assignedContestList,
        contenstsList:state.contenstsList,
        items:state.items,
        poolList:state.poolList,
        playerList1:state.playerList1,
        playerList2:state.playerList2,
        noUpdate:true
      };
    case cricketConstants.PLAYER_IMAGE_LIST_BY_ID_FAILURE:
      return {
        listOfPlayerImage:[],
        contenstsList:state.contenstsList,
        items:state.items,
        assignedContestList:state.assignedContestList,
        assignedContestPoolList:state.assignedContestPoolList,
        poolList:state.poolList,
        playerList1:state.playerList1,
        playerList2:state.playerList2,
        noUpdate:true
      };
    case cricketConstants.UPCOMMING_MATCH_SUCCESS:
      return {
        teamList:state.teamList,
        upcommingmatch: action.cricketmatch.listOfMatches
      };
    case cricketConstants.UPCOMMING_MATCH_FAILURE:
      return {
       error: action.error
      };

    case cricketConstants.ADD_DOM_UPCOMMING_MATCH_SUCCESS:
      return {
        teamList:state.teamList,
        upcommingmatch:state.upcommingmatch,
        domMatchAdded:true
      };
    case cricketConstants.ADD_DOM_UPCOMMING_MATCH_FAILURE:
      return {
        error: action.error,
        teamList:state.teamList,
        upcommingmatch:state.upcommingmatch,
        domMatchAdded:false
      };
    case cricketConstants.ACTIVE_UPCOMMING_MATCH_SUCCESS:
      return {
       isActivated: true,
       loading: false
      };
    case cricketConstants.ACTIVE_UPCOMMING_MATCH_FAILURE:
      return {
        error: action.error
      };

    case cricketConstants.CRICKET_CONTESTS_POOL_AND_PRIZE_ADD_SUCCESS:
      return {
        ...state, poolAddedAndPrize: true
      };
    case cricketConstants.CRICKET_CONTESTS_POOL_AND_PRIZE_ADD_FAILURE:
      return {
       ...state, error: action.error
      };
    
      case cricketConstants.ACTIVE_ALL_MATCH_SUCCESS:
      return {
        allmatch: action.allmatch.updatestatus
      };
    case cricketConstants.ACTIVE_ALL_MATCH_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
