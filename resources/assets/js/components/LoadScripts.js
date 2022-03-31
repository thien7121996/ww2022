import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BieuDo from './chartdashboard/BieuDo'

class LoadScripts extends Component {
  render () {
    return (
      <BrowserRouter>
       <Switch>
            <Route exact path='/' component={BieuDo} />
            <Route exact path='/tong-quan' component={BieuDo} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<LoadScripts />, document.getElementById('loadscripts'))