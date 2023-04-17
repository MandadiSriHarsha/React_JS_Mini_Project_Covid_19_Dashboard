import {Switch, Route, Redirect} from 'react-router-dom'

import HomeRoute from './components/HomeRoute'
import AboutRoute from './components/AboutRoute'
import StateWiseDetailsRoute from './components/StateWiseDetailsRoute'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeRoute} />
    <Route exact path="/about" component={AboutRoute} />
    <Route exact path="/state/:id" component={StateWiseDetailsRoute} />
    <Route exact path="/not-found" component={NotFoundRoute} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
