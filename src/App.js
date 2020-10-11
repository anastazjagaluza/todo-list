import React from 'react';
import './App.css';
import ListPage from './components/pages/ListPage';
import ScorePage from './components/pages/ScorePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div id="container">
    <Router>
      <nav>
        <Link to="/">list</Link>
        <Link to="/score">score</Link>
      </nav>
      <Switch>
      <Route exact path="/">
        <ListPage />
      </Route>
        <Route exact path="/score">
          <ScorePage />
        </Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
