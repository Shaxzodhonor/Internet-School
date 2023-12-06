import Search from "../../assets/images/search.svg"
import { useEffect, useState } from "react";



function Header() {
  const [adminData, setAdmin] = useState([])
  useEffect(()=>{
    fetch("https://reqres.in/api/users/2")
    .then(res => res.json())
    .then(data => setAdmin(data))
  },[])
  return(
    <header style={{height: "50px",flexShrink: "0", backgroundColor: "#f4f4f4"}} className="container-fluid d-flex">
      <div className="ms-auto d-flex align-items-center">
        <select name="language" className="language">
          <option value="o'zbek">O'zb</option>
          <option value="russia">Ru</option>
          <option value="english">Eng</option>
        </select>
        <span className="text_field mx-5">
          <img src={Search} alt="icon" width={24} height={24} />
        </span>
        <div className="d-flex align-items-center">
          <div className="name">{adminData.data?.first_name} {adminData.data?.last_name}</div>
          <span className="role">Админ</span>
        </div>
      </div>
    </header>
  )
}

export default Header;