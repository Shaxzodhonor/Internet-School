import { createContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Context = createContext();

function Provider({children}) {

  const history = useHistory()
  const [login, setLogin] = useState(sessionStorage.getItem("__login"))
  if(login){
    sessionStorage.setItem('__login', login);
  } else {
    sessionStorage.removeItem('__login');
    history.push('/')
  }
  return(
    <Context.Provider value={[login, setLogin]}>{children}</Context.Provider>
  )
}
export {
  Context,
  Provider
}