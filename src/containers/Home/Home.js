import React from 'react';
import classes from './Home.css';
import backGround from '../../assets/images/homeBG.png';
import burgerSandwitchIng from '../../assets/images/sandwitchBurger.PNG';
import ButtonMore from '../../components/UI/Button/ButtonMore/ButtonMore';

const home = () => {

    const buttonCLickHandler = () =>{
    }

  return (
    <div className={classes.Home}>
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

export default home;