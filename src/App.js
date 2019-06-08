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
    <div>
      <Router>
        <Switch>
          <Route exact path= "/" component={Containers.Maps}/>
          <Route exact path= "/:mapId" component={Containers.MapEditor}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
