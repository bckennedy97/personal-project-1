import React from "react";
import {Switch,Route} from "react-router-dom";
import Home from "./components/Home/Home";
import Title from "./components/Title/Title";
import About from "./components/About/About"
import Sos from "./components/Sos/Sos";

export default (
    <Switch>
        <Route exact path= "/" render={()=>{
            return <div>
                <Title/>
            </div>
        }}/>
        <Route path="/home" render={()=>{
            return <div>
                <Home/>
            </div>
        }}/>
        <Route path="/about" render={()=>{
            return <div>
                <About/>
            </div>
        }}/>
        <Route path="/sos" render={()=>{
            return <div>
                <Sos/>
                </div>
        }}/>
        <Route path="/acc" render={()=>{
            return <div>
                account info
            </div>
        }}/>
    </Switch>
)