import React, {Component} from "react";
import axios from "axios";

export default class DoctorCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            doctors:[],
            state: "az",
            city: "phoenix",
            specialty: "psychiatrist",
            skip: 0,
        }
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.getDoctors = this.getDoctors.bind(this);
    }

    componentDidMount(){
        this.getDoctors();
    }
    
    getDoctors(){
        const {state,city,specialty,skip} = this.state;
        axios.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=${state}-${city}&specialty_uid=${specialty}&skip=${skip}&limit=10&user_key=93386aa8c548a0e14484f8cd1f39f385`).then(response=>{
            console.log(response.data.data)
            this.setState({
                doctors: response.data.data,
            })
        })
    }
    

    render(){
        const {doctors} = this.state;
        const mappedDoctors = doctors.map(doctor=>{
            return (
                <div>
                {this.state.skip != 0 ? (
                <div>
                <img src={doctor.profile.image_url}/>
                <h1>{doctor.profile.first_name} {doctor.profile.last_name} {doctor.profile.title}</h1>
                <div>
                    {doctor.profile.bio}
                </div>
                <button onClick={this.previousPage}>Previous</button>
                <button onClick={this.nextPage}>Next</button>
                </div>
            ) : (
                <div>
                <img src={doctor.profile.image_url}/>
                <h1>{doctor.profile.first_name} {doctor.profile.last_name} {doctor.profile.title}</h1>
                <div>
                    {doctor.profile.bio}
                </div>
                <button onClick={this.nextPage}>Next</button>
                </div>
            )
                }
                
                </div>
            )
        })
        return(
        <div> 
            
            
            
            <section>
                <p>{mappedDoctors}</p>
            </section>
        </div>
        )
    }
}