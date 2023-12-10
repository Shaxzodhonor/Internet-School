import { useContext } from "react";
import { Context as LoginContext } from "../LoginContext";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

function Private({path, component, exact, children}) {
  const [login] = useContext(LoginContext)
  
  if(login){
    return <Route path={path} component={component} exact={exact}>{children}</Route>
  } 
    return <Redirect to={"/login"} />
}

export default Private;