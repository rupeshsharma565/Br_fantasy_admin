import { rewardsConstants } from '../_constants';

export function rewards(state = {}, action) {
   //console.log("action.typeaction.typeaction.type  ", action.rewards);

  switch (action.type) {
    case rewardsConstants.GETALL_REWARDS_REQUEST:
      return {
        loading: true,
        items:state.items,
      };
    case rewardsConstants.GETALL_REWARDS_SUCCESS:
      return {
        items: action.rewards.listOfRewards,
        //total: action.rewards.listOfRewards.total,
      };
    case rewardsConstants.GETALL_REWARDS_FAILURE:
      return {
        loading: false,
        error: action.error
      };

    case rewardsConstants.UPDATE_STATUS_REWARDS_REQUEST:
      return {
        loading: true,
        items:state.items,
        //total:state.total,
      };
    case rewardsConstants.UPDATE_STATUS_REWARDS_SUCCESS:
      return {
        isUpdate: true,
        items: state.items,
        //total:state.total,
      };
    case rewardsConstants.UPDATE_STATUS_REWARDS_FAILURE:
      return {
        loading: false,
        error: action.error
      };
      case rewardsConstants.GETALL_LEVELS_REQUEST:
      return {
        loading: true,
        items:state.items,
      };
    case rewardsConstants.GETALL_LEVELS_SUCCESS:
      return {
        items: action.bnsLevels.listOfLevels,
        //total: action.rewards.listOfRewards.total,
      };
    case rewardsConstants.GETALL_LEVELS_FAILURE:
      return {
        loading: false,
        error: action.error
      };

    case rewardsConstants.UPDATE_STATUS_LEVELS_REQUEST:
      return {
        loading: true,
        items:state.items,
        //total:state.total,
      };
    case rewardsConstants.UPDATE_STATUS_LEVELS_SUCCESS:
      return {
        isUpdate: true,
        items: state.items,
        //total:state.total,
      };
    case rewardsConstants.UPDATE_STATUS_LEVELS_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}