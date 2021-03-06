import React from 'react';
import {observer} from 'mobx-react'
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import uniqueId from 'lodash/uniqueId'
import moment from 'moment'

@observer
class ScheduleEditorView extends React.Component {
  freqType = [
    {value: 0, label: 'Once'},
    {value: 1, label: 'Daily'},
    {value: 2, label: 'Weekly'},
    {value: 3, label: 'Bi-Weekly'},
    {value: 4, label: 'Monthly'},
    {value: 5, label: 'Yearly'}
  ]

  labels = {
    scheduleDate: "Schedule Date",
    startTime: "Start Time",
    endTime: "End Time",
    description: "Description",
    frequency: "Frequency"
  }

  actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {this.props.editor.isVisible = false}}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={() => {this.deleteSchedule()}}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={() => {this.saveSchedule()}}
      />
  ]

  styles = {
    dialog: {
      width: '400px',
      align: 'center'
    },
    dateTime: {
      display: 'block',
      width: 160,
      margin: 5
    },
    selection: {
      width: '100px'
    },
    textInput: {
      width: '300px',
      display: 'block'
    }
  }

  render() {
    const {editor, scheduleList} = this.props
    const schedule = editor.schedule
    const {startTime, endTime, description, freq} = this.props.editor.schedule
    // const {startTime, duration, description, freq} = this.state
    // this.setState({...this.props.editor.schedule})
    // console.debug(editor, scheduleList)
    return (
      <Dialog title='Schedule Editor' actions={this.actions} open={editor.isVisible} contentStyle={this.styles.dialog}>

          <DatePicker hintText={this.labels.scheduleDate}
                      floatingLabelText={this.labels.scheduleDate}
                      style={this.styles.dateTime}
                      autoOk={true}
                      defaultDate={startTime.toDate()}
                      onChange={this.handleDateTimeChange.bind(this, 'scheduleDate')} />
          <TimePicker key="startTime"
                      hintText={this.labels.startTime}
                      floatingLabelText={this.labels.startTime}
                      style={this.styles.dateTime}
                      defaultTime={startTime.toDate()}
                      onChange={this.handleDateTimeChange.bind(this, 'scheduleTime')} />
          <TimePicker key="endTime"
                      hintText={this.labels.endTime}
                      floatingLabelText={this.labels.endTime}
                      style={this.styles.dateTime}
                      defaultTime={endTime.toDate()}
                      onChange={this.handleDateTimeChange.bind(this, 'endTime')} />
          <SelectField hintText={this.labels.frequency}
                       floatingLabelText={this.labels.frequency}
                      //  style={this.styles.dateTime}
                       value={freq}
                       autoWidth={true}
                       onChange={this.handleSelectionChange.bind(this, 'freq')}>
             {
               this.freqType.map(t => <MenuItem key={t.value} value={t.value} primaryText={t.label} />)
             }
          </SelectField>
          <TextField id="description"
                     hintText={this.labels.description}
                     floatingLabelText={this.labels.description}
                    //  style={this.styles.textInput}
                     fullWidth={true}
                     multiLine={true} rows={5}
                     defaultValue={description}
                     onChange={this.handleTextInputChange} />
      </Dialog>
    );
  }

  handleDateTimeChange = (id, empty, date) => {
    const editSchedule = this.props.editor.schedule
    // console.debug(value, editSchedule)
    switch(id) {
      case 'scheduleDate':
        editSchedule.setScheduleDate(date)
        break
      case 'scheduleTime':
        editSchedule.setScheduleTime(date)
        break
      case 'endTime':
        editSchedule.setEndTime(date)
        break
    }
  }

  handleTextInputChange = (event) => {
    const {id, value} = event.target
    const editSchedule = this.props.editor.schedule
    editSchedule[id] = value
    // console.debug("handleTextInputChange() =>")
    // console.debug(id, value, editSchedule)
  }

  handleSelectionChange = (id, proxy, index, value) => {
    // console.debug("handleSelectionChange() =>")
    // console.debug(id, index, value)
    const editSchedule = this.props.editor.schedule
    editSchedule[id] = value
  }

  saveSchedule() {
    // console.debug("saveSchedule() =>", this.props)
    const {editor, scheduleList} = this.props
    // console.debug(editor, scheduleList)
    // const {startTime, duration, freq, description} = this.state
    // editor.schedule = {startTime, duration, freq, description}
    editor.saveTo(scheduleList)
  }

  deleteSchedule() {
    const {editor, scheduleList} = this.props
    scheduleList.remove(editor.schedule)
    editor.cancelEditing()
  }
}

export default ScheduleEditorView;
