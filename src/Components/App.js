import React from 'react';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom'
import View from './ProductView'
import WizardForm from './WizardForm'
import Update from './Update'
import '../App.css';


const App = () => (
  <Router>
  <Switch>
  <Route path="/" component={View} exact={true} />
  <Route path="/create" component={WizardForm} />
  <Route path="/update/:id" component={Update} />
  </Switch>
  </Router>
)

export default App;
