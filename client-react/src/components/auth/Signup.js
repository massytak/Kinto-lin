import React, { Component } from 'react';
import {signup} from './auth-service';
 
 
class Signup extends Component {
 
  state = { username: '', password: '' }
 
  // handleSubmit() 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
 
    signup(username, password)
      .then(response => {
        this.setState({username: "", password: ""});
        // this.props.updateUser(response)
      })
      .catch(error => console.log(error))
  }

   // handleChange() 
   handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  render() {
    return(
     // form design
      <div>
      {/* HERE */}
      <form onSubmit={this.handleFormSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

        <label>Email:</label>
        <input type="email" value={this.state.email} onChange={e => this.handleChange(e)} />
        
        <label>Password:</label>
        <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

        <label> Confirm Password:</label>
        <input name="confirmPassword" value={this.state.confirmPassword} onChange={e => this.handleChange(e)} />

        {/* <label> Upload your picture</label>
        <input type="file" value ={this.state.imahe} onChange={e=> this.handleChange(e)} /> */}
        
        <button>I Signup</button>
      </form>

      <p>Already have account? 
        <Link to={"/login"}>Login</Link>
      </p>

    </div>
    )
  }
}
 