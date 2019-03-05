import React, { Component } from 'react';
import './App.css';
import Routes from "./routes";
import Header from "./components/Header/Header";
// import axios from "axios";
import {connect} from "react-redux";
import {getUser} from "./redux/reducer";
import {withRouter} from "react-router-dom";

class App extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     user: null
  //   }
  // }

  // componentDidMount(){
  //   axios.get("/api/user-data").then(response=>{
  //     this.setState({
  //       user: response.data
  //     })
  //   })
  // }
  render() {
    // console.log("app state user",this.state.user);
    return (
      <div className="App">
        <Header/>
        
        {Routes}
      </div>
    );
  }
}

const mapStateToProps = (reducerState) => {
  return {
      user: reducerState.user
  }
}

export default withRouter(connect(mapStateToProps, {getUser})(App));