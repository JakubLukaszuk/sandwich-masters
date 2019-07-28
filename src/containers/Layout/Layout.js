import React, {Component} from 'react';

import Aux from '../../hoc/Auxlary/Axulary'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state =   {
    sideDrawerShow: false
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