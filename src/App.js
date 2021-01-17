/* eslint-disable import/first */

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//
import { Navbar } from './components/layout/Navbar';
import { Index } from './components/layout/Index';
import { Lyrics } from './components/tracks/Lyrics';

import { GlobalProvider } from './context';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/findLyrics" component={Index} />
              <Route
                exact
                path="/findLyrics/track/lyrics/:id"
                component={Lyrics}
              />
            </Switch>
          </div>
        </>
      </Router>
    </GlobalProvider>
  );
}

export default App;
