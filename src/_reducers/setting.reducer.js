import { settingConstants } from '../_constants';

export function setting(state = {}, action) {
  //console.log("action.typeaction.typeaction.type  ", action); 

  switch (action.type) {

    case settingConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case settingConstants.GETALL_SUCCESS:
      return {
        cricket:action.setting.listOfsettings.cricket,
        kabaddi:action.setting.listOfsettings.kabaddi,
        football:action.setting.listOfsettings.football
      };
    case settingConstants.GETALL_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.GET_MAIN_SETTING_REQUEST:
      return {
        loading: true
      };
    case settingConstants.GET_MAIN_SETTING_SUCCESS:
      return {
        ...state,
        ...action.setting
      };
    case settingConstants.GET_MAIN_SETTING_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.ADD_SUCCESS:
      return {
        ...state,
        settindAdded: true
      };
    case settingConstants.ADD_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_MAIN_SETTING_SUCCESS:
      return {
        ...state,
        settindUpdated: true
      };
    case settingConstants.UPDATE_MAIN_SETTING_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_CAPTAIN_VC_SETTING_SUCCESS:
      return {
        ...state,
        captainsettings:action.setting.captainsettings
      };
    case settingConstants.UPDATE_CAPTAIN_VC_SETTING_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.GET_CAPTAIN_VC_SETTING_REQUEST:
      return {
        loading: true
      };
    case settingConstants.GET_CAPTAIN_VC_SETTING_SUCCESS:
      return {
        ...state,
        ...action.setting
      };
    case settingConstants.GET_CAPTAIN_VC_SETTING_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_CAPTAIN_VC_SETTING_SUCCESS1:
      return {
         settingUpdated: true
      };
    case settingConstants.UPDATE_CAPTAIN_VC_SETTING_FAILURE1:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_CRICKET_MATCH_SETTING_SUCCESS:
      return {
         settingUpdated1: true
      };
    case settingConstants.UPDATE_CRICKET_MATCH_SETTING_FAILURE:
      return {
        error: action.error
      };
    
    case settingConstants.GET_REFERRAL_REQUEST:
      return {
        
        loading: true
      };
    case settingConstants.GET_REFERRAL_SUCCESS:
      return {
        referralDetails:action.setting.referralDetails,
      };
    case settingConstants.GET_REFERRAL_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_REFERRAL_REQUEST:
      return {
        loading: true,
        referralDetails:state.referralDetails
      };
    case settingConstants.UPDATE_REFERRAL_SUCCESS:
      return {
        referralDetails:state.referralDetails,
        isSettingUpdate:true
      };
    case settingConstants.UPDATE_REFERRAL_FAILURE:
      return {
        referralDetails:state.referralDetails,
        error: action.error
      };

    case settingConstants.GET_STATIC_PAGE_REQUEST:
      return {
        loading: true
      };
    case settingConstants.GET_STATIC_PAGE_SUCCESS:
      return {
        staticpageDetails:action.setting.staticpageDetails,
      };
    case settingConstants.GET_STATIC_PAGE_FAILURE:
      return {
        error: action.error
      };

    case settingConstants.UPDATE_STATIC_PAGE_REQUEST:
      return {
        loading: true,
        staticpageDetails:state.staticpageDetails
      };
    case settingConstants.UPDATE_STATIC_PAGE_SUCCESS:
      return {
        staticpageDetails:state.staticpageDetails,
        isStaticUpdate:true
      };
    case settingConstants.UPDATE_STATIC_PAGE_FAILURE:
      return {
        staticpageDetails:state.staticpageDetails,
        error: action.error
      };

    case settingConstants.GET_SLIDER_REQUEST:
      return {
        loading: true,
        sliderList:state.sliderList
      };
    case settingConstants.GET_SLIDER_SUCCESS:
      return {
        sliderList:action.setting.sliderList,
      };
    case settingConstants.GET_SLIDER_FAILURE:
      return {
        sliderList:state.sliderList,
        error: action.error
      };
    
    case settingConstants.ADD_SLIDER_REQUEST:
      return {
        loading: true,
        sliderList:state.sliderList
      };
    case settingConstants.ADD_SLIDER_SUCCESS:
      return {
        sliderList:state.sliderList,
        isSliderAdded:true
      };
    case settingConstants.ADD_SLIDER_FAILURE:
      return {
        sliderList:state.sliderList,
        error: action.error
      };

    case settingConstants.UPDATE_SLIDER_REQUEST:
      return {
        loading: true,
        sliderList:state.sliderList
      };
    case settingConstants.UPDATE_SLIDER_SUCCESS:
      return {
        sliderList:state.sliderList,
        isSliderUpdated:true
      };
    case settingConstants.UPDATE_SLIDER_FAILURE:
      return {
        sliderList:state.sliderList,
        error: action.error
      };
    default:
      return state;
  }
}
