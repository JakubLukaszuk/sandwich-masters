import React from 'react';
import {connect} from 'react-redux';

import headerBG from '../../assets/images/homeHeadBG.png';
import classes from './Home.css';

import builtSandwitch from '../../assets/images/builtSandwitch.png';
import ButtonMore from '../../components/UI/Button/ButtonMore/ButtonMore';
import MessageBox from '../../components/UI/MessageBox/MessageBox';
import Separator from '../../components/UI/Separator/Separator';
import ArrowButton from '../../components/UI/Button/ArrowButton/ArrowButton';
import Logo from '../../components/Logo/Logo';
import * as actions from '../../store/actions/index';

const home = (props) => {

  const buttonCLickHandler = () => {
    props.orderingEnds();
  }
  const scrollDownArrowHandler = () => {
    const element = document.getElementById('CreateSnadwitchSection');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const gotoBulderHandler = () => {

  }

  return (
    <div className={classes.Home}>
      {props.orderData
        ? <MessageBox show={!!props.orderData} onClose ={props.onOrderEnds} title='Order'>
            Delivery to: {props.orderData.name}<br/>
            adress: {props.orderData.street}
            {props.orderData.postCode}
            {props.orderData.street}
          </MessageBox>
        : null
}
      <div className={classes.HeadSection} >
        <img className={classes.BackGroundImage} src={headerBG} alt='BackGround'></img>
        <div>
          <h1>Sandwitch Masters</h1>
          <Separator/>
          <h2>The tastiest sandwiches in the world</h2>
          <ArrowButton clicked={scrollDownArrowHandler} arrowType='down' top='130%'/>
        </div>
      </div>
      <div className={classes.CreateOwnSection} id='CreateSnadwitchSection'>
        <h3>Create your own sandwitch or burger!</h3>
        <Separator/>
        <section>
          <img
            className={classes.BulitSandwitchImage}
            src={builtSandwitch}
            alt='Sandwitch img'></img>
          <p>Go to builder create and order your perfect sandwitch</p>
          <ButtonMore clicked={buttonCLickHandler}>To builder</ButtonMore>
          <Separator style={{width: '100%'}}/>
        </section>
      </div>
      <div className = {classes.LoginSection}>
        <h3>Login or create acount</h3>
        <p>It take a while</p>
        <ButtonMore clicked={buttonCLickHandler}>To LOGIN</ButtonMore>
      </div>
      <footer>
      <Separator style={{width: '100%'}}/>
      <div className = {classes.LogoWrapper}>
        <Logo/>
      </div>
      </footer>
    </div>
  );
}

const mapStateToProps = state => {
  return {orderData: state.orderRecuder.orderData}
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderEnds: () => dispatch(actions.orderDataCleanUp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(home);