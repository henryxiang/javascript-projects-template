import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'
import Button from 'react-bootstrap/lib/Button'
import CounterView from './counter'
import Counter from '../model/counter'

const defaultStyles = {
    counterAddButton: {
      display: 'inline-block',
      width: '30px',
      margin: '8px'
    }
}

@observer class CounterListView extends Component {
  render() {
    /* pass in backing model object via 'counterList' props */
    const {counterList, styles=defaultStyles} = this.props
    const queryParams = this.getUrlQueryParams()

    /* Observable: counterList.itmes */
    let counters = counterList.items
    if (queryParams && queryParams.sort) {
      /* The value derived from an Observable is also observable*/
      counters = this.getSortedCounters(queryParams.sort)
    }

    return (
      <div>
        <input ref="counterName" placeholder="Item Name"
               onKeyDown={(event) => this.addCounter(event)} />
        <Button bsStyle="danger" bsSize="xs" style={styles.counterAddButton}
                /* Action: counterList.clear() */
                onClick={(event) => {counterList.clear()}}>
          <i className="fa fa-eraser" />
        </Button>

        {
          counters.map(counter => {
            return (
              <div key={counter._id}>
                <CounterView counter={counter} />
                <Button bsStyle="danger" bsSize="xs"
                        /* Action: counterList.removeCounter() */
                        onClick={(event) => {counterList.remove(counter)}}>
                  <i className="fa fa-trash" />
                </Button>
              </div>
            )
          })
        }

        <div>
             {/* Computed properties: counterList.numberOfCounters and counterList.totalCount */}
             <b>Items: {counterList.size}</b>
             {" "}
             <b>Total: {this.getTotalCount()}</b>
        </div>
      </div>
    )
  }

  addCounter(event) {
    const {counterList} = this.props
    if (event.keyCode === 13) {
      const counterName = event.target.value
      console.log(counterName)
      const counter = new Counter(counterName)
      /* Action: counterList.addCounter() */
      counterList.add(counter)
      event.target.value = ''
    }
  }

  /* Function that generates values derived from observables */
  getSortedCounters(order="desc") {
    const counters = this.props.counterList.items
    const m = order === "desc" ? -1 : 1
    return counters.sort((a,b) => a.count >= b.count ? 1*m : -1*m)
  }

  getTotalCount() {
    const counters = this.props.counterList.items
    return counters.reduce((total, counter) => total + counter.count, 0)
  }

  getUrlQueryParams() {
    let queryParams = {};
    let hashUrlSegments = window.location.hash.split("?")
    if (hashUrlSegments.length === 2) {
      let query = hashUrlSegments[1]
      let vars = query.split("&");
      for (let i=0; i<vars.length; i++) {
        let pair = vars[i].split("=");
        queryParams[pair[0]] = pair[1]
      }
    }
    return queryParams;
  }
}

export default CounterListView
