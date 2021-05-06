import React from 'react';
import DefaultLayout from './containers/DefaultLayout/DefaultLayout';
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips/Tooltips'));
const GlobalSettings = React.lazy(() => import('./views/Settings/GlobalSettings/GlobalSettings'));
const Charts = React.lazy(() => import('./views/Charts/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome/FontAwesome'));
const SimpleLineIcons = React.lazy(() =>
  import('./views/Icons/SimpleLineIcons/SimpleLineIcons')
);
const Alerts = React.lazy(() => import('./views/Notifications/Alerts/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));

const AllUsers = React.lazy(() => import('./views/Users/AllUsers/AllUsers'));
const BlockUsers = React.lazy(() => import('./views/Users/BlockUsers/BlockUsers'));
const ViewUser = React.lazy(() => import('./views/Users/AllUsers/ViewUser'));


const Notifications = React.lazy(() => import('./views/Communication/Notifications/Notifications'));
const Contacts = React.lazy(() => import('./views/Communication/Contacts/Contacts'));

const Approved = React.lazy(() => import('./views/KYC/Approved/Approved'));
const NotApproved = React.lazy(() => import('./views/KYC/NotApproved/NotApproved'));

const SubAdmin = React.lazy(() => import('./views/SubAdmin/SubAdmin'));
const ChangePassword = React.lazy(() => import('./views/ChangePassword/ChangePassword'));
const WithdrawRequest = React.lazy(() => import('./views/WithdrawRequest/WithdrawRequest'));
const Referral = React.lazy(() => import('./views/Referral/Referral'));

const CricketSetting = React.lazy(() => import('./views/Settings/CricketSetting/CricketSetting'));
const KabaddiSetting = React.lazy(() => import('./views/Settings/KabaddiSetting/KabaddiSetting'));
const FootballSetting = React.lazy(() => import('./views/Settings/FootballSetting/FootballSetting'));

const Slider = React.lazy(() => import('./views/Settings/Slider/Slider'));
const Teams = React.lazy(() => import('./views/Teams/Teams'));
//const Contest = React.lazy(() => import('./views/Contest/Contest'));src/views/Cricket/Contests 
const Contests = React.lazy(() => import('./views/Cricket/Contests/Contests'));
const AddContests = React.lazy(() => import('./views/Cricket/AddContests/AddContests'));
const Pool = React.lazy(() => import('./views/Cricket/Contests/Pool'));
const EditMatch = React.lazy(() => import('./views/Cricket/CricketMatch/EditMatch'));
const AddMatch = React.lazy(() => import('./views/Cricket/CricketMatch/AddMatch'));

const CricketMatch = React.lazy(() => import('./views/Cricket/CricketMatch/CricketMatch'));
const AddTeams = React.lazy(() => import('./views/Cricket/AddTeams/AddTeams'));
//const StaticPage = React.lazy(() => import('./views/StaticPage/StaticPage'));
const UpcommingMatch = React.lazy(() => import('./views/Cricket/UpcommingMatch/UpcommingMatch'));
const ActiveMatch = React.lazy(() => import('./views/Cricket/ActiveMatch/ActiveMatch'));
const ActiveMatcheScore = React.lazy(() => import('./views/Cricket/ActiveMatchScore/ActiveMatchScore'));

const ActiveMatchKabaddi = React.lazy(() => import('./views/Kabaddi/ActiveMatch/ActiveMatch'));

const ActiveMatchFootball = React.lazy(() => import('./views/Football/ActiveMatch/ActiveMatch'));

const OnePageReport = React.lazy(() => import('./views/OnePageReport/OnePageReport'));

const UserReport = React.lazy(() => import('./views/UserReport/UserReport'));
const PanCard = React.lazy(() => import('./views/Payment/PanCard/PanCard'));
const Bank = React.lazy(() => import('./views/Payment/Bank/Bank'));

const AboutUs = React.lazy(() => import('./views/StaticPage/AboutUs/AboutUs'));
const FAQ = React.lazy(() => import('./views/StaticPage/FAQ/FAQ'));
const Support = React.lazy(() => import('./views/StaticPage/Support/Support'));
const TermCondition = React.lazy(() => import('./views/StaticPage/TermCondition/TermCondition'));
const HowPlay = React.lazy(() => import('./views/StaticPage/HowPlay/HowPlay'));
const PrivacyPolicy = React.lazy(() => import('./views/StaticPage/PrivacyPolicy/PrivacyPolicy'));

const LocalScore = React.lazy(() => import('./views/LocalScore/LocalScore'));

const MatcheScore = React.lazy(() => import('./views/MatcheScore/MatcheScore'));
const NotificationToUser = React.lazy(() => import('./views/NotificationToUser/NotificationToUser'));
const AllMatch = React.lazy(() => import('./views/Cricket/AllMatch/AllMatch'));
const Rewards = React.lazy(() => import('./views/Rewards/Rewards'));
const Promocode = React.lazy(() => import('./views/Promocode/Promocode'));
const PrivateContest = React.lazy(() => import('./views/PrivateContest/PrivateContest'));
const DevelopSetting = React.lazy(() => import('./views/Settings/DevelopSetting/DevelopSetting'));

//const User = React.lazy(() => import('./views/Users/User'));src/Payment/Bank/Bank.js

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },

  //{ path: '/users', exact: true, name: 'Users', component: AllUsers },
  { path: '/users/allusers', exact: true, name: 'All Users', component: AllUsers },
  { path: '/users/blockusers', exact: true, name: 'Block Users', component: BlockUsers },
  { path: '/users/allusers/:id', exact: true, name: 'User Details', component: ViewUser },
  { path: '/users/blockusers/:id', exact: true, name: 'User Details', component: ViewUser },

  //{ path: '/communication', exact: true, name: 'Communication', component: Notifications },
  { path: '/communication/notifications', exact: true, name: 'Notifications', component: Notifications },
  { path: '/communication/contacts', exact: true, name: 'Contacts', component: Contacts },
  { path: '/communication/contacts/:id', exact: true, name: 'User Details', component: ViewUser },
  { path: '/communication/notifications/:id', exact: true, name: 'User Details', component: ViewUser },

  //{ path: '/kyc', exact: true, name: 'KYC', component: Approved },
  { path: '/kyc/approved', exact: true, name: 'Approved', component: Approved },
  { path: '/kyc/notapproved', exact: true, name: 'NotApproved', component: NotApproved },
  { path: '/kyc/approved/:id', exact: true, name: 'User Details', component: ViewUser },
  { path: '/kyc/notapproved/:id', exact: true, name: 'User Details', component: ViewUser },

  { path: '/subadmin', exact: true, name: 'SubAdmin', component: SubAdmin },
  { path: '/changepassword', exact: true, name: 'SubAdmin', component: ChangePassword },
  { path: '/withdraw', exact: true, name: 'WithdrawRequest', component: WithdrawRequest },
  { path: '/teams', exact: true, name: 'Teams', component: Teams },
  { path: '/contest', exact: true, name: 'Contest', component: Contests },
  //{ path: '/cricket', exact: true, name: 'Cricket', component: CricketMatch },
  { path: '/cricket/contests', exact: true, name: 'Contests', component: Contests },
  { path: '/cricket/addContests', exact: true, name: 'AddContests', component: AddContests },
  { path: '/cricket/contests/:id', exact: true, name: 'Pool Details', component: Pool },
  { path: '/cricket/match', exact: true, name: 'Match', component: CricketMatch },
  { path: '/cricket/match/addmatch', exact: true, name: 'Add Match', component: AddMatch },
  { path: '/cricket/upcommingmatch', exact: true, name: 'Upcoming Match', component: UpcommingMatch },
  { path: '/cricket/activematch', exact: true, name: 'ActiveMatch', component: ActiveMatch },
  { path: '/cricket/match/:id', exact: true, name: 'EditMatch', component: EditMatch },
  { path: '/cricket/addTeams', name: 'AddTeams', component: AddTeams },
  { path: '/cricket/players', exact: true, name: 'Players', component: Teams },
  { path: '/cricket/activematchscore', exact: true, name: 'Active Matche Score', component: ActiveMatcheScore },
  { path: '/cricket/allmatch', exact: true, name: 'AllMatch', component: AllMatch },


  /////Kabaddi/////
  { path: '/kabaddi/contests', exact: true, name: 'Contests', component: Contests },
  { path: '/kabaddi/addContests', exact: true, name: 'AddContests', component: AddContests },
  { path: '/kabaddi/contests/:id', exact: true, name: 'Pool Details', component: Pool },
  { path: '/kabaddi/match', exact: true, name: 'Match', component: CricketMatch },
  { path: '/kabaddi/match/addmatch', exact: true, name: 'Add Match', component: AddMatch },
  { path: '/kabaddi/upcommingmatch', exact: true, name: 'Upcoming Match', component: UpcommingMatch },
  { path: '/kabaddi/activematch', exact: true, name: 'ActiveMatch', component: ActiveMatchKabaddi },
  { path: '/kabaddi/match/:id', exact: true, name: 'EditMatch', component: EditMatch },
  { path: '/kabaddi/addTeams', name: 'AddTeams', component: AddTeams },
  { path: '/kabaddi/players', exact: true, name: 'Players', component: Teams },
  { path: '/kabaddi/activematchscore', exact: true, name: 'Active Matche Score', component: ActiveMatcheScore },
  { path: '/kabaddi/allmatch', exact: true, name: 'AllMatch', component: AllMatch },
  ///////////
  /////Football/////
  { path: '/football/contests', exact: true, name: 'Contests', component: Contests },
  { path: '/football/addContests', exact: true, name: 'AddContests', component: AddContests },
  { path: '/football/contests/:id', exact: true, name: 'Pool Details', component: Pool },
  { path: '/football/match', exact: true, name: 'Match', component: CricketMatch },
  { path: '/football/match/addmatch', exact: true, name: 'Add Match', component: AddMatch },
  { path: '/football/upcommingmatch', exact: true, name: 'Upcoming Match', component: UpcommingMatch },
  { path: '/football/activematch', exact: true, name: 'ActiveMatch', component: ActiveMatchFootball },
  { path: '/football/match/:id', exact: true, name: 'EditMatch', component: EditMatch },
  { path: '/football/addTeams', name: 'AddTeams', component: AddTeams },
  { path: '/football/players', exact: true, name: 'Players', component: Teams },
  { path: '/football/activematchscore', exact: true, name: 'Active Matche Score', component: ActiveMatcheScore },
  { path: '/football/allmatch', exact: true, name: 'AllMatch', component: AllMatch },
  ///////////

  //{ path: '/staticpage', exact: true, name: 'StaticPage', component: StaticPage },

  //{ path: '/settings', exact: true, name: 'Global Setting', component: GlobalSettings },
  { path: '/settings/globalsetting', exact: true, name: 'Main Setting', component: GlobalSettings },
  { path: '/settings/scricketsetting', exact: true, name: 'Cricket Setting', component: CricketSetting },
  { path: '/settings/kabaddisetting', exact: true, name: 'Kabaddi Setting', component: KabaddiSetting },
  { path: '/settings/footballsetting', exact: true, name: 'Football Setting', component: FootballSetting },
  //
  { path: '/settings/slider', exact: true, name: 'Image Slider', component: Slider },

  { path: '/referral', exact: true, name: 'Referral', component: Referral },
  { path: '/onepagereport', exact: true, name: 'OnePageReport', component: OnePageReport },
  { path: '/userreport', exact: true, name: 'UserReport', component: UserReport },
  { path: '/payment', exact: true, name: 'Payment', component: PanCard },
  { path: '/payment/pancard', exact: true, name: 'PanCard', component: PanCard },
  { path: '/payment/bank', exact: true, name: 'Bank', component: Bank },


  //{ path: '/staticpage', exact: true, name: 'Static Page', component: AboutUs },
  { path: '/staticpage/aboutus', exact: true, name: 'AboutUs', component: AboutUs },
  { path: '/staticpage/faq', exact: true, name: 'FAQ', component: FAQ },
  { path: '/staticpage/support', exact: true, name: 'Support', component: Support },
  { path: '/staticpage/termcondition', exact: true, name: 'TermCondition', component: TermCondition },
  { path: '/staticpage/howplay', exact: true, name: 'How To Play', component: HowPlay },
  { path: '/staticpage/privacypolicy', exact: true, name: 'Privacy Policy', component: PrivacyPolicy },

  { path: '/localscore', exact: true, name: 'Local Score', component: LocalScore },
  { path: '/MatcheScore', exact: true, name: 'Matche Score', component: MatcheScore },
  { path: '/NotificationToUser', exact: true, name: 'Notification To User', component: NotificationToUser },
  { path: '/rewards', exact: true, name: 'Rewards', component: Rewards },
  { path: '/promocode', exact: true, name: 'Promocode', component: Promocode },
  { path: '/privatecontest', exact: true, name: 'PrivateContest', component: PrivateContest },

  { path: '/settings/developsettings', exact: true, name: 'Common Setting', component: DevelopSetting },
];

export default routes;
