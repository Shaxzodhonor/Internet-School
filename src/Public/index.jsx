import { Route } from "react-router-dom";

function Public({ path, exact, component, children}){

  return <Route path={path} exact={exact} component={component}>{children}</Route>
}

export default Public;