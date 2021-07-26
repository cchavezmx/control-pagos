
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './Styles/index.scss';
import 'Components/CardProyectos'
// rutas ahora improvisado
import Dashboard from 'views/Dashboard'
import Proyecto from 'views/Proyecto'
import Cliente from 'views/Cliente'


function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <a href="/" >
          <div></div>
        </a>
      </header>

      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Dashboard />
          </Route>
          <Route path="/proyecto/:slug">
            <Proyecto />
          </Route>
          <Route path="/cliente/:slug">
            <Cliente />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
