export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'User',
      url: '/users',
      icon: 'fa fa-users',
      children: [
        {
          name: 'All Users',
          url: '/users/allusers',
          icon: 'fa fa-circle'
        },
        {
          name: 'Block Users',
          url: '/users/blockusers',
          icon: 'fa fa-circle'
        },
      ]
    },
    {
      name: 'Communication',
      url: '/communication',
      icon: 'fa fa-contao',
      children: [
        {
          name: 'Notifications',
          url: '/communication/notifications',
          icon: 'fa fa-circle'
        },
      ]
    },
    {
      name: 'KYC',
      url: '/kyc',
      icon: 'fa fa-xing',
      children: [
        {
          name: 'Approved',
          url: '/kyc/approved',
          icon: 'fa fa-circle'
        },
        {
          name: 'NotApproved',
          url: '/kyc/notapproved',
          icon: 'fa fa-circle'
        },
      ]
    },
    {
      name: 'Referral',
      url: '/referral',
      icon: 'icon_referral icon-accessibility',
    },
    {
      name: 'One Page Report',
      url: '/onepagereport',
      icon: 'icon_onepage icon-accessibility',
    },
    {
      name: 'SubAdmin',
      url: '/subadmin',
      icon: 'icon-people'
    },
     {
      name: 'Domestic Score',
      url: '/localscore',
      icon: 'icon-people'
    },
    {
      name: 'Withdraw Request',
      url: '/withdraw',
      icon: 'icon_withdraw icon-accessibility'
    },
    {
      name: 'Cricket',
      url: '/cricket',
      icon: 'icon_cicket icon-accessibility',
      children: [
        {
          name: 'Players',
          url: '/cricket/players',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Team',
          url: '/cricket/addTeams',
          icon: 'fa fa-circle'
        },
        {
          name: 'Upcoming Matches',
          url: '/cricket/upcommingmatch',
          icon: 'fa fa-circle'
        },
        {
          name: 'Active Match',
          url: '/cricket/activematch',
          icon: 'fa fa-circle'
        },
        {
          name: 'Contests',
          url: '/cricket/contests',
          icon: 'fa fa-circle'
        },
        {
          name: 'Assign Contests',
          url: '/cricket/addContests',
          icon: 'fa fa-circle'
        }
      ]
    },
    {
      name: 'Soccer',
      url: '/soccer',
      icon: 'icon_soccer icon-accessibility',
      children: [
        {
          name: 'Matches',
          url: '/soccer/match',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Team',
          url: '/soccer/addTeams',
          icon: 'fa fa-circle'
        },
        {
          name: 'Contests',
          url: '/soccer/contests',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Contests',
          url: '/soccer/addContests',
          icon: 'fa fa-circle'
        }
      ]
    },
    {
      name: 'Tennis',
      url: '/tennis',
      icon: 'icon_tennis icon-accessibility',
      children: [
        {
          name: 'Matches',
          url: '/tennis/match',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Team',
          url: '/tennis/addTeams',
          icon: 'fa fa-circle'
        },
        {
          name: 'Contests',
          url: '/tennis/contests',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Contests',
          url: '/tennis/addContests',
          icon: 'fa fa-circle'
        }
      ]
    },
    {
      name: 'Kabaddi',
      url: '/kabaddi',
      icon: 'icon_kabaddi icon-accessibility',
      children: [
        {
          name: 'Matches',
          url: '/kabaddi/match',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Team',
          url: '/kabaddi/addTeams',
          icon: 'fa fa-circle'
        },
        {
          name: 'Contests',
          url: '/kabaddi/contests',
          icon: 'fa fa-circle'
        },
        {
          name: 'Add Contests',
          url: '/kabaddi/addContests',
          icon: 'fa fa-circle'
        }
      ]
    },
    {
      name: 'Global Settings',
      url: '/settings',
      icon: 'icon_globle icon-accessibility',
      children: [
        {
          name: 'Cricket Settings',
          url: '/settings/scricketsetting',
          icon: 'fa fa-circle'
        },
        {
          name: 'Soccer Settings',
          url: '/settings/soccersetting',
          icon: 'fa fa-circle'
        },
        {
          name: 'Tennis Settings',
          url: '/settings/tennissetting',
          icon: 'fa fa-circle'
        },
        {
          name: 'Image Slider',
          url: '/settings/slider',
          icon: 'fa fa-circle'
        }
      ]
    },
    {
      name: 'CMS Pages',
      url: '/staticpage',
      icon: 'icon_cms icon-accessibility',
      children: [
        {
          name: 'AboutUs',
          url: '/staticpage/aboutus',
          icon: 'fa fa-circle'
        },
        {
          name: 'FAQ',
          url: '/staticpage/faq',
          icon: 'fa fa-circle'
        },
        {
          name: 'Support',
          url: '/staticpage/support',
          icon: 'fa fa-circle'
        },
        {
          name: 'Term Condition',
          url: '/staticpage/termcondition',
          icon: 'fa fa-circle'
        },
        {
          name: 'How To Play',
          url: '/staticpage/howplay',
          icon: 'fa fa-circle'
        },
        {
          name: 'Privacy Policy',
          url: '/staticpage/privacypolicy',
          icon: 'fa fa-circle'
        },
        {
          name: 'Legalities',
          url: '/staticpage/offertermcondition',
          icon: 'fa fa-circle'
        }
      ]
  },
  ]
};
