import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import "./scss/scustom.css"
import { PrivateRoute } from './_components';

import { toast } from 'react-toastify';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  render() {
    const { alert } = this.props;
    // console.log("alert   ", alert);

    if (alert.message) {
      toast(alert.message)
    }
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>

    );
  }
}
function mapStateToProps(state) {
  const { alert } = state;
  //console.log("alertalertalert ", alert);

  return {
    alert
  };
}
export default connect(mapStateToProps)(App);
//export default App;
