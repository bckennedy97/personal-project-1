import React, {Component} from "react";
import {NavLink,withRouter} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux";
import {getUser,logout} from "../../redux/reducer";
import "./header.css";

class Header extends Component{
    componentDidMount(){
        axios.get("/api/user-data").then(res=>{
            this.props.getUser(res.data);
        })
    }
    
    login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth`)
  
        window.location = `https://${process.env.REACT_APP_AUTH_DOMAIN}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${redirectUri}&response_type=code`
    }

    logout = () => {
        this.props.logout()
        .then(this.props.history.push("/"))
    }
    
    render(){
        const {user} = this.props;
        console.log("user",user);
        return(
            
            <header className="header-container">
                <div>
                <NavLink to="/" id="logo">ouiCARE</NavLink>
                { user ? (
                    <nav className="Nav">
                        <ul>
                            <li><NavLink to="/home">Home</NavLink></li>
                            {/* <li><NavLink to="/doctors">Doctors</NavLink></li> */}
                            <li><NavLink to="/donate">Donate</NavLink></li>
                            {/* <li><NavLink to="/sos"><span id="red">EMERGENCY</span></NavLink></li> */}
                            <li><NavLink id="profile" to="/acc">{user.profile_name}</NavLink></li>
                            <li><button onClick={this.logout}>Logout</button></li>
                        </ul>
                        
                    </nav>)
                :(
                    <nav>
                        <ul>
                            <li><NavLink className="link" to="/home">Home</NavLink></li>
                            {/* <li><NavLink className="link" to="/doctors">Doctors</NavLink></li> */}
                            <li><NavLink to="/donate">Donate</NavLink></li>
                            {/* <li><NavLink to="/sos"><span id="red">EMERGENCY</span></NavLink></li> */}
                            <li><button onClick={this.login}>Login</button></li>
                        </ul>
                    </nav>)
                }
                </div>
                
            </header>
        )
    }
}

const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user,
    }
  }
  
export default withRouter(connect(mapStateToProps, {getUser,logout})(Header));