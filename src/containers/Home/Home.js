import React from 'react';
import {connect} from 'react-redux';

import classes from './Home.css';
import backGround from '../../assets/images/homeBG.png';
import burgerSandwitchIng from '../../assets/images/sandwitchBurger.PNG';
import ButtonMore from '../../components/UI/Button/ButtonMore/ButtonMore';
import MessageBox from '../../components/UI/MessageBox/MessageBox';
import * as actions from '../../store/actions/index';
const home = (props) => {

    const buttonCLickHandler = () =>{
      props.orderingEnds();
    }

  return (
    <div className={classes.Home}>
    {props.orderData ? <MessageBox show = {!!props.orderData} onClose ={props.onOrderEnds} title ='Order'>
    Delivery to: {props.orderData.name}<br/>
    adress: {props.orderData.street} {props.orderData.postCode} {props.orderData.street}
     </MessageBox> : null
    }
      <div className={classes.ImageSection}>
        <img className={classes.BackGroundImage} src={backGround} alt='BackGround'></img>
        <h1>Sandwitch Masters</h1>
      </div>
      <div className={classes.CreateOwnSection}>
          <h3>Create your own sandwitch or burger!</h3>
          <section>
          <img
            className={classes.HamburgerSandwitchImage}
            src={burgerSandwitchIng}
            alt='Sandwitch img'></img>
          <p>Go to builder create and order your perfect sandwitch</p>
          <ButtonMore clicked = {buttonCLickHandler}>To builder</ButtonMore>
        </section>
      </div>
      <div>
        <h3>Login or create acount</h3>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return{
    orderData: state.orderRecuder.orderData,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onOrderEnds: () => dispatch(actions.orderDataCleanUp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(home);