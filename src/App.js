import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Styles/index.scss'
import 'Components/CardProyectos'

import Dashboard from 'views/Dashboard'
import Proyecto from 'views/Proyecto'
import Cliente from 'views/Cliente'
import ClienteDataForm from 'views/ClienteDataForm'

import { MayaAppMachineProvider } from 'context/MayaMachine'

function App () {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/" >
          <div></div>
        </a>
      </header>

      <Router>
        <Switch>
          <MayaAppMachineProvider>
          <Route path="/" exact={true}>
            <Dashboard />
          </Route>
          <Route 
            exact={true}
            path="/proyecto/:slug" 
            render={(props) => <Proyecto { ...props } />}
            >            
          </Route>
          <Route path="/cliente/:slug">
            <Cliente />
          </Route>

          {/* /proyecto/6106f8b63f7b250b1c9687f8/cliente */}
          <Route 
            path="/proyecto/:idProyecto/cliente/:idCliente"
            render={(props) => <ClienteDataForm { ...props } /> }
            >
          </Route>
          
          </MayaAppMachineProvider>
        </Switch>
      </Router>
    </div>
  )
}

export default App
