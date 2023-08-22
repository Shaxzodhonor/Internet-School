import './App.scss';
import { Switch } from 'react-router-dom';

// components
import Login from './pages/Login';
import Private from './Private';
import Public from './Public';
import Dashboard from './Dashboard';
import { useEffect } from 'react';






function App() {
  // useEffect(()=> {
  //   fetch("http://16.171.133.29:8080/api/department/getAll")
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // },[])
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
