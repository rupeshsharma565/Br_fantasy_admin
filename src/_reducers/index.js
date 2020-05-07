import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { subadmin } from './subadmin.reducer';
import { team } from './team.reducer';
import { contest } from './contest.reducer';
import { match } from './match.reducer';
import { setting } from './setting.reducer';
import { cricket } from './cricket.reducer';
import { payment } from './payment.reducer';
import { dashboard } from './dashboard.reducer';
import { onepagereport } from './onepagereport.reducer';
import { withdraw } from './withdraw.reducer';
import { localscore } from './localscore.reducer';
import { rewards } from './rewards.reducer';
import { promocode } from './promocode.reducer';
import { privatecnst } from './privateContest.reducer';
import {globalReducer} from './globalReducer.reducer';



const rootReducer = combineReducers({
  authentication,
  users,
  subadmin,
  alert,
  team,
  contest,
  match,
  setting,
  cricket,
  payment,
  dashboard,
  onepagereport,
  withdraw,
  localscore,
  rewards,
  promocode,
  privatecnst,
  globalReducer
});

export default rootReducer;
