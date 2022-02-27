import React from "react"
import NavBar from "./NavBar"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home"
import "../css/MainApp.css"

function MainApp()
{
    return (
        <Router>
        <div className="MainApp">
        < NavBar />
            <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            </Switch>
        </div>
        </Router>
    )
}

export default MainApp