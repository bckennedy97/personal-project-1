import React, {Component} from "react";
import Title from "../Title/Title";
import {connect} from "react-redux";
import {getUser} from "../../redux/reducer";
import UserInfo from "../UserInfo/UserInfo";
import {withRouter} from "react-router-dom";


class Home extends Component{
    render(){
        const {user} = this.props;
        return(
            <div>
            {user ? (
                
                <UserInfo/>
                
            )
            : 
            (
                
                    
                <Title/>

                
            )
            }
                
            </div>
            
        )
    }
}

const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user,
    }
  }
  
export default withRouter(connect(mapStateToProps, {getUser})(Home));