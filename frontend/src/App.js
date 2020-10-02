import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Ticket from './components/Ticket'
import userProfile from './components/userProfile'
import ShowTickets from './components/TicketShow'

class App extends Component {
  render() {
    return (
      <Router>
            <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/20.1.7/css/dx.common.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/20.1.7/css/dx.light.css" />
  

    <script src="https://unpkg.com/core-js@2.4.1/client/shim.min.js"></script>
    <script src="https://unpkg.com/systemjs@0.21.3/dist/system.js"></script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript">
        System.import('./index.js');
    </script>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addTicket" component={Ticket} />
            <Route exact path="/tickets" component={ShowTickets} />
            <Route exact path="/userProfile" component={userProfile} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App