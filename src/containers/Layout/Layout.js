import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxlary/Axulary'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
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
          isAuthenticated={this.props.isAuthenticated}
          openSideDrawer={this.sideDrawerOpenHander}/>
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.sideDrawerShow}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authenticationReducer.idToken !== null
  }
}
export default connect(mapStateToProps)(Layout);