import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import SandwitchBuilder from './containers/SandwitchBuilder/SandwitchBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';
import Home from './containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/sandwitch-builder" component={SandwitchBuilder}/>
            <Route path='/authentication' component = {Authentication}/>
            <Route path="/" exact component={Home}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
