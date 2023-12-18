import { useEffect, useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context as LoginContext } from "../../LoginContext";
import request from "../../request"
// images
import Girl from "../../assets/images/login-girl.png"
import Logo from "../../assets/images/site-logo.png"

function Login() {
  const [login, setLogin] = useContext(LoginContext)
  const history = useHistory()
  const [indicator,setIndicator] = useState({open: false,})
  
  function loginFunction(evt){

    evt.preventDefault()
    const {login, password} = evt.target.elements  ;

    if(!login.value){
      return login.style.border = "1px solid red";
    } else {
     login.style.border = "1px solid #4F7D96";
    }
    if(!password.value){
      return password.style.border = "1px solid red"
    } else {
     password.style.border = "1px solid #4F7D96";
    }
    setIndicator({open:true})

    request.post("/admin/sign-in",{login: login?.value, password: password.value})

    .then(data => {
      if(data?.data.status === "success"){
        setLogin(data?.data.data)
        setIndicator({open:false})
        history.push("/admin")
      } else {
        setIndicator({open:false, info: "ERROR login or password"})
      }
    })
  }

  return (
    <div className="login h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: "#4F7D96"}}>
      <div className="d-flex rounded-3 w-75 h-75" style={{overflow: "hidden"}}>
        <div className="w-50" style={{backgroundColor: "#CFE1EA"}}>
          <img src={Girl} alt="girl images" width={"100%"}/>
        </div>
        <div className="bg-light w-50 d-flex flex-column p-5">
          <img className="mx-auto" src={Logo} alt="logo" width={"120"}/>
          {indicator?.info ? (<p style={{marginTop: "-34px", color: "red"}}>{indicator?.info}</p>) : null}

          <form action="" onSubmit={loginFunction} className="px-5 my-3">
            <div className="form-floating">
              <input type="text" name="login" className="form-control is-invalid" id="floatingInputLogin" placeholder="loginni kiriting"/>
              <label htmlFor="floatingInputLogin">Invalid </label>
            </div>
            <div className="form-floating">
              <input type="password" name="password" className="my-3 form-control is-valid" id="floatingInputPassword" placeholder="passwordni kiriting"/>
              <label htmlFor="floatingInputPassword">Invalid insdput</label>
            
            </div>
              <button type="submit" className="btn btn-outline-success w-100">Кириш</button>
          </form>
          <hr className="line"/>
          <p className="m-0" style={{fontSize: "12px"}}>Безопасность системы осуществлена на базе стандартов</p>
          <p className="m-0" style={{fontSize: "12px"}}>O'zDST 1105:2009 Алгоритм шифрования данных</p>
          <p className="m-0" style={{fontSize: "12px"}}>O'zDST 1192:2009 Процессы формирования и проверки ЭЦП</p>
          <p className="m-0" style={{fontSize: "12px"}}>Версия 3.0 ГУП UNICON.UZ, OOO UNICON-SOFT 2011-2018</p>
        </div>
      </div>
      <dialog className="dialog" open={indicator.open}>
        <div>
        <div className="spinner"></div>
        </div>
      </dialog>
    </div>
  )
}

function Input({name, type,label, inputValue}){

  const inputRef = useRef();
  const labelRef = useRef()
  const [value, setValue] = useState(inputValue && true)

  useEffect(()=>{
    if(inputValue){
      labelRef.current?.classList.add("label--valid")
    }
  },[])
  
  function Change(evt) {
    const { value } = evt.target;
    setValue(value)
  }

  function Blur(){
    if(!value){
      labelRef.current.classList.remove("label--valid")
    } 
  }
  function Focus(){
    labelRef.current.classList.add("label--valid")
  }

  return (
    <div className="input-wrap">
      <input ref={inputRef} onChange={Change} onFocus={Focus} onBlur={Blur} name={name} className="input" type={type} id={`${name}_${label}_${type}`} defaultValue={inputValue} autoComplete="off"/>
      <label ref={labelRef} className="label" htmlFor={`${name}_${label}_${type}`}>{label}</label>
    </div>
  )
}
export default Login;