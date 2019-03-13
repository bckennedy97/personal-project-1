import React, {Component} from "react";
import {connect} from "react-redux";
import {getUser, getFavorites} from "../../redux/reducer";
import { List, Card, Button, Input, Form, Dropdown} from 'semantic-ui-react'
import "./account.css"
import axios from "axios";
// import {UserChart} from "../UserChart/UserChart";


class Account extends Component{
    constructor(){
        super()
        this.state = {
            edit: false,
            first:"",
            last:"",
            city:"",
            state:"",
        }
    }
    getFavorites(){
        const {user_id} = this.props.user;
        axios.get(`/favorites/${user_id}`).then(response=>{
            this.props.getFavorites(response.data)
        })
    }
    toggleEdit=()=>{
        this.setState({
            edit: true,
        })
    }
    clearInputs=()=>{
        
        this.setState({
            edit: false,
        })
    }

    deleteFavorite=(favorite)=>{
        const {user_id} = this.props.user;
        const uid = favorite.doctor_uid;
        axios.delete(`/favorites/${user_id}/${uid}`).then(response=>{
            this.getFavorites();
        })
    }

    render(){
        const {user,favorites} = this.props;
        const {edit} = this.state;
        const mappedFavorites = favorites.map((favorite, index) => {
            return(
            <Card fluid key={index}>
                <Card.Content>
                <Card.Header>{favorite.doctor.profile.first_name} {favorite.doctor.profile.last_name} {favorite.doctor.profile.title}</Card.Header>
                <Card.Meta>
                {favorite.doctor.specialties[0].actor}
                </Card.Meta>
                <Card.Description>
                {favorite.doctor.profile.bio}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button as='div' color="blue" onClick={()=>this.deleteFavorite(favorite)}>
                    Delete
                    </Button>
                </Card.Content>
                </Card>
            )
        })
        return(
            <div>
                { user ? (
                    <div>
                        { edit ? (
                        <div className="resource-container">
                        <section className="nav-container">
                            <List size="small" className="list-container">
                                <List.Item/>
                                    <List.Icon name="users"/>
                                    <Input placeholder={user.first_name}/>
                                    <Input placeholder={user.last_name}/>
                                <List.Item/>
                                    <List.Icon name="marker"/>
                                    <Input placeholder={user.city}/>
                                    <Input placeholder={user.state}/>
                                <List.Item/>
                                    <List.Icon name="venus mars"/>
                                    <Form.Field control='select' value={user.gender}>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                    </Form.Field>
                                <List.Item>
                                    <List.Icon name="mail"/>
                                    <Input placeholder={user.email}/>
                                </List.Item>
                            <Button size="mini" color="blue" onClick={this.clearInputs}>Cancel</Button>
                            <Button size="mini" color="blue" onClick={this.clearInputs}>Save</Button>
                            </List>
                        </section>
                        <section className="card-container">
                            {mappedFavorites}
                        </section>
                        </div>) 
                        : 
                        (<div className="resource-container">
                            <section className="nav-container">
                                <List size="big" className="form-container">
                                <Dropdown icon="ellipsis horizontal">
                                        <Dropdown.Menu>
                                        <Dropdown.Item text='Edit' onClick={this.toggleEdit}/>
                                        </Dropdown.Menu>
                                </Dropdown>
                                    <List.Item size="tiny"/>
                                        <List.Icon name="users"/>
                                        <List.Content>{user.first_name},{user.last_name}</List.Content>
                                    <List.Item/>
                                        <List.Icon name="marker"/>
                                        <List.Content>{user.city},{user.state}</List.Content>
                                    <List.Item/>
                                        <List.Icon name="venus mars"/>
                                        <List.Content>{user.gender}</List.Content>
                                    <List.Item>
                                        <List.Icon name="mail"/>
                                        <List.Content>{user.email}</List.Content>
                                    </List.Item>
                                </List>
                            </section>
                            {/* <Button as='div' color="blue" onClick={()=>this.clearFavorites(doctor)}/> */}
                            <div className="card-container">
                            {mappedFavorites}
                            </div>
                        </div>
                        )}
                        </div>
                )
                : 
                (
                <div>

                </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (reducerState) => {
    return{
        user: reducerState.user,
        favorites: reducerState.favorites,
    }
}

export default connect(mapStateToProps, {getUser, getFavorites})(Account)