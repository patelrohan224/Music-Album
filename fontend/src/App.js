import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <>
    <Switch>
        <Route to="/" exact> 
          <Home />
        </Route>
        {/* <Route to="/add"  exact> 
        <Addstudents />
        </Route>        */}
      </Switch>
    </>
  );
}

export default App;
