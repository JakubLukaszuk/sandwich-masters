import React, {Component} from 'react';

import classes from './SwitchControl.css'

class SwitchControl extends Component {
//not working with dumb component
//try to find out way to make this component dumb
  render() {

    return (
      <div>
          <input className = {classes.CheckBox}
            checked={this.props.checked}
            onChange={this.props.changed}
            type="checkbox"/>
                    <label>
        {this.props.label}
        </label>
      </div>
    );

  }
}

export default SwitchControl;