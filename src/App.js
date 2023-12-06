import './App.scss';
import { Switch } from 'react-router-dom';
import 'suneditor/dist/css/suneditor.min.css'
// components
import Login from './pages/Login';
import Private from './Private';
import Public from './Public';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Switch>        
        <Public path={"/login"} component={Login}/>
        <Private path={"/"} component={Dashboard}></Private>
        <Public path={"*"}>Error</Public>
      </Switch>
     
    </div>
  );
}

export default App;
