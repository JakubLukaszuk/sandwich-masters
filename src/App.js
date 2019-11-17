import React, {useEffect, Suspense} from 'react';
import {Route, Switch, Router, Redirect} from 'react-router-dom';
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
  const {onTyRefreshSignup} = props;
  useEffect(() => {
      onTyRefreshSignup();
  }, [onTyRefreshSignup]);

    let routes = (
      <Switch>
        <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
        <Route path='/authentication' render={(props) => <Authentication {...props}/>}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (props.isAuthenitcated) {
      routes = (
        <Switch>
          <Route path="/sandwitch-builder" render={(props) => <SandwitchBuilder {...props}/>}/>
          <Route path="/" exact component={Home}/>
          <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
          <Route path="/orders" render={(props) =><Orders {...props}/>}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/authentication' render={(props) => <Authentication {...props}/>}/>
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

export default (connect(mapStateToProps, mapDispatchToProps)(App));
