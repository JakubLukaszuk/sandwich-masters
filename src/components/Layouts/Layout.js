import React, {Component} from 'react';

import Aux from '../../hoc/Axulary'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state =   {
    sideDrawerShow: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({sideDrawerShow: false})
  }

  sideDrawerOpenHander = () => {
    this.setState({sideDrawerShow: true})
  }

  render() {
    return (
      <Aux>
        <Toolbar
          openSideDrawer = {this.sideDrawerOpenHander}/>
        <SideDrawer
        open = {this.state.sideDrawerShow}
        closed = {this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );

  }
}

export default Layout;