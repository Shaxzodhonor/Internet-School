import Right_menu from "../../assets/images/navigate_right_menu.svg"
import { NavLink } from "react-router-dom";


function Menu() {
  
  return(
    <div style={{height: "calc(100vh - 80px)", overflowY: "auto", paddingBottom: "100px", backgroundColor: "#fff", width: "270px", flexShrink: "0"}} >
      <div className="list-group">
        <NavLink to={"/school"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Maktab
        </NavLink> 
        <NavLink to={"/acceptance"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Qabul
        </NavLink>
        <NavLink to={"/contact"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Kontakt
        </NavLink> 
        <NavLink to={"/sections"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Bo'limlar           
        </NavLink>      
        <NavLink exact to={"/direction"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Yo'nalishlar
        </NavLink>
        <NavLink exact to={"/statistics"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Statistika
        </NavLink>
        <NavLink exact to={"/science"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Ilmiy ishlar
        </NavLink>      
        <NavLink exact to={"/partners"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Hamkorlar
          <img src={Right_menu} alt="" style={{marginRight: "0px", marginLeft: "auto"}} />
        </NavLink> 
        <NavLink exact to={"/government"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Foydali havolalar
          <img src={Right_menu} alt="" style={{marginRight: "0px", marginLeft: "auto"}} />
        </NavLink>      
        <NavLink exact to={"/news"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Yangiliklar           
        </NavLink>
        <NavLink exact to={"/events"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Kelgusi voqealar          
        </NavLink>     
        <NavLink exact to={"/files"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Files        
        </NavLink>
        <NavLink exact to={"/position"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Lavozim     
        </NavLink>
        <NavLink exact to={"/subject"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Fanlar
        </NavLink>
        <NavLink exact to={"/employee"} className={"list-group-item list-group-item-action list-group-item-light py-3"} activeClassName={"active"}>
          Xodimlar
        </NavLink>
      </div>
    </div>
  )
}

export default Menu;