import React, {Component} from "react";
import {connect} from "react-redux";
import "./filterNav.css";
import {Form} from "semantic-ui-react";
export default class FilterNav extends Component{
    render(){
        return(
            <div className="nav-container">
                <Form className="form-container">
                <Form.Group grouped>
                <section className="nav-header">
                <label>Gender</label>
                </section>
                <Form.Field label='Male' control='input' type='checkbox' />
                <Form.Field label='Female' control='input' type='checkbox' />
                </Form.Group>
                <Form.Group grouped>
                <section className="nav-header">
                <label>Specialty</label>
                </section>
                <Form.Field label='Psychiatry' control='input' type='checkbox' />
                <Form.Field label='Psychology' control='input' type='checkbox' />
                </Form.Group>
                <Form.Group grouped>
                <section className="nav-header">
                <label>Insurance</label>
                </section>
                <Form.Field label='Aetna' control='input' type='checkbox' />
                <Form.Field label='Blue Cross' control='input' type='checkbox' />
                <Form.Field label='Cigna' control='input' type='checkbox' />
                <Form.Field label='Health Net' control='input' type='checkbox' />
                </Form.Group>
                </Form>
            </div>
        )
    }
}

connect(FilterNav)