import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
import { ToastContainer } from 'react-toastify';
// sidebar nav config
//import navigation from '../../_nav';
// routes config
import routes from '../../routes';

//const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


  // let user = JSON.parse(localStorage.getItem('user'));
  // console.log("usersssssssss : ",user.menus);
  // let nav=user.menus;


class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  render() {

    //console.log("navigation  ",navigation);
    let user = JSON.parse(localStorage.getItem('user'));
    //console.log("usersssssssss : ",user.menus);
    let navdata={
      items:user.menus
    }
    if (!user.menus) {
     return  <Redirect  to="/login" />
    }
    return (
      <div className="app">
        <ToastContainer />
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body ">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navdata} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}
function mapStateToProps(state) {

  const { authentication } = state;
  //console.log("1111111 ", state);

  return {
    authentication
  };
}
export default connect(mapStateToProps)(DefaultLayout);

//export default DefaultLayout;
