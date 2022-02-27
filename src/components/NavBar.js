import React from "react"
import {Link} from "react-router-dom"
import "../css/MainApp.css"

function NavBar()
{

    return(
      <nav>
        <div className="name">
        <p> CBIT STUDENT SERVICE</p>
        </div>
        <ul className="nav-links">
        <Link to="/" >
        <li >HOME</li>
        </Link>  
        <Link to="/Login" >
        <li >LOGIN</li>
        </Link>     
        <Link to="/Register" >
        <li >REGISTER</li>
        </Link>        
        </ul>
      </nav>
    )
}
export default NavBar