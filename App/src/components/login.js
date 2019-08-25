import React, { Component } from "react";
import axios from "axios";
import './login.css';
import {Link} from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            message: ''
        };
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {username,password} = this.state;
        axios.post('/auth/login', {username, password})
        .then((response)=>{
            //console.log("Here");
            if(response.status !== 401){
            localStorage.setItem('jwtToken', response.data.token);
            console.log(response.data.token)
            this.props.history.push('/');
            //axios.request('/',{headers: {'abc':'def'}})
            // .then((res)=>{
                
            // })
            
        }
            else{
                console.log("Error")
            }
        })
        .catch((error)=>{
            if(error.response.status === 401){
                console.log("Error from here");
                this.setState({message: "Login failed. You are not authorised "})
            }

        })
    }

    render(){
        const {username, password, message} = this.state;
        return(
            <div class="container">
                <form onSubmit = {this.onSubmit}>
                {message !== '' && <div class="alert alert-warning alert-dismissible" role="alert">{message}</div>}
                    <h1 class="form-signin-headin">Please Login</h1>
                    <label for="inputEmail" class="sr-only">Email Address</label>
                    <input type="email" class="form-control" placeholder="Enter Email Address" name="username" value={username} onChange={this.onChange} required></input>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="text" class="form-control" placeholder="Enter Password" name="password" value={password} onChange={this.onChange} required></input>
                    <button class="btn btn-large btn-primary btn-block" type="submit">Login</button>
                    <p>
                        Not a member?  
                        <Link to="/register">Register</Link>
                    </p>

                </form>
            </div>
        )
    }
}

export default Login;