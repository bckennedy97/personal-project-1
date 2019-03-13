import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getUser} from "../../redux/reducer";
import {Form} from "semantic-ui-react";
import ResourceDisplay from "../ResourceDisplay/ResourceDisplay";
import "./userInfo.css"


class UserChart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            first:"",
            last:"",
            city: "",
            state: "",
            gender: "male",
        };
    }


    updateUserInfo=()=>{
        const {first,last,city,state,gender} = this.state;
        const {user_id} = this.props.user;
        const userInfo = {first,last,city,state,gender};
        axios.put(`/user/${user_id}`, userInfo).then(response=>{
            console.log(response.data[0]);
            this.props.getUser(response.data[0])
        })
    }

    deleteChart(){

    }

    render(){
        const {user} = this.props;
        // const options = [
        //     { key: 'm', text: 'Male', value: 'male' },
        //     { key: 'f', text: 'Female', value: 'female' },
        //   ]
        return(
            <div> 
            { user.city && user.state ? (
                <div>
                    <ResourceDisplay/>
                </div>
            )
            :
            (
            <div>
                <Form>
                <Form.Group widths='equal'>
                <Form.Input fluid label='First name' placeholder='First name' onChange={(e)=>this.setState({first: e.target.value})}/>
                <Form.Input fluid label='Last name' placeholder='Last name' onChange={(e)=>this.setState({last: e.target.value})}/>
                {/* <Form.Select fluid label='Gender' options={options} placeholder='Gender' onChange={(e, { value }) => this.setState({ value })}/> */}
                <Form.Field label="Gender" control='select' value={this.state.gender} onChange={(e)=>this.setState({gender: e.target.value})}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Form.Field>
                </Form.Group>
                <Form.Group>  
                <Form.Input fluid label='City' placeholder='City' width="5" onChange={e=>this.setState({city: e.target.value.split(" ").join("-").toLowerCase()})}/>
                <Form.Input fluid label='State' maxLength={2} placeholder='State' width="1" onChange={e=>this.setState({state: e.target.value.toLowerCase()})}/>
                </Form.Group>
                <Form.Button onClick={this.updateUserInfo}>Submit</Form.Button>
                </Form>
            </div>
            )}
            </div>
        )
    }
}



const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user,
    }
}

export default connect(mapStateToProps, {getUser})(UserChart)