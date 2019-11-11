import React from 'react';
import {connect} from 'react-redux';

import headerBG from '../../assets/images/homeHeadBG.png';
import builtSandwitch from '../../assets/images/builtSandwitch.png';
import sandwitch from '../../assets/images/sandwitch.png';
import burger from '../../assets/images/burger.png';

import classes from './Home.css';
import ButtonMore from '../../components/UI/Button/ButtonMore/ButtonMore';
import MessageBox from '../../components/UI/MessageBox/MessageBox';
import Separator from '../../components/UI/Separator/Separator';
import ArrowButton from '../../components/UI/Button/ArrowButton/ArrowButton';
import TextFrame from '../../components/UI/TextFrame/TextFrame';
import Logo from '../../components/Logo/Logo';
import * as actions from '../../store/actions/index';

const home = (props) => {

  const scrollDownArrowHandler = () => {
    const element = document.getElementById('AboutUsSection');
    element.scrollIntoView({behavior: 'smooth', block: 'start'})
  }

  const gotoBuliderHandler = () => {
    props
      .history
      .push('/sandwitch-builder');
  }

  const gotoAuthenticationHandler = () => {
    props
      .history
      .push('/authentication');
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
        : null}
      <div className={classes.HeadSection}>
        <div>
          <h1>Sandwitch Masters</h1>
          <Separator/>
          <h2>The tastiest sandwiches in the world</h2>
          <ArrowButton clicked={scrollDownArrowHandler} arrowType='down' top='150%'/>
        </div>
      </div>
      <div id='AboutUsSection' className={classes.AboutUs}>
        <div className = {classes.ImageBurgerWrapper}>
          <img src={burger}
          alt='Burger img'></img>
        </div>
        <div className = {[classes.ImageBurgerWrapper, classes.MirrorBurger].join(' ')}>
        <img src={burger}
        alt='Burger img'></img>
      </div>
        <TextFrame title='About us'>
          We are a company making the best sandwiches in the world. Why? Therefore,
          because our kilenites project them ourselves, and we only make them from the
          best possible ingredients. You have to look.</TextFrame>
      </div>
      <div className={classes.CreateOwnSection}>
        <h3>Create your own sandwitch or burger!</h3>
        <Separator/>
        <section>
          <div className={classes.CrateOwnImagesWrapper}>
            <img
              className={classes.BulitSandwitchImage}
              src={builtSandwitch}
              alt='Sandwitch img'></img>
            <p>
              Sandwitch Builder is a tool thanks to which you can quickly and easily design
              and then order your dream and tasty sandwich. It's simpler than you think.
            </p>
            <img className={classes.SandwitchImage} src={sandwitch} alt='Sandwitch img'></img>
          </div>
          <Separator/>
          <p>Go to builder create and order your perfect sandwitch</p>
          <ButtonMore clicked={gotoBuliderHandler}>To builder</ButtonMore>
          <Separator style={{
            width: '100%'
          }}/>
        </section>
      </div>
      <div className={classes.LoginSection}>
        <h3>Login or create acount</h3>
        <p>It will take a while</p>
        <ButtonMore clicked={gotoAuthenticationHandler}>To LOGIN</ButtonMore>
      </div>
      <footer>
        <Separator style={{
          width: '100%'
        }}/>
        <div className={classes.LogoWrapper}>
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