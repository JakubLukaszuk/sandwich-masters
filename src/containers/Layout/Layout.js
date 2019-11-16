import React, { useState } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxlary/Axulary'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
 const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setIsSideDrawerVisible(false)
  }

  const sideDrawerOpenHander = () => {
   setIsSideDrawerVisible(!isSideDrawerVisible)
  }

    return (
      <Aux>
        <Toolbar
          isAuthenticated={props.isAuthenticated}
          openSideDrawer={sideDrawerOpenHander}/>
        <SideDrawer
          isAuthenticated={props.isAuthenticated}
          open={isSideDrawerVisible}
          closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {props.children}
        </main>
      </Aux>
    );

  }

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authenticationReducer.idToken !== null,
    orderData: state.orderRecuder.orderData,
  }
}
export default connect(mapStateToProps)(Layout);