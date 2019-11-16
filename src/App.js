import React, {useEffect, Suspense} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from './components/UI/Spinner/Spinner';
import Layout from './containers/Layout/Layout';
import SandwitchBuilder from './containers/SandwitchBuilder/SandwitchBuilder';
import Home from './containers/Home/Home';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout  = React.lazy(() => {
  return import ('./containers/Checkout/Checkout');
});

const Orders  = React.lazy(() => {
  return import ('./containers/Orders/Orders');
});

const Authentication  = React.lazy(() => {
  return import ('./containers/Authentication/Authentication');
});


const App = props =>  {

  useEffect(() => {
      props
      .onTyRefreshSignup();
  }, []);

    let routes = (
      <Switch>
        <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
        <Route path='/authentication' render={() => <Authentication/>}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (props.isAuthenitcated) {
      routes = (
        <Switch>
          <Route path="/sandwitch-builder" render={() => <SandwitchBuilder/>}/>
          <Route path="/" exact component={Home}/>
          <Route path="/checkout" render={() => <Checkout/>}/>
          <Route path="/orders" render={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/authentication' render={() => <Authentication/>}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback = {Spinner}>{routes}</Suspense>
        </Layout>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
    isAuthenitcated: state.authenticationReducer.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTyRefreshSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
