import React, {Component} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getUser} from "../../redux/reducer";
import ResourceDisplay from "../ResourceDisplay/ResourceDisplay";
import "./userChart.css"


class UserChart extends Component{
    componentDidMount(){
        const {user_id} = this.props.user;
        axios.get(`/charts/${user_id}`).then(response=>{
            console.log("chart", response.data)
            this.props.getChart(response.data)
        })
        console.log(this.props.user);
        // console.log("chart", this.props.chart)
    }
    
    constructor(props) {
        super(props);
        this.state = {
            first:"",
            last:"",
            city: "",
            state: "",
            gender: 'prefer not to say',
            orientation: 'prefer not to say',
            depression: false,
            anxiety: false,
            bipolar: false,
            schizophrenia: false,
            ptsd: false,
            q1: false,
            q2: false,
            q3: false,
            q4: false,
            q5: false,
            q6: false,
            q7: false,
            q8: false,


        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeOne = this.handleChangeOne.bind(this);
        this.handleChangeTwo = this.handleChangeTwo.bind(this);
        this.createChart = this.createChart.bind(this);
    }
    
    handleChangeOne(event) {
        this.setState({gender: event.target.value});
    }
    handleChangeTwo(event) {
        this.setState({orientation: event.target.value});
    }
    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.checked
        
        this.setState({
            [name]: value
        })
    }

    createChart(){
        const {user_id} = this.props.user;
        const {first,last,city,state,gender,orientation,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4,q5,q6,q7,q8} = this.state;
        const chart = {user_id,first,last,city,state,gender,orientation,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4,q5,q6,q7,q8}
        axios.post("/charts", chart).then(response=>{
            console.log(response.data);
            this.props.getChart(response.data)
        })
    }

    editChart(){
        const {user_id} = this.props.user;
        const {first,last,city,state,gender,orientation,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4,q5,q6,q7,q8} = this.state;
        const chart = {first,last,city,state,gender,orientation,depression,anxiety,bipolar,schizophrenia,ptsd,q1,q2,q3,q4,q5,q6,q7,q8}
        axios.put(`/charts/${user_id}`, chart).then(response=>{
            console.log(response.data);
            this.props.getChart(response.data)
        })
    }

    deleteChart(){

    }

    render(){
        const {chart} = this.props;
        return(
            <div className="chart"> 
            { chart[0] ? (
                <div>
                    <ResourceDisplay/>
                </div>
            )
            :
            (
            <div>
            <form onSubmit={e=>e.preventDefault()}>
                <label>
                First Name:
                    <input placeholder="First" onChange={e=>this.setState({first: e.target.value})}/>
                </label>
                <label>
                Last Name:
                    <input placeholder="Last" onChange={e=>this.setState({last: e.target.value})}/>
                </label>
                <label>
                City and State:
                    <input placeholder="City" onChange={e=>this.setState({city: e.target.value.split(" ").join("-").toLowerCase()})}/>
                    <input placeholder="State" type="text" maxLength={2} onChange={e=>this.setState({state: e.target.value.toLowerCase()})}/>
                </label>
                <label>
                Gender:
                <select value={this.state.gender} onChange={this.handleChangeOne}>
                    <option value="prefer not to say">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-bindary">Non-binary</option>
                </select>
                </label>
                <label>
                Sexual Orientation:
                <select value={this.state.orientation} onChange={this.handleChangeTwo}>
                    <option value="prefer not to say">Prefer not to say</option>
                    <option value="straight">Straight</option>
                    <option value="gay">Gay</option>
                    <option value="bisexual">Bisexual</option>
                    <option value="asexual">Asexual</option>
                </select>
                </label>
                <label>
                    Have you ever been diagnosed with any of the following?
                    <label>
                        Depression
                       <input 
                        name="depression"
                        type="checkbox"
                        checked={this.state.depression} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Anxiety
                       <input 
                        name="anxiety"
                        type="checkbox"
                        checked={this.state.anxiety} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Bipolar Disorder
                       <input 
                        name="bipolar"
                        type="checkbox"
                        checked={this.state.bipolar} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Schizophrenia
                       <input 
                        name="schizophrenia"
                        type="checkbox"
                        checked={this.state.schizophrenia} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Post-Traumatic Stress Disorder
                       <input 
                        name="ptsd"
                        type="checkbox"
                        checked={this.state.ptsd} 
                        onChange={this.handleInputChange}/>
                    </label>
                    </label>
                <label>
                    Check all that apply to you:
                    <label>
                        Little interest or pleasure in doing things
                       <input 
                        name="q1"
                        type="checkbox"
                        checked={this.state.q1} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Feeling down, depressed, or hopeless
                       <input 
                        name="q2"
                        type="checkbox"
                        checked={this.state.q2} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Thoughts that you would be better off dead, or of hurting yourself
                       <input 
                        name="q3"
                        type="checkbox"
                        checked={this.state.q3} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Trouble concentrating on things
                       <input 
                        name="q4"
                        type="checkbox"
                        checked={this.state.q4} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Feeling nervous, anxious, or on edge
                       <input 
                        name="q5"
                        type="checkbox"
                        checked={this.state.q5} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Becoming easily annoyed or irritable
                       <input 
                        name="q6"
                        type="checkbox"
                        checked={this.state.q6} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Feel that you are not in control of your own ideas or thoughts
                       <input 
                        name="q7"
                        type="checkbox"
                        checked={this.state.q7} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Often think and/or have nightmares about an experience that was extremely frightening/upsetting
                       <input 
                        name="q8"
                        type="checkbox"
                        checked={this.state.q8} 
                        onChange={this.handleInputChange}/>
                    </label>
                    <button onClick={this.createChart}>Submit</button>
                </label>
            </form>
            </div>
            )}
            </div>
        )
    }
}



const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user,
        chart: reducerState.chart,
    }
}

export default connect(mapStateToProps, {getUser})(UserChart)