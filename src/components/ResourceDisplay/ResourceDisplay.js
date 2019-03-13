import React, {Component} from "react";
import axios from "axios";
import {getUser,getDoctors,addFavorite, getFavorites} from "../../redux/reducer";
import {connect} from "react-redux";
import "./resourceDisplay.css"
import FilterNav from "./FilterNav/FilterNav";
import { Card, Button } from 'semantic-ui-react'


class ResourceDisplay extends Component{

    constructor(props){
        super(props);
        this.state = {
            doctors: [],
            specialty: "psychiatrist,psychologist",
            skip: 0,
            state: "az",
            city: "phoenix",

        }
        // this.nextPage = this.nextPage.bind(this);
        // this.previousPage = this.previousPage.bind(this);
        this.getDoctors = this.getDoctors.bind(this);
    }

    componentDidMount(){
        const {user_id} = this.props.user;
        axios.get(`/favorites/${user_id}`).then(response=>{
            this.props.getFavorites(response.data)
        })
        this.getDoctors();

    }

    componentDidUpdate(){
        console.log("faves", this.props.favorites);
    }

    

    getDoctors(){
        const {state,city} = this.props.user;
        const {specialty,skip} = this.state;
            axios.get(`https://api.betterdoctor.com/2016-03-01/doctors?location=${state}-${city}&specialty_uid=${specialty}&skip=${skip}&limit=100&user_key=93386aa8c548a0e14484f8cd1f39f385`).then(response=>{
            this.props.getDoctors(response.data.data)
            })
        
    }

    addFavorite=(doctor)=>{
        const {user_id} = this.props.user;
        axios.post(`/favorites/${user_id}`, doctor).then((response)=>{
            this.props.addFavorite(response.data[0]);
        })
    }

    // nextPage(){
    //     this.setState({
    //         skip: this.state.skip+=10
    //     });
    //     this.getDoctors();
    //     window.scrollTo(0, 0)

    // }
    // previousPage(){
    //     this.setState({
    //         skip: this.state.skip-=10
    //     });
    //     this.getDoctors();

    // }

    render(){
        const {doctors} = this.props;
        const mappedDoctors = doctors.map((doctor, index) => {
        return <Card fluid key={index}>
                {/* <Image src={doctor.profile.image_url} alt="doctor"/> */}
                <Card.Content>
                <Card.Header>{doctor.profile.first_name} {doctor.profile.last_name} {doctor.profile.title}</Card.Header>
                <Card.Meta>
                    {doctor.specialties[0].actor}
                </Card.Meta>
                <Card.Description>
                    {doctor.profile.bio}
                </Card.Description>

                </Card.Content>
                <Card.Content extra>
                    {/* <Button as='div' labelPosition='right' onClick={()=>this.addFavorite(doctor)}>
                    <Button color='blue'>
                        <Icon name='star outline' />
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                        0
                    </Label>
                    </Button> */}
                    <Button icon="star" color="blue" onClick={()=>this.addFavorite(doctor)}/>
                </Card.Content>
                </Card>
        });

        // const mappedDoctors = doctors.map((doctor,i)=>{
        //     const {favorites} = this.props;
        //     let mappedFaves = favorites.map((favorite, index)=>{
        //         return(
        //             <div>
        //               { doctor.uid === favorite.uid ? (
        //                 <div>
        //                     <Card fluid key={index}>
        //                         {/* <Image src={doctor.profile.image_url} alt="doctor"/> */}
        //                         <Card.Content>
        //                         <Card.Header>{doctor.profile.first_name} {doctor.profile.last_name} {doctor.profile.title}</Card.Header>
        //                         <Card.Meta>
        //                             {doctor.specialties[0].actor}
        //                         </Card.Meta>
        //                         <Card.Description>
        //                             {doctor.profile.bio}
        //                         </Card.Description>

        //                         </Card.Content>
        //                         <Card.Content extra>
        //                             {/* <Button as='div' labelPosition='right' onClick={()=>this.addFavorite(doctor)}>
        //                             <Button color='blue'>
        //                                 <Icon name='star outline' />
        //                             </Button>
        //                             <Label as='a' basic color='blue' pointing='left'>
        //                                 0
        //                             </Label>
        //                             </Button> */}
        //                             <Button icon="star" color="yellow"/>
        //                         </Card.Content>
        //                     </Card>
        //                 </div>
        //             )
        //             : 
        //             (
        //                 <div>
        //                     <Card fluid key={index}>
        //                         {/* <Image src={doctor.profile.image_url} alt="doctor"/> */}
        //                         <Card.Content>
        //                         <Card.Header>{doctor.profile.first_name} {doctor.profile.last_name} {doctor.profile.title}</Card.Header>
        //                         <Card.Meta>
        //                             {doctor.specialties[0].actor}
        //                         </Card.Meta>
        //                         <Card.Description>
        //                             {doctor.profile.bio}
        //                         </Card.Description>

        //                         </Card.Content>
        //                         <Card.Content extra>
        //                             {/* <Button as='div' labelPosition='right' onClick={()=>this.addFavorite(doctor)}>
        //                             <Button color='blue'>
        //                                 <Icon name='star outline' />
        //                             </Button>
        //                             <Label as='a' basic color='blue' pointing='left'>
        //                                 0
        //                             </Label>
        //                             </Button> */}
        //                             <Button icon="star" color="blue"/>
        //                         </Card.Content>
        //                     </Card>
        //                 </div>
        //             )
        //        } 
        //             </div>
        //         )
               
        //     })
        //     return mappedFaves
        // })

        return(
        <div className="resource-container">
            <div className="nav-container">
                    <FilterNav/>
            </div>
            <div className="card-container">
                
                    {mappedDoctors}
                
                {/* <button onClick={this.previousPage}>Previous</button>
                <button onClick={this.nextPage}>Next</button> */}
            </div>
        </div>
        )
    }
}


const mapStateToProps = (reducerState) => {
    return {
        user: reducerState.user,
        doctors: reducerState.doctors,
        favorites: reducerState.favorites
    }
  }
  
export default connect(mapStateToProps, {getUser,getDoctors,addFavorite, getFavorites})(ResourceDisplay);