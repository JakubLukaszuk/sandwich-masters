import React, {Component} from 'react';

import Layout from './containers/Layout/Layout';
import SandwitchBuilder from './containers/SandwitchBuilder/SandwitchBuilder'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SandwitchBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
