import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

const iconStyles = {
  marginLeft: 20,
  cursor: 'pointer'
};

const TestApp = () => (
  <div>
    <h2>Material UI React Components Demo</h2>
    <RaisedButton label="Click Me" onClick={()=>{alert("You clicked me")}}/>
    <DatePicker hintText="Choose a date" />
    <TimePicker hintText="Pick a time" />
    <TextField hintText="Input Text" />
    <FontIcon className="fa fa-address-book" style={iconStyles}
              color={blue500}
              hoverColor={greenA200}
              onClick={()=>{alert(`You clicked me`)}} />
  </div>
)

export default TestApp
