import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import SandwitchBuilder from './containers/SandwitchBuilder/SandwitchBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import Home from './containers/Home/Home';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './store/actions/index';

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
        <Route path='/authentication' component={Authentication}/>
        <Route path="/" exact component={Home}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenitcated) {
      routes = (
        <Switch>
          <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
          <Route path="/" exact component={Home}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path='/logout' component={Logout}/>
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
