import React, {Component} from "react";
// import ResourceDisplay from "../ResourceDisplay/ResourceDisplay";
import UserChart from "../UserChart/UserChart";
import Title from "../Title/Title";
import {connect} from "react-redux";
import {getUser} from "../../redux/reducer";

class Home extends Component{
    render(){
        const {user} = this.props;
        return(
            <div className="home-container">
            {user ? (
                <div>
                    <UserChart/>
                    {/* <ResourceDisplay/> */}

                </div>
            )
            : 
            (
                <div>
                    {/* <Title/> */}
                    <Title/>

                </div>
            )
            }
                
            </div>
            
        )
    }
}

const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user
    }
  }
  
export default connect(mapStateToProps, {getUser})(Home);