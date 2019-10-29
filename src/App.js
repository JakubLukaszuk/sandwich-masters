import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponet';

import Layout from './containers/Layout/Layout';
import SandwitchBuilder from './containers/SandwitchBuilder/SandwitchBuilder';
import Home from './containers/Home/Home';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout  = asyncComponent(() => {
  return import ('./containers/Checkout/Checkout');
});

const asyncOrders  = asyncComponent(() => {
  return import ('./containers/Orders/Orders');
});

const asyncAuth  = asyncComponent(() => {
  return import ('./containers/Authentication/Authentication');
});


class App extends Component {

  componentDidMount() {
    this
      .props
      .onTyRefreshSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
        <Route path='/authentication' component={asyncAuth}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenitcated) {
      routes = (
        <Switch>
          <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
          <Route path="/" exact component={Home}/>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/authentication' component={asyncAuth}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
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
