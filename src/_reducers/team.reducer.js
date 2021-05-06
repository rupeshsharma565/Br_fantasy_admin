import { teamConstants } from '../_constants';

export function team(state = {}, action) {
  switch (action.type) {
    case teamConstants.PLAYER_ADD_SUCCESS:
      return {
        listOfPlayers:state.listOfPlayers,
        items:state.items,
        total:state.total,
        roleList:state.roleList,
        countryList:state.countryList,  
        playerAdded: true
      };
    case teamConstants.PLAYER_ADD_FAILURE:
      return {
        ...state,error: action.error
      };
    case teamConstants.PLAYER_GET_REQUEST:
      return {
        loading: true,
        items: state.items,     
        total: state.total,
        countryList:state.countryList,     
        roleList:state.roleList,   
      }
    case teamConstants.PLAYER_GET_SUCCESS:
      return {
        loading: false,
        items: action.players.listOfPlayers.list,     
        total: action.players.listOfPlayers.total,
        countryList:state.countryList,     
        roleList:state.roleList,   
      }
    case teamConstants.PLAYER_GET_FAILURE:
      return {
        loading: false,
        items: [],     
        total: 0,
        countryList:state.countryList,     
        roleList:state.roleList,  
        error: action.error
      };

    case teamConstants.GET_COUNTRY_SUCCESS:
      return {
        items:state.items,
        total:state.total,
        roleList:state.roleList,
        countryList:action.countries.countryList}
    case teamConstants.GET_COUNTRY_FAILURE:
      return {
       ...state, error: action.error
      };
    
    case teamConstants.GET_ROLES_SUCCESS:
      return {
        items:state.items,
        total:state.total,
        countryList:state.countryList,
        roleList:action.playerroles.listOfRoles
      }
    case teamConstants.GET_ROLES_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}