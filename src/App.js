import React from 'react';
import './App.css';
import * as Containers from './Containers/index'
import { 
  BrowserRouter as Router , 
  Route , 
  Switch 
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path= "/maps" component={Containers.Maps}/>
          <Route exact path= "/maps/:mapId" component={Containers.MapEditor}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
